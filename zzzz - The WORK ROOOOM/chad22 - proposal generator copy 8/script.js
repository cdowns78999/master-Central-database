// --- Master Pricing Database ---
const serviceDatabase = {
    spotify: [
        { name: '10K Spotify', amount: '$325', type: 'spotify' },
        { name: '15K Spotify', amount: '$390', type: 'spotify' },
        { name: '20K Spotify', amount: '$490', type: 'spotify' },
        { name: '25K Spotify', amount: '$590', type: 'spotify' },
        { name: '30K Spotify', amount: '$690', type: 'spotify' },
        { name: '40K Spotify', amount: '$790', type: 'spotify' },
        { name: '50K Spotify', amount: '$890', type: 'spotify' },
        { name: '60K Spotify', amount: '$990', type: 'spotify' },
        { name: '75K Spotify', amount: '$1,200', type: 'spotify' },
        { name: '100K Spotify', amount: '$1,500', type: 'spotify' },
        { name: '125K Spotify', amount: '$1,875', type: 'spotify' },
        { name: '150K Spotify', amount: '$2,250', type: 'spotify' },
        { name: '200K Spotify', amount: '$3,000', type: 'spotify' },
        { name: '250K Spotify', amount: '$3,550', type: 'spotify' },
        { name: '500K Spotify', amount: '$6,500', type: 'spotify' }
    ],
    press: [
        { name: '3 Articles (In-Network)', amount: '$200', type: 'press' },
        { name: '4 Articles (In-Network)', amount: '$250', type: 'press' },
        { name: '5 Articles (In-Network)', amount: '$300', type: 'press' },
        { name: '4–7 Articles (Standard)', amount: '$550', type: 'press' },
        { name: '6–10 Articles (Standard)', amount: '$700', type: 'press' },
        { name: '10–15 Articles (Standard)', amount: '$900', type: 'press' },
        { name: '3 Articles (Premium)', amount: '$500', type: 'press' },
        { name: '4 Articles (Premium)', amount: '$650', type: 'press' },
        { name: '6 Articles (Premium)', amount: '$750', type: 'press' }
    ],
    youtube: [
        { name: '10K YouTube', amount: '$375', type: 'youtube' },
        { name: '20K YouTube', amount: '$650', type: 'youtube' },
        { name: '50K YouTube', amount: '$1,200', type: 'youtube' },
        { name: '100K YouTube', amount: '$1,500', type: 'youtube' }
    ],
    soundcloud: [
        { name: '4K Streams', amount: '$180', type: 'soundcloud' },
        { name: '8K Streams', amount: '$240', type: 'soundcloud' },
        { name: '16K Streams', amount: '$350', type: 'soundcloud' }
    ]
};

const allServices = [...serviceDatabase.spotify, ...serviceDatabase.press, ...serviceDatabase.youtube, ...serviceDatabase.soundcloud];

// --- State Management ---
let state = {
    artist: { name: '', image: '', platform: 'Spotify' },
    vision: { strategy: '', timeline: '' },
    orders: [],
    incentives: { discount: 0, bonus: [], deadline: '' },
    totals: { subtotal: 0, discountImpact: 0, grandTotal: 0 }
};

// --- DOM Elements ---
const dom = {
    spotifyUrl: document.getElementById('spotifyUrl'),
    artistHero: document.getElementById('artistHero'),
    artistPic: document.getElementById('artistPic'),
    artistNameDisplay: document.getElementById('artistNameDisplay'),
    field1: document.getElementById('field1'),
    field2: document.getElementById('field2'),
    serviceSearch: document.getElementById('serviceSearch'),
    searchResults: document.getElementById('searchResults'),
    ledgerItems: document.getElementById('ledgerItems'),
    discountInput: document.getElementById('discountInput'),
    discountImpact: document.getElementById('discountImpact'),
    discountValue: document.getElementById('discountValue'),
    grandTotal: document.getElementById('grandTotal'),
    bonus1: document.getElementById('bonus1'),
    bonus2: document.getElementById('bonus2'),
    deadlineDate: document.getElementById('deadlineDate'),
    resultsWrapper: document.getElementById('resultsWrapper'),
    premiumCardAnchor: document.getElementById('premiumCardAnchor'),
    masterCodeWrapper: document.getElementById('masterCodeWrapper'),
    rawCodeContent: document.getElementById('rawCodeContent'),
    desktopOpt: document.getElementById('desktopOpt'),
    mobileOpt: document.getElementById('mobileOpt'),
    tabPayload: document.getElementById('tabPayload'),
    tabWrap: document.getElementById('tabWrap'),
    hiddenCopyArea: document.getElementById('hiddenCopyArea')
};

