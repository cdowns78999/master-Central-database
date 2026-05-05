# Ultimate Dashboard — Operations Plan

---

## Purpose of This Document

This MD maps how every piece of the Ultimate Dashboard system operates
together — parent to child, child to child — like an assembly line
where each department knows its job and feeds the next one.

---

## ⚠ MASTER MD NOTE — READ THIS FIRST

This document (OPERATIONS.md) is designed to be studied TOGETHER with:

- **ROADMAP.md** (Parent MD) — the vision, phases, and build order
- **SKILL-DRAFTS.md** (Child MD) — the full skill specs for all 6 personalities

These three MDs will be combined and studied as one unit to produce
a single **MASTER.md** — the final, unified build plan that brings
the entire Ultimate Dashboard system to life.

Nothing ships until the Master MD exists. The Master MD is the blueprint.
These three are its raw materials.

---

## The Assembly Line — How It Operates

```
  INTAKE                    PROCESSING                   OUTPUT
  ─────                     ──────────                   ──────

  Client enters      →    Tile created        →    Client resolved
  Extension fires    →    Buttons assigned     →    Tile reaches RIGHT
  Manual add         →    Actions taken        →    Happy / archived

  ┌──────────┐       ┌───────────────────┐     ┌──────────────┐
  │  INPUT   │  ───► │   THE PIPELINE    │ ──► │   RESULT     │
  │  LAYER   │       │                   │     │              │
  │          │       │  LEFT → CTR → RT  │     │  completed   │
  │ chrome   │       │                   │     │  invoiced    │
  │ manual   │       │  buttons travel   │     │  archived    │
  │ import   │       │  with tile        │     │              │
  └──────────┘       └───────────────────┘     └──────────────┘
```

---

## Department Map — Who Does What

Each personality is a department. Here's what each one owns
and what it feeds to the others.

### DEPT 1: /dashboard (The Spine)
```
  OWNS:     Main menu, routing, board view
  RECEIVES: Everything — all departments report here
  SENDS TO: Whichever personality the user picks
  ROLE:     Traffic controller — no data logic, just routing
```

### DEPT 2: /dashboard--client-database (Data Layer)
```
  OWNS:     Client records — the single source of truth
  RECEIVES: New client data from intake (manual or extension)
  SENDS TO: Every other department (they all read from here)
  ROLE:     The filing cabinet — nothing exists without a record here
```

### DEPT 3: /dashboard--effects-and-travel (Motion Layer)
```
  OWNS:     Tile movement rules, stage transitions, animations
  RECEIVES: Trigger events (button completed, status change)
  SENDS TO: client-database (updates stage), css (animation specs)
  ROLE:     The conveyor belt — moves tiles through the pipeline
```

### DEPT 4: /dashboard--css (Visual Layer)
```
  OWNS:     Themes, design tokens, card styles, button styles
  RECEIVES: Style requests from all departments
  SENDS TO: All HTML outputs (shared foundation)
  ROLE:     The paint shop — everything looks right because of this
```

### DEPT 5: /dashboard--communication (Comms Layer)
```
  OWNS:     Chrome extension triggers, notifications, wind-up presets
  RECEIVES: Extension events, alert triggers, preset requests
  SENDS TO: dashboard (new tiles), client-database (new records),
            effects (movement triggers)
  ROLE:     The mailroom + front desk — handles what comes in
            and what goes out
```

### DEPT 6: /dashboard--support (Admin Brain)
```
  OWNS:     System map, health checks, documentation
  RECEIVES: Reads from all departments (read-only)
  SENDS TO: Nothing — it observes and reports
  ROLE:     The operations manager — knows how everything connects,
            never touches the machinery
```

---

## Dependency Chain — What Feeds What

```
                    ┌─────────────────────┐
                    │     /dashboard      │
                    │     (the spine)     │
                    └────────┬────────────┘
                             │
              routes to any department
                             │
         ┌───────────┬───────┼───────┬──────────┐
         │           │       │       │          │
         ▼           ▼       ▼       ▼          ▼
    client-db    effects    css    comms     support
         │           │       │       │       (reads all)
         │           │       │       │
         └─────┬─────┘       │       │
               │             │       │
               ▼             │       │
         effects reads       │       │
         client-db to        │       │
         know what to move   │       │
               │             │       │
               └──────┬──────┘       │
                      │              │
                      ▼              │
                effects sends        │
                animation specs      │
                to css               │
                      │              │
                      └──────┬───────┘
                             │
                             ▼
                      comms triggers
                      tile creation →
                      writes to client-db →
                      effects moves it
```

