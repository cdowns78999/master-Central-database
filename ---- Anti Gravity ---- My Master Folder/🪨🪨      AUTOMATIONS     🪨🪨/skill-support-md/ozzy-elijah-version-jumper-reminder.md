# /ozzy · ELIJAH route — Version Jumper Reminder (mandatory render)

Whenever the /ozzy skill routes to the **Elijah branch** — fresh fire, mid-stacker, post-blast, debug pass, ANY output on the Elijah branch — the FIRST thing rendered is the BIG `!!!` ASCII reminder block below, VERBATIM. No paraphrase. No skip.

The reminder exists to keep the **color dot + v1/v2/v3/v4 ladder rule** at the top of the workspace at all times so we never drift back into ad-hoc per-page version buttons.

---

## RENDER VERBATIM AT THE TOP OF EVERY ELIJAH-ROUTE OUTPUT

```
╭─ !!! ─── ELIJAH ROUTE · VERSION JUMPER REMINDER ─── !!! ────────────────╮
│                                                                         │
│      ██╗   ██╗   ██╗                                                    │
│      ██║   ██║   ██║                                                    │
│      ██║   ██║   ██║                                                    │
│      ╚═╝   ╚═╝   ╚═╝                                                    │
│      ██╗   ██╗   ██╗                                                    │
│      ╚═╝   ╚═╝   ╚═╝                                                    │
│                                                                         │
│   ─── COLOR DOT LADDER (yellow → red) ──────────────────────────────    │
│                                                                         │
│      v1  →  🟡  yellow  (#facc15)    "fresh draft"                      │
│      v2  →  🟠  amber   (#f59e0b)    "iterating"                        │
│      v3  →  🟧  orange  (#f97316)    "near final"                       │
│      v4  →  🔴  red     (#ef4444)    "LATEST" — pulses, no link         │
│                                                                         │
│   ─── BANNER RULE ──────────────────────────────────────────────────    │
│                                                                         │
│      • every step page renders a fixed top-center shadowy banner        │
│      • one colored dot lives in the band — color = current version      │
│      • clicking the band/dot navigates to the NEXT version              │
│        (v1→v2, v2→v3, v3→v4)                                            │
│      • v4 = terminal — dot pulses red, no click target                  │
│                                                                         │
│   ─── SHARED COMPONENT (single source of truth) ────────────────────    │
│                                                                         │
│      📄  elijah/_version-jumper.css                                     │
│      📄  elijah/_version-jumper.js                                      │
│      auto-builds the banner from filename pattern                       │
│      step-N.html  (= v1)   ·   step-N-vM.html   (M = 2,3,4)             │
│                                                                         │
│   ─── SCOPE ────────────────────────────────────────────────────────    │
│                                                                         │
│      40 pages total — 10 steps × 4 versions                             │
│      every step page MUST link the css + script before </head>          │
│      legacy .v2-pill / .v3-pill markup is RETIRED — never re-add        │
│                                                                         │
╰─────────────────────────────────────────────────────────────────────────╯
```

---

## WHEN TO RENDER

Render this block at the **top** of any output where /ozzy is on the Elijah branch:
- bare `/ozzy elijah`
- any continuation turn while Elijah is the active route (stacker, debug, blast, re-preview)
- any reply that touches files inside `elijah\` regardless of how the turn started

## WHEN NOT TO RENDER

- Sharon route (different branch, different rules)
- New / Resume / Blast on a non-Elijah folder
- General /ozzy menu render (Phase 1) before route is chosen

## NEVER

- Paraphrase the ASCII or rule text
- Drop the ladder colors or hex codes
- Move it below other content — it leads the output
- Re-introduce `.v2-pill` / `.v3-pill` per-page buttons; the unified banner is canonical
