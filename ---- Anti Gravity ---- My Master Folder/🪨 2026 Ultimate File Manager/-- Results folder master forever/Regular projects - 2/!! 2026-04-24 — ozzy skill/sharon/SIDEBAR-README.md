# Sharon Sidebar Feature

## What it is

An iTunes-style left sidebar that lists all 26 music industry categories in a single scrollable column. The sidebar persists across the app, gives one-click navigation to every category page, and visually mirrors the iTunes source-list pattern (icon + label rows, active-row highlight, grouped sections).

## Files involved

- `index.html` — sidebar markup and click handler that routes to category pages
- `categories.json` — source of truth for the 26 items (id, label, slug, icon ref)
- `sidebar-icons.md` — emoji + color mapping per category
- `sidebar-variants.css` — 3 alternative themes (toggle by commenting blocks in/out)
- `pages/category-template.html` — clone-and-fill stub for new category pages
- `index.backup-pre-sidebar-2026-04-26.html` — rollback safety net (pre-sidebar snapshot)

## How to add a new category

1. Edit `categories.json` and append a new entry with `id`, `label`, `slug`, and `icon`.
2. Add the icon (emoji + hex color) to `sidebar-icons.md` under the matching id.
3. Re-render the sidebar list in `index.html` so the new row appears (the loop reads `categories.json` — refresh the page or rebuild if cached).
4. Optional: copy `pages/category-template.html` to `pages/<slug>.html` and fill in the content for that category.

## How to switch themes

Open `sidebar-variants.css`. Three theme blocks are stacked inside the file (Classic, Dark, Warm). Comment out the active block and uncomment the desired theme block. Save and reload `index.html` to see the change.

## Rollback

```
cp index.backup-pre-sidebar-2026-04-26.html index.html
```

Restores the pre-sidebar `index.html` exactly as it was before this feature landed.

## Source data

The canonical category list lives at:

```
Ran Plan Area/Koi/music-industry-knowledge-app/data/data.js
```

Treat that file as upstream truth. If categories shift there, regenerate `categories.json` from it rather than hand-editing both.
