# redesign-plan.md
## index.html → Scrollable Single-Column Redesign Spec
### Source of truth for the installer agent. Every change listed explicitly.

---

## 0. OVERVIEW

Remove the 4-quad grid navigation system entirely. Convert all four quads into
a scrollable single-column page matching the layout pattern of `full-plan.html`.

Files involved:
- EDIT: `index.html` (the only file being changed)
- REFERENCE ONLY: `full-plan.html` (CSS/HTML pattern to match)

---

## 1. CSS CHANGES

### 1a. REMOVE — html, body root block (lines 42–45)
Current:
```css
html, body {
  height: 100%;
  overflow: hidden; /* NO scroll on root — quads handle their own scroll */
}
```
Replace with:
```css
html {
  scroll-behavior: smooth;
}
body {
  overflow-x: hidden;
}
```
Rationale: page must scroll vertically. `scroll-behavior: smooth` enables anchor scrolling.
Do NOT add `overflow: hidden` anywhere on html or body.

### 1b. REMOVE — `overscroll-behavior: none` from body block (line 52)
Current body block (lines 47–53):
```css
body {
  background: var(--bg);
  font-family: 'Exo 2', sans-serif;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  overscroll-behavior: none;
}
```
New body block (keep everything, drop the overscroll line):
```css
body {
  background: var(--bg);
  font-family: 'Exo 2', sans-serif;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}
```

### 1c. REMOVE — entire `.quad-grid` block (lines 72–76)
```css
.quad-grid {
  position: fixed;
  inset: 0;
  /* On mobile, we use a horizontal strip; JS handles showing/hiding */
}
```
Delete entirely.

### 1d. REMOVE — entire `.quad` block and all its variants (lines 78–128)
This covers:
- `.quad { ... }` (lines 78–91)
- `.quad.quad-active { ... }` (lines 93–96)
- `@media (min-width: 768px) .quad-grid { ... }` (lines 99–107)
- `@media (min-width: 768px) .quad { ... }` (lines 109–116)
- All `body.zoom-q1/q2/q3/q4` rules (lines 119–127)

Delete the entire block from line 67 comment `/* QUAD GRID — MOBILE FIRST */` through line 128 closing `}`.

### 1e. REMOVE — `.quad-label` block (lines 134–141)
```css
.quad-label {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
}
```
Delete entirely. It is replaced by `.section-header-label` (added below).

### 1f. REMOVE — entire quad nav / bottom bar / arrows / glow blocks (lines 427–499)
Selectors to delete:
- `.quad-nav { ... }` (lines 429–444)
- `.quad-nav-dots { ... }` (lines 446–450)
- `.quad-nav-dot { ... }` (lines 452–459)
- `.quad-nav-dot.active { ... }` (lines 460–465)
- `.quad-nav-arrow { ... }` (lines 467–483)
- `.quad-nav-arrow:hover { ... }` (line 483)
- `.quad-nav-arrow.glow-guide { ... }` (lines 486–493)
- `@media (min-width: 768px) { .quad-nav { display: none; } }` (lines 495–499)

Delete the entire comment block `/* NAVIGATION — BOTTOM BAR (mobile) + ARROWS (desktop) */` through line 499.

### 1g. REMOVE — `.crosshair` block (lines 666–684)
```css
.crosshair { display: none; }
@media (min-width: 768px) {
  .crosshair { display: block; position: fixed; ... }
}
```
Delete the entire section comment `/* CROSSHAIR (desktop only) */` through its closing brace.

### 1h. REMOVE — `.overview-btn` block (lines 690–713)
```css
.overview-btn { position: fixed; top: 1rem; right: 1rem; ... }
.overview-btn:hover { ... }
@media (min-width: 768px) { .overview-btn { display: none; } }
```
Delete the entire section comment `/* OVERVIEW BUTTON (mobile FAB) */` through its closing brace.

