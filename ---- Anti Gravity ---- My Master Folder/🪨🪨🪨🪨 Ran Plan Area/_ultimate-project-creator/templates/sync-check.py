#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sync-check.py — Phase -1 LOAD UP sync for /ultimate-project-creator.

Reads three candidate sources (c-yesterday cache, chads-dreams board,
recent-session detection stub), reads the existing jobs[] block inside
the big UFM dashboard HTML, then 4-key diffs to surface net-new
candidates that are NOT yet on the board.

READ ONLY — never mutates any source file.

Output: JSON on stdout. Errors/diagnostics on stderr.

Usage:
    python sync-check.py

Planned flags (not wired on first pass):
    --dry-run
    --source yesterday-only

Exit codes:
    0 — ran to completion (even if some sources failed; see errors[])
    2 — totally unrecoverable (e.g. cannot write JSON to stdout)
"""

import io
import json
import os
import re
import sys
import traceback

# Force stdout/stderr to UTF-8 so emoji-laden JSON doesn't crash on cp1252 Windows.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")
    except Exception:
        pass

# -----------------------------------------------------------------------------
# Constants
# -----------------------------------------------------------------------------
UFM_ROOT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager"

# Primary dashboard path is the misspelled one per skill convention.
# Fall back to the correctly-spelled name if that is what is on disk.
DASHBOARD_CANDIDATES = [
    os.path.join(UFM_ROOT, "the big dashboard.html"),
    os.path.join(UFM_ROOT, "the big dashboard.html"),
]

C_YESTERDAY_JOBDETECT_BUCKET = (
    r"C:\Users\chad\.claude\projects\C--Users-chad\memory\perout"
    r"\bucket-c-yesterday-jobdetect.md"
)

BOARD_STACK_CANDIDATES = [
    r"C:\Users\chad\.claude\projects\C--Users-chad\memory\board-stack-jobs.md",
    r"C:\Users\chad\.claude\skills\c-chads-dreams\memory\board-stack-jobs.md",
]


# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------
def norm_name(raw: str) -> str:
    """Lowercase, strip punctuation/emoji noise, collapse whitespace."""
    if not raw:
        return ""
    s = raw.lower()
    # Strip common status markers and list numbering
    s = re.sub(r"^[\s\d\.\)✅🟢🟡🔴🟠⚡📌→]+", " ", s)
    # Remove anything in parens
    s = re.sub(r"\([^)]*\)", " ", s)
    # Strip non-alphanum (keep spaces)
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    # Collapse whitespace
    s = re.sub(r"\s+", " ", s).strip()
    return s


def slugify(raw: str) -> str:
    """Fallback slug maker when a source doesn't carry one explicitly."""
    n = norm_name(raw)
    return re.sub(r"\s+", "-", n)[:60]


def norm_slug(raw: str) -> str:
    """Canonical dash-form slug normalizer used for cross-source comparison.

    Rules (identical shape for any input — slug OR display name):
      - lowercase
      - collapse internal whitespace to single space
      - strip leading/trailing whitespace
      - replace spaces with dashes
      - strip leading/trailing punctuation (dashes, dots, etc.)
      - strip non-alphanumeric (except dashes) — kills emoji and punctuation
      - collapse runs of dashes
    So "Scout Troop App", "scout troop app", and "scout-troop-app" all
    normalize to "scout-troop-app".
    """
    if not raw:
        return ""
    s = raw.lower()
    # Strip common status markers and list numbering at the head
    s = re.sub(r"^[\s\d\.\)✅🟢🟡🔴🟠⚡📌→]+", " ", s)
    # Remove anything in parens
    s = re.sub(r"\([^)]*\)", " ", s)
    # Keep only lowercase alphanum, spaces, and dashes — everything else (emoji,
    # punctuation, em-dash, curly quotes) becomes a space
    s = re.sub(r"[^a-z0-9 \-]+", " ", s)
    # Collapse whitespace
    s = re.sub(r"\s+", " ", s).strip()
    # Replace internal spaces with dashes
    s = s.replace(" ", "-")
    # Collapse runs of dashes and trim leading/trailing dashes
    s = re.sub(r"-+", "-", s).strip("-")
    return s


def extract_uuid(text: str):
    """Find the first UUID-looking token in text, or None."""
    if not text:
        return None
    m = re.search(
        r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
        text,
        re.IGNORECASE,
    )
    return m.group(0) if m else None


