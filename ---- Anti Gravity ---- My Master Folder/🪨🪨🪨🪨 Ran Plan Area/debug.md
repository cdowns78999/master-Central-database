# VRChat Ultimate — Debug Report

**Date:** 2026-04-09
**Sites audited:** VRChat-Site1 (Component Library) · VRChat-Site2 (SPA Card-First)

---

## SITE 1 — HIGH SEVERITY

| # | File | Issue | Fix |
|---|------|-------|-----|
| S1-H1 | app.js:104–131 | Games + News pill filters completely non-functional. `initPillFilters()` is dead code — no `data-filter` on pills, no `data-tags` on game/news cards, no `data-filter-group`/`data-cards-group` attributes anywhere | Add `data-filter` to game/news pill buttons; add `data-tags` to cards; wire dedicated filter handlers per section |
| S1-H2 | index.html:900–905 | Nominate Creator (Section 6) has ZERO form fields — just a button that submits nothing | Replace with form: VRChat Username (text), Why they deserve it (textarea), Contact (email optional) |
| S1-H3 | index.html:2484–2570 | Years 2015 and 2016 missing from history timeline — jumps 2014→2017 | Add 2015 (early dev/alpha) and 2016 (beta/SDK preview) year entries |

---

## SITE 1 — MEDIUM SEVERITY

| # | File | Issue | Fix |
|---|------|-------|-----|
| S1-M1 | styles.css:286–306 | `.card-grid-3` / `.card-grid-4` use fixed `repeat(N, 1fr)` with no minmax — breaks on mid-range screens | Change to `repeat(auto-fit, minmax(260px, 1fr))` and `repeat(auto-fit, minmax(200px, 1fr))` |
| S1-M2 | index.html:783 | `.creator-interview-layout` used in HTML but never defined in CSS — no mobile collapse | Add CSS: `display:grid; grid-template-columns:280px 1fr` + `@media(max-width:768px) { grid-template-columns:1fr }` |
| S1-M3 | app.js:136–158 | Age gate overlays use inline styles instead of `.locked-overlay` CSS class | Remove inline styles, apply `.locked-overlay` class to both age gate divs |
| S1-M4 | index.html:2227, 2324 | `.age-locked-section` class missing from sections 16 and 17 | Add `class="age-locked-section"` to both section elements |
| S1-M5 | index.html:405–428 | Anonymous tip form (Section 3) has no `<form>` wrapper | Wrap in `<form id="tip-form" novalidate>`, add submit handler |
| S1-M6 | index.html:1235–1249 | Submit a Term form (Section 8) has no `<form>` wrapper | Wrap in `<form id="slang-form" novalidate>`, add submit handler |
| S1-M7 | index.html:1344–1363 | News Tip form (Section 9) has no `<form>` wrapper | Wrap in `<form id="news-tip-form" novalidate>`, add submit handler |
| S1-M8 | app.js:272–303 | World modal "Open in VRChat" and "Copy World Link" buttons have no handlers or URL data | Add `data-world-url` to world cards; wire buttons in `initWorldModal` |
| S1-M9 | index.html:2519 | Year 2019 missing from timeline (skips 2018→2020) | Add 2019 entry: "Post-Viral Stabilization" |

---

## SITE 1 — LOW SEVERITY

| # | File | Issue | Fix |
|---|------|-------|-----|
| S1-L1 | index.html throughout | `.justify-content-between` used 19x but never defined in CSS | Add `.justify-content-between { justify-content: space-between; }` |
| S1-L2 | styles.css:5 | Google Fonts via CSS @import, no preconnect hint | Add `<link rel="preconnect">` tags to `<head>` |
| S1-L3 | app.js:344–357 | Dev tier buttons globally scoped — bleeds across sections 12 and 13 | Scope selectors to parent section IDs |
| S1-L4 | app.js:308–375 | 5 duplicate `DOMContentLoaded` listeners | Consolidate into single init function |
| S1-L5 | index.html:399–429 | Form labels not associated to inputs (missing for/id pairs) | Add matching id/for attributes |

---

## SITE 2 — HIGH SEVERITY

None.

---

## SITE 2 — MEDIUM SEVERITY

| # | File | Issue | Fix |
|---|------|-------|-----|
| S2-M1 | app.js:1164 | Section 14 claims "50 Worlds" but only 20 world entries exist | Either add 30 more worlds OR update title/description to "20 Worlds / 20 Categories" |
| S2-M2 | app.js:112–113 | Section fade animation class stripped immediately — animation fires for ~0ms | Remove `el.className = ''` or replace with `setTimeout(() => el.className = '', 200)` |
| S2-M3 | app.js:162–179 | `filterAlpha()` calls `getElementById('slang-search')` unconditionally — will throw null ref if called outside section 8 | Add null guard: `const s = document.getElementById('slang-search'); if (s) s.value = '';` |
| S2-M4 | app.js:1234–1237 | Body tracking quiz is single-question, not multi-step decision tree as described | Document as single-question or build out step progression |

---

## SITE 2 — LOW SEVERITY

| # | File | Issue | Fix |
|---|------|-------|-----|
| S2-L1 | app.js:44 | `<div>` injected into `<ul>` — invalid HTML, a11y failure | Change `<div class="nav-item">` to `<li class="nav-item">` |
| S2-L2 | app.js:88–89 | `el.void = void el.offsetWidth` — nonstandard property assignment | Replace with `void el.offsetWidth;` |
| S2-L3 | app.js:58 | `setupRouter()` is empty stub | Delete or fill |
| S2-L4 | app.js:89/styles.css:1124 | Duplicate fade: both class-based AND `#main-content` animation fire | Remove one of the two animation sources |
| S2-L5 | app.js:363–408 | Platform card checklists use `.checklist` but CSS scopes to `.checklist-card .checklist li` | Broaden CSS rule to `.checklist li` |
| S2-L6 | app.js:119–125 | `navigator.clipboard` used without HTTPS guard | Add `if (navigator.clipboard)` fallback |

---

## TOTALS

| Site | HIGH | MED | LOW | Total |
|------|------|-----|-----|-------|
| Site 1 | 3 | 9 | 5 | 17 |
| Site 2 | 0 | 4 | 6 | 10 |
| **Combined** | **3** | **13** | **11** | **27** |
