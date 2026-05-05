# vr-job1-merged · section-map.md

Maps each old folder feature → new p1...p6 module in `vr-job1-merged/sections/`.
Single canonical row per module: source files/sections, responsibilities, dependencies, test fixtures.

---

## Modules → sources table

| Module | Source file / section | Responsibilities | Dependencies | Test fixtures needed |
|---|---|---|---|---|
| **p1 receipt** | `vr-artist-onboarding/index.html` lines ~50-310 (receipt-card markup) + scout-payload script block; `VR-Final-Label/p1.css` (sepia/stamp styling extracted) | Render scout-discovery proof: scout name, source platform (VRChat / TikTok / IG), acceptance ratio "1 in 200", found-on date, receipt-stamp graphic. Resolve `?scout=<token>` from URL into receipt fields via GET `/api/receipt/:scoutToken`. Persist receipt blob to `localStorage["vrj1.receipt"]`. | `assets/css/design-tokens.css` (color, font-stamp, sepia surface), `assets/js/persistence.js`, `server/routes/receipt.js`, `assets/img/receipt-bg.svg`, Dosis font for stamp | `fixtures/receipt/scout-aria-vrchat.json` (scout=Aria, platform=VRChat, ratio="<1 in 200"), `fixtures/receipt/scout-missing-token.json` (graceful empty-state), `fixtures/receipt/scout-tiktok-long-name.json` (overflow truncation test) |
| **p2 9-step** | `vr-artist-onboarding/index.html` lines ~315-1180 (step-spine + How-It-Works modal); `vr-onboarding-v2/redesign-plan.md` step-rail spec | Render the 9-step journey explainer: Discovery → Outreach → Receipt → Song → Deal → Vocal → Mix → Distribute → Revenue. Active-step scroll-spy via IntersectionObserver. "How It Works" modal toggle. Step-card flip animation on hover. | `assets/css/design-tokens.css` (motion curves, surface elevation), `assets/js/pill-nav.js` (scroll-spy hook), `assets/img/pill-icons.svg`, Poppins font | `fixtures/9step/copy-default.json` (canonical 9 step copy), `fixtures/9step/scroll-spy-trace.json` (expected active-step at scroll positions 0, 25%, 50%, 75%, 100%), `fixtures/9step/modal-snapshot.html` (How-It-Works content) |
| **p3 song picker** | `vr-artist-onboarding/index.html` lines ~1185-1620 (platform tabs + URL validators); regex blocks for YouTube/Spotify/Apple/SoundCloud | Tabbed platform picker (4 platforms). URL paste + validate via per-platform regex. On valid URL, fetch oEmbed-style preview card (thumbnail, title, duration). Save submission via POST `/api/song`, store result in `localStorage["vrj1.song"]`. Unlock p4 pill on success. | `server/routes/song.js`, `server/lib/validators.js`, `assets/js/persistence.js`, `assets/css/design-tokens.css` (input focus-ring, tab pill) | `fixtures/song/yt-valid.json` (https://youtu.be/dQw4w9WgXcQ), `fixtures/song/spotify-valid.json` (open.spotify.com track URL), `fixtures/song/apple-valid.json`, `fixtures/song/soundcloud-valid.json`, `fixtures/song/yt-invalid-typo.json` (validation rejection), `fixtures/song/oembed-mock-yt.json` (preview-card mock response) |
| **p4 deal** | `vr-artist-onboarding/index.html` lines ~1625-1980 (deal card + payout form); 50/50 split copy + 15th-of-month auto-payout explainer | Render deal terms (50/50 split), payout method radio (PayPal email OR bank routing/account), 15th-of-month explainer. Validate payout form. On Accept: build signed-deal blob, POST `/api/deal`, fire SendGrid confirmation email, store in `localStorage["vrj1.deal"]`. Unlock p5. | `server/routes/deal.js`, `server/lib/validators.js`, `server/lib/mailer.js` (SendGrid template `deal-confirmation`), `assets/css/design-tokens.css` (accent CTA + deal-card glass), `assets/img/deal-flourish.svg` | `fixtures/deal/paypal-valid.json` (paypal email path), `fixtures/deal/bank-valid.json` (routing+account path), `fixtures/deal/paypal-bad-email.json` (validation rejection), `fixtures/deal/signed-blob-canonical.json` (expected POST body), `fixtures/deal/sendgrid-mock-response.json` |
| **p5 cinematic bridge** | `VR-Final-Label/p1.html` (cinematic markup) + `VR-Final-Label/p1.css` (full-bleed gradient + fade-in keyframes) + `VR-Final-Label/p1.js` (IntersectionObserver fade trigger) | Full-bleed cinematic moment between onboarding and Final-Label: dark stage backdrop, slow-zoom bg, Exo 2 fade-in headline "we heard you sing. let's put it on Spotify.", continue button. Trigger sequence on intersection. Continue button posts to `/api/handoff`. | `assets/css/design-tokens.css` (--ease-cinema, --dur-cinema, --color-surface-overlay), `assets/img/cinematic-stage.webp`, Exo 2 font, `server/routes/handoff.js` | `fixtures/bridge/intersection-trigger.json` (mocked IO entry events), `fixtures/bridge/headline-copy.txt` (canonical typography string), `fixtures/bridge/reduced-motion-snapshot.html` (no-animation render check) |
| **p6 Final-Label handoff** | NEW glue layer (no direct source) + reads `VR-Final-Label/` artist-form contract for the deep-link target shape | Render handoff confirmation: minted artist UUID (mono font), copy-to-clipboard, "Open Final Label" pill button that deep-links into the downstream Final-Label app `/p2-form?artist=<uuid>`. Clear onboarding `localStorage` on click (handoff complete). | `server/routes/handoff.js` (UUID mint + deep-link builder), `assets/js/persistence.js` (clear-on-handoff), `assets/css/design-tokens.css` (link-pill, success badge), JetBrains Mono font for UUID display | `fixtures/handoff/uuid-mint-response.json` (`{artistId, deepLink, expiresAt}`), `fixtures/handoff/deep-link-canonical.txt` (expected URL shape), `fixtures/handoff/clear-storage-trace.json` (which keys must be wiped) |

---

## Cross-cutting dependencies (shared by all 6 modules)

- `assets/css/design-tokens.css` — every module imports first
- `assets/css/base.css` — reset + body defaults
- `assets/css/pill-nav.css` + `assets/js/pill-nav.js` — locks/unlocks pills as each module satisfies completion
- `assets/js/persistence.js` — namespaced localStorage helpers (`vrj1.*` keys)
- `assets/js/analytics.js` — section-view + completion ping
- `server/middleware/cors.js` + `server/middleware/rate-limit.js` — wrap all `/api/*` routes

## Source folders consumed (summary)

- **vr-artist-onboarding/** — body content for p1, p2, p3, p4 (lifted from monolithic 2120-line index.html, split by section)
- **vr-onboarding-v2/** — pill-nav scroll architecture, step-rail spec, scroll-snap rules (drives shared `assets/`)
- **VR-Final-Label/** — p1 cinematic re-themed → p5; design-token research → `design-tokens.css`; modular `pN.css`/`pN.js` file pattern adopted for sections/

## Source folders NOT consumed by Job 1

- **VR-Final-Label/p2 onward** stays in the downstream Final-Label app — Job 1's p6 only hands off to it
- Avatar webhook (Pollinations.ai → Gemini → Three.js GLB) is **deferred** to optional p2.5 in a later phase
