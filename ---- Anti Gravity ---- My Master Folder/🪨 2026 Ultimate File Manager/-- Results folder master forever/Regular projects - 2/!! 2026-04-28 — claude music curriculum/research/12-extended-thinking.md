---
id: 12
title: Extended Thinking
icon: 🧠
difficulty: hard
---

## What it is
Extended thinking turns on visible reasoning blocks before Claude answers. Pass `thinking: {"type": "enabled", "budget_tokens": 10000}` on the request (must be less than `max_tokens`). Supported on the Claude 4 family. The response contains `thinking` blocks (with a cryptographic `signature`) followed by `text` blocks. Interleaved thinking — reasoning between tool calls — is unlocked by the beta header `interleaved-thinking-2025-05-14` and lets `budget_tokens` exceed `max_tokens`.

## Why it matters
Hard music-biz decisions rarely come from one shot. Royalty audits, contract clause review, A&R triage, marketing-mix planning — all benefit from Claude reasoning longer before answering, and from Claude reasoning *between* tool calls when an agent is chaining lookups. You see the thinking, you can audit it, and the model self-corrects in the open instead of hallucinating in the dark.

## Music-business angle (200 words)
Two Ahead Artist Solutions workflows where extended thinking pays for itself. (1) Royalty-statement audit: Claude has the PDF (Files API), pulls line items via tool calls (`get_isrc_metadata`, `lookup_dsp_rate`), and needs to reconcile expected vs. paid across 40+ tracks. With interleaved thinking, after every `tool_result` Claude reasons "this rate is 12% lower than the contracted rate, but the territory dropped to Tier-3 last month — flag for human review, but don't escalate." The signed `thinking` blocks become the audit trail you hand to the client. (2) Release strategy decisions: "Bobby has a single, 9 demos, a sync inquiry, and a festival slot in 90 days — what's the optimal sequencing?" Set `budget_tokens: 16000` and Claude weighs DSP playlist windows, sync deadlines, fan fatigue curves, and tour-promo overlap before answering. The thinking block shows you the trade-offs it considered, so you can push back on specific assumptions. Critical implementation note: when continuing a tool-use conversation with thinking enabled, you MUST pass the previous `thinking` block back inside the assistant message — drop it and the API rejects the call. The signature is what makes the chain auditable.

## Try-it (2-min exercise)
Send: `model: "claude-sonnet-4-6"`, `max_tokens: 16000`, `thinking: {type: "enabled", budget_tokens: 10000}`, `messages: [{role: "user", content: "Bobby has 8K monthly listeners, 60% from one playlist. Should he release a single now or build catalog first? Reason it through."}]`. Read the `thinking` block before the `text` block — that's the work.

## Quiz
1. What parameter activates extended thinking?
   - A) `reasoning: true`
   - B) `thinking: {"type": "enabled", "budget_tokens": N}` CORRECT
   - C) `cot: {"enabled": true}`
   - D) `mode: "deliberate"`

2. What beta header enables thinking BETWEEN tool calls?
   - A) `tools-2024-04-04`
   - B) `interleaved-thinking-2025-05-14` CORRECT
   - C) `extended-thinking-beta`
   - D) `agentic-loop-2025-03-01`

3. When continuing a tool-use turn with thinking enabled, what MUST you include in the assistant message?
   - A) Only the final text block
   - B) The previous `thinking` block (with its signature) alongside the `tool_use` block CORRECT
   - C) Nothing — the API restores it server-side
   - D) A fresh `thinking` parameter set to disabled

## Sources
- https://docs.claude.com/en/docs/build-with-claude/extended-thinking
- https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview
- https://docs.claude.com/en/release-notes/api
