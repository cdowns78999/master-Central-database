# /community Skill — Clickable-Overlay Sample Format Update Plan

**Author:** Agent C (parallel build)
**Date:** 2026-04-24
**Target file:** `C:\Users\chad\.claude\skills\community\skill.md`
**Sister agent:** Agent D — drafting the actual prose insertions
**Goal:** Lock the new fullscreen-overlay sample-gallery pattern (Sharon dashboard) as the universal HTML production format for /community, plus add Chad's "input → search → fully produce end-experience" intent paragraph.

---

## 1. Current State Snapshot

The /community skill (v2 — universal router) already produces an HTML preview every run. Key facts pulled from the live file:

- **File:** `C:\Users\chad\.claude\skills\community\skill.md` (419 lines, single canonical file — no SKILL.md duplicate)
- **Existing HTML production phase:** Step 7 (lines ~148–249), titled "Write & Open HTML Preview (MANDATORY, every run)"
- **Sub-sections inside Step 7:**
  - 7.1 — slug computation (lines ~152–158)
  - 7.2 — target path (lines ~160–164)
  - 7.3 — HTML design tokens / `:root` palette (lines ~166–179)
  - 7.4 — typography rules (lines ~181–186)
  - **7.5 — Content structure: "LIVE MICROSAMPLE WEB APP — NOT notes"** (lines ~188–202) ← **this is the load-bearing section the new overlay format must replace**
  - 7.6 — Python write + open with cache-buster (lines ~204–219)
  - 7.7 — terminal confirm line (lines ~221–226)
  - **7.8 — Microsample build rules (LOAD-BEARING)** (lines ~228–241) ← **also load-bearing — the 8 hard rules currently describe inline-tile microsamples; needs amended rules for overlay tiles**
  - 7.9 — fallback state (lines ~243–249)
- **FAST PATH (Visual Plan Mode)** at lines ~30–54 also produces 5-tile grids using the emo template — must be brought into alignment with the new overlay format so it doesn't drift away from the lock.
- **Step 8 (deploy gate)** at lines ~251–292 — gate logic stays untouched; only the artifact format underneath it changes.

The current 7.5/7.8 mandate **inline tile-embedded** demos (≤320×220px, working in-tile, with `<details>` "view code" toggle). The new spec replaces inline live-in-tile with **clickable tile → fullscreen overlay fade-in** that emulates the source's real HTML feel.

---

## 2. Proposed Edits (Surgical List)

Agent D is writing the actual paragraph text. The shape of where each insertion lands:

### Edit A — Add Chad's intent paragraph near the top

- **Location:** Insert a new short section between the existing "Why v2 exists" block (~line 22) and "Every run also produces a persistent HTML artifact" callout (~line 26), OR replace the existing "Every run also produces..." paragraph and absorb the new intent into it.
- **What it says (shape):** Chad inputs a request → /community searches its pools the way he likes → /community FULLY produces the end-experience result, no matter how many tokens that takes — but stays reasonable / low-token where possible. **Realistic CSS feel is enough — NOT every field of the source sample.**
- **What stays:** the existing "It is NOT a note-taking recap" framing, Step 7 callout, preview-first/deploy-never-without-asking line.

### Edit B — Replace Step 7.5 content structure

- **Location:** Lines ~188–202 (entire 7.5 block).
- **What it says (shape):** Page is still: header strip + verdict card + grid + footer. The grid is now a **clickable tile gallery** (not inline live demos). Each tile shows a thumbnail / labeled preview card. Click a tile → near-fullscreen overlay fades in over a dimmed backdrop. Overlay contains an emulated version of the sample's real HTML feel (realistic CSS — not every field). Overlay has a white X in upper-right. Backdrop click + Escape key also close.
- **What stays:** header strip, verdict card, footer line, and the "tiles must read + function standalone" principle (now applied to overlay-emulated samples instead of inline live tiles).

### Edit C — Replace / amend Step 7.8 microsample build rules

- **Location:** Lines ~228–241 (entire 7.8 block of 8 numbered rules).
- **What it says (shape):** Convert the 8 rules to overlay-mode rules:
  1. No descriptive-only tiles → tile preview clickable, overlay shows working emulation.
  2. Self-contained → overlay's CSS scoped under a single `.community-overlay[data-tile="N"]` namespace; JS IIFE-scoped; multiple overlays never collide.
  3. Loads instantly → no external libraries by default; CSS-only / vanilla-JS approximation OK.
  4. Reachable in 1 click → click tile = open overlay; never two-click deep.
  5. Realistic CSS feel — **not every field**. Capture the vibe, palette, typography, hero shape. Skip enterprise form fields, login modals, footer link rows that don't carry the feel.
  6. Microscale tile, full-feel overlay → tile ≈ 320×220, overlay ≈ 92vw × 90vh.
  7. Close UX is non-negotiable: white X upper-right + backdrop click + Escape key, every overlay, every time.
  8. Code panel attached → overlay has a "view code" `<details>` (or expandable bottom drawer) showing the literal HTML/CSS/JS used inside the overlay.
