---
description: "Mega update a client's Home Base — interactive menu picks client + service + what to update, then edits the HTML and redeploys to Netlify"
user_invocable: true
---

# c-1-home-mega-update

Interactive skill that walks through updating a client's deployed Home Base app. Asks what to update, makes the edit, redeploys, and opens proof.

## Instructions

### Step 1 — Ask: Which client?

Use AskUserQuestion:
```
Which client's Home Base are we updating?
```

Options should list known Home Base folders. To find them:
```bash
ls "C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\workspot1\--wingdashapp--1--\ADMIN\homebases"
```

Present each folder name as an option (e.g. "thennow", "marc-antonix"). Also offer "Type a name" for unlisted clients.

### Step 2 — Ask: Which service?

After client is chosen, use AskUserQuestion:
```
Which service to update on {CLIENT}'s Home Base?
```

Options:
- 🟢 Spotify
- 🟠 SoundCloud
- 🔴 YouTube
- 🟣 Press (In-Network)
- 🟣 Press (Standard)
- 🟣 Press (Premium)
- ⭐ Package

### Step 3 — Ask: What to update?

Based on the service chosen, show the 4 action buttons for that service. Each button represents content that can be populated or updated.

**SPOTIFY / SOUNDCLOUD:**
```
What to update on {CLIENT}'s {SERVICE} campaign?

🔵 Supplier — update contact status (internal supplier tracking stays in Wing Dashboard)
🔵 Latest Report — add or replace the latest campaign report
🔵 Last Report — add or replace the previous report
🔵 [Playlist Link / Track Link] — set the link URL
```

**YOUTUBE:**
```
🔵 Supplier — update contact status (internal supplier tracking stays in Wing Dashboard)
🔵 Latest Report — add or replace the latest campaign report
🔵 Last Report — add or replace the previous report
🔵 Video Link — set the video URL
```

**PRESS (any tier):**
```
🔵 Supplier — update contact status (internal supplier tracking stays in Wing Dashboard)
🔵 Press Release — add/update press release content (slider: content editor OR Google Drive links)
🔵 Preview Articles — add article previews (1-3 articles)
🔵 Coverage Report — add or replace coverage report
```

Note: "Press Release" now has a two-slide system. When the user picks Press Release, they get a follow-up question in Step 4 asking whether they want to edit the content (Slide 1) or add Google Drive links (Slide 2). Both slides live inside the same `.hb-pressrelease-overlay` as a slider.

**PACKAGE:**
```
🔵 Supplier — update contact status (internal supplier tracking stays in Wing Dashboard)
🔵 Latest Report — add or replace the latest report
🔵 Last Report — add or replace the previous report
🔵 Deliverables — update deliverables list
```

### Step 4 — Gather the content

Based on what they chose:

**Supplier:** Ask for contact status — either "Not Contacted" or "Contacted [date]". Supplier names are NEVER shown on the client Home Base. The client only sees "Not Contacted" or "Contacted [date]". Supplier assignment is internal only — tracked in the Wing Dashboard's Journey Card / ClientStore, not on deployed Home Base apps.

**Latest/Last Report:** Ask for the report content — can be a summary, stats, or a URL to embed.

**Link buttons (Playlist/Track/Video):** Ask for the URL.

**Press Release:** Chad drops Google Drive links (PDF and/or DOCX). Claude does the rest:

1. Chad pastes the Drive link(s) — could be:
   - `https://drive.google.com/open?id=XXXXX`
   - `https://drive.google.com/file/d/XXXXX/view`
   - `https://docs.google.com/document/d/XXXXX/edit`
   - Any Google Drive sharing URL format
2. Claude extracts the file ID from whatever format was pasted
3. Claude uses the Google Drive API (via export/download URL) to READ the actual document content — text, formatting, and images
4. Claude rebuilds the press release content directly into Slide 1 of the Home Base overlay, preserving the look and feel of the existing `.hb-pr-*` styled elements (headline → `.hb-pr-headline`, body → `.hb-pr-body`, etc.)
5. If images exist in the document, embed them as `<img>` tags with the Drive thumbnail/export URL: `https://drive.google.com/thumbnail?id={FILE_ID}&sz=w800`
6. Slide 2 keeps the raw Drive preview iframes (PDF + DOCX cards) as backup/reference — the client can toggle to see the original files

**The key:** Chad drops the links, Claude imports the content in the existing warm Home Base look — not a raw iframe, but actual styled HTML that matches. Images carry over. The iframe previews on Slide 2 are the safety net / original reference.

