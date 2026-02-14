console.log("Spotify Parsing Job: Master Content Script Loaded");
let globalArtistId = '';
let spreadsheetDataItems = []; // Phase 18: Intelligent Data Sync

// Initialize immediately with fallback
function safeInit() {
    // console.log("Attempting to initialize Battle Command Tile...");
    initBattleCommand();
}

// Try multiple initialization approaches
// --- DEPRECATED: PLEASE DISABLE THIS EXTENSION ---
alert("⚠️ LEGACY EXTENSION DETECTED\n\nPlease DISABLE 'Spotify Parsing Job' in chrome://extensions.\nUse 'Spotifycopy [SYNC]' from Slot 7 instead.");
console.error("❌ LEGACY EXTENSION: Processing blocked. Use Slot 7.");

// Original logic below is disabled to prevent accidental screenshots
/*
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
} else {
    safeInit();
}
*/

// Also try on load as backup
window.addEventListener('load', () => {
    if (!document.getElementById('parsing-job-tile')) {
        // console.log("Tile not found on load, reinitializing...");
        safeInit();
    }
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === "showTile") {
        console.log("Received showTile message from background");

        // Phase 18: Store spreadsheet data if provided
        if (message.spreadsheetData) {
            console.log("📊 Intelligent Sync: Received spreadsheet rows", message.spreadsheetData.length);
            spreadsheetDataItems = parseSpreadsheetRows(message.spreadsheetData);
        }

        if (!document.getElementById('parsing-job-tile')) {
            safeInit();
        } else if (spreadsheetDataItems.length > 0) {
            // If tile already exists, refresh with sheet data if we just got it
            const tile = document.getElementById('parsing-job-tile');
            showBattleCommand(tile);
        }
        sendResponse({ success: true });
    }
});

function parseSpreadsheetRows(rows) {
    return rows.map(row => {
        // Assume E=Artist, F=Song, G=Link, H=ArtistID
        const artist = row[0] || "Unknown Artist";
        const song = row[1] || "Unknown Song";
        const link = row[2] || "";
        const fallbackArtistId = row[3] || "";

        // Extract song ID from link
        let songId = "";
        const match = link.match(/track\/([a-zA-Z0-9]+)/);
        if (match) songId = match[1];

        return { artist, song, songId, artistId: fallbackArtistId, spreadsheetManaged: true };
    }).filter(item => item.songId); // Only include if we have a valid song ID
}

