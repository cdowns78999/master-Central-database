---
name: dashboard--css
description: Styling engine — themes, design tokens, and shared CSS for the dashboard system
---

# dashboard--css

The look and feel. Owns all visual styling, themes, and design tokens
shared across the entire dashboard system.

## Usage

```
/dashboard--css
```

## Instructions

### Step 0: Read Config

Read `C:\Users\chad\.claude\skills\dashboard--css\config.md` for theme settings and CSS file paths.
Read `C:\Users\chad\.claude\skills\dashboard--css\data\theme.json` for current design tokens.

### Step 1: Header

Print:
```
  ─── css engine ───────────────────
```

### Step 2: Menu

Use **AskUserQuestion**:
- Question: "What's the move?"
- Options:
  1. "View Current Theme" — description: "show active colors, fonts, spacing"
  2. "Edit Theme" — description: "change colors, styles, or layout"
  3. "Tile Styles" — description: "customize how client cards look"
  4. "Button Styles" — description: "style the mapper action buttons"

### Step 3a: View Theme

Read `C:\Users\chad\.claude\skills\dashboard--css\data\theme.json`.

Display current design tokens:
```
  ─── active theme ─────────────────

  Dashboard Colors:
    Background:   #0f172a (dashBg)
    Card BG:      #1e293b (cardBg)
    Urgent:       #ef4444
    Active:       #f59e0b
    Solving:      #0ea5e9
    Happy:        #10b981
    Text:         #f8fafc
    Text Muted:   #94a3b8

  Mapper Colors:
    Primary:      #4cc9f0
    Accent:       #4361ee
    Group Glow:   #ff5d8f

  Layout:
    Border Radius: 12px
    Shadow:        0 4px 24px rgba(0,0,0,0.3)
```

### Step 3b: Edit Theme

Ask what to change → show current value → get new value → preview → confirm → save to theme.json.

Changes update `C:\Users\chad\.claude\skills\dashboard--css\data\theme.json`.

### Step 3c: Tile Styles

Customize card appearance:
- Card size, padding, border
- Status indicator style (dot, bar, glow)
- How nested buttons display inside the card
- Hover/active states

Show current tile style settings from theme.json and allow modifications.

### Step 3d: Button Styles

Customize mapper action buttons:
- "Go to Link" button style
- "Wind Up" button style
- Button colors pulled from mapper hub colors
- Active/pressed states

Show current button style settings and allow modifications.

### Design Tokens (CSS Custom Properties)

These tokens are the foundation — every dashboard HTML output references them:

```css
:root {
  /* Dashboard palette */
  --dash-bg: #0f172a;
  --card-bg: #1e293b;
  --urgent: #ef4444;
  --active: #f59e0b;
  --solving: #0ea5e9;
  --happy: #10b981;
  --text: #f8fafc;
  --text-muted: #94a3b8;

  /* Mapper palette */
  --mapper-primary: #4cc9f0;
  --mapper-accent: #4361ee;
  --mapper-glow: #ff5d8f;

  /* Layout */
  --radius: 12px;
  --shadow: 0 4px 24px rgba(0,0,0,0.3);
}
```

### Hub Color Alignment

Dashboard colors align with Critical Mapper hub colors:
- Blue: `#0ea5e9` (solving)
- Green: `#10b981` (happy)
- Purple: `#6366f1`
- Red: `#ef4444` (urgent)
- Orange/Amber: `#f59e0b` (active)
- Black: `#0f172a` (background)

### Important Notes

- All dashboard HTML files reference these shared tokens
- Colors align with Critical Mapper hub colors where possible
- This personality serves ALL other personalities — it's the visual foundation
- theme.json is the single source for all design values
- Mapper colors and dashboard colors coexist — two palettes, one system
