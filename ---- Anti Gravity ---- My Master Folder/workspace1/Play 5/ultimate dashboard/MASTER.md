# ULTIMATE DASHBOARD — MASTER BUILD DOCUMENT

> Unified blueprint merged from ROADMAP.md + SKILL-DRAFTS.md + OPERATIONS.md + Flowchart MD.
> This is the single reference for the entire system.

---

## 1. CORE PURPOSE

A client management pipeline where tiles (client cards) flow through stages:

```
  LEFT (urgent)  →  CENTER (solving)  →  RIGHT (happy)
```

Each tile carries **nested action buttons** from the mapper (41-MAPPER--Finalized.html).
Two modes per button: **Go to Link** (raw open) and **Wind Up** (pre-fill then launch).
Chrome extensions auto-create tiles that feed into the pipeline.

---

## 2. SYSTEM ARCHITECTURE

```
                    /dashboard
                   (home base)
                       │
       ┌──────────┬────┼────────┬──────────┐
       │          │    │        │          │
       ▼          ▼    ▼        ▼          ▼
  client-db   effects  css    comms     support
  (data)      (motion) (visual)(comms)  (admin)
       │          │    │        │       (reads all)
       └──────────┴──┬─┴────────┘
                     │
               THE PIPELINE
     LEFT ──→ CENTER ──→ RIGHT
   (urgent)  (solving)  (happy)
```

### Department Roles

| Dept | Role | Owns | Reads From | Writes To |
|------|------|------|-----------|-----------|
| /dashboard | Traffic controller | Menu, routing, board view | All depts | Routing only |
| client-db | Filing cabinet | Client records (SSOT) | Intake data | All depts read this |
| effects | Conveyor belt | Movement rules, transitions | client-db | client-db (stage), css (animation) |
| css | Paint shop | Themes, tokens, styles | — | All HTML outputs |
| comms | Mailroom | Extensions, N&N, wind-up presets | client-db | dashboard (tiles), client-db (records) |
| support | Ops manager | System map, health checks | All depts | Nothing (read-only) |

---

## 3. THE PIPELINE — ASSEMBLY LINE SEQUENCE

```
  STEP 1  │  COMMS receives trigger (extension fires or manual add)
  STEP 2  │  CLIENT-DB creates the record
  STEP 3  │  DASHBOARD creates tile on board (LEFT column)
  STEP 4  │  CSS renders the tile (card style, buttons, status color)
  STEP 5  │  USER interacts with tile buttons (Go to Link / Wind Up)
  STEP 6  │  EFFECTS evaluates movement rules
  STEP 7  │  EFFECTS moves tile → CENTER; CLIENT-DB updates stage; CSS animates
  STEP 8  │  More button actions / wind-ups
  STEP 9  │  EFFECTS moves tile → RIGHT; CLIENT-DB updates to "happy"; COMMS celebrates
  STEP 10 │  Tile lives in RIGHT (completed). Done.
```

---

## 4. DATA FLOW

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

## 5. SKILL FILE MAP

All skills live under `C:\Users\chad\.claude\skills\`:

| Skill | SKILL.md | config.md | Data File |
|-------|----------|-----------|-----------|
| dashboard | ✓ | ✓ | data/board.json |
| dashboard--client-database | ✓ | ✓ | data/clients.json |
| dashboard--effects-and-travel | ✓ | ✓ | data/rules.json |
| dashboard--css | ✓ | ✓ | data/theme.json |
| dashboard--communication | ✓ | ✓ | data/presets.json |
| dashboard--support | ✓ | ✓ | — |

**Total: 17 files across 6 skill folders.**

---

## 6. EXTERNAL DEPENDENCIES

- **Mapper Buttons**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\- -         💲💲  MAPPER UPDATE\🚧🚧 41-MAPPER--Finalized.html`
- **Chrome Extension Template**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\💎💎 - - - beginning - - - 💎💎\🔧-- -- - -- 🔧 ext\ahead-billing-paypal-extension`
- **Hub Colors**: Critical Mapper hub color palette (blue #0ea5e9, green #10b981, purple #6366f1, red #ef4444, orange #f59e0b, black #0f172a, brown #92400e)

---

## 7. KEY DESIGN DECISIONS

1. **Mapper buttons read dynamically** from 41-MAPPER--Finalized.html — never hardcoded
2. **clients.json is the single source of truth** — every other skill reads from it
3. **board.json tracks tile positions** separately from client records (board = view, clients = data)
4. **Wind Up presets stored in presets.json** — reusable, not one-off
5. **theme.json includes both hub colors AND mapper colors** — two palettes coexist
6. **Config files use .md format** so Claude can read them natively as skill instructions
7. **All paths use forward slashes and quotes** (learned from prior bug fixes)
8. **Each SKILL.md follows the exact spec from SKILL-DRAFTS.md**

---

## 8. THE ACTION LAYER

```
  ┌─────────────────┐         ┌─────────────────────┐
  │   GO TO LINK    │         │     WIND UP         │
  │  fires raw      │         │  pre-fill fields    │
  │  opens the link │         │  set up presets     │
  │  done — fast    │         │  THEN open          │
  │                 │         │                     │
  │  like clicking  │         │  like PayPal ext    │
  │  a bookmark     │         │  pre-fills billing  │
  └────────┬────────┘         └──────────┬──────────┘
           └──────────┬───────────────────┘
                      ▼
              action completed
```

---

## 9. WHY IT WORKS

1. **ONE DOOR IN** — Everything enters through /dashboard or a chrome extension
2. **ONE SOURCE OF TRUTH** — Client-db holds all records, nobody duplicates
3. **TILES CARRY EVERYTHING** — Buttons, history, status travel with the card
4. **TWO-CLICK ACTIONS** — Pick a button → Go to Link or Wind Up
5. **AUTO-MOVEMENT** — Rules handle tile advancement automatically
6. **VISUAL AT A GLANCE** — LEFT=red, CENTER=amber, RIGHT=green
7. **DEPARTMENTS DON'T OVERLAP** — Each personality has ONE job
8. **WIND UP = SECRET WEAPON** — Pre-fill fields before launching
9. **EXTENSIONS FEED THE MACHINE** — Chrome extensions auto-create tiles
10. **SUPPORT KEEPS YOU HONEST** — Admin brain watches and reports

---

## 10. BUILD STATUS

- [x] Phase 1 — Spine (/dashboard)
- [x] Phase 2A — Data Layer (/dashboard--client-database)
- [x] Phase 2A — Visual Layer (/dashboard--css)
- [x] Phase 2B — Motion Layer (/dashboard--effects-and-travel)
- [x] Phase 2B — Comms Layer (/dashboard--communication)
- [x] Phase 3 — Brain (/dashboard--support)
- [x] MASTER.md created

---

## THE ONE-LINE SUMMARY

Work comes in → gets recorded → lands on board → you act on it → system moves it forward → client's happy → done.
