# Sharon Catalog — Deploy Log

## Deploy Info
- **Production URL:** https://sharon-label-dashboard-152542.netlify.app
- **Site Name:** sharon-label-dashboard-152542
- **Project ID:** 9d87d695-45e1-4021-9ea2-c3e937f82acc
- **Deploy ID:** 69ed5c0bb573b4f0f6052745
- **Deploy Timestamp:** 2026-04-25 19:29:25
- **Mode:** Production (apply-to-existing)
- **File Count (project tree):** 26
- **CDN Files Uploaded:** 5

## Local Probe Results (port 3001) — pre-deploy

| URL | Status |
|---|---|
| http://localhost:3001/index.html | 200 |
| http://localhost:3001/data/songs.md | 200 |
| http://localhost:3001/js/md-table.js | 200 |
| http://localhost:3001/pages/songs.html | 200 |

All four endpoints returned 200 before deploy. No path fixes needed.

## Tab Routing — index.html
- Replaced existing `// Tab activation` script block with `// Tab activation + routing`.
- Catalog tab stays inline (grid lives in index.html).
- All non-catalog tabs (`songs`, `points`, `writers`, `contacts`, `schedule`, `tour`, `artists`, `releases`, `royalties`, `contracts`, `sessions`, `assets`) open `pages/{slug}.html` in a new tab.
- Visual active state preserved.

## Build Logs
- https://app.netlify.com/projects/sharon-label-dashboard-152542/deploys/69ed5c0bb573b4f0f6052745
