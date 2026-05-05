---
name: cal-card
description: Artist project dashboard builder — guided menu with workflow presets or custom layouts
---

# cal-card

Build a Cal Card (artist project dashboard) using a guided terminal menu.

## Usage

```
/cal-card
```

## Instructions

IMPORTANT: Use the AskUserQuestion tool for ALL menu selections. Use minimal ASCII headers for context between steps. Keep it clean, scannable, and easy on the eyes.

### Step 0: Read Config
- Read `C:\Users\chad\.claude\skills\cal-card\config.md` for all paths

### Reference Data
- `C:\Users\chad\.claude\skills\cal-card\hub-reference.html` — Critical Mapper hub snapshot
  - Contains all tool URLs, labels, colors, and layout structure
  - Sales Funnel, Spotify Tools, Utilities sections
  - Read this file when you need tool URLs or hub context
- `C:\Users\chad\.claude\skills\cal-card\select-pill.html` — Reusable select-pill CSS + JS
  - Copy this CSS into `<style>` and JS into `<script>` for any card with selectable pills
  - Includes usage examples for call time groups and budget buttons

### Step 1: Greet + Ask Artist Name
Print this header, then ask in plain text:
```
  ─── cal card ───────────────────────
```
Then say: "artist name?"
Wait for response. This fills {ARTIST_NAME} everywhere.

### Step 2: Ask Mode
Print this header:
```
  ─── {ARTIST_NAME} ──────────────────
```
Then use **AskUserQuestion** with these options:
- Question: "What are we building?"
- Options:
  1. "Onboard" — description: "fast-1 · name + call times → done. all copy pre-built"
  2. "Quick Client Set Up" — description: "cal-1 · guided 5-tile onboard with auto-dates"
  3. "Recap of Call" — description: "task-2 · paste notes, I organize into tiles"
  4. "Detailed Direction" — description: "paste structured notes with tiles, sub-items + tool links"
  5. "Epic Pretty" — description: "chad-5 · 3D glass buttons, hub-matched dots, shimmer + blue hover"
  6. "Custom Card" — description: "you tell me tiles + content, task or calendar layout"

### Step 3: Backup
- Copy the base template to the backup folder with today's date:
  ```
  cp "<base-template>" "<backup-folder>/MM-DD-YYYY -- chad43 - 🚧Complete 🚧"
  ```
- Print:
  ```
    ✓ backup saved
  ```

---

## Workflow 0: fast-1-onboard (FASTEST)

The entire card is pre-written. Only {ARTIST_NAME}, call times, and dates change.

Print header:
```
  ─── {ARTIST_NAME} · onboard ────────
```

**Step A:** Say: "Paste call times:"

Wait for user to paste call times. Parse ONLY the open/available times — skip any marked closed/unavailable.

**Step B:** Calculate dates from today's date:
- {D1} = today + 1 day, format `[M/DD]`
- {D2} = today + 2 days
- {D3} = today + 3 days

**Step C:** Build the card immediately using this locked template. NO questions asked — go straight to preview.

### Locked tile content:

**OVERVIEW tiles** (short preview text):

| Tile | Title | Sub |
|------|-------|-----|
| 1 | Send your project | Send via DMs or email |
| 2 | {D1} Choose call time | Select a time that works for you |
| 3 | {D1} Review proposal | We send 3–4 tailored options |
| 4 | {D2} Set budget | Pick your tier below |
| 5 | {D3} Launch campaign | We go live when you're ready |

**DETAILS blocks** (expanded content):

| Tile | Title | Detail |
|------|-------|--------|
| 1 | Send your project | `sub-pill` → Send your music or project files via DMs or email |
| 2 | {D1} Choose call time | `select-pill` → Each open time as a selectable pill, grouped by Morning / Evening with `time-group-label` headers |
| 3 | {D1} Review proposal | `sub-pill` → We'll send 3–4 tailored options for your project |
| 4 | {D2} Set budget | `select-pill` → Three selectable buttons: $200, $300, $400 |
| 5 | {D3} Launch campaign | `sub-pill` → Campaign goes live when you give the green light |

