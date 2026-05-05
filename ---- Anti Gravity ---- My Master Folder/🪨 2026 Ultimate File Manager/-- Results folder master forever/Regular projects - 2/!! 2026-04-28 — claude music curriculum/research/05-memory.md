---
id: 05
title: Memory
icon: 🧠
difficulty: easy
---

## What it is
Claude Code's persistent memory system uses plain markdown files that survive across sessions. CLAUDE.md files (which you write) and auto memory files at `~/.claude/projects/<project>/memory/MEMORY.md` (which Claude writes itself) load automatically at session start, carrying knowledge — preferences, build commands, business context — into every new conversation.

## Why it matters
You stop re-explaining the same things every session. Coding standards, artist roster names, client preferences, recurring workflows — Claude reads them on launch. The first 200 lines (or 25KB) of MEMORY.md load every session. That's compounding leverage: every correction you make today saves time forever.

## Music-business angle (200 words)
For Ahead Artist Solutions, persistent memory is the difference between starting from scratch each Monday and showing up already in flow. Drop your full artist roster into `CLAUDE.md` — names, genres, distribution status, royalty splits, contact preferences — and every session begins with that context loaded. Memory files can hold your DistroKid login workflow, the 26-category music-biz dashboard structure, your standard press-release format, your playlist pitch templates, and the verbatim tone you use with each artist. When you triage 50 fan emails on Friday, Claude already knows which artists you manage, who's mid-release, and which clients prefer formal vs. casual replies. When A&R discovery surfaces a new prospect, Claude reuses the genre-tag taxonomy you defined three months ago. Royalty analysis, beat catalog tagging, mastering checklists, lyric-research conventions — all become reusable across sessions. Auto memory captures your corrections without you typing them: tell Claude once that "Artist X always wants their press release under 250 words," and that preference persists. The memory directory is plain markdown — auditable, editable, version-controllable — so your business knowledge becomes a real asset, not a chat log lost on refresh.

## Try-it (2-min exercise)
Open Claude Code in your music-biz project folder. Run `/memory` to see what's currently loaded. Then create a `./CLAUDE.md` with three lines: your top artist's name, your default press-release length, and your preferred email tone. Restart Claude and ask "what do you know about my roster?" — confirm the context loaded.

## Quiz
1. Where does Claude Code's auto memory live by default?
   - A. `~/.config/claude/cache.json`
   - B. `~/.claude/projects/<project>/memory/MEMORY.md` **CORRECT**
   - C. The Anthropic cloud
   - D. Inside the OS keychain

2. How much of `MEMORY.md` is loaded at session start?
   - A. The whole file regardless of size
   - B. Only files under 50KB
   - C. The first 200 lines or 25KB, whichever comes first **CORRECT**
   - D. Nothing — you must run `/load` manually

3. What's the right reason to keep a recurring fact in `CLAUDE.md` versus chat?
   - A. Chat is faster than file IO
   - B. So Claude reloads it every session without you re-typing it **CORRECT**
   - C. CLAUDE.md is encrypted; chat isn't
   - D. CLAUDE.md gets prioritized over the system prompt

## Sources
- https://code.claude.com/docs/en/memory
- https://docs.claude.com/en/docs/claude-code/memory
- https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts
