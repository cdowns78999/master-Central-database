# Sample Pack Template

A starter scaffold for a music-industry-knowledge style app with **buttery smooth** navigation.

## What this is

- Fixed left **sidebar** with click-to-activate categories
- Fixed **top bar** showing the active category
- **Theme slider** (4 preset themes, top-right dots)
- **Main content area** that swaps in place with a fade + translateY transition
- **Floating action button** slot (bottom-right)
- Animated **active pill** that slides between nav items
- All transitions use `cubic-bezier(0.22, 1, 0.36, 1)` at ~300ms for that glossy feel

## Files

- `index.html` — layout scaffold (sidebar, topbar, main, FAB, theme dots)
- `app.js` — sidebar builder + content swap logic + theme/FAB wiring
- `style.css` — dark theme, smooth transitions, card grid, responsive

## How to swap data

Open `app.js` and replace the `SAMPLE_CATEGORIES` array at the top. Each item needs:

```js
{
  id: 'unique-slug',   // used for element ids + state
  label: 'XX',         // 2-char sidebar label
  title: 'Full Title', // shown in topbar + content
  accent: '#hexcolor', // drives active pill + eyebrow color
  blurb: 'short text'  // content body (or replace renderContent)
}
```

To customize the **content body** beyond blurbs, edit the `renderContent(cat)` function in `app.js` — everything inside `swap.innerHTML = ...`.

## Preview locally

```bash
cd "sample-pack-template" && python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

---

## 5 Organization Approaches

Five ways to organize "sample pack" content. Each keeps the buttery sidebar pattern intact — only the content area changes.

### 1. Flat list of samples
One long scrollable list inside the content area with generous row spacing and hover accents. Best when you have **under ~40 items** and want zero friction — users scan top to bottom, no clicks needed. Pair with sticky letter/number anchors if the list grows.

### 2. Grouped by category (folders)
Matches the current scaffold — sidebar acts as folder tabs, content shows that folder's samples as a card grid. Use when content has **clear, mutually exclusive categories** (e.g., Overview, History, Tools, Glossary). This is the default workhorse pattern.

### 3. Grouped by mood/vibe with swatch colors
Each group gets a colored swatch header and cards inherit a faint tinted background matching that vibe. Use for **emotion-driven or aesthetic-driven** content (genres, moods, eras) where users browse by feel, not taxonomy. Makes visual recall strong.

### 4. Timeline / chronological
Vertical timeline with a center spine and alternating left/right cards, or a horizontal scrub bar up top that filters the grid below. Best when **order matters** — history, release chronology, case studies by year. Users naturally understand "earlier = top / left."

### 5. Tag-based with filter chips
A horizontal row of tag chips above the content grid; clicking chips toggles filters (AND or OR), and the grid animates to match. Best when **items have multiple overlapping attributes** (e.g., a tool is also a DAW, also free-tier, also cross-platform) and users want to slice rather than drill.

### Bonus options if none fit

- **6. Kanban columns** — drag between stages. Good for pipelines and workflows.
- **7. Map / spatial canvas** — pan-and-zoom, items placed spatially. Good when relationships matter more than linear order.
- **8. Dual-pane master-detail** — list on left of content area, rich detail on right. Good for reference material with heavy per-item content.