### 1i. REMOVE — `.quad-label-badge` block (lines 719–732)
```css
.quad-label-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  ...
}
```
Delete the entire section comment `/* QUAD LABEL BADGE (top left of each quad on desktop) */` through its closing brace.

### 1j. REMOVE — `@keyframes guideGlow` (lines 783–786)
```css
@keyframes guideGlow {
  0%, 100% { box-shadow: 0 0 18px rgba(245,197,66,0.4), 0 0 4px rgba(245,197,66,0.6); }
  50% { box-shadow: 0 0 30px rgba(245,197,66,0.7), 0 0 8px rgba(245,197,66,0.9); }
}
```
Delete entirely (only used by the removed glow-guide arrow).

---

### 1k. ADD — Top bar, pill nav, page wrapper, section block CSS
Insert the following CSS block AFTER the existing `/* KEYFRAMES */` section and BEFORE the closing `</style>` tag (around line 794):

```css
/* ============================================================
   TOP BAR
   ============================================================ */
.top-bar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 54px;
  background: rgba(14,15,30,0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  z-index: 500;
}
.top-bar-title {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.top-bar-title span { color: var(--primary); }


/* ============================================================
   SECTION PILL NAV
   ============================================================ */
.section-pill-nav {
  position: sticky;
  top: 54px;
  z-index: 400;
  background: rgba(14,15,30,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.section-pill-nav::-webkit-scrollbar { display: none; }
.pill-nav-btn {
  flex-shrink: 0;
  font-family: 'Exo 2', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(77,80,156,0.08);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.pill-nav-btn:hover,
.pill-nav-btn.active {
  background: rgba(77,80,156,0.25);
  border-color: var(--primary);
  color: var(--text);
}


/* ============================================================
   PAGE CONTENT WRAPPER
   ============================================================ */
.page-content {
  max-width: 760px;
  margin: 0 auto;
  padding: 5rem 1.25rem 4rem;
}


/* ============================================================
   SECTION BLOCKS
   ============================================================ */
.section-block {
  margin-bottom: 2.5rem;
  position: relative;
}
.section-anchor {
  scroll-margin-top: 120px;
}
.section-header-label {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 0.35rem;
}
.section-h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 1rem;
}
```

---

### 1l. KEEP — all of the following CSS (do not touch)
- `:root` design tokens (lines 16–34)
- `*, *::before, *::after` reset (line 40)
- `body::after` grain overlay (lines 55–64)
- `.scout-receipt` and all receipt classes (lines 147–191)
- All button classes: `.hiw-btn`, `.fullplan-btn`, `.platform-banner-grid`, `.platform-banner`, `.platform-icon`, `.submit-btn`, `.deal-card`, `.deal-split`, `.deal-pct`, `.cta-btn` (lines 196–367)
- `.step-spine`, `.step-card`, `.step-num-bubble`, `.step-title`, `.step-desc` (lines 371–421)
- `#hiw-overlay` and all `.hiw-modal*` classes (lines 505–631)
- `.avi-girl` and its variants (lines 637–660)
- `.helper-text`, `.fine-print` (lines 738–749)
- `.eyebrow` (lines 754–761)
- `@keyframes blurIn`, `@keyframes floatCTA`, `@keyframes stepGlow`, `@keyframes glowPulse` (lines 767–793)
- `.glow-pulse-slow` utility class (line 793)

---

## 2. HTML CHANGES

### 2a. REMOVE from `<body>` — entire quad-grid structure
Delete from:
```html
<!-- ── Background watermark ── -->
<div aria-hidden="true" style="position:fixed;inset:0;background-image:url('https://...
```
...through the closing:
```html
</div>  <!-- closes .quad-grid -->
```
(Lines 799–1030 in original file — this removes the watermark div, the entire `#quadGrid` div, and all four quad divs: `#quad-1`, `#quad-2`, `#quad-3`, `#quad-4`.)

### 2b. REMOVE from `<body>` — crosshair ornament (line 1129)
```html
<!-- ── Crosshair ornament (desktop) ── -->
<div class="crosshair" aria-hidden="true"></div>
```
Delete entirely.

