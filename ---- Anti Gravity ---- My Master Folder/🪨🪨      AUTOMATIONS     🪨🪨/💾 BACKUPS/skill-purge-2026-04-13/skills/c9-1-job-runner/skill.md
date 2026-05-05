---
name: c9-1-job-runner
description: Job Runner — step-by-step executor for the 112-step digital communications build, with split-screen control panel and step gauges
---

# c9-1-job-runner

Job runner for building out the Digital Coms layer. Each section is a Job, each item inside is a Step. Reads steps from the build guide, determines if it's a Claude step or a Chad step, executes or hands off, logs to Results, and updates the control panel.

112 total steps: 5 main jobs (16 steps) + 11 platform jobs (96 steps).

## Usage

```
/c9-1-job-runner
/c9-1-job-runner resume
```

## Paths

Everything lives under the AUTOMATIONS folder:
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\`

```
🪨🪨 AUTOMATIONS 🪨🪨/
├── workspot1/
│   ├── --wingdashapp--1--/          ← Wing Dashboard App (front-end)
│   │   ├── index.html               ← main app (pills, POS, switcher)
│   │   ├── data/
│   │   └── pages/left/ + pages/right/
│   └── backups/                      ← Wing Dashboard snapshots
│
├── 🧠🧠🧠 triple-brain-build-dashboard copy.html  ← Build Dashboard (canonical)
│
├── 🔧 WORK/                          ← Active railroad files
│   ├── railroad-control-panel.html   ← Control Panel (executor, state, results)
│   ├── build-digital-coms.html       ← Build Guide (step definitions + UI)
│   └── combined-build-steps.md
│
├── 💾 BACKUPS/                        ← Railroad control panel backups
│
└── ⚙️ ADMIN/
    ├── green spread folder base/      ← Green Spreadsheet master template
    │   └── green-spreadsheets-TEMPLATE.html
    ├── memory/                        ← Session logs + per-step & per-job memory
    │   └── {JobKey}-green-sheet--{date}/
    │       └── green-spreadsheets.html  ← job-specific copy
    ├── Engine Running.html             ← Live status dashboard (30s refresh, card carousel)
    ├── tools/                         ← Scripts built by railroad steps
    │   ├── gmail-scrape.py
    │   ├── imessage-pull.py
    │   ├── whatsapp-export.py
    │   ├── other-comms.py
    │   └── engine-status-writer.py    ← Companion script for Engine Running
    └── self operation/                ← Claude self-operation system
        └── claude-doesnt-stoppp-ppotsssss.html
```

**Control Panel**: `...🪨🪨 AUTOMATIONS 🪨🪨\🔧 WORK\railroad-control-panel.html`

**Build Guide (source of truth)**: `...🪨🪨 AUTOMATIONS 🪨🪨\🔧 WORK\build-digital-coms.html`

**Wing Dashboard App**: `...🪨🪨 AUTOMATIONS 🪨🪨\workspot1\--wingdashapp--1--\index.html`

**Green Spreadsheet Template**: `...🪨🪨 AUTOMATIONS 🪨🪨\⚙️ ADMIN\green spread folder base\green-spreadsheets-TEMPLATE.html`

**Per-Job Green Sheets**: `...🪨🪨 AUTOMATIONS 🪨🪨\⚙️ ADMIN\memory\{JobKey}-green-sheet--{date}\green-spreadsheets.html`

**Triple-Brain Dashboard**: `...🪨🪨 AUTOMATIONS 🪨🪨\🧠🧠🧠 triple-brain-build-dashboard copy.html`

**Railroad backup folder**: `...🪨🪨 AUTOMATIONS 🪨🪨\💾 BACKUPS\`

**Wing Dashboard backups**: `...🪨🪨 AUTOMATIONS 🪨🪨\workspot1\backups\`

**Session logs**: `...🪨🪨 AUTOMATIONS 🪨🪨\⚙️ ADMIN\memory\`

**Tools**: `...🪨🪨 AUTOMATIONS 🪨🪨\⚙️ ADMIN\tools\`

**Step memory folders**: Each completed step gets its own folder inside `⚙️ ADMIN/memory/`:
```
⚙️ ADMIN/memory/
  S1-Step1--Gmail-Scrape--2026-03-05--1430/
    step-log.md
    (any files created during this step)
  S1-Step2--iMessage-Pull--2026-03-05--1445/
    step-log.md
    (any files created during this step)
  ...
