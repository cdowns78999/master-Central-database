---
name: c-understand
description: Echo-back skill — 3-5 minimal word bullets showing what Claude thinks the user means
---

# c-understand

Quick comprehension check. Claude echoes back what it thinks the user means in 3-5 minimal bullet points (3-5 words each). Gives the user a fast visual confirmation before work starts.

## Usage

```
/c-understand
/c-understand {description of task or request}
```

## Instructions

### On Invoke

If the user passed a task description with the command, use that. Otherwise, ask:

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   What's the task? Drop it and I'll echo back
   what I think you mean.

╰────────────────────────────────────────────────╯
```

### Output Format

Once you have the task, respond with 3-5 numbered bullets. Each bullet is 3-5 words MAX — minimal, practical, no fluff.

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   1. {3-5 word understanding}
   2. {3-5 word understanding}
   3. {3-5 word understanding}
   4. {3-5 word understanding}
   5. {3-5 word understanding}

╰────────────────────────────────────────────────╯
```

Then immediately ask:

```
Does this match what you mean?
```

Using AskUserQuestion:
- Header: "Check"
- Question: "Does this match what you mean?"
- Options:
  1. **Yes, go** — "You got it, proceed"
  2. **Close, but...** — "Almost — I'll clarify"
  3. **No, reset** — "Off track — let me re-explain"

### If "Yes, go"
Respond with:
```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   Locked in. Moving forward.

╰────────────────────────────────────────────────╯
```
Then proceed with the task (or return control to the caller).

### If "Close, but..."
Ask the user to clarify, then produce a NEW set of 3-5 bullets incorporating the correction. Re-ask the confirmation question.

### If "No, reset"
Ask the user to re-explain from scratch, then produce a fresh set of bullets.

## Rules

- ALWAYS 3-5 bullets (never fewer than 3, never more than 5)
- ALWAYS 3-5 words per bullet (keep it scannable)
- Bullets should be PRACTICAL — what will actually happen, not abstract concepts
- Order bullets by sequence (first thing first) when possible
- No emojis in the bullets — just clean numbered text
- This skill can be invoked standalone OR chained before any job
- The goal is TRUST — the user sees you understand before you act
