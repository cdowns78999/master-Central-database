# DESIGN SPEC — Tool Detective File
## Single-File Web App · index.html
### Version 1.0 · 2026-04-17

---

## 1. VISUAL DNA STATEMENT

Sacred geometry meets heavy metal mysticism. The aesthetic draws from Alex Grey's
visionary oil paintings — dense, luminous, anatomically precise — filtered through
the oxidized-metal physicality of Tool's album art. Every surface feels ancient and
deliberate: bronze that has darkened with time, deep blacks with sub-surface warmth,
muted ritual reds that pulse rather than scream.

Where the Ozzy file is a detective's cork board with manila folders and coffee rings,
the Tool file is an obsidian reliquary — stone, gold leaf, sacred inscriptions,
geometric order underlying apparent chaos.

---

## 2. COLOR PALETTE

| Role                  | Name               | Hex       | Usage                                              |
|-----------------------|--------------------|-----------|----------------------------------------------------|
| Background deep       | Void Black         | `#0a090c` | Page background, body                              |
| Background mid        | Obsidian           | `#100f14` | Section panels base                                |
| Surface dark          | Charred Stone      | `#1a1720` | Cards, index cards, timeline events                |
| Surface mid           | Ritual Chamber     | `#221e2a` | Hover states, alternate panels                     |
| Accent primary        | Oxidized Bronze    | `#7c5c2e` | Borders, divider lines, section tabs               |
| Accent glow           | Burnished Gold     | `#c8922a` | Headers, year stamps, highlight text               |
| Accent bright         | Sacred Gold        | `#e8b84b` | H1, hero title, key dates, hover accents           |
| Accent red-muted      | Dried Blood        | `#8b2020` | Verdict badges (Fiction), stamps, alert elements   |
| Accent red-warm       | Ritual Red         | `#a83228` | Source links, cite markers, confirm badges         |
| Accent grey           | Bone Ash           | `#9e9aaa` | Body text, descriptions                            |
| Accent grey-light     | Parchment Fog      | `#ccc8d8` | Subheads, labels                                   |
| Geometry line         | Teal Ether         | `#2a4a5e` | Geometric SVG line art, Fibonacci overlays         |
| Geometry line bright  | Cyan Ghost         | `#3a7080` | Active geometry lines, hover                       |
| Verdict green         | Sage Truth         | `#2a5c3a` | "Confirmed" verdict badges                         |
| Verdict amber         | Amber Unknown      | `#7a5c10` | "Disputed" / "Unverified" badges                   |
| Source panel bg       | Deep Relic         | `#13111a` | Sources panel background                           |
| Source panel border   | Bronze Tarnish     | `#4a3820` | Sources panel border                               |

---

## 3. TYPOGRAPHY STACK

### Display / Headers
```
font-family: 'Cinzel', 'Trajan Pro', 'Times New Roman', serif;
```
- H1 (hero title): Cinzel, 52–72px, letter-spacing 0.08em, color #e8b84b
- H2 (section titles): Cinzel, 28–34px, letter-spacing 0.1em, color #c8922a
- Section tab labels: Cinzel, 13px, letter-spacing 0.2em, uppercase

### Secondary Display / Subheads
```
font-family: 'Cormorant Garamond', 'IM Fell English', Georgia, serif;
```
- Bio names: Cormorant Garamond SemiBold, 28px, italic
- Timeline year labels: Cormorant Garamond, 22px
- Quote attribution: IM Fell English, 13px, italic

### Body / Data
```
font-family: 'Inter', 'Manrope', system-ui, sans-serif;
```
- Body text: Inter Regular, 14–15px, line-height 1.75, color #9e9aaa
- DL labels / meta: Inter Medium, 12px, letter-spacing 0.12em, uppercase
- Source panel text: Inter, 12–13px

### Google Fonts import string
```
https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=IM+Fell+English:ital@0;1&family=Inter:wght@400;500;600&display=swap
```

---

## 4. SECTION LAYOUT SKETCHES

