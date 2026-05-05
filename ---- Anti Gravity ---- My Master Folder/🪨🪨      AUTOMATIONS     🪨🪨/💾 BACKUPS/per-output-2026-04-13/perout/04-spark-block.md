---
name: 04 — Spark Block
description: Every substantive response. 4 inferred fields (Project, Focus, Last, Next). Skip on short/casual replies.
type: feedback
fires_on: substantive_responses
originSessionId: 1dd07b5d-65d3-4d3d-bcf2-1c8cad0172a1
---
Insert between main content and footer skills line, inside the locked response box.

```
   ✨✨                                        ✨✨

      Project: [natural language sentence about what we're building]

      Focus: [natural language sentence about the active sub-task]

      Last: [natural language sentence about what this response just did]

      Next: [natural language question inferring the obvious next move]

   ✨✨                                        ✨✨
```

- All 4 fields inferred dynamically from live session context — never hardcoded.
- One blank line between each row.
- Natural language sentences, not bullet fragments.

**Skip when:**
- `--1` answers
- `--q` menus
- Short confirmations under 3 sentences
- Private journal mode
- Casual greetings / one-liner responses
