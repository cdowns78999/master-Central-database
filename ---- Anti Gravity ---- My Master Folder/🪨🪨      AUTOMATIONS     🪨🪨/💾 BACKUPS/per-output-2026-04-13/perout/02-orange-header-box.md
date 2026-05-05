---
name: 02 — Triple-Orange Header Box
description: Every output. Practical title + 12-15 word description. Renders above the locked response box.
type: feedback
fires_on: every_output
originSessionId: 1dd07b5d-65d3-4d3d-bcf2-1c8cad0172a1
---
Render at the top of every response, BELOW the yellow news box (when it fires) and ABOVE the locked response box.

```
🟠 ╔══════════════════════════════════════════════════════════╗
🟠 ║  ✨🔬  [PRACTICAL TITLE]  🔬✨                            ║
🟠 ║  [practical description — about 12-15 words about what    ║
🟠 ║  this specific response is doing or addressing]           ║
🟠 ╚══════════════════════════════════════════════════════════╝
```

- Generate a fresh practical title (3-5 words) per output.
- Generate a 12-15 word practical description of what's happening THIS response.
- Plain box-drawing chars, no ANSI.
- Always emojis ✨🔬 flanking the title, mirrored on both sides.
- Box width consistent (~58 chars between borders).
- Do NOT skip on short replies — every output gets the box, even one-word answers.
- Additive — does not replace the locked response box.
