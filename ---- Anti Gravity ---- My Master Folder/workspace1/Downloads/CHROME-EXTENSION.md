# CHROME EXTENSION: Copy/Stitch System

## Project Name: "Bounce Back Stitcher"

---

## Overview

The Chrome extension is the **glue** that connects all Bounce Back workflows. It detects when you're on Chosic (or other data sources), scrapes relevant data, and automatically bounces you back to the base page with copied data ready to paste.

---

## Core Responsibilities

1. **Detect Context** - Know which step you're in (Step 1, Step 2, Step 3, etc.)
2. **Scrape Smart** - Extract only the data needed for current step
3. **Copy Clean** - Format data perfectly for paste-back
4. **Auto-Return** - Switch back to base tab automatically
5. **Notify User** - Show what was copied and what to do next

---

## Extension Architecture

```
Background Script (background.js)
    ↓
Manages tabs, tracks state, coordinates actions
    ↓
Content Script (content.js)
    ↓
Runs on Chosic.com, scrapes data, triggers copy
    ↓
Storage (chrome.storage.local)
    ↓
Tracks current step, base tab ID, copied data
```

---

## Step-by-Step Behavior

### STEP 1: INTRO (Plan 1)

**Trigger:**
- User opens Chosic from base page
- URL pattern: `chosic.com/similar-artists/{artist_name}/*`
- Storage shows: `current_step: 1`

**Actions:**
1. Wait 2 seconds (page load)
2. Scrape artist names:
   ```javascript
   const artists = document.querySelectorAll('.similar-artists-item .artist-name');
   const names = Array.from(artists).map(a => a.textContent.trim());
   ```
3. Format as line-separated list:
   ```
   SIDEPIECE
   CamelPhat
   Fisher
   Chris Lake
   ```
4. Copy to clipboard
5. Get base tab ID from storage
6. Switch to base tab
7. Show notification: "✓ Copied 20 artists! Paste into the tool."

**Data Stored:**
```json
{
  "step": 1,
  "action": "scrape_similar_artists",
  "data_copied": "SIDEPIECE\nCamelPhat\n...",
  "timestamp": "2026-01-01T12:00:00Z"
}
```

---

### STEP 2+: CUSTOM STEPS (Plan 2)

**Trigger:**
- User opens Chosic/other site from Step 2+ interface
- URL pattern varies by step type
- Storage shows: `current_step: 2`, `step_type: "compare"`

**Example: Compare Step**

If Step 2 is "Compare Accio to SIDEPIECE":

1. Base page opens: `chosic.com/similar-artists/SIDEPIECE/*`
2. Extension detects: `current_step: 2`, `step_type: "compare"`
3. Scrapes SIDEPIECE's similar artists
4. Formats with step context:
   ```json
   {
     "step": 2,
     "type": "compare",
     "original_artist": "SIDEPIECE",
     "similar_artists": ["Artist1", "Artist2", ...]
   }
   ```
5. Copies JSON string to clipboard
6. Returns to base tab
7. Notifies: "✓ Comparison data copied! Paste to continue Step 2."

**Data Stored:**
```json
{
  "step": 2,
  "action": "compare_artist",
  "compare_target": "SIDEPIECE",
  "data_copied": "{...json...}",
  "timestamp": "2026-01-01T12:05:00Z"
}
```

---

### STEP 3+: END STEPS (Plan 3)

**Trigger:**
- Similar to Step 2, but may target different sites
- Could scrape from Spotify directly (if user is browsing)
- Storage shows: `current_step: 3`, `step_type: "enrich"`

**Example: Enrich with Playlist Data**

1. User browsing Spotify playlist page (manual)
2. Extension detects Spotify URL pattern
3. Scrapes playlist info (name, followers, track count)
4. Formats for base page:
   ```json
   {
     "step": 3,
     "type": "enrich",
     "source": "spotify_playlist",
     "data": {
       "playlist_name": "Tech House Bangers",
       "followers": 45000,
       "tracks": 120
     }
   }
   ```
5. Copies to clipboard
6. User manually returns to base tab
7. Notifies: "✓ Playlist data copied!"

---

## Extension Components

### 1. manifest.json

