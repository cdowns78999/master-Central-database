#!/usr/bin/env python3
"""
pages-pullout.py — mirror canonical project HTML into the UFM jobs/ folder.

Canonical source of truth (primary) lives under:
  {UFM_ROOT}\\-- Results folder master forever\\Ultimate Project Creator - 1\\!! {today} — {slug}\\{slug}.html

Secondary fallback (Stage 6 mirror):
  {UFM_ROOT}\\6. [Final results in 'final result folder\\{slug}\\{slug}.html

Target mirror (the UFM dashboard reads from here):
  {UFM_ROOT}\\jobs\\{slug}.html

Usage:
  python pages-pullout.py --slug my-slug

Exit codes:
  0 — success
  1 — canonical source folder/file not found (neither primary nor Stage 6 fallback)
  2 — bad arguments
"""

import argparse
import glob
import os
import shutil
import sys
from datetime import date

# ----- UTF-8 stdout shim (Windows cp1252 console safety) ---------------------
try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass  # older Python versions

UFM_ROOT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager"
RESULTS_SUBDIR = os.path.join(UFM_ROOT, "-- Results folder master forever", "Ultimate Project Creator - 1")
# Stage 6 folder name — preserve `[` and open-quote EXACTLY; the missing
# closing bracket is intentional on disk.
STAGE_6 = r"6. [Final results in 'final result folder"
STAGE_6_DIR = os.path.join(UFM_ROOT, STAGE_6)
JOBS_DIR = os.path.join(UFM_ROOT, "jobs")


def find_source_folder(slug: str) -> str | None:
    """Find the project folder for `slug`.

    Primary (canonical source of truth): `Ultimate Project Creator - 1\\!! {today} — {slug}`
      then crown-optional `*— {slug}` under the same root.
    Secondary fallback: Stage 6 mirror at `6. [Final results in 'final result folder\\{slug}\\`.
    """
    today = date.today().isoformat()

    # -------- Primary: Ultimate Project Creator - 1 (canonical) --------
    primary = os.path.join(RESULTS_SUBDIR, f"!! {today} — {slug}")
    if os.path.isdir(primary):
        return primary

    if os.path.isdir(RESULTS_SUBDIR):
        # Crown-optional glob. Match any folder ending with "— {slug}".
        candidates = glob.glob(os.path.join(RESULTS_SUBDIR, f"*— {slug}"))
        candidates = [c for c in candidates if os.path.isdir(c)]
        if candidates:
            candidates.sort(key=lambda p: os.path.getmtime(p), reverse=True)
            return candidates[0]

    # -------- Secondary fallback: Stage 6 mirror --------
    stage6_folder = os.path.join(STAGE_6_DIR, slug)
    if os.path.isdir(stage6_folder):
        return stage6_folder

    return None


def main() -> int:
    parser = argparse.ArgumentParser(description="Mirror canonical project HTML to UFM jobs/.")
    parser.add_argument("--slug", required=True, help="Project slug (e.g. my-project)")
    args = parser.parse_args()

    slug = args.slug.strip()
    if not slug:
        print("ERROR: --slug cannot be empty", file=sys.stderr)
        return 2

    source_folder = find_source_folder(slug)
    if source_folder is None:
        print(
            f"ERROR: canonical source folder not found for slug '{slug}' under:\n  {RESULTS_SUBDIR}",
            file=sys.stderr,
        )
        return 1

    source_file = os.path.join(source_folder, f"{slug}.html")
    if not os.path.isfile(source_file):
        print(f"ERROR: canonical source file missing: {source_file}", file=sys.stderr)
        return 1

    os.makedirs(JOBS_DIR, exist_ok=True)
    target_file = os.path.join(JOBS_DIR, f"{slug}.html")

    # Canonical is source of truth — always overwrite.
    shutil.copyfile(source_file, target_file)

    print(f"✅ pulled to {target_file}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
