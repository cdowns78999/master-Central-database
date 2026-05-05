# Engine Running — Research & Build Reference

## What This File Is
Source of truth for the Engine Running HTML build. Everything below was pulled from 8 searches (CodePen, GitHub, UX articles, dashboard implementations) and filtered down to ONLY what applies to us.

---

## The Goal
A live-refresh HTML page that runs in the browser while Claude works. It shows:
- What step is happening right now
- A contextual, human-readable description of what changed
- Animated card tiles that cycle — catching your eye, entertaining, educating
- A running Dewey-decimal log of every micro-action

It's a Sims loading screen meets a train station departure board meets a control room monitor.

---

## Best Patterns We're Using

### 1. Card Stack Shuffle (from CodePen: dana-ciocan, wbarlow, edmundojr)
- 4 cards stacked with slight offset (2-3px translate + rotateZ)
- Top card lifts, fades, slides to back — next card becomes top
- Pure CSS: `@keyframes` with `opacity`, `translateY`, `rotateZ`, `scale`
- Cycle time: 6-8 seconds per card (slow enough to read, fast enough to feel alive)
- Each card has: icon (emoji or SVG), title line, 1-sentence body text
- Cards contain contextual tips, step facts, system notes — not decoration

### 2. Skeleton Shimmer (from UX research: pencilandpaper.io)
- Moving gradient shimmer on placeholder zones = "something is happening"
- Reduces perceived wait time by ~40% vs blank/spinner
- We use this on the status bar zone while Claude is between updates
- CSS: `background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)` animated with `translateX`

### 3. Pulse Beacon (from SpinKit + loading.io patterns)
- Small dot or ring that pulses in the header = "engine is on"
- LOADING mode: orange pulse (work happening)
- WAITING mode: amber slow breathe (idle, standing by)
- CSS: `@keyframes pulse { 0%,100% { opacity:0.4; scale:0.9 } 50% { opacity:1; scale:1.1 } }`

### 4. Status Bar with Contextual Messages (from UX writing research)
- 3 text fields Claude edits directly via Edit tool:
  - `statusPhase` — the current phase label (e.g. "BUILDING", "SCANNING", "LOGGING")
  - `statusMessage` — 1-line human summary (e.g. "Writing the Gmail scrape tool")
  - `statusNotes` — optional detail line (e.g. "oauth2 flow, thread pull, JSON export")
- These sit between markers: `<!-- STATUS-START -->` / `<!-- STATUS-END -->`
- Claude finds and replaces content between markers with Edit tool

### 5. Dewey Decimal Log (from dashboard tile patterns)
- Scrollable log zone at the bottom
- Each entry: `[001.01]  12:34  Built gmail-scrape.py — OAuth2 thread puller`
- Dewey format: `[JOB.STEP]` — e.g. `[001.01]` = Job 1, Step 1
- Claude appends between `<!-- DEWEY-START -->` and `<!-- DEWEY-END -->`
- Counter in header shows total entries
- Auto-scrolls to bottom on refresh

### 6. Auto-Refresh (from meta tag + dashboard best practices)
- `<meta http-equiv="refresh" content="30">` — every 30 seconds
- No JS polling, no WebSocket — just a file on disk that the browser re-reads
- Claude edits the file → browser picks it up on next refresh cycle
- Clean, zero-dependency, works offline

---

## What We're NOT Doing
- No external libraries or CDNs (except Google Fonts to match railroad panel)
- No complex JS frameworks
- No WebSocket or server — it's a local file
- No video or heavy assets
- No interactive buttons (this is a display, not a control)

---

## Card Content Strategy
The 4 cycling cards aren't random — they rotate through these categories:

| Slot | Category | Example |
|------|----------|---------|
| 1 | Current Action | "Building OAuth2 flow for Gmail thread pull" |
| 2 | Step Context | "Step 1 of 4 in Comms Scrape — gathering raw data" |
| 3 | System Fact | "112 total steps across 16 jobs — 4 done so far" |
| 4 | Tip / Insight | "Green sheets track every file created per job" |

Claude updates card content via Edit tool between `<!-- CARD-1-START -->` / `<!-- CARD-1-END -->` markers (same pattern for cards 2-4).

---

## The Companion Script (Python)

### Purpose
Generate the contextual status text that goes INTO the HTML. Claude calls this script, it reads current railroad state, and outputs practical descriptions.

### How It Works
1. Reads `railroadState` from `railroad-control-panel.html` (parses the JS object)
2. Knows current section, step, step title, type (claude/chad)
3. Generates:
   - `statusPhase` — derived from step type and position
   - `statusMessage` — plain English sentence about what's happening
   - `statusNotes` — technical detail line
   - 4 card texts — contextual to current step
   - Dewey log entry — formatted `[JOB.STEP] HH:MM description`
4. Outputs a JSON blob that Claude reads and applies to the HTML via Edit

### Why a Script
- Consistent formatting every time (no drift)
- Reads real state (not guessing)
- Claude calls it, reads output, pastes into HTML — clean partnership
- Can be extended later without touching the HTML

### File
`ADMIN/tools/engine-status-writer.py`

---

## CSS Theme (Matching Railroad Control Panel)

```css
:root {
    --lamp-deep: #c2560a;
    --lamp-mid: #e07b2e;
    --lamp-warm: #f2a54a;
    --lamp-soft: #f8c97d;
    --lamp-glow: #fde8c8;
    --white: #ffffff;
    --text: #3b1a04;
    --text-dim: rgba(59, 26, 4, 0.55);
}
font-family: 'Outfit', sans-serif;
monospace: 'JetBrains Mono';
accent: 'Press Start 2P' (for mode badge only);
```

Background: same radial gradient stack as control panel.
Zones: same `rgba(255,255,255,0.92)` glass cards with white border + shadow.

---

## Sources

### CodePen
- [Card Stack Loading Animation](https://codepen.io/wbarlow/pen/GgRVqz)
- [CSS Animated Cards Carousel](https://codepen.io/edmundojr/pen/eNPJVW)
- [CSS Stack of Cards with Shuffle](https://codepen.io/dana-ciocan/pen/WNzYGqG)
- [Animated Glowing Loading Screen with Status Messages](https://codepen.io/nikhil-keolan-gounden/pen/ZYGwowX)
- [Dashboard Tiles](https://codepen.io/brill28/pen/gmwmyd)
- [Dashboard Info Panels with Animation](https://codepen.io/weisler/pen/MWYOEmj)

### GitHub
- [SpinKit — CSS Loading Indicators](https://github.com/tobiasahlin/SpinKit)
- [css-cards-animation — Stacked Card List](https://github.com/simonrousseau/css-cards-animation)
- [loading.css — 40+ CSS Loader Animations](https://github.com/loadingio/loading.css)
- [Uptime Robot Wallboard — Auto-Refresh Dashboard](https://github.com/BlindTrevor/Uptime-Robot-Wallboard)
- [Dashboard Tiles Gist](https://gist.github.com/justsml/dcc787630a86a5a1eca7)

### UX / Design Articles
- [UX Design Patterns for Loading — Pencil & Paper](https://www.pencilandpaper.io/articles/ux-pattern-analysis-loading-feedback)
- [CSS Loading Animations — HubSpot](https://blog.hubspot.com/website/css-loading-animation)
- [Motion UI Trends 2026](https://lomatechnology.com/blog/motion-ui-trends-2026/2911)
- [31 SaaS Loading Screen Examples](https://www.saasframe.io/categories/loading-screen)
