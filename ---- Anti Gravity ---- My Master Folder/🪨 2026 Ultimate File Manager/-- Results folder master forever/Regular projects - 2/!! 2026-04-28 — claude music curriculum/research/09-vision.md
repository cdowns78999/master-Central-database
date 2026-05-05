---
id: 09
title: Vision
icon: 👁
difficulty: medium
---

## What it is
Claude Vision lets the model accept images directly inside a message as `image` content blocks. You can pass a base64-encoded image, a URL, or a `file_id` from the Files API. Supported formats are JPEG, PNG, GIF, and WebP, up to 8000x8000 px and 100 images per request on 200K-context models.

## Why it matters
You stop describing pictures in words and start handing the actual pixels to the model. That collapses entire workflows — QC review, OCR, screenshot triage, visual brand audits — from "human looks, types notes, pastes to Claude" into a single API call. For a small music-business team, vision turns Claude into an extra pair of eyes that never gets tired.

## Music-business angle (200 words)
Ahead Artist Solutions runs on visual artifacts. Vision pulls leverage from every one of them. Album-art QC: pass the final 3000x3000 cover to Claude with the artist's brand sheet and ask "does this match the palette, is the typography legible at thumbnail size, are there any DSP-banned elements (URLs, contact info, parental warnings off)?" Streaming dashboard OCR: drop a Spotify for Artists screenshot in and have Claude pull stream counts, top cities, save-to-listener ratios into structured JSON for the weekly client report. Contract scanning: photograph a paper sync license, ask Claude to extract term, territory, MFN clauses. Social-post visual review: feed a draft Instagram carousel and have Claude flag low-contrast text, brand-guide drift, or missing logos. Gig-poster generation review: when a designer sends a poster mockup, Claude checks date/venue/ticket-link accuracy against a brief. Fan DM screenshot triage: Chad receives a wall of DM screenshots after a release — Claude clusters them by sentiment, flags potential booking inquiries vs. fan mail. Sheet music reading: photograph a chord chart and ask Claude to transpose. Waveform inspection: drop a DAW screenshot and ask if any track is clipping. Brand-style consistency across press kit, EPK, website hero — all single-shot.

## Try-it (2-min exercise)
Take a screenshot of one Spotify for Artists page. POST it to `/v1/messages` as a base64 `image` block with the prompt "Extract every numeric metric you see and return strict JSON." Time how long that takes vs. retyping by hand.

## Quiz
1. What is the maximum image dimension Claude Vision accepts in a standard request?
   - A) 4096x4096 px
   - B) 8000x8000 px CORRECT
   - C) 16000x16000 px
   - D) Unlimited

2. Which format is NOT supported by Claude Vision?
   - A) JPEG
   - B) PNG
   - C) BMP CORRECT
   - D) WebP

3. To send a high-volume of images and keep request payload small, what is the recommended pattern?
   - A) Inline every image as base64
   - B) Upload via Files API and reference by `file_id` CORRECT
   - C) Host on a public CDN and pass URLs only
   - D) Concatenate images into a single tall image

## Sources
- https://docs.claude.com/en/docs/build-with-claude/vision
- https://docs.claude.com/en/api/messages
- https://docs.claude.com/en/docs/build-with-claude/files