```
Folder naming: `{Section}-Step{N}--{Step-Title-Kebab}--{YYYY-MM-DD}--{HHMM}/`

---

## PRE-FLIGHT (runs once on invocation)

Before anything else:

1. **Verify folder structure** — confirm `🔧 WORK/`, `💾 BACKUPS/`, `⚙️ ADMIN/memory/`, `⚙️ ADMIN/green spread folder base/`, `⚙️ ADMIN/self operation/` all exist. Create any missing.
2. **Read build-digital-coms.html** from `🔧 WORK/` — parse and confirm `stepData` (5 sections, 16 steps: s1=4, s2-s5=3 each) and `platformData` (11 platforms x 8-10 steps = 96). Total = 112.
3. **Read railroad-control-panel.html** from `🔧 WORK/` — check `railroadState` for any existing progress (completedSteps array, currentSection, currentStep).
4. **Create backup** — copy control panel to `💾 BACKUPS/BACKUP--{YYYY-MM-DD}--{HH-MM}.html`
5. **Backup work tracker state** — preserve the current state of `claude-doesnt-stoppp-ppotsssss.html` before any work begins:
    - Check if `⚙️ ADMIN/self operation/self-op-store/` exists. If not, create it (one-time).
    - Copy `⚙️ ADMIN/self operation/claude-doesnt-stoppp-ppotsssss.html` into `self-op-store/` as `claude-doesnt-stoppp--{YYYY-MM-DD}--{HH-MM}.html`
    - Continue to next step.
6. **Reconcile state** — Compare `railroadState.completedSteps` against actual memory folders in `⚙️ ADMIN/memory/`:
    - Glob for `S*-Step*` folders. For each, extract the section+step using this formula: `S{X}-Step{N}` maps to `s{x}-{N-1}` (memory folders are 1-indexed, railroadState is 0-indexed). Examples: `S1-Step1` = `s1-0`, `S2-Step3` = `s2-2`.
    - If a memory folder exists for a step NOT in `completedSteps` → flag: "Step X has a memory folder but isn't in completedSteps — partial completion detected." Add it to `completedSteps`.
    - If `completedSteps` has an entry but no memory folder exists → flag: "Step X is in completedSteps but has no memory folder — verification gap." Surface to Chad.
    - If `loadedTasks` contains any IDs already in `completedSteps`, remove them from `loadedTasks`.
    - Continue to next step.
7. **Create job green-sheet** — for the selected job (or all jobs in scope):
    - Glob for `{JobKey}-green-sheet--*` in `⚙️ ADMIN/memory/` (exclude any with `--archived` suffix). If multiple exist, use the LATEST by date. Only create a new one if NONE exist for that job key.
    - If creating new: copy `green-spreadsheets-TEMPLATE.html` from `⚙️ ADMIN/green spread folder base/`
    - Create folder: `⚙️ ADMIN/memory/{JobKey}-green-sheet--{YYYY-MM-DD}/`
    - Fill template placeholders: `{JOB_KEY}`, `{JOB_NAME}`, `{JOB_NUM}`, `{DATE}`, `{STEP_COUNT}`, `{STEPS_JSON}`
    - Populate Steps tab from stepData/platformData for this job
    - Save as `green-spreadsheets.html` in the new folder
8. **Report status** in 2-3 lines: steps completed so far, current position, backup created, green-sheet status. Thread to STEP 1.

---

## STEP 1 — CHOOSE PATH

Use **AskUserQuestion**:
- Question: "How do you want to run the railroad?"
- Header: "Path"
- Options:
  1. "Main Focus" — "S1-S5: Comms Scrape, Social Sweep, Revio, Alley, Integration (16 steps)"
  2. "Platform Setup" — "Pick specific platforms to set up (96 steps total)"
  3. "Resume" — "Pick up from where the last session left off"
  4. "Full Run" — "All 112 steps, main focus first then platforms"

### If Platform Setup:
Use **AskUserQuestion** with multiSelect:
- Question: "Which platforms?"
- Header: "Platforms"
- Options:
  1. "General 7" — "Gmail, WhatsApp, iMessage, Messenger, Discord, VRChat, Local"
  2. "Focus 4" — "Manis, Social Sweep, Revio, Alley (detailed setup)"
  3. "All 11" — "Every platform"
- multiSelect: true

Store selected platforms in `railroadState.activePlatforms`.

### If Resume:
- Read control panel for `railroadState.completedSteps`
- Find the first incomplete step
- Announce where we're picking up from
- Thread to STEP 2

### For all paths:
Store the mode in `railroadState.mode`.

**Green-sheet status display** — after path selection, show which job green-sheets exist:
- List each job in scope with status: `✅ exists` / `🆕 will create` / `🔄 needs update`
- For Resume: read existing green-sheets to show progress summary per job
- Announce: "Green-sheets ready — {N} existing, {N} to create"

Thread to STEP 2.

---

## STEP 2 — TEE UP

1. **Read control panel** — always fresh read before editing
2. **Identify next step** — based on mode and progress:
   - Main Focus: s1 step 0 → s1 step 1 → s1 step 2 → s2 step 0 → ... → s5 step 2
   - Platform Setup: iterate through selected platforms, each platform's steps in order
   - Full Run: main focus first, then all platforms
   - Resume: wherever `completedSteps` left off
   - **Read step definitions from the CONTROL PANEL's `stepData`** (plain text titles), never from `build-digital-coms.html` (HTML-formatted titles with `<strong>` tags — display only for Chad).
3. **Update LEFT zone** of control panel:
   - Set `sectionBadge` text to job name (e.g. "JOB 1 — COMMS SCRAPE", "JOB 6 — GMAIL")
   - Set `stepTitle` to step title
   - Render step cards in `stepBody` — highlight current as `active-step`, mark completed as `completed-step`
   - Set status pill to "ACTIVE"
4. **Populate Loaded Tasks** (`#loadedBody`):
   - Clear and repopulate with ALL remaining steps across ALL sections in the current mode (excluding the active one)
   - For Main Focus: load all 16 steps (s1-s5). For Platform Setup: all selected platform steps. For Full Run: all 112.
   - The page scrolls — no truncation. 112 steps means 112 rows, period.
   - Each loaded task row:
   ```html
   <div class="loaded-row">
       <span class="lr-num">{N}</span>
       <span class="lr-title">{step title}</span>
       <span class="lr-type [chad|claude]">{CHAD|CLAUDE}</span>
   </div>
   ```
   - Update `railroadState.loadedTasks` array
