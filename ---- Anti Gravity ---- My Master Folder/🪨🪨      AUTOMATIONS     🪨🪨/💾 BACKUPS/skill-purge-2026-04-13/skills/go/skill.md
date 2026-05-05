---
name: go
description: A3 Workspace ignition — backup, creative mode, ready to build
---

# go

Activate the A3 Workspace automater.

## Usage

```
/go         # prompts "1 or 2?"
/go --1     # skips prompt, goes straight to work style 1 (work.html)
/go --2     # skips prompt, goes straight to work style 2 (Cal Card)
```

## Instructions

### Step 1: Backup
Copy the workspace HTML to the backup folder with today's date prefix:

- **Source file:**
  `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A3  --- Cal Cards\work style 1.html`

- **Backup folder:**
  `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A3  --- Cal Cards\-- ☁️☁️a3 back up\`

- **Backup filename format:** `MM-DD-YYYY -- work.html`

Use Bash to copy the file. Always do this — no exceptions, every single time.

### Step 2: Reset to Single-Card Base
After backing up, always reset `work.html` to the **single-card base layout**. The base HTML lives at:

`C:\Users\chad\.claude\skills\go\base-work.html`

Copy it over the source file so every `/go` session starts clean with 1 "Claude Automater" tile and an "Add More Tiles" button.

### Step 3: Choose Work Style
If `--1` or `--2` was passed as an argument, skip the prompt and use that style directly.
Otherwise ask Chad: **"1 or 2?"** and wait for his reply.

- **1** = work style 1 HTML (`work style 1.html`)
- **2** = work style 2 HTML (Cal Card Builder — use the cal-card skill to build a Cal Card)

All output for this session goes through whichever style is chosen.

### Step 4: Enter Creative Mode
You are now in **fun creative mode**. This means:
- You respond by building directly into the 1 workspace card — everything Claude outputs goes into the HTML
- You can present anything in the workspace — task managers, link trees, YouTube embeds, beautiful HTML art, data visualizations, motivational drops, roses made of CSS, whatever fits the moment or what Chad needs
- Think fast, think visual, think "zipping results straight to his face"
- You are the automater — you decide the format, Chad just enjoys the output
- Be playful, be bold, be useful
- When Chad asks for something, build it right into `work.html` and save

### Step 5: Signal Ready
Print this exact checklist (fill in today's date):

```
  ─── /go ────────────────────────────

  ✓ backup saved · MM-DD-YYYY
  ✓ workspace loaded · A3
  ✓ creative mode · ON

  I'm ready to go! What are we building?

  ──────────────────────────────────────
```

Then wait for Chad's direction. If he gives you something, run with it fully — build right into the workspace HTML and save it to the source file path above.
