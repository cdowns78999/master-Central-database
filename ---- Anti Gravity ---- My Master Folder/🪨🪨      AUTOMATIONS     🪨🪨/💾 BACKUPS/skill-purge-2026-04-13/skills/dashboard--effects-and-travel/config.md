# Effects & Travel — Config

## Paths

- **Rules Data**: `C:\Users\chad\.claude\skills\dashboard--effects-and-travel\data\rules.json`
- **Client Data**: `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json`
- **Board State**: `C:\Users\chad\.claude\skills\dashboard\data\board.json`
- **Theme Data**: `C:\Users\chad\.claude\skills\dashboard--css\data\theme.json`

## Default Transition Settings

| Property | Value | Description |
|----------|-------|-------------|
| Movement | slide + fade | How tiles move between columns |
| Duration | 0.3s | Transition speed |
| Easing | ease | CSS easing function |
| Urgent Pulse | 1.5s | Glow pulse for urgent tiles |
| Arrival Effect | scale-in bounce | When tile lands in new column |
| Arrival Duration | 0.2s | Arrival animation speed |

## Stage Definitions

| Stage | Column | Meaning | Color Token |
|-------|--------|---------|-------------|
| LEFT | First | Urgent / New | --urgent (#ef4444) |
| CENTER | Middle | Solving / Active | --solving (#0ea5e9) |
| RIGHT | Last | Happy / Completed | --happy (#10b981) |

## Movement Rules

- Manual moves: user picks client + destination → immediate
- Auto-rules: defined in rules.json → evaluated on board load
- Every move updates BOTH clients.json AND board.json
- History logged on every stage change

## Animation Timing

- **Fast**: 0.15s (micro-interactions)
- **Normal**: 0.3s (standard transitions)
- **Slow**: 0.5s (emphasis transitions)
- **Pulse**: 1.5s infinite (urgent glow)
