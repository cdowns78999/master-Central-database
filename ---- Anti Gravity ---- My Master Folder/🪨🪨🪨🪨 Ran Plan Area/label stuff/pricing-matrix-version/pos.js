/* ═══════════════════════════════════════════════════════════════
   LABEL ANALYZER OVERLAY — Repurposed from POS
   Glass modal for searching and analyzing labels
   ═══════════════════════════════════════════════════════════════ */

const POS = {
    state: {
        active: false,
        selected: null
    },

    init() {
        this.injectStructure();
        this.bindEvents();
    },

    getAllLabels() {
        if (typeof labelData === 'undefined') return [];
        const all = [];
        Object.keys(labelData).forEach(cat => {
            if (cat === 'All Labels') return;
            labelData[cat].forEach(l => {
                l._category = cat;
                all.push(l);
            });
        });
        return all;
    },

    injectStructure() {
        const overlay = document.createElement('div');
        overlay.className = 'pos-overlay';
        overlay.id = 'pos-overlay';
        overlay.innerHTML = `
            <div class="pos-modal">
                <header class="pos-header">
                    <h1>Label Analyzer // Search</h1>
                    <div class="pos-close-btn" id="pos-close">\u2715</div>
                </header>
                <div class="pos-content">
                    <div class="pos-selection">
                        <div class="pos-input-group">
                            <label>Label Search</label>
                            <div class="pos-search-wrapper">
                                <input type="text" class="pos-search-input" id="pos-search" placeholder="Type a label name (e.g. Drumcode, Spinnin')...">
                                <div class="pos-search-results" id="pos-results"></div>
                            </div>
                        </div>

                        <div id="pos-detail-panel" style="margin-top: 2rem; display: none;">
                            <div class="pos-input-group">
                                <label>Label Profile</label>
                                <div id="pos-label-profile" style="color: #fff; font-family: 'Outfit', sans-serif;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="pos-ledger">
                        <label style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.4); margin-bottom: 2rem; font-weight: 800;">Quick Stats</label>
                        <div class="pos-ledger-list" id="pos-stats-list">
                            <div class="pos-ledger-item" style="border-bottom-color: rgba(255,255,255,0.05);">
                                <span style="color: rgba(255,255,255,0.5); font-size: 0.75rem;">Total Labels</span>
                                <span style="font-weight: 800; color: var(--pos-primary);" id="stat-total">80</span>
                            </div>
                            <div class="pos-ledger-item" style="border-bottom-color: rgba(255,255,255,0.05);">
                                <span style="color: rgba(255,255,255,0.5); font-size: 0.75rem;">Bass / Dubstep</span>
                                <span style="font-weight: 800; color: #ef4444;" id="stat-bass">15</span>
                            </div>
                            <div class="pos-ledger-item" style="border-bottom-color: rgba(255,255,255,0.05);">
                                <span style="color: rgba(255,255,255,0.5); font-size: 0.75rem;">Tech / Tech House</span>
                                <span style="font-weight: 800; color: #6366f1;" id="stat-tech">15</span>
                            </div>
                            <div class="pos-ledger-item" style="border-bottom-color: rgba(255,255,255,0.05);">
                                <span style="color: rgba(255,255,255,0.5); font-size: 0.75rem;">Chart Labels</span>
                                <span style="font-weight: 800; color: var(--pos-primary);" id="stat-chart">50</span>
                            </div>
                        </div>
                        <div class="pos-footer">
                            <div class="pos-total-row">
                                <span class="pos-total-label">Countries</span>
                                <span id="stat-countries" style="font-size: 1.5rem;">12</span>
                            </div>
                            <div class="pos-total-row" style="margin-top: 1rem;">
                                <span class="pos-total-label">Year Range</span>
                                <span id="stat-years" style="font-size: 1.5rem;">1887 \u2013 2022</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const launchBtn = document.createElement('div');
        launchBtn.className = 'pos-launch-btn';
        launchBtn.id = 'pos-launch';
        launchBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(launchBtn);
    },

    bindEvents() {
        const launch = document.getElementById('pos-launch');
        const close = document.getElementById('pos-close');
        const search = document.getElementById('pos-search');

        launch.onclick = () => this.toggle(true);
        close.onclick = () => this.toggle(false);

        search.oninput = (e) => this.handleSearch(e.target.value);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.active) this.toggle(false);
        });
    },

    toggle(show) {
        const overlay = document.getElementById('pos-overlay');
        this.state.active = show;
        if (show) {
            overlay.style.display = 'flex';
            setTimeout(() => overlay.classList.add('active'), 10);
            document.getElementById('pos-search').focus();
        } else {
            overlay.classList.remove('active');
            setTimeout(() => overlay.style.display = 'none', 500);
        }
    },

    handleSearch(query) {
        const results = document.getElementById('pos-results');
        if (!query.trim()) {
            results.classList.remove('active');
            return;
        }

        const pool = this.getAllLabels();
        const q = query.toLowerCase();
        const matches = pool.filter(l =>
            l.name.toLowerCase().includes(q) ||
            l.sub.toLowerCase().includes(q) ||
            l.tags.some(t => t.toLowerCase().includes(q)) ||
            l.country.toLowerCase().includes(q) ||
            (l.assoc && l.assoc.toLowerCase().includes(q))
        );

        this.renderResults(matches);
    },

    renderResults(matches) {
        const results = document.getElementById('pos-results');
        results.innerHTML = '';

        if (matches.length > 0) {
            results.classList.add('active');
            matches.slice(0, 8).forEach(match => {
                const div = document.createElement('div');
                div.className = 'pos-result-item';
                div.innerHTML = `
                    <span class="name">${match.name}</span>
                    <span class="price">${match.sub}</span>
                `;
                div.onclick = () => this.selectLabel(match);
                results.appendChild(div);
            });
        } else {
            results.classList.remove('active');
        }
    },

    selectLabel(label) {
        this.state.selected = label;
        document.getElementById('pos-search').value = label.name;
        document.getElementById('pos-results').classList.remove('active');
        this.showProfile(label);
    },

    showProfile(label) {
        const panel = document.getElementById('pos-detail-panel');
        const profile = document.getElementById('pos-label-profile');
        panel.style.display = 'block';

        const tagsHtml = label.tags.map(t =>
            '<span style="display:inline-block;padding:4px 12px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);border-radius:9999px;font-size:0.7rem;font-family:\'JetBrains Mono\',monospace;color:#38bdf8;margin:3px 4px 3px 0;">' + t + '</span>'
        ).join('');

        const sourceHtml = label.sourceTrack
            ? '<div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);">' +
              '<div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.4);font-weight:800;margin-bottom:0.5rem;">Chart Source</div>' +
              '<div style="font-size:0.9rem;">"' + label.sourceTrack + '" \u2014 ' + label.sourceChart + '</div>' +
              (label.followers ? '<div style="font-size:0.75rem;color:var(--pos-primary);margin-top:4px;font-family:\'JetBrains Mono\',monospace;">' + (label.followers / 1000000).toFixed(1) + 'M followers</div>' : '') +
              '</div>'
            : '';

        profile.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;">
                <div style="width:48px;height:48px;border-radius:12px;background:${label.color || '#2563eb'};display:flex;align-items:center;justify-content:center;">
                    <span style="color:#fff;font-weight:900;font-size:1.2rem;">${label.name.charAt(0)}</span>
                </div>
                <div>
                    <div style="font-weight:800;font-size:1.2rem;letter-spacing:-0.5px;">${label.name}</div>
                    <div style="font-size:0.8rem;color:rgba(255,255,255,0.5);">${label.sub} \u00B7 ${label._category || ''}</div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:1rem;">
                    <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.4);font-weight:800;">Founded</div>
                    <div style="font-size:1.5rem;font-weight:900;color:var(--pos-primary);margin-top:4px;">${label.founded}</div>
                </div>
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:1rem;">
                    <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.4);font-weight:800;">Roster</div>
                    <div style="font-size:1.5rem;font-weight:900;color:var(--pos-primary);margin-top:4px;">~${label.roster}</div>
                </div>
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:1rem;">
                    <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.4);font-weight:800;">Country</div>
                    <div style="font-size:1.5rem;font-weight:900;color:#fff;margin-top:4px;">${label.country}</div>
                </div>
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:1rem;">
                    <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.4);font-weight:800;">Status</div>
                    <div style="font-size:1.5rem;font-weight:900;color:#10b981;margin-top:4px;text-transform:capitalize;">${label.status}</div>
                </div>
            </div>

            <div style="margin-bottom:1rem;">
                <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.4);font-weight:800;margin-bottom:0.5rem;">Tags</div>
                ${tagsHtml}
            </div>

            ${label.assoc ? '<div style="font-size:0.8rem;color:rgba(255,255,255,0.6);margin-top:0.5rem;"><span style="color:rgba(255,255,255,0.3);">// </span>' + label.assoc + '</div>' : ''}

            ${sourceHtml}
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof labelData !== 'undefined') {
        POS.init();
    }
});
