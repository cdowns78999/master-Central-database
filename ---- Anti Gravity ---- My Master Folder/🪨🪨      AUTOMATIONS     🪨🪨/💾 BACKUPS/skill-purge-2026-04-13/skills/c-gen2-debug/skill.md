---
description: "Gen2 Debug — 3-viewpoint diagnostic with line-by-line pass/fail breakdown, then offers to fix"
user_invocable: true
---

# c-gen2-debug

Reviews a bug from 3 different practical viewpoints, delivers a line-by-line diagnostic with green check / red X markers, then asks if Chad wants to fix them.

## Instructions

Run immediately on invocation. Chad will point out a bug — could be a description, a file path, a screenshot, or just a rant. Take whatever he gives you.

### Step 1 — Identify the Bug

If Chad hasn't already described the bug in the same message, ask one question:

```
What's the bug? Drop a file path, description, or just tell me what's broken.
```

Once you have the bug context, read the relevant code.

### Step 2 — 3 Viewpoint Analysis

Analyze the bug from exactly 3 different practical viewpoints. Display them in the hub box:

```
🔬 VIEWPOINT 1 — Code Logic
[2-3 sentences on what the code is doing vs what it should do]

🔬 VIEWPOINT 2 — Data Flow
[2-3 sentences on where data enters, transforms, and where it breaks]

🔬 VIEWPOINT 3 — User Experience
[2-3 sentences on what the user sees/experiences because of this bug]
```

Keep each viewpoint tight — no fluff, just the diagnosis from that angle.

### Step 3 — Line-by-Line Diagnostic

Walk through every relevant line or component and mark each one:

```
DIAGNOSTIC BREAKDOWN

✅ [component/line] — working correctly, [brief reason]
✅ [component/line] — working correctly, [brief reason]
❌ [component/line] — BROKEN: [what's wrong]
❌ [component/line] — BROKEN: [what's wrong]
✅ [component/line] — working correctly, [brief reason]
⚠️ [component/line] — suspicious but not confirmed broken
```

Use as many lines as the bug actually needs. Don't pad with unnecessary checks, but don't skip anything relevant either.

Rules:
- ✅ = confirmed working, no issues
- ❌ = confirmed broken, causes or contributes to the bug
- ⚠️ = suspicious, could be related, needs watching

### Step 4 — The Ask

After the diagnostic, output:

```
[N] issues found. Wanna fix em?
```

Where N is the count of ❌ items.

Wait for Chad's response. If he says yes/yeah/go/fix:
- Fix all ❌ items
- Re-check all ⚠️ items during the fix
- After fixing, re-run the diagnostic as a quick verification pass (abbreviated — just the items that changed)

## Notes
- This is a DIAGNOSTIC tool, not a build tool. It finds and fixes bugs, it doesn't add features.
- The 3 viewpoints should genuinely be different angles, not 3 ways of saying the same thing.
- Be honest — if something is working, mark it green. Don't inflate the issue count.
- The diagnostic should be scannable at a glance. Chad should know the state of things in 2 seconds.
