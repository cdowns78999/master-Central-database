---
name: jset
description: Session ignition — opens all project tabs in Chrome, resumes from pickup prompt, then launches the job runner
---

# jset

One command to set up your entire working session. Tabs open INSTANTLY — everything else rides behind.

## Usage

```
/jset              # full sequence: tabs → resume check → job runner
/jset --tabs       # only open Chrome tabs, skip the rest
/jset --resume     # only check resume state, skip tabs
/jset --help       # show the full HOW IT WORKS visual
```

## Python Setup

Python 3.12 is installed at `C:\Users\chad\AppData\Local\Programs\Python\Python312\python.exe`.
The PATH is configured in `~/.bashrc` so `python` resolves to the real install (not the Windows Store alias).

**Always run Python like this:**
```bash
source ~/.bashrc && python "<script path>"
```

The `source ~/.bashrc` ensures PATH is loaded in the Bash tool's non-interactive shell. Never use `python3` — it hits the Windows Store alias. Always use `python`.

## Instructions

**CRITICAL: The VERY FIRST action on any /jset invocation (except --resume) is opening tabs. No text output, no box, no greeting, no visual — just fire the script IMMEDIATELY.**

### Step 1: Open Chrome Tabs — INSTANT

The absolute first tool call. No preamble. No output before this.

**Script path:**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\open-tabs.py`

Run via Bash:
```bash
source ~/.bashrc && python "C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\open-tabs.py"
```

If `--resume` was passed, skip this step entirely.

**Tabs opened (7 total):**
1. Railroad Control Panel
2. Build Guide (build-digital-coms.html)
3. Green Sheet Template
4. Work Tracker (claude-doesnt-stoppp-ppotsssss.html)
5. Wing Dashboard
6. Triple Brain Build Dashboard
7. Engine Running (live status page — auto-refreshes every 30s)

Opens directly from disk — no server dependency.

### Step 2: Resume Check (runs IN PARALLEL with tab opening settling)

**Base path for all scans:**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨`

Run ALL THREE checks in parallel (single message, multiple tool calls):

1. **Check for pickup prompts** — Glob for `**/⚙️ ADMIN/memory/SYSTEM-BACKUP--*/PICKUP-PROMPT.md` under the base path. Read the most recent one (by date in folder name).
2. **Check railroadState** — Read `🔧 WORK/railroad-control-panel.html` under the base path and extract the `railroadState` object to see current section + step.
3. **Check green-sheet status** — Glob for `**/⚙️ ADMIN/memory/*green-sheet*` under the base path (exclude any with `--archived` suffix) to see which jobs have active green sheets.

### Step 3: One-Line Status

After tabs + checks land, show ONE compact status line inside the box:

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

  ─── jset ─────────────────────
  ✓ 7 tabs · {section} step {N} · {count} sheets
  ───────────────────────────────

