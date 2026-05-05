---
name: dashboard--support
description: Admin brain — maps how every part works, its purpose, relationships, and the end goal
---

# dashboard--support

The brain. The bird's eye view. This personality doesn't build —
it documents, maps, and explains the entire dashboard system.

## Usage

```
/dashboard--support
```

## Instructions

### Step 0: Scan the System

Read ALL dashboard skill configs to understand current state:
- `C:\Users\chad\.claude\skills\dashboard\config.md`
- `C:\Users\chad\.claude\skills\dashboard--client-database\config.md`
- `C:\Users\chad\.claude\skills\dashboard--effects-and-travel\config.md`
- `C:\Users\chad\.claude\skills\dashboard--css\config.md`
- `C:\Users\chad\.claude\skills\dashboard--communication\config.md`
- `C:\Users\chad\.claude\skills\dashboard--support\config.md`

Also read the ROADMAP:
- `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\y - [---] [---] [---] FfffffLLLLUUUUUUUTTTERRRRR\Play 5\ultimate dashboard\ROADMAP.md`

### Step 1: Header

Print:
```
  ─── support / admin ──────────────
```

### Step 2: Menu

Use **AskUserQuestion**:
- Question: "What do you need?"
- Options:
  1. "System Map" — description: "see how every part connects (the big grid)"
  2. "Explain a Part" — description: "deep dive on one specific personality"
  3. "Health Check" — description: "check what's built, what's missing, what's broken"
  4. "End Goal Status" — description: "how close are we to the finished system"

### Step 3a: System Map (The Big Grid)

Display the full relationship map:

```
  ─── system map ───────────────────

  ┌─────────────────────────────────────────────────────────┐
  │                     /dashboard                          │
  │                    (home base)                          │
  │                        │                                │
  │    ┌──────────┬────────┼────────┬──────────┐           │
  │    │          │        │        │          │           │
  │    ▼          ▼        ▼        ▼          ▼           │
  │ client-db  effects    css    comms     support         │
  │    │          │        │        │       (this)         │
  │    │          │        │        │                      │
  │    └──────────┴────┬───┴────────┘                      │
  │                    │                                    │
  │              THE PIPELINE                               │
  │    LEFT ──→ CENTER ──→ RIGHT                           │
  │  (urgent)  (solving)  (happy)                          │
  │                                                         │
  │  Each tile carries:                                     │
  │    • Client data (from client-db)                      │
  │    • Action buttons (from mapper)                      │
  │    • Go to Link / Wind Up (from comms)                 │
  │    • Visual style (from css)                           │
  │    • Movement rules (from effects)                     │
  └─────────────────────────────────────────────────────────┘
```

Then show the data flow table:

```
  ─── data flow ────────────────────

  From          → To              │ What Travels
  ─────────────────────────────────────────────────
  comms         → client-db       │ New client data from extensions
  comms         → dashboard       │ New tile creation signal
  comms         → effects         │ Movement trigger (preset done)
  client-db     → effects         │ Client stage + status
  client-db     → dashboard       │ Client list for board
  client-db     → comms           │ Client data for wind-up fills
  effects       → client-db       │ Stage updates after movement
  effects       → css             │ Animation specs
  css           → ALL             │ Shared design tokens
  dashboard     → ALL             │ Routing (user picks dept)
  support       → NONE            │ Read-only — observes only
```

### Step 3b: Explain a Part

Use **AskUserQuestion**:
- Question: "Which personality?"
- Options:
  1. "Dashboard (Spine)" — description: "the home base hub"
  2. "Client Database" — description: "the data layer"
  3. "Effects & Travel" — description: "the motion layer"
  4. "CSS Engine" — description: "the visual layer"

Then for the selected personality, read its SKILL.md and config.md, and present:

1. **How it works** — what it does mechanically
2. **Its purpose** — why it exists in the system
3. **How it relates** — what it feeds into and pulls from
4. **How it contributes to the end goal** — its role in the finished pipeline

### Step 3c: Health Check

Scan each skill folder and check for required files:

For each skill, verify:
- SKILL.md exists
- config.md exists
- data/ files exist (where applicable)

Report:
```
  ─── health check ─────────────────

  /dashboard                  ✓ built  │  SKILL.md ✓  config.md ✓  board.json ✓
  /dashboard--client-database ✓ built  │  SKILL.md ✓  config.md ✓  clients.json ✓
  /dashboard--effects-travel  ✓ built  │  SKILL.md ✓  config.md ✓  rules.json ✓
  /dashboard--css             ✓ built  │  SKILL.md ✓  config.md ✓  theme.json ✓
  /dashboard--communication   ✓ built  │  SKILL.md ✓  config.md ✓  presets.json ✓
  /dashboard--support         ✓ built  │  SKILL.md ✓  config.md ✓
```

Flag any missing files, broken configs, or incomplete setups.

### Step 3d: End Goal Status

The end goal: a fully wired client management dashboard where
tiles flow through stages, buttons fire or wind up on the fly,
chrome extensions auto-feed the pipeline, and everything
connects seamlessly.

Read ROADMAP.md for status checkboxes. Show progress:

```
  ─── end goal status ──────────────

  Overall: X/6 personalities built

  [x] /dashboard — home base hub
  [x] /dashboard--client-database — data layer
  [x] /dashboard--effects-and-travel — motion layer
  [x] /dashboard--css — visual layer
  [x] /dashboard--communication — comms layer
  [x] /dashboard--support — admin brain

  Remaining work:
  - List any incomplete features or TODO items
```

### The Four Questions This Skill Answers

1. **How does each part work?** → mechanical explanation
2. **What's its purpose?** → why it exists
3. **How do parts relate?** → the grid map of connections
4. **How do they work together?** → the end-to-end flow toward the goal

### Important Notes

- This skill is READ-ONLY — it never modifies other skills
- It always reads the latest state before reporting
- Built LAST because it needs the full picture
- This is the documentation layer — the living manual for the system
