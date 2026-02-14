document.addEventListener('DOMContentLoaded', () => {
    const gridRoot = document.getElementById('grid-root');
    const modeTrigger = document.getElementById('mode-trigger');
    const sortTrigger = document.getElementById('sort-trigger');
    const selectionOverlay = document.getElementById('selection-overlay');

    let currentMode = 'normal'; // normal, selection
    let rotationCount = 0;

    // Initial Render
    renderPlaylists();

    function renderPlaylists(data = playlistData["Top 20 Overall"]) {
        if (!gridRoot) return;
        gridRoot.innerHTML = '';

        data.forEach((playlist, index) => {
            const row = createPlaylistRow(playlist, index);
            gridRoot.appendChild(row);
        });
    }

    function createPlaylistRow(playlist, index) {
        const row = document.createElement('div');
        row.className = 'selection-row';
        row.style.animationDelay = `${index * 0.05}s`;

        const brandColor = playlist.color || '#1DB954';
        const unsplashUrl = `https://images.unsplash.com/photo-${playlist.pId}?auto=format&fit=crop&q=80&w=400`;

        row.innerHTML = `
            <!-- Column 1: Playlist Name Button -->
            <div class="playlist-btn" style="--brand-color: ${brandColor}; --brand-bg-img: url('${unsplashUrl}')">
                <div class="playlist-btn-bg"></div>
                <div class="playlist-btn-overlay"></div>
                <span class="playlist-text">${playlist.name}</span>
            </div>

            <!-- Column 2: Curator Name (Hover to reveal) -->
            <div class="curator-field">
                <span class="prefix">// curator:</span>
                <span class="curator-value">${playlist.curator}</span>
            </div>

            <!-- Column 3: Subtle Tag (Editable) -->
            <div class="subtle-tag-container">
                <span class="subtle-tag" contenteditable="true">add tag</span>
            </div>
        `;

        // Click Logic for Playlist Button
        const btn = row.querySelector('.playlist-btn');
        btn.addEventListener('click', () => {
            if (currentMode === 'normal') {
                window.open(playlist.url, '_blank');
            }
        });

        // Search/Tag Logic (Subtle Ticker Feel)
        const tag = row.querySelector('.subtle-tag');
        tag.addEventListener('focus', () => {
            if (tag.textContent === 'add tag') tag.textContent = '';
        });
        tag.addEventListener('blur', () => {
            if (tag.textContent === '') tag.textContent = 'add tag';
        });

        return row;
    }

    // mode-trigger (Circle Button) logic
    modeTrigger.addEventListener('click', (e) => {
        // Left Click: Toggle Selection Mode
        if (currentMode === 'selection') {
            currentMode = 'normal';
            selectionOverlay.classList.add('hidden');
            modeTrigger.style.borderColor = 'var(--accent-blue)';
            modeTrigger.querySelector('.circle-inner').style.background = 'var(--accent-blue)';
        } else {
            currentMode = 'selection';
            selectionOverlay.classList.remove('hidden');
            modeTrigger.style.borderColor = 'var(--spotify-green)';
            modeTrigger.querySelector('.circle-inner').style.background = 'var(--spotify-green)';
        }
    });

    modeTrigger.addEventListener('contextmenu', (e) => {
        // Right Click: Toggle Sorting Menu Colors
        e.preventDefault();
        rotationCount++;
        if (rotationCount % 2 === 1) {
            modeTrigger.style.borderColor = '#fbbf24'; // Yellow
            modeTrigger.querySelector('.circle-inner').style.background = '#fbbf24';
            console.log('Sorting options visible (Simulation)');
        } else {
            modeTrigger.style.borderColor = 'var(--accent-blue)';
            modeTrigger.querySelector('.circle-inner').style.background = 'var(--accent-blue)';
        }
    });

    // Sorting Button Click (A-Z Toggle)
    let azOrder = true;
    sortTrigger.addEventListener('click', () => {
        const sortedData = [...playlistData["Top 20 Overall"]].sort((a, b) => {
            return azOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });

        // Visual transformation
        gridRoot.style.opacity = '0';
        setTimeout(() => {
            renderPlaylists(sortedData);
            gridRoot.style.opacity = '1';
            azOrder = !azOrder;
            sortTrigger.querySelector('.pill-text').textContent = azOrder ? 'A-Z' : 'Z-A';
        }, 300);
    });
});
