"""
Preview Results — opens all 6 key pages in Chrome, pointing to
the exact active files (not templates or wrong green-sheets).

Usage:
    python preview-results.py              # all 6 pages (green-sheet = most recent)
    python preview-results.py s1           # all 6, green-sheet locked to s1
    python preview-results.py s2           # all 6, green-sheet locked to s2

Pages opened:
    1. Railroad Control Panel
    2. Build Guide
    3. Green Sheet (current job's copy, not the template)
    4. Work Tracker
    5. Wing Dashboard
    6. Triple Brain Build Dashboard
"""
import subprocess
import sys
import os
import glob
import time

BASE = os.path.dirname(os.path.abspath(__file__))
ADMIN = os.path.join(BASE, "\u2699\ufe0f ADMIN")
MEMORY = os.path.join(ADMIN, "memory")

# --- Parse args ---
job_key = None
for arg in sys.argv[1:]:
    if not arg.startswith("--"):
        job_key = arg.lower()

# --- 1. Railroad Control Panel ---
control_panel = os.path.join(BASE, "\ud83d\udd27 WORK", "railroad-control-panel.html")

# --- 2. Build Guide ---
build_guide = os.path.join(BASE, "\ud83d\udd27 WORK", "build-digital-coms.html")

# --- 3. Green Sheet (active job copy, not template) ---
green_sheet = None
if job_key:
    pattern = os.path.join(MEMORY, f"{job_key}-green-sheet--*", "green-spreadsheets.html")
    matches = sorted(glob.glob(pattern))
    if matches:
        green_sheet = matches[-1]

if not green_sheet:
    # Find most recent green-sheet across all jobs
    pattern = os.path.join(MEMORY, "*-green-sheet--*", "green-spreadsheets.html")
    matches = sorted(glob.glob(pattern))
    if matches:
        green_sheet = matches[-1]

if not green_sheet:
    # Fallback to template
    green_sheet = os.path.join(ADMIN, "green spread folder base", "green-spreadsheets-TEMPLATE.html")

# --- 4. Work Tracker ---
work_tracker = os.path.join(ADMIN, "self operation", "claude-doesnt-stoppp-ppotsssss.html")

# --- 5. Wing Dashboard ---
wing_dash = os.path.join(BASE, "workspot1", "--wingdashapp--1--", "index.html")

# --- 6. Triple Brain ---
triple_brain = os.path.join(BASE, "\ud83e\udde0\ud83e\udde0\ud83e\udde0 triple-brain-build-dashboard copy.html")

# --- Open all ---
pages = [
    ("Railroad Control Panel", control_panel),
    ("Build Guide", build_guide),
    ("Green Sheet", green_sheet),
    ("Work Tracker", work_tracker),
    ("Wing Dashboard", wing_dash),
    ("Triple Brain Dashboard", triple_brain),
]

print(f"\n  --- preview-results ---\n")
for label, path in pages:
    if path and os.path.exists(path):
        file_url = "file:///" + path.replace("\\", "/").replace(" ", "%20")
        subprocess.Popen(["cmd", "/c", "start", "chrome", file_url], shell=False)
        print(f"  [ok] {label}")
        time.sleep(0.5)
    else:
        print(f"  [--] {label} -- not found")

if job_key:
    print(f"\n  green-sheet locked to: {job_key}")

print(f"\n  {sum(1 for _, p in pages if p and os.path.exists(p))} tabs opened\n")
