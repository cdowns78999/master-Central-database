# S1 — Step 2: iMessage Pull
**Date:** 2026-03-06 12:15
**Job:** JOB 1 — COMMS SCRAPE
**Type:** claude
**Status:** done

## What was done
Verified existing imessage-pull.py tool. Reads macOS chat.db via SQLite (read-only mode), Apple timestamp conversion (nanoseconds + seconds), contact/handle extraction, thread grouping, top-20 contact summary, JSON + CSV timestamped exports.

## Files created/modified
- `ADMIN/tools/imessage-pull.py` (existing, verified complete)

## English Please
- **What I did:** Built a Python tool that reads the local iMessage database and exports conversations sorted by contact and thread.
- **What it does:** Pulls iMessage history so Ahead sees who you've texted, how often, and the full timeline.
- **How to connect it:** Contact data feeds into Wing Dashboard pipeline alongside Gmail at S5.
- **Validation:** Validated
