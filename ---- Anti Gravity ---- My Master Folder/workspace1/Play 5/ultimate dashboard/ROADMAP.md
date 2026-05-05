# Ultimate Dashboard — Roadmap

---

## Core Purpose

A client management pipeline where tiles (client cards) flow through stages:

```
  LEFT (urgent)  →  CENTER (solving)  →  RIGHT (completed/happy)
```

### What Lives on a Card

Each client card carries **nested action buttons** pulled from the mapper shortcuts
(source: 41-MAPPER--Finalized.html). These buttons travel with the card as it moves.

### Two Modes Per Button

1. **Go to Link** — fires the button raw, opens the link, done
2. **Wind Up** — pre-step mode before launch:
   - Fill in fields that apply to that button
   - Pre-make something on the fly related to that button
   - Then open — similar to how the PayPal extension pre-fills billing before opening PayPal

### The Flow

```
  client comes in
       ↓
  tile appears (LEFT)
       ↓
  pick an action button on the card
       ↓
  ┌─────────────┬──────────────────┐
  │ Go to Link  │  Wind Up         │
  │ (raw open)  │  (presets/fill →  │
  │             │   then open)     │
  └─────────────┴──────────────────┘
       ↓
  tile moves through stages → CENTER → RIGHT
       ↓
  done / happy
```

### Chrome Extension Triggers

Extensions (like ahead-billing-paypal-extension) will auto-create tiles
that feed into this pipeline. The wind-up logic + portable buttons
travel fluidly on each card through the whole system.

### Key Files

- Mapper buttons source: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\- -         💲💲  MAPPER UPDATE\🚧🚧 41-MAPPER--Finalized.html`
- Chrome extension reference: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\💎💎 - - - beginning - - - 💎💎\🔧-- -- - -- 🔧 ext\ahead-billing-paypal-extension`

---

## The Spine

`/dashboard` — home base skill. Central hub that routes to all personalities.
Every `--` personality threads off this. It holds the menu, knows what exists, and connects everything.

---

## Personalities

### 1. /dashboard--client-database
Client data management. Store, retrieve, organize artist/client info.
- Central place for client records
- Feeds data to other personalities when they need it

### 2. /dashboard--effects-and-travel
Effects & travel tracking.
- Visual effects, animations, transitions
- Travel logistics and scheduling

### 3. /dashboard--css
Styling engine.
- Themes, look/feel, design tokens
- Shared CSS across all dashboard outputs

### 4. /dashboard--communication
Comms hub — N&N / Chrome extension.
- Notification systems
- Chrome extension integration
- Message routing and alerts

### 5. /dashboard--support ⭐ (Special)
Admin brain / system map.
- 1. How each part works
- 2. Its purpose
- 3. How each part relates to each other (large grid map with basic explanations)
- 4. How each part will work together to reach the end goal

This is the one that ties it all together — the bird's eye view.

---

## Build Order

```
Phase 1 ─── Spine
  └── /dashboard (home base MD)

Phase 2 ─── Core Personalities
  ├── /dashboard--client-database
  ├── /dashboard--effects-and-travel
  ├── /dashboard--css
  └── /dashboard--communication

Phase 3 ─── The Brain
  └── /dashboard--support (maps everything, documents the system)
```

---

## How It Flows

```
                    /dashboard
                        │
        ┌───────┬───────┼───────┬──────────┐
        │       │       │       │          │
   client-db  effects  css   comms     support
                                        (maps
                                      everything)
```

Support sits at the end because it needs to see the full picture before it can document the system.

---

## Status

- [x] /dashboard — built (SKILL.md + config.md + board.json)
- [x] /dashboard--client-database — built (SKILL.md + config.md + clients.json)
- [x] /dashboard--effects-and-travel — built (SKILL.md + config.md + rules.json)
- [x] /dashboard--css — built (SKILL.md + config.md + theme.json)
- [x] /dashboard--communication — built (SKILL.md + config.md + presets.json)
- [x] /dashboard--support — built (SKILL.md + config.md)
