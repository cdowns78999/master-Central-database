"""Build 10 Elijah step pages from the step-page template + music industry base.

Run from inside the "music industry base" folder.
"""
from __future__ import annotations
import os
import re
import sys
from pathlib import Path
from html import escape as html_escape

SCRIPT_DIR = Path(".").resolve()
TEMPLATE_PATH = Path("templates") / "step-page.template.html"
CATS_1_13 = Path("research") / "cats-1-13.js"
CATS_14_26 = Path("research") / "cats-14-26.js"
SOURCES_BATCH_DIR = Path("research")
OUT_DIR = Path("..") / "elijah" / "pages"


# ── Long-path helpers (same pattern as build-26.py) ────────────────
def _ext(p) -> str:
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
        try:
            os.makedirs(_ext(path), exist_ok=True)
        except OSError:
            os.makedirs(str(path), exist_ok=True)


# ── Parsers (same as build-26.py) ──────────────────────────────────
def parse_array_of_strings(block: str, key: str) -> list[str]:
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


def parse_cats_file(path: Path) -> dict[int, dict]:
    text = read_text_long(path)
    cats: dict[int, dict] = {}
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
        }
    return cats


def parse_sources_batches() -> dict[int, list[dict]]:
    tiles: dict[int, list[dict]] = {}
    for batch in sorted(SOURCES_BATCH_DIR.glob("sources-batch-*.md")):
        text = read_text_long(batch)
        for m in re.finditer(
            r"###\s+CAT-(\d+)-TILE-(\d+)\s*\|\s*([^|]+?)\s*\|\s*(\w+)\s*\n"
            r"\*\*Claim:\*\*\s*(.+?)\n"
            r"\*\*Source 1:\*\*\s*\[([^\]]+)\]\(([^)]+)\)",
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
                "type": classification,
                "claim": claim,
                "src_title": src_title,
                "src_url": src_url,
            })
    return tiles


# ── Step definitions ───────────────────────────────────────────────
STEP_MAP = [
    {"n": 1,  "title": "Branding 101",                  "cats": [9],         "letter": "B",
     "tagline": "Identity before aesthetics", "rail_label": "1 · Branding"},
    {"n": 2,  "title": "Recording 101",                 "cats": [18, 19],    "letter": "R",
     "tagline": "Make the music sound real", "rail_label": "2 · Recording"},
    {"n": 3,  "title": "Distribution 101",              "cats": [5],         "letter": "D",
     "tagline": "Get songs onto every platform", "rail_label": "3 · Distribution"},
    {"n": 4,  "title": "Streaming 101",                 "cats": [1],         "letter": "S",
     "tagline": "How DSPs actually pay", "rail_label": "4 · Streaming"},
    {"n": 5,  "title": "Royalties 101",                 "cats": [3],         "letter": "R",
     "tagline": "Two royalty streams in every song", "rail_label": "5 · Royalties"},
    {"n": 6,  "title": "Publishing 101",                "cats": [6],         "letter": "P",
     "tagline": "Protect + monetize the song itself", "rail_label": "6 · Publishing"},
    {"n": 7,  "title": "Social Media 101",              "cats": [2],         "letter": "S",
     "tagline": "Build the audience that's truly yours", "rail_label": "7 · Social Media"},
    {"n": 8,  "title": "Live Performance 101",          "cats": [13],        "letter": "L",
     "tagline": "Shows · merch · road life", "rail_label": "8 · Live Performance"},
    {"n": 9,  "title": "Building Your Team",            "cats": [24],        "letter": "T",
     "tagline": "Manager · agent · attorney · producer", "rail_label": "9 · Building Your Team"},
    {"n": 10, "title": "Where do we go from here?",     "cats": [],          "letter": "→",
     "tagline": "Pick your spike — money / story / global", "rail_label": "10 · Where Next?"},
]


def trim(s: str, n: int) -> str:
    if not s:
        return ""
    if len(s) <= n:
        return s
    return s[: n - 1].rstrip() + "…"


def first_sentence(text: str) -> str:
    if not text:
        return ""
    m = re.match(r"^(.+?[.!?])(?:\s+[A-Z]|$)", text)
    return m.group(1).strip() if m else text.strip()


def domain_label(url: str) -> str:
    m = re.search(r"https?://(?:www\.)?([^/]+)/", url + "/")
    if not m:
        return "source"
    parts = m.group(1).split(".")
    if len(parts) >= 2:
        return parts[-2].capitalize()
    return parts[0]


