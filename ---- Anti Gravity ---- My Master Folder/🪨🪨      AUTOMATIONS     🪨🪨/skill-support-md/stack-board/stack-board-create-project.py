#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
stack-board-create-project.py
Wrapper called by /stack-board's NEW branch.

Takes ONE arg: project name (2-3 words).
- Strips '!! ' crown from any existing wrapper inside the star folder
- Creates '!! YYYY-MM-DD - <name>/' inside the star folder
- Copies stack-board-template.html -> <wrapper>/index.html
- Creates <wrapper>/end-project/
- Runs scan-projects.py to refresh projects.json
- Prints the file:// URL of the new project

Usage:
    python stack-board-create-project.py "wrapper test"
"""
from __future__ import annotations

import io
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path
from urllib.parse import quote

# Force UTF-8 stdout (path contains emojis on Windows)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
else:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# ---------------------------------------------------------------------------
# Hard-locked paths (mirror /stack-board skill.md CANONICAL PATHS section)
# ---------------------------------------------------------------------------
# Template path is hard-locked in skill.md, NOT relative to this file
TEMPLATE = Path(
    "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/"
    "---- Anti Gravity ---- My Master Folder/"
    "\U0001FAA8\U0001FAA8      AUTOMATIONS     \U0001FAA8\U0001FAA8/"
    "skill-support-md/stack-board/stack-board-template.html"
)
# scan-projects.py lives in the OTHER AUTOMATIONS folder (master-Central-database root)
SCAN_SCRIPT = Path(
    "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/"
    "\U0001FAA8\U0001FAA8      AUTOMATIONS     \U0001FAA8\U0001FAA8/"
    "skill-support-md/stack-board/scan-projects.py"
)
LANDING_FOLDER = Path(
    "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/"
    "---- Anti Gravity ---- My Master Folder/"
    "\U0001FAA8 2026 Ultimate File Manager/"
    "-- Results folder master forever/"
    "Regular projects - 2/"
    "⭐ stack-board projects"
)

CROWN = "!! "


def strip_existing_crowns() -> list[str]:
    """Remove '!! ' prefix from any crowned wrappers in the landing folder."""
    renamed: list[str] = []
    if not LANDING_FOLDER.is_dir():
        return renamed
    for entry in LANDING_FOLDER.iterdir():
        if entry.is_dir() and entry.name.startswith(CROWN):
            new_name = entry.name[len(CROWN):]
            new_path = entry.parent / new_name
            if new_path.exists():
                continue
            entry.rename(new_path)
            renamed.append(new_name)
    return renamed


def long(p: Path) -> str:
    """Return a Windows extended-length path string (\\\\?\\ prefix) for OS calls.

    Required because the landing folder is deeply nested and OneDrive's emoji
    folder names blow past the legacy 260-char MAX_PATH limit on systems
    where long-path support is not enabled in the registry.
    """
    s = str(p.resolve() if p.is_absolute() else p.absolute())
    if s.startswith("\\\\?\\"):
        return s
    if s.startswith("\\\\"):
        # UNC path
        return "\\\\?\\UNC\\" + s.lstrip("\\")
    return "\\\\?\\" + s


def create_wrapper(name: str) -> Path:
    today = date.today().isoformat()  # YYYY-MM-DD
    folder_name = f"{CROWN}{today} — {name}"  # em dash to match convention
    wrapper = LANDING_FOLDER / folder_name
    # Use extended-length path to dodge MAX_PATH (260) limit
    import os as _os
    _os.makedirs(long(wrapper), exist_ok=False)
    return wrapper


def clone_template(wrapper: Path) -> Path:
    if not TEMPLATE.is_file():
        raise FileNotFoundError(
            f"template missing: {TEMPLATE}\n"
            "re-seed stack-board-template.html before creating projects"
        )
    dest = wrapper / "index.html"
    shutil.copyfile(long(TEMPLATE), long(dest))
    return dest


def run_scan() -> None:
    if not SCAN_SCRIPT.is_file():
        print(f"[warn] scan script missing: {SCAN_SCRIPT}", flush=True)
        return
    subprocess.run(
        [sys.executable, str(SCAN_SCRIPT)],
        check=False,
    )


def to_file_url(p: Path) -> str:
    """Convert a Windows path to a file:// URL with proper percent-encoding."""
    s = str(p).replace("\\", "/")
    encoded = quote(s, safe=":/")
    return f"file:///{encoded.lstrip('/')}"


def main(argv: list[str]) -> int:
    if len(argv) < 2 or not argv[1].strip():
        print("usage: stack-board-create-project.py <project name>", flush=True)
        return 2

    name = argv[1].strip()
    LANDING_FOLDER.mkdir(parents=True, exist_ok=True)

    stripped = strip_existing_crowns()
    if stripped:
        print(f"stripped crown from: {', '.join(stripped)}", flush=True)

    wrapper = create_wrapper(name)
    clone_template(wrapper)
    end_proj = wrapper / "end-project"
    import os as _os
    _os.makedirs(long(end_proj), exist_ok=True)

    run_scan()

    url = to_file_url(wrapper / "index.html")
    print(f"created: {wrapper.name}", flush=True)
    print(url, flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
