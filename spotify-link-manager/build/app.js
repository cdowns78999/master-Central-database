document.addEventListener('DOMContentLoaded', () => {
    const gridRoot = document.getElementById('grid-root');
    const viewTitle = document.getElementById('current-view-title');
    const logoCircle = document.getElementById('logoCircle');
    const sortMenu = document.getElementById('sortMenu');
    const selectionOverlay = document.getElementById('selectionOverlay');
    const selectionDropZone = document.getElementById('selectionDropZone');
    const selectionItems = document.getElementById('selectionItems');
    const selectionBadge = document.getElementById('selectionBadge');
    const dropPlaceholder = document.getElementById('dropPlaceholder');
    const mdButton = document.getElementById('mdButton');
    const mdPanel = document.getElementById('mdPanel');
    const mdEntries = document.getElementById('mdEntries');

    // ========================================
    // STATE
    // ========================================
    let currentSort = { key: null, direction: 'asc' };
    let selectionMode = false;
    let sortMode = false;
    let selectedPlaylists = [];
    let tagSuggestions = []; // grows as user creates tags
    let activeTagInput = null; // tracks open tag input

    // ========================================
    // CHANGELOG DATA
    // ========================================
    const changelog = [
        { filename: 'v1.0-initial-build.md', desc: 'Initial shell: 20 playlists, green pills, curator reveal, 5-col grid' },
        { filename: 'v1.1-tag-system.md', desc: 'Editable tag column with auto-suggest dropdown' },
        { filename: 'v1.2-sorting.md', desc: 'Circle button sort menu: playlist, curator, tag A-Z/Z-A' },
        { filename: 'v1.3-selection-mode.md', desc: 'Drag-and-drop selection mode with compact grid' },
        { filename: 'v1.4-changelog.md', desc: 'MD changelog system with download' }
    ];

    // ========================================
    // RENDER VIEW
    // ========================================
    function renderView() {
        if (typeof playlistData === 'undefined' || !gridRoot) return;

        gridRoot.style.opacity = '0';

        setTimeout(() => {
            gridRoot.innerHTML = '';

            let data = [...playlistData];

            // Apply sorting
            if (currentSort.key) {
                data.sort((a, b) => {
                    const valA = (a[currentSort.key] || '').toLowerCase();
                    const valB = (b[currentSort.key] || '').toLowerCase();
                    const cmp = valA.localeCompare(valB);
                    return currentSort.direction === 'asc' ? cmp : -cmp;
                });
            }

            const grid = document.createElement('div');
            grid.className = 'outlet-grid';

            const wrapChars = (text) => {
                return text.split('').map((char, i) =>
                    `<span class="reveal-char" style="--char-index: ${i}">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
            };

            data.forEach((playlist, index) => {
                const curatorContent = wrapChars(playlist.curator);
                const row = createPlaylistRow(playlist, index, `<span class="stardust-wrapper">${curatorContent}</span>`);
                grid.appendChild(row);
            });

            gridRoot.appendChild(grid);
            gridRoot.style.opacity = '1';
        }, 200);
    }

    // ========================================
    // CREATE PLAYLIST ROW
    // ========================================
    function createPlaylistRow(playlist, index, curatorContent) {
        const row = document.createElement('div');
        row.className = 'selection-row';
        row.setAttribute('data-index', index);
        row.setAttribute('data-name', playlist.name);

        // Make draggable in selection mode
        if (selectionMode) {
            row.setAttribute('draggable', 'true');
            row.addEventListener('dragstart', handleDragStart);
            row.addEventListener('dragend', handleDragEnd);
        }

        // Column 1: Spotify green pill button
        const pillLink = document.createElement('a');
        pillLink.className = 'selection-box';
        pillLink.href = playlist.link;
        pillLink.target = '_blank';
        pillLink.rel = 'noopener noreferrer';
        pillLink.innerHTML = `<span class="selection-box-text">${playlist.name}</span>`;

        // Column 2: Divider
        const divider1 = document.createElement('div');
        divider1.className = 'divider-pipe';

        // Column 3: Curator with stardust reveal
        const curatorField = document.createElement('div');
        curatorField.className = 'selection-data';
        curatorField.innerHTML = curatorContent;

        // Column 4: Divider
        const divider2 = document.createElement('div');
        divider2.className = 'divider-pipe';

        // Column 5: Editable tag
        const tagField = document.createElement('div');
        tagField.className = 'selection-tag';

        const tagDisplay = document.createElement('span');
        tagDisplay.className = 'tag-display' + (playlist.tag ? '' : ' empty');
        tagDisplay.textContent = playlist.tag || '+ tag';
        tagField.appendChild(tagDisplay);

        tagDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            openTagInput(tagField, tagDisplay, playlist);
        });

        row.appendChild(pillLink);
        row.appendChild(divider1);
        row.appendChild(curatorField);
        row.appendChild(divider2);
        row.appendChild(tagField);

        return row;
    }

    // ========================================
    // TAG SYSTEM (Phase 2)
    // ========================================
    function openTagInput(tagField, tagDisplay, playlist) {
        // Close any other open tag input
        closeActiveTagInput();

        tagDisplay.style.display = 'none';

        const wrapper = document.createElement('div');
        wrapper.className = 'tag-input-wrapper';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'tag-inline-input';
        input.value = playlist.tag || '';
        input.placeholder = 'type a tag...';

        const dropdown = document.createElement('div');
        dropdown.className = 'tag-suggestions';

        wrapper.appendChild(input);
        wrapper.appendChild(dropdown);
        tagField.appendChild(wrapper);

        activeTagInput = { wrapper, input, dropdown, tagDisplay, tagField, playlist };

        input.focus();

        // Events
        input.addEventListener('input', () => {
            updateTagSuggestions(input.value, dropdown, input, tagDisplay, playlist);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                commitTag(input.value, tagDisplay, playlist);
                closeActiveTagInput();
            }
            if (e.key === 'Escape') {
                closeActiveTagInput();
            }
        });

        input.addEventListener('blur', (e) => {
            // Delay to allow dropdown click
            setTimeout(() => {
                if (activeTagInput && activeTagInput.input === input) {
                    commitTag(input.value, tagDisplay, playlist);
                    closeActiveTagInput();
                }
            }, 150);
        });

        // Show suggestions immediately
        updateTagSuggestions(input.value, dropdown, input, tagDisplay, playlist);
    }

    function updateTagSuggestions(query, dropdown, input, tagDisplay, playlist) {
        dropdown.innerHTML = '';
        const q = query.toLowerCase().trim();

        const matches = tagSuggestions.filter(t => t.toLowerCase().includes(q));
        const exactMatch = tagSuggestions.some(t => t.toLowerCase() === q);

        // "+ Add new tag" option
        if (q.length > 0 && !exactMatch) {
            const addNew = document.createElement('div');
            addNew.className = 'tag-suggestion-item add-new';
            addNew.textContent = `+ Add "${query.trim()}"`;
            addNew.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const val = query.trim();
                if (val && !tagSuggestions.includes(val)) {
                    tagSuggestions.push(val);
                }
                commitTag(val, tagDisplay, playlist);
                closeActiveTagInput();
            });
            dropdown.appendChild(addNew);
        }

        // Matching suggestions
        const shown = q.length > 0 ? matches : tagSuggestions;
        shown.forEach(tag => {
            const item = document.createElement('div');
            item.className = 'tag-suggestion-item';
            item.textContent = tag;
            item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                commitTag(tag, tagDisplay, playlist);
                closeActiveTagInput();
            });
            dropdown.appendChild(item);
        });

        if (dropdown.children.length > 0) {
            dropdown.classList.add('active');
        } else {
            dropdown.classList.remove('active');
        }
    }

    function commitTag(value, tagDisplay, playlist) {
        const val = (value || '').trim();
        playlist.tag = val;

        // Add to suggestions pool if new
        if (val && !tagSuggestions.includes(val)) {
            tagSuggestions.push(val);
        }

        tagDisplay.textContent = val || '+ tag';
        tagDisplay.className = 'tag-display' + (val ? '' : ' empty');
    }

    function closeActiveTagInput() {
        if (!activeTagInput) return;
        const { wrapper, tagDisplay } = activeTagInput;
        tagDisplay.style.display = '';
        if (wrapper.parentNode) {
            wrapper.parentNode.removeChild(wrapper);
        }
        activeTagInput = null;
    }

    // ========================================
    // SORT MENU (Phase 3) — right-click circle
    // ========================================
    logoCircle.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        if (selectionMode) return; // don't open sort while in selection mode

        sortMode = !sortMode;

        if (sortMode) {
            logoCircle.classList.add('sort-mode');
            sortMenu.classList.add('active');
        } else {
            logoCircle.classList.remove('sort-mode');
            sortMenu.classList.remove('active');
        }
    });

    // Sort option clicks
    sortMenu.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', () => {
            const key = option.getAttribute('data-sort');

            // Toggle direction if same key
            if (currentSort.key === key) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.key = key;
                currentSort.direction = 'asc';
            }

            // Update label
            const labels = { name: 'Playlist', curator: 'Curator', tag: 'Tag' };
            const arrow = currentSort.direction === 'asc' ? 'A–Z' : 'Z–A';
            option.textContent = `${labels[key]} ${arrow}`;

            // Highlight active
            sortMenu.querySelectorAll('.sort-option').forEach(o => o.classList.remove('active-sort'));
            option.classList.add('active-sort');

            renderView();
        });
    });

    // ========================================
    // SELECTION MODE (Phase 4) — left-click circle
    // ========================================
    logoCircle.addEventListener('click', (e) => {
        if (sortMode) return; // don't toggle selection while sort is open

        selectionMode = !selectionMode;

        if (selectionMode) {
            logoCircle.classList.add('selection-mode');
            selectionOverlay.classList.add('active');
        } else {
            logoCircle.classList.remove('selection-mode');
            selectionOverlay.classList.remove('active');
        }

        renderView();
    });

    // Drag & drop handlers
    let draggedPlaylistName = null;

    function handleDragStart(e) {
        draggedPlaylistName = e.currentTarget.getAttribute('data-name');
        e.currentTarget.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', draggedPlaylistName);
    }

    function handleDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        draggedPlaylistName = null;
    }

    selectionDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        selectionDropZone.classList.add('drag-over');
    });

    selectionDropZone.addEventListener('dragleave', () => {
        selectionDropZone.classList.remove('drag-over');
    });

    selectionDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        selectionDropZone.classList.remove('drag-over');

        const name = e.dataTransfer.getData('text/plain');
        if (!name) return;

        // Check if already selected
        if (selectedPlaylists.find(p => p.name === name)) return;

        const playlist = playlistData.find(p => p.name === name);
        if (!playlist) return;

        selectedPlaylists.push(playlist);
        renderSelectionItems();
    });

    function renderSelectionItems() {
        selectionItems.innerHTML = '';
        selectionBadge.textContent = `${selectedPlaylists.length} selected`;

        if (selectedPlaylists.length > 0) {
            dropPlaceholder.classList.add('hidden');
        } else {
            dropPlaceholder.classList.remove('hidden');
        }

        selectedPlaylists.forEach((p, i) => {
            const item = document.createElement('div');
            item.className = 'selected-item';
            item.innerHTML = `
                <span class="sel-name">${p.name}</span>
                <span>${p.curator}</span>
                <span>${p.tag || '—'}</span>
                <span class="sel-remove" data-idx="${i}">✕</span>
            `;
            selectionItems.appendChild(item);
        });

        // Remove handlers
        selectionItems.querySelectorAll('.sel-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                const item = e.currentTarget.closest('.selected-item');
                item.style.animation = 'fadeOutItem 0.2s ease forwards';
                setTimeout(() => {
                    selectedPlaylists.splice(idx, 1);
                    renderSelectionItems();
                }, 200);
            });
        });
    }

    // ========================================
    // MD CHANGELOG (Phase 5)
    // ========================================
    mdButton.addEventListener('click', () => {
        mdPanel.classList.toggle('active');
        if (mdPanel.classList.contains('active')) {
            renderChangelog();
        }
    });

    function renderChangelog() {
        mdEntries.innerHTML = '';
        changelog.forEach(entry => {
            const div = document.createElement('div');
            div.className = 'md-entry';
            div.innerHTML = `
                <span class="md-filename">${entry.filename}</span>
                <span class="md-desc">${entry.desc}</span>
            `;
            div.addEventListener('click', () => downloadMD(entry));
            mdEntries.appendChild(div);
        });
    }

    function downloadMD(entry) {
        const content = `# ${entry.filename}\n\n${entry.desc}\n\n---\n*Generated by Spotify Link Manager*\n*${new Date().toLocaleDateString()}*\n`;
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = entry.filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // ========================================
    // CLOSE MENUS ON OUTSIDE CLICK
    // ========================================
    document.addEventListener('click', (e) => {
        // Close sort menu if clicking outside
        if (sortMode && !sortMenu.contains(e.target) && !logoCircle.contains(e.target)) {
            sortMode = false;
            logoCircle.classList.remove('sort-mode');
            sortMenu.classList.remove('active');
        }

        // Close MD panel if clicking outside
        if (mdPanel.classList.contains('active') && !mdPanel.contains(e.target) && !mdButton.contains(e.target)) {
            mdPanel.classList.remove('active');
        }
    });

    // ========================================
    // INITIAL RENDER
    // ========================================
    renderView();
});
