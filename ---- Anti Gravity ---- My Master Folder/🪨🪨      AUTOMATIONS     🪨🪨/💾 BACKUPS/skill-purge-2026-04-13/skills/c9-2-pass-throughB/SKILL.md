---
name: c9-2-pass-throughB
description: Robust pass-through — production-grade build cycle with backup, verification, batch queue, session memory, and recovery
---

# c9-2-pass-throughB

Production-grade version of the staggered job cycle. Same DEFINE → COLLECT → BUILD → loop flow as pass-throughA, but with backup safety nets, build verification, batch job queue, session logging, and recovery mode.

## Usage

```
/c9-2-pass-throughB
/c9-2-pass-throughB [job description]
```

## 2 Bases

1. **The HTML**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 1\🎮 wing-menu-dashboard copy 3.html`
2. **The Build Track**: `C:\Users\chad\.claude\plans\melodic-jingling-sedgewick.md`

## Paths

**Backup folder**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 1\backups\`

**Session logs**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\-- GOT seriouss\Interation 2\Play 2 copy 3\package 1\memory\`

---

## PRE-FLIGHT (runs once on invocation)

Before anything else:

1. **Check backup folder** — if it doesn't exist, create it
2. **Check memory folder** — if it doesn't exist, create it
3. **Pre-flight scan** — read the HTML file and extract:
   - Current sectionNames (how many columns per wing)
   - Current pillData array lengths (how many pills per column)
   - Current theme state
   - Current Quick Link tile count
4. **Create backup** — copy current HTML to backup folder as `BACKUP--{YYYY-MM-DD}--{HH-MM}.html`
5. Report pre-flight results in 2-3 lines. Thread to STEP 1.

---

## STEP 1 — DEFINE (supports batch)

If the user passed a job description, capture it.

Use **AskUserQuestion**:
- Question: "What's the job?"
- Header: "Job type"
- Options:
  1. "Wing edit" — "modify pills, columns, or sections in a wing"
  2. "Center edit" — "change tiles, banner, or layout in the center pad"
  3. "New feature" — "add something that doesn't exist yet"
  4. "Batch mode" — "define multiple jobs upfront, build them all"

### If Batch mode:
Use **AskUserQuestion** with multiSelect:
- Question: "Which job types do you need? (select all that apply)"
- Header: "Batch"
- Options: Wing edit / Center edit / New feature
- multiSelect: true

Queue all selected types. Process each through COLLECT → BUILD in sequence.

For single jobs: confirm in 1 sentence, thread to STEP 2.

---

## STEP 2 — COLLECT (context-aware)

Same targeted menus as pass-throughA, but enhanced:

### If Wing edit:
1. **AskUserQuestion**: "Which wing?" → Left / Right
2. **Read sectionNames from HTML** — show ACTUAL current column names (not hardcoded)
3. **AskUserQuestion**: "Which column?" → dynamically populated from step 2
4. **Read pillData for that column** — show current pills
5. **AskUserQuestion**: "What change?" → Add pill / Edit pill / Remove pill / Rename column / Reorder pills

### If Center edit:
1. **Read center pad HTML** — inventory current tiles
2. **AskUserQuestion**: "What area?" → Quick Links / Tools / Banner / Star Card (with current count shown)
3. **AskUserQuestion**: "What change?" → Add / Edit / Remove / Rearrange

### If New feature:
1. **AskUserQuestion**: "Where does it go?" → Left wing / Right wing / Center / Toolbar / Global
2. **AskUserQuestion**: "Complexity?" → Simple (1 edit) / Medium (2-3 edits) / Complex (4+ edits)
3. Collect description

### Smart context carry:
- Track all changes made this session in a running array
- Before each COLLECT, check if the proposed change conflicts with a previous change
- If conflict detected: warn and offer to adjust or override

After all answers collected: confirm full job spec. Thread to STEP 3.

---

## STEP 3 — BUILD (with verification sandwich)

Every build step follows this pattern:

```
BACKUP → READ → EDIT → VERIFY → CONFIRM
```

1. **Pre-build snapshot** — note the exact line numbers and content being changed
2. **Read** the HTML file — ALWAYS fresh read
3. **Edit** the file — make the change
4. **Verify** — re-read the file and confirm:
   - The edit landed at the right location
   - No syntax errors introduced (check for unclosed brackets, missing commas)
   - Surrounding code is intact
5. **Confirm** — report what changed with before/after snippet

### If verification fails:
- **Recovery mode** activates
- Show what went wrong
- Use **AskUserQuestion**:
  - "Build verification failed. What do you want to do?"
  - Options: "Rollback to backup" / "Try fix" / "Skip this job"
- If rollback: restore from the backup file created in PRE-FLIGHT
- If try fix: attempt to correct the issue and re-verify
- If skip: move to next job in queue

### If batch mode:
- Process each queued job through COLLECT → BUILD sequentially
- Show progress: "Job 2/4 complete" etc.
- If one fails, continue with remaining jobs

---

## STEP 4 — PASS-OFF + SESSION LOG

After the build (or batch) completes:

1. **Update session log** — append to `PASSTHROUGH-SESSION-{YYYY-MM-DD}.md` in memory folder:
   ```
   ## Session Entry — {time}
   - Job: {description}
   - Type: {wing edit / center edit / new feature}
   - Changes: {what was modified}
   - Status: {success / failed / skipped}
   - Backup: {backup filename}
   ```

2. **Output the big prompt**:
   ```
   ╔═══════════════════════════════════════╗
   ║                                       ║
   ║     ANY OTHER JOB FOR ME?             ║
   ║                                       ║
   ╚═══════════════════════════════════════╝
   ```

3. Use **AskUserQuestion**:
   - Question: "Add another job?"
   - Header: "Continue"
   - Options:
     1. "Yes — new job" — "loop back to DEFINE"
     2. "Yes — batch" — "define multiple jobs at once"
     3. "No — show summary" — "wrap up with full session report"

### If Yes (either): loop back to STEP 1.

### If No — Summary card:
Output a formatted summary:
```
╔═══════════════════════════════════════════════╗
║  SESSION SUMMARY                              ║
╠═══════════════════════════════════════════════╣
║  Jobs completed: {count}                      ║
║  Jobs failed: {count}                         ║
║  Backup: {filename}                           ║
║  Session log: {filename}                      ║
╠═══════════════════════════════════════════════╣
║  Changes:                                     ║
║  • {change 1}                                 ║
║  • {change 2}                                 ║
║  • ...                                        ║
╚═══════════════════════════════════════════════╝
```

---

## Threading Rules

- Every step flows into the next — no dead ends, no "ready?" pauses
- Context carries forward: what you learned in COLLECT informs BUILD
- Session memory persists: all changes tracked, conflicts detected
- Recovery is always available: backup + rollback at any point
- The cycle never stops — always loops or wraps cleanly

---

## What Makes B Different from A

| Feature | A | B |
|---------|---|---|
| Backup before edit | No | Yes — timestamped |
| Build verification | No | Yes — read-back check |
| Batch mode | No | Yes — multi-job queue |
| Context carry | No | Yes — conflict detection |
| Session logging | No | Yes — .md in memory folder |
| Recovery mode | No | Yes — rollback/fix/skip |
| Dynamic menus | Static options | Reads actual HTML state |
| Summary card | Basic | Full formatted report |

---

## Important Notes

- ALWAYS read the HTML before editing — another session may have changed it
- Pre-flight runs ONCE per invocation, not per job
- Backup is created ONCE at start — individual jobs don't re-backup (the pre-flight backup is the safety net)
- Session log APPENDS — multiple invocations on the same day stack in the same file
- Keep menus to 2-4 options — no fluff even though this is the robust version
- Talk to Chad like a teammate — short, direct, capable
- The sophistication is in the LOGIC, not the verbosity
