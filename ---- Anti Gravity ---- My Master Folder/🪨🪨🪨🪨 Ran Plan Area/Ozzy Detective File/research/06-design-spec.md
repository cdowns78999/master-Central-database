# Ozzy Osbourne — Detective Case File
## Design Spec Document (v1.0)

A visual and CSS specification for a single-page tribute site styled as a classified case file sitting on a detective's desk. This document is the build blueprint — the main agent should follow it when producing HTML/CSS. Tone: reverent, grungy, nostalgic, ultimately celebratory. Not a parody. A quiet, heavy file you open with respect.

---

## 1. Color Palette

A warm, paper-and-wood palette anchored by stamp red and typewriter black. Twelve named tokens.

| Token | Hex | Role |
|---|---|---|
| `--wood-dark` | `#3b2416` | Desk background base (outer frame) |
| `--wood-grain` | `#4a2e1c` | Wood grain highlights / noise overlay |
| `--manila-folder` | `#d4a853` | Primary folder tone (outer cover) |
| `--manila-shadow` | `#a07a33` | Folder crease / shadowed edges |
| `--aged-paper` | `#e8dcc0` | Interior pages, profile cards |
| `--aged-paper-deep` | `#c9b790` | Page edges, wear on paper |
| `--index-card-cream` | `#f4ead5` | Index cards (Known Associates) |
| `--index-card-rule` | `#b8d0e0` | Blue rule lines on index cards |
| `--typewriter-ink` | `#1a1512` | Body text, typewriter strokes |
| `--stamp-red` | `#a8231a` | CONFIDENTIAL / CLASSIFIED stamps |
| `--stamp-red-faded` | `#c4443a` | Faded stamp edges / second impressions |
| `--redaction-black` | `#0f0e0c` | Redacted bars, censored blocks |
| `--coffee-ring` | `#6b4423` | Coffee stain rings (with alpha) |
| `--masking-tape` | `#e8d9a8` | Tape strips (translucent) |
| `--faded-blue-ink` | `#3a5878` | Handwritten notes, margin scribbles |
| `--paperclip-silver` | `#9ca3af` | Paper clip chrome |

Alpha notes: `--coffee-ring` should render at `0.28` opacity; `--masking-tape` at `0.75` with slight sepia multiply.

---

## 2. Typography

Three-font system. All via Google Fonts.

