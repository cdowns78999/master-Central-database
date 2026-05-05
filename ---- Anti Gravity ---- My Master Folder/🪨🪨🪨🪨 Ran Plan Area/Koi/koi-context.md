# koi-context.md

**Last refreshed:** 2026-04-19
**Project root:** `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\Koi\`

---

## Project snapshot

**Name:** Koi — EPK Victorian Goth set
**Vibe:** Opera-gothic / Victorian goth artist EPK + UX prototype pair
**Structure:** 2 subprojects + 1 research doc at root (NOT the standard 3-page trio)

---

## Pages (the anchor set)

### Subproject 1 — `EPK-Example-VictorianGoth/`
Full multi-page EPK. Brand-bar style, 4 pages all in one folder:
- `index.html` — landing
- `bio.html` — artist bio
- `music.html` — music page
- `press.html` — press page
- `assets/` — shared assets

### Subproject 2 — `EPK-Example-VictorianGoth-UX-Prototype/`
Single-page UX prototype with split JS/CSS:
- `index.html` — prototype entry
- `app.js`
- `style.css`
- `DESIGN-SPEC.md`

### Root reference
- `EPK-Research-VictorianGoth.md` — research source-of-truth for the visual/copy direction

---

## Netlify

**Status:** No `.netlify/` folder found at project root.
**Deploy path:** none
**Site name:** —

(If a Netlify site gets wired up later, refresh this md.)

---

## Sample folder

**Status:** empty · ready for first sample
**Path (when created):** `Koi/sample/`
**Protocol:** toast-check before mkdir, never overwrite existing `.html` without explicit ask

---

## Local preview

**First free port (last check):** `3002`
**Range:** 3000–3020
**Cache-bust rule:** always append `?v=$(date +%s)`
**Server cmd:** `python -m http.server <port>` from project root, run in background

---

## Token-saver rules for THIS project

1. **Read this md first** — don't re-glob the 🪨🪨 path, don't re-detect HTMLs, don't re-check `.netlify/`.
2. **One batched Bash for discovery** — when refreshing, collapse find + netlify check + sample count + port scan into ONE call with `&&` chains.
3. **Edit, don't Write** — modify existing pages in place; only `Write` for brand-new files (samples, new pages).
4. **Trust direct requests over this md** — if Chad says "edit bio.html", just do it; don't re-verify the path.
5. **Refresh on next `/koi` fire** — this md gets rewritten each `/koi` run; treat anything older than the last fire as potentially stale.

---

## Routing reminders (from /koi skill)

| Chad says | Route to |
|-----------|----------|
| "make a note about X" | `note/index.html` (does not exist yet — would need to be created) |
| job / layout / copy / polish | default target = `EPK-Example-VictorianGoth/index.html` unless he names another page |
| "sample request" | `Koi/sample/<descriptive-name>.html` (toast-check folder first) |

---

## Closeout protocol

After any job finishes inside this project:
- Surface Netlify deploy path (currently: none — flag this so Chad knows external push isn't wired)
- Mention sample folder state if a sample was added
- Do NOT auto-deploy — Chad controls the trigger
