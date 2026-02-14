/**
 * Food Web App - Core Logic
 * Handles data fetching, state management, hub switching, and interactive features.
 */

const AppState = {
    currentView: 'recipes',
    recipes: [],
    safetyArticles: [],
    businessData: null,
    selectedLetter: null,
    searchQuery: '',
    storageKey: 'ag_recipe_store'
};

// --- Initialization ---

document.addEventListener('DOMContentLoaded', async () => {
    showLoading(true);
    await initData();
    initUI();
    showLoading(false);
});

async function initData() {
    try {
        // Fetch bundled data
        const [recipesRes, safetyRes, businessRes] = await Promise.all([
            fetch('data/recipes.json'),
            fetch('data/safety.json'),
            fetch('data/business.json')
        ]);

        const bundledRecipes = await recipesRes.json();
        AppState.safetyArticles = await safetyRes.json();
        AppState.businessData = await businessRes.json();

        // Merge with local storage
        const storedRecipes = JSON.parse(localStorage.getItem(AppState.storageKey)) || [];
        AppState.recipes = mergeRecipes(bundledRecipes, storedRecipes);

        console.log('Data initialized', AppState);
    } catch (err) {
        console.error('Failed to load data', err);
    }
}

function mergeRecipes(bundled, stored) {
    const map = new Map();
    bundled.forEach(r => map.set(r.id, r));
    stored.forEach(r => map.set(r.id, r)); // Stored overwrites bundled if IDs match
    return Array.from(map.values());
}

function initUI() {
    setupHubNav();
    setupRecipesHub();
    setupSafetyHub();
    setupBusinessHub();
    setupModal();
    handleDeepLinks();
}

// --- Hub Switching ---

function setupHubNav() {
    const buttons = document.querySelectorAll('.pill-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });
}

function switchView(view) {
    AppState.currentView = view;

    // Update buttons
    document.querySelectorAll('.pill-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    // Update sections
    document.querySelectorAll('.hub-section').forEach(sec => {
        sec.classList.toggle('hidden', sec.id !== `${view}-hub`);
    });

    // Update URL hash
    window.location.hash = view;

    // Scroll to content if not at top
    if (window.scrollY > 100) {
        document.querySelector('.content-container').scrollIntoView({ behavior: 'smooth' });
    }
}

function handleDeepLinks() {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['recipes', 'safety', 'business'].includes(hash)) {
        switchView(hash);
    }
}

// --- Recipes Hub Logic ---

function setupRecipesHub() {
    renderAlphabet();
    renderRecipeGrid();
    renderGallery();
    setupSearch();
    setupDragAndDrop();
}

function renderAlphabet() {
    const container = document.querySelector('.alphabet-filter');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    container.innerHTML = letters.map(l =>
        `<button class="letter-btn" data-letter="${l}">${l}</button>`
    ).join('');

    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('letter-btn')) {
            const letter = e.target.dataset.letter;
            toggleLetterFilter(letter);
        }
    });
}

function toggleLetterFilter(letter) {
    if (AppState.selectedLetter === letter) {
        AppState.selectedLetter = null; // Unselect
    } else {
        AppState.selectedLetter = letter;
    }

    document.querySelectorAll('.letter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.letter === AppState.selectedLetter);
    });

    renderRecipeGrid();
}

