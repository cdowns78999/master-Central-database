---
name: c3-chad-skills-creo
description: Skill creator to my liking — new skills or update existing ones
---

# c3-chad-skills-creo

Create or update custom slash command skills for Ahead Artist Solutions.

## Usage

```
/c3-chad-skills-creo
```

## Instructions

IMPORTANT: Use the AskUserQuestion tool for all menu selections. Keep it clean, minimal ASCII headers, scannable.

### Step 0: Scan Existing Skills

Read all folder names in `C:\Users\chad\.claude\skills\` to get the current skill list. Store this for duplicate detection and update routing.

### Step 1: Greet + Detect Mode

Print this header:
```
  ─── skill creo ───────────────────
```

Then use **AskUserQuestion**:
- Question: "New skill or updating an existing one?"
- Options:
  1. "New Skill" — description: "build a brand new slash command from scratch"
  2. "Update Existing" — description: "modify a skill that already exists"

---

## Path A: New Skill

### A1: Gather Info (Single Query)

Use **AskUserQuestion** to collect the basics in one shot:

Print:
```
  ─── new skill ────────────────────
```

Then ask in plain text: "Give me the rundown — what's the skill name, what does it do, and how should it work when triggered?"

Wait for user's full paste/description.

### A2: Check for Duplicates

Compare the proposed skill name against the existing skill folder list from Step 0.
- If a folder with the same name (or very similar name) already exists, warn the user:
  ```
    ⚠ a skill called "{name}" already exists
    did you mean to update it instead?
  ```
  Then use **AskUserQuestion**: "Create anyway or switch to update?" with options:
  - "Create with different name" — description: "I'll pick a new name"
  - "Switch to update mode" — description: "edit the existing skill instead"

### A3: Draft the Full SKILL.md

Build the complete SKILL.md file in text, following this exact structure:

```yaml
---
name: {skill-name}
description: {one-line description}
---
```

Then the full body with:
- `# {skill-name}` heading
- One-line summary
- `## Usage` with code block showing `/skill-name`
- `## Instructions` with numbered steps
- Use the same patterns as existing skills:
  - AskUserQuestion for all user interactions
  - Minimal ASCII headers between steps
  - Backup protocol if the skill modifies files
  - Clear step numbering
  - Signal/confirmation block at the end

### A4: Preview + Revise

Show the full drafted SKILL.md content in a clean preview. Print:
```
  ─── preview ──────────────────────
```

Then display the entire SKILL.md content.

Then use **AskUserQuestion**: "How's it look?" with options:
- "Ship it" — description: "save and activate the skill"
- "Change something" — description: "I want to tweak it first"

If "Change something": ask what to change, apply edits, show preview again. Loop until approved.

### A5: Save + Celebrate

Once approved:

1. Create the skill folder: `C:\Users\chad\.claude\skills\{skill-name}\`
2. Write the SKILL.md file to that folder
3. Print this confirmation block:

```
  ─── created ──────────────────────

  ✓ skill saved · {skill-name}
  ✓ path · C:\Users\chad\.claude\skills\{skill-name}\SKILL.md
  ✓ invoke · /{skill-name}

  ──────────────────────────────────
```

4. Then IMMEDIATELY blast 100 cute emojis in one block — mixed variety, celebratory, colorful. This is the signal that the skill was born. Example:

```
🎉🌟✨💫🎊🥳🌈🦋🌸🎀💖🌺🍀🎯🔥💎🦄🌻🍭🎨🪄✨🌟🎉💫🎊🥳🌈🦋🌸🎀💖🌺🍀🎯🔥💎🦄🌻🍭🎨🪄✨🌟🎉💫🎊🥳🌈🦋🌸🎀💖🌺🍀🎯🔥💎🦄🌻🍭🎨🪄✨🌟🎉💫🎊🥳🌈🦋🌸🎀💖🌺🍀🎯🔥💎🦄🌻🍭🎨🪄✨🌟🎉💫🎊🥳🌈🦋🌸🎀💖🌺🍀🎯🔥💎🦄🌻🍭🎨
```

5. **Auto-sync directory** — immediately add the new skill to BOTH directory files:
   - Read `C:\Users\chad\.claude\skills\c-dir-space\registry.md` and add a row in the correct table section
   - Read `📙 library/skills/index.html` (`C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\💎💎 - - - beginning - - - 💎💎\📙-- -- - -- 📙 library\skills\index.html`) and add a `<div class="skill-row">` in the correct HTML section, update footer count
   - Ask for 3 tags if not already provided during the build
   - Ask for color dot if it's a C Series skill
   - Verify `</body></html>` still intact after edit

---

## Path B: Update Existing Skill

### B1: Pick the Skill

Print:
```
  ─── update skill ─────────────────
```

Use **AskUserQuestion** with the existing skill names as options (dynamically built from Step 0 scan). Max 4 options shown — if more than 4 skills exist, show the 4 most recently modified and include "Other" as a catch-all.

- Question: "Which skill are we updating?"
- Options: dynamically generated from skill folder names

### B2: Load + Show Current

Read the selected skill's SKILL.md file. Print:
```
  ─── current: {skill-name} ────────
```

Display a summary of the current skill (name, description, key behaviors — not the entire file unless it's short).

Then say: "What's the update?"

Wait for user input.

### B3: Apply + Preview

Apply the requested changes to the SKILL.md content. Show the updated version:
```
  ─── updated preview ──────────────
```

Display the changed sections (or full file if major rewrite).

Then use **AskUserQuestion**: "Good to save?" with options:
- "Save it" — description: "overwrite the existing SKILL.md"
- "Change more" — description: "keep editing"

Loop until approved.

### B4: Save + Confirm

Once approved:

1. Write the updated SKILL.md to the existing skill folder (overwrite)
2. Print:

```
  ─── updated ──────────────────────

  ✓ skill updated · {skill-name}
  ✓ path · C:\Users\chad\.claude\skills\{skill-name}\SKILL.md
  ✓ changes · saved

  ──────────────────────────────────
```

No emoji blast for updates — keep it clean and professional.

---

## Important Notes

- NEVER create duplicate skill folders — always check existing folders first
- NEVER overwrite a skill without showing a preview and getting explicit approval
- All new skills MUST follow the standard SKILL.md frontmatter format (name + description in YAML)
- All new skills MUST use AskUserQuestion for interactive steps
- All new skills that modify files MUST include a backup protocol step
- Keep the skill directory at `C:\Users\chad\.claude\skills\` — nowhere else
- Skill names should be lowercase, hyphenated (e.g. `my-cool-skill`)
- The emoji blast is ONLY for new skill creation — never for updates
- When updating, always read the CURRENT file first — don't assume you know what's in it
