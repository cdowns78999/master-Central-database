# How It Works — Interactive Guide Plan

## Where the button goes

**Banner area replacement.** The current banner (lines 9743-9751) shows:
- "Ahead Command Center" (title — keep this)
- "Ahead Artist Solutions — Obsidian Memory System" (subtitle — REPLACE)
- Two tags: "HTML Obsidian" / "Obsidian Vault" (REPLACE)

The subtitle + tags area becomes a "How It Works" button that opens a new overlay panel.

## Where the panel lives

**Orange launcher screen (Screen 3).** The orange dot (data-screen="2") currently maps to `launcherScreen3` which is an empty placeholder showing just "Screen 4". This screen gets replaced with the full How It Works guide panel.

Clicking the banner button will:
1. Open the launcher overlay
2. Auto-switch to the orange screen (index 2)

## Panel structure — Slider system

The panel uses a self-contained slider inside `launcherScreen3`. It does NOT use the launcher's existing dot nav — it has its own mini-dot row at the top of the panel body.

### Slider behavior
- 7 dots at the top of the panel, horizontally centered
- Each dot = one section
- Click dot = crossfade to that section (opacity transition, 0.25s)
- Left/right arrow buttons on either side of the content area
- Current dot is highlighted (scale + glow)
- Keyboard left/right arrows work when panel is visible
- Dots use the warm orange color (#f59e0b) for active state

### The 7 sections

1. **Daily Runner** — explains `daily-comms.py`: snapshot + diff pipeline, what it does, when to run it
2. **Outbox Server** — explains `outbox-server.py`: port 3003, tee-up > go flow, 4 channels
3. **Client Journey** — explains the journey card system, the 4 punch dots, how clients flow through
4. **Client App Launcher** — explains the launcher itself, what each button does
5. **Quick Action Buttons** — explains the quick buttons in the toolbar area
6. **Left Wing** — describes each column/pill in the left wing
7. **Right Wing** — describes each column/pill in the right wing

### Each section contains
- Emoji + title (h2-style, Outfit font)
- 2-4 lines of casual plain-language description (JetBrains Mono, small)
- Warm, dark background matching launcher aesthetic

## Styling approach
- Panel uses `.launcher-full-panel` pattern (same as Social Climate Organizer, Payment Portals, etc.)
- Custom CSS prefixed with `.hiw-` to avoid conflicts
- Colors: warm orange (#f59e0b) for accents, dark bg (#0d0d0d), muted text
- Fonts: Outfit for headers, JetBrains Mono for body text
- Matches existing launcher panel visual language

## Banner changes
- `.banner-sub` text changes from "Ahead Artist Solutions — Obsidian Memory System" to a clickable "How It Works" button
- `.banner-obsidian` div with two tags is removed/replaced
- Button opens launcher + switches to orange screen

## Implementation steps
1. Add `.hiw-*` CSS styles (slider dots, sections, arrows, content cards)
2. Replace `launcherScreen3` HTML with the How It Works panel
3. Replace banner subtitle + obsidian tags with How It Works button
4. Add JS: slider navigation, arrow keys, banner button click handler
