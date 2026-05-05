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

**Control Panel**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 2\digital-coms-railroad\railroad-control-panel.html`

**Build Guide (source of truth)**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 2\digital-coms-railroad\build-digital-coms.html`

**Backup folder**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 2\digital-coms-railroad\backups\`

**Session logs**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 2\digital-coms-railroad\memory\`

---

## PRE-FLIGHT (runs once on invocation)

Before anything else:

1. **Verify folder structure** — confirm `digital-coms-railroad/`, `backups/`, `memory/` all exist. Create any missing.
2. **Read build-digital-coms.html** — parse and confirm `stepData` (5 sections, 16 steps: s1=4, s2-s5=3 each) and `platformData` (11 platforms x 8-10 steps = 96). Total = 112.
3. **Read railroad-control-panel.html** — check `railroadState` for any existing progress (completedSteps array, currentSection, currentStep).
4. **Create backup** — copy control panel to `backups/BACKUP--{YYYY-MM-DD}--{HH-MM}.html`
5. **Report status** in 2-3 lines: steps completed so far, current position, backup created. Thread to STEP 1.

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
Store the mode in `railroadState.mode`. Thread to STEP 2.

---

## STEP 2 — TEE UP

1. **Read control panel** — always fresh read before editing
2. **Identify next step** — based on mode and progress:
   - Main Focus: s1 step 0 → s1 step 1 → s1 step 2 → s2 step 0 → ... → s5 step 2
   - Platform Setup: iterate through selected platforms, each platform's steps in order
   - Full Run: main focus first, then all platforms
   - Resume: wherever `completedSteps` left off
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
7. Announce: section, step number, step title, whether it's a Claude step or Chad step. Thread to STEP 3.

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
   </div>
   ```
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
7. **Write session log** — append to `memory/RAILROAD-SESSION-{YYYY-MM-DD}.md`:
   ```
   ## {HH:MM} — {Job Name} Step {N}
   - Title: {step title}
   - Type: {claude|chad}
   - Status: {done|skipped}
   - Output: {brief summary}
   ```
8. Thread to STEP 5

---

## STEP 5 — PASS-OFF

Check what comes next:

### More steps in current job:
- Auto-thread to STEP 2 — no pause, no question, just flow

### Job complete:
- Use **AskUserQuestion**:
  - Question: "{Job Name} complete! What next?"
  - Header: "Next"
  - Options:
    1. "Next job" — "Continue to {next job name}"
    2. "Pause here" — "Save progress and stop"
- If Next job: thread to STEP 2 with next job
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
- **Claudify steps**: Chad flags a step for in-house build — Claude diverts, builds the process, then resumes
- **Pass-offs**: Chad can pop prompts in chat, Claude executes, results flow back into the railroad
- Everything stays in this chat + the 2 HTMLs + the skill. That's the whole system.

---

## Safety / Recovery

- **Backups**: Pre-flight creates timestamped backup before any edits
- **Fresh reads**: ALWAYS re-read the HTML before editing — another session may have changed it
- **Session logs**: Append-only daily logs in `memory/` for cross-session resume
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
- Session log APPENDS — multiple invocations on the same day stack in the same file
- Keep AskUserQuestion to 2-4 options — no fluff
- The `type` field determines Claude vs Chad step — respect it
- For Claude steps: actually do the work, don't just describe what should be done
- For Chad steps: present clearly, wait for confirmation, move on