5. **Set Currently Working** (`#workingBody`):
   - Clear "Standing by" and insert active working card:
   ```html
   <div class="working-card active">
       <div class="wc-agent">Main Agent</div>
       <div class="wc-task">{step title} // {section code}</div>
       <div class="wc-spinner"></div>
   </div>
   ```
   - Update `#workingStatus` to "Active"
   - Update `railroadState.currentlyWorking`
6. **Write file**
7. **Open job-specific green sheet in Chrome** — If the current job changed since last tee-up (new job or first run), open the active green sheet in the browser:
   ```bash
   source ~/.bashrc && python -c "import webbrowser; webbrowser.open('file:///{green_sheet_path}')"
   ```
   Where `{green_sheet_path}` is the latest green sheet for the current job key (glob for `{JobKey}-green-sheet--*`, use most recent by date). This replaces the template tab that /jset opened with the actual working sheet.
8. Announce: section, step number, step title, whether it's a Claude step or Chad step. Thread to STEP 3.

### How to update LEFT zone:

Replace the contents of `#stepBody` div with step cards for the current section. Each step card:
```html
<div class="step-card [active-step|completed-step]">
    <div class="sc-num">Step {N}</div>
    <div class="sc-title">{title}</div>
    <div class="sc-sub">{sub-step text}</div>
    <div class="status-pill status-[active|done|waiting]">
        <span class="sp-dot"></span> {STATUS TEXT}
    </div>
</div>
```

Update `#sectionBadgeText`, `#stepTitle`, and progress bar.

---

## STEP 3 — EXECUTE

Determine step type from the `type` field in step data.

<!-- ENGINE-RUNNING-MENU-START -->
**Before executing**, offer the Engine Running option via **AskUserQuestion**:
- Question: "How do you want to run this step?"
- Header: "Execute"
- Options:
  1. "Just run it" — "Execute normally"
  2. "Activate Engine Running HTML to handle the deeper details" — "Live status page with card carousel, dewey log, and contextual updates every 30s"
- If option 2: activate Engine Running protocol (see ENGINE RUNNING PROTOCOL section below), then proceed with execution
- If option 1: skip Engine Running, execute normally
<!-- ENGINE-RUNNING-MENU-END -->