function initBattleCommand() {
    if (document.getElementById('parsing-job-tile')) {
        // console.log("Tile already exists, skipping initialization");
        return;
    }

    // Ensure body exists
    if (!document.body) {
        console.log("Body not ready yet, waiting...");
        setTimeout(initBattleCommand, 100);
        return;
    }

    console.log("Creating Battle Command Tile...");

    // 1. Create the Master Tile (iOS 2026 Aesthetic)
    const tile = document.createElement('div');
    tile.id = 'parsing-job-tile';
    tile.style.cssText = `
        position: fixed; top: 30px; right: 30px;
        width: 380px;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(35px) saturate(210%);
        -webkit-backdrop-filter: blur(35px) saturate(210%);
        border: 1px solid rgba(0, 122, 255, 0.2);
        border-radius: 36px;
        padding: 30px;
        z-index: 2147483647;
        color: #1c1c1e;
        box-shadow: 0 25px 80px rgba(0,0,0,0.18), 0 0 1px rgba(0,0,0,0.1);
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif;
        transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex; flex-direction: column; gap: 20px;
    `;

    // 2. Add Animations
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes slideIn { from { opacity: 0; transform: translateX(40px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        #cluster-scroll-container::-webkit-scrollbar { width: 5px; }
        #cluster-scroll-container::-webkit-scrollbar-track { background: transparent; }
        #cluster-scroll-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .cluster-row { transition: background 0.3s; }
        .cluster-row:hover { background: rgba(0,0,0,0.02); }
        .ios-btn {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            background: #007aff;
            color: #fff;
            border: none;
            border-radius: 22px;
            font-weight: 600;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
        }
        .ios-btn:hover { transform: scale(1.03); opacity: 0.95; box-shadow: 0 10px 20px rgba(0,122,255,0.25); }
        .ios-btn:active { transform: scale(0.97); }
        .ios-btn.secondary { background: rgba(0,0,0,0.05); color: #007aff; }
        .ios-btn.secondary:hover { background: rgba(0,0,0,0.1); }
        .ios-btn.done { background: rgba(52, 199, 89, 0.1) !important; color: #34c759 !important; cursor: default; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 0.3s; }
        
        /* Progress Hub Styles */
        #battle-progress-hud {
            height: 4px; background: rgba(0,0,0,0.05); border-radius: 2px; overflow: hidden; display: none; margin-top: 10px;
        }
        #battle-progress-bar {
            height: 100%; width: 0%; background: #007aff; transition: width 0.5s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    // 3. Build the initial UI
    document.body.appendChild(tile);
    showOnMode(tile);
}

// Phase 1: On Mode (Waiting for Paste)
function showOnMode(tile) {
    tile.style.width = "380px";

    // Check if we already have spreadsheet data
    const hasSheetData = spreadsheetDataItems.length > 0;
    const buttonText = hasSheetData ? "Sync & Battle" : "Scan for Clusters";
    const statusText = hasSheetData
        ? `Found ${spreadsheetDataItems.length} songs in Spreadsheet.`
        : "Waiting for data... Paste your code into the page and hit scan to initialize.";

    tile.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; background: #ff9500; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                <h2 style="margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.5px;">On Mode</h2>
            </div>
            <button id="close-battle-btn" style="background: transparent; border: none; font-size: 26px; color: #8e8e93; cursor: pointer;">&times;</button>
        </div>
        <p style="margin: 0; font-size: 15px; color: #3a3a3c; line-height: 1.5; font-weight: 450;">
            ${statusText}
        </p>
        <div style="background: rgba(0,122,255,0.05); padding: 15px; border-radius: 20px; border: 1px solid rgba(0,122,255,0.1); margin: 5px 0;">
            <label style="display: block; font-size: 10px; font-weight: 800; color: #007aff; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Master Artist ID Override</label>
            <input type="text" id="global-artist-id-input" placeholder="Optional: Enter Artist ID..." 
                style="width: 100%; background: transparent; border: none; font-size: 14px; outline: none; color: #1c1c1e;"
                value="${globalArtistId}">
        </div>
        <button id="scan-battle-btn" class="ios-btn" style="height: 52px; font-size: 16px;">
            ${buttonText}
        </button>
    `;

    document.getElementById('close-battle-btn').onclick = () => tile.remove();
    document.getElementById('scan-battle-btn').onclick = () => {
        globalArtistId = document.getElementById('global-artist-id-input').value.trim();
        if (globalArtistId) console.log("🎯 Global Artist ID Override Set:", globalArtistId);
        // Give the page a moment to finish creating cards
        setTimeout(() => showBattleCommand(tile), 500);
    };
}

// Phase 2: Battle Command (The Grid)
function showBattleCommand(tile) {
    let clusters = [];

    // Prioritize Spreadsheet Data
    if (spreadsheetDataItems.length > 0) {
        console.log("📊 UI: Loading rows from Spreadsheet Data");
        clusters = spreadsheetDataItems.map((item, index) => ({
            index,
            artist: item.artist,
            song: item.song,
            songId: item.songId,
            artistId: item.artistId,
            isSpreadsheet: true
        }));
    } else {
        // Fallback to DOM Scan
        const cards = document.querySelectorAll('.locked-card');
        if (cards.length === 0) {
            alert("Discovery Failed: No clusters detected. Please paste your data first.");
            return;
        }
        clusters = Array.from(cards).map((card, index) => ({
            index,
            artist: card.dataset.artistName || "Unknown Artist",
            song: card.dataset.songName || "Unknown Song",
            originalCard: card,
            isSpreadsheet: false
        }));
    }

    let rowsHtml = clusters.map(c => `
        <tr class="cluster-row" data-index="${c.index}" style="border-bottom: 1px solid rgba(0,0,0,0.03);">
            <td style="padding: 16px 10px; text-align: center;">
                <div class="status-dot" style="background: rgba(0,0,0,0.1); margin: 0 auto;"></div>
            </td>
            <td style="padding: 16px 10px; font-weight: 700; font-size: 14px; color: #1c1c1e;">${c.artist}</td>
            <td style="padding: 16px 10px; font-size: 14px; color: #3a3a3c;">${c.song}</td>
            <td style="padding: 16px 10px; text-align: center;">
                <button class="ios-btn go-btn" style="height: 32px; width: 68px; font-size: 13px;">GO</button>
            </td>
        </tr>
    `).join('');

    tile.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; background: #34c759; border-radius: 50%;"></div>
                <h2 style="margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.5px;">Battle Command</h2>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <button id="battle-all-btn" class="ios-btn" style="height: 32px; padding: 0 16px; font-size: 11px; background: #007aff;">⚔️ BATTLE ALL</button>
                <a href="https://drive.google.com/drive/folders/1qyzU7k_FuGsptOi1NwchJ7Li1dGbAO6c" target="_blank" 
                   style="font-size: 11px; font-weight: 700; color: #007aff; text-decoration: none; background: rgba(0,122,255,0.1); padding: 6px 14px; border-radius: 12px;">📂 MASTER DRIVE</a>
                <button id="rescan-battle-btn" style="background: rgba(0,0,0,0.05); border: none; border-radius: 12px; padding: 6px 14px; font-size: 11px; font-weight: 700; color: #8e8e93; cursor: pointer;">RESCAN</button>
                <button id="close-battle-btn" style="background: transparent; border: none; font-size: 26px; color: #8e8e93; cursor: pointer;">&times;</button>
            </div>
        </div>

        <div id="battle-progress-hud">
            <div id="battle-progress-bar"></div>
        </div>
        
        <div id="cluster-scroll-container" style="max-height: 480px; overflow-y: auto; background: rgba(0,0,0,0.02); border-radius: 24px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead style="position: sticky; top: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); z-index: 2;">
                    <tr>
                        <th style="padding: 14px 10px; font-size: 10px; color: #8e8e93; text-transform: uppercase; letter-spacing: 0.8px; text-align: center; width: 60px;">Status</th>
                        <th style="padding: 14px 10px; font-size: 10px; color: #8e8e93; text-transform: uppercase; letter-spacing: 0.8px;">Artist</th>
                        <th style="padding: 14px 10px; font-size: 10px; color: #8e8e93; text-transform: uppercase; letter-spacing: 0.8px;">Song</th>
                        <th style="padding: 14px 10px; font-size: 10px; color: #8e8e93; text-transform: uppercase; letter-spacing: 0.8px; text-align: center; width: 100px;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('close-battle-btn').onclick = () => tile.remove();
    document.getElementById('rescan-battle-btn').onclick = () => showOnMode(tile);

    let masterOpenedThisSession = false;

    // --- BUTTON LOGIC: GO ---
    tile.querySelectorAll('.go-btn').forEach(btn => {
        btn.onclick = async (e) => {
            const row = e.target.closest('.cluster-row');
            const cluster = clusters[row.dataset.index];
            const dot = row.querySelector('.status-dot');

            // Logic: Auto-open Master Folder on the FIRST 'GO' of the session
            if (!masterOpenedThisSession) {
                window.open("https://drive.google.com/drive/folders/1qyzU7k_FuGsptOi1NwchJ7Li1dGbAO6c", "_blank");
                masterOpenedThisSession = true;
            }

            btn.disabled = true;
            btn.textContent = "•••";
            dot.style.background = "#ffcc00"; // Yellow: Syncing

            // processCluster will now return the folderId if successful
            const result = await processCluster(cluster);

            if (result.success) {
                btn.textContent = "OPEN FOLDER";
                btn.disabled = false;
                btn.classList.add('done');
                btn.style.background = "#34c759";
                btn.style.width = "100px";
                btn.style.color = "white";
                btn.onclick = () => window.open(`https://drive.google.com/drive/folders/${result.folderId}`, '_blank');

                dot.style.background = "#34c759"; // Green: Complete
                dot.style.boxShadow = "0 0 8px rgba(52, 199, 89, 0.4)";
                btn.style.opacity = "1.0";
            } else {
                btn.disabled = false;
                btn.textContent = "RETRY";
                dot.style.background = "#ff3b30"; // Red: Fail
                if (result.error) alert(`⚠️ Error: ${result.error}`);
            }
        };
    });

    // --- BATTLE ALL ENGINE ---
    let battleAbort = false;
    let battleActive = false;

    // Safety Lock Logic
    window.onbeforeunload = function (e) {
        if (battleActive) {
            e.preventDefault();
            e.returnValue = "Mission in progress! If you leave now, the current Battle will be cancelled. Are you sure?";
            return e.returnValue;
        }
    };

    document.getElementById('battle-all-btn').onclick = async () => {
        const btn = document.getElementById('battle-all-btn');
        if (btn.classList.contains('active-battle')) {
            battleAbort = true;
            btn.textContent = "⚔️ STOPPING...";
            return;
        }

        const rows = Array.from(tile.querySelectorAll('.cluster-row')).filter(r => !r.querySelector('.go-btn').classList.contains('done'));
        if (rows.length === 0) {
            alert("No pending songs found in the list.");
            return;
        }

        btn.classList.add('active-battle');
        btn.style.background = "#ff3b30";
        btn.textContent = "🛑 STOP BATTLE";
        battleActive = true; // ENGAGE LOCK

        const hud = document.getElementById('battle-progress-hud');
        const bar = document.getElementById('battle-progress-bar');
        hud.style.display = 'block';

        let completed = 0;
        for (const row of rows) {
            if (battleAbort) break;

            const goBtn = row.querySelector('.go-btn');
            // Trigger the click logic we already built
            await goBtn.click();

            // Wait for completion (Watch the button text)
            while (goBtn.textContent === "•••" && !battleAbort) {
                await new Promise(r => setTimeout(r, 1000));
            }

            completed++;
            bar.style.width = `${(completed / rows.length) * 100}%`;

            // Even Tempo Heartbeat (1.5s)
            if (!battleAbort && completed < rows.length) {
                await new Promise(r => setTimeout(r, 1500));
            }
        }

        btn.classList.remove('active-battle');
        btn.style.background = "#007aff";
        btn.textContent = "⚔️ BATTLE ALL";
        battleAbort = false;
        battleActive = false; // RELEASE LOCK

        if (!battleAbort) {
            alert("✨ BATTLE COMPLETE: All pending rows processed!");
        }
    };
}

