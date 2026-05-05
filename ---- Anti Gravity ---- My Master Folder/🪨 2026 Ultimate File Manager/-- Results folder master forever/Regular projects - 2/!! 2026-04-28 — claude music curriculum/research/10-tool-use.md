---
id: 10
title: Tool Use
icon: 🔧
difficulty: medium
---

## What it is
Tool use (function calling) lets you declare functions Claude can invoke. Each tool is a `{name, description, input_schema}` JSONSchema object passed in the `tools` array. Claude returns `stop_reason: "tool_use"` and a `tool_use` block with arguments; your code executes the function and returns a `tool_result` block in the next user turn. Optional `tool_choice` forces or restricts calls.

## Why it matters
Without tool use, Claude is a brain with no hands. With tool use, Claude becomes an agent — it can hit your DB, call a Spotify endpoint, query a calendar, send an email, fetch a URL. You stop writing brittle "parse Claude's text into an action" code and start letting the model emit structured calls that match a strict schema (with `strict: true`, conformance is guaranteed).

## Music-business angle (200 words)
Ahead Artist Solutions has dozens of repeatable actions Claude could trigger. Define them as tools and the chat becomes a control panel. `lookup_artist(stage_name)` — query the Airtable client roster and return release schedule, contract status, DistroKid login pointer. `pull_streams(artist_id, range)` — call the Spotify for Artists API and return top tracks, listener counts, save rate. `submit_distrokid_release(artist_id, isrc, art_url, release_date)` — fire the Chrome-extension automation. `send_press_release(client_id, draft_id)` — push the press release through Mailchimp. `book_studio(date, hours, engineer)` — write to Google Calendar. `flag_contract(client_id, clause)` — open a Linear ticket. `log_recap_form(client_id, payload)` — insert into the recap database. `find_similar_artists(seed_artist, count)` — call the Last.fm API for marketing-target ideation. With these tools wired, Chad types "schedule mastering for Bobby next Thursday at noon, pull his last 30 days of streams, and draft a follow-up email" and Claude orchestrates all three in one turn — emitting three parallel tool_use blocks (Claude 4 supports parallel tool use), waiting for tool_results, then composing the final response.

## Try-it (2-min exercise)
Define one tool: `get_artist_streams` with `input_schema = {type: "object", properties: {artist_name: {type: "string"}, days: {type: "integer"}}, required: ["artist_name"]}`. Send "How did Lola do last week?" and inspect the `tool_use` block Claude emits — note how it filled in `days: 7`.

## Quiz
1. What stop_reason does Claude return when it wants to call a tool?
   - A) `end_turn`
   - B) `tool_use` CORRECT
   - C) `function_call`
   - D) `max_tokens`

2. How do you return a tool's output back to Claude?
   - A) Append it to the system prompt
   - B) Send a user message containing a `tool_result` block with the matching `tool_use_id` CORRECT
   - C) Call a separate `/v1/tool_results` endpoint
   - D) Embed it as plain text in the next user message

3. Which option guarantees Claude's tool calls match your JSONSchema exactly?
   - A) Setting `temperature: 0`
   - B) Adding `strict: true` to the tool definition CORRECT
   - C) Using `tool_choice: "any"`
   - D) Switching to Claude Haiku

## Sources
- https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview
- https://docs.claude.com/en/docs/agents-and-tools/tool-use/how-tool-use-works
- https://docs.claude.com/en/docs/agents-and-tools/tool-use/strict-tool-use
