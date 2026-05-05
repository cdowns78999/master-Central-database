# VR Projects — PM-Feedable Briefs (2026-04-27)

Four consolidated jobs from 12 source folders in `🪨🪨🪨🪨 Ran Plan Area\`.
Each block below is self-contained — paste into `/--pr` or `/stack-board` to continue the build.

Renames locked: VR Bridge → **VR Language Barrier**.
Regrouping locked: VR-Final-Label folded into Job 1.
Excluded: vr-status-preview (unclassified), vr-triple-hub (aggregator — handle later), vr-artist-onboarding copy + VRChat-Site2-BACKUP (dupes).

---

## JOB 1 · VR ARTIST ONBOARDING + FINAL LABEL

**Source folders (merge):**
- `vr-artist-onboarding\` ← primary base (most complete onboarding flow)
- `vr-onboarding-v2\` ← redesign blueprint (pill-nav scroll architecture)
- `VR-Final-Label\` ← downstream submission/distribution hub

**Vision (1 sentence):**
End-to-end artist pipeline: scout-discovery receipt → 9-step journey explainer → song picker → deal terms → vocal upload → mix progress → DistroKid push → Spotify release + 50/50 payout.

**Tech stack:** Vanilla HTML/CSS/JS (no frameworks). Exo 2 + Poppins/Noto Sans/Dosis fonts. localStorage persistence. Modular per-section CSS/JS pattern from Final-Label.

**Current state:**
- ✅ Onboarding HTML structure (2120-line index.html), receipt card, 9-step spine, platform picker (YouTube/Spotify/Apple/SoundCloud), URL validation, deal card (50/50, PayPal/Bank, 15th-of-month auto-payout), modal "How It Works"
- ✅ v2 redesign spec (793 lines, line-by-line installer with risk flags) — pill-nav top bar, sticky anchors, scroll-snap
- ✅ Final-Label P1 cinematic + P2 form (artist info, vocal upload), VRChat design-token research (teal #2baac1, orange #ff7f54, surfaces #1f232a)
- ⚠️ Avatar webhook (Pollinations.ai → Gemini Pro Vision → Three.js GLB texturing) documented but not wired
- ❌ Form submission endpoints, file upload handlers, mix-progress polling, distribution payload

**Best parts to keep:**
1. Onboarding production HTML (vr-artist-onboarding) as base
2. v2 pill-nav architecture (replaces old quad-grid)
3. Final-Label modular section pattern (`p1.css`/`p1.js` ... `p9.js`)
4. Final-Label VRChat palette tokens (teal/orange wins over current purple)
5. Cinematic P1 "we heard you sing" as bridge between onboarding close → label entry
6. Avatar webhook plan as optional P2.5

**Next steps for PM:**
1. Apply v2 redesign-plan.md changes into vr-artist-onboarding/index.html
2. Refactor combined HTML into 5–6 modular section files (Final-Label pattern)
3. Unify `:root` with VRChat palette tokens
4. Wire form submission + file upload backend
5. Stage avatar webhook as toggle-on feature
6. Final-Label remains separate downstream app; onboarding redirects via artist ID after song submit

---

## JOB 2 · VR SPEED DATING (CAFE VISMO)

**Source folder:** `vr-speed-dating-cafe-vismo\` (single folder, fully scoped)

**Vision (2 sentences):**
Weekly Patreon-gated speed-dating event inside VRChat. Phase 1 launches in La Barista (free French cafe world); Phase 2 commissions custom Cafe Vismo Unity world at 50+ patrons.

**Tech stack:** VRChat (venue) + Patreon (gate, 3 tiers $5/$15/$30) + Discord (Carl-bot, GiveawayBot, Sesh, Patreon sync) + Tally forms (intake + post-event reveal) + static landing page (vanilla HTML).

**Current state:**
- ✅ Full README + event run-of-show (90-min playbook, 5 rotations × 2 min)
- ✅ Patreon tier copy (Table Reservation $5 / Front Row $15 / Host $30)
- ✅ Discord blueprint (7 sections, 15 channels, role-gated)
- ✅ VRChat world plan (La Barista launch + Cafe Vismo commission brief: 15 tables, central emcee, ceiling timer)
- ✅ Onboarding form spec (14 questions)
- ✅ Landing page index.html (waitlist + tier buttons, French cafe aesthetic)
- ✅ Business model 4-column visual
- ❌ ALL deployment — nothing is live yet

**Best parts to keep:** All of it — it's the cleanest folder. No merge needed.

**Next steps for PM (in dependency order):**
1. Patreon account + 3 tiers published + Discord-app sync installed
2. Discord guild "Cafe Vismo — Speed Dating" + bots (Patreon, GiveawayBot, Carl-bot, Sesh)
3. Tally onboarding form deployed + linked in welcome DM (parallel)
4. Tally post-event reveal form (yes/friend/no per partner)
5. Match-processing Google Sheets script (MVP manual)
6. VRChat host Trusted-rank verified + La Barista bookmarked + backup co-host
7. Landing page deployed (Netlify/Vercel)
8. Staff-only first event QA (instance, audio, timer, bell, rotation)
9. Code of conduct written + reaction-gated for `@Verified`
10. Public launch announcement

---

## JOB 3 · VRCHAT ULTIMATE WEBSITE

**Source folders (merge):**
- `VRChat-WebApp\` ← primary base (modular pages/ + shared/)
- `VRChat-Site2\` ← content source (1556-line app.js with 18 renderSection functions)
- `VRChat-Site1\` ← earliest CSS/typography baseline

**Vision (1 sentence):**
"VRChat Ultimate — The Definitive Community Resource" — 18-section culture reference covering worlds, avatars, events, creators, tools, slang, history.

**Tech stack:** Vanilla HTML/CSS/JS. WebApp = pages/ + shared/ modular SPA. Exo 2 font. Dark theme (#0e1013 bg, #4d509c brand, #bd93f9 lavender accent), glass morphism cards, gradient text.

**Current state:**
- ✅ WebApp scaffold: 16 static pages + nav.js + components.js + styles.css design system
- ✅ Site2: Full content — 18 sections all rendered via app.js (Report, Tutorial, Gossip, World-of-Week, Avatar-Showcase, Creators, Events, Slang, News, DJ&Raves, Games, Avatar-Creation, Dev-Corner, 50-Worlds, Body-Tracking, 18+, Toy-Market, History) + age-gating session storage
- ✅ Site1: Early styling baseline (29.8KB styles.css, inline color dots)
- ❌ Content from Site2 not yet ported into WebApp/pages/

**Best parts to keep:**
1. WebApp architecture (pages/ + shared/ + nav.js path detection)
2. Site2 18 section contents (extract from renderSection functions)
3. Site2 age-gating logic for 18+ section
4. Site1 initial color/typography baseline merged into shared/styles.css

**Next steps for PM:**
1. Parse Site2 app.js renderSection*() into JSON or per-page HTML fragments → drop into WebApp/pages/
2. Inline critical home grid into WebApp index.html, lazy-fetch others
3. Merge Site1 + Site2 CSS into unified shared/styles.css (dedupe, keep per-section overrides)
4. Verify nav.js works at root + /pages/ depth
5. Port age-gating from Site2 into Site2's 18+ page
6. QA all 18 pages render + breadcrumb + mobile sidebar + age-gate persistence

**Final architecture target:**
```
VRChat-Ultimate/
├── index.html (hub + home grid)
├── pages/ (18 pages — report.html, start-here.html, avatars.html, ...)
├── shared/
│   ├── nav.js, components.js, styles.css, theme-vars.css
└── data/sections.js (extracted from Site2 app.js)
```

---

## JOB 4 · VR LANGUAGE BARRIER (formerly VR Bridge)

**Source folder:** `VR Bridge\` (rename pending)

**Vision (2 sentences):**
Real-time language bridge inside VRChat audio pipeline — speak English, friend hears it in Japanese (or any direction). Solves what physical translators (Ray-Bans, Timekettle) can't: avatar-to-avatar communication in persistent virtual communities.

**Audio flow:**
```
mic → STT (Whisper) → translate (GPT-4o) → TTS (ElevenLabs Flash 2.5) → VB-Cable → VRChat
VRChat API → invite-bot → group invite (1hr cooldown)
```

**Tech stack:** Express.js (localhost:3000 proxy for API keys) + vanilla JS client + MediaRecorder + WebSocket to OpenAI Realtime + Node invite-bot worker. VB-Cable + Voicemeeter Banana for Windows audio routing. Netlify static for landing/tutorial. Quest companion APK planned.

**Current state:**
- ✅ Server (Express): /health, /realtime-token, /tts, /watchlist, /invite-status, /invite-control all wired
- ✅ Client UI: tabs, voice control, watchlist add/remove, pause/resume, 5s polling
- ✅ Invite-bot.js: VRChat login, friend polling (30s), offline→online detection, 1hr cooldown, group invite POST
- ✅ Architecture decisions locked (OSC over LAN; desktop proxy keeps keys off browser)
- ⚠️ 2FA path stubbed (needs `otplib` integration)
- ❌ NOT TESTED with real OpenAI/ElevenLabs keys
- ❌ Quest APK companion (Phase 4)
- ❌ Installer .exe (Phase 6)

**Outstanding decisions:**
1. Realtime API vs. discrete tap-to-speak Whisper batch (latency vs. cost)
2. Quest IP discovery: mDNS auto vs. manual paste-in
3. 2FA: full TOTP via otplib vs. pre-seeded auth cookie
4. Invite-bot: foreground terminal only vs. Windows Service (nssm)
5. Pricing: free vs. Stripe-gated vs. freemium

**Critical risks:**
1. **VRChat ToS violation** for auto-invite bot — document prominently, possibly contact VRChat team
2. **Quest IP churn** breaks OSC after every reboot — needs mDNS or paste-in flow
3. **API key exposure** — audit server.js CORS, ensure browser never sees raw keys

**Next steps for PM (6 phases):**
1. **Phase 1 (Scaffold):** npm ci, server boots, UI loads, VB-Cable + Voicemeeter installed, audio routing verified, no feedback loop
2. **Phase 2 (MVP):** OpenAI + ElevenLabs keys in .env, realtime-token + TTS endpoints tested, E2E voice roundtrip <2s latency 8/10
3. **Phase 3 (Hosting):** Netlify deploy, public URL live, tutorial readable
4. **Phase 4 (Quest):** Meta Dev account, Unity/Godot APK scaffold, SideQuest distribution, "Desktop connected" message on Quest
5. **Phase 5 (Hardening):** otplib TOTP wired, throwaway VRChat account, group + friend IDs in .env, online-flip test, cooldown verified
6. **Phase 6 (Ship):** pkg/Electron .exe installer, version.json auto-updater, README "Known Risks" section, GitHub release v1.0.0, SideQuest live, public launch

---

## EXAMPLE PATHS · 1 happy-path walkthrough per job

### JOB 1 PATH — "Maya gets scouted in VRChat"
1. Scout finds Maya singing in a VRChat karaoke world
2. Sends her the onboarding URL via Discord DM
3. Maya opens link → sees RECEIPT card: "Found on: VRChat · Scout: Aria · Acceptance: <1 in 200"
4. Scrolls into 9-STEP SPINE (Discovery → Outreach → ... → Revenue)
5. Hits "Your Song" pill → pastes Spotify link of cover she wants → URL validates → green check → scrolls to DEAL section
6. Reviews 50/50 split + 15th-of-month payout · clicks Accept
7. Cinematic P1 fades in: "we heard you sing. let's put it on Spotify." → redirects to Final-Label downstream app
8. Final-Label P2 form: stage name, real name, email, photo, bio
9. P3: uploads vocal WAV · P4-P9: watches mix progress, sees distribution checklist, confirms payout method
10. Spotify release goes live 7-14 days later, royalties 15th
**END STATE:** artist signed, song shipped, 50/50 royalty pipeline live

### JOB 2 PATH — "Friday night, Cafe Vismo speed dating event"
- WED T-48h: Host runs GiveawayBot in #raffle · 30 slots, split 15+15
- THU: Host balances groups via Tally onboarding spreadsheet
- FRI 7:30P: Nonce-locked La Barista invite drops in #invite-drops
- FRI 7:50P: Patrons land in cafe lobby · ambient jazz · warm-up chat
- FRI 8:00P: Host rings bell → rotation 1 begins (2 min, 15 pairs)
- FRI 8:02P: Bell · pairs shuffle clockwise to next table
- FRI 8:14P: Rotation 5 ends · Tally reveal form link drops in #post-event
- SAT AM: Patrons fill reveal form (yes/friend/no per partner)
- SAT PM: Match script DMs mutual matches · aggregate stats in #mutual-matches
**END STATE:** 30 patrons · ~6-12 mutual matches · $150-300 Patreon MRR · repeat next Friday

### JOB 3 PATH — "Curious VRChat newbie lands on the site"
1. New player Googles "vrchat slang explained" → hits site
2. Lands on hub: gradient "VRChat Ultimate" headline + 18 tile grid
3. Clicks "Start Here" tile → reads onboarding for first-timers
4. Sidebar nav stays sticky · clicks "Slang" → glossary loads
5. Clicks "World-of-Week" → curated featured world + screenshots
6. Clicks "Avatars" → showcase grid of community creators
7. Tries clicking "18+" → age-gate modal · session storage records confirmation
8. Bookmarks site · returns weekly for World-of-Week + News updates
**END STATE:** site = trusted community reference · creators get visibility via avatar/world tiles

### JOB 4 PATH — "Yuki (JP) and Chad (EN) meet in VRChat"
1. Chad runs invite-bot.js on his PC · watches 5 friends incl. Yuki
2. Yuki logs into VRChat at 10pm JST · bot detects offline→online within 30s · POSTs group invite
3. Yuki accepts invite · joins Chad's group instance
4. Chad opens localhost:3000 · clicks TAP-TO-SPEAK · says: "hey welcome, glad you made it"
5. Whisper transcribes · GPT-4o translates → Japanese · ElevenLabs Flash 2.5 synthesizes JP audio (~1.8s e2e)
6. Audio routes mic→VB-Cable→VRChat · Yuki hears Chad's avatar speaking Japanese
7. Yuki replies in JP · pipeline reverses (JP→EN)
8. Real conversation · neither speaks the other's language natively
**END STATE:** language barrier dissolved inside VRChat audio · works where physical translators can't

---

## QUICK PASTE FORMAT FOR `/--pr`

When firing PM walkthrough on a single job:
```
/--pr

JOB: [job name from above]
SOURCE FOLDERS: [folder list]
VISION: [1-2 sentences]
CURRENT STATE: [✅/⚠️/❌ bullets]
NEXT STEPS: [numbered list]
```

Or paste the whole block — `/--pr` will infer phase boundaries from the next-steps list.