// Logic: Cluster Extraction
async function processCluster(cluster) {
    const folderName = `${cluster.artist} - ${cluster.song}`;

    let artistId = globalArtistId;
    let songId = "";

    if (cluster.isSpreadsheet) {
        artistId = artistId || cluster.artistId;
        songId = cluster.songId;
    } else {
        const card = cluster.originalCard;
        artistId = artistId || card.dataset.artistId;
        songId = card.dataset.songId;
    }

    artistId = (artistId || '').trim();
    songId = (songId || '').trim();

    if (!artistId || !songId) {
        return { success: false, error: `Missing IDs (Artist: ${artistId || 'None'}, Song: ${songId || 'None'})` };
    }

    try {
        // 1. Create Folder
        console.log(`📤 Sending createFolder message for: ${folderName}`);
        const folderResponse = await chrome.runtime.sendMessage({ action: "createFolder", folderName: folderName });

        if (!folderResponse || !folderResponse.success) {
            console.error("❌ Failed to create folder:", folderResponse?.error);
            return false;
        }
        const folderId = folderResponse.folderId;
        console.log(`✅ Folder created: ${folderId}`);

        // 2. Build URLs
        const url24h = `https://artists.spotify.com/c/artist/${artistId}/song/${songId}/playlists?time-filter=1day`;
        const url12mo = `https://artists.spotify.com/c/artist/${artistId}/song/${songId}/playlists?time-filter=1year`;

        // 3. Trigger Batch Capture in Background (Dual Screenshots)
        console.log("📸 Triggering batch capture (24h & 12mo)...");
        const batchResponse = await chrome.runtime.sendMessage({
            action: "captureBatch",
            folderId: folderId,
            url24h: url24h,
            url12mo: url12mo,
            artist: cluster.artist,
            song: cluster.song
        });

        if (batchResponse && batchResponse.success) {
            console.log(`✅ Successfully processed: ${folderName}`);
            return { success: true, folderId: folderId };
        } else {
            console.error("❌ Batch Capture Error:", batchResponse?.error);
            return { success: false, error: batchResponse?.error };
        }
    } catch (err) {
        console.error("❌ Cluster Process Error:", err);
        return { success: false, error: err.message };
    }
}

