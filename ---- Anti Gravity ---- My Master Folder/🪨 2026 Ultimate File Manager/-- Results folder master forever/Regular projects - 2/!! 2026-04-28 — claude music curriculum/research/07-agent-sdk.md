---
id: 07
title: Agent SDK
icon: 🤖
difficulty: medium
---

## What it is
The Claude Agent SDK (`@anthropic-ai/claude-agent-sdk` for TypeScript, `claude-agent-sdk` for Python) is a library that gives you Claude Code's tool loop, built-in tools (Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch), hooks, subagents, MCP servers, and session management — programmable from your own code. You hand Claude a prompt and an allowed-tools list; the SDK runs the agent loop autonomously.

## Why it matters
You stop hand-rolling the tool-execution loop yourself. Instead of building a "send message → check stop_reason → run tool → return result → repeat" harness with the raw Client SDK, you `npm install @anthropic-ai/claude-agent-sdk` and Claude handles the loop. Hooks let you log, validate, or block actions; subagents let you parallelize. It's the difference between assembling parts and shipping a working agent.

## Music-business angle (200 words)
For Ahead Artist Solutions, the Agent SDK is the path from "Claude helped me draft this once" to "Claude runs this every morning automatically." Build a fan-email triage agent: a Node script that pulls from Gmail (using the Gmail MCP server), uses Claude with `allowedTools: ["Read", "Write", "Bash"]` to classify and draft replies, and logs each draft to an audit file via a `PostToolUse` hook. Build an A&R discovery scout that takes a Spotify CSV, runs WebSearch + WebFetch to research each prospect, and writes a markdown dossier per artist. Build a royalty reconciler that diffs DistroKid statements against your contract terms and flags discrepancies. Build a release-day orchestrator: subagents in parallel — one drafting the press release, one preparing the playlist pitches, one queueing socials, one updating the artist's EPK. Build a beat-catalog tagger: pass it a folder of WAVs and metadata, get back consistent BPM/key/mood tags. Each is a small Python or TypeScript file. With sessions, the agent remembers prior context across runs, so Tuesday's playlist pitcher already knows what it pitched Monday. The SDK lets you wrap your music business in agents that actually run on a schedule, not just chat windows.

## Try-it (2-min exercise)
Run `npm install @anthropic-ai/claude-agent-sdk`, set `ANTHROPIC_API_KEY`, and write a 6-line script: `import { query } from "@anthropic-ai/claude-agent-sdk";` then iterate `query({ prompt: "List all .mp3 files in this folder and create a CSV index", options: { allowedTools: ["Bash", "Glob", "Write"] } })`. Run it in your beat-catalog folder.

## Quiz
1. Which npm package gives you the TypeScript Agent SDK?
   - A. `@anthropic/claude`
   - B. `@anthropic-ai/sdk`
   - C. `@anthropic-ai/claude-agent-sdk` **CORRECT**
   - D. `claude-code`

2. What's the main difference between the Agent SDK and the raw Client SDK?
   - A. The Agent SDK only works in Python
   - B. The Agent SDK runs the tool-execution loop for you; the Client SDK requires you to implement it **CORRECT**
   - C. The Agent SDK is free; the Client SDK is paid
   - D. The Agent SDK can't call Claude — only Claude Code can

3. Which is NOT a built-in tool in the Agent SDK?
   - A. Read
   - B. Bash
   - C. WebSearch
   - D. SendEmail **CORRECT**

## Sources
- https://code.claude.com/docs/en/agent-sdk/overview
- https://docs.claude.com/en/api/agent-sdk/overview
- https://github.com/anthropics/claude-agent-sdk-typescript
