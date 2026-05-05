---
id: 03
title: MCP Servers
icon: 🔌
difficulty: medium
---

## What it is
Model Context Protocol (MCP) is an open spec for exposing external tools/services to Claude as first-class tools. An MCP server runs as a process (stdio), an SSE endpoint, or an HTTP server, and registers tools Claude can call. Claude Code already ships connectors for Gmail, Google Calendar, Google Drive, Slack, GitHub, PayPal, and many more — all configured per-user or per-project.

## Why it matters
MCP closes the loop between Claude's reasoning and your real-world systems. Instead of copy-pasting between tools, Claude can read your inbox, schedule a Calendar event, drop a file into Drive, post to Slack, and process a PayPal payout — all in one turn. It's the difference between Claude as a chat partner and Claude as your operations layer.

## Music-business angle (200 words)
MCP is where Ahead Artist Solutions stops being a folder of HTML mockups and becomes a wired-up business cockpit.

Concrete plays per MCP server:

- Gmail MCP — `search_threads` for `label:fan-mail` or `label:sync-licensing`, auto-draft replies via `create_draft`, label routing (`label_thread`) so fan / press / business mail self-sorts each morning.
- Google Calendar MCP — `suggest_time` for studio bookings across 3 artists' calendars, auto-create release-day tasks (`create_event`), respond to collab requests.
- Google Drive MCP — drop the freshly written press release into the right artist's release folder, pull the latest master WAV into the DistroKid prep folder, share a press kit link with a journalist.
- PayPal MCP — read incoming royalty splits, send payouts to featured artists right after a release lands.
- Slack MCP (third-party) — push "track went live" notice to #releases, alert mastering channel when a WAV lands.
- A custom MCP — wrap your DistroKid scraper or Spotify-for-Artists API as a stdio MCP so `/release-checklist` can pull live stream counts.

Configure via `claude mcp add` or `~/.claude/settings.json` — each server is one block.

## Try-it (2-min exercise)
Run `claude mcp list` to see what's already wired up. Then ask Claude: "Use the Gmail MCP — search for threads with `is:starred` from the last 7 days and return subject + sender." If Gmail isn't connected yet, run `claude mcp add` and pick the Gmail connector.

## Quiz
1. MCP stands for:
   - a) Multi-Channel Protocol
   - b) Model Context Protocol  ← CORRECT
   - c) Managed Claude Plugin
   - d) Modular Connector Pipeline
2. Which is NOT a standard MCP transport?
   - a) stdio
   - b) SSE
   - c) HTTP
   - d) FTP  ← CORRECT
3. Best fit for sending a release-day post to your team channel:
   - a) Skill with `context: fork`
   - b) A Slack MCP server's post-message tool  ← CORRECT
   - c) A PreToolUse hook
   - d) A `general-purpose` subagent

## Sources
- https://code.claude.com/docs/en/mcp
- https://docs.claude.com/en/docs/claude-code/mcp
- https://modelcontextprotocol.io
