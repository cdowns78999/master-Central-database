# VRChat Visual Design System — Research Notes

Source pulled live from `https://hello.vrchat.com/s/vrc-global.css` (the official VRC design-token stylesheet) plus the page `<head>` of `https://hello.vrchat.com/`. All hex values, font names and tokens below are copied verbatim from those sources, not invented.

---

## Palette

VRChat is a **light-surface site with a teal brand and a warm orange accent**, layered on top of dark hero photography. Dark mode swaps surfaces only; brand and accent colors are constant.

### Brand — Teal (signature color)
| Token | Hex | Usage |
|---|---|---|
| `--vrc-brand`      | `#2baac1` | Primary CTA fill, links, focus rings |
| `--vrc-brand-dark` | `#1a8fa4` | Hover, pressed states |
| `--vrc-brand-deep` | `#008389` | Underlines, deep accent slabs |
| `--vrc-brand-glow` | `#6ae3f9` | Glow halos, neon edges, particle highlights |

### Accent — Warm orange
| Token | Hex | Usage |
|---|---|---|
| `--vrc-warm`       | `#ff7f54` | Secondary CTA, alerts, "VRC+" badges |
| `--vrc-warm-dark`  | `#e97c03` | Hover for secondary CTA |
| `--vrc-warm-light` | `#ffc19c` | Soft highlights, hover wash |

### Surfaces (light mode default)
| Token | Hex |
|---|---|
| `--vrc-surface`     | `#ffffff` |
| `--vrc-surface-alt` | `#f7f7f7` |
| `--vrc-overlay`     | `rgba(255,255,255,0.92)` |

### Surfaces (dark mode — what we use for the cinematic P1)
| Token | Hex |
|---|---|
| `--vrc-surface`     | `#1f232a` (near-black blue) |
| `--vrc-surface-alt` | `#1c1f26` |
| Page bg (cinematic) | `#000000` (true black for hero) |

### Text
| Token | Light | Dark |
|---|---|---|
| `--vrc-text`           | `#111111` | `#ffffff` |
| `--vrc-text-secondary` | `#575757` | `#dadada` |
| `--vrc-text-tertiary`  | `#9c9c9c` | `#9c9c9c` |
| `--vrc-text-inverse`   | `#ffffff` | — |
| `--vrc-text-brand`     | `#2baac1` | `#2baac1` |

### Borders
- `--vrc-border` `#dadada`
- `--vrc-border-subtle` `rgba(0,0,0,0.06)` (light) / `rgba(255,255,255,0.06)` (dark)
- `--vrc-border-brand` `rgba(43,170,193,0.4)` — the teal halo around inputs/cards

---

## Typography

VRChat loads **four** font families. They use them in a clear hierarchy:

| Family | Source | Weights loaded | Where it shows up |
|---|---|---|---|
| **Poppins**   | Google Fonts | 600 italic + roman | Marketing display headlines (bold + slightly geometric) |
| **Noto Sans** | Google Fonts | 400, 700, 400i, 700i | **Body copy** — declared as `--vrc-font` in the global stylesheet |
| **Dosis**     | `assets.vrchat.com/fonts/dosis-font.css` | 400, 700 | Section eyebrows, small all-caps labels (rounded, friendly) |
| **Exo 2**     | `assets.vrchat.com/fonts/exo.css` + Google variable | 100–900 + italics, variable | UI / buttons / techy callouts (slightly futuristic, this is the "VR/sci-fi" hint) |

**Stack to use in our app:**
```
--vr-font-display: 'Poppins', 'Exo 2', system-ui, sans-serif;   /* P1 hero, page titles */
--vr-font-body:    'Noto Sans', system-ui, sans-serif;           /* paragraphs, form labels */
--vr-font-ui:      'Exo 2', 'Noto Sans', sans-serif;             /* buttons, hover card, tech */
--vr-font-eyebrow: 'Dosis', 'Noto Sans', sans-serif;             /* small uppercase eyebrows */
```

### Font-size scale (verbatim from `vrc-global.css`)
| Token | Value |
|---|---|
| `--vrc-fs-xs`      | 13px |
| `--vrc-fs-sm`      | 15px |
| `--vrc-fs-md`      | 17px (base) |
| `--vrc-fs-lg`      | 20px |
| `--vrc-fs-xl`      | 26px |
| `--vrc-fs-2xl`     | 34px |
| `--vrc-fs-display` | 52px |