**Drive URL parsing — handle ALL formats:**
- `drive.google.com/open?id=FILE_ID` → extract from `id=` param
- `drive.google.com/file/d/FILE_ID/view` → extract between `/d/` and `/`
- `docs.google.com/document/d/FILE_ID/edit` → extract between `/d/` and `/`
- Convert to preview: `https://drive.google.com/file/d/{FILE_ID}/preview`
- Convert to export (for reading content): `https://docs.google.com/document/d/{FILE_ID}/export?format=html`

**Preview Articles:** Ask how many (1-3) and for each: title, author, body snippet, and optional image URL.

**Coverage Report / Deliverables:** Ask for the content or summary.

### Step 5 — Edit the Home Base HTML

Read the client's Home Base file:
```
ADMIN/homebases/{client-slug}/index.html
```

Find the matching campaign row by `data-service` attribute. Then update the relevant button:

**For Supplier:** Update the `.hb-supplier-btn` data-state and text. If "Not Contacted" → add class `not-contacted` + set text to "Not Contacted". If "Contacted" → add class `contacted` + set text to "Contacted {M/DD}". Never set supplier names on the client-facing Home Base — supplier assignment is tracked internally in the Wing Dashboard only.

**For Report buttons:** The `.hb-action-btn` buttons are currently static text. To make them "populated", change the button text to include a ✓ indicator and optionally wrap content in a data attribute or a hidden sibling div that shows on click.

**For Link buttons:** Add an `onclick="window.open('URL')"` to the button and change text to "▶ {Link Name}".

**For Press Release (Drive import flow):**

1. Parse the Drive link(s) Chad dropped — extract file IDs from any URL format
2. For Google Docs (DOCX): fetch the content via export URL `https://docs.google.com/document/d/{FILE_ID}/export?format=html` using WebFetch. Parse the returned HTML to extract:
   - Title/headline → map to `.hb-pr-headline`
   - Body paragraphs → map to `.hb-pr-body` divs
   - Images → extract `src` URLs, convert to Drive thumbnail URLs, embed as `<img>` tags within the body
   - Keep the existing `.hb-pr-immediate` ("FOR IMMEDIATE RELEASE"), `.hb-pr-endmark` ("###"), `.hb-pr-boilerplate`, and `.hb-pr-contact` structure
3. For PDFs: can't extract content easily — use the iframe preview on Slide 2 as the primary view. Set the PDF card to `display: block` and wire the iframe `src`
4. Update Slide 1 with the imported + styled content
5. Update Slide 2 with the raw Drive preview iframes (both PDF + DOCX cards visible, `src` set to preview URLs)

#### Step 5A — Inject the Press Release Slider (if not already present)

Check if the `.hb-pr-slider-track` element exists in the HTML. If it does, the slider is already injected — skip to populating. If not, restructure the press release overlay as follows:

**Replace the inner content of `#hbPressReleaseOverlay`** (the `.hb-overlay-card` and everything inside it) with this slider structure. CRITICAL: preserve the existing press release content (headline, body, boilerplate, etc.) — move it into Slide 1.

New HTML structure for `#hbPressReleaseOverlay`:

