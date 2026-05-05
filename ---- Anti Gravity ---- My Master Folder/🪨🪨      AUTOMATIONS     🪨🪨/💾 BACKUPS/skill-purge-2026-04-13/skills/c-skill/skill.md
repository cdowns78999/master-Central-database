---
name: c-skill
description: Snappy skill builder — 4 quick menus to define a job, then Claude drafts the skill instruction in Claude-native best practices
---

# c-skill

Snappy skill builder — walks you through 4 quick menus to define a job, then Claude drafts the full skill instruction using best practices for Claude-native execution. Optionally researches standard + community approaches first.

## Usage

```
/c-exp-job
```

## Instructions

### Phase 1: Roll Out the Red Carpet

Four fast interactive menus. Keep it swift — no overthinking.

#### Menu 1 — Job Goal

Use AskUserQuestion (or plain text if it gets wordy):
- Question: "What's the job? (one sentence)"
- Header: "Goal"
- Free text input — user types one sentence describing the concept

Store as {JOB_GOAL}.

Pause 2 seconds (let it land), then move to Menu 2.

#### Menu 2 — Hierarchies

Use AskUserQuestion (or plain text if it gets wordy):
- Question: "List 2-3 focus areas, separated by commas. Then list 2-3 sub-focuses in the same order — comma-separated, matched 1-to-1."
- Header: "Structure"

Example input:
  focus areas: tone, vocabulary, structure
  sub-focuses: warm nurturing, soft words, short flowing

These pair 1-to-1:
  1 → 1, 2 → 2, 3 → 3

Store as {HIERARCHIES} array of pairs.

#### Menu 3 — Confirm the Stack

Display the paired results in a clean indented-bullet layout:

  ─── here's what we're building ───

  {hierarchy 1}
    · {sub-hierarchy 1}

  {hierarchy 2}
    · {sub-hierarchy 2}

  {hierarchy 3}
    · {sub-hierarchy 3}

  goal: {JOB_GOAL}

  ─────────────────────────────────

Then ask: "Look right?"
- Options: "Go" / "Edit" / "Start over"

If Go → proceed to Menu 4.
If Edit → re-ask the relevant menu.
If Start over → back to Menu 1.

#### Menu 4 — Ready to Draft

Ask: "Ready to draft?"
- Options: "Yes" / "Edit more"

If Edit more → return to whichever menu needs adjusting.

If Yes → Claude takes full control. Move to Phase 2.

---

### Phase 2: Claude Drafts the Skill

Claude now owns this. The user's job goal + hierarchies are the raw inputs — Claude transforms them into a proper skill instruction file.

**Rules:**
- Claude writes the skill.md in whatever phase structure makes the most sense for THIS specific job
- Always conform to Claude's own best practices for skill instructions — phrasing, phase ordering, tool usage, and flow should be optimized for how Claude actually executes
- Claude is the audience AND the executor — write instructions that Claude reads cleanly and runs reliably
- Group logically and comfortably into phases — don't force a rigid template if the job calls for something different
- Use the hierarchy pairs from Menu 2 as the structural backbone, but Claude decides how they become phases, steps, or sub-steps
- Keep it tight — no filler, no redundancy, no over-explanation

**Output the draft** inside a code block so the user can read the full skill.md text.

Then ask: "This is the full skill. Approve?"
- Options: "Go live" / "Tweak something" / "Scrap it"

If Go live → Phase 3.
If Tweak something → user says what to change, Claude edits and re-presents.
If Scrap it → back to Menu 1.

---

### Phase 3: Go Live

1. Create folder: `C:\Users\chad\.claude\skills\{skill-name}\`
2. Write `skill.md` with the approved content
3. Confirm:

  ─── live ──────────────────────────
  ✓ /{skill-name} created
  ✓ ready to invoke
  ─────────────────────────────────

4. **Auto-sync directory** — immediately add the new skill to BOTH directory files:
   - Read `C:\Users\chad\.claude\skills\c-dir-space\registry.md` and add a row in the correct table section
   - Read `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\💎💎 - - - beginning - - - 💎💎\📙-- -- - -- 📙 library\skills\index.html` and add a `<div class="skill-row">` in the correct HTML section, update footer count
   - Use the skill description to generate 3 short tags if not obvious from context
   - Ask for color dot if it's a C Series skill
   - Verify `</body></html>` still intact after edit

5. Ask: "Want to run the first job now?"
   - Options: "Run it" / "Not yet"

If Run it → invoke the newly created skill immediately.

---

### Phase 4: Research (runs when the skill is a research-type job)

If the drafted skill involves research, this phase executes it.

Two parallel searches using the job goal + hierarchies as context.

#### Track A — Standard Practices
- Web search for established, professional, widely-accepted approaches to {JOB_GOAL}
- Look for documented methods, style guides, industry norms
- Capture 2-3 scripted I/O examples (input prompt → expected output)

#### Track B — Community / Nerd Renditions
- Web search for community takes — GitHub repos, Reddit threads, prompt engineering forums, Discord snippets, blog posts
- Look for creative, opinionated, or experimental versions of the same concept
- Capture 2-3 scripted I/O examples (input prompt → expected output)

**Present everything in one clean delivery:**

  ─── STANDARD PRACTICES ──────────────────

  Source: {where it came from}

  Example 1:
    INPUT:  {prompt or setup}
    OUTPUT: {result}

  Example 2:
    INPUT:  {prompt or setup}
    OUTPUT: {result}

  ─── COMMUNITY / NERD TAKES ──────────────

  Source: {where it came from}

  Example 1:
    INPUT:  {prompt or setup}
    OUTPUT: {result}

  Example 2:
    INPUT:  {prompt or setup}
    OUTPUT: {result}

  ─────────────────────────────────────────

Then ask: "Want to run with one of these, remix, or dig deeper?"
- Options: "Use Standard" / "Use Community" / "Remix both" / "Dig deeper"

If Dig deeper → run another round of research with refined queries.
Otherwise → output the chosen style as a clean exportable block.

---

## Important Notes

- Menus are PREFERRED but optional — if things get wordy, use plain text instead
- Phase 2 is Claude's domain — Claude writes the skill in whatever structure best fits the job
- Skill instructions are always written FOR Claude, BY Claude — optimized for Claude's execution
- Phase 4 searches run in parallel for speed
- Always cite where examples came from (URL or source name)
- Keep I/O examples real and usable — not abstract descriptions
- The skill is reusable for ANY concept — tone work, tool building, research, whatever
- Always wrap all output in the hub color stack box per MEMORY.md format
