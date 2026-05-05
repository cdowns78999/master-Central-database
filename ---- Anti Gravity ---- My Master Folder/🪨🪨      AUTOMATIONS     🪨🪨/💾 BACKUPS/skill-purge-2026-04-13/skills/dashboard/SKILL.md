---
name: dashboard
description: Ultimate Dashboard — home base hub that routes to all dashboard personalities
---

# dashboard

Home base. The spine of the Ultimate Dashboard system. Routes to all `--` personalities
and gives you a bird's eye view of the client pipeline.

## Usage

```
/dashboard
```

## Instructions

### Step 0: Read Config

Read `C:\Users\chad\.claude\skills\dashboard\config.md` for paths, templates, and settings.
Read `C:\Users\chad\.claude\skills\dashboard\data\board.json` for current board state.

### Step 1: Show the Board

Print:
```
  ─── ultimate dashboard ───────────

  LEFT (urgent)  →  CENTER (solving)  →  RIGHT (happy)
```

Then display tiles from board.json grouped by column (see Step 3a format).
If no tiles exist, show "No tiles on the board yet."

### Step 2: Main Menu

Use **AskUserQuestion**:
- Question: "Where we headed?"
- Options:
  1. "View Board" — description: "see current client tiles and their status"
  2. "Add Client Tile" — description: "drop a new client onto the board"
  3. "Open Personality" — description: "jump to a dashboard-- skill"
  4. "Quick Action" — description: "pick a mapper button and fire it"

### Step 3a: View Board

Read `C:\Users\chad\.claude\skills\dashboard\data\board.json` for current tile positions.
Read `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json` for client details.

Display all active client tiles grouped by column:

```
  LEFT (urgent)          CENTER (solving)       RIGHT (happy)
  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
  │ Client Name  │       │ Client Name  │       │ Client Name  │
  │ status: tag  │  →    │ status: tag  │  →    │ status: tag  │
  │ [buttons]    │       │ [buttons]    │       │ [buttons]    │
  └──────────────┘       └──────────────┘       └──────────────┘
```

Each tile shows:
- Client name
- Current status tag
- Nested action buttons (from mapper)

### Step 3b: Add Client Tile

Ask: "Client name?"
Then ask: "Starting status?" with options: Urgent, Active, Watching

Create the client record in `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json`:
- Set name, status, stage (Urgent → LEFT, Active → CENTER, Watching → CENTER)
- Set created/updated timestamps
- Initialize empty buttons[], history[]

Add the tile to `C:\Users\chad\.claude\skills\dashboard\data\board.json` in the correct column.

Confirm with:
```
  ✓ [Client Name] added → LEFT (urgent)
```

### Step 3c: Open Personality

Use **AskUserQuestion**:
- Question: "Which personality?"
- Options:
  1. "Client Database" — description: "/dashboard--client-database"
  2. "Effects & Travel" — description: "/dashboard--effects-and-travel"
  3. "CSS" — description: "/dashboard--css"
  4. "Communication" — description: "/dashboard--communication"

Then route to that skill using the Skill tool.

### Step 3d: Quick Action

Read mapper buttons from `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\- -         💲💲  MAPPER UPDATE\🚧🚧 41-MAPPER--Finalized.html`.
Parse `.p-btn` link elements to get available buttons.
Show available buttons for the selected client.

Use **AskUserQuestion**:
- Question: "Go direct or wind up?"
- Options:
  1. "Go to Link" — description: "open it raw, no setup"
  2. "Wind Up" — description: "fill in presets first, then launch"

**Go to Link**: open the URL directly.
**Wind Up**: read presets from `C:\Users\chad\.claude\skills\dashboard--communication\data\presets.json`, show fields relevant to that button, let user fill/select presets, then launch.

### Important Notes

- This skill is the ONLY entry point to the dashboard system
- All personalities route back here when done
- Client tiles persist across sessions (stored in board.json)
- Mapper buttons are read dynamically from 41-MAPPER--Finalized.html — never hardcoded
- clients.json is the single source of truth for client data
- board.json is the view layer — tracks tile positions separately from client records
