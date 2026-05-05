---
id: 11
title: Files API
icon: 📎
difficulty: medium
---

## What it is
The Files API (beta header `anthropic-beta: files-api-2025-04-14`) lets you POST to `/v1/files` once and receive a `file_id` you can reference in any future Messages call as a `document` or `image` content block source. Supports PDFs, plain text, and images (JPEG/PNG/GIF/WebP) up to 500 MB per file, 500 GB per org. Files persist until deleted.

## Why it matters
Stop re-uploading. A 40 MB master EPK PDF should travel the wire once, not on every call. Files API also keeps requests under the 32 MB request-size cap, makes prompt caching effective on document-heavy workflows, and gives you a workspace-shared store every API key on the team can reference — meaning the studio Mac, Chad's laptop, and the deployed automation can all hit the same uploaded contract.

## Music-business angle (200 words)
Ahead Artist Solutions has dozens of recurring documents that Claude needs to read week after week — contracts, brand guides, master EPKs, legal templates, lyric sheets, royalty statements. With the Files API, each one becomes a permanent `file_id`. Upload Bobby's signed management agreement once → reference `file_id: file_011CN...` every time a question comes up about MFN clauses, term, territory, or commission rates. Upload the Anti Gravity brand guide → reference it inside every album-art QC and social-post review prompt. Upload a 90-page royalty statement PDF → ask Claude monthly to summarize earnings deltas, flag DSP outliers, and project next month. Upload an artist's full press kit (PDF) → reuse it as context when drafting bios, pitch emails, sync-license cover letters. Upload a folder of high-res cover art images → reference them by `file_id` inside Vision-driven QC chains without busting payload limits. Pair Files API with prompt caching and the same 80K-token reference deck (contract templates + brand bible + recap-form schema) gets cached once and reused across every client interaction at a fraction of the token cost. Files persist until you DELETE them — they are workspace-scoped, not per-key, so a teammate can pick up the same file_id you uploaded yesterday.

## Try-it (2-min exercise)
`curl -X POST https://api.anthropic.com/v1/files -H "x-api-key: $KEY" -H "anthropic-version: 2023-06-01" -H "anthropic-beta: files-api-2025-04-14" -F "file=@brand-guide.pdf"`. Save the returned `id`. Send a Messages call with a `document` block whose `source: {type: "file", file_id: "<id>"}` and ask "Summarize the brand voice rules in 5 bullets."

## Quiz
1. What beta header is required to use the Files API?
   - A) `files-api-2025-04-14` CORRECT
   - B) `files-beta-2024-12-01`
   - C) `documents-2025-01-15`
   - D) None — it is GA

2. What is the maximum file size per upload?
   - A) 32 MB
   - B) 100 MB
   - C) 500 MB CORRECT
   - D) 5 GB

3. How do you reference an uploaded PDF in a Messages call?
   - A) `{type: "text", text: "<file_id>"}`
   - B) `{type: "document", source: {type: "file", file_id: "..."}}` CORRECT
   - C) Pass `file_id` as a top-level Messages parameter
   - D) Inline the PDF base64 alongside the file_id

## Sources
- https://docs.claude.com/en/docs/build-with-claude/files
- https://docs.claude.com/en/api/files-create
- https://docs.claude.com/en/docs/build-with-claude/pdf-support
