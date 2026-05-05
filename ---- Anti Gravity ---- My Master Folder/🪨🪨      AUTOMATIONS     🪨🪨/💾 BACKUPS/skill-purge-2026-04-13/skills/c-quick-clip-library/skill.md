---
description: "Clip an artifact from the library into the sub-library for safe editing — copies original, preserves source path, provides working path"
user_invocable: true
---

# c-quick-clip-library

Clips an artifact from Chad's library into the sub-library for safe editing. The original stays untouched. The working copy goes into `📙 sub-library/` with the exact same name.

## Usage

```
/c-quick-clip-library [item name or number]
```

If no item is given, show the glossary and ask which one to clip.

## Paths

- **Library (source):** `📙-- -- - -- 📙 library/` inside `💎💎 - - - beginning - - - 💎💎/`
- **Sub-library (working):** `📙-- -- - -- 📙 library/📙 sub-library/`
- **Glossary:** `library-glossary.txt` in the library root — always read this FIRST to orient

## Instructions

### Step 1: Identify the artifact

- If the user passed a name or number (e.g., "chad22" or "proposal generator"), match it against the glossary
- If no argument, read `library-glossary.txt` and present a numbered list so Chad can pick
- Confirm which item before clipping

### Step 2: Copy to sub-library

- Copy the file or folder from the library root into `📙 sub-library/`
- **PREFIX with 〰️** — add `〰️ ` (wavy dash emoji + space) before the original name. This marks it as a sub-library artifact so it's instantly distinguishable from the original. Example: `chad22 - proposal generator` → `〰️ chad22 - proposal generator`
- If it's a folder, copy the entire folder recursively
- If it's a file, copy the file
- If the item already exists in sub-library, STOP and ask Chad — don't overwrite

### Step 3: Confirm the clip

Show this confirmation format:

```
🔵🟢🟣🔴🟠  claude
╭────────────────────────────────────────────────╮

   ✂️  Artifact clipped!

   📙 SOURCE (original — untouched):
   {full path to original}

   📙 WORKING COPY (safe to edit):
   {full path to sub-library copy}

   The separation has been made. We've clipped this
   artifact from your library and inserted it into the
   sub-library where we can work safely.

╰────────────────────────────────────────────────╯
```

### Step 4: Return the working path

After confirming, provide the working path so it can be used immediately by whatever job needs it (e.g., wiring into the dashboard pipeline, opening in AppViewer, etc.).

## Rules

- NEVER modify the original in the library — that's the whole point
- Always use the glossary to orient before searching
- Sub-library copies ALWAYS get the `〰️ ` prefix — no exceptions
- If clipping multiple items, run the flow for each one separately
- If the sub-library folder doesn't exist, create it: `📙 sub-library/`
