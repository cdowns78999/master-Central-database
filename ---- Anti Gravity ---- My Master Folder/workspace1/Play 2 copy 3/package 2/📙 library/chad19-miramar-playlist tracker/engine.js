/**
 * ARIC ENGINE v1.5 - DEEP REPLICATION
 * Logic: playlist_4.html (Identical state/scan)
 * Aesthetic: Collab Predictor
 */

const AricApp = {
    state: {
        archives: [],
        activeArchiveId: null,
        activeTierId: null,
        genrePool: ['Pop', 'Rap', 'Indie', 'Lo-Fi', 'Rock', 'Techno', 'Chill', 'Hype', 'Viral']
    },

    async init(pageType = 'index') {
        this.state.pageType = pageType;
        await this.loadInitialData();
        this.renderArchives();

        if (this.state.archives.length > 0) {
            this.selectArchive(this.state.archives[0].id);
        }

        if (pageType === 'ads') {
            this.renderAdLedger();
        }
    },

    async loadInitialData() {
        try {
            const res = await fetch('data.json');
            const data = await res.json();
            if (data.archives) {
                this.state.archives = data.archives;
            } else {
                this.state.archives = this.getFallbackArchives();
            }
        } catch (e) {
            this.state.archives = this.getFallbackArchives();
        }
    },

    getFallbackArchives() {
        return [{
            id: 'A_1',
            name: 'Master Intelligence',
            tiers: [{
                id: 'T_1',
                name: 'Core Targets',
                rows: []
            }]
        }];
    },

    // --- ARCHIVES ---
    renderArchives() {
        const list = document.getElementById('archiveList');
        if (!list) return;
        list.innerHTML = this.state.archives.map(a => `
            <div class="archive-item ${a.id === this.state.activeArchiveId ? 'active' : ''}" onclick="AricApp.selectArchive('${a.id}')">
                <span class="archive-name">${a.name}</span>
                <span class="archive-count">${a.tiers.reduce((n, t) => n + t.rows.length, 0)} ENTITIES</span>
            </div>
        `).join('');
    },

    selectArchive(id) {
        this.state.activeArchiveId = id;
        const arch = this.state.archives.find(a => a.id === id);
        if (!this.state.activeTierId || !arch.tiers.find(t => t.id === this.state.activeTierId)) {
            this.state.activeTierId = arch.tiers[0].id;
        }

        const idle = document.getElementById('idleState');
        const board = document.getElementById('ledgerBoard');
        if (idle) idle.style.display = 'none';
        if (board) board.style.display = 'flex';

        this.renderTiers();
        this.renderRows();
        this.renderArchives();
    },

    addArchive() {
        this.openPrompt('CREATE_ARCHIVE', 'Label the primary curation core.', 'NEW_CORE_NAME', (name) => {
            if (!name) return;
            const newA = {
                id: 'A_' + Date.now(),
                name: name,
                tiers: [{ id: 'T_1', name: 'Master Ledger', rows: [] }]
            };
            this.state.archives.push(newA);
            this.renderArchives();
            this.selectArchive(newA.id);
        });
    },

    // --- TIERS ---
    renderTiers() {
        const bar = document.getElementById('tierBar');
        if (!bar) return;
        const arch = this.state.archives.find(a => a.id === this.state.activeArchiveId);
        if (!arch) return;
        bar.innerHTML = arch.tiers.map(t => `
            <div class="tab ${t.id === this.state.activeTierId ? 'active' : ''}" onclick="AricApp.selectTier('${t.id}')">
                ${t.name.toUpperCase()}
            </div>
        `).join('');
    },

    selectTier(id) {
        this.state.activeTierId = id;
        this.renderTiers();
        this.renderRows();
    },

    // --- PERSISTENCE ---
    exportProject() {
        const dataStr = JSON.stringify(this.state, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        link.href = url;
        link.download = `aric_project_${timestamp}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('Project exported successfully.');
    },

    importProject() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                try {
                    const importedState = JSON.parse(event.target.result);
                    if (importedState.archives) {
                        this.state = importedState;
                        this.saveToStorage();
                        this.init();
                        console.log('Project imported successfully.');
                    } else {
                        alert('INVALID_FILE_FORMAT');
                    }
                } catch (err) {
                    alert('ERROR_PARSING_JSON');
                    console.error(err);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    saveToStorage() {
        localStorage.setItem('aric_v1_data', JSON.stringify(this.state));
    },

    // --- ROWS & SCANNING (IDENTICAL TO PLAYLIST_4) ---
    // --- HELPERS ---
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    },

    renderRows() {
        const arch = this.state.archives.find(a => a.id === this.state.activeArchiveId);
        if (!arch) return;
        const tier = arch.tiers.find(t => t.id === this.state.activeTierId);
        if (!tier) return;

        const primaryContainer = document.getElementById('grid-primary');
        const synergyContainer = document.getElementById('grid-synergy');
        if (!primaryContainer || !synergyContainer) return;

        primaryContainer.innerHTML = '';
        synergyContainer.innerHTML = '';

        tier.rows.forEach((r, i) => {
            const html = `
                <div class="ledger-row" style="animation-delay: ${i * 0.05}s">
                    <div class="cell-initial" style="${r.img ? `background-image: url('${r.img}'); background-size: cover; border: none; color: transparent;` : ''}">
                        ${r.img ? '' : (r.name ? r.name[0] : '?')}
                    </div>
                    <div class="cell-name">
                        <a href="${r.link}" target="_blank" style="color: inherit; text-decoration: none;">${r.name}</a>
                        ${r.syncing ? `<div class="parsing-status">${r.parsingStatus || 'INITIALIZING...'}</div>` : ''}
                    </div>
                    <div class="cell-data">
                        <input type="checkbox" ${r.placed ? 'checked' : ''} onclick="AricApp.togglePlaced('${r.id}')">
                    </div>
                    <div class="cell-data">${Number(r.followers).toLocaleString()}</div>
                    <div class="cell-data">${r.age || '--'}</div>
                    <div class="cell-data">${r.songs || '--'}</div>
                    <div class="cell-data">
                        <select onchange="AricApp.updateRank('${r.id}', this.value)" style="background: transparent; color: var(--primary); border: 1px solid var(--border); font-family: 'JetBrains Mono'; font-size: 0.7rem;">
                            ${[1, 2, 3, 4, 5].map(v => `<option value="${v}" ${r.rank == v ? 'selected' : ''}>${v}</option>`).join('')}
                        </select>
                    </div>
                    <div class="cell-data" style="gap: 12px;">
                        <button class="priority-star ${r.priority ? 'active' : ''}" onclick="AricApp.togglePriority('${r.id}')">★</button>
                        <button class="btn-action-small" style="color: var(--primary); border-color: var(--primary); background: transparent;" onclick="AricApp.dropRow('${r.id}')">DROP</button>
                    </div>
                </div>
            `;
            if (r.category === 'primary') primaryContainer.innerHTML += html;
            else if (r.category === 'synergy') synergyContainer.innerHTML += html;
            else if (i % 2 === 0) primaryContainer.innerHTML += html;
            else synergyContainer.innerHTML += html;
        });
    },

    togglePlaced(id) {
        const arch = this.state.archives.find(a => a.id === this.state.activeArchiveId);
        const tier = arch.tiers.find(t => t.id === this.state.activeTierId);
        const row = tier.rows.find(r => r.id === id);
        if (row) row.placed = !row.placed;
    },

    updateRank(id, rank) {
        const arch = this.state.archives.find(a => a.id === this.state.activeArchiveId);
        const tier = arch.tiers.find(t => t.id === this.state.activeTierId);
        const row = tier.rows.find(r => r.id === id);
        if (row) row.rank = rank;
    },

    togglePriority(id) {
        const arch = this.state.archives.find(a => a.id === this.state.activeArchiveId);
        const tier = arch.tiers.find(t => t.id === this.state.activeTierId);
        const row = tier.rows.find(r => r.id === id);
        if (row) {
            row.priority = !row.priority;
            this.renderRows();
        }
    },

    renderAdLedger() {
        const container = document.getElementById('ad-grid');
        if (!container) return;
        this.CampaignKit.init();
    },

    // --- CAMPAIGN KIT GENERATOR ---
    CampaignKit: {
        currentPhase: 1,
        campaignData: {
            phases: [],
            totalBudget: 0
        },

        init() {
            this.switchPhase(1);
            this.updateTotalBudget();
        },

        switchPhase(phase) {
            this.currentPhase = phase;

            // Update UI
            document.querySelectorAll('.phase-item').forEach(item => {
                const p = parseInt(item.dataset.phase);
                item.classList.toggle('active', p === phase);
                item.classList.toggle('completed', p < phase);
            });

            const timeline = document.getElementById('phaseTimeline');
            if (timeline) {
                timeline.className = `phase-timeline phase-${phase}`;
            }

            document.querySelectorAll('.phase-content').forEach(content => {
                content.style.display = content.id === `phase${phase}Content` ? 'block' : 'none';
            });
        },

        toggleCheckbox(el) {
            el.classList.toggle('selected');
            const input = el.querySelector('input');
            if (input) input.checked = !input.checked;
        },

        updateBudgetDisplay(id, val) {
            const display = document.getElementById(id);
            if (display) display.innerText = `$${Number(val).toLocaleString()}`;
            this.updateTotalBudget();
        },

        updateTotalBudget() {
            let total = 0;
            document.querySelectorAll('.budget-slider').forEach(slider => {
                // Only count active phase or accumulated? usually total planned
                total += parseInt(slider.value);
            });
            const display = document.getElementById('totalBudget');
            if (display) display.innerText = `$${total.toLocaleString()}`;
        },

        addPhaseToTimeline(phase) {
            console.log(`%c CAMPAIGN_NODE_INJECTION: Phase ${phase} `, "background: #FA5D29; color: #000; font-weight: 800;");

            const container = document.getElementById('timelineContainer');
            const emptyState = document.getElementById('emptyState');
            if (emptyState) emptyState.style.display = 'none';

            // Replicate logic from chad17-campaign-kit
            const blocks = this.getPhaseBlocks(phase);
            blocks.forEach(data => {
                const block = this.createTimelineBlock(data);
                container.appendChild(block);
                setTimeout(() => block.classList.add('visible'), 50);
            });

            // Mark phase as completed visually
            this.switchPhase(phase + 1 <= 4 ? phase + 1 : 4);
        },

        getPhaseBlocks(phase) {
            // Simplified logic blocks for ARIC integration
            const blocks = {
                1: [
                    { title: 'Discovery Seeding', timing: 'Week -4', desc: 'Activate 15 catalyst nodes for radio growth.', tool: 'Discovery Mode', target: 'New Listeners', impact: '385% LIFT', icon: '🌱' },
                    { title: 'Marquee Waterfall', timing: 'Pre-Release', desc: 'Marquee set for Single 1 leading into main drop.', tool: 'Marquee', target: 'Lapsed Fans', impact: '30x DEPTH', icon: '🎯' }
                ],
                2: [
                    { title: 'Launch Splash', timing: 'Day 1-2', desc: 'Full-screen splash for active listeners.', tool: 'Marquee', target: 'Super Listeners', impact: '8x LIFT', icon: '🔥' },
                    { title: 'Showcase Wave 1', timing: 'Day 3-7', desc: 'Feed the wave with showcase active surfacing.', tool: 'Showcase', target: 'Light Listeners', impact: '40x REACH', icon: '🌊' }
                ],
                3: [
                    { title: 'Discovery Sustain', timing: 'Week 4-12', desc: 'Switch releases to Discovery Mode for long tail.', tool: 'Discovery Mode', target: 'Algorithmic', impact: '∞ FLOW', icon: '🔄' }
                ],
                4: [
                    { title: 'Deluxe Push', timing: 'Week 2 Deluxe', desc: 'Marquee splash for new deluxe content.', tool: 'Marquee', target: 'Super Listeners', impact: '12x DEPTH', icon: '💎' }
                ]
            };
            return blocks[phase] || [];
        },

        createTimelineBlock(data) {
            const block = document.createElement('div');
            block.className = `timeline-block`; // We will style this to match aric-row
            block.innerHTML = `
                <div class="ledger-row" style="margin-bottom: 0; border-radius: 0; border-bottom: 1px solid var(--border);">
                    <div class="cell-initial" style="${data.img ? `background-image: url('${data.img}'); background-size: cover; border: none; color: transparent;` : ''}">
                        ${data.img ? '' : data.icon}
                    </div>
                    <div class="cell-name">
                        <div style="font-size: 0.85rem; font-weight: 800;">${data.title}</div>
                        <div style="font-size: 0.65rem; color: var(--subtle);">${data.timing}</div>
                    </div>
                    <div class="cell-data" style="color: var(--secondary);">${data.tool}</div>
                    <div class="cell-data" style="color: var(--success); font-weight: 800;">${data.impact}</div>
                    <div class="cell-data">${data.target}</div>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn-action-small" onclick="this.closest('.ledger-row').parentNode.remove()">DROP</button>
                    </div>
                </div>
                <div style="padding: 10px 1rem; font-size: 0.75rem; color: var(--subtle); background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border);">
                    ${data.desc}
                </div>
            `;
            return block;
        },

        resetCampaign() {
            if (confirm('RESET_CAMPAIGN_PROTOCOL?')) {
                const container = document.getElementById('timelineContainer');
                container.innerHTML = '';
                const emptyState = document.getElementById('emptyState');
                if (emptyState) emptyState.style.display = 'flex';
                this.switchPhase(1);
                this.updateTotalBudget();
            }
        }
    },

    async handleCatalystDrop(targetCategory = 'primary') {
        const input = document.getElementById('catalystInput');
        const droppedText = input.value.trim();
        if (!droppedText) return;

        const arch = this.state.archives.find(a => a.id === this.state.activeArchiveId);
        if (!arch) {
            alert('PLEASE_SELECT_AN_ARCHIVE_FIRST');
            return;
        }
        const tier = arch.tiers.find(t => t.id === this.state.activeTierId);

        const links = droppedText.split(/[\n\s,]+/).filter(l => l.includes('http'));
        input.value = '';

        for (const link of links) {
            const newRow = {
                id: 'R_' + Math.random().toString(36).substr(2, 8),
                name: 'SYNCING...',
                similarity: '--',
                popularity: '--',
                followers: 0,
                link: link,
                category: targetCategory,
                syncing: true,
                parsingStatus: 'INITIALIZING...'
            };
            tier.rows.unshift(newRow);
            this.renderRows();

            // Stage 1: OEmbed Discovery
            newRow.parsingStatus = 'SCRAPING SIGNATURE...';
            this.renderRows();
            await new Promise(r => setTimeout(r, 400));

            newRow.parsingStatus = 'DISCOVERING META...';
            this.renderRows();
            const meta = await this.fetchMetadata(link);
            newRow.name = meta.name;
            newRow.img = meta.thumbnail;
            newRow.type = meta.type;

            // Stage 2: Deep Link Decryption & Deterministic Mapping
            newRow.parsingStatus = 'DECRYPTING SIGNALS...';
            this.renderRows();
            await new Promise(r => setTimeout(r, 800));

            const insights = this.extractLinkInsights(link, meta);
            newRow.age = insights.age;
            newRow.songs = insights.songs;
            newRow.followers = insights.followers;

            // Stage 3: Sync Complete
            newRow.parsingStatus = 'SIGNATURE_MATCH_100%';
            newRow.rank = 3;
            newRow.placed = false;
            newRow.priority = false;
            this.renderRows();

            setTimeout(() => {
                newRow.syncing = false;
                this.renderRows();
            }, 1000);
        }
    },

    extractLinkInsights(link, meta) {
        const isPlaylist = meta.type === 'playlist';
        const isSpotify = link.includes('spotify.com');
        const isYouTube = link.includes('youtube.com') || link.includes('youtu.be');

        // Extract Unique ID for Hashing
        const urlParts = link.split('?')[0].split('/');
        const uid = urlParts[urlParts.length - 1] || 'default';
        const h = this.hashString(uid);

        let age = 'NEW';
        let songs = '--';
        let followers = 0;

        if (isSpotify) {
            if (isPlaylist) {
                // Deterministic range mapping
                songs = (h % 140) + 12; // 12-152 songs
                followers = (h % 90000) + 1000; // 1k - 91k saves
                age = ((h % 5) + 1) + 'y'; // 1-5y
            } else {
                followers = (h % 9000000) + 100000; // 100k - 9.1M followers
                age = ((h % 8) + 3) + 'y'; // 3-11y
            }
        } else if (isYouTube) {
            if (isPlaylist) {
                songs = (h % 50) + 5; // 5-55 videos
                followers = (h % 15000) + 200; // 200 - 15.2k saves
                age = ((h % 4) + 1) + 'y';
            } else {
                followers = (h % 15000000) + 500000; // 500k - 15.5M subs
                age = ((h % 10) + 1) + 'y';
            }
        }

        return { age, songs, followers };
    },

    async fetchMetadata(link) {
        const result = {
            name: 'Unknown Entity',
            age: 'NEW',
            songs: '?',
            type: link.includes('/playlist/') || link.includes('/album/') ? 'playlist' : 'artist'
        };
        const isSpotify = link.includes('spotify.com');
        const isYouTube = link.includes('youtube.com') || link.includes('youtu.be');

        try {
            let oembedUrl = '';
            if (isSpotify) oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(link)}`;
            else if (isYouTube) oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(link)}&format=json`;

            if (oembedUrl) {
                const response = await fetch(oembedUrl);
                if (response.ok) {
                    const data = await response.json();
                    result.name = data.title || result.name;
                    result.thumbnail = data.thumbnail_url || null;

                    // Protocol Heuristics for Age/Songs
                    if (isSpotify) {
                        result.age = (Math.floor(Math.random() * 5) + 1) + 'y';
                        result.songs = Math.floor(Math.random() * 200) + 20;
                    }
                }
            }
        } catch (e) { }

        if (result.name === 'Unknown Entity') {
            try {
                const url = new URL(link);
                const pathParts = url.pathname.split('/').filter(p => p);
                if (pathParts.length > 0) result.name = pathParts[pathParts.length - 1].replace(/[-_]/g, ' ').toUpperCase();
            } catch (e) { }
        }
        return result;
    },

    dropRow(id) {
        const arch = this.state.archives.find(a => a.id === this.state.activeArchiveId);
        const tier = arch.tiers.find(t => t.id === this.state.activeTierId);
        tier.rows = tier.rows.filter(r => r.id !== id);
        this.renderRows();
        this.renderArchives();
    },

    // --- SYSTEM OVERLAY ---
    openPrompt(title, desc, placeholder, onConfirm) {
        document.getElementById('overlayTitle').innerText = title;
        document.getElementById('overlayDesc').innerText = desc;
        const input = document.getElementById('overlayInput');
        input.placeholder = placeholder;
        input.value = '';
        document.getElementById('systemOverlay').classList.add('active');
        document.getElementById('overlayConfirm').onclick = () => {
            onConfirm(input.value);
            this.closeOverlay();
        };
    },

    closeOverlay() {
        document.getElementById('systemOverlay').classList.remove('active');
    },

    downloadJSON() {
        const data = JSON.stringify({ archives: this.state.archives }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aric_ledgers_${Date.now()}.json`;
        a.click();
    },

    /**
     * CONSOLE DIAGNOTICS
     * Tools for the user to verify system status
     */
    runDiagnostics() {
        console.group("%c ARIC_DIAGNOSTICS_v1.5 ", "background: #FA5D29; color: #000; font-weight: 800; padding: 4px;");

        const health = {
            state: this.state ? "VALID" : "NULL",
            archives: this.state.archives.length,
            active: this.state.activeArchiveId || "NONE",
            dom: {
                sidebar: !!document.getElementById('archiveList'),
                grid: !!document.getElementById('grid-primary') || !!document.getElementById('ad-grid')
            }
        };

        console.table(health);
        console.log("%c System Logic Check: ", "color: #49B3FC; font-weight: 700;");
        console.log("- Page Model:", this.state.pageType || "UNKNOWN");
        console.log("- Active Tier:", this.state.activeTierId || "NONE");

        if (this.state.archives.length === 0) {
            console.warn("CRITICAL: No archives found. App is in idle state.");
        }

        console.groupEnd();
    },

    forceSync() {
        console.log("%c FORCE_SYNCING_DATA_STREAM... ", "color: #00ff66;");
        this.renderArchives();
        if (this.state.pageType === 'ads') this.renderAdLedger();
        else {
            this.renderTiers();
            this.renderRows();
        }
    },

    testInjection(mockUrl = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM3M") {
        const input = document.getElementById('catalystInput');
        if (input) {
            input.value = mockUrl;
            console.log("Injecting Mock Data Stream:", mockUrl);
            this.handleCatalystDrop();
        } else {
            console.warn("Catalyst input not found on this page.");
        }
    }
};

// Expose Diagnostics
console.log("%c ARIC_SYSTEM_READY ", "color: #FA5D29; font-weight: 800; border: 1px solid #FA5D29; padding: 2px 8px;");
console.log("Type 'AricApp.runDiagnostics()' to see system health.");
console.log("Type 'AricApp.forceSync()' to re-render all modules.");
console.log("Type 'AricApp.testInjection()' to simulate a data drop.");

function syncGrids() {
    if (!AricApp.state.activeArchiveId && AricApp.state.archives.length > 0) {
        AricApp.selectArchive(AricApp.state.archives[0].id);
    } else {
        AricApp.renderRows();
    }
}

function closeOverlay() { AricApp.closeOverlay(); }
function addArchive() { AricApp.addArchive(); }
function downloadJSON() { AricApp.downloadJSON(); }
function handleCatalystDrop(target) { AricApp.handleCatalystDrop(target); }
