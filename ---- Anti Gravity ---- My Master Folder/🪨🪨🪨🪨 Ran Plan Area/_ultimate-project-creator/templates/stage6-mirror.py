#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
stage6-mirror.py

Mirrors a finished project HTML into Stage 6 of the Ultimate File Manager
pipeline — the "final result folder" browsing location. Stage 6 sits between
Stage 5 (FILF completion) and the canonical save in
`Ultimate Project Creator - 1\\`. It does NOT replace the canonical save; it
is a mirror for quick final-result browsing.

Folder pattern inside Stage 6 (same structure as stages 4/5 but with NO
FILG/FILF subfolder split — Stage 6 is just the final mirror):

    {UFM_ROOT}\\6. [Final results in 'final result folder\\{slug}\\{slug}.html

Usage:
    python stage6-mirror.py --slug <slug> --source <path-to-finished-html>

Exit codes:
    0 — success (mirrored OR already present with identical content)
    1 — source HTML missing / invalid
    2 — target already exists with DIFFERENT content (warn, do not overwrite)
"""

import argparse
import filecmp
import io
import os
import shutil
import sys

# Force stdout/stderr to UTF-8 so the ✅ emoji in success output doesn't
# crash on cp1252 Windows terminals (same guard used by state-reader.py).
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
# UFM root + Stage 6 folder name (preserve the `[` and open-quote EXACTLY —
# do NOT "fix" the missing closing bracket; it is intentional on disk)
# -----------------------------------------------------------------------------
UFM_ROOT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager"
STAGE_6 = r"6. [Final results in 'final result folder"


def parse_args():
    p = argparse.ArgumentParser(
        description="Mirror finished project HTML into Stage 6 (final results folder)."
    )
    p.add_argument("--slug", required=True, help="Project slug (becomes folder name)")
    p.add_argument(
        "--source", required=True, help="Absolute path to the finished source HTML"
    )
    return p.parse_args()


def main():
    args = parse_args()

    slug = args.slug.strip()
    if not slug:
        print("ERROR: --slug cannot be empty", file=sys.stderr)
        sys.exit(1)

    source_html = os.path.abspath(args.source)
    if not os.path.isfile(source_html):
        print(f"ERROR: source HTML not found: {source_html}", file=sys.stderr)
        sys.exit(1)

    # Build target paths
    stage6_root = os.path.join(UFM_ROOT, STAGE_6)
    parent_dir = os.path.join(stage6_root, slug)
    target_file = os.path.join(parent_dir, f"{slug}.html")

    # Idempotent scaffolding
    os.makedirs(stage6_root, exist_ok=True)
    os.makedirs(parent_dir, exist_ok=True)

    # If target already exists, compare content before touching it
    if os.path.isfile(target_file):
        try:
            same = filecmp.cmp(source_html, target_file, shallow=False)
        except OSError:
            same = False
        if same:
            print(f"✅ mirrored to stage 6: {os.path.abspath(target_file)}")
            print("   (already present with identical content — no-op)")
            sys.exit(0)
        print(
            "WARNING: stage 6 target already exists with DIFFERENT content — refusing to overwrite.",
            file=sys.stderr,
        )
        print(f"  existing: {os.path.abspath(target_file)}", file=sys.stderr)
        print(f"  source:   {source_html}", file=sys.stderr)
        sys.exit(2)

    # Copy (preserve mtimes)
    shutil.copy2(source_html, target_file)
    print(f"✅ mirrored to stage 6: {os.path.abspath(target_file)}")
    sys.exit(0)


if __name__ == "__main__":
    main()