- **What stays:** the principle that descriptive-only tiles are a fail; the principle that variants (when relevant) get wired together via the top control strip.

### Edit D — Add a Step 7.5b reference implementation pointer

- **Location:** Insert a new sub-section 7.5b between the rewritten 7.5 and 7.6.
- **What it says (shape):** Pointer to Sharon dashboard as the canonical reference — exact tile-grid markup, overlay container markup, fade-in transition timing, X-button geometry, backdrop color/opacity, Escape key handler, focus-trap behavior. Path placeholder: `<sharon-reference-path>` (Agent D will fill or Chad will). Note: clone, don't overwrite ([Clone Don't Overwrite Templates](feedback_clone-dont-overwrite-templates.md) memory rule).
- **What stays:** nothing existing — this is purely additive.

### Edit E — Bring FAST PATH (Visual Plan Mode) into alignment

- **Location:** Lines ~30–54 (FAST PATH section).
- **What it says (shape):** Add one bullet under "Template structural rules (don't drift)" stating that the 5-tile grid uses the **same overlay format defined in 7.5/7.8** — clicking a tile opens the fullscreen overlay; tiles are NOT live-in-place in this mode either.
- **What stays:** Everything else in FAST PATH — the emo template scaffolding, `:root` retint, slug + path rules, deploy gate.

### Edit F — Update the description front-matter (optional but recommended)

- **Location:** Line 3 (YAML `description:` field).
- **What it says (shape):** Replace `LIVE WORKING MICROSAMPLE WEB APP — real HTML/CSS/JS mini-implementations of each finding, not just note cards` with `clickable sample gallery — tiles open fullscreen overlays with realistic CSS-fidelity emulations of each finding`.
- **What stays:** trigger phrases, classifier framing, /community trigger.

### Edit G — Update Safety Guarantees bullet

- **Location:** Line ~302 — `**Never ships description-only tiles** — every tile must contain a working microsample (Section 7.9)`
- **What it says (shape):** Update the section reference (7.9 → 7.8) AND swap "working microsample" for "working overlay sample with realistic CSS feel."
- **What stays:** the guarantee itself.

---

## 3. Backward Compatibility

The /community skill's external contract is:

- **Inputs:** `/community [problem]` or trigger phrases
- **Outputs:** (a) terminal verdict box, (b) HTML preview file at the same path, (c) deploy gate
- **Path:** unchanged → `community previews/{slug}/index.html`

The overlay format change is **internal to the HTML artifact**. Skills/callers that only check existence of the preview file or invoke the deploy gate are unaffected. Callers parsing tile DOM structure may break — none are known, but Risk #2 below addresses this.

**Concrete compatibility moves:**
- Keep filename `index.html`, keep folder slug rules (7.1), keep target path (7.2) — zero changes to anything off-disk.
- Keep `:root` design tokens (7.3) and typography rules (7.4) — overlay inherits the same palette/fonts.
- Keep the verdict box + "preview saved" terminal lines unchanged — Chad's eyes/scripts already trained on this.
- Keep the deploy gate (Step 8) untouched — overlay version deploys exactly the same way.
- Keep fallback state (7.9) — only adjust to use overlay shell when one IS produced; SCOUTS UNAVAILABLE card stays inline (no overlay needed for the empty state).

---

## 4. Risk List

1. **Inline-microsample expectation in muscle memory.** Chad and prior conversations may expect tiles to be live-in-place. Mitigation: the new top-of-file intent paragraph (Edit A) explicitly states overlay model; verdict-box "click any tile" instruction in 7.5 must be reworded to "click any tile to open" — Agent D should handle this in the prose.
2. **Other skills consuming /community's HTML structure.** None known, but possibilities:
   - `/c-railgun`, `/c-ship-it`, `/c-churn` may scan for tile structure for debug/audit. Mitigation: Step 6 of this plan (Verification) includes a grep across `~/.claude/skills/` for references to `community previews` or tile-class names before applying the edit.
   - `/c-netlify` consumes the deploy folder verbatim — unaffected.
   - `/koi`, `/ozzy`, `/c-rizz`, `/c-warm-heart` produce their own HTML — unaffected.
