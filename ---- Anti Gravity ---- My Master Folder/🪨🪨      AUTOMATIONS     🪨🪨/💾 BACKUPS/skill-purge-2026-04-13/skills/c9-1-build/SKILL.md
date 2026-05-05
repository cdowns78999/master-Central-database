---
name: c9-1-build
description: Build Companion routine — research, plan, dashboard, and execute any project through a guided or auto routine
---

# c9-1-build

Turns any idea into a structured Build Companion dashboard with research, planning, and an execution routine.

## Usage

```
/c9-1-build
/c9-1-build [idea or goal]
```

## Instructions

### Design Language

Every HTML output uses the **Build Companion / salt rock lamp** design:
- Warm orange gradient background
- Thick white borders with dimension (box-shadow, inset highlights)
- Fonts: Outfit (body) + JetBrains Mono (labels/code)
- CSS vars: `--lamp-deep: #c2560a`, `--lamp-mid: #e07b2e`, `--lamp-warm: #f2a54a`, `--lamp-soft: #f8c97d`, `--lamp-glow: #fde8c8`
- Rounded cards with `border-radius: 16px`

Reference file for full design system:
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\workspace\🧠🧠🧠 triple-brain-build-dashboard.html`

### Paths

**Automation home (A5):**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A5  -- --- Build Companion\`

**Backup folder:**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A5  -- --- Build Companion\-- ☁️☁️a5 back up\`

**Workspace (active builds):**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\workspace1\workspace\`

---

## STEP ZERO — Backup Check

On EVERY `/c9-1-build` invocation, before doing anything else:

1. Check if the A5 folder exists — if not, create it
2. Check if the backup folder exists — if not, create it
3. Existing `build-*.html` in the A5 folder? Copy it to the backup folder with today's date prefix: `MM-DD-YYYY -- build-[name].html`
4. System confirmed — Proceed

---

## STEP ONE — Capture the Goal

If the user passed an idea with the command, use that. Otherwise:

Use **AskUserQuestion**:
- Question: "What are we building?"
- Header: "Project"
- Options (concise, practical):
  1. "Client tool" — "dashboard, tracker, or workflow for a client"
  2. "Internal system" — "something for Ahead ops or automation"
  3. "Content piece" — "presentation, campaign asset, or media"

Confirm back in 1 sentence. Move on.

---

## STEP TWO — Research + Build the Dashboard

### 2a: Research
- Use tools, web, sub-agents — find what's needed
- Break into real steps, map to phases

### 2b: Generate HTML
Create `build-[project-name].html` in the **A5 automation folder** (NOT workspace — workspace is for active editing, A5 is the home).

Use **AskUserQuestion** only if a critical decision is needed mid-research. Otherwise, just build.

The dashboard MUST have ALL sections filled with REAL content:

1. **Reminder Tile** — what to watch out for on THIS build
2. **Phase Map** — phases of THIS project (not generic)
3. **Building Blocks** — actual tasks (Now/Locked tags)
4. **Pickup Prompt** — resume context for future sessions
5. **Build Plan Overlay** — ONE/TWO step format (JetBrains Mono)
6. **Side Panel** — detailed steps + notes per block

Add checkmarks (✓) next to steps Claude can do with its tools.

7. **Spec Review Button** — centered "Pending Approval" button that toggles open/closed a hidden review tile showing the full build spec in ONE/TWO/THREE/FOUR step format. This is a PERMANENT feature on every dashboard — not temporary.

---

## STEP THREE — Spec Review

Use **AskUserQuestion**:
- Question: "Ready for the spec review?"
- Header: "Review"
- Options:
  1. "Show me" — "inject the review tile"
  2. "Skip it" — "I trust it, move to routine"

If "Show me":
1. The user should already have a **live preview** open of the dashboard (remind them to open it if not)
2. Update the SAME HTML (2nd pass, not new file)
3. The centered "Pending Approval" button is already in the dashboard — populate the hidden review tile behind it with the full spec in step format (JetBrains Mono, arrows + pipes)
4. User sees changes in real-time via their live preview
5. Wait for user to say **"approved"**
6. On approval: add the steps to the dashboard + update the upper-right quick plan button
7. Add a **traveling circular glow ring** animation (`glowTravel` keyframes) to the quick plan button — this catches the user's eye so they know it's new/updated
8. Move to Step Four (button stays as a permanent reference with glow)

If "Skip it": go straight to Step Four.

---

## STEP FOUR — Explain or Work Mode

Use **AskUserQuestion**:
- Question: "Want me to explain the full plan or jump into work mode?"
- Header: "Mode"
- Options:
  1. "Explain it" — "walk me through the whole plan first"
  2. "Work mode" — "let's get building"

**If "Explain it":**
Walk through the full plan in plain language — what each phase does, what the end result looks like. Then ask again if they want to enter work mode.

**If "Work mode":**
Proceed to WORK MODE.

---

## WORK MODE — True Review

1. **Honest step audit** — go through EVERY step in the build and mark each one:
   - ✅ = Claude handles this (tools, terminal, file creation, web research, writing, coding)
   - 🧑 = Best if user does this (GUI installs, app-specific actions, account logins)

2. **Be real but not shy** — the user (Chad) is highly capable. He can handle Chrome extensions, web apps, code, terminal, anything you point him at. Don't over-promise what Claude can do, but don't undersell either. Find the honest middle.

3. **Execute ✅ steps automatically** — one by one, update the HTML with progress after each

4. **🧑 steps: tell the user exactly what to do** — short, clear, actionable. No hand-holding paragraphs, just the move.

5. **Update the dashboard HTML** after every step with progress markers

6. **Loop** until all steps are done

---

## Important Notes

- ALWAYS re-read HTML before editing — another session may have changed it
- NEVER use tile cards from step-tile-reference.html as UI components — text/font/color only
- Bold key terms so they pop, text arrows for flow, short punchy sub-steps
- The dashboard is LIVING — updates as the build progresses
- Work mode cycle: true review -> mark ✅/🧑 -> execute or direct -> update HTML -> next step -> loop
- All interactive menus use AskUserQuestion — keep options to 2-3, no fluff
- The user is Chad — he's technical, capable, and doesn't need babying. Talk to him like a teammate.
