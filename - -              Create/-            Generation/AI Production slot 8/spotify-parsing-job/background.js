const MASTER_FOLDER_ID = "1qyzU7k_FuGsptOi1NwchJ7Li1dGbAO6c";
const SPREADSHEET_ID = "1Ra6eJkcV0taM7807ihXXZvNVtBPHUAZQS7f9xtucLDc";
const DATA_RANGE = "E136:H236";

// --- STEALTH & JITTER UTILS ---
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TIMING_CYCLE = [
    { a: 3200, b: 3500 }, // Job 1: Quick Start
    { a: 4100, b: 3100 }, // Job 2: Slight Hesitation
    { a: 3400, b: 4800 }, // Job 3: Distracted Finish
    { a: 5200, b: 3300 }  // Job 4: Slow Reset
];

// --- HELPERS (With Orchestrated Cropping & Zoom) ---
function waitForTab(tabId) {
    return new Promise((resolve) => {
        chrome.tabs.get(tabId, (tab) => {
            if (tab && tab.status === 'complete') return resolve();
            const listener = (id, info) => {
                if (id === tabId && info.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    resolve();
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
        });
    });
}

// Fixed-Slice Layout Detection (Adapted for 50% Deep Zoom)
async function getLayout(tabId) {
    try {
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => ({
                x: 150, // Reduced from 200px because 50% zoom makes sidebar even narrower
                y: 0,
                width: Math.max(0, window.innerWidth - 150),
                height: window.innerHeight,
                dpr: window.devicePixelRatio
            })
        });
        return result;
    } catch (err) {
        return null;
    }
}

async function finalizeTab(rawDataUrl, layout, tabId, folderId, fileName) {
    try {
        let finalDataUrl = rawDataUrl;

        // Apply the Wide-Angle Left-Slice Crop
        if (layout) {
            finalDataUrl = await cropImage(rawDataUrl, layout);
        }

        const blob = dataURItoBlob(finalDataUrl);
        const token = await getAuthToken();

        const metadata = { name: fileName, parents: [folderId] };
        const formData = new FormData();
        formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        formData.append("file", blob);

        await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
    } catch (err) {
        console.error(`❌ Background Process error:`, err);
    } finally {
        // Tab is closed by the caller in the main loop for better control
    }
}

// --- DATA SNATCHER (The "Moment" Logic) ---
async function snatchArtistId(songId, existingTabId = null) {
    let tabId = existingTabId;
    let ownTab = false;

    if (!tabId) {
        const tab = await chrome.tabs.create({ url: `https://open.spotify.com/track/${songId}`, active: false });
        tabId = tab.id;
        ownTab = true;
        await waitForTab(tabId);
    }

    try {
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => {
                // Look for the artist link in the metadata or UI
                const artistLink = document.querySelector('a[href*="/artist/"]');
                if (artistLink) {
                    const match = artistLink.href.match(/artist\/([a-zA-Z0-9]+)/);
                    return match ? match[1] : null;
                }
                return null;
            }
        });

        if (ownTab) chrome.tabs.remove(tabId);
        return result;
    } catch (err) {
        if (ownTab) chrome.tabs.remove(tabId);
        return null;
    }
}

