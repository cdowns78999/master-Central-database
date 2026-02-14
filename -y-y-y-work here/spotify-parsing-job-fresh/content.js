console.log("Spotify Parsing Job [FRESH]: Master Content Script Loaded");
let globalArtistId = '';
let spreadsheetDataItems = [];

function isExtensionContextValid() {
    try {
        return !!(chrome.runtime && chrome.runtime.id);
    } catch (e) {
        return false;
    }
}

async function safeSendMessage(message) {
    if (!isExtensionContextValid()) {
        throw new Error("Extension reloaded - please refresh this page (F5)");
    }
    return new Promise((resolve, reject) => {
        try {
            chrome.runtime.sendMessage(message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    resolve(response);
                }
            });
        } catch (err) {
            reject(new Error("Extension reloaded - please refresh this page (F5)"));
        }
    });
}

function safeInit() {
    initBattleCommand();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
} else {
    safeInit();
}

window.addEventListener('load', () => {
    if (!document.getElementById('parsing-job-tile')) {
        safeInit();
    }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === "showTile") {
        if (message.spreadsheetData) {
            console.log("📊 Intelligent Sync: Received spreadsheet rows", message.spreadsheetData.length);
            spreadsheetDataItems = parseSpreadsheetRows(message.spreadsheetData);
        }

        if (!document.getElementById('parsing-job-tile')) {
            safeInit();
        } else if (spreadsheetDataItems.length > 0) {
            const tile = document.getElementById('parsing-job-tile');
            showBattleCommand(tile);
        }
        sendResponse({ success: true });
    }
});

function parseSpreadsheetRows(rows) {
    return rows.map(row => {
        const artist = row[0] || "Unknown Artist";
        const song = row[1] || "Unknown Song";
        const link = row[2] || "";
        const fallbackArtistId = row[3] || "";

        let songId = "";
        const match = link.match(/track\/([a-zA-Z0-9]+)/);
        if (match) songId = match[1];

        return { artist, song, songId, artistId: fallbackArtistId, spreadsheetManaged: true };
    }).filter(item => item.songId);
}

function initBattleCommand() {
    if (document.getElementById('parsing-job-tile')) return;
    if (!document.body) {
        setTimeout(initBattleCommand, 100);
        return;
    }

    const tile = document.createElement('div');
    tile.id = 'parsing-job-tile';
    tile.style.cssText = `
        position: fixed; top: 30px; right: 30px;
        width: 380px;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(35px) saturate(210%);
        -webkit-backdrop-filter: blur(35px) saturate(210%);
        border: 1px solid rgba(29, 185, 84, 0.2);
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

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes slideIn { from { opacity: 0; transform: translateX(40px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        #cluster-scroll-container::-webkit-scrollbar { width: 5px; }
        #cluster-scroll-container::-webkit-scrollbar-track { background: transparent; }
        #cluster-scroll-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .ios-btn {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            background: #1db954;
            color: #fff;
            border: none;
            border-radius: 22px;
            font-weight: 600;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
        }
        .ios-btn:hover { transform: scale(1.03); opacity: 0.95; box-shadow: 0 10px 20px rgba(29,185,84,0.25); }
        .ios-btn:active { transform: scale(0.97); }
        .ios-btn.secondary { background: rgba(0,0,0,0.05); color: #1db954; }
        .ios-btn.done { background: rgba(52, 199, 89, 0.1) !important; color: #34c759 !important; cursor: default; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 0.3s; }
        #battle-progress-hud {
            height: 4px; background: rgba(0,0,0,0.05); border-radius: 2px; overflow: hidden; display: none; margin-top: 10px;
        }
        #battle-progress-bar {
            height: 100%; width: 0%; background: #1db954; transition: width 0.5s ease;
        }
    `;
    document.head.appendChild(styleSheet);
    document.body.appendChild(tile);
    showOnMode(tile);
}

function showOnMode(tile) {
    tile.style.width = "380px";
    const hasSheetData = spreadsheetDataItems.length > 0;
    const buttonText = hasSheetData ? "Sync & Battle" : "Scan for Clusters";

    tile.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; background: #ff9500; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                <h2 style="margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.5px;">On Mode [FRESH]</h2>
            </div>
            <button id="close-battle-btn" style="background: transparent; border: none; font-size: 26px; color: #8e8e93; cursor: pointer;">&times;</button>
        </div>
        <p style="margin: 0; font-size: 15px; color: #3a3a3c; line-height: 1.5; font-weight: 450;">
            Waiting for data... Paste your code into the page and hit scan to initialize.
        </p>
        <div style="background: rgba(29, 185, 84, 0.05); padding: 15px; border-radius: 20px; border: 1px solid rgba(29, 185, 84, 0.1); margin: 5px 0;">
            <label style="display: block; font-size: 10px; font-weight: 800; color: #1db954; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Master Artist ID Override</label>
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
        setTimeout(() => showBattleCommand(tile), 500);
    };
}