def extract_date(text: str):
    """Find a short M/D or YYYY-MM-DD date token, or None."""
    if not text:
        return None
    m = re.search(r"\b(\d{4}-\d{2}-\d{2})\b", text)
    if m:
        return m.group(1)
    m = re.search(r"\b(\d{1,2}/\d{1,2})\b", text)
    if m:
        return m.group(1)
    return None


# -----------------------------------------------------------------------------
# Source 1 — c-yesterday CACHED QAL
# -----------------------------------------------------------------------------
def _read(path):
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            return f.read()
    except OSError:
        return None


def resolve_yesterday_support_md(errors):
    """Read the jobdetect bucket md and pull the support-md path it references."""
    body = _read(C_YESTERDAY_JOBDETECT_BUCKET)
    if body is None:
        errors.append(f"yesterday: jobdetect bucket not readable: {C_YESTERDAY_JOBDETECT_BUCKET}")
        return None

    # Look for a Windows-style path ending in c-yesterday-support.md
    m = re.search(
        r"([A-Z]:\\[^\s`'\"]+c-yesterday-support\.md)",
        body,
        re.IGNORECASE,
    )
    if m:
        return m.group(1)

    # Fallback: known canonical location
    guess = (
        r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database"
        r"\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨"
        r"\skill-support-md\c-yesterday-support.md"
    )
    if os.path.isfile(guess):
        return guess
    errors.append("yesterday: could not resolve c-yesterday-support.md path")
    return None


def parse_yesterday_jobs(errors):
    """Return list[dict] from pinned rows + grid + QAL rows of the support md."""
    support_path = resolve_yesterday_support_md(errors)
    if not support_path:
        return []
    body = _read(support_path)
    if body is None:
        errors.append(f"yesterday: unreadable support md {support_path}")
        return []

    out = []
    seen_keys = set()

    # Carve the file into sections by ANY heading or horizontal rule so a
    # `## CACHED QAL` section doesn't accidentally swallow prose that lives
    # under a following `# HOW...` single-hash heading.
    section_boundary_pat = re.compile(r"^(#{1,6}\s+.*|-{3,}\s*)$", re.MULTILINE)
    boundary_matches = list(section_boundary_pat.finditer(body))
    boundaries = [m.start() for m in boundary_matches] + [len(body)]
    sections = []
    for i in range(len(boundary_matches)):
        start = boundary_matches[i].start()
        end = boundaries[i + 1]
        chunk = body[start:end]
        first_line = chunk.splitlines()[0] if chunk else ""
        sections.append((first_line, chunk))

    # Only H2 headings whose name contains these tokens
    keep_markers = ("PINNED", "CACHED QAL")

    for heading, chunk in sections:
        if not heading.startswith("##"):
            continue
        heading_up = heading.upper()
        if not any(k in heading_up for k in keep_markers):
            continue
        in_fence = False
        for line in chunk.splitlines()[1:]:
            stripped = line.strip()
            # Toggle fenced code blocks; skip their contents entirely
            if stripped.startswith("```"):
                in_fence = not in_fence
                continue
            if in_fence:
                continue
            if not stripped or stripped.startswith("#"):
                continue
            # Skip obvious table separators and markup-only lines
            if set(stripped) <= set("-|:= "):
                continue
            # Strip ASCII box-drawing vertical bars that wrap CACHED QAL rows.
            # Real QAL rows look like: "│ 📌 VR speed dating app 🟡  ... │"
            if stripped.startswith("│") or stripped.startswith("┃"):
                stripped = stripped.strip("│┃").strip()
                if not stripped or set(stripped) <= set("─━-= "):
                    continue

            # Require a pinned marker (📌 / ✨) OR a markdown row shape.
            # Plain `- Foo` bullets are REJECTED because this md contains lots
            # of `- **Foo:**` prose bullets that aren't jobs.
            if not re.match(r"^(📌|✨|🟢|🟡|🔴|🟠|⚡|\||\d+\.\s+📌|\d+\.\s+✨)", stripped):
                continue
            # Must contain at least one letter to count as a job row
            if not re.search(r"[A-Za-z]", stripped):
                continue

            name = _extract_row_name(stripped)
            if not name:
                continue
            # Skip meta rows that are obviously instructions/prose, not job names
            if re.search(r"^(STEP|GOTO|ELSE|OR|IF|WHEN|EXPECTED|NOTE):", name, re.IGNORECASE):
                continue
            # Skip all-caps prose lines longer than 6 words (likely instructions)
            if name == name.upper() and len(name.split()) > 6:
                continue
            slug = _extract_row_slug(stripped) or slugify(name)
            if not slug:
                continue
            key = norm_name(name)
            if not key or key in seen_keys:
                continue
            seen_keys.add(key)
            out.append({
                "slug": slug,
                "name": name,
                "date": extract_date(stripped),
                "uuid": extract_uuid(stripped),
                "source": "yesterday",
            })

    return out


