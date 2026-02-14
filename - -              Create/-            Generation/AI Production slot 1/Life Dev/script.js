document.addEventListener('DOMContentLoaded', () => {
    console.log('Master Kit Hub Evolution Initialized');

    // --- Anchor Navigation & Active States ---
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollContainer = document.querySelector('.content-scroll');

    function updateActiveNav() {
        if (!scrollContainer) return;
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollContainer.scrollTop >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', updateActiveNav);
    }

    // --- Google Auth Protocol (HEC Security) ---
    const CLIENT_ID = '908389111255-bqsj96sjvo1d8q3qaq2cnehq62i8r1ds.apps.googleusercontent.com';

    function initGoogleAuth() {
        if (typeof google === 'undefined') return;

        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: true
        });

        const signinContainer = document.getElementById('g_id_signin');
        if (signinContainer) {
            google.accounts.id.renderButton(signinContainer, {
                theme: 'filled_black',
                size: 'large',
                shape: 'pill',
                text: 'continue_with',
                logo_alignment: 'left'
            });
        }

        // Check for existing session
        const secureToken = localStorage.getItem('hec_auth_token');
        if (secureToken) {
            unlockVault(true); // Fast bypass
        }
    }

    function handleCredentialResponse(response) {
        console.log("HEC-VAULT: Received Auth Signal", response);
        // Normally you'd verify this JWT on the backend.
        // For local prototpying, we'll extract the name and unlock.
        try {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            console.log("Welcome, Pilot:", payload.name);
            localStorage.setItem('hec_auth_token', response.credential);
            unlockVault();
        } catch (e) {
            console.error("Auth Signal Corrupted");
        }
    }

    function unlockVault(immediate = false) {
        const shield = document.getElementById('vaultOverlay');
        if (!shield) return;

        localStorage.setItem('hec_vault_unlocked', 'true');
        document.body.style.overflow = 'auto'; // Re-enable scroll

        if (immediate) {
            shield.classList.remove('active');
            shield.style.display = 'none';
        } else {
            shield.style.transition = 'all 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
            shield.classList.remove('active');
            setTimeout(() => shield.style.display = 'none', 1600);
        }
    }

    function checkVaultState() {
        if (localStorage.getItem('hec_vault_unlocked') === 'true') {
            unlockVault(true);
        } else {
            document.body.style.overflow = 'hidden'; // Lock scrolling until unlocked
        }
    }

    // Expose for Dev Bypass
    window.unlockVault = unlockVault;
    window.checkVaultState = checkVaultState;

    // Initialize Auth
    window.onload = () => {
        checkVaultState();
        initGoogleAuth();
        if (window.location.protocol === 'file:') {
            console.warn("HEC-SECURITY: Running via file:// - Google OAuth will require a local server (http://localhost). Use [ DEV BYPASS ] to enter.");
        }
    };

    // --- Dynamic Kit Section Addition ---
    const addSectionBtn = document.getElementById('addSectionBtn');
    const contentScroll = document.querySelector('.content-scroll');
    const sideNavLinks = document.querySelector('.nav-links');

    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', () => {
            const sectionName = prompt('Enter Kit Name:', 'New Research Kit');
            if (!sectionName) return;

            const sectionId = sectionName.toLowerCase().replace(/\s+/g, '-');

            const newSection = document.createElement('section');
            newSection.id = sectionId;
            newSection.className = 'section-container';
            newSection.innerHTML = `
                <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                    <h2 class="section-label" contenteditable="true" style="display: inline-block;">${sectionName}</h2>
                </div>
                <div class="kit-grid">
                    ${Array(4).fill(`
                        <div class="kit-tile glass-panel animate-in" draggable="true">
                            <div class="tile-header">
                                <span class="logo-icon">✨</span>
                                <span class="tile-status">New</span>
                            </div>
                            <h4 contenteditable="true">Empty Tile</h4>
                            <p contenteditable="true">Click arrows to navigate or drag to reorder.</p>
                        </div>
                    `).join('')}
                    <div class="kit-tile glass-panel add-tile"><span>+</span></div>
                </div>
            `;
            if (contentScroll) contentScroll.appendChild(newSection);

            const newNavLink = document.createElement('a');
            newNavLink.href = `#${sectionId}`;
            newNavLink.className = 'nav-link';
            newNavLink.textContent = sectionName;

            const coreGroup = sideNavLinks.querySelector('.nav-group');
            if (coreGroup) coreGroup.appendChild(newNavLink);

            initTileListeners();
            initDragAndDrop();
        });
    }

    // --- Tile Interactions: Directional Arrows & Drag ---
    function initTileListeners() {
        const tiles = document.querySelectorAll('.kit-tile:not(.add-tile):not(.siren-card)');
        tiles.forEach(tile => {
            tile.setAttribute('draggable', 'true');
            tile.removeEventListener('click', tileClickHandler);
            tile.addEventListener('click', tileClickHandler);
        });
    }

    function tileClickHandler(e) {
        if (e.target.closest('[contenteditable="true"]')) return;
        const tile = e.currentTarget;
        document.querySelectorAll('.tile-overlay').forEach(ov => ov.remove());
        const overlay = document.createElement('div');
        overlay.className = 'tile-overlay active';
        overlay.innerHTML = `
            <div class="arrow arrow-left" title="Previous Item">←</div>
            <div class="arrow arrow-right" title="Next Item">→</div>
            <div class="arrow arrow-down" title="Next Section">↓</div>
            <div class="close-overlay">×</div>
        `;
        tile.appendChild(overlay);
        overlay.querySelector('.arrow-left').addEventListener('click', (ev) => {
            ev.stopPropagation();
            const prev = tile.previousElementSibling;
            if (prev) prev.scrollIntoView({ behavior: 'smooth', block: 'center' });
            overlay.remove();
        });
        overlay.querySelector('.arrow-right').addEventListener('click', (ev) => {
            ev.stopPropagation();
            const next = tile.nextElementSibling;
            if (next && !next.classList.contains('add-tile')) {
                next.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            overlay.remove();
        });
        overlay.querySelector('.arrow-down').addEventListener('click', (ev) => {
            ev.stopPropagation();
            const section = tile.closest('section');
            const nextSection = section.nextElementSibling;
            if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            overlay.remove();
        });
        overlay.querySelector('.close-overlay').addEventListener('click', (ev) => {
            ev.stopPropagation();
            overlay.remove();
        });
    }

    // --- General Drag and Drop Logic for .kit-grid (not drone fleet) ---
    let draggedTile = null;

    function initGeneralDragAndDrop() {
        const grids = document.querySelectorAll('.kit-grid'); // Only target .kit-grid here
        const tiles = document.querySelectorAll('.kit-grid .kit-tile:not(.add-tile)');

        tiles.forEach(tile => {
            tile.setAttribute('draggable', 'true');
            tile.removeEventListener('dragstart', handleGeneralDragStart);
            tile.addEventListener('dragstart', handleGeneralDragStart);
            tile.removeEventListener('dragend', handleGeneralDragEnd);
            tile.addEventListener('dragend', handleGeneralDragEnd);
        });

        grids.forEach(grid => {
            grid.removeEventListener('dragover', handleGeneralDragOver);
            grid.addEventListener('dragover', handleGeneralDragOver);
        });
    }

    function handleGeneralDragStart(e) {
        draggedTile = e.target;
        setTimeout(() => e.target.classList.add('dragging'), 0);
    }

    function handleGeneralDragEnd(e) {
        e.target.classList.remove('dragging');
        draggedTile = null;
    }

    function handleGeneralDragOver(e) {
        e.preventDefault();
        if (!draggedTile || !e.currentTarget.classList.contains('kit-grid')) return; // Ensure it's a kit-grid
        const afterElement = getDragAfterElement(e.currentTarget, e.clientX, e.clientY);
        if (afterElement == null) {
            const addBtn = e.currentTarget.querySelector('.add-tile');
            if (addBtn) {
                e.currentTarget.insertBefore(draggedTile, addBtn);
            } else {
                e.currentTarget.appendChild(draggedTile);
            }
        } else {
            e.currentTarget.insertBefore(draggedTile, afterElement);
        }
    }

    // --- Unified Grid Interaction (Drag & Paste) ---
    function initDroneFleet() {
        const grid = document.querySelector('.drone-fleet-grid');
        if (!grid) return;

        console.log('Drone Fleet Grid Initialized');

        // 1. Event Delegation for Dragging
        grid.addEventListener('dragstart', (e) => {
            const tile = e.target.closest('.kit-tile:not(.add-tile)');
            if (tile) {
                draggedTile = tile;
                setTimeout(() => tile.classList.add('dragging'), 0);
            }
        });

        grid.addEventListener('dragend', (e) => {
            const tile = e.target.closest('.kit-tile');
            if (tile) {
                tile.classList.remove('dragging');
                draggedTile = null;
            }
        });

        grid.addEventListener('dragover', (e) => {
            e.preventDefault();

            // 1. If dragging a file/link from outside, show activation feedback
            if (e.dataTransfer.types.includes('text/uri-list') || e.dataTransfer.types.includes('text/plain')) {
                const card = e.target.closest('.siren-card.offline');
                if (card) {
                    card.style.boxShadow = '0 0 40px var(--accent-emerald)';
                    card.style.borderColor = 'var(--accent-emerald)';
                }
                return; // Don't trigger reordering logic for external drops
            }

            // 2. Tile Reordering Logic (Internal)
            if (!draggedTile) return;
            const afterElement = getDragAfterElement(grid, e.clientX, e.clientY);
            if (afterElement == null) {
                const addBtn = grid.querySelector('.add-tile, .add-node-btn');
                if (addBtn) {
                    grid.insertBefore(draggedTile, addBtn);
                } else {
                    grid.appendChild(draggedTile);
                }
            } else {
                grid.insertBefore(draggedTile, afterElement);
            }
        });

        // 2. Event Delegation for Activation (Paste & Drop)
        grid.addEventListener('paste', async (e) => {
            const card = e.target.closest('.siren-card'); // Allow updating active cards too
            if (!card) return;

            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            if (pastedText && pastedText.trim().startsWith('http')) {
                igniteDrone(card, pastedText.trim());
            }
        });

        grid.addEventListener('drop', (e) => {
            e.preventDefault();
            const card = e.target.closest('.siren-card');
            if (!card) return;

            // Reset visual feedback
            card.style.boxShadow = '';
            card.style.borderColor = '';

            const droppedText = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
            if (droppedText && droppedText.trim().startsWith('http')) {
                igniteDrone(card, droppedText.trim());
            }
        });

        grid.addEventListener('dragleave', (e) => {
            const card = e.target.closest('.siren-card.offline');
            if (card) {
                card.style.boxShadow = '';
                card.style.borderColor = '';
            }
        });

        // Initial check for existing feeds
        checkRSSFeeds();
    }

    function getDragAfterElement(container, x, y) {
        const draggableElements = [...container.querySelectorAll('.kit-tile:not(.dragging):not(.add-tile)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();

            // Calculate center of the tile
            const centerX = box.left + box.width / 2;
            const centerY = box.top + box.height / 2;

            // Distance squared for performance
            const distance = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2);

            if (distance < closest.offset) {
                return { offset: distance, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.POSITIVE_INFINITY }).element;
    }

    function detectPlatform(url) {
        const u = url.toLowerCase();
        if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
        if (u.includes('kick.com')) return 'kick';
        if (u.includes('twitch.tv')) return 'twitch';
        if (u.includes('tiktok.com')) return 'tiktok';
        if (u.includes('instagram.com')) return 'instagram';
        if (u.includes('facebook.com')) return 'facebook';
        if (u.includes('x.com') || u.includes('twitter.com')) return 'x';
        if (u.includes('github.com')) return 'github';
        if (u.includes('linkedin.com')) return 'linkedin';
        if (u.includes('spotify.com')) return 'spotify';
        if (u.includes('pinterest.com')) return 'pinterest';
        if (u.includes('discord.com') || u.includes('discord.gg')) return 'discord';
        if (u.includes('snapchat.com')) return 'snapchat';
        if (u.includes('threads.net')) return 'threads';
        if (u.includes('t.me') || u.includes('telegram.me')) return 'telegram';
        if (u.includes('reddit.com')) return 'reddit';
        if (u.includes('clubhouse.com')) return 'clubhouse';
        if (u.includes('wechat.com')) return 'wechat';
        return 'generic';
    }

    function igniteDrone(card, url) {
        console.log('Universal Ignition Sequence Initialized:', url);
        card.classList.remove('offline');
        card.setAttribute('data-rss', url);

        const platform = detectPlatform(url);
        let domain = 'SIGNAL';
        let handle = '';
        let avatarUrl = '';

        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            domain = urlObj.hostname.replace('www.', '').split('.')[0].toUpperCase();
            const pathParts = urlObj.pathname.split('/').filter(p => p);
            const u = url.toLowerCase();

            // 1. Extract Handle/ID for Social Platforms
            if (platform === 'youtube') {
                if (u.includes('/@')) handle = u.split('@')[1].split(/[?#&]/)[0];
                else if (u.includes('/channel/')) handle = u.split('/channel/')[1].split(/[?#&]/)[0];
                else handle = pathParts[pathParts.length - 1] || 'youtube';
            } else if ((platform === 'tiktok' || platform === 'threads' || platform === 'instagram' || platform === 'clubhouse') && u.includes('@')) {
                handle = u.split('@')[1].split(/[?#&]/)[0];
            } else if (platform === 'snapchat') {
                handle = u.includes('/add/') ? u.split('/add/')[1].split(/[?#&]/)[0] : pathParts[0];
            } else if (platform === 'reddit') {
                handle = u.includes('/user/') ? u.split('/user/')[1].split(/[?#&]/)[0] : (u.includes('/r/') ? u.split('/r/')[1].split(/[?#&]/)[0] : pathParts[pathParts.length - 1]);
            } else if (platform === 'linkedin') {
                handle = u.includes('/in/') ? u.split('/in/')[1].split(/[?#&]/)[0] : pathParts[0];
            } else if (platform === 'telegram') {
                handle = pathParts[0] || 'telegram';
            } else if (['facebook', 'kick', 'twitch', 'github', 'instagram', 'twitter', 'x', 'linkedin', 'pinterest', 'clubhouse', 'spotify'].includes(platform)) {
                // Standard first-segment handle extraction
                handle = pathParts[0] || platform;
            } else {
                handle = domain;
            }

            // 2. Build Avatar URL
            if (platform !== 'generic') {
                avatarUrl = `https://unavatar.io/${platform}/${handle}`;
            } else {
                // High-quality Favicon Fallback for Generic Sites
                avatarUrl = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`;
            }

        } catch (e) {
            console.error('Ignition Parsing Error:', e);
        }

        // Clean up previous platform classes and apply new one
        card.className = card.className.replace(/\bplatform-\S+/g, '');
        card.classList.add(`platform-${platform}`);

        const screen = card.querySelector('.siren-tv-screen');
        const nameEl = card.querySelector('h4');

        if (nameEl) nameEl.innerText = (handle || domain).toUpperCase();

        // Updated Ignition Animation with Universal Logic
        screen.innerHTML = `
            <div class="ignition-flash"></div>
            <img src="${avatarUrl}" class="profile-thumb" alt="Thumb" 
                 onload="this.style.opacity=1"
                 onerror="this.src='https://www.google.com/s2/favicons?domain=${url}&sz=128'"
                 style="opacity:0; transition: opacity 0.8s ease-in;">
            <span class="platform-tag tag-${platform}">${platform === 'generic' ? domain : platform}</span>
        `;

        const statusEl = card.querySelector('.rss-status');
        if (statusEl) statusEl.innerText = '📡 LINKING...';

        checkRSSFeeds();
    }

    async function fetchRSS(url, platform) {
        try {
            let fetchUrl = url;
            if (platform === 'youtube' && !url.includes('api.rss2json')) {
                fetchUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
            } else if (platform !== 'youtube') {
                return { pubDate: new Date().toISOString(), title: "Multi-Platform Signal" };
            }
            const response = await fetch(fetchUrl);
            const data = await response.json();
            return data.items && data.items.length > 0 ? data.items[0] : (data.pubDate ? data : null);
        } catch (error) {
            console.error('Signal Fetch Error:', error);
            return null;
        }
    }

    async function checkRSSFeeds() {
        const monitors = document.querySelectorAll('.siren-card[data-rss]');
        monitors.forEach(async (monitor) => {
            const rssUrl = monitor.getAttribute('data-rss');
            if (!rssUrl) return;

            const platform = detectPlatform(rssUrl);
            const statusEl = monitor.querySelector('.rss-status');

            monitor.classList.add(`platform-${platform}`);

            const latestItem = await fetchRSS(rssUrl, platform);
            if (latestItem) {
                const pubDate = new Date(latestItem.pubDate).getTime();
                const isNew = pubDate > (Date.now() - 86400000);

                if (isNew) {
                    monitor.classList.add('robot-alert');
                    if (statusEl) {
                        statusEl.innerText = `${platform.toUpperCase()} SIGNAL DETECTED! 🚨`;
                        statusEl.style.color = '#ef4444';
                    }
                } else {
                    if (statusEl) statusEl.innerText = `Status: ${platform.charAt(0).toUpperCase() + platform.slice(1)} Ready`;
                }
            } else {
                if (statusEl) statusEl.innerText = 'Signal: Offline';
            }
        });
    }

    // --- Add New Node Button (Grid Support) ---
    const addNodeBtn = document.getElementById('addNodeBtn');
    if (addNodeBtn) addNodeBtn.addEventListener('click', () => {
        const grid = document.querySelector('.drone-fleet-grid');
        if (!grid) return;

        const newCard = document.createElement('div');
        newCard.className = 'path-tile siren-card kit-tile glass-panel animate-in offline new-arrival';
        newCard.setAttribute('tabindex', '0');
        newCard.setAttribute('draggable', 'true');
        newCard.innerHTML = `
                    <div class="siren-unit"><div class="siren-light"></div></div>
                    <div class="siren-tv-screen">
                        <div class="static-noise"></div>
                        <div class="paste-ghost">PASTE LINK</div>
                        <span class="platform-tag">IDLE</span>
                    </div>
                    <h4 contenteditable="true" class="creator-name">Awaiting Signal...</h4>
                    <div class="card-meta"><span class="rss-status">OFFLINE</span></div>
                `;

        grid.prepend(newCard);
        setTimeout(() => newCard.classList.remove('new-arrival'), 1000);
    });

    // --- Add New Tier (3 Nodes) ---
    const addTierBtn = document.getElementById('addTierBtn');
    if (addTierBtn) addTierBtn.addEventListener('click', () => {
        const grid = document.querySelector('.drone-fleet-grid');
        if (!grid) return;

        // Create a batch of 3 nodes
        for (let i = 0; i < 3; i++) {
            const newCard = document.createElement('div');
            newCard.className = 'path-tile siren-card kit-tile glass-panel animate-in offline new-arrival';
            newCard.setAttribute('tabindex', '0');
            newCard.setAttribute('draggable', 'true');
            newCard.innerHTML = `
                <div class="siren-unit"><div class="siren-light"></div></div>
                <div class="siren-tv-screen">
                    <div class="static-noise"></div>
                    <div class="paste-ghost">PASTE LINK</div>
                    <span class="platform-tag">TIER-UP</span>
                </div>
                <h4 contenteditable="true" class="creator-name">Awaiting Signal...</h4>
                <div class="card-meta"><span class="rss-status">OFFLINE</span></div>
            `;
            grid.prepend(newCard);
            setTimeout(() => newCard.classList.remove('new-arrival'), 1000);
        }
    });
    initDroneFleet();
});
