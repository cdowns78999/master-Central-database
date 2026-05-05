# move-between-stages.py

Implements Chad's corrected copy-and-move protocol for
`/ultimate-project-creator`. Replaces the old (broken, colon-in-folder-name)
`scaffold-filg-filf.py`.

## Purpose

The working HTML travels forward through the UFM pipeline in order
`3 → 4 → 5 → 6`. At every stage transition:

**DEPART (leaving a stage)**
- COPY current `{slug}.html` → `stage-N-done-snapshot.html` (frozen record of
  what the stage produced)
- MOVE `{slug}.html` forward into the next stage folder

**ARRIVE (entering a stage)**
- Incoming working HTML lands as `{slug}.html` in the new stage's slug folder
- Immediately COPY it → `snapshot-on-arrival.html` (pristine record of what
  arrived)

Once the project has moved on, each stage folder keeps BOTH snapshots forever
(`snapshot-on-arrival.html` + `stage-N-done-snapshot.html`), so the full
history of what passed through is preserved on disk.

Stage 3 is a special case — stage 3 is MD-only on disk, so there is no
stage-3 working HTML to move or snapshot. On the `3 → 4` transition the
script requires `--source` (path to the upstream working HTML from the
`Ultimate Project Creator - 1` wrapper) and `copy2`s it into stage 4
instead of moving (don't remove upstream source).

## Arguments

| Flag | Required | Notes |
|------|----------|-------|
| `--slug <slug>` | yes | Project slug (folder name at each stage) |
| `--from-stage {3\|4\|5}` | yes | Stage being left |
| `--to-stage {4\|5\|6}` | yes | Stage being entered. Must equal `from-stage + 1` |
| `--source <path>` | only when `--from-stage 3` | Absolute path to source HTML; rejected as error if missing for T-1 |

## Transitions

### T-1: stage 3 → stage 4

```bash
python move-between-stages.py \
  --slug my-new-project \
  --from-stage 3 \
  --to-stage 4 \
  --source "C:\path\to\my-new-project.html"
```

Stage 3 has no working HTML on disk, so `--source` is required. The source
file is COPIED into stage 4 (never moved) so upstream files stay intact.
No `stage-3-done-snapshot.html` is written (stage 3 is MD-only).

After T-1, stage 4 slug folder contains:
- `my-new-project.html` (working)
- `snapshot-on-arrival.html` (pristine record)

### T-2: stage 4 → stage 5

```bash
python move-between-stages.py \
  --slug my-new-project \
  --from-stage 4 \
  --to-stage 5
```

DEPART: copies stage 4 `{slug}.html` → `stage-4-done-snapshot.html`, then
MOVES `{slug}.html` into stage 5. ARRIVE: copies the new working file →
`snapshot-on-arrival.html` inside stage 5.

After T-2:
- Stage 4 slug folder keeps `snapshot-on-arrival.html` +
  `stage-4-done-snapshot.html` (working HTML gone — moved forward)
- Stage 5 slug folder has `my-new-project.html` (working) +
  `snapshot-on-arrival.html`

### T-3: stage 5 → stage 6

```bash
python move-between-stages.py \
  --slug my-new-project \
  --from-stage 5 \
  --to-stage 6
```

Same shape as T-2: leaves `stage-5-done-snapshot.html` behind in stage 5,
moves working HTML into stage 6, records `snapshot-on-arrival.html` there.

## Stage folder name constants (preserved EXACTLY)

```python
STAGE_FOLDERS = {
    3: r"3.  MIDDLE - master 'project job' holder",        # MD-only stage
    4: r"4. fill in the gaps  between 'step phrases'",     # two spaces: gaps  between
    5: r"5. Fill in the fields ' last touches",             # apostrophe + space
    6: r"6. [Final results in 'final result folder",        # intentional [ — no closing bracket
}
```

All quirks (two-space, apostrophes, open bracket without closer) are
intentional on disk. Python raw strings preserve them. Do not "correct."

## Idempotency

- If `snapshot-on-arrival.html` or `stage-N-done-snapshot.html` already
  exists and is **byte-identical** to what would be written → no-op (warn),
  exit `0`.
- If either snapshot exists with **different** content → exit `2` (refuse to
  overwrite silently).
- Parent slug folders are created with `exist_ok=True`.

## Exit codes

| Code | Meaning |
|------|---------|
| `0`  | Success, or idempotent no-op on identical content |
| `1`  | Argument or source error (missing `--source` on T-1, missing upstream working HTML, invalid stage pairing, source not a file) |
| `2`  | Would-overwrite conflict — a snapshot or working file exists with different content |
| `3`  | Unreachable / unexpected state (e.g. file-compare OSError) |

## UFM root constant

```python
UFM_ROOT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager"
```

Python 3 handles the emoji (`🪨`) natively in Windows paths.

## UTF-8 stdout shim

All success/error prints use `✅` and `→`. The script reconfigures
`sys.stdout` / `sys.stderr` to UTF-8 on startup so Windows cp1252 consoles
don't crash when printing the check mark.

## pages-pullout.py

Mirrors the canonical project HTML into the UFM `jobs/` folder so the big
dashboard can render it. The canonical copy lives under `-- Results folder
master forever\Ultimate Project Creator - 1\!! {today} — {slug}\{slug}.html`
and is the source of truth — `jobs/{slug}.html` is always overwritten on
every run. If the `!! ` crown got stripped mid-session the script falls back
to a crown-optional glob (`*— {slug}`) and picks the most recent match by
mtime.

**Stage 6 secondary fallback (new):** if neither the crowned nor
crown-optional canonical folder is found, the script now ALSO checks the
Stage 6 mirror at `6. [Final results in 'final result folder\{slug}\{slug}.html`
and uses it as a last-resort source before failing. The primary path is
unchanged and still preferred.

Example:

```bash
python pages-pullout.py --slug my-new-project
```

Exit codes: `0` success · `1` canonical source folder/file missing (neither
primary nor Stage 6 fallback) · `2` bad arguments (empty `--slug`).

## stage6-mirror.py

Mirrors a finished project HTML into Stage 6 of the UFM pipeline — the
"final results" browsing location that sits between Stage 5 (FILF completion)
and the canonical save in `Ultimate Project Creator - 1\`. Stage 6 does NOT
replace the canonical save; it's a mirror for quick final-result browsing.

Folder pattern (no FILG/FILF split — Stage 6 is just the final mirror):

```
{UFM_ROOT}\6. [Final results in 'final result folder\{slug}\{slug}.html
```

The folder name `6. [Final results in 'final result folder` is preserved
EXACTLY — the open `[`, the open-quote, and the missing closing bracket are
intentional on disk. Encoded as a Python raw string constant; do not "fix"
it.

### Example usage

```bash
python stage6-mirror.py \
  --slug my-new-project \
  --source "C:\path\to\finished\my-new-project.html"
```

### Exit codes

| Code | Meaning |
|------|---------|
| `0`  | Success — HTML mirrored to Stage 6 (or already present with identical content) |
| `1`  | Source HTML missing / invalid, or empty `--slug` |
| `2`  | Target already exists with DIFFERENT content (warn, refuse to overwrite) |

### Safety behavior

- `os.makedirs(..., exist_ok=True)` for both the Stage 6 root and the
  `{slug}/` parent — idempotent scaffolding.
- Never overwrites an existing mirror with different content — prints a
  warning with both paths and exits `2`.
- If the existing mirror is byte-identical to the source, no-ops and exits
  `0`.
- Uses `shutil.copy2` so mtimes are preserved on copy.
- Prints absolute paths in all success/warning output.

## launch-preview.py

Spins up a clean local preview of the UFM dashboard. Kills any lingering
`python -m http.server` processes on ports 3000–3020 (found via `netstat
-ano` filtered to `LISTENING`, killed with `taskkill /PID /F`), picks the
first free port in that range, launches `python -m http.server {port}
--directory "{UFM_ROOT}"` as a detached Windows subprocess
(`DETACHED_PROCESS | CREATE_NEW_PROCESS_GROUP`) so it outlives this script,
then opens Chrome to `http://localhost:{port}/the%20big%20dashboard.html?v={unix-ts}`
(the misspelled filename is intentional — matches the real file).

Example:

```bash
python launch-preview.py
```

Exit codes: `0` success · `1` no free port in 3000–3020 · `2` http.server
failed to start or never accepted connections.

## sync-check.py

Phase `-1` LOAD UP helper for `/ultimate-project-creator`. Builds a candidate
pool of jobs from (a) the c-yesterday CACHED QAL support md (path discovered
via `bucket-c-yesterday-jobdetect.md`), (b) `memory/board-stack-jobs.md` on
the chads-dreams board, and (c) a stub for recent-session detection. Parses
the existing `jobsByWeek = { ... }` block out of `the big dashboard.html`
using brace-balanced extraction (string-aware, so apostrophes in data don't
confuse it), then 4-key diffs candidates against the board: (a) exact slug,
(b) normalized name, (c) Claude session UUID, (d) date + slug combo. Any
match = skip.

READ ONLY — never mutates any source file. All errors surface in the
`errors[]` array; stdout stays pure JSON even when sources fail.

Example:

```bash
python sync-check.py
```

Example stdout:

```json
{
  "new_candidates": [
    {"slug": "master-business-creator", "name": "Master Business Creator", "date": null, "uuid": null, "source": "board"}
  ],
  "skipped_already_on_board": [
    {"slug": "scout-troop-app", "reason": "exact_slug"}
  ],
  "sources_checked": ["yesterday", "board"],
  "errors": []
}
```

Exit codes: `0` ran to completion (partial-failure tolerant) · `2` fatal
stdout failure. Planned future flags: `--dry-run`, `--source yesterday-only`.

## state-reader.py

Interactive-menu state reader for `/ultimate-project-creator`. Loads every
job out of `the big dashboard.html` (same balanced-brace parser as
`sync-check.py`), walks each one through the UFM pipeline by
checking for `{slug}/` subfolders in each stage root, then recommends the
next important step via a simple rule table:

1. no stage-3 master MD → write it
2. stage-4 parent folder missing → scaffold FILG
3. FILG work-copy present but looks unfilled (`TODO:`, `{{`, very small) →
   fill gaps
4. stage-5 parent folder missing → scaffold FILF
5. **FILF work-copy done but stage-6 mirror missing → `stage6-mirror.py`
   (new rule — threads between FILF completion and canonical save)**
6. FILF work-copy exists but no canonical in
   `Ultimate Project Creator - 1\` → save final
7. final exists but `jobs/{slug}.html` missing → pages-pullout
8. all present → done, preview in browser

**Stage 6 awareness:** the reader now checks
`6. [Final results in 'final result folder\{slug}\{slug}.html` (note the
intentional `[` and open-quote, no closing bracket — preserved exactly via
a Python raw string constant). A new blocker `stage-6 mirror missing` is
emitted when FILF is done but the Stage 6 mirror file has not yet been
written. The matching next-step kind is `stage6_mirror` with label
`Mirror to stage 6 (final results)`.

Active job detection prefers the currently-crowned `!! ` wrapper under
`Ultimate Project Creator - 1\`; falls back to the most-recently-modified
job subfolder across stages 5→1, then the last job on the dashboard.

Accepts both `3.  MIDDLE - master 'project job' holder` (actual current
disk spelling) and `3.  MIDDLE - master 'project job' holder` (the
`/ultimate-project-creator` spec spelling).

READ ONLY.

Example:

```bash
python state-reader.py
```

Example stdout:

```json
{
  "active_week": "week of 4/23",
  "active_job": {
    "slug": "scout-troop-app",
    "name": "scout troop app",
    "stage": 3,
    "blockers": ["stage-4 not started"]
  },
  "next_important_step": {
    "label": "Scaffold FILG parent + 2 subfolders (copy from stage 3)",
    "kind": "scaffold_filg",
    "target": "4. fill in the gaps  between 'step phrases'\\scout-troop-app"
  },
  "all_jobs": [
    {"slug": "scout-troop-app", "stage": 3, "status": "stage 3"},
    {"slug": "koi-tribute", "stage": 1, "status": "not started"}
  ],
  "errors": []
}
```

Exit codes: `0` success (partial-failure tolerant) · `2` fatal stdout
failure.

## deploy-netlify.py

Pushes the UFM dashboard (`the big dashboard.html`) plus its `jobs/` and
`assets/` folders up to Netlify. Static site — no build step. By default
deploys to a draft/preview URL; pass `--prod` for production. On a fresh
project with no `.netlify/state.json` yet, the script creates and links a new
Netlify site on the fly (optionally with `--site-name` override).

Pre-flight checks: `netlify` CLI on PATH, `the big dashboard.html` at UFM
root, `jobs/` folder with at least one `.html`, `assets/dashboard.css`
present. Each check has a clear failure message and its own exit code.

The deploy excludes the full pipeline internals (stage folders `1.`–`6.`,
`-- Results folder master forever/`, `-- back upppp dashboard/`, `.git/`,
`.DS_Store`, `__pycache__/`, and the local `.netlify/state.json`). These
are written to a temporary `.netlifyignore` at UFM root which is removed in
a `finally:` block so failed deploys don't leave the file behind.

After a successful deploy, the URL is parsed from netlify's stdout
(`Website Draft URL:` / `Website URL:` / fallback regex on any
`*.netlify.app`) and opened in Chrome via the same explicit-path lookup
used by `launch-preview.py`, falling back to `webbrowser.open`.

Example:

```bash
# default: draft/preview deploy, auto-named site on first run
python deploy-netlify.py

# pick a site name on first deploy
python deploy-netlify.py --site-name chad-ufm-dashboard

# validate only — builds inventory + .netlifyignore, no push
python deploy-netlify.py --dry-run

# production deploy
python deploy-netlify.py --prod
```

Exit codes: `0` success · `1` pre-flight failure (missing dashboard, jobs/,
assets/, etc.) · `2` `netlify` command failed during deploy · `3` netlify
CLI not installed (hint printed: `npm install -g netlify-cli` + `netlify
login`).