```html
<div class="hb-overlay-card hb-pr-slider-container">
    <div class="hb-overlay-close" onclick="document.getElementById('hbPressReleaseOverlay').style.display='none';">&#10005;</div>

    <!-- Slider Navigation -->
    <div class="hb-pr-slider-nav">
        <button class="hb-pr-slider-dot active" data-slide="0" onclick="hbPrSlide(0)"></button>
        <button class="hb-pr-slider-dot" data-slide="1" onclick="hbPrSlide(1)"></button>
    </div>

    <!-- Slider Track -->
    <div class="hb-pr-slider-track">

        <!-- SLIDE 1: Press Release Content (existing content goes here) -->
        <div class="hb-pr-slide hb-pr-slide-content">
            <!-- Existing press release elements are moved here verbatim -->
            <div class="hb-pr-immediate">FOR IMMEDIATE RELEASE</div>
            <div class="hb-pr-headline">...</div>
            <div class="hb-pr-dateline">...</div>
            <div class="hb-pr-body">...</div>
            <!-- ... rest of existing content ... -->
            <div class="hb-pr-endmark">###</div>
            <div class="hb-pr-boilerplate-label">About Ahead Artist Solutions</div>
            <div class="hb-pr-boilerplate">...</div>
            <div class="hb-pr-contact-label">Media Contact</div>
            <div class="hb-pr-contact">...</div>
        </div>

        <!-- SLIDE 2: Google Drive Links -->
        <div class="hb-pr-slide hb-pr-slide-drive">
            <div class="hb-pr-drive-heading">Press Release Documents</div>
            <div class="hb-pr-drive-subtext">Preview or download the official press release</div>

            <!-- PDF Card -->
            <div class="hb-pr-drive-card" id="hbPrDrivePdf">
                <div class="hb-pr-drive-card-header">
                    <span class="hb-pr-drive-icon">📄</span>
                    <span class="hb-pr-drive-label">PDF Version</span>
                    <span class="hb-pr-drive-status" id="hbPrPdfStatus"></span>
                </div>
                <div class="hb-pr-drive-link-display" id="hbPrPdfLink">No link set</div>
                <button class="hb-pr-drive-preview-btn" id="hbPrPdfPreviewBtn" onclick="hbPrToggleDrivePreview('pdf')" style="display:none;">Preview</button>
                <div class="hb-pr-drive-iframe-wrap" id="hbPrPdfIframe" style="display:none;">
                    <iframe src="about:blank" class="hb-pr-drive-iframe"></iframe>
                </div>
            </div>

            <!-- DOCX Card -->
            <div class="hb-pr-drive-card" id="hbPrDriveDocx">
                <div class="hb-pr-drive-card-header">
                    <span class="hb-pr-drive-icon">📝</span>
                    <span class="hb-pr-drive-label">DOCX Version</span>
                    <span class="hb-pr-drive-status" id="hbPrDocxStatus"></span>
                </div>
                <div class="hb-pr-drive-link-display" id="hbPrDocxLink">No link set</div>
                <button class="hb-pr-drive-preview-btn" id="hbPrDocxPreviewBtn" onclick="hbPrToggleDrivePreview('docx')" style="display:none;">Preview</button>
                <div class="hb-pr-drive-iframe-wrap" id="hbPrDocxIframe" style="display:none;">
                    <iframe src="about:blank" class="hb-pr-drive-iframe"></iframe>
                </div>
            </div>
        </div>

    </div><!-- end slider track -->
</div>
```

**CSS to inject** (add into the `<style>` block, after the existing press release styles):

```css
/* ── Press Release Slider ── */
.hb-pr-slider-container {
    overflow: hidden;
    padding-bottom: 20px;
}
.hb-pr-slider-nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 24px;
}
.hb-pr-slider-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid rgba(59, 26, 4, 0.2);
    background: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
}
.hb-pr-slider-dot.active {
    background: rgba(59, 26, 4, 0.5);
    border-color: rgba(59, 26, 4, 0.5);
}
.hb-pr-slider-track {
    display: flex;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    width: 200%;
}
.hb-pr-slide {
    width: 50%;
    flex-shrink: 0;
    box-sizing: border-box;
}
.hb-pr-slide-drive {
    padding: 0 10px;
}

/* Drive Links — Slide 2 */
.hb-pr-drive-heading {
    font-size: 1.2rem;
    font-weight: 800;
    color: #3b1a04;
    margin-bottom: 6px;
}
.hb-pr-drive-subtext {
    font-size: 0.78rem;
    color: rgba(59, 26, 4, 0.5);
    margin-bottom: 24px;
}
.hb-pr-drive-card {
    background: rgba(59, 26, 4, 0.03);
    border: 1px solid rgba(59, 26, 4, 0.08);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
}
.hb-pr-drive-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.hb-pr-drive-icon {
    font-size: 1.3rem;
}
.hb-pr-drive-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #3b1a04;
}
.hb-pr-drive-status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: auto;
}
.hb-pr-drive-status.saved {
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
}
.hb-pr-drive-link-display {
    font-size: 0.75rem;
    color: rgba(59, 26, 4, 0.4);
    word-break: break-all;
    margin-bottom: 12px;
    font-family: 'JetBrains Mono', monospace;
}
.hb-pr-drive-preview-btn {
    display: inline-block;
    padding: 6px 18px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background: linear-gradient(135deg, rgba(59, 26, 4, 0.08), rgba(59, 26, 4, 0.04));
    border: 1px solid rgba(59, 26, 4, 0.12);
    border-radius: 8px;
    color: #3b1a04;
    cursor: pointer;
    transition: all 0.2s ease;
}
.hb-pr-drive-preview-btn:hover {
    background: linear-gradient(135deg, rgba(59, 26, 4, 0.14), rgba(59, 26, 4, 0.08));
    border-color: rgba(59, 26, 4, 0.2);
}
.hb-pr-drive-iframe-wrap {
    margin-top: 14px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(59, 26, 4, 0.06);
}
.hb-pr-drive-iframe {
    width: 100%;
    height: 500px;
    border: none;
    display: block;
    background: #f8f8f8;
}
```