**Selectable pills** — Tile 2 and Tile 4 use interactive `select-pill` elements:
- Each pill has a `.check-icon` circle + text
- `onclick="togglePill(this)"` toggles `.selected` class
- Selected state: gradient background, primary border, glow shadow, checkmark in circle
- Include the `togglePill` function in the script block
- Call times grouped with `.time-group-label` divs ("Morning" / "Evening")

**Step D:** Show preview:
```
  ─── preview ────────────────────────

  1  Send your project
     → Send via DMs or email

  2  {D1} Choose call time
     → [X open morning slots] + [X open evening slots]

  3  {D1} Review proposal
     → We send 3–4 tailored options

  4  {D2} Set budget
     → [$200]  [$300]  [$400]

  5  {D3} Launch campaign
     → We go live when you're ready

  ──────────────────────────────────────
```

Then use **AskUserQuestion**: "Look good?" with options: "Yes, save it" / "No, let me change something"

If approved, save. If not, ask what to change.

---

## Workflow 1: cal-1-quick-setup

Print header:
```
  ─── {ARTIST_NAME} · quick setup ────
```

**Step A:** Tell the user:
> Grab the call times for today now. Paste them below:

Wait for user to paste call times.

**Step B:** Calculate dates using system date (today's date).
- Tile 2 & 3 date = today + 1 day, format `[M/DD]`
- Tile 4 date = today + 2 days
- Tile 5 date = today + 3 days

**Step C:** Use **AskUserQuestion** to collect remaining details. Ask for Tile 3, 4, 5 detail text. Tile 1 and 2 are already filled.

**Tile mapping:**

| Tile | Title | Detail |
|------|-------|--------|
| 1 | Send your project | Send via DMs or email |
| 2 | [M/DD] Choose call time | Call times user pasted |
| 3 | [M/DD] Review proposal | User provides |
| 4 | [M/DD] Set budget | User provides |
| 5 | [M/DD] Launch campaign | User provides |

**Step D:** Show preview using minimal ASCII:
```
  ─── preview ────────────────────────

  1  Send your project
     → Send via DMs or email

  2  [M/DD] Choose call time
     → [open slots from paste]

  3  [M/DD] Review proposal
     → [user's text]

  4  [M/DD] Set budget
     → [user's text]

  5  [M/DD] Launch campaign
     → [user's text]

  ──────────────────────────────────────
```

Then use **AskUserQuestion**: "Look good?" with options: "Yes, save it" / "No, let me change something"

If approved, proceed to save. If not, ask what to change.

---

## Workflow 2: task-2-recap-of-call

Print header:
```
  ─── {ARTIST_NAME} · recap ──────────
```

1. Ask: "What are the notes from the call?" — wait for paste
2. Organize the notes logically (by date, project name, or task list)
3. Show the same minimal ASCII preview as above
4. Use **AskUserQuestion**: "Look good?" with options: "Yes, save it" / "No, let me change something"
5. Once approved, fill template and save

Date logic: auto-increment (today + 1, +2, +3...) unless the notes specify their own dates.

---

## Workflow 3: detailed-direction

User pastes structured notes with specific tile content, sub-items, and optional tool links. Dates are user-provided (not auto-incremented). Supports mixed content: regular sub-pills AND glassmorphic link-pills that open URLs.

Print header:
```
  ─── {ARTIST_NAME} · detailed direction ─
```

**Step A:** Say: "Paste your structured notes — include tile titles, sub-items, dates, and any tool links:"

Wait for user to paste. The paste should contain:
- Tile titles with dates (e.g. `[2/17] Touching base`)
- Sub-items labeled (e.g. `1a:`, `1b:`, `2a:`, etc.)
- Link items marked with `[● Label]` and a URL
- Any number of tiles (2–6+)

**Step B:** Parse the paste into tiles. For each tile, identify:
- **Title** — the tile heading with date prefix if present
- **Overview sub** — a one-liner summary for the overview card
- **Sub-items** — each labeled item becomes either:
  - **sub-pill** — regular text item (e.g. `1a: Shane Stevens // -12,000`)
  - **link-pill** — tool button with URL (e.g. `[● ID Signer] → https://...`)

**Link-pill HTML pattern:**
```html
<a class="link-pill" href="URL" target="_blank" rel="noopener">
    <span class="pill-dot"></span>Label
</a>
```

**Link-pill CSS** (add to `<style>`):
```css
.link-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    background: var(--surface);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 100px;
    padding: 0.55rem 1.1rem;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.link-pill:hover {
    background: rgba(255, 255, 255, 0.65);
    border-color: rgba(14, 165, 233, 0.3);
    box-shadow: 0 4px 16px rgba(14, 165, 233, 0.15);
    transform: translateY(-2px);
}
.link-pill .pill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 8px var(--primary);
    flex-shrink: 0;
}
```

**Step C:** Show preview:
```
  ─── preview ────────────────────────

  1  [M/DD] Tile title
     → overview sub text
     → 1a: sub-item text
     → 1b: [● Link Label] → url
     ...

  ──────────────────────────────────────
```

Then use **AskUserQuestion**: "Look good?" with options: "Yes, save it" / "No, let me change something"

If approved, proceed to save. If not, ask what to change.

**Key differences from other workflows:**
- Dates are user-specified, not auto-incremented
- Tiles can have mixed sub-pills and link-pills
- Multiple sub-items per tile (not limited to one)
- Link-pills use glassmorphic style (--surface bg, blur, --primary dot, rounded)
- All link-pills open in new tabs

---

## Workflow 4: chad-5-epic-pretty

The premium cal card look. 3D glass buttons, hub-matched dot colors, shimmer sweep, blue hover glow, overlay screenshot modals, approve-tag gold text, and inline download rows.

Print header:
```
  ─── {ARTIST_NAME} · epic pretty ────
```

**Step A:** Same as Detailed Direction — ask user to paste structured notes with tiles, sub-items, dates, and tool links.

**Step B:** Parse tiles same as Detailed Direction. Identify these special item types:
- **link-pill** — tool button that opens a URL in new tab
- **overlay-pill** — tool button that opens a screenshot overlay modal on click
- **approve-tag** — gold shimmer italic text appended to a pill label (e.g. "Approved ✦")
- **download-row** — inline row with sub-pill label + compact button side by side
- **sub-pill** — regular text row with pill-num badge

**Step C:** Build the card with this **locked CSS**:

```css
/* ── Link Pills (3D glass buttons) ── */
.link-pill {
    display: inline-flex;
    align-self: flex-start;
    align-items: center;
    gap: 0.55rem;
    background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 100px;
    padding: 0.55rem 1.4rem 0.55rem 1rem;
    min-width: 195px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    box-shadow:
        0 1px 3px rgba(15, 23, 42, 0.08),
        0 4px 8px rgba(15, 23, 42, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

/* Shimmer sweep — always on */
.link-pill::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%);
    animation: shimmerFlow 4s linear infinite;
    border-radius: 100px;
    pointer-events: none;
}

/* Glass arc highlight — top reflection */
.link-pill::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 10%;
    width: 80%;
    height: 45%;
    background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%);
    border-radius: 100px;
    pointer-events: none;
}

/* Blue hover glow */
.link-pill:hover {
    background: linear-gradient(180deg, rgba(224,242,254,0.95) 0%, rgba(224,242,254,0.7) 100%);
    border-color: rgba(14, 165, 233, 0.25);
    border-top-color: rgba(14, 165, 233, 0.15);
    box-shadow:
        0 2px 6px rgba(14, 165, 233, 0.12),
        0 6px 16px rgba(14, 165, 233, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
}

.link-pill .pill-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 6px var(--primary);
    flex-shrink: 0;
}

/* ── Approve Tag (gold shimmer text) ── */
.approve-tag {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-style: italic;
    font-weight: 700;
    font-size: 0.85rem;
    background: linear-gradient(135deg, #b8860b, #e6b422, #f5d442, #e6b422, #b8860b);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 3s ease-in-out infinite;
}

@keyframes goldShimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

/* ── Overlay Modal (screenshot popups) ── */
.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 100;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.overlay.active { display: flex; }

.overlay-inner {
    position: relative;
    max-width: 700px;
    width: 100%;
    background: var(--bg);
    border-radius: 20px;
    padding: 1rem;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.25);
}

.overlay-inner img { width: 100%; border-radius: 14px; }

.overlay-close {
    position: absolute;
    top: -12px;
    right: -12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(15, 23, 42, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--text);
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.1);
    transition: all 0.2s ease;
    z-index: 101;
}

.overlay-close:hover { transform: scale(1.1); background: #fff; }
```

**Overlay-pill HTML pattern** (button that opens a screenshot overlay):
```html
<!-- Button -->
<span class="link-pill" onclick="openOverlay('my-overlay-id')">
    <span class="pill-dot" style="background:#COLOR;box-shadow:0 0 8px #COLOR;"></span>Label
</span>

<!-- Modal (place before <script>) -->
<div class="overlay" id="my-overlay-id" onclick="closeOverlay('my-overlay-id')">
    <div class="overlay-inner" onclick="event.stopPropagation()">
        <div class="overlay-close" onclick="closeOverlay('my-overlay-id')">&#10005;</div>
        <img src="SCREENSHOT_URL?raw=1" alt="Label">
    </div>
</div>
```

**Overlay JS** (add to script block):
```js
function openOverlay(id) { document.getElementById(id).classList.add('active'); }
function closeOverlay(id) { document.getElementById(id).classList.remove('active'); }
```

**Approve-tag HTML pattern** (gold shimmer text inside a pill):
```html
<a class="link-pill" href="URL" target="_blank" rel="noopener">
    <span class="pill-dot" style="background:#ef4444;box-shadow:0 0 8px #ef4444;"></span>
    ID Signer — Label — <span class="approve-tag">Approved ✦</span>
</a>
```

**Download-row HTML pattern** (sub-pill label + compact button in one row):
```html
<div style="display:flex;align-items:center;gap:0.6rem;background:rgba(14,165,233,0.08);border-radius:100px;padding:0.3rem 0.4rem 0.3rem 0.55rem;">
    <span class="pill-num" style="background:#0ea5e9;color:#fff;font-weight:700;font-size:0.65rem;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">1c</span>
    <span style="font-size:0.82rem;color:var(--text);">Download</span>
    <a class="link-pill" style="background:linear-gradient(180deg,rgba(224,242,254,0.95) 0%,rgba(224,242,254,0.7) 100%);border-color:rgba(14,165,233,0.2);padding:0.32rem 0.9rem 0.32rem 0.7rem;font-size:0.76rem;min-width:auto;gap:0.35rem;border-radius:8px;" href="URL" target="_blank" rel="noopener">
        💽<span class="pill-dot" style="background:#0ea5e9;box-shadow:0 0 8px #0ea5e9;"></span>LABEL
    </a>
</div>
```

**Additional locked rules for this workflow:**
- `.sub-items` uses `flex-direction: column` (stacked layout)
- All link-pills use `align-self: flex-start` (self-sizing, not full-width)
- All standard link-pills share `min-width: 195px` (uniform width based on longest label)
- Download-row buttons use `min-width: auto`, `border-radius: 8px`, smaller padding — skinny squared-off look
- Download-row buttons have blue hue by default (sky-blue gradient background)
- Dot colors ALWAYS match hub-reference.html COLOR KEY via inline style on `.pill-dot`
- Reuses existing `shimmerFlow` keyframes from the base template
- For Dropbox screenshot URLs: change `dl=0` to `raw=1` for direct image embedding

**Step D:** Show preview, confirm with AskUserQuestion, then save.

---

## Custom Card Path

Print header:
```
  ─── {ARTIST_NAME} · custom card ────
```

1. Use **AskUserQuestion**: "Task or Calendar?" with options:
   - "Task" — description: "simple stacked tiles, no dates"
   - "Calendar" — description: "timeline layout with [M/DD] dates"
2. Use **AskUserQuestion**: "How many tiles?" with options:
   - "2" — description: "minimal, two steps"
   - "3" — description: "three steps"
   - "4" — description: "four steps (default template)"
   - "5" — description: "five steps (adds extra tile)"
3. For each tile, ask for content in plain text (+ dates if calendar mode)
4. Show preview, confirm with AskUserQuestion, then save

---

### Step 4: Save Output
- Read the base template
- Replace all `{PLACEHOLDER}` values with user's answers
- If more than 4 tiles: duplicate tile HTML blocks in the template to match count
- If fewer than 4 tiles: remove extra tile HTML blocks
- For `select-pill` tiles: read `C:\Users\chad\.claude\skills\cal-card\select-pill.html` and copy the CSS into `<style>` and JS into `<script>`
- Build selectable pill HTML with `togglePill` onclick handlers, `.check-icon` circles, and `.time-group-label` headers where needed
- Save as a NEW file in the output folder:
  ```
  <output-folder>/chad43 - <artist-name>.html
  ```
- NEVER overwrite the base template

### Step 5: Confirm
Print:
```
  ─── done ────────────────────────────

  ✓ backup saved · MM-DD-YYYY
  ✓ new card · chad43 - <artist-name>.html
  ✓ mode · [which mode]
  ✓ tiles · [count]
  ✓ artist · [name]

  ──────────────────────────────────────
```

## Copy Style Guide

When the user provides raw text for tile content, clean it up into professional, clear copy:
- Keep it short and direct — `[date] — we do this`
- No exclamation marks unless the user uses them
- Breezy and functional, not salesy
- Overview subs = one-liner context (what this step is)
- Detail text = slightly more info (what happens / what to do)
- Examples:
  - Raw: "will share 3-4 options" → Detail: "We'll send 3–4 tailored options for your project"
  - Raw: "when ready" → Detail: "Campaign goes live when you give the green light"
  - Raw: "$200, $300, $400" → Build as selectable `select-pill` buttons

## Important Notes

- ALWAYS backup before any edits — no exceptions
- NEVER overwrite the base template — always save as a new file
- Use AskUserQuestion for ALL selections — keep it interactive and clickable
- Use minimal ASCII headers between steps for context
- Keep text scannable — short lines, clear hierarchy
- Date format in tiles is always `[M/DD]`
- For fast-1-onboard: ONLY ask for name + call times — everything else is locked
- For cal-1-quick-setup: always remind about call times FIRST
- For task-2-recap-of-call: always show text preview and wait for approval
- {OG_URL} and {ANALYTICS_DOMAIN} can be left blank or filled if user provides a tiiny.site link
- **ALWAYS match link-pill dot colors to Critical Mapper hub colors.** Read `hub-reference.html` COLOR KEY and tool assignments. Each tool's `.pill-dot` must use the same color as its `.stage-dot` on the hub (e.g. ID Signer = red `#ef4444`, Cataloger = green `#10b981`, Playlist Organizer = purple `#6366f1`, Spotify Ads = red `#ef4444`, Dashboard/Report Sheet = green `#10b981`). Apply via inline style on the `.pill-dot` span.
- **Link-pills should stack vertically** (sub-items uses `flex-direction: column`) with `align-self: flex-start` so pills self-size rather than stretch