// --- CORE HANDLERS ---
async function handleCaptureBatch(request, sendResponse) {
    let { folderId, artistId, songId, jobIndex } = request;
    
    // Choose timing: Default to Job 1 if no index provided (for single 'GO' clicks)
    const cyclePos = (jobIndex !== undefined) ? (jobIndex % 4) : 0;
    const timing = TIMING_CYCLE[cyclePos];

    try {
        // Step 0: Initial Stealth Delay (Randomized entry)
        await new Promise(r => setTimeout(r, getRandomDelay(1500, 3000)));

        // Phase 1: The "Moment" (Snatch ID if missing)
        if (!artistId || artistId === "undefined") {
            console.log(`🕵️ Artist ID missing. [Cycle ${cyclePos + 1}] Snatch Mode...`);
            artistId = await snatchArtistId(songId);
            if (!artistId) throw new Error("Could not snatch Artist ID automatically.");
        }

        // Phase 2: Open Reports
        const url24h = `https://artists.spotify.com/c/artist/${artistId}/song/${songId}/playlists?time-filter=1day`;
        const url12mo = `https://artists.spotify.com/c/artist/${artistId}/song/${songId}/playlists?time-filter=1year`;

        const tab24h = await chrome.tabs.create({ url: url24h, active: true });
        await waitForTab(tab24h.id);
        await chrome.tabs.setZoom(tab24h.id, 0.5);

        // Phase 3: Screenshot 1 (Specific Cycle Timing)
        console.log(`⏱️ [Job ${cyclePos + 1}] Set A: Waiting ${timing.a}ms...`);
        await new Promise(r => setTimeout(r, timing.a));

        const data24h = await chrome.tabs.captureVisibleTab(null, { format: "png" });
        const layout24h = await getLayout(tab24h.id);
        finalizeTab(data24h, layout24h, tab24h.id, folderId, "24h.png");

        // Phase 4: Transition Delay (Small random jitter)
        await new Promise(r => setTimeout(r, getRandomDelay(1000, 2000)));

        // Phase 5: Screenshot 2 (Specific Cycle Timing)
        await chrome.tabs.update(tab24h.id, { url: url12mo }); 
        await waitForTab(tab24h.id);
        await chrome.tabs.setZoom(tab24h.id, 0.5);

        console.log(`⏱️ [Job ${cyclePos + 1}] Set B: Waiting ${timing.b}ms...`);
        await new Promise(r => setTimeout(r, timing.b));

        const data12mo = await chrome.tabs.captureVisibleTab(null, { format: "png" });
        const layout12mo = await getLayout(tab24h.id);
        finalizeTab(data12mo, layout12mo, tab24h.id, folderId, "12mo.png");

        // Delayed cleanup
        setTimeout(() => chrome.tabs.remove(tab24h.id), 2000);

        sendResponse({ success: true });
    } catch (err) {
        sendResponse({ success: false, error: err.message });
    }
}

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
        if (data.id) sendResponse({ success: true, folderId: data.id });
        else throw new Error(data.error?.message || "Folder failure");
    } catch (err) {
        sendResponse({ success: false, error: err.message });
    }
}

// --- MAIN ROUTER ---
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

// --- UTILS ---
function getAuthToken() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
            else resolve(token);
        });
    });
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ab], { type: mimeString });
}

async function cropImage(dataUrl, layout) {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);

    const cropX = layout.x * layout.dpr;
    const cropY = layout.y * layout.dpr;
    const cropW = layout.width * layout.dpr;
    const cropH = layout.height * layout.dpr;

    const canvas = new OffscreenCanvas(cropW, cropH);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const croppedBlob = await canvas.convertToBlob({ type: 'image/png' });
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(croppedBlob);
    });
}

// 1. Open Tiiny site on action click & Fetch Data
chrome.action.onClicked.addListener(async () => {
    // Open tabs
    const tiinyTab = await chrome.tabs.create({ url: "https://spotify-tracker.tiiny.site/" });
    await chrome.tabs.create({ url: "https://docs.google.com/spreadsheets/d/1Ra6eJkcV0taM7807ihXXZvNVtBPHUAZQS7f9xtucLDc/edit?gid=0#gid=0" });

    // Fetch Spreadsheet Data in background
    let sheetData = null;
    try {
        sheetData = await fetchSpreadsheetData();
    } catch (err) {
        console.error("❌ Failed to fetch spreadsheet data:", err);
    }

    // Wait for Tiiny tab to load, then send data
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tiinyTab.id && info.status === 'complete') {
            chrome.tabs.sendMessage(tabId, {
                action: "showTile",
                spreadsheetData: sheetData
            });
            chrome.tabs.onUpdated.removeListener(listener);
        }
    });
});

async function fetchSpreadsheetData() {
    const token = await getAuthToken();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${DATA_RANGE}`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error(`Sheets API responded with ${response.status}`);
    }

    const data = await response.json();
    return data.values || []; // Array of arrays
}