**Import (single link in `<head>`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Permanent+Marker&display=swap" rel="stylesheet">
```

**Font roles:**

| Role | Font | CSS | Use |
|---|---|---|---|
| Headers / Stamps / Folder Tabs | Special Elite | `font-family: 'Special Elite', 'Courier New', monospace;` | "CASE FILE #1948-OZ", "CONFIDENTIAL", section titles |
| Body / Case notes / Report | Courier Prime | `font-family: 'Courier Prime', 'Courier New', monospace;` | Paragraphs, testimonials, timeline entries |
| Handwritten annotations | Permanent Marker | `font-family: 'Permanent Marker', 'Marker Felt', cursive;` | Margin notes, "FILED BY:", polaroid captions, red-pen scribbles |

**Scale:**
- Cover stamp text: `72px / 800 / 0.15em letter-spacing`
- Section titles (tab labels): `28px / 400 / 0.08em`
- Body: `16px / 1.7 line-height`
- Index card headers: `20px Special Elite`
- Handwriting: `18–22px Permanent Marker, slight rotation`

---

## 3. Layout Structure

Single-page vertical scroll. Each section is a distinct "document" layered on the desk. Max content width `960px`, centered. Desk background extends full viewport.

### Section 3.1 — Cover Folder (Hero)
- Full-height viewport hero
- Large manila folder takes center: `880px × 600px`, rotated `-1.5deg`, heavy drop-shadow `0 40px 80px rgba(0,0,0,0.6)`
- Folder tab at top-left with "CASE FILE #1948-OZ" in Special Elite
- Dead center: giant diagonal red "CLASSIFIED" stamp, rotated `-8deg`, slightly faded, double-impression effect
- Smaller secondary stamp bottom-right: "CONFIDENTIAL" rotated `4deg`
- Subject line typed across: "SUBJECT: OSBOURNE, JOHN MICHAEL — A.K.A. 'OZZY'"
- Date line: "FILED: 12.03.1948 — CASE STATUS: ETERNAL"
- Feel: you're looking down at a closed folder on a dark desk. Heavy, quiet, loaded.

### Section 3.2 — Subject Profile Card
- Full-width aged-paper card, `3deg` slight tilt
- Left column: polaroid photo mount (placeholder `280×320`) with Permanent Marker caption "Birmingham, '68"
- Right column: typewritten profile — DOB, origin (Aston, Birmingham), known aliases ("Prince of Darkness", "The Godfather of Metal"), distinguishing marks
- Two paper clips at the top edge, one silver one rusted
- A piece of masking tape across the top-left corner labeling it "EXHIBIT A"
- Feel: the first page you open. Clinical but warm. You can see fingerprints on it.

### Section 3.3 — Timeline of Events (Pinned Evidence)
- Cork-board styled inset (subtle cork texture OR keep paper with pushpins)
- Vertical timeline with 8–12 pinned index cards at alternating rotations (`-3deg` to `+4deg`)
- Red pushpin at top of each card (SVG or pseudo-element)
- String/twine visual connecting cards (thin `2px` dashed line, `--faded-blue-ink`)
- Each card: date header (Special Elite), event body (Courier Prime), one has a redacted bar over a line
- Key entries: Black Sabbath formation 1968, first album '70, solo '80, Randy Rhoads '81, The Osbournes '02, Birmingham closing ceremony 2022, final Back to the Beginning show 2025
- Feel: a detective's evidence wall. Your eye travels chronologically but catches on a smudge, a redaction, a coffee ring.

### Section 3.4 — Known Associates (Index Cards)
- 3×2 grid of `4×6` index cards with blue rule lines
- Each card: name header (hand-printed Permanent Marker in --faded-blue-ink), relationship, brief dossier line in typewriter
- Cards: Randy Rhoads, Sharon Osbourne, Tony Iommi, Geezer Butler, Bill Ward, Jack & Kelly Osbourne (one combined card), Zakk Wylde
- Each card tilted `-4deg` to `+3deg`, slight overlap on neighbors
- One card has a paper clip attaching a smaller "addendum" slip
- One card (Randy) has a black border — memorial convention
- Feel: a rolodex someone cared about. Handwritten, smudged, loved.

### Section 3.5 — Critic Testimonials (Three Tiers)
Three horizontal bands, each styled differently to imply source authority.

**Tier 1 — Academic (top band):**
- White scholarly paper tone (`--aged-paper` lightened)
- Formal citations, Courier Prime italics for the quote
- Small "FILED UNDER: ACADEMIA" stamp top-right in faded blue
- Quotes from music historians, Rolling Stone critics, academic journals

**Tier 2 — Major Press (middle band):**
- Newspaper clipping treatment — columnar text, slight yellowing
- Cut-out edges (jagged clip-path)
- Headline in bolder Special Elite
- Sources: NYT, Guardian, Pitchfork, Rolling Stone

**Tier 3 — Fan Letters (bottom band):**
- Handwritten on lined notebook paper, torn edges
- Permanent Marker in `--faded-blue-ink`
- Each letter rotated differently (`-5deg` to `+5deg`)
- Tape strips holding them to the page
- Raw emotion — "you got me through 9th grade", "my dad played Crazy Train on the way to chemo", etc.

Feel: three registers of love — formal, published, personal. The fan letters hit hardest.

### Section 3.6 — Final Report (Closing Tribute)
- Full-width aged-paper document, slight rotation
- Header: "FINAL REPORT — CASE CLOSING STATEMENT"
- Typewriter paragraph, building to a reverent closing line
- Bottom-right: a large red "CASE CLOSED" stamp, rotated `-6deg`
- Signature line in Permanent Marker: "— Filed with respect, 2025"
- A single polaroid paper-clipped to the corner: Ozzy smiling
- A coffee ring stain on the bottom-left (pseudo-element)
- Feel: the detective sets down the pen. The file is closed but not forgotten.

---

## 4. Visual Motifs — CSS Snippets

### 4.1 Paper Clip
```css
.paper-clip {
  position: absolute;
  top: -18px;
  left: 32px;
  width: 28px;
  height: 64px;
  border: 3px solid var(--paperclip-silver);
  border-radius: 14px 14px 4px 4px;
  border-bottom: none;
  transform: rotate(-8deg);
  filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.4));
  z-index: 10;
}
.paper-clip::before {
  content: '';
  position: absolute;
  top: 8px; left: 4px;
  width: 16px; height: 44px;
  border: 2px solid var(--paperclip-silver);
  border-radius: 8px 8px 2px 2px;
  border-bottom: none;
}
```

### 4.2 Masking Tape Strip
```css
.tape {
  position: absolute;
  width: 120px;
  height: 28px;
  background: var(--masking-tape);
  opacity: 0.78;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  transform: rotate(-4deg);
  mix-blend-mode: multiply;
}
.tape::before, .tape::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 6px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08));
}
.tape::before { left: 0; clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%); }
.tape::after { right: 0; transform: scaleX(-1); }
```

### 4.3 Polaroid Frame
```css
.polaroid {
  background: #f5efd8;
  padding: 14px 14px 56px 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(0,0,0,0.05);
  transform: rotate(-2.5deg);
  position: relative;
  display: inline-block;
}
.polaroid img { display: block; width: 100%; filter: sepia(0.18) contrast(1.05); }
.polaroid .caption {
  position: absolute;
  bottom: 12px; left: 0; right: 0;
  text-align: center;
  font-family: 'Permanent Marker', cursive;
  color: var(--faded-blue-ink);
  font-size: 16px;
}
```

### 4.4 Stamp (Classified / Confidential / Case Closed)
```css
.stamp {
  display: inline-block;
  font-family: 'Special Elite', monospace;
  font-size: 64px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--stamp-red);
  border: 6px solid var(--stamp-red);
  padding: 12px 28px;
  transform: rotate(-8deg);
  opacity: 0.82;
  mix-blend-mode: multiply;
  filter: url(#roughen);
  text-shadow: 1px 1px 0 var(--stamp-red-faded);
  position: relative;
}
.stamp::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><filter id="n"><feTurbulence baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.35"/></svg>');
  mix-blend-mode: screen;
  pointer-events: none;
}
```
(The SVG turbulence mask creates the faded-ink texture — ink isn't applied evenly.)

### 4.5 Redacted Bar
```css
.redacted {
  display: inline-block;
  background: var(--redaction-black);
  color: transparent;
  padding: 2px 6px;
  user-select: none;
  box-shadow: 0 0 1px rgba(0,0,0,0.8);
  transform: skew(-1deg);
}
.redacted::selection { background: var(--redaction-black); }
```

### 4.6 Coffee Ring Stain (Pseudo-element)
```css
.has-coffee-ring {
  position: relative;
}
.has-coffee-ring::before {
  content: '';
  position: absolute;
  bottom: 24px;
  right: 48px;
  width: 140px;
  height: 140px;
  border: 12px solid var(--coffee-ring);
  border-radius: 50%;
  opacity: 0.22;
  filter: blur(0.5px);
  transform: scale(1.05, 0.95);
  pointer-events: none;
  mix-blend-mode: multiply;
}
.has-coffee-ring::after {
  content: '';
  position: absolute;
  bottom: 30px;
  right: 54px;
  width: 128px;
  height: 128px;
  border: 2px solid var(--coffee-ring);
  border-radius: 50%;
  opacity: 0.35;
  pointer-events: none;
  mix-blend-mode: multiply;
}
```

### 4.7 Index Card
```css
.index-card {
  background: var(--index-card-cream);
  width: 360px;
  min-height: 220px;
  padding: 48px 24px 20px;
  background-image:
    linear-gradient(to bottom, transparent 44px, var(--index-card-rule) 44px, var(--index-card-rule) 45px, transparent 45px),
    repeating-linear-gradient(transparent 0, transparent 27px, var(--index-card-rule) 27px, var(--index-card-rule) 28px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.04);
  position: relative;
  font-family: 'Courier Prime', monospace;
}
.index-card::before {
  /* red margin line on left */
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  left: 36px;
  width: 1px;
  background: rgba(168,35,26,0.4);
}
```

### 4.8 Manila Folder (Cover)
```css
.folder {
  background: var(--manila-folder);
  background-image:
    linear-gradient(135deg, rgba(0,0,0,0.05) 0%, transparent 40%),
    repeating-linear-gradient(45deg, transparent 0 2px, rgba(0,0,0,0.02) 2px 3px);
  border-radius: 2px 14px 2px 2px;
  box-shadow:
    0 2px 0 var(--manila-shadow),
    0 40px 80px rgba(0,0,0,0.6),
    inset 0 -80px 120px rgba(0,0,0,0.08);
  position: relative;
}
.folder::before {
  /* folder tab */
  content: 'CASE FILE #1948-OZ';
  position: absolute;
  top: -28px;
  left: 60px;
  padding: 8px 32px 12px;
  background: var(--manila-folder);
  border-radius: 8px 8px 0 0;
  font-family: 'Special Elite', monospace;
  font-size: 14px;
  letter-spacing: 0.1em;
  box-shadow: -2px -2px 6px rgba(0,0,0,0.15);
}
```

### 4.9 Desk Background
```css
body {
  background:
    radial-gradient(ellipse at 20% 10%, rgba(255,220,180,0.08), transparent 60%),
    radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.4), transparent 50%),
    linear-gradient(170deg, var(--wood-dark), var(--wood-grain), var(--wood-dark));
  background-attachment: fixed;
  min-height: 100vh;
}
body::before {
  /* wood grain noise */
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.8" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23g)" opacity="0.35"/></svg>');
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 0;
}
```

### 4.10 Paper Grain (on every paper surface)
```css
.paper {
  background-color: var(--aged-paper);
  background-image:
    radial-gradient(circle at 30% 20%, rgba(139,100,60,0.08) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(139,100,60,0.06) 0%, transparent 50%),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="p"><feTurbulence baseFrequency="0.85" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23p)" opacity="0.08"/></svg>');
  box-shadow: 0 2px 8px rgba(0,0,0,0.25), inset 0 0 40px rgba(139,100,60,0.12);
}
```

### 4.11 Pushpin
```css
.pushpin {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #e85a4a, #a8231a 60%, #6b1510);
  box-shadow: 0 3px 5px rgba(0,0,0,0.5), inset -2px -2px 3px rgba(0,0,0,0.3);
  position: absolute;
  top: -8px; left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}
