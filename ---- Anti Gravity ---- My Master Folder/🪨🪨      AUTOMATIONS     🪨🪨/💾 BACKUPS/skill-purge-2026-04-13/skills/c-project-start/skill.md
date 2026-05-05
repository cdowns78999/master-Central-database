---
name: c-project-start
description: Project launcher — locks into Ran Plan Area, creates folder, scopes all work, offers sub-agent handoff
user_invocable: true
---

# c-project-start

Launches a new project in the Ran Plan Area. Creates a scoped folder, locks all work to it, and optionally hands off to `/c-sub-agent-main-job`.

## Usage

```
/c-project-start
/c-project-start [project description]
```

---

## BASE PATH (HARD LOCKED)

```
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area
```

Every project folder is created here. All file operations for the project scope to `Ran Plan Area/{project-folder}/`. No exceptions.

---

## STEP 1 — LOCK + ASK

If the user passed a description with the command, use it. Otherwise ask:

```
🔵🟢🟣🔴🟠  claude  /reload-plugins  <- type /c-plug to learn more
╭────────────────────────────────────────────────╮

   Locked into Ran Plan Area.

   What's this project? Give me a short title or
   description and I'll set up the folder.

╰────────────────────────────────────────────────╯
```

Wait for the user's response.

---

## STEP 2 — CREATE FOLDER + SOURCE QUESTION

From the user's description, derive a kebab-case folder name. Keep it short and descriptive.

Create the folder at: `Ran Plan Area/{folder-name}/`

Then respond — plain text, NO interactive menu:

```
🔵🟢🟣🔴🟠  claude  /reload-plugins  <- type /c-plug to learn more
╭────────────────────────────────────────────────╮

   Created: {folder-name}/

   All work for this project stays in this folder.

   Are we picking up from a previous chat or
   starting fresh?

   1) Load from previous chat — give me the
      context and I'll pull it in
   2) New job — starting from scratch

╰────────────────────────────────────────────────╯
```

Wait for the user's response.

---

## STEP 3 — SUB-AGENT OFFER

Whether they chose "new" or "load from chat", always offer the sub-agent handoff next.

### If "new job":

```
🔵🟢🟣🔴🟠  claude  /reload-plugins  <- type /c-plug to learn more
╭────────────────────────────────────────────────╮

   Got it — fresh start.

   Want me to tee up /c-sub-agent-main-job from
   here to organize the workload? It'll break the
   build into parallel jobs and track them on the
   grid.

   yes / no

╰────────────────────────────────────────────────╯
```

### If "load from previous chat":

```
🔵🟢🟣🔴🟠  claude  /reload-plugins  <- type /c-plug to learn more
╭────────────────────────────────────────────────╮

   Drop the context — paste the key details, a
   plan file, or describe where we left off and
   I'll pick it up.

   Once I have it, want me to tee up
   /c-sub-agent-main-job to organize the work?

   yes / no

╰────────────────────────────────────────────────╯
```

Wait for the user's response.

---

## STEP 4 — EXECUTE

### If YES to sub-agent:
Invoke `/c-sub-agent-main-job` with the project folder as working context. The grid takes over from here. Pass along any context the user provided.

### If NO to sub-agent:

```
🔵🟢🟣🔴🟠  claude  /reload-plugins  <- type /c-plug to learn more
╭────────────────────────────────────────────────╮

   Folder's set, path's locked. Tell me what to
   build first.

╰────────────────────────────────────────────────╯
```

---

## STEP 5 — COMPLETION CHECKPOINTS (during build)

While the project is being built (whether via sub-agents or direct work), weave in natural completion checks at major milestones. These are NOT aggressive — just a soft line at the end of a status update:

```
   Status: done / ready to go.
   Are we shipping this or still cooking?
```

or

```
   That's wired up. Anything else or are we done?
```

Keep it conversational, match the active tone. The point: when the user finally says **"we are done"**, **"done"**, **"ship it"**, **"deploy"**, **"go live"**, or **"launch it"** — that triggers STEP 6.

---

## STEP 6 — DEPLOY SEQUENCE

When the user confirms the project is complete, run this exact operational sequence with these status phrases at each stage.

**IMPORTANT:** Every bash command in this sequence MUST start with:
```bash
source ~/.bashrc && export PATH="$PATH:/c/Program Files/GitHub CLI"
```
This ensures both `netlify` (npm global) and `gh` (GitHub CLI) are available. PATH does NOT persist between bash calls.

### 6a — Prep: Index Check + .gitignore

Before anything, verify `index.html` exists in the project folder:

```bash
source ~/.bashrc && ls "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨🪨🪨 Ran Plan Area/{folder-name}/index.html"
```

If missing → warn the user:
```
🔵🟢🟣🔴🟠  claude  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   ⚠ No index.html found in the project folder.
   Netlify needs one to deploy. Want me to rename
   the main file, or hold off?

╰────────────────────────────────────────────────╯
```

If found → create `.gitignore` in the project folder before committing:
```
.netlify/
node_modules/
*.tmp
skeleton.html
batches_*.html
```
This prevents build artifacts, temp files, and the `.netlify/` state folder from being committed.

### 6b — GitHub Push