```json
{
  "manifest_version": 3,
  "name": "Bounce Back Stitcher",
  "version": "1.0",
  "description": "Connects Bounce Back workflows by auto-copying data from music sites",
  "permissions": [
    "activeTab",
    "tabs",
    "storage",
    "clipboardWrite",
    "notifications"
  ],
  "host_permissions": [
    "https://www.chosic.com/*",
    "https://open.spotify.com/*"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.chosic.com/similar-artists/*"],
      "js": ["content-chosic.js"]
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  }
}
```

### 2. background.js (Tab Manager)

```javascript
// Track base tab and current step
let baseTabId = null;
let currentStep = 1;

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  if (request.action === 'register_base_tab') {
    baseTabId = sender.tab.id;
    chrome.storage.local.set({ baseTabId, currentStep: 1 });
    sendResponse({ success: true });
  }
  
  if (request.action === 'data_copied') {
    // Switch back to base tab
    chrome.tabs.update(baseTabId, { active: true }, () => {
      // Show notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Bounce Back',
        message: request.message
      });
    });
  }
  
  if (request.action === 'update_step') {
    currentStep = request.step;
    chrome.storage.local.set({ currentStep });
  }
});
```

### 3. content-chosic.js (Scraper)

```javascript
// Wait for page load
setTimeout(() => {
  
  // Get current step from storage
  chrome.storage.local.get(['currentStep', 'stepType'], (result) => {
    const step = result.currentStep || 1;
    const stepType = result.stepType || 'intro';
    
    // Scrape based on step
    if (step === 1) {
      scrapeIntroData();
    } else {
      scrapeStepData(step, stepType);
    }
  });
  
}, 2000);

function scrapeIntroData() {
  // Find artist name elements
  const artistEls = document.querySelectorAll('.similar-artists-item .artist-name');
  
  if (artistEls.length === 0) {
    console.error('No artists found on page');
    return;
  }
  
  // Extract names
  const names = Array.from(artistEls).map(el => el.textContent.trim());
  const dataString = names.join('\n');
  
  // Copy to clipboard
  navigator.clipboard.writeText(dataString).then(() => {
    // Notify background script
    chrome.runtime.sendMessage({
      action: 'data_copied',
      message: `✓ Copied ${names.length} artists! Paste into tool.`
    });
  });
}

function scrapeStepData(step, stepType) {
  // Custom scraping logic based on step type
  if (stepType === 'compare') {
    const artistEls = document.querySelectorAll('.similar-artists-item .artist-name');
    const names = Array.from(artistEls).map(el => el.textContent.trim());
    
    const jsonData = JSON.stringify({
      step: step,
      type: stepType,
      similar_artists: names
    });
    
    navigator.clipboard.writeText(jsonData).then(() => {
      chrome.runtime.sendMessage({
        action: 'data_copied',
        message: `✓ Step ${step} data copied!`
      });
    });
  }
}
```

