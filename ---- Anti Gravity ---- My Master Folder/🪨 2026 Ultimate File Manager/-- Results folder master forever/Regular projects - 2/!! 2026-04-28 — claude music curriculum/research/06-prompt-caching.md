---
id: 06
title: Prompt Caching
icon: 💾
difficulty: medium
---

## What it is
Prompt caching lets you mark large reusable chunks of context (system prompt, docs, examples) with a `cache_control: {"type": "ephemeral"}` breakpoint in your API request. Anthropic stores that prefix server-side, and subsequent calls that match it read from cache at 10% of the normal input price. Default TTL is 5 minutes; an extended 1-hour TTL is available.

## Why it matters
Cache hits cost 10% of base input tokens — a 90% input discount on the cached portion. Up to 4 cache breakpoints per request, with a 20-block lookback window. For agents that reference the same large knowledge base every call, this turns a budget-burner into a sustainable workflow. The 5-minute TTL refreshes every time the cache is reused, so active conversations stay warm at no extra cost.

## Music-business angle (200 words)
Most music-biz workflows are repetitive context glued to small variable inputs — and that's exactly what prompt caching is built for. Cache your full artist roster + brand voice guide + DistroKid release-checklist as the static prefix; vary only the song title or fan email at the end. A press-release drafter that pulls from a 30-page brand bible costs a few cents per draft instead of a few dollars. Royalty/streaming analytics over the same Spotify/Apple Music CSV schemas? Cache the schema docs and example queries — only the specific question changes. Lyric-research agents can cache a genre lexicon and rhyme dictionary. Beat-catalog tagging can cache your taxonomy. A&R discovery agents can cache the artist-vetting rubric and red-flag criteria so each new prospect is just the variable input. Playlist pitching: cache the curator database and pitch template; vary only the track. Mastering QA: cache the loudness/EQ standards. Fan-email triage at scale: cache the artist personas and reply templates so each email is a tiny variable suffix. With the 1-hour TTL (2x write cost), you can run a half-day of catalog work without re-paying for the same context every call. The economic math is the difference between "AI is too expensive for this volume" and "let's automate it."

## Try-it (2-min exercise)
In an API call, attach a long system prompt (4,000+ tokens — your artist roster + brand-voice doc) and add `"cache_control": {"type": "ephemeral"}` on its last content block. Send two requests within 5 minutes that share that prefix. Check the response — `cache_creation_input_tokens` will be populated on the first call, `cache_read_input_tokens` on the second.

## Quiz
1. What's the cost of cache-hit input tokens vs. base input tokens?
   - A. Same price
   - B. 50% of base
   - C. 10% of base **CORRECT**
   - D. Free after the first hit

2. What is the default TTL for an ephemeral cache breakpoint?
   - A. 60 seconds
   - B. 5 minutes **CORRECT**
   - C. 1 hour
   - D. 24 hours

3. How many cache breakpoints can a single API request contain?
   - A. 1
   - B. 2
   - C. 4 **CORRECT**
   - D. Unlimited

## Sources
- https://docs.claude.com/en/docs/build-with-claude/prompt-caching
- https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- https://www.anthropic.com/news/prompt-caching
