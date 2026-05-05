# VR Bridge — Phase-by-Phase Wire Chart (Meta Quest Pivot)

Two pillars running in parallel:
1. **Voice Bridge** — STT -> translate -> TTS -> inject into VRChat mic
2. **Presence Bridge** — poll VRChat API /30s, fire group invite on offline->online flip (1/hr cooldown)

---

## PHASE 1 — Foundation & Account Setup

```
  +----------------------------+       +----------------------------+
  |  [API SIGN-IN: OpenAI]     |       |  [API SIGN-IN: ElevenLabs] |
  |  platform.openai.com       |       |  elevenlabs.io/app         |
  |  -> create key (Whisper +  |       |  -> create key (TTS voice) |
  |     GPT-4o translate)      |       |  -> pick cloned voice ID   |
  +-------------+--------------+       +-------------+--------------+
                |                                    |
                v                                    v
        +-------+------------------------------------+-------+
        |            .env (local dev secrets)                |
        |   OPENAI_KEY= / ELEVEN_KEY= / VOICE_ID=            |
        +------------------------+---------------------------+
                                 |
                                 v
  +---------------------------+  |  +---------------------------+
  | [API SIGN-IN: Meta Dev]   |  |  | [API SIGN-IN: VRChat]     |
  | developer.oculus.com      |  |  | api.vrchat.cloud          |
  | -> org + dev mode on      |  |  | -> OAuth/session cookie   |
  |    Quest headset          |  |  | -> note: unofficial API   |
  +-------------+-------------+  |  +-------------+-------------+
                \________________|________________/
                                 v
                      [ local dev workstation ]
                      Node + Python bridges wired
```

---

## PHASE 2 — Voice Bridge MVP (Desktop Companion)

```
  [ Quest mic ] --BT/USB--> [ Desktop PC ]
                                  |
                                  v
                        +---------+---------+
                        |  STT capture loop |
                        |  OpenAI Whisper   |<---[OpenAI key]
                        +---------+---------+
                                  |
                                  v
                        +---------+---------+
                        | GPT-4o translate  |<---[OpenAI key]
                        +---------+---------+
                                  |
                                  v
                        +---------+---------+
                        | ElevenLabs TTS    |<---[Eleven key]
                        +---------+---------+
                                  |
                                  v
                   [ VB-Cable virtual mic device ]
                                  |
                                  v
                   [ VRChat Desktop -> mic input ]
```
Deliverable: `voice-bridge.exe` (pkg'd Node/Python) runs on PC while Quest is in Link/AirLink.

---

## PHASE 3 — Presence Bridge Worker

```
  +---------------------------+
  | presence-worker.js        |
  | setInterval 30_000ms      |
  +-------------+-------------+
                |
                v
        +-------+--------+
        | VRChat API GET |<---[VRChat OAuth session]
        | /users/{id}    |
        +-------+--------+
                |
                v
        +-------+--------+         status != prev?
        | diff state map |---NO--> [ loop ]
        +-------+--------+
                |YES (offline -> online)
                v
        +-------+------------------+
        | cooldown gate (Map<uid,  |
        |   lastFireTs>) 1hr check |
        +-------+------------------+
                |passes
                v
        +-------+--------+
        | POST /groups/  |<---[VRChat session]
        | {gid}/invites  |
        +-------+--------+
                |
                v
         [ friend gets group invite in VRChat ]
```

---

## PHASE 4 — Landing + Tutorial Site (Netlify)

```
   [ repo ]  --git push-->  +--------------------+
                            |  Netlify build     |
                            |  static: index +   |
                            |  tutorial.html     |
                            +---------+----------+
                                      |
                                      v
                         vr-bridge.netlify.app
                           /        |        \
                          /         |         \
                    [landing]  [tutorial]  [download]
                     hero +    step-by-    voice-bridge
                     pricing   step        .exe + APK
                                install
```
Netlify holds: marketing, docs, signed download links. **No API keys in static site** — all secrets live in the user's local companion.

---

## PHASE 5 — Quest Delivery (Companion App)

```
                 THREE DELIVERY LANES
                 ====================

  Lane A: APK Sideload          Lane B: SideQuest         Lane C: VRChat World
  --------------------          -----------------         --------------------
  [ .apk built via      ]       [ submit to         ]     [ Udon world with    ]
  [ Unity XR / Godot    ]       [ sidequestvr.com   ]     [ prefab UI panel    ]
  [ packaged companion  ]       [ listing + review  ]     [ no install needed  ]
            |                             |                         |
            v                             v                         v
  [ adb install via             [ SideQuest desktop         [ user joins world,
    USB from PC ]                 app pushes to Quest ]       taps panel -> launches
            |                             |                    local companion via
            v                             v                    deep link ]
  [ Quest home -> Unknown       [ Quest home -> SideQuest
    Sources -> VR Bridge ]        -> VR Bridge ]
```
All three lanes launch the same companion logic from Phase 2+3. APK is the fastest path; SideQuest is the discovery play; VRChat world is the zero-install demo hook.

---

## PHASE 6 — Polish, Billing, Ship

```
  +------------------+    +------------------+    +------------------+
  | auth + licensing |    | usage metering   |    | public launch    |
  | (Netlify fns +   |--->| count STT mins,  |--->| Netlify prod DNS |
  |  Stripe key)     |    | TTS chars local  |    | SideQuest live   |
  +--------+---------+    +--------+---------+    +--------+---------+
           |                       |                       |
           v                       v                       v
  [Stripe sign-in]        [local SQLite log]        [vrbridge.app]
  dashboard.stripe.com    synced nightly to         marketing +
  -> webhook -> Netlify   Netlify function          download gate
     function -> license

               +----------------------------------+
               | RUNTIME LOOP (post-ship)         |
               |  Voice Bridge + Presence Bridge  |
               |  run side-by-side on companion,  |
               |  VRChat stays untouched          |
               +----------------------------------+
```

---

## API Sign-In Summary

| Service | Where | Used In |
|---|---|---|
| OpenAI | platform.openai.com | Phase 1, 2 (STT + translate) |
| ElevenLabs | elevenlabs.io | Phase 1, 2 (TTS) |
| Meta Dev | developer.oculus.com | Phase 1, 5 (APK signing) |
| VRChat | api.vrchat.cloud (unofficial) | Phase 1, 3 (presence + invites) |
| Netlify | netlify.com | Phase 4, 6 (hosting + functions) |
| Stripe | dashboard.stripe.com | Phase 6 (billing) |
| SideQuest | sidequestvr.com | Phase 5 (distribution) |

## Hosting Strategy

- **Netlify static** -> landing, tutorial, download gate, Stripe webhook function
- **Local companion (.exe)** -> holds all user API keys, runs both bridges
- **APK sideload** -> fastest Quest delivery for power users
- **SideQuest listing** -> public discovery channel
- **VRChat world prefab** -> zero-install demo, deep-links to companion
