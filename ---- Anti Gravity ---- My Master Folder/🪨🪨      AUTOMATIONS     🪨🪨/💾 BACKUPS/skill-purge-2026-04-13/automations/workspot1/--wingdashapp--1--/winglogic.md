# WINGLOGIC.MD
## Wing Dashboard — Logic Map + 50 Key Notes
*Generated 2026-04-04 — source of truth for this session*

---

## VISUAL CONNECTION MAP

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        WING DASHBOARD — SYSTEM MAP                          │
└─────────────────────────────────────────────────────────────────────────────┘

  SCRAPERS (ADMIN/tools/)               DATA FEEDS (data/feeds/)
  ─────────────────────────             ────────────────────────
  snapshot-comms.py ──────────────────► gmail.json
  diff-comms.py ──────────────────────► comms-changes.json
  [manual edit] ──────────────────────► payback.json
  [manual edit] ──────────────────────► supplier-pricing.json
  outbox-server.py ◄──────────────────► outbox-gmail.json
                   ◄──────────────────► outbox-imessage.json
                   ◄──────────────────► outbox-whatsapp.json
                   ◄──────────────────► outbox-other.json
  gmail-send.py ──────────────────────► sent-log-gmail.json
  whatsapp-send.py ───────────────────► sent-log-whatsapp.json
  imessage-send.py ───────────────────► sent-log-imessage.json
  push-server.py ─────────────────────► sent-log-push.json

         │ all feeds consumed by ▼

  ┌─────────────────────────────────────────────────────┐
  │                   index.html                        │
  │  ┌──────────┐  ┌─────────────┐  ┌──────────────┐   │
  │  │ LEFT WING│  │ CENTER PAD  │  │ RIGHT WING   │   │
  │  │ 6 panels │  │  Drop zone  │  │  5 panels    │   │
  │  │          │  │  Journey    │  │              │   │
  │  │ AAS Flow │  │  Card panel │  │  Pipeline    │   │
  │  │ Leads    │  │  Campaigns  │  │  AI Tools    │   │
  │  │ Biz Bldg │  │  Watermark  │  │  Comms ◄──┐  │   │
  │  │ Gen Tools│  │             │  │  My Tools │  │   │
  │  │ Contacts │  └─────────────┘  │  Ops      │  │   │
  │  │ Suppliers│                   └──────────────┘   │
  │  └──────────┘                                       │
  │  ┌─────────────────────────────────────────────┐    │
  │  │              TOOLBAR (bottom)               │    │
  │  │  B·P·R  [workspace]  [space bar]  ⏢ ■ day  │    │
  │  └─────────────────────────────────────────────┘    │
  │  ┌─────────────────────────────────────────────┐    │
  │  │           TOP NOTCH / QA PANEL              │    │
  │  │  [launcher ▶]  [#notch DI]  [spacebar ■]   │    │
  │  └─────────────────────────────────────────────┘    │
  └─────────────────────────────────────────────────────┘

  OVERLAYS (open over index.html)
  ────────────────────────────────
  Space Bar ──────────────────── comms tiles + daily render + payback
  Launcher Overlay ────────────── 5 screens: payments / how-it-works / label-gen / EDM / SCO
  QA Panel (#notch expanded) ──── client tabs + home updates + call grid + new client form
  AppViewer (iframe) ──────────── Proposal Gen / Cal Card / Artist Matrix / Client Network
  Registry Overlay (R) ────────── client registry
  Presentation Overlay (P) ────── presentation builder
  Blog Overlay (B) ────────────── blog tile view

  SUPPORT SERVERS (ADMIN/tools/*.py)       PORT
  ────────────────────────────────────     ────
  save-result.py (legacy)                  3001
  paypal-bridge.py                         3002
  outbox-server.py / save-result-server    3003 ← port conflict — check which is running
  sticky-server.py                         3004
  push-server.py (FCM)                     3005
  index.html main app                      3000

  CLIENT DATA FLOW
  ────────────────
  ClientStore (JS module in index.html)
       │
       ├── reads/writes ─────► data/clients/{slug}.json  (source of truth)
       └── mirrors to ───────► localStorage: wingdash_clientdata_{slug}

  TEMPLATES → GENERATORS → OUTPUT
  ────────────────────────────────
  homebase-template.html ──► homebase-gen.py ──► ADMIN/homebases/{slug}/index.html
  payment-card-template  ──► payment-gen.py  ──► ADMIN/payment-cards/{slug}/
  presentation-template  ──► pres-gen.py     ──► ADMIN/presentations/{slug}/P{N}.html
  cal-card-template      ──► [via AppViewer]

  FOLDER STRUCTURE (root = --wingdashapp--1--)
  ─────────────────────────────────────────────
  index.html                ← main dashboard (31,000+ lines)
  outbox.html               ← standalone outbox UI (port 3003)
  launch.bat / launch-dashboard.bat / .vbs  ← launchers
  data/
    feeds/                  ← live JSON (scrapers write here, dashboard reads here)
    clients/                ← per-client records (ClientStore reads/writes)
    config/                 ← slot-prefs.json (planned, not yet live)
  pages/
    left/                   ← standalone reference pages (not embedded)
    right/                  ← standalone reference pages (not embedded)
  ADMIN/
    tools/                  ← all python scripts + credentials
    templates/              ← 4 HTML templates with {{TOKEN}} syntax
    homebases/              ← generated client homebase pages
    stickynotes/            ← per-client sticky note JSON + backups
    presentation-cards/     ← 8 pre-built card HTML files
    tools/exports/snapshots ← daily snapshot archive (never overwritten)
```

---

## 50 KEY NOTES

### ARCHITECTURE
1. `index.html` is a single-file app — 31,000+ lines. Everything lives in it: HTML, CSS, all JS systems.
2. The dashboard requires `python -m http.server 3000` run from the `master-Central-database` root — NOT from the app folder itself.
3. There is NO build system, NO bundler — pure HTML/CSS/JS. Edit the file directly.
4. The pages in `pages/left/` and `pages/right/` are legacy standalone docs — NOT iframed or loaded by the main app. They're reference/fallback only.
5. The app uses `fetch()` with a `?t=Date.now()` cache buster on every JSON load. If fetch fails, it falls back silently to `{ slot N }` placeholders.

### DATA FLOW
6. Scrapers write to TWO places: `ADMIN/tools/exports/snapshots/` (archive, timestamped, never overwritten) AND `data/feeds/` (live, always overwritten). Dashboard reads from `data/feeds/` only.
7. `gmail.json` is the only live-wired feed currently — it powers the Gmail pill submenu. All other pills use placeholder cards until their scrapers are built.
8. `payback.json` has no scraper — it's manually edited JSON. 5 sections: Leads, Work Bills, Campaigns Behind, Personal Bills, Credit Cards.
9. `comms-changes.json` is generated by `diff-comms.py` comparing yesterday's vs today's snapshot. It tracks new_thread / new_reply / resolved changes across channels.
10. `supplier-pricing.json` has 4 suppliers (Brandon, Nik, Tyler, Peter) — all identical flat $100/10K pricing up to $1000/100K.
11. `data/clients/{slug}.json` is the single source of truth for client data — both Journey Card and Home Base read/write from it. Schema version: `wingdash-client-v1`.
12. `data/config/slot-prefs.json` is PLANNED (pinned/custom slot order) but not yet implemented.

### PILLS & WINGS
13. Left wing has 6 section panels (AAS Flow, Leads, Biz Building, General Tools, Contacts, Suppliers). Right wing has 5 (Pipeline, AI Tools, Comms and More, My Tools, Operations).
14. Wings scroll via arrow buttons OR horizontal swipe. Touch detection uses deltaX > deltaY × 1.5 intent check with 50px threshold.
15. Pills are lazy-rendered — `renderPills(wing, sectionIndex)` only fires when you navigate to that section. Pills not yet visited have no DOM.
16. Each wing has its own independent pill style state (standard / quiet / glass / neo). Left and right don't share style.
17. The global Minimal Mode (`body.minimal-mode`) strips ALL visual chrome — pills become borderless text, tiles ghost out, toolbar goes dark glass.
18. The pill style cycler (■ button) is per-wing and cycles 4 styles. The theme cycler (⏢) is global and cycles 4 background themes. These are separate systems.

### SUBMENU SYSTEM
19. Submenu data is keyed in `_submenuCache[pillLabel]` — exactly matching the pill's text label (case-sensitive). Wrong label key = no data = placeholder slots.
20. Only the top 4 submenu cards are visible by default. Items 5+ have class `pill-sub-hidden`. Click "+N more" to expand into a scrollable 4-card-height container.
21. The Gmail pill submenu is the only one currently wired to real data (`loadGmailContacts()` IIFE fetches `data/feeds/gmail.json` on page load).
22. Submenu drag reorder saves to `localStorage` key `submenuOrder` (keyed by pill label). Order persists across page loads.
23. The submenu click listener runs in CAPTURE phase — it intercepts pill clicks before any other handler. This is why `initPillSubmenus()` must run first.

### THEMES & STYLES
24. Theme is NOT persisted — it resets to Midnight Moon (index 1) on every page reload. `applyTheme(1)` is called at load.
25. Themes modify 13 CSS custom properties via `document.documentElement.style.setProperty()` — no class toggling, direct var injection.
26. Theme button is ⏢ (trapezoid). Pill style button is ■. They look similar but do completely different things.

### OVERLAYS
27. Space Bar opens via the red notch button OR double-tap spacebar (two presses within 350ms). ESC closes it.
28. Space Bar has 3 views: comms tiles (loadTiles), daily channel render (loadDailyRender), and payback section. Each reads a different feed file.
29. The Launcher Overlay has 5 screens navigated by colored dots: green=payments, orange=how-it-works, purple=label-gen, red=EDM tracker, blue=SCO.
30. The QA Panel (#notch) collapses to a 180×30px pill and expands to 90vw × 85vh fullscreen. Expansion uses CSS keyframe animation `notch-expand`.
31. AppViewer is a draggable iframe overlay. It opens local apps (Proposal Gen, Cal Card, Artist Matrix, etc.) at localhost:3000 paths without leaving the dashboard.
32. B/P/R toolbar buttons open Blog / Presentation / Client Registry overlays respectively.

### CLIENT SYSTEM
33. `ClientStore` is a JS module embedded in index.html. Methods: `ensureClient`, `addOrder`, `addCampaign`, `addPayment`, `updatePunch`, `markHomeBaseCreated`, `syncFromLegacy`.
34. Clicking a client pill (isClient: true) fires 6 things: removes old selection, closes submenus, hides climate card, sets globals, updates pipeline mirror box, loads Journey Card.
35. Journey Card panel lives in the center pad. It's triggered by client selection and also by the `→ Journey` button on Comms contact cards.
36. The Comms ↔ Journey link is bidirectional: Comms cards can open Journey Card, and Journey Card buttons can navigate back to Comms wing with a `comms-nav-pulse` animation.
37. The `punch` checklist in client JSON has 5 boolean fields: clientInfo, proposal, campaign, delivery, custom[]. These track onboarding progress.

### SERVERS & PORTS
38. Port 3001 = `save-result.py` (legacy, saves to external ADMIN folder up the tree).
39. Port 3002 = `paypal-bridge.py` — bridges dashboard → Chrome Extension → PayPal auto-fill. Requires the Chrome Extension to be installed.
40. Port 3003 = CONFLICT — both `outbox-server.py` AND `save-result-server.py` claim this port. Only one can run at a time.
41. Port 3004 = `sticky-server.py` — per-client task/note lists stored in `ADMIN/stickynotes/{slug}.json` with automatic backups.
42. Port 3005 = `push-server.py` — Firebase Cloud Messaging. Saves FCM tokens to `data/clients/{slug}.json` at `communication.push.token`.

### CREDENTIALS & AUTH
43. Gmail OAuth token is in `ADMIN/tools/token.json` — scopes: `gmail.readonly` + `gmail.send`. The token auto-refreshes via `refresh_token`. Expiry in the file is stale — the library handles refresh automatically.
44. WhatsApp API credentials are hardcoded in `whatsapp-send.py` — Phone Number ID: 972268915979054. Token is live and confirmed working (one real send confirmed in sent-log-whatsapp.json).
45. Facebook Messenger (`other-comms-send.py`) has an empty `PAGE_ACCESS_TOKEN` — not yet configured.
46. iMessage (`imessage-send.py`) is macOS-only — will log `skipped` on Windows every time.
47. Firebase config is in `firebase-config.json`. Service account (server-side admin) is in `firebase-service-account.json`. Two separate files — don't confuse them.

### NOTABLE BUGS / KNOWN ISSUES
48. `marc-antonix` homebase folder exists in `ADMIN/homebases/` but `data/clients/marc-antonix.json` has `homeBase.created = false` — the JSON flag was never updated after the folder was generated.
49. Port 3003 conflict between `outbox-server.py` and `save-result-server.py` — running both will cause a bind error. Check which is needed before launching.
50. The folder structure is mid-migration: legacy paths (`ADMIN/homebases/`, `ADMIN/presentations/`, `ADMIN/payment-cards/`) coexist with the new unified path (`ADMIN/clients/{slug}/`). Run `migrate-to-unified.py --go` to complete the migration.

---
*Read this file at session start for full app context. Update it when significant changes are made.*