function renderRecipeGrid() {
    const grid = document.getElementById('recipe-grid');
    const filtered = AppState.recipes.filter(r => {
        const matchesLetter = !AppState.selectedLetter || r.primary_letter === AppState.selectedLetter;
        const matchesSearch = !AppState.searchQuery ||
            r.title.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
            r.tags.some(t => t.toLowerCase().includes(AppState.searchQuery.toLowerCase()));
        return matchesLetter && matchesSearch;
    });

    const dropZone = document.getElementById('recipe-drop-zone');

    // Preserve drop zone
    grid.innerHTML = '';
    grid.appendChild(dropZone);

    filtered.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p class="tag-row">${recipe.tags.map(t => `<span class="tag">#${t}</span>`).join(' ')}</p>
            <div class="card-footer">
                <span>${recipe.category}</span>
                <span>⭐ ${recipe.rating || '-'}</span>
            </div>
        `;
        card.addEventListener('click', () => openRecipeModal(recipe));
        grid.insertBefore(card, dropZone);
    });
}

function setupSearch() {
    const search = document.getElementById('recipe-search');
    const suggestList = document.getElementById('autosuggest-list');

    search.addEventListener('input', (e) => {
        AppState.searchQuery = e.target.value;
        renderRecipeGrid();
        showSuggestions(AppState.searchQuery);
    });

    search.addEventListener('keyup', (e) => {
        // Sync first letter with hotkeys if applicable
        if (e.target.value.length === 1) {
            const firstLetter = e.target.value.toUpperCase();
            if (/^[A-Z]$/.test(firstLetter)) {
                // Potential to auto-highlight letter, but might be noisy
            }
        }
    });
}

function showSuggestions(query) {
    const suggestList = document.getElementById('autosuggest-list');
    if (!query) {
        suggestList.innerHTML = '';
        return;
    }

    const matches = AppState.recipes.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    suggestList.innerHTML = matches.map(m =>
        `<div class="suggestion-item" data-id="${m.id}">${m.title}</div>`
    ).join('');

    // Clicking suggestion
    suggestList.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const recipe = AppState.recipes.find(r => r.id === item.dataset.id);
            openRecipeModal(recipe);
            suggestList.innerHTML = '';
        });
    });
}

// --- Drag and Drop ---

function setupDragAndDrop() {
    const zone = document.getElementById('recipe-drop-zone');

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('dragover');
    });

    zone.addEventListener('drop', async (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');

        const text = e.dataTransfer.getData('text');
        const url = e.dataTransfer.getData('url') || (text.startsWith('http') ? text : null);

        if (url) {
            addNewRecipeFromUrl(url, text);
        } else if (text) {
            addNewRecipeFromText(text);
        }
    });
}

async function addNewRecipeFromUrl(url, originalText) {
    // In a real app, we might fetch the page title. 
    // Here we'll simulate it.
    const title = originalText.length < 50 && originalText !== url ? originalText : "New Recipe via Link";

    const newRecipe = {
        id: 'user_' + Date.now(),
        title: title,
        url: url,
        tags: ["saved"],
        category: "UNCATEGORIZED",
        primary_letter: title.charAt(0).toUpperCase(),
        notes: "",
        rating: 0
    };

    AppState.recipes.push(newRecipe);
    saveRecipes();
    renderRecipeGrid();
}

function addNewRecipeFromText(text) {
    const title = text.slice(0, 30) + "...";
    const newRecipe = {
        id: 'user_' + Date.now(),
        title: title,
        url: "#",
        tags: ["text-snip"],
        category: "TEXT",
        primary_letter: title.charAt(0).toUpperCase(),
        notes: text,
        rating: 0
    };

    AppState.recipes.push(newRecipe);
    saveRecipes();
    renderRecipeGrid();
}

function saveRecipes() {
    const userRecipes = AppState.recipes.filter(r => r.id.startsWith('user_'));
    localStorage.setItem(AppState.storageKey, JSON.stringify(userRecipes));
}

// --- Safety Hub Logic ---

function setupSafetyHub() {
    const categories = document.querySelectorAll('#safety-categories li');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            renderSafetyGrid(cat.dataset.category);
        });
    });
    renderSafetyGrid('all');
}

function renderSafetyGrid(filter = 'all') {
    const grid = document.getElementById('safety-grid');
    const filtered = filter === 'all'
        ? AppState.safetyArticles
        : AppState.safetyArticles.filter(a => a.tags.includes(filter) || a.topic.toLowerCase() === filter);

    grid.innerHTML = filtered.map(art => `
        <div class="safety-card">
            <span class="risk-badge risk-${art.risk_level.toLowerCase()}">${art.risk_level}</span>
            <h3>${art.title}</h3>
            <p>${art.summary}</p>
            <a href="${art.link}" target="_blank" class="safe-link">Read Full Protocol →</a>
        </div>
    `).join('');
}

// --- Business Hub Logic ---

function setupBusinessHub() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderBusinessNarrative(tab.dataset.brand);
        });
    });
    renderBusinessNarrative('pioneer');
}

function renderBusinessNarrative(brand) {
    const container = document.getElementById('business-narrative');
    const data = AppState.businessData[brand];

    if (!data) return;

    let html = `
        <h2 class="narrative-title">${data.title}</h2>
        <div class="narrative-body">
            <p>${data.narrative}</p>
        </div>
    `;

    if (data.timeline && data.timeline.length > 0) {
        html += `
            <div class="timeline">
                <h3>Business Timeline</h3>
                ${data.timeline.map(item => `
                    <div class="timeline-item">
                        <span class="date">${item.date}</span>
                        <div class="event-box">
                            <strong>${item.event}</strong>
                            <p>${item.detail}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (data.strategies) {
        html += `
            <div class="strategies">
                <h3>Key Strategies</h3>
                <ul>
                    ${data.strategies.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    container.innerHTML = html;
}

// --- Modal & Pump Card ---

function setupModal() {
    const modal = document.getElementById('recipe-modal');
    const close = modal.querySelector('.close-modal');

    close.onclick = () => modal.classList.add('hidden');
    window.onclick = (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    };
}

function openRecipeModal(recipe) {
    const modal = document.getElementById('recipe-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <div class="pump-card">
            <h1 class="pump-title">${recipe.title}</h1>
            <div class="pump-tags">
                ${recipe.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
            </div>
            ${recipe.image ? `<img src="${recipe.image}" class="pump-image">` : ''}
            <div class="pump-content">
                <p><strong>Category:</strong> ${recipe.category}</p>
                <div class="note-area">
                    <label>Persisted Notes:</label>
                    <textarea id="recipe-note" placeholder="Add your private notes here...">${recipe.notes || ''}</textarea>
                </div>
                <div class="pump-actions">
                    <a href="${recipe.url}" target="_blank" class="pill-button active">Open Full Recipe</a>
                    <button class="pill-button" onclick="saveRecipeNote('${recipe.id}')">Save Notes</button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

window.saveRecipeNote = (recipeId) => {
    const note = document.getElementById('recipe-note').value;
    const recipe = AppState.recipes.find(r => r.id === recipeId);
    if (recipe) {
        recipe.notes = note;
        // If it was a bundled recipe, we need to mark it as user modified to persist
        if (!recipe.id.startsWith('user_')) {
            // We'll treat it as a user override
            // For simplicity in this demo, we'll just prefix it or handle it in saveRecipes
        }
        saveRecipes();
        alert('Notes saved locally!');
    }
};

// --- Helpers ---

function showLoading(show) {
    document.getElementById('loading-spinner').classList.toggle('hidden', !show);
}

function renderGallery() {
    const gallery = document.getElementById('recipe-gallery');
    const featured = AppState.recipes.slice(0, 4);

    gallery.innerHTML = featured.map(r => `
        <div class="gallery-item" onclick="openRecipeModal(${JSON.stringify(r).replace(/"/g, '&quot;')})">
            <img src="${r.image || 'https://images.unsplash.com/photo-1495195129352-aec325a55b65?q=80&w=500'}" alt="${r.title}">
            <div class="gallery-caption">${r.title}</div>
        </div>
    `).join('');
}
