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
    hiddenCopyArea: document.getElementById('hiddenCopyArea'),
    paypalLink: document.getElementById('paypalLink')
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

        ${dom.paypalLink.value ? `
        <a href="${dom.paypalLink.value}" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 2rem; padding: 1.1rem 2rem; background: rgba(0, 112, 186, 0.15); border: 1.5px solid rgba(0, 112, 186, 0.5); border-radius: 14px; text-decoration: none; color: #fff; font-weight: 700; font-size: 0.95rem; letter-spacing: 1px; transition: all 0.3s ease; cursor: pointer;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.773.773 0 0 1 .763-.658h6.567c2.18 0 3.727.587 4.598 1.744.408.543.667 1.134.77 1.757.109.654.054 1.432-.165 2.378l-.005.023v.006c-.566 2.878-2.344 4.342-5.294 4.342h-1.34a.773.773 0 0 0-.763.658l-.858 5.367z" fill="#009cde"/><path d="M18.429 7.613c-.028.181-.06.362-.1.55-.894 4.598-3.961 6.187-7.88 6.187h-1.993a.969.969 0 0 0-.957.82l-1.02 6.467-.29 1.833a.51.51 0 0 0 .504.59h3.543a.85.85 0 0 0 .84-.723l.035-.178.667-4.222.043-.233a.85.85 0 0 1 .84-.723h.529c3.422 0 6.103-1.39 6.886-5.412.327-1.68.158-3.084-.708-4.07a3.38 3.38 0 0 0-.94-.686z" fill="#012169"/></svg>
            Pay with PayPal
        </a>
        ` : ''}
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

/* ==========================================================================
   MAPPER LOGIC
   ========================================================================== */

const scrollContainer = document.getElementById('scrollContainer');
if (scrollContainer) {
    scrollContainer.addEventListener('wheel', (e) => {
        if (e.shiftKey) {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        }
    });
}

function openGroup(urls) { urls.forEach(url => window.open(url, '_blank')); }

function showPasswordInput(event) {
    const node = event.currentTarget;
    if (node.classList.contains('unlocked')) return;

    const ramseyText = document.getElementById('ramsey-text');
    const ramseyPw = document.getElementById('ramsey-pw');
    if (ramseyText && ramseyPw) {
        ramseyText.classList.add('hidden');
        ramseyPw.style.display = 'flex';
        const input = node.querySelector('.pw-input');
        if (input) input.focus();
    }
}

function checkPassword(input, event) {
    if (event.key === 'Enter') {
        if (input.value.toLowerCase() === 'big money') {
            const node = document.getElementById('ramsey-node');
            const ramseyText = document.getElementById('ramsey-text');
            const ramseyPw = document.getElementById('ramsey-pw');

            if (node) {
                node.style.borderColor = '#4cc9f0';
                node.style.background = 'rgba(76, 201, 240, 0.1)';
            }

            setTimeout(() => {
                window.open('https://chad9b-better-than-ramsey-iii-me.tiiny.site/', '_blank');
                if (ramseyText && ramseyPw) {
                    ramseyText.classList.remove('hidden');
                    ramseyPw.style.display = 'none';
                }
                input.value = '';
                if (node) {
                    node.style.borderColor = '';
                    node.style.background = '';
                }
            }, 400);
        } else {
            input.style.borderColor = '#ff5d8f';
            input.style.transform = 'translateX(5px)';
            setTimeout(() => input.style.transform = 'translateX(-5px)', 50);
            setTimeout(() => input.style.transform = 'translateX(5px)', 100);
            setTimeout(() => {
                input.style.transform = 'translateX(0)';
                input.style.borderColor = '';
                input.value = '';
            }, 150);
        }
    }
}

// Particle Background Engine
const initMapperParticles = () => {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            s: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            o: Math.random() * 0.4 + 0.1
        }));
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(76, 201, 240, ${p.o})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
};

initMapperParticles();
