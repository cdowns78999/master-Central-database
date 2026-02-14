# Spotify Parsing Job [FRESH] - Setup Guide

## Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project: `Spotify Parsing Job FRESH`

## Step 2: Enable APIs
1. Enable **Google Drive API** and **Google Sheets API**.

## Step 3: OAuth Consent Screen
1. Set to **External**.
2. Add scope: `https://www.googleapis.com/auth/drive.file`.
3. Add your Gmail as a test user.

## Step 4: OAuth Client ID
1. Create **Chrome Extension** Client ID.
2. Get Extension ID from `chrome://extensions/` by loading this folder.
3. Update `manifest.json` with the new Client ID.

## Step 5: Master Folder ID
1. Update `MASTER_FOLDER_ID` in `background.js` to your target GDrive folder ID.

## Step 6: Reload & Test
1. Reload extension in Chrome.
2. Navigate to your dashboard and look for the **On Mode [FRESH]** tile.