**JS to inject** (add into the `<script>` block, inside the IIFE, after the existing press release button logic):

```js
/* ── Press Release Slider ── */
function hbPrSlide(index) {
    var track = document.querySelector('.hb-pr-slider-track');
    if (track) track.style.transform = 'translateX(-' + (index * 50) + '%)';
    document.querySelectorAll('.hb-pr-slider-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
    });
}

/* ── Drive Link Preview Toggle ── */
function hbPrToggleDrivePreview(type) {
    var wrapId = type === 'pdf' ? 'hbPrPdfIframe' : 'hbPrDocxIframe';
    var wrap = document.getElementById(wrapId);
    if (!wrap) return;
    var iframe = wrap.querySelector('iframe');
    if (wrap.style.display === 'none') {
        wrap.style.display = 'block';
        // Load the preview URL if not already loaded
        if (iframe && iframe.src === 'about:blank') {
            var linkEl = document.getElementById(type === 'pdf' ? 'hbPrPdfLink' : 'hbPrDocxLink');
            var url = linkEl ? linkEl.getAttribute('data-drive-url') : '';
            if (url) iframe.src = url;
        }
    } else {
        wrap.style.display = 'none';
        if (iframe) iframe.src = 'about:blank'; // free memory
    }
}
```

**How to populate Slide 2 links at edit time:**

When the skill has a Google Drive link to inject, do the following for each link (PDF / DOCX):

1. Extract the FILE_ID from the provided URL. The URL format is:
   `https://drive.google.com/file/d/{FILE_ID}/view` (possibly with `?usp=sharing` or similar params)

2. Build the preview URL:
   `https://drive.google.com/file/d/{FILE_ID}/preview`

3. Update the HTML elements:
   - Set `#hbPrPdfLink` (or `#hbPrDocxLink`) text content to the original link URL
   - Set `data-drive-url` attribute on that element to the **preview** URL
   - Set `#hbPrPdfPreviewBtn` (or `#hbPrDocxPreviewBtn`) `style.display` to `inline-block`
   - Add class `saved` to `#hbPrPdfStatus` (or `#hbPrDocxStatus`) to show the green dot

Example: If the user provides `https://drive.google.com/file/d/1aBcDeFgHiJ/view?usp=sharing`:
- Display text: `https://drive.google.com/file/d/1aBcDeFgHiJ/view?usp=sharing`
- `data-drive-url`: `https://drive.google.com/file/d/1aBcDeFgHiJ/preview`
- Preview button: visible
- Status dot: green (class `saved`)

**For Preview Articles:** Populate the `.hb-article-overlay` with actual article cards (title, author, body, image).

### Step 6 — Redeploy to Netlify

This step has three phases: pre-deploy checks, deploy, and post-deploy verification. Track pass/fail for each sub-step — results feed into Step 8 confirmation.

#### 6A — Pre-deploy: verify .netlify link

```bash
BASEDIR="C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\workspot1\--wingdashapp--1--\ADMIN\homebases\{client-slug}"
source ~/.bashrc && cd "$BASEDIR" && ls .netlify/state.json 2>/dev/null && echo "LINKED" || echo "NOT_LINKED"
```

If `NOT_LINKED`:
1. Check the **Known Netlify Site IDs** section below for the client slug.
2. If found, auto-re-link:
   ```bash
   cd "$BASEDIR" && netlify link --id {site-id-from-table}
   ```
3. If the client is NOT in the known list, discover the site ID:
   ```bash
   source ~/.bashrc && netlify api listSites | python -c "import sys,json; [print(s['name'],s['id']) for s in json.load(sys.stdin) if 'homebase' in s.get('name','')]"
   ```
   If a matching `{client-slug}-homebase` site is found, link with that ID. If no match, create the site:
   ```bash
   netlify api createSite --data '{"body":{"name":"{client-slug}-homebase"}}'
   ```
   Then link with the returned ID.

Mark: `✓ .netlify linked` or `✗ .netlify link failed`.

#### 6B — Deploy with output capture

```bash
BASEDIR="C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\workspot1\--wingdashapp--1--\ADMIN\homebases\{client-slug}"
source ~/.bashrc && cd "$BASEDIR" && netlify deploy --prod --dir=. 2>&1 | tee /tmp/netlify-deploy-output.txt
```

After the command finishes, check the output:
```bash
grep -q "Deploy is live" /tmp/netlify-deploy-output.txt && echo "DEPLOY_OK" || echo "DEPLOY_FAILED"
```

If `DEPLOY_FAILED`: retry the deploy ONE time. If still failing after retry, stop and alert Chad with the full output.

