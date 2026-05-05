# Pickup Prompt — Green-Sheet Per-Job Memory + Self-Operation System

**Date:** 2026-03-05
**Session:** Plan 1 + Plan 2 implementation

---

## What Was Built

### Plan 1: Green-Sheet Per-Job Memory System
1. **skill.md paths updated** — removed green-spreadsheets.html from wingdashapp tree, added `green spread folder base/` and `self operation/` under ⚙️ ADMIN
2. **Template created** — `green-spreadsheets-TEMPLATE.html` with 6 placeholders (`{JOB_KEY}`, `{JOB_NAME}`, `{JOB_NUM}`, `{DATE}`, `{STEP_COUNT}`, `{STEPS_JSON}`)
3. **5 tabs per job sheet:** Steps, Data Capture, Decisions, Files, 🔴🔴🔴 Launch
4. **Launch tab** — cross-references Steps tab against memory folders and railroadState, with `readyUp()` and `getLaunchSummary()` JS functions
5. **PRE-FLIGHT updated** — step 5 now creates job green-sheets from template
6. **STEP 4 updated** — step 8 now updates job green-sheet after each completed step
7. **STEP 1 updated** — shows green-sheet status per job after path selection
8. **STEP 5 updated** — "Let Claude keep rolling" option triggers self-operation

### Plan 2: Self-Operation System
1. **Folder created** — `⚙️ ADMIN/self operation/`
2. **Work tracker built** — `claude-doesnt-stoppp-ppotsssss.html` with:
   - Task queue (collects from ALL active Launch tabs)
   - Registry tile (upper-right, always-on status)
   - Execution log
   - `loadFromLaunchTab()`, `startNextTask()`, `completeTask()`, `flagTask()`, `exportRegistry()` JS API
3. **Verification chain documented** in skill.md:
   ```
   Memory folder → Green-sheet Steps → Launch tab → Work tracker → Memory (loop closed)
   ```

---

## Current State

- **skill.md** — fully updated with both Plan 1 and Plan 2 changes
- **Template** — ready for per-job copies (skill creates them in PRE-FLIGHT)
- **Work tracker** — ready for Launch tab data (skill triggers it in STEP 5)
- **Original green-spreadsheets.html** — still lives in `green spread folder base/` (not deleted)
- **No green-sheets created yet** — they get created at runtime when the job runner runs

---

## How to Resume

1. Run `/c9-1-job-runner` — PRE-FLIGHT will create green-sheet folders for selected jobs
2. Each step completion updates the job's green-sheet (Steps tab, Data Capture, Files, Decisions)
3. When a job completes, Launch tab runs `readyUp()` to verify all steps
4. "Let Claude keep rolling" in STEP 5 triggers the work tracker
5. Work tracker picks up readied items from Launch tab and churns through them

---

## Key Files

| File | Path |
|------|------|
| skill.md | `C:\Users\chad\.claude\skills\c9-1-job-runner\skill.md` |
| Template | `⚙️ ADMIN/green spread folder base/green-spreadsheets-TEMPLATE.html` |
| Work Tracker | `⚙️ ADMIN/self operation/claude-doesnt-stoppp-ppotsssss.html` |
| Per-job sheets | `⚙️ ADMIN/memory/{JobKey}-green-sheet--{date}/green-spreadsheets.html` |
| Registry exports | `⚙️ ADMIN/self operation/{JobKey}-registry--{date}.txt` |

---

## Template Placeholders

| Placeholder | Example Value |
|-------------|---------------|
| `{JOB_KEY}` | `s1`, `gmail`, `alley` |
| `{JOB_NAME}` | `JOB 1 — COMMS SCRAPE` |
| `{JOB_NUM}` | `1`, `6`, `16` |
| `{DATE}` | `2026-03-05` |
| `{STEP_COUNT}` | `4`, `8`, `10` |
| `{STEPS_JSON}` | `["Gmail Scrape", "iMessage Pull", ...]` |
