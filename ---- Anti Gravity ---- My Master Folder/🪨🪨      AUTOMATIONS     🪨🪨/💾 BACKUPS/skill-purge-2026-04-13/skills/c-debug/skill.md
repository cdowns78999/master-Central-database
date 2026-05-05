---
name: c-debug
description: Logical debugger — walks any job or task through checkpoints, reports what hit and what missed
---

# c-debug

Logical debugger for any job or task. Describe what's stuck or broken — it walks the logic chain as checkpoints, reports what landed and what didn't, then gives you action options. Scales from quick scan to deep dive.

## Usage

```
/c-debug
```

Then describe the problem, task, or job that needs debugging.

## Instructions

### On Invoke

When the user runs `/c-debug`, show the greeting hub box:

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   Logical debugger ready.

   Describe the job or task — what's stuck,
   what broke, what's not working right.

╰────────────────────────────────────────────────╯
```

Then immediately present a **depth picker** using AskUserQuestion:

- Header: "Debug Depth"
- Question: "How deep do you want to go?"
- Options:
  1. **Quick Scan** — description: "3-4 checkpoints, surface-level. Fast answer."
  2. **Standard** — description: "5-7 checkpoints, full diagnostic + results."
  3. **Deep Dive** — description: "8+ checkpoints with sub-checks. Leave no stone unturned."

Wait for BOTH the problem description AND the depth selection before proceeding. Chad may provide the problem description before or after picking depth — collect both before outputting diagnostics.

---

### Phase 1: Severity Bar + Diagnostic

Once you have the problem and depth, evaluate the checkpoints and output TWO things:

#### 1. Severity Bar (hub box)

A visual health indicator at the top:

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   ████████████░░░░░░░░  3 of 5 passed

   Break point: Check 4 — Feed Deploy

╰────────────────────────────────────────────────╯
```

The progress bar is made of `█` (filled) and `░` (empty) characters. Width = 20 characters total. Fill proportionally based on pass rate. Show `N of N passed` to the right.

If ALL checks pass, show:
```
   ████████████████████  5 of 5 passed

   No break point — all clear
```

#### 2. Diagnostic Block (single code block)

All checkpoints in ONE code block (not split into TWO anymore):

```
DIAGNOSTIC ─────────────────────────────────────
🟢 1  [Area]            ➤ {C1:} [3-7 word finding]              PASS
🔵 2  [Area]            ➤ {C2:} [3-7 word finding]              PASS
🟠 3  [Area]            ➤ {C3:} [3-7 word finding]              PASS
🔴 4  [Area]            ➤ {C4:} [3-7 word finding]              FAIL ◄
🟣 5  [Area]            ➤ {C5:} [3-7 word finding]              SKIP
─────────────────────────────────────────────────
                                          3/5 passed
```

Where:
- Color dot = item tracker (same color follows this item into RESULTS)
- Number = sequential (1, 2, 3...)
- `[Area]` = short subject of what's being checked (1-4 words)
- `{CN:}` = tag where N matches the check number
- `[3-7 word finding]` = concise summary of what was found
- `PASS` / `FAIL` / `SKIP` = verdict
- `◄` marker = appears ONLY on FAIL rows to draw the eye to the break point
- Footer line = compact pass count

#### Color Dot System

Color dots track items across DIAGNOSTIC and RESULTS. Same color = same item.

**Cycle through these colors in order:** 🟢 🔵 🟠 🔴 🟣 — then repeat.

Check 1 / Result 1 = 🟢. Check 2 / Result 2 = 🔵. Etc.

#### Depth Scaling

- **Quick Scan**: 3-4 checkpoints. Hit the most likely failure points only.
- **Standard**: 5-7 checkpoints. Full logic chain evaluation.
- **Deep Dive**: 8+ checkpoints. Break complex steps into sub-checks using letter suffixes ({C3a:}, {C3b:}, {C3c:}). Sub-checks are indented under their parent:

```
🟠 3  JSON Output       ➤ {C3:}  file written to exports/       PASS
   3a Parse Response     ➤ {C3a:} API returned valid JSON        PASS
   3b Write to Disk      ➤ {C3b:} file saved, 4.2KB              PASS
   3c Deploy Copy        ➤ {C3c:} feeds/ copy never triggered    FAIL ◄
```

Sub-checks inherit their parent's color dot (no dot shown, just indented).

---

### Phase 2: Results

After the diagnostic block, output a SECOND code block showing what actually landed:

```
RESULTS ─────────────────────────────────────────
🟢 1  [Subject]         ➤ [3-7 word actual result]              HIT
🔵 2  [Subject]         ➤ [3-7 word actual result]              HIT
🟠 3  [Subject]         ➤ [3-7 word actual result]              HIT
🔴 4  [Subject]         ➤ [3-7 word actual result]              MISS ◄
🟣 5  [Subject]         ➤ [3-7 word actual result]              MISS
─────────────────────────────────────────────────
                                     ◄ break: step 4
```

Where:
- Same color dots as DIAGNOSTIC (tracking the same items)
- `HIT` = goal achieved
- `PARTIAL` = partially completed
- `MISS` = did not happen
- `◄` marker on MISS rows that stem from the failure point
- Footer = identifies the break step

---

### Phase 3: Verdict + Action Menu

After both code blocks, wrap the verdict in the hub box:

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   Break: Check N — [Area]

   [1-2 sentence plain-language explanation of
   what broke and what to do about it.]

