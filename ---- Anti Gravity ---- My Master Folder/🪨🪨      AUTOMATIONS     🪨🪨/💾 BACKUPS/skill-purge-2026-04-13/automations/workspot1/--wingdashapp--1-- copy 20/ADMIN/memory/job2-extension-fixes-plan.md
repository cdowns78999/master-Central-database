# Job 2: Chrome Extension + Payment Bridge — Implementation Plan

**Generated:** 2026-03-20
**Status:** RESEARCH COMPLETE — ready for Sub-agent 3 to implement

---

## Architecture Overview

### Current System
- **Dashboard** (`index.html`) writes `passoff_billing_data` to localStorage, then opens the platform tab via `window.open(targetUrl, '_blank')`
- **Extensions** (content scripts) run on their respective platform domains, read `passoff_billing_data` from localStorage on init
- **Critical limitation:** localStorage is per-origin. The dashboard writes to its own origin's localStorage, but extensions read from the *platform domain's* localStorage. This means the data only works if the extension has already been manually loaded once on that domain, OR the `init()` check finds data the extension itself previously saved.
- **Actual flow:** Dashboard writes to its own localStorage, opens platform tab. Extension boots on platform domain, checks *that domain's* localStorage for `passoff_billing_data`. If empty, it falls through to `showMenu()`. The dashboard's `buildPassoff()` at line 21017-21046 creates structured JSON, but the extensions can't access it cross-origin.

**IMPORTANT DISCOVERY:** The cross-origin localStorage issue means the current `passoff_billing_data` bridge between dashboard and extensions likely does NOT work as intended. The extensions would only see the data if they were running on the same origin as the dashboard. This needs to be accounted for in all 4 fixes. The recommended approach for all fixes is to use `chrome.storage.local` (accessible cross-origin by the same extension) instead of `localStorage` for the passoff bridge.

### Files Inventory

| Extension | Content Script | Manifest | Stylesheet |
|-----------|---------------|----------|------------|
| **Cash App** | `🔧 ext/ahead-billing-cashapp-extension/content.js` (372 lines) | `manifest.json` | `styles.css` |
| **PayPal** | `🔧 ext/ahead-billing-paypal-extension/content.js` (391 lines) | `manifest.json` | `styles.css` |
| **Stripe** | `🔧 ext/ahead-billing-stripe-extension/content.js` (392 lines) | `manifest.json` | `styles.css` |
| **Venmo** | `🔧 ext/ahead-billing-venmo-extension/content.js` (384 lines) | `manifest.json` | `styles.css` |
| **Dashboard** | `--wingdashapp--1--/index.html` lines 20597-21240 | — | (inline) |

### Extension Architecture (all 4 follow same pattern)
```
init() → check localStorage for STORAGE_KEY
  ├─ Found: parse JSON → showFormGuide()
  └─ Not found: showMenu() → showInput(mode) → parseAndConfirm() → showReadyScreen() → showFormGuide()
```

### Key Differences Between Extensions

| Feature | PayPal | Stripe | Venmo | Cash App |
|---------|--------|--------|-------|----------|
| CSS prefix | `pp-` | `pp-` (reuses PayPal's) | `pp-` (reuses PayPal's) | `ca-` |
| Invoice fields | CUSTOMER NAME, ITEM NAME, PRICE PER UNIT, DESCRIPTION | CUSTOMER NAME, LINE ITEM DESCRIPTION, AMOUNT, MEMO | RECIPIENT NAME, NOTE/DESCRIPTION, AMOUNT, WHAT IT'S FOR | TO, FOR, AMOUNT, NOTE |
| Sub fields (invoice) | `Artist / Item / Price` | `Customer / Item / Amount / Memo` | `Recipient / Note / Amount / What for` | `To / For / Amount / Note` |
| Sub fields (sub) | `Artist / Plan / Price / Cycle` | `Product / Desc / Price / Cycle` | `Recipient / Plan / Amount / Frequency` | `To / Plan / Amount / Frequency` |
| Sub steps | 4 (Choose product, Create plan, Define pricing, Review) | 4 (Create product, Product details, Set pricing, Review) | 4 (Set up recipient, Plan details, Amount & frequency, Review) | **3** (Set up recipient, Amount & frequency, Review) |
| Accent color | `#60a5fa` (blue) | `#635bff` (purple) | `#3bb8e6` (cyan) | `#00c853` (green) |
| Target URL (inv) | `paypal.com/invoice/create` | `dashboard.stripe.com/invoices/create` | `account.venmo.com/pay` | `cash.app/` |
| Target URL (sub) | `paypal.com/billing/plans` | `dashboard.stripe.com/subscriptions/create` | `account.venmo.com/pay` | `cash.app/` |

