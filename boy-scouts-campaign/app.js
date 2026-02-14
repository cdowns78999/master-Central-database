class ScoutConsole {
    constructor() {
        this.data = null;
        this.page = 'hub';
        this.badgeCat = 'all';
        this.badgeSearch = '';
        this.selectedBadge = null;
        this.selectedRank = 0;
        this.root = document.getElementById('app-root');
        this.init();
    }

    async init() {
        const res = await fetch('data.json');
        this.data = await res.json();
        this.render();
    }

    nav(page) {
        this.page = page;
        this.selectedBadge = null;
        this.render();
    }

    render() {
        const d = this.data;
        const pages = [
            { id: 'hub', label: 'Hub', icon: 'home' },
            { id: 'badges', label: 'Merit Badges', icon: 'military_tech' },
            { id: 'ranks', label: 'Scout Ranks', icon: 'trending_up' }
        ];
        this.root.innerHTML = `
        <div class="app-shell">
            <nav class="top-nav">
                <div class="nav-brand" id="go-hub">
                    <span class="material-symbols-outlined">shield</span>
                    <span>${d.meta.title}</span>
                </div>
                <div class="nav-links" id="nav-links">
                    ${pages.map(p => `
                    <a class="nav-link ${this.page === p.id ? 'active' : ''}" data-page="${p.id}">
                        <span class="material-symbols-outlined">${p.icon}</span>
                        <span>${p.label}</span>
                    </a>`).join('')}
                </div>
                <button class="hb-btn ${this.page === 'handbook' ? 'active' : ''}" id="hb-btn">
                    <span class="material-symbols-outlined">menu_book</span>
                    <span>Handbook</span>
                </button>
            </nav>
            <main class="page-area" id="page-area"></main>
        </div>`;
        document.getElementById('go-hub').addEventListener('click', () => this.nav('hub'));
        document.getElementById('nav-links').addEventListener('click', e => {
            const l = e.target.closest('.nav-link');
            if (l) this.nav(l.dataset.page);
        });
        document.getElementById('hb-btn').addEventListener('click', () => this.nav('handbook'));
        const area = document.getElementById('page-area');
        if (this.page === 'hub') this.renderHub(area);
        else if (this.page === 'badges') this.renderBadges(area);
        else if (this.page === 'ranks') this.renderRanks(area);
        else if (this.page === 'handbook') this.renderHandbook(area);
    }

    // ═══════════════════════════════════════════════════════
    // HUB — Index page connecting all systems
    // ═══════════════════════════════════════════════════════
    renderHub(el) {
        const d = this.data;
        const cats = d.meritBadges.categories.filter(c => c.id !== 'all');
        const countFor = id => d.meritBadges.badges.filter(b => b.cat === id).length;
        const totalBadges = d.meritBadges.badges.length;

        el.innerHTML = `
        <div class="hub-page">
            <div class="hub-hero stagger-1">
                <span class="material-symbols-outlined hub-shield">shield</span>
                <h1>${d.meta.title}</h1>
                <p>${d.meta.description}</p>
            </div>

            <div class="hub-panels">
                <!-- LEFT: Merit Badges -->
                <div class="hub-panel stagger-2">
                    <div class="panel-header">
                        <span class="material-symbols-outlined">military_tech</span>
                        <h2>Merit Badges</h2>
                    </div>
                    <div class="hub-cat-list">
                        ${cats.map(c => `
                        <div class="hub-cat-row" data-cat="${c.id}">
                            <span class="material-symbols-outlined" style="color:${c.id === 'eagle' ? '#D4AF37' : ''}">${c.icon}</span>
                        View Full Progression <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>

            <!-- HANDBOOK BUTTON -->
            <div class="hub-handbook stagger-4">
                <div class="hb-icon-wrap"><span class="material-symbols-outlined">menu_book</span></div>
                <div class="hb-content">
                    <h3>Scout Handbook</h3>
                    <p>Checklists, sign-offs, and progress tracking — the digital companion to advancement.</p>
                </div>
                <button class="panel-cta" data-page="handbook">
                    Open Handbook <span class="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>

            <!-- FOUR SYSTEMS -->
            <div class="hub-systems stagger-5">
                <h3>Four Systems, One Scout</h3>
                <div class="systems-grid">
                    ${d.systems.map(s => `
                    <div class="system-card" style="--sys-color:${s.color}">
                        <span class="material-symbols-outlined">${s.icon}</span>
                        <h4>${s.name}</h4>
                        <p>${s.desc}</p>
                    </div>`).join('')}
                </div>
            </div>

            <!-- QUICK LINKS -->
            <div class="hub-quick stagger-6">
                <h3>Quick Links</h3>
                <div class="quick-grid">
                    ${d.quickLinks.map(l => `
                    <div class="quick-card">
                        <span class="material-symbols-outlined">${l.icon}</span>
                        <div><strong>${l.label}</strong><small>${l.desc}</small></div>
                    </div>`).join('')}
                </div>
            </div>
        </div>`;

        el.querySelectorAll('[data-page]').forEach(b => b.addEventListener('click', () => this.nav(b.dataset.page)));
        el.querySelectorAll('.hub-cat-row').forEach(r => r.addEventListener('click', () => {
            this.badgeCat = r.dataset.cat;
            this.nav('badges');
        }));
    }

    // ═══════════════════════════════════════════════════════
    // MERIT BADGE EXPLORER — Full sub-application
    // ═══════════════════════════════════════════════════════
    renderBadges(el) {
        const d = this.data.meritBadges;
        const q = this.badgeSearch.toLowerCase();
        const filtered = d.badges.filter(b =>
            (this.badgeCat === 'all' || b.cat === this.badgeCat) &&
            (!q || b.name.toLowerCase().includes(q))
        );
        const countFor = id => id === 'all' ? d.badges.length : d.badges.filter(b => b.cat === id).length;
        const activeCat = d.categories.find(c => c.id === this.badgeCat);
        const sel = this.selectedBadge;

        el.innerHTML = `
        <div class="badges-page ${sel ? 'has-detail' : ''}">
            <aside class="badges-sidebar">
                <h3>Categories</h3>
                <div class="badge-cat-nav" id="badge-cat-nav">
                    ${d.categories.map(c => `
                    <div class="badge-cat-item ${this.badgeCat === c.id ? 'active' : ''}" data-cat="${c.id}">
                        <span class="material-symbols-outlined">${c.icon}</span>
                        <span>${c.label}</span>
                        <span class="cat-count">${countFor(c.id)}</span>
                    </div>`).join('')}
                </div>
            </aside>

            <section class="badges-main">
                <div class="badges-header">
                    <div>
                        <h1 class="page-title">${activeCat.label}</h1>
                        <p class="page-sub">${filtered.length} badge${filtered.length !== 1 ? 's' : ''}${this.badgeCat === 'eagle' ? ' — Required for Eagle Scout rank' : ''}</p>
                    </div>
                    <div class="badges-search">
                        <span class="material-symbols-outlined">search</span>
                        <input type="text" placeholder="Search badges..." value="${this.badgeSearch}" id="badge-search">
                    </div>
                </div>
                <div class="badges-grid" id="badges-grid">
                    ${filtered.length ? filtered.map((b, i) => `
                    <div class="badge-card ${b.cat === 'eagle' ? 'eagle' : ''} ${sel && sel.name === b.name ? 'selected' : ''} stagger-${(i % 6) + 1}" data-badge="${b.name}">
                        <span class="material-symbols-outlined badge-icon">${b.icon}</span>
                        <strong>${b.name}</strong>
                        <small>${b.reqs} requirements</small>
                        <div class="badge-tags">
                            <span class="diff-tag ${b.difficulty.toLowerCase()}">${b.difficulty}</span>
                            ${b.cat === 'eagle' ? '<span class="eagle-tag">Eagle</span>' : ''}
                        </div>
                    </div>`).join('') : '<div class="empty-state"><span class="material-symbols-outlined">search_off</span><p>No badges match your search.</p></div>'}
                </div>
            </section>

            ${sel ? `
            <aside class="badge-detail">
                <button class="detail-close" id="detail-close"><span class="material-symbols-outlined">close</span></button>
                <div class="detail-head">
                    <span class="material-symbols-outlined detail-icon">${sel.icon}</span>
                    <h2>${sel.name}</h2>
                    ${sel.cat === 'eagle' ? '<span class="eagle-tag">Eagle Required</span>' : ''}
                </div>
                <span class="diff-tag ${sel.difficulty.toLowerCase()}">${sel.difficulty}</span>
                <p class="detail-desc">${sel.desc}</p>
                <div class="detail-section">
                    <h4>Requirements (${sel.reqs})</h4>
                    <div class="detail-reqs">
                        ${Array.from({ length: sel.reqs }, (_, i) => `
                        <div class="req-row">
                            <span class="req-num">${i + 1}</span>
                            <span class="req-text">Requirement details — to be populated from official handbook.</span>
                        </div>`).join('')}
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Resources</h4>
                    <div class="detail-links">
                        <div class="res-link"><span class="material-symbols-outlined">person</span> Counselor Directory</div>
                        <div class="res-link"><span class="material-symbols-outlined">description</span> Workbook (PDF)</div>
                        <div class="res-link"><span class="material-symbols-outlined">play_circle</span> Instructional Videos</div>
                    </div>
                </div>
                <button class="track-btn"><span class="material-symbols-outlined">flag</span> Start Tracking</button>
            </aside>` : ''}
        </div>`;

        document.getElementById('badge-cat-nav').addEventListener('click', e => {
            const item = e.target.closest('.badge-cat-item');
            if (item) { this.badgeCat = item.dataset.cat; this.selectedBadge = null; this.renderBadges(el); }
        });
        const searchEl = document.getElementById('badge-search');
        searchEl.addEventListener('input', e => { this.badgeSearch = e.target.value; this.selectedBadge = null; this.renderBadges(el); });
        searchEl.focus(); searchEl.setSelectionRange(searchEl.value.length, searchEl.value.length);

        document.getElementById('badges-grid').addEventListener('click', e => {
            const card = e.target.closest('.badge-card');
            if (card) {
                const b = d.badges.find(x => x.name === card.dataset.badge);
                this.selectedBadge = (sel && sel.name === b.name) ? null : b;
                this.renderBadges(el);
            }
        });
        const closeBtn = document.getElementById('detail-close');
        if (closeBtn) closeBtn.addEventListener('click', () => { this.selectedBadge = null; this.renderBadges(el); });
    }

    // ═══════════════════════════════════════════════════════
    // SCOUT RANK TRACKER — Full sub-application
    // ═══════════════════════════════════════════════════════
    renderRanks(el) {
        const ranks = this.data.ranks;
        const sel = ranks[this.selectedRank];

        el.innerHTML = `
        <div class="ranks-page">
            <div class="ranks-header stagger-1">
                <h1 class="page-title">Scout Rank Progression</h1>
                <p class="page-sub">Seven ranks from Scout to Eagle — the backbone of the Scouting journey</p>
            </div>

            <div class="rank-pipeline stagger-2" id="rank-pipeline">
                ${ranks.map((r, i) => `
                <div class="pipeline-node ${i === this.selectedRank ? 'active' : ''}" data-rank="${i}">
                    <div class="pipeline-dot" style="--rank-color:${r.color}">
                        <span class="material-symbols-outlined">${r.icon}</span>
                    </div>
                    <span class="pipeline-name">${r.name}</span>
                </div>`).join('')}
            </div>

            <div class="rank-detail stagger-3">
                <div class="rank-detail-head" style="--rank-color:${sel.color}">
                    <div class="rank-icon-lg" style="background:${sel.color}">
                        <span class="material-symbols-outlined">${sel.icon}</span>
                    </div>
                    <div>
                        <h2>${sel.name}</h2>
                        <span class="rank-tagline">${sel.tagline}</span>
                    </div>
                    <span class="rank-order">Rank ${sel.order} of 7</span>
                </div>

                <p class="rank-summary">${sel.summary}</p>

                <div class="rank-reqs">
                    <h3>Requirements</h3>
                    <div class="rank-req-list">
                        ${sel.requirements.map(r => `
                        <div class="rank-req-item">
                            <span class="material-symbols-outlined req-check">radio_button_unchecked</span>
                            <span>${r}</span>
                        </div>`).join('')}
                    </div>
                </div>

                <div class="rank-notes">
                    <span class="material-symbols-outlined">info</span>
                    <p>${sel.notes}</p>
                </div>

                ${sel.order < 7 ? `
                <div class="rank-next">
                    <span>Next rank:</span>
                    <button class="next-rank-btn" data-rank="${this.selectedRank + 1}">
                        <span class="material-symbols-outlined" style="color:${ranks[this.selectedRank + 1].color}">${ranks[this.selectedRank + 1].icon}</span>
                        ${ranks[this.selectedRank + 1].name}
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>` : `
                <div class="rank-eagle-banner">
                    <span class="material-symbols-outlined">emoji_events</span>
                    <p>Eagle Scout — the highest rank. Congratulations on reaching the summit of Scouting.</p>
                </div>`}
            </div>
        </div>`;

        document.getElementById('rank-pipeline').addEventListener('click', e => {
            const node = e.target.closest('.pipeline-node');
            if (node) { this.selectedRank = parseInt(node.dataset.rank); this.renderRanks(el); }
        });
        const nextBtn = el.querySelector('.next-rank-btn');
        if (nextBtn) nextBtn.addEventListener('click', () => { this.selectedRank = parseInt(nextBtn.dataset.rank); this.renderRanks(el); });
    }

    // ═══════════════════════════════════════════════════════
    // HANDBOOK — Shell / Placeholder
    // ═══════════════════════════════════════════════════════
    renderHandbook(el) {
        const hb = this.data.handbook;
        el.innerHTML = `
        <div class="handbook-page">
            <div class="hb-header stagger-1">
                <span class="material-symbols-outlined hb-big-icon">menu_book</span>
                <h1 class="page-title">Scout Handbook</h1>
                <p class="page-sub">Your digital companion for tracking advancement, skills, and experiences.</p>
                <span class="coming-soon">Coming Soon</span>
            </div>

            <div class="hb-sections">
                ${hb.sections.map((s, i) => `
                <div class="hb-section-card stagger-${i + 2}">
                    <span class="material-symbols-outlined">${s.icon}</span>
                    <div>
                        <h3>${s.name}</h3>
                        <p>${s.desc}</p>
                    </div>
                    <span class="material-symbols-outlined lock-icon">lock</span>
                </div>`).join('')}
            </div>

            <div class="hb-flow stagger-7">
                <h3>What's Next? — The Scout's Decision Flow</h3>
                <div class="flow-steps">
                    ${[
                { icon: 'menu_book', label: 'Check Handbook' },
                { icon: 'calendar_month', label: 'Check Troop Calendar' },
                { icon: 'compare_arrows', label: 'Match Needs to Events' },
                { icon: 'check_circle', label: 'Do the Thing' },
                { icon: 'update', label: 'Update & Show It' }
            ].map((s, i, a) => `
                    <div class="flow-node">
                        <div class="flow-dot"><span class="material-symbols-outlined">${s.icon}</span></div>
                        <span>${s.label}</span>
                    </div>
                    ${i < a.length - 1 ? '<div class="flow-arrow"><span class="material-symbols-outlined">arrow_downward</span></div>' : ''}
                    `).join('')}
                </div>
            </div>
        </div>`;
    }
}

document.addEventListener('DOMContentLoaded', () => { window.App = new ScoutConsole(); });
