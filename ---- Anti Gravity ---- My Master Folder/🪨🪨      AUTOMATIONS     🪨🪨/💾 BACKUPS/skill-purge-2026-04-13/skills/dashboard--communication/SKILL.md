---
name: dashboard--communication
description: Comms hub — N&N notifications, Chrome extension triggers, and message routing
---

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
Read `C:\Users\chad\.claude\skills\dashboard--communication\data\presets.json` for current wind-up presets.

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

Manage which extensions feed into the dashboard.

Use **AskUserQuestion**:
- Question: "Extension action?"
- Options:
  1. "List Connected" — description: "see all registered extensions"
  2. "Add Extension" — description: "register a new extension trigger"
  3. "Edit Extension" — description: "update an existing extension config"

**Reference pattern**: `ahead-billing-paypal-extension` (3-file pattern: manifest.json, content.js, styles.css with localStorage state machine).

When an extension fires:
1. It creates a tile with pre-filled data
2. Tile lands on the board (LEFT by default)
3. Nested buttons auto-assigned based on extension type
4. Client record created in clients.json

Extension registry stored in config.md.

### Step 3b: Notifications (N&N)

N&N = Notifications & Nudges.

Set up alert rules:

Use **AskUserQuestion**:
- Question: "Notification action?"
- Options:
  1. "View Rules" — description: "see current notification triggers"
  2. "Add Rule" — description: "create a new alert trigger"
  3. "Edit Rule" — description: "modify an existing alert"

Default alert rules:
- "Notify when a tile has been LEFT for 24h+" (stale urgent)
- "Notify when Wind Up is incomplete" (abandoned preset)
- "Notify when tile reaches RIGHT" (celebration)

Notification methods: in-dashboard banner, console log, or chrome notification.

### Step 3c: Wind Up Presets

This is core — create reusable presets for the Wind Up system.

Use **AskUserQuestion**:
- Question: "Preset action?"
- Options:
  1. "View Presets" — description: "see all saved wind-up presets"
  2. "Create Preset" — description: "build a new wind-up template"
  3. "Edit Preset" — description: "modify an existing preset"
  4. "Delete Preset" — description: "remove a preset"

**To create a preset**, collect:
- Preset name (e.g., "Invoice Setup")
- Target button (which mapper button this applies to)
- Fields to pre-fill:
  - Source: `client-db` (auto-pull from database), `manual` (user enters), `auto` (calculated), `template` (preset text)
  - Auto flag: whether the field fills automatically or needs user input
- On Complete action: what happens after fields are filled (e.g., "open PayPal with fields filled")

Save presets to `C:\Users\chad\.claude\skills\dashboard--communication\data\presets.json`.

**Preset example:**
```
  Preset Name:    "Invoice Setup"
  Button:         PayPal Invoice
  Fields:
    - Client Name  → pull from database (auto)
    - Amount       → manual input
    - Due Date     → auto +30 days
    - Notes        → template text
  On Complete:    open PayPal with fields filled
```

Presets save time — instead of filling fields every time,
you pick a preset and it's ready to launch.

### Important Notes

- Chrome extensions follow the pattern in `ahead-billing-paypal-extension`
- Wind Up presets are the bridge between buttons and actions
- This personality works closely with:
  - `/dashboard--client-database` — pulls client data for auto-fill fields
  - `/dashboard--effects-and-travel` — triggers tile movement on preset completion
- N&N = Notifications & Nudges
- Presets stored in presets.json — reusable, not one-off