### Simplified Flow:

```
  comms (intake) → client-db (record) → effects (move) → css (display)
       ↑                                                       │
       └───────────────── dashboard (routes) ──────────────────┘
                               ↑
                          support (watches all)
```

---

## The Assembly Line Sequence

When a client enters the system, here's the exact order of operations:

```
  STEP 1  │  COMMS receives the trigger
          │  (chrome extension fires, or manual add from dashboard)
          │
  STEP 2  │  CLIENT-DB creates the record
          │  (name, contact, status, assigned buttons)
          │
  STEP 3  │  DASHBOARD creates the tile on the board
          │  (tile appears in LEFT column)
          │
  STEP 4  │  CSS renders the tile
          │  (card style, button styles, status color)
          │
  STEP 5  │  USER interacts with tile buttons
          │  (Go to Link or Wind Up)
          │
  STEP 6  │  EFFECTS evaluates movement rules
          │  (has enough been done to advance?)
          │
  STEP 7  │  EFFECTS moves tile → CENTER
          │  CLIENT-DB updates stage
          │  CSS animates the transition
          │
  STEP 8  │  More button actions / wind-ups
          │
  STEP 9  │  EFFECTS moves tile → RIGHT
          │  CLIENT-DB updates stage to "happy"
          │  COMMS fires celebration notification
          │
  STEP 10 │  Tile lives in RIGHT (completed)
          │  SUPPORT can report on it
          │  Done.
```

---

## Cross-Department Data Flow

| From | To | What Travels |
|------|----|-------------|
| comms | client-db | New client data from extension triggers |
| comms | dashboard | New tile creation signal |
| comms | effects | Movement trigger (preset completed) |
| client-db | effects | Client stage + status for movement logic |
| client-db | dashboard | Client list for board display |
| client-db | comms | Client data for wind-up preset fills |
| effects | client-db | Stage updates after movement |
| effects | css | Animation specs for transitions |
| css | ALL | Shared design tokens, card/button styles |
| dashboard | ALL | Routing — user picks a department |
| support | NONE | Read-only — observes and reports |

---

## What Each Department Needs Built

| Department | Config File | Data File | HTML Output | Skill File |
|-----------|------------|-----------|-------------|------------|
| dashboard | config.md | — | board view | SKILL.md |
| client-db | config.md | clients.json | client grid | SKILL.md |
| effects | config.md | rules.json | — | SKILL.md |
| css | config.md | — | tokens/theme | SKILL.md |
| comms | config.md | presets.json | — | SKILL.md |
| support | — | — | system map | SKILL.md |

---

## Shared Resources (External Dependencies)

These files already exist and feed into the system:

- **Mapper Buttons**: `41-MAPPER--Finalized.html`
  Every tile's nested action buttons come from here

- **Chrome Extension Template**: `ahead-billing-paypal-extension`
  Pattern for how extensions create tiles

- **Hub Colors**: Critical Mapper hub color palette
  CSS design tokens align with these

---

## Build Order (From ROADMAP.md — Confirmed)

```
  Phase 1 ─── The Spine
    └── /dashboard
        (must exist first — everything routes through it)

  Phase 2 ─── Core Departments (can be parallel)
    ├── /dashboard--client-database  (data layer — most others need this)
    ├── /dashboard--css              (visual layer — all outputs need this)
    ├── /dashboard--effects-and-travel
    └── /dashboard--communication

  Phase 3 ─── The Brain
    └── /dashboard--support
        (built last — needs to see the full picture)
```

**Within Phase 2, client-database and css should be built FIRST**
because every other department reads from client-db and displays through css.

---

## ⚠ MASTER MD NOTE — REMINDER

This document is ONE THIRD of the raw material.

```
  OPERATIONS.md   ←── you are here (how it operates)
  ROADMAP.md      ←── the vision + phases + status
  SKILL-DRAFTS.md ←── the full skill specs for all 6

          │
          ▼

     MASTER.md    ←── THE FINAL PLAN
                      (will be created by studying all three together)
                      (this is what brings the system to life)
```

No building starts from MASTER.md until all three source MDs
have been reviewed, refined, and merged into one unified blueprint.

---
