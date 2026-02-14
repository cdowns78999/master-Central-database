const SCREENS = {
    home: `
        <div class="animate-in">
            <p class="mono text-primary" style="margin-bottom: 1rem;">PROTOCOL STATUS: ACTIVE // MISSION_CONTROL</p>
            <h1>Central Intelligence</h1>
            
            <div class="overview-grid">
                <div class="overview-card" onclick="app.load('schedule')">
                    <div class="card-header">
                        <div>
                            <p class="card-sub">PRODUCTION_FLOW</p>
                            <h3>Road Map</h3>
                        </div>
                        <div class="pulse-primary"></div>
                    </div>
                    <div class="card-metric">WK_05</div>
                    <p class="text-dim">3 Units in Assembly</p>
                </div>

                <div class="overview-card" onclick="app.load('recruitment')">
                    <div class="card-header">
                        <div>
                            <p class="card-sub">TALENT_PIPELINE</p>
                            <h3>Recruitment</h3>
                        </div>
                    </div>
                    <div class="card-metric" id="metric-recruit">04</div>
                    <p class="text-dim">Active Units Tracked</p>
                </div>

                <div class="overview-card" onclick="app.load('curation')">
                    <div class="card-header">
                        <div>
                            <p class="card-sub">EDITORIAL_FEED</p>
                            <h3>Editorial</h3>
                        </div>
                    </div>
                    <div class="card-metric">02M</div>
                    <p class="text-dim">Last Sync: Feed Alpha</p>
                </div>

                <div class="overview-card" onclick="app.load('festivals')">
                    <div class="card-header">
                        <div>
                            <p class="card-sub">GLOBAL_SENSOR</p>
                            <h3>Surveillance</h3>
                        </div>
                    </div>
                    <div class="card-metric">03</div>
                    <p class="text-dim">Nodes Monitoring</p>
                </div>
            </div>
        </div>
    `,

    recruitment: `
        <div class="animate-in">
            <header style="margin-bottom: 3rem;">
                <p class="mono text-primary">PIPELINE_FLOW_V3</p>
                <h1>Recruitment Pipeline</h1>
                <p class="text-dim">Vertical assembly for talent acquisition. Drag cards down to advance.</p>
            </header>

            <div class="harvester-box">
                <input type="text" id="recruit-input" class="harvester-input" placeholder="Drop Talent URL (TikTok/IG) here...">
                <button class="nav-link" onclick="app.harvestTalent()" style="border: 1px solid var(--primary); color: var(--primary)">Harvest_Talent</button>
            </div>

            <div class="pipeline-stack" id="pipeline-mount">
                <!-- Phases Loaded Dynamically -->
            </div>
        </div>
    `,

    schedule: `
        <div class="animate-in" style="width: 100%;">
            <header style="margin-bottom: 3rem; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <p class="mono text-primary">STRATEGIC_KANBAN_V5</p>
                    <h1>Week 1 and Week 2 Logic</h1>
                    <p class="text-dim">Tactical bi-weekly production orchestration and asset deployment.</p>
                </div>
                <button class="nav-link" onclick="app.spawnKanban()" style="border: 1px solid var(--primary); color: var(--primary)">Add_New_Unit</button>
            </header>

            <div class="kanban-board scroll-hide" id="kanban-mount">
                <!-- Columns Loaded Dynamically -->
            </div>
        </div>
    `,

    curation: `
        <div class="animate-in">
            <header style="margin-bottom: 2rem;">
                <p class="mono text-primary">EDITORIAL_TERMINAL_V2</p>
                <h1>Content Curation</h1>
                <p class="text-dim">Click mini-buttons to open grids (up to 3). Select RSS/Social type.</p>
            </header>

            <div class="category-buttons" id="category-tiles">
                <!-- Category buttons will be loaded here -->
            </div>

            <button class="nav-link" onclick="app.addCategory()" style="margin: 2rem 0; border: 1px solid var(--primary); color: var(--primary)">Add Category</button>

            <div id="open-grids">
                <!-- Open grids will be loaded here -->
            </div>

            <div class="terminal-feed" id="feed-mount">
                <!-- Dynamic Feed -->
            </div>
        </div>
    `,

    nexus: `
        <div class="animate-in">
            <header style="margin-bottom: 4rem;">
                <p class="mono text-primary">ECOSYSTEM_NEXUS_V2</p>
                <h1>Nexus Management</h1>
                <p class="text-dim">Practical asset binding and social channel orchestration.</p>
            </header>

            <div class="nexus-practical">
                <div class="nexus-social-row">
                    <div class="nexus-square" onclick="app.editNode('SOCIAL_01')">
                        <span class="nexus-square-label">SOCIAL_01</span>
                        <span class="nexus-square-id">TT_01</span>
                    </div>
                    <div class="nexus-square" onclick="app.editNode('SOCIAL_02')">
                        <span class="nexus-square-label">SOCIAL_02</span>
                        <span class="nexus-square-id">IG_01</span>
                    </div>
                    <div class="nexus-square" onclick="app.editNode('SOCIAL_03')">
                        <span class="nexus-square-label">SOCIAL_03</span>
                        <span class="nexus-square-id">YT_01</span>
                    </div>
                    <div class="nexus-square" onclick="app.editNode('SOCIAL_04')">
                        <span class="nexus-square-label">SOCIAL_04</span>
                        <span class="nexus-square-id">TW_01</span>
                    </div>
                </div>

                <div class="nexus-core">RAVERRAFTING</div>

                <div class="nexus-bottom-nodes">
                    <div class="nexus-node-alt" onclick="app.editNode('VAULT')">STORAGE_VAULT</div>
                    <div class="nexus-node-alt" onclick="app.editNode('CLOUD')">ASSET_CLOUD</div>
                    <div class="nexus-node-alt" onclick="app.editNode('DRIVE')">PROJECT_DRIVE</div>
                </div>
            </div>

            <div class="nexus-schedule-container">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <div>
                        <h3 class="mono text-primary">ASSET_RELEASE_LOGISTICS</h3>
                        <p class="text-dim" style="font-size:0.7rem;">Synchronized release schedule for cross-platform units.</p>
                    </div>
                    <button class="nav-link" onclick="app.addTestNexusAssets()" style="border: 1px dashed var(--accent); color: var(--accent); font-size: 0.6rem; padding: 0.4rem 1rem;">RUN_TEST_PROTOCOL</button>
                </div>

                <div class="nexus-form">
                    <input type="text" id="nxs-name" placeholder="Asset Name (e.g. Ultra Teaser)">
                    <input type="text" id="nxs-desc" placeholder="Content Description">
                    <input type="date" id="nxs-date">
                    <input type="time" id="nxs-time">
                    <select id="nxs-platform">
                        <option value="tiktok">TikTok</option>
                        <option value="instagram">Instagram</option>
                        <option value="youtube">YouTube</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter / X</option>
                    </select>
                    <button class="nav-link" onclick="app.addNexusSchedule()" style="border: 1px solid var(--primary); color: var(--primary); justify-content: center;">Add_To_Nexus</button>
                </div>

                <table class="nexus-schedule-table">
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Asset_Name</th>
                            <th>Description</th>
                            <th>Time_Coord</th>
                            <th>Meta</th>
                        </tr>
                    </thead>
                    <tbody id="nexus-schedule-mount"></tbody>
                </table>
            </div>
        </div>
    `,


    festivals: `
        <div class="animate-in">
            <header style="margin-bottom: 3rem; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <p class="mono text-primary">GLOBAL_SURVEILLANCE_v4.0</p>
                    <h1>Surveillance Matrix</h1>
                    <p class="text-dim">Global tactical monitoring of festival nodes and temporal waves.</p>
                </div>
            </header>

            <div id="globe-viz">
                <div class="globe-overlay">SIGNAL: STABLE // SCANNING_GLOBAL_NODES</div>
            </div>

            <table class="surveillance-table">
                <thead>
                    <tr>
                        <th onclick="app.sortFestivals('name')" style="cursor:pointer">Node_Name ↕</th>
                        <th onclick="app.sortFestivals('date')" style="cursor:pointer">Date_Window ↕</th>
                        <th onclick="app.sortFestivals('city')" style="cursor:pointer">City_Coord ↕</th>
                        <th onclick="app.sortFestivals('status')" style="cursor:pointer">Protocol_Status ↕</th>
                    </tr>
                </thead>
                <tbody id="festival-mount"></tbody>
            </table>
        </div>
    `
};