def _extract_row_name(line: str) -> str:
    """Pull a display name out of a table/row/bullet/QAL line."""
    s = line.strip()
    # Markdown table row: leading and trailing pipes
    if s.startswith("|") and s.count("|") >= 2:
        cells = [c.strip() for c in s.strip("|").split("|")]
        # First non-empty cell that isn't just emoji/status
        for c in cells:
            if c and norm_name(c):
                return c
        return ""
    # Strip leading markers (bullets, numbers, status emoji)
    s = re.sub(r"^[\s\*\-\+\d\.\)✅🟢🟡🔴🟠⚡📌→✨]+", "", s).strip()
    # Chop common tails
    s = s.split("→")[0].strip()
    s = s.split("  |")[0].strip()
    # CACHED QAL rows: trailing "stat  id8…  claude --..." columns, big
    # whitespace gap before them. Cut before any "claude --" token.
    s = re.split(r"\s+claude\s+--", s)[0].strip()
    # Or before a long run of whitespace followed by a status emoji column
    s = re.split(r"\s{2,}(?:[✅🟢🟡🔴🟠⚡]|new\b)", s)[0].strip()
    # Drop trailing emoji/dots
    s = re.sub(r"[\s✅🟢🟡🔴🟠⚡📌✨…·]+$", "", s).strip()
    return s


def _extract_row_slug(line: str) -> str:
    """Look for an explicit slug token (slug: foo-bar) in a row."""
    m = re.search(r"slug\s*[:=]\s*([a-z0-9\-]+)", line, re.IGNORECASE)
    return m.group(1) if m else ""


# -----------------------------------------------------------------------------
# Source 2 — chads-dreams board
# -----------------------------------------------------------------------------
def parse_board_stack_jobs(errors):
    """Parse memory/board-stack-jobs.md into a list of job dicts."""
    path = None
    for cand in BOARD_STACK_CANDIDATES:
        if os.path.isfile(cand):
            path = cand
            break
    if path is None:
        errors.append(
            "board: board-stack-jobs.md not found at either candidate location"
        )
        return []

    body = _read(path)
    if body is None:
        errors.append(f"board: unreadable {path}")
        return []

    out = []
    seen_keys = set()
    for raw_line in body.splitlines():
        stripped = raw_line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        # Numbered or bulleted list rows only
        m = re.match(r"^(?:\d+\.|\*|\-|\+)\s+(.+)$", stripped)
        if not m:
            continue
        payload = m.group(1).strip()
        # Strip leading status emoji / markers
        name = re.sub(r"^[✅🟢🟡🔴🟠⚡📌→\s]+", "", payload)
        # Cut off sub-annotations after a " — " or " - " that look like URLs
        # but keep the primary name.
        name = name.split("  |")[0].strip()
        # Remove everything after an URL so name stays clean
        name = re.split(r"\s+https?://", name)[0].strip()
        if not name:
            continue
        key = norm_name(name)
        if not key or key in seen_keys:
            continue
        seen_keys.add(key)
        out.append({
            "slug": slugify(name),
            "name": name,
            "date": extract_date(payload),
            "uuid": extract_uuid(payload),
            "source": "board",
        })
    return out


# -----------------------------------------------------------------------------
# Source 3 — recent session detection (stub for now)
# -----------------------------------------------------------------------------
def parse_recent_sessions(errors):
    # TODO: scan ~/.claude/projects/C--Users-chad/*.jsonl for new job signals
    #       matching the c-yesterday jobdetect trigger phrase list.
    return []


