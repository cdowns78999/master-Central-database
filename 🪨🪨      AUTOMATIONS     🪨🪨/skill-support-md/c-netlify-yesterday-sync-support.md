---
filename: c-netlify-yesterday-sync-support.md
purpose: Dump-pipe cache for /c-netlify-yesterday-sync. Stores prior sync pairs so repeat runs skip heavy matching.
parent_skill: /c-netlify-yesterday-sync
location: C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\🪨🪨      AUTOMATIONS     🪨🪨\skill-support-md\c-netlify-yesterday-sync-support.md
last_updated: (auto — write ISO8601 to NOTES LOG on every fire)
---

# CACHED PAIRS

cached_timestamp: (empty — populated on first successful run)
total_pairs: 0

## PAIRS
<!-- Format: one line per pair, newest first. Cap: 100 (rolling).
- `<chat-uuid8>` ↔ 🌐 `<sitename>` · score `<N>` · linked `<YYYY-MM-DD>`
-->

---

# NOTES LOG

<!-- Rolling log of sync runs. Format:
[ISO] fired · pairs_new: N · pairs_cached: M · ~Xk tokens · mode: <cached|full>
-->

---

# HOW THE SKILL USES ME

Dump-pipe cache layer. On every fire of `/c-netlify-yesterday-sync` the skill reads my `## CACHED PAIRS` block first. If `cached_timestamp` is <72h old and the block is well-formed, the skill renders cached pairs verbatim and only looks for NEW chat UUIDs / NEW deploy sites that weren't previously synced — keeping token cost near zero on repeat runs.

First run does the full match + write work. Subsequent runs are deltas-only.

Same-pattern behavior as `c-yesterday-support.md` (CACHED VIEWS) and `c-netlify-database-support.md` (cached deploy list) — read-first, write last.
