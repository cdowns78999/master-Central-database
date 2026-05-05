# Google Drive OAuth Setup Guide

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** at the top
3. Click **NEW PROJECT**
4. Enter project name: `Spotify Parsing Job`
5. Click **CREATE**

## Step 2: Enable Google Drive API

1. In the left sidebar, go to **APIs & Services** > **Library**
2. Search for "Google Drive API"
3. Click on **Google Drive API**
4. Click **ENABLE**

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Select **External** user type
3. Click **CREATE**
4. Fill in required fields:
   - App name: `Spotify Parsing Job`
   - User support email: (your email)
   - Developer contact: (your email)
5. Click **SAVE AND CONTINUE**
6. On "Scopes" page, click **ADD OR REMOVE SCOPES**
7. Filter for: `https://www.googleapis.com/auth/drive.file`
8. Check the box and click **UPDATE**
9. Click **SAVE AND CONTINUE**
10. On "Test users" page, click **ADD USERS**
11. Add your Google email address
12. Click **SAVE AND CONTINUE**

## Step 4: Create OAuth Client ID

1. Go to **APIs & Services** > **Credentials**
2. Click **CREATE CREDENTIALS** > **OAuth client ID**
3. Select Application type: **Chrome Extension**
4. Name: `Spotify Parsing Job Extension`
5. For Application ID, you need your Chrome Extension ID:

   ### Getting Your Extension ID:
   1. Open Chrome and go to `chrome://extensions/`
   2. Enable **Developer mode** (top right toggle)
   3. Click **Load unpacked**
   4. Select your extension folder: `spotify-parsing-job`
   5. Copy the **Extension ID** (looks like: `abcdefghijklmnopqrstuvwxyz123456`)

6. Paste the Extension ID in the Application ID field
7. Click **CREATE**
8. Copy the **Client ID** (looks like: `123456789-abc123.apps.googleusercontent.com`)

## Step 5: Update manifest.json

1. Open `manifest.json`
2. Find the `oauth2` section
3. Replace `YOUR_CLIENT_ID_HERE` with your actual Client ID:

```json
"oauth2": {
  "client_id": "123456789-abc123.apps.googleusercontent.com",
  "scopes": [
    "https://www.googleapis.com/auth/drive.file"
  ]
}
```

## Step 6: Update Master Folder ID (if needed)

In [background.js](background.js:1), verify the `MASTER_FOLDER_ID` is correct:

```javascript
const MASTER_FOLDER_ID = "1qyzU7k_FuGsptOi1NwchJ7Li1dGbAO6c";
```

To find your folder ID:
1. Open Google Drive
2. Navigate to the folder where you want screenshots stored
3. The URL will look like: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
4. Copy the folder ID from the URL

## Step 7: Reload Extension

1. Go to `chrome://extensions/`
2. Find your extension
3. Click the **Reload** button (circular arrow icon)

## Step 8: Test the Extension

1. Click the extension icon
2. Should open Tiiny site and Google Sheets
3. Paste data from Sheets into Tiiny site
4. Click "Scan for Clusters"
5. Click "GO" on any track
6. You'll see an OAuth permission popup - click **Allow**
7. The extension will create folders and upload screenshots

## Troubleshooting

### Error: "OAuth client ID not configured"
- Double-check the Client ID in manifest.json
- Make sure you reloaded the extension after updating manifest.json

### Error: "Access denied" or "403 Forbidden"
- Make sure you enabled the Google Drive API
- Check that your email is added as a test user in OAuth consent screen
- Verify the scope `https://www.googleapis.com/auth/drive.file` is added

### Error: "Invalid folder ID"
- Verify `MASTER_FOLDER_ID` in background.js is correct
- Make sure the folder exists and you have write permissions

### Extension icon shows error badge
- Check browser console (F12) for error messages
- Look in `chrome://extensions/` and click "Errors" button on your extension

## Success Indicators

When working correctly, console logs will show:
```
Processing: Artist Name - Song Name
Artist ID: 123abc, Song ID: 456def
🔑 Getting auth token...
✅ Got auth token
📤 Creating folder in parent: 1qyzU7k_FuGsptOi1NwchJ7Li1dGbAO6c
📥 API Response: {id: "abc123xyz"}
✅ Folder created successfully: abc123xyz
Navigating to: https://artists.spotify.com/c/artist/...
Captured and uploaded: 24h.png
Captured and uploaded: 12mo.png
Successfully processed: Artist Name - Song Name
```

## Notes

- OAuth consent screen in "Testing" mode allows up to 100 test users
- Extension will work for test users immediately
- To publish publicly, you'd need to verify the app (not required for personal use)
- The `drive.file` scope only grants access to files created by the extension, not your entire Drive
