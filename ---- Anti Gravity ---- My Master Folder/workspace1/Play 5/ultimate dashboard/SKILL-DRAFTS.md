# Ultimate Dashboard — Full Skill Drafts

All 6 SKILL.md files drafted in full. Review, tweak, then we ship.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SKILL 1: /dashboard

```
---
name: dashboard
description: Ultimate Dashboard — home base hub that routes to all dashboard personalities
---
```

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

### Step 1: Show the Board

Print:
```
  ─── ultimate dashboard ───────────

  LEFT (urgent)  →  CENTER (solving)  →  RIGHT (happy)
```

### Step 2: Main Menu

Use **AskUserQuestion**:
- Question: "Where we headed?"
- Options:
  1. "View Board" — description: "see current client tiles and their status"
  2. "Add Client Tile" — description: "drop a new client onto the board"
  3. "Open Personality" — description: "jump to a dashboard-- skill"
  4. "Quick Action" — description: "pick a mapper button and fire it"

### Step 3a: View Board

Display all active client tiles grouped by column:

```
  LEFT (urgent)          CENTER (solving)       RIGHT (happy)
  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
  │ Client Name  │       │ Client Name  │       │ Client Name  │
  │ [buttons]    │  →    │ [buttons]    │  →    │ [buttons]    │
  └──────────────┘       └──────────────┘       └──────────────┘
```

Each tile shows:
- Client name
- Current status tag
- Nested action buttons (from mapper)

### Step 3b: Add Client Tile

Ask: "Client name?"
Then ask: "Starting status?" with options: Urgent, Active, Watching

Create the tile and place it in the correct column.

### Step 3c: Open Personality

Use **AskUserQuestion**:
- Question: "Which personality?"
- Options:
  1. "Client Database" — description: "/dashboard--client-database"
  2. "Effects & Travel" — description: "/dashboard--effects-and-travel"
  3. "CSS" — description: "/dashboard--css"
  4. "Communication" — description: "/dashboard--communication"

Then route to that skill.

### Step 3d: Quick Action

Load buttons from mapper (41-MAPPER--Finalized.html).
Show available buttons for the selected client.

Use **AskUserQuestion**:
- Question: "Go direct or wind up?"
- Options:
  1. "Go to Link" — description: "open it raw, no setup"
  2. "Wind Up" — description: "fill in presets first, then launch"

**Go to Link**: open the URL directly.
**Wind Up**: show fields relevant to that button, let user fill/select presets, then launch.

### Important Notes

- This skill is the ONLY entry point to the dashboard system
- All personalities route back here when done
- Client tiles persist across sessions (stored in config/data file)
- Mapper buttons are read from 41-MAPPER--Finalized.html — never hardcoded

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SKILL 2: /dashboard--client-database

```
---
name: dashboard--client-database
description: Client data management — store, retrieve, and organize artist/client records
---
```

# dashboard--client-database

The data layer. This is where client records live. Every other personality
pulls from here when it needs client info.

## Usage

```
/dashboard--client-database
```

## Instructions

### Step 0: Read Config

Read `C:\Users\chad\.claude\skills\dashboard--client-database\config.md` for database path and field definitions.

### Step 1: Header

Print:
```
  ─── client database ──────────────
```

### Step 2: Menu

Use **AskUserQuestion**:
- Question: "What are we doing?"
- Options:
  1. "View All Clients" — description: "list every client record"
  2. "Search Client" — description: "find a specific client by name"
  3. "Add New Client" — description: "create a new client record"
  4. "Edit Client" — description: "update an existing client's info"

### Step 3a: View All

Display client list as a clean grid:
```
  Name              Status      Last Action     Stage
  ─────────────────────────────────────────────────────
  Artist Name       active      invoice sent    CENTER
  Artist Name 2     urgent      waiting reply   LEFT
```

### Step 3b: Search

Ask: "Client name or keyword?"
Return matching records.

### Step 3c: Add New

Collect fields via **AskUserQuestion** or text input:
- Client name
- Contact info
- Status (urgent / active / watching / happy)
- Notes
- Assigned mapper buttons (from 41-MAPPER)

Save to database file.

### Step 3d: Edit

Show current record → ask what to change → update → confirm.

### Data Schema

Each client record:
```
{
  name: "",
  contact: "",
  status: "urgent | active | watching | happy",
  stage: "LEFT | CENTER | RIGHT",
  notes: "",
  buttons: [],        ← mapper shortcut buttons assigned to this client
  history: [],         ← log of status changes
  created: "",
  updated: ""
}
```

### Important Notes

