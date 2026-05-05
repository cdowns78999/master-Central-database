---
name: c19-asst-change-wing
description: Wing editor assistant — drop a prompt, get a guided menu to edit any wing pill, with auto-backup
---

# c19-asst-change-wing

Fast-launch wing editor. Drop a prompt in the wing input box, hit Enter, and Claude opens a contextualized session to edit the wing menu dashboard — with backup safety built in.

## Usage

```
/c19-asst-change-wing
```

Or: triggered automatically from the drop input boxes inside 🎮 wing-menu-dashboard copy 3.html.

## Paths

**Target file:**
```
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\Play 2 copy 3\package 1\🎮 wing-menu-dashboard copy 3.html
```

**Backup folder:**
```
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\Play 2 copy 3\package 1\.wing-backups\
```

## Instructions

IMPORTANT: Use the AskUserQuestion tool for all menu selections. Keep it clean, minimal, scannable.

### Step 0: Greet + Show Context

Print this header:
```
  🔵🟢🟣🔴🟠  wing editor
  ╭──────────────────────────────────────╮
  │  🎮 wing-menu-dashboard copy 3.html  │
  │  ✦ backup-on-edit enabled            │
  ╰──────────────────────────────────────╯
```

If the user passed a prompt from the drop input, acknowledge it:
```
  prompt: "{their input here}"
```

### Step 1: What Do You Want to Change?

Use **AskUserQuestion** with 3 choices:

- Question: "What would you like to change?"
- Options:
  1. **"Wing Section"** — description: "Pick 1 of 4 wing columns (left or right)"
  2. **"A Specific Button"** — description: "Pick 1 of 6 pill buttons in a wing section"
  3. **"Button Detail"** — description: "Edit a detail inside a specific pill (label, sub, icon)"

---

### Path A: Wing Section (choice 1)

**A1:** Use AskUserQuestion:
- Question: "Which wing?"
- Options:
  1. "Left Wing" — description: "Library side (Clients, Suppliers, Services, Prices)"
  2. "Right Wing" — description: "Tools side (Actions, Templates, History, Settings)"

**A2:** Based on wing choice, use AskUserQuestion:
- Question: "Which section?"
- Options (Left): Clients | Suppliers | Services | Prices
- Options (Right): Actions | Templates | History | Settings

**A3:** Use AskUserQuestion:
- Question: "What do you want to do with this section?"
- Options:
  1. "Rename it" — description: "Change the section label"
  2. "Replace all pills" — description: "New set of 6 pills"
  3. "Reorder pills" — description: "Shuffle the pill order"

Then proceed to **Step 2: Execute**.

---

### Path B: Specific Button (choice 2)

**B1:** Use AskUserQuestion — Which wing? (same as A1)

**B2:** Use AskUserQuestion — Which section? (same as A2)

**B3:** Read the target file. Find the 6 pills in that section. Present them as AskUserQuestion:
- Question: "Which pill?"
- Options: List the 6 pill labels from that section (read from the HTML)

**B4:** Use AskUserQuestion:
- Question: "What do you want to do with this pill?"
- Options:
  1. "Edit it" — description: "Change label, subtitle, or icon"
  2. "Replace it" — description: "Swap it for something new"
  3. "Remove it" — description: "Delete this pill from the section"

Then proceed to **Step 2: Execute**.

---

### Path C: Button Detail (choice 3)

**C1-C3:** Same as B1-B3 (pick wing → section → pill)

**C4:** Use AskUserQuestion:
- Question: "Which detail?"
- Options:
  1. "Label" — description: "The main pill text (e.g. 'View All Clients')"
  2. "Subtitle" — description: "The small mono text below (e.g. 'Browse roster')"
  3. "Icon" — description: "The icon character in the pill-icon box"

**C5:** Ask in plain text: "What should the new value be?"

Then proceed to **Step 2: Execute**.

---

### Step 2: Execute (All Paths Lead Here)

**2a — Backup:**
1. Create the `.wing-backups` folder if it doesn't exist
2. Copy `🎮 wing-menu-dashboard copy 3.html` to `.wing-backups/wing-backup-{YYYY-MM-DD-HHmmss}.html`
3. Confirm: `✓ backup saved → wing-backup-{timestamp}.html`

**2b — Edit:**
1. Read the target file
2. Find the exact HTML section/pill that needs editing
3. Use the Edit tool to make the change
4. Confirm what was changed:
```
  ✓ edit complete
  ├── wing: {left/right}
  ├── section: {section name}
  ├── pill: {pill label}
  └── change: {what changed}
```

**2c — Anything Else?**

Use AskUserQuestion:
- Question: "Anything else to change?"
- Options:
  1. "Yes, another edit" — description: "Loop back to Step 1"
  2. "No, we're good" — description: "Done for now"

If "Yes" → go back to Step 1.
If "No" → print closing:
```
  🔵🟢🟣🔴🟠  wing editor
  ╭──────────────────────────────────────╮
  │  ✓ all edits saved                   │
  │  ✓ backup on file                    │
  │  🎮 wing-menu-dashboard copy 3.html  │
  ╰──────────────────────────────────────╯
```
