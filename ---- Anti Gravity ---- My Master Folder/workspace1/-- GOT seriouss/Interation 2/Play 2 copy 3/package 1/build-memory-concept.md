# Build Memory — Skill Concept

> **Skill:** `c9-1-build-memory`
> **Automation Slot:** A6
> **Design Language:** Salt Rock Lamp
> **Status:** Concept / Pre-Build
> **Date Filed:** 2026-03-03

---

## What It Does

Holds **working memory** across sessions while you're building. Two core processes run automatically:

1. **Pickup Prompt** — A living context block that gets updated every cycle. When a new session starts, reading this catches Claude up instantly on: what was done, what files were touched, what's still on deck.

2. **Job Report** — After every completed job (or set of jobs), a formatted summary box gets produced and logged. Timestamps, paths impacted, concise rich descriptions.

---

## How Pickup Prompt Works

- Lives inside the build dashboard HTML (currently in the triple-brain-build-dashboard)
- Gets updated per input/output cycle with a timestamp
- Contains:
  - Project context
  - Last completed work
  - Files in play
  - Paths impacted with descriptions
  - Still-on-deck items
- Any session that reads it is immediately caught up
- The note inside tells Claude: *"per each input/output cycle, add a basic timestamp and — in a few detailed minimal concise words with rich value — share what the updates were"*

### Pickup Prompt — Example Block

```html
<!-- === PICKUP PROMPT === -->
<!-- Per each input/output cycle, add a basic timestamp and — in a few
     detailed minimal concise words with rich value — share what the
     updates were. -->

<div class="pickup-prompt" data-last-updated="2026-03-03T10:30:00">
  <h3>🪨 Pickup Prompt</h3>

  <p><strong>Project Context:</strong> Building the c9-1-build-memory skill —
  session memory engine for the build companion toolset.</p>

  <p><strong>Last Completed:</strong> Filed concept doc at package 1/build-memory-concept.md.
  Full architecture, folder structure, menu flow, and prep-for-SKILL notes locked in.</p>

  <p><strong>Files In Play:</strong></p>
  <ul>
    <li><code>build-memory-concept.md</code> — source of truth for this skill</li>
    <li><code>triple-brain-build-dashboard copy.html</code> — will host the pickup prompt block</li>
  </ul>

  <p><strong>On Deck:</strong> Build the SKILL.md, wire up session folder creation,
  design the job report box styling.</p>
</div>
<!-- === /PICKUP PROMPT === -->
```

---

## How Job Report Works

After finishing a job, Claude presents work in a formatted box:

```
╭────────────────────────────────────────────────╮
│                                                │
│   [Job Name] — [concise what-changed]          │
│                                                │
│   [N] files touched, [N] new, [N] broken.     │
│                                                │
╰────────────────────────────────────────────────╯
```

### Rules

- One line per job — bold name, punchy description
- Always ends with file tally (touched / new / broken)
- If other outputs are requested, this box **STILL** gets included — it stacks
- Timestamps are always present
- Paths impacted get listed if more than 2 files were touched

### Job Report — Multi-Job Stack Example

```
╭────────────────────────────────────────────────╮
│                                                │
│   Concept Doc — filed build-memory-concept.md  │
│   with full architecture and folder map.       │
│                                                │
│   1 file touched, 1 new, 0 broken.             │
│                                                │
│   Dashboard Wire — added pickup prompt block   │
│   to triple-brain-build-dashboard.             │
│                                                │
│   1 file touched, 0 new, 0 broken.             │
│                                                │
╰────────────────────────────────────────────────╯
```

---

## How They Connect

- **Pickup Prompt** = the **state** (where are we)
- **Job Report** = the **receipt** (what just happened)
- Together they form a **rolling memory** — every session reads the state, does work, writes a receipt, updates the state
- The HTML file stores the full history

### Flow Diagram

```
Session Start
    │
    ▼
Read Pickup Prompt  ──►  Claude is caught up
    │
    ▼
Do Work  ──►  Files touched, things built
    │
    ▼
Write Job Report  ──►  Receipt logged to job-reports.md
    │
    ▼
Update Pickup Prompt  ──►  State refreshed for next session
    │
    ▼
Session End
```

---

## Skill Invocation = New Job

