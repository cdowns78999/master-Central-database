---
name: stack-board-pipeline
description: End-to-end pipeline for /stack-board projects — from skill fire to ⭐ index page to /koi-pretty-bridge promotion. Reference doc, not a skill spec.
type: support
parent_skill: /stack-board
---

# stack-board pipeline (reference)

Reference doc only. Spec lives in `/stack-board` skill.md + sibling support MDs.

---

## 1. Pipeline overview

`/stack-board` clones a sacred HTML template into a dated wrapper inside the ⭐ stack-board projects landing bucket and writes a row to `projects.json`. The bucket's `index.html` reads that JSON and renders a 3x3 grid of project tiles. Click a tile → opens that wrapper's `index.html` (the project board itself, with boxes/arrows + faded JOB 2 prep row). When a project is ready to ship as a polished page, `stack-to-pretty-bridge.html` (in skill-support-md) promotes it into the Koi ecosystem via `/koi-pretty-bridge`, which builds the Fortnite-style `pretty.html`.

---

## 2. ASCII flow diagram

```
   ┌──────────────────────────────┐
   │ TEMPLATE                     │
   │ stack-board-template.html    │  (skill-support-md/stack-board/)
   └────────────┬─────────────────┘
                │  clone
                ▼
   ┌──────────────────────────────┐        ┌────────────────────────┐
   │ PROJECT CLONE                │ ─────▶ │ REGISTRY               │
   │ <wrapper>/index.html         │ append │ ⭐stack-board/         │
   │ (boxes + arrows board)       │        │ projects.json          │
   └────────────┬─────────────────┘        └───────────┬────────────┘
                │                                      │
                │ click tile                           │ scan-projects.py
                │                                      ▼
                │                          ┌────────────────────────┐
                └─────── opens ◀────────── │ INDEX PAGE             │
                                           │ ⭐stack-board/         │
                                           │ index.html (3x3 grid)  │
                                           └───────────┬────────────┘
                                                       │ promote
                                                       ▼
                                           ┌────────────────────────┐
                                           │ BRIDGE                 │
                                           │ stack-to-pretty-       │
                                           │ bridge.html            │
                                           │ → /koi-pretty-bridge   │
                                           │ → pretty.html          │
                                           └────────────────────────┘
```

---

## 3. Canonical paths

```
TEMPLATE
  C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\
  ---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\
  skill-support-md\stack-board\stack-board-template.html

STAR FOLDER (landing bucket)
  C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\
  ---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager\
  -- Results folder master forever\Regular projects - 2\⭐ stack-board projects\

INDEX PAGE
  <STAR>\index.html                  (3x3 grid; reads projects.json)

REGISTRY
  <STAR>\projects.json               (one row per project wrapper)

PROJECT WRAPPER
  <STAR>\!! {YYYY-MM-DD} — {2-3 words}\index.html
  <STAR>\!! {YYYY-MM-DD} — {2-3 words}\end-project\

SCANNER
  skill-support-md\stack-board\scan-projects.py    (rebuilds projects.json)

BRIDGE
  skill-support-md\stack-board\stack-to-pretty-bridge.html
```

---

## 4. Cross-skill links

- `/stack-board` owns the wrapper + board flow.
- `/koi-pretty-bridge` consumes a finished stack-board project (or `/community` microsample) and ships `pretty.html` into the Koi `TRUE MASTER` folder. It expects: a finalized `index.html` board, a `slug` it can derive from the wrapper name, and (optionally) a centerpiece JPG.
- The bridge HTML in skill-support-md is the hand-off UI — pick a stack-board project, fire `/koi-pretty-bridge` against it.

---

## 5. Refresh logic — when to re-run `scan-projects.py`

- After every NEW project clone (Step 1 NEW branch).
- After Phase 2 → choice C creates an `end-project\` sub-folder (so the index tile reflects "shipped" state).
- Manually any time, idempotent — it just rewrites `projects.json` from disk.
- The crowned `!! ` wrapper always sorts first; scanner preserves crown ordering.

---

## 6. One-line invocation cheat sheet

```
/stack-board                  → NEW or EXISTING → board clone + Q&A
   ↓ (Phase 2 → BUILD)
end-project\ created          → run scan-projects.py
   ↓ (project polished)
/koi-pretty-bridge            → ships pretty.html into Koi
```