**Currently Working zone** (`#workingBody`) should reflect what's active:
- Update the working card's `wc-task` text to show current operation
- For sub-agents, add additional working cards that stack:
```html
<div class="working-card active">
    <div class="wc-agent">Sub Agent</div>
    <div class="wc-task">{sub-task description}</div>
    <div class="wc-spinner"></div>
</div>
```

### Claude step (`type: 'claude'`):
- Do the work: research, file edits, code generation, template creation, etc.
- Capture output (what was done, any files modified, any artifacts created)
- Thread to STEP 4

### Chad step (`type: 'chad'`):
- Use **AskUserQuestion**:
  - Question: "This is your step: {step title}. What's the status?"
  - Header: "Your turn"
  - Options:
    1. "Done" — "I completed this step"
    2. "Skip" — "Skip for now, come back later"
    3. "Help" — "I need guidance on this step"
    4. "Claudify it" — "Build this as an in-house Claude process instead"
- If Done: capture any notes Chad provides, thread to STEP 4
- If Skip: add to `skippedSteps`, log as skipped, thread to STEP 4
- If Help: provide guidance based on the step's sub-items, then re-ask
- If Claudify it: divert to the CLAUDIFY SYSTEM flow (see below) — ask how to build the in-house process, then resume railroad

---

## STEP 4 — VERIFY + LOG

1. **Read control panel** — fresh read
2. **Append to Results** (`#resultsBody`):
   - Remove "output-empty" placeholder if present
   - Append an output block with what was done (append-only — never remove existing blocks)
   - Set `#resultsBadge` to "Verified" (green) or "Skipped" (gray)
   ```html
   <div class="output-block">
       <div class="ob-label">{Section Code} — Step {N}</div>
       <div class="ob-content">{What was done / result}</div>
       <div class="ob-english">
           <div class="ob-english-header">💬 English Please...</div>
           <div class="ob-eng-group">
               <span class="ob-eng-tag">What I did</span>
               <span class="ob-eng-text">{plain language summary}</span>
           </div>
           <div class="ob-eng-group">
               <span class="ob-eng-tag">What it does</span>
               <span class="ob-eng-text">{practical business value}</span>
           </div>
           <div class="ob-eng-group">
               <span class="ob-eng-tag">How to connect it</span>
               <span class="ob-eng-text">{link to Wing Dashboard + assistant mode}</span>
           </div>
           <div class="ob-eng-check">✅ Validated</div>
       </div>
   </div>
   ```

   **"English Please..." writing rules:**
   - Write all 3 groups in plain, casual language — like explaining to a friend what you just built
   - **What I did**: 1 sentence, past tense, no jargon — what action was taken
   - **What it does**: 1-2 sentences — what this means for Chad's business (Ahead Artist Solutions)
   - **How to connect it**: Specific steps to wire this into the Wing Dashboard App at `workspot1/--wingdashapp--1--/index.html` and/or assistant/work mode — reference green-spreadsheets sheets, pill names, or data flows as needed
   - **Validation**: After writing (1)(2)(3), run a quick inline check:
     - Does "What I did" accurately describe the ob-content above it?
     - Does "What it does" make sense given the Wing Dashboard app structure (pills, POS, switcher, green-spreadsheets)?
     - Does "How to connect it" reference real files/sheets/features that exist in the project?
     - If all 3 pass → `<div class="ob-eng-check">✅ Validated</div>`
     - If any is questionable → `<div class="ob-eng-check">⚠️ Needs Review</div>`

   - Update `railroadState.results` array
3. **Clear Currently Working** (`#workingBody`):
   - Replace working card(s) with idle state: `<div class="working-idle">Standing by</div>`
   - Set `#workingStatus` to "Idle"
   - Set `railroadState.currentlyWorking` to null
4. **Remove completed task from Loaded Tasks** (`#loadedBody`):
   - Remove the row for the step that just completed
   - Update `railroadState.loadedTasks`
5. **Update `railroadState`**:
   - Add step ID to `completedSteps` (or `skippedSteps`)
   - Update `currentStep` to next
   - Update progress bar percentage
