---
id: 02
title: Subagents
icon: 🤖
difficulty: easy
---

## What it is
Subagents are specialized AI workers spawned via the `Agent` (Task) tool with a `subagent_type` parameter. Each runs in its own isolated context window with its own system prompt, allowed tools, and permissions. Built-in types include `Explore` (read-only codebase research), `Plan` (planning), and `general-purpose`. Custom subagents live in `.claude/agents/` and `~/.claude/agents/` as markdown files with frontmatter.

## Why it matters
Subagents protect your main conversation context. Heavy research, log scraping, or file crawling happens in the worker's own window — only a clean summary returns. You can fire many in parallel for true multi-track work, route low-stakes jobs to cheaper models like Haiku for cost control, and enforce constraints by giving each subagent a narrow tool set.

## Music-business angle (200 words)
Subagents are how you run a label-grade ops desk without choking your main session.

Concrete plays:

- Parallel A&R sweep — fire 4 `Explore` subagents at once: one scrapes Bandcamp by tag, one parses SoundCloud trending, one reads a TikTok export CSV, one crawls a local lyric folder. Each returns its own top-5; you compare in the main thread.
- Royalty reconciler — a `general-purpose` subagent ingests one distributor CSV at a time and returns variance flags. Run one per platform (Spotify, Apple, Amazon, YouTube, Tidal) in parallel — five workers, one summary.
- Press list builder — subagent crawls your `📙 library/press-contacts/` folder, dedupes by outlet + email, returns a clean roster keyed to genre.
- Lyric-clearance scout — subagent reads the entire upcoming-release folder, returns a per-track risk grade with verbatim flagged lines.
- Tour-routing planner — `Plan` subagent reads venue capacities + drive-time matrix, returns 3 routings.
- Fan-DM classifier — Haiku-class subagent batches 200 IG DMs into intent buckets so you only personally read the booking-grade ones.

Pair subagents with skills (`context: fork` + `agent: Explore`) to make any skill a self-contained worker.

## Try-it (2-min exercise)
In Claude Code, type: "Use the Agent tool to spawn an Explore subagent that lists every `.wav` file under my latest mix folder, grouped by artist subfolder, and returns just the count per artist." Watch your main context stay tiny while the subagent does the crawl.

## Quiz
1. Which parameter selects a subagent type when spawning?
   - a) `agent_kind`
   - b) `subagent_type`  ← CORRECT
   - c) `worker_class`
   - d) `task_type`
2. What's the main reason to use a subagent for a long file crawl?
   - a) It's the only way to read files
   - b) It avoids polluting the main context window with raw output  ← CORRECT
   - c) It's required for `Glob`
   - d) Subagents are faster at Bash
3. Where do custom user-level subagents live?
   - a) `~/.claude/agents/`  ← CORRECT
   - b) `~/.claude/skills/`
   - c) `~/agents/`
   - d) `/usr/local/claude/agents/`

## Sources
- https://code.claude.com/docs/en/sub-agents
- https://docs.claude.com/en/docs/claude-code/sub-agents
- https://code.claude.com/docs/en/context-window
