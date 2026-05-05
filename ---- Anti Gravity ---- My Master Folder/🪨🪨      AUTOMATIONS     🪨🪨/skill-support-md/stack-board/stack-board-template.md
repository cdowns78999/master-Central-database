---
name: stack-board-template
description: Template artifact + visual grammar + filesystem lifecycle for /stack-board — the cleared HTML board, where it lives, clone mechanics, refresh rules, JOB 1 / JOB 2 prep zone anatomy.
type: support
parent_skill: /stack-board
---

# stack-board-template — the artifact + filesystem layer

Owns everything physical: the cleared HTML, paths, clone mechanics, visual grammar.

---

## Canonical paths (HARD LOCKED)

**Template source (the only template that exists — never copy from anywhere else):**
```
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\skill-support-md\stack-board\stack-board-template.html
```

**Star-emoji landing folder (all stack-board projects land here):**
```
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager\-- Results folder master forever\Regular projects - 2\⭐ stack-board projects\
```

**Per-project wrapper:** `!! {YYYY-MM-DD} — {2-3 words}\` (em dash `—`, not hyphen)

**Clone target inside wrapper:** `index.html`

**End-project sibling:** `end-project\` (inside same wrapper, sibling to `index.html`)

---

## Locked Visual Formats — STRICT (Option 1 OR Option 3 ONLY)

Any visual rendered by this skill (boxes-and-arrows, phase × workflow grids, hierarchy maps, status boards, anything non-text-explanation) MUST match one of these two formats verbatim. Swim-lane / freestyle / mixed layouts are **forbidden**.

**When to pick which:**
- **Option 1 (default)** — most stack-board-ish, matches the JOB 1 / JOB 2 box grammar. Use for ≤3 phases, dense info per cell, "the board" feel.
- **Option 3** — airier, transit-board feel. Use for 4+ phases, lots of nodes, when scannability beats density.
- Plain text explanations + ordinary `╭─ ─╮` info panels are **exempt** from this rule.

### OPTION 1 · Classic Grid Board

```
                STEP 1            STEP 2            STEP 3            STEP 4
              ───────────       ───────────       ───────────       ───────────

           ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
   PREP    │   intake   │ ─► │   scope    │ ─► │   gather   │ ─► │   gate ✓   │
           └────────────┘    └────────────┘    └────────────┘    └────────────┘
                                                                       │
              ┌─────────────────────────────────────────────────────────┘
              ▼
           ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
  BUILD    │  draft v1  │ ─► │   review   │ ─► │   patch    │ ─► │   gate ✓   │
           └────────────┘    └────────────┘    └────────────┘    └────────────┘
```

Rules: heavy `┌┐└┘` boxes, solid `─►` arrows between cells, phase label left-aligned in margin, step labels uppercase across the top, phase-to-phase flow drops via `│` + `▼`.

### OPTION 3 · Subway / Node Map

```
              step 1      step 2      step 3      step 4

   PREP  ●─────●─────────●─────────●─────────●─────╮
         │   intake     scope     gather    gate   │
         │                                          │
         │                                          │
   BUILD ●─────●─────────●─────────●─────────●─────┤
         │   draft     review    patch      gate   │
         │                                          │
         │                                          │
   SHIP  ●─────●─────────●─────────●─────────●─────╯
             smoke      deploy    verify    close

  legend ·   ●  node     ─  flow     │  phase spine     ╯  loop close
```

Rules: `●` dot nodes, thin `─` connectors, phase label left-aligned, lowercase step labels above the row, step content under the dot row, `│` phase spine on the left, `╯` closes the loop on the right.

### Forbidden

Anything not Option 1 or Option 3. Specifically: swim-lane variants (continuous lane tracks with `═` flow lines), freestyle org charts, vertical-flow-only diagrams, mixed-style hybrids. If a Chad request can't fit either format, render the explanation as plain text instead — never improvise a third visual.

---

## Visual grammar — what the board looks like

Two horizontal rows, top to bottom:

```
HEADER:  STACK BOARD · {project name}

JOB 1 (active):
  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
  │  SETUP  │ ─► │  INPUT  │ ─► │ PROCESS │ ─► │ OUTPUT  │
  └─────────┘    └─────────┘    └─────────┘    └─────────┘

JOB 2 (prep space — faded, dashed):
  ┌╌╌╌╌╌╌╌╌╌┐    ┌╌╌╌╌╌╌╌╌╌┐    ┌╌╌╌╌╌╌╌╌╌┐    ┌╌╌╌╌╌╌╌╌╌┐
  │  ░░░░░  │ ╌► │  ░░░░░  │ ╌► │  ░░░░░  │ ╌► │  ░░░░░  │
  └╌╌╌╌╌╌╌╌╌┘    └╌╌╌╌╌╌╌╌╌┘    └╌╌╌╌╌╌╌╌╌┘    └╌╌╌╌╌╌╌╌╌┘
  // next job slots in here when Chad stages it
