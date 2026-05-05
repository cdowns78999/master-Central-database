---
name: stack-board-qa-protocol
description: Exact Q&A wording, branches, troubleshoot loops, rollback semantics for /stack-board — the conversational spine the skill walks Chad through.
type: support
parent_skill: /stack-board
---

# stack-board-qa-protocol — the script

Owns every user-facing prompt verbatim. Skill.md calls into this MD for "what do I ask next, how do I phrase it."

---

## Stagger rule

ONE question, ONE answer, ONE decision at a time. Never collapse two phases into one prompt. Wait for Chad's reply before the next question.

---

## STEP 1 — branch question

```
╭─ STACK BOARD — new or existing? ───────────────────────╮

  Is this a NEW project or an EXISTING one?

  1️⃣  NEW       →  clone a fresh board into a new folder
  2️⃣  EXISTING  →  pick from your recent stack-board projects

╰─────────────────────────────────────────────────────────╯
```

### NEW sub-prompts

**If Chad fired bare `/stack-board` (no arg):**
> What's the 2–3 word name for this project?

**If Chad fired `/stack-board <name>` (with arg):**
> Creating NEW project: `<name>`. Continue? (yes / no)
> — yes proceeds; no → re-ask name.

### EXISTING sub-prompts

```
Recent stack-board projects:
1. !! 2026-04-25 — spotify curriculum   (today)
2.    2026-04-22 — scout troop          (3 days ago)
3.    2026-04-18 — koi tribute          (1 week ago)
4.    2026-04-10 — vrchat translator    (2 weeks ago)
5.    2026-03-28 — karaoke pipeline     (1 month ago)

Pick 1–5, or say "new" for a fresh project:
```

- Show stripped names (no `!! `) for readability; resolve back to full name on pick.
- Only top entry wears the crown.
- Empty bucket → fall through to NEW silently with a one-line note: `No existing /stack-board projects yet — switching to NEW.`

---

## PHASE 1 — Prep Phase

### Q1.1 — browser open check

```
Did the preview board open in your browser?

  1️⃣  YES   →  proceed to next check
  2️⃣  NO    →  let's troubleshoot
```

**Troubleshoot loop on NO:**
- Ask: "What did you see — blank tab, error page, or nothing happened at all?"
- Based on answer:
  - blank tab → re-issue `start` with explicit absolute path
  - error page → check file exists at the wrapper path
  - nothing → confirm browser is set as default for `file:///`
- After each fix attempt, re-ask Q1.1.
- Max 3 cycles. After 3 → fall back: `Open this manually: <full path>` and continue to Q1.2.

### Q1.2 — HTML correctness check

```
Does this job HTML look correct and look like it's functioning correctly?

  1️⃣  YES   →  Phase 1 complete, advancing to Phase 2
  2️⃣  NO    →  what's wrong with it?
```

Acceptance checklist for "looks right" (per `stack-board-template.md` visual grammar):
- Header reads `STACK BOARD · {project name}`
- JOB 1 row visible with 4 active boxes + arrows (amber/sky palette)
- JOB 2 prep row visible below, faded/dashed
- No broken layout, no console errors

**On NO:** ask "what's wrong with it?", apply fix to the cloned `index.html` (NOT the source template), re-open with cache buster, re-ask Q1.2. Loop until yes or Chad bails.

**On YES:** confirm `Phase 1 complete. Entering Phase 2 — Operational.`

---

## PHASE 2 — Operational Phase

### Q2.1 — free-form input

```
Please continue talking about the job, or describe the job.
```

No menu. Chad types whatever. Could be one sentence or paragraphs. After his input → Q2.2.

### Q2.2 — the 3-choice pivot

```
╭─ STACK BOARD — pick your pivot ────────────────────────╮

  Three ways to move on this project right now.
  Pick one. I'll set the next move accordingly.

  1️⃣  VISUALIZE  →  text-stack the job in the chat first
                    (no files written, low commit, easy pivot)

  2️⃣  BOARD      →  update the index.html board — add
                    JOB 1 boxes/arrows or stage JOB 2 prep

  3️⃣  BUILD      →  begin producing the END PROJECT
                    (creates end-project\ inside same wrapper)

╰─────────────────────────────────────────────────────────╯
```

Resolution of each choice → see `stack-board-end-project.md`.

### Q2.3 — how much at once (Metered Build Sub-Loop)

After each addition to the end project:

```
╭─ HOW MUCH AT ONCE — pick a pace ───────────────────────╮

  I inferred three pacing options from what's left.
  Pick the one that matches how loaded you feel.

  1️⃣  {smallest practical chunk}
  2️⃣  {medium chunk}
  3️⃣  {largest practical chunk — usually whole remainder}

╰─────────────────────────────────────────────────────────╯
```

Inference algorithm → see `stack-board-end-project.md`.

---

## Rollback semantics — "back" / "go back a phase"

Triggers: `back`, `go back a phase`, `rollback`, `step back`.

| Current location | "back" lands at |
|---|---|
| Metered Build Sub-Loop (Q2.3) | Q2.2 (3-Choice Pivot) — original input still in context |
| Q2.2 | Q2.1 (free-form input) — discard prior input |
| Q2.1 | Q1.2 |
| Q1.2 | Q1.1 |
| Q1.1 | Step 1 (branch question) |
| Step 1 | exit cleanly: `cancelled — no changes saved` |

**Rules:**
- One phase per `back` by default. `back back` or `back twice` → walk back two.
- Always confirm new location: `Rolled back to <phase name>. <re-display current prompt>`
- Disk state NEVER changes on rollback. Only conversational position rewinds.

---

## Bail / cancel

Triggers: `stop`, `nevermind`, `cancel`, `exit`.

Confirm: `Bailing on /stack-board. Files saved up to this point. Re-enter with /stack-board to resume.`

Do NOT delete the wrapper folder or any saved files. Exit cleanly.

---

## Off-script answers / fuzzy match

If Chad replies with non-numbered text to a numbered menu:
- Try fuzzy match against menu options (e.g., "the second one", "the recipe app", "yeah do new").
- Matched → confirm: `Got it — <matched option>. Proceeding.`
- Not matched → re-display menu with: `Didn't catch that — pick a number please.`

---

## Cross-references

- **skill.md** → uses every prompt above verbatim
- **stack-board-template.md** → Q1.2 acceptance checklist references the visual grammar there
- **stack-board-end-project.md** → Q2.2 pivot resolution + Q2.3 inference algorithm live there