```
┌─────────────────────────────────────────────────────────┐
│  [SOURCES PANEL — sticky upper-right, always visible]   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ◈ VERIFIED SOURCES                  [× close]    │   │  ← fixed, top:24px right:24px
│  │  ┄┄ scrollable ┄┄                               │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────── HERO / HEADER ──────────────────┐     │
│  │  [sacred geometry SVG background — Metatron's  │     │
│  │   Cube / Flower of Life faint overlay]         │     │
│  │                                                │     │
│  │  TOOL ·  CASE FILE #1990–PRESENT              │     │
│  │  [Cinzel 72px gold]                            │     │
│  │                                                │     │
│  │  [Fibonacci spiral watermark, 8% opacity]      │     │
│  │  [album art hero image — 1.png]                │     │
│  │  Classification stamp: ◈ SACRED ◈              │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌─────────────── TIMELINE ───────────────────────┐     │
│  │  Two-column grid, center spine                 │     │
│  │  Event cards: charred-stone bg, gold year,     │     │
│  │  bone-ash body text, slight rotation           │     │
│  │  Center spine: dashed teal-ether               │     │
│  │  Small album-era photo inline per major evt    │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌─────────────── BIOS ────────────────────────────┐    │
│  │  Grid: 2 cols on desktop, 1 col mobile         │     │
│  │  Each bio card: charred-stone bg, gold name    │     │
│  │  left border: 4px oxidized-bronze solid        │     │
│  │  role label: teal-ether uppercase Cinzel       │     │
│  │  Members: Maynard, Adam Jones, Danny Carey,    │     │
│  │           Justin Chancellor                    │     │
│  │  +D'Amour (deceased, ritual-red border)        │     │
│  │  +Alex Grey (collaborator, teal border)        │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌─────────────── FACT OR FICTION ────────────────┐     │
│  │  Myth cards in 2-col masonry-style grid        │     │
│  │  Each card: ritual-chamber bg                  │     │
│  │  Header: myth claim (Cinzel, parchment-fog)    │     │
│  │  Body: evidence text (Inter, bone-ash)         │     │
│  │  Verdict badge (bottom-right):                 │     │
│  │    CONFIRMED  = sage-truth bg + gold text      │     │
│  │    FICTION    = dried-blood bg + gold text     │     │
│  │    DISPUTED   = amber-unknown bg + gold text   │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌─────────────── PHOTO GALLERY ──────────────────┐     │
│  │  CSS grid: repeat(auto-fill, minmax(220px,1fr))│     │
│  │  Photo cards: dark bg, 6px bronze border       │     │
│  │  Hover: lifts + sacred-gold glow shadow        │     │
│  │  Caption: Cormorant Garamond italic            │     │
│  │  Filter: contrast(1.08) saturate(0.88)         │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌─────────────── FOOTER ─────────────────────────┐     │
│  │  Cinzel, small, gold, centered                 │     │
│  │  Fibonacci spiral divider SVG                  │     │
│  │  "◈ — — — ◈" decorative line                  │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## 5. CSS MOTIF NOTES — SACRED GEOMETRY & FIBONACCI

### 5a. Background Sacred Geometry (body::before pseudo-element)
Inline SVG data URI — Metatron's Cube / Flower of Life wireframe in teal-ether
(`#2a4a5e`) at 4–6% opacity, fixed position. Constructed from:
- 1 large circle radius=180
- 6 surrounding circles radius=180 offset by 180px each cardinal/diagonal
- Inner hexagonal grid connecting circle intersections
- Center dot
- All strokes: `#3a7080`, stroke-width 0.5, opacity 0.06

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('data:image/svg+xml; ... metatron cube SVG ...');
  opacity: 0.06;
  pointer-events: none;
  z-index: 0;
}
```

### 5b. Section Dividers — Fibonacci Spiral CSS
Between each major section, a horizontal divider using an inline SVG:
- Fibonacci spiral arc (quarter-circles cascading: r=8,13,21,34,55px)
- Color: `#7c5c2e` (oxidized-bronze), stroke only, fill none
- Centered with `◈` glyph flanking left and right in Cinzel gold
- Width: 320px centered

```css
.divider-geo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 64px auto;
  color: #c8922a;
  font-family: 'Cinzel', serif;
  font-size: 18px;
  letter-spacing: 0.3em;
}
.divider-geo svg {
  width: 120px;
  height: 60px;
  opacity: 0.55;
}
```

### 5c. Section Header Tab (`.section-tab`)
```css
.section-tab {
  display: inline-block;
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #7c5c2e, #4a3820);
  color: #e8b84b;
  padding: 9px 26px 11px;
  border-radius: 6px 6px 0 0;
  box-shadow: -2px -2px 8px rgba(0,0,0,0.5);
  position: relative;
  top: 2px;
  margin-left: 32px;
}
```

