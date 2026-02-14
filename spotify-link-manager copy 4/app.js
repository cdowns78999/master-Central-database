document.addEventListener('DOMContentLoaded', () => {
    const gridRoot = document.getElementById('grid-root');
    const modeTrigger = document.getElementById('mode-trigger');
    const sortTrigger = document.getElementById('sort-trigger');
    const shareTrigger = document.getElementById('share-trigger');
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
        `;

        // Column 3: Subtle Tag (Editable)
        const currentTag = playlist.tag || 'add tag';
        const tagContainer = document.createElement('div');
        tagContainer.className = 'subtle-tag-container';
        tagContainer.innerHTML = `<span class="subtle-tag" contenteditable="true">${currentTag}</span>`;
        row.appendChild(tagContainer);

        // Drag and Drop Attributes
        row.draggable = true;
        row.addEventListener('dragstart', (e) => {
            if (currentMode !== 'selection') {
                e.preventDefault();
                return;
            }
            row.classList.add('dragging');
            e.dataTransfer.setData('text/plain', JSON.stringify(playlist));
            e.dataTransfer.effectAllowed = 'copy';
        });

        row.addEventListener('dragend', () => {
            row.classList.remove('dragging');
        });

        // Click Logic for Playlist Button
        const btn = row.querySelector('.playlist-btn');
        btn.addEventListener('click', () => {
            if (currentMode === 'normal') {
                window.open(playlist.url, '_blank');
            }
        });

        // Search/Tag Logic (Subtle Ticker Feel)
        const tag = tagContainer.querySelector('.subtle-tag');
        tag.addEventListener('focus', () => {
            if (tag.textContent === 'add tag') tag.textContent = '';
        });

        tag.addEventListener('input', (e) => {
            const query = tag.textContent.trim();
            if (query.length > 0) {
                showTagSuggestions(tag, playlist.name);
            } else {
                hideTagSuggestions();
            }
        });

        tag.addEventListener('blur', (e) => {
            const val = tag.textContent.trim();
            if (val === '') {
                tag.textContent = 'add tag';
                playlist.tag = '';
            } else {
                playlist.tag = val;
            }

            // --- BUG FIX: Check if we are clicking INTO the suggestion menu ---
            const movingToMenu = e.relatedTarget && (
                e.relatedTarget.classList.contains('suggestion-item') ||
                e.relatedTarget.classList.contains('custom-input-field') ||
                e.relatedTarget.closest('.tag-suggestions-menu')
            );

            if (movingToMenu) return;

            // Delay hide to allow click on suggestion
            setTimeout(hideTagSuggestions, 200);
        });

        return row;
    }

    // --- Tag Suggestion Logic (Ported from Proposal Generator inspiration) ---
    const TAG_SUGGESTIONS = ['House', 'Tech House', 'Country', 'Vocal Indie', 'After Hours'];
    let activeSuggestionMenu = null;

    function showTagSuggestions(targetElement, playlistName) {
        hideTagSuggestions(); // Clear existing

        const menu = document.createElement('div');
        menu.className = 'tag-suggestions-menu active';

        // Add suggestions with staggered delay
        TAG_SUGGESTIONS.forEach((sug, i) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.style.animationDelay = `${i * 0.05}s`;
            item.textContent = sug;
            item.tabIndex = -1;
            item.onclick = () => {
                targetElement.textContent = sug;
                const match = playlistData["Top 20 Overall"].find(p => p.name === playlistName);
                if (match) match.tag = sug;
                hideTagSuggestions();
            };
            menu.appendChild(item);
        });

        // Add morphing "Add Custom" option
        const customBtn = document.createElement('div');
        customBtn.className = 'suggestion-item custom-action';
        customBtn.style.animationDelay = `${TAG_SUGGESTIONS.length * 0.05}s`;
        customBtn.textContent = '+ Add Custom...';
        customBtn.tabIndex = -1;

        const customInput = document.createElement('input');
        customInput.className = 'custom-input-field';
        customInput.placeholder = 'TYPE TAG...';

        customBtn.onclick = (e) => {
            e.stopPropagation();
            customBtn.style.display = 'none';
            customInput.classList.add('active');
            customInput.focus();
        };

        let isRefreshing = false;
        customInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                const val = customInput.value.trim();
                if (val) {
                    if (!TAG_SUGGESTIONS.includes(val)) {
                        TAG_SUGGESTIONS.push(val);
                    }
                    isRefreshing = true;
                    showTagSuggestions(targetElement, playlistName);

                    // After refresh, immediately transform the new menu's button to input
                    const newMenu = activeSuggestionMenu;
                    if (newMenu) {
                        const newBtn = newMenu.querySelector('.custom-action');
                        const newInput = newMenu.querySelector('.custom-input-field');
                        if (newBtn && newInput) {
                            newBtn.style.display = 'none';
                            newInput.classList.add('active');
                            newInput.focus();
                        }
                    }
                }
            }
            if (e.key === 'Escape') hideTagSuggestions();
        };

        customInput.onblur = (e) => {
            if (isRefreshing) return;
            setTimeout(hideTagSuggestions, 200);
        };

        menu.appendChild(customBtn);
        menu.appendChild(customInput);

        // Position it relative to the container
        targetElement.parentElement.appendChild(menu);
        activeSuggestionMenu = menu;
    }

    function hideTagSuggestions() {
        if (activeSuggestionMenu) {
            activeSuggestionMenu.remove();
            activeSuggestionMenu = null;
        }
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

    // Selection Overlay Drag & Drop Logic
    const dropZone = document.getElementById('drop-zone');
    const loadTrigger = document.getElementById('load-trigger');
    const jsonInput = document.getElementById('json-input');

    // --- JSON IMPORT LOGIC ---
    if (loadTrigger) {
        loadTrigger.addEventListener('click', () => jsonInput.click());
    }

    if (jsonInput) {
        jsonInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);

                    // Clear current items
                    dropZone.innerHTML = '';

                    // Import and Sync
                    imported.forEach(item => {
                        // Priority 1: UserTag, Priority 2: Tag
                        const finalTag = item.userTag || item.tag || '';

                        // Update master data
                        const masterMatch = playlistData["Top 20 Overall"].find(p => p.name === item.name);
                        if (masterMatch) masterMatch.tag = finalTag;

                        // Add to UI
                        addSelectedPlaylist(item);
                    });

                    renderPlaylists(); // Refresh master grid
                    console.log('JSON State Loaded');
                } catch (err) {
                    console.error('Import error:', err);
                    alert('Error loading JSON file.');
                }
            };
            reader.readAsText(file);
        });
    }

    selectionOverlay.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        selectionOverlay.classList.add('drag-over');
    });

    selectionOverlay.addEventListener('dragleave', () => {
        selectionOverlay.classList.remove('drag-over');
    });

    selectionOverlay.addEventListener('drop', (e) => {
        e.preventDefault();
        selectionOverlay.classList.remove('drag-over');

        try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            addSelectedPlaylist(data);
        } catch (err) {
            console.error('Drop error:', err);
        }
    });

    function addSelectedPlaylist(playlist, shouldSave = true) {
        // Prevent duplicates in selection
        if (dropZone.querySelector(`[data-name="${playlist.name}"]`)) return;

        const brandColor = playlist.color || '#1DB954';
        const unsplashUrl = `https://images.unsplash.com/photo-${playlist.pId}?auto=format&fit=crop&q=80&w=400`;

        const row = document.createElement('div');
        row.className = 'selection-row curated-item';
        row.dataset.name = playlist.name;

        row.innerHTML = `
            <!-- Column 1: Playlist Name Button -->
            <div class="playlist-btn" style="--brand-color: ${brandColor}; --brand-bg-img: url('${unsplashUrl}')">
                <div class="playlist-btn-bg"></div>
                <div class="playlist-btn-overlay"></div>
                <span class="playlist-text">${playlist.name}</span>
                <button class="remove-curated" title="Remove">×</button>
            </div>

            <!-- Column 2: Curator Name -->
            <div class="curator-field curated-revealed">
                <span class="prefix">// curator:</span>
                <span class="curator-value">${playlist.curator}</span>
            </div>
        `;

        // Column 3: Tag (Editable)
        const currentTag = playlist.tag || 'add tag';
        const tagContainer = document.createElement('div');
        tagContainer.className = 'subtle-tag-container';
        tagContainer.innerHTML = `<span class="subtle-tag" contenteditable="true">${currentTag}</span>`;
        row.appendChild(tagContainer);

        // Remove Functionality
        row.querySelector('.remove-curated').addEventListener('click', (e) => {
            e.stopPropagation();
            row.remove();
        });

        // Ticker logic for curated tag
        const tag = tagContainer.querySelector('.subtle-tag');
        tag.addEventListener('focus', () => {
            if (tag.textContent === 'add tag') tag.textContent = '';
        });

        tag.addEventListener('input', () => {
            if (tag.textContent.trim().length > 0) {
                showTagSuggestions(tag, playlist.name);
            } else {
                hideTagSuggestions();
            }
        });

        tag.addEventListener('blur', (e) => {
            const val = tag.textContent.trim();
            if (val === '') {
                tag.textContent = 'add tag';
                playlist.tag = '';
            } else {
                playlist.tag = val;
            }

            // Sync with master data in case it was a selection-only update
            const master = playlistData["Top 20 Overall"].find(p => p.name === playlist.name);
            if (master) master.tag = playlist.tag;

            if (e.relatedTarget && (
                e.relatedTarget.classList.contains('custom-input-field') ||
                e.relatedTarget.closest('.tag-suggestions-menu')
            )) {
                return;
            }

            setTimeout(hideTagSuggestions, 200);
        });

        dropZone.appendChild(row);
    }

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

    // Share JSON Functionality
    shareTrigger.addEventListener('click', () => {
        const names = Array.from(dropZone.querySelectorAll('.selection-tile'))
            .map(tile => tile.dataset.name);

        if (names.length === 0) {
            alert('Selection is empty! Drag some playlists first.');
            return;
        }

        const curatedData = names.map(name => {
            const master = playlistData["Top 20 Overall"].find(p => p.name === name);
            return {
                ...master,
                userTag: master.tag || ''
            };
        });

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curatedData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "curated_playlists.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
});