### 2c. REMOVE from `<body>` — bottom navigation (lines 1132–1141)
```html
<nav class="quad-nav" id="quadNav" aria-label="Section navigation">
  <button class="quad-nav-arrow" id="zoomPrev" ...>&#8592;</button>
  <div class="quad-nav-dots" role="tablist">
    <div class="quad-nav-dot active" ...></div>
    <div class="quad-nav-dot" ...></div>
    <div class="quad-nav-dot" ...></div>
    <div class="quad-nav-dot" ...></div>
  </div>
  <button class="quad-nav-arrow zoom-next" id="zoomNext" ...>&#8594;</button>
</nav>
```
Delete entirely.

### 2d. REMOVE from `<body>` — overview FAB (line 1144)
```html
<button class="overview-btn" id="overviewBtn" aria-label="Overview">&#8862;</button>
```
Delete entirely.

### 2e. INSERT — new body structure
Replace everything that was deleted in steps 2a–2d with the following HTML block.
Insert it directly after `<body>` and before `<!-- ═══ HOW IT WORKS MODAL ═══ -->`.

```html
<!-- ── Top Bar ── -->
<header class="top-bar">
  <div class="top-bar-title">ANTI GRAVITY MUSIC &middot; <span>ARTIST ONBOARDING</span></div>
  <div style="width:60px;"></div>
</header>

<!-- ── Pill Nav ── -->
<nav class="section-pill-nav" id="pillNav">
  <button class="pill-nav-btn active" onclick="scrollToSection('sec-scouted', this)">Scouted</button>
  <button class="pill-nav-btn" onclick="scrollToSection('sec-steps', this)">How It Works</button>
  <button class="pill-nav-btn" onclick="scrollToSection('sec-song', this)">Your Song</button>
  <button class="pill-nav-btn" onclick="scrollToSection('sec-deal', this)">Your Deal</button>
</nav>

<!-- ── Page Content ── -->
<div class="page-content">

  <!-- ═══ SECTION 1: YOU WERE SCOUTED (from Q1) ═══ -->
  <div class="section-anchor" id="sec-scouted"></div>
  <div class="section-block">

    <div class="section-header-label">Anti Gravity Music &middot; A&amp;R Division</div>

    <img class="avi-girl right"
      src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Purple_Haired_Anime_Girl.svg"
      alt="" onerror="this.style.display='none'">

    <div class="eyebrow">Anti Gravity Music &middot; A&amp;R Division</div>

    <div class="scout-receipt glow-pulse-slow">
      <div class="receipt-hero">YOU WERE SCOUTED</div>
      <div class="receipt-sub">Direct Invite &middot; Exclusive Access</div>

      <div class="receipt-row">
        <span class="receipt-label">Platform Found On</span>
        <span class="receipt-value">VRChat &mdash; Karaoke World</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Scout</span>
        <span class="receipt-value accent">Miles &mdash; A&amp;R Lead</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Invite Type</span>
        <span class="receipt-value accent">Exclusive &middot; Direct Scout</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Acceptance Rate</span>
        <span class="receipt-value cyan">Fewer than 1 in 200 performers</span>
      </div>
    </div>

    <button class="hiw-btn" id="hiwBtn" style="margin-top:1rem;">How It Works &#9662;</button>
    <button class="fullplan-btn" id="fullPlanBtn">Shortcut to the Full Plan &rarr;</button>

  </div>

  <!-- ═══ SECTION 2: HOW IT WORKS (from Q2) ═══ -->
  <div class="section-anchor" id="sec-steps"></div>
  <div class="section-block">

    <div class="section-header-label">The Journey</div>
    <h2 class="section-h2">How It Works</h2>

    <img class="avi-girl right" style="opacity:0.08;"
      src="https://openclipart.org/download/98917/girlwithheadphone5.svg"
      alt="" onerror="this.style.display='none'">

    <div class="step-spine">

      <div class="step-card" data-step="1">
        <div class="step-num-bubble">01</div>
        <div>
          <div class="step-title">Scout Discovery</div>
          <div class="step-desc">Miles hears you perform live in VRChat</div>
        </div>
      </div>

      <div class="step-card" data-step="2">
        <div class="step-num-bubble">02</div>
        <div>
          <div class="step-title">Direct Outreach</div>
          <div class="step-desc">You receive this personal invite link</div>
        </div>
      </div>

      <div class="step-card" data-step="3">
        <div class="step-num-bubble">03</div>
        <div>
          <div class="step-title">First Conversation</div>
          <div class="step-desc">One call &mdash; no contracts, just vibes</div>
        </div>
      </div>

      <div class="step-card" data-step="4">
        <div class="step-num-bubble">04</div>
        <div>
          <div class="step-title">Song Selection</div>
          <div class="step-desc">You pick your best existing track</div>
        </div>
      </div>

      <div class="step-card" data-step="5">
        <div class="step-num-bubble">05</div>
        <div>
          <div class="step-title">Production Begins</div>
          <div class="step-desc">Miles builds the full track from scratch in Ableton</div>
        </div>
      </div>

      <div class="step-card" data-step="6">
        <div class="step-num-bubble">06</div>
        <div>
          <div class="step-title">You Send Your Vocal</div>
          <div class="step-desc">Clean WAV, any mic, quiet room</div>
        </div>
      </div>

      <div class="step-card" data-step="7">
        <div class="step-num-bubble">07</div>
        <div>
          <div class="step-title">Mix &amp; Master</div>
          <div class="step-desc">Final mix, mastered and ready for distribution</div>
        </div>
      </div>

      <div class="step-card" data-step="8">
        <div class="step-num-bubble">08</div>
        <div>
          <div class="step-title">Distribution</div>
          <div class="step-desc">Pushed to Spotify, Apple Music, 40+ platforms</div>
        </div>
      </div>

      <div class="step-card" data-step="9">
        <div class="step-num-bubble">09</div>
        <div>
          <div class="step-title">Revenue Share</div>
          <div class="step-desc">50/50 split, every dollar, automated payout</div>
        </div>
      </div>

    </div><!-- end .step-spine -->
  </div>

  <!-- ═══ SECTION 3: PICK YOUR SONG (from Q3) ═══ -->
  <div class="section-anchor" id="sec-song"></div>
  <div class="section-block">

    <div class="section-header-label">Step 04</div>
    <h2 class="section-h2">Pick Your Song</h2>

    <img class="avi-girl right" style="opacity:0.1;"
      src="https://openclipart.org/download/305525/1534984810.svg"
      alt="" onerror="this.style.display='none'">

    <div class="platform-banner-grid">

      <div class="platform-banner" data-platform="youtube" onclick="selectPlatform(this,'youtube')">
        <div class="platform-icon" style="background:#ff0000;color:#fff;">&#9654;</div>
        <div>
          <div class="platform-name">YouTube</div>
          <div class="platform-hint">youtube.com/watch?v=...</div>
        </div>
      </div>

      <div class="platform-banner" data-platform="spotify" onclick="selectPlatform(this,'spotify')">
        <div class="platform-icon" style="background:#1ed760;color:#000;">&#9835;</div>
        <div>
          <div class="platform-name">Spotify</div>
          <div class="platform-hint">open.spotify.com/track/...</div>
        </div>
      </div>

      <div class="platform-banner" data-platform="apple" onclick="selectPlatform(this,'apple')">
        <div class="platform-icon" style="background:#fc3c44;color:#fff;">&#9834;</div>
        <div>
          <div class="platform-name">Apple Music</div>
          <div class="platform-hint">music.apple.com/...</div>
        </div>
      </div>

      <div class="platform-banner" data-platform="soundcloud" onclick="selectPlatform(this,'soundcloud')">
        <div class="platform-icon" style="background:#ff5500;color:#fff;">&#9729;</div>
        <div>
          <div class="platform-name">SoundCloud</div>
          <div class="platform-hint">soundcloud.com/artist/...</div>
        </div>
      </div>

    </div>

    <div class="song-input-wrap">
      <input class="song-input" id="songUrl" type="url"
        placeholder="Paste your track URL here..."
        oninput="validateSongURL(this.value)"
        autocomplete="off" autocorrect="off" spellcheck="false">
      <button class="submit-btn" id="submitSong" onclick="confirmSong()">Submit &rarr;</button>
    </div>

    <p class="helper-text">Any platform works &mdash; paste the link above</p>

  </div>

  <!-- ═══ SECTION 4: YOUR DEAL (from Q4) ═══ -->
  <div class="section-anchor" id="sec-deal"></div>
  <div class="section-block">

    <div class="section-header-label">Revenue Share Agreement</div>
    <h2 class="section-h2">Your Deal</h2>

    <img class="avi-girl left" style="opacity:0.1;"
      src="https://openclipart.org/download/193072/Tra-la-la.svg"
      alt="" onerror="this.style.display='none'">

    <div class="deal-card glow-pulse-slow">
      <div class="deal-split">
        <div>
          <div class="deal-pct you">50%</div>
          <div class="deal-label">You</div>
        </div>
        <div class="deal-divider"></div>
        <div>
          <div class="deal-pct them">50%</div>
          <div class="deal-label">Anti Gravity</div>
        </div>
      </div>
      <div class="deal-sub">Every stream. Every platform. Automated.</div>
      <div class="deal-pill">PayPal &middot; Bank Transfer &middot; 15th of month &middot; No invoices</div>
    </div>

    <button class="cta-btn" id="beginBtn" onclick="beginJourney()">Begin Your Journey &rarr;</button>

    <p class="fine-print">Reviewing your invite is free. The agreement comes after your first conversation with Miles.</p>

  </div>

</div><!-- end .page-content -->
```