# -----------------------------------------------------------------------------
# Existing board state — parse jobs[] out of the dashboard HTML
# -----------------------------------------------------------------------------
def parse_dashboard_jobs(errors):
    """Read the dashboard HTML and extract all {slug, name, uuid?, date?} entries.

    Detection strategy:
      1. Find the first `const jobsByWeek = { ... };` block with brace-balance.
      2. Also grab the `const weeks = [ ... ];` block to attach a date per job.
      3. Extract object literals of the form `{ slug: '...', name: '...', ... }`.
      4. If `jobsByWeek` isn't present, fall back to any `jobs = [ ... ]`
         or `const jobs = [ ... ]` literal.
    """
    dash_path = None
    for cand in DASHBOARD_CANDIDATES:
        if os.path.isfile(cand):
            dash_path = cand
            break
    if dash_path is None:
        errors.append(
            "dashboard: the big dashboard.html (or the big dashboard.html) not found"
        )
        return []

    body = _read(dash_path)
    if body is None:
        errors.append(f"dashboard: unreadable {dash_path}")
        return []

    jobs_by_week = _extract_balanced_block(body, r"const\s+jobsByWeek\s*=\s*", "{", "}")
    weeks_block = _extract_balanced_block(body, r"const\s+weeks\s*=\s*", "[", "]")
    flat_jobs_block = _extract_balanced_block(body, r"(?:const\s+)?jobs\s*=\s*", "[", "]")

    results = []
    seen_slugs = set()

    def push(entry):
        slug = entry.get("slug")
        if not slug or slug in seen_slugs:
            return
        seen_slugs.add(slug)
        results.append(entry)

    # Map from YYYY-MM-DD → short M/D label
    date_to_short = {}
    if weeks_block:
        for dm in re.finditer(
            r"date\s*:\s*['\"]([\d\-]+)['\"]", weeks_block
        ):
            iso = dm.group(1)
            parts = iso.split("-")
            if len(parts) == 3:
                try:
                    date_to_short[iso] = f"{int(parts[1])}/{int(parts[2])}"
                except ValueError:
                    pass

    # jobsByWeek: { 'YYYY-MM-DD': [ {slug:'..', name:'..'}, ... ] }
    if jobs_by_week:
        for km in re.finditer(
            r"['\"]?(\d{4}-\d{2}-\d{2})['\"]?\s*:\s*\[",
            jobs_by_week,
        ):
            iso = km.group(1)
            arr_start = km.end()
            arr_body = _extract_balanced(jobs_by_week, arr_start - 1, "[", "]")
            if not arr_body:
                continue
            for obj in _iter_object_literals(arr_body):
                slug = _get_string(obj, "slug")
                name = _get_string(obj, "name") or slug
                if not slug:
                    continue
                push({
                    "slug": slug,
                    "name": name,
                    "date": date_to_short.get(iso, iso),
                    "uuid": _get_string(obj, "uuid"),
                    "source": "dashboard",
                })

    # Flat jobs array fallback
    if flat_jobs_block and not results:
        for obj in _iter_object_literals(flat_jobs_block):
            slug = _get_string(obj, "slug")
            name = _get_string(obj, "name") or slug
            if not slug:
                continue
            push({
                "slug": slug,
                "name": name,
                "date": _get_string(obj, "date"),
                "uuid": _get_string(obj, "uuid"),
                "source": "dashboard",
            })

    return results


def _extract_balanced_block(body, prefix_re, open_ch, close_ch):
    m = re.search(prefix_re, body)
    if not m:
        return None
    # Find the opener
    i = body.find(open_ch, m.end())
    if i < 0:
        return None
    return _extract_balanced(body, i, open_ch, close_ch)


def _extract_balanced(body, start_idx, open_ch, close_ch):
    depth = 0
    in_str = False
    str_ch = ""
    escape = False
    for i in range(start_idx, len(body)):
        c = body[i]
        if escape:
            escape = False
            continue
        if in_str:
            if c == "\\":
                escape = True
            elif c == str_ch:
                in_str = False
            continue
        if c in ("'", '"', "`"):
            in_str = True
            str_ch = c
            continue
        if c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return body[start_idx + 1 : i]
    return None


def _iter_object_literals(body):
    """Yield inner text of each top-level `{ ... }` literal inside body."""
    i = 0
    while i < len(body):
        c = body[i]
        if c == "{":
            inner = _extract_balanced(body, i, "{", "}")
            if inner is None:
                return
            yield inner
            # advance past this object
            i += len(inner) + 2
        else:
            i += 1


