---
id: 04
title: Hooks
icon: 🪝
difficulty: medium
---

## What it is
Hooks are shell commands, HTTP calls, MCP tool calls, prompts, or subagent fires that Claude Code triggers at specific lifecycle events — `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `Stop`, `SessionEnd`, plus async events like `FileChanged`. They're configured in `~/.claude/settings.json` (or `.claude/settings.json` per project) under a `hooks` block with matchers and handler arrays.

## Why it matters
Hooks make automation deterministic. Memory and instructions are advice — Claude may or may not follow them. A hook is the harness firing your script, every time, no matter what. That's how you enforce "always lint after edit," "block destructive commands," "log every tool call," or "auto-load this artist's context whenever a session starts in their folder."

## Music-business angle (200 words)
Hooks are the railguards of Ahead Artist Solutions — the policies that fire automatically so nothing slips.

Concrete plays:

- `SessionStart` hook — when you `cd` into an artist folder, the hook reads `artist.json` (genre, splits, contact, current release) and pushes it as `additionalContext` so Claude already knows the roster before your first prompt.
- `PreToolUse` on `Write|Edit` — block edits to `splits/*.json` unless the filename also matches today's date (prevents accidental overwrite of finalized agreements).
- `PostToolUse` on `Edit` of any `.md` press release — auto-run a script that checks word count, banned-words list (clichés like "eclectic" or "sonic journey"), and ISRC presence.
- `PostToolUse` on `Bash(distrokid-upload *)` — auto-post a Slack note via MCP so the team knows a release just shipped.
- `UserPromptSubmit` — if the prompt mentions an artist name, auto-inject that artist's brand voice doc as context.
- `Stop` hook — every time Claude finishes a turn, append a one-line summary to `daily-log.md` so you have a free audit trail.
- `FileChanged` on `royalties/*.csv` — kick off a reconciliation script the moment a new statement lands.

Hooks are configured per-project, so each artist folder can have its own ruleset.

## Try-it (2-min exercise)
Add this to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write",
        "hooks": [{ "type": "command",
          "command": "echo \"$(date) edited\" >> ~/edits.log" }] }
    ]
  }
}
```

Edit any file via Claude, then `cat ~/edits.log` — you have a free audit log.

## Quiz
1. Which event fires when Claude finishes responding?
   - a) `SessionEnd`
   - b) `PostToolUse`
   - c) `Stop`  ← CORRECT
   - d) `UserPromptSubmit`
2. To block a destructive command before it runs, use:
   - a) `PostToolUse` with `decision: "block"`
   - b) `PreToolUse` with `permissionDecision: "deny"`  ← CORRECT
   - c) `SessionStart` with `additionalContext`
   - d) `Stop` with exit code 2
3. Hook configs live in:
   - a) `~/.claude/hooks.yaml`
   - b) `~/.claude/settings.json`  ← CORRECT
   - c) `~/.claude/skills/SKILL.md`
   - d) `~/.bashrc`

## Sources
- https://code.claude.com/docs/en/hooks
- https://docs.claude.com/en/docs/claude-code/hooks
- https://code.claude.com/docs/en/settings