let currentCodeTab = 'wrap';

// --- Phase 1: Identity & Extraction ---
dom.spotifyUrl.addEventListener('input', async (e) => {
    const url = e.target.value.trim();
    const info = extractSpotifyID(url);
    if (info) {
        const data = await fetchSpotifyOEmbed(url);
        if (data) {
            state.artist.name = data.title;
            state.artist.image = data.thumbnail_url;
            updateArtistUI();
            autoPopStrategy();
        }
    }
});

function extractSpotifyID(url) {
    const matches = url.match(/spotify\.com\/(track|album|artist)\/([a-zA-Z0-9]+)/i);
    return matches ? { type: matches[1], id: matches[2] } : null;
}

async function fetchSpotifyOEmbed(url) {
    try {
        const cleanUrl = url.split('?')[0];
        const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(cleanUrl)}`);
        return res.ok ? await res.json() : null;
    } catch { return null; }
}

function updateArtistUI() {
    dom.artistHero.classList.add('active');
    dom.artistPic.src = state.artist.image;
    dom.artistNameDisplay.innerText = state.artist.name;
}

function autoPopStrategy() {
    if (!dom.field1.value) {
        dom.field1.value = `Comprehensive growth strategy for ${state.artist.name}. Leveraging high-authority placements and data-driven targeting to maximize audience retention and platform velocity.`;
    }
}

// --- Phase 2: Service Search & Ledger ---
dom.serviceSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length > 0) {
        const matches = allServices.filter(s => s.name.toLowerCase().includes(query));
        renderSearchResults(matches);
    } else {
        dom.searchResults.classList.remove('active');
    }
});

function renderSearchResults(matches) {
    dom.searchResults.innerHTML = '';

    // Always add "Add Custom..." row first
    const customDiv = document.createElement('div');
    customDiv.className = 'result-item';
    customDiv.style.borderBottom = '1px solid var(--primary)';
    customDiv.style.color = 'var(--primary)';
    customDiv.style.fontWeight = '800';
    customDiv.innerHTML = `<span style="opacity: 0.5; margin-right: 8px;">+</span> Add Custom Service...`;
    customDiv.onclick = () => promptCustomService();
    dom.searchResults.appendChild(customDiv);

    if (matches.length > 0 || dom.serviceSearch.value.length > 0) {
        dom.searchResults.classList.add('active');
        matches.slice(0, 10).forEach(match => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerText = `${match.name} - ${match.amount}`;
            div.onclick = () => addService(match);
            dom.searchResults.appendChild(div);
        });
    } else {
        dom.searchResults.classList.remove('active');
    }
}

function promptCustomService() {
    const name = prompt("Enter Service Name:", dom.serviceSearch.value);
    if (!name) return;
    const amount = prompt("Enter Amount (e.g. $500):", "$");
    if (!amount) return;

    addService({ name, amount, type: 'custom' });
}

function addService(service) {
    // Clone the service to ensure each entry is distinct
    state.orders.push({ ...service });
    updateLedgerUI();
    dom.serviceSearch.value = '';
    dom.searchResults.classList.remove('active');
}

function removeService(index) {
    state.orders.splice(index, 1);
    updateLedgerUI();
}

function updateLedgerUI() {
    dom.ledgerItems.innerHTML = '';
    let subtotal = 0;

    state.orders.forEach((order, index) => {
        const item = document.createElement('div');
        item.className = 'ledger-item';
        item.innerHTML = `
            <span class="name">${order.name}</span>
            <span class="price">${order.amount}</span>
            <div class="delete-btn" onclick="removeService(${index})">✕</div>
        `;
        dom.ledgerItems.appendChild(item);
        subtotal += parseFloat(order.amount.replace(/[$,]/g, '')) || 0;
    });

    const discount = parseFloat(dom.discountInput.value) || 0;
    const discountVal = subtotal * (discount / 100);
    const grandTotal = subtotal - discountVal;

    state.totals = { subtotal, discountImpact: discountVal, grandTotal };

    if (discount > 0) {
        dom.discountImpact.style.display = 'flex';
        dom.discountValue.innerText = `-$${discountVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    } else {
        dom.discountImpact.style.display = 'none';
    }

    dom.grandTotal.innerText = `$${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

dom.discountInput.addEventListener('input', updateLedgerUI);

// --- Phase 3: Generation & Visualization ---
function masterGenerate() {
    dom.resultsWrapper.classList.add('active');
    generatePremiumCard();
    dom.resultsWrapper.scrollIntoView({ behavior: 'smooth' });
}

function generatePremiumCard() {
    dom.premiumCardAnchor.innerHTML = '';

    const deadline = dom.deadlineDate.value ? new Date(dom.deadlineDate.value).toLocaleDateString() : 'N/A';
    const bonusText = [dom.bonus1.value, dom.bonus2.value].filter(b => b).join(' | ');

    const card = document.createElement('div');
    card.id = 'premiumCard';
    card.style.cssText = `
        background: rgba(15, 23, 42, 0.9);
        border: 2px solid rgba(56, 189, 248, 0.4);
        border-radius: 32px;
        padding: 3rem;
        width: 100%;
        max-width: 600px;
        backdrop-filter: blur(40px);
        box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        color: white;
        transition: all 0.5s ease;
        position: relative;
    `;

    card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1.5rem;">
            <img src="${state.artist.image}" style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid #1ed760; box-shadow: 0 0 20px rgba(30,215,96,0.3);">
            <div>
                <div style="font-size: 1.8rem; font-weight: 800; letter-spacing: -1px;">${state.artist.name || 'Artist'}</div>
                <div style="color: #1ed760; font-family: 'JetBrains Mono'; font-size: 0.8rem; letter-spacing: 2px;">STRATEGY PAYLOAD</div>
            </div>
        </div>

        <div style="margin-bottom: 2.5rem;">
            <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.3); margin-bottom: 1rem;">Core Objective</div>
            <div style="font-size: 1rem; line-height: 1.6; color: rgba(255,255,255,0.8);">${dom.field1.value}</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem;">
            ${state.orders.map(o => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 1rem 1.5rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600;">${o.name}</span>
                    <span style="color: #38bdf8; font-weight: 800; font-family: 'JetBrains Mono';">${o.amount}</span>
                </div>
            `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2.5rem;">
            <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 16px; padding: 1.25rem; text-align: center;">
                <div style="font-size: 0.6rem; text-transform: uppercase; letter-spacing: 2px; color: #38bdf8; margin-bottom: 5px;">Deadline</div>
                <div style="font-weight: 800; font-size: 1.1rem;">${deadline}</div>
            </div>
            <div style="background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 16px; padding: 1.25rem; text-align: center;">
                <div style="font-size: 0.6rem; text-transform: uppercase; letter-spacing: 2px; color: #f43f5e; margin-bottom: 5px;">Discount</div>
                <div style="font-weight: 800; font-size: 1.1rem;">${dom.discountInput.value || 0}% OFF</div>
            </div>
        </div>

        ${bonusText ? `
            <div style="background: linear-gradient(135deg, #6366f1, #38bdf8); padding: 1.25rem; border-radius: 16px; text-align: center; margin-bottom: 2.5rem; box-shadow: 0 15px 30px rgba(99, 102, 241, 0.3);">
                <div style="font-size: 0.6rem; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.8); margin-bottom: 5px;">Incentive Bonuses</div>
                <div style="font-weight: 800; font-size: 0.9rem;">${bonusText}</div>
            </div>
        ` : ''}

        <div style="padding-top: 2rem; border-top: 2px solid #38bdf8; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; text-transform: uppercase; letter-spacing: 4px; font-size: 1rem;">Total Investment</span>
            <span style="font-size: 2.2rem; font-weight: 900; color: #38bdf8; text-shadow: 0 0 20px rgba(56,189,248,0.3);">$${state.totals.grandTotal.toFixed(2)}</span>
        </div>
    `;

    dom.premiumCardAnchor.appendChild(card);
}

// --- Viewport Control ---
function setViewport(mode) {
    if (mode === 'mobile') {
        dom.premiumCardAnchor.classList.add('mobile-view');
        dom.mobileOpt.classList.add('active');
        dom.desktopOpt.classList.remove('active');
    } else {
        dom.premiumCardAnchor.classList.remove('mobile-view');
        dom.desktopOpt.classList.add('active');
        dom.mobileOpt.classList.remove('active');
    }
}

// --- Delivery Functions ---
function switchCodeTab(tab) {
    currentCodeTab = tab;
    dom.tabPayload.classList.toggle('active', tab === 'payload');
    dom.tabWrap.classList.toggle('active', tab === 'wrap');
    updateCodeDisplay();
}

function updateCodeDisplay() {
    if (currentCodeTab === 'payload') {
        const payload = {
            metadata: state.artist,
            vision: { strategy: dom.field1.value, timeline: dom.field2.value },
            commercials: { orders: state.orders, discount: dom.discountInput.value, deadline: dom.deadlineDate.value, total: state.totals.grandTotal }
        };
        dom.rawCodeContent.innerText = JSON.stringify(payload, null, 4);
    } else {
        dom.rawCodeContent.innerText = generateStandaloneHTML();
    }
}

function generateStandaloneHTML() {
    const deadline = dom.deadlineDate.value ? new Date(dom.deadlineDate.value).toLocaleDateString() : 'N/A';
    const bonusText = [dom.bonus1.value, dom.bonus2.value].filter(b => b).join(' | ');

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
        body { background: #020617; display: flex; justify-content: center; padding: 40px 20px; font-family: 'Outfit', sans-serif; }
        .card {
            background: rgba(15, 23, 42, 0.9);
            border: 2px solid rgba(56, 189, 248, 0.4);
            border-radius: 32px;
            padding: 3rem;
            width: 100%;
            max-width: 600px;
            box-shadow: 0 40px 80px rgba(0,0,0,0.6);
            color: white;
            position: relative;
        }
    </style>
</head>
<body>
    <div class="card">
        ${document.getElementById('premiumCard').innerHTML}
    </div>
</body>
</html>`;
}

