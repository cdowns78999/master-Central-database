---
name: map
description: Critical Mapper node manager — add, find, or update nodes in map.html
---

# map

Add a new node to the map.html library

## Usage

```
/map <URL> [label] [short-id]
```

## Arguments

- `URL` (required): The full URL to add
- `label` (optional): Display label for the node
- `short-id` (optional): Short identifier text

## Instructions

You are helping add a new node to the CRITICAL MAPPER HTML file. Follow these steps precisely:

1. **Read the config file** at `C:\Users\chad\.claude\skills\map\config.md` to get the exact file path and template

2. **Backup the file** before any edits:
   - Copy the map.html file to the backup folder using Bash `cp`
   - **Name the backup with today's date first**, format: `MM-DD-YYYY -- { map.html`
     ```
     cp "<source-path>/-- { map.html" "<source-path>/-- ☁️☁️mapper back up☁️☁️/MM-DD-YYYY -- { map.html"
     ```
     Example: `02-16-2026 -- { map.html`
   - The backup path is in the config file
   - This ensures the user always has a dated safe copy before any changes
   - Then continue working on the original file

3. **Check if URL was provided:**
   - If NO URL provided: Ask the user "What's the URL you want to add?" and wait for response
   - Optionally also ask: "Any specific label or short-id?" (but these can be auto-generated)
   - Once received, continue to step 4

4. **Parse the user's input:**
   - Extract URL (required)
   - Extract label (if provided) or auto-generate from URL
   - Extract short-id (if provided) or auto-generate from URL

5. **Auto-generation logic** (if needed):
   - Label: Extract domain/subdomain, format as "Title Case"
   - Short ID: Extract subdomain or first path segment
   - If URL has no protocol, prepend `https://`

6. **Read the map.html file** from the path in config

7. **Find insertion point:**
   - Locate: `<div class="section-header">UTILITIES</div>`
   - Find the next: `<div class="items-grid">`
   - Find the last closing `</a>` tag in that grid

8. **Create the new node** using this exact template with proper indentation (20 spaces):
```html
                    <a href="{URL}" class="p-btn" target="_blank">
                        <div class="dot"></div>
                        <div class="btn-text-container">
                            <span class="btn-label">{LABEL}</span>
                            <span class="url-text">{SHORT_ID}</span>
                        </div>
                    </a>
```

9. **Insert the node** after the last `</a>` in the UTILITIES items-grid

10. **Confirm** to the user:
    - ✓ Backup saved
    - ✓ URL added
    - ✓ Label used
    - ✓ Short ID used
    - ✓ Section: UTILITIES

11. **Line count summary** (always the very last thing you say):
    - Count the total lines in the file before and after the edit
    - End with a markdown code block like:
    ```
    map.html changed from {X} lines to {Y} lines
    ```

## Example

User input: `/map https://chad99-new-tool.tiiny.site/`

Your actions:
- Read config
- Backup map.html to the backup folder
- Parse URL: `https://chad99-new-tool.tiiny.site/`
- Auto-generate label: `Chad99 New Tool`
- Auto-generate short-id: `chad99`
- Read map.html
- Find UTILITIES section
- Insert node with proper formatting
- Confirm completion (including backup confirmation)

## Conversational Mode

**User may ask general/exploratory questions instead of providing a direct URL.**

Examples:
- "hey claude can you find 'task manager' in my 'map file'"
- "can you update the spotify tools section?"
- "where's the presentation link in the map?"

**In these scenarios:**
1. Read the map.html file first
2. Search for what they're asking about (use Grep or manual search)
3. Show them what you found
4. Help figure out what they want to do:
   - Update an existing node?
   - Add a new node?
   - Find information?
   - Change a URL or label?
5. Ask clarifying questions to understand the specific change needed
6. Once clear, execute the update or guide them to use `/map` properly

**Be conversational and helpful.** Don't force them into the exact `/map <URL>` format if they're exploring or need help figuring out what to update.

## Important Notes

- **ALWAYS backup before editing** — no exceptions, even for small changes
- Always use the Edit tool for precise insertion
- Match exact indentation (20 spaces for the `<a>` tag)
- Preserve all existing formatting
- Add to UTILITIES section by default
- Validate URL has protocol (add https:// if missing)
- Be flexible with user input - help them figure out what they need