3. **FAST PATH drift.** If Edit E is skipped, Visual Plan Mode keeps producing the old inline-tile format → split brain. Mitigation: Edit E is explicitly in scope; do not ship without it.
4. **Reference-implementation rot.** Sharon's overlay markup will evolve. If 7.5b hardcodes Sharon's HTML, future Sharon edits break the spec. Mitigation: 7.5b describes the *behavior contract* (X + backdrop + Escape, fade-in, ≈92vw × 90vh, scoped CSS), not literal markup. Sharon path is a *reference*, not a clone source.
5. **Token blowup.** Overlay HTML can balloon if every tile ships a full sample. Chad's intent paragraph (Edit A) explicitly addresses this — "be reasonable, low-token when possible, realistic CSS feel is enough." Make sure 7.8 rule #5 ("not every field") is unambiguous.
6. **Close UX bugs.** White-X close, backdrop close, Escape close — three close paths means three places to break (e.g., Escape listener leak, focus trap not released). Mitigation: 7.8 rule #7 is non-negotiable; verification in Section 6 includes a manual close-path test on first post-edit run.
7. **Per-output master rules + Skills directory sync (3-file rule).** /community lives in registry.md + c-skills/skill.md + index.html. The description front-matter change (Edit F) triggers the 3-file sync. Mitigation: explicitly call out in Section 5 ordering — sync registry/index AFTER skill.md edit lands clean.

---

## 5. Order of Application (Lowest Risk → Highest)

1. **Pre-flight:** Read the current skill.md fresh (avoid stale-cache edits). Grep `~/.claude/skills/` for `community previews` and any tile-class references — confirm no consumer breaks.
2. **Edit A** (intent paragraph) — additive, top of file, lowest risk. Lands first so the rest of the file reads in context of the new framing.
3. **Edit D** (7.5b reference pointer) — purely additive new sub-section, no existing content displaced.
4. **Edit B** (replace 7.5 content structure) — first destructive edit. After this lands, the file is internally consistent: intent paragraph promises overlay; 7.5 delivers the spec; 7.5b points to reference.
5. **Edit C** (replace 7.8 build rules) — second destructive edit. Lands AFTER 7.5 so the 8 rules can reference the overlay model 7.5 just established.
6. **Edit E** (FAST PATH alignment) — single bullet add to a separate section; safe to land late.
7. **Edit G** (Safety Guarantees bullet update) — one-line edit; lands near the end since it references 7.8.
8. **Edit F** (description front-matter) — last, because it propagates to the 3-file skills directory sync. Touch this only after the body of the file is fully aligned, then run the sync (registry.md + c-skills/skill.md + 📙 library/skills/index.html — see MEMORY rule "Skills Directory — Sync Rule").
9. **Verification pass** (Section 6).
10. **Backup before any edit:** Copy current skill.md to `community/skill.md.bak-2026-04-24` so rollback is one rename away.

---

## 6. Verification

How we'll know the update worked:

1. **File parses + reads coherently end-to-end.** Read skill.md top-to-bottom. Intent paragraph → 7.5 overlay spec → 7.5b reference → 7.8 overlay rules → FAST PATH alignment → Safety bullet. No stale references to "live-in-place" or "inline tile demo" outside of historical context.
2. **Smoke run with a TECH problem.** Fire `/community pdf extraction` on a fresh chat. Confirm:
   - Verdict box renders.
   - Preview opens at `community previews/pdf-extraction/index.html`.
   - Tiles are clickable cards (NOT live-in-place demos).
   - Clicking a tile fades a fullscreen overlay in.
   - White X (upper-right) closes.
   - Clicking the dimmed backdrop closes.
   - Escape key closes.
   - "view code" `<details>` is reachable inside the overlay.
3. **Smoke run with a CREATIVE problem.** Fire `/community wholesome metaphor for a clock`. Confirm same overlay behavior and that in-context brainstorm fallback still ships.
4. **FAST PATH smoke run.** Fire "make a /community for [topic]" — confirm 5-tile grid uses overlay format too (Edit E applied correctly).
5. **Deploy gate still fires.** After preview opens, the deploy gate box renders and waits. Reply "no" — confirm graceful exit.
6. **3-file sync.** After Edit F, confirm registry.md description matches, c-skills/skill.md description matches, 📙 library/skills/index.html description matches.
7. **No regressions in dependent skills.** Quick sanity check: `/c-skills` lists /community correctly; /community still appears in --0 shortcut map if applicable.
8. **Backup intact.** `community/skill.md.bak-2026-04-24` exists and is byte-for-byte the pre-edit file.

If any verification step fails, restore from backup and re-plan. Do not ship a partial edit.

---

## Summary

7 surgical edits (A–G), applied in a 10-step order that lands additive changes first, destructive replacements in the middle, and the front-matter / 3-file-sync trigger last. Backup before touching. Verify with two smoke runs (TECH + CREATIVE) plus FAST PATH. Backward compatible at the path/filename/contract level — only the HTML artifact's tile model changes. Agent D's prose drops into Edits A, B, C, D, E without restructuring.
