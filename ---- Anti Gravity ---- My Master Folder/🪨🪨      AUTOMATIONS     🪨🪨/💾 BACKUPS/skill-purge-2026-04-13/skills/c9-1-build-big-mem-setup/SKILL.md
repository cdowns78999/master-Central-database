---
name: c9-1-build-big-mem-setup
description: Unified launchpad — readies Build Companion, Memory Engine, and Multi-Job Runner, then orchestrates all three from one menu
---

# c9-1-build-big-mem-setup

One command to prep three skills and launch orchestrated work. Handles all infrastructure setup, then presents a single menu to kick off builds with memory tracking and parallel job management.

## Usage

```
/c9-1-build-big-mem-setup
/c9-1-build-big-mem-setup [idea or job list]
```

## Skills Orchestrated

| Skill | Role |
|-------|------|
| `/c9-1-build` | Per-job engine — research → dashboard → work mode |
| `/c9-1-build-memory` | Memory wrapper — pickup prompts + job reports every cycle |
| `/c9-1-multi-job` | Outer shell — parallel dispatch + live emoji tracker |

---

## PRE-FLIGHT — Infrastructure Setup (runs automatically on invoke)

On EVERY `/c9-1-build-big-mem-setup` invocation, run ALL of the following before presenting any menu:

### A6 — Memory Engine Setup

**Paths:**
- A6 home: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A6  -- --- Build Memory\`
- A6 backup: `...\-- 🪨A6  -- --- Build Memory\-- ☁️☁️a6 back up\`
- A6 sessions: `...\-- 🪨A6  -- --- Build Memory\-- sessions\`

Steps:
1. Check A6 folder exists — if not, create it + backup + sessions subfolders
2. Create timestamped session folder: `YYYY-MM-DD_HHMM/` inside `-- sessions/`
3. Copy `build-memory-base.html` into that session folder as `build-memory-session.html`
4. Create empty `job-reports.md` in that session folder

### A5 — Build Companion Setup

**Paths:**
- A5 home: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A5  -- --- Build Companion\`
- A5 backup: `...\-- 🪨A5  -- --- Build Companion\-- ☁️☁️a5 back up\`

Steps:
1. Check A5 folder exists — if not, create it + backup subfolder
2. Scan for existing `build-*.html` files in A5
3. Back them up to A5 backup with date prefix: `MM-DD-YYYY -- build-[name].html`

### Multi-Job Tracker Init

1. Initialize empty emoji registry (no duplicates within session)
2. Status grid ready — zero rows, grows as jobs are added

### PRE-FLIGHT Output

One consolidated confirmation box — three checkmarks:

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮
│                                                │
│  PRE-FLIGHT COMPLETE                           │
│                                                │
│  ✅ A6 Memory — session folder created         │
│     {session path}                             │
│                                                │
│  ✅ A5 Build — backups secured                 │
│     {N files backed up / or "clean slate"}     │
│                                                │
│  ✅ Multi-Job — tracker initialized            │
│     emoji registry + status grid ready         │
│                                                │
│  3 skills prepped. Moving to job collection.   │
│                                                │
╰────────────────────────────────────────────────╯
```

---

## STEP ONE — Unified Job Collection Menu

If the user passed jobs with the command, parse them and skip the menu. Otherwise:

Use **AskUserQuestion**:
- Header: "Jobs"
- Question: "3 skills readied — what jobs and how many?"
- Options:
  1. "One build" — "single project, I'll describe it"
  2. "Multiple builds" — "I'll list them out"
  3. "From a plan file" — "read jobs from an existing plan"

### After collecting jobs:

For each job:
1. Classify type: client tool / internal system / content piece
2. Assign a unique emoji per multi-job convention (never reuse within session)
3. Show the first tracker output with all rows as `.....`

