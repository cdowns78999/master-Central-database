---
name: c-payback
description: Manage the Payback section in the Wing Dashboard Space Bar overlay — locked CSS/HTML preferences, data feed updates, and structure changes.
user_invocable: true
trigger: /c-payback
---

# c-payback — Space Bar Payback Section Manager

## On Trigger

1. Say: **"Ready to update the Space Bar section"**
2. Present Chad's requested updates and confirm before making any HTML/JSON changes
3. Do NOT touch files until Chad confirms the plan

---

## File References

- **Data feed:** `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\workspot1\--wingdashapp--1--\data\feeds\payback.json`
- **Dashboard:** `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\workspot1\--wingdashapp--1--\index.html`

---

## payback.json Structure

```json
{
  "sections": [
    {
      "label": "Section Name",
      "color": "#hex",
      "entries": [
        {
          "name": "Entry Name",
          "amount": 0,
          "status": "status string",
          "deadline": "YYYY-MM-DD",
          "note": "optional note"
        }
      ]
    }
  ]
}
```

- Credit card entries also include `"minPay"` and `"interest"` fields
- Leads entries use green status pills and green dots

---

## Current Sections (in order)

| # | Section | Color | Notes |
|---|---------|-------|-------|
| 1 | Leads | purple `#6366f1` | Green dots + green "lead" status pills (`#10b981`) |
| 2 | Work Bills | red `#ef4444` | |
| 3 | Campaigns Behind | amber `#f59e0b` | |
| 4 | Personal Bills | amber `#f59e0b` | |
| 5 | Credit Cards | blue `#0ea5e9` | Shows min pay + total debt |

---

## LOCKED CSS Preferences

These are final. Do not deviate unless Chad explicitly overrides.

### Payback Container
- `border-radius: 18px`
- Border and background: `rgba` red tint
- `padding: 22px 20px`

### Section Header (PAYBACK title)
- Font: **Outfit**, `1.1rem`, weight `700`, `text-transform: uppercase`
- Grand total displayed in this header

### Category Headers
- Font: **Outfit**, `1.02rem`, weight `700`, `text-transform: uppercase`
- Clickable to collapse/expand with arrow rotation animation
- Categories **default open**
- Collapse uses `max-height` transition `0.3s`

### Row Grid
- 5-column grid: `14px` dot | `1fr` name | `80px` status | `90px` min/due | `100px` owed
- Row padding: `5px 16px` (skinny rows)

### Row Text — Names
- Font: **Outfit**, `0.82rem`, weight `600`

### Status Pills
- Font: **Outfit**, `0.62rem`
- `border-radius: 20px` (squishy shape)
- `padding: 5px 14px`

### Owed Amounts
- Font: **JetBrains Mono**, `0.76rem`, weight `700`
- Color: red

### Min Pay
- Font: **JetBrains Mono**, `0.72rem`, weight `600`
- Color: green `#10b981`

### Countdown Timers
- Font: **JetBrains Mono**, `0.72rem`
- Color states: normal / soon / urgent / overdue (escalating color shift)

### Section-Specific Overrides
- **Leads:** dots and status pills use green `#10b981` instead of red
- Each category has a **TOTAL row** at the bottom with a `border-top` separator

---

## Workflow

1. **Trigger** — say "Ready to update the Space Bar section"
2. **Ask** — find out what Chad wants to add, change, or remove. Present current state from `payback.json` if helpful
3. **Update payback.json** — add/edit/remove entries as requested
4. **Touch index.html only if** CSS or structural changes are needed (new columns, new section type, style tweaks)
5. **Refresh** — open dashboard with cache-bust URL (`?v=$(date +%s)`) so changes are visible immediately
