---
name: c-nerd
description: Ultimate nerd mode — powerline-style status bar plugin with live system data on every output. Setup, configure, or uninstall.
---

# c-nerd — Ultimate Nerd Mode

Powerline-style status bar that renders below every response with live system metrics. Inspired by ccstatusline.

## Usage

```
/c-nerd              # setup wizard (first time) or config menu (if already active)
/c-nerd --setup      # force setup wizard
/c-nerd --uninstall  # remove nerd mode completely
/c-nerd --preview    # show a live preview of current config
```

## Setup Wizard

IMPORTANT: Use AskUserQuestion for all selections.

### Step 1: Theme Selection

Present header:
```
  NERD MODE  setup wizard
  ─────────────────────────────────────
```

Use AskUserQuestion — "Pick your separator theme:"
Options:
1. **Powerline** — ` w1  w2  w3 ` (needs Nerd Font)
2. **Pipes** — `w1 │ w2 │ w3` (universal, clean)
3. **Dots** — `w1 · w2 · w3` (minimal, soft)
4. **Arrows** — `w1 ▸ w2 ▸ w3` (directional, sharp)
5. **Dashes** — `w1 ─ w2 ─ w3` (flat, technical)
6. **Minimal** — `w1  w2  w3` (no separators, just spacing)

### Step 2: Widget Selection

Use AskUserQuestion — "Which widgets? (pick a preset or customize)"
Options:
1. **Essential** — model, branch, time, git-status (4 widgets)
2. **Full Stack** — model, branch, cwd, time, git-status, memory (6 widgets)
3. **Minimal** — model, time (2 widgets)
4. **Custom** — let me pick individually

If Custom: present each widget as a toggle list:
- model (AI model name)
- branch (git branch)
- cwd (working directory, fish-style)
- time (current time)
- date (current date)
- os (operating system)
- git-status (clean/dirty indicator)
- network (wifi name)
- memory (RAM usage %)

### Step 3: Compact Mode

Use AskUserQuestion — "Compact mode? (hides emoji icons)"
Options:
1. **Normal** — emoji icons before each widget
2. **Compact** — values only, no icons

### Step 4: Save & Activate

1. Write config to `C:\Users\chad\.claude\skills\c-nerd\nerd-config.json`:
```json
{
  "active": true,
  "theme": "<chosen>",
  "widgets": ["<chosen>", "..."],
  "compact": false
}
```

2. Add this section to MEMORY.md (at the end, before any truncation warning):
```markdown
## ACTIVE — Nerd Mode Status Bar
- **Per output**: run `source ~/.bashrc && python "C:/Users/chad/.claude/skills/c-nerd/nerd-status.py"` at START of each output
- Print the output line BELOW the response box on its own line
- One line only. If the script returns nothing, skip the bar
- Config: `C:\Users\chad\.claude\skills\c-nerd\nerd-config.json`
- To change: `/c-nerd --setup` | To remove: `/c-nerd --uninstall`
```

3. Show a live preview by running the script, then confirm:
```
  NERD MODE  activated
  your status bar is now live on every output
```

## Per-Output Protocol (when active)

Every single output, Claude must:

1. **START** — run `source ~/.bashrc && python "C:/Users/chad/.claude/skills/c-nerd/nerd-status.py"`
2. **CAPTURE** — save the output string
3. **RENDER** — after the response box, print the status bar on its own line
4. That's it. One bash call, one line printed.

### Rendering Rules
- Status bar goes BELOW the response box
- One line only — never wraps
- If the script exits with no output (inactive), skip rendering
- If git data is null (not in a repo), those widgets auto-hide
- The status bar is PLAIN TEXT output from the script — just print it as-is

## Uninstall Flow

When `/c-nerd --uninstall`:
1. Remove the "ACTIVE — Nerd Mode Status Bar" section from MEMORY.md
2. Set `active: false` in nerd-config.json (keep config for re-enable)
3. Confirm:
```
  NERD MODE  removed
  status bar disabled — config saved for later
  run /c-nerd --setup to re-enable anytime
```

## Preview Flow

When `/c-nerd --preview`:
1. Run `source ~/.bashrc && python "C:/Users/chad/.claude/skills/c-nerd/nerd-status.py"`
2. Display the result
3. Also show what the full output would look like (box + status bar)

## Important Notes
- This skill ONLY manages the status bar — it never touches the response box format
- Config is preserved on uninstall for easy re-enable
- The Python script handles ALL data gathering and formatting
- No ANSI colors in the bar (terminal compatibility) — uses Unicode symbols and emoji
- Powerline theme requires a Nerd Font (JetBrains Mono recommended)
- Script timeout: ~3 seconds max (git + network calls)