6. **Write file**
7. **Create step memory folder** — inside `⚙️ ADMIN/memory/`:
   - Create folder: `{Section}-Step{N}--{Step-Title-Kebab}--{YYYY-MM-DD}--{HHMM}/`
     - Example: `S1-Step1--Gmail-Scrape--2026-03-05--1430/`
     - Title is kebab-cased (spaces → hyphens, no special chars)
   - Write `step-log.md` inside the folder:
     ```
     # {Section} — Step {N}: {Step Title}
     **Date:** {YYYY-MM-DD} {HH:MM}
     **Job:** {Job Name}
     **Type:** {claude|chad}
     **Status:** {done|skipped}

     ## What was done
     {brief summary of the work}

     ## Files created/modified
     - {list each file path, one per line}
     - (or "None" if no files were created)

     ## English Please
     - **What I did:** {plain summary}
     - **What it does:** {business value}
     - **How to connect it:** {Wing Dashboard link}
     - **Validation:** ✅ Validated / ⚠️ Needs Review
     ```
   - If the step created any output files (scripts, exports, configs, etc.), **copy or move them into this folder** so everything for that step lives in one place
   - Also append a one-liner to the daily session log `⚙️ ADMIN/memory/RAILROAD-SESSION-{YYYY-MM-DD}.md`:
     ```
     ## {HH:MM} — {Job Name} Step {N}
     - Folder: {folder name}
     - Status: {done|skipped}
     ```
8. **Update job green-sheet** — read the job's green-spreadsheet from
    `⚙️ ADMIN/memory/{JobKey}-green-sheet--{date}/green-spreadsheets.html`:
    - Update the step's row in the **Steps** tab (status → done/skipped, notes, output summary)
    - Append to **Data Capture** tab if the step produced data
    - Append to **Files** tab if files were created/modified
    - Append to **Decisions** tab if questions were asked/answered
    - Update **🔴🔴🔴 Launch** tab: mark step status, run match verification
    - Write file back
9. Thread to STEP 5

---

## STEP 5 — PASS-OFF

Check what comes next:

### More steps in current job:
- Auto-thread to STEP 2 — no pause, no question, just flow

### Job complete:
- **Review Launch tab** — read the job's 🔴🔴🔴 Launch tab and run `readyUp()` to verify all steps
- Use **AskUserQuestion**:
  - Question: "{Job Name} complete! Launch tab shows {N} ready / {N} pending / {N} mismatch. What next?"
  - Header: "Next"
  - Options:
    1. "Next job" — "Continue to {next job name}"
    2. "Let Claude keep rolling" — "Trigger self-operation work tracker for next job"
    3. "Pause here" — "Save progress and stop"
- If Next job: open the next job's green sheet in Chrome (same `webbrowser.open` pattern as STEP 2 step 7), then thread to STEP 2 with next job
- If Let Claude keep rolling:
    1. Read the job's 🔴🔴🔴 Launch tab
    2. If all items show ✅ Ready → auto-trigger `claude-doesnt-stoppp-ppotsssss` work tracker for next-job prep
    3. If any ⚠️/❌ → flag to Chad before proceeding
    4. The work tracker picks up the next job's readied items and keeps rolling
- If Pause: write final state to control panel, output summary, done

### All steps complete:
- Show completion banner in control panel
- Output final summary:
  ```
  ╔═══════════════════════════════════════════════╗
  ║  RAILROAD COMPLETE                            ║
  ╠═══════════════════════════════════════════════╣
  ║  Steps completed: {count}                     ║
  ║  Steps skipped: {count}                       ║
  ║  Session log: {filename}                      ║
  ╠═══════════════════════════════════════════════╣
  ║  Jobs:                                        ║
  ║  Job 1 Comms Scrape ..... {done/total}        ║
  ║  Job 2 Social Sweep ..... {done/total}        ║
  ║  Job 3 Revio ............ {done/total}        ║
  ║  Job 4 Alley ............ {done/total}        ║
  ║  Job 5 Integration ...... {done/total}        ║
  ║  Platforms .............. {done/total}         ║
  ╚═══════════════════════════════════════════════╝
  ```

---

## Job Reference

Hierarchy: **Job** = a whole section/platform. **Steps** = tasks within that job.

| Key | Job Name | Steps |
|-----|----------|-------|
| s1 | JOB 1 — COMMS SCRAPE | 4 |
| s2 | JOB 2 — SSWEEP | 3 |
| s3 | JOB 3 — REVIO | 3 |
| s4 | JOB 4 — ALLEY | 3 |
| s5 | JOB 5 — INTEG | 3 |
| gmail | JOB 6 — GMAIL | 8 |
| whatsapp | JOB 7 — WHATSAPP | 8 |
| imessage | JOB 8 — IMESSAGE | 8 |
| messenger | JOB 9 — MESSENGER | 8 |
| discord | JOB 10 — DISCORD | 8 |
| vrchat | JOB 11 — VRCHAT | 8 |
| local | JOB 12 — LOCAL | 8 |
| manis | JOB 13 — MANIS | 10 |
| socialsweep | JOB 14 — SSWEEP | 10 |
| revio | JOB 15 — REVIO | 10 |
| alley | JOB 16 — ALLEY | 10 |

