const MASTER_FOLDER_ID = "1qyzU7k_FuGsptOi1NwchJ7Li1dGbAO6c";

// 1. Open Tiiny site on action click
chrome.action.onClicked.addListener(async () => {
    // First, open the Tiiny site
    const tiinyTab = await chrome.tabs.create({ url: "https://spotify-tracker.tiiny.site/" });

    // Second, open the Google Sheets in a new tab
    await chrome.tabs.create({ url: "https://docs.google.com/spreadsheets/d/1Ra6eJkcV0taM7807ihXXZvNVtBPHUAZQS7f9xtucLDc/edit?gid=0#gid=0" });

    // Wait for Tiiny tab to load, then trigger the tile
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tiinyTab.id && info.status === 'complete') {
            chrome.tabs.sendMessage(tabId, { action: "showTile" });
            chrome.tabs.onUpdated.removeListener(listener);
        }
    });
});

// 2. Messaging Router
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

async function handleCaptureBatch(request, sendResponse) {
    const { folderId, url24h, url12mo, artist, song } = request;
    console.log(`🚀 Starting sequential foreground capture for: ${artist} - ${song}`);

    try {
        // Run captures SEQUENTIALLY to ensure foreground focus for each
        await capturePage(url24h, folderId, "24h.png");
        await capturePage(url12mo, folderId, "12mo.png");

        console.log(`✅ Sequential capture complete: ${artist} - ${song}`);
        sendResponse({ success: true });
    } catch (err) {
        console.error(`❌ Batch capture failed:`, err);
        sendResponse({ success: false, error: err.message });
    }
}

async function capturePage(url, folderId, fileName) {
    // Get the current dashboard tab to return to it later
    const [originalTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Create tab and IMMEDIATELY activate it (Anti-Throttling)
    const tab = await chrome.tabs.create({ url, active: true });

    // Wait for complete status
    await new Promise((resolve) => {
        const listener = (tabId, info) => {
            if (tabId === tab.id && info.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                resolve();
            }
        };
        chrome.tabs.onUpdated.addListener(listener);
    });

    // 2. Wait in FOREGROUND (5s is enough when tab is focused)
    console.log(`⏳ Tab active. Waiting 5s for foreground charts to paint...`);
    await new Promise(r => setTimeout(r, 5000));

    // CHECK: Did we redirect to a login page?
    const currentTab = await chrome.tabs.get(tab.id);
    if (currentTab.url.includes("accounts.spotify.com") || currentTab.url.includes("/login")) {
        console.error("❌ Session Lost: Redirected to login page.");
        throw new Error("Spotify Session Lost: Please log in to Spotify For Artists and try again.");
    }

    // Capture using standard Google tool (Seamless)
    const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: "png" });

    // Return focus to the dashboard ASAP (but the next capture will steal it again if sequential)
    if (originalTab) {
        await chrome.tabs.update(originalTab.id, { active: true });
    }

    // Upload to Drive
    const blob = dataURItoBlob(dataUrl);
    const token = await getAuthToken();

    const metadata = { name: fileName, parents: [folderId] };
    const formData = new FormData();
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    formData.append("file", blob);

    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });

    const data = await response.json();
    if (!data.id) throw new Error(`Upload failed for ${fileName}`);

    console.log(`✅ Captured and uploaded: ${fileName}`);
}

function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

async function handleCreateFolder(folderName, sendResponse) {
    console.log(`📁 Attempting to create folder: ${folderName}`);
    try {
        console.log("🔑 Getting auth token...");
        const token = await getAuthToken();
        console.log("✅ Got auth token");

        console.log(`📤 Creating folder in parent: ${MASTER_FOLDER_ID}`);
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
        console.log("📥 API Response:", data);

        if (data.id) {
            console.log(`✅ Folder created successfully: ${data.id}`);
            sendResponse({ success: true, folderId: data.id });
        } else {
            const errorMsg = data.error?.message || "Folder creation failed";
            console.error("❌ Folder creation failed:", errorMsg);
            throw new Error(errorMsg);
        }
    } catch (err) {
        console.error("❌ Error in handleCreateFolder:", err);
        sendResponse({ success: false, error: err.message });
    }
}

async function handleCaptureAndUpload(folderId, fileName, sendResponse) {
    try {
        // Capture active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" });

        // Convert to Blob
        const blob = dataURItoBlob(dataUrl);
        const token = await getAuthToken();

        // Upload to Drive
        const metadata = {
            name: fileName,
            parents: [folderId]
        };

        const formData = new FormData();
        formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        formData.append("file", blob);

        const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const data = await response.json();
        sendResponse({ success: !!data.id });
    } catch (err) {
        sendResponse({ success: false, error: err.message });
    }
}

function getAuthToken() {
    console.log("🔐 Requesting OAuth token...");
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) {
                console.error("❌ Auth error:", chrome.runtime.lastError);
                reject(chrome.runtime.lastError);
            } else {
                console.log("✅ Token obtained successfully");
                resolve(token);
            }
        });
    });
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