function showBattleCommand(tile) {
    let clusters = [];
    if (spreadsheetDataItems.length > 0) {
        clusters = spreadsheetDataItems.map((item, index) => ({
            index, artist: item.artist, song: item.song, songId: item.songId, artistId: item.artistId, isSpreadsheet: true
        }));
    } else {
        const cards = document.querySelectorAll('.locked-card');
        if (cards.length === 0) {
            alert("Discovery Failed: No clusters detected.");
            return;
        }
        clusters = Array.from(cards).map((card, index) => ({
            index, artist: card.dataset.artistName || "Unknown Artist", song: card.dataset.songName || "Unknown Song", originalCard: card, isSpreadsheet: false
        }));
    }

    let rowsHtml = clusters.map(c => `
        <tr class="cluster-row" data-index="${c.index}" style="border-bottom: 1px solid rgba(0,0,0,0.03);">
            <td style="padding: 16px 10px; text-align: center;"><div class="status-dot" style="background: rgba(0,0,0,0.1); margin: 0 auto;"></div></td>
            <td style="padding: 16px 10px; font-weight: 700; font-size: 14px; color: #1c1c1e;">${c.artist}</td>
            <td style="padding: 16px 10px; font-size: 14px; color: #3a3a3c;">${c.song}</td>
            <td style="padding: 16px 10px; text-align: center;"><button class="ios-btn go-btn" style="height: 32px; width: 68px; font-size: 13px;">GO</button></td>
        </tr>
    `).join('');

    tile.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; background: #34c759; border-radius: 50%;"></div>
                <h2 style="margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.5px;">Battle Command [FRESH]</h2>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <button id="battle-all-btn" class="ios-btn" style="height: 32px; padding: 0 16px; font-size: 11px;">⚔️ BATTLE ALL</button>
                <button id="close-battle-btn" style="background: transparent; border: none; font-size: 26px; color: #8e8e93; cursor: pointer;">&times;</button>
            </div>
        </div>
        <div id="battle-progress-hud"><div id="battle-progress-bar"></div></div>
        <div id="cluster-scroll-container" style="max-height: 480px; overflow-y: auto; background: rgba(0,0,0,0.02); border-radius: 24px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead style="position: sticky; top: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); z-index: 2;">
                    <tr>
                        <th style="padding: 14px 10px; font-size: 10px; color: #8e8e93; text-transform: uppercase;">Status</th>
                        <th style="padding: 14px 10px; font-size: 10px; color: #8e8e93; text-transform: uppercase;">Artist</th>
                        <th style="padding: 14px 10px; font-size: 10px; color: #8e8e93; text-transform: uppercase;">Song</th>
                        <th style="padding: 14px 10px; font-size: 10px; color: #8e8e93; text-transform: uppercase;">Action</th>
                    </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>
        </div>
    `;

    document.getElementById('close-battle-btn').onclick = () => tile.remove();

    tile.querySelectorAll('.go-btn').forEach(btn => {
        btn.onclick = async (e) => {
            const row = e.target.closest('.cluster-row');
            const cluster = clusters[row.dataset.index];
            const dot = row.querySelector('.status-dot');

            btn.disabled = true;
            btn.textContent = "•••";
            dot.style.background = "#ffcc00";

            const result = await processCluster(cluster);
            if (result.success) {
                btn.textContent = "DONE";
                btn.classList.add('done');
                dot.style.background = "#34c759";
            } else {
                btn.disabled = false;
                btn.textContent = "RETRY";
                dot.style.background = "#ff3b30";
                if (result.error) alert(`⚠️ Error: ${result.error}`);
            }
        };
    });
}

async function processCluster(cluster) {
    const folderName = `${cluster.artist} - ${cluster.song}`;
    let artistId = globalArtistId;
    let songId = "";

    if (cluster.isSpreadsheet) {
        artistId = artistId || cluster.artistId;
        songId = cluster.songId;
    } else {
        artistId = artistId || cluster.originalCard.dataset.artistId;
        songId = cluster.originalCard.dataset.songId;
    }

    if (!artistId || !songId) return { success: false, error: "Missing IDs" };

    try {
        const folderResponse = await safeSendMessage({ action: "createFolder", folderName: folderName });
        if (!folderResponse?.success) return { success: false, error: folderResponse?.error };

        const url24h = `https://artists.spotify.com/c/artist/${artistId}/song/${songId}/playlists?time-filter=1day`;
        const url12mo = `https://artists.spotify.com/c/artist/${artistId}/song/${songId}/playlists?time-filter=1year`;

        const batchResponse = await safeSendMessage({
            action: "captureBatch", folderId: folderResponse.folderId, url24h, url12mo, artist: cluster.artist, song: cluster.song
        });

        return batchResponse?.success ? { success: true } : { success: false, error: batchResponse?.error };
    } catch (err) {
        return { success: false, error: err.message };
    }
}
