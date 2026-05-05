---
name: c-nerd2
description: Terminal theme browser & installer — browse, preview with ANSI colors, and install terminal themes from curated sources
---

# c-nerd2 — Terminal Theme Browser & Installer

Browse curated theme sites, see **real ANSI-colored previews** in terminal, and install themes directly. An app store for terminal looks.

## Usage

```
/c-nerd2              # main menu
/c-nerd2 --search     # jump straight to search new sites
/c-nerd2 --installs   # jump to installed themes list
```

## Paths

- **Sources catalog:** `C:\Users\chad\.claude\skills\c-nerd2\sources.json`
- **Install log:** `C:\Users\chad\.claude\skills\c-nerd2\installed.json`
- **Downloaded configs:** `C:\Users\chad\.claude\skills\c-nerd2\themes\`

---

## Main Menu

Present in hub color box with AskUserQuestion:

```
🟢 Browse Catalog — curated themes from locked-in sites
🔵 Search New — find 3 results from 2 fresh sites
🟣 My Installs — view/manage what's applied
```

---

## Browse Catalog Flow

### Step 1 — Category Picker

AskUserQuestion — "Pick a category:"

```
🟢 Color Schemes — terminal color palettes
🔵 Prompt Themes — shell prompt configs (Oh My Posh, Starship)
🟣 Fonts — patched Nerd Fonts for glyphs
🟠 Full Kits — complete theme ecosystems (Catppuccin, Dracula)
```

### Step 2 — Fetch Themes

1. Read `sources.json` — filter sites matching the chosen category
2. Pick 3-5 sites from that category
3. Use **WebFetch** on each site to pull actual theme data (JSON, TOML, YAML, or HTML with color values)
4. Parse out individual themes/color schemes from the fetched content

### Step 3 — Render Previews

For EACH theme found, render a **real ANSI terminal preview** using a Bash `echo -e` command. This is the signature feature.

**Preview structure:**

```
┌─ Theme: [Name] ──────────────────────────────┐
│ Source: [site]                                │
│ Category: [category]                         │
└───────────────────────────────────────────────┘

 Color Palette:
  ■ ■ ■ ■ ■ ■ ■ ■   (8 colored squares using ANSI 256-color or truecolor)
  ■ ■ ■ ■ ■ ■ ■ ■   (bright variants)

 Background: [bg color swatch]  Foreground: [fg color swatch]

 Sample Prompt:
  ~/projects/wing-dash main ✔ ❯

 Sample Output:
  drwxr-xr-x  src/
  -rw-r--r--  index.html
  -rw-r--r--  package.json
