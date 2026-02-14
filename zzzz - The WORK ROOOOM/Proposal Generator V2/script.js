// --- Service Database (Aggregated) ---
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

const allServices = [
    ...serviceDatabase.spotify,
    ...serviceDatabase.press,
    ...serviceDatabase.youtube,
    ...serviceDatabase.soundcloud
];

// --- V2 State ---
let selectedOrders = [];
let artistName = "";
let artistImage = "";
let grandTotal = 0;

// --- DOM Elements ---
const spotifyUrlInput = document.getElementById('spotifyUrl');
const artistHeader = document.getElementById('artistHeader');
const artistPic = document.getElementById('artistPic');
const artistNameDisplay = document.getElementById('artistNameDisplay');
const field1 = document.getElementById('field1');
const field2 = document.getElementById('field2');
const field3 = document.getElementById('field3');
const discountInput = document.getElementById('discountInput');
const bonus1 = document.getElementById('bonus1');
const bonus2 = document.getElementById('bonus2');
const deadlineDate = document.getElementById('deadlineDate');
const suggestionBox = document.getElementById('suggestionBox');
const ledgerTable = document.getElementById('ledgerTable');
const ledgerTotal = document.getElementById('ledgerTotal');
const resultsArea = document.getElementById('resultsArea');
const visualPreview = document.getElementById('visualPreview');
const revealCodeBtn = document.getElementById('revealCodeBtn');
const codeArea = document.getElementById('codeArea');
const codeContent = document.getElementById('codeContent');

// --- Feature 1: Spotify Pop (Field 1) ---
spotifyUrlInput.addEventListener('input', async (e) => {
    const url = e.target.value;
    const info = extractSpotifyID(url);
    if (info) {
        const data = await fetchSpotifyOEmbed(url);
        if (data) {
            artistHeader.classList.add('active');
            artistPic.src = data.thumbnail_url;
            artistImage = data.thumbnail_url;
            artistNameDisplay.innerText = data.title;
            artistName = data.title;

            if (!field1.value) {
                field1.value = `Proposed strategy for ${data.title}. Focused on high-impact growth through data-driven performance and audience mapping.`;
            }
        }
    } else {
        artistHeader.classList.remove('active');
    }
});

// --- Feature 2: Order Selection & Suggestions (Field 3) ---
field3.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().split(',').pop().trim();
    if (query.length > 0) {
        showSuggestions(query);
    } else {
        suggestionBox.classList.remove('active');
    }
});

function showSuggestions(query) {
    suggestionBox.innerHTML = '';
    const matches = allServices.filter(s => s.name.toLowerCase().includes(query));
    if (matches.length > 0) {
        suggestionBox.classList.add('active');
        matches.slice(0, 10).forEach(match => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerText = `${match.name} - ${match.amount}`;
            div.onclick = () => addOrder(match);
            suggestionBox.appendChild(div);
        });
    } else {
        suggestionBox.classList.remove('active');
    }
}

function addOrder(service) {
    if (!selectedOrders.find(o => o.name === service.name)) {
        selectedOrders.push(service);
        updateLedger();

        const currentVal = field3.value.includes(',')
            ? field3.value.substring(0, field3.value.lastIndexOf(','))
            : '';
        field3.value = currentVal ? `${currentVal.trim()}, ${service.name}` : service.name;
    }
    suggestionBox.classList.remove('active');
}

