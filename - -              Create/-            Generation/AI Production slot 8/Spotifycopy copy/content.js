console.log("Spotifycopy: Master Content Script Loaded");

let globalArtistId = '';
let spreadsheetDataItems = [];
let masterResults = {};

// Initialize immediately
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
        console.log("Received showTile message from background");
        if (message.spreadsheetData) {
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
        // Based on B136:H236 fetch: B=Amount(0), E=Artist(3), F=Song(4), G=Link(5), H=ArtistID(6)
        const amount = row[0] || "10000";
        const artist = row[3] || "Unknown Artist";
        const song = row[4] || "Unknown Song";
        const link = row[5] || "";
        const fallbackArtistId = row[6] || "";

        let songId = "";
        const match = link.match(/track\/([a-zA-Z0-9]+)/);
        if (match) songId = match[1];

        return { artist, song, songId, artistId: fallbackArtistId, amount, spreadsheetManaged: true };
    }).filter(item => item.songId);
}

function initBattleCommand() {
    if (document.getElementById('parsing-job-tile')) return;
    if (!document.body) {
        setTimeout(initBattleCommand, 100);
        return;
    }

    console.log("Creating Battle Command Tile...");
    const tile = document.createElement('div');
    tile.id = 'parsing-job-tile';
    tile.style.cssText = `
        position: fixed; top: 30px; right: 30px;
        width: 440px; background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(40px) saturate(210%); -webkit-backdrop-filter: blur(40px) saturate(210%);
        border: 1px solid rgba(0, 122, 255, 0.2); border-radius: 36px;
        padding: 30px; z-index: 2147483647; color: #1c1c1e;
        box-shadow: 0 25px 80px rgba(0,0,0,0.18); font-family: -apple-system, system-ui, sans-serif;
        display: flex; flex-direction: column; gap: 20px;
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        #cluster-scroll-container::-webkit-scrollbar { width: 5px; }
        .ios-btn {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            background: #007aff; color: #fff; border: none; border-radius: 20px;
            font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .ios-btn:hover { transform: scale(1.02); }
        .ios-btn.done { background: #34c759 !important; }
        .status-dot { width: 10px; height: 10px; border-radius: 50%; background: #ddd; }
        #battle-progress-hud { height: 4px; background: rgba(0,0,0,0.05); border-radius: 2px; overflow: hidden; display: none; margin-top: 10px; }
        #battle-progress-bar { height: 100%; width: 0%; background: #007aff; transition: width 0.3s; }
    `;
    document.head.appendChild(styleSheet);
    document.body.appendChild(tile);
    showOnMode(tile);
}