```

**CRITICAL — ANSI rendering rules:**
- Use `\033[38;2;R;G;Bm` (truecolor) for exact hex-to-RGB colors
- Use `\033[48;2;R;G;Bm` for background colors
- Each ■ square: `\033[38;2;R;G;Bm■\033[0m` with the theme's actual color
- Sample prompt and output lines use the theme's foreground/accent colors
- Always `\033[0m` reset at end of each line
- Render via `echo -e` in Bash tool — NOT as plain text

### Step 4 — Present Options

After rendering previews, use AskUserQuestion:

```
🟢 Install [Theme 1 Name]
🔵 Install [Theme 2 Name]
🟣 Install [Theme 3 Name]
🟠 Browse more from this category
🔴 Back to main menu
```

---

## Search New Flow

### Step 1 — WebSearch

Use **WebSearch** to find 2 terminal theme sites NOT already in `sources.json`. Search queries like:
- "terminal color schemes download 2025"
- "best terminal themes github"
- "windows terminal theme pack"

### Step 2 — Fetch & Parse

Use **WebFetch** on the 2 new sites. Pull 3 total theme/config results.

### Step 3 — Render Previews

Same ANSI preview rendering as Browse Catalog flow.

### Step 4 — Present with Add Option

AskUserQuestion:

```
🟢 Install [Theme Name]
🔵 Install [Theme Name]
🟣 Install [Theme Name]
🟠 Add [Site Name] to my catalog — save for future browsing
🔴 Back to main menu
```

If user picks "Add to catalog" → append the new site to `sources.json` with name, url, category, fetchHint.

---

## Install Flow

When user picks a theme to install:

### Step 1 — Download Config

Use WebFetch to get the full theme config file content (JSON/TOML/YAML).

### Step 2 — Detect Target & Apply

**Windows Terminal color schemes:**
1. Read `%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`
2. If not found, try `%LOCALAPPDATA%\Microsoft\Windows Terminal\settings.json`
3. Create a backup: `settings.json.bak.YYYYMMDD-HHMMSS`
4. Add the scheme to the `schemes` array
5. Optionally set it as the active scheme for the default profile
6. Confirm with: "Theme added to Windows Terminal — restart terminal to see it"

**Prompt themes (Oh My Posh):**
1. Save the theme JSON to `c-nerd2/themes/[name].omp.json`
2. Show the command to activate: `oh-my-posh init pwsh --config 'path/to/theme.json' | Invoke-Expression`
3. Offer to add it to PowerShell profile

**Prompt themes (Starship):**
1. Save the TOML to `c-nerd2/themes/[name].starship.toml`
2. Show how to set `STARSHIP_CONFIG` env var

**Color schemes (generic):**
1. Save to `c-nerd2/themes/[name].json`
2. Show apply instructions for the user's terminal

**Nerd Fonts:**
1. Provide the direct download URL
2. Show install instructions (download → extract → right-click Install)
3. Recommend setting the font in Windows Terminal settings

### Step 3 — Log Install

Append to `installed.json`:

```json
{
  "name": "Theme Name",
  "source": "source-site.com",
  "category": "Color Schemes",
  "date": "2026-03-13",
  "target": "windows-terminal",
  "filePath": "C:\\Users\\chad\\.claude\\skills\\c-nerd2\\themes\\theme-name.json",
  "backupPath": "path/to/settings.json.bak.timestamp (if applicable)"
}
```

### Step 4 — Confirm

Show the applied theme preview (re-render with ANSI) and confirm installation.

AskUserQuestion:
```
🟢 Browse more themes
🔵 My Installs
🟣 Done — back to main menu
```

---

## My Installs Flow

### Step 1 — Read Log

Read `installed.json`. If empty, show "No themes installed yet" and offer to browse.

### Step 2 — List Installs

Show each installed theme with:
- Name
- Source site
- Install date
- Target (Windows Terminal / Oh My Posh / Starship / generic)
- File path

### Step 3 — Options

AskUserQuestion for each theme or general:

```
🟢 Preview [Theme Name] — re-render ANSI preview
🔵 Revert [Theme Name] — restore backup (if Windows Terminal scheme)
🟣 Remove entry — clear from install log
🟠 Browse more themes
🔴 Done
```

**Revert flow (Windows Terminal only):**
1. Check if `backupPath` exists in the install entry
2. If backup exists, restore it over current settings.json
3. Remove the install entry from `installed.json`
4. Confirm: "Reverted to backup — restart terminal"

**Remove entry:**
1. Delete the entry from `installed.json`
2. Optionally delete the saved theme file from `themes/`
3. Note: does NOT revert the applied settings (inform user)

---

## ANSI Preview Rendering Spec

This is the core visual feature. Every theme preview MUST use real ANSI escape codes.

### Color Conversion

Convert hex colors to ANSI truecolor:
- `#FF5555` → `\033[38;2;255;85;85m` (foreground)
- `#FF5555` → `\033[48;2;255;85;85m` (background)

### Palette Swatches

For a theme with 16 colors (standard ANSI), render two rows of 8 squares:

```bash
echo -e "\033[38;2;R;G;Bm■\033[0m \033[38;2;R;G;Bm■\033[0m ..."
```

Row 1: Black, Red, Green, Yellow, Blue, Magenta, Cyan, White (normal)
Row 2: Bright Black, Bright Red, Bright Green, Bright Yellow, Bright Blue, Bright Magenta, Bright Cyan, Bright White

### Sample Prompt

Use the theme's accent colors to render a mock prompt:
```bash
echo -e "\033[38;2;R;G;Bm~/projects\033[0m \033[38;2;R;G;Bm main\033[0m \033[38;2;R;G;Bm✔\033[0m \033[38;2;R;G;Bm❯\033[0m"
```

### Sample Output

Use theme's foreground + directory/file colors:
```bash
echo -e "\033[38;2;R;G;Bmdrwxr-xr-x\033[0m  \033[38;2;R;G;Bmsrc/\033[0m"
```

### Background Preview

Show a small block with the theme's background color:
```bash
echo -e "\033[48;2;R;G;Bm    Background    \033[0m"
```

---

## Important Rules

- This skill is SEPARATE from /c-nerd (status bar) — never touch c-nerd config
- Always use ANSI escape codes for color rendering (per Chad's Terminal Color Rule)
- Always backup before modifying Windows Terminal settings.json
- Log every install to installed.json
- When adding new sites to sources.json, validate the URL is reachable first
- Theme files saved to `themes/` use descriptive filenames: `catppuccin-mocha.json`, `dracula.omp.json`, etc.
- All output wrapped in hub color box (per Chad's format rules)
- Use AskUserQuestion for navigation menus
