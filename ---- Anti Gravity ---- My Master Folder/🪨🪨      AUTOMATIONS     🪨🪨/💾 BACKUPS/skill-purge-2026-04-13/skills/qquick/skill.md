# qquick

Super-quick step painter — breaks any idea into clean, practical steps with tools called out inline.

## Instructions

Take whatever Chad described (or the argument he passes) and IMMEDIATELY paint out numbered steps.

### Format

Use this layout inside the Hub Color Stack box:

```
STEP 1 — One clear action sentence. **Tool:** [name]
   • BEST — [1-sentence description of the optimal route and why it wins]
   • SAFE — [1-sentence description of the cautious route and what risk it avoids]
   • FAST — [1-sentence description of the quickest route and what it trades away]

STEP 2 — One clear action sentence. **Tool:** [name]
   • BEST — [1-sentence description]
   • SAFE — [1-sentence description]
   • FAST — [1-sentence description]

STEP 3 — One clear action sentence.
   • BEST — [1-sentence description]
   • SAFE — [1-sentence description]
   • FAST — [1-sentence description]
   a. sub-step only if truly needed

STEP 4 — One clear action sentence. **Tool:** [name]
   • BEST — [1-sentence description]
   • SAFE — [1-sentence description]
   • FAST — [1-sentence description]
```

### Route Rules

- Every step MUST include all 3 routes — no exceptions, no flag needed
- Routes appear directly under the step line, indented 3 spaces
- Each route is exactly 1 sentence — enough detail to understand the trade-off
- • BEST = optimal balance of quality, speed, and reliability — the recommended play
- • SAFE = most cautious approach — prioritizes stability, rollback-ability, or avoiding breakage
- • FAST = quickest path to done — may skip validation, use shortcuts, or take on tech debt
- Research each route before writing it — routes must be real, actionable approaches, not filler
- If all 3 routes would be identical for a trivial step, still list them but note they converge

### Rules

- No preamble — go straight to the steps
- One sentence per step, that's it
- Double-space between every step (blank line separating each)
- Sub-steps are OPTIONAL — only include when a step genuinely needs breakdown
- Sub-steps go AFTER the 3 routes
- **MUST highlight** all tools, handlers, APIs, libraries, and key technical parts using ANSI terminal formatting — use `\033[1;36m` (bold cyan) for tool/handler names so they pop in the terminal
- If a step has no special tool, skip the Tool tag
- End with a single "Ready?" line — no summary paragraph
- Wrap everything in the Hub Color Stack box as always
