# vr-job1-merged/ — ARCHITECTURE

End-to-end VR Artist Onboarding + Final Label pipeline.
Modular section pattern (p1...p6) inherited from VR-Final-Label, pill-nav scroll spine inherited from vr-onboarding-v2, production HTML body inherited from vr-artist-onboarding.

---

## Top-level file tree

```
vr-job1-merged/
├── index.html                          # Single-page shell. Loads tokens, mounts <section> hosts for p1-p6, wires pill-nav + scroll-snap
├── README.md                           # Build notes, run-locally steps, env vars expected by server/
├── package.json                        # node deps for server/ (express, multer, dotenv, @sendgrid/mail) + npm scripts
├── .env.example                        # SENDGRID_API_KEY, S3_BUCKET, ARTIST_DB_URL, DISTROKID_WEBHOOK, PAYPAL_CLIENT_ID
├── .gitignore                          # node_modules, .env, uploads/, *.log, .DS_Store
│
├── sections/                           # Per-stage modules — one folder per pill in the nav
│   ├── p1-receipt/
│   │   ├── p1.html                     # Receipt card markup: scout name, source platform, acceptance ratio, found-on date
│   │   ├── p1.css                      # Receipt-specific styling: stamp graphic, perforation edge, sepia tone overlay
│   │   └── p1.js                       # Reads scout payload from URL params or localStorage, renders receipt fields
│   │
│   ├── p2-nine-step/
│   │   ├── p2.html                     # 9-step spine: Discovery→Outreach→Receipt→Song→Deal→Vocal→Mix→Distribute→Revenue
│   │   ├── p2.css                      # Vertical step-rail with progress dots, active-step glow, step-card flip animation
│   │   └── p2.js                       # Scroll-spy active step highlighting, "How It Works" modal toggle, step persistence
│   │
│   ├── p3-song-picker/
│   │   ├── p3.html                     # Platform tabs (YouTube/Spotify/Apple/SoundCloud), URL input, paste button, preview card
│   │   ├── p3.css                      # Tab pill styling, input glow on focus, validation states (red/green border)
│   │   └── p3.js                       # URL regex validators per platform, oEmbed-style preview fetch, localStorage save on valid
│   │
│   ├── p4-deal/
│   │   ├── p4.html                     # 50/50 split card, payout method radio (PayPal/Bank), 15th-of-month explainer, Accept button
│   │   ├── p4.css                      # Deal-card glassmorphism, accept-button pulse, signature-line styling
│   │   └── p4.js                       # Form validation (PayPal email or bank routing), Accept→writes signed-deal blob to localStorage
│   │
│   ├── p5-cinematic-bridge/
│   │   ├── p5.html                     # Full-bleed cinematic: "we heard you sing. let's put it on Spotify." + continue button
│   │   ├── p5.css                      # Full-viewport gradient bg, fade-in lyrics typography, slow zoom on bg image
│   │   └── p5.js                       # IntersectionObserver triggers fade sequence, continue → POST /handoff → redirect to Final-Label
│   │
│   └── p6-final-label-handoff/
│       ├── p6.html                     # Handoff confirmation: artist ID issued, secure link to Final-Label, "Open Final Label" CTA
│       ├── p6.css                      # Confirmation badge, copy-to-clipboard styling for artist ID, link-pill button
│       └── p6.js                       # Reads handoff response, renders artist UUID, deep-link builder for Final-Label app
│
├── server/                             # Express backend — keeps API keys off browser, brokers form submits + uploads
│   ├── server.js                       # Entry point: app.listen(3000), mounts /api routes, serves /sections statically
│   ├── routes/
│   │   ├── receipt.js                  # GET /api/receipt/:scoutToken — resolves scout payload from token, returns receipt JSON
│   │   ├── song.js                     # POST /api/song — validates URL, calls oEmbed, stores submission, returns preview meta
│   │   ├── deal.js                     # POST /api/deal — accepts signed deal blob, persists to artist record, emails copy
│   │   ├── handoff.js                  # POST /api/handoff — mints artist UUID, returns Final-Label deep-link URL
│   │   └── upload.js                   # POST /api/upload — multer-handled vocal WAV ingestion, S3 put, returns asset URL
│   ├── lib/
│   │   ├── validators.js               # URL regex per platform, PayPal/bank format checks, deal-blob schema guard
│   │   ├── artist-db.js                # CRUD wrapper around ARTIST_DB_URL (Postgres or Airtable), upsert by email
│   │   └── mailer.js                   # SendGrid wrapper: deal-confirmation template, handoff template
│   └── middleware/
│       ├── cors.js                     # Locked-down CORS — allows only the deployed origin + localhost dev port
│       └── rate-limit.js               # Per-IP rate limit on /api/song + /api/upload to deter abuse
│
└── assets/                             # Shared static files — referenced by ALL p1-p6 sections
    ├── css/
    │   ├── design-tokens.css           # :root variables — VRChat palette, fonts, spacing, motion curves (Phase 1 deliverable)
    │   ├── base.css                    # Reset, body defaults, link/button base, focus-visible outlines
    │   └── pill-nav.css                # Sticky top pill-nav: 6 pills (P1...P6), active-state, scroll-jump, mobile drawer
    ├── js/
    │   ├── pill-nav.js                 # Scroll-snap orchestration, active-pill update on intersection, anchor smooth-scroll
    │   ├── persistence.js              # localStorage helpers: namespaced get/set, schema versioning, clear-on-handoff
    │   └── analytics.js                # Lightweight section-view + completion ping (no PII), batched on visibilitychange
    ├── fonts/
    │   ├── poppins/                    # Self-hosted Poppins woff2 files (regular, 600, 700)
    │   ├── noto-sans/                  # Self-hosted Noto Sans woff2 (regular, 500, 700)
    │   ├── dosis/                      # Self-hosted Dosis woff2 (500, 700) — used for receipt stamp
    │   └── exo-2/                      # Self-hosted Exo 2 woff2 (400, 600, 800) — used for cinematic bridge headline
    └── img/
        ├── receipt-bg.svg              # Sepia paper texture for p1 receipt card
        ├── cinematic-stage.webp        # Full-bleed dark stage backdrop for p5 bridge
        ├── deal-flourish.svg           # Decorative corner ornament for p4 deal card
        └── pill-icons.svg              # Sprite — 6 icons for pill-nav (one per stage)
```