- This is the SINGLE SOURCE OF TRUTH for client data
- All other personalities read from here — never duplicate client records
- Backup before any edit (date-prefix copy)
- Status changes auto-log to history

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SKILL 3: /dashboard--effects-and-travel

```
---
name: dashboard--effects-and-travel
description: Effects engine & travel logic — animations, transitions, and tile movement rules
---
```

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

Ask which client → ask destination (LEFT / CENTER / RIGHT) → execute move.
Update the client record in the database.

Print:
```
  ✓ [Client Name] moved → CENTER (solving)
```

### Step 3b: Transition Rules

Define conditions that auto-move tiles:
- "When status = X, move to Y"
- "When all buttons completed, move to RIGHT"
- "When urgent + no action for 24h, flag red"

Store rules in config.

### Step 3c: Preview Effects

Show current CSS transitions and animation settings.
Preview how a tile looks when it moves between columns.

### Travel Logic

The "travel" system:
1. Tile starts LEFT (urgent/new)
2. Actions get taken (buttons clicked, wind-ups completed)
3. Progress triggers move to CENTER
4. Resolution triggers move to RIGHT
5. Card carries all its nested buttons and history with it at every stage

### Important Notes

- Tile movement ALWAYS updates the client database record
- Effects are CSS-based — this personality feeds into /dashboard--css
- Travel rules persist in config — not hardcoded

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SKILL 4: /dashboard--css

```
---
name: dashboard--css
description: Styling engine — themes, design tokens, and shared CSS for the dashboard system
---
```

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

Display current design tokens:
```
  ─── active theme ─────────────────

  Background:   #0f172a
  Card BG:      #1e293b
  Urgent:       #ef4444
  Active:       #f59e0b
  Happy:        #10b981
  Text:         #f8fafc
  Font:         Inter / system
  Border Radius: 12px
  Shadows:      soft glass
```

### Step 3b: Edit Theme

Ask what to change → show preview → confirm → save to CSS file.
Backup current CSS first (date-prefix).

### Step 3c: Tile Styles

Customize card appearance:
- Card size, padding, border
- Status indicator style (dot, bar, glow)
- How nested buttons display inside the card
- Hover/active states

### Step 3d: Button Styles

Customize mapper action buttons:
- "Go to Link" button style
- "Wind Up" button style
- Button colors pulled from mapper hub colors
- Active/pressed states

### Design Tokens

```css
:root {
  --dash-bg: #0f172a;
  --card-bg: #1e293b;
  --urgent: #ef4444;
  --active: #f59e0b;
  --solving: #0ea5e9;
  --happy: #10b981;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(0,0,0,0.3);
}
```

### Important Notes

- All dashboard HTML files reference these shared tokens
- Colors align with Critical Mapper hub colors where possible
- Backup CSS before every edit
- This personality serves ALL other personalities — it's the visual foundation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SKILL 5: /dashboard--communication

```
---
name: dashboard--communication
description: Comms hub — N&N notifications, Chrome extension triggers, and message routing
---
```

# dashboard--communication

The comms layer. Handles notifications, Chrome extension triggers,
and how the outside world feeds into the dashboard.

## Usage

```
/dashboard--communication
```

## Instructions

### Step 0: Read Config

Read `C:\Users\chad\.claude\skills\dashboard--communication\config.md` for extension paths and notification settings.

### Step 1: Header

Print:
```
  ─── communication ────────────────
```

### Step 2: Menu

Use **AskUserQuestion**:
- Question: "What's up?"
- Options:
  1. "Chrome Extensions" — description: "manage extension triggers that create tiles"
  2. "Notifications" — description: "set up N&N alerts and status pings"
  3. "Wind Up Presets" — description: "create/edit preset fill-ins for buttons"

### Step 3a: Chrome Extensions

Manage which extensions feed into the dashboard:
- List connected extensions
- Add new extension trigger
- Define what tile data the extension sends (client name, action type, status)

Reference: `ahead-billing-paypal-extension` as the template pattern.

When an extension fires:
1. It creates a tile with pre-filled data
2. Tile lands on the board (LEFT by default)
3. Nested buttons auto-assigned based on extension type

### Step 3b: Notifications (N&N)

Set up alert rules:
- "Notify when a tile has been LEFT for 24h+"
- "Notify when Wind Up is incomplete"
- "Notify when tile reaches RIGHT (celebration)"

Notification methods: in-dashboard banner, console log, or chrome notification.

### Step 3c: Wind Up Presets

This is core — create reusable presets for the Wind Up system:

```
  Preset Name:    "Invoice Setup"
  Button:         PayPal Invoice
  Fields:
    - Client Name  → pull from database
    - Amount       → manual or preset
    - Due Date     → auto +30 days
    - Notes        → template text
  On Complete:    open PayPal with fields filled
```

