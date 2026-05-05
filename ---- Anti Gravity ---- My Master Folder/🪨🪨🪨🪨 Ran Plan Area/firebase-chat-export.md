# Firebase Push Notifications — Chat Export
**Date:** 2026-03-31
**Purpose:** Load this into the other chat to finish deployment to thennow-homebase on Netlify

---

## What Was Built

Firebase Cloud Messaging (FCM) push notification system integrated into the Wing Dashboard.

**Architecture:**
```
Wing Dashboard (index.html)
  → 🔔 button on client journey card
  → fetch POST to localhost:3005/push/send
  → push-server.py reads token from data/clients/{slug}.json
  → Firebase Admin SDK fires notification
  → FCM → Client's Netlify homebase (HTTPS)
  → firebase-messaging-sw.js displays notification
  → Client taps → homebase opens
```

---

## Firebase Project — LIVE CREDENTIALS

| Field | Value |
|-------|-------|
| Project Name | Wings Dashboard |
| Project ID | `wing-dashboard-144b6` |
| apiKey | `AIzaSyDzTDqFPliPCvzH3VSJY8l8hXQYbPOYNY8` |
| authDomain | `wing-dashboard-144b6.firebaseapp.com` |
| storageBucket | `wing-dashboard-144b6.firebasestorage.app` |
| messagingSenderId | `777099944328` |
| appId | `1:777099944328:web:b75b68b1a85453f3929a3d` |
| measurementId | `G-119LVYF4JS` |
| VAPID Key | `BMPG8WqWauPnWIHhtS02psRnVuVIjlYbMbG8KqLeoDLObt-hbA_-BHqSLNOxbN7Azd7SOnThrvqf7JsVfWuFNOg` |
| Service Account JSON | `ADMIN/tools/firebase-service-account.json` ✅ in place |

---

## Files Created / Modified

**Root:** `--wingdashapp--1--` at:
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\workspot1\--wingdashapp--1--`

| File | Status |
|------|--------|
| `ADMIN/tools/push-server.py` | ✅ Created — port 3005, Firebase Admin SDK, /push/send endpoint |
| `ADMIN/tools/firebase-config.json` | ✅ Created + all real values filled in including VAPID key |
| `ADMIN/tools/firebase-service-account.json` | ✅ Downloaded from Firebase + copied here |
| `ADMIN/homebases/thennow/firebase-messaging-sw.js` | ✅ Created — background notification handler |
| `ADMIN/homebases/thennow/index.html` | ✅ Modified — Firebase SDK injected, VAPID key filled, 🔔 Enable Notifications button added |
| `data/clients/_template.json` | ✅ Modified — push block added to communication |
| `data/clients/thennow.json` | ✅ Modified — push block added |
| `ADMIN/homebases/thennow/.netlify/netlify.toml` | ✅ Modified — SW headers for Netlify |
| `index.html` (root dashboard) | ✅ Modified — sendPushNotification() JS + 🔔 button on client cards |

---

## What's Done (Steps 1–6 Complete)

- [x] Step 1 — Firebase project created ("Wings Dashboard")
- [x] Step 2 — Web app registered, firebaseConfig captured
- [x] Step 3 — VAPID key generated + injected into files
- [x] Step 4 — Service account JSON downloaded + placed
- [x] Step 5 — firebase-config.json fully populated
- [x] Step 6 — All placeholders replaced in homebase files

---

## What's LEFT (Step 7 — Pick up here)

**Deploy to Netlify thennow-homebase**

Chad already has a live Netlify app: `https://app.netlify.com/projects/thennow-homebase/overview`

The homebase files that need to be deployed are at:
`ADMIN/homebases/thennow/`

Two options:
1. **CLI deploy** (run from the `--wingdashapp--1--` root):
```bash
netlify deploy --prod --dir="ADMIN/homebases/thennow" --site=thennow-homebase
```

2. **Drag & drop** — go to `https://app.netlify.com/projects/thennow-homebase/overview` → drag the `thennow` folder onto the deploy zone

---

## After Deploy — Final Verification

1. Start push server: `python ADMIN/tools/push-server.py` → confirm listening on port 3005
2. Open thennow homebase in browser → click 🔔 "Enable Notifications" → allow permission → check console for FCM token
3. Verify token saved to `data/clients/thennow.json` under `communication.push.token`
4. Go to Wing Dashboard → open client journey card for THENNOW → click 🔔 "Send Push"
5. Client browser shows native notification → tap → homebase opens
6. Check `data/feeds/sent-log-push.json` for logged entry

---

## Prompt to paste into the other chat

> I was setting up Firebase push notifications for my Wing Dashboard. All credentials are filled in, all files are built. The only thing left is deploying the updated homebase to my existing Netlify app called `thennow-homebase` (https://app.netlify.com/projects/thennow-homebase/overview). The homebase files are at `ADMIN/homebases/thennow/` inside the `--wingdashapp--1--` Wing Dashboard root at `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\workspot1\--wingdashapp--1--`. Can you deploy those files to thennow-homebase on Netlify and then start push-server.py on port 3005?
