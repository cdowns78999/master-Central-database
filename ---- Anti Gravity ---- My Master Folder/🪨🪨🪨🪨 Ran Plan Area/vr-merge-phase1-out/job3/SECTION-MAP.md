# Job 3 — VRChat Ultimate Section Map

Source: `VRChat-Site2/app.js` (1556 lines, 18 renderSection functions + 1 dispatcher).
Target: `VRChat-Ultimate/pages/*.html` (each page = standalone, content lifted from corresponding renderer).

| # | Section Name | Renderer Function | Line Range (app.js) | Target Page Slug | Content Type | Special Handling |
|---|---|---|---|---|---|---|
| 1 | Report Behavior | `renderSection1` | 240–357 | `report.html` | reference | Warning card + reportable-list grid; primary safety entry |
| 2 | Tutorial / New to VRChat | `renderSection2` | 358–468 | `start-here.html` | article | Wizard with step dots (`wizard-panel`, `wizardNext`); home tile target for newcomers |
| 3 | Gossip Column | `renderSection3` | 469–518 | `gossip.html` | article | Editorial-style cards; lightest section |
| 4 | World of the Week | `renderSection4` | 519–581 | `world-of-week.html` | article | Featured-world spotlight; updated weekly (CMS hook later) |
| 5 | Avatar Showcase | `renderSection5` | 582–637 | `avatars.html` | grid | Filter pills (`setFilter`, `data-filter-group`); `openWorldModal`-style avatar modal expected |
| 6 | Creator Spotlight | `renderSection6` | 638–696 | `creators.html` | grid | Card grid; profile-style |
| 7 | Event Calendar | `renderSection7` | 697–761 | `events.html` | grid | Date-sorted cards; filter pills likely |
| 8 | Slang Dictionary | `renderSection8` | 762–823 | `slang.html` | reference | Live search input (`#slang-search`, `filterSlang`); alpha filter (`filterAlpha`); requires `bindSectionEvents` rewire |
| 9 | News Feed | `renderSection9` | 824–866 | `news.html` | article | Feed/list layout; recency-sorted |
| 10 | DJ & Raves | `renderSection10` | 867–936 | `dj-raves.html` | grid | Event grid + DJ cards |
| 11 | Best Games in VR | `renderSection11` | 937–991 | `games.html` | grid | Category-tagged game cards |
| 12 | Avatar Creation | `renderSection12` | 992–1071 | `avatar-creation.html` | article | Tutorial + code blocks (`copyCode`, `.code-block`); copy button rewire |
| 13 | Dev Corner | `renderSection13` | 1072–1143 | `dev-corner.html` | reference | Code blocks + checklist (`toggleCheck`); copy button rewire |
| 14 | 50 Worlds | `renderSection14` | 1144–1194 | `50-worlds.html` | grid | World cards open `openWorldModal(name, creator, category, desc, vibe)` |
| 15 | Body Tracking | `renderSection15` | 1195–1260 | `body-tracking.html` | reference | Hardware comparison grid; possible quiz (`quizAnswer`) |
| 16 | Sex & VRChat 18+ | `renderSection16` | 1261–1331 | `18plus.html` | gated | **AGE GATE** — `checkAgeGate('section-16')` blocks render until `confirmAge('section-16')`; sessionStorage-keyed |
| 17 | Interactive Toy Market | `renderSection17` | 1334–1420 | `toy-market.html` | gated | **AGE GATE** — `checkAgeGate('section-17')`; product grid + buyer's guide |
| 18 | VRChat History | `renderSection18` | 1423–1556 | `history.html` | article | Year-grouped timeline of milestones |

---

## Helper functions referenced by sections (port to `shared/components.js`)

| Helper | Used by | Purpose |
|---|---|---|
| `copyCode(btn)` | §12, §13 | Copy code-block contents |
| `toggleCheck(el)` | §13 | Checklist tick |
| `togglePlatform(el)` | §2 (likely) | Expand/collapse platform card |
| `setFilter(btn, group)` | §5, §7, §11 | Pill filter cards |
| `filterSlang(q)` / `filterAlpha(letter, btn)` | §8 | Slang glossary search |
| `openWorldModal(...)` | §4, §14 | World detail modal overlay |
| `wizardNext(current, next)` | §2 | Multi-step onboarding wizard |
| `quizAnswer(result)` | §15 (likely) | Body-tracking quiz result |
| `checkAgeGate / confirmAge / denyAge` | §16, §17 | sessionStorage age gate (see `age-gate.md`) |
| `bindSectionEvents(id)` | dispatcher | Per-section event wiring (currently only §8) |

## Routing (dispatcher → page-router rewrite)

- `renderSection(id)` (lines 94–122) is the dispatcher — replaced in static-pages model by direct page navigation.
- `route()` (lines 72–81) sets `page-title` + `breadcrumb` from `NAV_ITEMS` — port this metadata into each page's `<head>` or a per-page header partial.
- `NAV_ITEMS` (lines 9–28) — sidebar source of truth for icon + label; port to `shared/nav.js` as the canonical 18-tile menu.