Derive a repo name from the project folder: lowercase, hyphens only, no emojis, no special chars.

Output this BEFORE running the commands:
```
🔵🟢🟣🔴🟠  claude  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   ───────────────────────────────────────
    PROJECT DONE → now importing to GitHub...
   ───────────────────────────────────────

╰────────────────────────────────────────────────╯
```

Then run (all in ONE bash call — paths must be double-quoted):
```bash
source ~/.bashrc && export PATH="$PATH:/c/Program Files/GitHub CLI" && cd "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨🪨🪨 Ran Plan Area/{folder-name}" && git init && git add -A && git commit -m "Deploy: {project-name}" && gh repo create {repo-name} --public --source=. --push
```

**If `gh repo create` fails because the repo already exists**, fall back to:
```bash
git remote add origin https://github.com/cdowns78999/{repo-name}.git && git push -u origin master
```

After successful push, output:
```
🔵🟢🟣🔴🟠  claude  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   ───────────────────────────────────────
    ✓ Imported to GitHub
    → Going live on Netlify...
   ───────────────────────────────────────

╰────────────────────────────────────────────────╯
```

### 6c — Netlify Deploy

Use ONE non-interactive command to create the site and deploy in a single shot:
```bash
source ~/.bashrc && cd "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨🪨🪨 Ran Plan Area/{folder-name}" && netlify deploy --prod --dir=. --create-site {repo-name}
```

This creates the Netlify site AND deploys — no `init`, no `link`, no interactive prompts.

**If `--create-site` fails** (site name taken, etc.), fall back to:
```bash
source ~/.bashrc && cd "{full-path}" && netlify sites:create --name {repo-name} --disable-linking && netlify link --name {repo-name} && netlify deploy --prod --dir=.
```

After successful deploy, grab the live URL from the output and display:
```
🔵🟢🟣🔴🟠  claude  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   ───────────────────────────────────────
    ✓ index.html verified
    ✓ Repo live: github.com/cdowns78999/{repo-name}
    ✓ Netlify LIVE: {netlify-url}
   ───────────────────────────────────────

   Project shipped. 🛰️

╰────────────────────────────────────────────────╯
```

### 6d — If deploy fails

Don't panic. Output what went wrong and offer:
```
   Deploy hit a snag: {error}

   1) Retry
   2) Push to GitHub only — connect Netlify manually
   3) Skip deploy for now
```

---

## STEP 7 — FUTURE UPDATES

If the user comes back to update a project that was already deployed, BOTH GitHub and Netlify need updating. `git push` alone does NOT auto-deploy to Netlify (no CI connection). Always run both:

```bash
source ~/.bashrc && export PATH="$PATH:/c/Program Files/GitHub CLI" && cd "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨🪨🪨 Ran Plan Area/{folder-name}" && git add -A && git commit -m "Update: {short description}" && git push
```

Then redeploy to Netlify:
```bash
source ~/.bashrc && cd "C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/🪨🪨🪨🪨 Ran Plan Area/{folder-name}" && netlify deploy --prod --dir=.
```

Output:
```
🔵🟢🟣🔴🟠  claude  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   ───────────────────────────────────────
    ✓ Pushed update to GitHub
    ✓ Redeployed to Netlify
   ───────────────────────────────────────

   Live now.

╰────────────────────────────────────────────────╯
```

---

## Rules

| Rule | Detail |
|------|--------|
| **Path lock** | All work scoped to `Ran Plan Area/{project-folder}/` — no files created outside |
| **Folder naming** | Kebab-case, short, descriptive |
| **No interactive menus** | Plain text prompts only — numbered options or yes/no |
| **Containment** | Every file created, every edit made = inside the project folder |
| **Sub-agent handoff** | If accepted, `/c-sub-agent-main-job` inherits the folder context. Note: completion checkpoints (Step 5) only fire in direct-build mode — sub-agents don't inherit them. When sub-agents finish and return, resume Step 5 checks from the main conversation |
| **Tone** | Follows active tone from memory |
| **Format** | Uses the locked Hub Color Stack box for ALL outputs |
| **Deploy trigger** | ONLY when user explicitly confirms done — never auto-deploy |
| **Index check** | Always verify `index.html` exists before pushing to GitHub |
| **.gitignore** | Always create `.gitignore` before first commit (exclude `.netlify/`, `node_modules/`, temp/build files) |
| **Repo naming** | Lowercase, hyphens, no emojis — derived from folder name |
| **gh PATH** | EVERY bash call must include: `source ~/.bashrc && export PATH="$PATH:/c/Program Files/GitHub CLI"` |
| **Netlify deploy** | Always use `netlify deploy --prod --dir=.` — never `netlify init` (interactive). First deploy uses `--create-site` flag |
| **Netlify auth** | Already authed as Chad Downs (chaddowns9@gmail.com) / Ahead Artist Solutions |
| **GitHub auth** | Already authed as cdowns78999 via gh CLI |
| **Completion checks** | Soft, natural "are we done?" woven into milestone outputs — not forced |
| **Path quoting** | ALL paths with spaces/emojis MUST be double-quoted in bash commands |
| **Repo collision** | If `gh repo create` fails (name taken), fall back to `git remote add` + `git push` |
