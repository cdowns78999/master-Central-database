---
name: stack-board-end-project
description: 3-choice pivot resolver + how-much-at-once inferred-choices algorithm + end-project staging for /stack-board — the decision engine that turns Chad's intent into action.
type: support
parent_skill: /stack-board
---

# stack-board-end-project — the decision engine

Owns the 3-choice pivot resolution AND the metered-build "how much at once" inferred choices AND end-project staging (since end-project IS the (c) branch). Where intent becomes action.

---

## Pivot choice (1) — VISUALIZE

**Operation:** text-only continuation in the chat. NO disk writes.

- Take Chad's free-form input (Q2.1) + accumulated visualizer state.
- Output an additive text visualization: indented bullet outline, ASCII boxes/arrows, or numbered flow — pick the shape that fits.
- Do NOT touch `index.html`.
- Do NOT regenerate the visualizer from scratch — append to it.
- After output → return to Q2.1.

**When VISUALIZE is the right call:**
- Chad is still brainstorming, ideas are wet
- Shape of the job isn't crystallized yet
- He wants to "see it on the page" before committing

---

## Pivot choice (2) — BOARD

**Operation:** write Chad's input as boxes/arrows into the cloned `index.html` (NOT the source template).

- Open `<wrapper>\index.html`.
- Translate Chad's input into discrete logical steps as boxes connected by arrows.
- Decide where they land:
  - JOB 1 row not yet detailed → fill JOB 1 boxes (replace the SETUP/INPUT/PROCESS/OUTPUT defaults with Chad's named steps).
  - JOB 1 detailed and "done enough" → populate the JOB 2 prep row with the new content (un-fade it, swap dashed → solid).
  - Both rows full → ask Chad whether to extend the board or treat the new content as a separate concern.
- Save HTML.
- Prompt Chad: `Refresh the browser tab (cache buster: ?v=$(date +%s)).`
- Return to Q2.1.

**When BOARD is the right call:**
- Input has clear discrete steps
- Chad is describing structure, not just vibe
- Visualization phase has produced something stable enough to commit

---

## Pivot choice (3) — BUILD (end project)

**Operation:** create `end-project\` sibling folder, then enter the Metered Build Sub-Loop.

```bash
END="<wrapper>/end-project"
mkdir -p "$END"
```

**Confirmation prompt before starting build:**
> End project will live at: `<full path>/end-project\`. Confirm? (yes / no)
> — yes proceeds; no → ask for alternate sub-name within the same wrapper.

**Hard rule:** `end-project\` is ALWAYS inside the same wrapper as `index.html`. Never at root, never in a different bucket. Same parent = everything stays grouped.

**On confirm:** enter Metered Build Sub-Loop (below).

**When BUILD is the right call:**
- Board has enough detail that the path forward is clear
- Chad explicitly wants output, not more planning
- VISUALIZE + BOARD have produced a stable shared understanding

**Soft warning (board mostly empty):**
> The board is mostly empty — building now means flying blind. Continue anyway? (yes / no)
> — yes → proceed; no → return to Q2.2.

---

## Metered Build Sub-Loop — the "how much at once" engine

After EACH addition Chad makes to the END PROJECT, ask Q2.3 with 3 INFERRED PRACTICAL choices.

### The boxed prompt

```
╭─ HOW MUCH AT ONCE — pick a pace ───────────────────────╮

  I inferred three pacing options from what's left.
  Pick the one that matches how loaded you feel.

  1️⃣  {smallest practical chunk}
  2️⃣  {medium chunk}
  3️⃣  {largest practical chunk — usually whole remainder}

╰─────────────────────────────────────────────────────────╯
```

### Inference algorithm — how to compute the 3 choices

**Step 1:** look at the board (`index.html`) + what's already in `end-project\` + what Chad just added.

**Step 2:** count remaining sections / boxes / steps that are not yet built.

**Step 3:** size the choices using this heuristic:

| Remaining work size | Choice 1 | Choice 2 | Choice 3 |
|---|---|---|---|
| **Tiny** (1–2 sections) | just this section | this + the next | the whole remainder |
| **Small** (3–5 sections) | just this section | this + the next two | the whole remainder |
| **Medium** (6–10 sections) | just this section | this + the next 3–4 | the next major chunk (half-ish) |
| **Large** (10+ sections) | just this section | this + the related cluster | the whole next phase |

**Step 4:** name the choices CONCRETELY — reference real sections by name when possible.

✅ Good: `1. just the hero section · 2. hero + nav + footer · 3. the whole landing page`
❌ Bad: `1. small · 2. medium · 3. large`

**Step 5:** present the box, wait for Chad's pick.

**Step 6:** execute that scope (write files into `end-project\`), then re-ask with FRESHLY inferred choices for the new remaining work.

### Choice rules

- Choice 1 = always the most surgical/safe option (minimum viable progress)
- Choice 2 = sensible middle (related cluster, natural pause point)
- Choice 3 = most ambitious — explicitly the whole remaining job if it's reasonable
- Never repeat the exact same 3 choices twice in a row — work has changed, choices should reflect it

### Exit conditions

- Chad says `done` → exit Metered Build Sub-Loop, return to Q2.1.
- Chad says `back` → trigger phase rollback (returns to Q2.2 with input still in context).
- Remaining work = 0 → confirm: `End project complete. What next?` and return to Q2.1.

---

## End-project file conventions

- Default entry point: `<wrapper>/end-project/index.html` (or whatever artifact type fits the project — script, doc, etc.)
- Sub-structure (assets, scripts, data) at Chad's discretion — don't impose unnecessary conventions
- Cache buster on every browser open of end-project files: `?v=$(date +%s)`

---

## Edge cases

- **Empty/vague Q2.1 input:** ask ONE clarifier before generating Q2.2 — don't invent intent.
- **Chad picks (3) before board has content:** soft warning above, then proceed if confirmed.
- **Chad changes mind mid-build (rollback from Q2.3):** rewind to Q2.2 with input preserved. `end-project\` folder stays on disk (not deleted) — Chad can resume.
- **Same Q2.3 choice repeatedly fired:** fine — just keep computing fresh choices each cycle.
- **All 3 inferred choices look identical:** the work is too small to need pacing — collapse to a single confirm: `Just one small thing left — do it now? (yes / no)`.

---

## Cross-references

- **skill.md** → calls into this MD for pivot resolution + Metered Build Sub-Loop
- **stack-board-template.md** → choice (2) writes INTO the JOB 2 prep zone defined there; choice (3) creates the `end-project\` sibling defined there
- **stack-board-qa-protocol.md** → receives pivot answer from Q2.2 there; receives scope answer from Q2.3 there