**Note on `.avi-girl` inside `.section-block`:**
The `.avi-girl` images use `position: absolute`. Since `.section-block` now has `position: relative` (added in the new CSS block 1k), the girls will anchor to each section card correctly, same visual effect as before.

---

## 3. JS CHANGES

### 3a. REMOVE — entire Quad Navigation System block (lines 1150–1184)
Delete from comment `// QUAD NAVIGATION SYSTEM` through the closing of `showQuad()`:
```js
const QUADS = [ ... ];
let currentQuad = 0;
const DESKTOP_BP = 768;
function isDesktop() { ... }
function showQuad(index) { ... }
function nextQuad() { ... }
function prevQuad() { ... }
```

### 3b. REMOVE — Nav Dots block (lines 1197–1200)
```js
function updateNavDots(index) {
  document.querySelectorAll('.quad-nav-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}
```
Delete entirely.

### 3c. REMOVE — Arrow Glow Guide block (lines 1208–1216)
```js
function updateArrowGlow(index) {
  const nextBtn = document.getElementById('zoomNext');
  if (!nextBtn) return;
  if (index === 0) {
    nextBtn.classList.add('glow-guide');
  } else {
    nextBtn.classList.remove('glow-guide');
  }
}
```
Delete entirely.

### 3d. REMOVE — Touch Swipe block (lines 1294–1310)
```js
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', e => { ... }, { passive: true });
document.addEventListener('touchend', e => { ... }, { passive: true });
```
Delete entirely.

