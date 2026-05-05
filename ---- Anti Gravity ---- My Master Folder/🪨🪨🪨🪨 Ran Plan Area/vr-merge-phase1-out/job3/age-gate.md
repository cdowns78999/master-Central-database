# Age Gate Spec — VRChat Ultimate 18+ Sections

Extracted verbatim from `VRChat-Site2/app.js` lines 145–155, 1262–1275, 1335–1347.
Applies to two pages in the merged site: `pages/18plus.html` (§16) and `pages/toy-market.html` (§17).

---

## 1. Verbatim sessionStorage Block (app.js lines 145–155)

```js
// ── Age Gate ──
function checkAgeGate(section) {
  return sessionStorage.getItem(`age-verified-${section}`) === 'yes';
}
function confirmAge(section) {
  sessionStorage.setItem(`age-verified-${section}`, 'yes');
  route();
}
function denyAge() {
  navigateTo('section-1');
}
```

**Storage keys actually written:**
- `age-verified-section-16` → value `'yes'`
- `age-verified-section-17` → value `'yes'`

Each section is verified **independently** — confirming §16 does NOT auto-unlock §17 (and vice versa). Two separate sessionStorage entries.

---

## 2. Modal HTML Structure (verbatim, app.js lines 1264–1274 for §16; 1337–1347 for §17)

### §16 — Sex & VRChat 18+

```html
<div class="age-gate-overlay" id="age-gate-16">
  <div class="age-gate-box">
    <div class="age-gate-icon">🔞</div>
    <div class="age-gate-title">Age Verification Required</div>
    <div class="age-gate-desc">This section contains discussion of adult content, sexual culture, and safety information intended for users 18 and older. This is not a content site — it is educational and harm-reduction focused.</div>
    <div class="age-gate-buttons">
      <button class="btn btn-primary" onclick="confirmAge('section-16')">I am 18+ — Enter</button>
      <button class="btn btn-ghost" onclick="denyAge()">Exit</button>
    </div>
  </div>
</div>
```

### §17 — Interactive Toy Market

```html
<div class="age-gate-overlay" id="age-gate-17">
  <div class="age-gate-box">
    <div class="age-gate-icon">🔞</div>
    <div class="age-gate-title">Age Verification Required</div>
    <div class="age-gate-desc">This section covers the adult interactive device market and its integration with VR platforms. Educational and market-research focused. 18+ only.</div>
    <div class="age-gate-buttons">
      <button class="btn btn-primary" onclick="confirmAge('section-17')">I am 18+ — Enter</button>
      <button class="btn btn-ghost" onclick="denyAge()">Exit</button>
    </div>
  </div>
</div>
```

**Required CSS classes (port from `VRChat-Site2/styles.css` into `shared/styles.css`):**
- `.age-gate-overlay` — fixed full-viewport dim layer
- `.age-gate-box` — centered card
- `.age-gate-icon` — 🔞 emoji at top
- `.age-gate-title` — heading
- `.age-gate-desc` — body copy
- `.age-gate-buttons` — flex row with two buttons
- `.btn.btn-primary` / `.btn.btn-ghost` — already in shared design system

---

## 3. Confirm / Decline Behavior

| Button | Handler | What happens |
|---|---|---|
| **"I am 18+ — Enter"** | `confirmAge('section-N')` | Writes `sessionStorage['age-verified-section-N'] = 'yes'`, then re-runs `route()` (in SPA) → next render of section bypasses gate and shows full content. |
| **"Exit"** | `denyAge()` | In SPA: `navigateTo('section-1')` → returns user to Report Behavior (the safest landing). |

In the gate's render flow (lines 1262–1274 / 1335–1347), `renderSectionN()` checks `checkAgeGate(...)` first and short-circuits to the gate HTML when storage is missing or set to anything other than the literal string `'yes'`. Once confirmed, the SAME function returns the real content body on the next call.

---

## 4. Expiry / Persistence

