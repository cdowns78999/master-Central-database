document.addEventListener('DOMContentLoaded', () => {
    const gridRoot = document.getElementById('grid-root');
    const modeTrigger = document.getElementById('mode-trigger');
    const sortTrigger = document.getElementById('sort-trigger');
    const shareTrigger = document.getElementById('share-trigger');
    const selectionOverlay = document.getElementById('selection-overlay');

    let currentMode = 'normal';
    let rotationCount = 0;

    // =====================================================
    //  PLAYLIST IMPORT BOX
    // =====================================================
    const importInput = document.getElementById('import-input');

    // Fetch playlist title + owner profile name from Spotify via CORS proxy
    async function fetchSpotifyMeta(url) {
        try {
            const id = extractImportId(url);
            if (!id) return null;
            const embedUrl = `https://open.spotify.com/embed/playlist/${id}`;
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(embedUrl)}`;
            const res = await fetch(proxyUrl);
            if (!res.ok) return null;
            const html = await res.text();

            // Extract title and subtitle (owner profile name) from embed page JSON
            const titleMatch = html.match(/"title"\s*:\s*"([^"]+)"/);
            const subtitleMatch = html.match(/"subtitle"\s*:\s*"([^"]+)"/);

            const title = titleMatch ? titleMatch[1] : null;
            const owner = subtitleMatch ? subtitleMatch[1] : null;

            console.log(`[Import] Fetched: "${owner} - ${title}"`);
            return { title, owner };
        } catch (e) {
            console.log('[Import] Embed fetch failed:', e.message);
            return null;
        }
    }

    async function processImport() {
        const raw = importInput.value.trim();
        if (!raw) return;

        const lines = raw.split('\n').filter(l => l.trim());
        let added = 0;

        for (const line of lines) {
            const trimmed = line.trim();

            // Detect tab-separated (spreadsheet paste) or comma-separated
            const sep = trimmed.includes('\t') ? '\t' : (trimmed.match(/,(?=\s*http)/) || trimmed.match(/https?:.*?,/)) ? ',' : null;

            if (sep) {
                const parts = trimmed.split(sep).map(s => s.trim());
                const url = parts.find(p => p.includes('spotify.com'));
                if (!url) continue;
                const remaining = parts.filter(p => p !== url);
                const curator = remaining[0] || '{curator name}';
                const tag = remaining[1] || '';
                const id = extractImportId(url);
                if (!id) continue;

                // Fetch real name + owner from Spotify
                const meta = await fetchSpotifyMeta(url);
                const displayName = meta?.title
                    ? `${meta.title} // ${meta.owner || 'Spotify'}`
                    : id;

                const playlist = {
                    name: displayName,
                    curator: curator,
                    color: randomColor(),
                    url: url,
                    tag: tag
                };
                playlistData["Top 20 Overall"].unshift(playlist);
                added++;
            } else if (trimmed.includes('spotify.com')) {
                const id = extractImportId(trimmed);
                if (!id) continue;

                // Fetch real name + owner from Spotify
                const meta = await fetchSpotifyMeta(trimmed);
                const displayName = meta?.title
                    ? `${meta.title} // ${meta.owner || 'Spotify'}`
                    : id;

                const playlist = {
                    name: displayName,
                    curator: '{curator name}',
                    color: randomColor(),
                    url: trimmed,
                    tag: ''
                };
                playlistData["Top 20 Overall"].unshift(playlist);
                added++;
            }
        }

        if (added > 0) {
            renderPlaylists();
            importInput.value = '';
        }
    }

    if (importInput) {
        importInput.addEventListener('paste', () => setTimeout(processImport, 100));
        importInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); processImport(); } });
    }

    function extractImportId(url) {
        if (!url) return null;
        const match = url.match(/playlist\/([a-zA-Z0-9_]+)/);
        return match ? match[1] : null;
    }

    function randomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 55%)`;
    }

    // =====================================================
    //  RAINBOW SEQUENCE — each box gets a hue from the spectrum
    // =====================================================
    function rainbowColor(index, total) {
        const hue = Math.round((index / total) * 340);
        return `hsl(${hue}, 78%, 55%)`;
    }

    // =====================================================
    //  SPOTIFY LOGO ART BOX — rainbow-sequenced icon
    // =====================================================
    function wrapArtwork(box, color) {
        const c = color;
        // Unique gradient ID per box to avoid SVG conflicts
        const gid = 'g' + Math.random().toString(36).slice(2, 8);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <defs>
                <linearGradient id="${gid}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${c};stop-opacity:0.6"/>
                    <stop offset="100%" style="stop-color:${c};stop-opacity:0.15"/>
                </linearGradient>
            </defs>
            <rect width="40" height="40" rx="8" fill="url(#${gid})"/>
            <path d="M27.3 18.2c-4.1-2.4-10.8-2.7-14.7-1.5-.6.2-1.3-.1-1.5-.8-.2-.6.1-1.3.8-1.5 4.5-1.4 11.9-1.1 16.6 1.7.6.3.8 1.1.4 1.7-.3.5-1 .7-1.6.4z" fill="rgba(255,255,255,0.7)"/>
            <path d="M25.7 22c-3.4-2-8.5-2.6-12.5-1.4-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 4.6-1.4 10.2-.7 14.1 1.6.5.3.6.9.4 1.4-.3.4-.9.5-1.4.2z" fill="rgba(255,255,255,0.55)"/>
            <path d="M24 25.5c-2.7-1.6-6.2-2-9.4-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.6-1 7.6-.5 10.7 1.4.4.2.5.8.3 1.2-.3.3-.8.4-1.1.1z" fill="rgba(255,255,255,0.4)"/>
        </svg>`;
        box.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    }

    // =====================================================
    //  RENDER
    // =====================================================
    renderPlaylists();

    function renderPlaylists(data = playlistData["Top 20 Overall"]) {
        if (!gridRoot) return;
        gridRoot.innerHTML = '';

        data.forEach((playlist, index) => {
            const row = createPlaylistRow(playlist, index, data.length);
            gridRoot.appendChild(row);
        });
    }

    function createPlaylistRow(playlist, index, total) {
        const row = document.createElement('div');
        row.className = 'selection-row';
        row.style.animationDelay = `${index * 0.05}s`;

        const brandColor = playlist.color || '#1DB954';

        row.innerHTML = `
            <div class="cover-art-box"></div>

            <div class="playlist-btn" style="--brand-color: ${brandColor}">
                <div class="playlist-btn-bg"></div>
                <div class="playlist-btn-overlay"></div>
                <span class="playlist-text">${playlist.name.includes(' // ')
                    ? playlist.name.split(' // ')[0] + ' <span class="playlist-owner">// ' + playlist.name.split(' // ')[1] + '</span>'
                    : playlist.name}</span>
            </div>

            <div class="curator-field">
                <span class="prefix">// curator:</span>
                <span>{<span class="curator-value" contenteditable="true">${playlist.curator || 'curator name'}</span>}</span>
            </div>
        `;

        // Column 3: Tag
        const currentTag = playlist.tag || 'add tag';
        const tagContainer = document.createElement('div');
        tagContainer.className = 'subtle-tag-container';
        tagContainer.innerHTML = `<span class="subtle-tag" contenteditable="true">${currentTag}</span>`;
        row.appendChild(tagContainer);

        // Artwork — Spotify logo with rainbow-sequenced color
        const artBox = row.querySelector('.cover-art-box');
        wrapArtwork(artBox, rainbowColor(index, total || 20));

        // Drag and Drop
        row.draggable = true;
        row.addEventListener('dragstart', (e) => {
            if (currentMode !== 'selection') { e.preventDefault(); return; }
            row.classList.add('dragging');
            e.dataTransfer.setData('text/plain', JSON.stringify(playlist));
            e.dataTransfer.effectAllowed = 'copy';
        });
        row.addEventListener('dragend', () => row.classList.remove('dragging'));

        // Playlist Button Click
        const btn = row.querySelector('.playlist-btn');
        btn.addEventListener('click', () => {
            if (currentMode === 'normal') window.open(playlist.url, '_blank');
        });

        // Tag Logic
        const tag = tagContainer.querySelector('.subtle-tag');
        tag.addEventListener('focus', () => { if (tag.textContent === 'add tag') tag.textContent = ''; });
        tag.addEventListener('input', () => {
            if (tag.textContent.trim().length > 0) showTagSuggestions(tag, playlist.name);
            else hideTagSuggestions();
        });
        tag.addEventListener('blur', (e) => {
            const val = tag.textContent.trim();
            if (val === '') { tag.textContent = 'add tag'; playlist.tag = ''; }
            else playlist.tag = val;
            const movingToMenu = e.relatedTarget && (
                e.relatedTarget.classList.contains('suggestion-item') ||
                e.relatedTarget.classList.contains('custom-input-field') ||
                e.relatedTarget.closest('.tag-suggestions-menu')
            );
            if (movingToMenu) return;
            setTimeout(hideTagSuggestions, 200);
        });

        // Curator Logic
        const curatorVal = row.querySelector('.curator-value');
        curatorVal.addEventListener('focus', () => { if (curatorVal.textContent === 'curator name') curatorVal.textContent = ''; });
        curatorVal.addEventListener('blur', () => {
            const val = curatorVal.textContent.trim();
            if (val === '') { curatorVal.textContent = 'curator name'; playlist.curator = ''; }
            else playlist.curator = val;
            const match = dropZone.querySelector(`[data-name="${playlist.name}"] .curator-value`);
            if (match) match.textContent = playlist.curator || 'curator name';
        });

        return row;
    }

    // =====================================================
    //  TAG SUGGESTIONS
    // =====================================================
    const TAG_SUGGESTIONS = ['House', 'Tech House', 'Country', 'Vocal Indie', 'After Hours'];
    let activeSuggestionMenu = null;

    function showTagSuggestions(targetElement, playlistName) {
        hideTagSuggestions();
        const menu = document.createElement('div');
        menu.className = 'tag-suggestions-menu active';

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
                    if (!TAG_SUGGESTIONS.includes(val)) TAG_SUGGESTIONS.push(val);
                    isRefreshing = true;
                    showTagSuggestions(targetElement, playlistName);
                    const newMenu = activeSuggestionMenu;
                    if (newMenu) {
                        const newBtn = newMenu.querySelector('.custom-action');
                        const newInput = newMenu.querySelector('.custom-input-field');
                        if (newBtn && newInput) { newBtn.style.display = 'none'; newInput.classList.add('active'); newInput.focus(); }
                    }
                }
            }
            if (e.key === 'Escape') hideTagSuggestions();
        };

        customInput.onblur = () => { if (!isRefreshing) setTimeout(hideTagSuggestions, 200); };

        menu.appendChild(customBtn);
        menu.appendChild(customInput);
        targetElement.parentElement.appendChild(menu);
        activeSuggestionMenu = menu;
    }

    function hideTagSuggestions() {
        if (activeSuggestionMenu) { activeSuggestionMenu.remove(); activeSuggestionMenu = null; }
    }

    // =====================================================
    //  MODE TOGGLE
    // =====================================================
    modeTrigger.addEventListener('click', () => {
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
        e.preventDefault();
        rotationCount++;
        if (rotationCount % 2 === 1) {
            modeTrigger.style.borderColor = '#fbbf24';
            modeTrigger.querySelector('.circle-inner').style.background = '#fbbf24';
        } else {
            modeTrigger.style.borderColor = 'var(--accent-blue)';
            modeTrigger.querySelector('.circle-inner').style.background = 'var(--accent-blue)';
        }
    });

    // =====================================================
    //  SELECTION / DRAG-DROP / CURATED ZONE
    // =====================================================
    const dropZone = document.getElementById('drop-zone');
    const loadTrigger = document.getElementById('load-trigger');
    const jsonInput = document.getElementById('json-input');

    if (loadTrigger) loadTrigger.addEventListener('click', () => jsonInput.click());

    if (jsonInput) {
        jsonInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    dropZone.innerHTML = '';
                    imported.forEach(item => {
                        const finalTag = item.userTag || item.tag || '';
                        const masterMatch = playlistData["Top 20 Overall"].find(p => p.name === item.name);
                        if (masterMatch) masterMatch.tag = finalTag;
                        addSelectedPlaylist(item);
                    });
                    renderPlaylists();
                } catch (err) { console.error('Import error:', err); alert('Error loading JSON file.'); }
            };
            reader.readAsText(file);
        });
    }

    // =====================================================
    //  SELECTION ACTION DOTS
    // =====================================================
    const actionClear = document.getElementById('action-clear');
    const actionSortCurator = document.getElementById('action-sort-curator');
    const actionSortTag = document.getElementById('action-sort-tag');
    const actionSortName = document.getElementById('action-sort-name');
    const actionCount = document.getElementById('action-count');
    const actionCollapse = document.getElementById('action-collapse');

    if (actionClear) actionClear.addEventListener('click', () => {
        dropZone.innerHTML = '';
    });

    // Sort curated items by Curator A-Z
    if (actionSortCurator) actionSortCurator.addEventListener('click', () => {
        const items = Array.from(dropZone.querySelectorAll('.curated-item'));
        if (items.length === 0) return;
        items.sort((a, b) => {
            const ca = (a.querySelector('.curator-value')?.textContent || '').toLowerCase();
            const cb = (b.querySelector('.curator-value')?.textContent || '').toLowerCase();
            return ca.localeCompare(cb);
        });
        items.forEach(item => dropZone.appendChild(item));
    });

    // Sort curated items by Tag A-Z
    if (actionSortTag) actionSortTag.addEventListener('click', () => {
        const items = Array.from(dropZone.querySelectorAll('.curated-item'));
        if (items.length === 0) return;
        items.sort((a, b) => {
            const ta = (a.querySelector('.subtle-tag')?.textContent || '').toLowerCase();
            const tb = (b.querySelector('.subtle-tag')?.textContent || '').toLowerCase();
            return ta.localeCompare(tb);
        });
        items.forEach(item => dropZone.appendChild(item));
    });

    // Sort curated items by Name A-Z
    if (actionSortName) actionSortName.addEventListener('click', () => {
        const items = Array.from(dropZone.querySelectorAll('.curated-item'));
        if (items.length === 0) return;
        items.sort((a, b) => {
            const na = (a.dataset.name || '').toLowerCase();
            const nb = (b.dataset.name || '').toLowerCase();
            return na.localeCompare(nb);
        });
        items.forEach(item => dropZone.appendChild(item));
    });

    if (actionCount) actionCount.addEventListener('click', () => {
        const count = dropZone.querySelectorAll('.curated-item').length;
        actionCount.querySelector('.dot-icon').textContent = count;
        setTimeout(() => { actionCount.querySelector('.dot-icon').textContent = '#'; }, 2000);
    });

    let dropCollapsed = false;
    if (actionCollapse) actionCollapse.addEventListener('click', () => {
        dropCollapsed = !dropCollapsed;
        dropZone.style.display = dropCollapsed ? 'none' : 'flex';
        actionCollapse.querySelector('.dot-icon').textContent = dropCollapsed ? '+' : '\u2014';
    });

    // =====================================================
    //  PRESET SETS — ghost dots 1-5 load curated subsets
    // =====================================================
    const presetSets = {
        1: { label: 'By Name (D-I)', filter: p => /^[d-i]/i.test(p.name), sort: 'name' },
        2: { label: 'House + Tech House', filter: p => p.tag === 'House' || p.tag === 'Tech House', sort: 'tag' },
        3: { label: 'Curator + Tag Mix', filter: p => (p.curator === 'brandon' || p.curator === 'peter') || p.tag === 'House' || p.tag === 'Tech House', sort: 'curator' },
        4: { label: 'All Tagged', filter: p => p.tag && p.tag !== '' && p.tag !== 'add tag', sort: 'tag' },
        5: { label: 'All Curated', filter: p => p.curator && p.curator !== '{curator name}' && p.curator !== '', sort: 'curator' }
    };

    // =====================================================
    //  GHOST DOT PRESETS + IMPORT TESTS
    // =====================================================
    document.querySelectorAll('.ghost-dot').forEach(dot => {
        const num = parseInt(dot.textContent);
        if (!num) return;
        dot.style.cursor = 'pointer';
        dot.addEventListener('click', async () => {
            // Dots 1-5: Preset filters — load matching playlists into drop zone
            if (num >= 1 && num <= 5 && presetSets[num]) {
                // Auto-enter selection mode if not already active
                if (currentMode !== 'selection') {
                    currentMode = 'selection';
                    selectionOverlay.classList.remove('hidden');
                    modeTrigger.style.borderColor = 'var(--spotify-green)';
                    modeTrigger.querySelector('.circle-inner').style.background = 'var(--spotify-green)';
                }

                const preset = presetSets[num];
                const allPlaylists = playlistData["Top 20 Overall"];
                let matches = allPlaylists.filter(preset.filter);

                // Sort the matches
                if (preset.sort === 'name') {
                    matches.sort((a, b) => a.name.localeCompare(b.name));
                } else if (preset.sort === 'tag') {
                    matches.sort((a, b) => (a.tag || '').localeCompare(b.tag || ''));
                } else if (preset.sort === 'curator') {
                    matches.sort((a, b) => (a.curator || '').localeCompare(b.curator || ''));
                }

                // Clear drop zone and add matches
                dropZone.innerHTML = '';
                matches.forEach(p => addSelectedPlaylist(p));
                return;
            }

            // Dot 6: Test — URLs only (fetches name + owner from Spotify)
            if (num === 6) {
                importInput.value = [
                    'https://open.spotify.com/playlist/37i9dQZF1DX4SrOBCjlfVi',
                    'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
                    'https://open.spotify.com/playlist/37i9dQZF1DX0h0QnLkMBl4'
                ].join('\n');
                await processImport();
                return;
            }

            // Dot 7: Test — full spreadsheet flow (URL + curator + tag, still fetches name + owner)
            if (num === 7) {
                importInput.value = [
                    'https://open.spotify.com/playlist/37i9dQZF1DX7ZUug1ANKRP\tBrandon\tChill',
                    'https://open.spotify.com/playlist/37i9dQZF1DX5Ejj0EkURtP\tPeter\tWorkout',
                    'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ\tMaria\tIndie'
                ].join('\n');
                await processImport();
                return;
            }
        });
    });

    selectionOverlay.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; selectionOverlay.classList.add('drag-over'); });
    selectionOverlay.addEventListener('dragleave', () => selectionOverlay.classList.remove('drag-over'));
    selectionOverlay.addEventListener('drop', (e) => {
        e.preventDefault();
        selectionOverlay.classList.remove('drag-over');
        try { addSelectedPlaylist(JSON.parse(e.dataTransfer.getData('text/plain'))); }
        catch (err) { console.error('Drop error:', err); }
    });

    function addSelectedPlaylist(playlist) {
        if (dropZone.querySelector(`[data-name="${playlist.name}"]`)) return;

        const brandColor = playlist.color || '#1DB954';
        const row = document.createElement('div');
        row.className = 'selection-row curated-item';
        row.dataset.name = playlist.name;

        row.innerHTML = `
            <div class="cover-art-box"></div>
            <div class="playlist-btn" style="--brand-color: ${brandColor}">
                <div class="playlist-btn-bg"></div>
                <div class="playlist-btn-overlay"></div>
                <span class="playlist-text">${playlist.name}</span>
                <button class="remove-curated" title="Remove">&times;</button>
            </div>
            <div class="curator-field curated-revealed">
                <span class="prefix">// curator:</span>
                <span>{<span class="curator-value" contenteditable="true">${playlist.curator || 'curator name'}</span>}</span>
            </div>
        `;

        const currentTag = playlist.tag || 'add tag';
        const tagContainer = document.createElement('div');
        tagContainer.className = 'subtle-tag-container';
        tagContainer.innerHTML = `<span class="subtle-tag" contenteditable="true">${currentTag}</span>`;
        row.appendChild(tagContainer);

        // Artwork — Spotify logo with rainbow color based on drop position
        const artBox = row.querySelector('.cover-art-box');
        const dropIndex = dropZone.querySelectorAll('.curated-item').length;
        wrapArtwork(artBox, rainbowColor(dropIndex, 20));

        row.querySelector('.remove-curated').addEventListener('click', (e) => { e.stopPropagation(); row.remove(); });

        // Tag logic (curated)
        const curatedTag = tagContainer.querySelector('.subtle-tag');
        curatedTag.addEventListener('focus', () => { if (curatedTag.textContent === 'add tag') curatedTag.textContent = ''; });
        curatedTag.addEventListener('input', () => {
            if (curatedTag.textContent.trim().length > 0) showTagSuggestions(curatedTag, playlist.name);
            else hideTagSuggestions();
        });
        curatedTag.addEventListener('blur', (e) => {
            const val = curatedTag.textContent.trim();
            if (val === '') { curatedTag.textContent = 'add tag'; playlist.tag = ''; }
            else playlist.tag = val;
            const master = playlistData["Top 20 Overall"].find(p => p.name === playlist.name);
            if (master) master.tag = playlist.tag;
            if (e.relatedTarget && (e.relatedTarget.classList.contains('custom-input-field') || e.relatedTarget.closest('.tag-suggestions-menu'))) return;
            setTimeout(hideTagSuggestions, 200);
        });

        // Curator logic (curated)
        const curatedCurator = row.querySelector('.curator-value');
        curatedCurator.addEventListener('focus', () => { if (curatedCurator.textContent === 'curator name') curatedCurator.textContent = ''; });
        curatedCurator.addEventListener('blur', () => {
            const val = curatedCurator.textContent.trim();
            if (val === '') { curatedCurator.textContent = 'curator name'; playlist.curator = ''; }
            else playlist.curator = val;
            const master = playlistData["Top 20 Overall"].find(p => p.name === playlist.name);
            if (master) {
                master.curator = playlist.curator;
                const masterRow = Array.from(gridRoot.querySelectorAll('.selection-row'))
                    .find(r => r.querySelector('.playlist-text').textContent === playlist.name);
                if (masterRow) masterRow.querySelector('.curator-value').textContent = playlist.curator || 'curator name';
            }
        });

        dropZone.appendChild(row);
    }

    // =====================================================
    //  SORT
    // =====================================================
    let azOrder = true;
    sortTrigger.addEventListener('click', () => {
        const sortedData = [...playlistData["Top 20 Overall"]].sort((a, b) =>
            azOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        gridRoot.style.opacity = '0';
        setTimeout(() => {
            renderPlaylists(sortedData);
            gridRoot.style.opacity = '1';
            azOrder = !azOrder;
            sortTrigger.querySelector('.pill-text').textContent = azOrder ? 'A-Z' : 'Z-A';
        }, 300);
    });

    // =====================================================
    //  SHARE JSON
    // =====================================================
    shareTrigger.addEventListener('click', () => {
        const names = Array.from(dropZone.querySelectorAll('.curated-item')).map(item => item.dataset.name);
        if (names.length === 0) { alert('Selection is empty! Drag some playlists first.'); return; }

        const curatedData = names.map(name => {
            const master = playlistData["Top 20 Overall"].find(p => p.name === name);
            return { ...master, userTag: master.tag || '' };
        });

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curatedData, null, 2));
        const a = document.createElement('a');
        a.setAttribute("href", dataStr);
        a.setAttribute("download", "curated_playlists.json");
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
});