---

## QUESTION SYSTEM

The control panel has a **Questions for Chad** zone (zone 3, right side). Claude can drop questions here at any time — Chad reviews them on his own schedule.

### When to drop a question:
- Before a Chad step: pre-load the question so Chad sees it when he opens the panel
- When context is unclear: "What are we doing here?" is a valid question
- When a decision is needed: specific choices that affect the next steps
- When a step was edited by Chad: note the edit and ask for clarification if needed
- **When Chad tells you to** — if Chad uses clear intended phrasing like "add a question to the panel" or "drop that in questions for chad", just do it immediately. No confirmation needed, no extra steps. Read panel, append, write, done.

### How to add a question:
1. Read control panel fresh
2. Append to `#questionsBody`:
```html
<div class="question-row">
    <span class="qr-badge">Q{N}</span>
    <span class="qr-text">{question text}</span>
    <span class="qr-status open">OPEN</span>
</div>
```
3. Add to `railroadState.questions` array: `{id: N, text: "...", status: "open", answer: null, step: "s1-0"}`
4. Update `#questionCount` text: `"{N} open"`
5. Write file

### When Chad answers:
- Update the question row status to `answered`
- Store the answer in `railroadState.questions`
- Update the count

### Key principle:
Questions are async — drop them and keep moving. Don't block the railroad waiting for answers unless the answer is critical to the next step.

---

## CLAUDIFY SYSTEM

The **Claudify** button lives in the left zone header, next to the JOB badge. It applies to the whole job. When Chad clicks it, a claudify question is auto-dropped in the Questions zone.

**What Claudify means:** Build a replacement in-house version of whatever the step's focus subject is. NOT "make it bigger" — just replace the external/manual approach with a Claude-powered in-house tool. Same job, built internally.

When the skill encounters a claudify request:
- **Divert** — pause normal execution
- Ask Chad: "Let me describe it" / "You draft it" / "Skip for now"
- After build: update step type, rename title, log to Results, resume

### Step Gauge

Every step card has a **mini gauge** (top-right) instead of a button. It's a cartoon car-style gauge with 3 zones:

| Needle Position | Zone | Meaning |
|----------------|------|---------|
| Left (red) | Chad side | Better if Chad does this step |
| Center (white) | Claude ready | Claude can handle this step |
| Right (green) | Claude done | Claude already did it — results logged |

The gauge is set by the `data-type` attribute on the step card and updated by the skill:
- `type: 'chad'` → needle left, label "CHAD"
- `type: 'claude'` → needle center, label "CLAUDE"
- completed claude step → needle right, label "DONE", green note shows result path

### How to update gauge via skill:
When writing step cards, call `setGaugeState(card, state, note)` in JS:
- `setGaugeState(card, 'chad')` — needle to red
- `setGaugeState(card, 'claude')` — needle to white
- `setGaugeState(card, 'done', 'results in output block #3')` — needle to green + note

### Step card template with gauge:
```html
<div class="step-card [active-step|completed-step]" data-step="{key}-{N}" data-type="[chad|claude]">
    <div class="sc-head">
        <div class="sc-head-left">
            <div class="sc-num">Step {N}</div>
            <div class="sc-title">{title}</div>
        </div>
        <div class="step-gauge" title="{type} step">
            <svg viewBox="0 0 38 22">
                <path d="M 5 19 A 14 14 0 0 1 33 19" class="gauge-bg gauge-red" />
                <path d="M 12 7 A 14 14 0 0 1 26 7" class="gauge-bg gauge-white" />
                <path d="M 26 7 A 14 14 0 0 1 33 19" class="gauge-bg gauge-green" />
                <line x1="19" y1="19" x2="{nx}" y2="{ny}" class="gauge-needle" />
                <circle cx="19" cy="19" class="gauge-dot" />
                <text x="19" y="21.5" class="gauge-label">{LABEL}</text>
            </svg>
        </div>
    </div>
    <div class="sc-sub">{sub-step text}</div>
    <div class="step-gauge-note"></div>
    <div class="status-pill status-[active|done|waiting]">
        <span class="sp-dot"></span> {STATUS TEXT}
    </div>
</div>
```

