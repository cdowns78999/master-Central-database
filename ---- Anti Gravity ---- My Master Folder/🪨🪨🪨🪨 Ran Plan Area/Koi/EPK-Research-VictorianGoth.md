# EPK Research — Victorian Goth / Opera Aesthetic

*Academic-grade research pass. Current date: April 13, 2026.*
*Aesthetic target: Phantom of the Opera meets modern WebGL/CSS art. Candlelight, filigree, blood-velvet, bruised amber — rendered with 2026 browser power.*

---

## 0. Executive POV — What's Tired vs. What's Wired

**TIRED (do not ship this).**
- Full-bleed black hero with centered serif name + a single paragraph bio. Every boring artist site since 2015.
- "Hero video of artist staring at camera in fog" without any interactive layer.
- Framer Motion page fades between routes.
- Spotify iframe slapped in the middle of the page.
- Cursor-follower dot. Stop. It's a decade old.
- Linear-gradient backgrounds pretending to be moody.
- Coming-soon countdown timer with generic serif numerals.

**WIRED (the 2026 move).**
- **CSS-native scroll-driven animations** (`animation-timeline: view()`) replacing 80% of what GSAP used to do — no JS to hydrate, no jank. GSAP is saved for choreographed set-pieces and pin/scrub timelines. ([MDN: scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines))
- **Cross-document View Transitions** for MPA — the artist site feels like a single cinematic morph between pages (album cover morphs into full album page). ([Chrome Developers](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document))
- **WebGL shader heroes** (Unicorn Studio / raw GLSL) doing portrait displacement, noise-driven candle flicker, ink-bleed reveal. ([Codrops WebGL for Designers, Mar 2026](https://tympanus.net/codrops/2026/03/04/webgl-for-designers-creating-interactive-shader-driven-graphics-directly-in-the-browser/))
- **SVG `feTurbulence` grain** as a site-wide overlay layer at 6–10% opacity — gives everything that wet-collodion plate feel. ([CSS-Tricks: Grainy Gradients](https://css-tricks.com/grainy-gradients/))
- **Motion One** replacing Framer Motion for state-driven UI (2.5–6x faster), with GSAP reserved for timeline cinematics. ([GSAP vs Motion](https://motion.dev/docs/gsap-vs-motion))
- **Variable font `wght`/`GRAD`/`wdth` axes animated on hover** — letters breathe, no layout shift. ([Fontfabric 2026 trends](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/))
- **Dither + bloom + CRT scanline** passes for a "haunted daguerreotype" pass over photos. ([Codrops: Efecto, Jan 2026](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/))

---

## 1. Top 10 Techniques That Make a Victorian-Goth EPK Pop

### 1. Scroll-Driven Animations via CSS `animation-timeline` (zero-JS parallax)
Browser-native, 60fps, no Lenis needed for simple reveals. Reserve Lenis+GSAP for the hero cinematic.

```css
@keyframes unveil {
  from { opacity: 0; filter: blur(20px) sepia(1); transform: translateY(40px); }
  to   { opacity: 1; filter: blur(0)   sepia(0); transform: translateY(0); }
}
.verse {
  animation: unveil linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 40%;
}
```
[MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines) · [Codrops sticky grid scroll, Mar 2026](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)

### 2. Cross-Document View Transitions (album cover → album page morph)
Tag the album cover on `/music` and the hero image on `/music/album-of-night`:

```css
@view-transition { navigation: auto; }
.album-cover { view-transition-name: night-cover; }
```
The browser interpolates position, size, transform between documents. Feels like a theatre curtain lifting. ([DebugBear guide](https://www.debugbear.com/blog/view-transitions-spa-without-framework))

### 3. SVG `feTurbulence` Film-Grain Overlay (site-wide)
The single highest return-on-effort goth move. Apply once as a fixed pseudo-element.

```html
<svg style="display:none">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"/>
  </filter>
</svg>
```
```css
body::after {
  content:""; position:fixed; inset:0; pointer-events:none; z-index:9999;
  filter: url(#grain); mix-blend-mode: overlay; opacity: .12;
}
@media (prefers-reduced-motion: no-preference) {
  body::after { animation: jitter .12s steps(3) infinite; }
}
@keyframes jitter {
  to { transform: translate(-1px, 1px); }
}
```
([CSS-Tricks: Grainy Gradients](https://css-tricks.com/grainy-gradients/) · [fffuel nnnoise generator](https://www.fffuel.co/nnnoise/))

### 4. Conic-Gradient + Mask Ornate Frames (filigree without SVG assets)
Build Victorian cartouches in pure CSS. `conic-gradient` sweeps the glow, `mask-image` carves the shape, `@property` lets you animate the angle.

```css
@property --spin { syntax: '<angle>'; inherits: false; initial-value: 0deg; }

.cartouche {
  background:
    conic-gradient(from var(--spin),
      #3a1a0f 0deg, #d4a24c 45deg, #7a1a1a 90deg, #3a1a0f 180deg,
      #d4a24c 270deg, #3a1a0f 360deg);
  -webkit-mask: radial-gradient(ellipse 60% 40% at center, #000 60%, transparent 62%);
          mask: radial-gradient(ellipse 60% 40% at center, #000 60%, transparent 62%);
  animation: drift 18s linear infinite;
}
@keyframes drift { to { --spin: 360deg; } }
```
([CSS conic + mask combinations](https://devtoolbox.dedyn.io/blog/css-gradients-complete-guide))

### 5. Variable-Font Hover on Display Type (Cinzel VF / Cormorant VF)
The letter swells and condenses mid-breath. No layout shift because `font-variation-settings` animates smoothly.

```css
.name {
  font-family: "Cormorant", serif;
  font-variation-settings: "wght" 400, "wdth" 100;
  transition: font-variation-settings .8s cubic-bezier(.2,.9,.2,1);
}
.name:hover {
  font-variation-settings: "wght" 700, "wdth" 115;
}
```
Pair with `text-wrap: balance` on headlines so no orphan line ever breaks the ornate composition. ([Fontfabric 2026 trends](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/))

### 6. WebGL Displacement on Portraits (ghost-in-the-silver)
A single Three.js plane with a noise-displaced ShaderMaterial. Cursor distance drives the displacement; the artist's face ripples like it's behind old glass.

Libraries to grab: **VFX-JS** (Codrops, one-liner WebGL), **Unicorn Studio** (no-code shader hero), or plain **React-Three-Fiber + Drei**. ([Codrops: Animating Letters with Shaders](https://tympanus.net/codrops/2025/03/24/animating-letters-with-shaders-interactive-text-effect-with-three-js-glsl/) · [Codrops: Shader Reveal with R3F](https://tympanus.net/codrops/2024/12/02/how-to-code-a-shader-based-reveal-effect-with-react-three-fiber-glsl/))

### 7. Dither + Bloom Pass on Hero Photography
Run the artist's press photo through real-time ordered-dithering in a fragment shader, then add a selective bloom. Effect: haunted-tintype. Massively differentiates from the sea of cinematic-color-graded video heroes.

Reference implementation: [Efecto on Codrops (Jan 2026)](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/) · [Maxime Heckel: The Art of Dithering](https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web/)

### 8. `color-mix()` + OKLCH Palette Tokens (one-line mood swap)
The whole site runs on six tokens. `color-mix()` derives tints/shades in perceptual space. Midnight → candlelight mode is a single variable flip.

```css
:root {
  --ink:     oklch(12% 0.02 30);
  --velvet:  oklch(22% 0.12 15);
  --blood:   oklch(35% 0.17 20);
  --candle:  oklch(78% 0.14 75);
  --gilt:    oklch(70% 0.12 85);
  --bruise:  oklch(28% 0.10 305);

  --hairline: color-mix(in oklch, var(--gilt) 40%, transparent);
  --velvet-hover: color-mix(in oklch, var(--velvet), var(--blood) 30%);
}
```
([State of CSS 2026](https://www.codercops.com/blog/state-of-css-2026))

### 9. `backdrop-filter` Stained-Glass Panels
Tour dates and bio cards as frosted-amber glass floating over a fog-particle layer. Uses `backdrop-filter: blur(14px) saturate(1.3) sepia(.15)` plus a soft conic-gradient "lead-came" border.

```css
.pane {
  background: color-mix(in oklch, var(--velvet) 40%, transparent);
  backdrop-filter: blur(14px) saturate(1.3) sepia(.2) contrast(1.1);
  border: 1px solid var(--hairline);
  box-shadow:
    inset 0 0 40px rgb(0 0 0 / .6),
    0 30px 80px -20px rgb(0 0 0 / .8);
}
```

### 10. `@scope` Component Isolation + Anchor Positioning for Floating Labels
Pin footnote-style asides ("Paris, 1897. Lithograph, 12×18cm.") to elements with **CSS Anchor Positioning** — no JS, no Popper. Wrap each section with `@scope` so stylistic flourishes don't leak. Both shipped across Chromium and landed in Firefox stable during 2025. ([State of CSS 2026](https://www.codercops.com/blog/state-of-css-2026) · [CSS @scope guide](https://devtoolbox.dedyn.io/blog/css-scope-complete-guide))

```css
.portrait { anchor-name: --portrait-1; }
.caption  { position: absolute;
            position-anchor: --portrait-1;
            top: anchor(bottom); left: anchor(right);
            position-try-fallbacks: flip-block, flip-inline; }
```

---

## 2. Five Hero Section Concepts (favorite first)

### ⭐ Hero 1 — "Candlelit Cursor" (my pick)
A single CSS `radial-gradient` mask follows the cursor, revealing a hidden press photo beneath a pitch-black plate. A WebGL flame sprite (SmokeGL-style GLSL) rides the same coordinates, its flicker driven by Perlin noise. On idle, flame snuffs to an ember; on `prefers-reduced-motion`, it's a static sconce.

- **Stack:** CSS `mask-image: radial-gradient(...)` tied to `--mx/--my` custom props, pointermove listener, Three.js plane for flame. ([SmokeGL reference](https://github.com/LucaAngioloni/SmokeGL) · [Codrops interactive WebGL hover](https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/))
- **Payoff:** First interaction is discovery — users *light* the artist into being.

### Hero 2 — "The Proscenium"
Split-screen curtains (heavy velvet, `background-image: url(velvet.webp)` with `filter: brightness(.3) contrast(1.4)`) part on scroll via scroll-driven animation, revealing a Spline 3D stage with a single floating microphone. `view-timeline` on the curtain elements, GSAP only for the mic's subtle sway.

### Hero 3 — "Letter from the Artist"
Hero is a handwritten letter (SVG path with **GSAP DrawSVG** or pure `stroke-dasharray`) inking itself across parchment — Perlin-distorted parchment texture, ink bleed shader at each letter termination. Artist's name reveals last, with the variable-font `wght` axis blooming from 200 to 700.

- **Stack:** SVG stroke-dash + `feTurbulence` distortion filter + a single GLSL ink-bleed pass on the final name.

### Hero 4 — "The Séance Table"
A static tableau seen from above: tarot cards, absinthe glass, sheet music. Each object is a pin that reveals a pillar of the EPK (music, bio, tour, press). On click/hover, the object lifts and a spotlight beam (conic-gradient + `mix-blend-mode: screen`) locks onto it while the rest desaturates. Anchor positioning pins the label beside the object.

### Hero 5 — "Nocturne Reel"
A silent WebGL-distorted film loop of the artist at half-speed, run through a real-time ASCII/dither pass ([Efecto-style](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/)). Scroll scrubs through the reel frame by frame — it's cinema-as-scroll-timeline. Audio is off until the user clicks a brass "pull-chain" toggle.

---

## 3. Typography Pairings

All available free on Google Fonts unless noted. **Variable-font versions preferred** so we can animate axes on hover.

### Primary Display (headlines / artist name)
- **Cormorant / Cormorant Garamond / Cormorant SC (VF)** — the goth-opera workhorse. Thin high-contrast serifs. Use weight 300 at massive size for that Phantom playbill poster vibe.
- **Cinzel + Cinzel Decorative** — Roman-inscription proportions with flourished caps. Pair Decorative for one-letter drop-caps only.
- **UnifrakturCook / UnifrakturMaguntia** — true blackletter for the logotype or section markers. Tip: never set body in blackletter; use it as a wordmark or initial only.
- **Italiana** — ultra-thin didone. Like a Vogue cover from 1901. Gorgeous for tour dates.
- **Pirata One** — blackletter with sharper attack. Better for metal-adjacent goth than a lounge-opera goth.
- **IM Fell English / IM Fell DW Pica** — scanned 17th-century type, already includes ink-bleed imperfections. Feels like grimoire.
- **Abril Fatface** — if you want something heavier than Cormorant but still elegant. Big album-title energy.

**[Paid — worth it]**
- **Canela (Commercial Type)** — the serious money move. Used by Ethel Cain-adjacent editorial sites.
- **Financier Display (Commercial Type)** — sharp, theatrical, infinite hairlines.
- **Ogg (Sharp Type)** — brush-drawn calligraphic serif, very Lana / gothic editorial.

### Body / Running Text
- **EB Garamond (VF)** — classical, extraordinarily readable at long length. The correct body choice 9 times out of 10.
- **Cormorant Upright** — if you want continuity with the display face.
- **Libre Caslon Text** — warmer, more novelistic.
- **Inter (VF)** — the *restrained* modern counterpoint. Use at 15px with wide line-height for navigation and tour-date tables. Keeps the site from feeling costume-party.

### Recommended Pairings (tested combos)
| Display | Body | Accent / Number | Vibe |
|---|---|---|---|
| Cormorant 300 | EB Garamond | Inter tabular-nums | Opera-house program (my top pick) |
| Cinzel Decorative (caps only) | Cormorant Upright | IM Fell English (dates) | Lithographed playbill |
| UnifrakturCook (logotype only) | EB Garamond | Inter | Grimoire-meets-gallery |
| Italiana | EB Garamond | Cormorant SC | 1901 couture |
| Ogg (paid) | Canela Text (paid) | Inter | Ethel Cain tier editorial |

**Rules of engagement.** Max 2 display faces, 1 body, 1 mono/UI. Use `text-wrap: balance` on every headline, `text-wrap: pretty` on paragraphs. Activate OpenType features explicitly: `font-feature-settings: "liga", "dlig", "onum", "smcp";` — unlocks discretionary ligatures, old-style numerals, true small caps. That's the difference between "serif on a web page" and "typeset by a printer in 1893."

---

## 4. Color Palettes

All in OKLCH for perceptual uniformity + hex fallback. Pick one, don't mix.

### Palette A — "The Opera House" *(my favorite — most versatile)*
```
--ink       #0b0608   oklch(8%  0.01 20)     ← near-black with red bias
--velvet    #3a0d12   oklch(22% 0.10 15)     ← blood velvet seating
--blood     #7a1a1a   oklch(38% 0.17 25)     ← curtain accent
--candle    #f0c27a   oklch(82% 0.11 80)     ← gas-lamp highlight
--gilt      #b8892f   oklch(62% 0.12 80)     ← picture-frame metal
--parchment #e8dcc4   oklch(88% 0.03 85)     ← program booklet paper (inverted mode)
```

### Palette B — "Bruised Gothic"
```
--obsidian  #0a0a10   oklch(8%  0.015 290)
--bruise    #2a1340   oklch(22% 0.10 305)    ← deep royal purple
--plum      #5a1a4a   oklch(32% 0.14 340)
--wine      #6a1030   oklch(32% 0.16 15)
--bone      #d8cfc0   oklch(85% 0.02 80)
--amber     #c77a1a   oklch(60% 0.14 55)
```

### Palette C — "Southern Gothic" (Ethel Cain territory)
```
--pitch     #0e0a06   oklch(8%  0.015 55)
--ash       #2a241c   oklch(22% 0.02 75)
--rust      #8a3a1a   oklch(42% 0.12 40)
--cream     #e8dec2   oklch(87% 0.04 85)
--moss      #3a4028   oklch(30% 0.04 120)
--brass     #a88230   oklch(60% 0.10 85)
```

### Palette D — "Moonlit Cathedral" (coldest, most theatrical)
```
--vault     #060a12   oklch(8%  0.02 250)
--stone     #1c2430   oklch(20% 0.03 255)
--oxide     #2a4050   oklch(32% 0.06 235)
--taper     #e8d078   oklch(85% 0.13 90)    ← single warm beacon
--silver    #a0a8b0   oklch(70% 0.01 250)
--garnet    #5a0a1a   oklch(28% 0.16 20)    ← single blood accent
```

**Application rule.** 60% `--ink/--obsidian/--vault`. 25% a mid-tone (velvet/bruise/ash/stone). 10% textural noise. 4% warm accent (candle/amber/taper). 1% blood/garnet — used *sparingly*, for the single most-important CTA or the current playing track.

---

## 5. Audio Integration Patterns

### The right autoplay policy (2026)
Browsers enforce Media Engagement Index — if users don't return, autoplay fails. **Never autoplay with sound.** Autoplay policy rundown: [Chrome autoplay blog](https://developer.chrome.com/blog/autoplay) · [MDN autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

Pattern: on first user interaction (click, scroll past hero), start a **muted** loop of an ambient bed at -24 LUFS. Show a persistent brass pull-chain toggle; clicking unmutes + starts the cinematic bed.

### Waveform player
**Wavesurfer.js v7** is still the standard in 2026. It renders into Shadow DOM and exposes `::part()` for styling. ([Wavesurfer docs](https://wavesurfer.xyz/docs/))

```js
const ws = WaveSurfer.create({
  container: '#waveform',
  waveColor:     'rgba(184,137,47,.35)', // --gilt @ 35%
  progressColor: '#7a1a1a',              // --blood
  cursorColor:   '#f0c27a',              // --candle
  barWidth: 2, barRadius: 1, barGap: 2,
  height: 80,
  normalize: true,
});
```
Plugins to bring: **Hover** (shows time), **Regions** (for lyric or chapter markers), **Minimap** (for long-form tracks / live takes).

### Alternative: custom GLSL waveform
If the artist is more "art-film" than "streaming artist," skip Wavesurfer and render the waveform as a **GLSL-animated flame** whose amplitude is driven by WebAudio `AnalyserNode`. FFT → fragment shader uniform → flame height. Zero competitors are doing this for EPKs.

### Scrubber design
- **Do:** thin gilt line, flame/ember on the playhead, time-stamp that feels etched (use `font-feature-settings: "tnum"` on Inter).
- **Don't:** thick rounded-blob slider. It'll fight the typography.

### "Listen" affordances
- Each track gets **three** actions: play in place (inline), open in context (full page with lyrics + notes), save to Spotify/Apple (linkout).
- Use View Transitions to morph the inline waveform into the full track page — the playhead continues; the Web Audio node is *the same instance* via a module-level singleton. Genuinely magical. ([View Transitions cross-doc](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document))

---

## 6. Structural Sections an EPK MUST Have (with creative twists)

### a. Bio — "The Frontispiece"
- **Short bio** (60 words) + **full bio** (250 words) + **technical rider bio** (for bookers — 40 words + press quote).
- **Twist:** set the full bio as a **scroll-typewriter** using `overflow: clip` + scroll-driven `clip-path` reveal. Each paragraph fades in on `view()` timeline. Pull-quotes from press float in as anchor-positioned asides. Drop-cap first letter in Cinzel Decorative, `initial-letter: 3`.

### b. Music — "The Catalogue"
- Albums, EPs, singles, feature list, remixes. Streaming links + direct plays.
- **Twist:** gallery is a **stack of lithographed record sleeves** (CSS 3D transforms, rotateY shelf). Hover lifts one, the waveform blooms beneath. Click morphs the sleeve into full-screen album page via View Transitions. Tracklist uses old-style numerals (`font-variant-numeric: oldstyle-nums`).

### c. Video — "The Moving Picture"
- Music videos, performance clips, visualizers.
- **Twist:** videos live behind a **shutter mechanism** — a 2-panel CSS aperture that opens on play. All videos dithered + scanlined until clicked (shader pass on a `<video>` texture). One click turns the filter off and the video plays "true."

### d. Press — "The Clippings"
- Quotes, publication logos, interviews.
- **Twist:** present as a **pinned-corkboard of actual torn scans**. SVG path-trace animation draws the torn edges. On hover, the clipping rotates slightly (CSS `transform: rotate(var(--tilt))` with `--tilt` randomized via `--random` custom property). Each clipping has an anchor-positioned footnote in hairline serif.

### e. Tour / Dates — "The Playbill"
- List of upcoming shows, venue, city, ticket link.
- **Twist:** design as an **actual Victorian playbill broadside** — centered, mixed-weight typography stack (`Tonight! / Mme. [ARTIST] / In Concert / at the Paris Opera / 8 o'clock`). Sold-out rows get a diagonal red ink stamp (CSS `::before` with `mix-blend-mode: multiply`). `scroll-snap-type` so each city feels like turning a page.

### f. Contact / Booking — "Correspondence"
- Management, booking, publicity, sync — separated.
- **Twist:** a **wax-seal button**. CSS conic-gradient disk + embossed monogram. On click, the seal "cracks" (two halves rotate apart, revealing the email). `:active` triggers a candle-flame cursor flare. Alternative: a pure HTML5 `<form>` styled as fountain-pen-on-parchment, submit button is a sealing-wax "Post."

### g. Gallery / Imagery — "The Daguerreotype Cabinet"
- High-res downloadable press photos with credit lines.
- **Twist:** viewed through a **velvet rope** — photos are framed in the CSS conic-gradient cartouche (Technique #4). Each frame has a "take plate" button that triggers download with proper filename metadata. Plates are labeled like museum placards (artist, year, photographer, download size).

### h. Socials & Platforms — "The Ledger"
- Not a strip of icons. Tired.
- **Twist:** a single ornate **ledger page** — Spotify / Apple / Bandcamp / Instagram / YouTube / Soundcloud each a line-item with the artist's real follower count (pulled via oEmbed or a JSON endpoint), typeset with old-style numerals and ledger-rule guides.

---

## 7. Three WILD Ideas (almost nobody is doing these)

### WILD 1 — The Opera Program (View Transitions + Audio Singleton)
Full-site metaphor: the visitor is being handed a **printed program** on arrival. Landing page is literally the cover of a Victorian program booklet — fold creases (box-shadow inset), title in Cormorant 200, date in roman numerals. Clicking any nav item **turns a page** via cross-document View Transition with a page-flip `::view-transition-new` shader.

*Nobody is doing this because:* most devs think View Transitions = fade. Using them as spatial metaphor (page flip, curtain rise, scroll unfurl) is virgin territory. ([View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document))

Add: the **audio bed never stops** — it's tied to a module-level `AudioContext` that persists across navigations (this works because View Transitions don't recreate the document's JS realm the way a hard reload does in MPA when you opt into a shared worker or use same-document transitions; for true MPA, hand off state via a SharedWorker). Visitor walks through the site and the score swells to the section they're reading.

### WILD 2 — Generative Sigil / "Sigil of the Listener"
On first visit, the site generates a **personal sigil** for the visitor — a unique SVG glyph deterministically seeded from a salted hash of `navigator.userAgent + crypto.randomUUID()` stored in `localStorage`. The sigil appears in the footer as their "seat number" and morphs over time (via `@property` + scroll engagement counter) — every minute on the site adds a flourish.

At 10 minutes, the sigil is "complete" and the visitor is invited to **download it as PNG** — a souvenir of the visit. Print-your-own poster. Shareable on socials, seeds virality because each one is literally unique.

*Nobody is doing this because:* it requires tying together procedural SVG generation + `@property` animation + persistent state + asset export. All 2026-viable, nobody's assembled it.

Tech: seeded RNG (mulberry32) → SVG path string → `@property` custom properties for stroke/fill evolution → `canvas.drawImage(svgBlob)` → `toBlob` → download.

### WILD 3 — The Séance Comment Wall (ephemeral, decay-based, WebRTC)
A single page called "**The Séance**" — visitors can leave a brief message (max 40 chars, one per IP per 24h). Messages appear as **flickering candle-lit text**, typeset in UnifrakturCook, with `filter: brightness()` driven by a per-message noise function. **Messages decay** — their opacity drops over 72 hours until they vanish entirely (no moderation burden, no pile-up). Live cursors of other present visitors appear as **drifting candle-flames** via a tiny Partykit/WebRTC room.

Bonus: the more people are on the page simultaneously, the **more the candles flicker**. Solo visit = steady flame. Ten people = dramatic storm-wind guttering. Pure atmosphere, zero-cost engagement metric made visible.

*Nobody is doing this because:* artist sites don't generally feature user-generated content. That's exactly why it works — it makes the EPK feel *haunted* and *lived in*. Press writes about it. Fans screenshot it. The artist's presence becomes communal.

---

## 8. Build Stack Recommendation (pick-and-mix)

| Layer | Recommendation | Why |
|---|---|---|
| Framework | Astro 5 (MPA) + `@view-transition: auto` | Ships 0 JS by default. View Transitions native. |
| Smooth scroll | Lenis **only on hero**; CSS scroll-driven elsewhere | Saves memory; no jank at bottom of long page |
| Choreography | GSAP 3 + ScrollTrigger (hero cinematics only) | Imperative, timeline-pinning, SVG plugins |
| UI motion | **Motion One** (not Framer Motion) | 2.5–6× faster; tree-shakeable; MIT ([GSAP vs Motion](https://motion.dev/docs/gsap-vs-motion)) |
| 3D / shaders | Three.js + R3F, *or* Unicorn Studio no-code | Unicorn for the speed-to-shipped hero |
| Audio | Wavesurfer.js v7 + Web Audio AnalyserNode | Plugin ecosystem, Shadow DOM styleable |
| Type | Cormorant VF + EB Garamond + Inter (Google) | Free, variable, production-proven |
| Grain | `<feTurbulence>` + fffuel nnnoise fallback | 4KB vs 400KB raster grain PNG |
| Hosting | Netlify with `cache-control: immutable` on assets | EPKs are re-visited rarely; aggressive cache fine |
| Perf budget | **Hero < 200KB JS, < 1.2MB total above-the-fold** | Press on hotel wifi exists |

---

## 9. Accessibility Non-Negotiables

- `prefers-reduced-motion: reduce` — kill all flicker, grain animation, flame particles, displacement shaders. Offer a static-poster hero.
- Contrast ratio **7:1 minimum** for body text against velvet/ink backgrounds (AAA). Candle-amber on ink passes. Use [APCA calculator](https://www.myndex.com/APCA/) not WCAG 2 — more accurate for dark-mode.
- Skip links visible on focus in brass/gilt.
- Waveform player needs a keyboard-accessible play/pause and native `<track>` captions for any video with dialogue.
- All shaders have a **"plate only"** fallback image — press sometimes screenshots EPKs into PDF decks.

---

## 10. Reference Canon (save these)

- [Codrops — WebGL for Designers (Mar 2026)](https://tympanus.net/codrops/2026/03/04/webgl-for-designers-creating-interactive-shader-driven-graphics-directly-in-the-browser/)
- [Codrops — Efecto: ASCII + Dithering WebGL (Jan 2026)](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/)
- [Codrops — Sticky Grid Scroll (Mar 2026)](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)
- [Codrops — Shader-Based Reveal with R3F + GLSL](https://tympanus.net/codrops/2024/12/02/how-to-code-a-shader-based-reveal-effect-with-react-three-fiber-glsl/)
- [MDN — Scroll-driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)
- [Chrome — Cross-Document View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- [Motion vs GSAP](https://motion.dev/docs/gsap-vs-motion)
- [Lenis (Darkroom Engineering)](https://github.com/darkroomengineering/lenis)
- [Wavesurfer.js](https://wavesurfer.xyz/)
- [CSS-Tricks — Grainy Gradients](https://css-tricks.com/grainy-gradients/)
- [fffuel nnnoise generator](https://www.fffuel.co/nnnoise/)
- [SmokeGL (candle flame reference)](https://github.com/LucaAngioloni/SmokeGL)
- [State of CSS 2026](https://www.codercops.com/blog/state-of-css-2026)
- [Awwwards — Music & Sound collection](https://www.awwwards.com/websites/music-sound/)
- [Awwwards — Dark-themed inspiration](https://www.awwwards.com/inspiration/dark-themed-website)
- [Typewolf — Google Fonts 2026](https://www.typewolf.com/google-fonts)
- [Fontfabric — 2026 Typography Trends](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/)

---

## Closing Opinion

If I were building this EPK tomorrow, here's the shortlist:

**Stack.** Astro 5 + cross-document View Transitions. Motion One for UI. GSAP only for the proscenium hero. Wavesurfer for audio. Unicorn Studio or a single custom GLSL displacement shader for the hero portrait. Zero React.

**Look.** Palette A (The Opera House). Cormorant VF display + EB Garamond body + Inter tnum for dates. `feTurbulence` grain site-wide at 12%. One wax-seal contact button. One brass pull-chain audio toggle. Everything else is restraint.

**The single idea that wins.** Candlelit cursor (Hero 1). Visitors *light* the artist into existence on first contact. That's the whole brand promise.

The mistake most goth artist sites make is mistaking **darkness** for **atmosphere**. Atmosphere is *contrast* — a single candle in a pitch-black room is more goth than a whole cathedral of black velvet. Build like that.

— End of report.
