---
name: c5-directory-search
description: Search the Anti Gravity master folder for files, ideas, and assets — with smart priority zones and exclusions
---

# c5-directory-search

Natural language file search across the Anti Gravity master folder. Just say what you're looking for and Claude finds it.

## Usage

```
/c5-directory-search hey can you find my old pitch deck
/c5-directory-search search around for anything related to Torok
/c5-directory-search where's that invoice template
```

## Directory Map

**Root (search boundary):**
`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder`

**Priority zones (search in this order):**

1. **Workstation (FLUTTER)** — active playground, check here first
   `y - [---] [---] [---] FfffffLLLLUUUUUUUTTTERRRRR`

2. **Library (Beginning)** — past ideas, reusable assets, sometimes misplaced files
   `💎💎 - - - beginning - - - 💎💎`

3. **Everything else in root** — remaining subfolders inside the master folder

**Always excluded:**
`☁️☁️ - - - Everything else - - - ☁️☁️` — skip entirely, every time, no exceptions

## Instructions

### Step 1: Parse the Request

The user will invoke this skill with a casual, natural language request like:
- "hey find that contract template"
- "search around for anything stream-related"
- "where'd I put the recap files"

Extract the **search intent** — keywords, file types, topic, whatever they're after.

### Step 2: Search Priority Zones

Search the master folder in priority order. ALWAYS exclude the `☁️☁️` folder.

**Zone 1 — Workstation (FLUTTER):**
Search `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\y - [---] [---] [---] FfffffLLLLUUUUUUUTTTERRRRR` first. This is where active work lives — highest chance of finding what the user wants.

**Zone 2 — Library (Beginning):**
Search `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\💎💎 - - - beginning - - - 💎💎` next. Past ideas, templates, reusable files. Files sometimes end up here by accident too.

**Zone 3 — Remaining root subfolders:**
If nothing found yet, search all other subfolders inside the master folder root — EXCEPT the excluded `☁️☁️` folder.

Use **Glob** for filename/pattern matching and **Grep** for content searches. Combine both when the intent is broad.

### Step 3: Report Results

Keep it casual and scannable. Format like:

```
  ─── found ────────────────────────

  📁 zone: Workstation
     path\to\file.ext
     path\to\another-file.ext

  📁 zone: Library
     path\to\something.ext

  ──────────────────────────────────
```

- Group results by zone so the user knows where things live
- Show relative paths from the master folder root (trim the long prefix)
- If searching file contents, show a brief snippet of the matching line
- If nothing found, say so plainly: "didn't find anything matching that — want me to try a broader search?"

### Step 4: Follow Up

After showing results, be ready for:
- "open that one" — read/display the file
- "move it to flutter" — relocate a misplaced file
- "search deeper" — broaden the search or try content matching
- "that's not it" — refine and try again

Stay conversational. No menus needed — just keep the back-and-forth going until the user finds what they need.

## Notes

- This skill is purely read/search — it does NOT modify or move files unless the user explicitly asks
- Always trim the long root path in output so results are easy to scan
- If a search is broad and returns 20+ results, summarize by folder and ask the user to narrow it down
- The excluded `☁️☁️` folder is NEVER searched, even if the user forgets to mention it