Needle coords: chad → x2=8,y2=12 | claude → x2=19,y2=5 | done → x2=30,y2=12

---

## IN-HOUSE APPROACH

All 4 focus tools (Manis, Social Sweep, Revio, Alley) are built IN-HOUSE as Claude-powered tools. No external SaaS signups.

- **Claude steps**: Claude does the actual work — builds templates, generates content, writes code, creates configs
- **Chad steps**: Chad provides input, makes decisions, reviews output
- **Claudify steps**: Chad flags a step for in-house build — Claude builds a replacement in-house version of whatever the focus subject/matter is (not "bigger" — just an in-house Claude-powered version that replaces the external/manual approach)
- **Pass-offs**: Chad can pop prompts in chat, Claude executes, results flow back into the railroad
- Everything stays in this chat + the 2 HTMLs + the skill. That's the whole system.

---

## Safety / Recovery

- **CONTAINMENT RULE**: ALL files created, modified, or exported by this skill MUST stay inside the AUTOMATIONS folder (`🪨🪨 AUTOMATIONS 🪨🪨/`). Nothing flies off to random locations. If a step produces output files, they go to `⚙️ ADMIN/tools/` or into the step's memory folder at `⚙️ ADMIN/memory/`. If a step modifies the Wing Dashboard, it edits files inside `workspot1/--wingdashapp--1--/`. No exceptions — everything stays contained.
- **Backups**: Pre-flight creates timestamped backup before any edits
- **Fresh reads**: ALWAYS re-read the HTML before editing — another session may have changed it
- **Step memory folders**: Each step gets its own timestamped folder in `⚙️ ADMIN/memory/` — all files for that step live together. Daily session log also appends a one-liner per step for quick scanning.
- **Recovery**: If an edit fails, use **AskUserQuestion**:
  - "Edit failed. What do you want to do?"
  - Options: "Rollback to backup" / "Retry" / "Skip this step"
- **Results are append-only** — never removed, only added
- **State lives in HTML** — if session crashes, resume reads from the control panel's `railroadState` object
- **4 right-side zones**: Loaded Tasks (`#loadedBody`), Currently Working (`#workingBody`), Questions (`#questionsBody`), Results (`#resultsBody`)

---

## Threading Rules

- Every step flows into the next — no dead ends, no "let me know when ready" pauses
- Within a section: auto-thread (STEP 5 → STEP 2 with no question)
- Between sections: ask once (next or pause)
- Context carries: what happened in prior steps informs current step
- The railroad never stops — always threads forward or wraps cleanly
- Talk to Chad like a teammate — short, direct, capable
- Use the Hub Color Stack box for all output per Chad's format rules

---

## Important Notes

- ALWAYS read the control panel HTML before editing — never edit from memory
- Pre-flight runs ONCE per invocation
- Backup is created ONCE at start
- Each step creates its own memory folder: `{Section}-Step{N}--{Title-Kebab}--{Date}--{Time}/` inside `⚙️ ADMIN/memory/`
- Daily session log still appends one-liners — multiple invocations on the same day stack in the same file
- Keep AskUserQuestion to 2-4 options — no fluff
- The `type` field determines Claude vs Chad step — respect it
- For Claude steps: actually do the work, don't just describe what should be done
- For Chad steps: present clearly, wait for confirmation, move on

---

## Green-Sheet Per-Job Memory System

Each job gets its own green-spreadsheet copy stored in `⚙️ ADMIN/memory/{JobKey}-green-sheet--{date}/green-spreadsheets.html`.

**Template location:** `⚙️ ADMIN/green spread folder base/green-spreadsheets-TEMPLATE.html`

**Template placeholders:**
- `{JOB_KEY}` — job key from Job Reference (e.g. `s1`, `gmail`, `alley`)
- `{JOB_NAME}` — full job name (e.g. `JOB 1 — COMMS SCRAPE`)
- `{JOB_NUM}` — job number (e.g. `1`, `6`, `16`)
- `{DATE}` — creation date `YYYY-MM-DD`
- `{STEP_COUNT}` — number of steps in this job
- `{STEPS_JSON}` — JSON array of step titles for this job

