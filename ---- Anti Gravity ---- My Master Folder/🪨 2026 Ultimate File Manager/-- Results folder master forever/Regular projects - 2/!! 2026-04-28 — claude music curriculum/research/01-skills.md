---
id: 01
title: Skills
icon: 🎯
difficulty: easy
---

## What it is
Skills are reusable procedures Claude Code loads on demand. Each skill is a folder containing `SKILL.md` with YAML frontmatter (`name`, `description`, optional `allowed-tools`, `disable-model-invocation`, `context: fork`) plus markdown instructions and any supporting files. Claude can auto-trigger them based on the description, or you can fire them manually with `/skill-name`.

## Why it matters
Skills turn repeat playbooks into one-line commands. The body only loads when invoked, so a 50-page release checklist costs zero context until you actually use it. They standardize work across artists and team members, version-control your business knowledge, and let Claude orchestrate complex multi-step jobs without re-pasting instructions every session.

## Music-business angle (200 words)
For Ahead Artist Solutions, skills are how you bottle up the operations playbook so every artist gets the same A-grade workflow.

Concrete plays:

- `/release-checklist` — drafts DistroKid metadata, ISRC checks, splits, pre-save link, mastering LUFS verification, art dimension review.
- `/press-release` — your existing skill, but extended with frontmatter `arguments: [artist, song, genre]` for one-shot generation from a row.
- `/royalty-audit` — pull a CSV from PROs/distributors, reconcile against splits sheet, flag missing payees and underpaid streams.
- `/playlist-pitch` — given track metadata + mood, draft 3 curator pitches with hook variants and supporting press quotes.
- `/lyric-clear` — scans lyrics for sample/quote risk, flags lines that need clearance before release.
- `/ar-discovery` — `context: fork` skill that spawns an Explore subagent over a Spotify scrape folder and returns top 10 unsigned artists matching your roster sound.
- `/fan-triage` — classifies fan emails (booking / collab / sync / fan / spam) and drafts replies in artist voice.
- `/social-pack` — generates Reels caption + 3 TikTok hooks + IG carousel script + tweet thread for a single release event.

Store under `~/.claude/skills/` so they follow you across all artist project folders.

## Try-it (2-min exercise)
Run `mkdir -p ~/.claude/skills/release-tagline` then create `SKILL.md` with frontmatter `name: release-tagline`, `description: Write a 12-word release tagline for a song. Use when drafting press kits.` and a body that says "Given the song info, write 3 tagline options under 12 words, hook-first." Restart Claude Code and type `/release-tagline "Indie pop song about late-night drives"`.

## Quiz
1. Where do personal skills live?
   - a) `~/skills/`
   - b) `~/.claude/commands/`
   - c) `~/.claude/skills/<skill-name>/SKILL.md`  ← CORRECT
   - d) `/etc/claude/skills/`
2. Which frontmatter field stops Claude from auto-triggering a skill?
   - a) `auto: false`
   - b) `disable-model-invocation: true`  ← CORRECT
   - c) `manual-only: yes`
   - d) `user-invocable: false`
3. What does `context: fork` do?
   - a) Forks the git repo
   - b) Creates a backup of SKILL.md
   - c) Runs the skill in an isolated subagent context  ← CORRECT
   - d) Opens a new terminal tab

## Sources
- https://code.claude.com/docs/en/skills
- https://docs.claude.com/en/docs/claude-code/skills
- https://agentskills.io
