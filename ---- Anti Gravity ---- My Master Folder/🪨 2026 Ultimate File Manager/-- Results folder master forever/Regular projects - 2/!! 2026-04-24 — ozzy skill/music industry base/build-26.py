"""Build 26 Elijah category pages from the template + music industry base.

Reads:
  templates/category-page.template.html
  research/cats-1-13.js
  research/cats-14-26.js
  research/sources-batch-1.md ... sources-batch-6.md

Writes:
  ../elijah/pages/cat-1.html ... cat-26.html
"""
from __future__ import annotations
import os
import re
import sys
from pathlib import Path
from html import escape as html_escape

# Run from inside the "music industry base" folder.
# Windows MAX_PATH (260) is exceeded by these paths — wrap with \\?\ extended-length.
SCRIPT_DIR = Path(".").resolve()
TEMPLATE_PATH = Path("templates") / "category-page.template.html"
CATS_1_13 = Path("research") / "cats-1-13.js"
CATS_14_26 = Path("research") / "cats-14-26.js"
SOURCES_BATCH_GLOB = Path("research")
OUT_DIR = Path("..") / "elijah" / "pages"


def _ext(p) -> str:
    """Return absolute Windows extended-length path string for `p` to bypass MAX_PATH."""
    abs_str = str(Path(p).resolve())
    if os.name == "nt" and not abs_str.startswith("\\\\?\\"):
        abs_str = "\\\\?\\" + abs_str
    return abs_str


def read_text_long(p) -> str:
    with open(_ext(p), "r", encoding="utf-8") as f:
        return f.read()


def write_text_long(p, content: str) -> None:
    with open(_ext(p), "w", encoding="utf-8") as f:
        f.write(content)


def ensure_dir_long(p) -> None:
    path = Path(p).resolve()
    if not path.exists():
        # mkdir on a long path — fall back to OS-specific approach via os.makedirs with extended prefix
        try:
            os.makedirs(_ext(path), exist_ok=True)
        except OSError:
            os.makedirs(str(path), exist_ok=True)

ACADEMIC_DOMAINS = (
    "ascap.com", "bmi.com", "wipo.int", ".edu", "jstor", "journal", "hbr.org",
    "berklee", "thejsms.org", "pdxscholar", "sagepub", "harvard",
)
MAINSTREAM_DOMAINS = (
    "billboard.com", "musicbusinessworldwide", "mbw", "variety.com", "hypebot",
    "musically.com", "soundcharts.com", "pollstar", "rollingstone",
)


def classify(url: str) -> str:
    u = url.lower()
    for d in ACADEMIC_DOMAINS:
        if d in u:
            return "academic"
    for d in MAINSTREAM_DOMAINS:
        if d in u:
            return "mainstream"
    return "blogs"


def domain_label(url: str) -> str:
    m = re.search(r"https?://(?:www\.)?([^/]+)/", url + "/")
    if not m:
        return "source"
    host = m.group(1)
    parts = host.split(".")
    if len(parts) >= 2:
        return parts[-2].capitalize()
    return host


def parse_array_of_strings(block: str, key: str) -> list[str]:
    """Extract array-of-strings from a JS object literal segment."""
    m = re.search(rf"{key}\s*:\s*\[(.*?)\]\s*,\s*(?:\w+\s*:|\}})", block, re.S)
    if not m:
        return []
    inner = m.group(1)
    out: list[str] = []
    i = 0
    while i < len(inner):
        c = inner[i]
        if c == '"':
            end = i + 1
            buf = []
            while end < len(inner):
                ch = inner[end]
                if ch == "\\" and end + 1 < len(inner):
                    buf.append(inner[end + 1])
                    end += 2
                    continue
                if ch == '"':
                    break
                buf.append(ch)
                end += 1
            out.append("".join(buf))
            i = end + 1
        else:
            i += 1
    return out


def parse_string_field(block: str, key: str) -> str:
    m = re.search(rf'{key}\s*:\s*"((?:[^"\\]|\\.)*)"', block, re.S)
    if not m:
        return ""
    raw = m.group(1)
    return raw.replace("\\n", " ").replace('\\"', '"').replace("\\'", "'").strip()


