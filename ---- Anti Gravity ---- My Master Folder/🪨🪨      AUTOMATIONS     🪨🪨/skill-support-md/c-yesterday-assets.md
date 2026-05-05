---
filename: c-yesterday-assets.md
purpose: Pre-rendered assets for /c-yesterday so the skill copy-pastes instead of regenerating on every fire
parent skill: c-yesterday
---

# /c-yesterday — Pre-Made Assets

Five drop-in assets. Each is sealed in a code block so the skill can emit it verbatim. Placeholders wrapped in `{CURLY}` are string-substituted at fire time.

---

## Asset 1 — HEY Banner Constant

```
╭─ 🟠 ────────────────────────── 🟠 ─╮
│                                    │
│   ██╗  ██╗ ███████╗ ██╗   ██╗      │
│   ██║  ██║ ██╔════╝ ╚██╗ ██╔╝      │
│   ███████║ █████╗    ╚████╔╝       │
│   ██╔══██║ ██╔══╝     ╚██╔╝        │
│   ██║  ██║ ███████╗    ██║         │
│   ╚═╝  ╚═╝ ╚══════╝    ╚═╝         │
│                                    │
╰──────────────── /c-yesterday • claude ╯
```

How the skill uses this: emitted verbatim at the very top of the response as the fixed opener — no regeneration, no variation.

---

## Asset 2 — Seven Category Header Boxes

```
╭─ 🟢 WORK PROGRESS ─────────────────╮
╰────────────────────────────────────╯

╭─ 🔴 WORK DEBT & PAY BACK ──────────╮
╰────────────────────────────────────╯

╭─ 🟡 PERSONAL & FAMILY ─────────────╮
╰────────────────────────────────────╯

╭─ 🟣 FINANCE ───────────────────────╮
╰────────────────────────────────────╯

╭─ 🔵 VIETNAM ───────────────────────╮
╰────────────────────────────────────╯

╭─ ⚫ TECH COMPANY PARTNERSHIPS ─────╮
╰────────────────────────────────────╯

╭─ 🟠 WORK DREAMS ───────────────────╮
╰────────────────────────────────────╯
```

How the skill uses this: pick the matching header for each job category and stack rendered recap items directly beneath it. Identical width (36 inner chars) keeps the stack aligned.

---

## Asset 3 — Protocol Status Line Templates

```
🟢 Protocol 1 — mirroring board jobs.............. ok ({N} jobs synced)
🔵 Protocol 2 — catching new jobs................. ok ({N} new)
🟣 Protocol 3 — updating notes.................... ok
🟡 seed note absorbed — weighting stack toward: {PHRASE}

⚠ Protocol 1 — {REASON}
⚠ Protocol 2 — {REASON}
⚠ Protocol 3 — {REASON}
⚠ seed note — {REASON}
```

How the skill uses this: after the support-file sync step, substitute `{N}`, `{PHRASE}`, or `{REASON}` into the matching line. Dots keep columns aligned; error variants share the ⚠ prefix so visual scan is instant.

---

## Asset 4 — GO/STOP/SKIP/DETAIL Toast Prompt

```
╭─ 📣 next up ───────────────────────────────╮
│                                            │
│   reviewing → {NEXT_DAY}                   │
│   convos    → {N_CONVOS}                   │
│   tokens    → ~{TOKEN_EST}                 │
│                                            │
│   🟢 GO       — continue to next day       │
│   🔴 STOP     — finish here                │
│   🟡 SKIP     — skip this day              │
│   🔵 DETAIL   — expand cards for this day  │
│                                            │
╰────────────────────────────────────────────╯
```

How the skill uses this: emitted after each day's stack to wait on Chad's single-key reply. `{NEXT_DAY}`, `{N_CONVOS}`, `{TOKEN_EST}` are substituted right before print.

---

## Asset 5 — Empty-State Stub + Write-Back Footer

```
╭─ 🌱 clean slate ───────────────────────────╮
│   Nothing in the last 3 days — clean       │
│   slate, let's GO!                         │
╰────────────────────────────────────────────╯
```

```
╭─ support file updated • {TIMESTAMP} • seed: {SEED_OR_NONE} ─╮
```

How the skill uses this: the empty-state stub replaces the whole stack when the 3-day window has zero recap items. The write-back footer prints once at the very end after the support file is saved; `{SEED_OR_NONE}` is either the seed phrase or the literal word `none`.

---

_End of pre-made assets. Edit in place — the skill references these by section number._