---

## Fix 1: End Signal (Completion Callback)

### Problem
When the user finishes copying all fields from the extension's form guide, there is no signal back to the dashboard. The dashboard's right wing "operations" column has queued jobs, but payment jobs never get marked complete.

### Recommended Approach: `passoff_billing_result` via `chrome.storage.local`

Since localStorage is per-origin (and the extension runs on a different origin than the dashboard), we need `chrome.storage.local` for cross-page communication. However, the dashboard cannot read `chrome.storage.local` directly. Two viable approaches:

**Option A — localStorage + storage event (same-origin only)**
- Would only work if dashboard and extension are on the same origin — NOT the case here.

**Option B — `chrome.storage.local` + background service worker (RECOMMENDED)**
- Extension writes result to `chrome.storage.local`
- Add a `background.js` service worker to each extension
- Background script listens for storage changes, then uses `chrome.tabs.sendMessage` to notify dashboard tab
- Dashboard listens via a small injected content script on its own origin, OR uses `window.postMessage` from a helper

**Option C — Simpler: localStorage polling (dashboard already does this)**
- The dashboard ALREADY polls `passoff_billing_result` from localStorage at lines 21214-21235
- Since the dashboard reads its OWN localStorage, the extension would need to write to the dashboard's origin localStorage — not possible directly
- BUT: If the user navigates back to the dashboard tab, the extension could inject into it... too complex

**RECOMMENDED: Option B-Lite — Extension writes `passoff_billing_result` to `chrome.storage.local`, plus a new background.js that injects a tiny content script on the dashboard origin to write the result into the dashboard's localStorage**

Actually, simplest viable approach:

**FINAL RECOMMENDATION: Use `BroadcastChannel` API**
- Works across tabs on the same browser, no origin restriction for same-extension contexts
- Fallback: The dashboard already has a `pollPayPalComplete()` that checks `localStorage.getItem('passoff_billing_result')` every 5 seconds (line 21214-21235). We just need each extension to write this key when done. Since they're on different origins, we need to bridge it.

**SIMPLEST WORKING APPROACH:**
1. Add a `background.js` service worker to each extension
2. When extension user clicks "Done" (new button), content script sends `chrome.runtime.sendMessage({type: 'passoff_complete', data: {...}})`
3. `background.js` receives it, finds the dashboard tab via `chrome.tabs.query()`, and executes a small script that writes `passoff_billing_result` to the dashboard tab's localStorage
4. Dashboard's existing `pollPayPalComplete()` (lines 21186-21237) already picks this up

### What triggers "done" in each extension

Currently, there is NO explicit "done" trigger. Options:
- **Add a "Done" button** to the form guide and to the last subscription step — cleanest UX
- Track which fields have been copied and auto-trigger when all are copied — fragile, user might not copy all fields

**Recommendation:** Add a "Done — Return to Dashboard" button that appears in the form guide (invoice mode) and on the last subscription step page.

### Data the signal carries
```json
{
  "client": "DJ Nova",
  "method": "PayPal",
  "paymentType": "invoice",
  "status": "complete",
  "completedAt": "2026-03-20T14:30:00.000Z",
  "fieldsCopied": 4,
  "payUrl": null
}
```

### Files that change

