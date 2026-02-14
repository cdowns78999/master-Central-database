// --- Pricing Database (Extracted from chad6a-client-price.html) ---
const serviceDatabase = {
    spotify: [
        { name: '10K Spotify', amount: '$325', type: 'Stream Package' },
        { name: '15K Spotify', amount: '$390', type: 'Stream Package' },
        { name: '20K Spotify', amount: '$490', type: 'Stream Package' },
        { name: '25K Spotify', amount: '$590', type: 'Stream Package' },
        { name: '30K Spotify', amount: '$690', type: 'Stream Package' },
        { name: '40K Spotify', amount: '$790', type: 'Stream Package' },
        { name: '50K Spotify', amount: '$890', type: 'Stream Package' },
        { name: '60K Spotify', amount: '$990', type: 'Stream Package' },
        { name: '75K Spotify', amount: '$1,200', type: 'Stream Package' },
        { name: '100K Spotify', amount: '$1,500', type: 'Stream Package' },
        { name: '125K Spotify', amount: '$1,875', type: 'Stream Package' },
        { name: '150K Spotify', amount: '$2,250', type: 'Stream Package' },
        { name: '200K Spotify', amount: '$3,000', type: 'Stream Package' },
        { name: '250K Spotify', amount: '$3,550', type: 'Stream Package' },
        { name: '500K Spotify', amount: '$6,500', type: 'Stream Package' }
    ],
    press: [
        { name: '3 Articles (In-Network)', amount: '$200', type: 'Press' },
        { name: '4 Articles (In-Network)', amount: '$250', type: 'Press' },
        { name: '5 Articles (In-Network)', amount: '$300', type: 'Press' },
        { name: '4–7 Articles (Standard)', amount: '$550', type: 'Press' },
        { name: '6–10 Articles (Standard)', amount: '$700', type: 'Press' },
        { name: '10–15 Articles (Standard)', amount: '$900', type: 'Press' },
        { name: '3 Articles (Premium)', amount: '$500', type: 'Press' },
        { name: '4 Articles (Premium)', amount: '$650', type: 'Press' },
        { name: '6 Articles (Premium)', amount: '$750', type: 'Press' }
    ],
    youtube: [
        { name: '10K YouTube', amount: '$375', type: 'YouTube' },
        { name: '20K YouTube', amount: '$650', type: 'YouTube' },
        { name: '50K YouTube', amount: '$1,200', type: 'YouTube' },
        { name: '100K YouTube', amount: '$1,500', type: 'YouTube' }
    ],
    soundcloud: [
        { name: '4K Streams', amount: '$180', type: 'SoundCloud' },
        { name: '8K Streams', amount: '$240', type: 'SoundCloud' },
        { name: '16K Streams', amount: '$350', type: 'SoundCloud' }
    ]
};

// --- Spotify Intelligence (Ported from Matrix) ---
function extractSpotifyID(url) {
    if (!url) return null;
    const cleanUrl = url.trim();
    const trackMatch = cleanUrl.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/i);
    const albumMatch = cleanUrl.match(/spotify\.com\/album\/([a-zA-Z0-9]+)/i);
    const artistMatch = cleanUrl.match(/spotify\.com\/artist\/([a-zA-Z0-9]+)/i);

    if (trackMatch) return { id: trackMatch[1], type: 'track', url: cleanUrl };
    if (albumMatch) return { id: albumMatch[1], type: 'album', url: cleanUrl };
    if (artistMatch) return { id: artistMatch[1], type: 'artist', url: cleanUrl };
    return null;
}

async function fetchSpotifyOEmbed(spotifyUrl) {
    try {
        const cleanUrl = spotifyUrl.split('?')[0];
        const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(cleanUrl)}`;
        const response = await fetch(oEmbedUrl);
        if (!response.ok) throw new Error('oEmbed failed');
        return await response.json();
    } catch (err) {
        return null;
    }
}

// --- DOM Elements ---
const spotifyInput = document.getElementById('spotifyLink');
const artistNameInput = document.getElementById('artistName');
const artistPreview = document.getElementById('artistPreview');
const previewImg = document.getElementById('previewImg');
const previewTitle = document.getElementById('previewTitle');
const previewSubtitle = document.getElementById('previewSubtitle');
const field1 = document.getElementById('field1');
const field2 = document.getElementById('field2');
const field3 = document.getElementById('field3');
const suggestionChips = document.getElementById('suggestionChips');

// --- Feature: Spotify Link Parsing ---
spotifyInput.addEventListener('input', async (e) => {
    const info = extractSpotifyID(e.target.value);
    if (info) {
        const data = await fetchSpotifyOEmbed(info.url);
        if (data) {
            artistPreview.classList.add('active');
            previewImg.src = data.thumbnail_url;
            previewTitle.innerText = data.title;
            previewSubtitle.innerText = `Spotify ${info.type.charAt(0).toUpperCase() + info.type.slice(1)}`;
            artistNameInput.value = data.title;

            // Auto-suggest tier based on artist data
            generateSuggestions(data.title);
        }
    } else {
        artistPreview.classList.remove('active');
    }
});

// --- Feature: Type-to-Suggest (Pricing Engine) ---
field3.addEventListener('input', (e) => {
    const input = e.target.value.toLowerCase();
    if (input.length > 0) {
        searchSuggestions(input);
    } else {
        generateSuggestions(artistNameInput.value);
    }
});

function searchSuggestions(query) {
    suggestionChips.innerHTML = '';
    const allServices = [...serviceDatabase.spotify, ...serviceDatabase.press, ...serviceDatabase.youtube, ...serviceDatabase.soundcloud];

    const matches = allServices.filter(s => s.name.toLowerCase().includes(query));

    matches.slice(0, 10).forEach(match => {
        const chip = document.createElement('div');
        chip.className = `chip ${match.type.toLowerCase().includes('spotify') ? 'spotify' : ''}`;
        chip.innerText = `${match.name} (${match.amount})`;
        chip.onclick = () => {
            field3.value = `${match.name} - ${match.amount}`;
            suggestionChips.innerHTML = ''; // Clear after selection
        };
        suggestionChips.appendChild(chip);
    });
}

function generateSuggestions(artist) {
    suggestionChips.innerHTML = '';
    const defaults = [
        { name: '20K Spotify Growth', amount: '$490', type: 'spotify' },
        { name: 'Standard Press (6-10 Articles)', amount: '$700', type: 'press' },
        { name: 'YouTube 50K Blast', amount: '$1,200', type: 'youtube' }
    ];

    defaults.forEach(item => {
        const chip = document.createElement('div');
        chip.className = `chip ${item.type}`;
        chip.innerText = `${item.name} (${item.amount})`;
        chip.onclick = () => applySuggestion(item);
        suggestionChips.appendChild(chip);
    });
}

function applySuggestion(item) {
    field1.value = `Comprehensive marketing strategy for ${artistNameInput.value || 'the artist'}, focusing on ${item.type} growth and high-impact audience targeting.`;
    field2.value = "Active for 4-6 weeks with weekly reporting.";
    field3.value = `${item.name} - ${item.amount}`;
}

function clearForm() {
    [artistNameInput, spotifyInput, field1, field2, field3].forEach(input => input.value = '');
    artistPreview.classList.remove('active');
    generateSuggestions('');
}

function exportProposal() {
    const proposal = `
ARTIST: ${artistNameInput.value}
STRATEGY: ${field1.value}
TIMELINE: ${field2.value}
BUDGET: ${field3.value}
    `.trim();

    navigator.clipboard.writeText(proposal).then(() => {
        alert("Proposal copied to clipboard!");
    });
}

// Init
generateSuggestions('');
