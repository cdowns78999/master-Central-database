const MASTER_FOLDER_ID = "1qyzU7k_FuGsptOi1NwchJ7Li1dGbAO6c";
const SPREADSHEET_ID = "1Ra6eJkcV0taM7807ihXXZvNVtBPHUAZQS7f9xtucLDc";
const SHEET_RANGE = 'A136:J236';

// --- HELPERS (Orchestrated Tempo & Zoom) ---
function waitForTab(tabId) {
    return new Promise((resolve) => {
        const listener = (id, info) => {
            if (id === tabId && info.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                resolve();
            }
        };
        chrome.tabs.onUpdated.addListener(listener);
    });
}

async function getAuthToken() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
            else resolve(token);
        });
    });
}

// --- CORE ACTIONS ---
async function handleCreateFolder(folderName, sendResponse) {
    try {
        const token = await getAuthToken();
        const response = await fetch("https://www.googleapis.com/drive/v3/files", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: folderName,
                mimeType: "application/vnd.google-apps.folder",
                parents: [MASTER_FOLDER_ID]
            })
        });
        const data = await response.json();
        sendResponse({ success: true, folderId: data.id });
    } catch (err) {
        sendResponse({ success: false, error: err.message });
    }
}

async function handleCaptureBatch(request, sendResponse) {
    const { folderId, url24h, url12mo } = request;
    try {
        await capturePage(url24h, folderId, "24h.png");
        await capturePage(url12mo, folderId, "12mo.png");
        sendResponse({ success: true });
    } catch (err) {
        sendResponse({ success: false, error: err.message });
    }
}

async function capturePage(url, folderId, fileName) {
    // 1. Create & Focus Tab
    const tab = await chrome.tabs.create({ url, active: true });
    await waitForTab(tab.id);

    // 2. Set Wide-Angle Zoom (50%)
    await chrome.tabs.setZoom(tab.id, 0.5);

    // 3. Even Tempo Wait (1.5s)
    await new Promise(r => setTimeout(r, 1500));

    // 4. Capture & Crop
    const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
    const croppedBlob = await cropImage(dataUrl);

    // 5. Upload to Drive
    await uploadToDrive(croppedBlob, folderId, fileName);

    // 6. Cleanup
    chrome.tabs.remove(tab.id);
}

async function cropImage(dataUrl) {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);

    // Wide-Angle Logic: 50% Zoom means sidebar is ~150px
    const cropX = 150;
    const cropY = 0;
    const canvas = new OffscreenCanvas(bitmap.width - cropX, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, cropX, cropY, bitmap.width - cropX, bitmap.height, 0, 0, bitmap.width - cropX, bitmap.height);

    return await canvas.convertToBlob({ type: 'image/png' });
}

async function uploadToDrive(blob, folderId, fileName) {
    const token = await getAuthToken();
    const metadata = { name: fileName, parents: [folderId] };
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', blob);

    await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form
    });
}

async function fetchSpreadsheetData() {
    try {
        const token = await getAuthToken();
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_RANGE}`;
        const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json();
        return data.values || [];
    } catch (err) {
        console.error("Sheet Fetch Error:", err);
        return [];
    }
}

// --- ROUTER ---
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "createFolder") {
        handleCreateFolder(request.folderName, sendResponse);
        return true;
    }
    if (request.action === "captureBatch") {
        handleCaptureBatch(request, sendResponse);
        return true;
    }
});

// Auto-show UI on tiiny.site
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (info.status === 'complete' && tab.url && tab.url.includes('tiiny.site')) {
        const sheetData = await fetchSpreadsheetData();
        chrome.tabs.sendMessage(tabId, { action: "showTile", spreadsheetData: sheetData });
    }
});
