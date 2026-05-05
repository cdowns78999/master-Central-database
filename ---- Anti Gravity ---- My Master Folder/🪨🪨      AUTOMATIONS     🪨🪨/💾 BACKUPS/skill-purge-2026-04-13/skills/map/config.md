# MAP SKILL CONFIG

## File Target

**Path:** `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A1  -- --- {MAP.html - Automated}\-- { map.html`

## Node Template

```html
<a href="{URL}" class="p-btn" target="_blank">
    <div class="dot"></div>
    <div class="btn-text-container">
        <span class="btn-label">{LABEL}</span>
        <span class="url-text">{SHORT_ID}</span>
    </div>
</a>
```

## Target Sections

| Section | Header Text | Default |
|---------|-------------|---------|
| Sales Funnel | `SALES FUNNEL` | No |
| Spotify Tools | `SPOTIFY TOOLS` | No |
| Utilities | `UTILITIES` | **Yes** |

## Insertion Logic

1. Read map.html
2. Find section header: `<div class="section-header">UTILITIES</div>`
3. Find next: `<div class="items-grid">`
4. Find last `<a href=` inside that items-grid
5. Insert new node **after** the last `</a>` closing tag
6. Save file

## Input Format

**Skill receives:**
- URL (required)
- Label (optional - auto-generate from URL domain if missing)
- Short ID (optional - auto-generate from URL if missing)

## Auto-Generation Rules

- **Label:** Extract domain name, capitalize first letter
  - `https://manage.tiiny.site/` → `Manage`
- **Short ID:** Extract subdomain or path slug
  - `https://manage.tiiny.site/` → `manage`
  - `https://chad40-spotify.tiiny.site/` → `chad40`

## Validation

- URL must start with `http://` or `https://`
- If missing protocol, prepend `https://`
- Label max 50 chars
- Short ID max 15 chars

## Example Execution

**Input:**
```
URL: https://chad99-new-tool.tiiny.site/
```

**Auto-generated:**
```
Label: Chad99 New Tool
Short ID: chad99
```

**Output inserted:**
```html
<a href="https://chad99-new-tool.tiiny.site/" class="p-btn" target="_blank">
    <div class="dot"></div>
    <div class="btn-text-container">
        <span class="btn-label">Chad99 New Tool</span>
        <span class="url-text">chad99</span>
    </div>
</a>
```

## Backup

**Before ANY edit**, copy the working file to the backup location:

**Backup Path:** `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A1  -- --- {MAP.html - Automated}\-- ☁️☁️mapper back up☁️☁️`

- Use Bash `cp` to copy `-- { map.html` → backup path (same filename)
- This runs **before** any Edit tool call
- Then proceed with edits on the original file as normal

## File Operations

1. **Backup** the file to the backup path (see above)
2. Read entire file content
3. Use Edit tool with exact string matching
4. Match from last `</a>` in UTILITIES section
5. Insert with proper indentation (20 spaces base)
6. Verify insertion succeeded
