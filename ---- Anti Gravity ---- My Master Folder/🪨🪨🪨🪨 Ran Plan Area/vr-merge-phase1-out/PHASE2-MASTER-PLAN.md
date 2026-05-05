# PHASE 2 MASTER PLAN — VR Merge (4 Jobs / 6 Agents)

Generated: 2026-04-27
Source brief: `🪨🪨🪨🪨 Ran Plan Area\VR-MERGE-PM-BRIEFS.md`
Phase 1 outputs root: `🪨🪨🪨🪨 Ran Plan Area\vr-merge-phase1-out\`
  - `job1\` (onboarding + final label artifacts)
  - `job2\` (speed dating artifacts)
  - `job3\` (VRChat Ultimate website artifacts)
  - `job4\` (Language Barrier artifacts)
  - top-level: cross-cutting docs (palette tokens, deploy notes)

Phase 2 fires 6 agents in one burst. Job 1 and Job 4 each split into TWO agents (frontend/backend or voice/bot) so they don't collide.

---

## SECTION 1 · PHASE 2 AGENT PROMPT TEMPLATES

> Each prompt below is self-contained. Paste verbatim into a parallel Agent call.
> Agents run in parallel — none of them depend on the others' output.

### AGENT 1A — Job 1 Frontend Merge (Onboarding + Final-Label UI)

```
You are Phase 2 Agent 1A — Job 1 Frontend Merge.
Your job: produce the merged client-side onboarding + final-label UI.

READ FIRST (in order):
1. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR-MERGE-PM-BRIEFS.md (Job 1 section, lines 12-46)
2. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-merge-phase1-out\job1\ (every file — palette tokens, v2 redesign extracts, modular file plan)
3. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-artist-onboarding\index.html (base — 2120 lines)
4. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-onboarding-v2\redesign-plan.md (793-line installer)
5. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR-Final-Label\ (P1.css/P1.js .. P9.js modular pattern)