╰────────────────────────────────────────────────╯
```

If pickup prompt is stale (>1 day), append `· pickup stale ({N}d)` to the status line.

If `--tabs` was passed, stop here. Do not proceed to Step 4.

### Step 4: Launch Job Runner

Immediately invoke the `/c9-1-job-runner` skill.

- If railroadState shows progress (completedSteps > 0), pass `resume` to pick up where we left off
- If railroadState is fresh (step 0, no completed steps), start from scratch

This hands off fully to the job runner skill — jset's work is done.

---

## How It All Works — Visual Flow

**Only displayed when `/jset --help` is passed.** Not shown on normal invocations.

```
  ─── /jset · HOW IT WORKS ──────────────────────────────────────

  STEP 1 · IGNITION
  ─────────────────
  Opens 7 Chrome tabs from disk (file:// URLs, no server):
    1. Railroad Control Panel    ← live scoreboard (auto-refreshes every 30s)
    2. Build Guide               ← the 112-step blueprint
    3. Green Sheet Template      ← base template (job runner swaps to active sheet)
    4. Work Tracker              ← tracks setups applied to end product (30s refresh)
    5. Wing Dashboard            ← the end product
    6. Triple Brain Dashboard    ← build companion
    7. Engine Running            ← Sims-style live status (auto-refreshes every 30s)

  STEP 2 · RESUME CHECK
  ─────────────────────
  Reads 3 things in parallel:
    • railroadState     → current section + step
    • pickup prompts    → most recent session state
    • green sheet count → which jobs have active sheets

  STEP 3 · HAND-OFF TO JOB RUNNER
  ────────────────────────────────
  Launches /c9-1-job-runner which takes over from here.
  Job runner owns: pre-flight, step execution, verification, logging.

  ─── GREEN SHEETS · THE NUANCE ─────────────────────────────────

  STRUCTURE: 1 green sheet HTML per job (s1, s2, s3, s4, s5)
  Each green sheet has 5 TABS inside it:

    Tab 1 · Steps           → step-by-step checklist for this job
    Tab 2 · Data Capture    → inputs, outputs, values collected
    Tab 3 · Decisions       → choices made during execution
    Tab 4 · Files           → files created/modified by this job
    Tab 5 · Launch          → THE FINAL TAB (see below)

  THE FINAL TAB — what it does:
  ─────────────────────────────
  Launch tab is the GATE. It runs readyUp() which cross-references:
    • Memory folders (S1-Step1, S1-Step2...)  ← do the receipts exist?
    • railroadState.completedSteps            ← does the control panel agree?
    • Green sheet Steps tab                   ← does the sheet agree?

  ALL 3 must match. If any disagree, Launch flags it.
  Only when Launch says "ready" does the work tracker pick it up.

  Launch tab also runs getLaunchSummary() which packages:
    { jobKey, jobName, steps[], verifiedCount, pendingCount, ready }
  ...and feeds it to the work tracker.

  ─── SELF OPERATIONS · THE SECOND LAYER ────────────────────────

  Railroad Control Panel = "Are we BUILDING the tools?"
  Work Tracker            = "Are the built tools APPLIED to the product?"

  The work tracker (claude-doesnt-stoppp) reads Launch tab summaries
  from completed jobs and sequences them as application tasks.
  Claude edits trackerState directly in the HTML (same pattern as
  railroadState). The tracker displays truth — Claude generates it.

  ─── KEY MATCHES · WHAT CONNECTS TO WHAT ───────────────────────

  FILE                          CONNECTS TO                  HOW
  ───────────────────────────── ─────────────────────────── ──────────────────
  railroad-control-panel.html   railroadState               Claude edits state
                                → green sheet readyUp()     completedSteps fed in
                                → skill.md PRE-FLIGHT       read on every session

  green-spreadsheets.html       Steps/Data/Decisions/Files  Claude updates per step
                                → Launch tab readyUp()      cross-refs memory + CP
                                → getLaunchSummary()        feeds work tracker

  claude-doesnt-stoppp.html     trackerState                Claude edits state
                                ← getLaunchSummary()        reads from Launch tabs
                                → memory folders            logs results back

  build-digital-coms.html       stepData + platformData     source of truth for
                                → control panel stepData    step definitions

  Memory folders (ADMIN/)       step-log.md per step        proof of completion
                                → readyUp() checks these    must exist to verify
                                → session logs              daily append

  Engine Running.html           statusPhase/Message/Notes   Claude edits live status
                                → card carousel             4 cycling info cards (7s CSS)
                                → dewey log                 1 entry per edit (1:1 rule)
                                ← engine-status-writer.py   reads railroadState, outputs JSON

  skill.md (job runner)         orchestrates ALL of above   the foreman

  INDEXING NOTE:
    Memory folders = 1-indexed (S1-Step1, S1-Step2)
    railroadState  = 0-indexed (s1-0, s1-1)
    These are different systems — never cross them.

  ──────────────────────────────────────────────────────────────
```
