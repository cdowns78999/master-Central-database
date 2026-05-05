---
name: c9-1-build-memory
description: Build memory engine — holds working context across sessions with pickup prompts and auto job reports
---

# c9-1-build-memory

Holds **working memory** while you're building. Two automatic processes keep every session caught up: a living Pickup Prompt and stacking Job Reports.

## Usage

```
/c9-1-build-memory
/c9-1-build-memory [project or context name]
```

## Instructions

### Core Processes

**1. Pickup Prompt** — A living context block that gets updated every input/output cycle.
- Per cycle: add a basic timestamp + in a few detailed minimal concise words with rich value, share what the updates were
- Contains: project context, last completed work, files in play, paths impacted with descriptions, still-on-deck items
- Any session that reads it is immediately caught up — no guessing

**2. Job Report** — After every completed job, present a formatted summary box:

```
╭────────────────────────────────────────────────╮
│                                                │
│   [Job Name] — [concise what-changed,          │
│   rich detail, minimal words]                  │
│                                                │
│   [repeat per job completed this cycle]        │
│                                                │
│   [N] files touched, [N] new, [N] broken.     │
│                                                │
╰────────────────────────────────────────────────╯
```

Rules:
- One line per job — bold name, punchy description
- End with file tally (touched / new / broken)
- If additional outputs are requested, do those AND still include this box — it stacks
- This is the standard receipt — every cycle gets one

### How They Connect

- Pickup Prompt = the **state** (where are we)
- Job Report = the **receipt** (what just happened)
- Together they form **rolling memory** — read state → do work → write receipt → update state
- The HTML file stores the full history

### Paths

**Automation home (A6):**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A6  -- --- Build Memory\`

**Backup folder:**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A6  -- --- Build Memory\-- ☁️☁️a6 back up\`

**Sessions folder (1 folder per invocation):**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A6  -- --- Build Memory\-- sessions\`

**Base HTML template:**
`build-memory-base.html` in A6 root — gets copied into each session folder

**Concept doc (source of truth):**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 1\build-memory-concept.md`

### Design Language

Same salt rock lamp palette as all Build Companion tools:
- `--lamp-deep: #c2560a`, `--lamp-mid: #e07b2e`, `--lamp-warm: #f2a54a`, `--lamp-soft: #f8c97d`, `--lamp-glow: #fde8c8`
- Fonts: Outfit (body) + JetBrains Mono (labels/code)
- White borders with dimension, rounded 16px cards

---

## STEP ZERO — Backup + Session Setup

On EVERY `/c9-1-build-memory` invocation:

1. Check A6 folder exists — if not, create it + backup + sessions subfolders
2. Create a new timestamped session folder: `YYYY-MM-DD_HHMM/` inside `-- sessions/`
3. Copy `build-memory-base.html` into that session folder as `build-memory-session.html`
4. Create `job-reports.md` in that session folder (empty, ready for stacking)

---

## STEP ONE — Interactive Menu

Present **AskUserQuestion** with two questions:

**Q1** — Header: "Pickup"
- Question: "Store your job updates for this process? (Pick Up Prompt)"
- Options:
  1. "Yes, update pickup" — "Update the pickup prompt with current context each cycle"
  2. "No, just show state" — "Skip updates, just show me what's current"

**Q2** — Header: "Reports"
- Question: "Job report per output?"
- Options:
  1. "Yes, auto-report" — "Show the job summary box after every completed job"
  2. "No, on request" — "Only show reports when I ask"

---

## STEP TWO — Begin Session

Based on menu choices:

- If Pickup = Yes: read the current pickup prompt state, update it per cycle going forward
- If Reports = Yes: after every job completion, produce the job report box AND append to `job-reports.md`
- Begin work. The memory engine runs in the background of whatever build is happening.

---

## STEP THREE — Per Cycle Updates

Every input/output cycle during an active session:

1. **Timestamp**: `[YYYY-MM-DD ~HH:MM]`
2. **Pickup Prompt update**: Add what changed in a few rich concise words
3. **Job Report** (if jobs completed): Present the box, append to session log
4. **HTML update**: If the session HTML is open, update the pickup content and report log sections

---

## STEP FOUR — Session Close

When the user is done or conversation ends:

1. Final pickup prompt update with "session closed" note
2. Final job report if any pending
3. The session folder now contains the complete history for that invocation
4. Next invocation reads the latest session to pick up where we left off

---

## Notes

- Each `/c9-1-build-memory` call = a new job from the user's UX perspective
- The session folder system means you can always go back to any point in time
- This skill layers on top of any other build work — it's the memory, not the builder
- Works alongside c9-1-build, pass-through, multi-job, or any other workflow
- The hub color box (`🔵🟢🟣🔴🟠 claude`) still wraps all outputs as always