function showOnMode(tile) {
    tile.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; background: #ff9500; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                <h2 style="margin: 0; font-size: 18px; font-weight: 800;">Spotifycopy [SYNC]</h2>
            </div>
            <button id="close-tile" style="background:none; border:none; font-size: 24px; cursor:pointer; color:#8e8e93;">&times;</button>
        </div>

        <p style="font-size: 14px; margin:0;">Waiting for data... Synced ${spreadsheetDataItems.length} songs from Sheet.</p>
        <button id="scan-battle-btn" class="ios-btn" style="height: 52px; font-size: 16px;">ENTER BATTLE COMMAND</button>
    `;
    document.getElementById('close-tile').onclick = () => tile.remove();
    document.getElementById('scan-battle-btn').onclick = () => showBattleCommand(tile);
}

function showBattleCommand(tile) {
    let clusters = spreadsheetDataItems.map((item, index) => ({ ...item, index }));

    let rowsHtml = clusters.map(c => `
        <tr class="cluster-row" data-index="${c.index}" style="border-bottom: 1px solid rgba(0,0,0,0.03);">
            <td style="padding: 14px 10px; text-align: center;"><div class="status-dot"></div></td>
            <td style="padding: 14px 10px; font-size: 13px;"><b>${c.artist}</b><br><span style="color:#8e8e93">${c.song}</span></td>
            <td style="padding: 14px 10px; text-align: center;">
                <button class="ios-btn go-btn" style="height: 30px; width: 68px; font-size: 12px;">GO</button>
            </td>
        </tr>
    `).join('');

    tile.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; background: #34c759; border-radius: 50%;"></div>
                <h2 style="margin: 0; font-size: 18px; font-weight: 800;">Battle Command</h2>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <button id="copy-master-btn" class="ios-btn" style="height:32px; padding:0 14px; font-size:11px; background:#ff3b30; display:none; border: 2px solid #fff;">📋 COPY TO CLIPBOARD</button>
                <button id="battle-all-btn" class="ios-btn" style="height: 32px; padding: 0 12px; font-size: 11px;">⚔️ BATTLE 20</button>
                <button id="close-tile" style="background:none; border:none; font-size: 26px; cursor:pointer; color:#8e8e93;">&times;</button>
            </div>

        </div>
        <div id="battle-progress-hud"><div id="battle-progress-bar"></div></div>
        <div id="cluster-scroll-container" style="max-height: 480px; overflow-y: auto; background: rgba(0,0,0,0.02); border-radius: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead style="position: sticky; top: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);">
                    <tr style="font-size: 10px; color: #8e8e93; text-transform: uppercase;">
                        <th style="padding: 12px 10px; width: 60px;">Stat</th>
                        <th style="padding: 12px 10px; text-align: left;">Identity</th>
                        <th style="padding: 12px 10px; width: 100px;">Action</th>
                    </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>
        </div>
    `;

    const copyMasterBtn = document.getElementById('copy-master-btn');
    const updateMasterUI = () => {
        const count = Object.keys(masterResults).length;
        if (count > 0) {
            copyMasterBtn.style.display = 'flex';
            copyMasterBtn.textContent = `📋 COPY TO CLIPBOARD (${count})`;
        }
    };


    copyMasterBtn.onclick = () => {
        const header = "Name\tAmount\t\t Daily Streams \tTotal Indie Playlist Streams \tAlgorithm Streams\tAlgorithmic Ratio\t Streams Left \tPlaylist Count\t Days Left";
        const rows = clusters
            .filter(c => masterResults[c.index])
            .map(c => {
                const r = masterResults[c.index];
                return `${c.song}\t${c.amount}\tX\t ${r.daily} \t  ${r.playlistTotal} \t  ${r.algoStreams} \t${r.algoRatio}% ⭐\t ${r.streamsLeft} \t${r.playlistCount} Playlists\t ${r.daysLeft}`;
            });
        const fullText = [header, ...rows].join('\n');
        navigator.clipboard.writeText(fullText).then(() => {
            copyMasterBtn.textContent = "✅ COPIED!";
            setTimeout(updateMasterUI, 2000);
        });
    };

    tile.querySelectorAll('.go-btn').forEach(btn => {
        btn.onclick = async (e) => {
            const row = e.target.closest('.cluster-row');
            const c = clusters[row.dataset.index];
            const dot = row.querySelector('.status-dot');

            console.log(`📤 Starting Process for: ${c.artist} - ${c.song}`);
            btn.disabled = true;
            btn.textContent = "•••";
            dot.style.background = "#ffcc00";

            // The "Job" is now Scrape and Sync
            const result = await chrome.runtime.sendMessage({
                action: "scrapeAndSync",
                artistId: c.artistId,
                songId: c.songId,
                targetAmount: c.amount,
                rowIndex: c.index,
                songName: c.song
            });

            if (result && result.success) {
                console.log(`✅ Successfully processed: ${c.artist} - ${c.song}`);
                masterResults[c.index] = result.data;
                btn.textContent = "SYNCED";
                btn.classList.add('done');
                dot.style.background = "#34c759";
                updateMasterUI();
            } else {
                console.error(`❌ Process Error: ${result?.error}`);
                btn.disabled = false;
                btn.textContent = "RETRY";
                dot.style.background = "#ff3b30";
            }
        };
    });

    document.getElementById('battle-all-btn').onclick = async () => {
        const pending = Array.from(tile.querySelectorAll('.go-btn')).filter(b => !b.classList.contains('done')).slice(0, 20);
        if (pending.length === 0) return;

        console.log(`🏹 Starting Cluster Battle (20 items)`);
        const hud = document.getElementById('battle-progress-hud');
        const bar = document.getElementById('battle-progress-bar');
        hud.style.display = 'block';

        for (let i = 0; i < pending.length; i++) {
            await pending[i].click();
            bar.style.width = `${((i + 1) / pending.length) * 100}%`;
            await new Promise(r => setTimeout(r, 1500)); // Heartbeat
        }
    };

    document.getElementById('close-tile').onclick = () => tile.remove();
}