def parse_sources(block: str) -> list[dict]:
    m = re.search(r"sources\s*:\s*\[(.*?)\]\s*\}", block, re.S)
    if not m:
        return []
    inner = m.group(1)
    items = re.findall(r"\{(.*?)\}", inner, re.S)
    out = []
    for it in items:
        t = re.search(r'type\s*:\s*"([^"]*)"', it)
        n = re.search(r'name\s*:\s*"((?:[^"\\]|\\.)*)"', it)
        u = re.search(r'url\s*:\s*"([^"]*)"', it)
        if t and n and u:
            out.append({
                "type": t.group(1),
                "name": n.group(1).replace('\\"', '"'),
                "url": u.group(1),
            })
    return out


def parse_cats_file(path: Path) -> dict[int, dict]:
    text = read_text_long(path)
    cats: dict[int, dict] = {}
    # Split into per-cat blocks. Find all `id: N,` markers.
    starts = [(int(m.group(1)), m.start()) for m in re.finditer(r"id\s*:\s*(\d+)\s*,", text)]
    for idx, (cid, start) in enumerate(starts):
        end = starts[idx + 1][1] if idx + 1 < len(starts) else len(text)
        block = text[start:end]
        cats[cid] = {
            "id": cid,
            "title": parse_string_field(block, "title"),
            "summary": parse_string_field(block, "summary"),
            "keyFacts": parse_array_of_strings(block, "keyFacts"),
            "standardPractice": parse_string_field(block, "standardPractice"),
            "commonMistakes": parse_array_of_strings(block, "commonMistakes"),
            "sources": parse_sources(block),
        }
    return cats


def parse_sources_batches() -> dict[int, list[dict]]:
    """Return {cat_id: [tile_dict, ...]} aggregating all sources-batch-*.md."""
    tiles: dict[int, list[dict]] = {}
    for batch in sorted(SOURCES_BATCH_GLOB.glob("sources-batch-*.md")):
        text = read_text_long(batch)
        # Each tile starts with: ### CAT-N-TILE-K | Title | TYPE
        for m in re.finditer(
            r"###\s+CAT-(\d+)-TILE-(\d+)\s*\|\s*([^|]+?)\s*\|\s*(\w+)\s*\n"
            r"\*\*Claim:\*\*\s*(.+?)\n"
            r"\*\*Source 1:\*\*\s*\[([^\]]+)\]\(([^)]+)\)\s*[—–-]?\s*(\w+)?",
            text, re.S
        ):
            cat_id = int(m.group(1))
            tile_no = int(m.group(2))
            classification = m.group(4).strip().upper()
            claim = m.group(5).strip().replace("\n", " ")
            src_title = m.group(6).strip()
            src_url = m.group(7).strip()
            tiles.setdefault(cat_id, []).append({
                "tile": tile_no,
                "type": classification,  # FACT / PRACTICE / MISTAKE
                "claim": claim,
                "src_title": src_title,
                "src_url": src_url,
            })
    return tiles


def first_sentence(text: str) -> str:
    if not text:
        return ""
    # split on first period followed by a space and capital
    m = re.match(r"^(.+?[.!?])(?:\s+[A-Z]|$)", text)
    return m.group(1).strip() if m else text.strip()


def trim(s: str, n: int) -> str:
    if not s:
        return ""
    if len(s) <= n:
        return s
    return s[: n - 1].rstrip() + "…"


def short_label(s: str, max_words: int = 3) -> str:
    """Distill a key fact into a 2-3 word label (use the leading clause before colon if any)."""
    head = s.split(":")[0].strip() if ":" in s[:80] else s
    head = re.sub(r"[\(\)\[\]]", "", head)
    words = head.split()[:max_words]
    return " ".join(words).rstrip(",.;-") or "Reference"


def upper_tag(s: str) -> str:
    """Build a short uppercase tag from the leading clause."""
    head = s.split(":")[0] if ":" in s[:80] else s
    head = re.sub(r"[^A-Za-z &/\-]", "", head)
    words = head.split()[:3]
    return " ".join(w.upper() for w in words) or "REFERENCE"