| File | Changes |
|------|---------|
| `cashapp-extension/content.js` | Add "Done" button in `showFormGuide()` invoice section (~line 218-228) and in `showSubPage()` after the last step (~line 314-316). Add `sendCompletionSignal()` function. |
| `cashapp-extension/manifest.json` | Add `"background": { "service_worker": "background.js" }` and add `"storage"` to permissions. Add dashboard origin to `host_permissions`. |
| `cashapp-extension/background.js` | **NEW FILE** — listener for `chrome.runtime.onMessage`, finds dashboard tab, injects localStorage write. |
| `paypal-extension/content.js` | Same pattern: "Done" button in `showFormGuide()` (~line 222-232) and `showSubPage()` last step (~line 335-337). Add `sendCompletionSignal()`. |
| `paypal-extension/manifest.json` | Same: add background service worker, storage permission, dashboard host_permission. |
| `paypal-extension/background.js` | **NEW FILE** — same pattern as cashapp. |
| `stripe-extension/content.js` | Same pattern: "Done" button in `showFormGuide()` (~line 222-232) and `showSubPage()` (~line 335-337). Add `sendCompletionSignal()`. |
| `stripe-extension/manifest.json` | Same additions. |
| `stripe-extension/background.js` | **NEW FILE**. |
| `venmo-extension/content.js` | Same pattern: "Done" button in `showFormGuide()` (~line 215-225) and `showSubPage()` (~line 328-330). Add `sendCompletionSignal()`. |
| `venmo-extension/manifest.json` | Same additions. |
| `venmo-extension/background.js` | **NEW FILE**. |
| `index.html` (dashboard) | Modify `pollPayPalComplete()` at lines 21214-21235 to handle the generalized `passoff_billing_result` format (not just PayPal). Update the operations queue to mark matching jobs complete. |

### New code needed

