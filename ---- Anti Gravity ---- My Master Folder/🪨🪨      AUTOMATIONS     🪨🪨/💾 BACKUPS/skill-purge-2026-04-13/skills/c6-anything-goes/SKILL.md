---
name: c6-anything-goes
description: Client-facing presentation builder — clean campaign overviews, project recaps, anything your client needs to see
---

# c6-anything-goes

Generate clean, client-facing HTML presentations. Strips out internal pricing, order details, and backend data — keeps it professional and shareable.

## Usage

```
/c6-anything-goes
```

## Paths

- **Base template:**
  `C:\Users\chad\.claude\skills\c6-anything-goes\base-template.html`

- **Output folder:**
  `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A4  -- --- Client Presentations\🪨A4\`

- **Backup folder:**
  `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A4  -- --- Client Presentations\-- ☁️☁️a4 back up\`

- **Internal data reference (campaign overview with pricing):**
  `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\y - [---] [---] [---] FfffffLLLLUUUUUUUTTTERRRRR\campaign-overview.html`

## Instructions

IMPORTANT: Use the AskUserQuestion tool for ALL menu selections. Use minimal ASCII headers between steps. Keep it clean and scannable.

### Step 1: Greet + Ask Client Name
Print this header, then ask:
```
  ─── anything goes ─────────────────
```
Then say: "client name?"
Wait for response. This fills {CLIENT_NAME} everywhere.

### Step 2: Ask Presentation Type
Print header:
```
  ─── {CLIENT_NAME} ─────────────────
```
Then use **AskUserQuestion** with these options:
- Question: "What are we building?"
- Options:
  1. "Campaign Overview" — description: "active campaigns with platform + progress status (no pricing)"
  2. "Project Recap" — description: "summary of what's been done, what's next — paste notes"
  3. "Status Update" — description: "quick progress table — campaigns, milestones, deliverables"
  4. "Custom Presentation" — description: "you tell me sections + content, I build it clean"

### Step 3: Backup
- If any previous output exists in the A4 output folder for this client, copy it to the backup folder with today's date:
  ```
  cp "<output-folder>/chad43 - {CLIENT_NAME}.html" "<backup-folder>/MM-DD-YYYY -- chad43 - {CLIENT_NAME}.html"
  ```
- If no previous file exists, skip backup.
- Print:
  ```
    ✓ backup saved
  ```
  OR:
  ```
    ✓ no previous file — skipping backup
  ```

---

## Workflow 0: Campaign Overview

The go-to for showing clients where their campaigns stand. Pulls structure from the campaign overview template but strips ALL internal data.

Print header:
```
  ─── {CLIENT_NAME} · campaign overview ─
```

**Step A:** Ask: "Paste campaign data or tell me the campaigns:"

Wait for user input. This can be:
- Raw paste from the internal campaign-overview.html
- A quick list like "Jules Liesl - Cherry, Spotify, 100K, on track"
- Just artist/track names and you'll ask for the rest

**Step B:** For each campaign, extract or ask for:
- **Artist — Track** (name line)
- **Platform** (e.g. Spotify, Apple Music, YouTube)
- **Campaign type** (e.g. Playlisting Campaign, Ad Campaign)
- **Target** (stream/view count — the goal, not what was paid)
- **Status** — one of: `Active`, `On Track`, `Complete`, `Launching Soon`

**STRIP these fields — never include in client output:**
- Variance numbers (// -1,000, // +120,000)
- "Paid For" and "Outstanding" columns
- Torok order details
- Individual order line items, dates, costs
- Any internal pricing or vendor info

**Step C:** Build campaign blocks using this HTML pattern:
```html
<div class="campaign">
  <div class="name">Artist — Track</div>
  <div class="platform">Platform · Campaign Type — Target</div>
  <div class="status STATUS_CLASS">// Status</div>
</div>
```

Status classes:
- `active` (green) — for Active, On Track, Complete
- `pending` (amber) — for Launching Soon, In Progress

**Step D:** Optionally build a summary table:
```html
<div class="report-header">CAMPAIGN SUMMARY</div>
<div class="sep">--- --- --- ...</div>
<table class="report-table">
  <thead>
    <tr>
      <th>CAMPAIGN</th>
      <th>TARGET</th>
      <th>STATUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Artist — Track</td>
      <td>100,000</td>
      <td class="complete">On Track</td>
    </tr>
  </tbody>
</table>
```

**Step E:** Show preview then confirm.

---

## Workflow 1: Project Recap

For after-the-fact summaries — what happened, what was delivered, what's next.

Print header:
```
  ─── {CLIENT_NAME} · recap ─────────
