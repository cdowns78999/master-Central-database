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
        grandTotal: 0
    },

    init() {
        this.injectStructure();
        this.bindEvents();
        this.loadInitialData();
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
                            <label>Service Search</label>
                            <div class="pos-search-wrapper">
                                <input type="text" class="pos-search-input" id="pos-search" placeholder="Type to build order (e.g. 10k, press)...">
                                <div class="pos-search-results" id="pos-results"></div>
                            </div>
                        </div>

                        <div class="pos-input-group">
                            <label>Contextual Strategy</label>
                            <textarea placeholder="Specify tactical directives for this order..." style="height: 150px;"></textarea>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                            <div class="pos-input-group">
                                <label>Incentive Discount (%)</label>
                                <input type="number" id="pos-discount" class="pos-search-input" style="border-radius: 12px; padding: 1rem 1.5rem;" placeholder="0">
                            </div>
                            <div class="pos-input-group">
                                <label>Delivery Deadline</label>
                                <input type="date" class="pos-search-input" style="border-radius: 12px; padding: 1rem 1.5rem;">
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
                                <span class="pos-total-label">Grand Total</span>
                                <span id="pos-total-display">$0.00</span>
                            </div>
                            <button class="pos-search-input" style="margin-top: 2rem; background: var(--pos-primary); color: #000; font-weight: 900; letter-spacing: 2px; border: none; cursor:pointer;" onclick="POS.lockOrder()">LOCK & GENERATE PAYLOAD</button>
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
        const overlay = document.getElementById('pos-overlay');
        const search = document.getElementById('pos-search');
        const discount = document.getElementById('pos-discount');

        launch.onclick = () => this.toggle(true);
        close.onclick = () => this.toggle(false);

        search.oninput = (e) => this.handleSearch(e.target.value);
        discount.oninput = (e) => {
            this.state.discount = parseFloat(e.target.value) || 0;
            this.updateLedger();
        };

        // Close on escape
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
            results.classList.remove('active');
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

        document.getElementById('pos-subtotal-display').innerText = `$${subtotal.toLocaleString()}`;
        document.getElementById('pos-total-display').innerText = `$${total.toLocaleString()}`;
    },

    lockOrder() {
        alert("FINANCIAL PAYLOAD GENERATED. Check terminal for raw data.");
        console.log("POS EXPORT:", this.state);
    }
};

// Initialize POS on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mediaData !== 'undefined') {
        POS.init();
    }
});
