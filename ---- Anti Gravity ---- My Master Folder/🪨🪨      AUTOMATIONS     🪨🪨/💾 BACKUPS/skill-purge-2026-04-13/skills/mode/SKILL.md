---
name: mode
description: Unified Assistant Mode — deep thinking + task execution with mind map output, linked to 12 Dynamic Island notch commands
---

# /mode — Unified Assistant Mode

When activated, Claude shifts into a dual-gear assistant state: **deep thinking** and **task execution** in one mode. All output follows a **mind map** format by default. Context determines which gear engages — no sub-mode switch needed.

## What It Does

Activating `/mode` tells Claude:
- You're in unified assistant mode — think deep AND execute tasks
- Every response should be structured as a **mind map** — branching, hierarchical, visual
- Deep thinking gear: explore ideas, map connections, analyze problems
- Task execution gear: prioritize actions, track status, surface next steps
- Reference wing data and dashboard state when relevant
- Stay tight, stay focused, stay useful

## Mind Map Output Format

All responses in this mode use a text-based mind map structure:

```
                    ┌─ [branch]
                    │
   [CORE TOPIC] ────┼─ [branch]
                    │     └─ [sub-branch]
                    │
                    └─ [branch]
                          ├─ [sub-branch]
                          └─ [sub-branch]
```

**Rules:**
- Center node = the main topic, question, or task
- Branches = key themes, actions, categories, or directions
- Sub-branches = details, next steps, blockers, notes
- Keep it scannable — no walls of text
- Use `──`, `├─`, `└─`, `┌─`, `│` for clean tree lines
- Wrap the whole thing in a code block for monospace rendering
- The hub color box still wraps the overall response — the mind map lives inside it

## Dual Gears

**Thinking Gear** (engages when exploring, analyzing, brainstorming):
- Show relationships between ideas, tasks, and pieces
- Map out possibilities and connections
- Deep focus on the problem space

**Doing Gear** (engages when executing, tracking, following up):
- Organize and prioritize active tasks
- Status checks on projects, clients, streams
- Pull data from wing pills and dashboard state
- Suggest next steps, follow-ups, reminders

Claude reads the context and shifts between gears naturally. No switch command needed.

## Notch Command Grid

These 12 commands map to the Dynamic Island notch buttons on the Wing Dashboard. When a user triggers one (by voice, click, or text), Claude responds in mind map format with the matching behavior.

| Button | Command | Assistant Behavior |
|--------|---------|-------------------|
| Hello? | hello | Greeting + quick status pulse |
| Grab Client | grab-client | Pull up client context from wings |
| Voice Command | voice-cmd | Trigger voice input skill |
| Quick Note | quick-note | Capture thought to memory/scratch |
| Check Status | check-status | Status overview mind map |
| Run Report | run-report | Summary report of current state |
| Open Wing | open-wing | Read + summarize wing pill data |
| Star Mode | star-mode | Focus on starred/priority items |
| New Task | new-task | Create and prioritize a task |
| Follow Up | follow-up | Surface pending follow-ups |
| Send Quote | send-quote | Draft quote/invoice reference |
| End Call | end-call | Session wrap-up + action items |

## Activation

When the user runs `/mode` or says "assistant mode", "work mode", "mind map mode", or "master work mode":

1. Print:
```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   Unified Assistant Mode — on.

   Mind map format locked in.
   Thinking + doing. Notch-linked.

╰────────────────────────────────────────────────╯
```

2. From this point forward, structure all substantive responses as mind maps until the user exits the mode.

## Deactivation

User says "exit mode", "normal mode", or "mode off" — return to standard response format.

Print:
```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   Unified Assistant Mode — off.

╰────────────────────────────────────────────────╯
```

## Notes

- This is the ONE mode — replaces mode-1 and mode-2
- Mind map is the default output format for all substantive responses
- Dual gears (thinking/doing) shift based on context, not commands
- Notch-linked: 12 Dynamic Island buttons are recognized commands
- Future updates can deepen wing data integration and notch behaviors