```

**Step A:** Say: "Paste your notes or tell me what to include:"

**Step B:** Organize into clean sections:
- **What was delivered** — completed items
- **Current status** — where things stand now
- **Next steps** — upcoming actions with dates if available

**Step C:** Build using campaign blocks for completed items, and a notes section for next steps.

**Step D:** Show preview then confirm.

---

## Workflow 2: Status Update

Quick progress snapshot — table-driven, minimal text.

Print header:
```
  ─── {CLIENT_NAME} · status update ──
```

**Step A:** Say: "What campaigns or items need a status update?"

**Step B:** Build a single clean table:
```html
<table class="report-table">
  <thead>
    <tr>
      <th>ITEM</th>
      <th>TARGET</th>
      <th>STATUS</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>
```

Status values: `Complete`, `On Track`, `In Progress`, `Launching Soon`

**Step C:** Show preview then confirm.

---

## Workflow 3: Custom Presentation

User defines the sections and content, you build it clean.

Print header:
```
  ─── {CLIENT_NAME} · custom ────────
```

**Step A:** Use **AskUserQuestion**: "How many sections?" with options: "1", "2", "3", "4+"

**Step B:** For each section, ask for:
- Section title
- Content (campaigns, tables, notes, lists — anything)

**Step C:** Build using the base template patterns — section headers, sep lines, campaign blocks, tables, notes as needed.

**Step D:** Show preview then confirm.

---

### Step 4: Preview + Confirm
Always show a minimal ASCII preview before saving:
```
  ─── preview ────────────────────────

  AHEAD ARTIST SOLUTIONS
  {CLIENT_NAME}
  {DATE}

  {SECTION_TITLE}
  ─────────────────────
  1  Artist — Track
     Platform · Type — Target
     // Status

  2  Artist — Track
     ...

  CAMPAIGN SUMMARY
  ─────────────────────
  Campaign         Target     Status
  Artist — Track   100,000    On Track
  ...

  ──────────────────────────────────────
```

Then use **AskUserQuestion**: "Look good?" with options: "Yes, save it" / "No, let me change something"

### Step 5: Save Output
- Read the base template from `C:\Users\chad\.claude\skills\c6-anything-goes\base-template.html`
- Replace all `{PLACEHOLDER}` values with collected data
- Fill `{DATE}` with today's date formatted as `Month DD, YYYY` (e.g. February 18, 2026)
- Fill `{SECTION_TITLE}` based on workflow (CAMPAIGN OVERVIEW, PROJECT RECAP, STATUS UPDATE, or custom)
- Build campaign blocks, tables, and notes sections as needed
- Remove any unused placeholder sections (e.g. if no notes, remove `{NOTES}`)
- Save as a NEW file:
  ```
  <output-folder>/chad43 - {CLIENT_NAME}.html
  ```
- NEVER overwrite the base template

### Step 6: Confirm
Print:
```
  ─── done ────────────────────────────

  ✓ backup · [saved / skipped]
  ✓ new file · chad43 - {CLIENT_NAME}.html
  ✓ type · [campaign overview / recap / status / custom]
  ✓ sections · [count]
  ✓ client · {CLIENT_NAME}

  ──────────────────────────────────────
```

## What Gets Stripped (NEVER include)

These fields exist in the internal campaign-overview.html but must NEVER appear in client output:
- **Variance numbers** — `// -1,000`, `// +120,000`
- **"Paid For" column** — internal accounting
- **"Outstanding" column** — internal accounting
- **Torok Order Details section** — vendor order line items
- **Individual order dates** — `Bundle 4/3`, `500K Order 6/12`
- **Stream splits per order** — `10,000`, `20,000` breakdowns
- **Vendor names** — Torok or any third-party vendor references
- **Cost/pricing data** — dollar amounts, payment status
- **"Third Party" labels** — keep campaign type generic

Instead, show:
- Campaign name (artist + track)
- Platform + campaign type (without "Third Party")
- Target number (the goal they're working toward)
- Status (Active, On Track, Complete, Launching Soon)

## Copy Style Guide

- Professional but approachable — not corporate, not casual
- Short, clear labels — no fluff
- Status language: "On Track", "Complete", "Active", "Launching Soon"
- Campaign type: "Playlisting Campaign" not "Playlisting Campaign (Third Party)"
- Numbers formatted with commas: 100,000 not 100000
- Dates as Month DD, YYYY in the header, [M/DD] inline if needed

## Important Notes

- ALWAYS backup before overwriting any existing client file
- NEVER overwrite the base template
- NEVER include pricing, variance, outstanding, or vendor data
- Use AskUserQuestion for ALL selections
- Keep ASCII headers minimal and clean
- Output filenames: `chad43 - {CLIENT_NAME}.html`
- The base template style matches the internal campaign overview — same Inter font, same clean white layout, same dashed separators — so the look is consistent across internal and external docs