1. **`sendCompletionSignal()`** function (added to each extension's content.js):
   - Reads `STATE.fields` and `STATE.mode` to build the result object
   - Calls `chrome.runtime.sendMessage({ type: 'passoff_complete', data: resultObj })`
   - Clears `passoff_billing_data` from localStorage
   - Shows a brief "Done!" confirmation in the panel, then collapses it

2. **`background.js`** (new file per extension):
   - Listens for `chrome.runtime.onMessage` with type `passoff_complete`
   - Finds dashboard tab via `chrome.tabs.query({ url: '*://localhost*' })` or the dashboard's actual URL pattern
   - Uses `chrome.scripting.executeScript()` to write `passoff_billing_result` to that tab's localStorage

3. **Dashboard `pollPayPalComplete()` update** (line 21214-21235):
   - Generalize the `passoff_billing_result` handler to work for all 4 platforms (not just PayPal)
   - Match result to queued operations by client name + method
   - Show platform-specific toast messages

### Risk assessment
- `chrome.scripting.executeScript()` requires `scripting` permission in manifest — need to add it
- Dashboard URL pattern must be known at manifest time for `host_permissions` — if dashboard runs on `file://` protocol, this gets complicated. May need `<all_urls>` or a specific pattern
- If dashboard runs on localhost with a port, need to match that pattern exactly

---

## Fix 2: Clean JSON Passoff (Skip Input/Parse Screens)

### Problem
The dashboard's `buildPassoff()` function (lines 21017-21046) already creates a properly structured `fields` array with correct labels. But when the extension loads and finds this data via `init()`, it goes to `showFormGuide()` — which works. The REAL problem is:

1. The cross-origin localStorage issue (dashboard writes to its own origin, extension reads from platform origin)
2. When no pre-loaded data exists, extensions show the input screen where users paste `Artist / Item / Price` slash-separated text — this manual path should be skipped when structured data IS available

### Recommended Approach

#### Part A: Fix the cross-origin data bridge
Use `chrome.storage.local` as the bridge:
- Dashboard writes to `chrome.storage.local` via extension's background script (content script message)
- Actually simpler: Each extension's `background.js` (from Fix 1) can also listen for writes and relay them
- OR: Add a content script that runs on the dashboard's origin for each extension, watches for `passoff_billing_data` writes, and relays to `chrome.storage.local`

**SIMPLEST:** Modify each extension's `init()` to check `chrome.storage.local` FIRST (for dashboard-written data), then fall back to `localStorage` (for self-written data from navigation within the platform).

The dashboard's "Send to" button handler (lines 21061-21095) would need to write to `chrome.storage.local` instead of (or in addition to) `localStorage`. Since the dashboard page can't access `chrome.storage`, we need a content script from each extension that runs on the dashboard's origin.

**Alternative approach (simpler, no content script on dashboard):**
- Dashboard writes to `localStorage` as it does now
- Each extension adds the dashboard's URL pattern to its `content_scripts.matches` in manifest.json
- Extension content script runs on dashboard page too, watches for `localStorage` changes via `window.addEventListener('storage', ...)`
- When `passoff_billing_data` is written, extension's content script on dashboard origin reads it and stores to `chrome.storage.local`
- Extension content script on platform origin reads from `chrome.storage.local` in `init()`

**ACTUALLY SIMPLEST (and this may be how it was intended):**
If the dashboard is served from `file://` or localhost, and `localStorage` is per-origin, the current approach CANNOT work. Let me reconsider:

The dashboard writes `passoff_billing_data` to localStorage, then opens the platform tab. The extension content script runs on the platform domain. It reads `localStorage` — but that's the PLATFORM's localStorage, not the dashboard's. So the init() check would find nothing.

**This means the whole passoff currently relies on the user manually entering data in the extension's input screen.** The structured JSON the dashboard writes is never actually received.

### Fix Plan

**Step 1:** Add `chrome.storage.local` as the bridge for ALL cross-origin data.

**Step 2:** In each extension manifest, add `"storage"` permission (needed for `chrome.storage.local`).

**Step 3:** Add a `background.js` service worker (shared with Fix 1) that:
- Listens for `chrome.runtime.onMessage` with type `passoff_write`
- Writes the data to `chrome.storage.local`

**Step 4:** On the dashboard side, each extension needs a content script that runs on the dashboard's origin. This script:
- Watches for `passoff_billing_data` in localStorage via `MutationObserver` or polling
- When found, sends it to background via `chrome.runtime.sendMessage({ type: 'passoff_write', data: ... })`
- Alternative: Use a custom DOM event that the extension's content script listens for

**Step 5:** Modify each extension's `init()` to:
- Check `chrome.storage.local` for `passoff_billing_data` FIRST (async)
- If found with a `fields` array that has values: skip directly to `showFormGuide()` (current behavior when data exists)
- If not found: fall through to `showMenu()` as before
- The `showInput()` and `parseAndConfirm()` screens remain for manual entry fallback

**Step 6:** When pre-loaded data exists, the `showFormGuide()` path already works correctly — it reads from `STATE.fields` which was populated from the parsed JSON. No changes needed to the form guide itself.

### Field label mapping (dashboard → extension)

**Dashboard `buildPassoff()` for Invoice:**
```
CUSTOMER NAME → maps correctly to PayPal (CUSTOMER NAME), Stripe (CUSTOMER NAME)
                 but Cash App uses TO, Venmo uses RECIPIENT NAME
ITEM NAME → PayPal (ITEM NAME), but Stripe uses LINE ITEM DESCRIPTION,
             Cash App uses FOR, Venmo uses NOTE/DESCRIPTION
PRICE PER UNIT → PayPal (PRICE PER UNIT), Stripe uses AMOUNT,
                  Cash App uses AMOUNT, Venmo uses AMOUNT
DESCRIPTION → all use this or similar
```

**Dashboard `buildPassoff()` for Subscription:**
```
PLAN NAME → PayPal (PLAN NAME), Stripe (PRODUCT NAME), Venmo (RECIPIENT), Cash App (TO + PLAN/SERVICE)
DESCRIPTION → all use this
BILLING CYCLE → PayPal (BILLING CYCLE), Stripe (BILLING PERIOD), Venmo (FREQUENCY), Cash App (FREQUENCY)
PRICE → PayPal (PRICE), Stripe (PRICE), Venmo (AMOUNT), Cash App (AMOUNT)
```

**The dashboard currently builds fields with PayPal labels.** The extensions each have their own label names. Since the form guide displays whatever labels are in `STATE.fields`, the labels from the dashboard's `buildPassoff()` will show in the extension as-is. This is fine for display purposes — the user just clicks to copy the value.

**No label remapping is needed** because the `showFormGuide()` function uses `STATE.fields[0].value`, `STATE.fields[1].value` etc. by index, not by label name. The labels are only used for display in the mockup. When data comes from the dashboard, the extension just needs to use the values at the correct indices.

**However,** Cash App invoice mode only has 4 fields and the dashboard builds 4 fields, but the field mapping differs. The extension's `showFormGuide()` hardcodes which index maps to which mockup row. This works because the dashboard's `buildPassoff()` outputs fields in the same order as the extension expects.

### Files that change

| File | Changes |
|------|---------|
| All 4 `manifest.json` | Add `"storage"` permission, add `"background": { "service_worker": "background.js" }` (shared with Fix 1), add dashboard origin to `content_scripts.matches` or use separate content script entry |
| All 4 `content.js` | Modify `init()` to be async — check `chrome.storage.local.get('passoff_billing_data')` first, then localStorage fallback. When structured data with `fields` array found, skip to `showFormGuide()` |
| All 4 `background.js` | (shared with Fix 1) Add handler for `passoff_write` message type to store in `chrome.storage.local` |
| `index.html` (dashboard) | **Minimal changes** — the existing `localStorage.setItem('passoff_billing_data', ...)` at line 21068 stays. The extension content script running on dashboard origin handles the relay. |

**OR (simpler alternative if we control the extension install):**
- Each extension manifest gets a new content_scripts entry matching the dashboard's URL
- That content script watches for `passoff_billing_data` writes and relays to `chrome.storage.local`

### New code needed

1. **`init()` rewrite** (each extension content.js):
   - Make init async
   - Try `chrome.storage.local.get('passoff_billing_data')` first
   - If valid structured JSON with `fields` array: set STATE, show form guide, clear chrome.storage entry
   - Else: check `localStorage.getItem(STORAGE_KEY)` (existing behavior, for same-page navigation)
   - Else: `showMenu()`

2. **Dashboard origin content script** (small, ~20 lines, per extension):
   - Runs on the dashboard's URL pattern
   - Uses `MutationObserver` or polling (or `window.addEventListener('storage')`) to detect `passoff_billing_data` write
   - Sends to background: `chrome.runtime.sendMessage({ type: 'passoff_store', key: 'passoff_billing_data', data: parsed })`

3. **Background handler addition** (`background.js`):
   - Listen for `passoff_store` message
   - Write to `chrome.storage.local.set({ passoff_billing_data: data })`

### Risk assessment
- `chrome.storage.local` is async — `init()` must handle the async flow. Currently `init()` is synchronous. Need to restructure to show panel only after async check completes
- Dashboard URL pattern must be known. If it's `file:///` the match pattern is `file:///*` which is very broad. Could use a more specific path match
- Extensions currently don't have background service workers — adding them is a structural change to each extension

---

## Fix 3: Cash App 4th Step (Consistent UX)

### Problem
Cash App subscription mode has 3 steps; PayPal, Stripe, and Venmo all have 4. The missing step is a "Review & confirm" step that matches the others.

### Current Cash App Subscription Steps
1. **Step 1 of 3:** Set up recipient — TO ($cashtag), PLAN/SERVICE fields (copyable)
2. **Step 2 of 3:** Set amount & frequency — AMOUNT field (copyable), frequency display
3. **Step 3 of 3:** Review & confirm — summary display, verify details, Confirm button

### Comparison with PayPal (4 steps)
1. **Step 1 of 4:** Choose product — instructional (no copyable fields)
2. **Step 2 of 4:** Create plan — PLAN NAME, DESCRIPTION (copyable)
3. **Step 3 of 4:** Define pricing — PRICE (copyable), cycle display
4. **Step 4 of 4:** Review and save — summary, verify, Save button

### Recommended Fix
Insert a new step between current Step 2 and Step 3 that mirrors the instructional setup step that PayPal/Stripe have. The new step layout:

**New Step 1 of 4:** Navigate to Cash App recurring setup
- Instructional: "Open Cash App > Payments > Set up recurring"
- Dimmed instructional text (no copyable fields)
- "Next" button

**Current Step 1 → now Step 2 of 4:** Set up recipient (same content, relabeled)
**Current Step 2 → now Step 3 of 4:** Set amount & frequency (same content, relabeled)
**Current Step 3 → now Step 4 of 4:** Review & confirm (same content, relabeled)

### Files that change

| File | Changes |
|------|---------|
| `cashapp-extension/content.js` | In `showFormGuide()` subscription branch (lines 238-287): Change `STATE.subPages` array from 3 entries to 4. Insert new instructional step as first element. Update all "Step X of 3" titles to "Step X of 4". |

### Specific changes in content.js

**Line 238-287 (subscription subPages array):**

Replace the current 3-step array with a 4-step array:

1. **NEW Step 1 of 4** (insert before current first step):
```
Title: "Step 1 of 4"
Step num: 1
Step label: "Set up recurring"
Content: Dimmed instructional text:
  - "Open Cash App"
  - "Navigate to Payments"
  - "Select 'Set up recurring' or equivalent"
  - Then choose frequency: frequencyLabel (bold)
Button: "Next →"
```

2. **Current step 1 → Step 2 of 4:** Change title from "Step 1 of 3" to "Step 2 of 4", step num from 1 to 2

3. **Current step 2 → Step 3 of 4:** Change title from "Step 2 of 3" to "Step 3 of 4", step num from 2 to 3

4. **Current step 3 → Step 4 of 4:** Change title from "Step 3 of 3" to "Step 4 of 4", step num from 3 to 4. Change label from "Review & confirm" to include "Review & confirm" (keep same). Change button text from "Confirm →" to "Confirm →" (keep same).

### No CSS changes needed
The existing `ca-mock-*` classes handle the step display. The pager automatically adjusts to the array length (it reads `STATE.subPages.length`).

### Risk assessment
- Very low risk — purely additive change to one array
- The pager dots, arrows, and navigation all key off `STATE.subPages.length` so they auto-adapt
- No other files affected

---

## Fix 4: Extension-Not-Installed Check

### Problem
When the user clicks "Send to Stripe" (or any platform) in the dashboard, it opens the platform tab and writes passoff data. If the extension isn't installed, the user sees the platform page with no overlay panel — confusing.

### Recommended Approach: Extension injects a marker, dashboard checks for it

**Challenge:** The extension runs on the PLATFORM domain, not the dashboard domain. The dashboard can't check whether the extension is loaded on the platform because it hasn't navigated there yet. Also, DOM markers on the platform domain aren't visible to the dashboard.

**Better approaches:**

**Option A — Extension sets a flag in `chrome.storage.local`, dashboard checks it (requires extension content script on dashboard)**
- Each extension's content script on the dashboard origin sets `localStorage.setItem('passoff_ext_[platform]_installed', 'true')`
- Dashboard checks this flag before opening the platform tab
- If the extension is uninstalled, the flag persists — stale. Could add a timestamp and re-check

**Option B — Extension injects a hidden DOM element on the dashboard page**
- Each extension's content script (running on dashboard origin) injects `<div id="passoff-ext-[platform]-marker" style="display:none"></div>`
- Dashboard checks `document.getElementById('passoff-ext-[platform]-marker')` before sending
- Accurate: if extension is uninstalled, the marker won't be injected next page load
- Requires extension content scripts to match the dashboard's URL (same requirement as Fix 2)

**Option C — postMessage handshake**
- Dashboard broadcasts `postMessage({ type: 'passoff_ping', platform: 'stripe' })`
- Extension content script on dashboard responds with `postMessage({ type: 'passoff_pong', platform: 'stripe' })`
- Dashboard waits briefly for response, shows toast if no pong received
- Problem: extension content scripts run on platform domains, not dashboard

**RECOMMENDED: Option B (DOM marker injection)**

This is the cleanest because:
1. We already need extension content scripts on the dashboard origin for Fix 2
2. DOM presence is binary — installed or not
3. No timing issues, no stale flags
4. Check is synchronous and instant

### Implementation

**Each extension needs a content script entry for the dashboard's URL** (shared with Fix 2). This script:
1. Injects a hidden marker element: `<div id="passoff-ext-cashapp" style="display:none"></div>`
2. Platform names: `passoff-ext-paypal`, `passoff-ext-stripe`, `passoff-ext-venmo`, `passoff-ext-cashapp`

**Dashboard "Send to" handler** (lines 21061-21095):
1. Before `window.open()`, check for the marker: `document.getElementById('passoff-ext-' + platformKey)`
2. If not found, show toast: "[Platform] extension not detected — install it first"
3. Include a helpful message or link to the extension folder
4. Do NOT open the tab if extension is missing (or open it with a warning)

### Platform key mapping
```javascript
var platformKeyMap = {
  'PayPal': 'paypal',
  'Stripe': 'stripe',
  'Venmo': 'venmo',
  'Cash App': 'cashapp'
};
```

### Files that change

| File | Changes |
|------|---------|
| All 4 `manifest.json` | Add dashboard URL to `content_scripts.matches` (shared with Fix 2) |
| All 4 extensions need a dashboard-side content script | Small script (~10 lines) that injects marker `<div>`. Can be the same file used for Fix 2's localStorage relay. Call it `dashboard-bridge.js`. |
| `index.html` (dashboard) | In `sendPayPalBtn` click handler (line 21062-21094): Add check before `window.open()` at ~line 21084. If marker not found, show toast and return. |

### New code needed

1. **`dashboard-bridge.js`** (new file per extension, ~20 lines — combines Fix 2 + Fix 4 duties):
   - Injects marker element: `document.body.appendChild(marker)`
   - Watches localStorage for `passoff_billing_data` writes and relays to `chrome.storage.local` (Fix 2)

2. **Dashboard check** (in `sendPayPalBtn` handler):
   ```javascript
   // Before window.open():
   var platformKey = { 'PayPal': 'paypal', 'Stripe': 'stripe', 'Venmo': 'venmo', 'Cash App': 'cashapp' };
   var markerId = 'passoff-ext-' + (platformKey[f.payMethod] || '');
   if (!document.getElementById(markerId)) {
       showWingToast(f.payMethod + ' extension not detected — install it first', 'payment');
       return;
   }
   ```

### Risk assessment
- If dashboard URL pattern is too broad in manifest, extension content script runs on unintended pages — use specific pattern
- If user has extension installed but disabled, marker won't be present — correct behavior (disabled = effectively not installed)
- The marker check is instant and non-breaking — worst case is a false negative that lets the user proceed without the extension (current behavior)

---

## Dependencies Between Fixes

```
Fix 2 ←── Fix 4 (both need dashboard-origin content script + manifest changes)
  ↑
Fix 1 (needs background.js which Fix 2 also needs)

Fix 3 (independent — Cash App only, no manifest changes)
```

### Recommended implementation order:
1. **Fix 3** (independent, lowest risk, Cash App content.js only)
2. **Fix 2 + Fix 4 together** (shared infrastructure: manifest changes, dashboard-bridge.js, background.js)
3. **Fix 1** (builds on background.js from Fix 2, adds completion signal)

### Shared infrastructure (Fixes 1, 2, 4):
- Each extension gets: `background.js` (new), `dashboard-bridge.js` (new)
- Each manifest gets: `storage` + `scripting` permissions, `background` service worker, dashboard URL in content_scripts
- Dashboard gets: marker check before send, generalized result polling

---

## Summary: All File Changes

### NEW FILES (per extension × 4 = 8 files total)
- `ahead-billing-{platform}-extension/background.js` — service worker for cross-origin messaging
- `ahead-billing-{platform}-extension/dashboard-bridge.js` — content script for dashboard origin (marker + data relay)

### MODIFIED FILES

**Cash App content.js:**
- Fix 3: Rewrite subscription `STATE.subPages` array from 3 to 4 steps (lines 238-287)
- Fix 1: Add "Done" button + `sendCompletionSignal()` function
- Fix 2: Make `init()` async, check `chrome.storage.local` first

**PayPal content.js:**
- Fix 1: Add "Done" button + `sendCompletionSignal()` function
- Fix 2: Make `init()` async, check `chrome.storage.local` first

**Stripe content.js:**
- Fix 1: Add "Done" button + `sendCompletionSignal()` function
- Fix 2: Make `init()` async, check `chrome.storage.local` first

**Venmo content.js:**
- Fix 1: Add "Done" button + `sendCompletionSignal()` function
- Fix 2: Make `init()` async, check `chrome.storage.local` first

**All 4 manifest.json:**
- Add `"storage"`, `"scripting"` to permissions
- Add `"background": { "service_worker": "background.js" }`
- Add dashboard URL pattern to content_scripts (for dashboard-bridge.js)

**Dashboard index.html (lines 21061-21240):**
- Fix 4: Add extension-installed check before `window.open()` (~line 21083)
- Fix 1: Generalize `pollPayPalComplete()` to handle all platforms (lines 21186-21237)

---

## Open Questions for Chad

1. **Dashboard URL pattern:** What URL does the Wing Dashboard run on? (e.g., `file:///C:/...`, `http://localhost:3000`, etc.) This determines the content_scripts match pattern in each extension manifest.
2. **Extension install flow:** Should the "extension not detected" toast include a direct link/button to install, or just a text message?
3. **"Done" button placement:** Should it replace the "+ Another" button, or sit alongside it?
4. **Result data:** Should the completion signal include the PayPal/Stripe invoice URL if available, or just a status flag?