╰────────────────────────────────────────────────╯
```

Then immediately present an **action menu** using AskUserQuestion:

- Header: "Next Step"
- Question: "What do you want to do?"
- Options:
  1. **Fix it now** — description: "I'll patch the failure point right here"
  2. **Dig deeper** — description: "Expand the failed check into sub-checks"
  3. **Show me the code** — description: "Open the relevant file at the break point"
  4. **Done** — description: "Got what I needed"

#### Action Responses

- **Fix it now**: Identify the root cause, propose the fix, and implement it. After fixing, re-run the failed check mentally and confirm it would pass now.
- **Dig deeper**: Take the failed checkpoint and break it into 3-5 sub-checks. Output a new mini-diagnostic block for just that area, then re-present the action menu.
- **Show me the code**: Read the relevant file and display the section around the failure point. Then re-present the action menu.
- **Done**: Close with a short confirmation in the hub box. No further output.

The action menu can loop — "Dig deeper" and "Show me the code" both return to the menu after completing. Only "Done" or "Fix it now" (after the fix is applied) end the session.

---

### Full Output Structure (in order)

1. Hub box — severity bar with pass count + break point
2. Code block — DIAGNOSTIC (all checks, single block)
3. Code block — RESULTS (what actually landed)
4. Hub box — Verdict with plain-language explanation
5. AskUserQuestion — Action menu (Fix / Dig deeper / Show code / Done)

---

### Example Session

Chad says: "The Gmail scraper ran but the dashboard isn't showing new contacts"
Chad picks: **Standard**

Output:

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   ████████████░░░░░░░░  3 of 5 passed

   Break point: Check 4 — Feed Deploy

╰────────────────────────────────────────────────╯
```

```
DIAGNOSTIC ─────────────────────────────────────
🟢 1  Scraper Run       ➤ {C1:} executed without errors          PASS
🔵 2  OAuth Token       ➤ {C2:} token valid and authenticated    PASS
🟠 3  JSON Output       ➤ {C3:} file written to exports/         PASS
🔴 4  Feed Deploy       ➤ {C4:} feeds/ has stale file            FAIL ◄
🟣 5  Dashboard Read    ➤ {C5:} reading yesterday's data         SKIP
─────────────────────────────────────────────────
                                          3/5 passed
```

```
RESULTS ─────────────────────────────────────────
🟢 1  Scrape Gmail      ➤ 21 threads pulled successfully         HIT
🔵 2  Auth Flow         ➤ token cached and valid                  HIT
🟠 3  Write JSON        ➤ wrote to exports/ not feeds/            HIT
🔴 4  Deploy to Feeds   ➤ copy step never ran                     MISS ◄
🟣 5  Dashboard Display ➤ still showing old contacts              MISS
─────────────────────────────────────────────────
                                     ◄ break: step 4
```

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   Break: Check 4 — Feed Deploy

   The scraper wrote to exports/ but never
   copied to data/feeds/. Dashboard reads from
   feeds only. Add the deploy step to the script.

╰────────────────────────────────────────────────╯
```

Then → AskUserQuestion: "What do you want to do?" with Fix it now / Dig deeper / Show me the code / Done

---

### Example: All Checks Pass

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   ████████████████████  4 of 4 passed

   No break point — all clear

╰────────────────────────────────────────────────╯
```

```
DIAGNOSTIC ─────────────────────────────────────
🟢 1  Scraper Run       ➤ {C1:} executed without errors          PASS
🔵 2  OAuth Token       ➤ {C2:} token valid and authenticated    PASS
🟠 3  Feed Deploy       ➤ {C3:} feeds/ has fresh file            PASS
🔴 4  Dashboard Read    ➤ {C4:} showing current data             PASS
─────────────────────────────────────────────────
                                          4/4 passed
```

```
RESULTS ─────────────────────────────────────────
🟢 1  Scrape Gmail      ➤ 21 threads pulled successfully         HIT
🔵 2  Auth Flow         ➤ token cached and valid                  HIT
🟠 3  Deploy JSON       ➤ feeds/ updated with new data            HIT
🔴 4  Dashboard Display ➤ new contacts visible in pill            HIT
─────────────────────────────────────────────────
                                        all clear ✓
```

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   All clear — everything passed.

   The full pipeline is working end to end.
   No action needed.

╰────────────────────────────────────────────────╯
```

No action menu when all checks pass — just the clean confirmation.

---

## CRITICAL Rules

- ALWAYS show the severity bar hub box FIRST (before any code blocks)
- ALWAYS output DIAGNOSTIC in a SINGLE code block (not split)
- ALWAYS output RESULTS in a SINGLE code block (not split)
- ALWAYS use the `◄` marker on FAIL and MISS rows
- ALWAYS include footer lines in both code blocks (pass count or break step)
- ALWAYS use the arrow-row format with tags ({CN:}) in DIAGNOSTIC
- ALWAYS keep descriptions between 3-7 words
- ALWAYS align arrows vertically within each code block
- ALWAYS wrap commentary in the Hub Color Stack box
- ALWAYS end with the action menu (AskUserQuestion) unless all checks pass
- ALWAYS present the depth picker on invoke
- ONLY color dots (🟢🔴🟠🔵🟣) allowed inside code blocks — no other emojis or decoration
- NEVER skip the tags in DIAGNOSTIC — they are the systematic backbone
- NEVER output partial lists — always show all rows
- NEVER mix DIAGNOSTIC and RESULTS rows in the same code block
- NEVER show the action menu when all checks pass — close cleanly instead
