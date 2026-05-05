---
name: grid-scannnnnner
description: Campaign data scanner — dump raw data, get clean organized grids on campaign-overview.html
---

# grid-scannnnnner

Scan in campaign/streaming data and organize it into clean HTML grids on campaign-overview.html.

## Usage

```
/grid-scannnnnner
```

## Instructions

### Step 1: Create Automation Folder (if not present)

Check if the automation folder exists. If not, create it:

- **Automation folder:**
  `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A4  -- --- Grid Scanner\`

- **Backup subfolder:**
  `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A4  -- --- Grid Scanner\-- ☁️☁️a4 back up\`

Use Bash `mkdir -p` to create both if they don't exist. Confirm creation or confirm they already exist.

### Step 2: Check Core Setup

Verify that the base HTML file exists at:

`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\y - [---] [---] [---] FfffffLLLLUUUUUUUTTTERRRRR\campaign-overview.html`

- If it exists: proceed
- If it does NOT exist: stop and tell Chad — "campaign-overview.html is missing from the Flutter folder. Drop it in there or point me to the new location."

### Step 3: Backup

Copy `campaign-overview.html` to the backup folder with today's date:

```
cp "<flutter-path>/campaign-overview.html" "<automations-path>/-- 🪨A4  -- --- Grid Scanner/-- ☁️☁️a4 back up/MM-DD-YYYY -- campaign-overview.html"
```

- **Date format:** `MM-DD-YYYY`
- Example: `02-18-2026 -- campaign-overview.html`
- Always do this — no exceptions, every single time.

### Step 4: Signal Ready & Ask for Data

Print this exact checklist (fill in today's date):

```
  ─── /grid-scannnnnner ─────────────────

  ✓ automation folder · ready
  ✓ campaign-overview.html · found
  ✓ backup saved · MM-DD-YYYY

  Dump your data, give me context,
  and I'll order it in grids.

  ──────────────────────────────────────
```

Then wait for Chad's input.

### Step 5: Process the Data Dump

When Chad pastes data and/or gives context:

1. **Parse the raw data** — could be tab-separated, comma-separated, pasted from a spreadsheet, or just free-form text
2. **Ask which artists/items to include** if unclear — don't assume "all". Chad may only want a filtered subset (like last time: just Jules Liesl, Rachel Holt, Shane Stevens)
3. **Organize into clean HTML grids** using the same style as campaign-overview.html:
   - Use `.report-table` class for tables
   - Use `.section-header` for section titles
   - Use `.sep` / `.sep-bottom` dashed separators
   - Use artist name grouping rows (`font-weight:600; font-style:normal; padding-top:16px; border:none;`)
   - Use totals rows (`font-weight:600;`)
   - Match the existing Inter font, italic text, clean white aesthetic
4. **Insert the new grid** at the bottom of campaign-overview.html, before the closing `</div>` of `.page`
5. **Save** the updated file

### Step 6: Confirm

After inserting the grids, confirm:

```
  ─── grid-scannnnnner ──────────────────

  ✓ data parsed
  ✓ grids built · [N] artist(s)
  ✓ campaign-overview.html updated
  ✓ backup at · MM-DD-YYYY -- campaign-overview.html

  ──────────────────────────────────────
```

## Key Paths

| What | Path |
|------|------|
| Base HTML | `...My Master Folder\y - [---] [---] [---] FfffffLLLLUUUUUUUTTTERRRRR\campaign-overview.html` |
| Automation folder | `...🪨🪨 AUTOMATIONS 🪨🪨\-- 🪨A4  -- --- Grid Scanner\` |
| Backup folder | `...🪨🪨 AUTOMATIONS 🪨🪨\-- 🪨A4  -- --- Grid Scanner\-- ☁️☁️a4 back up\` |

## HTML Template Reference

New grids should follow this structure:

```html
<!-- ── Section Title ── -->
<div class="report-header">SECTION TITLE</div>
<div class="sep">--- --- ---&nbsp;&nbsp; --- --- --- ---&nbsp;&nbsp; --- --- ---&nbsp;&nbsp; --- --- --- ---</div>

<table class="report-table">
  <thead>
    <tr>
      <th>COLUMN 1</th>
      <th>COLUMN 2</th>
      <th>COLUMN 3</th>
    </tr>
  </thead>
  <tbody>
    <!-- Artist group header -->
    <tr><td colspan="3" style="font-weight:600; font-style:normal; padding-top:16px; border:none;">Artist Name</td></tr>
    <tr>
      <td>Track &middot; Order Info</td>
      <td>10,000</td>
      <td>Status</td>
    </tr>
    <!-- Totals row -->
    <tr>
      <td style="font-weight:600;">Artist Total</td>
      <td style="font-weight:600;">XX,000</td>
      <td></td>
    </tr>
  </tbody>
</table>

<div class="sep-bottom">--- --- ---&nbsp;&nbsp; --- --- --- ---&nbsp;&nbsp; --- --- ---&nbsp;&nbsp; --- --- --- ---</div>
```

## Important Notes

- **ALWAYS backup before editing** — no exceptions
- Match existing campaign-overview.html styling exactly
- Don't add all data blindly — ask Chad which artists/items if the dump is large
- Keep grids clean and scannable — no clutter
- Numbers should use comma formatting (10,000 not 10000)
- Use `&middot;` for mid-dots between track name and order info
