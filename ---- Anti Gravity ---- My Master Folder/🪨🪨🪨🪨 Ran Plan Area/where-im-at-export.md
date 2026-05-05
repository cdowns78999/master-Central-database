# WHERE I'M AT & WHERE THIS IS GOING
### Ahead Artist Solutions — Digital Communications Build
### Export Date: 2026-03-13

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## THE VISION

Building a Digital Communications layer for Ahead Artist Solutions using a **3-piece closed operation ecosystem** — no external SaaS, everything in-house powered by Claude.

The end goal: a **live on-call, on-demand, voice-like assistant** using Claude, the Wing Dashboard App, and the /c9-1-job-runner skill + 2 supporting HTML tools.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## THE SYSTEM (3 files + 1 skill)

```
┌─────────────────────────────────────────┐
│  1. Wing Dashboard App (index.html)     │
│     → front-end, pills, POS, switcher   │
│     → reads from green-spreadsheets     │
├─────────────────────────────────────────┤
│  2. Railroad Control Panel              │
│     (railroad-control-panel.html)       │
│     → executor, 4-zone grid, results    │
│     → railroadState holds all progress  │
├─────────────────────────────────────────┤
│  3. Build Digital Coms                  │
│     (build-digital-coms.html)           │
│     → source of truth, step definitions │
│     → stepData + platformData objects   │
├─────────────────────────────────────────┤
│  4. /c9-1-job-runner (skill)            │
│     → reads steps, executes or hands    │
│       off, logs results, threads fwd    │
│     → PRE-FLIGHT → CHOOSE → TEE UP →   │
│       EXECUTE → VERIFY+LOG → PASS-OFF  │
└─────────────────────────────────────────┘
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## WHERE I'M AT — PROGRESS

**Overall: 6 of 112 steps done (~5.4%)**

### S1 — COMMS SCRAPE: ✅ COMPLETE (4/4)
- Gmail Scrape → `tools/gmail-scrape.py` (OAuth2, starred threads, JSON+CSV export)
- iMessage Pull → `tools/imessage-pull.py` (chat.db reader, top-20 contacts)
- WhatsApp Export → `tools/whatsapp-export.py` (parses .txt/.zip, by contact+date)
- Other Comms → `tools/other-comms.py` (Discord, Messenger, unified export)

### S2 — SOCIAL SWEEP: 🟢 IN PROGRESS (2/3)
- ✅ Connect Social Accounts — 10 platforms in green-spreadsheets + Calendar Contacts sheet
- ✅ Run Contact Enrichment — Gmail Scraper v2 LIVE (21 threads, 12 contacts, auto-deploys to `data/feeds/gmail.json`)
- ⏳ **NEXT: Build Contact Dashboard** (S2 Step 3)

### S3 — REVIO: ⏳ LOCKED (0/3)
### S4 — ALLEY: ⏳ LOCKED (0/3)
### S5 — INTEGRATION: ⏳ LOCKED (0/3)
### Platforms (11 × 8-10 steps): ⏳ LOCKED (0/96)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## WHAT'S LIVE RIGHT NOW

**Gmail Scraper v2**
- OAuth working, token cached
- Google Cloud project: "Wings Dashboard", `chaddowns9@gmail.com` as test user
- Pulls starred emails, deploys to `data/feeds/gmail.json`

**Wing Dashboard App**
- Midnight Moon default theme, 4-theme cycler
- Unified submenu system (one code path, scrollable overflow, star-mode dual behavior)
- Drop zone with nesting (max 2), reorder (hold 400ms), delete (✕)
- Pipeline column (section 4) on right wing with live mirror box + 5 step cards
- Local server via `launch.bat` → `localhost:3000`, desktop shortcut
- AppViewer iframe embedding (Pricing Matrix loads inside dashboard)
- GO button unified (centerGoBtn + placeGoBtn both fire to mirror box)
- Red pulsing live dot on data arrival

**Skills Built**
- `/c9-1-job-runner` — the railroad executor
- `/c-preview` — local server + cache-bust preview
- `/c-quick-clip-library` — safe copy from library to sub-library
- `/mode` — unified assistant (deep thinking + task execution + notch commands)
- All 4 S1 scraper tools

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## WHERE THIS IS GOING

### Immediate Next Steps
1. **S2 Step 3** — Build Contact Dashboard (wire enriched contacts into dashboard view)
2. Wire Pipeline Button 3 → chad22 (Proposal Generator) via AppViewer
3. Wire Pipeline Button 5 → chad25 (Pricing Matrix) via AppViewer
4. Design the real button flow: price → packages → place (replace temp labels)
5. Google Drive OAuth fix (need Web Application client for localhost:3000)

### The Road Ahead
- **S3 Revio** — payment/invoice integration
- **S4 Alley** — client pipeline/CRM layer
- **S5 Integration** — tie everything together into the live assistant
- **96 Platform Steps** — wire each of the 11 platforms (LinkedIn, IG, X, Gmail, Outlook, FB, TikTok, YT, Discord, WhatsApp + more)

### The Endgame
A fully wired assistant that Chad can talk to — voice in, action out. The Wing Dashboard is the face. The railroad is the build engine. Every step either Claude does automatically or hands off to Chad. The Claudify system means any Chad step can be converted to an in-house Claude process over time. The railroad never stops — it always threads forward or wraps cleanly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## KEY FILE PATHS

```
Dashboard:          --wingdashapp--1--/index.html
Gmail feed:         --wingdashapp--1--/data/feeds/gmail.json
Slot prefs:         --wingdashapp--1--/data/config/slot-prefs.json
Railroad:           🔧 WORK/railroad-control-panel.html
Build Guide:        🔧 WORK/build-digital-coms.html
Green Spreadsheets: 🔧 WORK/green-spreadsheets.html
Scraper:            ADMIN/tools/gmail-scrape.py
Token:              ADMIN/tools/token.json
Credentials:        ADMIN/tools/credentials.json
Archive:            ADMIN/tools/exports/{gmail,imessage,whatsapp,unified}/
Session logs:       ADMIN/memory/
Backups:            💾 BACKUPS/
Skill:              .claude/skills/c9-1-job-runner/skill.md
```

All inside: `master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨 AUTOMATIONS 🪨🪨/`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## TO RESUME

Invoke `/c9-1-job-runner resume` — the skill reads `railroadState` from the control panel, finds the first incomplete step (currently **S2 Step 3 — Build Contact Dashboard**), and threads forward from there.
