console.log("Spotify Master Production: Loaded");

let spreadsheetDataItems = [];
let masterResults = {};
let config = {
    autoCopy: true,
    fields: {
        songName: true,
        amount: true,
        marker: true,
        daily: true,
        playlistTotal: true,
        algoStreams: true,
        algoRatio: true,
        streamsLeft: true,
        playlistCount: true,
        daysLeft: true
    }
};

// Initialize
function safeInit() {
    initBattleCommand();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
} else {
    safeInit();
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === "showTile") {
        if (message.spreadsheetData) {
            spreadsheetDataItems = parseSpreadsheetRows(message.spreadsheetData);
        }
        if (!document.getElementById('parsing-job-tile')) {
            safeInit();
        } else if (spreadsheetDataItems.length > 0) {
            showBattleCommand(document.getElementById('parsing-job-tile'));
        }
        sendResponse({ success: true });
    }
});

function parseSpreadsheetRows(rows) {
    return rows.map((row, index) => {
        const amount = row[0] || "10000";
        const artist = row[3] || "Unknown Artist";
        const song = row[4] || "Unknown Song";
        const link = row[5] || "";
        const artistId = row[6] || "";

        let songId = "";
        const match = link.match(/track\/([a-zA-Z0-9]+)/);
        if (match) songId = match[1];

        return { artist, song, songId, artistId, amount, index };
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
        width: 480px; background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(40px) saturate(210%); -webkit-backdrop-filter: blur(40px) saturate(210%);
        border: 1px solid rgba(0, 122, 255, 0.2); border-radius: 36px;
        padding: 25px; z-index: 2147483647; color: #1c1c1e;
        box-shadow: 0 25px 80px rgba(0,0,0,0.18); font-family: -apple-system, system-ui, sans-serif;
        display: flex; flex-direction: column; gap: 15px;
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        #cluster-scroll-container::-webkit-scrollbar { width: 5px; }
        .ios-btn {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            background: #007aff; color: #fff; border: none; border-radius: 18px;
            font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .ios-btn:hover { transform: scale(1.02); background: #0066d6; }
        .ios-btn.done { background: #34c759 !important; }
        .ios-btn.secondary { background: rgba(0,0,0,0.05); color: #007aff; }
        .status-dot { width: 10px; height: 10px; border-radius: 50%; background: #ddd; }
        .field-chip {
            padding: 6px 12px; border-radius: 12px; font-size: 10px; font-weight: 700;
            background: rgba(0,0,0,0.05); color: #8e8e93; cursor: pointer; border: 1px solid transparent;
            transition: all 0.2s;
        }
        .field-chip.active { background: rgba(0,122,255,0.1); color: #007aff; border-color: rgba(0,122,255,0.2); }
        #battle-progress-bar { height: 4px; background: #007aff; width: 0%; transition: width 0.3s; border-radius: 2px; }
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
                <h2 style="margin: 0; font-size: 18px; font-weight: 800;">Master Production [SLOT 8]</h2>
            </div>
            <button class="close-btn" style="background:none; border:none; font-size: 24px; cursor:pointer; color:#8e8e93;">&times;</button>
        </div>

        <div style="background: rgba(0,0,0,0.02); padding: 15px; border-radius: 20px;">
            <label style="display: block; font-size: 10px; font-weight: 800; color: #8e8e93; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">Field Selector (Selection Options)</label>
            <div style="display: flex; wrap: wrap; gap: 8px;">
                ${Object.keys(config.fields).map(f => `<div class="field-chip ${config.fields[f] ? 'active' : ''}" data-field="${f}">${f}</div>`).join('')}
            </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; padding: 0 5px;">
            <input type="checkbox" id="auto-copy-toggle" ${config.autoCopy ? 'checked' : ''}>
            <label for="auto-copy-toggle" style="font-size: 12px; font-weight: 600; color: #3a3a3c;">Auto-Copy Results to Clipboard</label>
        </div>

        <button id="enter-battle-btn" class="ios-btn" style="height: 52px; font-size: 16px;">ENTER BATTLE HUB (${spreadsheetDataItems.length} SONGS)</button>
    `;

    tile.querySelectorAll('.field-chip').forEach(chip => {
        chip.onclick = () => {
            const field = chip.dataset.field;
            config.fields[field] = !config.fields[field];
            chip.classList.toggle('active');
        };
    });

    tile.querySelector('#auto-copy-toggle').onchange = (e) => config.autoCopy = e.target.checked;
    tile.querySelector('.close-btn').onclick = () => tile.remove();
    tile.querySelector('#enter-battle-btn').onclick = () => showBattleCommand(tile);
}

function buildMasterString(c, result) {
    const parts = [];
    if (config.fields.songName) parts.push(c.song);
    if (config.fields.amount) parts.push(c.amount);
    if (config.fields.marker) parts.push("X");
    if (config.fields.daily) parts.push(result.daily);
    if (config.fields.playlistTotal) parts.push(result.playlistTotal);
    if (config.fields.algoStreams) parts.push(result.algoStreams);
    if (config.fields.algoRatio) parts.push(result.algoRatio);
    if (config.fields.streamsLeft) parts.push(result.streamsLeft);
    if (config.fields.playlistCount) parts.push(result.playlistCount);
    if (config.fields.daysLeft) parts.push(result.daysLeft);
    return parts.join('\t');
}

async function showBattleCommand(tile) {
    let rowsHtml = spreadsheetDataItems.map(c => `
        <tr class="cluster-row" data-index="${c.index}" style="border-bottom: 1px solid rgba(0,0,0,0.03);">
            <td style="padding: 12px 10px; text-align: center;"><div class="status-dot"></div></td>
            <td style="padding: 12px 10px; font-size: 13px;"><b>${c.artist}</b><br><span style="color:#8e8e93">${c.song}</span></td>
            <td style="padding: 12px 10px; text-align: center;">
                <button class="ios-btn go-btn" style="height: 30px; width: 68px; font-size: 12px;">GO</button>
            </td>
        </tr>
    `).join('');

    tile.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; background: #34c759; border-radius: 50%;"></div>
                <h2 style="margin: 0; font-size: 18px; font-weight: 800;">Battle Hub</h2>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <button id="copy-all-btn" class="ios-btn secondary" style="height:32px; padding:0 14px; font-size:11px;">📋 COPY ALL</button>
                <button id="battle-all-btn" class="ios-btn" style="height: 32px; padding: 0 12px; font-size: 11px;">⚔️ BATTLE ALL</button>
                <button class="close-btn" style="background:none; border:none; font-size: 26px; cursor:pointer; color:#8e8e93;">&times;</button>
            </div>
        </div>
        <div style="height: 4px; background: rgba(0,0,0,0.05); border-radius: 2px;"><div id="battle-progress-bar"></div></div>
        <div id="cluster-scroll-container" style="max-height: 400px; overflow-y: auto; background: rgba(0,0,0,0.02); border-radius: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tbody>${rowsHtml}</tbody>
            </table>
        </div>
        <button id="back-to-config-btn" class="ios-btn secondary" style="height: 40px; margin-top: 5px;">🔧 EDIT SELECTIONS</button>
    `;

    tile.querySelector('.close-btn').onclick = () => tile.remove();
    tile.querySelector('#back-to-config-btn').onclick = () => showOnMode(tile);

    tile.querySelectorAll('.go-btn').forEach(btn => {
        btn.onclick = async (e) => {
            const row = e.target.closest('.cluster-row');
            const c = spreadsheetDataItems[row.dataset.index];
            const dot = row.querySelector('.status-dot');

            btn.disabled = true;
            btn.textContent = "•••";
            dot.style.background = "#ffcc00";

            const result = await chrome.runtime.sendMessage({
                action: "scrapeAndSync",
                artistId: c.artistId,
                songId: c.songId,
                targetAmount: c.amount,
                rowIndex: c.index,
                songName: c.song
            });

            if (result && result.success) {
                masterResults[c.index] = result.data;
                btn.textContent = "DONE";
                btn.classList.add('done');
                dot.style.background = "#34c759";

                if (config.autoCopy) {
                    const str = buildMasterString(c, result.data);
                    navigator.clipboard.writeText(str);
                }
            } else {
                btn.disabled = false;
                btn.textContent = "RETRY";
                dot.style.background = "#ff3b30";
            }
        };
    });

    tile.querySelector('#battle-all-btn').onclick = async () => {
        const pending = Array.from(tile.querySelectorAll('.go-btn')).filter(b => !b.classList.contains('done'));
        const bar = tile.querySelector('#battle-progress-bar');
        for (let i = 0; i < pending.length; i++) {
            await pending[i].click();
            bar.style.width = `${((i + 1) / pending.length) * 100}%`;
            await new Promise(r => setTimeout(r, 1500));
        }
    };

    tile.querySelector('#copy-all-btn').onclick = () => {
        const rows = spreadsheetDataItems
            .filter(c => masterResults[c.index])
            .map(c => buildMasterString(c, masterResults[c.index]));
        navigator.clipboard.writeText(rows.join('\n'));
        tile.querySelector('#copy-all-btn').textContent = "✅ COPIED!";
        setTimeout(() => tile.querySelector('#copy-all-btn').textContent = "📋 COPY ALL", 2000);
    };
}
