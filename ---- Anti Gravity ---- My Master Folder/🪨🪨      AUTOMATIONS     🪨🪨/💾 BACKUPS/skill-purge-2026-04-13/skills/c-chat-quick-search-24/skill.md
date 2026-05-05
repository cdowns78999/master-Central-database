---
name: c-chat-quick-search-24
description: All-chats summary for last 24 hours — 2 parallel sub-agents, resume commands, star-flagged search chats
---

# /c-chat-quick-search-24

Full visual summary of ALL Claude Code conversations from the last 24 hours.
2 sub-agents fire in parallel — split the list evenly — results merge into one clean report with resume commands + ⭐ flags.

---

## Step 1 — Find ALL conversations from last 24h

Run this bash command:

```bash
find /c/Users/chad/.claude/projects/ -maxdepth 2 -name "*.jsonl" -mtime -1 -printf '%T@ %p\n' 2>/dev/null | sort -rn | awk '{print $2}'
```

Returns all file paths from last 24h, sorted **newest → oldest**.

- 0 files → report "No chats in the last 24h" in the Hub box and stop.
- Extract the **conversation ID** from each path (the UUID filename without `.jsonl`) — you'll need it for resume commands.

---

## Step 2 — Split into 2 halves

Divide the full list in half:

| Agent | Files |
|-------|-------|
| **Agent A** | first half (most recent) |
| **Agent B** | second half (oldest) |

If odd count: Agent A gets the extra file. If only 1 file: use 1 agent.

---

## Step 3 — Launch 2 sub-agents in parallel

Use the **Agent tool** (general-purpose). Send BOTH in ONE message — true parallel launch.

Each sub-agent gets this prompt with its file paths filled in:

---
> You are analyzing a set of Claude Code conversation files.
>
> For EACH file path provided, run this bash command:
> ```bash
> { head -10 "FILE_PATH"; echo "---TAIL---"; tail -50 "FILE_PATH"; }
> ```
>
> From each file's output, extract:
> 1. **topic** — from the head block (first user message text), 3-5 word title
> 2. **status** — from the tail block:
>    - ✅ complete: "done", "built", "fixed", "created", "live", "all set", clean natural ending
>    - 🟡 needs pickup: unresolved errors, mid-task stop, "Request interrupted by user", unanswered question, debugging loop
> 3. **star flag** ⭐ — add if the chat is primarily the USER ASKING/SEARCHING for something (e.g. "where is X", "find the file", "which conversation", "what was the job", "show me", "look at", "search for") rather than building/creating/fixing
> 4. **resume_id** — the UUID from the file path (filename without `.jsonl`)
>
> Return ONLY this format for each file — no extra text, no box:
>
> ```
> CHAT:
> topic: [3-5 word title, title case]
> status: ✅ complete | 🟡 needs pickup
> star: yes | no
> note: [one short phrase — only if 🟡, omit if ✅]
> resume_id: [UUID]
> ```
>
> Files to analyze:
> FILE_PATH_1
> FILE_PATH_2
> FILE_PATH_3
> ... (all files for this agent)
---

---

## Step 4 — Collect + render final report

Wait for both sub-agents to finish. Combine + number their output (newest → oldest) into the Hub Color Stack box:

```
🔵🟢🟣🔴🟠  claude  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   QUICK SEARCH — Last 24h  (N chats · 2 agents)

   1. ✅  Wing Dashboard Drop Zone Fix
         claude --resume abc123ef-...
   2. ⭐ 🟡  Find VR Label Conversation
         → search interrupted mid-task
         claude --resume def456ab-...
   3. ✅  Gmail Scraper OAuth Fix
         claude --resume 789xyz01-...

   /c-launch-the-day · /c-churn · /c-1-home-mega-update · /c-payback · /c-end-of-the-day

╰────────────────────────────────────────────────╯
```

**Format rules:**
- Numbered newest → oldest
- ✅ = complete, 🟡 = needs pickup
- ⭐ prefix = user was searching/asking in that chat (not building)
- Every entry gets an indented `claude --resume {id}` line below the title
- 🟡 entries: add a `→ short note` line (4–6 words) between title and resume command
- If fewer chats exist, just show what's there
- Show total count in header: `(N chats · 2 agents)`
- **Tone:** Nerdy Science Girl (Female) — precise, smooth, sly sign-off. Kaomoji `(⁄ ⁄•⁄ω⁄•⁄ ⁄)` at the end

---

## Performance Notes

- Head + tail only per file — never full reads (files can be megabytes)
- Both agents fire simultaneously → total time ≈ one agent's read time
- Skip files under 5 lines (stubs / empty sessions)
- Target: **under 25 seconds total**
