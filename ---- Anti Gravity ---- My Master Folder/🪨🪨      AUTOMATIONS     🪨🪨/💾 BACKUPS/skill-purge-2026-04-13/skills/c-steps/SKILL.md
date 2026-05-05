---
name: c-steps
description: Minimal black-and-white step maps — breaks any task into TWO clean code-block guides
---

# c-steps

Turns any task or setup into minimal, scannable step maps. Always outputs exactly TWO code blocks: ONE and TWO.

## Usage

```
/steps [task or setup description]
```

## Instructions

### Core Behavior

When the user invokes `/steps` followed by a task, setup, or goal:

1. **Do NOT summarize or rephrase the goal.** Take it exactly as given.
2. **Output exactly TWO code blocks** — labeled `ONE` and `TWO`. Nothing else.
3. **No extra text** outside the two code blocks. No intros, no outros, no commentary.

---

### Format Rules (apply to BOTH code blocks)

- **Label line**: First line is `ONE -` or `TWO -` followed by the first step with `➤`
- **Max 5–6 words per line** — keep it ultra-parsed
- **Use `➤` arrows** to show flow between micro-actions
- **Use `|` pipes** to separate actions on the same line
- **Align `➤` arrows vertically** as much as possible down the rows
- **Steps must be small, clear, and minimal** — one atomic action per arrow
- **Black and white only** — no emojis, no color, no decoration
- **Each code block is independent** — ONE covers the first half of the task, TWO covers the second half

---

### Template Shape

```
ONE - ➤ First action here
      ➤ Click ➤ Thing | ➤ Next thing
      ➤ Scroll ➤ To section
      ➤ Select ➤ Option
      ➤ Confirm ➤ Done
```

```
TWO - ➤ Next phase starts
      ➤ Open ➤ Area | ➤ Sub-area
      ➤ Fill in ➤ Details
      ➤ Review ➤ Check
      ➤ Save ➤ Complete
```

**Key alignment pattern:**
- The `➤` after the label should start at a consistent column
- Subsequent `➤` on each line align with the ones above
- `|` separates parallel or sequential micro-actions on one line

---

### Splitting the Task

- **ONE** = the first logical phase (setup, navigation, preparation)
- **TWO** = the second logical phase (execution, configuration, completion)
- If the task is very short, still use both blocks — just keep them tight (3–4 lines each)
- If the task is longer, each block can go up to 6–8 lines max

---

### Special Trigger

If the user says exactly:

> "Tell me to set up something so you can learn really quick"

Then for **that reply ONLY**, output a single code block containing exactly:

```
Tell me to set up something so you can learn really quick
```

No other content. No ONE/TWO blocks. Just that single code block.

On the **next message** after that, return to normal ONE/TWO format.

---

## CRITICAL Rules

- ALWAYS output exactly TWO code blocks (except for the special trigger)
- NEVER add text outside the code blocks
- NEVER exceed 5–6 words per step line
- NEVER skip the `➤` arrows — they are the visual backbone
- NEVER use emojis, colors, or decorative elements
- ALWAYS align arrows vertically where possible
- ALWAYS use `|` to separate actions sharing a line