const app = {
    init() {
        this.load('schedule');
    },

    load(screenId, btn) {
        if (btn) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            btn.classList.add('active');
        }
        this.activeScreen = screenId;
        const mount = document.getElementById('main-mount');
        mount.innerHTML = SCREENS[screenId];

        if (screenId === 'recruitment') this.initRecruitment();
        if (screenId === 'schedule') this.initSchedule();
        if (screenId === 'curation') this.initCuration();
        if (screenId === 'festivals') this.initFestivals();
        if (screenId === 'nexus') this.initNexus();
        if (screenId === 'home') this.initHome();
    },


    initHome() {
        const recruitTotal = this.pipelineState.phases.reduce((acc, p) => acc + p.cards.length, 0);
        const el = document.getElementById('metric-recruit');
        if (el) el.innerText = recruitTotal.toString().padStart(2, '0');
    },

    initNexus() {
        this.renderNexusSchedule();
    },

    nexusSchedule: [
        { platform: 'tiktok', name: 'Ultra Teaser 01', desc: 'Main stage pyros highlight', date: '2026-03-20', time: '18:00' },
        { platform: 'instagram', name: 'Lineup Drop', desc: 'Phase 2 artist reveal carousel', date: '2026-03-21', time: '12:00' }
    ],

    addNexusSchedule() {
        const name = document.getElementById('nxs-name').value;
        const desc = document.getElementById('nxs-desc').value;
        const date = document.getElementById('nxs-date').value;
        const time = document.getElementById('nxs-time').value;
        const platform = document.getElementById('nxs-platform').value;

        if (name && date) {
            this.nexusSchedule.unshift({ name, desc, date, time, platform });
            this.renderNexusSchedule();
            ['nxs-name', 'nxs-desc', 'nxs-date', 'nxs-time'].forEach(id => document.getElementById(id).value = '');
        }
    },

    addTestNexusAssets() {
        const tests = [
            { platform: 'youtube', name: 'Main Stage Montage', desc: '4K highlight reel with ID tracks', date: '2026-04-01', time: '10:00' },
            { platform: 'facebook', name: 'Community Q&A', desc: 'Direct engagement response unit', date: '2026-04-02', time: '14:30' },
            { platform: 'twitter', name: 'Breaking: Phase 3', desc: 'Immediate lineup leak/reveal', date: '2026-04-03', time: '09:00' }
        ];
        this.nexusSchedule.unshift(...tests);
        this.renderNexusSchedule();
    },

    renderNexusSchedule() {
        const mount = document.getElementById('nexus-schedule-mount');
        if (!mount) return;
        mount.innerHTML = this.nexusSchedule.map((item, index) => `
            <tr onclick="app.editNexusScheduleItem(${index})" style="cursor:pointer">
                <td><span class="platform-tag tag-${item.platform}">${item.platform}</span></td>
                <td class="mono" style="color:var(--text);">${item.name}</td>
                <td style="font-size: 0.75rem;">${item.desc}</td>
                <td class="mono text-primary" style="font-size:0.75rem;">${item.date} // ${item.time}</td>
                <td class="mono" style="font-size:0.6rem; color:var(--accent);">SYNCED</td>
            </tr>
        `).join('');
    },

    editNexusScheduleItem(index) {
        const item = this.nexusSchedule[index];
        const newName = prompt('Edit Asset Name:', item.name);
        if (newName) {
            item.name = newName;
            item.desc = prompt('Edit Description:', item.desc) || item.desc;
            item.date = prompt('Edit Date (YYYY-MM-DD):', item.date) || item.date;
            item.time = prompt('Edit Time (HH:MM):', item.time) || item.time;
            this.renderNexusSchedule();
        }
    },

    initCuration() {
        this.renderCategories();
        this.renderOpenGrids();
    },

    renderCategories() {
        const mount = document.getElementById('category-tiles');
        if (!mount) return;
        mount.innerHTML = this.curationState.categories.map((cat, index) => `
            <div class="category-button" onclick="app.toggleGrid('${cat.name}')">
                <h4>${cat.name}</h4>
                <select onchange="app.updateCategoryType(${index}, this.value); event.stopPropagation();">
                    <option value="rss" ${cat.type === 'rss' ? 'selected' : ''}>RSS</option>
                    <option value="social" ${cat.type === 'social' ? 'selected' : ''}>Social</option>
                </select>
            </div>
        `).join('');
    },

    addCategory() {
        const name = prompt('Enter category name:');
        if (name) {
            this.curationState.categories.push({ name, type: 'rss' });
            this.renderCategories();
        }
    },

    updateCategoryType(index, type) {
        this.curationState.categories[index].type = type;
    },

    toggleGrid(name) {
        const index = this.curationState.openGrids.indexOf(name);
        if (index > -1) {
            this.curationState.openGrids.splice(index, 1);
        } else if (this.curationState.openGrids.length < 3) {
            this.curationState.openGrids.push(name);
        } else {
            this.curationState.openGrids.shift();
            this.curationState.openGrids.push(name);
        }
        this.renderOpenGrids();
    },

    renderOpenGrids() {
        const mount = document.getElementById('open-grids');
        if (!mount) return;
        mount.innerHTML = this.curationState.openGrids.map(name => {
            const cat = this.curationState.categories.find(c => c.name === name);
            const rows = this.generateRows(cat);
            return `
                <div class="feed-grid animate-in">
                    <div class="grid-header">
                        <h3 class="mono text-primary">${name.toUpperCase()} (${cat.type.toUpperCase()})</h3>
                        <button onclick="app.toggleGrid('${name}'); event.stopPropagation();" class="mono" style="color:var(--accent)">CLOSE_X</button>
                    </div>
                    <div class="grid-content">
                        ${rows}
                    </div>
                </div>
            `;
        }).join('');
    },

    generateRows(cat) {
        const numRows = 4;
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            if (cat.type === 'rss') {
                rows.push(`<div class="grid-row"><span>Article_${i + 1}</span><span class="text-dim">01/${String(i + 1).padStart(2, '0')}</span><span>Protocol update ${i + 1} finalized...</span></div>`);
            } else {
                rows.push(`<div class="grid-row"><span>Post_${i + 1}</span><span class="text-primary">@node_${i + 1}</span><span>Engagement spike detected on unit ${i + 1}...</span></div>`);
            }
        }
        return rows.join('');
    },

    // 🪜 RECRUITMENT PIPELINE LOGIC
    pipelineState: {
        phases: [
            { id: 'p1', label: 'ADD_UNIT', cards: [{ id: 101, title: 'ZED_KILLA', url: 'https://tiktok.com/@zedkilla', profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZedKilla' }] },
            { id: 'p2', label: 'PLAN_CONTACT', cards: [] },
            { id: 'p3', label: 'REACHED_OUT', cards: [] },
            { id: 'p4', label: 'FOLLOWED_UP', cards: [] },
            { id: 'p5', label: 'CALL_PLANNED', cards: [] }
        ]
    },

    initRecruitment() {
        this.renderPipeline();
    },

    harvestTalent() {
        const el = document.getElementById('recruit-input');
        if (!el || !el.value) return;
        const url = el.value.trim();

        let handle = 'New_Unit';
        let platform = 'unknown';

        // 🛡️ UNIVERSAL HARVESTER PROTOCOL
        if (url.includes('tiktok.com')) {
            platform = 'tiktok';
            handle = url.split('@').pop().split('/')[0].split('?')[0];
        } else if (url.includes('instagram.com') || url.includes('ig.')) {
            platform = 'instagram';
            handle = url.split('instagram.com/').pop().split('/')[0].split('?')[0].replace('@', '');
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            platform = 'youtube';
            handle = url.includes('@') ? url.split('@').pop().split('/')[0].split('?')[0] : url.split('/').pop().split('?')[0];
        } else if (url.includes('twitter.com') || url.includes('x.com')) {
            platform = 'twitter';
            handle = url.split('/').pop().split('?')[0].replace('@', '');
        } else if (url.includes('facebook.com') || url.includes('fb.com')) {
            platform = 'facebook';
            handle = url.split('/').pop().split('?')[0];
        } else {
            handle = url.split('/').pop().split('?')[0] || 'Unknown';
        }

        const profilePic = platform !== 'unknown'
            ? `https://unavatar.io/${platform}/${handle}`
            : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(handle.toUpperCase())}`;

        this.pipelineState.phases[0].cards.unshift({
            id: Date.now(),
            title: handle.toUpperCase(),
            url: url,
            profilePic: profilePic
        });
        el.value = '';
        this.renderPipeline();
    },

    renderPipeline() {
        const mount = document.getElementById('pipeline-mount');
        if (!mount) return;
        mount.innerHTML = this.pipelineState.phases.map(p => `
            <div class="pipeline-phase" ondragover="app.allowDrop(event)" ondrop="app.dropRecruit(event, '${p.id}')">
                <div class="phase-label">
                    <span>${p.label}</span>
                    <span class="text-primary">${p.cards.length}_UNITS</span>
                </div>
                <div class="pipeline-grid">
                    ${p.cards.map(c => `
                        <div class="pipeline-card" draggable="true" ondragstart="app.dragRecruit(event, ${c.id}, '${p.id}')">
                            <img src="${c.profilePic}" alt="Talent" onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(c.title)}'">
                            <div class="pipeline-details">
                                <div class="mono text-primary" style="font-size:0.55rem; margin-bottom:0.2rem;">ID_${c.id % 1000}</div>
                                <h4 style="font-size: 1.1rem; margin:0; letter-spacing:-0.01em; color:var(--text);">${c.title}</h4>
                                <div class="text-dim mono" style="font-size:0.6rem; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; margin-top:0.2rem;">${c.url}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    },

    dragRecruit(ev, id, from) {
        ev.dataTransfer.setData("id", id);
        ev.dataTransfer.setData("from", from);
        ev.dataTransfer.setData("type", "recruit");
    },

    dropRecruit(ev, to) {
        ev.preventDefault();
        const type = ev.dataTransfer.getData("type");
        if (type !== 'recruit') return;
        const id = parseInt(ev.dataTransfer.getData("id"));
        const fromId = ev.dataTransfer.getData("from");
        if (fromId === to) return;

        const fromPhase = this.pipelineState.phases.find(p => p.id === fromId);
        const toPhase = this.pipelineState.phases.find(p => p.id === to);
        const cardIndex = fromPhase.cards.findIndex(c => c.id === id);
        const [card] = fromPhase.cards.splice(cardIndex, 1);
        toPhase.cards.push(card);
        this.renderPipeline();
    },

    // 📋 KANBAN ROAD MAP LOGIC
    kanbanState: {
        columns: [
            {
                id: 'c1',
                label: 'WEEK 1',
                cards: [
                    { id: 101, title: 'Target fun-loving ravers for recruitment', week: 'WK_01' },
                    { id: 102, title: 'Plan coverage categories', week: 'WK_01' },
                    { id: 103, title: 'Decide social media content plan week', week: 'WK_01' },
                    { id: 1, title: 'Main Stage Teaser', week: 'WK_01' }
                ]
            },
            { id: 'c2', label: 'WEEK 2', cards: [] },
            { id: 'c3', label: 'WEEK 3', cards: [] },
            { id: 'c4', label: 'WEEK 4', cards: [] },
            { id: 'c5', label: 'WEEK 5', cards: [] }
        ]
    },

    initSchedule() {
        this.renderKanban();
    },

    spawnKanban() {
        const title = prompt('Enter Production Title:', 'New Project');
        if (title) {
            const week = prompt('Enter Target Week (e.g., WK_06):', 'WK_05');
            this.kanbanState.columns[0].cards.unshift({
                id: Date.now(),
                title: title,
                week: week || 'WK_??'
            });
            this.renderKanban();
        }
    },

    renderKanban() {
        const mount = document.getElementById('kanban-mount');
        if (!mount) return;
        mount.innerHTML = this.kanbanState.columns.map(col => `
            <div class="kanban-column" ondragover="app.allowDrop(event)" ondrop="app.dropKanban(event, '${col.id}')">
                <div class="kanban-header" onclick="app.editKanbanColumn('${col.id}')" style="cursor:pointer">${col.label}</div>
                ${col.cards.map(card => `
                    <div class="kanban-card" draggable="true" ondragstart="app.dragKanban(event, ${card.id}, '${col.id}')" onclick="app.editKanbanCard(${card.id}, '${col.id}')">
                        <span class="kanban-tag mono">${card.week}</span>
                        <h4 style="font-size:1.1rem; line-height:1.4">${card.title}</h4>
                    </div>
                `).join('')}
            </div>
        `).join('');
    },

    editKanbanColumn(id) {
        const col = this.kanbanState.columns.find(c => c.id === id);
        const newLabel = prompt('Edit Column Label:', col.label);
        if (newLabel) {
            col.label = newLabel.toUpperCase();
            this.renderKanban();
        }
    },

    editKanbanCard(id, colId) {
        const col = this.kanbanState.columns.find(c => c.id === colId);
        const card = col.cards.find(c => c.id === id);
        const newTitle = prompt('Edit project Title:', card.title);
        if (newTitle) {
            card.title = newTitle;
            const newWeek = prompt('Edit Target Week:', card.week);
            if (newWeek) card.week = newWeek.toUpperCase();
            this.renderKanban();
        }
    },

    dragKanban(ev, id, from) {
        ev.dataTransfer.setData("id", id);
        ev.dataTransfer.setData("from", from);
        ev.dataTransfer.setData("type", "kanban");
    },

    dropKanban(ev, to) {
        ev.preventDefault();
        const type = ev.dataTransfer.getData("type");
        if (type !== 'kanban') return;
        const id = parseInt(ev.dataTransfer.getData("id"));
        const fromId = ev.dataTransfer.getData("from");
        if (fromId === to) return;

        const fromCol = this.kanbanState.columns.find(c => c.id === fromId);
        const toCol = this.kanbanState.columns.find(c => c.id === to);
        const cardIdx = fromCol.cards.findIndex(c => c.id === id);
        const [card] = fromCol.cards.splice(cardIdx, 1);
        toCol.cards.push(card);
        this.renderKanban();
    },

    // 🧼 CAR WASH LOGIC
    schedulerState: { cards: [] },
    initScheduler() {
        if (this.schedulerState.cards.length === 0) {
            this.schedulerState.cards = [{ id: 1, text: 'Ultra Phase 1 Reveal', stickers: [], top: -100 }];
        }
        this.renderScheduler();
        this.startConveyor();
    },
    spawnCard() {
        const t = prompt('Post Title:', 'New EDM Post');
        if (t) {
            this.schedulerState.cards.push({ id: Date.now(), text: t, stickers: [], top: -150 });
            this.renderScheduler();
        }
    },
    renderScheduler() {
        const m = document.getElementById('conveyor');
        if (!m) return;
        m.innerHTML = this.schedulerState.cards.map(c => `
            <div class="scheduled-card" id="card-${c.id}" style="top: ${c.top}px" ondragover="app.allowDrop(event)" ondrop="app.drop(event, ${c.id})">
                <div class="mono text-primary" style="font-size: 0.6rem; margin-bottom: 0.5rem;">POST_UNIT_${c.id % 100}</div>
                <h4>${c.text}</h4>
                <div>${c.stickers.map(s => `<span class="locked-sticker mono">${s}</span>`).join('')}</div>
            </div>
        `).join('');
    },
    startConveyor() {
        if (this.conveyorInterval) clearInterval(this.conveyorInterval);
        this.conveyorInterval = setInterval(() => {
            if (this.activeScreen !== 'scheduler') return;
            this.schedulerState.cards.forEach(c => {
                c.top += 1;
                const el = document.getElementById(`card-${c.id}`);
                if (el) el.style.top = c.top + 'px';
                if (c.top > 600) c.top = -200;
            });
        }, 30);
    },

    // 🏭 FACTORY LOGIC
    factoryState: { concepts: [] },
    initFactory() {
        if (this.factoryState.concepts.length === 0) {
            this.factoryState.concepts = [{ id: 1, text: 'The Return of Dubstep', blocks: [], top: -100 }];
        }
        this.renderFactory();
        this.startFactoryConveyor();
    },
    spawnConcept() {
        const t = prompt('Story Hook:', 'New Concept');
        if (t) {
            this.factoryState.concepts.push({ id: Date.now(), text: t, blocks: [], top: -150 });
            this.renderFactory();
        }
    },
    renderFactory() {
        const m = document.getElementById('factory-conveyor');
        if (!m) return;
        m.innerHTML = this.factoryState.concepts.map(c => `
            <div class="scheduled-card" id="cncpt-${c.id}" style="top: ${c.top}px; width:420px; border-left:4px solid var(--accent); border-radius:0;" ondragover="app.allowDrop(event)" ondrop="app.dropFactory(event, ${c.id})">
                <div class="mono text-accent" style="font-size: 0.6rem; margin-bottom: 0.5rem;">HOOK_${c.id % 100}</div>
                <h4>${c.text}</h4>
                <div>${c.blocks.map(b => `<span class="blueprint-sticker mono">${b}</span>`).join('')}</div>
            </div>
        `).join('');
    },
    startFactoryConveyor() {
        if (this.factoryInterval) clearInterval(this.factoryInterval);
        this.factoryInterval = setInterval(() => {
            if (this.activeScreen !== 'factory') return;
            this.factoryState.concepts.forEach(c => {
                c.top += 0.8;
                const el = document.getElementById(`cncpt-${c.id}`);
                if (el) el.style.top = c.top + 'px';
                if (c.top > 600) c.top = -200;
            });
        }, 30);
    },

    // SHARED D&D
    allowDrop(ev) { ev.preventDefault(); },
    drag(ev, val) { ev.dataTransfer.setData("text", val); },
    drop(ev, id) {
        ev.preventDefault();
        const val = ev.dataTransfer.getData("text");
        const card = this.schedulerState.cards.find(c => c.id === id);
        if (card && !card.stickers.includes(val)) {
            card.stickers.push(val);
            this.renderScheduler();
        }
    },
    dropFactory(ev, id) {
        ev.preventDefault();
        const val = ev.dataTransfer.getData("text");
        const concept = this.factoryState.concepts.find(c => c.id === id);
        if (concept && !concept.blocks.includes(val)) {
            concept.blocks.push(val);
            this.renderFactory();
        }
    },

    // 📡 FESTIVALS
    festivalData: [
        { name: "Groove Cruise Miami", city: "Miami", region: "FL (USA)", date: "Jan 15–19", lat: 25.7617, lng: -80.1918, status: "STABLE" },
        { name: "Friendship Cruise", city: "Miami", region: "FL (USA)", date: "Feb 2026", lat: 25.7617, lng: -80.1918, status: "STABLE" },
        { name: "Okeechobee Festival", city: "Okeechobee", region: "FL (USA)", date: "Mar 2026", lat: 27.2439, lng: -80.8298, status: "STABLE" },
        { name: "Ultra Music Festival", city: "Miami", region: "FL (USA)", date: "Mar 20–22", lat: 25.7617, lng: -80.1918, status: "STABLE" },
        { name: "Shaq's Bass All-Stars", city: "Orlando", region: "FL (USA)", date: "Mar 2026", lat: 28.5383, lng: -81.3792, status: "STABLE" },
        { name: "Forbidden Kingdom", city: "Orlando", region: "FL (USA)", date: "Apr 2026", lat: 28.5383, lng: -81.3792, status: "STABLE" },
        { name: "III Points", city: "Miami", region: "FL (USA)", date: "Oct 2026", lat: 25.7617, lng: -80.1918, status: "STABLE" },
        { name: "EDC Orlando", city: "Orlando", region: "FL (USA)", date: "Nov 6–8", lat: 28.5383, lng: -81.3792, status: "STABLE" },
        { name: "Countdown / NYE", city: "Miami", region: "FL (USA)", date: "Dec 31", lat: 25.7617, lng: -80.1918, status: "STABLE" },
        { name: "SXSW", city: "Austin", region: "TX (USA)", date: "Mar 2026", lat: 30.2672, lng: -97.7431, status: "STABLE" },
        { name: "Ubbi Dubbi", city: "Fort Worth", region: "TX (USA)", date: "Mar 27–29", lat: 32.7555, lng: -97.3308, status: "STABLE" },
        { name: "Breakaway Dallas", city: "Dallas", region: "TX (USA)", date: "Apr 10–11", lat: 32.7767, lng: -96.7970, status: "STABLE" },
        { name: "High Roller", city: "Dallas", region: "TX (USA)", date: "Apr 2026", lat: 32.7767, lng: -96.7970, status: "STABLE" },
        { name: "ILLfest", city: "Austin", region: "TX (USA)", date: "May 30–31", lat: 30.2672, lng: -97.7431, status: "STABLE" },
        { name: "Lights All Night", city: "Dallas", region: "TX (USA)", date: "Dec 31", lat: 32.7767, lng: -96.7970, status: "STABLE" },
        { name: "Skyline Festival", city: "Los Angeles", region: "CA (USA)", date: "Feb 28", lat: 34.0522, lng: -118.2437, status: "STABLE" },
        { name: "Dreamstate SF", city: "San Francisco", region: "CA (USA)", date: "Mar 6–8", lat: 37.7749, lng: -122.4194, status: "STABLE" },
        { name: "CRSSD Festival", city: "San Diego", region: "CA (USA)", date: "Mar 14–15", lat: 32.7157, lng: -117.1611, status: "STABLE" },
        { name: "Beyond Wonderland SoCal", city: "San Bernardino", region: "CA (USA)", date: "Mar 21–23", lat: 34.1083, lng: -117.2898, status: "STABLE" },
        { name: "Coachella", city: "Indio", region: "CA (USA)", date: "Apr 10–19", lat: 33.7206, lng: -116.2156, status: "STABLE" },
        { name: "Lightning in a Bottle", city: "Bakersfield", region: "CA (USA)", date: "May 2026", lat: 35.3733, lng: -119.0187, status: "STABLE" },
        { name: "Summer Camp", city: "Chillicothe", region: "IL (USA)", date: "May 22–25", lat: 40.9161, lng: -89.4884, status: "STABLE" },
        { name: "Project GLOW", city: "Washington", region: "DC (USA)", date: "May 30–31", lat: 38.9072, lng: -77.0369, status: "STABLE" },
        { name: "Force Fields", city: "Cadott", region: "WI (USA)", date: "Jun 4–7", lat: 44.9530, lng: -91.1527, status: "STABLE" },
        { name: "Beyond Chicago", city: "Chicago", region: "IL (USA)", date: "Jun 6–7", lat: 41.8781, lng: -87.6298, status: "STABLE" },
        { name: "Sónar", city: "Barcelona", region: "Spain", date: "Jun 16–20", lat: 41.3851, lng: 2.1734, status: "STABLE" },
        { name: "Electric Forest", city: "Rothbury", region: "MI (USA)", date: "Jun 25–28", lat: 43.5042, lng: -86.3453, status: "STABLE" },
        { name: "Beyond The Gorge", city: "George", region: "WA (USA)", date: "Jun 27–28", lat: 47.1038, lng: -119.9890, status: "STABLE" },
        { name: "Tomorrowland", city: "Boom", region: "Belgium", date: "Jul 2026", lat: 51.087, lng: 4.364, status: "STABLE" },
        { name: "Ultra Europe", city: "Split", region: "Croatia", date: "Jul 10–12", lat: 43.5081, lng: 16.4402, status: "STABLE" },
        { name: "Delta Festival", city: "Marseille", region: "France", date: "Jul 23–26", lat: 43.2965, lng: 5.3698, status: "STABLE" },
        { name: "HARD Summer", city: "Inglewood", region: "CA (USA)", date: "Aug 1–2", lat: 33.9617, lng: -118.3531, status: "STABLE" },
        { name: "MoDem Festival", city: "Primislje", region: "Croatia", date: "Aug 3–9", lat: 45.0667, lng: 15.4833, status: "STABLE" },
        { name: "Waldfrieden Wonderland", city: "Stemwede", region: "Germany", date: "Aug 6–9", lat: 52.4167, lng: 8.4417, status: "STABLE" },
        { name: "Elements Festival", city: "Long Pond", region: "PA (USA)", date: "Aug 7–9", lat: 41.0562, lng: -75.4674, status: "STABLE" },
        { name: "Sonus Festival", city: "Novalja", region: "Croatia", date: "Aug 16–20", lat: 44.5562, lng: 14.8814, status: "STABLE" },
        { name: "Moyn Festival", city: "Oyten", region: "Germany", date: "Aug 20–24", lat: 53.0592, lng: 9.0197, status: "STABLE" },
        { name: "Creamfields", city: "Daresbury", region: "UK", date: "Aug 27–30", lat: 53.3392, lng: -2.6289, status: "STABLE" },
        { name: "ARC Music Festival", city: "Chicago", region: "IL (USA)", date: "Sep 4–6", lat: 41.8781, lng: -87.6298, status: "STABLE" },
        { name: "Strandfieber", city: "Goldenstedt", region: "Germany", date: "Sep 5", lat: 52.7917, lng: 8.4167, status: "STABLE" },
        { name: "Nocturnal Wonderland", city: "San Bernardino", region: "CA (USA)", date: "Sep 2026", lat: 34.1083, lng: -117.2898, status: "STABLE" },
        { name: "Electric Zoo", city: "New York", region: "NY (USA)", date: "Sep 2026", lat: 40.7128, lng: -74.0060, status: "STABLE" },
        { name: "Governors Ball", city: "New York", region: "NY (USA)", date: "Jun 2026", lat: 40.7128, lng: -74.0060, status: "STABLE" },
        { name: "BOO! Seattle", city: "Seattle", region: "WA (USA)", date: "Oct 30–31", lat: 47.6062, lng: -122.3321, status: "STABLE" },
        { name: "Escape Halloween", city: "San Bernardino", region: "CA (USA)", date: "Oct 30–31", lat: 34.1083, lng: -117.2898, status: "STABLE" },
        { name: "Dreamstate SoCal", city: "Long Beach", region: "CA (USA)", date: "Nov 20–22", lat: 33.7701, lng: -118.1937, status: "STABLE" },
        { name: "Hai in den Mai", city: "Stemwede", region: "Germany", date: "Apr 30–May 3", lat: 52.4167, lng: 8.4417, status: "STABLE" },
        { name: "Hangout Festival", city: "Gulf Shores", region: "AL (USA)", date: "May 16–18", lat: 30.2460, lng: -87.7008, status: "STABLE" },
        { name: "Big Beach", city: "Novalja", region: "Croatia", date: "May 22–25", lat: 44.5562, lng: 14.8814, status: "STABLE" },
        { name: "Parookaville", city: "Weeze", region: "Germany", date: "Jul 2026", lat: 51.6267, lng: 6.1964, status: "STABLE" },
        { name: "Untold Festival", city: "Cluj-Napoca", region: "Romania", date: "Aug 2026", lat: 46.7712, lng: 23.6236, status: "STABLE" },
        { name: "Mysteryland", city: "Haarlemmermeer", region: "Netherlands", date: "Aug 2026", lat: 52.3117, lng: 4.6717, status: "STABLE" },
        { name: "ADE Amsterdam", city: "Amsterdam", region: "Netherlands", date: "Oct 2026", lat: 52.3676, lng: 4.9041, status: "STABLE" },
        { name: "Bottlerock", city: "Napa", region: "CA (USA)", date: "May 2026", lat: 38.2975, lng: -122.2869, status: "STABLE" }
    ],

    initFestivals() {
        this.renderFestivalGlobe();
        this.renderFestivalTable();
    },

    renderFestivalGlobe() {
        const mount = document.getElementById('globe-viz');
        if (!mount) return;

        const arcsData = this.festivalData.map(d => ({
            startLat: 25.7617,
            startLng: -80.1918,
            endLat: d.lat,
            endLng: d.lng,
            color: [['#00E5FF', '#7000FF'][Math.round(Math.random())], ['#7000FF', '#00E5FF'][Math.round(Math.random())]]
        }));

        this.globe = Globe()(mount)
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundColor('rgba(0,0,0,0)')
            .width(mount.offsetWidth)
            .height(450)
            .pointsData(this.festivalData)
            .pointAltitude(0.1)
            .pointColor(() => '#00E5FF')
            .pointsMerge(true)
            .pointRadius(0.5)
            .arcsData(arcsData)
            .arcColor('color')
            .arcDashLength(0.4)
            .arcDashGap(4)
            .arcDashAnimateTime(1000);

        this.globe.controls().autoRotate = true;
        this.globe.controls().autoRotateSpeed = 0.5;
        this.globe.controls().enableZoom = true;

        window.addEventListener('resize', () => {
            if (this.globe) this.globe.width(mount.offsetWidth);
        });
    },

    renderFestivalTable() {
        const mount = document.getElementById('festival-mount');
        if (!mount) return;
        mount.innerHTML = this.festivalData.map(d => `
            <tr class="surveillance-row animate-in" onclick="app.focusGlobe(${d.lat}, ${d.lng})">
                <td class="mono" style="color:var(--text); font-weight:800;">${d.name}</td>
                <td class="text-dim mono">${d.date}</td>
                <td class="mono">${d.city.toUpperCase()}</td>
                <td class="mono"><span class="status-indicator" style="background: ${d.status === 'STABLE' ? 'var(--primary)' : 'var(--accent)'}"></span>${d.status}</td>
            </tr>
        `).join('');
    },

    focusGlobe(lat, lng) {
        if (this.globe) this.globe.pointOfView({ lat, lng, altitude: 2 }, 1000);
    },

    sortFestivals(key) {
        if (this.lastSort === key) this.festivalData.reverse();
        else {
            this.festivalData.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
            this.lastSort = key;
        }
        this.renderFestivalTable();
    },

    editNode(l) {
        const url = prompt(`Link for ${l}:`, 'https://');
        if (url) window.open(url, '_blank');
    }
};

app.init();