def _get_string(obj_body, key):
    m = re.search(
        rf"['\"]?{re.escape(key)}['\"]?\s*:\s*['\"]([^'\"]*)['\"]",
        obj_body,
    )
    return m.group(1) if m else None


# -----------------------------------------------------------------------------
# 4-key diff
# -----------------------------------------------------------------------------
def diff(candidates, on_board):
    """Return (new_candidates, skipped). Skip if ANY of 4 keys match.

    All slug/name comparisons go through norm_slug() so space-vs-dash,
    casing, emoji, and punctuation differences between sources and the
    dashboard can never produce a false "new" candidate.
    """
    # Build lookup tables from on_board using normalized keys
    board_norm_slugs = {
        norm_slug(b.get("slug", "")) for b in on_board if b.get("slug")
    }
    board_norm_slugs.discard("")
    # Name → same canonical dash form as slug so they share a namespace
    board_norm_names = {
        norm_slug(b.get("name", "")) for b in on_board if b.get("name")
    }
    board_norm_names.discard("")
    board_uuids = {b["uuid"] for b in on_board if b.get("uuid")}
    board_date_slugs = {
        (b.get("date"), norm_slug(b.get("slug", "")))
        for b in on_board
        if b.get("date") and b.get("slug")
    }

    new_list = []
    skipped = []
    seen_cand_slugs = set()

    for c in candidates:
        slug = c.get("slug") or ""
        if not slug:
            continue
        cand_nslug = norm_slug(slug)
        if cand_nslug in seen_cand_slugs:
            # De-dupe within candidate pool itself
            continue
        seen_cand_slugs.add(cand_nslug)

        # (a) normalized slug (covers case, spaces, dashes, emoji, punct)
        if cand_nslug and cand_nslug in board_norm_slugs:
            skipped.append({"slug": slug, "reason": "exact_slug"})
            continue
        # (b) normalized name — same canonical dash form
        cand_nname = norm_slug(c.get("name", ""))
        if cand_nname and (
            cand_nname in board_norm_names or cand_nname in board_norm_slugs
        ):
            skipped.append({"slug": slug, "reason": "normalized_name"})
            continue
        # (c) uuid
        if c.get("uuid") and c["uuid"] in board_uuids:
            skipped.append({"slug": slug, "reason": "uuid_match"})
            continue
        # (d) date + normalized slug
        if (c.get("date"), cand_nslug) in board_date_slugs:
            skipped.append({"slug": slug, "reason": "date_plus_slug"})
            continue

        new_list.append(c)

    return new_list, skipped


# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------
def main() -> int:
    errors = []
    sources_checked = []

    try:
        yesterday = parse_yesterday_jobs(errors)
        sources_checked.append("yesterday")
    except Exception as exc:  # noqa: BLE001 — keep going
        errors.append(f"yesterday: unhandled {exc}")
        yesterday = []

    try:
        board = parse_board_stack_jobs(errors)
        sources_checked.append("board")
    except Exception as exc:  # noqa: BLE001
        errors.append(f"board: unhandled {exc}")
        board = []

    try:
        sessions = parse_recent_sessions(errors)
        # Stub — don't advertise as "checked" yet
    except Exception as exc:  # noqa: BLE001
        errors.append(f"sessions: unhandled {exc}")
        sessions = []

    try:
        on_board = parse_dashboard_jobs(errors)
    except Exception as exc:  # noqa: BLE001
        errors.append(f"dashboard: unhandled {exc}")
        on_board = []

    candidate_pool = yesterday + board + sessions
    new_candidates, skipped = diff(candidate_pool, on_board)

    result = {
        "new_candidates": new_candidates,
        "skipped_already_on_board": skipped,
        "sources_checked": sources_checked,
        "errors": errors,
    }

    try:
        json.dump(result, sys.stdout, indent=2, ensure_ascii=False)
        sys.stdout.write("\n")
    except OSError as exc:
        print(f"FATAL: could not write JSON to stdout: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        # Hard fallback so stdout still parses as JSON.
        traceback.print_exc(file=sys.stderr)
        json.dump(
            {
                "new_candidates": [],
                "skipped_already_on_board": [],
                "sources_checked": [],
                "errors": ["fatal: unhandled exception (see stderr)"],
            },
            sys.stdout,
        )
        sys.stdout.write("\n")
        sys.exit(0)