### 4. popup.html (Quick Status)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { width: 250px; padding: 15px; font-family: Arial; }
    .status { padding: 10px; background: #e7f3ff; border-radius: 5px; }
    .step { font-weight: bold; color: #667eea; }
  </style>
</head>
<body>
  <h3>🎯 Bounce Back Status</h3>
  <div class="status">
    <div>Current Step: <span class="step" id="currentStep">1</span></div>
    <div>Base Tab: <span id="baseTabStatus">Not registered</span></div>
  </div>
  <script src="popup.js"></script>
</body>
</html>
```

### 5. popup.js (Status Display)

```javascript
// Load and display current state
chrome.storage.local.get(['currentStep', 'baseTabId'], (result) => {
  document.getElementById('currentStep').textContent = result.currentStep || 1;
  document.getElementById('baseTabStatus').textContent = 
    result.baseTabId ? '✓ Active' : 'Not registered';
});
```

---

## Integration with Base Page

### Base Page Sends Signal

When user clicks "Go" button in Step 1:

```javascript
// Register this tab as base
chrome.runtime.sendMessage({ action: 'register_base_tab' });

// Set current step
chrome.storage.local.set({ currentStep: 1, stepType: 'intro' });

// Open Chosic
window.open(`https://www.chosic.com/similar-artists/${artistName}/`, '_blank');
```

### Base Page Receives Paste

When user pastes data back:

```javascript
// Detect paste
pasteArea.addEventListener('paste', (e) => {
  const pastedData = e.clipboardData.getData('text');
  
  // Check if it's Step 1 data (line-separated names)
  if (pastedData.includes('\n') && !pastedData.includes('{')) {
    processIntroData(pastedData.split('\n'));
  }
  
  // Check if it's Step 2+ data (JSON)
  else if (pastedData.startsWith('{')) {
    const stepData = JSON.parse(pastedData);
    processStepData(stepData);
  }
});
```

---

## State Management Flow

```
BASE PAGE                    EXTENSION                  CHOSIC
    |                            |                         |
    |-- "Go" click -------------->|                         |
    |   (register base tab)       |                         |
    |   (set step=1)              |                         |
    |                             |                         |
    |-- Opens Chosic ------------>|------------------------>|
    |                             |                         |
    |                             |<------ Page loads ------|
    |                             |                         |
    |                             |-- Scrapes data -------->|
    |                             |<------ Artist names ----|
    |                             |                         |
    |                             |-- Copies to clipboard --|
    |<---- Switches back ---------|                         |
    |                             |                         |
    |-- User pastes ------------->|                         |
    |                             |                         |
```

---

## Extension Behaviors by Step

| Step | Opens URL | Scrapes | Copies | Returns |
|------|-----------|---------|--------|---------|
| 1 (Intro) | Chosic similar artists | Artist names | Line-separated text | Auto |
| 2 (Compare) | Chosic for 2nd artist | Artist names | JSON with step context | Auto |
| 3 (Filter) | None (processes locally) | N/A | N/A | N/A |
| 4 (Enrich) | Optional: Spotify playlist | Playlist data | JSON | Manual |
| 5 (Export) | None (downloads file) | N/A | N/A | N/A |

---

## Error Handling

### No Artists Found
```javascript
if (artistEls.length === 0) {
  chrome.notifications.create({
    type: 'basic',
    title: 'Bounce Back Error',
    message: 'No artists found. Check page loaded correctly.'
  });
}
```

### Base Tab Closed
```javascript
chrome.tabs.get(baseTabId, (tab) => {
  if (chrome.runtime.lastError) {
    // Base tab was closed, ask user to reopen
    chrome.notifications.create({
      type: 'basic',
      title: 'Bounce Back',
      message: 'Base tab closed. Please reopen the tool.'
    });
  }
});
```

### Clipboard Permission Denied
```javascript
navigator.clipboard.writeText(data).catch((err) => {
  console.error('Clipboard write failed:', err);
  // Fallback: show data in notification
  chrome.notifications.create({
    type: 'basic',
    title: 'Copy Failed',
    message: 'Please manually copy: ' + data.substring(0, 50) + '...'
  });
});
```

---

## Development & Testing

### Load Unpacked Extension
1. Open Chrome: `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select extension folder

### Testing Checklist
- [ ] Step 1: Scrapes artist names from Chosic
- [ ] Step 1: Copies to clipboard successfully
- [ ] Step 1: Returns to base tab automatically
- [ ] Step 2: Detects step change
- [ ] Step 2: Scrapes comparison data
- [ ] Step 2: Formats as JSON
- [ ] Popup shows correct current step
- [ ] Notifications appear on copy
- [ ] Handles missing base tab gracefully

---

## Future Enhancements

### Multi-Site Support
Add content scripts for:
- Spotify (playlists, artist pages)
- SoundCloud (artist similar tracks)
- Beatport (genre charts)

### Smart Formatting
Detect data type and format automatically:
- Artist lists → Line-separated
- Comparison data → JSON
- Playlist data → Structured object

### Offline Storage
Cache scraped data in extension storage:
- Enables "undo" functionality
- Allows reviewing past scrapes
- Backup if clipboard fails

---

## Files to Create

1. **manifest.json** - Extension configuration
2. **background.js** - Tab management & messaging
3. **content-chosic.js** - Chosic scraper
4. **popup.html** - Status UI
5. **popup.js** - Status logic
6. **icon.png** - Extension icon (128x128)

---

## Connection to Plans

- **Plan 1 (Intro):** Extension handles Step 1 copy/paste
- **Plan 2 (Train/Brackets):** Extension adapts to Step 2+ contexts
- **Plan 3 (End Steps):** Extension provides final data stitching

The extension is the **nervous system** that connects all workflows.
