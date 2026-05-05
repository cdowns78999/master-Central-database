# Fix: Columns (Tile Grids) Not Showing on Load

## Problem
The new `index.html` hides the Quick Links and Tools tile grids by default.
The old `wing-menu-dashboard copy 3.html` shows them on load — that's the look we want.

## Root Cause — 3 things flipped

| What | OLD (working) | NEW (broken) |
|------|---------------|--------------|
| **HTML markup** | `<div class="tile-grid">` — no hidden class | `<div class="tile-grid tiles-hidden">` — starts hidden |
| **JS default** | `let starOpen = false` — star card closed on load | `let starOpen = true` — star card open on load |
| **Star card CSS** | `.star-card { max-height: 0; }` — hidden default, `.star-card.open` reveals | `.star-card { max-height: 500px; }` — visible default, `.star-card.paused` hides |

The new version ships with star mode ON and tiles hidden. We need star mode OFF and tiles visible — matching the old version's behavior.

## Fix — 4 changes

### 1. HTML: Remove `tiles-hidden` from tile grids (line ~2700-2738)
```html
<!-- BEFORE -->
<div class="center-section-header tiles-hidden">Quick Links</div>
<div class="tile-grid tiles-hidden">

<!-- AFTER -->
<div class="center-section-header">Quick Links</div>
<div class="tile-grid">
```
Same for the Tools section below it.

### 2. CSS: Star card starts hidden (paused), not visible
```css
/* BEFORE — star card visible by default */
.star-card {
    max-height: 500px;
    opacity: 1;
    transform: scale(1) translateZ(0.1px);
    ...
}
.star-card.paused {
    max-height: 0;
    opacity: 0;
    ...
}

/* AFTER — star card hidden by default (add .paused in HTML) */
/* CSS stays the same, just add class="star-card paused" in HTML */
```

### 3. HTML: Star card starts with `paused` class (line ~2679)
```html
<!-- BEFORE -->
<div class="star-card" id="starCard">

<!-- AFTER -->
<div class="star-card paused" id="starCard">
```

### 4. JS: Flip starOpen default to false (line ~3249)
```js
// BEFORE
let starOpen = true;

// AFTER
let starOpen = false;
```

## What stays the same
- All new features (drop zone, POS, AI tool overlays, pill style cycler) stay
- The toggle logic stays — clicking the star button still flips between star mode and tile mode
- Wing pill interactivity rules stay (star-active / star-paused classes)
- All CSS for tiles, grids, minimal mode, etc. unchanged

## Result
On load: tiles visible (4-column grid), star card hidden, wings passive.
Click star: tiles hide, star card (drop zone) opens, wings become draggable.
Click star again: back to tiles.
