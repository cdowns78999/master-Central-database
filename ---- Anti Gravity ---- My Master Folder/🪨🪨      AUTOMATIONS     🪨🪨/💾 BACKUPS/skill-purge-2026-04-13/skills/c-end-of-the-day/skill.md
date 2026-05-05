---
description: "End-of-day routine — back up all Wing Dashboard campaign data and extra info to Google Sheets with smart first-run setup and daily timestamp updates"
user_invocable: true
---

# c-end-of-the-day

An end-of-day routine that backs up all Wing Dashboard campaign data and extra info to Google Sheets — with smart first-run setup and daily timestamp updates.

Base directory for this skill: C:\Users\chad\.claude\skills\c-end-of-the-day

## Instructions

Run these steps IMMEDIATELY on invocation — no preamble, no menus.

This skill has a TOAST PROTOCOL — a series of checks that skip steps already completed. The Python script handles all toast logic internally.

### Toast 1 — Spreadsheet Check/Create

Check if two Google Sheets exist in Chad's Google Drive:
1. "Master VR Chat Spreadsheet"
2. "Master VR Chat Spreadsheet 2 double back up"

- If BOTH already exist → skip to Toast 2
- If either is missing → create the missing one(s) using the Google Sheets API
- Both spreadsheets must be IDENTICAL in structure

### Toast 2 — Tab Check/Create

Each of the 2 spreadsheets must have exactly 2 tabs:
1. "All Campaigns" — all campaign information goes here
2. "Extra Info" — extra stuff like calendar tasks, notes, misc data

- If BOTH tabs exist in BOTH spreadsheets → skip to Toast 3
- If any tabs are missing → create them

### Toast 3 — First-Time Data Population Check

Check if both spreadsheets already have their first copy of data:
- "All Campaigns" tab should have campaign data
- "Extra Info" tab should have extra stuff (calendar tasks etc.)

- If data already exists in both sheets → skip to Daily Update step
- If empty → do the first-time population

### Daily Update Step (the recurring part)

This is what runs every time Chad uses this skill (once a day):
1. Create a timestamp entry
2. Update BOTH spreadsheets with today's fresh copy of all campaign data and extra info
3. Google Sheets preserves editing history natively — so Chad can go into Google Drive, open the file, and see full version history just like any normal Google Sheet

### Execution

Run the end-of-day script:

```bash
source ~/.bashrc && python "$HOME/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨      AUTOMATIONS     🪨🪨/workspot1/--wingdashapp--1--/ADMIN/tools/end-of-day-sheets.py"
```

Capture the output. If the script exits with an error, report the error to Chad and stop. If it succeeds, proceed to confirmation.

### Confirmation Output

After successful completion, show:

```
🔵🟢🟣🔴🟠  claude  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   End of day complete.

   ✅ Master VR Chat Spreadsheet — updated
   ✅ Master VR Chat Spreadsheet 2 — updated
   🕐 Timestamp: {time}

   Google Drive history preserved — open either
   sheet to see full edit history.

   /c-launch-the-day · /c-churn · /c-1-home-mega-update · /c-payback · /c-end-of-the-day

╰────────────────────────────────────────────────╯
```

Replace `{time}` with the actual timestamp from the script output or the current time if not provided.

## Notes

- Uses Google Sheets API (same OAuth as Gmail scraper)
- Both sheets are identical backups — redundancy by design
- Version history is native Google Sheets — no custom tracking needed
- Run once per day, ideally at end of work session
- Toast protocol means first run does setup, subsequent runs just update
