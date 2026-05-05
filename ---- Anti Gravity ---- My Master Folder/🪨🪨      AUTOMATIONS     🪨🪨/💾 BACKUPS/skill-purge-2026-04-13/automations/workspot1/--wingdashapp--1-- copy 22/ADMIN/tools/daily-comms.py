#!/usr/bin/env python3
"""
daily-comms.py — Daily Comms Runner
=====================================
Single script that runs the full daily cycle:
  1. snapshot-comms.py  (pull all channels, save snapshot)
  2. diff-comms.py      (compare today vs previous, output changes)

Prints a combined summary at the end.
Cron-ready: schedule with Windows Task Scheduler or cron.

Usage:
  python daily-comms.py
"""

import sys
import os
import subprocess
import json
from datetime import datetime

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
SNAPSHOT_SCRIPT = os.path.join(SCRIPT_DIR, 'snapshot-comms.py')
DIFF_SCRIPT    = os.path.join(SCRIPT_DIR, 'diff-comms.py')

# diff-comms outputs here
DASHBOARD_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
CHANGES_FILE   = os.path.join(DASHBOARD_ROOT, 'data', 'feeds', 'comms-changes.json')

# snapshot outputs here
SNAPSHOTS_DIR  = os.path.join(SCRIPT_DIR, 'exports', 'snapshots')
LATEST_SNAP    = os.path.join(SNAPSHOTS_DIR, 'snapshot-latest.json')


def run_script(label, path):
    """Run a Python script and stream its output. Returns success bool."""
    print(f'\n{"=" * 55}')
    print(f'  Running: {label}')
    print(f'{"=" * 55}\n')

    if not os.path.exists(path):
        print(f'  ERROR: Script not found: {path}')
        return False

    try:
        result = subprocess.run(
            [sys.executable, path],
            cwd=SCRIPT_DIR,
            timeout=300,
        )
        return result.returncode == 0
    except subprocess.TimeoutExpired:
        print(f'  ERROR: {label} timed out after 5 minutes')
        return False
    except Exception as e:
        print(f'  ERROR: {label} failed: {e}')
        return False


def load_json_safe(path):
    """Load JSON file, return None on failure."""
    if not os.path.exists(path):
        return None
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, ValueError):
        return None


def main():
    start = datetime.now()

    print()
    print('  ╭──────────────────────────────────────────────╮')
    print('    Wing Dashboard — Daily Comms Runner')
    print(f'   Date: {start.strftime("%Y-%m-%d %H:%M")}')
    print('  ╰──────────────────────────────────────────────╯')

    # Step 1: Snapshot
    snap_ok = run_script('snapshot-comms.py', SNAPSHOT_SCRIPT)

    # Step 2: Diff (only if snapshot succeeded)
    diff_ok = False
    if snap_ok:
        diff_ok = run_script('diff-comms.py', DIFF_SCRIPT)
    else:
        print('\n  Skipping diff — snapshot failed.')

    # Summary
    snap_data = load_json_safe(LATEST_SNAP)
    diff_data = load_json_safe(CHANGES_FILE)

    snap_count = 0
    if snap_data and 'channels' in snap_data:
        for ch_threads in snap_data['channels'].values():
            snap_count += len(ch_threads) if isinstance(ch_threads, list) else 0

    n_new = n_replied = n_resolved = 0
    if diff_data and 'summary' in diff_data:
        s = diff_data['summary']
        n_new      = s.get('new', 0)
        n_replied  = s.get('replied', 0)
        n_resolved = s.get('resolved', 0)

    elapsed = (datetime.now() - start).total_seconds()

    print(f'\n{"=" * 55}')
    print('  DAILY COMMS COMPLETE')
    print(f'{"=" * 55}')
    print()

    status_snap = 'OK' if snap_ok else 'FAILED'
    status_diff = 'OK' if diff_ok else ('SKIPPED' if not snap_ok else 'FAILED')

    print(f'  Snapshot: {status_snap}  |  Diff: {status_diff}  |  {elapsed:.1f}s')
    print()
    print(f'  {snap_count} threads  ->  {n_new} new, {n_replied} replied, {n_resolved} resolved')
    print()


if __name__ == '__main__':
    main()