Hero P1 should push past this — go ~`clamp(56px, 9vw, 140px)` for the dramatic letter-by-letter fade. VRChat's own hero treats the title at roughly that size on desktop.

### Weights
- Body: 400 / 700
- Display (Poppins): 600 (their only loaded weight — that bold-but-not-black feel)
- UI (Exo 2): full variable axis available; we use 400 for labels, 600 for buttons, 700 for hover-card title

---

## Buttons

From the VRC stylesheet token system + how the live page uses them:

- **Radius:** `--vrc-radius-xl: 30px` for primary CTAs ("Jump in now!"). Pill-style, almost capsule. Smaller secondary buttons sit at `--vrc-radius-sm: 12px`.
- **Padding:** roughly `14px 28px` for primary, `10px 18px` for secondary.
- **Border:** primary has no visible border; secondary uses `1px solid var(--vrc-border-brand)` (the teal `rgba(43,170,193,0.4)` halo).
- **Fill:** primary = `--vrc-brand` `#2baac1` with white text. Secondary = transparent with teal text + teal border.
- **Hover:** background shifts to `--vrc-brand-dark` `#1a8fa4`, plus a soft glow via the global `--vrc-glow-card` token (`inset 0 0 0 2px #2baac1, inset 0 0 20px rgba(43,170,193,0.25)`).
- **Transition:** `--vrc-transition: 0.2s ease` — short, snappy, never sluggish.

Recommended button rule for our app:
```css
.btn {
  font-family: var(--vr-font-ui);
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: var(--vr-radius-xl);
  padding: 14px 28px;
  background: var(--vr-accent);
  color: #fff;
  border: none;
  transition: background var(--vr-transition), box-shadow var(--vr-transition), transform var(--vr-transition);
}
.btn:hover {
  background: var(--vr-accent-dark);
  box-shadow: 0 0 0 2px var(--vr-accent), 0 0 24px rgba(43,170,193,0.35);
  transform: translateY(-1px);
}
```

---

## Backgrounds

VRChat's default page surface is **white**. The signature visual moments are:

1. **Cinematic hero photography** — full-bleed character / world screenshots, dark, with text overlaid.
2. **Dark sections** opt-in via `[data-section-theme="dark"]`, which flips surfaces to `#1f232a` / `#1c1f26` (near-black, slight blue cast — never pure `#000` except in the hero).
3. **Subtle teal glow halos** around feature cards (`--vrc-glow-card` inset shadow).
4. **Image-fluid effects** on the hero: VRChat actually loads `image-effect-refracted-lines.js`, `image-effect-refracted-circles.js`, `image-effect-liquid.js`, `image-effect-parallax.js`, `image-effect-film-grain.js`. That's the cosmic / refracted feel — light bending across the image.

For our app:
- **P1** = pure black `#000` background, white display text fades in from top (use Poppins 600 at huge size, very tight letter-spacing).
- **P2 onward** = dark surface `#1f232a` with an optional radial teal glow at top-left or center: `radial-gradient(circle at 30% 20%, rgba(43,170,193,0.18), transparent 60%)`. This is the cosmic motif we lean into.

---

## Layout

- Max content width: `1200px` (from Squarespace tweak `maxPageWidth: "1200px"`).
- Page padding: `3vw` desktop, `6vw` mobile (`pagePadding` tweak).
- Header height: `50px` logo, `1vw` vertical padding.
- Spacing tokens: `4 / 8 / 12 / 16 / 24 / 32 / 48 px` — clean 4px-base scale.
- Section rhythm on the live site: hero → CTA strip → 3-column feature → screenshot strip → footer. Each section is comfortably tall; not cramped. We mirror this with `min-height: 100vh` and `scroll-snap-type: y mandatory` to make the stacked-scroll feel deliberate.

Border radius vocabulary (use these everywhere — VRChat is consistent):
| Token | Px | Use |
|---|---|---|
| `--vrc-radius-xxs`  | 4   | inline tags |
| `--vrc-radius-xs`   | 8   | small chips |
| `--vrc-radius-sm`   | 12  | inputs, secondary buttons |
| `--vrc-radius-md`   | 16  | cards |
| `--vrc-radius-lg`   | 20  | hero cards (use this for the 16:9 hover travel card) |
| `--vrc-radius-xl`   | 30  | primary CTA buttons (pill) |
| `--vrc-radius-full` | 9999| circular avatars / icons |

