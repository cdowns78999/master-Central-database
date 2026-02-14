# Spotify Auto-Fetch Integration Guide

## Overview
This document explains how the Spotify integration works in the Artist Matrix dashboard. When you paste a Spotify artist/track/album link into a node, it automatically fetches the name and profile image, making the image a clickable link back to Spotify.

---

## Tools & Technologies Used

### 1. Spotify oEmbed API (No Authentication Required)
- **Endpoint:** `https://open.spotify.com/oembed?url={SPOTIFY_URL}`
- **Returns:** JSON with `title`, `thumbnail_url`, and other metadata
- **Why:** No API keys or authentication needed - works entirely client-side

### 2. JavaScript Fetch API
- Used to make HTTP requests to the oEmbed endpoint
- Async/await pattern for clean promise handling

### 3. Regex Pattern Matching
- Extracts Spotify IDs from URLs
- Handles various URL formats (with query params like `?si=...`)

### 4. Debouncing
- Prevents API spam by waiting 500ms after user stops typing
- Improves performance and avoids rate limiting

---

## Step-by-Step Process

### Step 1: URL Detection
When user pastes/types in a field, the `extractSpotifyID()` function checks for Spotify URLs:

```javascript
function extractSpotifyID(text) {
    const trackMatch = text.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/i);
    const albumMatch = text.match(/spotify\.com\/album\/([a-zA-Z0-9]+)/i);
    const artistMatch = text.match(/spotify\.com\/artist\/([a-zA-Z0-9]+)/i);

    if (artistMatch) return { id: artistMatch[1], type: 'artist', url: text };
    // ... etc
}
```

### Step 2: oEmbed Fetch
Once a Spotify URL is detected, we fetch data from the oEmbed endpoint:

```javascript
async function fetchSpotifyOEmbed(spotifyUrl, type) {
    const cleanUrl = spotifyUrl.split('?')[0]; // Remove query params
    const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(cleanUrl)}`;

    const response = await fetch(oEmbedUrl);
    const data = await response.json();

    return {
        title: data.title,           // Artist/Track/Album name
        thumbnail: data.thumbnail_url // Profile/Cover image
    };
}
```

### Step 3: Apply to Node
The fetched data is applied to the node:

1. **Label Update:** Node label is set to the fetched `title`
2. **Profile Image:** Circular image added next to the dot
3. **Click Handler:** Image opens Spotify page in new tab
4. **Styling:** Node gets green Spotify-themed glow

```javascript
async function applySpotifyToNode(node, spotifyInfo) {
    const oEmbedData = await fetchSpotifyOEmbed(url, type);

    // Update label
    label.textContent = oEmbedData.title;

    // Create clickable profile image
    const profileImg = document.createElement('img');
    profileImg.src = oEmbedData.thumbnail;
    profileImg.onclick = () => window.open(oEmbedData.url, '_blank');

    // Add Spotify styling
    pBtn.classList.add('has-spotify');
}
```

### Step 4: Debounce Input
To avoid hitting the API on every keystroke:

```javascript
const handleSpotifyInput = debounce(async (e) => {
    const info = extractSpotifyID(e.target.textContent);
    if (info) await applySpotifyToNode(node, info);
}, 500); // Wait 500ms after typing stops
```

---

## Unified Card Design

All cards now share the same clean, centered layout:

```css
/* Base Card - Clean Centered Layout */
.p-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 48px 24px 20px 24px;
    border-radius: 16px;
}

/* Dot - Centered at top (for non-Spotify cards) */
.p-btn .dot {
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
}

/* Spotify Profile - Larger, same position concept */
.spotify-profile-img {
    width: 80px;
    height: 80px;
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid #1DB954;
}

/* Spotify cards get green theme */
.p-btn.has-spotify {
    border-color: rgba(29, 185, 84, 0.3);
    background: linear-gradient(..., rgba(29, 185, 84, 0.04), ...);
}

.p-btn.has-spotify .dot {
    display: none;  /* Hidden - replaced by profile image */
}
```

### Visual Hierarchy (All Cards)
```
┌─────────────────────────────┐
│         ● (dot)             │  ← Dot centered at top (or profile for Spotify)
│                             │
│      ┌───────────┐          │
│      │   LABEL   │          │  ← Centered label pill
│      └───────────┘          │
│                             │
│     metadata-url.io         │  ← Muted URL below
│                             │
│           +                 │  ← Add field trigger
└─────────────────────────────┘
```

---

## How to Use

### Method 1: One-Click Clipboard Steal (Recommended)
1. **Copy a Spotify URL** to your clipboard (Ctrl+C / Cmd+C)
2. **Click the label** of any node
3. **Done!** - If a Spotify URL is in your clipboard, it auto-fetches everything

```javascript
// Click handler reads clipboard and checks for Spotify URL
document.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('btn-label')) return;

    const clipboardText = await navigator.clipboard.readText();
    const spotifyInfo = extractSpotifyID(clipboardText);

    if (spotifyInfo) {
        await applySpotifyToNode(node, spotifyInfo);
    }
    // Silent fail if no Spotify URL found
});
```

### Method 2: Manual Paste
1. **Create a node** in the matrix (or use existing)
2. **Paste a Spotify URL** into any field (label or URL field)
   - Example: `https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X`
3. **Wait ~500ms** for the auto-fetch to trigger

### Result:
- Label updates to artist/track name
- Profile image appears (clickable)
- Node gets Spotify green styling
- Green flash confirms successful fetch

---

## Supported URL Types

| Type | Example URL | What's Fetched |
|------|-------------|----------------|
| Artist | `spotify.com/artist/ID` | Artist name + profile photo |
| Track | `spotify.com/track/ID` | Track name + album art |
| Album | `spotify.com/album/ID` | Album name + cover art |

---

## Export/Import

When you export the matrix to JSON, the Spotify URLs in your fields are saved. On import, the system re-fetches the oEmbed data to restore images and styling.

---

## Limitations

- **oEmbed thumbnail quality:** Fixed size (~300px), not high-res
- **Rate limiting:** Spotify may throttle excessive requests
- **No offline:** Requires internet connection for fetch
- **No preview playback:** oEmbed doesn't provide audio previews

---

## Future Enhancements (Optional)

- [ ] Toggle to show/hide the ID tag
- [ ] Higher quality images via Spotify Web API (requires auth)
- [ ] Audio preview on hover
- [ ] Batch import from Spotify playlists