### 5d. Card Surface (`.ritual-card`)
```css
.ritual-card {
  background: linear-gradient(160deg, #1a1720 0%, #13111a 100%);
  border: 1px solid #4a3820;
  border-left: 4px solid #7c5c2e;
  box-shadow:
    0 8px 24px rgba(0,0,0,0.65),
    inset 0 0 40px rgba(200,146,42,0.04);
  position: relative;
}
/* Corner geometry accent (::after pseudo) */
.ritual-card::after {
  content: '';
  position: absolute;
  bottom: 12px; right: 12px;
  width: 40px; height: 40px;
  border-right: 1px solid rgba(200,146,42,0.2);
  border-bottom: 1px solid rgba(200,146,42,0.2);
  pointer-events: none;
}
```

### 5e. Verdict Badge
```css
.verdict {
  display: inline-block;
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 0.18em;
  padding: 5px 14px 6px;
  border-radius: 3px;
  text-transform: uppercase;
}
.verdict.confirmed { background: #1a3a26; color: #6bba8a; border: 1px solid #2a5c3a; }
.verdict.fiction   { background: #2a1010; color: #e07070; border: 1px solid #8b2020; }
.verdict.disputed  { background: #2a2010; color: #d4a84b; border: 1px solid #7a5c10; }
```

---

## 6. STICKY UPPER-RIGHT SOURCES PANEL

Mirrors the Ozzy file's `.verify-btn` / `.verify-overlay` / `.verify-panel` pattern exactly,
but re-skinned to Tool's visual DNA.

### Structure
```html
<!-- Trigger button — fixed upper-right -->
<button class="verify-btn" id="sourceBtn">
  ◈ SOURCES
  <span class="stamp-tag">VERIFIED EVIDENCE</span>
</button>

<!-- Full-screen overlay (display:none → display:flex on open) -->
<div class="verify-overlay" id="sourceOverlay">
  <div class="verify-panel">
    <button class="verify-close">✕</button>
    <div class="verify-stamp">AUTHENTICATED</div>
    <h2 class="verify-title">References & Evidence</h2>
    <p class="verify-subtitle">◈ All Sources Cited ◈</p>
    <p class="verify-intro">...</p>

    <!-- Tier 1: Books / Academic -->
    <div class="verify-tier">
      <div class="verify-tier-head">Books & Documentaries</div>
      <div class="verify-tier-body" data-tag="PRIMARY">
        <div class="verify-source">
          <div class="verify-src-name">Author Name — Book Title</div>
          <div class="verify-src-meta">Publisher · Year</div>
          <a class="verify-src-link" href="...">source URL</a>
          <div class="verify-quote">"Verbatim quote one from this source..."</div>
          <div class="verify-quote">"Verbatim quote two from this source..."</div>
        </div>
        <!-- more .verify-source items -->
      </div>
    </div>

    <!-- Tier 2: Music Press -->
    <div class="verify-tier">
      <div class="verify-tier-head">Music Press</div>
      <div class="verify-tier-body" data-tag="PRESS">
        ...
      </div>
    </div>

    <!-- Tier 3: Official / Fan Archive -->
    <div class="verify-tier">
      <div class="verify-tier-head">Official & Archive</div>
      <div class="verify-tier-body" data-tag="ARCHIVE">
        ...
      </div>
    </div>

    <div class="verify-footer">
      ◈ ALL FACTS CORROBORATED AGAINST MINIMUM TWO INDEPENDENT SOURCES ◈
      <small>Tool Detective File · Research compiled 2026</small>
    </div>
  </div>
</div>
```

### Panel CSS (key rules, Tool-skinned)
```css
.verify-btn {
  position: fixed;
  top: 24px; right: 24px;
  z-index: 9000;
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: #e8b84b;
  background: linear-gradient(135deg, #1a1720, #13111a);
  border: 2px solid #7c5c2e;
  padding: 12px 22px 14px;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,146,42,0.15);
  text-transform: uppercase;
  transition: border-color 240ms ease, box-shadow 240ms ease;
}
.verify-btn:hover {
  border-color: #e8b84b;
  box-shadow: 0 6px 20px rgba(0,0,0,0.7), 0 0 12px rgba(232,184,75,0.15);
}
.verify-overlay {
  position: fixed; inset: 0;
  background: radial-gradient(ellipse at center, rgba(10,9,12,0.88), rgba(10,9,12,0.97));
  z-index: 9500;
  display: none;
  align-items: flex-start; justify-content: center;
  padding: 40px 20px;
  overflow-y: auto;
}
.verify-overlay.open { display: flex; }
.verify-panel {
  max-width: 900px; width: 100%;
  background: linear-gradient(160deg, #13111a 0%, #0f0e14 100%);
  border: 1px solid #4a3820;
  border-top: 3px solid #7c5c2e;
  box-shadow: 0 30px 80px rgba(0,0,0,0.85);
  padding: 48px 52px 60px;
  color: #9e9aaa;
  font-family: 'Inter', sans-serif;
}
```

