# Smoke Test Report — /ultimate-project-creator Python helpers
**Date:** 2026-04-23
**Run by:** sub-agent smoke test
**Sandbox:** `C:\Users\chad\smoke-upc-20260423\` (short path to avoid MAX_PATH; deleted after run)

---

## Per-script results

| # | Script | Status | Notes |
|---|--------|--------|-------|
| 1a | `scaffold-filg-filf.py` | **FAIL** | See Critical Bug #1 below. Cannot create `FILG: pre-set - no work` on Windows NTFS (colon is an illegal filename char). Folder has never been successfully scaffolded on disk — real stage-4 root is empty. |
| 1b | `pages-pullout.py` | **PASS (with minor bug)** | Copied the canonical `smoke-pullout.html` into `fake-ufm/jobs/smoke-pullout.html` correctly. Exit 1 on default Windows console due to cp1252 encoding of `✅` in the success `print`. Re-run with `PYTHONIOENCODING=utf-8` → exit 0. |
| 1c | `launch-preview.py` | **PASS** | `kill_previous_preview_servers()` scanned 3000-3020 cleanly. Server started on port 3000, `wait_for_server` returned True inside 5s budget, `urllib.request.urlopen('http://localhost:3000/')` returned **HTTP 200** with an `<!DOCTYPE HTML>` directory listing. Server killed cleanly in `finally`. Chrome launch suppressed. |
| 1d | `sync-check.py` | **PASS** | Read-only run against live data. Both `yesterday` + `board` sources parsed with no errors. Before fix: 51/0. After fix: 51/0 (no true duplicates exist in live data — see "Sync-check fix" section). |
| 1e | `state-reader.py` | **PASS** | Read-only run against live data. Valid JSON. `active_week = "week of 4/23"`, `active_job.slug = "character-ai-homemade"`, `next_important_step.label = "Write the stage-3 master MD (plan + paths)"`, all 3 dashboard jobs at stage 1 ("not started"). No errors. |

---

## Critical bug #1 — scaffold-filg-filf.py cannot create its subfolders

**Where:** lines 38-39 + 42-43 of `templates/scaffold-filg-filf.py`

```
STAGE4_SUB_PRESET = r"FILG: pre-set - no work"
STAGE5_SUB_PRESET = r"FILF: pre-set - no work"
```

**Problem:** Windows NTFS reserves `:` for alternate data streams. `os.makedirs` raises `NotADirectoryError: [WinError 267] The directory name is invalid` — confirmed both in the sandbox AND on the real UFM stage-4 path when probed with a throw-away folder.

**Evidence that this has never worked on disk:** the real `4. fill in the gaps  between 'step phrases'\` and `5. Fill in the fields ' last touches\` folders are **both empty** (verified via `os.listdir`) — no project has ever made it through stage 4/5 with these subfolder names.

**Not fixed in this pass** per the task scope ("Scripts in templates/ may be edited for the sync-check fix ONLY"). **Recommended fix for Chad:**
- Replace `:` with ` -` (dash) or with `·` (middot) or with ` – ` (en-dash). Example: `"FILG - pre-set - no work"`.
- Update `state-reader.py` constants `STAGE4_SUB_PRESET` / `STAGE5_SUB_PRESET` in parallel so state detection still matches.

---

## Minor bug — Windows cp1252 emoji print crash

**Where:** the `print(f"✅ pulled to {target_file}")` at line 86 of `pages-pullout.py` and the three `print(f"✅ scaffolded ...")` lines at 131-134 of `scaffold-filg-filf.py`.

**Problem:** On a default Windows console (cp1252 code page), `print("✅")` raises `UnicodeEncodeError` and the script exits with code 1 even though the work succeeded. `sync-check.py` and `state-reader.py` already do `sys.stdout.reconfigure(encoding="utf-8", errors="replace")` and do NOT have this problem.

**Not fixed in this pass.** Recommended fix:
- Add the same `sys.stdout.reconfigure(encoding="utf-8", errors="replace")` block at the top of `pages-pullout.py` and `scaffold-filg-filf.py`. Trivial 4-line patch.
- Alternatively drop the ✅ emoji and use plain ASCII in the success lines.

---

## Sync-check matching heuristic fix (Task 2)

**Before fix:** 51 net-new candidates, 0 skipped.
**After fix:** 51 net-new candidates, 0 skipped (same numbers — see diagnosis below).

**What was changed** (in `templates/sync-check.py`):
- Added `norm_slug(raw)` helper that lowercases → strips emoji/punctuation → collapses whitespace → replaces spaces with dashes → collapses dash runs. So `"Scout Troop App"`, `"scout troop app"`, `"SCOUT-TROOP-APP"`, `"scout_troop_app"`, and `"scout-troop-app"` all normalize to `"scout-troop-app"`.
- Rewrote `diff()` so **both** candidate and dashboard sides run through `norm_slug()` before the (a) slug and (b) name keys are compared. Date+slug key (d) also uses the normalized form. Within-pool dedupe now keys on `norm_slug(slug)` too.

**Why the live numbers didn't move:** inspected all 51 candidates side-by-side with the 3 dashboard jobs. Dashboard has `scout-troop-app`, `koi-tribute`, `character-ai-homemade`. Not a single candidate normalizes to any of those three — the closest was `koi-tribute-for-singer-with-it-factor` (a genuinely DIFFERENT job, not a duplicate). So "51 net-new" is the correct answer for the current data.

**Proof the fix works** (synthetic test, 6 candidates vs 3-job dashboard):
- `{"slug": "scout troop app", "name": "Scout Troop App"}` → **skipped** (exact_slug via norm) ✓
- `{"slug": "koi_tribute", "name": "Koi Tribute!"}` → **skipped** (exact_slug via norm, underscore + punct stripped) ✓
- `{"slug": "character-ai-homemade", "name": "Character AI Homemade"}` → **skipped** ✓
- `{"slug": "SCOUT-TROOP-APP", "name": "SCOUT TROOP APP"}` → **deduped** (within-pool, same norm as #1) ✓
- `{"slug": "scout-troop-app-new-needs-start"}` → **new** (genuinely different) ✓
- `{"slug": "koi-tribute-for-singer-with-it-factor"}` → **new** (genuinely different) ✓

The matcher is now immune to case/space/dash/underscore/emoji/punctuation variants. Slot 6's concern is retired.

---

## Follow-ups for Chad (manual)

1. **URGENT: fix scaffold colon bug** (Critical #1). Until this lands, `scaffold-filg-filf.py` cannot run to completion on any real project. Suggested rename: `FILG - pre-set - no work` / `FILF - pre-set - no work`. Update matching constants in `state-reader.py` too.
2. **Nice-to-have: UTF-8 stdout shim** for `pages-pullout.py` + `scaffold-filg-filf.py` so the ✅ print doesn't flip exit code to 1 on a default Windows terminal.
3. **Run scaffold-filg-filf.py manually after fix #1** to confirm end-to-end scaffolding works against the real UFM stage-4 root.

---

## Cleanup

Sandbox `C:\Users\chad\smoke-upc-20260423\` removed after tests. The abandoned long-path sandbox under `_smoke-test-20260423-151011\` (blocked by MAX_PATH, no tests ran in it) also removed.

Only this report remains under `_ultimate-project-creator\state\`.