function toggleMasterCode() {
    if (dom.masterCodeWrapper.classList.contains('active')) {
        dom.masterCodeWrapper.classList.remove('active');
    } else {
        updateCodeDisplay();
        dom.masterCodeWrapper.classList.add('active');
        dom.masterCodeWrapper.scrollIntoView({ behavior: 'smooth' });
        // Fun convenience: Auto-copy on reveal
        setTimeout(() => copyMasterAll(), 100);
    }
}

function copyMasterAll() {
    const text = dom.rawCodeContent.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-all-btn');
        const oldText = btn.innerText;
        btn.innerText = "COPIED!";
        setTimeout(() => btn.innerText = oldText, 2000);
    });
}

// --- Test Automation ---
async function fillV3TestData() {
    // 1. Identity
    dom.spotifyUrl.value = "https://open.spotify.com/artist/6hEshD9iO0iolNdqjuQcyG?si=Pyhph_i-R9SCG4GVNSqoXg"; // Rich Furniss
    const event = new Event('input', { bubbles: true });
    dom.spotifyUrl.dispatchEvent(event);

    // 2. Tactical
    dom.field1.value = "Phase 1: Deep integration with Spotify Editorial teams. Phase 2: High-velocity TikTok influencer mapping. Phase 3: Global sync licensing push.";
    dom.field2.value = "Release Date: March 15th. 8-week duration. Post-release maintenance for 4 weeks.";

    // 3. Investment
    state.orders = [
        { name: '50K Spotify', amount: '$890', type: 'spotify' },
        { name: '5 Articles (In-Network)', amount: '$300', type: 'press' }
    ];
    updateLedgerUI();

    // 4. Incentives
    dom.discountInput.value = 15;
    dom.bonus1.value = "Free Marquee Placement";
    dom.bonus2.value = "24/7 Priority Support";

    const d = new Date();
    d.setDate(d.getDate() + 7);
    dom.deadlineDate.value = d.toISOString().split('T')[0];

    updateLedgerUI();

    // Auto-scroll to show results
    setTimeout(() => {
        alert("V3 Test Data Loaded! Click GO to visualize.");
    }, 500);
}

