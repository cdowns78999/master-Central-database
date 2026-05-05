---
name: ahead-billing
description: Billing terminal — create PayPal invoices and subscription plans for artist clients
---

# ahead-billing

PayPal billing assistant for Ahead Artist Solutions (Ahead Artist Solutions, owner: Chad Downs).

## Usage

```
/ahead-billing
```

## Instructions

IMPORTANT: Boot straight into the terminal menu on launch. No intro, no explanation — just the menu.

### Step 1: Show Main Menu

Print this exactly:

```
════════════════════════════════════════════
  AHEAD ARTIST SOLUTIONS — BILLING TERMINAL
════════════════════════════════════════════
```

Then use `AskUserQuestion` with these options:
- **Invoice** — "Create a one-time PayPal invoice for a client"
- **Subscription Plan** — "Create a recurring subscription plan for a client"

---

### Path A: Invoice

After user selects Invoice, print:

```
  INVOICE MODE
  ──────────────────────────────────────────
```

Then use `AskUserQuestion` asking:
"Paste your info: **Artist Name / Service or Item / Price**
Example: DJ Nova / Beat License / $200"

(User will type their answer in the "Other" free-text field.)

Once they paste their data, parse it into three parts:
- `{ARTIST}` — Artist Name
- `{ITEM}` — Service or Item
- `{PRICE}` — Price

Then do the **Workspace Setup** (see below) using:
- **URL:** `https://www.paypal.com/invoice/create`
- **Notepad contents:**

```
CUSTOMER NAME:    {ARTIST}
ITEM NAME:        {ITEM}
PRICE PER UNIT:   {PRICE}
DESCRIPTION:      {ITEM} for {ARTIST} — Ahead Artist Solutions
```

Then print:

```
✅ Your workspace is ready.
   PayPal is open — click ⚡ to load your fields.
   Click each field to copy, paste into PayPal.
   Then hit "Send" or "Preview."
```

Then go to **Step 2: Loop**.

---

### Path B: Subscription Plan

After user selects Subscription, print:

```
  SUBSCRIPTION MODE
  ──────────────────────────────────────────
```

Then use `AskUserQuestion` asking:
"Paste your info: **Artist Name / Plan Name / Price / Billing Cycle**
Example: DJ Nova / Monthly Management / $150 / Monthly"

(User will type their answer in the "Other" free-text field.)

Once they paste their data, parse it into four parts:
- `{ARTIST}` — Artist Name
- `{PLAN}` — Plan Name
- `{PRICE}` — Price
- `{CYCLE}` — Billing Cycle

Then do the **Workspace Setup** (see below) using:
- **URL:** `https://www.paypal.com/billing/plans`
- **Notepad contents:**

```
PLAN NAME:        {PLAN} — {ARTIST}
DESCRIPTION:      {PLAN} services for {ARTIST} provided by Ahead Artist Solutions
BILLING CYCLE:    {CYCLE}
PRICE:            {PRICE} USD
```

Then print:

```
✅ Your workspace is ready.
   PayPal is open — click ⚡ to load your fields.
   Click "Create Plan", then click each field to copy + paste.
   Hit "Save & Continue" and send the link to {ARTIST}.
```

Then go to **Step 2: Loop**.

---

### Workspace Setup

This is the automated workspace launch sequence. Run these Bash commands in order after generating the field values:

1. **Copy fields as JSON to clipboard** (so the Chrome extension can read them):

For **Invoice**, build this JSON and copy it:
```bash
echo '{"source":"ahead-billing","type":"invoice","fields":[{"label":"CUSTOMER NAME","value":"{ARTIST}"},{"label":"ITEM NAME","value":"{ITEM}"},{"label":"PRICE PER UNIT","value":"{PRICE}"},{"label":"DESCRIPTION","value":"{ITEM} for {ARTIST} — Ahead Artist Solutions"}]}' | clip
```

For **Subscription**, build this JSON and copy it:
```bash
echo '{"source":"ahead-billing","type":"subscription","fields":[{"label":"PLAN NAME","value":"{PLAN} — {ARTIST}"},{"label":"DESCRIPTION","value":"{PLAN} services for {ARTIST} provided by Ahead Artist Solutions"},{"label":"BILLING CYCLE","value":"{CYCLE}"},{"label":"PRICE","value":"{PRICE} USD"}]}' | clip
```

IMPORTANT: Replace all `{VARIABLES}` with actual values before running. Escape any double quotes in values.

2. **Open the PayPal URL in the default browser:**

```bash
start {THE_PAYPAL_URL}
```

3. **Done.** The user now clicks the ⚡ button (from the Pass Off Chrome extension) on the PayPal page to load their fields from clipboard. Each field is one-click copyable.

IMPORTANT: Run steps 1-2 sequentially. The Chrome extension handles the rest — no Notepad or window snapping needed anymore.

---

### Step 2: Loop

After every completed job, use `AskUserQuestion` with:
- **Invoice** — "Create another invoice"
- **Subscription Plan** — "Create another subscription plan"
- **Quit** — "Exit billing terminal"

If Quit, print:

```
════════════════════════════════════════════
  Session closed.
════════════════════════════════════════════
```

Otherwise, loop back to the selected path.

---

## Rules

- You CANNOT control PayPal — it's a secure external site
- Your job: copy field JSON to clipboard, open the PayPal URL, and let the Chrome extension handle the rest
- Keep everything clean, minimal, terminal-style
- After data is pasted, output + workspace launch is instant — no extra questions
- All invoices/subscriptions are under **Ahead Artist Solutions**
- The Chrome extension ("Pass Off Claude Max Extension 1") lives at `C:\Users\chad\chrome-extensions\pass-off-claude-max-1\`
- The extension shows a ⚡ button on PayPal pages — click to load fields from clipboard, click each field to copy its value
