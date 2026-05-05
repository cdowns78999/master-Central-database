---
name: c9-2-pass-throughA
description: Staggered pass-through — runs the build job cycle (DEFINE → COLLECT → BUILD → loop) on the wing dashboard with interactive menus
---

# c9-2-pass-throughA

Runs a staggered, never-ending job cycle on the Ahead Command Center wing dashboard. Each step flows into the next with no dead ends.

## Usage

```
/c9-2-pass-throughA
/c9-2-pass-throughA [job description]
```

## 2 Bases

1. **The HTML**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 1\🎮 wing-menu-dashboard copy 3.html`
2. **The Build Track**: `C:\Users\chad\.claude\plans\melodic-jingling-sedgewick.md`

---

## STEP 1 — DEFINE

If the user passed a job description with the command, use that and skip to STEP 2.

Otherwise, use **AskUserQuestion**:
- Question: "What's the job?"
- Header: "Job type"
- Options:
  1. "Wing edit" — "modify pills, columns, or sections in a wing"
  2. "Center edit" — "change tiles, banner, or layout in the center pad"
  3. "New feature" — "add something that doesn't exist yet"

Confirm the job in 1 sentence. Thread immediately to STEP 2.

---

## STEP 2 — COLLECT

Based on the job type from STEP 1, present targeted follow-up menus. Each answer flows straight into the next question — no pauses, no summaries between.

### If Wing edit:
1. **AskUserQuestion**: "Which wing?" → Left / Right
2. **AskUserQuestion**: "Which column?" → Show current column names for that wing (read sectionNames from HTML first)
3. **AskUserQuestion**: "What change?" → Add pill / Edit pill / Remove pill / Rename column

### If Center edit:
1. **AskUserQuestion**: "What area?" → Quick Links / Tools / Banner / Star Card
2. **AskUserQuestion**: "What change?" → Add tile / Edit tile / Remove tile / Change text

### If New feature:
1. **AskUserQuestion**: "Where does it go?" → Left wing / Right wing / Center / Toolbar
2. Collect a short description of what to build (use AskUserQuestion with open-ended option)

After all answers are collected, confirm the full job spec in 1-2 sentences. Thread to STEP 3.

---

## STEP 3 — BUILD

Execute the collected changes:

1. **Read** the HTML file first — ALWAYS re-read before editing
2. Find the exact code location for the change
3. **Edit** the file — make the change
4. Confirm what was done in 1 sentence

If the change involves pillData, also update sectionNames if needed.
If adding a new column, also add the wing-section HTML, dot, and Quick Link tile.

---

## STEP 4 — PASS-OFF

After the build completes, output in large text:

```
╔═══════════════════════════════════════╗
║                                       ║
║     ANY OTHER JOB FOR ME?             ║
║                                       ║
╚═══════════════════════════════════════╝
```

Then use **AskUserQuestion**:
- Question: "Add another job?"
- Header: "Continue"
- Options:
  1. "Yes — new job" — "loop back to DEFINE"
  2. "No — wrap up" — "done for now"

If Yes: loop back to STEP 1.
If No: output a short summary of everything done this session.

---

## Threading Rules

- Every step's output becomes the next step's input — no orphan states
- Never stop between steps to ask "ready?" — just flow
- If something fails, say what failed and offer to retry or skip
- The cycle never dead-ends — always either loops or wraps up cleanly

---

## Important Notes

- ALWAYS read the HTML before editing — another session may have changed it
- Keep menus to 2-4 options max — no fluff
- Talk to Chad like a teammate — short, direct, no babying
- The stagger is the flow — each menu answer immediately triggers the next step