### 3e. REMOVE — Resize handler block (lines 1329–1332)
```js
window.addEventListener('resize', () => {
  showQuad(currentQuad);
});
```
Delete entirely.

### 3f. MODIFY — DOMContentLoaded block (lines 1337–1370)
Replace the entire `window.addEventListener('DOMContentLoaded', ...)` block with this cleaned version:

```js
window.addEventListener('DOMContentLoaded', () => {
  // Button bindings
  document.getElementById('hiwBtn')?.addEventListener('click', hiwModalOpen);
  document.getElementById('fullPlanBtn')?.addEventListener('click', openFullPlan);
  document.getElementById('hiwModalClose')?.addEventListener('click', hiwModalClose);
  document.getElementById('beginBtn')?.addEventListener('click', beginJourney);
  document.getElementById('submitSong')?.addEventListener('click', e => {
    e.preventDefault();
    confirmSong();
  });

  // Click outside modal body to close
  document.getElementById('hiw-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'hiw-overlay') hiwModalClose();
  });

  // Step cards → open modal
  document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('click', e => {
      e.stopPropagation();
      hiwModalOpen();
    });
  });
});
```

Changes from original:
- REMOVED: `setTimeout(() => showQuad(0), 300)` — no quad to show
- REMOVED: `zoomNext` and `zoomPrev` button bindings
- REMOVED: nav dot bindings loop
- KEPT: hiwBtn, fullPlanBtn, hiwModalClose, beginBtn, submitSong
- KEPT: click-outside-modal handler
- KEPT: step-card click handlers