CREATE FILES (target dir):
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager\-- Results folder master forever\Regular projects - 2\!! 2026-04-27 — vr onboarding merged\
  ├── index.html                  (merged onboarding shell, pill-nav from v2)
  ├── shared/
  │     ├── tokens.css            (VRChat teal #2baac1 / orange #ff7f54 / surface #1f232a)
  │     ├── nav.js                (pill-nav scroll-snap)
  │     └── storage.js            (localStorage persistence helper)
  ├── sections/
  │     ├── 01-receipt.{html,css,js}    (scout discovery card)
  │     ├── 02-spine.{html,css,js}      (9-step journey)
  │     ├── 03-song.{html,css,js}       (platform picker + URL validation)
  │     ├── 04-deal.{html,css,js}       (50/50, payout)
  │     ├── 05-cinematic.{html,css,js}  ("we heard you sing" bridge)
  │     └── 06-label-stub.{html,css,js} (forwards artistId to Final-Label P2)
  └── README.md                   (file map + how to run locally)

TOUCH ONLY CLIENT FILES. Do NOT touch any server, API, or backend file. Agent 1B handles backend.

DONE LOOKS LIKE:
- index.html opens locally (python -m http.server) and renders all 6 sections in order
- pill-nav sticky at top, scroll-snap between sections
- VRChat palette applied via tokens.css :root
- "Accept deal" button in section 4 fires localStorage.setItem('artistId', uuid) then calls window.location = '/sections/05-cinematic.html'
- All form-submit endpoints stubbed with `// TODO: wire to /api/* (Agent 1B)` — DO NOT call real endpoints
- Final-Label P1 cinematic embedded inline as section 5
- No console errors on load

LENGTH CAP: keep agent reply under 500 words; bulk of output goes into the files.
```

---

### AGENT 1B — Job 1 Backend Wire (Onboarding + Final-Label API)

```
You are Phase 2 Agent 1B — Job 1 Backend Wire.
Your job: produce the Express.js backend that serves Agent 1A's frontend.

READ FIRST:
1. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR-MERGE-PM-BRIEFS.md (Job 1, especially current-state ❌ items)
2. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-merge-phase1-out\job1\ (Phase 1 backend spec / endpoint list)
3. Reference (do NOT modify): C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR Bridge\server.js (good Express + .env pattern to mirror)

CREATE FILES (target dir — same project root as Agent 1A):
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager\-- Results folder master forever\Regular projects - 2\!! 2026-04-27 — vr onboarding merged\
  ├── server/
  │     ├── server.js             (Express, port 3001, CORS for localhost:3000)
  │     ├── routes/
  │     │     ├── artist.js       (POST /api/artist  — creates artist record, returns artistId)
  │     │     ├── song.js         (POST /api/song    — accepts platform + URL, validates)
  │     │     ├── deal.js         (POST /api/deal    — accepts 50/50 + payout method)
  │     │     ├── upload.js       (POST /api/upload  — multer, accepts WAV/MP3, writes /uploads)
  │     │     └── mix.js          (GET  /api/mix/:id — returns stub progress 0-100)
  │     ├── data/
  │     │     └── artists.json    (file-based store, MVP)
  │     ├── .env.example          (lists keys: PORT, UPLOAD_DIR, DISTROKID_TOKEN — empty)
  │     └── package.json          (express, multer, cors, dotenv, nodemon)

TOUCH ONLY SERVER FILES. Do NOT modify index.html, sections/, shared/, or anything Agent 1A owns.

DONE LOOKS LIKE:
- `npm install && npm run dev` boots Express on :3001
- All 5 routes return JSON (200 happy path; 400 on missing fields)
- `curl -X POST localhost:3001/api/artist -d '{"stageName":"Maya"}' -H 'Content-Type: application/json'` returns `{ artistId: "<uuid>" }`
- /uploads dir auto-created on first upload
- README.md (in /server) documents env vars + run commands

LENGTH CAP: under 500 words.
```

---

### AGENT 2 — Job 2 Speed Dating Build (Cafe Vismo)

```
You are Phase 2 Agent 2 — Speed Dating landing + ops scaffolding.
Single agent (no split — Job 2 is mostly content + light HTML).

READ FIRST:
1. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR-MERGE-PM-BRIEFS.md (Job 2 section)
2. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-merge-phase1-out\job2\ (Phase 1 docs — Discord blueprint, run-of-show, tier copy)
3. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-speed-dating-cafe-vismo\ (full source folder)

CREATE FILES:
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager\-- Results folder master forever\Regular projects - 2\!! 2026-04-27 — speed dating cafe vismo\
  ├── index.html                  (landing — waitlist form + 3 tier cards + run-of-show preview)
  ├── styles.css                  (French-cafe palette: cream #f5e6c8, espresso #2a1810, copper #b87333)
  ├── app.js                      (waitlist localStorage capture, tier scroll, ticker)
  ├── ops/
  │     ├── discord-setup.md      (15 channels + 4 bots install order)
  │     ├── tally-form-spec.md    (14 intake questions + reveal form fields)
  │     ├── run-of-show.md        (90-min timeline, 5 rotations × 2min)
  │     ├── match-script.gs       (Google Apps Script — match processor)
  │     └── code-of-conduct.md
  └── README.md

DONE LOOKS LIKE:
- index.html opens locally + renders 3 tier cards ($5/$15/$30) with Patreon CTA buttons
- Waitlist form captures email → localStorage → "thank you" inline confirmation
- French cafe aesthetic (cream/espresso/copper palette, Cormorant Garamond + Inter font stack)
- All 5 ops docs in /ops/ ready for Chad to copy-paste into Discord/Tally/Patreon
- match-script.gs runnable in Google Apps Script with stub data

LENGTH CAP: under 500 words.
```

---

### AGENT 3 — Job 3 VRChat Ultimate Site Ship

```
You are Phase 2 Agent 3 — VRChat Ultimate site assembly.
Your job: merge VRChat-WebApp scaffold + VRChat-Site2 content + VRChat-Site1 baseline into a shippable 18-page site.

READ FIRST:
1. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR-MERGE-PM-BRIEFS.md (Job 3 section)
2. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-merge-phase1-out\job3\ (Phase 1 — section extraction map, CSS dedupe table)
3. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VRChat-WebApp\ (scaffold base)
4. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VRChat-Site2\app.js (1556 lines, 18 renderSection*() functions)
5. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VRChat-Site1\styles.css

CREATE FILES (target — match brief's final architecture):
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager\-- Results folder master forever\Regular projects - 2\!! 2026-04-27 — vrchat ultimate site\
  ├── index.html                  (hub + 18-tile home grid)
  ├── pages/                      (one HTML per section)
  │     ├── report.html, start-here.html, avatars.html, worlds.html,
  │     ├── events.html, creators.html, slang.html, news.html,
  │     ├── dj-raves.html, games.html, avatar-creation.html,
  │     ├── dev-corner.html, fifty-worlds.html, body-tracking.html,
  │     ├── eighteen-plus.html (age-gate), toy-market.html, history.html,
  │     └── world-of-week.html
  ├── shared/
  │     ├── nav.js, components.js, styles.css, theme-vars.css
  ├── data/
  │     └── sections.js           (extracted from Site2 app.js renderSection* funcs)
  └── README.md

DONE LOOKS LIKE:
- All 18 pages render with content extracted from Site2 app.js
- Hub index.html shows 18-tile grid + gradient "VRChat Ultimate" headline
- nav.js works at root AND /pages/ (path detection)
- 18+ page triggers age-gate modal; sessionStorage.setItem('age_confirmed','1') persists for session
- Dark theme (#0e1013 bg / #4d509c brand / #bd93f9 accent), Exo 2 font
- No 404s on internal links, no console errors

LENGTH CAP: under 500 words.
```

---

### AGENT 4A — Job 4 Voice MVP (client + server)

```
You are Phase 2 Agent 4A — Language Barrier voice MVP.
Scope: Express server + browser client for the voice translation pipeline.
You do NOT touch invite-bot.js or packaging. Agent 4B owns those.

READ FIRST:
1. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR-MERGE-PM-BRIEFS.md (Job 4, especially audio flow + Phase 2 MVP goals)
2. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-merge-phase1-out\job4\ (Phase 1 — env spec, audio routing notes)
3. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR Bridge\server.js + client/

CREATE FILES (target — clone & rename the Bridge folder):
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager\-- Results folder master forever\Regular projects - 2\!! 2026-04-27 — vr language barrier\
  ├── server.js                   (Express :3000 — /health, /realtime-token, /tts)
  ├── client/
  │     ├── index.html            (tap-to-speak UI)
  │     ├── app.js                (MediaRecorder, WebSocket to /realtime-token)
  │     ├── styles.css
  │     └── audio-router.js       (VB-Cable selection helper)
  ├── .env.example                (OPENAI_API_KEY=, ELEVENLABS_API_KEY=, PORT=3000)
  ├── package.json                (express, ws, dotenv, node-fetch)
  └── docs/audio-routing.md       (VB-Cable + Voicemeeter Banana setup)

EXPLICIT NON-TOUCH:
  - Do NOT create invite-bot.js, .otplib config, packaging scripts, or APK assets — those belong to Agent 4B.

DONE LOOKS LIKE:
- `npm install && npm start` boots :3000
- /health returns `{ ok: true, build: "<git-sha-or-timestamp>" }`
- Browser client shows tap-to-speak button + connection status
- /realtime-token endpoint returns ephemeral OpenAI token (stub if no key in .env — return mock token + log warning)
- /tts proxies to ElevenLabs Flash 2.5 (stub if no key — return small silent WAV + log warning)
- README.md explains end-to-end mic→VB-Cable→VRChat path

LENGTH CAP: under 500 words.
```

---

### AGENT 4B — Job 4 Bot Hardening + Packaging

```
You are Phase 2 Agent 4B — invite-bot hardening + installer scaffold.
Scope: invite-bot.js, 2FA (otplib), packaging, GitHub release prep.
You do NOT touch server.js or client/ — Agent 4A owns those.

READ FIRST:
1. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR-MERGE-PM-BRIEFS.md (Job 4, Phase 5 + Phase 6 + Critical risks)
2. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\vr-merge-phase1-out\job4\ (Phase 1 — bot config spec, TOS notes)
3. C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\VR Bridge\invite-bot.js (current source)

CREATE / EXTEND FILES (same project root as Agent 4A):
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager\-- Results folder master forever\Regular projects - 2\!! 2026-04-27 — vr language barrier\
  ├── bot/
  │     ├── invite-bot.js         (VRChat login, friend polling, 1hr cooldown)
  │     ├── totp.js               (otplib TOTP wrapper, reads VRC_TOTP_SECRET)
  │     ├── watchlist.json        (default empty array)
  │     └── README.md             (run instructions, ToS warning)
  ├── packaging/
  │     ├── build-exe.md          (pkg / Electron path notes — DO NOT run, just document)
  │     ├── version.json          ({ "version": "1.0.0", "channel": "alpha" })
  │     └── known-risks.md        (VRChat ToS, key exposure, Quest IP churn)
  └── .env.example                (APPEND ONLY — add VRC_USERNAME=, VRC_PASSWORD=, VRC_TOTP_SECRET=, VRC_GROUP_ID=, VRC_FRIEND_IDS=)

EXPLICIT NON-TOUCH:
  - server.js, client/, docs/audio-routing.md — those belong to Agent 4A.
  - When extending .env.example, APPEND your keys at the bottom; do NOT rewrite Agent 4A's lines.

DONE LOOKS LIKE:
- `node bot/invite-bot.js` runs and prints "watching <N> friends" then polls every 30s (stubbed VRChat API ok)
- TOTP integration works against a test secret (otplib generates 6-digit code)
- 1hr per-friend cooldown enforced in memory
- known-risks.md mentions ToS prominently with copy-paste warning Chad can drop into README
- packaging/build-exe.md describes pkg + Electron paths but does NOT execute the build

LENGTH CAP: under 500 words.
```

---

## SECTION 2 · FILE-COLLISION AVOIDANCE MAP

Each row = one Phase 2 agent. Bold cells = **shared file requiring append-only or split rules**.

| Agent | Owns (exclusive) | Shared (rule) |
|---|---|---|
| 1A frontend | `index.html`, `sections/**`, `shared/**`, `README.md` | — |
| 1B backend | `server/**`, `data/**`, `.env.example` (server scope) | — |
| 2 speed dating | entire `!! 2026-04-27 — speed dating cafe vismo\` tree | — |
| 3 VRChat site | entire `!! 2026-04-27 — vrchat ultimate site\` tree | — |
| 4A voice | `server.js`, `client/**`, `docs/audio-routing.md`, `package.json`, **`.env.example`** | **`.env.example`** — 4A writes lines 1-5, 4B appends below |
| 4B bot/pkg | `bot/**`, `packaging/**`, **`.env.example`** | **`.env.example`** — 4B appends only, never overwrites |

### Collision flags
- **Job 1 (.env)**: 1A is frontend-only — should NOT touch any .env. 1B owns server/.env.example. Zero overlap when each agent obeys its non-touch list.
- **Job 4 (.env.example)**: ONLY shared file. Mitigation: 4A's prompt creates the file with 5 lines. 4B's prompt explicitly says "APPEND ONLY". If both agents complete in parallel and race the file, the merge step is trivial (concat).
- **Job 4 (package.json)**: 4A creates it with express/ws/dotenv/node-fetch. 4B needs `otplib` — added in 4B prompt as: "if package.json exists, run `npm install otplib --save` (don't rewrite the file)". This is a soft collision — npm handles the merge.
- **Cross-job**: zero. Each job lands in its own dated wrapper folder under `Regular projects - 2\`.

---

## SECTION 3 · DEPLOY ORDER

Deploy after ALL Phase 2 agents complete. Order optimized for fastest user-visible value + lowest blast radius.

| # | Site | Why first / why later | Cache-bust |
|---|---|---|---|
| 1 | **Job 2 — Speed Dating landing** | Static HTML/CSS/JS, zero backend, smallest surface. If Netlify build hiccups, easy to roll back. Gets Chad a public URL for waitlist capture immediately. | `?v=$(date +%s)` query string appended on first preview |
| 2 | **Job 4 — Language Barrier landing/tutorial** | Static `client/` portion deploys to Netlify. Server stays local (.env keys never on Netlify). Tutorial readable, downloads link to GitHub release. | same |
| 3 | **Job 3 — VRChat Ultimate** | 18 pages, biggest static site. Slowest deploy. Lower urgency — content is reference-grade, not time-sensitive. | same |
| 4 | **Job 1 — Onboarding merged** | Frontend + backend split. Frontend alone deploys to Netlify; backend (Express server) goes Render/Fly.io OR stays local for now. Last because it's the most coupled and most likely to need a re-deploy after Phase 3 wires real distribution. | same |

### Cache-bust strategy
- All preview URLs: `<url>?v=$(date +%s)` per the locked `feedback_cache-buster.md` rule.
- Netlify `_headers` file in each site: `/* \n  Cache-Control: public, max-age=0, must-revalidate` for index.html and `*.js`/`*.css` get `max-age=3600` with content-hash filenames.
- After every redeploy, re-open in Chrome with fresh cache-bust per `feedback_re-preview-after-each-update.md`.

---

## SECTION 4 · INTEGRATION MATRIX (Cross-Job Hooks)

How the 4 jobs connect after Phase 2. Phase 2 leaves stubs/links — Phase 3 wires the real data flows.

```
                      ┌─────────────────────────────────────────┐
                      │  JOB 1 · Onboarding (artist signup)     │
                      └───────────────┬─────────────────────────┘
                                      │ artistId in localStorage
                                      ▼
                      ┌─────────────────────────────────────────┐
                      │  JOB 2 · Speed Dating events            │
                      │  Spotlight Job 1 artists at events      │
                      └───────────────┬─────────────────────────┘
                                      │ event-of-week JSON
                                      ▼
                      ┌─────────────────────────────────────────┐
                      │  JOB 3 · VRChat Ultimate site           │
                      │  Events page pulls Job 2 events feed    │
                      └───────────────┬─────────────────────────┘
                                      │ tools section link
                                      ▼
                      ┌─────────────────────────────────────────┐
                      │  JOB 4 · Language Barrier (event tool)  │
                      │  Linked from Job 2 events page as       │
                      │  "international night" toggle           │
                      └─────────────────────────────────────────┘
```

| From → To | Cross-link | Phase 2 leaves | Phase 3 wires |
|---|---|---|---|
| Job 1 → Job 2 | Spotlight signed artists at speed-dating events | In Job 2 index.html, add `<!-- TODO Phase 3: fetch /api/featured-artist from Job 1 backend -->` placeholder card | Real fetch + render |
| Job 2 → Job 3 | Events section on VRChat Ultimate features Job 2 weekly events | In Job 3 `pages/events.html`, add stub `<div data-source="cafe-vismo" data-feed="/cafe-vismo/events.json">` | Static JSON drop or live feed |
| Job 3 → Job 4 | Job 3 "Tools" / "Dev Corner" page links to Job 4 download | In Job 3 `pages/dev-corner.html`, add anchor `<a href="https://<job4-netlify>/download">VR Language Barrier</a>` | Real Netlify URL |
| Job 4 → Job 2 | Job 4 advertised as "international night" tool in Job 2 Discord | In Job 2 `ops/discord-setup.md`, add channel #language-barrier with pinned download link | Pin the real link |

All 4 cross-links are **stubbed** in Phase 2 (commented placeholders or relative paths). No live data flows yet — that's Phase 3.

---

## SECTION 5 · POST-PHASE-2 QA CHECKLIST

Run these 14 checks after all Phase 2 agents complete. Each: action → expected → fix.

| # | Action | Expected result | If broken |
|---|---|---|---|
| 1 | `cd "!! 2026-04-27 — vr onboarding merged" && python -m http.server 3010` then open `http://localhost:3010?v=$(date +%s)` | Pill nav top, scroll-snap between 6 sections, VRChat teal/orange palette | Re-run Agent 1A with note "tokens.css missing or pill-nav broken" |
| 2 | `cd "!! 2026-04-27 — vr onboarding merged/server" && npm install && npm run dev` | Express boots :3001, prints route list | Re-run Agent 1B with package.json log |
| 3 | `curl -X POST localhost:3001/api/artist -H "Content-Type: application/json" -d '{"stageName":"Test"}'` | `{ artistId: "<uuid>" }` | Check routes/artist.js, ensure body-parser middleware mounted |
| 4 | Open speed dating index.html locally | Cream/espresso/copper palette, 3 tier cards, waitlist form | Re-run Agent 2 with palette spec |
| 5 | Submit waitlist form | localStorage entry + inline confirmation | Check app.js handler |
| 6 | Open VRChat Ultimate hub index.html | 18 tiles in grid, gradient headline | Re-run Agent 3 with tile-count check |
| 7 | Click each of 18 page tiles | Page renders content (no blank pages, no 404) | Verify data/sections.js extraction completed |
| 8 | Click "18+" tile | Age-gate modal blocks; confirm → content; refresh → still confirmed (sessionStorage) | Check eighteen-plus.html age-gate script |
| 9 | `cd "!! 2026-04-27 — vr language barrier" && npm install && npm start` | Express :3000 boots, /health → `{ ok: true }` | Re-run Agent 4A with .env.example check |
| 10 | Open `http://localhost:3000` | Tap-to-speak UI, connection status indicator | Verify client/app.js + WebSocket wiring |
| 11 | Without keys: `curl localhost:3000/realtime-token` | Mock token + warning in server log | Confirm Agent 4A stub fallback working |
| 12 | `node bot/invite-bot.js` (with stub watchlist) | Logs "watching 0 friends" then polls every 30s | Check Agent 4B wrote bot/invite-bot.js |
| 13 | `node -e "const t = require('./bot/totp'); console.log(t.generate('JBSWY3DPEHPK3PXP'))"` | 6-digit code | Verify otplib installed + bot/totp.js exports |
| 14 | Open all 4 cross-link stubs (Job 1→2, 2→3, 3→4, 4→2) | Each placeholder/comment present and labeled "Phase 3 wire" | Add missing stubs manually before declaring Phase 2 done |

---

## SECTION 6 · RISK REGISTER FOR PHASE 2

Top 5 ways Phase 2 can fail + mitigation.

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | **Sub-agent writes broken JS** (syntax error breaks index.html) | Medium | High | Each agent prompt's "DONE LOOKS LIKE" forces a local-load smoke test claim. If user runs QA #1, 4, 6, 10 and any fail with a console error, fire a single auto-fix sub-agent (`/red-dot-green-dot`) targeted at the offending file rather than re-running the whole agent. |
| 2 | **Phase 1 artifact missing fields** (e.g., job1/ has no palette tokens file) | Medium | High | Each Phase 2 agent's READ FIRST list includes a fallback to the original brief + raw source folders. Agents are explicitly told to derive missing data from sources rather than fail. |
| 3 | **Netlify deploy hits build error** (e.g., relative path wrong, missing `_headers`) | Medium | Medium | Deploy order is staged smallest→biggest (Job 2 → 4 → 3 → 1). If Job 2 fails, halt; don't queue the rest. Cache-bust strategy ensures any deploy succeeds with live preview. |
| 4 | **Sub-agent timeout** (large file write — Job 3's 18 pages, Site2 1556-line app.js parse) | Medium | Medium | Job 3 prompt explicitly tells Agent 3 to extract section data into `data/sections.js` ONCE, then have each page import from it. Reduces 18× redundant content writes. If timeout still hits, split Agent 3 into 3-page batches via `--x --3`. |
| 5 | **Two agents collide on `.env.example`** in Job 4 (4A and 4B both writing) | Low | Low | Prompts explicitly assign 4A first-write, 4B append-only. Even on race, manual concat resolves in <30s. Worst case: Chad runs `cat 4a.env 4b.env > .env.example` after both finish. |

### Bonus risk — VRChat ToS for Job 4 invite-bot
- Agent 4B's prompt mandates `packaging/known-risks.md` with prominent ToS warning. Chad must read this before launching Phase 6 (public release). Phase 2 alone does NOT publish the bot — it only scaffolds it locally.

---

## EXECUTION COMMAND (when Phase 1 lands)

Fire all 6 Phase 2 agents in one tool-call burst via `--x --6`:
```
--x --6
```
Then paste each agent prompt above into the corresponding sub-agent slot. Auto-grid tracker will surface progress in the locked 2x3 format per `feedback_grid-2x3-locked.md`.

After Phase 2 completes, run the 14 QA checks (Section 5) before staging deploys (Section 3).

— END PHASE 2 MASTER PLAN —
