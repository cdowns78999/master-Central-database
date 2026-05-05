# c-deploy-bug-check

Deploy bug checker — scans a project folder for deployment issues, reports what's wrong, and fixes it.

## Usage

/c-deploy-bug-check
/c-deploy-bug-check {path to project}

## Instructions

### On Invoke

Launch a sub-agent that:

1. **Scans the project folder** — counts files by directory, identifies bloat (venv/, node_modules/, __pycache__/, .git/, build artifacts)

2. **Checks deploy structure** — is index.html at root or in a subfolder? Are CSS/JS paths relative and correct? Are there missing files referenced in the HTML?

3. **Checks for common deploy killers:**
   - .gitignore missing or incomplete
   - venv/ or node_modules/ included (thousands of junk files)
   - Absolute paths that won't work on a different server
   - Missing CORS headers for cross-origin resources
   - Mixed content (HTTP resources on HTTPS page)
   - Large files that shouldn't be deployed (models, databases, logs)
   - Font imports that need internet access

4. **Reports with green/red indicators:**
```
═══════════════════════════════════════
 DEPLOY BUG CHECK
═══════════════════════════════════════

 ✅ index.html found at static/
 ✖ venv/ has 1,989 files (BLOAT)
 ✅ .gitignore exists
 ✖ .gitignore missing venv/ exclusion
 ✅ CSS paths are relative
 ✅ JS imports use relative paths
 ✖ Font import needs internet access
═══════════════════════════════════════
```

5. **Auto-fixes what it can:**
   - Creates/updates .gitignore
   - Reports what needs manual fixing (like moving index.html)

6. **Presents results** in the Hub Color Stack box format

### Sub-Agent Prompt

```
You are a deploy bug checker. Scan the project at {path} for deployment issues.

1. Count files per directory — flag any folder with 100+ files as potential bloat
2. Check if index.html is at the deployable root
3. Read index.html — check all CSS/JS/font references resolve to real files
4. Check for .gitignore — verify it excludes build artifacts
5. Look for absolute paths, localhost references, or hardcoded URLs
6. Report everything with ✅ / ✖ indicators
7. Fix what you can (create .gitignore, etc.)
8. Report what needs manual action
```
