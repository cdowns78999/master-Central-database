# Dashboard Demo

Launch the Pipeline Runner — an interactive visual demo of the Ultimate Dashboard pipeline.

## Trigger
- User says `/dashboard-demo`

## Behavior

Ask the user how they want to experience the demo:

### Option 1: Browser Launch (Recommended)
Open `pipeline-runner.html` in the default browser:
```bash
start "" "C:/Users/chad/.claude/skills/dashboard/pipeline-runner.html"
```

Then describe what they'll see:
- Dark glassmorphic UI with 3-column pipeline board (LEFT → CENTER → RIGHT)
- Type a client name and hit Enter to spawn a tile
- Use "Go to Link", "Wind Up", and "Advance" buttons to interact
- Hit "Auto" for a full automated demo simulation
- System log at the bottom narrates every action in real time
- Confetti fires when a tile reaches the RIGHT (happy) column

### Option 2: Terminal Walkthrough
Run an interactive guided walkthrough using AskUserQuestion:

1. Ask for a client name
2. Show the tile appearing in LEFT with system log narration in the response box
3. Offer action choices: "Go to Link", "Wind Up", "Advance →"
4. If Wind Up: show the form fields auto-filling (Client, Amount, Due, Notes)
5. If Advance: narrate the tile moving to CENTER, then offer actions again
6. When tile reaches RIGHT: celebrate with ASCII confetti and completion message
7. Ask if they want to run another client through

### Terminal Walkthrough System Log Style
Use this format in responses to simulate the system log:
```
[COMMS]      12:04:01  Incoming client received: "Client Name"
[CLIENT-DB]  12:04:01  Record created — stage: LEFT
[CSS]        12:04:02  Tile rendered with urgent styling
[EFFECTS]    12:04:02  Watching for movement triggers...
```

### Response Format
Always wrap responses in the Hub Color Stack box format per MEMORY.md.
