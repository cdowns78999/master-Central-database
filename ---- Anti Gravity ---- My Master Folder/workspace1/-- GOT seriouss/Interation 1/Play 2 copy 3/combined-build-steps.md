# Combined Skills Reference — /c9-1-build + /c9-1-steps

---

## SKILL 1: /c9-1-build

Turns any idea into a structured Build Companion dashboard with research, planning, and an execution routine.

### Usage

```
/c9-1-build
/c9-1-build [idea or goal]
```

### Design Language

Every HTML output uses the **Build Companion / salt rock lamp** design:
- Warm orange gradient background
- Thick white borders with dimension (box-shadow, inset highlights)
- Fonts: Outfit (body) + JetBrains Mono (labels/code)
- CSS vars: `--lamp-deep: #c2560a`, `--lamp-mid: #e07b2e`, `--lamp-warm: #f2a54a`, `--lamp-soft: #f8c97d`, `--lamp-glow: #fde8c8`
- Rounded cards with `border-radius: 16px`

Reference file for full design system:
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\workspace\triple-brain-build-dashboard.html`

### Paths

**Automation home (A5):**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\AUTOMATIONS\-- A5 -- --- Build Companion\`

**Backup folder:**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\AUTOMATIONS\-- A5 -- --- Build Companion\-- a5 back up\`

**Workspace (active builds):**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\workspace\`

---

### STEP ZERO — Backup Check

On EVERY invocation, before doing anything else:

1. Check if the A5 folder exists — if not, create it
2. Check if the backup folder exists — if not, create it
3. Existing `build-*.html` in the A5 folder? Copy it to the backup folder with today's date prefix: `MM-DD-YYYY -- build-[name].html`
4. System confirmed — Proceed

---

### STEP ONE — Capture the Goal

If the user passed an idea with the command, use that. Otherwise ask:
- "What are we building?"
- Options: Client tool | Internal system | Content piece

Confirm back in 1 sentence. Move on.

---

### STEP TWO — Research + Build the Dashboard

**2a: Research**
- Use tools, web, sub-agents — find what's needed
- Break into real steps, map to phases

**2b: Generate HTML**
Create `build-[project-name].html` in the A5 automation folder.

The dashboard MUST have ALL sections filled with REAL content:

1. **Reminder Tile** — what to watch out for on THIS build
2. **Phase Map** — phases of THIS project (not generic)
3. **Building Blocks** — actual tasks (Now/Locked tags)
4. **Pickup Prompt** — resume context for future sessions
5. **Build Plan Overlay** — ONE/TWO step format (JetBrains Mono)
6. **Side Panel** — detailed steps + notes per block
7. **Spec Review Button** — centered "Pending Approval" button that toggles a hidden review tile

---

### STEP THREE — Spec Review

- "Show me" — inject the review tile into the live dashboard
- "Skip it" — move to routine

If shown: populate the hidden review tile, wait for "approved", then add traveling glow ring animation to the quick plan button.

---

### STEP FOUR — Explain or Work Mode

- "Explain it" — walk through the full plan in plain language
- "Work mode" — jump into execution

---

### WORK MODE — True Review

1. **Honest step audit** — mark every step:
   - ✅ = Claude handles this
   - 🧑 = Best if user does this

2. **Execute ✅ steps automatically** — one by one, update HTML with progress

3. **🧑 steps: tell the user exactly what to do** — short, clear, actionable

4. **Update the dashboard HTML** after every step with progress markers

5. **Loop** until all steps are done

---

### Important Notes

- ALWAYS re-read HTML before editing
- NEVER use tile cards from step-tile-reference.html as UI components
- Bold key terms, text arrows for flow, short punchy sub-steps
- The dashboard is LIVING — updates as the build progresses
- Work mode cycle: true review -> mark -> execute or direct -> update HTML -> next step -> loop

---
---

## SKILL 2: /c9-1-steps

Turns any task or setup into minimal, scannable step maps. Always outputs exactly TWO code blocks: ONE and TWO.

### Usage

```
/steps [task or setup description]
```

### Core Behavior

1. Do NOT summarize or rephrase the goal. Take it exactly as given.
2. Output exactly TWO code blocks — labeled `ONE` and `TWO`. Nothing else.
3. No extra text outside the two code blocks.

---

### Format Rules (apply to BOTH code blocks)

- **Label line**: First line is `ONE -` or `TWO -` followed by the first step with `➤`
- **Max 5-6 words per line** — ultra-parsed
- **Use `➤` arrows** to show flow between micro-actions
- **Use `|` pipes** to separate actions on the same line
- **Align `➤` arrows vertically** as much as possible
- **Steps must be small, clear, and minimal** — one atomic action per arrow
- **Black and white only** — no emojis, no color, no decoration
- **Each code block is independent** — ONE = first half, TWO = second half

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

---

### Splitting the Task

- **ONE** = first logical phase (setup, navigation, preparation)
- **TWO** = second logical phase (execution, configuration, completion)
- Short tasks: still use both blocks, just keep them tight (3-4 lines each)
- Longer tasks: each block can go up to 6-8 lines max

---

### Critical Rules

- ALWAYS output exactly TWO code blocks
- NEVER add text outside the code blocks
- NEVER exceed 5-6 words per step line
- NEVER skip the `➤` arrows
- NEVER use emojis, colors, or decorative elements
- ALWAYS align arrows vertically where possible
- ALWAYS use `|` to separate actions sharing a line