def render_card(chip: str, title: str, claim: str, url: str) -> str:
    return (
        '<article class="card">\n'
        f'  <span class="chip">{html_escape(chip)}</span>\n'
        f'  <h3>{html_escape(trim(title, 80))}</h3>\n'
        f'  <div class="meta"><span>{html_escape(domain_label(url))}</span><span class="dot"></span><span>2026</span></div>\n'
        f'  <p class="quote">"{html_escape(trim(claim, 220))}"</p>\n'
        f'  <a class="source" href="{html_escape(url)}" target="_blank" rel="noopener">↗ source</a>\n'
        "</article>"
    )


def render_text_card(chip: str, title: str, body: str, link_text: str = "", link_href: str = "") -> str:
    link = ""
    if link_text and link_href:
        link = f'  <a class="source" href="{html_escape(link_href)}">{html_escape(link_text)}</a>\n'
    return (
        '<article class="card">\n'
        f'  <span class="chip">{html_escape(chip)}</span>\n'
        f'  <h3>{html_escape(title)}</h3>\n'
        f'  <p class="quote">{html_escape(body)}</p>\n'
        f'{link}'
        "</article>"
    )


def render_steps_rail(current_n: int) -> str:
    rows = []
    for s in STEP_MAP:
        cls = ' class="current"' if s["n"] == current_n else ""
        href = f'step-{s["n"]}.html'
        rows.append(
            f'        <a{cls} href="{href}"><span class="ico">✦</span><span>{html_escape(s["rail_label"])}</span></a>'
        )
    return "\n".join(rows)


def merge_cat_data(cats: list[dict]) -> dict:
    if not cats:
        return {}
    merged = {
        "title": " + ".join(c["title"] for c in cats),
        "summary": " ".join(c["summary"] for c in cats),
        "keyFacts": [],
        "standardPractice": " ".join(c["standardPractice"] for c in cats),
        "commonMistakes": [],
    }
    for c in cats:
        merged["keyFacts"].extend(c["keyFacts"])
        merged["commonMistakes"].extend(c["commonMistakes"])
    return merged


