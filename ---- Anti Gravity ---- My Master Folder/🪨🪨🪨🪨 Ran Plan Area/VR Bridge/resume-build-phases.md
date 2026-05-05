# VR Bridge — Resume Build Phases

Six phases. Scaffold-fix → MVP → Quest companion → Presence Bridge → Polish/Ship.
Each phase has a boxes-and-arrows wire chart + a "HOW IT WORKS" upper-left block.

---

## PHASE 1 — Scaffold Fix & Local Plumbing

```
 HOW IT WORKS                           +---------------------------+
 -----------------------------          |      PHASE 1 SCOPE        |
 1. Audit existing scaffold             +---------------------------+
 2. Pin Node deps, fix .env loader
 3. VB-Cable + Voicemeeter verify
 4. Smoke-test localhost:3000
 STEPS 4 | TOUCHES 6 | RISK low

  [ package.json ]---pin--->[ node_modules ]
        |
        v
  [ server.js ]----serves---->[ index.html + app.js ]
        |                            |
        |                            v
        |                      (localhost:3000 UI)
        v
  [ .env loader ]<---reads--- (dotenv)
        |
        +---> OPENAI_API_KEY  (placeholder, wired Phase 2)
        +---> ELEVENLABS_API_KEY (placeholder, wired Phase 2)
        +---> VRCHAT_* (placeholder, wired Phase 4)

  [ VB-Cable install ]--->[ CABLE Input/Output ]
  [ Voicemeeter Banana ]-->[ B1 bus => VRChat mic ]

 SIGN-IN THIS PHASE:   none (keys entered but not called yet)
 HOSTING:              localhost only
```

**Milestone:** `npm start` boots clean, UI loads, audio routing verified in Windows Sound panel.

---

## PHASE 2 — Voice Translator MVP (STT → Translate → TTS)

```
 HOW IT WORKS                           +---------------------------+
 -----------------------------          |      PHASE 2 SCOPE        |
 1. Wire mic capture in browser         +---------------------------+
 2. POST audio to /api/stt (Whisper)
 3. Translate via GPT
 4. TTS via ElevenLabs -> CABLE Input
 STEPS 4 | TOUCHES 5 | RISK med

  [ Browser Mic ]---WebAudio--->[ app.js recorder ]
           |                             |
           |                     POST /api/translate
           v                             v
  +-----------------+         +------------------------+
  |  server.js API  |<------->| OpenAI Whisper (STT)   |
  |                 |         +------------------------+
  |                 |         +------------------------+
  |                 |<------->| OpenAI GPT (translate) |
  |                 |         +------------------------+
  |                 |         +------------------------+
  |                 |<------->| ElevenLabs TTS         |
  +--------+--------+         +------------------------+
           |
           v
  [ audio out ]---->[ VB-Cable Input ]--->[ Voicemeeter B1 ]--->[ VRChat mic ]

 SIGN-IN THIS PHASE:
   * OpenAI   -> https://platform.openai.com/api-keys  (paste into .env)
   * ElevenLabs -> https://elevenlabs.io -> Profile -> API Key
 HOSTING:  still localhost (desktop app)
```

**Milestone:** Speak English → VRChat-side friend hears translated voice in target language with <3s latency.

---

## PHASE 3 — Landing Page + Tutorial on Netlify

```
 HOW IT WORKS                           +---------------------------+
 -----------------------------          |      PHASE 3 SCOPE        |
 1. Strip index/tutorial to static      +---------------------------+
 2. Add download button for desktop zip
 3. Deploy to Netlify (free tier)
 4. Hook custom subdomain
 STEPS 4 | TOUCHES 3 | RISK low

  [ /web-static/ ]
       |
       +-- landing.html  (marketing + install flow)
       +-- tutorial.html (VB-Cable, Voicemeeter, keys)
       +-- downloads/vr-bridge-desktop.zip
              |
              v
  [ Netlify static host ]
       |
       +--- netlify.toml (build=none, publish=web-static)
       +--- CDN + HTTPS
       |
       v
  [ users hit vrbridge.netlify.app ]
       |
       +---> download desktop zip
       +---> follow tutorial
       +---> get API keys (OpenAI, ElevenLabs)

 SIGN-IN THIS PHASE:
   * Netlify account (Chad)  -> https://app.netlify.com
 HOSTING:
   * Netlify static = landing + tutorial + binary drop
   * Desktop app still runs locally on user machine
```

**Milestone:** Public URL live. Users can read tutorial, download desktop zip, go.

---

## PHASE 4 — Quest Companion App (APK Build)