### 3g. MODIFY — keyboard handler (lines 1315–1324)
Replace the keyboard handler with a cleaner version that only handles modal:

```js
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const modalOpen = document.getElementById('hiw-overlay')?.classList.contains('active');
    if (modalOpen) hiwModalClose();
  }
});
```

Changes from original:
- REMOVED: `if (e.key === 'ArrowRight') nextQuad()`
- REMOVED: `if (e.key === 'ArrowLeft') prevQuad()`
- KEPT: Escape → hiwModalClose()

### 3h. MODIFY — `confirmSong()` function (lines 1265–1282)
The original `confirmSong()` calls `showQuad(3)` after success — replace that with a scroll to `#sec-deal`:

Original line to change:
```js
setTimeout(() => {
  showQuad(3); // go to deal quad
}, 800);
```
Replace with:
```js
setTimeout(() => {
  scrollToSection('sec-deal');
}, 800);
```

### 3i. ADD — scrollToSection function
Add this function directly after the `// FULL PLAN NAVIGATION` block (after `openFullPlan()`):

```js
// ══════════════════════════════════════════
// SCROLL TO SECTION (pill nav)
// ══════════════════════════════════════════
function scrollToSection(id, btn) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  if (btn) {
    document.querySelectorAll('.pill-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}
```

### 3j. KEEP — these functions entirely unchanged
- `hiwModalOpen()` (lines 1221–1224)
- `hiwModalClose()` (lines 1226–1229)
- `openFullPlan()` (lines 1234–1236)
- `selectPlatform()` (lines 1243–1247)
- `validateSongURL()` (lines 1249–1263)
- `beginJourney()` (lines 1287–1289)

---

## 4. PRESERVED CONTENT MAPPING

| Original Location | New Location | Notes |
|---|---|---|
| `#quad-1` inner content | `#sec-scouted` `.section-block` | eyebrow, receipt card, both buttons. Remove `height:100%;justify-content:center` wrapper div — let block flow naturally |
| `#quad-2` inner content | `#sec-steps` `.section-block` | `.step-spine` div with all 9 cards. Remove `height:100%;padding-top:2rem` wrapper div |
| `#quad-3` inner content | `#sec-song` `.section-block` | platform grid, url input, helper text. Remove `height:100%;justify-content:center` wrapper div |
| `#quad-4` inner content | `#sec-deal` `.section-block` | deal card + CTA button + fine print. Remove `height:100%;justify-content:center` wrapper div |
| `#hiw-overlay` modal | Stays in `<body>` as-is | position:fixed, works anywhere in DOM |
| `.avi-girl` images | Move into each `.section-block` | Works because `.section-block` is `position:relative` |
| `.quad-label-badge` divs | REPLACED by `.section-header-label` + `<h2 class="section-h2">` | New heading pattern for each section |
| Background watermark `<div>` | REMOVE | Noise grain is in `body::after`, this is redundant |

---

## 5. RISK FLAGS