// --- Feature 3: Pricing Ledger & Auto-Total ---
function updateLedger() {
    ledgerTable.innerHTML = '';
    let subtotal = 0;

    selectedOrders.forEach(order => {
        const row = document.createElement('div');
        row.className = 'ledger-row';
        row.innerHTML = `<span>${order.name}</span><span>${order.amount}</span>`;
        ledgerTable.appendChild(row);
        subtotal += parseFloat(order.amount.replace(/[$,]/g, '')) || 0;
    });

    const discount = parseFloat(discountInput.value) || 0;
    const discountVal = subtotal * (discount / 100);
    grandTotal = subtotal - discountVal;

    const discountRow = document.getElementById('discountRow');
    const discountValueDisplay = document.getElementById('discountValue');

    if (discount > 0) {
        discountRow.style.display = 'flex';
        discountValueDisplay.innerText = `-$${discountVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    } else {
        discountRow.style.display = 'none';
    }

    ledgerTotal.innerText = `$${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

// --- Feature 4: Go & Reveal Results ---
function revealResults() {
    resultsArea.classList.add('active');
    revealCodeBtn.style.display = 'block';

    // Generate Visualization (Mirrors chad6b style)
    generateVisualCard();

    // Scroll to results
    resultsArea.scrollIntoView({ behavior: 'smooth' });
}

function generateVisualCard() {
    visualPreview.innerHTML = '';

    const card = document.createElement('div');
    card.style.cssText = `
        background: rgba(15, 23, 42, 0.8);
        border: 2px solid rgba(14, 165, 233, 0.4);
        border-radius: 24px;
        padding: 2.5rem;
        width: 100%;
        max-width: 500px;
        backdrop-filter: blur(20px);
        box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        color: white;
        font-family: 'Outfit', sans-serif;
        position: relative;
    `;

    const discount = parseFloat(discountInput.value) || 0;
    const deadline = deadlineDate.value ? new Date(deadlineDate.value).toLocaleDateString() : 'N/A';
    const bonusText = [bonus1.value, bonus2.value].filter(b => b).join(' | ');

    card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
            <img src="${artistImage || ''}" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #1DB954;">
            <div style="font-size: 1.2rem; font-weight: 800;">${artistName || 'Artist'} | Proposal</div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
            ${selectedOrders.map(o => `
                <div style="background: rgba(255,255,255,0.05); padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; font-size: 0.9rem;">
                    <span>${o.name}</span>
                    <span style="color: #4cc9f0; font-weight: 700;">${o.amount}</span>
                </div>
            `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: rgba(76, 201, 240, 0.1); border: 1px solid rgba(76, 201, 240, 0.3); border-radius: 12px; padding: 1rem; text-align: center;">
                <div style="font-size: 0.6rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.7; margin-bottom: 5px;">Valid Until</div>
                <div style="color: #4cc9f0; font-weight: 800;">${deadline}</div>
            </div>
            <div style="background: rgba(255, 0, 85, 0.1); border: 1px solid rgba(255, 0, 85, 0.3); border-radius: 12px; padding: 1rem; text-align: center;">
                <div style="font-size: 0.6rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.7; margin-bottom: 5px;">Discount</div>
                <div style="color: #ff0055; font-weight: 800;">${discount}% OFF</div>
            </div>
        </div>

        ${bonusText ? `
            <div style="margin-top: 1.5rem; background: #ff0055; color: white; padding: 1rem; border-radius: 12px; font-size: 0.8rem; font-weight: 800; text-align: center; box-shadow: 0 10px 20px rgba(255,0,85,0.3);">
                BONUS ACTIVATED: ${bonusText}
            </div>
        ` : ''}

        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">Investment</span>
            <span style="font-size: 1.8rem; font-weight: 800; color: #1DB954;">$${grandTotal.toFixed(2)}</span>
        </div>
    `;

    visualPreview.appendChild(card);
}

function toggleCode() {
    if (codeArea.classList.contains('active')) {
        codeArea.classList.remove('active');
    } else {
        const discount = parseFloat(discountInput.value) || 0;
        const deadline = deadlineDate.value || '';
        const bonus = [bonus1.value, bonus2.value].filter(b => b).join(' | ');

        const codeData = {
            artist: artistName,
            strategy: field1.value,
            timeline: field2.value,
            orders: selectedOrders,
            total: grandTotal.toFixed(2),
            discount: `${discount}%`,
            deadline: deadline,
            bonus: bonus
        };

        codeContent.innerText = JSON.stringify(codeData, null, 4);
        codeArea.classList.add('active');
        codeArea.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- Utilities ---
function extractSpotifyID(url) {
    const cleanUrl = url.trim();
    const matches = cleanUrl.match(/spotify\.com\/(track|album|artist)\/([a-zA-Z0-9]+)/i);
    return matches ? { type: matches[1], id: matches[2] } : null;
}

async function fetchSpotifyOEmbed(url) {
    try {
        const cleanUrl = url.split('?')[0];
        const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(cleanUrl)}`);
        return res.ok ? await res.json() : null;
    } catch { return null; }
}

function resetV2() {
    [spotifyUrlInput, field1, field2, field3, discountInput, bonus1, bonus2, deadlineDate].forEach(i => i.value = '');
    artistHeader.classList.remove('active');
    selectedOrders = [];
    updateLedger();
    resultsArea.classList.remove('active');
    visualPreview.innerHTML = '';
}

function copyProposalV2() {
    const deadline = deadlineDate.value ? new Date(deadlineDate.value).toLocaleDateString() : 'N/A';
    const bonusText = [bonus1.value, bonus2.value].filter(b => b).join(' | ');

    const text = `
PROPOSAL FOR: ${artistName || 'Artist'}

--- VISION --- 
${field1.value}

--- TIMELINE ---
${field2.value}

--- INVESTMENT BREAKDOWN ---
${selectedOrders.map(o => `- ${o.name}: ${o.amount}`).join('\n')}

--- SPECIAL DEAL ---
Discount: ${discountInput.value || 0}%
Bonus: ${bonusText || 'None'}
Valid Until: ${deadline}

TOTAL INVESTMENT: $${grandTotal.toFixed(2)}
    `.trim();

    navigator.clipboard.writeText(text).then(() => alert("Enhanced Proposal copied!"));
}
