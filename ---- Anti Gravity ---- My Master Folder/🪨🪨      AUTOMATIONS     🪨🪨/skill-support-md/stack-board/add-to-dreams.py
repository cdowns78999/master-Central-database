#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
add-to-dreams.py — integrate /stack-board with /c-chads-dreams

Takes one arg: the new project's wrapper folder name
(e.g., "!! 2026-04-25 - vrchat translator").

Adds a row to memory/board-stack-jobs.md under [ Work Progress ]
with a sub-line note tagging it as /stack-board source + the
file:// URL of the project's index.html.

Idempotent: if the same project is already on the board, skip.

Stdlib only. UTF-8.
"""

import os
import re
import sys
from pathlib import Path
from urllib.request import pathname2url

BOARD_FILE = Path(
    r"C:\Users\chad\.claude\projects\C--Users-chad\memory\board-stack-jobs.md"
)

STACK_BOARD_BUCKET = Path(
    "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/"
    "---- Anti Gravity ---- My Master Folder/"
    "\U0001fab8 2026 Ultimate File Manager/"
    "-- Results folder master forever/"
    "Regular projects - 2/"
    "⭐ stack-board projects"
)

TARGET_SECTION = "[ Work Progress ]"
SOURCE_TAG = "/stack-board"


def parse_wrapper(wrapper_name: str):
    """Pull date + name out of '!! YYYY-MM-DD - words' (em-dash or hyphen)."""
    name = wrapper_name.strip()
    # Strip leading '!! ' crown if present
    if name.startswith("!! "):
        name = name[3:]
    # Match "YYYY-MM-DD <sep> rest"
    m = re.match(r"^(\d{4}-\d{2}-\d{2})\s*[-—–]\s*(.+?)\s*$", name)
    if not m:
        return None, None
    date_str = m.group(1)
    title = m.group(2).strip()
    return date_str, title


def build_file_url(wrapper_name: str) -> str:
    """Build file:// URL pointing at the wrapper's index.html."""
    index_path = STACK_BOARD_BUCKET / wrapper_name / "index.html"
    url_path = pathname2url(str(index_path))
    if url_path.startswith("///"):
        return "file:" + url_path
    return "file:///" + url_path.lstrip("/")


def extract_section(board_text: str, section_label: str):
    """Return the body text of '## [ Section Label ]' up to the next '## '."""
    pattern = re.compile(
        r"^##\s*" + re.escape(section_label) + r"\s*$",
        re.MULTILINE,
    )
    m = pattern.search(board_text)
    if not m:
        return None
    start = m.end()
    next_m = re.search(r"^##\s", board_text[start:], re.MULTILINE)
    if next_m:
        end = start + next_m.start()
    else:
        end = len(board_text)
    return board_text[start:end]


def already_on_board(board_text: str, title: str, file_url: str) -> bool:
    """Check if this project is already a row on the board."""
    if file_url in board_text:
        return True
    section = extract_section(board_text, TARGET_SECTION)
    if section is None:
        return False
    title_lower = title.lower()
    for line in section.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("→"):
            continue
        m = re.match(r"^\d+\.\s*(?:[⚡✅]\s*)?(.+?)\s*$", stripped)
        if m and m.group(1).lower() == title_lower:
            return True
    return False


def next_index_in_section(section_body: str) -> int:
    """Return next numeric index for a new row in this section."""
    nums = []
    for line in section_body.splitlines():
        m = re.match(r"^\s*(\d+)\.\s", line)
        if m:
            nums.append(int(m.group(1)))
    return (max(nums) + 1) if nums else 1


def insert_row(board_text: str, title: str, date_str: str, file_url: str) -> str:
    """Append a new numbered row + source sub-line to [ Work Progress ]."""
    section_body = extract_section(board_text, TARGET_SECTION)
    if section_body is None:
        new_section = (
            f"\n## {TARGET_SECTION}\n"
            f"1. {title}\n"
            f"   → Source: {SOURCE_TAG} ({date_str}) — {file_url}\n"
        )
        if not board_text.endswith("\n"):
            board_text += "\n"
        return board_text + new_section

    next_n = next_index_in_section(section_body)
    new_lines = (
        f"{next_n}. {title}\n"
        f"   → Source: {SOURCE_TAG} ({date_str}) — {file_url}\n"
    )

    section_start_pat = re.compile(
        r"^##\s*" + re.escape(TARGET_SECTION) + r"\s*$",
        re.MULTILINE,
    )
    m = section_start_pat.search(board_text)
    body_start = m.end()
    next_m = re.search(r"^##\s", board_text[body_start:], re.MULTILINE)
    if next_m:
        body_end = body_start + next_m.start()
    else:
        body_end = len(board_text)

    body = board_text[body_start:body_end]
    body_stripped = body.rstrip("\n")
    new_body = body_stripped + "\n" + new_lines
    if next_m:
        new_body += "\n"
    else:
        if not new_body.endswith("\n"):
            new_body += "\n"

    return board_text[:body_start] + new_body + board_text[body_end:]


def main():
    if len(sys.argv) != 2:
        print("usage: python add-to-dreams.py \"!! YYYY-MM-DD - project name\"")
        sys.exit(2)

    wrapper_name = sys.argv[1].strip()

    if not BOARD_FILE.exists():
        print(f"ERROR: board file not found at {BOARD_FILE}")
        print("Skipping - nothing to update.")
        sys.exit(1)

    date_str, title = parse_wrapper(wrapper_name)
    if not date_str or not title:
        print(
            "ERROR: could not parse wrapper name. "
            "Expected format: '!! YYYY-MM-DD - project name'"
        )
        sys.exit(1)

    file_url = build_file_url(wrapper_name)

    board_text = BOARD_FILE.read_text(encoding="utf-8")

    if already_on_board(board_text, title, file_url):
        print(f"Already on dreams board: {title} (skipped)")
        return

    new_text = insert_row(board_text, title, date_str, file_url)
    BOARD_FILE.write_text(new_text, encoding="utf-8")
    print(f"Added to dreams board: {title}")


if __name__ == "__main__":
    main()