---

## p1-p6 modules → user flow stages

| Module | Stage in user flow | Triggers |
|---|---|---|
| **p1 receipt** | Maya opens onboarding URL, sees scout-discovery proof | URL param `?scout=<token>` resolves into receipt fields |
| **p2 9-step** | Maya scrolls through "what's about to happen" explainer | Scroll into view; sticky pill highlights as she reads |
| **p3 song picker** | Maya pastes Spotify/YouTube URL of cover she wants to record | URL validates → preview card → save → next pill unlocks |
| **p4 deal** | Maya reviews 50/50 split + 15th payout, picks PayPal/Bank, hits Accept | Accept writes signed deal blob → mailer fires → next pill unlocks |
| **p5 cinematic bridge** | Full-bleed "we heard you sing" moment between onboarding close and Final-Label entry | All prior pills complete → bridge plays → continue triggers handoff |
| **p6 Final-Label handoff** | Artist UUID minted, deep-link to Final-Label app rendered | POST /api/handoff returns UUID → user clicks "Open Final Label" → exits onboarding |

The pill-nav at top renders ALL 6 pills always visible — locked until prior step satisfied (greyed pill, no jump). Active pill = current scroll-snap section.

---

## Source-folder mapping (high-level — full table in section-map.md)

- `vr-artist-onboarding/index.html` (2120 lines) → carved into p1.html, p2.html, p3.html, p4.html
- `vr-onboarding-v2/redesign-plan.md` → drives `assets/css/pill-nav.css` + `assets/js/pill-nav.js` + scroll-snap rules in base.css
- `VR-Final-Label/p1.css + p1.js` → re-themed and slotted as `sections/p5-cinematic-bridge/`
- `VR-Final-Label/p2.html + p2.js` (artist info form, vocal upload) → REMAINS in downstream Final-Label app — p6 just hands off to it
- `VR-Final-Label/design-token research` → consumed entirely into `assets/css/design-tokens.css` (Phase 1 deliverable)