```
 HOW IT WORKS                           +---------------------------+
 -----------------------------          |      PHASE 4 SCOPE        |
 1. Spin up Quest companion APK         +---------------------------+
 2. BLE/WiFi bridge to desktop
 3. Mic capture on Quest (optional)
 4. Sideload via SideQuest
 STEPS 4 | TOUCHES 6 | RISK high

  [ Quest Headset ]
         |
         v
  [ VR-Bridge-Companion.apk ] (Unity or Godot XR)
         |                  \
   WiFi LAN socket           \-- on-headset mic capture
         |
         v
  [ Desktop server.js ]----same STT/Translate/TTS pipeline (Phase 2)

  Distribution paths (pick one or both):
  --------------------------------------
  A) SideQuest sideload
     [ apk drop ]---> https://sidequestvr.com ---> user sideloads
  B) Meta Horizon Store (later, needs review)
     [ Meta dev account ]---> App Lab submission
  C) VRChat world link
     [ published world ]---> in-world UI panel pings desktop over LAN

 SIGN-IN THIS PHASE:
   * Meta developer account -> https://developer.oculus.com  (enable dev mode on headset)
   * SideQuest account      -> https://sidequestvr.com
   * (Optional) VRChat creator account to publish world
 HOSTING:
   * APK hosted as Netlify download + SideQuest listing
   * No backend hosting — companion talks to user's own desktop
```

**Milestone:** Quest-side panel shows "Desktop connected". Tap-to-talk routes through desktop pipeline.

---

## PHASE 5 — Presence Bridge (Auto-Invite Bot)

```
 HOW IT WORKS                           +---------------------------+
 -----------------------------          |      PHASE 5 SCOPE        |
 1. Harden invite-bot.js                +---------------------------+
 2. Persistent VRChat session cookie
 3. Poll friends -> online detector
 4. Rate limit 1/friend/hour
 STEPS 4 | TOUCHES 4 | RISK high (ToS)

  [ invite-bot.js  (node long-runner) ]
         |
         v
  [ VRChat unofficial API ]
     login -> auth cookie -> 2FA prompt first time
         |
         v
  [ /users/{id} presence poll ] every N minutes
         |
         +-- online flip detected?
                 |
                 v
         [ /groups/{grp}/invites ] POST
                 |
                 v
         [ friend gets group invite in-game ]

  Safety rails:
  - SQLite cache of last-invite-timestamp per friend
  - Exponential backoff on 429
  - Manual kill-switch in UI

 SIGN-IN THIS PHASE:
   * VRChat account (Chad or user) with 2FA
     -> https://vrchat.com/home/login
     -> cookie saved to ~/.vrbridge/session.json
   * Group ID + friend user IDs pasted into .env
 HOSTING:
   * Still local long-running node process
   * Optional: package as Windows service via nssm
```

**Milestone:** Friend comes online → group invite hits their feed within 60s. Logs show rate-limit respected.

---

## PHASE 6 — Polish & Ship

```
 HOW IT WORKS                           +---------------------------+
 -----------------------------          |      PHASE 6 SCOPE        |
 1. Installer wrapper (pkg/Electron)    +---------------------------+
 2. Error telemetry (local log only)
 3. Updater check via Netlify manifest
 4. Public announce + docs freeze
 STEPS 4 | TOUCHES 5 | RISK low

  [ source repo ]
        |
        v
  [ build pipeline ]-------+---> desktop .exe (pkg/Electron)
        |                  +---> companion .apk (Gradle)
        |                  +---> web-static bundle
        v
  [ Netlify deploy ]
        |
        +--- /downloads/vr-bridge-setup-1.0.exe
        +--- /downloads/vr-bridge-companion-1.0.apk
        +--- /version.json  (auto-updater checks this)

  [ running desktop app ]---GET /version.json--->[ Netlify ]
        |
        +-- new version? -> prompt user to update

  Launch channels:
  - Netlify landing        (primary)
  - SideQuest listing      (Quest APK)
  - VRChat group post      (community)
  - GitHub release mirror  (backup download)

 SIGN-IN THIS PHASE:
   * GitHub (release publishing)
   * Netlify (already connected)
   * SideQuest listing owner
 HOSTING FINAL MAP:
   * Netlify: landing, tutorial, binary drops, version manifest
   * SideQuest: APK mirror for Quest users
   * User machine: desktop app + invite-bot (runs local)
   * VRChat: group + optional in-world companion panel
```

**Milestone:** 1.0.0 tagged. Installer one-click. Update checker live. Public launch post out.

---

## Phase Order Recap

```
PHASE 1  scaffold-fix         (local plumbing)
   |
   v
PHASE 2  voice translator MVP (OpenAI + ElevenLabs keys in)
   |
   v
PHASE 3  Netlify static       (landing + tutorial + downloads)
   |
   v
PHASE 4  Quest companion APK  (Meta dev + SideQuest)
   |
   v
PHASE 5  Presence Bridge      (VRChat OAuth, invite bot hardened)
   |
   v
PHASE 6  polish & ship        (installer, updater, launch)
```

Each phase ends with a GO gate before the next kicks off.