### Tracker format (from c9-1-multi-job):

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮
│                                                │
│  {emoji row — all jobs, side by side}          │
│                                                │
│  Jobs locked in. Setting memory preferences.   │
│                                                │
│ ┌─────────────────────────────────────────────┐│
│ │ {emoji} {name} → .....                      ││
│ │ {emoji} {name} → .....                      ││
│ └─────────────────────────────────────────────┘│
│                                                │
╰────────────────────────────────────────────────╯
```

---

## STEP TWO — Memory Preferences

Two quick toggles that apply globally to the whole session.

Use **AskUserQuestion** with two questions:

**Q1** — Header: "Pickup"
- Question: "Update pickup prompt each cycle? (rolling context)"
- Options:
  1. "Yes, update pickup" — "Living context block updated every cycle"
  2. "No, skip pickup" — "No rolling context updates"

**Q2** — Header: "Reports"
- Question: "Auto job reports per output?"
- Options:
  1. "Yes, auto-report" — "Job summary box after every completed job"
  2. "No, on request" — "Only show reports when I ask"

Store these preferences — they govern the memory wrapper behavior for the entire session.

---

## STEP THREE — Launch + Orchestrate

The three skills interlock:

### Single Job
- Build protocol runs directly: research → dashboard → spec review → work mode (c9-1-build STEP ONE through WORK MODE)
- Memory wraps every cycle (pickup prompt updates + job report after each step, per preferences)
- Tracker shows 1 row, updates status on every output

### Multiple Jobs
- Multi-job launches sub-agents in parallel, each running the full build protocol
- Memory wraps globally — pickup prompt covers all active jobs, reports stack per job
- Tracker shows all rows, updates as agents complete

### Per-cycle behavior (EVERY output):

1. **Tracker** — full emoji row + status grid (always, even single job)
2. **Pickup prompt update** (if enabled) — timestamp + what changed in a few rich concise words
3. **Job report** (if enabled + job completed) — formatted summary box appended to `job-reports.md`
4. **HTML update** — if session HTML is open, update pickup content + report log

### Build protocol per job (from c9-1-build):

1. Capture the goal (STEP ONE)
2. Research + build dashboard HTML (STEP TWO)
3. Spec review (STEP THREE)
4. Explain or work mode (STEP FOUR)
5. Work mode execution with ✅/🧑 step audit (WORK MODE)
6. Dashboard updates after every step

### Status language for tracker:

- `.....` = pending
- `researching` / `building dashboard` / `spec review` / `work mode` = in progress
- `done, {detail}` = complete
- `failed, see error` = failed

---

## STEP FOUR — Pass-Off

When all jobs are done:

1. Final memory update — close pickup prompt with "session closed" note, final job report
2. Show the banner:

```
╔═══════════════════════════════════════╗
║                                       ║
║     ANY OTHER JOB FOR ME?             ║
║                                       ║
╚═══════════════════════════════════════╝
```

3. Use **AskUserQuestion**:
- Question: "Add more jobs to this session?"
- Header: "Continue"
- Options:
  1. "Yes — more jobs" — "add to the tracker and keep going"
  2. "No — wrap up" — "show final summary and close"

### If Yes:
- Loop back to STEP ONE (job collection)
- New jobs get new emojis and new rows
- Previous completed jobs stay in the tracker with checkmarks
- Memory preferences carry over (no re-asking)

### If No:
- Output the final full tracker one last time (all rows, final statuses)
- Final session summary with total jobs completed, files touched, time span

---

## Design Language

Same salt rock lamp palette as all Build Companion tools:
- `--lamp-deep: #c2560a`, `--lamp-mid: #e07b2e`, `--lamp-warm: #f2a54a`, `--lamp-soft: #f8c97d`, `--lamp-glow: #fde8c8`
- Fonts: Outfit (body) + JetBrains Mono (labels/code)
- White borders with dimension, rounded 16px cards

---

## Key Rules

- **PRE-FLIGHT runs first, always** — no menus before infrastructure is confirmed
- **Tracker on every output** — even for single jobs, consistent format
- **Memory is a wrapper, not a separate agent** — it post-processes every output cycle automatically
- **One consolidated PRE-FLIGHT** — not three separate confirmations
- **Memory preferences AFTER job collection** — know what you're building before deciding tracking settings
- **Hub Color Stack box wraps all outputs** — per Chad's locked format
- **Re-read HTML before editing** — another session may have changed it
- **Talk to Chad like a teammate** — short, direct, no fluff
- **AskUserQuestion for all menus** — keep options to 2-3, no bloat
- **Jobs can be added mid-session at any time** — tracker just grows