def build_step_page(step: dict, all_cats: dict, all_tiles: dict, template: str) -> str:
    n = step["n"]
    cat_objs = [all_cats[cid] for cid in step["cats"] if cid in all_cats]
    cat = merge_cat_data(cat_objs) if cat_objs else {}

    tiles: list[dict] = []
    for cid in step["cats"]:
        tiles.extend(all_tiles.get(cid, []))

    # Bio: take first 2 sentences from cat summary (or step-10 special)
    bio = ""
    if cat:
        summary = cat["summary"]
        sentences = re.split(r"(?<=[.!?])\s+(?=[A-Z])", summary)
        bio = " ".join(sentences[:2]) if sentences else summary
    else:
        bio = (
            "Ten lessons in. Now you stand at a fork: every artist needs a primary "
            "spike — the one area you go deeper than anyone around you."
        )

    # Page subtitle: first sentence of summary, or step-10 wrap
    if cat:
        subtitle = first_sentence(cat["summary"]) or step["tagline"]
    else:
        subtitle = (
            "You've covered the foundations — branding, recording, distribution, streaming, "
            "royalties, publishing, social, live, and team. Pick your spike below and dig in."
        )

    # Tabs
    if cat:
        beginner_cards = [render_text_card("FACT", trim(kf.split(":")[0], 60) or "Key Fact", trim(kf, 240))
                          for kf in cat["keyFacts"][:5]]
        # Add tile-FACT cards
        for t in tiles:
            if t["type"] == "FACT" and len(beginner_cards) < 8:
                beginner_cards.append(render_card("FACT", t["src_title"], t["claim"], t["src_url"]))

        practice_cards: list[str] = []
        if cat["standardPractice"]:
            practice_cards.append(render_text_card(
                "PRACTICE",
                "How it actually works in 2026",
                trim(cat["standardPractice"], 360)
            ))
        for t in tiles:
            if t["type"] == "PRACTICE" and len(practice_cards) < 6:
                practice_cards.append(render_card("PRACTICE", t["src_title"], t["claim"], t["src_url"]))

        mistake_cards = [render_text_card("AVOID", "Common Mistake", trim(cm, 240))
                         for cm in cat["commonMistakes"][:5]]
        for t in tiles:
            if t["type"] == "MISTAKE" and len(mistake_cards) < 8:
                mistake_cards.append(render_card("MISTAKE", t["src_title"], t["claim"], t["src_url"]))
    else:
        # Step 10 — synthesis
        spikes = [
            ("Money", "Follow every dollar from listener to artist.", "../pages/cat-1.html"),
            ("Ownership", "What you own beats what you earn.", "../pages/cat-16.html"),
            ("Audience", "Real fans before chasing any deal.", "../pages/cat-9.html"),
            ("Operator", "Who does what in the industry machine.", "../pages/cat-8.html"),
            ("Global", "The world is multinational — your music is in it.", "../pages/cat-26.html"),
            ("Story", "People bond with the human, not the song.", "../pages/cat-9.html"),
            ("Legal", "Get the paperwork right; build on it.", "../pages/cat-15.html"),
            ("DIY", "Run a global business from a laptop.", "../pages/cat-5.html"),
            ("Touring", "Live performance is the foundation.", "../pages/cat-13.html"),
            ("Hybrid-Modern", "Independent + selective partners + AI + global.", "../pages/cat-25.html"),
        ]
        beginner_cards = [render_text_card("SPIKE", name, body, "Open relevant cat ↗", href)
                          for name, body, href in spikes]
        practice_cards = [
            render_text_card("PRACTICE", "Audit your weakest piece",
                             "The 9 prior steps cover the foundation. Walk through each step and ask: "
                             "where am I weakest? That's your next 90-day project.",
                             "Start over at Step 1 →", "step-1.html"),
            render_text_card("PRACTICE", "Pick one sub-spike",
                             "Don't try to master all 10 at once. Pick one spike from the list and go deep "
                             "for the next 6 months — depth in one area beats shallow across many.")
        ]
        mistake_cards = [
            render_text_card("AVOID", "Spreading too thin",
                             "Trying to master streaming + sync + touring + branding all at once "
                             "produces shallow results in every area."),
            render_text_card("AVOID", "Skipping the audit",
                             "The biggest career bottleneck is usually the area you're most uncomfortable "
                             "looking at — that's exactly where to start."),
            render_text_card("AVOID", "Confusing motion with progress",
                             "Posting daily, attending every event, and recording constantly without "
                             "a strategy is busy-ness, not building.")
        ]

    # Empty fallback
    if not beginner_cards: beginner_cards = ['<div class="empty">No beginner content yet.</div>']
    if not practice_cards: practice_cards = ['<div class="empty">No practice content yet.</div>']
    if not mistake_cards:  mistake_cards  = ['<div class="empty">No mistakes recorded yet.</div>']

    # Nav
    prev_n = n - 1 if n > 1 else 1
    next_n = n + 1 if n < 10 else 10
    nav_prev_href = f"step-{prev_n}.html" if n > 1 else "#"
    nav_next_href = f"step-{next_n}.html" if n < 10 else "#"
    nav_prev_disabled = "disabled" if n == 1 else ""
    nav_next_disabled = "disabled" if n == 10 else ""

    fields = {
        "TITLE_TAG":               f"Step {n} — {step['title']}",
        "STEP_NUM":                str(n),
        "STEP_NUM_PADDED":         f"{n:02d}",
        "STEP_TITLE":              step["title"],
        "STEP_TAGLINE":            step["tagline"],
        "STEP_AVATAR_LETTER":      step["letter"],
        "STEP_BIO":                trim(bio, 320),
        "STEPS_RAIL_HTML":         render_steps_rail(n),
        "EYEBROW":                 f"Step {n} of 10 · Music 101",
        "PAGE_TITLE":              step["title"],
        "PAGE_SUBTITLE":           subtitle,
        "TAB_BEGINNER_COUNT":      str(len(beginner_cards)),
        "TAB_PRACTICE_COUNT":      str(len(practice_cards)),
        "TAB_MISTAKE_COUNT":       str(len(mistake_cards)),
        "TAB_BEGINNER_CARDS_HTML": "\n".join(beginner_cards),
        "TAB_PRACTICE_CARDS_HTML": "\n".join(practice_cards),
        "TAB_MISTAKE_CARDS_HTML":  "\n".join(mistake_cards),
        "NAV_PREV_HREF":           nav_prev_href,
        "NAV_NEXT_HREF":           nav_next_href,
        "NAV_PREV_DISABLED":       nav_prev_disabled,
        "NAV_NEXT_DISABLED":       nav_next_disabled,
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
    for step in STEP_MAP:
        page = build_step_page(step, cats, tiles_by_cat, template)
        out_file = OUT_DIR / f"step-{step['n']}.html"
        write_text_long(out_file, page)
        print(f"✓ step-{step['n']:>2}.html — {step['title']}")
    print(f"DONE — 10/10 step pages written to {OUT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