Presets save time — instead of filling fields every time,
you pick a preset and it's ready to launch.

### Important Notes

- Chrome extensions follow the pattern in `ahead-billing-paypal-extension`
- Wind Up presets are the bridge between buttons and actions
- This personality works closely with /dashboard--client-database (pulls client data)
  and /dashboard--effects-and-travel (triggers tile movement)
- N&N = Notifications & Nudges

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SKILL 6: /dashboard--support ⭐ (Special)

```
---
name: dashboard--support
description: Admin brain — maps how every part works, its purpose, relationships, and the end goal
---
```

# dashboard--support

The brain. The bird's eye view. This personality doesn't build —
it documents, maps, and explains the entire dashboard system.

## Usage

```
/dashboard--support
```

## Instructions

### Step 0: Scan the System

Read ALL dashboard skill configs and the ROADMAP.md to understand current state.

### Step 1: Header

Print:
```
  ─── support / admin ──────────────
```

### Step 2: Menu

Use **AskUserQuestion**:
- Question: "What do you need?"
- Options:
  1. "System Map" — description: "see how every part connects (the big grid)"
  2. "Explain a Part" — description: "deep dive on one specific personality"
  3. "Health Check" — description: "check what's built, what's missing, what's broken"
  4. "End Goal Status" — description: "how close are we to the finished system"

### Step 3a: System Map (The Big Grid)

Display the full relationship map:

```
  ─── system map ───────────────────

  ┌─────────────────────────────────────────────────────────┐
  │                     /dashboard                          │
  │                    (home base)                          │
  │                        │                                │
  │    ┌──────────┬────────┼────────┬──────────┐           │
  │    │          │        │        │          │           │
  │    ▼          ▼        ▼        ▼          ▼           │
  │ client-db  effects    css    comms     support         │
  │    │          │        │        │       (this)         │
  │    │          │        │        │                      │
  │    └──────────┴────┬───┴────────┘                      │
  │                    │                                    │
  │              THE PIPELINE                               │
  │    LEFT ──→ CENTER ──→ RIGHT                           │
  │  (urgent)  (solving)  (happy)                          │
  │                                                         │
  │  Each tile carries:                                     │
  │    • Client data (from client-db)                      │
  │    • Action buttons (from mapper)                      │
  │    • Go to Link / Wind Up (from comms)                 │
  │    • Visual style (from css)                           │
  │    • Movement rules (from effects)                     │
  └─────────────────────────────────────────────────────────┘
```

### Step 3b: Explain a Part

Show for any selected personality:
1. **How it works** — what it does mechanically
2. **Its purpose** — why it exists in the system
3. **How it relates** — what it feeds into and pulls from
4. **How it contributes to the end goal**

### Step 3c: Health Check

Scan each skill folder and report:
```
  /dashboard                  ✓ built    │  ✗ missing
  /dashboard--client-database ✓ built    │  ✗ missing
  /dashboard--effects-travel  ✓ built    │  ✗ missing
  /dashboard--css             ✓ built    │  ✗ missing
  /dashboard--communication   ✓ built    │  ✗ missing
  /dashboard--support         ✓ built    │  ✗ missing
```

Flag any broken configs, missing files, or incomplete setups.

### Step 3d: End Goal Status

The end goal: a fully wired client management dashboard where
tiles flow through stages, buttons fire or wind up on the fly,
chrome extensions auto-feed the pipeline, and everything
connects seamlessly.

Show progress as a percentage and checklist of what's done vs remaining.

### The Four Questions This Skill Answers

1. **How does each part work?** → mechanical explanation
2. **What's its purpose?** → why it exists
3. **How do parts relate?** → the grid map of connections
4. **How do they work together?** → the end-to-end flow toward the goal

### Important Notes

- This skill is READ-ONLY — it never modifies other skills
- It always reads the latest state before reporting
- Built LAST because it needs the full picture
- This is the documentation layer — the living manual for the system

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Summary — The Web

```
  /dashboard ─────────────────── home base / spine
      │
      ├── /dashboard--client-database ── data layer (single source of truth)
      │
      ├── /dashboard--effects-and-travel ── motion + pipeline rules
      │
      ├── /dashboard--css ──────────────── visual foundation
      │
      ├── /dashboard--communication ────── comms + chrome + wind up presets
      │
      └── /dashboard--support ──────────── brain / admin / living manual
```

Each one has its own SKILL.md, config.md, and lives in its own folder under:
`C:\Users\chad\.claude\skills\`