---

## Signature Motifs

The VRChat aesthetic comes from the *combination* of:

1. **Teal-on-dark** — `#2baac1` hot teal popping off `#1f232a` near-black surface. This is THE signature color move.
2. **Soft cyan glow halos** — `#6ae3f9` glow inside cards and around buttons. Not neon-billboard bright; restrained "something is alive in this UI" glow.
3. **Warm orange counterpoint** — `#ff7f54` orange used sparingly to break the cool palette. Use this for the GO button on P8 so it pops as the action moment.
4. **Pill-shaped primary CTAs** — `border-radius: 30px`, generous horizontal padding, one short verb-led phrase ("Jump in now!", "Submit", "Send my song").
5. **Tight, light typography pairing** — display sans (Poppins 600) for big moments, humanist sans (Noto Sans) for body. Eyebrows in Dosis caps. Buttons in Exo 2 for the technical/sci-fi hint.
6. **Refracted-light image effects on hero photography** — bending lines/circles, liquid distortion, film grain. We can't easily replicate the WebGL effects, but we mimic the *feel* with: a slow-drifting radial teal gradient + a subtle film-grain `repeating-linear-gradient` overlay.
7. **Restrained shadows, never heavy** — `0 2px 8px rgba(0,0,0,0.08)` on cards, never the chunky drop-shadows of consumer SaaS sites.

---

## Implementation Notes

For our `style.css` :root, map the VRC tokens onto our `--vr-` prefix so the rest of the team has clean, short names:

```
--vr-bg          : #000000          (P1) and #0c0e12 (deeper than VRC's surface) for ambient page bg
--vr-surface     : #1f232a          (cards, P2-P9 section backgrounds when used)
--vr-surface-alt : #1c1f26
--vr-text        : #ffffff
--vr-text-muted  : #9c9c9c
--vr-text-soft   : #dadada
--vr-accent      : #2baac1          (teal — primary action, links, focus)
--vr-accent-dark : #1a8fa4
--vr-accent-deep : #008389
--vr-accent-glow : #6ae3f9          (used in 0/15/35% alphas for glow shadows)
--vr-warm        : #ff7f54          (orange — reserved for the P8 GO button + receipt accent)
--vr-warm-dark   : #e97c03
--vr-border      : rgba(255,255,255,0.10)
--vr-border-brand: rgba(43,170,193,0.4)
--vr-radius-card : 20px
--vr-radius-pill : 30px
--vr-shadow-card : 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)
--vr-glow-teal   : 0 0 24px rgba(43,170,193,0.35)
--vr-transition  : 0.2s ease
```

### Other agents — read this before styling your section
- **Always** use the tokens above. Never hardcode hex colors.
- **Headings** = Poppins 600. **Body** = Noto Sans 400/700. **Buttons** = Exo 2 600. **Eyebrows** = Dosis 700 uppercase, letter-spacing ~0.12em.
- **Primary action buttons:** teal fill, white text, 30px radius, hover → darker teal + teal glow.
- **Secondary buttons:** transparent, 1px teal-alpha border, teal text.
- **Cards:** `--vr-surface` background, 20px radius, `--vr-shadow-card`, optional teal inner glow `--vr-glow-card` for emphasized state.
- **Inputs:** `--vr-surface-alt` bg, 12px radius, 1px `--vr-border` border. On focus: border becomes `--vr-accent`, plus `0 0 0 3px rgba(43,170,193,0.25)` outer ring.
- **Spacing:** stick to 4 / 8 / 12 / 16 / 24 / 32 / 48 — VRChat is consistent and the design feels calmer for it.
- **The hover travel card (16:9, upper-right after P2 submit):** use `--vr-radius-card` (20px), `--vr-surface` bg, `--vr-shadow-card` + `--vr-glow-teal`, position fixed, top-right with ~24px offset, width ~360px, aspect-ratio 16/9. A3 owns the full styling.
- **No emojis in UI text.** VRChat doesn't use them on the marketing site. Keep copy tight.
- **P1 is the only true-black moment.** Every other section sits on `--vr-bg` with optional `--vr-surface` cards on top.
