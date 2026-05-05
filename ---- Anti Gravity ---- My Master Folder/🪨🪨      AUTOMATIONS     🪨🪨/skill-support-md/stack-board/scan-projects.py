#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
scan-projects.py
Scans the ⭐ stack-board projects landing folder, builds a registry of project
wrappers, and writes projects.json into the landing folder.

Usage:
    python scan-projects.py
"""
from __future__ import annotations

import io
import json
import os
import re
import sys
from pathlib import Path

# Force UTF-8 stdout for emojis on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
else:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# ---------------------------------------------------------------------------
# Hard-locked paths
# ---------------------------------------------------------------------------
LANDING_FOLDER = Path(
    "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/"
    "---- Anti Gravity ---- My Master Folder/"
    "\U0001FAA8 2026 Ultimate File Manager/"
    "-- Results folder master forever/"
    "Regular projects - 2/"
    "⭐ stack-board projects"
)
OUTPUT_JSON = LANDING_FOLDER / "projects.json"

# Patterns
CROWNED_PREFIX = "!! "
DATE_PREFIX_RE = re.compile(r"^(\d{4}-\d{2}-\d{2})")
NAME_RE = re.compile(r"^(?:!!\s+)?(\d{4}-\d{2}-\d{2})\s*[—\-]\s*(.+)$")
STATE_CLASSES = {"active", "done", "empty", "blocked", "wip", "in-progress"}
# Look for class="active" / class='active' style box markers in HTML
CLASS_RE = re.compile(r"""class\s*=\s*["']([^"']+)["']""", re.IGNORECASE)
# End-project marker: any folder/file containing the literal "end-project"
END_PROJECT_TOKENS = ("end-project", "END-PROJECT", "end_project")


def is_project_wrapper(name: str) -> bool:
    """Project wrapper = starts with '!! ' OR begins with YYYY-MM-DD."""
    if name.startswith(CROWNED_PREFIX):
        return True
    if DATE_PREFIX_RE.match(name):
        return True
    return False


def parse_name_and_date(folder_name: str) -> tuple[str, str]:
    """Extract (name, date) from a wrapper folder name."""
    m = NAME_RE.match(folder_name)
    if m:
        date = m.group(1)
        name = m.group(2).strip()
        return name, date
    # Fallback: empty values
    return folder_name, ""


def has_end_project(project_dir: Path) -> bool:
    """True if any child file/folder name contains 'end-project'."""
    try:
        for child in project_dir.iterdir():
            lower = child.name.lower()
            for tok in END_PROJECT_TOKENS:
                if tok.lower() in lower:
                    return True
    except OSError:
        pass
    return False


def find_index_html(project_dir: Path) -> Path | None:
    """Look for an index.html at the top level of the project folder."""
    candidate = project_dir / "index.html"
    if candidate.is_file():
        return candidate
    # Try one level deep
    try:
        for child in project_dir.iterdir():
            if child.is_dir():
                inner = child / "index.html"
                if inner.is_file():
                    return inner
    except OSError:
        pass
    return None


def parse_states(html_path: Path | None) -> list[str]:
    """
    Parse box state classes from the project's index.html.
    Returns up to 4 states; defaults to all 'empty' on failure / missing.
    """
    default = ["empty", "empty", "empty", "empty"]
    if html_path is None or not html_path.is_file():
        return default
    try:
        text = html_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return default

    states: list[str] = []
    for match in CLASS_RE.finditer(text):
        # Each class attr may have multiple classes
        for cls in match.group(1).split():
            cls_lower = cls.lower()
            if cls_lower in STATE_CLASSES:
                states.append(cls_lower)
                if len(states) >= 4:
                    break
        if len(states) >= 4:
            break

    if not states:
        return default
    # Pad to length 4
    while len(states) < 4:
        states.append("empty")
    return states[:4]


def scan() -> list[dict]:
    if not LANDING_FOLDER.is_dir():
        print(f"[error] Landing folder not found: {LANDING_FOLDER}", flush=True)
        return []

    projects: list[dict] = []
    for entry in sorted(LANDING_FOLDER.iterdir(), key=lambda p: p.name):
        if not entry.is_dir():
            continue
        if not is_project_wrapper(entry.name):
            continue

        folder_name = entry.name
        crowned = folder_name.startswith(CROWNED_PREFIX)
        proj_name, proj_date = parse_name_and_date(folder_name)
        end_present = has_end_project(entry)
        html_path = find_index_html(entry)
        states = parse_states(html_path)

        projects.append({
            "name": proj_name,
            "folder": folder_name,
            "date": proj_date,
            "crowned": crowned,
            "states": states,
            "has_end_project": end_present,
            "html_path": str(html_path).replace("\\", "/") if html_path else "",
        })
    return projects


def write_json(projects: list[dict]) -> None:
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)
        f.write("\n")


def summary(projects: list[dict]) -> None:
    n = len(projects)
    crowned = sum(1 for p in projects if p["crowned"])
    end_proj = sum(1 for p in projects if p["has_end_project"])
    print(
        f"Scanned {n} projects, {crowned} crowned, {end_proj} with end-project",
        flush=True,
    )


def main() -> int:
    projects = scan()
    write_json(projects)
    summary(projects)
    print(f"Wrote: {OUTPUT_JSON}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