### Critical
1. **`overflow: hidden` on `html, body` must be fully removed.** Both the `overflow: hidden` comment-noted line AND the `overscroll-behavior: none` line must go. If either remains, the page will not scroll.

2. **`confirmSong()` calls `showQuad(3)` — this WILL throw a ReferenceError** after quad functions are removed. Installer must change this to `scrollToSection('sec-deal')` per step 3h above. Do not skip this.

3. **`setTimeout(() => showQuad(0), 300)` in DOMContentLoaded** — same issue. Remove this line. There is no quad 0 in the scroll layout.

4. **Keyboard `ArrowRight`/`ArrowLeft` bindings call `nextQuad()`/`prevQuad()`** — both removed functions. Remove these two lines from the keyboard handler per step 3g.

### Structural
5. **Wrapper div pattern in each quad:** Each quad's content was wrapped in `<div style="position:relative;z-index:1;display:flex;flex-direction:column;height:100%;...">`. This `height:100%` will have no meaning in scroll layout. Remove this wrapper div entirely in each section and let its children be direct children of `.section-block`.

6. **`.step-spine` had `overflow-y: auto; flex: 1`** — these are quad-specific. In scroll layout, `flex: 1` does nothing useful and `overflow-y: auto` is harmless but unnecessary. The installer may leave them; they won't break anything. Or clean them: remove `flex: 1` and `overflow-y: auto` from `.step-spine`.

7. **`.avi-girl` uses `position: absolute`** — requires `.section-block` to be `position: relative`. The new CSS (step 1k) adds `position: relative` to `.section-block`. Confirm this is present before testing.

### Minor
8. **`.glow-pulse-slow` on `.scout-receipt`** — animation class stays, works fine in scroll layout.

9. **`.crosshair` HTML element** at line 1129 — only 1 line, easy to miss. Must be deleted.

10. **`#overviewBtn` HTML element** at line 1144 — must be deleted alongside `#quadNav`.

11. **`data-quad` attributes on nav dots** — these HTML elements are fully deleted, so no orphan attributes to worry about.

12. **`id="quadGrid"` div** — fully deleted in step 2a. No JS references this after the quad system is removed.

---

## 6. FILE EDIT ORDER (recommended for installer)

1. Open `index.html` in editor
2. Make CSS removals (sections 1c through 1j) — work top to bottom
3. Make CSS additions (section 1k) — paste block before `</style>`
4. Make CSS modifications (sections 1a, 1b) — fix html/body rules
5. Make HTML body changes (sections 2a–2d) — delete old structure
6. Insert new HTML body (section 2e) — paste new structure
7. Make JS changes (sections 3a–3h) — remove quad functions, fix confirmSong, fix keyboard handler
8. Add `scrollToSection()` function (section 3i)
9. Save and test in browser — verify scroll, pill nav, modal open/close, song submit → scroll to deal

---

## 7. VALIDATION CHECKLIST

After install, verify:
- [ ] Page scrolls vertically on both mobile and desktop
- [ ] Top bar is fixed at top on scroll
- [ ] Pill nav sticks below top bar on scroll
- [ ] Clicking a pill nav button scrolls to correct section
- [ ] "How It Works" button opens the modal overlay
- [ ] Escape key or X button closes the modal
- [ ] Clicking outside modal body closes it
- [ ] Step cards (09 items) click to open the modal
- [ ] Platform banner selection works (click → highlights)
- [ ] Song URL input auto-selects platform banner on paste
- [ ] Submit Song button changes to success state, then scrolls to #sec-deal
- [ ] "Shortcut to the Full Plan" opens full-plan.html in new tab
- [ ] "Begin Your Journey" opens full-plan.html in new tab
- [ ] No JS errors in browser console (especially no ReferenceError for showQuad/nextQuad/prevQuad)
- [ ] Anime girl images appear (faded, absolute positioned within their sections)
- [ ] `.glow-pulse-slow` animation fires on receipt card and deal card
