const SPREADSHEET_ID = "1Ra6eJkcV0taM7807ihXXZvNVtBPHUAZQS7f9xtucLDc";
const DATA_READ_RANGE = "B136:H236"; // Expanded to include Amount (B) if possible, or just E:H
const RESULT_WRITE_START_COL = "I";

// --- HELPERS ---
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

function getAuthToken() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
            else resolve(token);
        });
    });
}

// --- CORE SCRAPING & SYNC LOGIC ---

async function handleScrapeAndSync(request, sendResponse) {
    const { artistId, songId, targetAmount, rowIndex, songName } = request;
    const tempo = 2000;

    try {
        const url24h = `https://artists.spotify.com/c/artist/${artistId}/song/${songId}/playlists?time-filter=1day`;
        const url1yr = `https://artists.spotify.com/c/artist/${artistId}/song/${songId}/playlists?time-filter=1year`;

        // 1. Rhythmic Opening
        const tab24h = await chrome.tabs.create({ url: url24h, active: true });
        const tab1yr = await chrome.tabs.create({ url: url1yr, active: false });

        await Promise.all([waitForTab(tab24h.id), waitForTab(tab1yr.id)]);
        await new Promise(r => setTimeout(r, tempo)); // Settle

        // 2. Scrape 24h Data
        const res24h = await chrome.scripting.executeScript({
            target: { tabId: tab24h.id },
            func: () => ({ daily: document.querySelector('[data-testid="stats-value"]')?.textContent || "0" })
        });
        const daily = parseInt(res24h[0].result.daily.replace(/,/g, '')) || 0;

        // 3. Scrape 1yr Data
        await chrome.tabs.update(tab1yr.id, { active: true });
        await new Promise(r => setTimeout(r, tempo));

        const res1yr = await chrome.scripting.executeScript({
            target: { tabId: tab1yr.id },
            func: () => {
                const rows = Array.from(document.querySelectorAll('tr'));
                let playlistTotal = 0;
                let algoStreams = 0;
                let playlistCount = 0;
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length < 3) return;
                    const name = cells[0].textContent.toLowerCase();
                    const streams = parseInt(cells[2].textContent.replace(/,/g, '')) || 0;
                    if (streams > 0) {
                        playlistCount++;
                        playlistTotal += streams;
                        if (name.includes('radio') || name.includes('autoplay') || name.includes('discover') || name.includes('daily mix')) {
                            algoStreams += streams;
                        }
                    }
                });
                return { playlistTotal, algoStreams, playlistCount };
            }
        });
        const data1yr = res1yr[0].result;

        chrome.tabs.remove([tab24h.id, tab1yr.id]);

        // 4. Calculate Final Metrics
        const algoRatio = daily > 0 ? ((data1yr.algoStreams / daily) * 100).toFixed(2) : "0.00";
        const streamsLeftNum = targetAmount - data1yr.playlistTotal;
        const isDone = streamsLeftNum <= 0;
        const streamsLeft = isDone ? "Done ✅" : streamsLeftNum.toLocaleString();
        const daysLeft = isDone ? "No Streams left ❓" : Math.ceil(streamsLeftNum / (daily || 1)) + " Days";

        const resultRow = [
            "X", // Col I (Marker)
            daily.toLocaleString(), // Col J
            data1yr.playlistTotal.toLocaleString(), // Col K
            data1yr.algoStreams.toLocaleString(), // Col L
            `${algoRatio}% ⭐`, // Col M
            streamsLeft, // Col N
            `${data1yr.playlistCount} Playlists`, // Col O
            daysLeft, // Col P
            "" // Col Q (Buffer)
        ];

        // 5. SYNC TO SPREADSHEET IMMEDIATELY (Like original did with Folders)
        const rowNum = 136 + rowIndex;
        await updateSpreadsheetRow(rowNum, resultRow);

        sendResponse({
            success: true, data: {
                daily: daily.toLocaleString(),
                playlistTotal: data1yr.playlistTotal.toLocaleString(),
                algoStreams: data1yr.algoStreams.toLocaleString(),
                algoRatio,
                streamsLeft,
                playlistCount: data1yr.playlistCount,
                daysLeft
            }
        });

    } catch (err) {
        console.error("❌ Process Error:", err);
        sendResponse({ success: false, error: err.message });
    }
}

async function updateSpreadsheetRow(rowNumber, rowData) {
    const token = await getAuthToken();
    const range = `I${rowNumber}:Q${rowNumber}`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`;

    await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: [rowData] })
    });
}

// --- MAIN ROUTER ---
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(`[Spotifycopy] Received Action: ${request.action}`);
    if (request.action === "scrapeAndSync") {
        handleScrapeAndSync(request, sendResponse);
        return true;
    }
});


// --- ACTION HANDLER ---
chrome.action.onClicked.addListener(async () => {
    const tiinyTab = await chrome.tabs.create({ url: "https://spotify-tracker.tiiny.site/" });

    let sheetData = [];
    try {
        const token = await getAuthToken();
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/B136:H236`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        sheetData = data.values || [];
    } catch (err) { console.error("Sheets Fetch Error:", err); }

    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tiinyTab.id && info.status === 'complete') {
            chrome.tabs.sendMessage(tabId, { action: "showTile", spreadsheetData: sheetData });
            chrome.tabs.onUpdated.removeListener(listener);
        }
    });
});
