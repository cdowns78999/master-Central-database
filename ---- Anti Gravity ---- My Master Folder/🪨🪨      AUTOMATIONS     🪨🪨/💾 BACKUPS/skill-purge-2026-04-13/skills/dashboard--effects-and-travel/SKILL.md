---
name: dashboard--effects-and-travel
description: Effects engine & travel logic — animations, transitions, and tile movement rules
---

# dashboard--effects-and-travel

Controls how tiles move, animate, and travel through the pipeline.
This personality owns the motion — how a card goes from LEFT to CENTER to RIGHT.

## Usage

```
/dashboard--effects-and-travel
```

## Instructions

### Step 0: Read Config

Read `C:\Users\chad\.claude\skills\dashboard--effects-and-travel\config.md` for animation settings and transition rules.
Read `C:\Users\chad\.claude\skills\dashboard--effects-and-travel\data\rules.json` for current auto-movement rules.

### Step 1: Header

Print:
```
  ─── effects & travel ─────────────
```

### Step 2: Menu

Use **AskUserQuestion**:
- Question: "What are we working on?"
- Options:
  1. "Move a Tile" — description: "manually move a client tile between stages"
  2. "Set Transition Rules" — description: "define auto-move triggers"
  3. "Preview Effects" — description: "see current animations/transitions"

### Step 3a: Move a Tile

Read `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json` to get the client list.

Ask which client → ask destination (LEFT / CENTER / RIGHT) → execute move.

To execute the move:
1. Update the client's `stage` field in `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json`
2. Add a history entry: `{ "date": "<now>", "action": "stage-change", "detail": "moved from X to Y" }`
3. Update the `updated` timestamp
4. Move the tile in `C:\Users\chad\.claude\skills\dashboard\data\board.json` (remove from old column, add to new)

Print:
```
  ✓ [Client Name] moved → CENTER (solving)
```

### Step 3b: Transition Rules

Read current rules from `C:\Users\chad\.claude\skills\dashboard--effects-and-travel\data\rules.json`.

Show existing rules, then offer to add/edit/remove:

Use **AskUserQuestion**:
- Question: "What do you want to do with rules?"
- Options:
  1. "View Current Rules" — description: "see all auto-movement triggers"
  2. "Add New Rule" — description: "create a new auto-trigger"
  3. "Edit Rule" — description: "modify an existing rule"
  4. "Remove Rule" — description: "delete a rule"

Rule format:
```json
{
  "name": "rule-name",
  "condition": "description of when this fires",
  "action": "what happens (e.g., move to RIGHT, flag red)"
}
```

Save rules to `C:\Users\chad\.claude\skills\dashboard--effects-and-travel\data\rules.json`.

### Step 3c: Preview Effects

Show current CSS transitions and animation settings from the config.
Display how a tile looks/behaves when it moves between columns.

Reference design tokens from `C:\Users\chad\.claude\skills\dashboard--css\data\theme.json` for visual properties.

Print example:
```
  ─── transition preview ───────────

  Movement: slide + fade (0.3s ease)
  Status glow: pulse on urgent (1.5s)
  Arrival: scale-in bounce (0.2s)

  LEFT ──[slide]──► CENTER ──[slide]──► RIGHT
```

### Travel Logic

The "travel" system:
1. Tile starts LEFT (urgent/new)
2. Actions get taken (buttons clicked, wind-ups completed)
3. Progress triggers move to CENTER
4. Resolution triggers move to RIGHT
5. Card carries all its nested buttons and history with it at every stage

### Important Notes

- Tile movement ALWAYS updates the client database record (clients.json)
- Tile movement ALWAYS updates the board state (board.json)
- Effects are CSS-based — this personality feeds into /dashboard--css
- Travel rules persist in rules.json — not hardcoded
- Auto-rules are evaluated when clients are loaded, not continuously
