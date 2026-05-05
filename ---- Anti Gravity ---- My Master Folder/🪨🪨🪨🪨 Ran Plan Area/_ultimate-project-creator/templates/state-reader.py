#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
state-reader.py — interactive-menu state reader for /ultimate-project-creator.

Reads the current state of every job that lives on the UFM dashboard, walks
each one through the 6-stage snapshot-based pipeline to figure out WHERE it
currently is, then recommends the next important step.

Protocol: the working {slug}.html file travels forward through stages 3→4→5→6.
At each stage, a snapshot-on-arrival.html is captured on entry and a
stage-N-done-snapshot.html is captured on exit. The working file is present
ONLY while that stage is active; once it moves on, only the snapshots remain.

READ ONLY — never mutates any source file.

Usage:
    python state-reader.py

Output:
    JSON on stdout.  Diagnostics on stderr.

Exit codes:
    0 — success (even if partial; see .active_job and all_jobs)
    2 — fatal (could not write JSON)
"""

import glob
import io
import json
import os
import re
import sys
import traceback
from datetime import date

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
# Path constants
# -----------------------------------------------------------------------------
UFM_ROOT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager"

DASHBOARD_CANDIDATES = [
    os.path.join(UFM_ROOT, "the big dashboard.html"),
    os.path.join(UFM_ROOT, "the big dashboard.html"),
]

# Stage 1..6 parent folder names (exact disk spelling — preserve quirks).
# NOTE: colons are illegal on Windows NTFS, so the old FILG:/FILF: subfolder
# pattern never existed on disk. Protocol is now snapshot-based (see below).
STAGE_FOLDERS = {
    3: r"3.  MIDDLE - master 'project job' holder",
    4: r"4. fill in the gaps  between 'step phrases'",
    5: r"5. Fill in the fields ' last touches",
    6: r"6. [Final results in 'final result folder",
}

# Back-compat alias used by the dashboard-jobs fallback scanner.
STAGE_ROOTS = {
    1: ["1. Big Part"],
    2: ["2.  Project plan - add to project"],
    3: [STAGE_FOLDERS[3]],
    4: [STAGE_FOLDERS[4]],
    5: [STAGE_FOLDERS[5]],
    6: [STAGE_FOLDERS[6]],
}

RESULTS_FINAL_DIR = os.path.join(
    UFM_ROOT, "-- Results folder master forever", "Ultimate Project Creator - 1"
)

# Stage 6 — `{UFM_ROOT}\6. [Final results in 'final result folder\{slug}\{slug}.html`.
# Preserve the `[` and open-quote EXACTLY; the missing closing bracket is
# intentional on disk — do NOT "fix" it.
STAGE_6 = STAGE_FOLDERS[6]
STAGE_6_DIR = os.path.join(UFM_ROOT, STAGE_6)

JOBS_DIR = os.path.join(UFM_ROOT, "jobs")


# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------
def _read(path):
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            return f.read()
    except OSError:
        return None


def _existing_stage_root(stage_num):
    for name in STAGE_ROOTS.get(stage_num, []):
        p = os.path.join(UFM_ROOT, name)
        if os.path.isdir(p):
            return p
    return None


def _stage_has_slug_folder(stage_num, slug):
    root = _existing_stage_root(stage_num)
    if not root:
        return False
    return os.path.isdir(os.path.join(root, slug))


def _stage3_md_exists(slug):
    r"""Stage-3 master MD lives at {stage3_root}\!! {date} — {slug}.md or any
    crown-optional match-by-slug variant."""
    root = _existing_stage_root(3)
    if not root:
        return False
    today_primary = os.path.join(root, f"!! {date.today().isoformat()} — {slug}.md")
    if os.path.isfile(today_primary):
        return True
    # Crown-optional: any ".md" whose filename ends with "— {slug}.md"
    for md in glob.glob(os.path.join(root, f"*— {slug}.md")):
        if os.path.isfile(md):
            return True
    # ALSO accept a subfolder-based stage-3 placement ({slug}/{slug}.md)
    sub = os.path.join(root, slug)
    if os.path.isdir(sub):
        for md in glob.glob(os.path.join(sub, "*.md")):
            if os.path.isfile(md):
                return True
    return False


def _stage_working_file_path(stage_num, slug):
    r"""Return absolute path of the stage's working HTML if present.

    Under the new protocol, the working file lives at:
        {stage folder}\{slug}\{slug}.html
    while the project is ACTIVE at that stage. Once the project leaves the
    stage, only the snapshot files remain (snapshot-on-arrival.html and
    stage-N-done-snapshot.html).
    """
    root = _existing_stage_root(stage_num)
    if not root:
        return None
    p = os.path.join(root, slug, f"{slug}.html")
    return p if os.path.isfile(p) else None


def _stage_snapshot_exists(stage_num, slug, kind):
    r"""kind is either 'on-arrival' or 'done'. Checks for the matching snapshot
    inside {stage folder}\{slug}\."""
    root = _existing_stage_root(stage_num)
    if not root:
        return False
    if kind == "on-arrival":
        name = "snapshot-on-arrival.html"
    elif kind == "done":
        name = f"stage-{stage_num}-done-snapshot.html"
    else:
        return False
    return os.path.isfile(os.path.join(root, slug, name))


def _final_canonical_folder(slug):
    """Return the final canonical folder under Ultimate Project Creator - 1.

    Prefers today's crowned wrapper, then any crowned wrapper, then any
    crown-optional match by slug."""
    if not os.path.isdir(RESULTS_FINAL_DIR):
        return None

    today_primary = os.path.join(RESULTS_FINAL_DIR, f"!! {date.today().isoformat()} — {slug}")
    if os.path.isdir(today_primary):
        return today_primary

    # Crowned but any date
    for c in sorted(
        glob.glob(os.path.join(RESULTS_FINAL_DIR, f"!! *— {slug}")),
        key=os.path.getmtime,
        reverse=True,
    ):
        if os.path.isdir(c):
            return c

    # Crown-optional
    for c in sorted(
        glob.glob(os.path.join(RESULTS_FINAL_DIR, f"*— {slug}")),
        key=os.path.getmtime,
        reverse=True,
    ):
        if os.path.isdir(c):
            return c
    return None


def _jobs_page_exists(slug):
    return os.path.isfile(os.path.join(JOBS_DIR, f"{slug}.html"))


def _working_file_has_gaps(path):
    """Very loose heuristic: if the work-copy HTML lacks certain sentinel strings,
    treat it as 'missing key fields'. Conservative — only flags glaringly empty
    templates."""
    if not path or not os.path.isfile(path):
        return False
    body = _read(path) or ""
    # If the file is tiny (<500 chars) or still contains raw template
    # placeholders like "{{", "TODO", or "REPLACE_ME", we call it incomplete.
    if len(body) < 500:
        return True
    markers = ("{{", "TODO:", "REPLACE_ME", "<!-- FILL -->")
    return any(m in body for m in markers)


# -----------------------------------------------------------------------------
# Dashboard jobs[]  — share parser with sync-check.py style
# -----------------------------------------------------------------------------
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


def _extract_balanced_block(body, prefix_re, open_ch, close_ch):
    m = re.search(prefix_re, body)
    if not m:
        return None
    i = body.find(open_ch, m.end())
    if i < 0:
        return None
    return _extract_balanced(body, i, open_ch, close_ch)


def _iter_object_literals(body):
    i = 0
    while i < len(body):
        c = body[i]
        if c == "{":
            inner = _extract_balanced(body, i, "{", "}")
            if inner is None:
                return
            yield inner
            i += len(inner) + 2
        else:
            i += 1


def _get_string(obj_body, key):
    m = re.search(
        rf"['\"]?{re.escape(key)}['\"]?\s*:\s*['\"]([^'\"]*)['\"]",
        obj_body,
    )
    return m.group(1) if m else None


def load_dashboard_jobs(errors):
    dash_path = None
    for cand in DASHBOARD_CANDIDATES:
        if os.path.isfile(cand):
            dash_path = cand
            break
    if dash_path is None:
        errors.append("dashboard: not found")
        return [], None

    body = _read(dash_path)
    if body is None:
        errors.append(f"dashboard: unreadable {dash_path}")
        return [], None

    weeks_block = _extract_balanced_block(body, r"const\s+weeks\s*=\s*", "[", "]")
    latest_week_label = None
    latest_iso = None
    if weeks_block:
        isos = [
            m.group(1)
            for m in re.finditer(r"date\s*:\s*['\"]([\d\-]+)['\"]", weeks_block)
        ]
        labels = [
            m.group(1)
            for m in re.finditer(r"label\s*:\s*['\"]([^'\"]+)['\"]", weeks_block)
        ]
        if isos:
            latest_iso = isos[-1]
        if labels:
            latest_week_label = labels[-1]

    jobs_by_week = _extract_balanced_block(body, r"const\s+jobsByWeek\s*=\s*", "{", "}")
    jobs = []
    seen = set()

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
                if not slug or slug in seen:
                    continue
                seen.add(slug)
                jobs.append({
                    "slug": slug,
                    "name": name,
                    "week_iso": iso,
                    "uuid": _get_string(obj, "uuid"),
                })

    return jobs, latest_week_label


# -----------------------------------------------------------------------------
# Per-job stage inference
# -----------------------------------------------------------------------------
def determine_stage(slug):
    """Determine a job's current stage via the snapshot-based protocol.

    The working {slug}.html file travels forward through stages 4 → 5 → 6.
    A stage is "currently active" when its {slug}.html working file exists.
    After the file moves on, snapshot-on-arrival.html and
    stage-N-done-snapshot.html remain in place as historical markers.

    Returns a tuple (stage, status_label).
      stage:  int 1..6, "canonical", "mirrored", OR "done"
      status: short human string
    """
    # Full pipeline complete — web-app mirror in jobs/ is the final step
    jobs_mirrored = _jobs_page_exists(slug)
    canonical = _final_canonical_folder(slug) is not None

    working_4 = _stage_working_file_path(4, slug) is not None
    working_5 = _stage_working_file_path(5, slug) is not None
    working_6 = _stage_working_file_path(6, slug) is not None

    # Currently-active stage = whichever stage holds the working {slug}.html
    if working_6:
        return 6, "stage 6 (final results) in progress"
    if working_5:
        return 5, "last touches in progress"
    if working_4:
        return 4, "filling gaps"

    # No working file in any of 4/5/6. Check downstream landing spots.
    if canonical and jobs_mirrored:
        return "done", "done (canonical + mirrored)"
    if canonical:
        return "canonical", "canonical saved (awaiting jobs mirror)"

    # Fallback: maybe stage-3 MD exists
    if _stage3_md_exists(slug):
        return 3, "stage 3 (MD written, awaiting stage-4 move)"

    # Fallback: any stage folder present by {slug}/ subfolder
    highest = None
    for s in (1, 2, 3, 4, 5, 6):
        if _stage_has_slug_folder(s, slug):
            highest = s
    if highest is not None:
        return highest, f"stage {highest}"

    return 1, "not started"


# -----------------------------------------------------------------------------
# Blockers + next-step rule table
# -----------------------------------------------------------------------------
def compute_blockers_and_next_step(slug, stage):
    """Rule table for next_important_step under the snapshot-based protocol.

    The working {slug}.html file travels 3 → 4 → 5 → 6. Inside each stage-N
    folder we track:
      - snapshot-on-arrival.html  (immutable, exists once the project arrives)
      - stage-N-done-snapshot.html (exists once the project leaves the stage)
      - {slug}.html (the working file — present ONLY while stage is active)
    """
    blockers = []
    stage3_md = _stage3_md_exists(slug)
    working_4 = _stage_working_file_path(4, slug)
    working_5 = _stage_working_file_path(5, slug)
    working_6 = _stage_working_file_path(6, slug)
    stage4_done = _stage_snapshot_exists(4, slug, "done")
    stage5_done = _stage_snapshot_exists(5, slug, "done")
    final_folder = _final_canonical_folder(slug)
    pulled_out = _jobs_page_exists(slug)

    # ---- Blockers (snapshot-based wording) ---------------------------------
    if not stage3_md:
        blockers.append("no stage-3 master MD")
    if not (working_4 or working_5 or working_6 or stage4_done or stage5_done):
        blockers.append("stage-4 working file not present")
    elif working_4 and _working_file_has_gaps(working_4):
        blockers.append("stage-4 working file has unfilled fields")

    if stage4_done and not (working_5 or working_6 or stage5_done):
        blockers.append("stage-5 working file not present")
    if stage5_done and not (working_6 or final_folder):
        blockers.append("stage-6 working file not present")
    if working_5 and not stage4_done:
        blockers.append("stage-4 done-snapshot not found")
    if working_6 and not stage5_done:
        blockers.append("stage-5 done-snapshot not found")

    if final_folder is None:
        blockers.append("canonical save missing")
    if not pulled_out:
        blockers.append(f"jobs/{slug}.html not mirrored")

    # ---- Rule table (first match wins) -------------------------------------
    stage3_root = _existing_stage_root(3)
    stage3_root_display = (
        os.path.relpath(stage3_root, UFM_ROOT) if stage3_root else STAGE_FOLDERS[3]
    )
    stage3_md_target = os.path.join(
        stage3_root_display,
        f"!! {date.today().isoformat()} — {slug}.md",
    )

    # Rule 1: no stage-3 MD
    if not stage3_md:
        return {
            "label": "Write the stage-3 MIDDLE MD (plan + paths)",
            "kind": "write_md",
            "target": stage3_md_target,
        }, blockers

    # Rule 2: MD exists, no working file in stage 4 yet
    if not working_4 and not stage4_done and not (working_5 or working_6 or stage5_done or final_folder):
        return {
            "label": "Move HTML from stage 3 source into stage 4",
            "kind": "move_3_to_4",
            "target": os.path.join(STAGE_FOLDERS[4], slug, f"{slug}.html"),
            "command": "move-between-stages.py --from-stage 3 --to-stage 4",
        }, blockers

    # Rule 3: working file currently in stage 4
    if working_4:
        return {
            "label": "Fill the gaps (FILG work in progress)",
            "kind": "fill_gaps_stage4",
            "target": os.path.relpath(working_4, UFM_ROOT),
        }, blockers

    # Rule 4: stage-4 done-snapshot exists AND no working file in stage 5
    if stage4_done and not working_5 and not (working_6 or stage5_done or final_folder):
        return {
            "label": "Move working HTML from stage 4 to stage 5",
            "kind": "move_4_to_5",
            "target": os.path.join(STAGE_FOLDERS[5], slug, f"{slug}.html"),
            "command": "move-between-stages.py --from-stage 4 --to-stage 5",
        }, blockers

    # Rule 5: working file currently in stage 5
    if working_5:
        return {
            "label": "Fill the fields / last touches (FILF work in progress)",
            "kind": "fill_fields_stage5",
            "target": os.path.relpath(working_5, UFM_ROOT),
        }, blockers

    # Rule 6: stage-5 done-snapshot exists AND no working file in stage 6
    if stage5_done and not working_6 and not final_folder:
        return {
            "label": "Move working HTML from stage 5 to stage 6",
            "kind": "move_5_to_6",
            "target": os.path.join(STAGE_FOLDERS[6], slug, f"{slug}.html"),
            "command": "move-between-stages.py --from-stage 5 --to-stage 6",
        }, blockers

    # Rule 7: working file in stage 6 AND no canonical save
    if working_6 and final_folder is None:
        return {
            "label": "Save canonical to Ultimate Project Creator - 1",
            "kind": "save_canonical",
            "target": os.path.relpath(RESULTS_FINAL_DIR, UFM_ROOT),
        }, blockers

    # Rule 8: canonical exists AND no jobs mirror
    if final_folder is not None and not pulled_out:
        return {
            "label": "Pull canonical to jobs/{slug}.html (web-app mirror)".replace(
                "{slug}", slug
            ),
            "kind": "pages_pullout",
            "target": os.path.join("jobs", f"{slug}.html"),
        }, blockers

    # Rule 9: everything above is complete
    return {
        "label": "Ready to Netlify deploy",
        "kind": "ready_to_deploy",
        "target": os.path.join("jobs", f"{slug}.html"),
    }, blockers


# -----------------------------------------------------------------------------
# Active job detection
# -----------------------------------------------------------------------------
def find_active_job(jobs, errors):
    """Active = currently-crowned '!! ' wrapper under Ultimate Project Creator - 1.
    Fall back to most-recently-modified job wrapper (crown-optional) across
    stages 4/5/final, matched by slug. If nothing found at all, fall back to
    the latest dashboard job entry."""
    if not os.path.isdir(RESULTS_FINAL_DIR):
        errors.append("active: Ultimate Project Creator - 1 dir missing")
    else:
        crowned = glob.glob(os.path.join(RESULTS_FINAL_DIR, "!! *— *"))
        crowned = [c for c in crowned if os.path.isdir(c)]
        if crowned:
            # Pick the most-recently-modified crowned wrapper
            crowned.sort(key=os.path.getmtime, reverse=True)
            top = os.path.basename(crowned[0])
            # Extract slug: "!! YYYY-MM-DD — slug"
            m = re.match(r"^!!\s+\S+\s+—\s+(.+)$", top)
            if m:
                slug = m.group(1)
                match = next((j for j in jobs if j["slug"] == slug), None)
                if match:
                    return match
                # Not on the dashboard but still active on disk
                return {"slug": slug, "name": slug, "week_iso": None, "uuid": None}

    # Fallback: most-recently-modified subfolder across stage folders
    recent = []
    for stage in (6, 5, 4, 3, 2, 1):
        root = _existing_stage_root(stage)
        if not root:
            continue
        for j in jobs:
            p = os.path.join(root, j["slug"])
            if os.path.isdir(p):
                recent.append((os.path.getmtime(p), j))
    if recent:
        recent.sort(key=lambda t: t[0], reverse=True)
        return recent[0][1]

    return jobs[-1] if jobs else None


# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------
def main() -> int:
    errors = []
    jobs, week_label = load_dashboard_jobs(errors)

    all_jobs_out = []
    for j in jobs:
        stage, status = determine_stage(j["slug"])
        all_jobs_out.append({
            "slug": j["slug"],
            "name": j.get("name", j["slug"]),
            "stage": stage,
            "status": status,
        })

    active = find_active_job(jobs, errors)
    active_out = None
    next_step_out = None
    if active:
        stage, _status = determine_stage(active["slug"])
        next_step_out, blockers = compute_blockers_and_next_step(
            active["slug"], stage
        )
        active_out = {
            "slug": active["slug"],
            "name": active.get("name", active["slug"]),
            "stage": stage,
            "blockers": blockers,
        }
    else:
        errors.append("active: could not identify an active job")

    result = {
        "active_week": week_label,
        "active_job": active_out,
        "next_important_step": next_step_out,
        "all_jobs": all_jobs_out,
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
        traceback.print_exc(file=sys.stderr)
        json.dump(
            {
                "active_week": None,
                "active_job": None,
                "next_important_step": None,
                "all_jobs": [],
                "errors": ["fatal: unhandled exception (see stderr)"],
            },
            sys.stdout,
        )
        sys.stdout.write("\n")
        sys.exit(0)