```

---

## 5. Mood Notes

This file should feel like someone loved this man enough to document him carefully. It's a detective's case file, not a novelty prop — the grunge is real (coffee rings, smudged ink, tape that's been re-pressed) but the intent is reverent. Warm lamplight falls across a dark wood desk; someone has been sitting here for hours with these papers, and you can tell. The mood runs nostalgic-into-celebratory: the first half feels weighty, almost elegiac, as you page through the evidence of a life; by the time you reach the fan letters and final report, it tilts upward — this wasn't a tragedy, it was a legend, properly filed. Avoid anything cartoonish: no skulls, no lightning bolts, no bat imagery unless it's treated as a small handwritten margin note. Let the paper do the work.

---

## 6. Micro-interactions

All transitions `ease-out` at `280ms` unless noted. Nothing bouncy. Nothing that breaks the physical illusion.

| Element | Interaction | Effect |
|---|---|---|
| Index cards | Hover | Lift `6px`, shadow deepens, rotation returns slightly toward `0deg` — like someone picked it up to read |
| Polaroids | Hover | Lift `8px`, shadow grows, tiny `+0.5deg` rotation shift |
| Stamps | Hover | Micro-wiggle (`±1deg` keyframe, `600ms`), opacity flickers `0.82 → 0.9 → 0.82` |
| Timeline cards | Click | Flips / expands to reveal long-form note underneath (or simply expands height with additional typewriter text) |
| Fan letters | Hover | Tape strip peels `2px`, letter rotates `+1deg`, soft paper rustle (optional audio, off by default) |
| Redacted bars | Click | Pulse `1.5s` then remain — teases but never reveals (text stays hidden) |
| Paper clips | Hover on parent card | Clip rotates `+3deg`, tiny shadow shift |
| Coffee rings | Static — never animate |
| Scroll reveal | Each section fades in at `0.6` opacity → `1` over `800ms` as it enters viewport, with `translateY(20px) → 0` |
| Cursor over desk background | Subtle `cursor: default` — no custom cursor; keep it real |
| Cover CLASSIFIED stamp | Entry animation only: scale-in from `1.4 → 1` with `rotate(-20deg → -8deg)` over `900ms` on page load, as if just stamped |

**Restraint rules:**
- No parallax on photos.
- No hover sound.
- No flip cards that look like web-dev demos — use subtle expand-in-place reveals.
- The only "celebratory" moment in motion is the CASE CLOSED stamp on load of the final section, which slams in with the same entry animation as the cover stamp.

---

## Build Order (Recommendation for Main Agent)

1. Set up CSS variables, font import, body desk background.
2. Build `.paper`, `.folder`, `.index-card`, `.polaroid` base components.
3. Build motif utilities: `.paper-clip`, `.tape`, `.stamp`, `.redacted`, `.pushpin`, `.has-coffee-ring`.
4. Section 3.1 Cover first — get the mood locked before moving on.
5. Proceed top-to-bottom through Sections 3.2 → 3.6.
6. Layer in micro-interactions last.
7. QA pass: every section must pass the "reverent not cheesy" test — if anything reads as parody, desaturate or reduce rotation.

---

*End of spec — v1.0*
