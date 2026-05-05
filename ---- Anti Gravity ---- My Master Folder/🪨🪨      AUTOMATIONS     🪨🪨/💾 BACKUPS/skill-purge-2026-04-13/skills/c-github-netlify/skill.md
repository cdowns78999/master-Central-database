# c-github-netlify

Ship to the internet — GitHub repo + Netlify deploy in one shot.

## Usage

/c-github-netlify
/c-github-netlify {path to project}
/c-github-netlify {path} --env KEY=value KEY2=value2

## Instructions

### On Invoke

**Step 1 — Locate the project**
- If a path is provided, use it
- If no path, ask: "Which project folder?"
- Confirm the folder exists and has files

**Step 2 — Detect publish directory**
- Look for `netlify.toml` — read `publish` value if it exists
- If no toml, auto-detect: check for `static/`, `public/`, `dist/`, `build/`, or use root
- Look for `index.html` — confirm it exists in the publish dir
- If missing, warn before proceeding

**Step 3 — Git init + GitHub push**
- Check if `.git` already exists — skip init if so
- Check if remote `origin` already exists — skip if so
- If no git repo:
  1. `git init`
  2. Ensure `.gitignore` exists with: `venv/`, `node_modules/`, `.netlify/`, `.env`, `__pycache__/`, `data/`, `*.pyc`
  3. `git add -A`
  4. `git commit -m "Initial commit"`
- Create GitHub repo: `gh repo create {project-name} --public --source=. --push`
- If `gh` not authenticated, tell user: `! gh auth login`
- If repo already exists on GitHub, just push: `git push -u origin main`

**Step 4 — Netlify site create + deploy**
- Check if already linked (`netlify status`) — skip create if so
- If not linked:
  1. `netlify sites:create --name {project-name}`
  2. If name is taken, append random 4 digits
- If `--env` flags provided, set each: `netlify env:set KEY value`
- If `netlify.toml` doesn't exist, create one with detected publish dir
- Deploy: `netlify deploy --prod --dir={publish-dir}`

**Step 5 — Report**
Show a clean summary:

```
═══════════════════════════════════════
 SHIPPED
═══════════════════════════════════════

 GitHub:  https://github.com/cdowns78999/{name}
 Live:    https://{name}.netlify.app
 Admin:   https://app.netlify.com/projects/{name}

 Env vars set: GROQ_API_KEY ✅
 Edge functions: chat ✅
 Files deployed: 15
═══════════════════════════════════════
```

### Edge Cases

- **Netlify CLI not installed**: run `npm install -g netlify-cli` automatically
- **Not logged in to Netlify**: run `netlify login` (opens browser)
- **Not logged in to GitHub**: tell user `! gh auth login`
- **Repo name conflict**: append `-2`, `-3` etc. or random digits
- **Large venv/node_modules found**: warn and ensure .gitignore excludes them BEFORE committing
- **No index.html**: warn "Netlify needs an index.html in the publish dir" — ask to proceed or fix

### Re-deploy (already shipped)

If the project already has a git remote and netlify link:
1. `git add -A && git commit -m "Update"`
2. `git push`
3. `netlify deploy --prod --dir={publish-dir}`
4. Show the same summary with "RE-DEPLOYED" header

### Flags

- `--env KEY=value` — set Netlify environment variables (repeatable)
- `--name custom-name` — override the site name
- `--private` — create GitHub repo as private instead of public