def render_card(tile: dict) -> str:
    chip = tile["type"]  # FACT / PRACTICE / MISTAKE
    title = trim(tile["src_title"], 70)
    domain = domain_label(tile["src_url"])
    quote = trim(tile["claim"], 200)
    why_map = {
        "FACT": "Anchors the standard practice for this category.",
        "PRACTICE": "Operational playbook — what to actually do.",
        "MISTAKE": "Failure mode to avoid before signing or shipping.",
    }
    why = why_map.get(chip, "Reference for this category.")
    return (
        '<article class="result-card">\n'
        f'  <span class="topic-chip">{html_escape(chip)}</span>\n'
        f'  <h3>{html_escape(title)}</h3>\n'
        f'  <div class="result-meta"><span>{html_escape(domain)}</span><span class="dot"></span><span>2026</span></div>\n'
        f'  <p class="result-quote">"{html_escape(quote)}"</p>\n'
        f'  <p class="result-why"><strong>Why relevant</strong>{html_escape(why)}</p>\n'
        f'  <a class="result-source" href="{html_escape(tile["src_url"])}" target="_blank" rel="noopener">↗ source</a>\n'
        "</article>"
    )


def render_cards_block(tiles: list[dict], cap: int) -> str:
    if not tiles:
        return '<div class="placeholder">No sourced tiles in this layer yet.</div>'
    return "\n".join(render_card(t) for t in tiles[:cap])


def render_outline(cat: dict) -> str:
    items: list[str] = []
    for kf in cat["keyFacts"][:4]:
        title = short_label(kf, 4) or "Key Fact"
        body = trim(kf, 240)
        items.append(
            f"      <li><strong>{html_escape(title)}</strong>{html_escape(body)}</li>"
        )
    for cm in cat["commonMistakes"][:3]:
        title = "Avoid: " + short_label(cm, 4)
        body = trim(cm, 240)
        items.append(
            f"      <li><strong>{html_escape(title)}</strong>{html_escape(body)}</li>"
        )
    return "\n".join(items)


def render_dialog_bullets(claims: list[str]) -> str:
    if not claims:
        return "<li>Reference material drawn from the music industry base.</li>"
    return "\n      ".join(f"<li>{html_escape(trim(c, 180))}</li>" for c in claims[:4])