**5 tabs per green-sheet:**
1. **Steps** — one row per step (title, type, status, notes, output)
2. **Data Capture** — step outputs, scrape results, collected data
3. **Decisions** — questions asked, answers given, choices made
4. **Files** — every file created/modified during this job
5. **🔴🔴🔴 Launch** — springboard tab (cross-references steps vs memory vs control panel)

**Launch tab verification chain:**
```
Memory folder (step-logs)
        ↓ verified match
Green-sheet Steps tab (per-job data)
        ↓ feeds into
🔴🔴🔴 Launch tab (readied + cross-referenced)
        ↓ springboard to
claude-doesnt-stoppp-ppotsssss (churns tasks, logs results)
        ↓ writes back to
Memory folder + Green-sheet (loop closed)
```

---

## Self-Operation System

**Work tracker:** `⚙️ ADMIN/self operation/claude-doesnt-stoppp-ppotsssss.html`

The Launch tab is **relative** (per-job). The work tracker is **absolute** — it collects from ALL active Launch tabs across all jobs and sequences the work.

**How it works:**
1. Job completes → Launch tab verifies all steps
2. If all ✅ Ready → work tracker picks up next job's readied items
3. If ⚠️/❌ exist → flags to Chad before proceeding
4. Work tracker churns through tasks, logs results, writes back to memory

**Registry feature (planned — not yet implemented):** Per-job output in two modes:
1. **Overlay tile** — upper-right corner, always-on, matches job CSS theme
2. **TXT file** — `⚙️ ADMIN/self operation/{JobKey}-registry--{date}.txt`

---

## Output Footer Reminder

Every job runner output (step completions, status reports, pass-off messages, completion banners)
must include this line at the very bottom, after all other content:

```
  ref: railroad-system-guide.md (memory) — visual system reference, non-operational
```

This is a **reminder for Chad only** — not a dependency. The guide is never read, loaded, or
referenced during skill execution. It exists in memory as a backup reference file.
The job runner operates entirely from this skill file + the HTML files listed above.

---

<!-- ENGINE-RUNNING-PROTOCOL-START -->
## ENGINE RUNNING PROTOCOL

**File:** `...AUTOMATIONS.../ADMIN/Engine Running.html`
**Companion script:** `...AUTOMATIONS.../ADMIN/tools/engine-status-writer.py`

### When to activate
- Chad selects "Activate Engine Running HTML to handle the deeper details" in STEP 3 menu
- Once activated, stays on for the rest of the session (no re-asking per step)

### Activation sequence
1. Run the companion script: `source ~/.bashrc && python "{ADMIN}/tools/engine-status-writer.py"`
2. Read the JSON output
3. Apply the output to Engine Running HTML via Edit tool:
   - Update status fields between `<!-- STATUS-START -->` / `<!-- STATUS-END -->`
   - Update card content between `<!-- CARD-1-START -->` / `<!-- CARD-1-END -->` (same for cards 2-4)
   - Append dewey entry between `<!-- DEWEY-START -->` / `<!-- DEWEY-END -->`
   - Set mode beacon/badge between `<!-- ENGINE-MODE-START -->` / `<!-- ENGINE-BADGE-START -->` markers
4. Open in browser (first activation only): `source ~/.bashrc && python -c "import webbrowser; webbrowser.open('file:///{ENGINE_HTML_PATH}')"`

### Update cadence
- Every Edit to Engine Running HTML = exactly 1 dewey log entry appended (1:1 rule)
- Browser auto-refreshes every 30 seconds via meta tag
- Card carousel cycles every 7 seconds via CSS animation (independent of refresh)
- Status text fields only change when Claude edits the file

### Dewey log format
Each entry appended inside the DEWEY markers:
```html
<div class="dewey-entry"><span class="de-index">[JOB.STEP]</span><span class="de-time">HH:MM</span>description of what changed</div>
```
- Remove the `dewey-empty` placeholder on first real entry
- Index format: `[001.01]` = Job 1, Step 1 (zero-padded)

### Mode switching
- LOADING (work active): beacon orange pulse, badge says LOADING
- WAITING (idle): beacon amber breathe, badge says WAITING
- Switch by editing the `class` attribute on `.eh-beacon` and `.eh-mode` elements between markers

### Safety
- Engine Running is display-only — never controls job runner logic
- All edits use unique markers — no collision with control panel edits
- If Engine Running HTML is missing or broken, job runner continues normally
<!-- ENGINE-RUNNING-PROTOCOL-END -->