Mark: `✓ Deploy is live` or `✗ Deploy failed`.

#### 6C — Post-deploy: HTTP 200 health check

```bash
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://{client-slug}-homebase.netlify.app?v=$(date +%s)")
echo "HTTP_STATUS=$HTTP_CODE"
```

- If `200`: mark `✓ HTTP 200 confirmed`.
- If NOT `200`: wait 5 seconds and retry once:
  ```bash
  sleep 5 && curl -s -o /dev/null -w "%{http_code}" "https://{client-slug}-homebase.netlify.app?v=$(date +%s)"
  ```
  If still not 200 after retry, mark `✗ HTTP {code} — site may not be live` and alert Chad.

### Step 7 — Open proof in Chrome

```bash
source ~/.bashrc && python -c "import webbrowser, time; webbrowser.open('https://{client-slug}-homebase.netlify.app?v=' + str(int(time.time())))"
```

### Step 8 — Confirm

Show the full checklist. Every sub-step gets a `✓` or `✗`. If ANY step shows `✗`, include a one-line explanation after it.

```
🔵🟢🟣🔴🟠  claude  /reload-plugins  ← type /c-plug to learn more
╭────────────────────────────────────────────────╮

   {CLIENT} Home Base updated.

   ✓ HTML edited
   ✓ .netlify linked
   ✓ Deploy is live
   ✓ HTTP 200 confirmed
   ✓ Chrome proof opened

   https://{client-slug}-homebase.netlify.app

   /c-launch-the-day · /c-churn · /c-1-home-mega-update

╰────────────────────────────────────────────────╯
```

If a step failed, it looks like:
```
   ✗ HTTP 503 — site may not be live (retried once)
```

## Key Paths
- Home Bases: `ADMIN/homebases/{slug}/index.html`
- Template: `ADMIN/templates/homebase-template.html`
- Generator: `ADMIN/tools/homebase-gen.py`
- Dashboard app: `--wingdashapp--1--/index.html`

## Notes
- This skill is Home Base context ONLY — it edits deployed client apps
- The Netlify CLI interactive prompts don't work in Claude Code — always use `netlify link --id` and `netlify api createSite` instead
- After regenerating a Home Base (via homebase-gen.py --force), the .netlify folder is lost — always re-link before deploying
- All Home Base files are standalone HTML — no external JS, no localhost refs
- The 4 buttons per service are a standard structure, but Chad may do something helpfully creative or customized in these spots to better serve a specific client. Follow Chad's lead — the standard is a baseline, not a ceiling
- Google Drive preview URLs use the format `https://drive.google.com/file/d/{FILE_ID}/preview` — this works for PDF and DOCX. The skill auto-converts `/view` links (including with query params like `?usp=sharing`) to `/preview` for iframe embedding. No API key needed — just the public/shared link. If the file is not shared publicly (or at least "anyone with the link"), the iframe will show a Google access prompt instead of the document
- When editing the press release slider, verify the existing press release content (Slide 1) is preserved intact. The slider is additive — never overwrite existing content when adding Drive links. Always read the current `.hb-pr-immediate`, `.hb-pr-headline`, `.hb-pr-dateline`, `.hb-pr-body`, `.hb-pr-endmark`, `.hb-pr-boilerplate`, and `.hb-pr-contact` elements first, then transplant them into the Slide 1 container during slider injection
- The slider CSS additions (`.hb-pr-slider-*`, `.hb-pr-drive-*`) must be injected into the existing `<style>` block after the `.hb-pr-contact` rule and before the `/* ── Footer ── */` comment. The JS functions `hbPrSlide()` and `hbPrToggleDrivePreview()` must be declared outside the IIFE (at window scope) because the HTML `onclick` attributes reference them directly — OR declared inside the IIFE and assigned to `window.hbPrSlide` and `window.hbPrToggleDrivePreview`

## CSS Additions Required for Slider Support

When injecting the slider into an existing Home Base file, these CSS rules need to be added. They do NOT conflict with any existing styles — all class names are new and namespaced with `hb-pr-slider-*` and `hb-pr-drive-*`. The existing `.hb-overlay-card` gets an additional class `.hb-pr-slider-container` which only adds `overflow: hidden` and bottom padding.

**Insert location:** After the `.hb-pr-contact` CSS block (around line 674 in the template), before the `/* ── Footer ── */` comment.

**No existing CSS rules are modified.** The slider is purely additive.

## Known Netlify Site IDs
- thennow: `859d633c-aa5e-4eef-aeaf-b4d3ff9f5a4e`
