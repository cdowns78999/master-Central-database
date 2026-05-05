# Terminal Creations — Sandbox Reference

The complete character library and pattern toolkit for building terminal UI in Claude Code.

---

## 1. Box-Drawing Characters

### Single Line
```
┌─┬─┐    Corners: ┌ ┐ └ ┘
│ │ │    Lines:   ─ │
├─┼─┤    Tees:    ├ ┤ ┬ ┴
│ │ │    Cross:   ┼
└─┴─┘
```

### Double Line
```
╔═╦═╗    Corners: ╔ ╗ ╚ ╝
║ ║ ║    Lines:   ═ ║
╠═╬═╣    Tees:    ╠ ╣ ╦ ╩
║ ║ ║    Cross:   ╬
╚═╩═╝
```

### Rounded Corners
```
╭───╮    Corners: ╭ ╮ ╰ ╯
│   │    Lines:   ─ │
╰───╯
```

### Heavy/Bold
```
┏━┳━┓    Corners: ┏ ┓ ┗ ┛
┃ ┃ ┃    Lines:   ━ ┃
┣━╋━┫    Tees:    ┣ ┫ ┳ ┻
┃ ┃ ┃    Cross:   ╋
┗━┻━┛
```

### Dashed
```
┈ ┉ ┊ ┋    Light/heavy dash
╌ ╍          Single dash
```

### Mixed (double top, single body)
```
╒═══╕    Double-top corners: ╒ ╕
│   │    Single body
╘═══╛    Double-bottom corners: ╘ ╛
```

---

## 2. Block & Shade Characters

```
█  Full block       (U+2588)
▓  Dark shade       (U+2593)
▒  Medium shade     (U+2592)
░  Light shade      (U+2591)
▀  Upper half       (U+2580)
▄  Lower half       (U+2584)
▌  Left half        (U+258C)
▐  Right half       (U+2590)
▏▎▍▌▋▊▉█  Fractional blocks (1/8 to full)
```

---

## 3. Progress Bar Patterns

### Style A — Block fill
```
████████████░░░░░░░░  60%
```

### Style B — Shade gradient
```
▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░░░░░  50%
```

### Style C — Line with marker
```
━━━━━━━━━━╸──────────  50%
```

### Style D — Braille spinner (animated concept)
```
⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏
```

### Style E — Pie-style
```
◔ 25%   ◑ 50%   ◕ 75%   ● 100%
```

---

## 4. Separators & Dividers

```
────────────────────────────────  Single line
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  Heavy line
════════════════════════════════  Double line
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  Dashed
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈  Light dashed
· · · · · · · · · · · · · · ·   Dotted
─── ◆ ───────────────────────   Diamond accent
─── ★ ───────────────────────   Star accent
▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸  Arrows
```

---

## 5. Powerline & Nerd Font Glyphs

```
 (U+E0B0)  Right arrow (solid)
 (U+E0B1)  Right arrow (thin)
 (U+E0B2)  Left arrow (solid)
 (U+E0B3)  Left arrow (thin)
 (U+E0B4)  Right round
 (U+E0B6)  Left round
```

**Requires Nerd Font** (JetBrains Mono Nerd recommended).
Fallback alternatives: ▶ ◀ ▸ ◂ ▷ ◁ › ‹

---

## 6. Status Indicators & Bullets

```
Dots:     ● ○ ◉ ◎ ⬤ ⊙
Squares:  ■ □ ▪ ▫ ◼ ◻
Diamonds: ◆ ◇ ◈ ♦
Triangles:▶ ▷ ◀ ◁ ▲ △ ▼ ▽ ▸ ▹ ◂ ◃
Stars:    ★ ☆ ✦ ✧ ⭐
Checks:   ✓ ✔ ✗ ✘ ☑ ☐
Arrows:   → ← ↑ ↓ ↗ ↘ ↙ ↖ ➜ ➤ ⟶ ⟵
Misc:     § ¶ † ‡ ※ ⁂ ☰ ⚡ ⚙ ⏣ ⏢
```

---

## 7. Common Terminal Patterns

### A. Header Bar
```
★ title ──────────────────────────────────
```

### B. Section Card
```
╭─── Section Title ─────────────────────╮

   Content goes here.
   More content.

╰───────────────────────────────────────╯
```

### C. Status Row
```
🟢 Service A      running     12ms
🔴 Service B      down        ---
🟡 Service C      degraded    450ms
```

### D. Key-Value Block
```
┌─────────────────────────────────────┐
│  model     opus 4.6                 │
│  branch    main                     │
│  status    ✔ clean                  │
│  uptime    2h 34m                   │
└─────────────────────────────────────┘
```

### E. Tab Bar
```
[ Active ] ─ Inactive ─ Inactive ─ Inactive
```

### F. Badge / Tag
```
[INFO]  [WARN]  [ERROR]  [OK]
⟨tag⟩  «tag»  「tag」  〔tag〕
```

### G. Tree View
```
project/
├── src/
│   ├── index.js
│   └── utils/
│       ├── helpers.js
│       └── config.js
├── package.json
└── README.md
```

### H. Table
```
┌──────────┬────────┬────────┐
│ Name     │ Status │ Score  │
├──────────┼────────┼────────┤
│ Alpha    │ ✔ pass │   92   │
│ Beta     │ ✘ fail │   41   │
│ Gamma    │ ✔ pass │   87   │
└──────────┴────────┴────────┘
```

### I. Metric Dashboard
```
╭─ CPU ──────╮  ╭─ RAM ──────╮  ╭─ DISK ─────╮
│ ████░░ 67% │  │ █████░ 83% │  │ ██░░░░ 33% │
╰────────────╯  ╰────────────╯  ╰────────────╯
```

### J. Timeline / Steps
```
● Step 1 ─── Complete
◉ Step 2 ─── In Progress
○ Step 3 ─── Pending
○ Step 4 ─── Pending
```

### K. Alert Box
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ⚠  WARNING                          ┃
┃  Something needs your attention.      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### L. Comparison / Diff
```
  - old value          (removed)
  + new value          (added)
  ~ changed value      (modified)
```

### M. Watermark / Centered Art
```


         ╭─────────────╮
         │  A H E A D  │
         ╰─────────────╯


```

### N. Powerline Status Bar
```
 segment1  segment2  segment3  segment4
```

### O. Shadow Box
```
╭────────────────────────────╮
│  Content with shadow       │
╰────────────────────────────╯
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

---

## 8. Layout Techniques

### Centering
Pad with spaces: count `(total_width - text_width) / 2` spaces before text.

### Alignment in Columns
Use fixed-width fields. Pad short values with spaces to align pipes/borders.

### Multi-Column
Place boxes side by side with 2-space gaps between them.

### Width Control
Standard terminal: 80 chars. Claude Code panel: ~50-60 chars safe.
Keep boxes under 52 chars wide for clean rendering.

---

## 9. Claude Code Output Style File Format

Custom styles go in `~/.claude/output-styles/` as `.md` files:

```markdown
---
name: My Style
description: What this style does
keep-coding-instructions: false
---

# Instructions for Claude

Your rendering rules here...
```

- `keep-coding-instructions: true` keeps coding behavior active
- Styles modify the system prompt directly
- Changes take effect on next session start
