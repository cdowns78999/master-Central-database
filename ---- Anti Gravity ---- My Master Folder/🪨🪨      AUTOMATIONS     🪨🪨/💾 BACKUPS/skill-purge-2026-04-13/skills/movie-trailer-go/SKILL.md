---
name: movie-trailer-go
description: Rapid-fire production runner — walks you through each step like a checklist. Go here, do this, grab that, next.
---

# movie-trailer-go

Rapid-fire trailer production. No paragraphs — just quick commands walking you through each action. Go to this site, click this, grab that, upload here, next.

## Usage

```
/movie-trailer-go
```

## Instructions

IMPORTANT: Use the AskUserQuestion tool for ALL menu selections. Keep everything SHORT. No explanations unless asked.

### On Launch

1. Read `C:\Users\chad\Desktop\trailer-dashboard.html` for current state
2. Read `C:\Users\chad\Desktop\trailer-iterations.md` if it exists

Print:
```
  ─── trailer go ─────────────────────
```

Then immediately ask which scene to work on:

- Question: "Which scene?"
- Options based on what's not done yet (up to 4)

### Rapid-Fire Mode

Once a scene is picked, **walk the user through it one action at a time.** Each action is ONE thing to do, formatted exactly like this:

```
  → Open [tool/site]
  → [do this specific thing]
  → [grab/save/export this]
  ✓ Done — [what you now have]
```

Rules for rapid-fire:
- **One action per line.** Not "open Veo and prompt a starfield" — that's two things. Split it: "Open Veo" then "Prompt: 5s cinematic starfield, logo fade-in center"
- **Name the exact thing.** Not "record voiceover" — say "Open Nano → hit record → say: [the actual line]"
- **Include the prompt/copy when relevant.** If they need to type something into Veo or Nano, give them the exact text
- **Say where files go.** "Save to Desktop" or "Download the MP4" — be specific
- **After each action, use AskUserQuestion:**
  - Question: "Done?"
  - Options:
    1. "Next" — move to the next action
    2. "Redo" — something went wrong, give me that step again
    3. "Skip" — I'll handle this one later
    4. "Stop" — wrap up for now

### The 6-Step Rapid-Fire Sequence

These are the production steps. When a scene is selected, fire through its relevant steps:

**Step 1 — Scene 1: Starfield + Logo**
```
  → Open Veo (Google AI video)
  → Prompt: "5 second cinematic starfield, slow camera pan upward, [logo name] fades in center, dark background, clean"
  → Wait for generation → Download MP4
  → Open Nano (Google AI voice)
  → Hit record → Say: "[intro line — ask user what to say if not known]"
  → Download the audio file
  → Open Pika
  → Import the Veo MP4
  → Import the Nano audio
  → Drag audio onto timeline, sync to logo reveal
  → Set last frame to freeze (for match-moment)
  → Export → MP4, 1080p → Save to Desktop as scene1.mp4
```

**Step 2 — Build HTML**
```
  → Tell Claude Code: "Build the screenshare HTML page using cal-card as base, plus an outro card page"
  → Review both pages in browser
  → Terminal: cp both files as backups
```

**Step 3 — Scene 2: Screen Record**
```
  → Open the screenshare HTML in Chrome (full screen)
  → Click Loom extension → Screen + Mic → Start recording
  → Walk through the page naturally (talk as you scroll)
  → Stop Loom recording → Download MP4
  → Open Pika → Import the Loom MP4
  → Trim start/end dead air
  → Add transition at start
  → Export → Save to Desktop as scene2.mp4
```

**Step 4 — Scene 3: TBD Content** (ask user what this scene is first)
```
  → Open Veo
  → Prompt: "[based on what user says]"
  → Download MP4
  → Open Nano → Record VO for this scene
  → Download audio
  → Pika → Import both → Sync → Export as scene3.mp4
```

**Step 5 — Scene 4: Outro Card**
```
  → Open the outro HTML in Chrome
  → Click GoFullPage extension → Capture full page
  → Download the screenshot PNG
  → Open Pika → Import the PNG
  → Add 2s fade-in animation
  → Export → Save as scene4.mp4
```

**Step 6 — Final Assembly**
```
  → Open Pika
  → Import: scene1.mp4, scene2.mp4, scene3.mp4, scene4.mp4
  → Drag onto timeline in order
  → Add transitions between each scene
  → Export → MP4, 1080p, 30fps → Save as trailer-final.mp4
  → Backup copy to OneDrive
```

### After Each Scene Completes

- Update `trailer-dashboard.html` — change that scene's status
- Log to `trailer-iterations.md`
- Ask: "Next scene or done?"

### Key Rules

- **Rapid-fire only.** No long explanations. Arrow → action → next.
- **One thing at a time.** Never combine two actions into one line.
- **Give exact prompts/text** when the user needs to type or say something
- **Always say where to save** files
- **Wait for "Next"** before moving on — don't dump the whole sequence at once
- **If something fails**, give the redo step immediately — don't explain why it failed
- Lightest tool wins. Chrome ext before Make.com. Always.
