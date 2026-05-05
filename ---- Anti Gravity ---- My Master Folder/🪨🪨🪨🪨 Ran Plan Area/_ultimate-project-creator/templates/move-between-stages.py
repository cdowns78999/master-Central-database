#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
move-between-stages.py

Implements Chad's corrected copy-and-move protocol for /ultimate-project-creator.

The working HTML travels forward through UFM stages 3 -> 4 -> 5 -> 6. At each
stage transition:
  DEPART (leaving a stage):
    COPY current `{slug}.html` -> `stage-N-done-snapshot.html`
    MOVE  `{slug}.html` forward into the next stage folder.
  ARRIVE (entering a stage):
    Working HTML lands as `{slug}.html` in the new stage slug folder.
    Immediately COPY it -> `snapshot-on-arrival.html` (pristine record).

Stage 3 is a special case: stage 3 is MD-only on disk, so DEPART from stage 3
has no "done snapshot" to record, and the source HTML comes from outside (via
the wrapper "Ultimate Project Creator - 1" folder or directly from the user
via --source). In that case we `copy2` the source into stage 4 instead of
moving it (don't remove the upstream source).

Usage:
    python move-between-stages.py --slug <slug> --from-stage 3 --to-stage 4 --source <path-to-html>
    python move-between-stages.py --slug <slug> --from-stage 4 --to-stage 5
    python move-between-stages.py --slug <slug> --from-stage 5 --to-stage 6

Exit codes:
    0 - success (or idempotent no-op on identical content)
    1 - argument or source error
    2 - would-overwrite conflict (target exists with DIFFERENT content)
    3 - unreachable / unexpected state
"""

import argparse
import filecmp
import os
import shutil
import sys

# ----- UTF-8 stdout shim (Windows cp1252 console safety) ---------------------
try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass  # older Python versions

# -----------------------------------------------------------------------------
# UFM root + stage folder constants (copy-paste EXACT — do NOT "fix" quirks)
# -----------------------------------------------------------------------------
UFM_ROOT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager"

STAGE_FOLDERS = {
    3: r"3.  MIDDLE - master 'project job' holder",       # MD-only on disk
    4: r"4. fill in the gaps  between 'step phrases'",    # two spaces: "gaps  between"
    5: r"5. Fill in the fields ' last touches",            # apostrophe + space
    6: r"6. [Final results in 'final result folder",       # intentional [ — no closing bracket
}


def parse_args():
    p = argparse.ArgumentParser(
        description="Move project working HTML between UFM stages with snapshot trail."
    )
    p.add_argument("--slug", required=True, help="Project slug (folder name at each stage)")
    p.add_argument(
        "--from-stage",
        required=True,
        choices=["3", "4", "5"],
        help="Stage we're leaving (3|4|5)",
    )
    p.add_argument(
        "--to-stage",
        required=True,
        choices=["4", "5", "6"],
        help="Stage we're entering (4|5|6)",
    )
    p.add_argument(
        "--source",
        required=False,
        default=None,
        help=(
            "Absolute path to source HTML. REQUIRED only when --from-stage 3 "
            "(stage 3 is MD-only on disk — source must come from elsewhere)."
        ),
    )
    return p.parse_args()


def validate_args(args):
    """Enforce to_stage == from_stage + 1 and --source rule for stage 3."""
    from_stage = int(args.from_stage)
    to_stage = int(args.to_stage)

    if to_stage != from_stage + 1:
        print(
            f"ERROR: --to-stage ({to_stage}) must equal --from-stage + 1 "
            f"(expected {from_stage + 1}).",
            file=sys.stderr,
        )
        sys.exit(1)

    if from_stage == 3:
        if not args.source:
            print(
                "ERROR: --source is REQUIRED when --from-stage 3 "
                "(stage 3 is MD-only; no working HTML exists on disk).",
                file=sys.stderr,
            )
            sys.exit(1)
        src_abs = os.path.abspath(args.source)
        if not os.path.isfile(src_abs):
            print(f"ERROR: --source HTML not found: {src_abs}", file=sys.stderr)
            sys.exit(1)

    return from_stage, to_stage


def stage_slug_dir(stage_num, slug):
    """Return the slug folder inside a given stage root."""
    return os.path.join(UFM_ROOT, STAGE_FOLDERS[stage_num], slug)


def safe_write_copy(source_path, dest_path, label):
    """
    Copy source_path -> dest_path, honoring idempotency rules.
      - If dest doesn't exist: copy.
      - If dest exists and is byte-identical to source: no-op (warn), return True.
      - If dest exists and differs: exit 2 (don't overwrite silently).
    """
    if os.path.isfile(dest_path):
        try:
            identical = filecmp.cmp(source_path, dest_path, shallow=False)
        except OSError as e:
            print(f"ERROR: could not compare files for {label}: {e}", file=sys.stderr)
            sys.exit(3)
        if identical:
            print(
                f"NOTE: {label} already exists with identical content, skipping: {dest_path}",
                file=sys.stderr,
            )
            return True
        print(
            f"ERROR: {label} already exists with DIFFERENT content — refusing to overwrite.\n"
            f"  existing: {dest_path}\n"
            f"  incoming: {source_path}",
            file=sys.stderr,
        )
        sys.exit(2)

    shutil.copy2(source_path, dest_path)
    return False  # copied fresh


def main():
    args = parse_args()
    from_stage, to_stage = validate_args(args)
    slug = args.slug

    # ---------- DEPART side ----------
    done_snapshot_path = None  # only set when from_stage in {4, 5}
    if from_stage == 3:
        # Stage 3 has no working HTML on disk. Source comes from --source.
        working_src = os.path.abspath(args.source)
    else:
        # Stage 4 or 5: there MUST be a working HTML at the from-stage slug folder.
        from_slug_dir = stage_slug_dir(from_stage, slug)
        working_src = os.path.join(from_slug_dir, f"{slug}.html")
        if not os.path.isfile(working_src):
            print(
                f"ERROR: no working HTML found in stage {from_stage}: {working_src}",
                file=sys.stderr,
            )
            sys.exit(1)
        # Leave a "done" snapshot behind.
        done_snapshot_path = os.path.join(
            from_slug_dir, f"stage-{from_stage}-done-snapshot.html"
        )
        safe_write_copy(
            working_src, done_snapshot_path, f"stage-{from_stage}-done-snapshot.html"
        )

    # ---------- ARRIVE side ----------
    to_slug_dir = stage_slug_dir(to_stage, slug)
    os.makedirs(to_slug_dir, exist_ok=True)

    to_working_path = os.path.join(to_slug_dir, f"{slug}.html")
    arrival_snapshot_path = os.path.join(to_slug_dir, "snapshot-on-arrival.html")

    # If working file already exists in to-stage, enforce idempotency the same way.
    if os.path.isfile(to_working_path):
        try:
            identical = filecmp.cmp(working_src, to_working_path, shallow=False)
        except OSError as e:
            print(f"ERROR: could not compare working files: {e}", file=sys.stderr)
            sys.exit(3)
        if not identical:
            print(
                f"ERROR: stage {to_stage} already has a DIFFERENT {slug}.html — "
                f"refusing to overwrite.\n"
                f"  existing: {to_working_path}\n"
                f"  incoming: {working_src}",
                file=sys.stderr,
            )
            sys.exit(2)
        print(
            f"NOTE: stage {to_stage} already has identical {slug}.html, skipping move.",
            file=sys.stderr,
        )
    else:
        if from_stage == 3:
            # Don't delete upstream source — copy instead of move.
            shutil.copy2(working_src, to_working_path)
        else:
            # True move: working HTML advances forward; snapshots stay behind.
            shutil.move(working_src, to_working_path)

    # Always ensure snapshot-on-arrival exists, matching the now-settled working file.
    safe_write_copy(to_working_path, arrival_snapshot_path, "snapshot-on-arrival.html")

    # ---------- success output ----------
    print(f"✅ moved {slug} from stage {from_stage} → stage {to_stage}")
    if done_snapshot_path is not None:
        print(f"   left behind: {os.path.abspath(done_snapshot_path)}")
    print(f"   arrived at:  {os.path.abspath(to_working_path)}")
    print(f"   snapshot:    {os.path.abspath(arrival_snapshot_path)}")
    sys.exit(0)


if __name__ == "__main__":
    main()
