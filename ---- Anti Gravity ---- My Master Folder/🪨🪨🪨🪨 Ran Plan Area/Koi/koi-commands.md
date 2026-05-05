# koi-commands.md

**Scope:** Koi project ONLY. These commands behave exactly like c-chads-dreams' THE 12, but every action targets Koi files (`koi-board.html`, `koi-context.md`, `koi-commands.md`) — never the main board, main skill, or main memory.

**Files allowed to touch:**
- `Koi/koi-board.html` — visual board (15 cells, 5×3)
- `Koi/koi-context.md` — project clues + state snapshot
- `Koi/koi-commands.md` — this file
- `Koi/sample/` — only when a sample is explicitly requested

**Files NEVER touched by Koi commands:**
- `TheBoard/index.html` (main board)
- `C:\Users\chad\.claude\skills\c-chads-dreams\skill.md`
- `C:\Users\chad\.claude\projects\C--Users-chad\memory\*` (main memory)

---

## 📋 THE 12 (live, scoped to Koi)

```
01  Drop an idea          → just say it, Claude stacks it as a new Koi cell
02  New category          → "add category [name]"
03  Rename a job          → "rename [job] to [new name]"
04  Move a job            → "move [job] to [Active|Queued|Backlog]"
05  Add an end goal       → "end goal for [job] is..."
06  Flag priority         → "flag [job] as priority" → ⚡
07  Add a note to a job   → "note on [job]: ..."
08  Sync to the board     → "sync" → deploy to https://koi-toy.netlify.app/
09  Build a job           → "start [job]" or "build job X"
10  Mark a job complete   → "job X is done, link is [url]"
11  Show full list        → "show board" → reprint Koi cells
12  Open live site        → "open the board" → koi-toy.netlify.app
```

---

## Per-command behavior (Koi-scoped)

### 01 · Drop an idea
- Append a new cell to the first row with an open slot (Active → Queued → Backlog).
- If all 15 are full, drop into Backlog and warn that the board is full.
- Update `koi-board.html` cells array.

### 02 · Add category
- Koi board uses fixed 3 rows (Active Now / Queued Next / Backlog) — adding categories is NOT supported in this scoped board.
- Acknowledge and offer to rename a row badge instead.

### 03 · Rename a job
- Match by cell number or title in `koi-board.html`. Update `title` field in place.

### 04 · Move a job
- Move a cell between Active Now / Queued Next / Backlog rows.
- Renumber cells (01–05 / 06–10 / 11–15) so the row layout stays correct.

### 05 · Add an end goal
- Append "Goal: ..." to the cell's `detail` field.

### 06 · Flag priority
- Prepend ⚡ to the cell's `title` field.

### 07 · Add a note
- Append "Note: ..." to the cell's `detail` field.

### 08 · Sync (DEPLOY)
- Save current `koi-board.html` to disk.
- Run: `source ~/.bashrc && netlify deploy --prod --dir="C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨🪨🪨 Ran Plan Area/Koi" --site=koi-toy`
- If site doesn't exist yet → create it fresh with **exact** name `koi-toy` on first sync. NEVER any other site name.
- Confirm proof: open `https://koi-toy.netlify.app/` in browser.

### 09 · Build a job
- Set the named cell's `status` to `active` (only one cell can be active — flip the previous active back to `pending`).
- Reprint board and offer to launch sub-agents scoped to Koi files only.

### 10 · Mark complete
- Set the cell's `status` to `done` (dashed, dim styling).
- Append the URL to the cell's `detail` field.

### 11 · Show full list
- Print the 15 cells in 5×3 layout (text rendering of the board state).

### 12 · Open live site
- Run: `python -c "import webbrowser; webbrowser.open('https://koi-toy.netlify.app/')"`

---

## Hard rules

| Rule | Detail |
|------|--------|
| **Scope lock** | Only touch Koi files listed above. Never touch main board, main skill, main memory. |
| **One active cell** | At most one cell with `status: active` at any time. |
| **Site name lock** | Sync target is **always** `koi-toy.netlify.app`. Never create any other site. |
| **No auto-sync** | HTML stays local until Chad explicitly says "sync". |
| **Local preview** | During build, serve via `python -m http.server <free-port-3000-3020>` with `?v=$(date +%s)` cache-bust. |