```

**Color tokens** (Critical Mapper hub palette per Cal Card rule):
- BG: `#0b0d12` (near-black)
- Active accent (JOB 1 boxes, header logo): `#f59e0b` (amber)
- Connector arrows: `#0ea5e9` (sky blue)
- Faded (JOB 2 prep): `#3a4150` (dim gray)
- Body text: `#e2e8f0` (off-white)

**Box anatomy:** title bar (uppercase step label) → body line (one-line description) → optional status dot.

**Arrow conventions:** solid amber/sky for active flow, dashed dim for pending/prep slots.

---

## Step 0 — template existence check (silent on every fire)

```bash
TEMPLATE="C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨      AUTOMATIONS     🪨🪨/skill-support-md/stack-board/stack-board-template.html"

if [ ! -f "$TEMPLATE" ]; then
    echo "template missing — re-seed at $TEMPLATE before continuing"
    exit 1
fi
```

Also ensure star folder exists (idempotent):
```bash
STAR="C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨 2026 Ultimate File Manager/-- Results folder master forever/Regular projects - 2/⭐ stack-board projects"
mkdir -p "$STAR"
```

---

## NEW project — clone mechanics

```bash
DATE=$(date +%Y-%m-%d)
NAME="<2-3 words from Chad>"
WRAPPER_BASE="${DATE} — ${NAME}"

# 1. Strip any existing crowns inside the bucket
cd "$STAR"
for d in !!\ *; do
    [ -d "$d" ] && mv "$d" "${d#!! }"
done

# 2. Conflict check — if today's name collides, append counter
counter=2
while [ -d "$STAR/${WRAPPER_BASE}" ] || [ -d "$STAR/!! ${WRAPPER_BASE}" ]; do
    WRAPPER_BASE="${DATE} — ${NAME}-${counter}"
    counter=$((counter+1))
done
WRAPPER="!! ${WRAPPER_BASE}"

# 3. Create wrapper + clone template
mkdir -p "$STAR/$WRAPPER"
cp "$TEMPLATE" "$STAR/$WRAPPER/index.html"

# 4. Open with cache buster
start "" "file:///$STAR/$WRAPPER/index.html?v=$(date +%s)"
```

---

## EXISTING project — pick + open

```bash
# List 5 most recent wrappers by mtime, newest first
cd "$STAR"
find . -maxdepth 1 -mindepth 1 -type d -printf '%T@ %f\n' \
    | sort -rn | head -n 5 | cut -d' ' -f2-
```

Show as numbered list to Chad. On pick:
```bash
PICK="<resolved folder name>"
start "" "file:///$STAR/$PICK/index.html?v=$(date +%s)"
```

No crown rotation when reopening — only on NEW.

Empty bucket → fall through to NEW (handled in `stack-board-qa-protocol.md`).

---

## End-project sub-folder (Phase 2 choice 3)

Created INSIDE the wrapper, sibling to `index.html`:

```bash
END="$STAR/$WRAPPER/end-project"
mkdir -p "$END"
```

The actual built product (HTML app, scripts, assets) lands inside `end-project\`. Keeps planning board and built result physically grouped.

---

## Refresh / overwrite rules

| Scenario | Action |
|---|---|
| Template exists, no changes requested | Leave alone — clone from it |
| Chad explicitly says "refresh template" | Open template in editor, let Chad edit, save |
| Template missing | Halt with error (Step 0). NEVER auto-regenerate |
| Existing wrapper name conflict | Append `-2`, `-3`, ... suffix (mechanics above) |
| Reopening existing project | NO crown rotation, NO file changes |

The template is **read-only by default** during project flows.

---

## Browser launch — file:// + cache buster

Use `file:///` URL — no local server needed. Static HTML, no fetch calls, no cross-origin needs.

```bash
start "" "file:///<full path>/index.html?v=$(date +%s)"
```

Cache buster is mandatory per Chad's `feedback_cache-buster.md` rule.

---

## Edge cases

- **Star folder doesn't exist:** auto-created on every fire (idempotent `mkdir -p`).
- **Template doesn't exist:** halt with clear error. Never auto-restore.
- **Name conflict (same date + words):** append counter suffix.
- **Existing branch but bucket is empty:** fall through to NEW (per qa-protocol).
- **End-project folder created twice:** idempotent — no conflict.
- **Path encoding:** `file:///` URLs handle spaces and emojis in modern browsers; if issues, URL-encode spaces as `%20`.

---

## Cross-references

- **skill.md** → calls into this MD for: Step 0 mechanics, NEW/EXISTING file ops, end-project folder creation
- **stack-board-qa-protocol.md** → Q1.2 ("looks right?") references the visual grammar above as the acceptance checklist
- **stack-board-end-project.md** → choice (b) writes INTO the JOB 2 prep zone defined here; choice (c) creates the `end-project\` sibling defined here