- Each time `/c9-1-build-memory` is called, it marks a **new job** from the user's perspective
- A new timestamped folder gets created for that invocation
- Base HTML gets copied in as the starting state
- Work happens, reports stack, pickup prompt updates
- When done, the final state is the new "current" for next session

### Invocation Lifecycle

```
/c9-1-build-memory
    │
    ├── 1. Create timestamped session folder
    ├── 2. Copy base HTML into session folder
    ├── 3. Present interactive menu (Q1, Q2)
    ├── 4. Begin work cycle
    │       ├── Do job
    │       ├── Write job report (if enabled)
    │       └── Update pickup prompt (if enabled)
    └── 5. Final state = new "current" for next session
```

---

## Folder Structure (Automations A6)

```
🪨🪨 AUTOMATIONS 🪨🪨/
  -- 🪨A6  -- --- Build Memory/
    build-memory-base.html          ← base template (always here)
    -- ☁️☁️a6 back up/             ← backups with date prefix
    -- sessions/                    ← 1 folder per invocation
      2026-03-03_1030/              ← timestamped session folder
        build-memory-session.html   ← that session's state
        job-reports.md              ← stacked job receipts
      2026-03-03_1145/
        ...
```

### Naming Conventions

- Session folders: `YYYY-MM-DD_HHMM` (24hr, no colons)
- Backup files: `YYYY-MM-DD_build-memory-base.html`
- Session HTML always named: `build-memory-session.html`
- Job reports always named: `job-reports.md`

---

## Interactive Menu (on skill invoke)

When `/c9-1-build-memory` is called, present:

### Q1: Pickup Prompt

```
"Store your job updates for this process? (Pick Up Prompt)"

  [1] Yes, update the pickup prompt with current context
  [2] No, skip — just show me the current state
```

### Q2: Job Reports

```
"Job report per output?"

  [1] Yes, auto-report after every job this session
  [2] No, I'll ask when I want one
```

Then: create the session folder, copy base HTML, begin work.

### Menu — Default Behavior

- If user says nothing beyond invoking the skill, default is **Yes / Yes** (both enabled)
- User can toggle mid-session by saying "pause reports" or "resume reports"
- Pickup prompt update can also be manually triggered: "update pickup"

---

## Prep for SKILL.md

| Field | Value |
|---|---|
| **Name** | `c9-1-build-memory` |
| **Description** | Build memory engine — holds working context across sessions with pickup prompts and auto job reports |
| **Triggers** | `/c9-1-build-memory`, `"build memory"`, `"session memory"` |
| **Family** | c9-1-build pattern (build companion toolset) |
| **Automation Slot** | A6 |
| **Design Language** | Salt rock lamp (consistent with all build companion tools) |
| **Dependencies** | Reads/writes to the triple-brain-build-dashboard HTML |
| **Outputs** | Pickup prompt block (HTML), job report boxes (formatted text + .md log) |

### SKILL.md Outline (for when we build it)

```
- name: c9-1-build-memory
- description: ...
- triggers: ["/c9-1-build-memory", "build memory", "session memory"]
- on_invoke:
    - present interactive menu (Q1, Q2)
    - create session folder with timestamp
    - copy base HTML
    - begin work loop
- on_job_complete:
    - if job_reports enabled: produce formatted box
    - append to job-reports.md in session folder
- on_cycle:
    - if pickup_prompt enabled: update pickup block in session HTML
    - timestamp + concise rich description
- on_session_end:
    - final pickup prompt update
    - final job report if any pending
```

---

## Design Notes

- This skill is about **continuity** — making sure no context is lost between sessions
- The pickup prompt is the single most important artifact: if someone reads nothing else, reading that block should be enough to keep building
- Job reports are the accountability layer — they prove what happened and when
- The salt rock lamp design language means warm, grounded, steady — this tool is the bedrock of a build session
- Everything stays human-readable: no databases, no JSON blobs, just HTML and markdown that a person can open and scan

---

## Open Questions (to resolve during build)

1. Should the pickup prompt also live in a standalone `.md` file alongside the HTML, for easier CLI reading?
2. Max history depth — should old pickup prompt entries get archived after N entries?
3. Should job reports include a diff summary or just file counts?
4. Cross-session linking — should each session folder reference the previous session's folder path?

---

*This file is the source of truth for the `c9-1-build-memory` skill. Build from this document, not from memory.*
