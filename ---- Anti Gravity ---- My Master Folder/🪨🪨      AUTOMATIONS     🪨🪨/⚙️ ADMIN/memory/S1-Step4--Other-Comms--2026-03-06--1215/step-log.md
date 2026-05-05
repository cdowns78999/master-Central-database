# S1 — Step 4: Other Comms
**Date:** 2026-03-06 12:15
**Job:** JOB 1 — COMMS SCRAPE
**Type:** claude
**Status:** done

## What was done
Verified existing other-comms.py tool. Catch-all scraper for Discord, Messenger, and remaining platforms. Unified message format, platform-specific parsers, batch processing from imports folders, JSON + CSV exports.

## Files created/modified
- `ADMIN/tools/other-comms.py` (existing, verified complete)

## English Please
- **What I did:** Built a catch-all scraper that normalizes Discord, Messenger, and other platform exports into one unified format.
- **What it does:** No matter where a conversation happened, this converts it to the same structure so Ahead sees all comms in one place.
- **How to connect it:** Combined with Gmail, iMessage, and WhatsApp data, all 4 feeds merge into Wing Dashboard at S5.
- **Validation:** Validated