---

## 7. PHOTO CARD LAYOUT (Gallery Section)

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 28px;
  padding: 32px 0;
}
.photo-card {
  background: #13111a;
  border: 1px solid #4a3820;
  border-top: 3px solid #7c5c2e;
  padding: 10px 10px 36px;
  position: relative;
  transition: transform 300ms ease, box-shadow 300ms ease;
  cursor: pointer;
}
.photo-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.7), 0 0 20px rgba(200,146,42,0.12);
}
.photo-card img {
  display: block; width: 100%; height: auto;
  filter: contrast(1.08) saturate(0.85) brightness(0.95);
}
.photo-card .photo-caption {
  position: absolute;
  bottom: 10px; left: 0; right: 0;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 14px;
  color: #c8922a;
  letter-spacing: 0.03em;
}
/* Geometry corner accent */
.photo-card::before {
  content: '';
  position: absolute;
  top: 6px; right: 6px;
  width: 20px; height: 20px;
  border-top: 1px solid rgba(200,146,42,0.3);
  border-right: 1px solid rgba(200,146,42,0.3);
}
```

---

## 8. PHOTO MANIFEST

Photos saved to: `Tool Detective File/photos/`
Format: PNG preferred, JPG acceptable.
Filter applied in CSS — no need to pre-process.

### Album Covers (5 selected)

| # | Filename | Album | Description | Source |
|---|----------|-------|-------------|--------|
| 1 | `1.png`  | Ænima (1996) | Primary hero — iconic eye/throat anatomy art by Adam Jones. Green-teal halftone face. | Wikipedia Commons / Fair use press material |
| 2 | `2.png`  | Lateralus (2001) | The strongest sacred-geometry album cover — Fibonacci spirals, cellular structure. | Wikipedia Commons / Fair use press material |
| 3 | `3.png`  | 10,000 Days (2006) | Stereoscopic lenticular cover with Adam Jones photography. | Wikipedia Commons / Fair use press material |
| 4 | `4.png`  | Fear Inoculum (2019) | Most recent; dark, ceremonial, circular. | Wikipedia Commons / Fair use press material |
| 5 | `5.png`  | Undertow (1993) | Debut full-length; raw industrial feel, contrasts later ornate work. | Wikipedia Commons / Fair use press material |

### Band Stage / Press Photos (4)

| # | Filename | Description | Source |
|---|----------|-------------|--------|
| 6 | `6.png` | Tool live on stage, Maynard James Keenan silhouetted — iconic back-to-audience pose. | Wikimedia Commons (CC licensed concert photo) |
| 7 | `7.png` | Adam Jones playing guitar, close-up, stage light. | Wikimedia Commons (CC licensed concert photo) |
| 8 | `8.png` | Danny Carey behind drum kit, aerial or profile view. | Wikimedia Commons (CC licensed concert photo) |
| 9 | `9.png` | Full band press shot (any era). | Official press kit / Wikimedia Commons |

### Alex Grey Paintings / Tool Visual Stills (5)

| # | Filename | Description | Source |
|---|----------|-------------|--------|
| 10 | `10.png` | "Net of Being" — Alex Grey's grid of faces / divine interconnection. Used in 10,000 Days booklet. | alexgrey.com official press / Wikimedia |
| 11 | `11.png` | "Oversoul" — Alex Grey painting, sacred light figures. | alexgrey.com official press |
| 12 | `12.png` | "Theologue" — Alex Grey, meditating figure with cosmic neural web. | alexgrey.com official press |
| 13 | `13.png` | Tool's Ænima era music video still or promotional art with Alex Grey motifs. | Fair use press still |
| 14 | `14.png` | Alex Grey portrait / at CoSM (Chapel of Sacred Mirrors) — documentary photo. | Wikimedia Commons (CC licensed) |

---

## 9. PULL STATUS

- **9 / 14 photos successfully downloaded** to `photos/` (6.jpg – 14.jpg)
- **5 album covers (1.jpg – 5.jpg) not pulled** — all are copyrighted commercial art absent from Wikimedia Commons
- Album covers should be referenced as fair-use `<img>` tags pointing to Wikipedia thumbnail URLs, or left as placeholder slots in the gallery with a note

---

## 10. FETCH LOG

Attempts made via Wikimedia Commons API (imageinfo + thumb endpoint) with throttled
sequential downloads (2s delay, proper User-Agent). Album covers 1–5 are copyrighted
commercial art and are NOT present on Wikimedia Commons — they must be sourced from
official press kits or used as fair-use embeds in the HTML. The remaining 9 photos
were pulled successfully as CC-licensed files.

| # | Filename | Status | Notes |
|---|----------|--------|-------|
| 1 | 1.jpg | NOT PULLED | Ænima cover — copyrighted, not on Commons. Source: Wikipedia article image or fair-use embed. URL: https://en.wikipedia.org/wiki/Aenima |
| 2 | 2.jpg | NOT PULLED | Lateralus cover — copyrighted. URL: https://en.wikipedia.org/wiki/Lateralus |
| 3 | 3.jpg | NOT PULLED | 10,000 Days cover — copyrighted. URL: https://en.wikipedia.org/wiki/10,000_Days |
| 4 | 4.jpg | NOT PULLED | Fear Inoculum cover — copyrighted. URL: https://en.wikipedia.org/wiki/Fear_Inoculum |
| 5 | 5.jpg | NOT PULLED | Undertow cover — copyrighted. URL: https://en.wikipedia.org/wiki/Undertow_(Tool_album) |
| 6 | 6.jpg | PULLED (127K) | Tool at Spodek, Katowice, Poland 2006 — CC-BY-SA concert photo. Wikimedia Commons. |
| 7 | 7.jpg | PULLED (81K) | Tool live Barcelona 2006 — CC-BY-SA concert photo. Wikimedia Commons. |
| 8 | 8.jpg | PULLED (81K) | Tool live Mannheim 2006 — CC-BY-SA concert photo. Wikimedia Commons. |
| 9 | 9.jpg | PULLED (63K) | Adam Jones (guitarist) — CC-BY-SA photo. Wikimedia Commons. |
| 10 | 10.jpg | PULLED (269K) | Alex Grey Painting 1 — CC-licensed. Wikimedia Commons. |
| 11 | 11.jpg | PULLED (436K) | Alex Grey Painting 2 — CC-licensed. Wikimedia Commons. |
| 12 | 12.jpg | PULLED (126K) | Alex Grey Painting 4 — CC-licensed. Wikimedia Commons. |
| 13 | 13.jpg | PULLED (282K) | Alex Grey portrait 2013 — CC-licensed photo. Wikimedia Commons. |
| 14 | 14.jpg | PULLED (300K) | Alex Grey portrait 2 — CC-licensed photo. Wikimedia Commons. |

**Total pulled: 9 of 14** (5 album covers not available free — use fair-use img tags with Wikipedia src in HTML)

---

## 11. NAV STRUCTURE

Sticky top nav bar (thin, dark, Cinzel labels):
```
◈ TOOL ·  [Timeline] [Bios] [Fact or Fiction] [Gallery] [◈ Sources]
```
- Background: `rgba(10,9,12,0.92)` with backdrop-filter blur(8px)
- Border-bottom: 1px solid `#4a3820`
- Scroll-spy: active section link gets `color: #e8b84b; border-bottom: 1px solid #c8922a`

Smooth scroll via `html { scroll-behavior: smooth }` + `scroll-margin-top: 72px` on sections.

---

## 12. SCROLL REVEAL

Same pattern as Ozzy: IntersectionObserver on `.reveal` class.
```css
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 700ms ease, transform 700ms ease; }
.reveal.in { opacity: 1; transform: translateY(0); }
```

---

## 13. RESPONSIVE BREAKPOINTS

| Breakpoint | Changes |
|------------|---------|
| max-width: 900px | Bios grid 1-col; gallery minmax(180px) |
| max-width: 680px | Timeline 1-col, nav collapses to hamburger or wraps |
| max-width: 480px | Hero font-size 36px; source btn padding reduced |

---

*End of Design Spec. Build from this file — do not deviate from palette or typography stack without updating this doc.*
