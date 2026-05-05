---
name: movie-trailer-test
description: Cinematic trailer builder — plan, build, and assemble a 4-scene recap/how-it-works video with interactive guidance
---

# movie-trailer-test

Build a cinematic trailer (4 scenes) with an HTML production dashboard. You drive, I execute — scene by scene.

## Usage

```
/movie-trailer-test
```

## Instructions

IMPORTANT: Use the AskUserQuestion tool for ALL menu selections. Keep it clean, minimal ASCII headers, scannable.

### Step 1: Greet + Set Up

Print this header:
```
  ─── movie trailer ──────────────────
```

Then use **AskUserQuestion**:
- Question: "What's this trailer for? (client name or project)"
- Options:
  1. "Mark Antonick" — description: "Mark's how-it-works / recap trailer"
  2. "New Client" — description: "different client — I'll tell you"
  3. "Personal / Internal" — description: "not client-facing"

Store the answer as {PROJECT_NAME}.

### Step 1.5: Apply or Stack

After receiving the user's input from Step 1 (and after ANY user input throughout the skill), before moving to the next step, use **AskUserQuestion**:
- Question: "Want me to apply that update now, or keep stacking momentum?"
- Options:
  1. "Apply now" — description: "execute what we just discussed immediately"
  2. "Keep stacking" — description: "hold it — I've got more to add before you build"

**If Apply now:** Proceed to the next step with current info.
**If Keep stacking:** Wait for the user to give more input. Each time they add something, ask this same question again. Only proceed when they say "Apply now."

This checkpoint runs after EVERY user input — not just Step 1. It gates the transition between collecting input and executing work.

### Step 2: Build the HTML Production Dashboard

Create an HTML file with:
- A **landing page header** section at the top with {PROJECT_NAME} and today's date
- **4 scene tiles** in a row (left to right), each containing:
  - Scene number (Scene 1, Scene 2, Scene 3, Scene 4)
  - Visual placeholder area (empty box for screenshot/asset)
  - Description area (what this scene shows)
  - Status indicator (not started / in progress / done)
  - **3 AI tool buttons** stacked vertically below each tile — these indicate which AIs to use to bring that scene to life:
    - Button 1: "Visual AI" — default suggests best-fit tool for that scene (e.g. Midjourney, DALL-E, Runway)
    - Button 2: "Voice AI" — default suggests best-fit tool (e.g. ElevenLabs, Whisper)
    - Button 3: "Edit AI" — default suggests best-fit tool (e.g. CapCut, Runway, Pika)
  - Each button has a **default recommendation** pre-filled by Claude based on what best suits that specific scene's content. The user can accept the default or type in their own tool.
  - Buttons should be pill-shaped, dark-styled, and clearly labeled. Editable — click to change the tool name.
  - **Special button (4th button):** Below the 3 AI buttons, add a special ✦ button styled distinctly (accent color, slightly larger, standout). When clicked/selected:
    - Claude auto-fills ALL 3 buttons for that tile with the single best AI tool recommendation for each slot
    - Based on the scene description, content type, and what would produce the highest quality result
    - Adds a fancy footnote under the tile: a small italic line like `✦ powered by Claude's pick — [reason]` explaining why those tools were chosen
    - The footnote should be styled elegantly — lighter text, italic, small font, with the ✦ accent mark

Style it clean — dark background (#0f172a), card-style tiles with subtle border (#1e293b), minimal and modern. Use Inter or system sans-serif font. Save to: `C:\Users\chad\Desktop\trailer-dashboard.html`.

Print:
```
  ✓ dashboard created · trailer-dashboard.html
```

### Step 3: Interactive Build Loop

This is the core loop. After the dashboard is created, enter the interactive menu and keep looping until the user says they're done.

Use **AskUserQuestion** with these 4 options every cycle:

- Question: "What's next?"
- Options:
  1. "What do you need from me?" — description: "tell me what assets, info, or files you need right now"
  2. "Here's what to do next" — description: "I'll give you the next action to execute"
  3. "Set the hierarchy for this step" — description: "I'll tell you the priority/order of what we're working on"
  4. "Wrap up / Branch" — description: "finalize, repackage, or branch off a sub-skill"

#### Option 1: "What do you need from me?"
List what's currently missing or needed for the active scene(s). Check the dashboard state and report:
- Which scenes still need visuals
- Which scenes need copy/descriptions
- What assets are missing
Then ask: "Want to provide something now or move on?"

#### Option 2: "Here's what to do next"
Wait for the user's instruction. Execute it — could be:
- Update a scene tile on the dashboard
- Generate copy or a visual prompt
- Add content to a specific scene
- Anything else they direct
After executing, update the dashboard HTML and loop back.

#### Option 3: "Set the hierarchy for this step"
Wait for the user to define the priority order. Store it and follow that order for subsequent actions. Print the hierarchy back for confirmation.

#### Option 4: "Wrap up / Branch"
Opens a sub-menu. Use **AskUserQuestion**:
- Question: "What are we doing?"
- Options:
  1. "Branch off a sub-skill" — description: "spin off a new skill via /c3 — hierarchy of MDs"
  2. "Repackage the skill" — description: "bake what we learned into the SKILL.md"
  3. "Finalize + save" — description: "lock in the dashboard and wrap up"

**If Branch:** Trigger /c3-chad-skills-creo to spin off a child skill from the current workflow. Creates a "hierarchy of MDs" — this trailer skill links to sub-skills for specific parts. After branching, loop back to main menu.

**If Repackage:** Update the SKILL.md with any new patterns or steps discovered during the session. Show preview, confirm, save. Loop back to main menu.

**If Finalize:** Wrap up the session:
- Show current state of all 4 scenes
- Confirm dashboard is saved and up to date
- Print confirmation:
```
  ─── finalized ──────────────────────

  ✓ dashboard · saved
  ✓ scenes · [X/4 complete]
  ✓ skill · [updated / unchanged]

  ──────────────────────────────────────
```
This is the only option that exits the loop.

### Loop
After handling options 1-3 (or Branch/Repackage from option 4), loop back to the Step 3 menu. Only Finalize exits the loop.

## Important Notes

- The user drives — always wait for their direction before acting
- Update the HTML dashboard after every change so it's always current
- Keep the interactive menu cycling until finalize
- Scene tiles should visually show progress (color-coded status)
- This is a TEST skill — experimental workflow, expect iteration