- **Storage type:** `sessionStorage` (NOT `localStorage`).
- **Lifetime:** the verification persists **only for the current browser tab/session**. Closing the tab or the entire browser clears it; opening a new tab requires re-verification.
- **Per-section scoping:** each section has its own key (`-section-16`, `-section-17`) — confirming one does not unlock the other.
- **No expiry timer:** no setTimeout or timestamp comparison; the gate is purely "have they clicked Enter in this tab?"
- **Clearable by user:** standard browser tooling (DevTools → Application → Session Storage) can reset state.

This is intentionally lighter-weight than persistent localStorage — it forces a fresh consent click each new browsing session, which is the legally safer default for adult-content gating.

---

## 5. Integration Recipe — Porting into `pages/18plus.html` (and `pages/toy-market.html`)

In the merged WebApp (no SPA dispatcher), the gate must run on page load instead of inside a renderer. Pattern:

### `pages/18plus.html` body skeleton

```html
<!-- Hidden by default; shown by JS if gate not yet passed -->
<div class="age-gate-overlay" id="age-gate-16" hidden>
  <div class="age-gate-box">
    <div class="age-gate-icon">🔞</div>
    <div class="age-gate-title">Age Verification Required</div>
    <div class="age-gate-desc">This section contains discussion of adult content, sexual culture, and safety information intended for users 18 and older. This is not a content site — it is educational and harm-reduction focused.</div>
    <div class="age-gate-buttons">
      <button class="btn btn-primary" data-age-confirm>I am 18+ — Enter</button>
      <button class="btn btn-ghost" data-age-deny>Exit</button>
    </div>
  </div>
</div>

<!-- Real content; hidden until gate passes -->
<main id="age-gated-content" hidden>
  <!-- ... port renderSection16() body here ... -->
</main>
```

### `shared/age-gate.js` (new module)

```js
// shared/age-gate.js
export function applyAgeGate(sectionKey, denyHref = '/index.html') {
  const STORAGE_KEY = `age-verified-${sectionKey}`;
  const overlay = document.getElementById(`age-gate-${sectionKey.replace('section-', '')}`);
  const content = document.getElementById('age-gated-content');

  const passed = sessionStorage.getItem(STORAGE_KEY) === 'yes';
  if (passed) {
    overlay?.setAttribute('hidden', '');
    content?.removeAttribute('hidden');
    return;
  }
  overlay?.removeAttribute('hidden');
  content?.setAttribute('hidden', '');

  overlay?.querySelector('[data-age-confirm]')?.addEventListener('click', () => {
    sessionStorage.setItem(STORAGE_KEY, 'yes');
    overlay.setAttribute('hidden', '');
    content?.removeAttribute('hidden');
  });
  overlay?.querySelector('[data-age-deny]')?.addEventListener('click', () => {
    window.location.href = denyHref;  // safe landing — Report Behavior page
  });
}
```

### Page wiring (bottom of `pages/18plus.html`)

```html
<script type="module">
  import { applyAgeGate } from '../shared/age-gate.js';
  applyAgeGate('section-16', '../pages/report.html');
</script>
```

For `pages/toy-market.html` — same pattern, change key to `'section-17'` and overlay id to `age-gate-17`.

---

## 6. Storage-key compatibility note

The original Site2 keys (`age-verified-section-16`, `age-verified-section-17`) are kept verbatim. If a user had verified on the old SPA in the same browser session, those keys carry over into the new static pages without re-verification. This is intentional and a clean migration path.

## 7. QA checklist (port to Phase 2 test plan)

- [ ] Open `/pages/18plus.html` in fresh tab → modal shown, content hidden.
- [ ] Click "I am 18+ — Enter" → modal hides, content shows, `sessionStorage['age-verified-section-16'] === 'yes'`.
- [ ] Reload same tab → content shows immediately (no modal).
- [ ] Open `/pages/toy-market.html` in same tab → modal shown again (per-section keys, independent).
- [ ] Close tab + reopen → modal returns (sessionStorage cleared on tab close).
- [ ] Click "Exit" → redirected to `/pages/report.html` (no key written).
- [ ] DevTools → Application → Session Storage → manually delete key → reload → modal returns.
