---
id: 08
title: Computer Use
icon: 🖱️
difficulty: hard
---

## What it is
Computer Use is a beta capability that lets Claude control a desktop environment — taking screenshots, clicking at pixel coordinates, typing, scrolling, dragging, using keyboard shortcuts, and even zooming into screen regions. You provide a sandboxed VM (typically a Docker container running Xvfb on Linux); Claude emits actions, your harness executes them, returns a screenshot, and the agent loop continues until the task is done.

## Why it matters
This is how Claude reaches software that has no API. You enable it with the `computer-use-2025-11-24` beta header and the `computer_20251124` tool. The model takes screenshots, decides where to click, and drives the UI like a person. Latency is real, and it should run in a sandboxed VM with a human in the loop for sensitive actions — but the unlock is enormous: any web app, any desktop tool, any internal portal becomes automatable.

## Music-business angle (200 words)
The music industry runs on portals that nobody offers a clean API for: DistroKid's release uploader, Spotify for Artists, Apple Music for Artists, YouTube Studio analytics, SoundCloud's upload form, BMI/ASCAP registration screens, Bandcamp's dashboard, label CMS portals, sync-licensing submission forms, Disco asset libraries, Songtrust, AudioSalad, label-copy systems. Computer Use can drive every one of them. Imagine a release-day agent that logs into DistroKid (with credentials passed via `<robot_credentials>` tags), uploads the master WAV, fills the metadata from your release sheet, ticks the right stores, schedules the date, and screenshots a confirmation. Or a Spotify-for-Artists scraper that pulls weekly streaming numbers per artist into a roster-wide dashboard. Or a playlist-pitching agent that opens curator submission forms one after another. Or a sync-licensing agent that copy-pastes a track description into 20 different brief portals. For mastering review, Computer Use can drive iZotope or Ozone's GUI to run a pre-set chain. For social posting, it can navigate Meta Business Suite when the Graph API rate-limits you. The catch: it's slow, it's beta, and it can be fooled by UI prompt injections — so always sandbox the VM, scope credentials narrowly, and require human approval on irreversible steps (paid uploads, contract signs).

## Try-it (2-min exercise)
Clone Anthropic's `anthropic-quickstarts` repo, run the `computer-use-demo` Docker container (`docker run -e ANTHROPIC_API_KEY ... ghcr.io/anthropics/anthropic-quickstarts:computer-use-demo-latest`), open `http://localhost:8080`, and ask Claude: "Open Firefox and search for 'how to register a song with BMI'." Watch it click, type, and screenshot back the result.

## Quiz
1. What beta header is required for the latest Computer Use tool on Claude Opus 4.7?
   - A. `tool-use-2024-04`
   - B. `desktop-control-v1`
   - C. `computer-use-2025-11-24` **CORRECT**
   - D. None — it's GA

2. Which is NOT a Computer Use action?
   - A. screenshot
   - B. left_click
   - C. type
   - D. compile_code **CORRECT**

3. What's the recommended environment for running Computer Use?
   - A. Directly on the user's primary laptop with full admin rights
   - B. A sandboxed VM or container with minimal privileges and (ideally) a human-in-the-loop for sensitive actions **CORRECT**
   - C. A jailbroken phone
   - D. Anthropic's cloud — you can't self-host it

## Sources
- https://docs.claude.com/en/docs/agents-and-tools/computer-use
- https://platform.claude.com/docs/en/agents-and-tools/computer-use
- https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo
