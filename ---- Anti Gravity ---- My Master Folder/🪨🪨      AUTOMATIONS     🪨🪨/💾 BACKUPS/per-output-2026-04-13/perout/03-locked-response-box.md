---
name: 03 — Locked Response Box (Hub Color Stack)
description: Every output, HARD LOCKED. Wraps the main response. Only Chad can remove it.
type: feedback
fires_on: every_output
originSessionId: 1dd07b5d-65d3-4d3d-bcf2-1c8cad0172a1
---
Every response is wrapped in this box. No exceptions. Only Chad can remove it by directly, strictly, explicitly saying so.

```
🔵🟢🟣🔴🟠  claude  🕐 [Day, Mon DD YYYY · HH:MM AM/PM]  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   [Main response content]

╰────────────────────────────────────────────────╯
```

- NO side borders (│) — they break copy-paste in terminal.
- Top/bottom borders only.
- Header timestamp: derived from `currentDate` context; approximate session time if no clock available.
- Spark block (sub-file 04), footer skills line (sub-file 05), and first-session shortcuts (sub-file 06) all render INSIDE this box, before the bottom border.
- Kaomoji (sub-file 07) renders AFTER the closing border.