def build_page(cat: dict, tiles: list[dict], template: str) -> str:
    cid = cat["id"]
    title = cat["title"]
    summary = cat["summary"]
    key_facts = cat["keyFacts"]
    practice = cat["standardPractice"]

    # Examples — top 3 keyFacts
    ex_blurbs = [(key_facts[i] if i < len(key_facts) else "") for i in range(3)]

    # Buckets for research cards
    by_layer: dict[str, list[dict]] = {"academic": [], "mainstream": [], "blogs": []}
    for t in tiles:
        by_layer[classify(t["src_url"])].append(t)

    # Dialog bullets — pick claims relevant to the same general theme as each example
    # Use 3-4 tiles chunked across the 3 example dialogs
    bucket_for_dialog = tiles[:12]
    chunks = [bucket_for_dialog[i:i + 4] for i in range(0, 12, 4)] or [[], [], []]
    while len(chunks) < 3:
        chunks.append([])

    fields = {
        "TITLE_TAG": f"Cat {cid} — {title}",
        "EYEBROW": f"Cat {cid} · Music Business Education",
        "PAGE_TITLE": title,
        "PAGE_SUBTITLE": first_sentence(summary),
        "REGISTER_BTN_HREF": "#sources",
        "REGISTER_BTN_TEXT": "Open Source Bank",
        "EX_SECTION_HEADLINE": "Key Concepts — Reference Points",
        "EX_SECTION_META": "click any tile to open spec",
        "EX1_NAME": short_label(ex_blurbs[0], 3) if ex_blurbs[0] else "Concept 1",
        "EX1_TAG": upper_tag(ex_blurbs[0]) if ex_blurbs[0] else "REFERENCE",
        "EX1_BLURB": trim(ex_blurbs[0], 220),
        "EX1_DIALOG_TAG": "Reference · Key Fact",
        "EX1_DIALOG_HEADLINE": "Why this matters",
        "EX1_DIALOG_BODY": trim(ex_blurbs[0] + " " + first_sentence(practice), 600),
        "EX1_DIALOG_BULLETS": render_dialog_bullets([t["claim"] for t in chunks[0]]),
        "EX2_NAME": short_label(ex_blurbs[1], 3) if ex_blurbs[1] else "Concept 2",
        "EX2_TAG": upper_tag(ex_blurbs[1]) if ex_blurbs[1] else "REFERENCE",
        "EX2_BLURB": trim(ex_blurbs[1], 220),
        "EX2_DIALOG_TAG": "Reference · Key Fact",
        "EX2_DIALOG_HEADLINE": "Why this matters",
        "EX2_DIALOG_BODY": trim(ex_blurbs[1] + " " + first_sentence(practice), 600),
        "EX2_DIALOG_BULLETS": render_dialog_bullets([t["claim"] for t in chunks[1]]),
        "EX3_NAME": short_label(ex_blurbs[2], 3) if ex_blurbs[2] else "Concept 3",
        "EX3_TAG": upper_tag(ex_blurbs[2]) if ex_blurbs[2] else "REFERENCE",
        "EX3_BLURB": trim(ex_blurbs[2], 220),
        "EX3_DIALOG_TAG": "Reference · Key Fact",
        "EX3_DIALOG_HEADLINE": "Why this matters",
        "EX3_DIALOG_BODY": trim(ex_blurbs[2] + " " + first_sentence(practice), 600),
        "EX3_DIALOG_BULLETS": render_dialog_bullets([t["claim"] for t in chunks[2]]),
        "ACADEMIC_HEADLINE": "Academic Layer — Peer & Standards",
        "ACADEMIC_META": "scholarly + standards-body sourcing",
        "ACADEMIC_CARDS_HTML": render_cards_block(by_layer["academic"], 4),
        "MAINSTREAM_HEADLINE": "Mainstream Layer — Trade & Press",
        "MAINSTREAM_META": "Billboard · MBW · Variety · Hypebot",
        "MAINSTREAM_CARDS_HTML": render_cards_block(by_layer["mainstream"], 4),
        "BLOGS_HEADLINE": "Blogs Layer — Operator Notes",
        "BLOGS_META": "first-person workflows + practitioner deep dives",
        "BLOGS_CARDS_HTML": render_cards_block(by_layer["blogs"], 6),
        "OUTLINE_HEADLINE": "What an artist walks away with",
        "OUTLINE_META": "core takeaways",
        "OUTLINE_ITEMS_HTML": render_outline(cat),
    }

    out = template
    for k, v in fields.items():
        out = out.replace("{{" + k + "}}", v)
    return out


def main() -> int:
    template = read_text_long(TEMPLATE_PATH)
    cats: dict[int, dict] = {}
    cats.update(parse_cats_file(CATS_1_13))
    cats.update(parse_cats_file(CATS_14_26))
    tiles_by_cat = parse_sources_batches()

    ensure_dir_long(OUT_DIR)
    written: list[tuple[int, str, int]] = []
    missing: list[int] = []
    for n in range(1, 27):
        cat = cats.get(n)
        if not cat:
            missing.append(n)
            continue
        tiles = tiles_by_cat.get(n, [])
        page = build_page(cat, tiles, template)
        # Sanity: no leftover {{ }}
        if "{{" in page:
            print(f"⚠ cat-{n}: leftover merge fields detected")
        out_file = OUT_DIR / f"cat-{n}.html"
        write_text_long(out_file, page)
        written.append((n, cat["title"], len(tiles)))

    for n, title, ntiles in written:
        print(f"✓ cat-{n:>2}.html — {title} — {ntiles} sourced tiles")
    if missing:
        print(f"✗ missing cats: {missing}")
    print(f"DONE — {len(written)}/26 pages written to {OUT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