// ===== CAMPAIGN WATERFALL — 15 HOVER CARDS =====

const campaignCards = [
    // ── PHASE 1: FREE (5 tracks) ──
    {
        phase: 1, badge: 'free', role: 'Track \u2022 The Hook', name: 'Track 1',
        tools: 'Pitch + Canvas + Discovery', audience: 'Editorial + Algorithmic',
        benchmark: '100K streams potential', cost: 'FREE', costCls: 'free',
        hover: {
            why: 'Producing: editorial playlist consideration. 74% of artists added to editorial playlists had fewer than 100K monthly listeners \u2014 this is the free path to mass reach.',
            phases: [
                { text: '\u2605 NOW\nFree', cls: 'now green' },
                { text: 'Phase 2\nShowcase', cls: '' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Pitch + Canvas + Discovery Mode',
            toolHl: '',
            pills: [
                { text: 'Editorial', hl: 'hl green' },
                { text: 'Algorithmic', hl: '' }
            ],
            result: '100K streams from one placement',
            resultHl: 'hl green',
            source: 'How to Meet Your Music Goals \u2014 Jay Wheeler / TRAPPii'
        }
    },
    {
        phase: 1, badge: 'free', role: 'Track \u2022 The Collab', name: 'Track 2',
        tools: 'Pitch + Canvas + Discovery', audience: 'Editorial + Partner\u2019s listeners',
        benchmark: '31% never-heard-you listeners', cost: 'FREE', costCls: 'free',
        hover: {
            why: 'Producing: cross-artist discovery via Discovery Mode. 31% of Discovery Mode listeners had never streamed the artist before \u2014 a collab multiplies this by exposing both fanbases.',
            phases: [
                { text: '\u2605 NOW\nFree', cls: 'now green' },
                { text: 'Phase 2\nShowcase', cls: '' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Pitch + Canvas + Discovery Mode',
            toolHl: '',
            pills: [
                { text: 'Editorial', hl: '' },
                { text: 'Partner\u2019s listeners', hl: 'hl green' }
            ],
            result: '31% brand-new listeners via Discovery',
            resultHl: 'hl green',
            source: 'How Magic City Hippies Sequenced Marquee, Canvas & Discovery Mode'
        }
    },
    {
        phase: 1, badge: 'free', role: 'Track \u2022 The Vibe Shift', name: 'Track 3',
        tools: 'Pitch + Canvas + Discovery', audience: 'Editorial + Algorithmic',
        benchmark: '+50% saves, +44% playlist adds', cost: 'FREE', costCls: 'free',
        hover: {
            why: 'Producing: listener intent signals. First month of Discovery Mode averages +50% saves, +44% playlist adds, +37% follows \u2014 these actions tell Spotify\u2019s algorithm you matter.',
            phases: [
                { text: '\u2605 NOW\nFree', cls: 'now green' },
                { text: 'Phase 2\nShowcase', cls: '' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Pitch + Canvas + Discovery Mode',
            toolHl: 'hl green',
            pills: [
                { text: 'Editorial', hl: '' },
                { text: 'Algorithmic', hl: 'hl green' }
            ],
            result: '+50% saves \u2022 +44% playlist adds \u2022 +37% follows',
            resultHl: 'hl green',
            source: 'How to Meet Your Music Goals \u2014 Discovery Mode'
        }
    },
    {
        phase: 1, badge: 'free', role: 'Track \u2022 The Lead', name: 'Track 4',
        tools: 'Pitch + Canvas + Discovery', audience: 'Editorial + Algorithmic',
        benchmark: '385-440% Discovery stream lift', cost: 'FREE', costCls: 'free',
        hover: {
            why: 'Producing: compounding algorithmic reach. Discovery Mode drove 385% stream lift for William Black and 440%+ for Khalia \u2014 consecutive releases stack this effect.',
            phases: [
                { text: '\u2605 NOW\nFree', cls: 'now green' },
                { text: 'Phase 2\nShowcase', cls: '' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Pitch + Canvas + Discovery Mode',
            toolHl: '',
            pills: [
                { text: 'Editorial', hl: '' },
                { text: 'Algorithmic', hl: 'hl green' }
            ],
            result: '385-440% stream lift in Discovery contexts',
            resultHl: 'hl green',
            source: 'Seven Success Stories \u2014 William Black / Khalia'
        }
    },
    {
        phase: 1, badge: 'free', role: 'Track \u2022 The Closer', name: 'Track 5',
        tools: 'Pitch + Canvas + Discovery', audience: 'Editorial + Algorithmic',
        benchmark: '1,000 streams/28d \u2192 Showcase', cost: 'FREE', costCls: 'free',
        hover: {
            why: 'Producing: Showcase eligibility. Artists need at least 1,000 streams over the past 28 days in a target market \u2014 this track crosses that line.',
            phases: [
                { text: '\u2605 NOW\nFree', cls: 'now green' },
                { text: 'UNLOCKING\nShowcase', cls: 'unlock' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Pitch + Canvas + Discovery Mode',
            toolHl: '',
            pills: [
                { text: 'Editorial', hl: '' },
                { text: 'Algorithmic', hl: '' }
            ],
            result: '1,000 streams / 28 days \u2192 SHOWCASE',
            resultHl: 'hl green',
            source: 'Getting Started with Showcase \u2014 Eligibility'
        }
    },

    // ── PHASE 2: SHOWCASE (5 tracks) ──
    {
        phase: 2, badge: 'showcase', role: 'Track \u2022 The Hook', name: 'Track 1',
        tools: 'Showcase $100 + free stack', audience: 'Active + Light',
        benchmark: '6x streams vs non-reached', cost: '$100', costCls: 'paid',
        hover: {
            why: 'Producing: Home feed placement converting to streams. Listeners who see a Showcase are 6x more likely to stream the promoted release \u2014 direct, measurable conversion from $100.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: '\u2605 NOW\nShowcase', cls: 'now' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Showcase $100 + free stack',
            toolHl: 'hl',
            pills: [
                { text: 'Active', hl: 'hl' },
                { text: 'Light', hl: 'hl' }
            ],
            result: '6x more likely to stream vs non-reached',
            resultHl: 'hl',
            source: 'Getting Started with Showcase \u2014 How It Works'
        }
    },
    {
        phase: 2, badge: 'showcase', role: 'Track \u2022 The Collab', name: 'Track 2',
        tools: 'Showcase $100 + free stack', audience: 'Active + Previously Active',
        benchmark: '>10% saved \u2022 ~20% streamed catalog', cost: '$100', costCls: 'paid',
        hover: {
            why: 'Producing: reactivation of drifted listeners. Over 10% of previously active who streamed Goth Babe\u2019s Showcase saved it, and nearly 20% went on to stream his other releases.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: '\u2605 NOW\nShowcase', cls: 'now' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Showcase $100 + free stack',
            toolHl: '',
            pills: [
                { text: 'Active', hl: '' },
                { text: 'Previously Active', hl: 'hl' }
            ],
            result: '>10% saved + ~20% explored catalog',
            resultHl: 'hl',
            source: 'How to Meet Your Music Goals \u2014 Goth Babe'
        }
    },
    {
        phase: 2, badge: 'showcase', role: 'Track \u2022 The Vibe Shift', name: 'Track 3',
        tools: 'Showcase $100 + free stack', audience: 'Active + Light + Prev Active',
        benchmark: '6x streams \u2022 25% intent rate', cost: '$100', costCls: 'paid',
        hover: {
            why: 'Producing: three-segment activation at once. 6x stream lift across all reached listeners, and 1 in 4 saved or playlisted for Money Man\u2019s Showcase campaign.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: '\u2605 NOW\nShowcase', cls: 'now' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Showcase $100 + free stack',
            toolHl: '',
            pills: [
                { text: 'Active', hl: 'hl' },
                { text: 'Light', hl: 'hl' },
                { text: 'Prev Active', hl: 'hl' }
            ],
            result: '6x streams + 1 in 4 saved or playlisted',
            resultHl: 'hl',
            source: 'Seven Success Stories \u2014 Money Man'
        }
    },
    {
        phase: 2, badge: 'showcase', role: 'Track \u2022 The Lead', name: 'Track 4',
        tools: 'Showcase $100 + free stack', audience: 'Active + Light',
        benchmark: '~6x streams \u2022 MAL growth', cost: '$100', costCls: 'paid',
        hover: {
            why: 'Producing: monthly active listener growth. William Black\u2019s Showcase drove listeners to stream ~6x more than non-reached \u2014 each new active listener counts toward Marquee eligibility.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: '\u2605 NOW\nShowcase', cls: 'now' },
                { text: 'Phase 3\n40x', cls: '' }
            ],
            tool: 'Showcase $100 + free stack',
            toolHl: '',
            pills: [
                { text: 'Active', hl: '' },
                { text: 'Light', hl: 'hl' }
            ],
            result: '~6x streams \u2014 building monthly active count',
            resultHl: 'hl',
            source: 'Seven Success Stories \u2014 William Black'
        }
    },
    {
        phase: 2, badge: 'showcase', role: 'Track \u2022 The Closer', name: 'Track 5',
        tools: 'Showcase $100 + free stack', audience: 'Active + Light + Prev Active',
        benchmark: '5,000 MAL \u2192 Marquee', cost: '$100', costCls: 'paid',
        hover: {
            why: 'Producing: Marquee eligibility. Without engagement, over half of previously active listeners stop streaming within 3 months \u2014 this Showcase keeps them in while you cross 5,000 MAL.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: '\u2605 NOW\nShowcase', cls: 'now' },
                { text: 'UNLOCK\n40x', cls: 'unlock' }
            ],
            tool: 'Showcase $100 + free stack',
            toolHl: '',
            pills: [
                { text: 'Active', hl: '' },
                { text: 'Light', hl: '' },
                { text: 'Prev Active', hl: 'hl' }
            ],
            result: '5,000 MAL \u2192 MARQUEE UNLOCKED',
            resultHl: 'hl',
            source: 'How to Meet Your Music Goals \u2014 Reactivation'
        }
    },

    // ── PHASE 3: FULL STACK 40x (5 tracks) ──
    {
        phase: 3, badge: 'fullstack', role: 'Track \u2022 The Hook', name: 'Track 1',
        tools: 'Marquee + Showcase + free', audience: 'Super + Active + Moderate',
        benchmark: '40x new active listeners', cost: '$200', costCls: 'full',
        hover: {
            why: 'Producing: 40x compound lift in new active listeners. Marquee alone drives 8x \u2014 pairing with Showcase multiplies it to 40x regardless of spend amount.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: 'Phase 2\nShowcase \u2713', cls: 'done' },
                { text: '\u2605 NOW\n40x', cls: 'now red' }
            ],
            tool: 'Marquee $100 + Showcase $100 + free',
            toolHl: 'hl red',
            pills: [
                { text: 'Super', hl: 'hl red' },
                { text: 'Active', hl: 'hl red' },
                { text: 'Moderate', hl: '' }
            ],
            result: '40x new active listeners (Marquee + Showcase)',
            resultHl: 'hl red',
            source: 'Seven Success Stories \u2014 Opening Research'
        }
    },
    {
        phase: 3, badge: 'fullstack', role: 'Track \u2022 The Collab', name: 'Track 2',
        tools: 'Marquee + Showcase + free', audience: 'Super + Active + Programmed',
        benchmark: '40x + Programmed first contact', cost: '$200', costCls: 'full',
        hover: {
            why: 'Producing: first full-screen contact with Programmed listeners \u2014 people who only heard you via playlists and radio now see your Marquee and actively choose to stream.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: 'Phase 2\nShowcase \u2713', cls: 'done' },
                { text: '\u2605 NOW\n40x', cls: 'now red' }
            ],
            tool: 'Marquee $100 + Showcase $100 + free',
            toolHl: '',
            pills: [
                { text: 'Super', hl: '' },
                { text: 'Active', hl: '' },
                { text: 'Programmed', hl: 'hl red' }
            ],
            result: '40x lift + cross-artist Programmed reach',
            resultHl: 'hl red',
            source: 'Getting Started with Showcase \u2014 Audience Segments'
        }
    },
    {
        phase: 3, badge: 'fullstack', role: 'Track \u2022 The Vibe Shift', name: 'Track 3',
        tools: 'Marquee + Showcase + free', audience: 'Super + Active + Light + Potential',
        benchmark: '40x + Potential discovery', cost: '$200', costCls: 'full',
        hover: {
            why: 'Producing: brand-new fan acquisition. Potential listeners have never streamed you \u2014 Marquee\u2019s full-screen format introduces you at the highest-intent moment on Spotify.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: 'Phase 2\nShowcase \u2713', cls: 'done' },
                { text: '\u2605 NOW\n40x', cls: 'now red' }
            ],
            tool: 'Marquee $100 + Showcase $100 + free',
            toolHl: '',
            pills: [
                { text: 'Super', hl: '' },
                { text: 'Active', hl: '' },
                { text: 'Light', hl: '' },
                { text: 'Potential', hl: 'hl red' }
            ],
            result: '40x compound + new listener acquisition',
            resultHl: 'hl red',
            source: 'Getting Started with Showcase \u2014 Audience Segments'
        }
    },
    {
        phase: 3, badge: 'fullstack', role: 'Track \u2022 The Lead', name: 'Track 4',
        tools: 'Marquee + Showcase + free', audience: 'Super + Active + Mod + Prev Active',
        benchmark: '40x + reactivation sweep', cost: '$200', costCls: 'full',
        hover: {
            why: 'Producing: full reactivation sweep. Without engagement, 50%+ of previously active stop streaming within 3 months \u2014 this catches every lapsed listener before the project drops.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: 'Phase 2\nShowcase \u2713', cls: 'done' },
                { text: '\u2605 NOW\n40x', cls: 'now red' }
            ],
            tool: 'Marquee $100 + Showcase $100 + free',
            toolHl: '',
            pills: [
                { text: 'Super', hl: '' },
                { text: 'Active', hl: '' },
                { text: 'Moderate', hl: '' },
                { text: 'Prev Active', hl: 'hl red' }
            ],
            result: '40x compound \u2014 reactivation sweep',
            resultHl: 'hl red',
            source: 'How to Meet Your Music Goals \u2014 Reactivation'
        }
    },
    {
        phase: 3, badge: 'fullstack', role: 'Track \u2022 The Closer', name: 'Track 5',
        tools: 'Marquee + Showcase + free', audience: 'ALL SEGMENTS',
        benchmark: '40x \u2192 EP / Album ready', cost: '$200', costCls: 'full',
        hover: {
            why: 'Producing: a fully activated audience for your project. Every segment, every tool, max spend \u2014 75% of a release\u2019s first-year streams happen after month one. This audience is primed.',
            phases: [
                { text: 'Phase 1\nFree \u2713', cls: 'done' },
                { text: 'Phase 2\nShowcase \u2713', cls: 'done' },
                { text: '\u2605 NOW\n40x', cls: 'now red' }
            ],
            tool: 'Marquee $100 + Showcase $100 + free',
            toolHl: 'hl red',
            pills: [
                { text: 'Super', hl: 'hl red' },
                { text: 'Active', hl: 'hl red' },
                { text: 'Moderate', hl: 'hl red' },
                { text: 'Light', hl: 'hl red' },
                { text: 'Potential', hl: 'hl red' }
            ],
            result: '40x compound \u2192 EP / ALBUM READY',
            resultHl: 'hl red',
            source: 'Getting Started with Showcase \u2014 Catalog Streams'
        }
    }
];

// Phase metadata
const phaseInfo = {
    1: { badge: 'free', label: 'FREE', title: 'Pitch + Canvas + Discovery \u2014 Build the Base' },
    2: { badge: 'showcase', label: 'SHOWCASE', title: 'First Paid Tool \u2014 6x Stream Lift' },
    3: { badge: 'fullstack', label: 'FULL STACK', title: 'Marquee + Showcase \u2014 40x Compound' }
};

function renderWaterfall() {
    const container = document.getElementById('waterfallContainer');
    if (!container) return;
    container.innerHTML = '';

    [1, 2, 3].forEach(phase => {
        const cards = campaignCards.filter(c => c.phase === phase);
        const info = phaseInfo[phase];

        const section = document.createElement('div');
        section.className = 'phase-section';
        section.innerHTML = `
            <div class="phase-header">
                <span class="phase-badge ${info.badge}">${info.label}</span>
                <span class="phase-title">${info.title}</span>
            </div>
            <div class="tracks-grid" id="phase${phase}Tracks"></div>
        `;
        container.appendChild(section);

        const grid = section.querySelector('.tracks-grid');
        cards.forEach((card, i) => {
            const num = String(phase * 5 - 5 + i + 1).padStart(2, '0');
            grid.appendChild(buildTrackCard(card, num));
        });
    });
}

function buildTrackCard(card, num) {
    const row = document.createElement('div');
    row.className = 'track-card';
    row.innerHTML = `
        <div class="track-num">${num}</div>
        <div class="track-info">
            <span class="track-role">${card.role}</span>
            <span class="track-name">${card.name}</span>
        </div>
        <div class="track-field">
            <span class="fl">Tools</span>
            <span class="fv">${card.tools}</span>
        </div>
        <div class="track-field hover-trigger">
            <span class="hint">?</span>
            <span class="fl">Audience \u2022 Benchmark</span>
            <span class="fv">${card.audience}</span>
            <span class="fv" style="color: rgba(255,255,255,0.4); font-size: 0.65rem;">${card.benchmark}</span>
            ${buildHoverCard(card.hover)}
        </div>
        <div class="track-cost ${card.costCls}">${card.cost}</div>
    `;
    return row;
}

function buildHoverCard(h) {
    const phaseLadder = h.phases.map(p =>
        `<div class="pb ${p.cls}">${p.text.replace(/\n/g, '<br>')}</div>`
    ).join('<span class="la">\u2192</span>');

    const pills = h.pills.map(p =>
        `<span class="pl ${p.hl}">${p.text}</span>`
    ).join('');

    return `
        <div class="hover-card">
            <div class="hc-label">WHY THIS STEP</div>
            <div class="hc-why">${h.why}</div>
            <div class="hc-divider"></div>
            <div class="hc-label">HOW IT TIES IN</div>
            <div class="phase-ladder">${phaseLadder}</div>
            <div class="ad">\u2193</div>
            <div class="cb ${h.toolHl}">${h.tool}</div>
            <div class="ad">\u2193</div>
            <div class="pr">${pills}</div>
            <div class="ad">\u2193</div>
            <div class="cb ${h.resultHl}">${h.result}</div>
            <div class="hc-src">\u2591 ${h.source}</div>
        </div>
    `;
}

// Initialize waterfall on load
document.addEventListener('DOMContentLoaded', renderWaterfall);
