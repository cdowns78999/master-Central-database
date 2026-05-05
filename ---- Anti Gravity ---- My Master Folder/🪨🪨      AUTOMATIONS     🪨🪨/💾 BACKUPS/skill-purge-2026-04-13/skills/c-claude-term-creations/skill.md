---
name: c-claude-term-creations
description: Terminal design studio — describe a terminal UI idea, get a live render, iterate with edits until done. Full Unicode sandbox built in.
---

# c-claude-term-creations — Terminal Design Studio

Design and build terminal UI creations directly in the Claude Code terminal. Describe your idea, get a live rendered preview, iterate until perfect.

## Reference

- **Sandbox:** `C:\Users\chad\.claude\skills\c-claude-term-creations\sandbox.md` — full character library, patterns, and layout techniques
- Box characters: https://gist.github.com/dsample/79a97f38bf956f37a0f99ace9df367b9
- Community styles: https://github.com/hesreallyhim/awesome-claude-code-output-styles-that-i-really-like
- ccstatusline (inspiration): https://github.com/sirmalloc/ccstatusline

## Usage

```
/c-claude-term-creations
```

## On Invoke

### Step 1: Read the Sandbox

ALWAYS read `sandbox.md` first — it's the character library and pattern toolkit. Absorb it silently. Do NOT summarize it to the user.

### Step 2: Welcome + Prompt

Show the studio header:

```
╭─── TERMINAL DESIGN STUDIO ───────────────────╮
│                                               │
│   describe your terminal design idea          │
│   i'll render it live right here              │
│                                               │
│   patterns available:                         │
│   boxes · tables · progress bars · badges     │
│   status rows · trees · dashboards · cards    │
│   powerline bars · shadow boxes · timelines   │
│                                               │
╰───────────────────────────────────────────────╯
```

Then use AskUserQuestion ONCE:
- Header: "Design"
- Question: "What do you want to build? Describe your terminal design idea — the more detail the better."
- Options:
  1. **Show me the patterns first** — description: "Browse the sandbox catalog before designing"
  2. **I have an idea ready** — description: "I'll describe it in the text box"
  3. **Remix an existing design** — description: "Start from one of my current skill outputs and modify it"

### If "Show me the patterns first"

Render a condensed visual catalog directly in terminal — show 6-8 of the best patterns from sandbox.md as LIVE examples (not descriptions, actual rendered boxes/bars/tables). Then ask "which pattern(s) catch your eye?" as plain text (no menu).

### If "I have an idea ready"

Wait for their description. It could be anything:
- "a status dashboard with 3 metric boxes side by side"
- "a notification card with a warning icon and shadow"
- "a powerline bar showing project stats"
- "something that looks like a retro terminal"
- "a clean minimal header for my skill outputs"

### If "Remix an existing design"

Ask which skill/output they want to remix. Read that skill's output format, then render it and ask what to change.

---

## The Render Loop (CORE WORKFLOW)

This is the heart of the skill. Once you have the user's idea:

### Render Phase

1. **Build the design** using characters from sandbox.md
2. **Render it LIVE** in the terminal — print the actual terminal creation, not a description of it
3. The render should be inside a code block so monospace alignment holds:

```
   ╭─── My Custom Widget ──────────────────╮
   │                                        │
   │   🟢 API Status    online    12ms      │
   │   🔴 DB Connection down      ---       │
   │   🟡 Cache         warm      3ms       │
   │                                        │
   ╰────────────────────────────────────────╯
```

4. Below the render, print this EXACTLY (plain text, not a menu):

```
any edits?
```

That's it. Two words. Wait for the user.

### Edit Phase

The user will respond with edits like:
- "make it wider"
- "add a header bar above it"
- "use double-line borders instead"
- "add a shadow underneath"
- "change the dots to squares"
- "put a progress bar in the middle"
- "looks perfect, done"

**For each edit request:**
1. Apply the changes
2. Re-render the FULL updated design (not just the changed part)
3. Print `any edits?` again

**Loop continues** until the user says something like "done", "perfect", "that's it", "save it", "ship it", "looks good", or any clear completion signal.

### Completion Phase

When the user signals done:

1. Show the FINAL render one last time (clean, no "any edits?" after it)
2. Then ask with AskUserQuestion:
   - Header: "Save"
   - Question: "What do you want to do with this design?"
   - Options:
     1. **Save as output style** — description: "Write to ~/.claude/output-styles/ as a reusable style"
     2. **Save as skill template** — description: "Save the pattern to a skill's output format"
     3. **Copy to clipboard** — description: "Just copy the raw design"
     4. **Done, don't save** — description: "I got what I needed"

#### Save as output style
- Create a `.md` file in `~/.claude/output-styles/` with proper frontmatter
- The style instructions tell Claude to use this terminal design for all responses
- Name it based on the design (e.g., `retro-dashboard.md`)

#### Save as skill template
- Ask which skill to apply it to
- Show the pattern as a template block they can paste into a skill.md

#### Copy to clipboard
- Run: `echo "..." | clip` (Windows) to copy the raw design to clipboard
- Confirm it's copied

#### Done, don't save
- Close cleanly

---

## Design Principles (follow these when rendering)

1. **Always use code blocks** for renders — monospace is required for alignment
2. **Max width: 52 characters** inside the box — keeps it clean in the Claude Code panel
3. **Pad content** — 3 spaces from left border, 1 blank line top/bottom inside boxes
4. **Align columns** — right-align numbers, left-align text, use consistent spacing
5. **Test your widths** — count characters to make sure borders line up
6. **Mix patterns freely** — combine boxes, bars, badges, and indicators in one design
7. **Keep it renderable** — only use characters that display in monospace terminals
8. **Show, don't tell** — always RENDER the design, never just describe it

## Sandbox Quick Reference (for fast lookups)

Corners: ╭╮╰╯ ┌┐└┘ ╔╗╚╝ ┏┓┗┛
Lines:   ─│ ═║ ━┃ ┈┊ ╌╍
Blocks:  █▓▒░ ▀▄▌▐ ▏▎▍▋▊▉
Dots:    ●○◉◎ ■□◆◇ ▶▷◀◁
Marks:   ✓✔✗✘ ★☆✦ ⚡⚙
Arrows:  →←↑↓ ▸▹◂◃ ➤➜
Badges:  [TAG] ⟨tag⟩ «tag» 「tag」

## CRITICAL Rules

- ALWAYS read sandbox.md on invoke (silent, don't summarize)
- ALWAYS render designs in code blocks for alignment
- ALWAYS print `any edits?` after each render (plain text, NOT an interactive menu)
- ALWAYS re-render the FULL design after each edit (not just the diff)
- ALWAYS count character widths to ensure borders align
- NEVER describe a design without also rendering it
- NEVER use interactive menus during the edit loop — plain text only
- NEVER break out of the loop until the user signals done
- NEVER render designs wider than 52 characters inside borders (55 total with borders)
