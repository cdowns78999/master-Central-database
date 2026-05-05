/* 
   ==========================================================================
   FINANCIAL POS LOGIC: THE MAGIC TOUCH
   ========================================================================== 
*/

const POS = {
    state: {
        active: false,
        orders: [],
        discount: 0,
        subtotal: 0,
        grandTotal: 0,
        artistName: 'Elite Client',
        artistImage: ''
    },

    init() {
        this.injectStructure();
        this.bindEvents();
    },

    injectStructure() {
        const overlay = document.createElement('div');
        overlay.className = 'pos-overlay';
        overlay.id = 'pos-overlay';
        overlay.innerHTML = `
            <div class="pos-modal">
                <header class="pos-header">
                    <h1>Financial Command Center // POS</h1>
                    <div class="pos-close-btn" id="pos-close">✕</div>
                </header>
                <div class="pos-content">
                    <div class="pos-selection">
                        <div class="pos-input-group">
                            <label>Artist Identity // Spotify Intelligence</label>
                            <input type="text" id="pos-artist-input" class="pos-search-input" placeholder="Paste Spotify URL or enter name...">
                            <div id="pos-artist-preview" class="pos-artist-preview">
                                <img id="pos-preview-img" src="" alt="">
                                <div class="pos-artist-info">
                                    <h3 id="pos-preview-name">Artist Name</h3>
                                </div>
                            </div>
                        </div>

                        <div class="pos-input-group">
                            <label>Service Search // Finance Integration</label>
                            <div class="pos-search-wrapper">
                                <input type="text" class="pos-search-input" id="pos-search" placeholder="Type to build order (e.g. 10k, press)...">
                                <div class="pos-search-results" id="pos-results"></div>
                            </div>
                        </div>

                        <div class="pos-input-group">
                            <label>Tactical Directive // Strategy</label>
                            <textarea id="pos-strategy" class="pos-strategy-box" placeholder="Craft the campaign vision for this protocol..." style="height: 120px;"></textarea>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                            <div class="pos-input-group">
                                <label>Incentive Discount (%)</label>
                                <input type="number" id="pos-discount" class="pos-search-input" placeholder="0">
                            </div>
                            <div class="pos-input-group">
                                <label>Delivery Deadline</label>
                                <input type="date" id="pos-deadline" class="pos-search-input">
                            </div>
                        </div>
                    </div>

                    <div class="pos-ledger">
                        <label style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.4); margin-bottom: 2rem; font-weight: 800;">Strategy Ledger</label>
                        <div class="pos-ledger-list" id="pos-ledger-items">
                            <!-- Items go here -->
                        </div>
                        <div class="pos-footer">
                            <div class="pos-total-row">
                                <span class="pos-total-label">Subtotal</span>
                                <span id="pos-subtotal-display">$0.00</span>
                            </div>
                            <div class="pos-total-row" style="margin-top: 1rem;">
                                <span class="pos-total-label" id="pos-discount-label">Grand Total</span>
                                <span id="pos-total-display">$0.00</span>
                            </div>
                            <button class="pos-search-input" style="margin-top: 2rem; background: var(--pos-primary); color: #000; font-weight: 900; letter-spacing: 2px; border: none; cursor:pointer;" onclick="POS.lockOrder()">POS & GENERATE PROTOCOL</button>
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
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M7 15h.01M11 15h.01M15 15h.01M19 15h.01M7 11h.01M11 11h.01M15 11h.01M19 11h.01" />
            </svg>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(launchBtn);
    },

    bindEvents() {
        const launch = document.getElementById('pos-launch');
        const close = document.getElementById('pos-close');
        const search = document.getElementById('pos-search');
        const discount = document.getElementById('pos-discount');
        const artistInput = document.getElementById('pos-artist-input');

        launch.onclick = () => this.toggle(true);
        close.onclick = () => this.toggle(false);

        search.oninput = (e) => this.handleSearch(e.target.value);
        discount.oninput = (e) => {
            this.state.discount = parseFloat(e.target.value) || 0;
            this.updateLedger();
        };

        artistInput.oninput = (e) => this.handleArtistInput(e.target.value);

        // Close on escape
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.active) this.toggle(false);
        });
    },

    async handleArtistInput(val) {
        if (val.includes('open.spotify.com/artist/')) {
            const artistId = val.split('artist/')[1]?.split('?')[0];
            if (artistId) {
                try {
                    const response = await fetch(`https://open.spotify.com/oembed?url=spotify:artist:${artistId}`);
                    const data = await response.json();
                    if (data.title) {
                        this.state.artistName = data.title;
                        this.state.artistImage = data.thumbnail_url;

                        // Update UI with "Pop" effect
                        const preview = document.getElementById('pos-artist-preview');
                        document.getElementById('pos-preview-img').src = data.thumbnail_url;
                        document.getElementById('pos-preview-name').innerText = data.title;
                        preview.classList.add('active');

                        // Auto-Pop Strategy (Chad22 DNA)
                        const strategyBox = document.getElementById('pos-strategy');
                        if (!strategyBox.value) {
                            strategyBox.value = `Comprehensive growth strategy for ${data.title}. Leveraging high-authority placements and data-driven targeting to maximize audience retention and platform velocity.`;
                        }

                        document.getElementById('pos-artist-input').value = data.title;
                    }
                } catch (e) { console.error("Spotify Parse Error", e); }
            }
        } else {
            this.state.artistName = val || 'Elite Client';
            document.getElementById('pos-artist-preview').classList.remove('active');
        }
    },

    toggle(show) {
        const overlay = document.getElementById('pos-overlay');
        this.state.active = show;
        if (show) {
            overlay.style.display = 'flex';
            setTimeout(() => overlay.classList.add('active'), 10);
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

        // Pull from global mediaData pool
        const pool = [];
        Object.values(mediaData).forEach(cat => {
            cat.forEach(item => {
                if (item.reach.startsWith('$')) { // Only financial items
                    pool.push(item);
                }
            });
        });

        const matches = pool.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        this.renderResults(matches);
    },

    renderResults(matches) {
        const results = document.getElementById('pos-results');
        results.innerHTML = '';

        // Add Custom Service row (Chad22 DNA)
        const customDiv = document.createElement('div');
        customDiv.className = 'pos-result-item';
        customDiv.style.borderBottom = '1px solid var(--pos-primary)';
        customDiv.style.color = 'var(--pos-primary)';
        customDiv.style.fontWeight = '800';
        customDiv.innerHTML = `<span style="opacity: 0.5; margin-right: 8px;">+</span> Add Custom Service...`;
        customDiv.onclick = () => this.promptCustomService();
        results.appendChild(customDiv);

        if (matches.length > 0) {
            results.classList.add('active');
            matches.slice(0, 8).forEach(match => {
                const div = document.createElement('div');
                div.className = 'pos-result-item';
                div.innerHTML = `
                    <span class="name">${match.name}</span>
                    <span class="price">${match.reach}</span>
                `;
                div.onclick = () => this.addItem(match);
                results.appendChild(div);
            });
        } else {
            results.classList.add('active'); // Keep active for custom btn if no matches
        }
    },

    promptCustomService() {
        const name = prompt("Enter Service Name:");
        const price = prompt("Enter Investment Amount (e.g. $500):");
        if (name && price) {
            this.addItem({ name, reach: price });
        }
    },

    addItem(item) {
        this.state.orders.push({ ...item });
        document.getElementById('pos-search').value = '';
        document.getElementById('pos-results').classList.remove('active');
        this.updateLedger();
    },

    removeItem(index) {
        this.state.orders.splice(index, 1);
        this.updateLedger();
    },

    updateLedger() {
        const container = document.getElementById('pos-ledger-items');
        container.innerHTML = '';
        let subtotal = 0;

        this.state.orders.forEach((order, index) => {
            const div = document.createElement('div');
            div.className = 'pos-ledger-item';
            div.innerHTML = `
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 800; font-size: 0.9rem;">${order.name}</span>
                    <span style="font-family: 'JetBrains Mono'; font-size: 0.75rem; color: var(--pos-primary);">${order.reach}</span>
                </div>
                <div class="pos-delete-btn" onclick="POS.removeItem(${index})">✕</div>
            `;
            container.appendChild(div);
            subtotal += parseFloat(order.reach.replace(/[$,]/g, '')) || 0;
        });

        const discountVal = subtotal * (this.state.discount / 100);
        const total = subtotal - discountVal;

        this.state.subtotal = subtotal;
        this.state.grandTotal = total;

        document.getElementById('pos-subtotal-display').innerText = `$${subtotal.toLocaleString()}`;
        document.getElementById('pos-total-display').innerText = `$${total.toLocaleString()}`;
    },

    lockOrder() {
        const strategy = document.getElementById('pos-strategy').value;
        const deadline = document.getElementById('pos-deadline').value || 'TBD';
        const artistName = this.state.artistName;
        const artistImage = this.state.artistImage;
        const date = new Date().toLocaleDateString();

        const protocolHTML = this.generateProtocolHTML({
            artistName,
            artistImage,
            strategy,
            deadline,
            date,
            orders: this.state.orders,
            discount: this.state.discount,
            subtotal: this.state.subtotal,
            total: this.state.grandTotal
        });

        const blob = new Blob([protocolHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `STRATEGY_PROTOCOL_${artistName.replace(/\s+/g, '_').toUpperCase()}_${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert("STRATEGY PROTOCOL GENERATED AND DOWNLOADED.");
    },

    generateProtocolHTML(data) {
        const artistSection = data.artistImage
            ? `<div style="display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem;">
                  <img src="${data.artistImage}" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #38bdf8; object-fit: cover;">
                  <div>
                      <h1 style="font-size: 2.5rem; letter-spacing: -2px; margin: 0;">Strategy Protocol</h1>
                      <div class="meta">EST. ${data.date} // FOR ${data.artistName}</div>
                  </div>
               </div>`
            : `<header>
                  <h1>Strategy Protocol</h1>
                  <div class="meta">EST. ${data.date} // FOR ${data.artistName}</div>
               </header>`;

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strategy Protocol | ${data.artistName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
        body { background: #020617; color: #fff; font-family: 'Outfit', sans-serif; padding: 4rem; display: flex; justify-content: center; }
        .protocol-card {
            width: 100%;
            max-width: 800px;
            background: rgba(15, 23, 42, 0.9);
            border: 2px solid #38bdf8;
            border-radius: 40px;
            padding: 4rem;
            box-shadow: 0 50px 100px rgba(0,0,0,0.5);
        }
        header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem; margin-bottom: 3rem; }
        .meta { color: #38bdf8; font-family: 'JetBrains Mono'; font-size: 0.8rem; letter-spacing: 3px; margin-top: 5px; }
        .section { margin-bottom: 3rem; }
        .label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 4px; color: rgba(255,255,255,0.4); margin-bottom: 1rem; display: block; }
        .strategy { font-size: 1.25rem; line-height: 1.6; color: rgba(255,255,255,0.9); font-weight: 300; }
        .ledger-item { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .price { color: #38bdf8; font-family: 'JetBrains Mono'; font-weight: 700; }
        .footer { border-top: 2px solid #38bdf8; padding-top: 2rem; margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; }
        .total-amount { font-size: 3rem; font-weight: 900; color: #38bdf8; }
    </style>
</head>
<body>
    <div class="protocol-card">
        ${artistSection}
        
        <div class="section">
            <span class="label">Tactical Objective</span>
            <div class="strategy">${data.strategy || "Maintain high-velocity platform growth via curated media placements and strategic audience mapping."}</div>
        </div>

        <div class="section">
            <span class="label">Service Stack</span>
            ${data.orders.map(o => `
                <div class="ledger-item">
                    <span>${o.name}</span>
                    <span class="price">${o.reach}</span>
                </div>
            `).join('')}
        </div>

        <div class="section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <span class="label">Deadline</span>
                <div style="font-weight: 800; font-size: 1.2rem;">${data.deadline}</div>
            </div>
            <div>
                <span class="label">Incentive Applied</span>
                <div style="font-weight: 800; font-size: 1.2rem; color: #f43f5e;">${data.discount}% OFF</div>
            </div>
        </div>

        <div class="footer">
            <span style="font-weight: 800; text-transform: uppercase; letter-spacing: 5px;">Total Investment</span>
            <div class="total-amount">$${data.total.toLocaleString()}</div>
        </div>
    </div>
</body>
</html>
        `;
    }
};

// Initialize POS on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mediaData !== 'undefined') {
        POS.init();
    }
});
