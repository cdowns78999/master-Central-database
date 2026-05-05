
        /* ── One-time localStorage clear (remove after use) ── */
        if (new URLSearchParams(window.location.search).get('clear') === '1') {
            var cleared = [];
            Object.keys(localStorage).forEach(function(k) {
                if (k.indexOf('wingdash') === 0 || k === 'clientDrivePaths' || k === 'launcherActiveScreen') {
                    cleared.push(k);
                    localStorage.removeItem(k);
                }
            });
            console.log('[CLEAR] Removed ' + cleared.length + ' keys:', cleared);
            document.title = 'CLEARED ' + cleared.length + ' keys';
            alert('Cleared ' + cleared.length + ' wingdash localStorage keys!\n\n' + cleared.join('\n'));
            window.history.replaceState({}, '', window.location.pathname);
        }

        /* ══════════════════════════════════════════════
           Wing Paging System
           Pattern: CodePen #3 translateX paging +
           radialMenu directional intent detection
           ══════════════════════════════════════════════ */

        // Localhost URL — chad20 Artist Matrix (sub-library)
        const ARTIST_MATRIX_URL = 'http://localhost:3000/----%20Anti%20Gravity%20----%20My%20Master%20Folder/%F0%9F%92%8E%F0%9F%92%8E%20-%20-%20-%20beginning%20-%20-%20-%20%F0%9F%92%8E%F0%9F%92%8E/%F0%9F%93%99--%20--%20-%20--%20%F0%9F%93%99%20library/%F0%9F%93%99%20sub-library/%E3%80%B0%EF%B8%8F%20chad20%20-%20artist-matrix/index.html';

        // Localhost URL — chad22 Proposal Generator (sub-library)
        const PROPOSAL_GENERATOR_URL = 'http://localhost:3000/----%20Anti%20Gravity%20----%20My%20Master%20Folder/%F0%9F%92%8E%F0%9F%92%8E%20-%20-%20-%20beginning%20-%20-%20-%20%F0%9F%92%8E%F0%9F%92%8E/%F0%9F%93%99--%20--%20-%20--%20%F0%9F%93%99%20library/%F0%9F%93%99%20sub-library/%E3%80%B0%EF%B8%8F%20chad22%20-%20proposal%20generator/index.html';

        // Localhost URL — chad43 Cal Card base template (A2 automation)
        const CAL_CARD_URL = 'http://localhost:3000/----%20Anti%20Gravity%20----%20My%20Master%20Folder/%F0%9F%AA%A8%F0%9F%AA%A8%20%20%20%20%20%20AUTOMATIONS%20%20%20%20%20%20%20%F0%9F%AA%A8%F0%9F%AA%A8/--%20%F0%9F%AA%A8A2%20%20--%20---%20Cal%20Cards/%F0%9F%AA%A8A2/chad43%20-%20%F0%9F%9A%A7Complete%20%F0%9F%9A%A7';

        // Localhost URL — chad4 Client Network (Advanced Network Matrix)
        const CLIENT_NETWORK_URL = 'http://localhost:3000/----%20Anti%20Gravity%20----%20My%20Master%20Folder/%F0%9F%92%8E%F0%9F%92%8E%20-%20-%20-%20beginning%20-%20-%20-%20%F0%9F%92%8E%F0%9F%92%8E/%F0%9F%93%99--%20--%20-%20--%20%F0%9F%93%99%20library/chad4-clients%20copy%202.html';

        // Localhost URL — chad6a Client Pricing (Progressive Data Visualization)
        const CLIENT_PRICING_URL = 'http://localhost:3000/----%20Anti%20Gravity%20----%20My%20Master%20Folder/%F0%9F%92%8E%F0%9F%92%8E%20-%20-%20-%20beginning%20-%20-%20-%20%F0%9F%92%8E%F0%9F%92%8E/%F0%9F%93%99--%20--%20-%20--%20%F0%9F%93%99%20library/chad6a-client-price%20copy%202.html';

        // Localhost URL — chad6b Client Price View B
        const CLIENT_PRICING_B_URL = 'http://localhost:3000/----%20Anti%20Gravity%20----%20My%20Master%20Folder/%F0%9F%92%8E%F0%9F%92%8E%20-%20-%20-%20beginning%20-%20-%20-%20%F0%9F%92%8E%F0%9F%92%8E/%F0%9F%93%99--%20--%20-%20--%20%F0%9F%93%99%20library/chad6b-client-price%20copy%202.html';

        /* ══════════════════════════════════════════════
           Pricing Catalog — POS Strip Data Pool
           (kept for TileManager package selection)
           ══════════════════════════════════════════════ */

        const pricingCatalog = {
            spotify: [
                { name: '10K Spotify', price: '$325', category: 'spotify' },
                { name: '15K Spotify', price: '$390', category: 'spotify' },
                { name: '20K Spotify', price: '$490', category: 'spotify' },
                { name: '25K Spotify', price: '$590', category: 'spotify' },
                { name: '30K Spotify', price: '$690', category: 'spotify' },
                { name: '40K Spotify', price: '$790', category: 'spotify' },
                { name: '50K Spotify', price: '$890', category: 'spotify' },
                { name: '60K Spotify', price: '$990', category: 'spotify' },
                { name: '75K Spotify', price: '$1,200', category: 'spotify' },
                { name: '100K Spotify', price: '$1,500', category: 'spotify' },
                { name: '125K Spotify', price: '$1,875', category: 'spotify' },
                { name: '150K Spotify', price: '$2,250', category: 'spotify' },
                { name: '200K Spotify', price: '$3,000', category: 'spotify' },
                { name: '250K Spotify', price: '$3,550', category: 'spotify' },
                { name: '500K Spotify', price: '$6,500', category: 'spotify' }
            ],
            press: [
                { name: '3 Articles (In-Network)', price: '$200', category: 'press' },
                { name: '4 Articles (In-Network)', price: '$250', category: 'press' },
                { name: '5 Articles (In-Network)', price: '$300', category: 'press' },
                { name: '4–7 Articles (Standard)', price: '$550', category: 'press' },
                { name: '6–10 Articles (Standard)', price: '$700', category: 'press' },
                { name: '10–15 Articles (Standard)', price: '$900', category: 'press' },
                { name: '3 Articles (Premium)', price: '$500', category: 'press' },
                { name: '4 Articles (Premium)', price: '$650', category: 'press' },
                { name: '6 Articles (Premium)', price: '$750', category: 'press' }
            ],
            youtube: [
                { name: '10K YouTube', price: '$375', category: 'youtube' },
                { name: '20K YouTube', price: '$650', category: 'youtube' },
                { name: '50K YouTube', price: '$1,200', category: 'youtube' },
                { name: '100K YouTube', price: '$1,500', category: 'youtube' }
            ],
            soundcloud: [
                { name: '4K Streams', price: '$180', category: 'soundcloud' },
                { name: '8K Streams', price: '$240', category: 'soundcloud' },
                { name: '16K Streams', price: '$350', category: 'soundcloud' }
            ],
            packages: [
                { name: 'Silver', price: '$2,500' },
                { name: 'Gold', price: '$5,000' },
                { name: 'Platinum', price: '$10,000' }
            ]
        };

        const allServices = [...pricingCatalog.spotify, ...pricingCatalog.press, ...pricingCatalog.youtube, ...pricingCatalog.soundcloud];

        const state = {
            left: 0,
            right: 0,
            maxIndex: { left: 5, right: 3 },
            tiles: [],
            nextTileId: 1,
            maxTiles: 5
        };

        let selectedClient = null;

        /* ── Active Client — set when GO fires, read by pipeline steps ── */
        var activeClient = null;

        const elements = {
            leftTrack: document.getElementById('leftTrack'),
            rightTrack: document.getElementById('rightTrack'),
            leftDots: document.getElementById('leftDots'),
            rightDots: document.getElementById('rightDots'),
            leftPageLabel: document.getElementById('leftPageLabel'),
            rightPageLabel: document.getElementById('rightPageLabel'),
            wingLeft: document.getElementById('wingLeft'),
            wingRight: document.getElementById('wingRight')
        };

        // Section names for each wing
        const sectionNames = {
            left: ['AAS Flow', 'Leads', 'Biz Building', 'General Tools', 'Contacts', 'Suppliers'],
            right: ['Pipeline', 'AI Tools', 'Comms', 'My Tools']
        };

        /* ══════════════════════════════════════════════
           Pill Data Arrays — scrollable database
           Each section supports up to 50 pills
           ══════════════════════════════════════════════ */

        const pillData = {
            left: [
                // Section 0: AAS Flow — real client name buttons
                [
                    { icon: '◆', label: 'Marc Antonix', sub: 'Artist', isClient: true },
                    { icon: '◆', label: 'Benny Freestyles', sub: 'Artist', isClient: true },
                    { icon: '◆', label: 'Chloe Florence', sub: 'Artist', isClient: true },
                    { icon: '◆', label: 'Bryan Hobbs', sub: 'Artist', isClient: true },
                    { icon: '◆', label: 'Don Feliz', sub: 'Artist', isClient: true },
                    { icon: '◆', label: 'Hostage Situation', sub: 'Band', isClient: true },
                    { icon: '◆', label: 'Ricky Furniss', sub: 'Artist', isClient: true },
                    { icon: '◆', label: 'Jon Gilman', sub: 'Racket House', isClient: true },
                    { icon: '★', label: 'Patrick Ames', sub: 'Apricity Agency', isClient: true },
                    { icon: '★', label: 'Alshaan Kassam', sub: 'Purpose AK', isClient: true },
                    { icon: '⇒', label: 'Add New Client', sub: 'Onboard' }
                ],
                // Section 1: Leads — potential clients with Climate Card
                [
                    { icon: '☀', label: 'Sample Lead A', sub: 'Warm lead', isLead: true },
                    { icon: '☀', label: 'Sample Lead B', sub: 'Cold lead', isLead: true },
                    { icon: '☀', label: 'Sample Lead C', sub: 'Referral', isLead: true },
                    { icon: '⇒', label: 'Add New Lead', sub: 'Prospect' }
                ],
                // Section 2: Biz Building
                [
                    { icon: '🔭', label: 'Scouts App', sub: 'Talent discovery' },
                    { icon: '🎮', label: 'VR Chat YouTube', sub: 'Virtual content' },
                    { icon: '🤖', label: 'AI YouTube', sub: 'AI-powered content' }
                ],
                // Section 3: General Tools
                [
                    { icon: '＋', label: 'Add New Client', sub: 'Start new client' },
                    { icon: '📋', label: 'Create Proposal', sub: 'Run cal-card for client' }
                ],
                // Section 4: Contacts
                [
                    { icon: '👤', label: 'Marcus Rivera', sub: 'artist' },
                    { icon: '👤', label: 'Tanya Brooks', sub: 'manager' },
                    { icon: '👤', label: 'DJ Kaine', sub: 'artist' },
                    { icon: '👤', label: 'Aisha Cole', sub: 'a&r' },
                    { icon: '👤', label: 'Leon Baptiste', sub: 'producer' },
                    { icon: '⇒', label: 'Add New Client', sub: 'Onboard' }
                ],
                // Section 5: Suppliers
                [
                    { icon: '👤', label: 'Brandon', sub: 'Supplier pricing' },
                    { icon: '👤', label: 'Nik', sub: 'Supplier pricing' },
                    { icon: '👤', label: 'Tyler', sub: 'Supplier pricing' },
                    { icon: '👤', label: 'Peter', sub: 'Supplier pricing' },
                    { icon: '⇒', label: 'Add Supplier', sub: 'New vendor' }
                ]
            ],
            right: [
                // Section 0: Pipeline (no pill data — rendered in HTML)
                null,
                // Section 1: AI Tools
                [
                    { icon: '🤖', label: 'Manis // Claude', sub: 'Lead Generation' },
                    { icon: '📡', label: 'Social Sweep // Claude', sub: 'Social Listening' },
                    { icon: '💬', label: 'Revio // Claude', sub: 'Review Management' },
                    { icon: '🎯', label: 'Alley // Claude', sub: 'Smart Outreach' }
                ],
                // Section 2: Comms
                [
                    { icon: '✉', label: 'Gmail', sub: 'Email' },
                    { icon: '💬', label: 'WhatsApp', sub: 'Messaging' },
                    { icon: '💎', label: 'iMessage', sub: 'Apple' },
                    { icon: '🔵', label: 'Messenger', sub: 'Meta' },
                    { icon: '🎮', label: 'Discord', sub: 'Community' },
                    { icon: '🌐', label: 'VRChat', sub: 'Virtual' },
                    { icon: '📍', label: 'Local', sub: 'Nearby' }
                ],
                // Section 3: My Tools
                [
                    { icon: '⭐', label: 'Task Manager', sub: 'chad1' },
                    { icon: '▲', label: 'Dashboard', sub: 'chad3' },
                    { icon: '🗺', label: 'Railroader / MAPPER', sub: 'chad7a' },
                    { icon: '⚡', label: 'Quick Access', sub: 'chad43' },
                    { icon: '📞', label: 'Call Card', sub: 'chad14' },
                    { icon: '👥', label: 'Artist Matrix', sub: 'chad20' },
                    { icon: '📦', label: 'Data Dump', sub: 'chad23' },
                    { icon: '📝', label: 'Proposal Generator', sub: 'chad22' },
                    { icon: '💲', label: 'Pricing Matrix', sub: 'chad25', isPricingMatrix: true },
                    { icon: '🏷', label: 'Price Deck', sub: 'chad27' },
                    { icon: '📊', label: 'Campaign Dashboard', sub: 'chad24' },
                    { icon: '🎵', label: 'Spotify Ads', sub: 'chad31' },
                    { icon: '🎧', label: 'Spotify Cataloger', sub: 'chad10' },
                    { icon: '🎶', label: 'Playlist Organizer', sub: 'chad19' },
                    { icon: '✍', label: 'ID Signer', sub: 'chad31' },
                    { icon: '🚀', label: 'On The Move', sub: 'chad21' },
                    { icon: '📱', label: 'On-the-Go', sub: 'chad15' },
                    { icon: '🃏', label: 'Best Deck Ever', sub: 'chad16' },
                    { icon: '🎴', label: 'Presentation Card', sub: 'chad23' }
                ]
            ]
        };

        // Track which sections have been rendered (lazy render)
        const rendered = { left: {}, right: {} };

        function renderPills(wing, sectionIndex) {
            if (rendered[wing][sectionIndex]) return;

            const track = elements[wing + 'Track'];
            const section = track.querySelectorAll('.wing-section')[sectionIndex];
            if (!section) return;

            const pills = pillData[wing][sectionIndex];
            if (!pills) return;

            // Clear existing pills (keep section-label)
            const label = section.querySelector('.section-label');
            section.innerHTML = '';
            if (label) section.appendChild(label);

            // Build pills from data
            pills.forEach(p => {
                const pill = document.createElement('div');
                pill.className = 'pill';
                pill.innerHTML = `
                    <div class="pill-icon">${p.icon}</div>
                    <div class="pill-text">
                        <div class="pill-label">${p.label}</div>
                        <div class="pill-sub">${p.sub}</div>
                    </div>
                    <div class="pill-chevron">▶</div>
                `;
                section.appendChild(pill);
            });

            rendered[wing][sectionIndex] = true;
        }

        function goToSection(wing, index) {
            // Clamp 0–maxIndex per wing
            const max = state.maxIndex[wing];
            index = Math.max(0, Math.min(max, index));
            state[wing] = index;

            // Update track transform
            const track = elements[wing + 'Track'];
            track.style.transform = `translateX(-${index * 100}%)`;

            // Update page label
            const label = elements[wing + 'PageLabel'];
            label.textContent = `${index + 1} / ${max + 1}`;

            // Update dots
            const dotsContainer = elements[wing + 'Dots'];
            const dots = dotsContainer.querySelectorAll('.wing-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Update arrow visibility (opacity transition, not display toggle)
            const wingEl = elements['wing' + wing.charAt(0).toUpperCase() + wing.slice(1)];
            const prevArrow = wingEl.querySelector('.wing-arrow-prev');
            const nextArrow = wingEl.querySelector('.wing-arrow-next');
            prevArrow.classList.toggle('hidden', index === 0);
            nextArrow.classList.toggle('hidden', index === max);

            // Update wing header title to current section name
            const title = wingEl.querySelector('.wing-title');
            title.textContent = sectionNames[wing][index];

            // Lazy render pills for this section
            renderPills(wing, index);
        }

        // Arrow button clicks
        document.querySelectorAll('.wing-arrow').forEach(arrow => {
            arrow.addEventListener('click', (e) => {
                e.stopPropagation();
                const wing = arrow.dataset.wing;
                const dir = parseInt(arrow.dataset.dir);
                goToSection(wing, state[wing] + dir);
            });
        });

        // Touch/pointer swipe detection
        // Pattern: radialMenu directional intent — abs(deltaX) > abs(deltaY) * 1.5
        function setupSwipe(wingEl, wingName) {
            let startX = 0;
            let startY = 0;
            let tracking = false;

            wingEl.addEventListener('pointerdown', (e) => {
                // Only track on the wing track area, not arrows
                if (e.target.closest('.wing-arrow')) return;
                startX = e.clientX;
                startY = e.clientY;
                tracking = true;
            });

            wingEl.addEventListener('pointerup', (e) => {
                if (!tracking) return;
                tracking = false;

                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                // Dead zone: 10px before deciding axis
                if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return;

                // Horizontal intent: abs(deltaX) > abs(deltaY) * 1.5
                if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 50) {
                    if (deltaX < 0) {
                        goToSection(wingName, state[wingName] + 1);
                    } else {
                        goToSection(wingName, state[wingName] - 1);
                    }
                }
            });

            // Prevent text selection during swipe
            wingEl.addEventListener('dragstart', (e) => { e.preventDefault(); });
        }

        setupSwipe(elements.wingLeft, 'left');
        setupSwipe(elements.wingRight, 'right');

        /* ══════════════════════════════════════════════
           Toolbar interaction
           ══════════════════════════════════════════════ */

        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.id === 'themeBtn') return;
                document.querySelectorAll('.toolbar-btn:not(#themeBtn)').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        /* ══════════════════════════════════════════════
           Center tile Quick Links → navigate wings
           ══════════════════════════════════════════════ */

        document.querySelectorAll('.tile[data-action]').forEach(tile => {
            tile.addEventListener('click', () => {
                const action = tile.dataset.action;
                switch (action) {
                    case 'clients': goToSection('left', 0); break;
                    case 'suppliers': goToSection('right', 1); break;
                    case 'services': goToSection('right', 2); break;
                    case 'general-tools': goToSection('left', 3); break;
                    case 'pipeline': goToSection('left', 3); break;
                    case 'inventory': goToSection('right', 3); break;
                    case 'analytics': goToSection('right', 0); break;
                    case 'home': goToSection('left', 0); goToSection('right', 0); break;
                    case 'refresh': location.reload(); break;
                }
            });
        });

        /* ══════════════════════════════════════════════
           Status bar — current date/time
           ══════════════════════════════════════════════ */

        function updateTime() {
            const now = new Date();
            const opts = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            document.getElementById('statusTime').textContent = now.toLocaleDateString('en-US', opts);
        }
        updateTime();
        setInterval(updateTime, 60000);

        /* ══════════════════════════════════════════════
           Mobile wing toggle (< 1000px)
           ══════════════════════════════════════════════ */

        const backdrop = document.getElementById('wingBackdrop');

        function closeAllWings() {
            elements.wingLeft.classList.remove('wing-open');
            elements.wingRight.classList.remove('wing-open');
            backdrop.classList.remove('show');
        }

        document.getElementById('toggleLeft').addEventListener('click', () => {
            const isOpen = elements.wingLeft.classList.contains('wing-open');
            closeAllWings();
            if (!isOpen) {
                elements.wingLeft.classList.add('wing-open');
                backdrop.classList.add('show');
            }
        });

        document.getElementById('toggleRight').addEventListener('click', () => {
            const isOpen = elements.wingRight.classList.contains('wing-open');
            closeAllWings();
            if (!isOpen) {
                elements.wingRight.classList.add('wing-open');
                backdrop.classList.add('show');
            }
        });

        backdrop.addEventListener('click', closeAllWings);

        /* ══════════════════════════════════════════════
           Theme Cycler — ■ Square Button
           4 gradient themes: Warm Sunset, Midnight Moon,
           Forest Ember, Arctic Dawn
           ══════════════════════════════════════════════ */

        const themes = [
            {
                name: 'Warm Sunset',
                deep: '#c2560a', mid: '#e07b2e', warm: '#f2a54a', soft: '#f8c97d', glow: '#fde8c8',
                white: '#ffffff', text: '#3b1a04', textDim: 'rgba(59, 26, 4, 0.55)',
                toolbarBg: 'linear-gradient(180deg, #9a4208 0%, #7a3506 100%)',
                bgLayer1: 'radial-gradient(ellipse at 30% 20%, #f8c97d 0%, transparent 50%)',
                bgLayer2: 'radial-gradient(ellipse at 70% 80%, #f2a54a 0%, transparent 50%)',
                bgLayer3: 'radial-gradient(ellipse at 50% 50%, #e8944a 0%, transparent 60%)',
                bgBase: 'linear-gradient(160deg, #fde8c8 0%, #f2a54a 35%, #d4700f 65%, #a84e08 100%)'
            },
            {
                name: 'Midnight Moon',
                deep: '#1e3a5f', mid: '#2d5a8e', warm: '#4a7fb5', soft: '#7bafd4', glow: '#c8dff0',
                white: '#e8f0f8', text: '#0f1f33', textDim: 'rgba(15, 31, 51, 0.55)',
                toolbarBg: 'linear-gradient(180deg, #1a2d4a 0%, #0f1b2d 100%)',
                bgLayer1: 'radial-gradient(ellipse at 30% 20%, #4a7fb5 0%, transparent 50%)',
                bgLayer2: 'radial-gradient(ellipse at 70% 80%, #2d5a8e 0%, transparent 50%)',
                bgLayer3: 'radial-gradient(ellipse at 50% 50%, #1e3a5f 0%, transparent 60%)',
                bgBase: 'linear-gradient(160deg, #c8dff0 0%, #4a7fb5 35%, #1e3a5f 65%, #0f1b2d 100%)'
            },
            {
                name: 'Forest Ember',
                deep: '#2d5016', mid: '#4a7a2e', warm: '#6ba342', soft: '#9cc878', glow: '#d4ebc4',
                white: '#f0f8ea', text: '#1a2e0d', textDim: 'rgba(26, 46, 13, 0.55)',
                toolbarBg: 'linear-gradient(180deg, #2d5016 0%, #1a3008 100%)',
                bgLayer1: 'radial-gradient(ellipse at 30% 20%, #9cc878 0%, transparent 50%)',
                bgLayer2: 'radial-gradient(ellipse at 70% 80%, #6ba342 0%, transparent 50%)',
                bgLayer3: 'radial-gradient(ellipse at 50% 50%, #4a7a2e 0%, transparent 60%)',
                bgBase: 'linear-gradient(160deg, #d4ebc4 0%, #6ba342 35%, #2d5016 65%, #1a3008 100%)'
            },
            {
                name: 'Arctic Dawn',
                deep: '#4a5568', mid: '#718096', warm: '#a0aec0', soft: '#cbd5e0', glow: '#edf2f7',
                white: '#f7fafc', text: '#1a202c', textDim: 'rgba(26, 32, 44, 0.55)',
                toolbarBg: 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)',
                bgLayer1: 'radial-gradient(ellipse at 30% 20%, #cbd5e0 0%, transparent 50%)',
                bgLayer2: 'radial-gradient(ellipse at 70% 80%, #a0aec0 0%, transparent 50%)',
                bgLayer3: 'radial-gradient(ellipse at 50% 50%, #718096 0%, transparent 60%)',
                bgBase: 'linear-gradient(160deg, #edf2f7 0%, #a0aec0 35%, #4a5568 65%, #2d3748 100%)'
            }
        ];

        let currentTheme = 1;
        const themeBtn = document.getElementById('themeBtn');

        function applyTheme(index) {
            const t = themes[index];
            const r = document.documentElement.style;
            r.setProperty('--lamp-deep', t.deep);
            r.setProperty('--lamp-mid', t.mid);
            r.setProperty('--lamp-warm', t.warm);
            r.setProperty('--lamp-soft', t.soft);
            r.setProperty('--lamp-glow', t.glow);
            r.setProperty('--white', t.white);
            r.setProperty('--text', t.text);
            r.setProperty('--text-dim', t.textDim);
            r.setProperty('--toolbar-bg', t.toolbarBg);
            r.setProperty('--bg-layer1', t.bgLayer1);
            r.setProperty('--bg-layer2', t.bgLayer2);
            r.setProperty('--bg-layer3', t.bgLayer3);
            r.setProperty('--bg-base', t.bgBase);
        }

        // Apply Midnight Moon on load
        applyTheme(currentTheme);

        themeBtn.addEventListener('click', () => {
            currentTheme = (currentTheme + 1) % themes.length;
            applyTheme(currentTheme);
        });

        /* (Star Card system removed) */
        /* ══════════════════════════════════════════════
           Minimal / Full Mode Toggle (iOS 14 switch)
           ══════════════════════════════════════════════ */

        const modeToggle = document.getElementById('modeToggle');
        const labelFull = document.getElementById('labelFull');
        const labelMin = document.getElementById('labelMin');

        modeToggle.addEventListener('change', () => {
            if (modeToggle.checked) {
                document.body.classList.add('minimal-mode');
                labelFull.classList.remove('active-label');
                labelMin.classList.add('active-label');
            } else {
                document.body.classList.remove('minimal-mode');
                labelFull.classList.add('active-label');
                labelMin.classList.remove('active-label');
            }
        });

        // ◆ toolbar button toggles minimal mode
        const minimalBtn = document.getElementById('minimalBtn');
        minimalBtn.addEventListener('click', () => {
            modeToggle.checked = !modeToggle.checked;
            modeToggle.dispatchEvent(new Event('change'));
            minimalBtn.classList.toggle('active', modeToggle.checked);
        });

        /* ══════════════════════════════════════════════
           Wing Drop Input → /c19-asst-change-wing
           ══════════════════════════════════════════════ */

        const wingToast = document.getElementById('wingToast');
        let toastTimer = null;

        function showWingToast(msg, cmd) {
            wingToast.innerHTML = msg + (cmd ? '<span class="toast-cmd">' + cmd + '</span>' : '');
            wingToast.classList.add('visible');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => wingToast.classList.remove('visible'), 5000);
        }

        function handleWingPrompt(inputEl) {
            const text = inputEl.value.trim();
            if (!text) return;
            inputEl.value = '';

            const cmd = 'claude "/c19-asst-change-wing" --prompt "' + text.replace(/"/g, '\\"') + '"';

            // Try to copy command to clipboard automatically
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(cmd).then(() => {
                    showWingToast('Copied to clipboard — paste in terminal ↓', cmd);
                }).catch(() => {
                    showWingToast('Run this in your terminal ↓', cmd);
                });
            } else {
                showWingToast('Run this in your terminal ↓', cmd);
            }
        }

        // Left wing input
        document.getElementById('leftPromptInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); handleWingPrompt(e.target); }
        });
        document.getElementById('leftPromptSend').addEventListener('click', () => {
            handleWingPrompt(document.getElementById('leftPromptInput'));
        });

        // Right wing input
        document.getElementById('rightPromptInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); handleWingPrompt(e.target); }
        });
        document.getElementById('rightPromptSend').addEventListener('click', () => {
            handleWingPrompt(document.getElementById('rightPromptInput'));
        });

        /* ══════════════════════════════════════════════
           Wing Pill Style Cycler
           4 modes: Standard → Quiet → Glass → Neo
           ══════════════════════════════════════════════ */

        const pillStyles = ['standard', 'quiet', 'glass', 'neo'];
        const pillStyleLabels = ['■', '□', '◈', '◼'];
        const wingStyleState = { left: 0, right: 0 };

        function cyclePillStyle(wing) {
            const wingEl = elements['wing' + wing.charAt(0).toUpperCase() + wing.slice(1)];
            const btn = document.getElementById(wing + 'StyleBtn');

            // Remove current style class
            pillStyles.forEach(s => wingEl.classList.remove('pill-style-' + s));

            // Advance to next
            wingStyleState[wing] = (wingStyleState[wing] + 1) % pillStyles.length;
            const newStyle = pillStyles[wingStyleState[wing]];

            // Apply new style (standard = no class needed)
            if (newStyle !== 'standard') {
                wingEl.classList.add('pill-style-' + newStyle);
            }

            // Update button icon
            btn.textContent = pillStyleLabels[wingStyleState[wing]];

            // style applied
        }

        document.getElementById('leftStyleBtn').addEventListener('click', () => cyclePillStyle('left'));
        document.getElementById('rightStyleBtn').addEventListener('click', () => cyclePillStyle('right'));

        /* ══════════════════════════════════════════════
           TileManager — Dynamic Sales Funnel Tiles
           ══════════════════════════════════════════════ */


        const TileManager = {

            activeTileId: null,

            create(sourceData = {}) {
                if (state.tiles.length >= state.maxTiles) {
                    showWingToast('Max tiles reached (' + state.maxTiles + ')');
                    return null;
                }

                const id = state.nextTileId++;
                const tileData = {
                    id,
                    client: sourceData.client || '',
                    service: sourceData.service || '',
                    package: sourceData.package || '',
                    price: sourceData.price || '',
                    timeline: sourceData.timeline || '',
                    sourceType: sourceData.sourceType || 'manual',
                    sourceIcon: sourceData.sourceIcon || '➤',
                    sourceLabel: sourceData.sourceLabel || 'New Order',
                    orders: [],
                    discount: 0,
                    subtotal: 0,
                    grandTotal: 0
                };

                state.tiles.push(tileData);
                document.body.classList.add('tile-active');
                this.addSwitcherButton(tileData);
                // Auto-show tiles container when first tile created
                if (state.tiles.length === 1) {
                    document.getElementById('activeTilesContainer').style.display = 'block';
                }
                this.switchTo(id);
                return tileData;
            },

            addSwitcherButton(tileData) {
                var bar = document.getElementById('tileSwitcherBar');
                var btn = document.createElement('button');
                btn.className = 'tile-switcher-btn';
                btn.id = 'switcher-btn-' + tileData.id;
                btn.textContent = tileData.sourceIcon;
                btn.title = tileData.sourceLabel;
                btn.onclick = function() { TileManager.switchTo(tileData.id); };
                bar.appendChild(btn);
            },

            removeSwitcherButton(tileId) {
                var btn = document.getElementById('switcher-btn-' + tileId);
                if (btn) btn.remove();
            },

            saveCurrentFields() {
                if (this.activeTileId === null) return;
                var tilesToSave = this.activeTileId === 'all'
                    ? state.tiles
                    : state.tiles.filter(function(t) { return t.id === TileManager.activeTileId; });
                var fields = ['client', 'price', 'timeline'];
                tilesToSave.forEach(function(tile) {
                    fields.forEach(function(f) {
                        var input = document.getElementById('tile-' + tile.id + '-' + f);
                        if (input) tile[f] = input.value;
                    });
                });
            },

            showAll() {
                this.saveCurrentFields();
                this.activeTileId = 'all';
                var container = document.getElementById('activeTilesContainer');
                container.innerHTML = '';

                var self = this;
                state.tiles.forEach(function(tileData) {
                    self.render(tileData);
                });

                // Update switcher bar active states
                document.querySelectorAll('.tile-switcher-btn').forEach(function(btn) {
                    btn.classList.remove('active');
                });
                var allBtn = document.getElementById('switcher-btn-all');
                if (allBtn) allBtn.classList.add('active');
            },

            switchTo(tileId) {
                this.saveCurrentFields();
                var container = document.getElementById('activeTilesContainer');
                var tileData = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tileData) return;

                var self = this;
                this.activeTileId = tileId;

                // Update switcher bar active states
                document.querySelectorAll('.tile-switcher-btn').forEach(function(btn) {
                    btn.classList.remove('active');
                });
                var activeBtn = document.getElementById('switcher-btn-' + tileId);
                if (activeBtn) activeBtn.classList.add('active');

                var oldTile = container.querySelector('.active-tile');
                if (oldTile) {
                    // Carousel: slide old tile out, then slide new one in
                    oldTile.classList.add('tile-exit');
                    oldTile.addEventListener('animationend', function handler() {
                        oldTile.removeEventListener('animationend', handler);
                        container.innerHTML = '';
                        self.render(tileData);
                        var newTile = container.querySelector('.active-tile');
                        if (newTile) newTile.classList.add('tile-enter');
                        // Restore POS ledger
                        if (typeof InlinePOS !== 'undefined') {
                            InlinePOS.updateLedger(tileId);
                        }
                    });
                } else {
                    container.innerHTML = '';
                    this.render(tileData);
                    // Restore POS ledger
                    if (typeof InlinePOS !== 'undefined') {
                        InlinePOS.updateLedger(tileId);
                    }
                }
            },

            render(tileData) {
                const container = document.getElementById('activeTilesContainer');
                const el = document.createElement('div');
                el.className = 'active-tile';
                el.id = 'tile-' + tileData.id;
                el.innerHTML =
                    '<div class="active-tile-header">' +
                        '<div class="active-tile-header-info">' +
                            '<div class="active-tile-header-icon">' + tileData.sourceIcon + '</div>' +
                            '<div>' +
                                '<div class="active-tile-header-text">' + tileData.sourceLabel + '</div>' +
                                '<div class="active-tile-header-sub">ORDER #' + String(tileData.id).padStart(4, '0') + '</div>' +
                            '</div>' +
                        '</div>' +
                        '<button class="active-tile-close" onclick="TileManager.destroy(' + tileData.id + ')">✕</button>' +
                    '</div>' +
                    '<div class="funnel-body">' +
                        '<div class="funnel-field">' +
                            '<label class="funnel-label">Client Name</label>' +
                            '<input class="funnel-input" type="text" placeholder="Enter client name..." ' +
                                'value="' + tileData.client + '" ' +
                                'oninput="TileManager.updateField(' + tileData.id + ', \'client\', this.value)" ' +
                                'id="tile-' + tileData.id + '-client">' +
                        '</div>' +
                        '<div class="funnel-field">' +
                            '<label class="funnel-label">Package</label>' +
                            '<div class="funnel-packages" id="tile-' + tileData.id + '-packages">' +
                                pricingCatalog.packages.map(function(pkg) {
                                    return '<div class="funnel-pkg-pill' + (tileData.package === pkg.name ? ' selected' : '') + '" ' +
                                        'onclick="TileManager.selectPackage(' + tileData.id + ', \'' + pkg.name + '\', \'' + pkg.price + '\')">' +
                                        pkg.name + '</div>';
                                }).join('') +
                            '</div>' +
                        '</div>' +
                        '<div class="funnel-field">' +
                            '<label class="funnel-label">Price</label>' +
                            '<input class="funnel-input" type="text" placeholder="$0.00" ' +
                                'value="' + tileData.price + '" ' +
                                'oninput="TileManager.updateField(' + tileData.id + ', \'price\', this.value)" ' +
                                'id="tile-' + tileData.id + '-price">' +
                        '</div>' +
                        '<div class="funnel-field">' +
                            '<label class="funnel-label">Timeline</label>' +
                            '<input class="funnel-input" type="date" ' +
                                'value="' + tileData.timeline + '" ' +
                                'oninput="TileManager.updateField(' + tileData.id + ', \'timeline\', this.value)" ' +
                                'id="tile-' + tileData.id + '-timeline">' +
                        '</div>' +
                    '</div>' +
                    /* — Summary Orb + POS Panel — */
                    '<div class="pos-orb-wrap">' +
                        '<div class="pos-orb" onclick="TileManager.toggleOrbPanel(' + tileData.id + ')" title="Toggle checkout">' +
                            '<span class="pos-orb-total" id="tile-' + tileData.id + '-orb-total">$0</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="pos-orb-panel" id="tile-' + tileData.id + '-orb-panel">' +
                        '<div class="pos-strip" id="tile-' + tileData.id + '-pos">' +
                            '<div class="pos-strip-header">' +
                                '<span class="pos-strip-title">Checkout</span>' +
                                '<span class="pos-strip-count" id="tile-' + tileData.id + '-pos-count">0 items</span>' +
                            '</div>' +
                            '<div class="pos-strip-search-wrap">' +
                                '<input class="pos-strip-search" type="text" placeholder="Search services..." ' +
                                    'oninput="InlinePOS.handleSearch(' + tileData.id + ', this.value)" ' +
                                    'id="tile-' + tileData.id + '-pos-search">' +
                                '<div class="pos-strip-results" id="tile-' + tileData.id + '-pos-results"></div>' +
                            '</div>' +
                            '<div class="pos-strip-ledger" id="tile-' + tileData.id + '-pos-ledger"></div>' +
                            '<div class="pos-strip-totals">' +
                                '<div>' +
                                    '<div class="pos-strip-total-label">Total</div>' +
                                    '<div class="pos-strip-discount">' +
                                        '<span style="color:rgba(255,255,255,0.3);font-size:0.55rem;">Discount</span>' +
                                        '<input class="pos-strip-discount-input" type="number" placeholder="0%" ' +
                                            'oninput="InlinePOS.setDiscount(' + tileData.id + ', this.value)" ' +
                                            'id="tile-' + tileData.id + '-pos-discount">' +
                                    '</div>' +
                                '</div>' +
                                '<span class="pos-strip-total-amount" id="tile-' + tileData.id + '-pos-total">$0</span>' +
                            '</div>' +
                            '<button class="pos-strip-lock" onclick="InlinePOS.lockOrder(' + tileData.id + ')">Lock Order</button>' +
                        '</div>' +
                    '</div>';

                container.appendChild(el);

                // Auto-focus client name if empty
                if (!tileData.client) {
                    setTimeout(function() {
                        var ci = document.getElementById('tile-' + tileData.id + '-client');
                        if (ci) ci.focus();
                    }, 400);
                }
            },

            updateField(tileId, field, value) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (tile) {
                    tile[field] = value;
                    var input = document.getElementById('tile-' + tileId + '-' + field);
                    if (input) input.classList.toggle('filled', value.trim().length > 0);
                }
            },

            selectPackage(tileId, packageName, packagePrice) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tile) return;

                tile.package = packageName;
                if (packagePrice !== 'TBD') {
                    tile.price = packagePrice;
                    var priceInput = document.getElementById('tile-' + tileId + '-price');
                    if (priceInput) {
                        priceInput.value = packagePrice;
                        priceInput.classList.add('filled');
                    }
                }

                var pkgContainer = document.getElementById('tile-' + tileId + '-packages');
                if (pkgContainer) {
                    pkgContainer.querySelectorAll('.funnel-pkg-pill').forEach(function(pill) {
                        pill.classList.toggle('selected', pill.textContent.trim() === packageName);
                    });
                }
            },

            destroy(tileId) {
                // Find the tile's sourceLabel before removing from state
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                var label = tile ? tile.sourceLabel : null;

                this.removeSwitcherButton(tileId);
                state.tiles = state.tiles.filter(function(t) { return t.id !== tileId; });

                if (state.tiles.length === 0) {
                    document.body.classList.remove('tile-active');
                    document.getElementById('activeTilesContainer').innerHTML = '';
                    this.activeTileId = null;
                    document.getElementById('activeTilesContainer').style.display = 'none';
                } else if (this.activeTileId === tileId) {
                    this.switchTo(state.tiles[0].id);
                }
            },

            getOrCreate(sourceData) {
                var emptyTile = state.tiles.find(function(t) { return !t.client && !t.service; });
                if (emptyTile) {
                    // Update the switcher button icon/label for the reused tile
                    emptyTile.sourceIcon = sourceData.sourceIcon || emptyTile.sourceIcon;
                    emptyTile.sourceLabel = sourceData.sourceLabel || emptyTile.sourceLabel;
                    var btn = document.getElementById('switcher-btn-' + emptyTile.id);
                    if (btn) {
                        btn.textContent = emptyTile.sourceIcon;
                        btn.title = emptyTile.sourceLabel;
                    }
                    this.populateFromSource(emptyTile.id, sourceData);
                    // Ensure tiles container is visible
                    document.getElementById('activeTilesContainer').style.display = 'block';
                    this.switchTo(emptyTile.id);
                    return emptyTile;
                }
                return this.create(sourceData);
            },

            updateOrb(tileId) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tile) return;
                var orbTotal = document.getElementById('tile-' + tileId + '-orb-total');
                if (orbTotal) {
                    var amount = tile.grandTotal || 0;
                    orbTotal.textContent = '$' + (amount > 999 ? (amount / 1000).toFixed(1) + 'k' : amount.toLocaleString());
                }
            },

            toggleOrbPanel(tileId) {
                var panel = document.getElementById('tile-' + tileId + '-orb-panel');
                if (panel) panel.classList.toggle('open');
            },

            populateFromSource(tileId, sourceData) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tile) return;

                if (sourceData.sourceType === 'client') {
                    tile.client = sourceData.client || sourceData.sourceLabel || '';
                    var input = document.getElementById('tile-' + tileId + '-client');
                    if (input) { input.value = tile.client; input.classList.add('filled'); }
                }
                else if (sourceData.sourceType === 'service') {
                    InlinePOS.addItem(tileId, {
                        name: sourceData.sourceLabel || 'Service',
                        price: sourceData.price || '$0'
                    });
                }
                else if (sourceData.sourceType === 'price') {
                    tile.price = sourceData.price || '';
                    var pi = document.getElementById('tile-' + tileId + '-price');
                    if (pi) { pi.value = tile.price; pi.classList.add('filled'); }
                }
                else if (sourceData.sourceType === 'supplier') {
                    var header = document.querySelector('#tile-' + tileId + ' .active-tile-header-text');
                    if (header) header.textContent += ' via ' + sourceData.sourceLabel;
                }
            }
        };

        /* ══════════════════════════════════════════════
           InlinePOS — Compact checkout strip logic
           ══════════════════════════════════════════════ */

        const InlinePOS = {

            handleSearch(tileId, query) {
                var results = document.getElementById('tile-' + tileId + '-pos-results');
                if (!results) return;

                if (!query.trim()) {
                    results.classList.remove('active');
                    return;
                }

                var matches = allServices.filter(function(item) {
                    return item.name.toLowerCase().includes(query.toLowerCase());
                });

                this.renderResults(tileId, matches);
            },

            promptCustomService(tileId) {
                var search = document.getElementById('tile-' + tileId + '-pos-search');
                var name = prompt('Enter Service Name:', search ? search.value : '');
                if (!name) return;
                var amount = prompt('Enter Amount (e.g. $500):', '$');
                if (!amount) return;
                this.addItem(tileId, { name: name, price: amount, category: 'custom' });
            },

            renderResults(tileId, matches) {
                var results = document.getElementById('tile-' + tileId + '-pos-results');
                results.innerHTML = '';

                // Always show "Add Custom Service..." first
                var customDiv = document.createElement('div');
                customDiv.className = 'pos-strip-result-item';
                customDiv.style.borderBottom = '1px solid var(--pos-primary)';
                customDiv.style.color = 'var(--pos-primary)';
                customDiv.style.fontWeight = '800';
                customDiv.innerHTML = '<span style="opacity:0.5;margin-right:8px;">+</span> Add Custom Service...';
                customDiv.onclick = function() { InlinePOS.promptCustomService(tileId); };
                results.appendChild(customDiv);

                matches.slice(0, 10).forEach(function(match) {
                    var div = document.createElement('div');
                    div.className = 'pos-strip-result-item';
                    div.innerHTML = '<span>' + match.name + ' - ' + match.price + '</span>';
                    div.onclick = function() { InlinePOS.addItem(tileId, match); };
                    results.appendChild(div);
                });

                results.classList.add('active');
            },

            addItem(tileId, item) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tile) return;

                tile.orders.push({ name: item.name, price: item.price });

                var search = document.getElementById('tile-' + tileId + '-pos-search');
                if (search) search.value = '';
                var results = document.getElementById('tile-' + tileId + '-pos-results');
                if (results) results.classList.remove('active');

                this.updateLedger(tileId);
            },

            removeItem(tileId, index) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tile) return;

                tile.orders.splice(index, 1);
                this.updateLedger(tileId);
            },

            updateLedger(tileId) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tile) return;

                var ledger = document.getElementById('tile-' + tileId + '-pos-ledger');
                if (!ledger) return;

                ledger.innerHTML = '';
                var subtotal = 0;

                tile.orders.forEach(function(order, index) {
                    var div = document.createElement('div');
                    div.className = 'pos-strip-item';
                    div.innerHTML = '<span class="pos-strip-item-name">' + order.name + '</span>' +
                        '<div style="display:flex;align-items:center;">' +
                            '<span class="pos-strip-item-price">' + order.price + '</span>' +
                            '<button class="pos-strip-item-delete" onclick="InlinePOS.removeItem(' + tileId + ',' + index + ')">✕</button>' +
                        '</div>';
                    ledger.appendChild(div);
                    subtotal += parseFloat(order.price.replace(/[$,]/g, '')) || 0;
                });

                var discountVal = subtotal * (tile.discount / 100);
                var total = subtotal - discountVal;

                tile.subtotal = subtotal;
                tile.grandTotal = total;

                var count = document.getElementById('tile-' + tileId + '-pos-count');
                if (count) count.textContent = tile.orders.length + ' item' + (tile.orders.length !== 1 ? 's' : '');

                var totalEl = document.getElementById('tile-' + tileId + '-pos-total');
                if (totalEl) totalEl.textContent = '$' + total.toLocaleString();

                // Update orb face with running total
                TileManager.updateOrb(tileId);
            },

            setDiscount(tileId, value) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tile) return;
                tile.discount = parseFloat(value) || 0;
                this.updateLedger(tileId);
            },

            lockOrder(tileId) {
                var tile = state.tiles.find(function(t) { return t.id === tileId; });
                if (!tile) return;

                if (tile.orders.length === 0) {
                    showWingToast('Add at least one service to the order');
                    return;
                }

                var date = new Date().toLocaleDateString();
                var clientName = tile.client || 'Client';

                var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
                    '<meta name="viewport" content="width=device-width,initial-scale=1.0">' +
                    '<title>Order Protocol | ' + clientName + '</title>' +
                    '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">' +
                    '<style>body{background:#020617;color:#fff;font-family:\'Outfit\',sans-serif;padding:4rem;display:flex;justify-content:center}' +
                    '.card{width:100%;max-width:700px;background:rgba(15,23,42,0.9);border:2px solid #38bdf8;border-radius:32px;padding:3rem;box-shadow:0 50px 100px rgba(0,0,0,0.5)}' +
                    '.meta{color:#38bdf8;font-family:\'JetBrains Mono\';font-size:0.8rem;letter-spacing:3px;margin-top:5px}' +
                    '.label{font-size:0.65rem;text-transform:uppercase;letter-spacing:4px;color:rgba(255,255,255,0.4);margin-bottom:0.5rem;display:block}' +
                    '.item{display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid rgba(255,255,255,0.05)}' +
                    '.price{color:#38bdf8;font-family:\'JetBrains Mono\';font-weight:700}' +
                    '.footer{border-top:2px solid #38bdf8;padding-top:1.5rem;margin-top:1.5rem;display:flex;justify-content:space-between;align-items:center}' +
                    '.total{font-size:2.5rem;font-weight:900;color:#38bdf8}</style></head><body>' +
                    '<div class="card"><h1 style="font-size:2rem;letter-spacing:-1px;margin:0;">Order Protocol</h1>' +
                    '<div class="meta">EST. ' + date + ' // FOR ' + clientName.toUpperCase() + '</div>' +
                    (tile.package ? '<div style="margin:2rem 0;"><span class="label">Package</span><div style="font-weight:800;font-size:1.1rem;">' + tile.package + '</div></div>' : '') +
                    '<div style="margin:2rem 0;"><span class="label">Service Stack</span>' +
                    tile.orders.map(function(o) { return '<div class="item"><span>' + o.name + '</span><span class="price">' + o.price + '</span></div>'; }).join('') +
                    '</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin:2rem 0;">' +
                    '<div><span class="label">Timeline</span><div style="font-weight:800;">' + (tile.timeline || 'TBD') + '</div></div>' +
                    '<div><span class="label">Discount</span><div style="font-weight:800;color:#f43f5e;">' + tile.discount + '% OFF</div></div>' +
                    '</div><div class="footer"><span style="font-weight:800;text-transform:uppercase;letter-spacing:4px;">Total</span>' +
                    '<div class="total">$' + tile.grandTotal.toLocaleString() + '</div></div></div></body></html>';

                var blob = new Blob([html], { type: 'text/html' });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'ORDER_' + clientName.replace(/\s+/g, '_').toUpperCase() + '_' + Date.now() + '.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                var lockBtn = document.querySelector('#tile-' + tileId + ' .pos-strip-lock');
                if (lockBtn) {
                    lockBtn.textContent = 'ORDER LOCKED ✓';
                    lockBtn.style.background = '#10b981';
                    setTimeout(function() {
                        lockBtn.textContent = 'Lock Order';
                        lockBtn.style.background = '';
                    }, 2000);
                }
            }
        };

        /* ══════════════════════════════════════════════
           Notch 2 — Action Registry Builder
           Reads pillData and populates accordion rows

           ⚠️  KEEP IN SYNC ⚠️
           If ANY button's left-click or right-click handler
           is added, changed, or removed ANYWHERE in this file,
           the matching makeRow() call below MUST be updated
           so the registry phrase stays accurate.
           L-click / R-click → registry keeps pace.
           ══════════════════════════════════════════════ */

        (function initActionRegistry() {
            const sectionNamesLeft = ['AAS Flow', 'Leads', 'Biz Building', 'General Tools', 'Contacts', 'Suppliers'];
            const sectionNamesRight = ['Pipeline', 'AI Tools', 'Comms', 'My Tools'];

            // Build rows for a wing
            function buildRows(wing, sectionNames) {
                const rows = [];
                sectionNames.forEach(function(secName, idx) {
                    // Page group label
                    rows.push('<div class="ar-page-label">' + secName + '</div>');

                    if (wing === 'right' && idx === 0) {
                        // Pipeline — pills are in HTML, not pillData
                        const pipeButtons = [
                            { label: 'Button 1',           lClick: 'toggle status',                rClick: null },
                            { label: 'Button 2',           lClick: 'load client to journey card',  rClick: 'load client to journey card' },
                            { label: 'Proposal Generator', lClick: 'open in AppViewer',            rClick: 'open in AppViewer' },
                            { label: 'Cal Card',            lClick: 'open in AppViewer',            rClick: 'open in AppViewer' }
                        ];
                        pipeButtons.forEach(function(btn) {
                            rows.push(makeRow(btn.label, btn.lClick, btn.rClick));
                        });
                    } else {
                        var pills = pillData[wing] && pillData[wing][idx];
                        if (pills && Array.isArray(pills)) {
                            pills.forEach(function(p) {
                                rows.push(makeRow(p.label, null, null));
                            });
                        }
                    }
                });
                return rows;
            }

            function makeRow(name, lClick, rClick) {
                var notSet = '\u2014 not set \u2014';
                var lText = lClick || notSet;
                var rText = rClick || notSet;
                var lClass = lClick ? 'ar-action-text has-action' : 'ar-action-text';
                var rClass = rClick ? 'ar-action-text has-action' : 'ar-action-text';
                return '<div class="ar-row">' +
                    '<div class="ar-row-name">' + escHtml(name) + '</div>' +
                    '<div class="ar-row-actions">' +
                        '<div class="ar-action-line">' +
                            '<span class="ar-click-label l-click">L-click:</span>' +
                            '<span class="' + lClass + '">' + escHtml(lText) + '</span>' +
                        '</div>' +
                        '<div class="ar-action-line">' +
                            '<span class="ar-click-label r-click">R-click:</span>' +
                            '<span class="' + rClass + '">' + escHtml(rText) + '</span>' +
                        '</div>' +
                    '</div>' +
                    '</div>';
            }

            function escHtml(s) {
                var d = document.createElement('div');
                d.textContent = s;
                return d.innerHTML;
            }

            // Populate left wing
            var leftRows = buildRows('left', sectionNamesLeft);
            var leftBody = document.getElementById('arLeftBody');
            if (leftBody) {
                leftBody.innerHTML = leftRows.join('');
                var leftCount = leftBody.querySelectorAll('.ar-row').length;
                var leftCountEl = document.getElementById('arLeftCount');
                if (leftCountEl) leftCountEl.textContent = leftCount + ' buttons';
            }

            // Populate right wing
            var rightRows = buildRows('right', sectionNamesRight);
            var rightBody = document.getElementById('arRightBody');
            if (rightBody) {
                rightBody.innerHTML = rightRows.join('');
                var rightCount = rightBody.querySelectorAll('.ar-row').length;
                var rightCountEl = document.getElementById('arRightCount');
                if (rightCountEl) rightCountEl.textContent = rightCount + ' buttons';
            }

            // Accordion toggle — only one section open at a time
            var headers = document.querySelectorAll('.ar-section-header');
            headers.forEach(function(header) {
                header.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var targetSection = header.getAttribute('data-ar-section');
                    var isOpen = header.classList.contains('open');

                    // Close all sections first
                    headers.forEach(function(h) {
                        h.classList.remove('open');
                        var body = h.parentElement.querySelector('.ar-section-body');
                        if (body) body.classList.remove('open');
                    });

                    // If it wasn't open, open it
                    if (!isOpen) {
                        header.classList.add('open');
                        var body = header.parentElement.querySelector('.ar-section-body');
                        if (body) body.classList.add('open');
                    }
                });
            });
        })();

        /* ══════════════════════════════════════════════
           App Descriptions — 3rd Accordion Section
           Nested expandable app rows with 4 mini-sections
           ══════════════════════════════════════════════ */

        (function initAppDescriptions() {
            var appList = [
                { name: 'Proposal Generator', tag: 'chad22', bullets: {
                    how: ['Mappe...','Maste...','Mappe...','Group...'],
                    feat: ['Dual-...','Pipel...','Integ...','AWS E...'],
                    clever: ['Combi...','Propo...','Every...','Pipel...'],
                    intent: ['Build...','KEY T...','Mappe...','Auto-...']
                }},
                { name: 'Client Journey Card', tag: 'built-in', bullets: {
                    how: ['Split...','Left ...','Right...','Red \u25C6...'],
                    feat: ['Clien...','5 set...','6 cus...','Pipel...'],
                    clever: ['Centr...','Per-c...','Mutu...','Foote...'],
                    intent: ['Per-c...','Activ...','Track...','Displ...']
                }},
                { name: 'Artist Matrix', tag: 'chad20', bullets: {
                    how: ['Infin...','Each ...','Node ...','CSS v...'],
                    feat: ['Unive...','Inlin...','Scale...','Spoti...'],
                    clever: ['Matri...','Unive...','Inlin...','Spoti...'],
                    intent: ['Side-...','Matri...','Strat...','Livin...']
                }},
                { name: 'Wing Dashboard', tag: 'this app', bullets: {
                    how: ['Left/...','Cente...','Notch...','Pipel...'],
                    feat: ['Pill-...','Star ...','Drop ...','Theme...'],
                    clever: ['Unifi...','Full ...','Actio...','Singl...'],
                    intent: ['Centr...','On-ca...','Real-...','Clien...']
                }},
                { name: 'Task Manager', tag: 'chad1', bullets: {
                    how: ['Singl...','Tasks...','Cards...','local...'],
                    feat: ['Check...','Blurr...','Stick...','Compa...'],
                    clever: ['Blur-...','Hover...','Singl...','Zero ...'],
                    intent: ['Daily...','Reduc...','Simpl...','Porta...']
                }},
                { name: 'Railroader / MAPPER', tag: 'chad7a', bullets: {
                    how: ['2-col...','Glass...','Group...','Passw...'],
                    feat: ['Group...','Passw...','Secti...','Mini ...'],
                    clever: ['Missi...','Group...','Secti...','Passw...'],
                    intent: ['Singl...','Elimi...','Workf...','Passw...']
                }},
                { name: 'Call Card', tag: 'chad14', bullets: {
                    how: ['Sideb...','Main ...','Slide...','Parti...'],
                    feat: ['3D sl...','Breat...','Speci...','Multi...'],
                    clever: ['Prese...','Sideb...','3D tr...','Breat...'],
                    intent: ['Clien...','Used ...','Premi...','Purpl...']
                }},
                { name: 'Data Dump', tag: 'chad23', bullets: {
                    how: ['Evolu...','Spoti...','Conve...','Stack...'],
                    feat: ['Artis...','Conve...','Stack...','Laser...'],
                    clever: ['Conve...','Artis...','Stack...','Ultra...'],
                    intent: ['Clien...','Conve...','Spoti...','Struc...']
                }},
                { name: 'Campaign Dashboard', tag: 'chad24', bullets: {
                    how: ['Tailw...','Parti...','Auto-...','Maste...'],
                    feat: ['Dark/...','3D st...','Stage...','Auto-...'],
                    clever: ['Stage...','Auto-...','Dark/...','Dual-...'],
                    intent: ['Activ...','Stage...','Auto-...','Dual ...']
                }},
                { name: 'Spotify Ads Manager', tag: 'chad31', bullets: {
                    how: ['Stage...','Phase...','Stat ...','Incen...'],
                    feat: ['Phase...','Phase...','Ultra...','Sub-t...'],
                    clever: ['Stage...','Predi...','Equil...','Marqu...'],
                    intent: ['Produ...','CRITI...','Multi...','Daily...']
                }},
                { name: 'Spotify Cataloger', tag: 'chad10', bullets: {
                    how: ['Three...','Main ...','Histo...','Six c...'],
                    feat: ['Dual ...','Album...','Embed...','Six-d...'],
                    clever: ['Combi...','Dual ...','Album...','Six-d...'],
                    intent: ['Track...','Quick...','Histo...','Cloud...']
                }},
                { name: 'On The Move', tag: 'chad21', bullets: {
                    how: ['Mobil...','Tab b...','Scree...','Focus...'],
                    feat: ['3D fl...','Focus...','Text ...','Mesh ...'],
                    clever: ['Super...','Cinem...','Flopp...','Exter...'],
                    intent: ['Defin...','On th...','Recap...','Super...']
                }},
                { name: 'On-the-Go Handy', tag: 'chad15', bullets: {
                    how: ['Mobil...','Tab b...','Scree...','Overl...'],
                    feat: ['3D fl...','Cente...','Focus...','Text ...'],
                    clever: ['Mobil...','Tab b...','Focus...','Impor...'],
                    intent: ['On-th...','Phone...','Text ...','Recap...']
                }},
                { name: 'Best Deck Ever', tag: 'chad16', bullets: {
                    how: ['Multi...','Dashb...','Sideb...','Sub-p...'],
                    feat: ['Modul...','Ocean...','Campa...','Data ...'],
                    clever: ['Multi...','Share...','13+ s...','JSON ...'],
                    intent: ['Compl...','Each ...','Deck ...','Most ...']
                }},
                { name: 'Presentation Card', tag: 'chad23', bullets: {
                    how: ['Drag-...','Drop ...','Each ...','Cards...'],
                    feat: ['Image...','Pan-a...','Anima...','Card ...'],
                    clever: ['Scree...','Zoom/...','Premi...','Respo...'],
                    intent: ['Quick...','Clien...','Repla...','Anima...']
                }},
                { name: 'PR Dashboard', tag: 'chad11', bullets: {
                    how: ['Termi...','Phase...','Campa...','Conta...'],
                    feat: ['Airpo...','Progr...','Tiere...','Rolle...'],
                    clever: ['Termi...','Phase...','Stick...','Light...'],
                    intent: ['PR ca...','Conta...','Grid ...','Clean...']
                }},
                { name: 'Offboarding Report', tag: 'chad12', bullets: {
                    how: ['Artis...','Month...','Cards...','html2...'],
                    feat: ['PDF e...','Month...','Type-...','Edita...'],
                    clever: ['Offbo...','PDF g...','Month...','Type-...'],
                    intent: ['End-o...','Tange...','Month...','Polis...']
                }}
            ];

            var miniSections = ['How It Works', 'Unique Features', 'Clever Solution', 'Intent for Chad'];
            var secKeys = ['how', 'feat', 'clever', 'intent'];

            function buildAppRows() {
                var html = '';
                appList.forEach(function(app, idx) {
                    html += '<div class="ar-app-row" data-app-idx="' + idx + '">';
                    html += '<span class="ar-app-chevron">\u25B8</span>';
                    html += '<span class="ar-app-name">' + app.name + '</span>';
                    html += '<span class="ar-app-tag">' + app.tag + '</span>';
                    html += '</div>';

                    html += '<div class="ar-app-detail" data-app-detail="' + idx + '">';
                    miniSections.forEach(function(sec, si) {
                        html += '<div class="ar-mini-header">' + sec + '</div>';
                        var key = secKeys[si];
                        var bullets = app.bullets ? app.bullets[key] : null;
                        for (var b = 0; b < 4; b++) {
                            var txt = (bullets && bullets[b]) ? bullets[b] : '\u2014 not set \u2014';
                            html += '<div class="ar-bullet">' + txt + '</div>';
                        }
                    });
                    html += '</div>';
                });
                return html;
            }

            var appsBody = document.getElementById('arAppsBody');
            if (appsBody) {
                appsBody.innerHTML = buildAppRows();
                var countEl = document.getElementById('arAppsCount');
                if (countEl) countEl.textContent = appList.length + ' apps';
            }

            // Nested toggle: clicking an app row expands JUST that app
            if (appsBody) {
                appsBody.addEventListener('click', function(e) {
                    var row = e.target.closest('.ar-app-row');
                    if (!row) return;
                    e.stopPropagation();

                    var idx = row.getAttribute('data-app-idx');
                    var detail = appsBody.querySelector('[data-app-detail="' + idx + '"]');
                    var isOpen = row.classList.contains('app-open');

                    // Close all other app rows first
                    appsBody.querySelectorAll('.ar-app-row.app-open').forEach(function(r) {
                        r.classList.remove('app-open');
                    });
                    appsBody.querySelectorAll('.ar-app-detail.app-detail-open').forEach(function(d) {
                        d.classList.remove('app-detail-open');
                    });

                    // Toggle this one
                    if (!isOpen && detail) {
                        row.classList.add('app-open');
                        detail.classList.add('app-detail-open');
                    }
                });
            }
        })();

        /* ══════════════════════════════════════════════
           Wing Pill Activation — Click-to-Tile
           ══════════════════════════════════════════════ */

        function initWingPills() {
            var leftTypeMap = {
                'AAS Flow': 'client',
                'Leads': 'lead',
                'Biz Building': 'service',
                'General Tools': 'service',
                'Contacts': 'client',
                'Suppliers': 'supplier'
            };

            var rightTypeMap = {
                'AI Tools': 'ai-tool',
                'Comms': 'comms'
            };

            function bindPills(trackId, typeMap) {
                var sections = document.querySelectorAll('#' + trackId + ' .wing-section');
                sections.forEach(function(section) {
                    var labelEl = section.querySelector('.section-label');
                    if (!labelEl) return;
                    var sectionName = labelEl.textContent.trim();
                    var sourceType = typeMap[sectionName] || 'manual';

                    section.querySelectorAll('.pill').forEach(function(pill) {
                        pill.addEventListener('click', function(e) {
                            var label = pill.querySelector('.pill-label');
                            var sub = pill.querySelector('.pill-sub');
                            var icon = pill.querySelector('.pill-icon');

                            pill.classList.add('sending');
                            setTimeout(function() { pill.classList.remove('sending'); }, 500);

                            var sourceData = {
                                sourceType: sourceType,
                                sourceLabel: label ? label.textContent : 'Item',
                                sourceIcon: icon ? icon.textContent : '➤',
                                client: sourceType === 'client' ? (label ? label.textContent : '') : '',
                                service: sourceType === 'service' ? (label ? label.textContent : '') : '',
                                price: sourceType === 'price' ? (sub ? sub.textContent : '') : ''
                            };

                            TileManager.getOrCreate(sourceData);
                        });
                    });
                });
            }

            bindPills('leftTrack', leftTypeMap);
            bindPills('rightTrack', rightTypeMap);
        }

        /* ══════════════════════════════════════════════
           Test Button — Simulates Full POS Flow
           ══════════════════════════════════════════════ */

        document.getElementById('testPosBtn').addEventListener('click', function() {
            var tile = TileManager.create({
                sourceType: 'client',
                sourceLabel: 'Demo Client - Test Flow',
                sourceIcon: '⚡',
                client: 'John Smith',
                package: 'Gold',
                price: '$5,000',
                timeline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            });

            if (!tile) return;

            setTimeout(function() {
                var ci = document.getElementById('tile-' + tile.id + '-client');
                if (ci) { ci.value = 'John Smith'; ci.classList.add('filled'); }
            }, 300);

            setTimeout(function() {
                TileManager.selectPackage(tile.id, 'Gold', '$5,000');
            }, 600);

            setTimeout(function() {
                var pi = document.getElementById('tile-' + tile.id + '-price');
                if (pi) { pi.value = '$5,000'; pi.classList.add('filled'); }
            }, 900);

            setTimeout(function() {
                var ti = document.getElementById('tile-' + tile.id + '-timeline');
                var futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                if (ti) { ti.value = futureDate; ti.classList.add('filled'); }
            }, 1200);

            setTimeout(function() {
                InlinePOS.addItem(tile.id, { name: 'Press Campaign - Elite', price: '$3,500' });
            }, 1600);

            setTimeout(function() {
                InlinePOS.addItem(tile.id, { name: 'Playlist Push - Premium', price: '$800' });
            }, 2000);

            setTimeout(function() {
                InlinePOS.addItem(tile.id, { name: 'Social Media Campaign', price: '$1,200' });
            }, 2400);

            setTimeout(function() {
                var di = document.getElementById('tile-' + tile.id + '-pos-discount');
                if (di) di.value = '10';
                InlinePOS.setDiscount(tile.id, 10);
            }, 2800);
        });

        /* ══════════════════════════════════════════════
           Dynamic Island — Expand/Collapse
           Click bar = expand/collapse island
           ══════════════════════════════════════════════ */

        const notch = document.getElementById('notch');
        const notchBar = document.getElementById('notchBar');
        const notchLabel = notch.querySelector('.notch-label');
        let notchExpanded = false;
        let assistantActive = false;

        function toggleNotchExpand(e) {
            // Prevent expand toggle when clicking call-grid buttons, input, or queue
            if (e && e.target.closest('.call-btn')) return;
            if (e && e.target.closest('.call-auto-go')) return;
            if (e && e.target.closest('.cmd-input-wrap')) return;
            if (e && e.target.closest('.cmd-queue-wrap')) return;

            notchExpanded = !notchExpanded;

            if (notchExpanded) {
                notch.classList.remove('collapsing');
                notch.classList.add('expanded');
                notchLabel.textContent = 'Active';
                // Also activate assistant mode on expand
                notch.classList.add('active', 'ringing');
                document.body.classList.add('assistant-active');
                assistantActive = true;
                setTimeout(() => notch.classList.remove('ringing'), 600);
            } else {
                notch.classList.remove('expanded');
                notch.classList.add('collapsing');
                setTimeout(() => notch.classList.remove('collapsing'), 350);
                // Deactivate assistant on collapse
                notch.classList.remove('active');
                notchLabel.textContent = 'Standby';
                document.body.classList.remove('assistant-active');
                assistantActive = false;
            }
        }

        notchBar.addEventListener('click', toggleNotchExpand);

        /* ══════════════════════════════════════════════
           Second Mini Notch — Expand/Collapse
           Independent toggle, mirrors original behavior
           ══════════════════════════════════════════════ */

        const notch2 = document.getElementById('notch2');
        const notch2Bar = document.getElementById('notch2Bar');
        const notch2Label = notch2.querySelector('.notch-label');
        let notch2Expanded = false;

        function toggleNotch2Expand(e) {
            if (e && e.target.closest('.call-btn')) return;
            if (e && e.target.closest('.n2-txt-badge')) return;

            notch2Expanded = !notch2Expanded;

            if (notch2Expanded) {
                notch2.classList.remove('collapsing');
                notch2.classList.add('expanded');
                notch2Label.textContent = 'Active';
                notch2.classList.add('active', 'ringing');
                setTimeout(() => notch2.classList.remove('ringing'), 600);
            } else {
                notch2.classList.remove('expanded');
                notch2.classList.add('collapsing');
                setTimeout(() => notch2.classList.remove('collapsing'), 350);
                notch2.classList.remove('active');
                notch2Label.textContent = 'Standby';
                // Reset glossary view on collapse
                var gv = document.getElementById('n2GlossaryViewer');
                var ar = notch2.querySelector('.action-registry');
                if (gv) gv.classList.remove('visible');
                if (ar) ar.style.display = '';
            }
        }

        notch2Bar.addEventListener('click', toggleNotch2Expand);

        /* ══════════════════════════════════════════════
           Notch 2 — txt Badge → Library Glossary Viewer
           ══════════════════════════════════════════════ */
        (function() {
            const txtBtn = document.getElementById('n2TxtBtn');
            const glossaryViewer = document.getElementById('n2GlossaryViewer');
            const glossaryPre = document.getElementById('n2GlossaryPre');
            const glossaryBack = document.getElementById('n2GlossaryBack');
            const actionRegistry = notch2.querySelector('.action-registry');
            let glossaryLoaded = false;
            let glossaryText = '';

            const glossaryPath = '---- Anti Gravity ---- My Master Folder/'
                + '\u{1F48E}\u{1F48E} - - - beginning - - - \u{1F48E}\u{1F48E}/'
                + '\u{1F4D9}-- -- - -- \u{1F4D9} library/library-glossary.txt';

            txtBtn.addEventListener('click', function(e) {
                e.stopPropagation();

                // Auto-expand notch2 if collapsed
                if (!notch2Expanded) {
                    notch2Expanded = true;
                    notch2.classList.remove('collapsing');
                    notch2.classList.add('expanded', 'active');
                    notch2Label.textContent = 'Active';
                }

                // Show glossary, hide accordion
                actionRegistry.style.display = 'none';
                glossaryViewer.classList.add('visible');

                if (!glossaryLoaded) {
                    fetch(encodeURI(glossaryPath))
                        .then(function(r) {
                            if (!r.ok) throw new Error('HTTP ' + r.status);
                            return r.text();
                        })
                        .then(function(txt) {
                            glossaryText = txt;
                            glossaryPre.textContent = txt;
                            glossaryLoaded = true;
                        })
                        .catch(function(err) {
                            glossaryPre.textContent = 'Failed to load glossary:\n' + err.message
                                + '\n\nExpected path:\n' + glossaryPath;
                        });
                }
            });

            glossaryBack.addEventListener('click', function(e) {
                e.stopPropagation();
                glossaryViewer.classList.remove('visible');
                actionRegistry.style.display = '';
            });
        })();

        /* ══════════════════════════════════════════════
           Call Grid — Button Vibrate + Phrase Injection
           ══════════════════════════════════════════════ */

        const cmdInput = document.getElementById('cmdInput');
        const cmdSendBtn = document.getElementById('cmdSendBtn');
        const cmdQueueWrap = document.getElementById('cmdQueueWrap');
        const CMD_QUEUE_KEY = 'wingdash_command_queue';

        // Load queue from localStorage
        function loadCommandQueue() {
            try {
                return JSON.parse(localStorage.getItem(CMD_QUEUE_KEY) || '[]');
            } catch(e) { return []; }
        }

        function saveCommandQueue(queue) {
            localStorage.setItem(CMD_QUEUE_KEY, JSON.stringify(queue));
        }

        function renderCommandQueue() {
            var queue = loadCommandQueue();
            cmdQueueWrap.innerHTML = '';
            if (queue.length === 0) {
                cmdQueueWrap.innerHTML = '<div class="cmd-queue-empty">no queued commands</div>';
                return;
            }
            // Show max 5 visible, scrollable for more
            queue.forEach(function(item, idx) {
                var row = document.createElement('div');
                row.className = 'cmd-queue-item';

                var status = document.createElement('span');
                status.className = 'cmd-queue-status';
                status.textContent = item.sent ? '\u25CF' : '\u25CB';
                status.title = item.sent ? 'sent' : 'pending';

                var text = document.createElement('span');
                text.className = 'cmd-queue-text';
                text.textContent = item.phrase;
                text.title = item.phrase;

                var remove = document.createElement('button');
                remove.className = 'cmd-queue-remove';
                remove.textContent = '\u2715';
                remove.title = 'Remove';
                remove.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var q = loadCommandQueue();
                    q.splice(idx, 1);
                    saveCommandQueue(q);
                    renderCommandQueue();
                });

                row.appendChild(status);
                row.appendChild(text);
                row.appendChild(remove);
                cmdQueueWrap.appendChild(row);
            });
        }

        // Resolve [client] placeholder with activeClient if available
        function resolvePhrase(phrase) {
            if (typeof activeClient !== 'undefined' && activeClient && activeClient.name) {
                return phrase.replace(/\[client\]/g, activeClient.name);
            }
            return phrase;
        }

        // Send command: add to queue + copy to clipboard
        function sendCommand() {
            var phrase = cmdInput.value.trim();
            if (!phrase) return;

            // Add to queue
            var queue = loadCommandQueue();
            queue.push({ phrase: phrase, sent: false, ts: Date.now() });
            saveCommandQueue(queue);
            renderCommandQueue();

            // Copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(phrase).catch(function(){});
            }

            // Flash input
            cmdInput.classList.add('flash');
            setTimeout(function() { cmdInput.classList.remove('flash'); }, 350);

            // Clear input
            cmdInput.value = '';

            showWingToast('Copied: ' + phrase, 'cmd-queue');
        }

        // Call grid buttons: inject phrase into input
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Skip generic handling for buttons with their own handlers
                if (btn.dataset.action === 'add-client' || btn.dataset.action === 'add-client-order' || btn.dataset.action === 'create-presentation' || btn.dataset.action === 'mark-complete' || btn.dataset.action === 'add-presentation' || btn.dataset.action === 'add-order' || btn.dataset.action === 'create-payment-card') return;
                // Vibrate jiggle
                btn.classList.add('vibrating');
                setTimeout(() => btn.classList.remove('vibrating'), 300);

                // Inject phrase into command input
                var phrase = btn.dataset.phrase || ('run ' + btn.textContent.toLowerCase());
                phrase = resolvePhrase(phrase);
                cmdInput.value = phrase;
                cmdInput.focus();
            });
        });

        // Send button click
        cmdSendBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sendCommand();
        });

        // Enter key in input
        cmdInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                sendCommand();
            }
        });

        // Prevent input clicks from toggling notch
        cmdInput.addEventListener('click', function(e) { e.stopPropagation(); });

        // Initial queue render
        renderCommandQueue();

        /* ══════════════════════════════════════════════
           Launcher Button — Workspace Overlay Toggle
           Green glow circle left of notch
           ══════════════════════════════════════════════ */

        const launcher = document.getElementById('notchLauncher');
        const launcherLabel = document.getElementById('notchLauncherLabel');
        const launcherOverlay = document.getElementById('launcherOverlay');
        const launcherBackdrop = document.getElementById('launcherOverlayBackdrop');
        const launcherClose = document.getElementById('launcherOverlayClose');
        let launcherOpen = false;

        function openLauncherOverlay() {
            if (launcherOpen) return;
            launcherOpen = true;
            launcher.classList.add('launcher-active');
            launcherLabel.textContent = 'workspace open';

            // Show backdrop + overlay
            launcherBackdrop.style.display = 'block';
            launcherOverlay.style.display = 'flex';

            // Trigger reflow then animate in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    launcherBackdrop.classList.add('active');
                    launcherOverlay.classList.add('active');
                });
            });
        }

        function closeLauncherOverlay() {
            if (!launcherOpen) return;
            launcherOpen = false;
            launcher.classList.remove('launcher-active');
            launcherLabel.textContent = 'workspace';

            // Animate out
            launcherBackdrop.classList.add('closing');
            launcherOverlay.classList.add('closing');
            launcherBackdrop.classList.remove('active');
            launcherOverlay.classList.remove('active');

            setTimeout(() => {
                launcherBackdrop.classList.remove('closing');
                launcherOverlay.classList.remove('closing');
                launcherBackdrop.style.display = 'none';
                launcherOverlay.style.display = 'none';
            }, 350);
        }

        launcher.addEventListener('click', () => {
            if (launcherOpen) { closeLauncherOverlay(); } else { openLauncherOverlay(); }
        });

        launcherClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLauncherOverlay();
        });

        launcherBackdrop.addEventListener('click', () => {
            closeLauncherOverlay();
        });

        // Escape key closes the workspace overlay
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && launcherOpen) closeLauncherOverlay();
        });

        /* ══════════════════════════════════════════════
           Launcher Nav Dots — Screen Switching
           ══════════════════════════════════════════════ */

        const launcherScreenColors = ['blue', 'green', 'orange', 'purple', 'red'];
        const launcherScreenHexMap = { blue: '#0ea5e9', green: '#10b981', orange: '#f59e0b', purple: '#6366f1', red: '#ef4444' };
        const launcherDots = document.querySelectorAll('.launcher-nav-dot');
        const launcherScreens = [
            document.getElementById('launcherScreen0'),
            document.getElementById('launcherScreen1'),
            document.getElementById('launcherScreen3'),
            document.getElementById('launcherScreen4'),
            document.getElementById('launcherScreen5')
        ];
        const launcherFooterScreenLabel = document.getElementById('launcherFooterScreenLabel');

        // Restore last active screen from localStorage
        let launcherActiveScreen = parseInt(localStorage.getItem('launcherActiveScreen') || '0', 10);
        if (launcherActiveScreen < 0 || launcherActiveScreen > 4) launcherActiveScreen = 0;

        function switchLauncherScreen(index) {
            if (index === launcherActiveScreen) return;
            launcherActiveScreen = index;
            localStorage.setItem('launcherActiveScreen', index);

            // Update dots
            launcherDots.forEach(d => d.classList.remove('active'));
            launcherDots[index].classList.add('active');

            // Update screens — crossfade
            launcherScreens.forEach(s => s.classList.remove('active'));
            launcherScreens[index].classList.add('active');

            // Update footer label
            const colorName = launcherScreenColors[index];
            launcherFooterScreenLabel.innerHTML =
                '<span class="launcher-footer-color-dot" style="background:' + launcherScreenHexMap[colorName] + ';"></span> screen ' + (index + 1);
        }

        // Set initial state from localStorage (on load)
        (function initLauncherScreens() {
            launcherDots.forEach(d => d.classList.remove('active'));
            launcherScreens.forEach(s => s.classList.remove('active'));
            launcherDots[launcherActiveScreen].classList.add('active');
            launcherScreens[launcherActiveScreen].classList.add('active');
            const colorName = launcherScreenColors[launcherActiveScreen];
            launcherFooterScreenLabel.innerHTML =
                '<span class="launcher-footer-color-dot" style="background:' + launcherScreenHexMap[colorName] + ';"></span> screen ' + (launcherActiveScreen + 1);
        })();

        // Dot click handlers
        launcherDots.forEach((dot, i) => {
            dot.addEventListener('click', () => switchLauncherScreen(i));
        });

        /* ══════════════════════════════════════════════
           How It Works — Slider Guide
           ══════════════════════════════════════════════ */
        (function initHowItWorks() {
            var hiwDots = document.querySelectorAll('.hiw-dot');
            var hiwSlides = document.querySelectorAll('.hiw-slide');
            var hiwPrev = document.getElementById('hiwPrev');
            var hiwNext = document.getElementById('hiwNext');
            var hiwCounter = document.getElementById('hiwCounter');
            var hiwActive = 0;
            var hiwTotal = hiwSlides.length;

            function goToHiwSlide(idx) {
                if (idx < 0 || idx >= hiwTotal) return;
                hiwActive = idx;
                hiwDots.forEach(function(d) { d.classList.remove('active'); });
                hiwSlides.forEach(function(s) { s.classList.remove('active'); });
                hiwDots[idx].classList.add('active');
                hiwSlides[idx].classList.add('active');
                hiwPrev.disabled = idx === 0;
                hiwNext.disabled = idx === hiwTotal - 1;
                hiwCounter.textContent = (idx + 1) + ' / ' + hiwTotal;
            }

            hiwDots.forEach(function(dot, i) {
                dot.addEventListener('click', function() { goToHiwSlide(i); });
            });

            hiwPrev.addEventListener('click', function() { goToHiwSlide(hiwActive - 1); });
            hiwNext.addEventListener('click', function() { goToHiwSlide(hiwActive + 1); });

            // Keyboard arrows when launcher is open and on orange screen
            document.addEventListener('keydown', function(e) {
                var overlay = document.getElementById('launcherOverlay');
                if (!overlay || !overlay.classList.contains('active')) return;
                if (launcherActiveScreen !== 2) return; // orange screen = index 2
                if (e.key === 'ArrowLeft') { e.preventDefault(); goToHiwSlide(hiwActive - 1); }
                if (e.key === 'ArrowRight') { e.preventDefault(); goToHiwSlide(hiwActive + 1); }
            });

            // Banner "How It Works" button — open launcher + switch to orange
            var bannerHiwBtn = document.getElementById('bannerHiwBtn');
            if (bannerHiwBtn) {
                bannerHiwBtn.addEventListener('click', function() {
                    // Open launcher overlay
                    var backdrop = document.getElementById('launcherOverlayBackdrop');
                    var overlay = document.getElementById('launcherOverlay');
                    var launcherBtn = document.getElementById('notchLauncher');
                    if (backdrop) backdrop.classList.add('active');
                    if (overlay) overlay.classList.add('active');
                    if (launcherBtn) launcherBtn.classList.add('launcher-active');
                    // Switch to orange screen (index 2)
                    setTimeout(function() { switchLauncherScreen(2); }, 80);
                    // Reset slider to first slide
                    goToHiwSlide(0);
                });
            }
        })();


        /* ══════════════════════════════════════════════
           QA Client/Supplier Toggle
           ══════════════════════════════════════════════ */
        (function initQAToggle() {
            var track = document.getElementById('qaToggleTrack');
            var labelClient = document.getElementById('qaLabelClient');
            var labelSupplier = document.getElementById('qaLabelSupplier');
            var clientPanel = document.getElementById('qaClientPanel');
            var supplierPanel = document.getElementById('qaSupplierPanel');
            if (!track || !clientPanel || !supplierPanel) return;

            var isSupplier = localStorage.getItem('qa_mode') === 'supplier';

            function applyMode() {
                track.classList.toggle('supplier', isSupplier);
                labelClient.classList.toggle('active', !isSupplier);
                labelSupplier.classList.toggle('active', isSupplier);
                clientPanel.classList.toggle('hidden', isSupplier);
                supplierPanel.classList.toggle('active', isSupplier);
            }

            applyMode();

            track.addEventListener('click', function() {
                isSupplier = !isSupplier;
                localStorage.setItem('qa_mode', isSupplier ? 'supplier' : 'client');
                applyMode();
            });
            labelClient.addEventListener('click', function() {
                if (isSupplier) { isSupplier = false; localStorage.setItem('qa_mode', 'client'); applyMode(); }
            });
            labelSupplier.addEventListener('click', function() {
                if (!isSupplier) { isSupplier = true; localStorage.setItem('qa_mode', 'supplier'); applyMode(); }
            });
        })();

        
        /* ══════════════════════════════════════════════
           Button 9 — New Client, First Order
           ══════════════════════════════════════════════ */
        (function initNewClientFirstOrder() {
            var btn = document.getElementById('callNewClientFirstOrder');
            var agBtn = document.getElementById('callNewClientFirstOrderAG');
            var prompt = document.getElementById('newClientPrompt');
            var goBtn = document.getElementById('newClientGo');
            var nameInput = document.getElementById('newClientName');
            var orderInput = document.getElementById('newClientOrder');
            if (!btn || !prompt) return;

            function togglePrompt() {
                prompt.classList.toggle('open');
                if (prompt.classList.contains('open')) {
                    setTimeout(function() { nameInput.focus(); }, 100);
                }
            }

            btn.addEventListener('click', togglePrompt);
            if (agBtn) agBtn.addEventListener('click', togglePrompt);

            goBtn.addEventListener('click', function() {
                var clientName = nameInput.value.trim();
                var orderName = orderInput.value.trim();
                if (!clientName) { nameInput.focus(); return; }
                if (!orderName) { orderInput.focus(); return; }

                /* Generate IDs */
                var clientId = 'CL-' + Date.now().toString(36).toUpperCase();
                var orderId = 'ORD-' + Date.now().toString(36).toUpperCase();

                /* Add to AAS Flow left wing contacts if possible */
                try {
                    var leftData = JSON.parse(localStorage.getItem('wingdash_left_pills') || '[]');
                    var aasFlow = leftData.find(function(p) { return p.title === 'AAS Flow'; });
                    if (aasFlow && aasFlow.items) {
                        aasFlow.items.push({ label: clientName, id: clientId, added: new Date().toISOString() });
                        localStorage.setItem('wingdash_left_pills', JSON.stringify(leftData));
                    }
                } catch(e) { console.log('[NewClient] Could not update AAS Flow:', e); }

                /* Add first campaign row */
                try {
                    var campaigns = JSON.parse(localStorage.getItem('wingdash_campaigns') || '[]');
                    campaigns.push({
                        _id: 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2,5),
                        clientName: clientName,
                        clientId: clientId,
                        orderName: orderName,
                        orderId: orderId,
                        campaignType: '',
                        targetCount: '',
                        currentCount: '0',
                        progressPct: '0%',
                        startDate: new Date().toISOString().split('T')[0],
                        eta: '',
                        trackingNotes: '',
                        assigned: '',
                        paymentAmount: '',
                        paymentStatus: 'Pending',
                        paymentLink: '',
                        invoiceDate: '',
                        paidDate: '',
                        receipt: '',
                        orderDetails: ''
                    });
                    localStorage.setItem('wingdash_campaigns', JSON.stringify(campaigns));
                } catch(e) { console.log('[NewClient] Could not add campaign:', e); }

                /* Visual feedback */
                goBtn.textContent = 'Created!';
                goBtn.style.background = 'linear-gradient(145deg, #22c55e, #16a34a)';
                setTimeout(function() {
                    goBtn.textContent = 'Go';
                    goBtn.style.background = '';
                    nameInput.value = '';
                    orderInput.value = '';
                    prompt.classList.remove('open');
                }, 1500);

                /* Refresh campaigns table if visible */
                if (typeof window.renderCampaignsTable === 'function') window.renderCampaignsTable();

                console.log('[NewClient] Created:', clientName, orderName);
            });

            /* Enter key submits */
            [nameInput, orderInput].forEach(function(inp) {
                inp.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') goBtn.click();
                });
            });
        })();

        
        /* ══════════════════════════════════════════════
           Assigned Column — Dropdown from Contacts
           ══════════════════════════════════════════════ */
        (function initAssignedDropdown() {
            /* Get contact names from left wing pills data */
            window.getAssignedContacts = function() {
                var contacts = [''];  /* empty option first */
                try {
                    var leftPills = JSON.parse(localStorage.getItem('wingdash_left_pills') || '[]');
                    /* Look for Contacts pill or AAS Flow pill */
                    leftPills.forEach(function(pill) {
                        if (pill.items && Array.isArray(pill.items)) {
                            pill.items.forEach(function(item) {
                                var name = item.label || item.name || item.title || '';
                                if (name && contacts.indexOf(name) === -1) contacts.push(name);
                            });
                        }
                    });
                } catch(e) {}
                /* Fallback — check starred contacts from gmail feed */
                try {
                    var gmailFeed = JSON.parse(localStorage.getItem('wingdash_gmail_contacts') || '[]');
                    gmailFeed.forEach(function(c) {
                        var name = c.name || c.email || '';
                        if (name && contacts.indexOf(name) === -1) contacts.push(name);
                    });
                } catch(e) {}
                return contacts;
            };

            /* Override cell rendering for 'assigned' column */
            /* This hooks into the existing table render by listening for new cells */
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(m) {
                    m.addedNodes.forEach(function(node) {
                        if (node.nodeType !== 1) return;
                        /* Find td cells that are for the assigned column */
                        var cells = node.querySelectorAll ? node.querySelectorAll('td[data-col="assigned"]') : [];
                        cells.forEach(function(td) {
                            if (td.querySelector('select')) return; /* already has dropdown */
                            var currentVal = td.textContent.trim();
                            var select = document.createElement('select');
                            select.style.cssText = 'background:rgba(0,0,0,0.3);color:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px 4px;font-size:0.5rem;font-family:Outfit,sans-serif;width:100%;cursor:pointer;';
                            var contacts = window.getAssignedContacts();
                            contacts.forEach(function(c) {
                                var opt = document.createElement('option');
                                opt.value = c;
                                opt.textContent = c || '— none —';
                                if (c === currentVal) opt.selected = true;
                                select.appendChild(opt);
                            });
                            select.addEventListener('change', function() {
                                /* Trigger the existing cell edit save mechanism */
                                td.textContent = select.value;
                                td.dispatchEvent(new Event('input', { bubbles: true }));
                                /* Re-add dropdown after text update */
                                setTimeout(function() {
                                    if (!td.querySelector('select')) {
                                        td.textContent = '';
                                        td.appendChild(select);
                                    }
                                }, 50);
                            });
                            td.textContent = '';
                            td.appendChild(select);
                        });
                    });
                });
            });

            /* Observe campaigns table body and all supplier table bodies */
            var targets = document.querySelectorAll('#campaignsTableBody, [id^="supplierBody_"]');
            targets.forEach(function(t) {
                observer.observe(t, { childList: true, subtree: true });
            });
        })();

        
        /* ══════════════════════════════════════════════
           Supplier Details Toggle
           ══════════════════════════════════════════════ */
        (function initSupplierDetailsToggle() {
            var PREF_KEY = 'wingdash_supplier_details_expanded';
            var expanded = localStorage.getItem(PREF_KEY) === '1';

            var toggleBtns = document.querySelectorAll('.supplier-details-toggle');
            var tables = document.querySelectorAll('[id^="supplierTable_"]');

            function applyState() {
                tables.forEach(function(t) {
                    t.classList.toggle('supplier-details-hidden', !expanded);
                });
                toggleBtns.forEach(function(btn) {
                    btn.innerHTML = (expanded ? '&#x25BE;' : '&#x25B8;') + ' Supplier Details';
                    btn.classList.toggle('expanded', expanded);
                });
            }

            applyState();

            toggleBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    expanded = !expanded;
                    localStorage.setItem(PREF_KEY, expanded ? '1' : '0');
                    applyState();
                });
            });
        })();

        /* Payment Links button on Journey Card → opens Launcher Screen 2 (green) */
        (function() {
            var plBtn = document.getElementById('cjBtnPaymentLinks');
            if (plBtn) {
                plBtn.addEventListener('click', function() {
                    openLauncherOverlay();
                    setTimeout(function() { switchLauncherScreen(1); }, 100);
                });
            }
        })();

        /* ══════════════════════════════════════════════
           Initialize
           ══════════════════════════════════════════════ */

        goToSection('left', 0);
        goToSection('right', 0);

        // Initialize wing pill click-to-tile handlers (kept for reference, overridden below)
        initWingPills();

        /* ══════════════════════════════════════════════
           Pill Submenu Overlay System
           Unified click handler for ALL wing pills
           ══════════════════════════════════════════════ */

        function closeAllSubmenus() {
            document.querySelectorAll('.pill-submenu.open').forEach(function(el) {
                el.classList.remove('open');
            });
            document.querySelectorAll('.pill.submenu-active').forEach(function(el) {
                el.classList.remove('submenu-active');
            });
        }

        /* ══════════════════════════════════════════════
           FEED SYSTEM — How pill data works
           ══════════════════════════════════════════════

           Each pill can load real data from a JSON feed file.
           Feeds live in: data/feeds/{name}.json

           HOW IT WORKS:
           - Scrapers (in ADMIN/tools/) auto-deploy JSON to data/feeds/
           - On page load, feed loaders (below) fetch their JSON
           - Data goes into _submenuCache keyed by pill label
           - createSubmenu() checks the cache — if data exists,
             it shows real names; if not, shows { slot N } placeholders

           SLOT DISPLAY LOGIC:
           - Top 4 visible = most recently used (by lastUsed timestamp)
           - Default (no recency data yet) = alphabetical order
           - Remaining slots behind "+N more" overflow

           ADDING A NEW FEED:
           1. Build the scraper in ADMIN/tools/
           2. Have it export to data/feeds/{pill-name}.json
           3. Add a feed loader function below (copy the Gmail pattern)
           4. Key the cache to the pill's exact label text

           See: setup.md in this folder for full reference
           ══════════════════════════════════════════════ */

        /* ── Submenu slot data cache ── */
        var _submenuCache = {};

        function getSubmenuSlots(pillLabel) {
            // If cached (from JSON or recent selections), return sorted by most-recent-first
            if (_submenuCache[pillLabel]) {
                var cached = _submenuCache[pillLabel].slice();
                // Sort by lastUsed descending — most recent 4 float to top
                cached.sort(function(a, b) { return (b.lastUsed || 0) - (a.lastUsed || 0); });
                return cached;
            }
            // Default: return empty — createSubmenu will show { slot N } placeholders
            return null;
        }

        function createSubmenu(pill) {
            var wrap = pill.parentElement;
            // Wrap pill if not already wrapped
            if (!wrap || !wrap.classList.contains('pill-wrap')) {
                wrap = document.createElement('div');
                wrap.className = 'pill-wrap';
                pill.parentNode.insertBefore(wrap, pill);
                wrap.appendChild(pill);
            }

            var existing = wrap.querySelector('.pill-submenu');
            if (existing) return existing;

            var menu = document.createElement('div');
            menu.className = 'pill-submenu';

            var pillLabel = (pill.querySelector('.pill-label') || {}).textContent || '';
            var slots = getSubmenuSlots(pillLabel.trim());

            /* ── Unified path: real data or placeholders, same structure ── */
            var hasData = slots && slots.length > 0;
            var totalSlots = hasData ? slots.length : 20;
            var extra = totalSlots - 4;

            var itemsWrap = document.createElement('div');
            itemsWrap.className = 'pill-sub-items-wrap';
            menu.appendChild(itemsWrap);

            for (var si = 0; si < totalSlots; si++) {
                (function(idx) {
                    var slot = hasData ? slots[idx] : null;
                    var item = document.createElement('div');
                    item.className = 'pill-sub-item';
                    if (idx >= 4) item.classList.add('pill-sub-hidden');

                    if (slot) {
                        item.dataset.slotUrl = slot.url || '';
                        item.dataset.slotName = slot.name || '';
                        item.dataset.slotEmail = slot.email || '';
                        item.style.cursor = 'pointer';
                        item.addEventListener('click', function(e) {
                            e.stopPropagation();
                            if (slot.url) {
                                window.open(slot.url, '_blank');
                                window.focus();
                            }
                        });
                        item.innerHTML = '<span class="pill-sub-dot"></span> ' +
                            '<span style="font-weight:600;">' + slot.name + '</span>' +
                            '<span style="margin-left:auto; font-size:0.55rem; opacity:0.5;">' + (slot.email || '') + '</span>';

                        // ── Bi-directional nav: "→ Journey" button ──
                        // Only inject when this pill lives in the right Comms wing
                        var isInCommsWing = (function() {
                            var p = pill.closest('.wing-right');
                            if (!p) return false;
                            var sec = pill.closest('.wing-section');
                            if (!sec) return false;
                            var secLbl = sec.querySelector('.section-label');
                            return secLbl && secLbl.textContent.trim() === 'Comms';
                        })();

                        if (isInCommsWing) {
                            var journeyBtn = document.createElement('span');
                            journeyBtn.className = 'pill-sub-journey-btn';
                            journeyBtn.textContent = '◆ Journey';
                            journeyBtn.title = 'Open Client Journey Card for ' + (slot.name || 'this contact');
                            journeyBtn.addEventListener('click', function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                                var contactName = slot.name || item.dataset.slotName || '';
                                console.log('[Comms→Journey] Opening Journey Card for:', contactName);

                                // Load client name into Journey Card
                                if (typeof loadClientToJourneyCard === 'function') {
                                    loadClientToJourneyCard(contactName);
                                }

                                // Open/focus Journey Card
                                if (typeof openJourney === 'function') {
                                    var journeyOpen = document.getElementById('cjPanel') &&
                                        !document.getElementById('cjPanel').classList.contains('paused');
                                    if (!journeyOpen) {
                                        openJourney();
                                    } else {
                                        // Already open — just scroll it into view
                                        var panel = document.getElementById('cjPanel');
                                        if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }

                                // Scroll center pad to journey card
                                setTimeout(function() {
                                    var panel = document.getElementById('cjPanel');
                                    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

                                    // Brief pulse on the Journey float button
                                    var floatBtn = document.getElementById('journeyCardBtn');
                                    if (floatBtn) {
                                        floatBtn.style.transition = 'box-shadow 0.2s ease';
                                        floatBtn.style.boxShadow = '0 0 20px rgba(239,68,68,0.6)';
                                        setTimeout(function() { floatBtn.style.boxShadow = ''; }, 800);
                                    }
                                }, 200);
                            });
                            item.appendChild(journeyBtn);
                        }
                    } else {
                        item.innerHTML = '<span class="pill-sub-dot"></span> { slot ' + (idx + 1) + ' } ' +
                            '<span style="margin-left:auto; font-size:0.62rem; opacity:0.7; margin-right:4px;">ID#</span>' +
                            '<span class="pill-sub-square" style="margin-left:0;"></span>';
                    }

                    itemsWrap.appendChild(item);
                })(si);
            }

            // Clickable overflow toggle
            var overflow = document.createElement('div');
            overflow.className = 'pill-sub-overflow';
            overflow.style.cursor = 'pointer';
            var expanded = false;

            if (extra > 0) {
                overflow.textContent = '+' + extra + ' more slots';
                overflow.addEventListener('click', function(e) {
                    e.stopPropagation();
                    expanded = !expanded;
                    if (expanded) {
                        itemsWrap.querySelectorAll('.pill-sub-hidden').forEach(function(el) {
                            el.classList.remove('pill-sub-hidden');
                        });
                        itemsWrap.classList.add('pill-sub-scrollable');
                        overflow.textContent = 'show less';
                    } else {
                        itemsWrap.querySelectorAll('.pill-sub-item').forEach(function(el, i) {
                            if (i >= 4) el.classList.add('pill-sub-hidden');
                        });
                        itemsWrap.classList.remove('pill-sub-scrollable');
                        itemsWrap.scrollTop = 0;
                        overflow.textContent = '+' + extra + ' more slots';
                    }
                });
            } else {
                overflow.textContent = 'All slots visible';
            }
            menu.appendChild(overflow);

            wrap.appendChild(menu);

            // Enable drag-to-reorder on submenu items
            if (hasData) {
                enableSubmenuDrag(itemsWrap, pillLabel.trim());
            }

            return menu;
        }

        /* ── Gmail pill: load starred-contacts.json on page load ── */
        (function loadGmailContacts() {
            fetch('data/feeds/gmail.json?t=' + Date.now())
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data && data.contacts && data.contacts.length) {
                        // Sort alphabetically as default (until "most recent" tracking exists)
                        var sorted = data.contacts.slice().sort(function(a, b) {
                            return (a.name || '').localeCompare(b.name || '');
                        });
                        _submenuCache['Gmail'] = sorted.map(function(c) {
                            return {
                                name: c.name || c.email,
                                email: c.email || '',
                                url: c.thread_url,
                                lastUsed: 0
                            };
                        });
                        // Apply any saved drag order from localStorage
                        applySavedOrder('Gmail');
                    }
                })
                .catch(function() {
                    // No JSON yet — Gmail pill falls back to { slot N } placeholders
                });
        })();

        /* ── Submenu drag-to-reorder ──────────────────
           Lets user drag .pill-sub-item cards within
           the Gmail (or any) submenu to reorder them.
           Order persists to localStorage keyed by pill label.
           ─────────────────────────────────────────────── */
        var SUBMENU_ORDER_KEY = 'submenuOrder';

        function loadSubmenuOrder() {
            try { return JSON.parse(localStorage.getItem(SUBMENU_ORDER_KEY)) || {}; }
            catch(e) { return {}; }
        }
        function saveSubmenuOrder(pillLabel, emailOrder) {
            var all = loadSubmenuOrder();
            all[pillLabel] = emailOrder;
            localStorage.setItem(SUBMENU_ORDER_KEY, JSON.stringify(all));
        }

        // Apply saved order to cache (called after JSON loads)
        function applySavedOrder(pillLabel) {
            var saved = loadSubmenuOrder()[pillLabel];
            if (!saved || !_submenuCache[pillLabel]) return;
            var byEmail = {};
            _submenuCache[pillLabel].forEach(function(s) { byEmail[s.email] = s; });
            var ordered = [];
            saved.forEach(function(email) {
                if (byEmail[email]) { ordered.push(byEmail[email]); delete byEmail[email]; }
            });
            // Append any new contacts not in saved order
            Object.keys(byEmail).forEach(function(k) { ordered.push(byEmail[k]); });
            _submenuCache[pillLabel] = ordered;
        }

        function enableSubmenuDrag(menu, pillLabel) {
            var dragItem = null;
            var parentPill = menu.closest('.pill-wrap')?.querySelector('.pill');

            menu.querySelectorAll('.pill-sub-item').forEach(function(item, idx) {
                item.dataset.idx = idx;

                // Make submenu items draggable for reorder
                item.addEventListener('pointerdown', function() {
                    this.setAttribute('draggable', 'true');
                });

                item.addEventListener('dragstart', function(e) {
                    dragItem = this;
                    this.classList.add('sub-dragging');
                    e.dataTransfer.effectAllowed = 'move';

                    // Single card data
                    var liveIdx = Array.from(menu.querySelectorAll('.pill-sub-item')).indexOf(this);
                    var slot = (_submenuCache[pillLabel] || [])[liveIdx] || {};
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        label: slot.name || this.dataset.slotName || '',
                        sub: slot.email || this.dataset.slotEmail || '',
                        icon: '✉'
                    }));
                });
                item.addEventListener('dragend', function() {
                    this.classList.remove('sub-dragging');
                    menu.querySelectorAll('.pill-sub-item').forEach(function(el) {
                        el.classList.remove('sub-drag-over');
                    });
                    dragItem = null;
                });

                // Reorder within submenu
                item.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.dataTransfer.dropEffect = 'move';
                    if (this !== dragItem) this.classList.add('sub-drag-over');
                });
                item.addEventListener('dragleave', function() {
                    this.classList.remove('sub-drag-over');
                });
                item.addEventListener('drop', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.classList.remove('sub-drag-over');
                    if (!dragItem || dragItem === this) return;

                    var items = Array.from(menu.querySelectorAll('.pill-sub-item'));
                    var fromIdx = items.indexOf(dragItem);
                    var toIdx = items.indexOf(this);
                    if (fromIdx < toIdx) {
                        this.parentNode.insertBefore(dragItem, this.nextSibling);
                    } else {
                        this.parentNode.insertBefore(dragItem, this);
                    }

                    if (_submenuCache[pillLabel]) {
                        var arr = _submenuCache[pillLabel];
                        var moved = arr.splice(fromIdx, 1)[0];
                        arr.splice(toIdx, 0, moved);
                        saveSubmenuOrder(pillLabel, arr.map(function(s) { return s.email; }));
                    }
                });
            });
        }

        function initPillSubmenus() {
            document.addEventListener('click', function(e) {
                // If clicking inside an open submenu, let it handle itself
                // (star mode selections, child card clicks, etc.)
                var inSubmenu = e.target.closest('.pill-submenu');
                if (inSubmenu) {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }

                var pill = e.target.closest('.pill');

                // Click outside any pill → close all
                if (!pill) {
                    closeAllSubmenus();
                    return;
                }

                // Inside a wing?
                if (!pill.closest('.wing')) return;

                // Don't fire if dragging
                if (pill.classList.contains('dragging')) return;

                // ── Client pill intercept: redirect to Drive overlay ──
                if (pill.closest('.wing-left')) {
                    var section = pill.closest('.wing-section');
                    if (section) {
                        var secLabel = section.querySelector('.section-label');
                        if (secLabel && secLabel.textContent.trim() === 'AAS Flow') {
                            var pillLabelEl = pill.querySelector('.pill-label');
                            var pillLabelText = pillLabelEl ? pillLabelEl.textContent.trim() : '';
                            // Find matching client data by label
                            var cData = (pillData.left && pillData.left[0])
                                ? pillData.left[0].find(function(d) { return d.label === pillLabelText; })
                                : null;
                            if (cData && cData.isClient) {
                                e.stopPropagation();
                                e.preventDefault();
                                // Remove client-selected from siblings
                                var allPills = section.querySelectorAll('.pill');
                                allPills.forEach(function(p) { p.classList.remove('client-selected'); });
                                // Highlight selected pill
                                pill.classList.add('client-selected');
                                pill.classList.add('sending');
                                setTimeout(function() { pill.classList.remove('sending'); }, 500);
                                closeAllSubmenus();
                                // Set selected client and update Place section
                                hideClimateCard(); // Ensure Climate Card is hidden for clients
                                selectedClient = cData;
                                updatePlace(cData.label);
                                // Update pipeline status card if active
                                var pCard = document.getElementById('pipelineStatusCard');
                                if (pCard && pCard.classList.contains('active')) {
                                    document.dispatchEvent(new CustomEvent('pipeline-loaded', {
                                        detail: { client: cData.label }
                                    }));
                                }
                                return;
                            }
                        }
                    }
                }

                // ── Lead pill intercept: show Climate Card instead of Place ──
                if (pill.closest('.wing-left')) {
                    var leadSection = pill.closest('.wing-section');
                    if (leadSection) {
                        var leadSecLabel = leadSection.querySelector('.section-label');
                        if (leadSecLabel && leadSecLabel.textContent.trim() === 'Leads') {
                            var leadLabelEl = pill.querySelector('.pill-label');
                            var leadLabelText = leadLabelEl ? leadLabelEl.textContent.trim() : '';
                            var lData = (pillData.left && pillData.left[1])
                                ? pillData.left[1].find(function(d) { return d.label === leadLabelText; })
                                : null;
                            if (lData && lData.isLead) {
                                e.stopPropagation();
                                e.preventDefault();
                                var allLeadPills = leadSection.querySelectorAll('.pill');
                                allLeadPills.forEach(function(p) { p.classList.remove('client-selected'); });
                                pill.classList.add('client-selected');
                                pill.classList.add('sending');
                                setTimeout(function() { pill.classList.remove('sending'); }, 500);
                                closeAllSubmenus();
                                // Show Climate Card, hide Place
                                showClimateCard(lData.label);
                                console.log('[Leads] Climate Card shown for:', lData.label);
                                return;
                            }
                        }
                    }
                }

                // ── Supplier pill intercept: open All Campaigns → Suppliers tab ──
                if (pill.closest('.wing-left')) {
                    var supSection = pill.closest('.wing-section');
                    if (supSection) {
                        var supSecLabel = supSection.querySelector('.section-label');
                        if (supSecLabel && supSecLabel.textContent.trim() === 'Suppliers') {
                            var supLabelEl = pill.querySelector('.pill-label');
                            var supLabelText = supLabelEl ? supLabelEl.textContent.trim() : '';
                            var supplierNames = ['Brandon', 'Nik', 'Tyler', 'Peter'];
                            if (supplierNames.indexOf(supLabelText) !== -1) {
                                e.stopPropagation();
                                e.preventDefault();
                                pill.classList.add('sending');
                                setTimeout(function() { pill.classList.remove('sending'); }, 500);
                                closeAllSubmenus();
                                /* Open All Campaigns panel → Suppliers tab → specific supplier sub-tab */
                                if (typeof openCampaignsToSupplier === 'function') {
                                    openCampaignsToSupplier(supLabelText.toLowerCase());
                                }
                                return;
                            }
                        }
                    }
                }

                // ── Proposal Generator pill: left-click disabled (use right-click) ──
                var pillLabelForPM = pill.querySelector('.pill-label');
                var pillLabelTextPM = pillLabelForPM ? pillLabelForPM.textContent.trim() : '';
                if (pillLabelTextPM === 'Proposal Generator') {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }

                // ── Add New Client pill: skip submenu, let inline input handler fire ──
                if (pillLabelTextPM === 'Add New Client') {
                    return; // don't stop propagation — let the ANC capture handler on leftTrack fire
                }

                // ── Pipeline step cards: let initPipelineSteps handle them ──
                if (pill.classList.contains('pipe-step-card')) return;

                // Stop the old handlers (TileManager / AI overlay) from firing
                e.stopPropagation();
                e.preventDefault();

                var menu = createSubmenu(pill);
                var isOpen = menu.classList.contains('open');

                // Close everything first
                closeAllSubmenus();

                if (!isOpen) {
                    pill.classList.add('submenu-active');
                    menu.classList.add('open');
                }
            }, true); // capture phase — beats all existing pill click handlers
        }

        initPillSubmenus();

        // ── Proposal Generator pill: right-click opens in AppViewer ──
        document.addEventListener('contextmenu', function(e) {
            var pill = e.target.closest('.pill');
            if (!pill || !pill.closest('.wing')) return;
            var pillLabel = pill.querySelector('.pill-label');
            var pillText = pillLabel ? pillLabel.textContent.trim() : '';
            if (pillText === 'Proposal Generator') {
                e.preventDefault();
                e.stopPropagation();
                openProposalGenerator();
            }
        }, true);

        // ── Matrix pill: right-click opens in AppViewer ──
        document.addEventListener('contextmenu', function(e) {
            var pill = e.target.closest('.pill');
            if (!pill || !pill.closest('.wing')) return;
            var pillLabel = pill.querySelector('.pill-label');
            var pillText = pillLabel ? pillLabel.textContent.trim() : '';
            if (pillText === 'Matrix') {
                e.preventDefault();
                e.stopPropagation();
                openArtistMatrix();
            }
        }, true);

        // Re-bind submenu wraps after pills re-render
        var origRenderPills = renderPills;
        renderPills = function(wing, sectionIndex) {
            origRenderPills(wing, sectionIndex);
            // No extra binding needed — we use a single delegated capture listener
        };

        /* ══════════════════════════════════════════════
           App Viewer — Reusable chrome card overlay
           Opens local HTML apps in an iframe
           ══════════════════════════════════════════════ */
        var AppViewer = (function() {
            var viewer = document.getElementById('appViewer');
            var backdrop = document.getElementById('appViewerBackdrop');
            var frame = document.getElementById('appViewerFrame');
            var titleEl = document.getElementById('appViewerTitle');
            var closeBtn = document.getElementById('appViewerClose');
            var popoutBtn = document.getElementById('appViewerPopout');
            var topbar = document.getElementById('appViewerTopbar');
            var currentUrl = '';

            // Drag to move
            var isDragging = false, dragX = 0, dragY = 0;
            if (topbar) {
                topbar.addEventListener('mousedown', function(e) {
                    if (e.target.closest('.app-viewer-ctrl-btn')) return;
                    isDragging = true;
                    var rect = viewer.getBoundingClientRect();
                    dragX = e.clientX - rect.left;
                    dragY = e.clientY - rect.top;
                    viewer.style.transition = 'none';
                    viewer.style.transform = 'none';
                    viewer.style.left = rect.left + 'px';
                    viewer.style.top = rect.top + 'px';
                });
            }
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                viewer.style.left = (e.clientX - dragX) + 'px';
                viewer.style.top = (e.clientY - dragY) + 'px';
            });
            document.addEventListener('mouseup', function() {
                isDragging = false;
            });

            // Close
            function close() {
                if (viewer) viewer.classList.remove('active');
                if (backdrop) backdrop.classList.remove('active');
                if (frame) frame.src = 'about:blank';
                currentUrl = '';
            }
            if (closeBtn) closeBtn.addEventListener('click', close);
            if (backdrop) backdrop.addEventListener('click', close);

            // Popout to new window
            if (popoutBtn) {
                popoutBtn.addEventListener('click', function() {
                    if (currentUrl) {
                        window.open(currentUrl, '_blank', 'width=900,height=700,resizable=yes');
                        close();
                    }
                });
            }

            // Escape key closes
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && viewer && viewer.classList.contains('active')) {
                    close();
                }
            });

            return {
                open: function(url, title) {
                    currentUrl = url;
                    if (titleEl) titleEl.textContent = title || 'App Viewer';
                    if (frame) {
                        if (url.startsWith('http')) {
                            // Same-origin localhost — iframe src works directly
                            frame.src = url;
                        } else {
                            // file:// fallback — try fetch+srcdoc
                            fetch(url)
                                .then(function(r) { return r.text(); })
                                .then(function(html) { frame.srcdoc = html; })
                                .catch(function() { frame.src = url; });
                        }
                    }
                    // Reset position to center
                    if (viewer) {
                        viewer.style.transform = 'translate(-50%, -50%)';
                        viewer.style.left = '50%';
                        viewer.style.top = '50%';
                        viewer.style.transition = '';
                        viewer.classList.add('active');
                    }
                    if (backdrop) backdrop.classList.add('active');
                    console.log('[AppViewer] Opened:', title, url);
                },
                close: close
            };
        })();

        function openProposalGenerator() {
            AppViewer.open(PROPOSAL_GENERATOR_URL, '\ud83d\udcdd Proposal Generator');
        }

        function openCalCard() {
            AppViewer.open(CAL_CARD_URL, '\ud83d\udcc7 Cal Card');
        }

        /* ── All Campaigns panel open/close ── */
        var campaignsOpen = false;
        function openCampaigns() {
            var panel = document.getElementById('campaignsPanel');
            if (!panel) return;
            campaignsOpen = true;
            panel.classList.remove('paused');
            // Filter to active client if loaded
            var filterLabel = document.getElementById('campaignsFilterLabel');
            if (activeClient && activeClient.name && filterLabel) {
                filterLabel.textContent = activeClient.name;
            } else if (filterLabel) {
                filterLabel.textContent = 'All Clients';
            }
            // Hide center tiles
            var tileHeaders = document.querySelectorAll('.center-pad .center-section-header');
            var tileGrids = document.querySelectorAll('.center-pad .tile-grid');
            tileHeaders.forEach(function(el) { el.classList.add('tiles-hidden'); });
            tileGrids.forEach(function(el) { el.classList.add('tiles-hidden'); });
            var wm = document.querySelector('.center-watermark');
            if (wm) wm.style.display = 'none';
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Re-render spreadsheet with current filter
            if (typeof window._campaignsRender === 'function') window._campaignsRender();
            console.log('[Campaigns] Panel opened');
        }
        function closeCampaigns() {
            var panel = document.getElementById('campaignsPanel');
            if (!panel) return;
            campaignsOpen = false;
            panel.classList.add('paused');
            // Restore tiles
            var tileHeaders = document.querySelectorAll('.center-pad .center-section-header');
            var tileGrids = document.querySelectorAll('.center-pad .tile-grid');
            tileHeaders.forEach(function(el) { el.classList.remove('tiles-hidden'); });
            tileGrids.forEach(function(el) { el.classList.remove('tiles-hidden'); });
            var wm = document.querySelector('.center-watermark');
            if (wm) wm.style.display = '';
        }
        // Wire close button
        (function() {
            var closeBtn = document.getElementById('campaignsClose');
            if (closeBtn) closeBtn.addEventListener('click', closeCampaigns);
        })();

        /* ── Campaigns Spreadsheet — CRUD + localStorage ── */
        (function() {
            var STORAGE_KEY = 'wingdash_campaigns';
            var TRACKING_PREF_KEY = 'wingdash_tracking_expanded';
            var PAYMENT_PREF_KEY = 'wingdash_payment_expanded';

            /* Base columns (always visible) — first half before tracking */
            var BASE_COLS_BEFORE = ['clientName','clientId','orderName','orderId'];
            var BASE_LABELS_BEFORE = ['Client Name','Client ID','Order Name','Order ID'];

            /* Tracking columns (hidden when grouped) */
            var TRACKING_COLS = ['campaignType','targetCount','currentCount','progressPct','startDate','eta','trackingNotes','assigned'];
            var TRACKING_LABELS = ['Type','Target','Current','Progress','Start','ETA','Notes','Assigned'];
            var TRACKING_READONLY = ['campaignType','targetCount','progressPct']; /* auto-calculated, not directly editable */

            /* Payment columns (hidden when grouped) */
            /* Payment status options for reference: Pending, Paid, Overdue, Refunded */
            var PAYMENT_COLS = ['paymentAmount','paymentStatus','paymentLink','invoiceDate','paidDate','receipt'];
            var PAYMENT_LABELS = ['Amount','Pay Status','Payment Link','Invoice Date','Paid Date','Receipt'];

            /* Base columns — second half after tracking + payment */
            var BASE_COLS_AFTER = ['orderDetails'];
            var BASE_LABELS_AFTER = ['Order Details'];

            /* Full column list in render order */
            var COLS = BASE_COLS_BEFORE.concat(TRACKING_COLS).concat(PAYMENT_COLS).concat(BASE_COLS_AFTER);
            var COL_LABELS = BASE_LABELS_BEFORE.concat(TRACKING_LABELS).concat(PAYMENT_LABELS).concat(BASE_LABELS_AFTER);

            var LINK_COLS = ['paymentLink'];

            function loadData() {
                try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
                catch(e) { return []; }
            }
            function saveData(rows) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
            }
            function genId() { return 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2,5); }

            function isLinkCol(col) { return LINK_COLS.indexOf(col) !== -1; }
            function isTrackingCol(col) { return TRACKING_COLS.indexOf(col) !== -1; }
            function isPaymentCol(col) { return PAYMENT_COLS.indexOf(col) !== -1; }
            function isReadOnlyCol(col) { return TRACKING_READONLY.indexOf(col) !== -1; }

            /* ── Auto-detect campaign type and target from orderName ── */
            function detectCampaign(orderName) {
                if (!orderName) return { type: 'custom', target: 0, targetLabel: '' };
                var name = orderName.toLowerCase().trim();

                /* Spotify: "50K Spotify", "100k spotify streams", etc. */
                var spotifyMatch = name.match(/(\d+)\s*k?\s*(spotify|spot)/i);
                if (!spotifyMatch) spotifyMatch = orderName.match(/(\d+)\s*k\s*(spotify|spot)/i);
                if (spotifyMatch) {
                    var num = parseInt(spotifyMatch[1]);
                    var mult = (spotifyMatch[0].toLowerCase().indexOf('k') !== -1 || num <= 500) ? 1000 : 1;
                    if (num <= 500) mult = 1000; /* e.g. 50K, 100K — numbers under 500 are assumed to be K */
                    return { type: 'spotify', target: num * mult, targetLabel: num + 'K' };
                }

                /* YouTube: "20K YouTube", "50k views youtube" */
                var ytMatch = name.match(/(\d+)\s*k?\s*(youtube|yt|views)/i);
                if (ytMatch) {
                    var ytNum = parseInt(ytMatch[1]);
                    if (ytNum <= 500) return { type: 'youtube', target: ytNum * 1000, targetLabel: ytNum + 'K' };
                    return { type: 'youtube', target: ytNum, targetLabel: ytNum.toLocaleString() };
                }

                /* SoundCloud: "8K Streams", "4k soundcloud" */
                var scMatch = name.match(/(\d+)\s*k?\s*(soundcloud|sc)/i);
                if (!scMatch) scMatch = name.match(/(\d+)\s*k\s*streams?/i);
                if (scMatch) {
                    var scNum = parseInt(scMatch[1]);
                    if (scNum <= 500) return { type: 'soundcloud', target: scNum * 1000, targetLabel: scNum + 'K' };
                    return { type: 'soundcloud', target: scNum, targetLabel: scNum.toLocaleString() };
                }

                /* Press: "4 Articles (Premium)", "2 articles standard", "In-Network" */
                var pressMatch = name.match(/(\d+)\s*articles?/i);
                if (pressMatch) {
                    var artNum = parseInt(pressMatch[1]);
                    var tier = '';
                    if (name.indexOf('premium') !== -1) tier = ' (Premium)';
                    else if (name.indexOf('standard') !== -1) tier = ' (Standard)';
                    else if (name.indexOf('in-network') !== -1 || name.indexOf('in network') !== -1) tier = ' (In-Network)';
                    return { type: 'press', target: artNum, targetLabel: artNum + ' Articles' + tier };
                }

                /* Packages: Gold, Silver, Platinum */
                if (name.indexOf('gold') !== -1) return { type: 'package', target: 1, targetLabel: 'Gold' };
                if (name.indexOf('silver') !== -1) return { type: 'package', target: 1, targetLabel: 'Silver' };
                if (name.indexOf('platinum') !== -1) return { type: 'package', target: 1, targetLabel: 'Platinum' };

                /* Fallback */
                return { type: 'custom', target: 0, targetLabel: '' };
            }

            function formatTarget(row) {
                /* Use manually stored targetLabel if present, otherwise auto-detect */
                if (row._targetLabel) return row._targetLabel;
                var det = detectCampaign(row.orderName);
                return det.targetLabel;
            }

            function getTargetNumber(row) {
                if (row._targetNum) return row._targetNum;
                var det = detectCampaign(row.orderName);
                return det.target;
            }

            function getCampaignType(row) {
                if (row._campaignType) return row._campaignType;
                var det = detectCampaign(row.orderName);
                return det.type;
            }

            function calcProgress(row) {
                var target = getTargetNumber(row);
                var current = parseFloat(row.currentCount) || 0;
                if (!target || target <= 0) return 0;
                var pct = Math.round((current / target) * 100);
                return Math.min(pct, 100);
            }

            /* ── Build progress bar HTML element ── */
            function buildProgressBar(pct) {
                var wrap = document.createElement('div');
                wrap.className = 'camp-progress-wrap';

                var bar = document.createElement('div');
                bar.className = 'camp-progress-bar';

                var fill = document.createElement('div');
                fill.className = 'camp-progress-fill';
                if (pct >= 75) fill.classList.add('prog-green');
                else if (pct >= 25) fill.classList.add('prog-amber');
                else fill.classList.add('prog-red');
                fill.style.width = pct + '%';
                bar.appendChild(fill);

                var label = document.createElement('span');
                label.className = 'camp-progress-pct';
                label.textContent = pct + '%';

                wrap.appendChild(bar);
                wrap.appendChild(label);
                return wrap;
            }

            /* ── Build type badge ── */
            function buildTypeBadge(type) {
                var span = document.createElement('span');
                span.className = 'camp-type-badge type-' + type;
                span.textContent = type;
                return span;
            }

            /* ── Toggle state ── */
            function isTrackingExpanded() {
                return localStorage.getItem(TRACKING_PREF_KEY) === '1';
            }
            function setTrackingExpanded(val) {
                localStorage.setItem(TRACKING_PREF_KEY, val ? '1' : '0');
            }
            function applyTrackingToggleState() {
                var table = document.getElementById('campaignsTable');
                var btn = document.getElementById('campTrackingToggle');
                if (!table) return;
                var expanded = isTrackingExpanded();
                if (expanded) {
                    table.classList.remove('tracking-cols-hidden');
                    if (btn) { btn.textContent = '\u25BE Tracking'; btn.classList.add('expanded'); }
                } else {
                    table.classList.add('tracking-cols-hidden');
                    if (btn) { btn.textContent = '\u25B8 Tracking'; btn.classList.remove('expanded'); }
                }
            }

            /* ── Payment Toggle state ── */
            function isPaymentExpanded() {
                return localStorage.getItem(PAYMENT_PREF_KEY) === '1';
            }
            function setPaymentExpanded(val) {
                localStorage.setItem(PAYMENT_PREF_KEY, val ? '1' : '0');
            }
            function applyPaymentToggleState() {
                var table = document.getElementById('campaignsTable');
                var btn = document.getElementById('campPaymentToggle');
                if (!table) return;
                var expanded = isPaymentExpanded();
                if (expanded) {
                    table.classList.remove('payment-cols-hidden');
                    if (btn) { btn.textContent = '\u25BE Payment'; btn.classList.add('expanded'); }
                } else {
                    table.classList.add('payment-cols-hidden');
                    if (btn) { btn.textContent = '\u25B8 Payment'; btn.classList.remove('expanded'); }
                }
            }

            function renderTable(filter) {
                var tbody = document.getElementById('campaignsTableBody');
                var empty = document.getElementById('campaignsEmpty');
                var countEl = document.getElementById('campaignsCount');
                if (!tbody) return;
                var rows = loadData();
                var filterLower = (filter || '').toLowerCase().trim();

                var filtered = rows;
                if (filterLower) {
                    filtered = rows.filter(function(r) {
                        return (r.clientName || '').toLowerCase().indexOf(filterLower) !== -1;
                    });
                }

                tbody.innerHTML = '';
                if (filtered.length === 0) {
                    empty.style.display = '';
                } else {
                    empty.style.display = 'none';
                }

                filtered.forEach(function(row) {
                    var tr = document.createElement('tr');
                    tr.setAttribute('data-row-id', row._id);
                    var isComplete = row.status === 'complete';
                    if (isComplete) tr.classList.add('camp-row-done');

                    /* Auto-detect campaign info for this row */
                    var detectedType = getCampaignType(row);
                    var detectedTarget = formatTarget(row);
                    var pct = calcProgress(row);

                    COLS.forEach(function(col) {
                        var td = document.createElement('td');
                        var isTracking = isTrackingCol(col);

                        /* Mark tracking/payment columns for CSS hiding */
                        if (isTracking) td.setAttribute('data-col-group', 'tracking');
                        if (isPaymentCol(col)) td.setAttribute('data-col-group', 'payment');

                        /* ── Special rendering for tracking columns ── */
                        if (col === 'campaignType') {
                            td.appendChild(buildTypeBadge(detectedType));
                            /* No click-to-edit for auto-detected type */
                            tr.appendChild(td);
                            return;
                        }
                        if (col === 'targetCount') {
                            td.textContent = detectedTarget;
                            /* Read-only auto-detected */
                            tr.appendChild(td);
                            return;
                        }
                        if (col === 'progressPct') {
                            td.appendChild(buildProgressBar(pct));
                            /* Read-only auto-calculated */
                            tr.appendChild(td);
                            return;
                        }

                        /* Editable tracking columns */
                        if (col === 'currentCount') {
                            td.textContent = row.currentCount || '';
                            td.addEventListener('click', function() { startEdit(td, row._id, col, row.currentCount || ''); });
                            tr.appendChild(td);
                            return;
                        }
                        if (col === 'startDate') {
                            td.textContent = row.startDate || '';
                            td.addEventListener('click', function() { startDateEdit(td, row._id, 'startDate', row.startDate || ''); });
                            tr.appendChild(td);
                            return;
                        }
                        if (col === 'eta') {
                            td.textContent = row.eta || '';
                            td.addEventListener('click', function() { startDateEdit(td, row._id, 'eta', row.eta || ''); });
                            tr.appendChild(td);
                            return;
                        }
                        if (col === 'trackingNotes') {
                            td.textContent = row.trackingNotes || '';
                            td.style.maxWidth = '140px';
                            td.addEventListener('click', function() { startEdit(td, row._id, col, row.trackingNotes || ''); });
                            tr.appendChild(td);
                            return;
                        }

                        /* ── Standard columns ── */
                        var val = row[col] || '';

                        if (isLinkCol(col) && val) {
                            var link = document.createElement('a');
                            link.className = 'cell-link';
                            link.href = val;
                            link.target = '_blank';
                            link.rel = 'noopener';
                            link.textContent = val.length > 28 ? val.substr(0,28) + '...' : val;
                            link.title = val;
                            td.appendChild(link);
                            td.addEventListener('dblclick', function() { startEdit(td, row._id, col, val); });
                        } else {
                            td.textContent = val;
                            td.addEventListener('click', function() { startEdit(td, row._id, col, val); });
                        }
                        tr.appendChild(td);
                    });

                    /* ── Mark Complete / Completed badge column ── */
                    var compTd = document.createElement('td');
                    compTd.style.textAlign = 'center';
                    compTd.style.padding = '4px';
                    if (isComplete) {
                        var badge = document.createElement('span');
                        badge.className = 'camp-done-badge';
                        badge.title = 'Completed' + (row.completedAt ? ' ' + new Date(row.completedAt).toLocaleDateString() : '');
                        badge.textContent = '\u2714';
                        compTd.appendChild(badge);
                    } else {
                        var compBtn = document.createElement('button');
                        compBtn.className = 'camp-row-complete';
                        compBtn.title = 'Mark campaign complete';
                        compBtn.textContent = '\u2714';
                        compBtn.addEventListener('click', function() { markComplete(row._id); });
                        compTd.appendChild(compBtn);
                    }
                    tr.appendChild(compTd);

                    var delTd = document.createElement('td');
                    delTd.style.textAlign = 'center';
                    delTd.style.padding = '4px';
                    var delBtn = document.createElement('button');
                    delBtn.className = 'camp-row-delete';
                    delBtn.title = 'Delete row';
                    delBtn.textContent = '\u2715';
                    delBtn.addEventListener('click', function() { deleteRow(row._id); });
                    delTd.appendChild(delBtn);
                    tr.appendChild(delTd);

                    tbody.appendChild(tr);
                });

                if (countEl) countEl.textContent = filtered.length + ' campaign' + (filtered.length !== 1 ? 's' : '');

                /* Ensure toggle state is applied */
                applyTrackingToggleState();
                applyPaymentToggleState();
            }

            /* ── Date-specific inline editor (uses type="date") ── */
            function startDateEdit(td, rowId, col, currentVal) {
                if (td.querySelector('.cell-edit')) return;
                td.innerHTML = '';
                var input = document.createElement('input');
                input.className = 'cell-edit';
                input.type = 'date';
                input.value = currentVal || '';
                input.style.width = '100%';
                input.addEventListener('blur', function() { commitEdit(rowId, col, input.value); });
                input.addEventListener('change', function() { commitEdit(rowId, col, input.value); });
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') { input.blur(); }
                    if (e.key === 'Escape') { renderTable(getCurrentFilter()); }
                });
                td.appendChild(input);
                input.focus();
            }

            function startEdit(td, rowId, col, currentVal) {
                if (td.querySelector('.cell-edit')) return;
                td.innerHTML = '';
                var input = document.createElement('input');
                input.className = 'cell-edit';
                input.type = 'text';
                input.value = currentVal || '';
                input.addEventListener('blur', function() { commitEdit(rowId, col, input.value); });
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') { input.blur(); }
                    if (e.key === 'Escape') { renderTable(getCurrentFilter()); }
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        input.blur();
                        var nextTd = td.nextElementSibling;
                        if (nextTd && !nextTd.querySelector('.camp-row-delete')) {
                            nextTd.click();
                        }
                    }
                });
                td.appendChild(input);
                input.focus();
                input.select();
            }

            function commitEdit(rowId, col, newVal) {
                var rows = loadData();
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i]._id === rowId) {
                        rows[i][col] = newVal;
                        break;
                    }
                }
                saveData(rows);
                renderTable(getCurrentFilter());
            }

            function deleteRow(rowId) {
                var rows = loadData();
                rows = rows.filter(function(r) { return r._id !== rowId; });
                saveData(rows);
                renderTable(getCurrentFilter());
            }

            /* ── Mark Campaign Complete ── */
            var BACKUP_KEY = 'wingdash_campaigns_backup';
            function markComplete(rowId) {
                var rows = loadData();
                var target = null;
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i]._id === rowId) {
                        rows[i].status = 'complete';
                        rows[i].completedAt = new Date().toISOString();
                        target = rows[i];
                        break;
                    }
                }
                if (!target) return;
                saveData(rows);

                /* Backup: store completed campaign in separate localStorage key */
                var backups = [];
                try { backups = JSON.parse(localStorage.getItem(BACKUP_KEY)) || []; } catch(e) { backups = []; }
                /* Avoid duplicate backups */
                var alreadyBacked = backups.some(function(b) { return b._id === target._id; });
                if (!alreadyBacked) {
                    backups.push(JSON.parse(JSON.stringify(target)));
                    localStorage.setItem(BACKUP_KEY, JSON.stringify(backups));
                }

                /* Re-render table */
                renderTable(getCurrentFilter());

                /* Flash the completed row green */
                setTimeout(function() {
                    var tr = document.querySelector('tr[data-row-id="' + rowId + '"]');
                    if (tr) {
                        tr.classList.add('camp-row-flash');
                        tr.addEventListener('animationend', function() { tr.classList.remove('camp-row-flash'); });
                    }
                }, 30);

                console.log('[Campaigns] Marked complete:', target.clientName || rowId);
            }

            function addRow() {
                var rows = loadData();
                var newRow = { _id: genId() };
                COLS.forEach(function(c) { newRow[c] = ''; });
                if (typeof activeClient !== 'undefined' && activeClient && activeClient.name) {
                    newRow.clientName = activeClient.name;
                }
                rows.push(newRow);
                saveData(rows);
                renderTable(getCurrentFilter());
                setTimeout(function() {
                    var tbody = document.getElementById('campaignsTableBody');
                    if (tbody && tbody.lastElementChild) {
                        var firstTd = tbody.lastElementChild.querySelector('td');
                        if (firstTd) firstTd.click();
                    }
                }, 50);
            }

            function getCurrentFilter() {
                var searchInput = document.getElementById('campSearchInput');
                var filterLabel = document.getElementById('campaignsFilterLabel');
                if (searchInput && searchInput.value.trim()) return searchInput.value.trim();
                if (filterLabel && filterLabel.textContent !== 'All Clients') return filterLabel.textContent;
                return '';
            }

            var addBtn = document.getElementById('campAddRow');
            if (addBtn) addBtn.addEventListener('click', addRow);

            var searchInput = document.getElementById('campSearchInput');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    renderTable(getCurrentFilter());
                });
            }

            /* ── Tracking Toggle Button ── */
            var trackToggle = document.getElementById('campTrackingToggle');
            if (trackToggle) {
                trackToggle.addEventListener('click', function() {
                    var expanded = isTrackingExpanded();
                    setTrackingExpanded(!expanded);
                    applyTrackingToggleState();
                });
            }
            /* Apply saved state on load */
            applyTrackingToggleState();

            /* ── Payment Toggle Button ── */
            var payToggle = document.getElementById('campPaymentToggle');
            if (payToggle) {
                payToggle.addEventListener('click', function() {
                    var expanded = isPaymentExpanded();
                    setPaymentExpanded(!expanded);
                    applyPaymentToggleState();
                });
            }
            /* Apply saved state on load */
            applyPaymentToggleState();

            var filterLabel = document.getElementById('campaignsFilterLabel');
            if (filterLabel) {
                filterLabel.style.cursor = 'pointer';
                filterLabel.addEventListener('click', function() {
                    if (filterLabel.textContent !== 'All Clients') {
                        filterLabel.textContent = 'All Clients';
                    } else if (typeof activeClient !== 'undefined' && activeClient && activeClient.name) {
                        filterLabel.textContent = activeClient.name;
                    }
                    if (searchInput) searchInput.value = '';
                    renderTable(getCurrentFilter());
                });
            }

            window._campaignsRender = function() { renderTable(getCurrentFilter()); };

            /* ── Expose: add a campaign row with pre-filled client data ── */
            window._campaignsAddRowFor = function(clientName, clientId) {
                var rows = loadData();
                var newRow = { _id: genId() };
                COLS.forEach(function(c) { newRow[c] = ''; });
                newRow.clientName = clientName || '';
                newRow.clientId = clientId || '';
                rows.push(newRow);
                saveData(rows);
                /* Backup immediately */
                var backups = [];
                try { backups = JSON.parse(localStorage.getItem(BACKUP_KEY)) || []; } catch(e) { backups = []; }
                backups.push(JSON.parse(JSON.stringify(newRow)));
                localStorage.setItem(BACKUP_KEY, JSON.stringify(backups));
                renderTable(getCurrentFilter());
                return newRow;
            };

            renderTable('');
        })();

        /* ══════════════════════════════════════════════
           All Campaigns — Tab Switching (Campaigns / Suppliers)
           ══════════════════════════════════════════════ */
        (function initCampaignsTabs() {
            var tabBtns = document.querySelectorAll('.campaigns-tab-bar .campaigns-tab');
            tabBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var tabKey = btn.getAttribute('data-camp-tab');
                    switchCampaignsTab(tabKey);
                });
            });

            window.switchCampaignsTab = function(tabKey) {
                /* Update tab buttons */
                var allTabs = document.querySelectorAll('.campaigns-tab-bar .campaigns-tab');
                allTabs.forEach(function(t) {
                    t.classList.toggle('active', t.getAttribute('data-camp-tab') === tabKey);
                });
                /* Update tab content */
                var allContent = document.querySelectorAll('.campaigns-tab-content');
                allContent.forEach(function(c) {
                    c.classList.toggle('active', c.getAttribute('data-camp-tab-content') === tabKey);
                });
                console.log('[Campaigns] Switched to tab:', tabKey);
            };
        })();

        /* ══════════════════════════════════════════════
           Supplier Sub-Tabs — Switching + CRUD + localStorage
           ══════════════════════════════════════════════ */
        (function initSupplierTabs() {
            var SUPPLIERS = ['brandon', 'nik', 'tyler', 'peter'];
            var SUPPLIER_COLS = ['orderName','client','platform','qtyTarget','cost','status','dateSent','eta','notes','assigned'];
            var SUPPLIER_DETAIL_COLS = ['supplierAssigned','wholesaleCost','turnaroundTime'];
            var SUPPLIER_DETAIL_LABELS = ['Supplier Assigned','Wholesale Cost','Turnaround Time'];
            var SUPPLIER_LABELS = ['Order Name','Client','Platform','Qty / Target','Cost','Status','Date Sent','ETA','Notes','Assigned'];
            var LINK_COLS = [];
            var STATUS_OPTIONS = ['', 'Pending', 'In Progress', 'Delivered', 'Complete', 'Issue'];

            function storageKey(name) { return 'wingdash_supplier_' + name; }
            function loadSupplierData(name) {
                try { return JSON.parse(localStorage.getItem(storageKey(name))) || []; }
                catch(e) { return []; }
            }
            function saveSupplierData(name, rows) {
                localStorage.setItem(storageKey(name), JSON.stringify(rows));
            }
            function genId() { return 's_' + Date.now() + '_' + Math.random().toString(36).substr(2,5); }

            /* ── Sub-tab switching ── */
            var subTabBtns = document.querySelectorAll('.supplier-sub-tab-bar .supplier-sub-tab');
            subTabBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var supplier = btn.getAttribute('data-supplier-tab');
                    switchSupplierSubTab(supplier);
                });
            });

            window.switchSupplierSubTab = function(supplier) {
                /* Update sub-tab buttons */
                var allSubs = document.querySelectorAll('.supplier-sub-tab-bar .supplier-sub-tab');
                allSubs.forEach(function(s) {
                    s.classList.toggle('active', s.getAttribute('data-supplier-tab') === supplier);
                });
                /* Update panes */
                var allPanes = document.querySelectorAll('.supplier-tab-pane');
                allPanes.forEach(function(p) {
                    p.classList.toggle('active', p.getAttribute('data-supplier-pane') === supplier);
                });
                /* Re-render this supplier's table */
                renderSupplierTable(supplier);
                console.log('[Suppliers] Switched to sub-tab:', supplier);
            };

            /* ── Render supplier table ── */
            function renderSupplierTable(name, filter) {
                var tbody = document.getElementById('supplierBody_' + name);
                var emptyEl = document.getElementById('supplierEmpty_' + name);
                var countEl = document.getElementById('supplierCount_' + name);
                if (!tbody) return;

                var rows = loadSupplierData(name);
                var filterLower = (filter || '').toLowerCase().trim();

                var filtered = rows;
                if (filterLower) {
                    filtered = rows.filter(function(r) {
                        return (r.orderName || '').toLowerCase().indexOf(filterLower) !== -1 ||
                               (r.client || '').toLowerCase().indexOf(filterLower) !== -1 ||
                               (r.platform || '').toLowerCase().indexOf(filterLower) !== -1;
                    });
                }

                tbody.innerHTML = '';
                if (filtered.length === 0) {
                    if (emptyEl) emptyEl.style.display = '';
                } else {
                    if (emptyEl) emptyEl.style.display = 'none';
                }

                filtered.forEach(function(row) {
                    var tr = document.createElement('tr');
                    tr.setAttribute('data-row-id', row._id);

                    SUPPLIER_COLS.forEach(function(col) {
                        var td = document.createElement('td');
                        var val = row[col] || '';

                        if (col === 'status') {
                            td.textContent = val;
                            /* Color the status text */
                            if (val === 'Complete') td.style.color = '#10b981';
                            else if (val === 'In Progress') td.style.color = '#f59e0b';
                            else if (val === 'Delivered') td.style.color = '#0ea5e9';
                            else if (val === 'Issue') td.style.color = '#ef4444';
                            else if (val === 'Pending') td.style.color = '#94a3b8';
                            td.addEventListener('click', function() { startSupplierStatusEdit(td, name, row._id, val); });
                        } else if (col === 'dateSent' || col === 'eta') {
                            td.textContent = val;
                            td.addEventListener('click', function() { startSupplierDateEdit(td, name, row._id, col, val); });
                        } else {
                            td.textContent = val;
                            td.addEventListener('click', function() { startSupplierEdit(td, name, row._id, col, val); });
                        }
                        tr.appendChild(td);
                    });

                    /* Supplier Detail columns (hidden by default via CSS) */
                    SUPPLIER_DETAIL_COLS.forEach(function(col) {
                        var td = document.createElement('td');
                        td.setAttribute('data-col-group', 'supplier-details');
                        var val = row[col] || '';
                        td.textContent = val;
                        td.addEventListener('click', function() { startSupplierEdit(td, name, row._id, col, val); });
                        tr.appendChild(td);
                    });

                    /* Delete button */
                    var delTd = document.createElement('td');
                    delTd.style.textAlign = 'center';
                    delTd.style.padding = '4px';
                    var delBtn = document.createElement('button');
                    delBtn.className = 'camp-row-delete';
                    delBtn.title = 'Delete row';
                    delBtn.textContent = '\u2715';
                    delBtn.addEventListener('click', function() { deleteSupplierRow(name, row._id); });
                    delTd.appendChild(delBtn);
                    tr.appendChild(delTd);

                    tbody.appendChild(tr);
                });

                if (countEl) countEl.textContent = filtered.length + ' order' + (filtered.length !== 1 ? 's' : '');
            }

            /* ── Inline edit (text) ── */
            function startSupplierEdit(td, supplierName, rowId, col, currentVal) {
                if (td.querySelector('.cell-edit')) return;
                td.innerHTML = '';
                var input = document.createElement('input');
                input.className = 'cell-edit';
                input.type = 'text';
                input.value = currentVal || '';
                input.addEventListener('blur', function() { commitSupplierEdit(supplierName, rowId, col, input.value); });
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') input.blur();
                    if (e.key === 'Escape') renderSupplierTable(supplierName, getSupplierFilter(supplierName));
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        input.blur();
                        var nextTd = td.nextElementSibling;
                        if (nextTd && !nextTd.querySelector('.camp-row-delete')) nextTd.click();
                    }
                });
                td.appendChild(input);
                input.focus();
                input.select();
            }

            /* ── Inline edit (date) ── */
            function startSupplierDateEdit(td, supplierName, rowId, col, currentVal) {
                if (td.querySelector('.cell-edit')) return;
                td.innerHTML = '';
                var input = document.createElement('input');
                input.className = 'cell-edit';
                input.type = 'date';
                input.value = currentVal || '';
                input.style.width = '100%';
                input.addEventListener('blur', function() { commitSupplierEdit(supplierName, rowId, col, input.value); });
                input.addEventListener('change', function() { commitSupplierEdit(supplierName, rowId, col, input.value); });
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') input.blur();
                    if (e.key === 'Escape') renderSupplierTable(supplierName, getSupplierFilter(supplierName));
                });
                td.appendChild(input);
                input.focus();
            }

            /* ── Inline edit (status dropdown) ── */
            function startSupplierStatusEdit(td, supplierName, rowId, currentVal) {
                if (td.querySelector('.cell-edit')) return;
                td.innerHTML = '';
                var sel = document.createElement('select');
                sel.className = 'cell-edit';
                STATUS_OPTIONS.forEach(function(opt) {
                    var o = document.createElement('option');
                    o.value = opt; o.textContent = opt || '-- select --';
                    if (opt === currentVal) o.selected = true;
                    sel.appendChild(o);
                });
                sel.addEventListener('change', function() { commitSupplierEdit(supplierName, rowId, 'status', sel.value); });
                sel.addEventListener('blur', function() { commitSupplierEdit(supplierName, rowId, 'status', sel.value); });
                td.appendChild(sel);
                sel.focus();
            }

            /* ── Commit edit ── */
            function commitSupplierEdit(supplierName, rowId, col, newVal) {
                var rows = loadSupplierData(supplierName);
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i]._id === rowId) {
                        rows[i][col] = newVal;
                        break;
                    }
                }
                saveSupplierData(supplierName, rows);
                renderSupplierTable(supplierName, getSupplierFilter(supplierName));
            }

            /* ── Delete row ── */
            function deleteSupplierRow(supplierName, rowId) {
                var rows = loadSupplierData(supplierName);
                rows = rows.filter(function(r) { return r._id !== rowId; });
                saveSupplierData(supplierName, rows);
                renderSupplierTable(supplierName, getSupplierFilter(supplierName));
            }

            /* ── Add row ── */
            function addSupplierRow(supplierName) {
                var rows = loadSupplierData(supplierName);
                var newRow = { _id: genId() };
                SUPPLIER_COLS.forEach(function(c) { newRow[c] = ''; });
                SUPPLIER_DETAIL_COLS.forEach(function(c) { newRow[c] = ''; });
                rows.push(newRow);
                saveSupplierData(supplierName, rows);
                renderSupplierTable(supplierName, getSupplierFilter(supplierName));
                /* Focus first cell of new row */
                setTimeout(function() {
                    var tbody = document.getElementById('supplierBody_' + supplierName);
                    if (tbody && tbody.lastElementChild) {
                        var firstTd = tbody.lastElementChild.querySelector('td');
                        if (firstTd) firstTd.click();
                    }
                }, 50);
            }

            /* ── Get search filter ── */
            function getSupplierFilter(supplierName) {
                var input = document.querySelector('[data-supplier-search="' + supplierName + '"]');
                return input ? input.value.trim() : '';
            }

            /* ── Wire Add buttons ── */
            SUPPLIERS.forEach(function(name) {
                var addBtn = document.querySelector('[data-supplier-add="' + name + '"]');
                if (addBtn) {
                    addBtn.addEventListener('click', function() { addSupplierRow(name); });
                }
                /* Wire search inputs */
                var searchInput = document.querySelector('[data-supplier-search="' + name + '"]');
                if (searchInput) {
                    searchInput.addEventListener('input', function() {
                        renderSupplierTable(name, searchInput.value.trim());
                    });
                }
                /* Initial render */
                renderSupplierTable(name);
            });

            /* ── Expose: open campaigns panel directly to Suppliers tab with a specific supplier ── */
            window.openCampaignsToSupplier = function(supplierKey) {
                /* Open the campaigns panel first */
                if (typeof openCampaigns === 'function') openCampaigns();
                /* Switch to Suppliers main tab */
                if (typeof switchCampaignsTab === 'function') switchCampaignsTab('suppliers');
                /* Switch to the specific supplier sub-tab */
                if (typeof switchSupplierSubTab === 'function') switchSupplierSubTab(supplierKey.toLowerCase());
            };
        })();

        function openArtistMatrix() {
            AppViewer.open(ARTIST_MATRIX_URL, '\ud83d\udd78\ufe0f Artist Matrix');
        }

        function openClientNetwork() {
            AppViewer.open(CLIENT_NETWORK_URL, '\ud83d\udd17 Client Network');
        }

        function openClientPricing() {
            AppViewer.open(CLIENT_PRICING_URL, '\ud83d\udcb0 Client Pricing');
        }

        function openClientPricingB() {
            AppViewer.open(CLIENT_PRICING_B_URL, '\ud83d\udcb2 Client Price View B');
        }

        /* ══════════════════════════════════════════════
           Place Section — Update from selected client
           ══════════════════════════════════════════════ */

        function updatePlace(clientName) {
            var place = document.getElementById('wingPlace');
            var nameEl = document.getElementById('placeClientName');
            var baseEl = document.getElementById('placeBasePath');
            var subEl = document.getElementById('placeSubPath');
            var statusEl = document.getElementById('placeDriveStatus');

            nameEl.textContent = clientName;

            // Try to read saved paths from ClientDrive localStorage
            try {
                var stored = JSON.parse(localStorage.getItem('clientDrivePaths')) || {};
                var paths = stored[clientName];
                var goBtn = document.getElementById('placeGoBtn');
                if (paths && paths.basePath) {
                    baseEl.textContent = paths.basePath || '—';
                    subEl.textContent = paths.subPath || '—';
                    statusEl.textContent = 'paths locked';
                    if (goBtn) goBtn.classList.add('active');
                } else {
                    baseEl.textContent = '—';
                    subEl.textContent = '—';
                    statusEl.textContent = 'no paths set';
                    if (goBtn) goBtn.classList.remove('active');
                }
            } catch(e) {
                baseEl.textContent = '—';
                subEl.textContent = '—';
                statusEl.textContent = 'error reading paths';
                var goBtn2 = document.getElementById('placeGoBtn');
                if (goBtn2) goBtn2.classList.remove('active');
            }

            place.classList.add('active');
        }

        /* ══════════════════════════════════════════════
           Center GO Button — fires loaded path to
           right wing pipeline status card
           ══════════════════════════════════════════════ */

        (function initCenterGo() {
            var goBtn = document.getElementById('centerGoBtn');
            var goWrap = document.getElementById('centerGoWrap');
            if (!goBtn) return;

            // Watch the Place section for changes — when client + paths are filled, light up
            function checkPlaceReady() {
                var clientName = document.getElementById('placeClientName');
                var basePath = document.getElementById('placeBasePath');
                var hasClient = clientName && clientName.textContent && clientName.textContent !== 'No client selected';
                var hasBase = basePath && basePath.textContent && basePath.textContent !== '—' && basePath.textContent !== '';
                if (hasClient && hasBase) {
                    goBtn.classList.add('ready');
                    goBtn.disabled = false;
                    goBtn.title = 'Send to pipeline →';
                } else {
                    goBtn.classList.remove('ready');
                    goBtn.disabled = true;
                    goBtn.title = 'Load a client path first';
                }
            }

            // Poll every 500ms for Place section changes
            setInterval(checkPlaceReady, 500);
            checkPlaceReady();

            // On click — fire path data to right wing pipeline status card
            goBtn.addEventListener('click', function() {
                if (goBtn.disabled) return;
                var clientName = (document.getElementById('placeClientName') || {}).textContent || '';
                var basePath = (document.getElementById('placeBasePath') || {}).textContent || '';
                var subPath = (document.getElementById('placeSubPath') || {}).textContent || '';

                // Set active client for pipeline travel flow
                activeClient = { name: clientName, basePath: basePath, subPath: subPath };
                if (typeof updateJourneyCardHomeBaseBtn === 'function') updateJourneyCardHomeBaseBtn();

                // Populate right wing pipeline status card
                var pipeCard = document.getElementById('pipelineStatusCard');
                var pipeName = document.getElementById('pipelineClientName');
                var pipeBase = document.getElementById('pipelineBasePath');
                var pipeSub = document.getElementById('pipelineSubPath');
                var pipeLock = document.getElementById('pipelineLockStatus');

                if (pipeName) pipeName.textContent = clientName;
                if (pipeBase) pipeBase.textContent = basePath;
                if (pipeSub) pipeSub.textContent = subPath || '—';
                if (pipeLock) pipeLock.textContent = '● paths locked';
                if (pipeCard) pipeCard.classList.add('active');

                // Populate Live Mirror Box in Pipeline section 1
                var lmName = document.getElementById('liveClientName');
                var lmBase = document.getElementById('liveBasePath');
                var lmSub = document.getElementById('liveSubPath');
                var lmLock = document.getElementById('liveLockStatus');
                var lmBox = document.getElementById('liveMirrorBox');
                if (lmName) lmName.textContent = clientName;
                if (lmBase) lmBase.textContent = basePath;
                if (lmSub) lmSub.textContent = subPath || '—';
                if (lmLock) { lmLock.textContent = '● paths locked'; lmLock.style.color = '#10b981'; }
                if (lmBox) { lmBox.style.borderColor = 'rgba(242,165,74,0.5)'; setTimeout(function(){ lmBox.style.borderColor = ''; }, 1200); }
                var liveDot = document.getElementById('liveMirrorDot');
                if (liveDot) { liveDot.classList.add('live-pulse'); liveDot.style.display = 'inline-block'; }

                // Reset all pipeline steps to pending
                for (var s = 1; s <= 10; s++) {
                    var st = document.querySelector('#pipeStep' + s + ' .pipe-step-status');
                    if (st) { st.textContent = 'pending'; st.setAttribute('data-status', 'pending'); }
                    var card = document.getElementById('pipeStep' + s);
                    if (card) { card.classList.remove('pipe-step-active'); card.classList.remove('pipe-step-done'); }
                }

                // Reset journey card client state for fresh pipeline
                clearClientFromJourneyCard();

                // Visual feedback — brief flash
                goBtn.style.background = 'rgba(16,185,129,0.3)';
                goBtn.style.borderColor = '#10b981';
                var goText = goBtn.querySelector('.center-go-text');
                if (goText) goText.textContent = 'SENT ✓';
                setTimeout(function() {
                    goBtn.style.background = '';
                    goBtn.style.borderColor = '';
                    if (goText) goText.textContent = 'GO';
                }, 1200);

                // Switch right wing to Pipeline (section 1, index 0) if not already there
                var rightArrows = document.querySelectorAll('.wing-arrow[data-wing="right"]');
                // Trigger a custom event or just ensure pipeline section is visible
                console.log('[CenterGO] Path sent to pipeline:', clientName, basePath, subPath);

                // Navigate right wing to Pipeline (section 1, index 0)
                goToSection('right', 0);

                // Mobile: slide wing open (< 1000px)
                var rightWing = document.getElementById('wingRight');
                if (rightWing && window.innerWidth < 1000) {
                    var bk = document.getElementById('wingBackdrop');
                    var wl = document.getElementById('wingLeft');
                    if (wl) wl.classList.remove('wing-open');
                    rightWing.classList.add('wing-open');
                    if (bk) bk.classList.add('show');
                }

                // Visual flash so you SEE it respond
                if (rightWing) {
                    rightWing.style.transition = 'box-shadow 0.3s ease';
                    rightWing.style.boxShadow = 'inset 0 0 30px rgba(242,165,74,0.4)';
                    setTimeout(function() {
                        rightWing.style.boxShadow = '';
                    }, 800);
                }

                // ── AUTO-CARRY: GO fires all the way to Load to Card ──
                setTimeout(function() {
                    // Mark step 1 (Review Client) as done
                    var s1 = document.getElementById('pipeStep1');
                    var s1s = s1 ? s1.querySelector('.pipe-step-status') : null;
                    if (s1s) { s1s.setAttribute('data-status', 'active'); s1s.textContent = 'active'; }
                    if (s1) s1.classList.add('pipe-step-active');

                    // After a beat, fire step 2 — Load to Card
                    setTimeout(function() {
                        // Safety: ensure activeClient is still set from GO handler
                        if (!activeClient || !activeClient.name) {
                            var lmn = document.getElementById('liveClientName');
                            var fallbackName = (lmn && lmn.textContent !== '—') ? lmn.textContent : null;
                            if (fallbackName) {
                                activeClient = { name: fallbackName, basePath: '', subPath: '' };
                                if (typeof updateJourneyCardHomeBaseBtn === 'function') updateJourneyCardHomeBaseBtn();
                            }
                        }
                        var s2 = document.getElementById('pipeStep2');
                        if (s2) s2.click();
                        console.log('[CenterGO] Auto-carried to Load to Card, activeClient:', activeClient ? activeClient.name : 'null');
                    }, 500);
                }, 700);
            });

            // TEST button — FULL client travel flow simulation
            // Place → GO → Pipeline → Journey Card (with visible delays)
            var testBtn = document.getElementById('centerTestBtn');
            if (testBtn) {
                testBtn.addEventListener('click', function() {
                    console.log('[CenterTEST] ▶ Starting full travel flow...');

                    // ── STEP 1: Fill Place section with test client data ──
                    var cn = document.getElementById('placeClientName');
                    var bp = document.getElementById('placeBasePath');
                    var sp = document.getElementById('placeSubPath');
                    if (cn) cn.textContent = 'Marc Antonix';
                    if (bp) bp.textContent = '/artists/marc-antonix';
                    if (sp) sp.textContent = '/masters/final';

                    // Set activeClient directly so pipeline steps don't depend on DOM re-reads
                    activeClient = { name: 'Marc Antonix', basePath: '/artists/marc-antonix', subPath: '/masters/final' };
                    if (typeof updateJourneyCardHomeBaseBtn === 'function') updateJourneyCardHomeBaseBtn();
                    selectedClient = { icon: '◆', label: 'Marc Antonix', sub: 'Artist', isClient: true };

                    console.log('[CenterTEST] Step 1 ✓ Place section filled + activeClient set');

                    // Brief flash on the Place section so you SEE it
                    var placeEl = document.getElementById('wingPlace');
                    if (placeEl) {
                        placeEl.style.transition = 'box-shadow 0.3s ease';
                        placeEl.style.boxShadow = 'inset 0 0 20px rgba(14,165,233,0.4)';
                        setTimeout(function() { placeEl.style.boxShadow = ''; }, 600);
                    }

                    // ── STEP 2: Auto-trigger GO (after delay so user sees Place fill) ──
                    // GO now auto-carries all the way to Load to Card, so just fire it
                    setTimeout(function() {
                        console.log('[CenterTEST] Step 2 ▶ Firing GO (auto-carries to Load to Card)...');
                        var centerGo = document.getElementById('centerGoBtn');
                        if (centerGo) {
                            centerGo.classList.add('ready');
                            centerGo.disabled = false;
                            centerGo.click();
                            console.log('[CenterTEST] Step 2 ✓ GO fired — auto-carry handles pipeline + journey card');
                        }
                    }, 400);  // Delay before firing GO
                });
            }
        })();

        /* ══════════════════════════════════════════════
           Shared API Loading Banner — used by ALL Claude
           API calls (Create Proposal, Create Presentation, etc.)
        ══════════════════════════════════════════════ */
        var _apiLoadingBanner = document.getElementById('apiLoadingBanner');
        var _apiLoadingDots = document.getElementById('apiLoadingDots');
        var _apiLoadingMsg = document.getElementById('apiLoadingMsg');
        var _apiLoadingSub = document.getElementById('apiLoadingSub');
        var _apiDotsTimer = null;

        function showApiLoading(message, subText) {
            if (!_apiLoadingBanner) return;
            _apiLoadingBanner.classList.remove('success', 'error');
            _apiLoadingMsg.textContent = message || 'Processing...';
            _apiLoadingSub.textContent = subText || 'Calling Claude API';
            // Animate dots: cycle through . .. ... patterns
            var dotCount = 0;
            function tickDots() {
                dotCount = (dotCount % 3) + 1;
                var dots = '';
                for (var i = 0; i < 3; i++) dots += (i < dotCount) ? '\u2022' : ' ';
                if (_apiLoadingDots) _apiLoadingDots.textContent = dots;
            }
            tickDots();
            clearInterval(_apiDotsTimer);
            _apiDotsTimer = setInterval(tickDots, 400);
            _apiLoadingBanner.classList.add('visible');
            console.log('[ApiLoading] SHOW:', message);
        }

        function hideApiLoading(success, resultMsg) {
            if (!_apiLoadingBanner) return;
            clearInterval(_apiDotsTimer);
            if (success) {
                _apiLoadingBanner.classList.add('success');
                _apiLoadingBanner.classList.remove('error');
                if (_apiLoadingDots) _apiLoadingDots.textContent = '\u2713';
                if (_apiLoadingMsg) _apiLoadingMsg.textContent = resultMsg || 'Done!';
                if (_apiLoadingSub) _apiLoadingSub.textContent = '';
            } else {
                _apiLoadingBanner.classList.add('error');
                _apiLoadingBanner.classList.remove('success');
                if (_apiLoadingDots) _apiLoadingDots.textContent = '\u2717';
                if (_apiLoadingMsg) _apiLoadingMsg.textContent = resultMsg || 'Something went wrong';
                if (_apiLoadingSub) _apiLoadingSub.textContent = '';
            }
            setTimeout(function() {
                _apiLoadingBanner.classList.remove('visible', 'success', 'error');
            }, success ? 1800 : 3500);
            console.log('[ApiLoading] HIDE:', success ? 'SUCCESS' : 'ERROR', resultMsg);
        }

        /* ══════════════════════════════════════════════
           Shared API Key Manager — single source of truth
           for all Claude API calls in the dashboard
        ══════════════════════════════════════════════ */
        var API_KEY_STORAGE = 'wingdash_claude_api_key';

        /* Auto-set API key on load (only if nothing stored yet) */
        if (!localStorage.getItem(API_KEY_STORAGE)) {
            localStorage.setItem(API_KEY_STORAGE, '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');
        }

        function getApiKey() {
            try { return localStorage.getItem(API_KEY_STORAGE) || ''; } catch(e) { return ''; }
        }

        function setApiKey(key) {
            try { localStorage.setItem(API_KEY_STORAGE, key); } catch(e) {}
        }

        function promptForApiKey() {
            var current = getApiKey();
            var key = prompt('Enter your Claude API key (sk-ant-...):', current);
            if (key !== null && key.trim()) {
                setApiKey(key.trim());
                return key.trim();
            }
            return null;
        }

        /**
         * callClaudeAPI — shared fetch wrapper for all Claude API calls.
         * Returns a Promise that resolves with the text content from Claude.
         * Handles CORS, error parsing, API key validation, and loading UI.
         */
        function callClaudeAPI(options) {
            var promptText = options.prompt || '';
            var maxTokens = options.maxTokens || 1500;
            var loadingMsg = options.loadingMsg || 'Generating...';
            var loadingSub = options.loadingSub || 'Calling Claude API';
            var tag = options.tag || 'API';

            var apiKey = getApiKey();
            console.log('[' + tag + '] API key check:', apiKey ? 'Found (' + apiKey.substring(0, 12) + '...)' : 'MISSING');

            if (!apiKey) {
                apiKey = promptForApiKey();
                if (!apiKey) {
                    console.log('[' + tag + '] No API key provided — aborting');
                    return Promise.reject(new Error('No API key provided'));
                }
            }

            showApiLoading(loadingMsg, loadingSub);
            console.log('[' + tag + '] Sending request to Claude API...');

            return fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: maxTokens,
                    messages: [{ role: 'user', content: promptText }]
                })
            })
            .then(function(res) {
                console.log('[' + tag + '] Response received — status:', res.status);
                if (!res.ok) {
                    return res.json().then(function(err) {
                        var errMsg = (err.error ? err.error.message : 'API error ' + res.status);
                        console.error('[' + tag + '] API error response:', errMsg);
                        throw new Error(errMsg);
                    });
                }
                return res.json();
            })
            .then(function(data) {
                var text = '';
                if (data.content && data.content.length > 0) {
                    text = data.content[0].text || '';
                }
                // Strip markdown code fences if wrapped
                text = text.replace(/^```html?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
                console.log('[' + tag + '] Response text received, length:', text.length);
                return text;
            });
        }

        /* ══════════════════════════════════════════════
           Quick Go — REMOVED
           Proposals now go through pipeline only.
        ══════════════════════════════════════════════ */
        (function _quickGoRemoved() { return; // Quick Go removed

            // Mark gear if key already exists
            if (getApiKey() && quickGoGear) quickGoGear.classList.add('has-key');

            // Gear click — set/update API key
            if (quickGoGear) {
                quickGoGear.addEventListener('click', function(e) {
                    e.stopPropagation();
                    promptForApiKey();
                });
            }

            // Quick Go click handler
            quickGoBtn.addEventListener('click', function() {
                console.log('[QuickGo] Button clicked');

                // Get client name from Place section or activeClient
                var clientName = '';
                if (activeClient && activeClient.name) {
                    clientName = activeClient.name;
                } else {
                    var placeNameEl = document.getElementById('placeClientName');
                    if (placeNameEl && placeNameEl.textContent && placeNameEl.textContent !== 'No client selected') {
                        clientName = placeNameEl.textContent;
                    }
                }

                if (!clientName) {
                    // Fallback: prompt for client name
                    clientName = prompt('Enter client name for proposal:');
                    if (!clientName || !clientName.trim()) return;
                    clientName = clientName.trim();
                }

                console.log('[QuickGo] Client name resolved:', clientName);

                // Set loading state on button
                quickGoBtn.classList.add('generating');
                quickGoBtn.disabled = true;
                if (quickGoLabel) quickGoLabel.textContent = 'Generating...';

                var promptText = 'Generate a single, clean proposal card in HTML for an artist services company called "Ahead Artist Solutions". ' +
                    'The proposal is for a client named "' + clientName + '". ' +
                    'Keep it to ONE compact card — not multiple sections or a long matrix. Structure it as: ' +
                    '1) An h1 header with the client name, ' +
                    '2) A short 2-3 sentence summary of the plan and approach, ' +
                    '3) A concise bullet list of key services being offered (5-7 items max), ' +
                    '4) A single recommended pricing line or short note on next steps. ' +
                    'Keep the total output SHORT — aim for what fits on a single card. ' +
                    'Use clean semantic HTML: h1, h3, p, ul, li, strong. Avoid tables, avoid multiple h2 sections, avoid complex grids. ' +
                    'Return ONLY the inner HTML (no doctype, no head, no body tags).';

                callClaudeAPI({
                    prompt: promptText,
                    maxTokens: 1500,
                    loadingMsg: 'Generating proposal for ' + clientName + '...',
                    loadingSub: 'Claude is writing your proposal',
                    tag: 'QuickGo'
                })
                .then(function(html) {
                    hideApiLoading(true, 'Proposal ready for ' + clientName);

                    // Save to localStorage
                    var storageKey = 'wingdash_proposal_' + clientName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                    try { localStorage.setItem(storageKey, html); } catch(e) {}

                    // Inject into punch card proposal output area
                    var outputArea = document.getElementById('qgProposalOutput');
                    var contentArea = document.getElementById('qgProposalContent');
                    if (contentArea) contentArea.innerHTML = html;
                    if (outputArea) outputArea.classList.add('visible');

                    // Scroll the Journey Card to show the proposal
                    if (outputArea) outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                    // Add a "View Proposal" chip to the deliverables strip
                    var slots = document.getElementById('cjPunchSlots');
                    if (slots) {
                        var existing = slots.querySelector('[data-punch-key="ai-proposal"]');
                        if (!existing) {
                            var chip = document.createElement('div');
                            chip.className = 'cj-punch-slot';
                            chip.setAttribute('data-punch-key', 'ai-proposal');
                            chip.innerHTML = '<span class="punch-check" style="color:#0ea5e9">\u26a1</span> View Proposal';
                            chip.style.cursor = 'pointer';
                            chip.style.borderColor = 'rgba(14,165,233,0.3)';
                            chip.style.color = '#7dd3fc';
                            chip.style.background = 'rgba(14,165,233,0.08)';
                            chip.addEventListener('click', function() {
                                var oa = document.getElementById('qgProposalOutput');
                                if (oa) {
                                    oa.classList.toggle('visible');
                                    if (oa.classList.contains('visible')) {
                                        oa.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    }
                                }
                            });
                            slots.appendChild(chip);
                            setTimeout(function() { chip.classList.add('glowing'); }, 400);
                        }
                    }

                    // Punch the proposal milestone
                    if (typeof punchComplete === 'function') punchComplete('proposal');

                    // Add jaw result
                    if (typeof addJawResult === 'function') addJawResult('AI Proposal \u2713');

                    // Success flash on button
                    quickGoBtn.classList.remove('generating');
                    quickGoBtn.classList.add('success');
                    quickGoBtn.disabled = false;
                    if (quickGoLabel) quickGoLabel.textContent = 'Done!';
                    setTimeout(function() {
                        quickGoBtn.classList.remove('success');
                        if (quickGoLabel) quickGoLabel.textContent = 'Quick Go';
                    }, 2000);

                    if (typeof punchReport === 'function') punchReport({ action: 'Create Proposal', client: clientName, color: '#0ea5e9', type: 'api-proposal', data: { clientName: clientName } });
                    console.log('[QuickGo] Proposal saved & displayed for:', clientName);
                })
                .catch(function(err) {
                    console.error('[QuickGo] Error:', err);

                    // Reset button
                    quickGoBtn.classList.remove('generating');
                    quickGoBtn.disabled = false;
                    if (quickGoLabel) quickGoLabel.textContent = 'Quick Go';

                    // Show error in loading banner
                    var msg = err.message || 'Unknown error';
                    if (msg.indexOf('invalid x-api-key') !== -1 || msg.indexOf('authentication') !== -1) {
                        msg = 'Invalid API key. Click the gear to update it.';
                        setApiKey('');
                        if (quickGoGear) quickGoGear.classList.remove('has-key');
                    }
                    hideApiLoading(false, 'Proposal Error: ' + msg);
                });
            });
        })();

        /* ══════════════════════════════════════════════
           Final Note Overlay — 📋 button
        ══════════════════════════════════════════════ */
        (function initFinalNote() {
            var btn = document.getElementById('finalNoteBtn');
            var overlay = document.getElementById('finalNoteOverlay');
            var closeBtn = document.getElementById('finalNoteClose');
            if (!btn || !overlay) return;
            btn.addEventListener('click', function() {
                overlay.classList.toggle('open');
            });
            if (closeBtn) closeBtn.addEventListener('click', function() {
                overlay.classList.remove('open');
            });
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) overlay.classList.remove('open');
            });
        })();

        /* ══════════════════════════════════════════════
           Pipeline Step Card — LEFT-CLICK Handlers
           Sequential pipeline travel flow.
           Step 1: Review Client (toggle status)
           Step 2: Load to Card (opens Journey Card with active client)
           Step 3: (removed — was Pricing Matrix)
           Step 4: Proposal Generator (opens in AppViewer)
           Step 5: Cal Card (opens in AppViewer)
           RIGHT-CLICK handlers for steps 4 & 5 are separate — untouched.

           ⚠️  REGISTRY SYNC: If you change any L-click or R-click
           handler here, update the matching makeRow() call in the
           Action Registry Builder section so the registry keeps pace.
        ══════════════════════════════════════════════ */

        /* ── Helper: load active client into Journey Card ── */
        function loadClientToJourneyCard(clientName) {
            if (!clientName) return;

            // Update banner
            var banner = document.getElementById('cjClientBanner');
            var bannerName = document.getElementById('cjClientBannerName');
            if (banner) banner.classList.add('visible');
            if (bannerName) bannerName.textContent = clientName;

            // Update "Set Up Client" label to be contextual
            var setupLabel = document.querySelector('#cjPanel .cj-panel-left .cj-panel-label');
            if (setupLabel) setupLabel.textContent = 'Set Up — ' + clientName;

            // Update footer badge
            var badge = document.getElementById('cjLoadedBadge');
            if (badge) {
                badge.textContent = 'loaded: ' + clientName;
                badge.classList.add('visible');
            }

            // Update footer status
            var footerText = document.getElementById('cjFooterText');
            if (footerText) footerText.textContent = 'CLIENT LOADED';

            // Fulfill Client Info button
            var clientInfoBtn = document.querySelector('#cjPanel .cj-setup-btn[data-color="blue"]');
            if (clientInfoBtn) {
                clientInfoBtn.classList.add('cj-fulfilled');
                // Add check mark if not already there
                if (!clientInfoBtn.querySelector('.cj-fulfilled-check')) {
                    var labelEl = clientInfoBtn.querySelector('.cj-btn-label');
                    if (labelEl) {
                        var check = document.createElement('span');
                        check.className = 'cj-fulfilled-check';
                        check.textContent = '✓';
                        labelEl.appendChild(check);
                    }
                }
                // Swap label to client name, subtitle to "fulfilled"
                var labelText = clientInfoBtn.querySelector('.cj-btn-label');
                if (labelText) labelText.firstChild.textContent = clientName;
                var subEl = clientInfoBtn.querySelector('.cj-btn-sub');
                if (subEl) subEl.textContent = 'Client Info ✓';
            }

            // Update detail area name
            var detailName = document.getElementById('cjClientDetailName');
            if (detailName) detailName.textContent = clientName;

            // Restore punch card progress for this client
            restorePunchCard(clientName);

            // Restore jaw tray results for this client
            restoreJawResults(clientName);

            console.log('[Pipeline→Journey] Loaded client:', clientName);
        }

        /* ── Helper: clear client from Journey Card ── */
        function clearClientFromJourneyCard() {
            var banner = document.getElementById('cjClientBanner');
            if (banner) banner.classList.remove('visible');
            var badge = document.getElementById('cjLoadedBadge');
            if (badge) { badge.textContent = ''; badge.classList.remove('visible'); }
            var setupLabel = document.querySelector('#cjPanel .cj-panel-left .cj-panel-label');
            if (setupLabel) setupLabel.textContent = 'Set Up Client';
            var footerText = document.getElementById('cjFooterText');
            if (footerText) footerText.textContent = 'READY';

            // Clear Client Info fulfilled state
            var clientInfoBtn = document.querySelector('#cjPanel .cj-setup-btn[data-color="blue"]');
            if (clientInfoBtn) {
                clientInfoBtn.classList.remove('cj-fulfilled');
                var check = clientInfoBtn.querySelector('.cj-fulfilled-check');
                if (check) check.remove();
                var labelText = clientInfoBtn.querySelector('.cj-btn-label');
                if (labelText) labelText.firstChild.textContent = 'Client Info';
                var subEl = clientInfoBtn.querySelector('.cj-btn-sub');
                if (subEl) subEl.textContent = 'Name, contact, socials';
            }
            // Close detail area if open
            var detail = document.querySelector('.cj-client-detail');
            if (detail) { detail.classList.remove('open'); }

            // Reset punch card visuals (localStorage stays for next load)
            clearPunchCard();

            // Clear jaw tray visuals (localStorage stays for next load)
            clearJawResults();
        }

        /* ── Client Info button — left-click handler ── */
        (function initClientInfoBtn() {
            var btn = document.getElementById('cjBtnClientInfo');
            if (!btn) return;
            btn.addEventListener('click', function() {
                // If no client loaded, flash red
                if (!activeClient) {
                    btn.style.transition = 'box-shadow 0.2s ease';
                    btn.style.boxShadow = '0 0 16px rgba(239,68,68,0.5)';
                    setTimeout(function() { btn.style.boxShadow = ''; }, 800);
                    return;
                }
                // Toggle the detail area
                var detail = document.getElementById('cjClientDetail');
                if (detail) {
                    detail.classList.toggle('open');
                }
            });
        })();

        /* ── Punch Card — stamp a completion into the deliverables strip ── */
        /* Default milestones (match footer dots) */
        var PUNCH_MILESTONES = [
            { key: 'client-info', label: 'Client Info',  color: '#0ea5e9' },
            { key: 'proposal',    label: 'Proposal',     color: '#6366f1' },
            { key: 'campaign',    label: 'Campaign',     color: '#ef4444' },
            { key: 'delivery',    label: 'Delivery',     color: '#f59e0b' }
        ];

        /* Get localStorage key for a client */
        function _punchStorageKey(clientName) {
            return 'wingdash_punch_' + (clientName || '').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        }

        /* Read punch state from localStorage */
        function _loadPunchState(clientName) {
            if (!clientName) return {};
            try {
                var data = localStorage.getItem(_punchStorageKey(clientName));
                return data ? JSON.parse(data) : {};
            } catch(e) { return {}; }
        }

        /* Save punch state to localStorage */
        function _savePunchState(clientName, state) {
            if (!clientName) return;
            try {
                localStorage.setItem(_punchStorageKey(clientName), JSON.stringify(state));
            } catch(e) { console.warn('[PunchCard] Save failed:', e); }
        }

        /* Update footer dot visuals from state object */
        function _renderPunchDots(state) {
            var dots = document.querySelectorAll('#cjFooterDots .punch-dot');
            var punchedCount = 0;
            dots.forEach(function(dot, i) {
                var milestone = PUNCH_MILESTONES[i];
                if (!milestone) return;
                var isPunched = state[milestone.key];
                if (isPunched) {
                    dot.classList.add('punched');
                    setTimeout(function() { dot.classList.add('glow'); }, 400);
                    punchedCount++;
                } else {
                    dot.classList.remove('punched', 'glow');
                }
            });
            // Update counter
            var counter = document.getElementById('cjPunchCounter');
            if (counter) {
                counter.textContent = punchedCount + '/' + PUNCH_MILESTONES.length;
                counter.classList.toggle('has-punches', punchedCount > 0);
                counter.classList.toggle('all-complete', punchedCount === PUNCH_MILESTONES.length);
            }
        }

        /* Stamp a completion — accepts label string OR milestone key */
        function punchComplete(label) {
            // Find matching milestone
            var matchIdx = -1;
            var matchKey = '';
            PUNCH_MILESTONES.forEach(function(m, i) {
                if (m.key === label || m.label.toLowerCase() === label.toLowerCase() || m.label === label) {
                    matchIdx = i;
                    matchKey = m.key;
                }
            });

            // Also add to the deliverables strip (existing punch card area)
            var slots = document.getElementById('cjPunchSlots');
            if (slots) {
                var already = slots.querySelector('[data-punch-key="' + (matchKey || label) + '"]');
                if (!already) {
                    var slot = document.createElement('div');
                    slot.className = 'cj-punch-slot';
                    slot.setAttribute('data-punch-key', matchKey || label);
                    slot.innerHTML = '<span class="punch-check">\u2713</span> ' + (matchIdx >= 0 ? PUNCH_MILESTONES[matchIdx].label : label);
                    slots.appendChild(slot);
                    setTimeout(function() { slot.classList.add('glowing'); }, 700);
                }
            }

            // Light up footer dot + persist
            if (matchIdx >= 0) {
                var clientName = activeClient ? activeClient.name : null;
                var state = _loadPunchState(clientName);
                state[matchKey] = { time: Date.now(), label: PUNCH_MILESTONES[matchIdx].label };
                _savePunchState(clientName, state);
                _renderPunchDots(state);
            }

            // Auto-add jaw result banner pill
            var jawLabel = (matchIdx >= 0 ? PUNCH_MILESTONES[matchIdx].label : label);
            addJawResult(jawLabel + ' \u2713');

            console.log('[PunchCard] Stamped:', label, matchIdx >= 0 ? '(dot ' + matchIdx + ')' : '(custom)');
        }

        /* Clear punch card UI (does NOT erase localStorage — that persists) */
        function clearPunchCard() {
            var slots = document.getElementById('cjPunchSlots');
            if (slots) slots.innerHTML = '';
            _renderPunchDots({});
            // Also clear jaw tray visually (localStorage stays)
            clearJawResults();
        }

        /* Restore punch card for a specific client from localStorage */
        function restorePunchCard(clientName) {
            clearPunchCard();
            if (!clientName) return;
            var state = _loadPunchState(clientName);
            var slots = document.getElementById('cjPunchSlots');
            PUNCH_MILESTONES.forEach(function(m) {
                if (state[m.key] && slots) {
                    var slot = document.createElement('div');
                    slot.className = 'cj-punch-slot glowing';
                    slot.setAttribute('data-punch-key', m.key);
                    slot.innerHTML = '<span class="punch-check">\u2713</span> ' + m.label;
                    slots.appendChild(slot);
                }
            });
            var milestoneKeys = PUNCH_MILESTONES.map(function(m) { return m.key; });
            Object.keys(state).forEach(function(k) {
                if (milestoneKeys.indexOf(k) === -1 && slots) {
                    var slot = document.createElement('div');
                    slot.className = 'cj-punch-slot glowing';
                    slot.setAttribute('data-punch-key', k);
                    slot.innerHTML = '<span class="punch-check">\u2713</span> ' + (state[k].label || k);
                    slots.appendChild(slot);
                }
            });
            _renderPunchDots(state);
        }

        /* Reset / erase punch card data for a client (hard reset) */
        function resetPunchCard(clientName) {
            if (!clientName) return;
            try { localStorage.removeItem(_punchStorageKey(clientName)); } catch(e) {}
            clearPunchCard();
            console.log('[PunchCard] Reset all punches for:', clientName);
        }

        /* ══════════════════════════════════════════════
           Jaw Tray — Collapsible Result Banner System
           Sits between punch card and footer strip.
           State-driven: opens when results exist,
           closes when empty. Per-client localStorage.
        ══════════════════════════════════════════════ */

        /* localStorage key for jaw results */
        function _jawStorageKey(clientName) {
            return 'wingdash_jaw_' + (clientName || '').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        }

        /* Read jaw state from localStorage */
        function _loadJawState(clientName) {
            if (!clientName) return [];
            try {
                var data = localStorage.getItem(_jawStorageKey(clientName));
                return data ? JSON.parse(data) : [];
            } catch(e) { return []; }
        }

        /* Save jaw state to localStorage */
        function _saveJawState(clientName, results) {
            if (!clientName) return;
            try {
                localStorage.setItem(_jawStorageKey(clientName), JSON.stringify(results));
            } catch(e) { console.warn('[Jaw] Save failed:', e); }
        }

        /* Open/close the jaw tray based on pill count */
        function _updateJawOpenState() {
            var tray = document.getElementById('cjJawTray');
            var pills = document.getElementById('cjJawPills');
            if (!tray) return;
            var hasPills = pills && pills.children.length > 0;
            if (hasPills) {
                tray.classList.add('jaw-open');
            } else {
                tray.classList.remove('jaw-open');
            }
        }

        /* Render a single pill into the jaw tray */
        function _renderJawPill(label, url) {
            var container = document.getElementById('cjJawPills');
            if (!container) return;
            // Skip if already exists
            var existing = container.querySelector('[data-jaw-label="' + label + '"]');
            if (existing) return;

            var pill = document.createElement('div');
            pill.className = 'cj-jaw-pill';
            pill.setAttribute('data-jaw-label', label);
            if (url) pill.setAttribute('data-url', url);
            // Stagger animation for sequential adds
            var idx = container.children.length;
            pill.style.animationDelay = (idx * 0.08) + 's';

            pill.innerHTML = '<span class="jaw-pill-check">\u2713</span>' +
                '<span class="jaw-pill-text">' + label + '</span>' +
                '<span class="jaw-pill-x" title="Remove">\u2715</span>';

            // Click pill → log / future file open
            pill.addEventListener('click', function(e) {
                if (e.target.classList.contains('jaw-pill-x')) return;
                var targetUrl = pill.getAttribute('data-url');
                console.log('[Jaw] Pill clicked:', label, targetUrl ? '→ ' + targetUrl : '(no url)');
            });

            // Click X → remove this pill
            pill.querySelector('.jaw-pill-x').addEventListener('click', function(e) {
                e.stopPropagation();
                removeJawResult(label);
            });

            container.appendChild(pill);
        }

        /* ── Public API ── */

        /* Add a result banner pill to the jaw tray */
        function addJawResult(label, url) {
            var container = document.getElementById('cjJawPills');
            if (!container) return;

            // Render pill
            _renderJawPill(label, url || '');

            // Open jaw
            _updateJawOpenState();

            // Persist
            var clientName = activeClient ? activeClient.name : null;
            if (clientName) {
                var results = _loadJawState(clientName);
                var exists = false;
                results.forEach(function(r) { if (r.label === label) exists = true; });
                if (!exists) {
                    results.push({ label: label, url: url || '', time: Date.now() });
                    _saveJawState(clientName, results);
                }
            }

            console.log('[Jaw] Added result:', label);
        }

        /* Remove a specific pill from the jaw tray */
        function removeJawResult(label) {
            var container = document.getElementById('cjJawPills');
            if (container) {
                var pill = container.querySelector('[data-jaw-label="' + label + '"]');
                if (pill) {
                    pill.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                    pill.style.opacity = '0';
                    pill.style.transform = 'scale(0.8)';
                    setTimeout(function() {
                        pill.remove();
                        _updateJawOpenState();
                    }, 260);
                }
            }

            // Persist removal
            var clientName = activeClient ? activeClient.name : null;
            if (clientName) {
                var results = _loadJawState(clientName);
                results = results.filter(function(r) { return r.label !== label; });
                _saveJawState(clientName, results);
            }

            console.log('[Jaw] Removed result:', label);
        }

        /* Clear all jaw pills — visual only (localStorage untouched) */
        function clearJawResults() {
            var container = document.getElementById('cjJawPills');
            if (container) container.innerHTML = '';
            _updateJawOpenState();
            console.log('[Jaw] Cleared all results (visual)');
        }

        /* Restore jaw tray for a specific client from localStorage */
        function restoreJawResults(clientName) {
            clearJawResults();
            if (!clientName) return;
            var results = _loadJawState(clientName);
            results.forEach(function(r) {
                _renderJawPill(r.label, r.url);
            });
            _updateJawOpenState();
            if (results.length > 0) {
                console.log('[Jaw] Restored', results.length, 'results for:', clientName);
            }
        }

        /* ── Blue Toggle — Client / Lead view swap on Journey Card ── */
        var journeyMode = 'client'; // 'client' or 'lead'
        (function initBlueToggle() {
            var btn = document.getElementById('cjBlueToggle');
            var tag = document.getElementById('cjBannerTag');
            var panelLabel = document.querySelector('#cjPanel .cj-panel-left .cj-panel-label');
            if (!btn) return;

            /* Button refs + original label cache for lead/client swap */
            var swapBtns = {
                network:        document.getElementById('cjBtnNetwork'),
                marketing:      document.getElementById('cjBtnMarketing'),
                presentation:   document.getElementById('cjBtnPresentation')
            };
            var campaignsBtn = document.getElementById('cjBtnCampaigns');
            var communicationBtn = document.getElementById('cjBtnCommunication');
            var originalLabels = {};
            Object.keys(swapBtns).forEach(function(key) {
                var b = swapBtns[key];
                if (b) {
                    var lbl = b.querySelector('.cj-action-label');
                    if (lbl) originalLabels[key] = lbl.textContent;
                }
            });
            var leadLabels = {
                network:       '[Lead Network]',
                marketing:     '[Lead Journey]',
                presentation:  '[Lead Pitch]'
            };

            /* Left-panel setup buttons — cache refs + original labels for lead/client swap */
            var leftPanel = document.querySelector('#cjPanel .cj-panel-left');
            var setupBtns = leftPanel ? leftPanel.querySelectorAll('.cj-setup-btn') : [];
            var originalSetupLabels = [];
            setupBtns.forEach(function(b) {
                var lbl = b.querySelector('.cj-btn-label');
                originalSetupLabels.push(lbl ? lbl.textContent : '');
            });
            var leadSetupLabels = ['Client Info', 'First Contact', 'Needs Analysis', 'Direction & Strategy', 'Results and Report'];

            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (journeyMode === 'client') {
                    journeyMode = 'lead';
                    btn.classList.add('lead-mode');
                    btn.textContent = '⟷';
                    if (tag) { tag.textContent = 'LEAD'; tag.style.background = 'rgba(245,158,11,0.12)'; tag.style.color = '#f59e0b'; }
                    if (panelLabel) panelLabel.textContent = 'Set Up Lead';

                    /* Swap left-panel setup-button labels to lead pipeline steps */
                    setupBtns.forEach(function(b, i) {
                        if (leadSetupLabels[i]) {
                            var lbl = b.querySelector('.cj-btn-label');
                            if (lbl) lbl.textContent = leadSetupLabels[i];
                        }
                    });

                    /* Swap action-button labels to lead placeholders */
                    Object.keys(swapBtns).forEach(function(key) {
                        var b = swapBtns[key];
                        if (b) { var lbl = b.querySelector('.cj-action-label'); if (lbl) lbl.textContent = leadLabels[key]; }
                    });
                    /* Red glow on Current Campaigns + Communication while in lead mode (they "travel") */
                    if (campaignsBtn) campaignsBtn.style.boxShadow = '0 0 14px rgba(239,68,68,0.4)';
                    if (communicationBtn) communicationBtn.style.boxShadow = '0 0 14px rgba(239,68,68,0.4)';

                    console.log('[Journey] Switched to LEAD mode');
                } else {
                    journeyMode = 'client';
                    btn.classList.remove('lead-mode');
                    btn.textContent = '⟷';
                    if (tag) { tag.textContent = 'PIPELINE'; tag.style.background = ''; tag.style.color = ''; }
                    if (panelLabel) panelLabel.textContent = 'Set Up Client';

                    /* Restore left-panel setup-button labels to client originals */
                    setupBtns.forEach(function(b, i) {
                        if (originalSetupLabels[i]) {
                            var lbl = b.querySelector('.cj-btn-label');
                            if (lbl) lbl.textContent = originalSetupLabels[i];
                        }
                    });

                    /* Restore original action-button labels */
                    Object.keys(swapBtns).forEach(function(key) {
                        var b = swapBtns[key];
                        if (b && originalLabels[key]) { var lbl = b.querySelector('.cj-action-label'); if (lbl) lbl.textContent = originalLabels[key]; }
                    });
                    /* Remove red glow from Current Campaigns + Communication */
                    if (campaignsBtn) campaignsBtn.style.boxShadow = '';
                    if (communicationBtn) communicationBtn.style.boxShadow = '';

                    console.log('[Journey] Switched to CLIENT mode');
                }
            });
        })();

        /* ── Climate Card — mood + needs for leads ── */
        (function initClimateCard() {
            var card = document.getElementById('climateCard');
            var moodBtns = document.querySelectorAll('.mood-btn');
            var needsSelect = document.getElementById('climateNeeds');
            var renderBtn = document.getElementById('climateRenderBtn');
            var selectedMood = null;

            // Mood selection
            moodBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    moodBtns.forEach(function(b) { b.classList.remove('selected'); });
                    btn.classList.add('selected');
                    selectedMood = btn.dataset.mood;
                });
            });

            // Limit needs to 3
            if (needsSelect) {
                needsSelect.addEventListener('change', function() {
                    var selected = Array.from(needsSelect.selectedOptions);
                    if (selected.length > 3) {
                        selected[selected.length - 1].selected = false;
                    }
                });
            }

            // Render button — placeholder for Python logic factor
            if (renderBtn) {
                renderBtn.addEventListener('click', function() {
                    var needs = Array.from(needsSelect.selectedOptions).map(function(o) { return o.value; });
                    console.log('[ClimateCard] Render:', { mood: selectedMood, needs: needs });
                    renderBtn.textContent = 'Rendered ✓';
                    renderBtn.style.background = 'rgba(16,185,129,0.15)';
                    renderBtn.style.borderColor = '#10b981';
                    renderBtn.style.color = '#10b981';
                    setTimeout(function() {
                        renderBtn.textContent = 'Render';
                        renderBtn.style.background = '';
                        renderBtn.style.borderColor = '';
                        renderBtn.style.color = '';
                    }, 1500);
                    // Python logic factor script will process mood + needs later
                });
            }
        })();

        // Show/hide Climate Card vs Place based on lead vs client
        function showClimateCard(leadName) {
            var card = document.getElementById('climateCard');
            var place = document.getElementById('wingPlace');
            if (card) { card.style.display = ''; document.getElementById('climateLeadName').textContent = leadName; }
            if (place) place.style.display = 'none';
        }
        function hideClimateCard() {
            var card = document.getElementById('climateCard');
            var place = document.getElementById('wingPlace');
            if (card) card.style.display = 'none';
            if (place) place.style.display = '';
        }

        /* ── Journey Card Action Button handlers ── */
        (function initActionButtons() {
            // Current Campaigns → open campaigns panel
            var campaignsBtn = document.getElementById('cjBtnCampaigns');
            if (campaignsBtn) {
                campaignsBtn.addEventListener('click', function() {
                    if (typeof openCampaigns === 'function') {
                        closeJourney();
                        openCampaigns();
                    }
                });
            }

            // Client Network → open Artist Matrix in AppViewer
            var networkBtn = document.getElementById('cjBtnNetwork');
            if (networkBtn) {
                networkBtn.addEventListener('click', function() {
                    if (typeof openArtistMatrix === 'function') openArtistMatrix();
                });
            }

            // Marketing Journey → placeholder (Chad to define)
            var marketingBtn = document.getElementById('cjBtnMarketing');
            if (marketingBtn) {
                marketingBtn.addEventListener('click', function() {
                    marketingBtn.style.transition = 'box-shadow 0.2s ease';
                    marketingBtn.style.boxShadow = '0 0 12px rgba(245,158,11,0.3)';
                    setTimeout(function() { marketingBtn.style.boxShadow = ''; }, 800);
                    console.log('[Journey] Marketing Journey — coming soon');
                });
            }
        })();

        /* ── Supplier button handler ── */
        (function initSupplierButton() {
            var supplierBtn = document.getElementById('cjBtnSupplier');
            var supplierPanel = document.getElementById('cjSupplierPanel');
            var ordPanelRef = document.getElementById('cjOrdersPanel');
            if (supplierBtn && supplierPanel) {
                supplierBtn.addEventListener('click', function() {
                    // Close orders panel if open
                    if (ordPanelRef) ordPanelRef.classList.remove('open');
                    // Toggle supplier panel
                    supplierPanel.classList.toggle('open');
                    // Visual feedback
                    supplierBtn.style.transition = 'box-shadow 0.2s ease';
                    supplierBtn.style.boxShadow = supplierPanel.classList.contains('open')
                        ? '0 0 16px rgba(245,158,11,0.4)' : '';
                    setTimeout(function() { supplierBtn.style.boxShadow = ''; }, 800);
                    console.log('[Journey] Supplier panel toggled');
                });
            }
        })();

        /* ── Communication + Presentation button handlers ── */
        (function initCommPresButtons() {
            var commBtn = document.getElementById('cjBtnCommunication');
            var commPanel = document.getElementById('cjCommPanel');
            var presBtn = document.getElementById('cjBtnPresentation');
            var presPanel = document.getElementById('cjPresPanel');
            var ordPanel = document.getElementById('cjOrdersPanel');

            if (commBtn && commPanel) {
                commBtn.addEventListener('click', function() {
                    // Close presentation + orders if open
                    if (presPanel) presPanel.classList.remove('open');
                    if (ordPanel) ordPanel.classList.remove('open');
                    // Toggle communication panel
                    commPanel.classList.toggle('open');
                    // Visual feedback
                    commBtn.style.transition = 'box-shadow 0.2s ease';
                    var leadGlow = journeyMode === 'lead' ? '0 0 14px rgba(239,68,68,0.4)' : '';
                    commBtn.style.boxShadow = commPanel.classList.contains('open')
                        ? '0 0 16px rgba(99,102,241,0.4)' : leadGlow;
                    setTimeout(function() { commBtn.style.boxShadow = leadGlow; }, 800);
                });
            }

            if (presBtn && presPanel) {
                presBtn.addEventListener('click', function() {
                    var clientName = activeClient ? activeClient.name : null;
                    var storedPath = clientName ? localStorage.getItem('wingdash_presentations_' + clientName) : null;

                    // Close communication + orders if open
                    if (commPanel) commPanel.classList.remove('open');
                    if (ordPanel) ordPanel.classList.remove('open');
                    // Toggle presentation panel
                    presPanel.classList.toggle('open');

                    // Update presentation panel status
                    var statusEl = document.getElementById('cjPresStatus');
                    var pathInput = document.getElementById('cjPresPathInput');
                    var linkedEl = document.getElementById('cjPresLinkedPath');
                    if (statusEl) {
                        if (!clientName) {
                            statusEl.textContent = 'No client loaded';
                        } else if (storedPath) {
                            statusEl.textContent = 'Linked for ' + clientName;
                            statusEl.style.color = '#059669';
                        } else {
                            statusEl.textContent = 'No presentation linked yet';
                            statusEl.style.color = '';
                        }
                    }
                    if (pathInput && storedPath) pathInput.value = storedPath;
                    if (linkedEl && storedPath) {
                        linkedEl.style.display = 'block';
                        linkedEl.innerHTML = '<a href="http://localhost:3000/' + storedPath + '" target="_blank" style="color:#b45309;text-decoration:underline;">Open: ' + storedPath + '</a>';
                    } else if (linkedEl) {
                        linkedEl.style.display = 'none';
                    }

                    // Refresh the P1-P8 gallery when panel opens
                    if (presPanel.classList.contains('open') && typeof window._updateJourneyPresState === 'function') {
                        window._updateJourneyPresState(clientName || '');
                    }

                    // Visual feedback
                    presBtn.style.transition = 'box-shadow 0.2s ease';
                    presBtn.style.boxShadow = presPanel.classList.contains('open')
                        ? '0 0 16px rgba(245,158,11,0.4)' : '';
                    setTimeout(function() { presBtn.style.boxShadow = ''; }, 800);
                });

                // Direct click on Presentation action icon (not edit) — open presentation if linked
                presBtn.addEventListener('dblclick', function() {
                    var clientName = activeClient ? activeClient.name : null;
                    if (!clientName) return;
                    var storedPath = localStorage.getItem('wingdash_presentations_' + clientName);
                    if (storedPath) {
                        var label = presBtn.querySelector('.cj-action-label');
                        var origText = label ? label.textContent : '';
                        if (label) label.textContent = 'Loading...';
                        setTimeout(function() {
                            window.open('http://localhost:3000/' + storedPath, '_blank');
                            if (label) label.textContent = origText;
                        }, 400);
                    } else {
                        // Tooltip — no presentation linked
                        var tip = document.createElement('div');
                        tip.textContent = 'No presentation linked yet';
                        tip.style.cssText = 'position:absolute;top:-28px;left:50%;transform:translateX(-50%);background:#1e293b;color:#f8fafc;padding:4px 10px;border-radius:6px;font-size:0.55rem;white-space:nowrap;z-index:9999;pointer-events:none;';
                        presBtn.style.position = 'relative';
                        presBtn.appendChild(tip);
                        setTimeout(function() { tip.remove(); }, 2000);
                    }
                });
            }

            // Wire communication channel buttons → navigate to Comms wing section
            // Map Journey Card data-channel values to pill labels in the right Comms wing
            var channelToPillLabel = {
                gmail:     'Gmail',
                whatsapp:  'WhatsApp',
                messenger: 'Messenger',
                text:      'iMessage'
            };

            // Set nav tooltips on each comm btn
            var commBtns = document.querySelectorAll('.cj-comm-btn');
            commBtns.forEach(function(btn) {
                var ch = btn.getAttribute('data-channel');
                var target = channelToPillLabel[ch] || '';
                if (target) btn.setAttribute('data-nav-tip', '→ View in Comms');
            });

            commBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var channel = btn.getAttribute('data-channel');
                    var targetLabel = channelToPillLabel[channel];
                    console.log('[Journey→Comms] channel:', channel, '→', targetLabel);

                    // Flash button for UX feedback
                    btn.style.transition = 'box-shadow 0.2s ease';
                    btn.style.boxShadow = '0 0 12px rgba(99,102,241,0.4)';
                    setTimeout(function() { btn.style.boxShadow = ''; }, 600);

                    // Right wing Comms is section index 2
                    var COMMS_SECTION_INDEX = 2;

                    // Navigate right wing to Comms section
                    if (typeof goToSection === 'function') {
                        goToSection('right', COMMS_SECTION_INDEX);
                    }

                    // On mobile: open the right wing if collapsed
                    var rWing = document.getElementById('wingRight');
                    if (rWing && !rWing.classList.contains('wing-open')) {
                        rWing.classList.add('wing-open');
                        var backdrop = document.getElementById('wingBackdrop');
                        if (backdrop) backdrop.classList.add('show');
                    }

                    // After wing transition, find and highlight the target pill
                    setTimeout(function() {
                        if (!targetLabel) return;
                        var sections = document.querySelectorAll('#wingRight .wing-section');
                        var commsSection = sections[COMMS_SECTION_INDEX];
                        if (!commsSection) return;

                        // Scroll the Comms section into the wing view
                        commsSection.scrollTop = 0;

                        // Find the matching pill by label text
                        var pills = commsSection.querySelectorAll('.pill');
                        var targetPill = null;
                        pills.forEach(function(p) {
                            var lbl = p.querySelector('.pill-label');
                            if (lbl && lbl.textContent.trim() === targetLabel) {
                                targetPill = p;
                            }
                        });

                        if (targetPill) {
                            // Scroll pill into view within its section
                            targetPill.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // Brief pulse glow
                            targetPill.classList.remove('comms-nav-pulse');
                            void targetPill.offsetWidth; // reflow to restart animation
                            targetPill.classList.add('comms-nav-pulse');
                            targetPill.addEventListener('animationend', function() {
                                targetPill.classList.remove('comms-nav-pulse');
                            }, { once: true });
                        }
                    }, 380);

                    // Minimize Journey Card (close it so Comms wing is visible)
                    if (typeof closeJourney === 'function') {
                        setTimeout(function() { closeJourney(); }, 120);
                    }
                });
            });
        })();

        /* ── Proposals & Pricing → triggers Orders/POS panel ── */
        (function initOrdersPanel() {
            var proposalsBtn = document.getElementById('cjBtnProposals');
            var ordersPanel = document.getElementById('cjOrdersPanel');
            var commPanel = document.getElementById('cjCommPanel');
            var presPanel = document.getElementById('cjPresPanel');
            var supplierPanel = document.getElementById('cjSupplierPanel');

            if (proposalsBtn && ordersPanel) {
                proposalsBtn.addEventListener('click', function() {
                    // Close other panels
                    if (commPanel) commPanel.classList.remove('open');
                    if (presPanel) presPanel.classList.remove('open');
                    if (supplierPanel) supplierPanel.classList.remove('open');
                    // Toggle orders panel
                    ordersPanel.classList.toggle('open');
                    // Visual feedback on the setup button
                    proposalsBtn.style.transition = 'box-shadow 0.2s ease';
                    proposalsBtn.style.boxShadow = ordersPanel.classList.contains('open')
                        ? '0 0 16px rgba(16,185,129,0.4)' : '';
                    setTimeout(function() { proposalsBtn.style.boxShadow = ''; }, 800);
                    console.log('[Journey] Proposals & Pricing → Orders panel toggled');
                });
            }

            /* ── POS Service Catalog — populate tiles from pricingCatalog ── */
            var posList = document.getElementById('cjOrdersPosList');
            var posCount = document.getElementById('cjOrdersPosCount');
            var posTotals = document.getElementById('cjOrdersPosTotals');
            var posTotalAmt = document.getElementById('cjOrdersPosTotalAmt');
            var posTabs = document.querySelectorAll('.cj-orders-pos-tab');
            var selectedServices = [];

            function getAllCatalogItems() {
                var all = [];
                ['spotify', 'press', 'youtube', 'soundcloud'].forEach(function(cat) {
                    pricingCatalog[cat].forEach(function(item) {
                        all.push({ name: item.name, price: item.price, category: cat });
                    });
                });
                return all;
            }

            function parsePrice(p) {
                return parseInt(p.replace(/[$,]/g, ''), 10) || 0;
            }

            var posSearchQuery = '';

            function renderPosTiles(filter) {
                if (!posList) return;
                var items = getAllCatalogItems();
                if (filter && filter !== 'all') {
                    items = items.filter(function(it) { return it.category === filter; });
                }
                // Apply text search filter
                if (posSearchQuery) {
                    var q = posSearchQuery.toLowerCase();
                    items = items.filter(function(it) {
                        return it.name.toLowerCase().indexOf(q) !== -1 || it.price.toLowerCase().indexOf(q) !== -1;
                    });
                }
                if (posCount) posCount.textContent = items.length + ' services';

                posList.innerHTML = '';
                items.forEach(function(item) {
                    var tile = document.createElement('div');
                    tile.className = 'cj-orders-pos-tile';
                    if (selectedServices.indexOf(item.name) !== -1) tile.classList.add('selected');
                    tile.innerHTML = '<span class="cj-orders-pos-tile-name">' + item.name + '</span>' +
                                     '<span class="cj-orders-pos-tile-price">' + item.price + '</span>';
                    tile.addEventListener('click', function() {
                        var idx = selectedServices.indexOf(item.name);
                        if (idx === -1) {
                            selectedServices.push(item.name);
                            tile.classList.add('selected');
                        } else {
                            selectedServices.splice(idx, 1);
                            tile.classList.remove('selected');
                        }
                        updatePosTotals();
                    });
                    posList.appendChild(tile);
                });
            }

            function updatePosTotals() {
                if (!posTotals || !posTotalAmt) return;
                if (selectedServices.length === 0) {
                    posTotals.style.display = 'none';
                    updateDiscounter();
                    return;
                }
                posTotals.style.display = 'flex';
                var allItems = getAllCatalogItems();
                var total = 0;
                selectedServices.forEach(function(name) {
                    var found = allItems.filter(function(it) { return it.name === name; })[0];
                    if (found) total += parsePrice(found.price);
                });
                posTotalAmt.textContent = '$' + total.toLocaleString();
                updateDiscounter();
            }

            // Tab switching
            posTabs.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    posTabs.forEach(function(t) { t.classList.remove('active'); });
                    tab.classList.add('active');
                    // Clear search and auto-suggest when switching tabs
                    var searchBox = document.getElementById('cjOrdersPosSearch');
                    if (searchBox) { searchBox.value = ''; posSearchQuery = ''; }
                    var suggestBox = document.getElementById('cjPosAutosuggest');
                    if (suggestBox) { suggestBox.classList.remove('active'); suggestBox.innerHTML = ''; }
                    renderPosTiles(tab.getAttribute('data-cat'));
                });
            });

            // Search input — filter tiles in real-time + auto-suggest dropdown
            var posSearchInput = document.getElementById('cjOrdersPosSearch');
            var autosuggestBox = document.getElementById('cjPosAutosuggest');

            function renderAutosuggest(query) {
                if (!autosuggestBox) return;
                if (!query || query.length === 0) {
                    autosuggestBox.classList.remove('active');
                    autosuggestBox.innerHTML = '';
                    return;
                }
                var q = query.toLowerCase();
                var matches = getAllCatalogItems().filter(function(it) {
                    return it.name.toLowerCase().indexOf(q) !== -1 || it.price.toLowerCase().indexOf(q) !== -1 || it.category.toLowerCase().indexOf(q) !== -1;
                });
                autosuggestBox.innerHTML = '';
                if (matches.length === 0) {
                    autosuggestBox.classList.remove('active');
                    return;
                }
                autosuggestBox.classList.add('active');
                matches.slice(0, 12).forEach(function(item) {
                    var row = document.createElement('div');
                    row.className = 'cj-pos-suggest-row';
                    if (selectedServices.indexOf(item.name) !== -1) row.classList.add('selected');
                    row.innerHTML =
                        '<span class="cj-pos-suggest-name">' + item.name + '</span>' +
                        '<span class="cj-pos-suggest-meta">' +
                            '<span class="cj-pos-suggest-cat">' + item.category + '</span>' +
                            '<span class="cj-pos-suggest-price">' + item.price + '</span>' +
                        '</span>';
                    row.addEventListener('click', function(e) {
                        e.stopPropagation();
                        // Toggle selection — same as clicking the tile directly
                        var idx = selectedServices.indexOf(item.name);
                        if (idx === -1) {
                            selectedServices.push(item.name);
                        } else {
                            selectedServices.splice(idx, 1);
                        }
                        updatePosTotals();
                        // Re-render tiles to reflect selection state
                        var activeTab = document.querySelector('.cj-orders-pos-tab.active');
                        var activeCat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
                        renderPosTiles(activeCat);
                        // Close dropdown and clear search
                        posSearchInput.value = '';
                        posSearchQuery = '';
                        autosuggestBox.classList.remove('active');
                        autosuggestBox.innerHTML = '';
                        // Re-render tiles without search filter
                        renderPosTiles(activeCat);
                    });
                    autosuggestBox.appendChild(row);
                });
            }

            if (posSearchInput) {
                posSearchInput.addEventListener('input', function() {
                    posSearchQuery = this.value.trim();
                    // Find currently active tab category
                    var activeTab = document.querySelector('.cj-orders-pos-tab.active');
                    var activeCat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
                    renderPosTiles(activeCat);
                    // Auto-suggest dropdown
                    renderAutosuggest(posSearchQuery);
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (autosuggestBox && !autosuggestBox.contains(e.target) && e.target !== posSearchInput) {
                        autosuggestBox.classList.remove('active');
                    }
                });

                // Close dropdown on Escape
                posSearchInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        autosuggestBox.classList.remove('active');
                        posSearchInput.value = '';
                        posSearchQuery = '';
                        var activeTab = document.querySelector('.cj-orders-pos-tab.active');
                        var activeCat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
                        renderPosTiles(activeCat);
                    }
                });
            }

            // Initial render
            renderPosTiles('all');

            /* ── Discounter Strip Logic (ported from chad22 Proposal Pro) ── */
            var discounterEl = document.getElementById('cjOrdersDiscounter');
            var discPctInput = document.getElementById('cjDiscPctInput');
            var discLedger = document.getElementById('cjDiscLedger');
            var discImpact = document.getElementById('cjDiscImpact');
            var discImpactAmt = document.getElementById('cjDiscImpactAmt');
            var discGrandTotal = document.getElementById('cjDiscGrandTotal');
            var discCustomName = document.getElementById('cjDiscCustomName');
            var discCustomPrice = document.getElementById('cjDiscCustomPrice');
            var discCustomAdd = document.getElementById('cjDiscCustomAdd');
            var bulkBtns = document.querySelectorAll('.cj-orders-disc-bulk-btn');

            // Track custom services added through the discounter
            var customServices = []; // { name, price }

            // Bulk discount preset buttons
            bulkBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var val = parseInt(btn.getAttribute('data-bulk'), 10);
                    // Toggle: if already active at this value, deactivate
                    if (btn.classList.contains('active')) {
                        btn.classList.remove('active');
                        if (discPctInput) discPctInput.value = '';
                    } else {
                        bulkBtns.forEach(function(b) { b.classList.remove('active'); });
                        btn.classList.add('active');
                        if (discPctInput) discPctInput.value = val;
                    }
                    updateDiscounter();
                });
            });

            // Manual discount % input
            if (discPctInput) {
                discPctInput.addEventListener('input', function() {
                    // Clear bulk button active state when typing manually
                    var v = parseInt(discPctInput.value, 10);
                    bulkBtns.forEach(function(b) {
                        var bv = parseInt(b.getAttribute('data-bulk'), 10);
                        if (bv === v) b.classList.add('active');
                        else b.classList.remove('active');
                    });
                    updateDiscounter();
                });
            }

            // Custom service add
            if (discCustomAdd) {
                discCustomAdd.addEventListener('click', function() {
                    var n = discCustomName ? discCustomName.value.trim() : '';
                    var p = discCustomPrice ? discCustomPrice.value.trim() : '';
                    if (!n) return;
                    // Ensure price has $ prefix
                    if (p && p.charAt(0) !== '$') p = '$' + p;
                    if (!p) p = '$0';
                    customServices.push({ name: n, price: p });
                    if (discCustomName) discCustomName.value = '';
                    if (discCustomPrice) discCustomPrice.value = '';
                    updateDiscounter();
                });
                // Allow Enter key in custom name input
                if (discCustomName) {
                    discCustomName.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') { e.preventDefault(); discCustomAdd.click(); }
                    });
                }
                if (discCustomPrice) {
                    discCustomPrice.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') { e.preventDefault(); discCustomAdd.click(); }
                    });
                }
            }

            function removeCustomService(idx) {
                customServices.splice(idx, 1);
                updateDiscounter();
            }
            // Expose for onclick
            window._cjRemoveCustomService = removeCustomService;

            function updateDiscounter() {
                if (!discounterEl) return;

                var allItems = getAllCatalogItems();
                var hasSelection = selectedServices.length > 0 || customServices.length > 0;

                // Show/hide discounter
                discounterEl.style.display = hasSelection ? 'block' : 'none';
                if (!hasSelection) return;

                // Build ledger items list
                var ledgerEntries = [];

                // Catalog selections
                selectedServices.forEach(function(name) {
                    var found = allItems.filter(function(it) { return it.name === name; })[0];
                    if (found) {
                        ledgerEntries.push({ name: found.name, price: found.price, isCustom: false });
                    }
                });

                // Custom services
                customServices.forEach(function(cs, idx) {
                    ledgerEntries.push({ name: cs.name, price: cs.price, isCustom: true, customIdx: idx });
                });

                // Render ledger
                if (discLedger) {
                    discLedger.innerHTML = '';
                    ledgerEntries.forEach(function(entry) {
                        var div = document.createElement('div');
                        div.className = 'cj-orders-disc-ledger-item';
                        var removeHtml = '';
                        if (entry.isCustom) {
                            removeHtml = '<span class="cj-orders-disc-ledger-remove" onclick="window._cjRemoveCustomService(' + entry.customIdx + ')">&#10005;</span>';
                        } else {
                            removeHtml = '<span class="cj-orders-disc-ledger-remove" onclick="window._cjDeselectService(\'' + entry.name.replace(/'/g, "\\'") + '\')">&times;</span>';
                        }
                        div.innerHTML = '<span class="cj-orders-disc-ledger-name">' + entry.name + '</span>' +
                            '<span class="cj-orders-disc-ledger-right">' +
                                '<span class="cj-orders-disc-ledger-price">' + entry.price + '</span>' +
                                removeHtml +
                            '</span>';
                        discLedger.appendChild(div);
                    });
                }

                // Calculate subtotal
                var subtotal = 0;
                ledgerEntries.forEach(function(entry) {
                    subtotal += parsePrice(entry.price);
                });

                // Discount
                var discPct = discPctInput ? (parseInt(discPctInput.value, 10) || 0) : 0;
                if (discPct < 0) discPct = 0;
                if (discPct > 100) discPct = 100;
                var discountVal = subtotal * (discPct / 100);
                var grandTotal = subtotal - discountVal;

                // Discount impact line
                if (discImpact) {
                    if (discPct > 0) {
                        discImpact.classList.add('visible');
                        if (discImpactAmt) discImpactAmt.textContent = '-$' + discountVal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                    } else {
                        discImpact.classList.remove('visible');
                    }
                }

                // Grand total
                if (discGrandTotal) {
                    discGrandTotal.textContent = '$' + grandTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                    // Flash animation on change
                    discGrandTotal.style.transform = 'scale(1.08)';
                    setTimeout(function() { discGrandTotal.style.transform = 'scale(1)'; }, 200);
                }
            }

            // Deselect a catalog service from the discounter ledger
            window._cjDeselectService = function(serviceName) {
                var idx = selectedServices.indexOf(serviceName);
                if (idx !== -1) {
                    selectedServices.splice(idx, 1);
                    // Re-render catalog tiles to update visual state
                    var activeTab = document.querySelector('.cj-orders-pos-tab.active');
                    var activeCat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
                    renderPosTiles(activeCat);
                    updatePosTotals();
                }
            };
        })();

        (function initPipelineSteps() {
            for (var i = 1; i <= 10; i++) {
                (function(step) {
                    var card = document.getElementById('pipeStep' + step);
                    if (!card) return;
                    card.style.cursor = 'pointer';
                    card.addEventListener('click', function() {

                        // ── Step 2: Load to Card — open Journey Card with active client ──
                        if (step === 2) {
                            var clientName = activeClient ? activeClient.name : null;
                            if (!clientName) {
                                // Fallback: try reading from live mirror box
                                var lmn = document.getElementById('liveClientName');
                                clientName = (lmn && lmn.textContent !== '—') ? lmn.textContent : null;
                            }

                            if (!clientName) {
                                // Flash the card red to signal no client loaded
                                card.style.transition = 'box-shadow 0.2s ease';
                                card.style.boxShadow = '0 0 16px rgba(239,68,68,0.5)';
                                setTimeout(function() { card.style.boxShadow = ''; }, 800);
                                console.log('[Pipeline] Step 2 — no active client to load');
                                return;
                            }

                            // Mark step 2 as active
                            var statusEl = card.querySelector('.pipe-step-status');
                            if (statusEl) {
                                statusEl.setAttribute('data-status', 'active');
                                statusEl.textContent = 'active';
                            }
                            card.classList.add('pipe-step-active');

                            // Load client into Journey Card
                            loadClientToJourneyCard(clientName);

                            // Open the Journey Card (same as clicking the red diamond)
                            if (typeof openJourney === 'function' && !journeyOpen) {
                                openJourney();
                            }

                            // Visual confirmation flash on the step card
                            card.style.transition = 'box-shadow 0.3s ease';
                            card.style.boxShadow = '0 0 20px rgba(16,185,129,0.4)';
                            setTimeout(function() { card.style.boxShadow = ''; }, 1000);

                            console.log('[Pipeline] Step 2 → loaded "' + clientName + '" to Journey Card');
                            return;
                        }

                        // ── Step 3: (was Pricing Matrix — removed) ──
                        // ── Step 4: Proposal Generator — open in AppViewer ──
                        if (step === 4) { openProposalGenerator(); return; }
                        // ── Step 5: Cal Card — open in AppViewer ──
                        if (step === 5) { openCalCard(); return; }

                        // ── Step 6: All Campaigns — open campaigns panel ──
                        if (step === 6) { openCampaigns(); return; }
                        // ── Step 7: Matrix — open in AppViewer ──
                        if (step === 7) { openArtistMatrix(); return; }

                        // ── Step 8: Client Network — open in AppViewer ──
                        if (step === 8) { openClientNetwork(); return; }
                        // ── Step 9: Client Pricing — open in AppViewer ──
                        if (step === 9) { openClientPricing(); return; }
                        // ── Step 10: Client Price View B — open in AppViewer ──
                        if (step === 10) { openClientPricingB(); return; }

                        // ── Step 1: standard toggle (pending → active → done → pending) ──
                        var statusEl = card.querySelector('.pipe-step-status');
                        if (!statusEl) return;
                        var current = statusEl.getAttribute('data-status');
                        if (current === 'pending') {
                            statusEl.setAttribute('data-status', 'active');
                            statusEl.textContent = 'active';
                            card.classList.add('pipe-step-active');
                        } else if (current === 'active') {
                            statusEl.setAttribute('data-status', 'done');
                            statusEl.textContent = 'done';
                            card.classList.remove('pipe-step-active');
                            card.classList.add('pipe-step-done');
                        } else if (current === 'done') {
                            statusEl.setAttribute('data-status', 'pending');
                            statusEl.textContent = 'pending';
                            card.classList.remove('pipe-step-done');
                        }
                        console.log('[Pipeline] Step ' + step + ' → ' + statusEl.getAttribute('data-status'));
                    });

                    // ── Right-click on Step 2: same as left-click (Load to Card) ──
                    if (step === 2) {
                        card.addEventListener('contextmenu', function(e) {
                            e.preventDefault();

                            var clientName = activeClient ? activeClient.name : null;
                            if (!clientName) {
                                var lmn = document.getElementById('liveClientName');
                                clientName = (lmn && lmn.textContent !== '—') ? lmn.textContent : null;
                            }

                            if (!clientName) {
                                card.style.transition = 'box-shadow 0.2s ease';
                                card.style.boxShadow = '0 0 16px rgba(239,68,68,0.5)';
                                setTimeout(function() { card.style.boxShadow = ''; }, 800);
                                console.log('[Pipeline] Step 2 right-click — no active client to load');
                                return;
                            }

                            var statusEl = card.querySelector('.pipe-step-status');
                            if (statusEl) {
                                statusEl.setAttribute('data-status', 'active');
                                statusEl.textContent = 'active';
                            }
                            card.classList.add('pipe-step-active');

                            loadClientToJourneyCard(clientName);

                            if (typeof openJourney === 'function' && !journeyOpen) {
                                openJourney();
                            }

                            card.style.transition = 'box-shadow 0.3s ease';
                            card.style.boxShadow = '0 0 20px rgba(16,185,129,0.4)';
                            setTimeout(function() { card.style.boxShadow = ''; }, 1000);

                            console.log('[Pipeline] Step 2 right-click → loaded "' + clientName + '" to Journey Card');
                        });
                    }

                    // ── Right-click on Step 5: Cal Card — open in AppViewer ──
                    if (step === 5) {
                        card.addEventListener('contextmenu', function(e) {
                            e.preventDefault();
                            openCalCard();
                        });
                    }
                })(i);
            }
        })();

        /* ══════════════════════════════════════════════
           Client Drive Overlay System
           Click client pill → overlay slides in with
           Base Path + Sub Path inputs wired to Google
           Drive API auto-suggest (cloned from POS search)
           ══════════════════════════════════════════════ */

        var ClientDrive = (function() {

            /* ── Google Drive API config ── */
            // Uses same Google Cloud project as Gmail scraper (Wings Dashboard)
            // Scopes: drive.readonly for folder listing
            var DRIVE_API_KEY = null; // Set if using API key auth
            var DRIVE_CLIENT_ID = ''; // Loaded from credentials.json or set manually
            var DRIVE_SCOPES = 'https://www.googleapis.com/auth/drive.readonly';
            var gapiLoaded = false;
            var gisLoaded = false;
            var accessToken = null;
            var tokenClient = null;

            /* ── Default Drive folder (all client folders live here) ── */
            var DEFAULT_DRIVE_FOLDER = {
                url: 'https://drive.google.com/drive/folders/1HiOv4vnFh6qZeCtPH9_lOthfO-S4B-Fk',
                id: '1HiOv4vnFh6qZeCtPH9_lOthfO-S4B-Fk',
                name: 'Client Folders'
            };

            /* ── Client path storage (localStorage) ── */
            var CLIENT_PATHS_KEY = 'clientDrivePaths';

            function loadClientPaths() {
                try { return JSON.parse(localStorage.getItem(CLIENT_PATHS_KEY)) || {}; }
                catch(e) { return {}; }
            }

            function saveClientPaths(clientName, basePath, subPath, baseId, subId) {
                var all = loadClientPaths();
                all[clientName] = {
                    basePath: basePath || DEFAULT_DRIVE_FOLDER.url,
                    subPath: subPath || '',
                    baseId: baseId || DEFAULT_DRIVE_FOLDER.id,
                    subId: subId || '',
                    updated: new Date().toISOString()
                };
                localStorage.setItem(CLIENT_PATHS_KEY, JSON.stringify(all));
            }

            function getClientPaths(clientName) {
                var paths = loadClientPaths()[clientName] || null;
                if (!paths) {
                    /* Return default folder as fallback */
                    return {
                        basePath: DEFAULT_DRIVE_FOLDER.url,
                        subPath: '',
                        baseId: DEFAULT_DRIVE_FOLDER.id,
                        subId: '',
                        updated: ''
                    };
                }
                return paths;
            }

            /* ── Current overlay state ── */
            var currentClient = '';
            var baseParentId = DEFAULT_DRIVE_FOLDER.id;
            var subParentId = '';
            var baseFolderId = '';
            var subFolderId = '';
            var baseBreadcrumb = [{ name: 'Client Folders', id: DEFAULT_DRIVE_FOLDER.id }];
            var subBreadcrumb = [];

            /* ── DOM refs ── */
            var overlay = document.getElementById('clientOverlay');
            var backdropEl = document.getElementById('clientOverlayBackdrop');
            var nameEl = document.getElementById('clientOverlayName');
            var closeBtn = document.getElementById('clientOverlayClose');
            var statusEl = document.getElementById('clientDriveStatus');
            var baseInput = document.getElementById('clientBasePath');
            var subInput = document.getElementById('clientSubPath');
            var baseResults = document.getElementById('driveBaseResults');
            var subResults = document.getElementById('driveSubResults');
            var baseBreadcrumbEl = document.getElementById('driveBaseBreadcrumb');
            var subBreadcrumbEl = document.getElementById('driveSubBreadcrumb');
            var confirmBtn = document.getElementById('clientOverlayConfirm');

            /* ── Open overlay for a specific client ── */
            function open(clientName) {
                currentClient = clientName;
                nameEl.textContent = clientName;

                // Load saved paths if any
                var saved = getClientPaths(clientName);
                if (saved) {
                    baseInput.value = saved.basePath || '';
                    subInput.value = saved.subPath || '';
                    baseFolderId = saved.baseId || '';
                    subFolderId = saved.subId || '';
                    if (baseFolderId) {
                        baseInput.classList.add('locked');
                        subParentId = baseFolderId;
                    }
                    if (subFolderId) {
                        subInput.classList.add('locked');
                    }
                    if (saved.basePath && saved.subPath) {
                        confirmBtn.textContent = 'PATHS LOCKED';
                        confirmBtn.classList.add('locked');
                    } else {
                        confirmBtn.textContent = 'Lock Paths';
                        confirmBtn.classList.remove('locked');
                    }
                } else {
                    baseInput.value = '';
                    subInput.value = '';
                    baseInput.classList.remove('locked');
                    subInput.classList.remove('locked');
                    baseFolderId = '';
                    subFolderId = '';
                    subParentId = '';
                    confirmBtn.textContent = 'Lock Paths';
                    confirmBtn.classList.remove('locked');
                }

                // Reset breadcrumbs
                baseBreadcrumb = [{ name: 'My Drive', id: 'root' }];
                subBreadcrumb = [];
                renderBreadcrumb('base');
                renderBreadcrumb('sub');

                // Close any open suggest panels
                baseResults.classList.remove('active');
                subResults.classList.remove('active');

                // Show overlay
                backdropEl.classList.add('active');
                overlay.classList.add('active');

                // Check Drive API status
                updateDriveStatus();

                // Focus base input
                setTimeout(function() { baseInput.focus(); }, 300);
            }

            function close() {
                overlay.classList.remove('active');
                backdropEl.classList.remove('active');
                baseResults.classList.remove('active');
                subResults.classList.remove('active');
                currentClient = '';
            }

            /* ── Drive API integration ── */

            // Load the Google Identity Services + GAPI libraries dynamically
            function loadGoogleAPIs() {
                if (document.getElementById('gapi-script')) return;

                // GAPI client for Drive API calls
                var gapiScript = document.createElement('script');
                gapiScript.id = 'gapi-script';
                gapiScript.src = 'https://apis.google.com/js/api.js';
                gapiScript.onload = function() {
                    gapi.load('client', function() {
                        gapi.client.init({}).then(function() {
                            gapi.client.load('drive', 'v3').then(function() {
                                gapiLoaded = true;
                                updateDriveStatus();
                            });
                        });
                    });
                };
                document.head.appendChild(gapiScript);

                // Google Identity Services for OAuth token
                var gisScript = document.createElement('script');
                gisScript.id = 'gis-script';
                gisScript.src = 'https://accounts.google.com/gsi/client';
                gisScript.onload = function() {
                    gisLoaded = true;
                    updateDriveStatus();
                };
                document.head.appendChild(gisScript);
            }

            function initTokenClient() {
                if (!gisLoaded || tokenClient) return;
                // Try to load client ID from credentials.json
                if (!DRIVE_CLIENT_ID) {
                    fetch('../../%E2%9A%99%EF%B8%8F%20ADMIN/tools/credentials.json?t=' + Date.now())
                        .then(function(r) { return r.json(); })
                        .then(function(creds) {
                            if (creds.installed && creds.installed.client_id) {
                                DRIVE_CLIENT_ID = creds.installed.client_id;
                            } else if (creds.web && creds.web.client_id) {
                                DRIVE_CLIENT_ID = creds.web.client_id;
                            }
                            createTokenClient();
                        })
                        .catch(function() {
                            statusEl.textContent = 'drive: credentials.json not found';
                            statusEl.className = 'client-overlay-status error';
                        });
                } else {
                    createTokenClient();
                }
            }

            function createTokenClient() {
                if (!DRIVE_CLIENT_ID || !gisLoaded) return;
                tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: DRIVE_CLIENT_ID,
                    scope: DRIVE_SCOPES,
                    callback: function(response) {
                        if (response.error) {
                            statusEl.textContent = 'drive: auth error - ' + response.error;
                            statusEl.className = 'client-overlay-status error';
                            return;
                        }
                        accessToken = response.access_token;
                        statusEl.textContent = 'drive: connected';
                        statusEl.className = 'client-overlay-status connected';
                    }
                });
            }

            function requestDriveAccess(callback) {
                if (accessToken) {
                    callback();
                    return;
                }
                if (!tokenClient) {
                    initTokenClient();
                    // Wait a beat for token client to init
                    setTimeout(function() {
                        if (tokenClient) {
                            tokenClient.requestAccessToken();
                            // Poll for token
                            var check = setInterval(function() {
                                if (accessToken) {
                                    clearInterval(check);
                                    callback();
                                }
                            }, 300);
                            setTimeout(function() { clearInterval(check); }, 15000);
                        }
                    }, 500);
                    return;
                }
                tokenClient.requestAccessToken();
                var check = setInterval(function() {
                    if (accessToken) {
                        clearInterval(check);
                        callback();
                    }
                }, 300);
                setTimeout(function() { clearInterval(check); }, 15000);
            }

            /* ── Folder listing via Drive API (cloned from POS search pattern) ── */

            function listFolders(parentId, query, callback) {
                if (!accessToken) {
                    callback([]);
                    return;
                }

                var q = "mimeType='application/vnd.google-apps.folder' and trashed=false";
                if (parentId && parentId !== 'root') {
                    q += " and '" + parentId + "' in parents";
                } else {
                    q += " and 'root' in parents";
                }
                if (query && query.trim()) {
                    q += " and name contains '" + query.replace(/'/g, "\\'") + "'";
                }

                fetch('https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
                    q: q,
                    fields: 'files(id,name,mimeType,modifiedTime)',
                    orderBy: 'name',
                    pageSize: '20',
                    supportsAllDrives: 'true',
                    includeItemsFromAllDrives: 'true'
                }), {
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                })
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    callback(data.files || []);
                })
                .catch(function(err) {
                    console.warn('Drive list error:', err);
                    callback([]);
                });
            }

            /* ── Parse Google Drive link to extract folder ID ── */
            function parseDriveLink(text) {
                // Match: https://drive.google.com/drive/folders/FOLDER_ID
                var match = text.match(/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/);
                if (match) return match[1];
                // Match: https://drive.google.com/drive/u/0/folders/FOLDER_ID
                match = text.match(/drive\.google\.com\/drive\/u\/\d+\/folders\/([a-zA-Z0-9_-]+)/);
                if (match) return match[1];
                return null;
            }

            /* ── Get folder name by ID ── */
            function getFolderName(folderId, callback) {
                if (!accessToken) { callback(folderId); return; }
                fetch('https://www.googleapis.com/drive/v3/files/' + folderId + '?' + new URLSearchParams({
                    fields: 'id,name',
                    supportsAllDrives: 'true'
                }), {
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                })
                .then(function(r) { return r.json(); })
                .then(function(data) { callback(data.name || folderId); })
                .catch(function() { callback(folderId); });
            }

            /* ── Render auto-suggest dropdown (same pattern as POS renderResults) ── */

            function renderSuggest(resultsEl, folders, target, parentId) {
                resultsEl.innerHTML = '';

                if (folders === 'loading') {
                    resultsEl.innerHTML = '<div class="drive-suggest-loading">Scanning Drive folders...</div>';
                    resultsEl.classList.add('active');
                    return;
                }

                if (!folders || folders.length === 0) {
                    resultsEl.innerHTML = '<div class="drive-suggest-empty">No folders found</div>';
                    resultsEl.classList.add('active');
                    return;
                }

                // Back button if not at root
                if (parentId && parentId !== 'root') {
                    var backDiv = document.createElement('div');
                    backDiv.className = 'drive-suggest-item';
                    backDiv.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
                    backDiv.style.color = 'var(--lamp-mid, #2d5a8e)';
                    backDiv.innerHTML = '<span class="drive-suggest-icon">&#8592;</span>' +
                        '<span class="drive-suggest-name" style="font-weight:700;">.. Go Up</span>';
                    backDiv.addEventListener('click', function() {
                        var crumbs = target === 'base' ? baseBreadcrumb : subBreadcrumb;
                        if (crumbs.length > 1) {
                            crumbs.pop();
                            var newParent = crumbs[crumbs.length - 1].id;
                            if (target === 'base') baseParentId = newParent;
                            else subParentId = newParent;
                            renderBreadcrumb(target);
                            triggerSuggest(target, '');
                        }
                    });
                    resultsEl.appendChild(backDiv);
                }

                folders.forEach(function(folder) {
                    var div = document.createElement('div');
                    div.className = 'drive-suggest-item';
                    var dateStr = folder.modifiedTime
                        ? new Date(folder.modifiedTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : '';
                    div.innerHTML = '<span class="drive-suggest-icon">&#128193;</span>' +
                        '<span class="drive-suggest-name">' + (folder.name || 'Untitled') + '</span>' +
                        '<span class="drive-suggest-meta">' + dateStr + '</span>';

                    div.addEventListener('click', function() {
                        selectFolder(target, folder);
                    });

                    // Double-click = navigate into
                    div.addEventListener('dblclick', function(e) {
                        e.preventDefault();
                        navigateInto(target, folder);
                    });

                    resultsEl.appendChild(div);
                });

                resultsEl.classList.add('active');
            }

            /* ── Select a folder = set the input value ── */
            function selectFolder(target, folder) {
                var input = target === 'base' ? baseInput : subInput;
                var results = target === 'base' ? baseResults : subResults;

                // Build full path from breadcrumb + selected
                var crumbs = target === 'base' ? baseBreadcrumb : subBreadcrumb;
                var pathParts = crumbs.map(function(c) { return c.name; });
                pathParts.push(folder.name);
                var fullPath = pathParts.join(' / ');

                input.value = fullPath;
                results.classList.remove('active');

                if (target === 'base') {
                    baseFolderId = folder.id;
                    // Auto-set sub parent to navigate within this folder
                    subParentId = folder.id;
                    subBreadcrumb = [{ name: folder.name, id: folder.id }];
                    renderBreadcrumb('sub');
                } else {
                    subFolderId = folder.id;
                }
            }

            /* ── Navigate into a folder = browse deeper ── */
            function navigateInto(target, folder) {
                var crumbs = target === 'base' ? baseBreadcrumb : subBreadcrumb;
                crumbs.push({ name: folder.name, id: folder.id });

                if (target === 'base') {
                    baseParentId = folder.id;
                } else {
                    subParentId = folder.id;
                }

                renderBreadcrumb(target);
                triggerSuggest(target, '');
            }

            /* ── Render breadcrumb ── */
            function renderBreadcrumb(target) {
                var el = target === 'base' ? baseBreadcrumbEl : subBreadcrumbEl;
                var crumbs = target === 'base' ? baseBreadcrumb : subBreadcrumb;

                el.innerHTML = '';
                crumbs.forEach(function(crumb, i) {
                    if (i > 0) {
                        var sep = document.createElement('span');
                        sep.className = 'drive-breadcrumb-sep';
                        sep.textContent = '>';
                        el.appendChild(sep);
                    }
                    var item = document.createElement('span');
                    item.className = 'drive-breadcrumb-item';
                    item.textContent = crumb.name;
                    item.addEventListener('click', function() {
                        // Navigate to this crumb level
                        if (target === 'base') {
                            baseBreadcrumb = baseBreadcrumb.slice(0, i + 1);
                            baseParentId = crumb.id;
                        } else {
                            subBreadcrumb = subBreadcrumb.slice(0, i + 1);
                            subParentId = crumb.id;
                        }
                        renderBreadcrumb(target);
                        triggerSuggest(target, '');
                    });
                    el.appendChild(item);
                });
            }

            /* ── Trigger auto-suggest search ── */
            var suggestTimer = null;

            function triggerSuggest(target, query) {
                var resultsEl = target === 'base' ? baseResults : subResults;
                var parentId = target === 'base' ? baseParentId : subParentId;

                // Check if input is a Drive link
                var linkId = parseDriveLink(query);
                if (linkId) {
                    renderSuggest(resultsEl, 'loading', target, parentId);
                    requestDriveAccess(function() {
                        getFolderName(linkId, function(name) {
                            var folder = { id: linkId, name: name };
                            selectFolder(target, folder);
                        });
                    });
                    return;
                }

                renderSuggest(resultsEl, 'loading', target, parentId);

                requestDriveAccess(function() {
                    listFolders(parentId, query, function(folders) {
                        renderSuggest(resultsEl, folders, target, parentId);
                    });
                });
            }

            /* ── Input event handlers (cloned from POS handleSearch pattern) ── */
            var baseTimer = null;
            var subTimer = null;

            baseInput.addEventListener('input', function() {
                clearTimeout(baseTimer);
                var val = baseInput.value;
                baseTimer = setTimeout(function() {
                    if (val.trim().length > 0) {
                        triggerSuggest('base', val);
                    } else {
                        baseResults.classList.remove('active');
                    }
                }, 300);
            });

            baseInput.addEventListener('focus', function() {
                if (!baseInput.classList.contains('locked')) {
                    triggerSuggest('base', baseInput.value);
                }
            });

            subInput.addEventListener('input', function() {
                clearTimeout(subTimer);
                var val = subInput.value;
                subTimer = setTimeout(function() {
                    if (val.trim().length > 0) {
                        triggerSuggest('sub', val);
                    } else {
                        subResults.classList.remove('active');
                    }
                }, 300);
            });

            subInput.addEventListener('focus', function() {
                if (!subInput.classList.contains('locked') && subParentId) {
                    triggerSuggest('sub', subInput.value);
                }
            });

            // Close suggests when clicking outside
            overlay.addEventListener('click', function(e) {
                if (!e.target.closest('.client-overlay-field')) {
                    baseResults.classList.remove('active');
                    subResults.classList.remove('active');
                }
            });

            /* ── Confirm button ── */
            confirmBtn.addEventListener('click', function() {
                var bp = baseInput.value.trim();
                var sp = subInput.value.trim();

                if (!bp) {
                    baseInput.focus();
                    baseInput.style.borderColor = '#ef4444';
                    setTimeout(function() { baseInput.style.borderColor = ''; }, 1500);
                    return;
                }

                saveClientPaths(currentClient, bp, sp, baseFolderId, subFolderId);

                baseInput.classList.add('locked');
                if (sp) subInput.classList.add('locked');
                confirmBtn.textContent = 'PATHS LOCKED';
                confirmBtn.classList.add('locked');

                var goBtn = document.getElementById('placeGoBtn');
                if (goBtn) goBtn.classList.add('active');

                showWingToast('Drive paths saved for ' + currentClient);

                setTimeout(function() { close(); }, 800);
            });

            /* ── Close handlers ── */
            closeBtn.addEventListener('click', close);
            backdropEl.addEventListener('click', close);

            /* ── Update drive status display ── */
            function updateDriveStatus() {
                if (accessToken) {
                    statusEl.textContent = 'drive: connected';
                    statusEl.className = 'client-overlay-status connected';
                } else if (gapiLoaded && gisLoaded) {
                    statusEl.textContent = 'drive: ready (click input to connect)';
                    statusEl.className = 'client-overlay-status';
                } else {
                    statusEl.textContent = 'drive: loading APIs...';
                    statusEl.className = 'client-overlay-status';
                }
            }

            // Load Google APIs on page load
            loadGoogleAPIs();

            return {
                open: open,
                close: close,
                getClientPaths: getClientPaths
            };

        })();

        // Wire Place edit button to open ClientDrive overlay
        document.getElementById('placeEditBtn').addEventListener('click', function() {
            if (selectedClient) {
                ClientDrive.open(selectedClient.label);
            }
        });

        // Wire Place GO button — launches right wing pipeline
        document.getElementById('placeGoBtn').addEventListener('click', function() {
            if (!selectedClient) return;

            // Read Place section data
            var clientName = (document.getElementById('placeClientName') || {}).textContent || '';
            var basePath = (document.getElementById('placeBasePath') || {}).textContent || '';
            var subPath = (document.getElementById('placeSubPath') || {}).textContent || '';

            // Set active client for pipeline travel flow
            activeClient = { name: clientName, basePath: basePath, subPath: subPath };
            if (typeof updateJourneyCardHomeBaseBtn === 'function') updateJourneyCardHomeBaseBtn();

            // Populate Live Mirror Box in Pipeline section 1
            var lmName = document.getElementById('liveClientName');
            var lmBase = document.getElementById('liveBasePath');
            var lmSub = document.getElementById('liveSubPath');
            var lmLock = document.getElementById('liveLockStatus');
            var lmBox = document.getElementById('liveMirrorBox');
            if (lmName) lmName.textContent = clientName;
            if (lmBase) lmBase.textContent = basePath;
            if (lmSub) lmSub.textContent = subPath || '—';
            if (lmLock) { lmLock.textContent = '● paths locked'; lmLock.style.color = '#10b981'; }

            // Live dot pulse — red glow to confirm data arrived
            var liveDot = document.getElementById('liveMirrorDot');
            if (liveDot) {
                liveDot.classList.add('live-pulse');
                liveDot.style.display = 'inline-block';
            }

            // Flash the mirror box border
            if (lmBox) { lmBox.style.borderColor = 'rgba(242,165,74,0.5)'; setTimeout(function(){ lmBox.style.borderColor = ''; }, 1200); }

            // Populate pipeline status card too
            var pipeName = document.getElementById('pipelineClientName');
            var pipeBase = document.getElementById('pipelineBasePath');
            var pipeSub = document.getElementById('pipelineSubPath');
            var pipeLock = document.getElementById('pipelineLockStatus');
            var pipeCard = document.getElementById('pipelineStatusCard');
            if (pipeName) pipeName.textContent = clientName;
            if (pipeBase) pipeBase.textContent = basePath;
            if (pipeSub) pipeSub.textContent = subPath || '—';
            if (pipeLock) pipeLock.textContent = '● paths locked';
            if (pipeCard) pipeCard.classList.add('active');

            // Reset pipeline steps
            for (var s = 1; s <= 10; s++) {
                var st = document.querySelector('#pipeStep' + s + ' .pipe-step-status');
                if (st) { st.textContent = 'pending'; st.setAttribute('data-status', 'pending'); }
                var card = document.getElementById('pipeStep' + s);
                if (card) { card.classList.remove('pipe-step-active'); card.classList.remove('pipe-step-done'); }
            }

            // Reset journey card client state for fresh pipeline
            clearClientFromJourneyCard();

            // Force right wing to appear
            var rightWing = document.querySelector('.wing-right');
            if (rightWing) {
                rightWing.classList.add('open');
            }

            // Navigate right wing to Pipeline (section 1, index 0)
            if (typeof state !== 'undefined') {
                goToSection('right', 0);
            }

            // Visual flash on right wing
            var rw = document.getElementById('wingRight');
            if (rw) {
                rw.style.transition = 'box-shadow 0.3s ease';
                rw.style.boxShadow = 'inset 0 0 30px rgba(242,165,74,0.4)';
                setTimeout(function(){ rw.style.boxShadow = ''; }, 800);
            }

            // Dispatch custom event so other code can react
            document.dispatchEvent(new CustomEvent('pipeline-loaded', {
                detail: { client: selectedClient.label }
            }));

            console.log('[PlaceGO] Data sent to pipeline:', clientName, basePath, subPath);

            // ── AUTO-CARRY: GO fires all the way to Load to Card ──
            setTimeout(function() {
                // Mark step 1 (Review Client) as active
                var s1 = document.getElementById('pipeStep1');
                var s1s = s1 ? s1.querySelector('.pipe-step-status') : null;
                if (s1s) { s1s.setAttribute('data-status', 'active'); s1s.textContent = 'active'; }
                if (s1) s1.classList.add('pipe-step-active');

                // After a beat, fire step 2 — Load to Card
                setTimeout(function() {
                    var s2 = document.getElementById('pipeStep2');
                    if (s2) s2.click();
                    console.log('[PlaceGO] Auto-carried to Load to Card');
                }, 500);
            }, 700);
        });

        console.log('Wing Menu POS System: READY');

        /* ══════════════════════════════════════════════
           Connected Shimmer — hover 1 triggers all 4
           ══════════════════════════════════════════════ */
        (function() {
            var tip = document.getElementById('wingHoverTip');
            var targets = document.querySelectorAll('.wing-input-box, .wing-import-bar');
            var shimmerTimer = null;
            var staggerTimers = [];
            var tipMap = {
                'left-import':  'drop client lists or CSV here<br>data flows into the wing pills above<br>★ items load into the pipeline',
                'right-import': 'drop supplier or service data here<br>each entry becomes a pill you can drag<br>★ combine with left wing to build orders',
                'left-prompt':  'type a command to edit these pills<br>runs /c19-asst-change-wing in terminal<br>★ prompt goes to Claude — pills update live',
                'right-prompt': 'type a command to edit these pills<br>same flow — changes this wing only<br>★ both wings feed into the pipeline'
            };

            // Stagger order: left-import, right-import, left-prompt, right-prompt
            var ordered = [
                document.querySelector('.wing-left .wing-import-bar'),
                document.querySelector('.wing-right .wing-import-bar'),
                document.querySelector('.wing-left .wing-input-box'),
                document.querySelector('.wing-right .wing-input-box')
            ].filter(Boolean);

            function activateAll() {
                clearTimeout(shimmerTimer);
                staggerTimers.forEach(clearTimeout);
                staggerTimers = [];
                // Reset shimmer position for clean re-sweep
                ordered.forEach(function(t) {
                    t.classList.remove('shimmer-active');
                    t.style.backgroundPosition = '-100% 0';
                });
                // Force reflow then stagger activate
                void document.body.offsetHeight;
                ordered.forEach(function(t, i) {
                    staggerTimers.push(setTimeout(function() {
                        t.style.backgroundPosition = '';
                        t.classList.add('shimmer-active');
                    }, i * 120));
                });
            }

            function deactivateAll() {
                shimmerTimer = setTimeout(function() {
                    staggerTimers.forEach(clearTimeout);
                    staggerTimers = [];
                    ordered.forEach(function(t) {
                        t.classList.remove('shimmer-active');
                        t.style.backgroundPosition = '';
                    });
                    tip.classList.remove('visible');
                }, 400);
            }

            function positionTip(el) {
                var rect = el.getBoundingClientRect();
                var isImport = el.classList.contains('wing-import-bar');
                var isLeft = !!el.closest('.wing-left');
                var key = (isLeft ? 'left' : 'right') + '-' + (isImport ? 'import' : 'prompt');
                tip.innerHTML = tipMap[key];

                // Position: below for import-bar (top of wing), above for input-box (bottom of wing)
                var tipLeft = rect.left + rect.width / 2;
                var tipTop;
                if (isImport) {
                    tipTop = rect.bottom + 6;
                    tip.style.transform = 'translate(-50%, 0)';
                } else {
                    tipTop = rect.top - 6;
                    tip.style.transform = 'translate(-50%, -100%)';
                }

                tip.style.left = tipLeft + 'px';
                tip.style.top = tipTop + 'px';
                tip.classList.add('visible');
            }

            targets.forEach(function(el) {
                el.addEventListener('mouseenter', function() {
                    activateAll();
                    positionTip(el);
                });
                el.addEventListener('mouseleave', function() {
                    deactivateAll();
                });
            });
        })();

        // ── Pipeline Status Card — mirrors left wing Place on right wing ──
        document.addEventListener('pipeline-loaded', function(e) {
            var card = document.getElementById('pipelineStatusCard');
            var nameEl = document.getElementById('pipelineClientName');
            var baseEl = document.getElementById('pipelineBasePath');
            var subEl = document.getElementById('pipelineSubPath');
            var lockEl = document.getElementById('pipelineLockStatus');

            if (!card || !e.detail || !e.detail.client) return;

            // Ensure activeClient is set from pipeline-loaded events
            if (!activeClient || activeClient.name !== e.detail.client) {
                activeClient = { name: e.detail.client, basePath: '', subPath: '' };
                if (typeof updateJourneyCardHomeBaseBtn === 'function') updateJourneyCardHomeBaseBtn();
            }

            nameEl.textContent = e.detail.client;

            // Read paths from localStorage
            try {
                var stored = JSON.parse(localStorage.getItem('clientDrivePaths')) || {};
                var paths = stored[e.detail.client];
                if (paths) {
                    baseEl.textContent = paths.basePath || '—';
                    subEl.textContent = paths.subPath || '—';
                    lockEl.textContent = '● paths locked';
                    lockEl.style.color = '#10b981';
                } else {
                    baseEl.textContent = '—';
                    subEl.textContent = '—';
                    lockEl.textContent = '○ no paths set';
                    lockEl.style.color = 'rgba(255,255,255,0.4)';
                }
            } catch(err) {
                baseEl.textContent = '—';
                subEl.textContent = '—';
                lockEl.textContent = '○ error';
            }

            card.classList.add('active');
        });

        /* ══════════════════════════════════════════════
           Client Journey Card — Inline Toggle System
           (renders in center area like drop zone)
           ══════════════════════════════════════════════ */
        var journeyBtn = document.getElementById('journeyCardBtn');
        var cjPanel = document.getElementById('cjPanel');
        var journeyOpen = false;

        function closeJourney() {
            journeyOpen = false;
            cjPanel.classList.add('paused');
            cjPanel.style.display = '';
            journeyBtn.classList.remove('active');
            document.body.classList.remove('journey-active');
            // Restore tiles and watermark
            var tileHeaders = document.querySelectorAll('.center-pad .center-section-header');
            var tileGrids = document.querySelectorAll('.center-pad .tile-grid');
            tileHeaders.forEach(function(el) { el.classList.remove('tiles-hidden'); });
            tileGrids.forEach(function(el) { el.classList.remove('tiles-hidden'); });
            var wm = document.querySelector('.center-watermark');
            if (wm) wm.style.display = '';
        }

        function openJourney() {
            console.log('[Journey] openJourney() called');
            journeyOpen = true;

            journeyBtn.classList.add('active');
            document.body.classList.add('journey-active');

            // Hide center tiles + watermark FIRST (frees flex space for panel)
            var tileHeaders = document.querySelectorAll('.center-pad .center-section-header');
            var tileGrids = document.querySelectorAll('.center-pad .tile-grid');
            tileHeaders.forEach(function(el) { el.classList.add('tiles-hidden'); });
            tileGrids.forEach(function(el) { el.classList.add('tiles-hidden'); });
            var wm = document.querySelector('.center-watermark');
            if (wm) wm.style.display = 'none';

            // Remove paused — switches from display:none to visible
            cjPanel.classList.remove('paused');
            cjPanel.style.display = '';

            // Scroll panel into view
            cjPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('[Journey] panel opened, paused removed');

            // Auto-open All Campaigns alongside Journey Card
            if (typeof openCampaigns === 'function') openCampaigns();
        }

        journeyBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('[Journey◆] clicked, journeyOpen =', journeyOpen);
            if (journeyOpen) { closeJourney(); } else { openJourney(); }
        });

        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && journeyOpen) closeJourney();
        });

        /* ═══════ SOCIAL CLIMATE ORGANIZER — ID Verify + Channels ═══════ */
        (function initSCO() {
            var searchInput = document.getElementById('scoSearchInput');
            var goBtn = document.getElementById('scoGoBtn');
            var channelsGrid = document.getElementById('scoChannelsGrid');
            var reportArea = document.getElementById('scoReportArea');
            var reportGrid = document.getElementById('scoReportGrid');
            var quickLinks = document.getElementById('scoQuickLinks');
            var quickLinksRow = document.getElementById('scoQuickLinksRow');
            var resetRow = document.getElementById('scoResetRow');
            var resetBtn = document.getElementById('scoResetBtn');

            var channels = [
                { id: 'scoChIG', key: 'instagram', icon: '\ud83d\udcf8', name: 'Instagram',
                  searchUrl: function(n) { return 'https://www.instagram.com/' + n.replace(/\s+/g,'').toLowerCase() + '/'; },
                  demo: { handle: '@{slug}', followers: '12.4K', posts: '847 posts', engagement: '3.2%' } },
                { id: 'scoChFB', key: 'facebook', icon: '\ud83d\udcd8', name: 'Facebook',
                  searchUrl: function(n) { return 'https://www.facebook.com/search/top?q=' + encodeURIComponent(n); },
                  demo: { handle: '{name}', followers: '3.2K likes', posts: '156 posts', engagement: '1.8%' } },
                { id: 'scoChTT', key: 'tiktok', icon: '\ud83c\udfb5', name: 'TikTok',
                  searchUrl: function(n) { return 'https://www.tiktok.com/@' + n.replace(/\s+/g,'').toLowerCase(); },
                  demo: { handle: '@{slug}', followers: '45.6K', posts: '312 videos', engagement: '5.1%' } },
                { id: 'scoChYT', key: 'youtube', icon: '\ud83d\udd34', name: 'YouTube',
                  searchUrl: function(n) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(n); },
                  demo: { handle: '{name}', followers: '8.1K subs', posts: '67 videos', engagement: '2.4%' } }
            ];

            if (!searchInput || !goBtn) { console.warn('[SCO] Elements not found'); return; }

            function slugify(name) { return name.replace(/\s+/g, '').toLowerCase(); }

            function setCardState(card, state) { card.setAttribute('data-state', state); }

            function fillCard(card, ch, name) {
                var slug = slugify(name);
                var statusEl = card.querySelector('.sco-channel-status');
                var resultEl = card.querySelector('.sco-channel-result');
                var handle = ch.demo.handle.replace('{slug}', slug).replace('{name}', name);
                statusEl.textContent = 'found \u2713';
                resultEl.innerHTML = '<strong>' + handle + '</strong><br>' +
                    ch.demo.followers + ' \u00b7 ' + ch.demo.posts;
                setCardState(card, 'found');
            }

            function runVerify() {
                var name = searchInput.value.trim();
                if (!name) return;

                goBtn.disabled = true;
                searchInput.disabled = true;

                /* Reset all cards */
                channels.forEach(function(ch) {
                    var card = document.getElementById(ch.id);
                    setCardState(card, 'idle');
                    card.querySelector('.sco-channel-status').textContent = 'waiting';
                    card.querySelector('.sco-channel-result').innerHTML = '';
                });

                /* Hide results */
                reportArea.classList.remove('visible');
                quickLinks.classList.remove('visible');
                resetRow.classList.remove('visible');

                /* Stagger each channel: idle -> searching -> found */
                channels.forEach(function(ch, idx) {
                    var card = document.getElementById(ch.id);
                    var searchDelay = idx * 700;
                    var foundDelay = searchDelay + 1200 + Math.random() * 800;

                    setTimeout(function() {
                        setCardState(card, 'searching');
                        card.querySelector('.sco-channel-status').textContent = 'searching...';
                    }, searchDelay);

                    setTimeout(function() {
                        fillCard(card, ch, name);

                        /* After last channel found -> show report + quick links */
                        if (idx === channels.length - 1) {
                            setTimeout(function() { showResults(name); }, 400);
                        }
                    }, foundDelay);
                });
            }

            function showResults(name) {
                /* Build social report */
                reportGrid.innerHTML = '';
                channels.forEach(function(ch) {
                    var slug = slugify(name);
                    var handle = ch.demo.handle.replace('{slug}', slug).replace('{name}', name);
                    var card = document.createElement('div');
                    card.className = 'sco-report-card';
                    card.innerHTML =
                        '<div class="sco-report-card-title">' + ch.icon + ' ' + ch.name + '</div>' +
                        '<div class="sco-report-card-stat">' +
                        '<strong>' + handle + '</strong><br>' +
                        'Followers: <strong>' + ch.demo.followers + '</strong><br>' +
                        'Content: <strong>' + ch.demo.posts + '</strong><br>' +
                        'Engagement: <strong>' + ch.demo.engagement + '</strong>' +
                        '</div>';
                    reportGrid.appendChild(card);
                });

                /* Build quick links */
                quickLinksRow.innerHTML = '';
                channels.forEach(function(ch) {
                    var a = document.createElement('a');
                    a.className = 'sco-quick-link';
                    a.setAttribute('data-platform', ch.key);
                    a.href = ch.searchUrl(name);
                    a.target = '_blank';
                    a.innerHTML =
                        '<span class="sco-quick-link-icon">' + ch.icon + '</span>' +
                        '<span class="sco-quick-link-label">Open ' + ch.name + '</span>';
                    quickLinksRow.appendChild(a);
                });

                /* Reveal */
                reportArea.classList.add('visible');
                setTimeout(function() { quickLinks.classList.add('visible'); }, 200);
                setTimeout(function() { resetRow.classList.add('visible'); }, 400);

                goBtn.disabled = false;
                searchInput.disabled = false;
            }

            function resetSCO() {
                searchInput.value = '';
                searchInput.disabled = false;
                goBtn.disabled = false;
                channels.forEach(function(ch) {
                    var card = document.getElementById(ch.id);
                    setCardState(card, 'idle');
                    card.querySelector('.sco-channel-status').textContent = 'waiting';
                    card.querySelector('.sco-channel-result').innerHTML = '';
                });
                reportArea.classList.remove('visible');
                quickLinks.classList.remove('visible');
                resetRow.classList.remove('visible');
                searchInput.focus();
            }

            goBtn.addEventListener('click', runVerify);
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') runVerify();
            });
            resetBtn.addEventListener('click', resetSCO);

            console.log('[SCO] Social Climate Organizer ready — ID Verify + 4 channels');
        })();



        /* ═══════ SPACE BAR BUTTON — Overlay + Tile System ═══════ */
        (function initSpaceBar() {
            var sbBtn = document.getElementById('notchSpacebar');
            var sbLabel = document.getElementById('notchSpacebarLabel');
            var sbOverlay = document.getElementById('spacebarOverlay');
            var sbBackdrop = document.getElementById('spacebarOverlayBackdrop');
            var sbClose = document.getElementById('spacebarOverlayClose');
            var sbBody = document.getElementById('spacebarOverlayBody');
            var sbReadyState = document.getElementById('spacebarReadyState');
            var sbSections = document.getElementById('spacebarSections');

            if (!sbBtn || !sbOverlay) { console.warn('[SB] Space Bar elements not found'); return; }

            var sbOpen = false;
            var sbLoaded = false;
            var sbCurrentView = 0; /* 0 = main comms, 1 = daily render */

            /* Contact type registry — localStorage persisted */
            var CONTACT_TYPES_KEY = 'wingdash_contact_types';
            function loadContactTypes() {
                try { return JSON.parse(localStorage.getItem(CONTACT_TYPES_KEY)) || {}; }
                catch(e) { return {}; }
            }
            function saveContactTypes(types) {
                localStorage.setItem(CONTACT_TYPES_KEY, JSON.stringify(types));
            }

            /* ── Dot nav ── */
            var dotBtns = document.querySelectorAll('.sb-dot-btn');
            var viewMain = document.getElementById('sbViewMain');
            var viewDaily = document.getElementById('sbViewDailyRender');
            var sbSubtitle = document.getElementById('spacebarSubtitle');

            function switchSbView(idx) {
                sbCurrentView = idx;
                dotBtns.forEach(function(b) {
                    b.classList.toggle('sb-dot-active', parseInt(b.getAttribute('data-view')) === idx);
                });
                if (idx === 0) {
                    viewMain.style.display = '';
                    viewDaily.style.display = 'none';
                    if (sbSubtitle) sbSubtitle.textContent = 'quick comms check';
                } else {
                    viewMain.style.display = 'none';
                    viewDaily.style.display = '';
                    if (sbSubtitle) sbSubtitle.textContent = 'daily render';
                    loadDailyRender();
                }
            }

            dotBtns.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    switchSbView(parseInt(btn.getAttribute('data-view')));
                });
            });

            /* ── This week kanban toggle ── */
            var thisWeekToggle = document.getElementById('sbThisWeekToggle');
            var kanbanWrap = document.getElementById('sbKanbanWrap');
            var thisWeekIcon = document.getElementById('sbThisWeekIcon');
            var kanbanOpen = false;

            if (thisWeekToggle) {
                thisWeekToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    kanbanOpen = !kanbanOpen;
                    kanbanWrap.classList.toggle('open', kanbanOpen);
                    thisWeekIcon.classList.toggle('expanded', kanbanOpen);
                    if (kanbanOpen) {
                        renderKanban();
                    }
                });
            }

            function renderKanban() {
                var todo = document.getElementById('sbKanbanTodo');
                var inprog = document.getElementById('sbKanbanInProgress');
                var done = document.getElementById('sbKanbanDone');
                if (!todo) return;

                /* Pull from localStorage campaigns — map status to kanban columns */
                var campaigns = [];
                try { campaigns = JSON.parse(localStorage.getItem('wingdash_campaigns')) || []; } catch(e) {}

                var todoItems = [], inprogItems = [], doneItems = [];
                campaigns.forEach(function(row) {
                    if (!row.clientName) return;
                    var status = (row.status || '').toLowerCase();
                    var card = { name: row.clientName, sub: row.orderName || '' };
                    if (status === 'complete' || status === 'done') {
                        doneItems.push(card);
                    } else if (status === 'in progress' || status === 'active' || status === 'inprogress') {
                        inprogItems.push(card);
                    } else {
                        todoItems.push(card);
                    }
                });

                function fillCol(container, items) {
                    container.innerHTML = '';
                    if (items.length === 0) {
                        var em = document.createElement('div');
                        em.className = 'sb-kanban-empty';
                        em.textContent = 'empty';
                        container.appendChild(em);
                        return;
                    }
                    items.forEach(function(c) {
                        var card = document.createElement('div');
                        card.className = 'sb-kanban-card';
                        card.innerHTML = '<div>' + c.name + '</div>' +
                            (c.sub ? '<div class="sb-kanban-card-sub">' + c.sub + '</div>' : '');
                        container.appendChild(card);
                    });
                }

                fillCol(todo, todoItems);
                fillCol(inprog, inprogItems);
                fillCol(done, doneItems);

                document.getElementById('sbThisWeekCount').textContent = campaigns.length;
            }

            /* ── Daily Render loader ── */
            function loadDailyRender() {
                var placeholder = document.getElementById('sbDailyPlaceholder');
                var blocks = document.getElementById('sbDailyBlocks');
                if (!placeholder || !blocks) return;

                fetch('data/feeds/comms-changes.json?t=' + Date.now())
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        if (!data || !data.channels || data.channels.length === 0) {
                            placeholder.style.display = 'flex';
                            blocks.style.display = 'none';
                            return;
                        }
                        placeholder.style.display = 'none';
                        blocks.style.display = '';
                        blocks.innerHTML = '';

                        /* Channel order matches right wing hierarchy */
                        var channelOrder = ['gmail', 'imessage', 'whatsapp', 'other'];
                        var channelMeta = {
                            gmail:    { label: 'Gmail',    icon: '\u2709\uFE0F', cls: 'gmail' },
                            imessage: { label: 'iMessage', icon: '\ud83d\udcac', cls: 'imessage' },
                            whatsapp: { label: 'WhatsApp', icon: '\ud83d\udcf1', cls: 'whatsapp' },
                            other:    { label: 'Other',    icon: '\ud83d\udce1', cls: 'other' }
                        };

                        channelOrder.forEach(function(ch) {
                            var channelData = data.channels.find(function(c) { return c.channel === ch; });
                            if (!channelData || !channelData.changes || channelData.changes.length === 0) return;

                            var meta = channelMeta[ch] || { label: ch, icon: '\ud83d\udce5', cls: 'other' };
                            var block = document.createElement('div');
                            block.className = 'sb-daily-channel-block';

                            var hdr = document.createElement('div');
                            hdr.className = 'sb-daily-channel-header ' + meta.cls;
                            hdr.innerHTML = '<span class="sb-daily-channel-icon">' + meta.icon + '</span>' + meta.label +
                                '<span style="margin-left:auto;font-family:JetBrains Mono,monospace;font-size:0.46rem;opacity:0.5;">' + channelData.changes.length + ' new</span>';
                            block.appendChild(hdr);

                            channelData.changes.forEach(function(item) {
                                var card = document.createElement('div');
                                card.className = 'sb-daily-change-card ' + meta.cls;
                                card.innerHTML =
                                    '<div class="sb-daily-card-name">' + (item.contact || item.name || 'Unknown') + '</div>' +
                                    '<div class="sb-daily-card-snippet">' + (item.snippet || item.subject || '') + '</div>' +
                                    '<div class="sb-daily-card-ts">' + (item.timestamp || item.date || '') + '</div>';
                                if (item.url) {
                                    card.style.cursor = 'pointer';
                                    card.addEventListener('click', function() { window.open(item.url, '_blank'); });
                                }
                                block.appendChild(card);
                            });

                            blocks.appendChild(block);
                        });

                        if (blocks.innerHTML === '') {
                            placeholder.style.display = 'flex';
                            blocks.style.display = 'none';
                        }
                    })
                    .catch(function() {
                        placeholder.style.display = 'flex';
                        blocks.style.display = 'none';
                    });
            }

            /* ── Open / Close ── */
            function openSpacebar() {
                if (sbOpen) return;
                sbOpen = true;
                sbBtn.classList.add('spacebar-active');
                sbLabel.textContent = 'open';

                sbBackdrop.style.display = 'block';
                sbOverlay.style.display = 'flex';

                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        sbBackdrop.classList.add('active');
                        sbOverlay.classList.add('active');
                    });
                });
            }

            function closeSpacebar() {
                if (!sbOpen) return;
                sbOpen = false;
                sbBtn.classList.remove('spacebar-active');
                sbLabel.textContent = 'space bar';

                sbBackdrop.classList.add('closing');
                sbOverlay.classList.add('closing');
                sbBackdrop.classList.remove('active');
                sbOverlay.classList.remove('active');

                setTimeout(function() {
                    sbBackdrop.classList.remove('closing');
                    sbOverlay.classList.remove('closing');
                    sbBackdrop.style.display = 'none';
                    sbOverlay.style.display = 'none';
                }, 350);
            }

            /* ── Spacebar keyboard trigger ── */
            var _sbLastSpaceTime = 0;

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && sbOpen) { closeSpacebar(); return; }

                if (e.key === ' ') {
                    /* Skip if user is typing in an input field */
                    var tag = (document.activeElement && document.activeElement.tagName) ? document.activeElement.tagName.toUpperCase() : '';
                    var ce = document.activeElement && document.activeElement.isContentEditable;
                    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || ce) return;

                    /* Double-tap to OPEN the overlay (when it's not already open) */
                    if (!sbOpen) {
                        var now = Date.now();
                        if (now - _sbLastSpaceTime <= 350) {
                            e.preventDefault();
                            _sbLastSpaceTime = 0;
                            openSpacebar();
                        } else {
                            _sbLastSpaceTime = now;
                        }
                        return;
                    }

                    /* Single space while overlay is open, on main view, and tiles not yet loaded */
                    if (sbOpen && sbCurrentView === 0 && !sbLoaded) {
                        e.preventDefault();
                        loadTiles();
                    }
                }
            });

            /* ── Load tiles from comms data ── */
            function loadTiles() {
                sbLoaded = true;
                sbReadyState.style.display = 'none';
                sbSections.classList.add('loaded');

                var contactTypes = loadContactTypes();

                /* Gather comms from all available sources */
                var allComms = [];

                /* Source 1: Gmail contacts from feed */
                fetch('data/feeds/gmail.json?t=' + Date.now())
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        if (data && data.contacts) {
                            data.contacts.forEach(function(c) {
                                allComms.push({
                                    name: c.name || c.email,
                                    email: c.email || '',
                                    subject: c.subject || '',
                                    url: c.thread_url || '',
                                    date: c.date || '',
                                    channel: 'gmail',
                                    type: contactTypes[c.email] || contactTypes[c.name] || 'lead'
                                });
                            });
                        }

                        /* Source 2: Campaigns from localStorage */
                        try {
                            var campaigns = JSON.parse(localStorage.getItem('wingdash_campaigns')) || [];
                            campaigns.forEach(function(row) {
                                if (!row.clientName) return;
                                /* Avoid duplicates by email/name */
                                var exists = allComms.some(function(c) {
                                    return c.name === row.clientName;
                                });
                                if (!exists) {
                                    allComms.push({
                                        name: row.clientName,
                                        email: '',
                                        subject: row.orderName || '',
                                        url: row.paymentLink || '',
                                        date: '',
                                        channel: 'campaign',
                                        type: contactTypes[row.clientName] || 'client'
                                    });
                                }
                            });
                        } catch(e) {}

                        renderTiles(allComms);
                    })
                    .catch(function() {
                        /* No gmail.json — try campaigns only */
                        var allLocal = [];
                        try {
                            var campaigns = JSON.parse(localStorage.getItem('wingdash_campaigns')) || [];
                            campaigns.forEach(function(row) {
                                if (!row.clientName) return;
                                allLocal.push({
                                    name: row.clientName,
                                    email: '',
                                    subject: row.orderName || '',
                                    url: row.paymentLink || '',
                                    date: '',
                                    channel: 'campaign',
                                    type: contactTypes[row.clientName] || 'client'
                                });
                            });
                        } catch(e) {}
                        renderTiles(allLocal);
                    });
            }

            /* ── Determine tile glow state ── */
            function getGlowState(dateStr) {
                if (!dateStr) return '';
                try {
                    var d = new Date(dateStr);
                    if (isNaN(d.getTime())) return '';
                    var now = new Date();
                    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    var diffDays = Math.floor((today - d) / (1000 * 60 * 60 * 24));

                    if (diffDays <= 0) return 'replied';       /* today — red glow */
                    if (diffDays <= 3) return 'stale';          /* 1-3 days — yellow glow */
                    return '';                                   /* older — no glow */
                } catch(e) { return ''; }
            }

            /* ── Render tiles into sections ── */
            function renderTiles(comms) {
                /* Categorize: urgent = replied today, lead/supplier/client by type */
                var urgent = comms.filter(function(c) { return getGlowState(c.date) === 'replied'; });
                var leads = comms.filter(function(c) { return c.type === 'lead' && getGlowState(c.date) !== 'replied'; });
                var suppliers = comms.filter(function(c) { return c.type === 'supplier' && getGlowState(c.date) !== 'replied'; });
                /* clients go into routine */
                var clients = comms.filter(function(c) { return c.type === 'client'; });

                function buildTile(c) {
                    var glow = getGlowState(c.date);
                    var tile = document.createElement('div');
                    tile.className = 'spacebar-tile' + (glow ? ' ' + glow : '');
                    tile.innerHTML =
                        '<div class="spacebar-tile-name">' + c.name + '</div>' +
                        (c.subject ? '<div class="spacebar-tile-subject">' + c.subject + '</div>' : '') +
                        '<div class="spacebar-tile-meta">' +
                            '<span class="spacebar-tile-channel">' + c.channel + '</span>' +
                            (c.date ? '<span class="spacebar-tile-date">' + c.date + '</span>' : '') +
                        '</div>';

                    /* Click tile → open thread/URL */
                    if (c.url) {
                        tile.addEventListener('click', function() {
                            window.open(c.url, '_blank');
                        });
                    }

                    /* Right-click tile → cycle type (supplier/client/lead) */
                    tile.addEventListener('contextmenu', function(e) {
                        e.preventDefault();
                        var types = loadContactTypes();
                        var key = c.email || c.name;
                        var current = types[key] || 'lead';
                        var cycle = { supplier: 'client', client: 'lead', lead: 'supplier' };
                        types[key] = cycle[current] || 'lead';
                        saveContactTypes(types);
                        /* Reload tiles with new types */
                        sbLoaded = false;
                        sbSections.classList.remove('loaded');
                        sbReadyState.style.display = 'none';
                        loadTiles();
                    });

                    return tile;
                }

                /* Populate sections */
                var urgentTiles   = document.getElementById('sbUrgentTiles');
                var leadTiles     = document.getElementById('sbLeadTiles');
                var supplierTiles = document.getElementById('sbSupplierTiles');
                var routineTiles  = document.getElementById('sbRoutineTiles');

                urgentTiles.innerHTML   = '';
                leadTiles.innerHTML     = '';
                supplierTiles.innerHTML = '';
                routineTiles.innerHTML  = '';

                urgent.forEach(function(c)    { urgentTiles.appendChild(buildTile(c)); });
                leads.forEach(function(c)     { leadTiles.appendChild(buildTile(c)); });
                suppliers.forEach(function(c) { supplierTiles.appendChild(buildTile(c)); });
                clients.forEach(function(c)   { routineTiles.appendChild(buildTile(c)); });

                /* Update counts */
                document.getElementById('sbUrgentCount').textContent   = urgent.length;
                document.getElementById('sbLeadCount').textContent     = leads.length;
                document.getElementById('sbSupplierCount').textContent = suppliers.length;
                document.getElementById('sbRoutineCount').textContent  = clients.length;

                /* Show empty state for sections with no tiles */
                var emptyStyle = 'font-family:JetBrains Mono,monospace;font-size:0.5rem;color:rgba(255,255,255,0.15);padding:8px 0;text-transform:uppercase;letter-spacing:0.08em;';
                [
                    [urgentTiles,   'no urgent items'],
                    [leadTiles,     'no leads responded'],
                    [supplierTiles, 'no suppliers responded'],
                    [routineTiles,  'no routine tasks']
                ].forEach(function(pair) {
                    if (pair[0].children.length === 0) {
                        var empty = document.createElement('div');
                        empty.style.cssText = emptyStyle;
                        empty.textContent = pair[1];
                        pair[0].appendChild(empty);
                    }
                });
            }

            /* Reset loaded state when overlay closes */
            var origClose = closeSpacebar;
            closeSpacebar = function() {
                sbLoaded = false;
                sbSections.classList.remove('loaded');
                sbReadyState.style.display = '';
                /* Reset to main view */
                switchSbView(0);
                origClose();
            };

            /* Re-wire close handlers to use updated closeSpacebar */
            sbBtn.onclick = function() {
                if (sbOpen) { closeSpacebar(); } else { openSpacebar(); }
            };
            sbClose.onclick = function(e) { e.stopPropagation(); closeSpacebar(); };
            sbBackdrop.onclick = function() { closeSpacebar(); };

            console.log('[SB] Space Bar Button ready — click red button, hit spacebar to load. Dot nav for Daily Render.');
        })();


        /* ═══════ PAYMENT PORTALS — Quick Links ═══════ */
        console.log('[PL] Payment Portals ready — Stripe, PayPal, Venmo');


        /* ══════════════════════════════════════════════
           Add New Client — Inline Input Handler
           Click pill → inline text input → Enter → saved
           ══════════════════════════════════════════════ */

        (function initAddNewClient() {

            var activeInput = null; /* track open input so only one at a time */

            /* ── Success flash element ── */
            var flash = document.createElement('div');
            flash.className = 'anc-success-flash';
            flash.id = 'ancFlash';
            flash.textContent = 'Client Added';
            document.body.appendChild(flash);

            /* ── localStorage helpers ── */
            function loadClients() {
                try { return JSON.parse(localStorage.getItem('wingdash_clients')) || []; }
                catch (err) { return []; }
            }
            function saveClients(clients) {
                localStorage.setItem('wingdash_clients', JSON.stringify(clients));
            }

            /* ── Add pill to Contacts section ── */
            function addContactPill(clientName) {
                var contactsSectionIndex = 4;
                renderPills('left', contactsSectionIndex);
                var track = document.getElementById('leftTrack');
                var sections = track.querySelectorAll('.wing-section');
                var contactsSection = sections[contactsSectionIndex];
                if (!contactsSection) return;

                if (pillData.left[contactsSectionIndex]) {
                    pillData.left[contactsSectionIndex].push({
                        icon: '\u{1F464}', label: clientName, sub: 'client'
                    });
                }

                var pill = document.createElement('div');
                pill.className = 'pill';
                pill.innerHTML =
                    '<div class="pill-icon">\u{1F464}</div>' +
                    '<div class="pill-text">' +
                        '<div class="pill-label">' + clientName + '</div>' +
                        '<div class="pill-sub">client</div>' +
                    '</div>' +
                    '<div class="pill-chevron">\u25B6</div>';
                contactsSection.appendChild(pill);

                pill.addEventListener('click', function() {
                    pill.classList.add('sending');
                    setTimeout(function() { pill.classList.remove('sending'); }, 500);
                    TileManager.getOrCreate({
                        sourceType: 'client', sourceLabel: clientName,
                        sourceIcon: '\u{1F464}', client: clientName,
                        service: '', price: ''
                    });
                });
            }

            /* ── Show success flash ── */
            function showFlash(msg) {
                flash.textContent = msg || 'Client Added';
                flash.classList.add('visible');
                setTimeout(function() { flash.classList.remove('visible'); }, 1600);
            }

            /* ── Close / destroy inline input ── */
            function destroyInput() {
                if (!activeInput) return;
                var wrap = activeInput.parentElement;
                if (wrap) wrap.remove();
                activeInput = null;
            }

            /* ── Open inline input below the clicked pill ── */
            function openInlineInput(pill) {
                if (activeInput) destroyInput();

                var wrap = document.createElement('div');
                wrap.style.cssText = 'padding:4px 6px 6px;';
                var input = document.createElement('input');
                input.type = 'text';
                input.className = 'anc-inline-input';
                input.placeholder = 'Client name…';
                input.autocomplete = 'off';
                wrap.appendChild(input);

                /* Insert right after the pill */
                pill.parentNode.insertBefore(wrap, pill.nextSibling);
                activeInput = input;
                setTimeout(function() { input.focus(); }, 30);

                /* Enter = save */
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        var name = input.value.trim();
                        if (!name) return;

                        var client = {
                            id: 'CL-' + Date.now(),
                            name: name,
                            dateAdded: new Date().toISOString()
                        };
                        var clients = loadClients();
                        clients.push(client);
                        saveClients(clients);

                        addContactPill(name);
                        destroyInput();
                        showFlash('Client Added — ' + name);
                        console.log('[ANC] New client saved:', client.id, name);
                    }
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        destroyInput();
                    }
                });

                /* Click outside = cancel */
                input.addEventListener('blur', function() {
                    setTimeout(destroyInput, 150);
                });
            }

            /* ── Intercept "Add New Client" pill clicks (capturing phase) ── */
            document.getElementById('leftTrack').addEventListener('click', function(e) {
                var pill = e.target.closest('.pill');
                if (!pill) return;
                var labelEl = pill.querySelector('.pill-label');
                if (!labelEl) return;
                if (labelEl.textContent.trim() === 'Add New Client') {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    openInlineInput(pill);
                }
            }, true);

            /* ── Load saved clients into Contacts on boot ── */
            var savedClients = loadClients();
            if (savedClients.length > 0) {
                setTimeout(function() {
                    savedClients.forEach(function(c) {
                        var existing = pillData.left[4] || [];
                        var alreadyThere = existing.some(function(p) { return p.label === c.name; });
                        if (!alreadyThere) addContactPill(c.name);
                    });
                    console.log('[ANC] Restored ' + savedClients.length + ' saved client(s) to Contacts');
                }, 500);
            }

            /* ── Expose helpers for call card Auto Go ── */
            window.ANC = {
                loadClients: loadClients,
                saveClients: saveClients,
                addContactPill: addContactPill,
                showFlash: showFlash,
                openInlineInput: openInlineInput
            };

            console.log('[ANC] Add New Client inline handler ready');
        })();


        /* ══════════════════════════════════════════════
           Call Card — Add Client + Order + ⚡ Auto Go
           Creates client → opens Campaigns → adds row
           ══════════════════════════════════════════════ */

        (function initCallCardAddClientOrder() {
            /* SWAPPED: regular click = instant, lightning = guided */
            var callBtn = document.getElementById('callAddClientOrderAG');
            var qgBtn = document.getElementById('callAddClientOrder');
            if (!callBtn || !qgBtn) return;

            var contactsIndex = 4; /* Contacts section in left wing */

            /* ── Helper: find the "Add New Client" pill in Contacts section ── */
            function findAddNewClientPill() {
                var track = document.getElementById('leftTrack');
                if (!track) return null;
                var sections = track.querySelectorAll('.wing-section');
                var section = sections[contactsIndex];
                if (!section) return null;
                var pills = section.querySelectorAll('.pill');
                for (var i = 0; i < pills.length; i++) {
                    var lbl = pills[i].querySelector('.pill-label');
                    if (lbl && lbl.textContent.trim() === 'Add New Client') return pills[i];
                }
                /* Also check General Tools (index 3) */
                var gtSection = sections[3];
                if (gtSection) {
                    var gtPills = gtSection.querySelectorAll('.pill');
                    for (var j = 0; j < gtPills.length; j++) {
                        var lbl2 = gtPills[j].querySelector('.pill-label');
                        if (lbl2 && lbl2.textContent.trim() === 'Add New Client') return gtPills[j];
                    }
                }
                return null;
            }

            /* ── Helper: after client is saved, open campaigns + add row ── */
            function openCampaignsWithRow(clientName, clientId) {
                setTimeout(function() {
                    if (typeof openCampaigns === 'function') openCampaigns();
                    if (typeof window._campaignsAddRowFor === 'function') {
                        window._campaignsAddRowFor(clientName, clientId);
                    }
                    /* Update filter to show this client */
                    var filterLabel = document.getElementById('campaignsFilterLabel');
                    if (filterLabel) filterLabel.textContent = clientName;
                    if (typeof window._campaignsRender === 'function') window._campaignsRender();
                    console.log('[ACO] Campaigns opened + row added for:', clientName);
                }, 350);
            }

            /* ── Part 1: Call Card "Add Client + Order" button ── */
            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);

                /* 1. Swap left wing to Contacts section */
                goToSection('left', contactsIndex);

                /* 2. Render pills then trigger inline input */
                renderPills('left', contactsIndex);

                setTimeout(function() {
                    var pill = findAddNewClientPill();
                    if (pill && window.ANC && window.ANC.openInlineInput) {
                        /* Wrap openInlineInput to chain campaigns after save */
                        var origOpen = window.ANC.openInlineInput;
                        var patchedOpen = function(p) {
                            origOpen(p);
                            /* Find the input just created and intercept Enter */
                            setTimeout(function() {
                                var inputs = document.querySelectorAll('.anc-inline-input');
                                var inp = inputs[inputs.length - 1];
                                if (!inp) return;
                                inp.addEventListener('keydown', function handler(ev) {
                                    if (ev.key === 'Enter') {
                                        var name = inp.value.trim();
                                        if (name) {
                                            /* Client saved by original handler;
                                               chain campaigns after a beat */
                                            var clients = window.ANC.loadClients();
                                            var latest = clients[clients.length - 1];
                                            var cid = latest ? latest.id : 'CL-' + Date.now();
                                            openCampaignsWithRow(name, cid);
                                            if (typeof punchReport === 'function') punchReport({ action: 'Add Client + Order', client: name, color: '#10b981', type: 'instant-add-client', data: { clientName: name, clientId: cid } });
                                        }
                                        inp.removeEventListener('keydown', handler);
                                    }
                                });
                            }, 60);
                        };
                        patchedOpen(pill);
                    }
                }, 200);
            });

            /* ── Part 2: ⚡ Auto Go button ── */
            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                var cmdInput = document.getElementById('cmdInput');
                var nameFromInput = cmdInput ? cmdInput.value.trim() : '';

                if (nameFromInput) {
                    /* Direct create — skip manual flow */
                    var client = {
                        id: 'CL-' + Date.now(),
                        name: nameFromInput,
                        dateAdded: new Date().toISOString()
                    };
                    var clients = window.ANC.loadClients();
                    clients.push(client);
                    window.ANC.saveClients(clients);

                    /* Add pill to Contacts section */
                    window.ANC.addContactPill(nameFromInput);

                    /* Swap to Contacts so user sees the new pill */
                    goToSection('left', contactsIndex);

                    /* Flash confirmation */
                    window.ANC.showFlash('Client + Order Added — ' + nameFromInput);

                    /* Open campaigns + auto-add row */
                    openCampaignsWithRow(nameFromInput, client.id);

                    /* Clear the command input */
                    cmdInput.value = '';

                    if (typeof punchReport === 'function') punchReport({ action: 'Add Client + Order', client: nameFromInput, color: '#10b981', type: 'instant-add-client', data: { clientName: nameFromInput, clientId: client.id } });
                    console.log('[ACO-AG] Auto Go created client + campaign:', client.id, nameFromInput);
                } else {
                    /* No name in input — fall back to regular Add Client + Order flow */
                    callBtn.click();
                }
            });

            console.log('[ACO] Call Card Add Client + Order + Auto Go wired');
        })();


        /* ══════════════════════════════════════════════
           Call Card — Mark Complete + ⚡ Auto Go
           Opens campaigns panel / auto-completes active client
           ══════════════════════════════════════════════ */

                /* ==================================================
           Call Card - Create Presentation + Auto Go
           Shows inline prompt for tile count + focus, then
           calls Claude API to generate a presentation HTML.
           Stores result in localStorage per client.
        ================================================== */

        (function initCallCardCreatePresentation() {
            /* SWAPPED: regular click = instant, lightning = guided */
            var cpCallBtn = document.getElementById('callCreatePresAG');
            var cpQgBtn = document.getElementById('callCreatePresentation');
            var cpPromptPanel = document.getElementById('createPresPrompt');
            var cpTileInput = document.getElementById('presTileCount');
            var cpFocusInput = document.getElementById('presFocus');
            var cpSubmitBtn = document.getElementById('presPromptSubmit');
            if (!cpCallBtn || !cpQgBtn) return;

            /* Track selected client for prompt submit */
            var _cpSelectedClient = '';

            function cpGetClientName() {
                if (_cpSelectedClient) return _cpSelectedClient;
                if (typeof activeClient !== 'undefined' && activeClient && activeClient.name) return activeClient.name;
                var plEl = document.getElementById('placeClientName');
                if (plEl && plEl.textContent && plEl.textContent !== 'No client selected') return plEl.textContent;
                var cmdIn = document.getElementById('cmdInput');
                if (cmdIn && cmdIn.value.trim()) return cmdIn.value.trim();
                return '';
            }

            function cpPresKey(cn) {
                return 'wingdash_presentations_' + cn.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
            }

            /* ── Helper: read presentations array from localStorage ── */
            function cpReadPresArray(cn) {
                var k = cpPresKey(cn);
                var raw = null;
                try { raw = localStorage.getItem(k); } catch(e) {}
                if (!raw) return [];
                // Try JSON array first (new format)
                try {
                    var parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) return parsed;
                } catch(e) {}
                // Old format: plain HTML string — treat as single P1 entry
                return [{ title: cn + ' - P1', html: raw, timestamp: '' }];
            }

            /* ── Helper: save presentations array to localStorage ── */
            function cpSavePresArray(cn, arr) {
                var k = cpPresKey(cn);
                try { localStorage.setItem(k, JSON.stringify(arr)); } catch(e) {}
            }

            /* ── Helper: open a presentation HTML in a new tab ── */
            function cpOpenPresHtml(cn, htmlContent) {
                var ph = htmlContent.replace(/^```html?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
                var fd = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Presentation - ' + cn + '</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;margin:0;padding:3rem 2rem;background:#000000;color:#ffffff;-webkit-font-smoothing:antialiased;min-height:100vh;background-image:radial-gradient(circle at 20% 30%,rgba(29,185,84,0.04) 0%,transparent 50%),radial-gradient(circle at 80% 70%,rgba(29,185,84,0.03) 0%,transparent 50%);}h1{color:#ffffff;font-size:2.5rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:1rem;}h2{color:#1DB954;font-size:1.25rem;font-weight:600;margin:1.5rem 0 0.75rem;}h3{color:#1ed760;font-size:1rem;font-weight:600;margin:1rem 0 0.5rem;}p{color:#b3b3b3;font-size:0.95rem;line-height:1.7;margin-bottom:0.75rem;}ul,ol{padding-left:1.5em;margin:0.5rem 0;}li{color:#b3b3b3;font-size:0.95rem;line-height:1.8;margin-bottom:0.35rem;}li::marker{color:#1DB954;}strong{color:#ffffff;}em{color:#1ed760;font-style:italic;}table{width:100%;border-collapse:collapse;margin:1em 0;}th,td{padding:10px 14px;border:1px solid rgba(29,185,84,0.15);text-align:left;}th{background:rgba(29,185,84,0.1);color:#1DB954;font-weight:700;}td{color:#b3b3b3;}.pres-wrap{max-width:900px;margin:0 auto;background:linear-gradient(135deg,#282828 0%,#181818 100%);border:1px solid rgba(255,255,255,0.07);border-radius:32px;padding:4rem 3.5rem;box-shadow:0 1px 2px rgba(0,0,0,0.3),0 4px 8px rgba(0,0,0,0.2),0 8px 16px rgba(0,0,0,0.15),0 16px 32px rgba(0,0,0,0.1),inset 0 1px 0 rgba(255,255,255,0.03);}</style></head><body><div class="pres-wrap">' + ph + '</div></body></html>';
                var bl = new Blob([fd], { type: 'text/html' });
                window.open(URL.createObjectURL(bl), '_blank');
            }

            /* ── Render the P1-P8 gallery grid ── */
            function cpRenderGallery(cn) {
                var grid = document.getElementById('presGalleryGrid');
                var countEl = document.getElementById('presGalleryCount');
                var wrap = document.getElementById('presGalleryWrap');
                if (!grid) return;

                // No client loaded
                if (!cn) {
                    grid.innerHTML = '<div class="pres-gallery-no-client">Select a client to view presentations</div>';
                    if (countEl) countEl.textContent = '0 / 8';
                    return;
                }

                var arr = cpReadPresArray(cn);
                var filled = arr.length;
                if (countEl) countEl.textContent = filled + ' / 8';

                var html = '';
                for (var i = 0; i < 8; i++) {
                    var slotNum = i + 1;
                    if (i < arr.length && arr[i]) {
                        var entry = arr[i];
                        var title = entry.title || (cn + ' - P' + slotNum);
                        var ts = entry.timestamp || '';
                        html += '<div class="pres-gallery-slot filled" data-slot="' + i + '" title="Click to view">';
                        html += '<div class="pres-gallery-slot-top">';
                        var displayTitle = title.replace(/^.*?-\s*P\d+:?\s*/, '').trim();
                        if (!displayTitle) displayTitle = title;
                        html += '<span class="pres-gallery-slot-label">P' + slotNum + ': ' + displayTitle.substring(0, 28) + '</span>';
                        html += '<span class="pres-gallery-slot-view">View</span>';
                        html += '<span class="pres-gallery-slot-delete" data-slot="' + i + '" title="Remove this presentation">&times;</span>';
                        html += '</div>';
                        if (ts) html += '<span class="pres-gallery-slot-time">' + ts + '</span>';
                        html += '</div>';
                    } else {
                        html += '<div class="pres-gallery-slot empty">';
                        html += '<div class="pres-gallery-slot-top">';
                        html += '<span class="pres-gallery-slot-label">P' + slotNum + ': \u2014</span>';
                        html += '</div>';
                        html += '</div>';
                    }
                }
                grid.innerHTML = html;

                // Wire click handlers on filled slots
                var filledSlots = grid.querySelectorAll('.pres-gallery-slot.filled');
                filledSlots.forEach(function(slot) {
                    var idx = parseInt(slot.getAttribute('data-slot'), 10);
                    // View on click (but not on delete button)
                    slot.addEventListener('click', function(e) {
                        if (e.target.classList.contains('pres-gallery-slot-delete')) return;
                        var currentArr = cpReadPresArray(cn);
                        if (currentArr[idx] && currentArr[idx].html) {
                            cpOpenPresHtml(cn, currentArr[idx].html);
                        }
                    });
                });

                // Wire delete buttons
                var delBtns = grid.querySelectorAll('.pres-gallery-slot-delete');
                delBtns.forEach(function(btn) {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        var idx = parseInt(btn.getAttribute('data-slot'), 10);
                        var currentArr = cpReadPresArray(cn);
                        if (idx >= 0 && idx < currentArr.length) {
                            currentArr.splice(idx, 1);
                            cpSavePresArray(cn, currentArr);
                            cpRenderGallery(cn);
                            cpUpdatePresState(cn);
                            if (typeof showWingToast === 'function') showWingToast('P' + (idx + 1) + ' removed', 'presentation');
                        }
                    });
                });
            }
            window._renderPresGallery = cpRenderGallery;

            function cpUpdatePresState(cn) {
                var st = document.getElementById('cjPresStatus');
                var vb = document.getElementById('cjPresViewBtn');
                if (!cn) {
                    if (st) st.textContent = 'No client loaded';
                    if (vb) vb.style.display = 'none';
                    cpRenderGallery(null);
                    return;
                }
                var arr = cpReadPresArray(cn);
                if (arr.length > 0) {
                    if (st) st.textContent = arr.length + ' presentation' + (arr.length > 1 ? 's' : '') + ' for ' + cn;
                    if (vb) {
                        vb.style.display = 'block';
                        vb.textContent = 'View Latest (P' + arr.length + ')';
                        vb.onclick = function() {
                            var latest = arr[arr.length - 1];
                            if (latest && latest.html) cpOpenPresHtml(cn, latest.html);
                        };
                    }
                } else {
                    if (st) st.textContent = 'No presentation generated yet';
                    if (vb) vb.style.display = 'none';
                }
                // Refresh gallery
                cpRenderGallery(cn);
            }
            window._updateJourneyPresState = cpUpdatePresState;

            function cpGenerate(cn, tc, foc) {
                console.log('[CreatePres] cpGenerate called for:', cn, 'tiles:', tc, 'focus:', foc);

                var jcPL = document.getElementById('cjBtnPresentation');
                var jcLbl = jcPL ? jcPL.querySelector('.cj-action-label') : null;
                if (jcLbl) jcLbl.textContent = 'Loading...';
                cpQgBtn.style.opacity = '0.5';
                cpQgBtn.style.pointerEvents = 'none';

                var ft = foc ? ' Focus on: ' + foc + '.' : ' Cover the campaign overview — goals, strategy, and key results.';
                var pt = 'Generate a professional presentation card in HTML for an artist services company called "Ahead Artist Solutions". ' +
                    'The presentation is for a client named "' + cn + '".' + ft + ' ' +
                    'DESIGN STYLE — match a dark Spotify-green professional aesthetic: ' +
                    'Use inline styles throughout. Background: #000000. Card container: background linear-gradient(135deg, #282828, #181818), border-radius 24px, padding 3rem, border 1px solid rgba(255,255,255,0.07). ' +
                    'Typography: font-family system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif. ' +
                    'Colors: headings #1DB954 (Spotify green), subheadings #1ed760 (lighter green), body text #b3b3b3, strong/emphasis #ffffff, bullet markers #1DB954. ' +
                    'Structure: Start with a small uppercase label in #727272 (letter-spacing 0.15em, font-size 0.625rem) showing "AHEAD ARTIST SOLUTIONS", ' +
                    'then an h1 with the client name styled with color #ffffff and font-weight 700, ' +
                    'then a thin 60px divider line with background #1DB954 and height 2px and margin 1.5rem auto, ' +
                    'then a short overview paragraph in #b3b3b3, ' +
                    'then ' + tc + ' key points as styled cards — each card gets background rgba(255,255,255,0.03), border 1px solid rgba(255,255,255,0.1), border-radius 12px, padding 1rem 1.25rem. ' +
                    'Each card has a small green dot (color #1DB954) before the title, title in #ffffff font-weight 600, description in #b3b3b3. ' +
                    'Add subtle box-shadow: 0 2px 8px rgba(0,0,0,0.3). ' +
                    'Keep total output compact — what fits on a single presentation slide. ' +
                    'Use clean semantic HTML: div, h1, h3, p, span, strong, em. ' +
                    'Return ONLY the inner HTML (no doctype, no head, no body tags). All styles must be inline.';

                callClaudeAPI({
                    prompt: pt,
                    maxTokens: 2500,
                    loadingMsg: 'Generating presentation for ' + cn + '...',
                    loadingSub: 'Claude is building your slides',
                    tag: 'CreatePres'
                })
                .then(function(ph) {
                    hideApiLoading(true, 'Presentation ready for ' + cn);

                    // Save to array (P1-P8 gallery format)
                    var presArr = cpReadPresArray(cn);
                    if (presArr.length >= 8) {
                        if (typeof showWingToast === 'function') showWingToast('Presentation slots full for ' + cn, 'presentation');
                    } else {
                        var slotNum = presArr.length + 1;
                        var now = new Date();
                        var tsStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                        presArr.push({
                            title: cn + ' - P' + slotNum,
                            html: ph,
                            timestamp: tsStr
                        });
                        cpSavePresArray(cn, presArr);
                    }

                    var oa = document.getElementById('qgPresOutput');
                    var ca = document.getElementById('qgPresContent');
                    if (ca) ca.innerHTML = ph;
                    if (oa) { oa.classList.add('visible'); oa.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }

                    var slots = document.getElementById('cjPunchSlots');
                    if (slots && !slots.querySelector('[data-punch-key="ai-presentation"]')) {
                        var chip = document.createElement('div');
                        chip.className = 'cj-punch-slot';
                        chip.setAttribute('data-punch-key', 'ai-presentation');
                        chip.innerHTML = '<span class="punch-check" style="color:#6366f1">&#9889;</span> View Presentation';
                        chip.style.cssText = 'cursor:pointer;border-color:rgba(99,102,241,0.3);color:#c7d2fe;background:rgba(99,102,241,0.08)';
                        chip.addEventListener('click', function() {
                            var o = document.getElementById('qgPresOutput');
                            if (o) { o.classList.toggle('visible'); if (o.classList.contains('visible')) o.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
                        });
                        slots.appendChild(chip);
                        setTimeout(function() { chip.classList.add('glowing'); }, 400);
                    }

                    if (typeof punchComplete === 'function') punchComplete('presentation');
                    if (typeof addJawResult === 'function') addJawResult('AI Presentation done');

                    /* Save presentation to disk via save server */
                    var presFullHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Presentation - ' + cn + '</title>' +
                        '<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:system-ui,sans-serif;padding:3rem 2rem;background:#000;color:#fff;min-height:100vh;}.pres-wrap{max-width:900px;margin:0 auto;background:linear-gradient(135deg,#282828,#181818);border:1px solid rgba(255,255,255,0.07);border-radius:32px;padding:4rem 3.5rem;}</style></head>' +
                        '<body><div class="pres-wrap">' + ph + '</div></body></html>';
                    if (typeof saveResultToFile === 'function') saveResultToFile('presentation', cn, presFullHtml, 'Presentation');

                    cpUpdatePresState(cn);
                    if (jcLbl) jcLbl.textContent = 'Presentation';
                    cpQgBtn.style.opacity = '1';
                    cpQgBtn.style.pointerEvents = '';
                    cpQgBtn.style.transition = 'box-shadow 0.3s ease';
                    cpQgBtn.style.boxShadow = '0 0 20px rgba(16,185,129,0.6), 0 0 40px rgba(16,185,129,0.3)';
                    setTimeout(function() { cpQgBtn.style.boxShadow = ''; }, 1500);
                    if (cpPromptPanel) cpPromptPanel.classList.remove('visible');
                    _cpSelectedClient = '';
                    if (typeof punchReport === 'function') punchReport({ action: 'F Client, Generate Presentation', client: cn, color: '#6366f1', type: 'api-presentation', data: { clientName: cn, tileCount: tc, focus: foc } });
                    console.log('[CreatePres] Presentation saved & displayed for:', cn);
                })
                .catch(function(err) {
                    console.error('[CreatePres] Error:', err);
                    if (jcLbl) jcLbl.textContent = 'Presentation';
                    cpQgBtn.style.opacity = '1';
                    cpQgBtn.style.pointerEvents = '';
                    _cpSelectedClient = '';
                    var msg = err.message || 'Unknown error';
                    if (msg.indexOf('invalid x-api-key') !== -1 || msg.indexOf('authentication') !== -1) {
                        msg = 'Invalid API key. Set it in localStorage or reload.';
                        setApiKey('');
                    }
                    hideApiLoading(false, 'Presentation Error: ' + msg);
                });
            }

            /* ── Part 1: Regular click (instant) → auto-suggest client, then show prompt panel ── */
            cpCallBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                cpCallBtn.classList.add('vibrating');
                setTimeout(function() { cpCallBtn.classList.remove('vibrating'); }, 300);

                showClientAutoSuggest(cpCallBtn, function(clientObj) {
                    var cName = clientObj.name || clientObj;
                    _cpSelectedClient = cName;

                    /* Show the inline prompt for tile count + focus */
                    if (cpPromptPanel) {
                        cpPromptPanel.classList.add('visible');
                        if (cpFocusInput) cpFocusInput.focus();
                    }
                });
            });

            if (cpSubmitBtn) {
                cpSubmitBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var cName = cpGetClientName();
                    if (!cName) { cName = prompt('Enter client name for presentation:'); if (!cName || !cName.trim()) return; cName = cName.trim(); }
                    cpGenerate(cName, cpTileInput ? parseInt(cpTileInput.value, 10) || 4 : 4, cpFocusInput ? cpFocusInput.value.trim() : '');
                });
            }

            /* ── Part 2: Lightning click (guided) → toast guidance, then auto-suggest, then prompt ── */
            cpQgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                if (typeof showWingToast === 'function') showWingToast('Search for a client to generate a presentation', 'find');

                showClientAutoSuggest(cpQgBtn, function(clientObj) {
                    var cName = clientObj.name || clientObj;
                    _cpSelectedClient = cName;

                    if (cpPromptPanel) {
                        cpPromptPanel.classList.add('visible');
                        if (cpFocusInput) cpFocusInput.focus();
                    }
                });
            });

            var cpInit = cpGetClientName();
            if (cpInit) {
                cpUpdatePresState(cpInit);
            } else {
                cpRenderGallery(null); // show "Select a client" message
            }

            var _origLoadPres = window.loadClientToJourneyCard;
            if (typeof _origLoadPres === 'function') {
                window.loadClientToJourneyCard = function(name) {
                    _origLoadPres(name);
                    setTimeout(function() { cpUpdatePresState(name); }, 100);
                };
            }

            console.log('[CreatePres] Call Card F Client, Generate Presentation + Auto Go wired');
        })();


(function initCallCardMarkComplete() {
            /* SWAPPED: regular click = instant, lightning = guided */
            var callBtn = document.getElementById('callMarkCompleteAG');
            var qgBtn = document.getElementById('callMarkComplete');
            if (!callBtn || !qgBtn) return;

            /* ── Helper: open campaigns filtered to a client ── */
            function openCampaignsForClient(clientName) {
                if (typeof openCampaigns === 'function') openCampaigns();

                /* Set filter to this client */
                var filterLabel = document.getElementById('campaignsFilterLabel');
                if (filterLabel) filterLabel.textContent = clientName;

                /* Re-render with filter */
                if (typeof window._campaignsRender === 'function') window._campaignsRender();

                /* Auto-expand tracking columns if hidden */
                var trackToggle = document.getElementById('campTrackingToggle');
                var table = document.getElementById('campaignsTable');
                if (table && table.classList.contains('tracking-cols-hidden') && trackToggle) {
                    trackToggle.click();
                }

                /* Flash/highlight matching rows */
                setTimeout(function() {
                    var tbody = document.getElementById('campaignsTableBody');
                    if (!tbody) return;
                    var rows = tbody.querySelectorAll('tr');
                    var nameLC = clientName.toLowerCase().trim();
                    rows.forEach(function(row) {
                        var firstCell = row.querySelector('td');
                        if (firstCell && firstCell.textContent.toLowerCase().trim() === nameLC) {
                            row.style.transition = 'background 0.3s ease';
                            row.style.background = 'rgba(239, 68, 68, 0.2)';
                            setTimeout(function() { row.style.background = ''; }, 2000);
                        }
                    });
                }, 400);
            }

            /* ── Part 1: Regular click (instant) → auto-suggest then open campaigns for that client ── */
            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);

                showClientAutoSuggest(callBtn, function(clientObj) {
                    var clientName = clientObj.name || clientObj;
                    openCampaignsForClient(clientName);

                    if (typeof showWingToast === 'function') showWingToast('Showing campaigns for ' + clientName + ' — select which to mark complete', 'campaigns');
                    if (typeof punchReport === 'function') punchReport({ action: 'F Client, Mark Complete', client: clientName, color: '#ef4444', type: 'instant-mark-complete', data: { clientName: clientName } });
                    console.log('[MarkComplete] Campaigns opened for client:', clientName);
                });
            });

            /* ── Part 2: Lightning click (guided) → same with toast guidance ── */
            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                if (typeof showWingToast === 'function') showWingToast('Search for a client to mark campaigns complete', 'find');

                showClientAutoSuggest(qgBtn, function(clientObj) {
                    var clientName = clientObj.name || clientObj;
                    openCampaignsForClient(clientName);

                    if (typeof showWingToast === 'function') showWingToast('Campaigns for ' + clientName + ' — mark complete as needed', 'campaigns');
                    if (typeof punchReport === 'function') punchReport({ action: 'F Client, Mark Complete', client: clientName, color: '#ef4444', type: 'instant-mark-complete', data: { clientName: clientName } });
                    console.log('[MarkComplete-Guided] Campaigns opened for client:', clientName);
                });
            });

            console.log('[MarkComplete-CC] Call Card F Client, Mark Complete + Auto Go wired');
        })();


        /* ══════════════════════════════════════════════
           Presentation Sub-Panel — Save button handler
           Wires the inline Save in cjPresPanel
           ══════════════════════════════════════════════ */

        (function initPresSaveBtn() {
            var saveBtn = document.getElementById('cjPresSaveBtn');
            var pathInput = document.getElementById('cjPresPathInput');
            var statusEl = document.getElementById('cjPresStatus');
            var linkedEl = document.getElementById('cjPresLinkedPath');
            if (!saveBtn || !pathInput) return;

            saveBtn.addEventListener('click', function() {
                var clientName = activeClient ? activeClient.name : null;
                if (!clientName) {
                    if (statusEl) { statusEl.textContent = 'Load a client first'; statusEl.style.color = '#ef4444'; }
                    return;
                }
                var path = pathInput.value.trim();
                if (!path) {
                    if (statusEl) { statusEl.textContent = 'Enter a file path'; statusEl.style.color = '#ef4444'; }
                    return;
                }

                // Save to localStorage
                localStorage.setItem('wingdash_presentations_' + clientName, path);

                // Update status
                if (statusEl) { statusEl.textContent = 'Linked for ' + clientName; statusEl.style.color = '#059669'; }
                if (linkedEl) {
                    linkedEl.style.display = 'block';
                    linkedEl.innerHTML = '<a href="http://localhost:3000/' + path + '" target="_blank" style="color:#b45309;text-decoration:underline;">Open: ' + path + '</a>';
                }

                // Green flash confirmation on save button
                saveBtn.style.background = 'rgba(16,185,129,0.3)';
                saveBtn.style.borderColor = '#10b981';
                saveBtn.style.color = '#059669';
                saveBtn.textContent = 'Saved!';
                setTimeout(function() {
                    saveBtn.style.background = 'rgba(245,158,11,0.08)';
                    saveBtn.style.borderColor = '#f59e0b';
                    saveBtn.style.color = '#b45309';
                    saveBtn.textContent = 'Save';
                }, 1500);

                // Also green flash on the Presentation action button
                var presBtn = document.getElementById('cjBtnPresentation');
                if (presBtn) {
                    presBtn.style.transition = 'box-shadow 0.3s ease';
                    presBtn.style.boxShadow = '0 0 20px rgba(16,185,129,0.5)';
                    setTimeout(function() { presBtn.style.boxShadow = ''; }, 1200);
                }

                if (typeof punchReport === 'function') punchReport({ action: 'Add Presentation', client: clientName, color: '#f59e0b', type: 'instant-add-presentation', data: { clientName: clientName, filePath: path } });
                console.log('[Pres] Saved presentation path for ' + clientName + ': ' + path);
            });

            console.log('[Pres] Sub-panel save button wired');
        })();


        /* ══════════════════════════════════════════════
           Call Card — Add Presentation + Auto Go
           Wired to call grid button + ⚡ mini button
           ══════════════════════════════════════════════ */

        (function initCallCardAddPresentation() {
            /* SWAPPED: regular click = instant, lightning = guided */
            var callBtn = document.getElementById('callAddPresentationAG');
            var qgBtn = document.getElementById('callAddPresentation');
            if (!callBtn || !qgBtn) return;

            /* ── Helper: save presentation path and flash green ── */
            function savePresentationPath(clientName, filePath) {
                localStorage.setItem('wingdash_presentations_' + clientName, filePath);

                // Green flash confirmation
                if (typeof showWingToast === 'function') {
                    showWingToast('Presentation linked \u2014 ' + clientName, 'presentation');
                }

                // Update Presentation button on Journey Card if panel is open
                var presBtn = document.getElementById('cjBtnPresentation');
                if (presBtn) {
                    presBtn.style.transition = 'box-shadow 0.3s ease';
                    presBtn.style.boxShadow = '0 0 20px rgba(16,185,129,0.5)';
                    setTimeout(function() { presBtn.style.boxShadow = ''; }, 1200);
                }

                // Update sub-panel if open
                var statusEl = document.getElementById('cjPresStatus');
                var pathInputEl = document.getElementById('cjPresPathInput');
                var linkedEl = document.getElementById('cjPresLinkedPath');
                if (statusEl) { statusEl.textContent = 'Linked for ' + clientName; statusEl.style.color = '#059669'; }
                if (pathInputEl) pathInputEl.value = filePath;
                if (linkedEl) {
                    linkedEl.style.display = 'block';
                    linkedEl.innerHTML = '<a href="http://localhost:3000/' + filePath + '" target="_blank" style="color:#b45309;text-decoration:underline;">Open: ' + filePath + '</a>';
                }

                if (typeof punchReport === 'function') punchReport({ action: 'Add Presentation', client: clientName, color: '#f59e0b', type: 'instant-add-presentation', data: { clientName: clientName, filePath: filePath } });
                console.log('[Pres-CC] Saved presentation for ' + clientName + ': ' + filePath);
            }

            /* ── Helper: show inline input for file path ── */
            function showPresInlineInput(clientName) {
                // Open Journey Card presentation panel
                var presPanel = document.getElementById('cjPresPanel');
                if (presPanel && !presPanel.classList.contains('open')) {
                    presPanel.classList.add('open');
                }
                // Focus the path input
                var pathInputEl = document.getElementById('cjPresPathInput');
                if (pathInputEl) {
                    pathInputEl.focus();
                    pathInputEl.placeholder = 'Enter path for ' + (clientName || 'client') + '...';
                }
                // Open journey card if not open
                var journeyBtn = document.getElementById('journeyCardBtn');
                var journeyPanel = document.getElementById('journeyCardPanel');
                if (journeyPanel && journeyPanel.style.display !== 'flex' && journeyPanel.style.display !== 'block') {
                    if (journeyBtn) journeyBtn.click();
                }
            }

            /* ── Part 1: Call Card "Add Presentation" button ── */
            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);

                var clientName = activeClient ? activeClient.name : null;
                if (!clientName) {
                    if (typeof showWingToast === 'function') {
                        showWingToast('Load a client first', 'presentation');
                    }
                    return;
                }

                // Show the inline input in the presentation sub-panel
                showPresInlineInput(clientName);
            });

            /* ── Part 2: ⚡ Auto Go button ── */
            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                var cmdInput = document.getElementById('cmdInput');
                var inputText = cmdInput ? cmdInput.value.trim() : '';

                // Parse input: could be "ClientName path/to/file.html" or just "path/to/file.html"
                var clientName = activeClient ? activeClient.name : null;
                var filePath = '';

                if (inputText) {
                    // Check if input contains both client name and path
                    // Format: "ClientName path/to/file.html" — split on first space that precedes a path-like string
                    var parts = inputText.match(/^(.+?)\s+(\S+\.html?)$/i);
                    if (parts) {
                        // Two parts found — first is client name, second is file path
                        clientName = parts[1].trim();
                        filePath = parts[2].trim();
                    } else if (inputText.match(/\.(html?)$/i)) {
                        // Input looks like just a file path
                        filePath = inputText;
                    } else {
                        // Input might be just a client name
                        clientName = inputText;
                    }
                }

                if (clientName && filePath) {
                    // We have both — instant save
                    savePresentationPath(clientName, filePath);

                    // Clear the command input
                    if (cmdInput) cmdInput.value = '';

                    // Green flash on the AG button
                    qgBtn.style.background = 'linear-gradient(145deg, #059669, #047857)';
                    qgBtn.style.borderColor = '#10b981';
                    setTimeout(function() {
                        qgBtn.style.background = '';
                        qgBtn.style.borderColor = '';
                    }, 1000);
                } else if (clientName && !filePath) {
                    // Have client but no path — fall back to inline input
                    showPresInlineInput(clientName);
                } else {
                    // No info at all
                    if (typeof showWingToast === 'function') {
                        showWingToast('Enter client name or file path in command input', 'presentation');
                    }
                }
            });

            console.log('[Pres-CC] Call Card Add Presentation + Auto Go wired');
        })();


        /* Button 6 (F Client, Add Order) removed — handler deleted */


        /* ══════════════════════════════════════════════
           Call Card — Create Proposal
           SWAPPED: regular click = instant pipeline entry,
           lightning = prompt for client name then pipeline
        ══════════════════════════════════════════════ */

        (function initCallCardCreateProposal() {
            /* SWAPPED: regular click = instant, lightning = guided */
            var callBtn = document.getElementById('callCreateProposalAG');
            var qgBtn = document.getElementById('callCreateProposal');
            if (!callBtn || !qgBtn) return;

            function getProposalClientName() {
                if (typeof activeClient !== 'undefined' && activeClient && activeClient.name) return activeClient.name;
                var plEl = document.getElementById('placeClientName');
                if (plEl && plEl.textContent && plEl.textContent !== 'No client selected') return plEl.textContent;
                return '';
            }

            /* Part 1: Lightning button (was regular) — guided: prompt for client name */
            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);

                var clientName = getProposalClientName();
                if (!clientName) {
                    clientName = prompt('Enter client name for proposal:');
                    if (!clientName || !clientName.trim()) return;
                    clientName = clientName.trim();
                }

                if (typeof punchReport === 'function') punchReport({ action: 'Create Proposal', client: clientName, color: '#0ea5e9', type: 'api-proposal', data: { clientName: clientName } });
                if (typeof showWingToast === 'function') showWingToast('Proposal queued — ' + clientName, 'proposal');
            });

            /* Part 2: Regular button (was lightning) — instant: auto-detect client, fire pipeline */
            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                var clientName = getProposalClientName();
                if (!clientName) {
                    var cmdInput = document.getElementById('cmdInput');
                    clientName = cmdInput ? cmdInput.value.trim() : '';
                }
                if (!clientName) {
                    if (typeof showWingToast === 'function') showWingToast('No active client — select one first', 'proposal');
                    return;
                }

                /* Instant pipeline entry */
                if (typeof punchReport === 'function') punchReport({ action: 'Create Proposal', client: clientName, color: '#0ea5e9', type: 'api-proposal', data: { clientName: clientName } });

                /* Green flash on button */
                qgBtn.style.background = 'linear-gradient(145deg, #0284c7, #0369a1)';
                qgBtn.style.borderColor = '#0ea5e9';
                setTimeout(function() { qgBtn.style.background = ''; qgBtn.style.borderColor = ''; }, 1000);

                if (typeof showWingToast === 'function') showWingToast('Proposal queued — ' + clientName, 'proposal');
            });

            console.log('[Proposal-CC] Call Card Create Proposal wired (swapped)');
        })();


        /* ══════════════════════════════════════════════
           Call Card — Create Payment Card + Auto Go
           Generates a payment card HTML from chad14 design
        ══════════════════════════════════════════════ */

        (function initCallCardPayment() {
            /* Both main + lightning click open chip palette first, then pre-fill the payment form */
            var callBtn = document.getElementById('callCreatePaymentCardAG');
            var qgBtn = document.getElementById('callCreatePaymentCard');
            var promptEl = document.getElementById('createPaymentPrompt');
            var titleInput = document.getElementById('paymentCardTitle');
            var clientNameInput = document.getElementById('paymentClientName');
            var svcNameInput = document.getElementById('paymentSvcName');
            var svcPriceInput = document.getElementById('paymentSvcPrice');
            var addSvcBtn = document.getElementById('paymentAddSvcBtn');
            var svcListEl = document.getElementById('paymentSvcList');
            var totalAmountEl = document.getElementById('paymentTotalAmount');
            var methodSelect = document.getElementById('paymentMethodSelect');
            var dueDateInput = document.getElementById('paymentDueDate');
            var notesInput = document.getElementById('paymentNotes');
            var submitBtn = document.getElementById('paymentPromptSubmit');
            var sendToPayPalBtn = document.getElementById('paymentSendToPayPal');
            var ptypeInvoiceBtn = document.getElementById('ptypeInvoice');
            var ptypeSubscriptionBtn = document.getElementById('ptypeSubscription');
            var billingCycleWrap = document.getElementById('billingCycleWrap');
            var billingCycleSelect = document.getElementById('paymentBillingCycle');
            var currentPaymentType = 'invoice'; /* 'invoice' or 'subscription' */
            if (!callBtn || !qgBtn) return;

            /* ── Payment Type Toggle Logic ── */
            function setPaymentType(ptype) {
                currentPaymentType = ptype;
                if (ptypeInvoiceBtn) ptypeInvoiceBtn.classList.toggle('ptype-active', ptype === 'invoice');
                if (ptypeSubscriptionBtn) ptypeSubscriptionBtn.classList.toggle('ptype-active', ptype === 'subscription');
                if (billingCycleWrap) billingCycleWrap.style.display = ptype === 'subscription' ? 'flex' : 'none';
            }
            if (ptypeInvoiceBtn) ptypeInvoiceBtn.addEventListener('click', function(e) { e.stopPropagation(); setPaymentType('invoice'); });
            if (ptypeSubscriptionBtn) ptypeSubscriptionBtn.addEventListener('click', function(e) { e.stopPropagation(); setPaymentType('subscription'); });

            /* ── Send to PayPal Logic ── */
            if (sendToPayPalBtn) {
                sendToPayPalBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var clientName = clientNameInput ? clientNameInput.value.trim() : '';
                    if (!clientName) { showWingToast('Enter a client name first', 'payment'); return; }

                    var total = formServices.reduce(function(sum, s) { return sum + s.price; }, 0);
                    var cardTitle = titleInput ? titleInput.value.trim() : clientName + ' Payment';
                    var notes = notesInput ? notesInput.value.trim() : '';
                    var firstServiceName = formServices.length > 0 ? formServices[0].name : cardTitle;

                    var passoffData;
                    if (currentPaymentType === 'invoice') {
                        /* Invoice mode — extension expects: CUSTOMER NAME, ITEM NAME, PRICE PER UNIT, DESCRIPTION */
                        var itemName = formServices.length > 0
                            ? formServices.map(function(s) { return s.name; }).join(', ')
                            : cardTitle;
                        var description = itemName + ' for ' + clientName + ' — Ahead Artist Solutions';
                        if (notes) description += '. ' + notes;
                        passoffData = {
                            mode: 'invoice',
                            fields: [
                                { label: 'CUSTOMER NAME', value: clientName },
                                { label: 'ITEM NAME', value: itemName },
                                { label: 'PRICE PER UNIT', value: '$' + total.toFixed(2) },
                                { label: 'DESCRIPTION', value: description }
                            ]
                        };
                    } else {
                        /* Subscription mode — extension expects: PLAN NAME, DESCRIPTION, BILLING CYCLE, PRICE */
                        var planName = firstServiceName + ' — ' + clientName;
                        var desc = firstServiceName + ' services for ' + clientName + ' provided by Ahead Artist Solutions';
                        if (notes) desc += '. ' + notes;
                        var cycle = billingCycleSelect ? billingCycleSelect.value : 'Monthly';
                        passoffData = {
                            mode: 'subscription',
                            fields: [
                                { label: 'PLAN NAME', value: planName },
                                { label: 'DESCRIPTION', value: desc },
                                { label: 'BILLING CYCLE', value: cycle },
                                { label: 'PRICE', value: '$' + total.toFixed(2) + ' USD' }
                            ]
                        };
                    }

                    /* Write to localStorage for Chrome extension */
                    localStorage.setItem('passoff_billing_data', JSON.stringify(passoffData));

                    /* Also store in per-client PayPal links tracker */
                    var clientKey = 'wingdash_payment_links_' + clientName.replace(/\s+/g, '_').toLowerCase();
                    var paypalLinks = [];
                    try { paypalLinks = JSON.parse(localStorage.getItem(clientKey)) || []; } catch(ex) { paypalLinks = []; }
                    paypalLinks.push({
                        type: currentPaymentType,
                        data: passoffData,
                        sentAt: new Date().toISOString(),
                        status: 'pending',
                        paypalUrl: null
                    });
                    localStorage.setItem(clientKey, JSON.stringify(paypalLinks));

                    /* Also try to notify the bridge server (fire and forget) */
                    try {
                        fetch('http://localhost:3002/bridge', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ client: clientName, paymentType: currentPaymentType, data: passoffData })
                        }).catch(function() { /* bridge server not running — that's fine, localStorage is primary */ });
                    } catch(ex) { /* ignore */ }

                    /* Open PayPal in new tab */
                    var targetUrl = currentPaymentType === 'invoice'
                        ? 'https://www.paypal.com/invoice/create'
                        : 'https://www.paypal.com/billing/plans';
                    window.open(targetUrl, '_blank');

                    /* Toast */
                    showWingToast('Data loaded \u2192 PayPal tab opened. Extension will guide you!', 'payment');

                    /* Punch report */
                    if (typeof punchReport === 'function') punchReport({
                        action: 'Send to PayPal',
                        client: clientName,
                        color: '#0070ba',
                        type: 'paypal-' + currentPaymentType,
                        data: { clientName: clientName, paymentType: currentPaymentType, total: total }
                    });
                });
            }

            /* ── PayPal completion polling — checks for completed payments ── */
            (function pollPayPalComplete() {
                setInterval(function() {
                    /* Check bridge server for completed payments */
                    try {
                        fetch('http://localhost:3002/status', { method: 'GET' })
                            .then(function(r) { return r.json(); })
                            .then(function(data) {
                                if (data && data.completed && data.completed.length > 0) {
                                    data.completed.forEach(function(item) {
                                        if (!item.client || !item.paypalUrl) return;
                                        var clientKey = 'wingdash_payment_links_' + item.client.replace(/\s+/g, '_').toLowerCase();
                                        var paypalLinks = [];
                                        try { paypalLinks = JSON.parse(localStorage.getItem(clientKey)) || []; } catch(ex) { paypalLinks = []; }
                                        /* Find the pending entry and update it */
                                        for (var i = paypalLinks.length - 1; i >= 0; i--) {
                                            if (paypalLinks[i].status === 'pending') {
                                                paypalLinks[i].status = 'complete';
                                                paypalLinks[i].paypalUrl = item.paypalUrl;
                                                paypalLinks[i].completedAt = item.completedAt || new Date().toISOString();
                                                break;
                                            }
                                        }
                                        localStorage.setItem(clientKey, JSON.stringify(paypalLinks));
                                        showWingToast('PayPal payment confirmed for ' + item.client + '!', 'payment');
                                    });
                                }
                            })
                            .catch(function() { /* bridge not running */ });
                    } catch(ex) { /* ignore */ }

                    /* Also check localStorage directly — extension might write back */
                    try {
                        var passoffResult = localStorage.getItem('passoff_billing_result');
                        if (passoffResult) {
                            var result = JSON.parse(passoffResult);
                            if (result && result.client && result.paypalUrl) {
                                var clientKey = 'wingdash_payment_links_' + result.client.replace(/\s+/g, '_').toLowerCase();
                                var paypalLinks = [];
                                try { paypalLinks = JSON.parse(localStorage.getItem(clientKey)) || []; } catch(ex) { paypalLinks = []; }
                                for (var i = paypalLinks.length - 1; i >= 0; i--) {
                                    if (paypalLinks[i].status === 'pending') {
                                        paypalLinks[i].status = 'complete';
                                        paypalLinks[i].paypalUrl = result.paypalUrl;
                                        paypalLinks[i].completedAt = new Date().toISOString();
                                        break;
                                    }
                                }
                                localStorage.setItem(clientKey, JSON.stringify(paypalLinks));
                                localStorage.removeItem('passoff_billing_result');
                                showWingToast('PayPal link saved for ' + result.client + '!', 'payment');
                            }
                        }
                    } catch(ex) { /* ignore */ }
                }, 5000); /* Poll every 5 seconds */
            })();

            /* ── Form service list state ── */
            var formServices = [];

            function renderFormServices() {
                if (!svcListEl) return;
                if (formServices.length === 0) {
                    svcListEl.innerHTML = '<div style="color:rgba(255,255,255,0.25);font-size:0.55rem;text-align:center;padding:8px 0;">No services added yet</div>';
                } else {
                    svcListEl.innerHTML = '';
                    formServices.forEach(function(s, i) {
                        var row = document.createElement('div');
                        row.className = 'create-payment-svc-row';
                        row.innerHTML = '<span class="create-payment-svc-name">' + s.name + '</span>' +
                            '<span class="create-payment-svc-price">$' + s.price.toLocaleString('en-US', {minimumFractionDigits:2}) + '</span>' +
                            '<span class="create-payment-svc-del" data-idx="' + i + '">\u2715</span>';
                        row.querySelector('.create-payment-svc-del').addEventListener('click', function() {
                            formServices.splice(i, 1);
                            renderFormServices();
                        });
                        svcListEl.appendChild(row);
                    });
                }
                /* Update total */
                var total = formServices.reduce(function(sum, s) { return sum + s.price; }, 0);
                if (totalAmountEl) totalAmountEl.textContent = '$' + total.toLocaleString('en-US', {minimumFractionDigits:2});
            }

            /* Add service button */
            if (addSvcBtn) {
                addSvcBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var name = svcNameInput ? svcNameInput.value.trim() : '';
                    var priceStr = svcPriceInput ? svcPriceInput.value.trim().replace(/[$,]/g, '') : '0';
                    var price = parseFloat(priceStr) || 0;
                    if (!name) return;
                    formServices.push({ name: name, price: price, details: '$' + price.toFixed(2) });
                    renderFormServices();
                    if (svcNameInput) { svcNameInput.value = ''; svcNameInput.focus(); }
                    if (svcPriceInput) svcPriceInput.value = '';
                });
            }
            /* Enter key in service inputs */
            if (svcNameInput) svcNameInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); if (addSvcBtn) addSvcBtn.click(); } });
            if (svcPriceInput) svcPriceInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); if (addSvcBtn) addSvcBtn.click(); } });

            /* Pre-fill client name when form opens */
            function prefillClient() {
                var cn = (typeof activeClient !== 'undefined' && activeClient && activeClient.name) ? activeClient.name : '';
                if (clientNameInput) clientNameInput.value = cn;
                if (titleInput) titleInput.value = cn ? cn + ' Payment Card' : '';
                /* Pre-load services from campaigns */
                formServices = [];
                if (cn) {
                    var campSvcs = getClientServices(cn);
                    campSvcs.forEach(function(s) {
                        var price = 0;
                        var pm = (s.details || '').match(/\$?([\d,]+\.?\d*)/);
                        if (pm) price = parseFloat(pm[1].replace(/,/g, ''));
                        formServices.push({ name: s.name, price: price, details: s.details || '$' + price.toFixed(2) });
                    });
                }
                renderFormServices();
            }

            /* ── Helper: pull services from campaigns for a client ── */
            function getClientServices(clientName) {
                if (!clientName) return [];
                try {
                    var rows = JSON.parse(localStorage.getItem('wingdash_campaigns')) || [];
                    return rows.filter(function(r) {
                        return (r.clientName || '').toLowerCase().trim() === clientName.toLowerCase().trim();
                    }).map(function(r) {
                        return {
                            name: r.orderName || r.orderDetails || 'Service',
                            id: r.orderId || '',
                            payment: r.paymentStatus || '',
                            amount: r.paymentAmount || '',
                            details: r.orderDetails || ''
                        };
                    });
                } catch(e) { return []; }
            }

            /* ── Helper: generate payment card HTML ── */
            function generatePaymentCardHTML(clientName, cardTitle, services, opts) {
                opts = opts || {};
                var payMethod = opts.payMethod || '';
                var paymentType = opts.paymentType || 'invoice';
                var billingCycle = opts.billingCycle || '';
                var paypalUrl = opts.paypalUrl || '';

                var now = new Date();
                var dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                var timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                /* Build services rows */
                var servicesHTML = '';
                var totalAmount = 0;
                if (services.length > 0) {
                    services.forEach(function(s, i) {
                        var price = 0;
                        var priceMatch = (s.details || '').match(/\$?([\d,]+\.?\d*)/);
                        if (priceMatch) price = parseFloat(priceMatch[1].replace(/,/g, ''));
                        totalAmount += price;
                        servicesHTML += '<tr>' +
                            '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#b3b3b3;font-size:0.85rem;">' + (i + 1) + '</td>' +
                            '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:0.85rem;font-weight:500;">' + (s.name || 'Service') + '</td>' +
                            '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#b3b3b3;font-size:0.85rem;">' + (s.details || '\u2014') + '</td>' +
                            '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#1DB954;font-size:0.85rem;font-weight:600;text-align:right;">$' + (price > 0 ? price.toLocaleString('en-US', {minimumFractionDigits:2}) : '0.00') + '</td>' +
                            '</tr>';
                    });
                } else {
                    servicesHTML = '<tr><td colspan="4" style="padding:20px 16px;color:#727272;text-align:center;font-size:0.85rem;">No services added yet \u2014 add orders in Campaigns panel</td></tr>';
                }

                /* Payment type badge */
                var typeBadge = '<span style="display:inline-block;padding:3px 10px;border-radius:6px;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-left:8px;' +
                    (paymentType === 'subscription'
                        ? 'background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);color:#a5b4fc;">Subscription'
                        : 'background:rgba(14,165,233,0.15);border:1px solid rgba(14,165,233,0.3);color:#7dd3fc;">Invoice') +
                    '</span>';

                /* Billing cycle line for subscriptions */
                var billingLine = '';
                if (paymentType === 'subscription' && billingCycle) {
                    billingLine = '<div style="font-size:0.7rem;color:#a5b4fc;margin-top:4px;display:flex;align-items:center;gap:6px;">' +
                        '<span style="width:6px;height:6px;border-radius:50%;background:#6366f1;display:inline-block;"></span>' +
                        'Billing Cycle: ' + billingCycle +
                        '</div>';
                }

                /* Build payment methods grid — highlight selected */
                var methods = [
                    { name: 'Stripe', color: '#635bff' },
                    { name: 'PayPal', color: '#0070ba' },
                    { name: 'Venmo', color: '#008cff' },
                    { name: 'Cash App', color: '#00d632' }
                ];
                var methodsHTML = '';
                methods.forEach(function(m) {
                    var isSelected = payMethod && payMethod.toLowerCase() === m.name.toLowerCase();
                    var style = isSelected
                        ? 'background:rgba(' + (m.name === 'PayPal' ? '0,112,186' : m.name === 'Stripe' ? '99,91,255' : m.name === 'Venmo' ? '0,140,255' : '0,214,50') + ',0.15);border:1px solid ' + m.color + ';box-shadow:0 0 12px ' + m.color + '33;'
                        : 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);opacity:0.4;';
                    methodsHTML += '<div class="pay-method" style="' + style + '">' +
                        '<span class="pay-dot" style="background:' + m.color + '"></span>' +
                        '<span class="pay-name" style="' + (isSelected ? 'color:#fff;font-weight:600;' : '') + '">' + m.name + (isSelected ? ' &#10003;' : '') + '</span>' +
                        '</div>';
                });

                /* PayPal link button */
                var paypalBtnHTML = '';
                if (paypalUrl) {
                    paypalBtnHTML = '<div style="margin-bottom:1.5rem;text-align:center;">' +
                        '<a href="' + paypalUrl + '" target="_blank" style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;' +
                        'background:linear-gradient(145deg,#0070ba,#003087);border:1px solid rgba(0,112,186,0.4);border-radius:10px;' +
                        'color:#e0f0ff;font-size:0.85rem;font-weight:600;text-decoration:none;transition:all 0.2s ease;">' +
                        'Pay with PayPal &rarr;</a></div>';
                } else {
                    /* Check localStorage for a PayPal link */
                    paypalBtnHTML = '<div id="paypal-link-placeholder" style="margin-bottom:1.5rem;text-align:center;display:none;"></div>';
                }

                var html = '<!DOCTYPE html><html lang="en"><head>' +
                    '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">' +
                    '<title>' + (cardTitle || clientName + ' Payment Card') + '</title>' +
                    '<style>' +
                    '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");' +
                    '*{margin:0;padding:0;box-sizing:border-box}' +
                    'body{background:#000;font-family:"Inter",system-ui,-apple-system,sans-serif;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;' +
                    'background-image:radial-gradient(circle at 20% 20%,rgba(29,185,84,0.04) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(29,185,84,0.03) 0%,transparent 50%)}' +
                    '.card{max-width:640px;width:100%;background:linear-gradient(135deg,#181818 0%,#121212 100%);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;' +
                    'box-shadow:0 4px 12px rgba(0,0,0,0.3),0 16px 48px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.04)}' +
                    '.card-header{padding:2rem 2rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);position:relative}' +
                    '.card-header::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#1DB954,#1ed760,#1DB954);box-shadow:0 0 20px rgba(29,185,84,0.4)}' +
                    '.card-label{font-size:0.625rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#727272;margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem}' +
                    '.card-label::before{content:"";width:16px;height:2px;background:#1DB954;border-radius:1px}' +
                    '.card-client{font-size:1.75rem;font-weight:700;letter-spacing:-0.02em;background:linear-gradient(135deg,#fff 0%,#a1a1aa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}' +
                    '.card-date{font-size:0.75rem;color:#727272;margin-top:0.5rem}' +
                    '.card-body{padding:1.5rem 2rem}' +
                    '.services-table{width:100%;border-collapse:collapse;margin-bottom:1.5rem}' +
                    '.services-table th{padding:10px 16px;text-align:left;font-size:0.625rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#727272;border-bottom:1px solid rgba(255,255,255,0.1)}' +
                    '.services-table th:last-child{text-align:right}' +
                    '.total-row{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;background:rgba(29,185,84,0.08);border:1px solid rgba(29,185,84,0.2);border-radius:12px;margin-bottom:1.5rem}' +
                    '.total-label{font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#b3b3b3}' +
                    '.total-amount{font-size:1.5rem;font-weight:700;color:#1DB954;text-shadow:0 0 20px rgba(29,185,84,0.3)}' +
                    '.payment-methods{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1.5rem}' +
                    '.pay-method{padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:all 0.2s ease}' +
                    '.pay-method:hover{background:rgba(29,185,84,0.08);border-color:rgba(29,185,84,0.3)}' +
                    '.pay-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}' +
                    '.pay-name{font-size:0.8rem;font-weight:500;color:#b3b3b3}' +
                    '.card-footer{padding:1.25rem 2rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center}' +
                    '.brand{font-size:0.625rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#727272}' +
                    '.brand-accent{color:#1DB954}' +
                    '.card-id{font-size:0.6rem;color:#3f3f46;font-family:monospace}' +
                    '</style></head><body>' +
                    '<div class="card">' +
                    '<div class="card-header">' +
                    '<div class="card-label">Payment Card ' + typeBadge + '</div>' +
                    '<div class="card-client">' + (clientName || 'Client') + '</div>' +
                    '<div class="card-date">' + dateStr + ' \u00b7 ' + timeStr + '</div>' +
                    billingLine +
                    '</div>' +
                    '<div class="card-body">' +
                    '<table class="services-table">' +
                    '<thead><tr><th>#</th><th>Service</th><th>Details</th><th>Amount</th></tr></thead>' +
                    '<tbody>' + servicesHTML + '</tbody>' +
                    '</table>' +
                    '<div class="total-row">' +
                    '<span class="total-label">Total Due</span>' +
                    '<span class="total-amount">$' + totalAmount.toLocaleString('en-US', {minimumFractionDigits:2}) + '</span>' +
                    '</div>' +
                    paypalBtnHTML +
                    '<div class="payment-methods">' +
                    methodsHTML +
                    '</div>' +
                    '</div>' +
                    '<div class="card-footer">' +
                    '<span class="brand"><span class="brand-accent">Ahead</span> Artist Solutions</span>' +
                    '<span class="card-id">PC-' + Date.now() + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</body></html>';

                return html;
            }

            /* ── Helper: open card as blob URL + store in localStorage ── */
            function openPaymentCard(clientName, cardTitle) {
                console.log('[PaymentCard] openPaymentCard called for:', clientName);
                showApiLoading('Generating payment card for ' + (clientName || 'Client') + '...', 'Building card template');

                var services = getClientServices(clientName);
                /* Check for existing PayPal link */
                var ppUrl = '';
                try {
                    var ppLinks = JSON.parse(localStorage.getItem('wingdash_payment_links_' + (clientName || '').replace(/\s+/g, '_').toLowerCase())) || [];
                    for (var pi = ppLinks.length - 1; pi >= 0; pi--) { if (ppLinks[pi].paypalUrl) { ppUrl = ppLinks[pi].paypalUrl; break; } }
                } catch(ex) {}
                var html = generatePaymentCardHTML(clientName, cardTitle, services, { payMethod: 'PayPal', paymentType: 'invoice', paypalUrl: ppUrl });

                /* Store in localStorage */
                var storageKey = 'wingdash_payment_cards_' + (clientName || 'unknown').replace(/\s+/g, '_').toLowerCase();
                var saved = [];
                try { saved = JSON.parse(localStorage.getItem(storageKey)) || []; } catch(e) { saved = []; }
                saved.push({
                    title: cardTitle || clientName + ' Payment Card',
                    html: html,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem(storageKey, JSON.stringify(saved));

                /* Open as blob URL in new tab */
                var blob = new Blob([html], { type: 'text/html' });
                var url = URL.createObjectURL(blob);
                window.open(url, '_blank');

                /* Save payment card to disk via save server */
                if (typeof saveResultToFile === 'function') saveResultToFile('payment', clientName || '', html, cardTitle || ((clientName || '') + ' Payment Card'));

                /* Success state on loading banner */
                hideApiLoading(true, 'Payment Card ready for ' + (clientName || 'Client'));

                /* Green flash confirmation */
                showWingToast('Payment Card generated \u2014 ' + (clientName || 'Client'), 'payment');

                /* Punch report */
                if (typeof punchReport === 'function') punchReport({ action: 'Create Payment Card', client: clientName || '\u2014', color: '#1DB954', type: 'template-payment', data: { clientName: clientName, cardTitle: cardTitle } });

                console.log('[PaymentCard] Generated for:', clientName, 'Title:', cardTitle);
            }

            /* ── Helper: open chip palette then pre-fill payment form ── */
            function openPaymentChipPalette() {
                showChipPalette({
                    title: '7 · Payment Card',
                    onGo: function(chips) {
                        /* Pre-fill form from chip palette selections */
                        if (clientNameInput && chips.client) {
                            clientNameInput.value = chips.client.name || '';
                        }
                        if (titleInput && chips.client) {
                            titleInput.value = (chips.client.name || '') + ' Payment Card';
                        }
                        /* Pre-fill contacts into notes area */
                        if (notesInput) {
                            var parts = [];
                            if (chips.contacts && chips.contacts.length > 0) {
                                parts.push('Contacts: ' + chips.contacts.map(function(c) { return c.name; }).join(', '));
                            }
                            if (chips.volume) {
                                parts.push('Volume: ' + chips.volume);
                            }
                            notesInput.value = parts.join(' | ');
                        }
                        /* Pre-load services from campaigns for the selected client */
                        formServices = [];
                        if (chips.client && chips.client.name) {
                            var campSvcs = getClientServices(chips.client.name);
                            campSvcs.forEach(function(s) {
                                var price = 0;
                                var pm = (s.details || '').match(/\$?([\d,]+\.?\d*)/);
                                if (pm) price = parseFloat(pm[1].replace(/,/g, ''));
                                formServices.push({ name: s.name, price: price, details: s.details || '$' + price.toFixed(2) });
                            });
                        }
                        renderFormServices();
                        /* Show the payment form */
                        promptEl.classList.add('visible');
                        if (clientNameInput) { clientNameInput.focus(); clientNameInput.select(); }
                    }
                });
            }

            /* ── Part 1: Lightning (guided) — open chip palette first ── */
            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);

                /* If form already open, toggle it closed */
                if (promptEl.classList.contains('visible')) {
                    promptEl.classList.remove('visible');
                    return;
                }

                openPaymentChipPalette();
            });

            /* ── Submit button — uses expanded form data ── */
            if (submitBtn) {
                submitBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var clientName = clientNameInput ? clientNameInput.value.trim() : '';
                    if (!clientName) clientName = (typeof activeClient !== 'undefined' && activeClient && activeClient.name) ? activeClient.name : 'Client';
                    var cardTitle = titleInput ? titleInput.value.trim() : '';
                    if (!cardTitle) cardTitle = clientName + ' Payment Card';

                    /* Build services from form list (overrides campaign pull) */
                    var svcsForCard = formServices.length > 0 ? formServices.map(function(s) {
                        return { name: s.name, details: '$' + s.price.toFixed(2) };
                    }) : getClientServices(clientName);

                    var payMethod = methodSelect ? methodSelect.value : '';
                    var dueDate = dueDateInput ? dueDateInput.value : '';
                    var notes = notesInput ? notesInput.value.trim() : '';
                    var billingCycleVal = (currentPaymentType === 'subscription' && billingCycleSelect) ? billingCycleSelect.value : '';

                    /* Check for existing PayPal link for this client */
                    var ppUrl = '';
                    try {
                        var ppLinks = JSON.parse(localStorage.getItem('wingdash_payment_links_' + clientName.replace(/\s+/g, '_').toLowerCase())) || [];
                        for (var pi = ppLinks.length - 1; pi >= 0; pi--) { if (ppLinks[pi].paypalUrl) { ppUrl = ppLinks[pi].paypalUrl; break; } }
                    } catch(ex) {}

                    promptEl.classList.remove('visible');

                    /* Generate with form services + new opts */
                    var html = generatePaymentCardHTML(clientName, cardTitle, svcsForCard, {
                        payMethod: payMethod,
                        paymentType: currentPaymentType,
                        billingCycle: billingCycleVal,
                        paypalUrl: ppUrl
                    });

                    /* Inject due date + notes into HTML if provided */
                    if (dueDate || notes) {
                        var extraHtml = '';
                        if (dueDate) extraHtml += '<div style="padding:8px 16px;color:#b3b3b3;font-size:0.75rem;">Due: ' + new Date(dueDate + 'T00:00:00').toLocaleDateString("en-US", {year:"numeric",month:"long",day:"numeric"}) + '</div>';
                        if (notes) extraHtml += '<div style="padding:8px 16px;color:#727272;font-size:0.65rem;font-style:italic;border-top:1px solid rgba(255,255,255,0.04);margin-top:8px;">' + notes + '</div>';
                        html = html.replace('</div></div></body>', extraHtml + '</div></div></body>');
                    }

                    showApiLoading('Generating payment card for ' + clientName + '...', 'Building card template');

                    /* Store + open */
                    var storageKey = 'wingdash_payment_cards_' + clientName.replace(/\s+/g, '_').toLowerCase();
                    var saved = [];
                    try { saved = JSON.parse(localStorage.getItem(storageKey)) || []; } catch(ex) { saved = []; }
                    saved.push({ title: cardTitle, html: html, timestamp: new Date().toISOString() });
                    localStorage.setItem(storageKey, JSON.stringify(saved));

                    var blob = new Blob([html], { type: 'text/html' });
                    window.open(URL.createObjectURL(blob), '_blank');
                    hideApiLoading(true, 'Payment Card ready for ' + clientName);
                    showWingToast('Payment Card generated \u2014 ' + clientName, 'payment');

                    /* Save payment card to disk via save server */
                    if (typeof saveResultToFile === 'function') saveResultToFile('payment', clientName, html, cardTitle);

                    if (typeof punchReport === 'function') punchReport({ action: 'Create Payment Card', client: clientName, color: '#1DB954', type: 'template-payment', data: { clientName: clientName, cardTitle: cardTitle } });

                    /* Reset form */
                    formServices = [];
                    renderFormServices();
                });
            }

            /* ── Prevent clicks inside form from bubbling ── */
            if (promptEl) promptEl.addEventListener('click', function(e) { e.stopPropagation(); });

            /* ── Part 2: Main button click — open chip palette first ── */
            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                /* If form already open, toggle it closed */
                if (promptEl.classList.contains('visible')) {
                    promptEl.classList.remove('visible');
                    return;
                }

                openPaymentChipPalette();
            });

            console.log('[PaymentCard-CC] Call Card Create Payment Card + Auto Go wired');
        })();


        /* ══════════════════════════════════════════════
           Call Card — Create Home Base Web App
           Generates a standalone client Home Base HTML
        ══════════════════════════════════════════════ */

        (function initCallCardHomeBase() {
            /* HANDLER SWAP: lightning = instant, regular = guided */
            var callBtn = document.getElementById('callCreateHomeBaseAG');
            var qgBtn = document.getElementById('callCreateHomeBase');

            if (!callBtn || !qgBtn) { console.warn('[HomeBase-CC] Buttons not found'); return; }

            /* ── Home Base HTML Template Generator ── */
            function generateHomeBaseHTML(clientName) {
                var ts = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                var html = '<!DOCTYPE html>' +
                    '<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                    '<title>' + clientName + ' — Home Base | Ahead Artist Solutions</title>' +
                    '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">' +
                    '<style>' +
                    '*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }' +
                    'body { font-family: "Outfit", sans-serif; background: linear-gradient(160deg, #1a0a00 0%, #2d1408 35%, #3d1a0a 65%, #1a0a00 100%); color: #fde8c8; min-height: 100vh; }' +
                    '.hb-container { max-width: 1100px; margin: 0 auto; padding: 32px 24px; }' +
                    '.hb-header { background: linear-gradient(145deg, rgba(194, 86, 10, 0.3), rgba(224, 123, 46, 0.15)); border: 4px solid #fff; border-radius: 16px; padding: 28px 32px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(12px); }' +
                    '.hb-header-left h1 { font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 4px; }' +
                    '.hb-header-tag { display: inline-block; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10b981; padding: 3px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.03em; }' +
                    '.hb-header-brand { font-size: 0.75rem; font-weight: 600; color: rgba(253, 232, 200, 0.5); text-align: right; }' +
                    '.hb-header-brand .brand-accent { color: #f2a54a; font-weight: 800; }' +
                    '.hb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }' +
                    '@media (max-width: 768px) { .hb-grid { grid-template-columns: 1fr; } }' +
                    '.hb-column-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(253, 232, 200, 0.35); margin-bottom: 12px; }' +
                    '.hb-card { background: rgba(194, 86, 10, 0.08); border: 4px solid #fff; border-radius: 16px; padding: 20px; margin-bottom: 16px; backdrop-filter: blur(8px); transition: transform 0.2s ease, box-shadow 0.2s ease; }' +
                    '.hb-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(194, 86, 10, 0.15); }' +
                    '.hb-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }' +
                    '.hb-card-icon { font-size: 1.3rem; }' +
                    '.hb-card-title { font-size: 0.95rem; font-weight: 700; color: #fff; }' +
                    '.hb-card-body { font-size: 0.78rem; color: rgba(253, 232, 200, 0.55); line-height: 1.6; }' +
                    '.hb-card-placeholder { padding: 12px 0; border-top: 1px solid rgba(255, 255, 255, 0.06); margin-top: 8px; font-size: 0.7rem; color: rgba(253, 232, 200, 0.3); font-style: italic; }' +
                    '.hb-footer { margin-top: 40px; text-align: center; padding: 20px; border-top: 1px solid rgba(255, 255, 255, 0.06); }' +
                    '.hb-footer-brand { font-size: 0.7rem; color: rgba(253, 232, 200, 0.3); }' +
                    '.hb-footer-brand .brand-accent { color: #f2a54a; font-weight: 700; }' +
                    '.hb-footer-ts { font-size: 0.6rem; color: rgba(253, 232, 200, 0.2); margin-top: 4px; }' +
                    '</style></head><body>' +
                    '<div class="hb-container">' +
                    '<!-- Header Banner -->' +
                    '<div class="hb-header">' +
                    '<div class="hb-header-left">' +
                    '<h1>' + clientName + '</h1>' +
                    '<span class="hb-header-tag">Home Base</span>' +
                    '</div>' +
                    '<div class="hb-header-brand"><span class="brand-accent">Ahead</span> Artist Solutions</div>' +
                    '</div>' +
                    '<!-- Two Column Grid -->' +
                    '<div class="hb-grid">' +
                    '<!-- Left Column: Client Setup -->' +
                    '<div>' +
                    '<div class="hb-column-label">Client Setup</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128100;</span><span class="hb-card-title">Client Info</span></div>' +
                    '<div class="hb-card-body">Name: ' + clientName + '<div class="hb-card-placeholder">Contact details — add email, phone, social</div></div>' +
                    '</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128221;</span><span class="hb-card-title">Proposals</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">View proposals — create and track client proposals</div></div>' +
                    '</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128179;</span><span class="hb-card-title">Payment Links</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">Payment links — invoices, subscriptions, one-time</div></div>' +
                    '</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128197;</span><span class="hb-card-title">Yearly Plan</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">12-month roadmap — milestones and goals</div></div>' +
                    '</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128203;</span><span class="hb-card-title">3 Month Plan</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">90-day action plan — near-term priorities</div></div>' +
                    '</div>' +
                    '</div>' +
                    '<!-- Right Column: Actions -->' +
                    '<div>' +
                    '<div class="hb-column-label">Actions</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128226;</span><span class="hb-card-title">Current Campaigns</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">Active campaigns — track and manage running campaigns</div></div>' +
                    '</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128376;&#65039;</span><span class="hb-card-title">Client Network</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">Network map — connections, referrals, collaborators</div></div>' +
                    '</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128506;&#65039;</span><span class="hb-card-title">Marketing Journey</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">Journey map — awareness to retention pipeline</div></div>' +
                    '</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#127908;</span><span class="hb-card-title">Presentation</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">Presentations — pitch decks, slide shows, reports</div></div>' +
                    '</div>' +
                    '<div class="hb-card">' +
                    '<div class="hb-card-header"><span class="hb-card-icon">&#128172;</span><span class="hb-card-title">Communication</span></div>' +
                    '<div class="hb-card-body"><div class="hb-card-placeholder">Channels — email, text, calls, meeting notes</div></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<!-- Footer -->' +
                    '<div class="hb-footer">' +
                    '<div class="hb-footer-brand">Powered by <span class="brand-accent">Ahead</span> Artist Solutions</div>' +
                    '<div class="hb-footer-ts">Generated: ' + ts + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</body></html>';
                return html;
            }

            /* ── Core: generate, save, punch, toast ── */
            function createHomeBase(clientName) {
                showApiLoading('Creating Home Base for ' + clientName + '...', 'Building web app');

                var html = generateHomeBaseHTML(clientName);
                var storageKey = 'wingdash_homebase_' + clientName.replace(/\s+/g, '_').toLowerCase();

                /* Save to localStorage */
                localStorage.setItem(storageKey, JSON.stringify({
                    clientName: clientName,
                    html: html,
                    timestamp: new Date().toISOString()
                }));

                /* Try to save to server */
                if (typeof saveResultToFile === 'function') {
                    saveResultToFile('homebase', clientName, html, clientName + ' Home Base');
                }

                /* Open as blob in new tab */
                var blob = new Blob([html], { type: 'text/html' });
                window.open(URL.createObjectURL(blob), '_blank');

                hideApiLoading(true, 'Home Base ready for ' + clientName);

                /* Punch report */
                if (typeof punchReport === 'function') punchReport({ action: 'Create Home Base', client: clientName, color: '#10b981', type: 'template-homebase', data: { clientName: clientName, html: html } });

                /* Toast */
                showWingToast('Home Base created \u2014 ' + clientName, 'homebase');

                /* Update Journey Card Home Base button if open */
                updateJourneyCardHomeBaseBtn();

                console.log('[HomeBase] Created for:', clientName);
            }

            /* ── Part 1: Regular click (guided) — auto-suggest then generate ── */
            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                qgBtn.classList.add('vibrating');
                setTimeout(function() { qgBtn.classList.remove('vibrating'); }, 300);

                showClientAutoSuggest(qgBtn, function(clientObj) {
                    var clientName = clientObj.name || clientObj.id || '';
                    if (!clientName) { showWingToast('No client selected', 'homebase'); return; }
                    createHomeBase(clientName);
                });
            });

            /* ── Part 2: Lightning click (instant) — use active client ── */
            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);

                showClientAutoSuggest(callBtn, function(clientObj) {
                    var clientName = clientObj.name || clientObj.id || '';
                    if (!clientName) { showWingToast('No client selected', 'homebase'); return; }
                    createHomeBase(clientName);
                });
            });

            console.log('[HomeBase-CC] Call Card Create Home Base + Auto Go wired');
        })();


        /* ══════════════════════════════════════════════
           Journey Card — Home Base Button Handler
           Opens saved Home Base or shows flash message
        ══════════════════════════════════════════════ */

        /* Global: update the Journey Card Home Base button state */
        window.updateJourneyCardHomeBaseBtn = function() {
            var btn = document.getElementById('cjBtnHomeBase');
            if (!btn) return;

            var clientName = '';
            if (typeof activeClient !== 'undefined' && activeClient && activeClient.name) {
                clientName = activeClient.name;
            }
            if (!clientName) {
                btn.classList.remove('has-homebase');
                return;
            }

            var storageKey = 'wingdash_homebase_' + clientName.replace(/\s+/g, '_').toLowerCase();
            var saved = localStorage.getItem(storageKey);
            if (saved) {
                btn.classList.add('has-homebase');
            } else {
                btn.classList.remove('has-homebase');
            }
        };

        (function initJourneyCardHomeBase() {
            var btn = document.getElementById('cjBtnHomeBase');
            if (!btn) return;

            btn.addEventListener('click', function(e) {
                e.stopPropagation();

                var clientName = '';
                if (typeof activeClient !== 'undefined' && activeClient && activeClient.name) {
                    clientName = activeClient.name;
                }

                if (!clientName) {
                    showWingToast('No active client \u2014 select one first', 'homebase');
                    return;
                }

                var storageKey = 'wingdash_homebase_' + clientName.replace(/\s+/g, '_').toLowerCase();
                var saved = localStorage.getItem(storageKey);

                if (!saved) {
                    showWingToast('No Home Base yet \u2014 create one from Quick Actions', 'homebase');
                    /* Brief flash effect */
                    btn.style.transition = 'box-shadow 0.15s ease';
                    btn.style.boxShadow = '0 0 12px rgba(239, 68, 68, 0.5)';
                    setTimeout(function() { btn.style.boxShadow = ''; }, 600);
                    return;
                }

                try {
                    var data = JSON.parse(saved);
                    var blob = new Blob([data.html], { type: 'text/html' });
                    window.open(URL.createObjectURL(blob), '_blank');
                    showWingToast('Home Base opened \u2014 ' + clientName, 'homebase');
                } catch(ex) {
                    console.warn('[HomeBase] Error opening saved Home Base:', ex);
                    showWingToast('Error opening Home Base', 'homebase');
                }
            });

            /* Initial state check */
            updateJourneyCardHomeBaseBtn();

            console.log('[HomeBase-JC] Journey Card Home Base button wired');
        })();


        /* ══════════════════════════════════════════════
           Shared Chip Command Palette
           showChipPalette(config)
           config: { title, onGo(chips) }
           Returns { close() }
           chips passed to onGo: { client, timeline, contacts[], volume }
        ══════════════════════════════════════════════ */

        function showChipPalette(config) {
            /* Remove any existing palette */
            var existing = document.querySelector('.chip-palette-overlay');
            if (existing) existing.remove();

            var title = config.title || 'Quick Action';
            var onGo = config.onGo || function() {};

            /* ── State ── */
            var selectedClient = null;      /* { name, id, sub } */
            var selectedTimeline = null;    /* string e.g. "30 days" or "2026-01-01 – 2026-02-01" */
            var selectedContacts = [];      /* array of { name, sub } */
            var selectedVolume = '';        /* free-text string */

            /* ── Pull contacts dynamically from the Contacts pill section in left wing ── */
            /* Searches pillData.left for the section whose sectionName contains "contact"   */
            /* so it stays correct even if section order changes in the future.               */
            var contactOptions = [];
            try {
                if (typeof pillData !== 'undefined' && pillData.left &&
                    typeof sectionNames !== 'undefined' && sectionNames.left) {
                    /* Find the index of the section whose name contains "contact" (case-insensitive) */
                    var contactSectionIdx = -1;
                    sectionNames.left.forEach(function(name, idx) {
                        if (name.toLowerCase().indexOf('contact') !== -1) {
                            contactSectionIdx = idx;
                        }
                    });
                    var contactSection = contactSectionIdx !== -1 ? pillData.left[contactSectionIdx] : null;
                    if (contactSection) {
                        contactSection.forEach(function(p) {
                            /* Skip the "Add New Client" / arrow pills */
                            if (p.label && p.icon !== '⇒' && p.label !== 'Add New Client') {
                                contactOptions.push({ name: p.label, sub: p.sub || '' });
                            }
                        });
                    }
                }
            } catch(e) { /* safe */ }

            /* ── Pull clients ── */
            var clientOptions = [];
            if (window.ANC && typeof window.ANC.loadClients === 'function') {
                clientOptions = window.ANC.loadClients();
            }
            if (typeof pillData !== 'undefined' && pillData.left && pillData.left[0]) {
                var seenCl = {};
                clientOptions.forEach(function(c) { seenCl[(c.name||'').toLowerCase()] = true; });
                pillData.left[0].forEach(function(p) {
                    if (p.isClient && p.label && !seenCl[p.label.toLowerCase()]) {
                        clientOptions.push({ name: p.label, id: '', sub: p.sub || '' });
                        seenCl[p.label.toLowerCase()] = true;
                    }
                });
            }

            /* ── Timeline presets ── */
            var timelinePresets = [
                '7 days', '14 days', '30 days', '60 days', '90 days',
                'This month', 'This quarter', 'Custom...'
            ];

            /* ── Build DOM ── */
            var overlay = document.createElement('div');
            overlay.className = 'chip-palette-overlay';

            var palette = document.createElement('div');
            palette.className = 'chip-palette';

            /* Header */
            var header = document.createElement('div');
            header.className = 'cp-header';
            var titleEl = document.createElement('div');
            titleEl.className = 'cp-title';
            titleEl.textContent = title;
            var closeBtn = document.createElement('button');
            closeBtn.className = 'cp-close';
            closeBtn.innerHTML = '&#10005;';
            closeBtn.addEventListener('click', function() { closePalette(); });
            header.appendChild(titleEl);
            header.appendChild(closeBtn);
            palette.appendChild(header);

            /* Slots container */
            var slots = document.createElement('div');
            slots.className = 'cp-slots';
            palette.appendChild(slots);

            /* ─────────────────────────────────────
               SLOT 1: Client (required)
            ───────────────────────────────────── */
            var slotClient = buildSlot('Client', true);
            var clientInput = buildField('Search clients...');
            var clientDD = buildDropdown();
            var clientChipsRow = buildChipsRow();

            slotClient.slotEl.appendChild(clientChipsRow);
            slotClient.slotEl.appendChild(clientInput);
            slotClient.slotEl.appendChild(clientDD);
            slots.appendChild(slotClient.slotEl);

            function renderClientDD(query) {
                clientDD.innerHTML = '';
                var q = (query || '').toLowerCase().trim();
                var matches = q
                    ? clientOptions.filter(function(c) { return (c.name||'').toLowerCase().indexOf(q) !== -1; })
                    : clientOptions;
                if (matches.length === 0) {
                    var em = document.createElement('div');
                    em.className = 'cp-dd-item';
                    em.style.color = 'rgba(255,255,255,0.25)';
                    em.textContent = q ? 'No match' : 'No clients';
                    clientDD.appendChild(em);
                    return;
                }
                var activeIdx = -1;
                matches.forEach(function(c, i) {
                    var item = document.createElement('div');
                    item.className = 'cp-dd-item';
                    item.setAttribute('data-idx', i);
                    var n = document.createElement('div');
                    n.textContent = c.name || 'Unnamed';
                    item.appendChild(n);
                    if (c.id || c.sub) {
                        var s = document.createElement('div');
                        s.className = 'cp-dd-sub';
                        s.textContent = c.id || c.sub;
                        item.appendChild(s);
                    }
                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        selectClient(c);
                    });
                    clientDD.appendChild(item);
                });
                clientDD.classList.add('cp-dd-visible');
            }

            function selectClient(c) {
                selectedClient = c;
                clientInput.style.display = 'none';
                clientDD.classList.remove('cp-dd-visible');
                clientChipsRow.innerHTML = '';
                var chip = buildChip(c.name, 'client', function() {
                    selectedClient = null;
                    clientChipsRow.innerHTML = '';
                    clientInput.style.display = '';
                    clientInput.value = '';
                    renderClientDD('');
                    updateGoBtn();
                });
                clientChipsRow.appendChild(chip);
                updateGoBtn();
            }

            clientInput.addEventListener('input', function() {
                renderClientDD(clientInput.value);
            });
            clientInput.addEventListener('focus', function() {
                renderClientDD(clientInput.value);
            });

            /* Keyboard nav on client input */
            clientInput.addEventListener('keydown', function(e) {
                var items = clientDD.querySelectorAll('.cp-dd-item');
                var activeEl = clientDD.querySelector('.cp-dd-active');
                var idx = activeEl ? parseInt(activeEl.getAttribute('data-idx')) : -1;
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    idx = Math.min(idx + 1, items.length - 1);
                    items.forEach(function(it) { it.classList.remove('cp-dd-active'); });
                    if (items[idx]) { items[idx].classList.add('cp-dd-active'); items[idx].scrollIntoView({block:'nearest'}); }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    idx = Math.max(idx - 1, 0);
                    items.forEach(function(it) { it.classList.remove('cp-dd-active'); });
                    if (items[idx]) { items[idx].classList.add('cp-dd-active'); items[idx].scrollIntoView({block:'nearest'}); }
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    var active = clientDD.querySelector('.cp-dd-active');
                    if (active) { active.click(); }
                    else if (items.length === 1) { items[0].click(); }
                } else if (e.key === 'Escape') {
                    closePalette();
                }
            });

            /* ─────────────────────────────────────
               SLOT 2: Timeline (optional)
            ───────────────────────────────────── */
            var slotTimeline = buildSlot('Timeline', false);
            var timelineInput = buildField('e.g. 30 days, this month...');
            var timelineDD = buildDropdown();
            var timelineChipsRow = buildChipsRow();
            var customDatesWrap = document.createElement('div');
            customDatesWrap.className = 'cp-custom-dates';
            var dateFrom = document.createElement('input');
            dateFrom.type = 'date';
            var dateSep = document.createElement('span');
            dateSep.textContent = '→';
            var dateTo = document.createElement('input');
            dateTo.type = 'date';
            customDatesWrap.appendChild(dateFrom);
            customDatesWrap.appendChild(dateSep);
            customDatesWrap.appendChild(dateTo);

            function lockCustomDates() {
                var f = dateFrom.value;
                var t = dateTo.value;
                if (!f && !t) return;
                var label = (f || '?') + ' → ' + (t || '?');
                lockTimeline(label);
            }
            dateFrom.addEventListener('change', lockCustomDates);
            dateTo.addEventListener('change', lockCustomDates);

            slotTimeline.slotEl.appendChild(timelineChipsRow);
            slotTimeline.slotEl.appendChild(timelineInput);
            slotTimeline.slotEl.appendChild(timelineDD);
            slotTimeline.slotEl.appendChild(customDatesWrap);
            slots.appendChild(slotTimeline.slotEl);

            function renderTimelineDD(query) {
                timelineDD.innerHTML = '';
                var q = (query || '').toLowerCase().trim();
                var matches = q
                    ? timelinePresets.filter(function(p) { return p.toLowerCase().indexOf(q) !== -1; })
                    : timelinePresets;
                matches.forEach(function(p) {
                    var item = document.createElement('div');
                    item.className = 'cp-dd-item cp-timeline-item';
                    item.textContent = p;
                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (p === 'Custom...') {
                            timelineDD.classList.remove('cp-dd-visible');
                            timelineInput.style.display = 'none';
                            customDatesWrap.classList.add('cp-dates-visible');
                            dateFrom.focus();
                        } else {
                            lockTimeline(p);
                        }
                    });
                    timelineDD.appendChild(item);
                });
                timelineDD.classList.add('cp-dd-visible');
            }

            function lockTimeline(val) {
                selectedTimeline = val;
                timelineInput.style.display = 'none';
                timelineDD.classList.remove('cp-dd-visible');
                customDatesWrap.classList.remove('cp-dates-visible');
                timelineChipsRow.innerHTML = '';
                var chip = buildChip(val, 'timeline', function() {
                    selectedTimeline = null;
                    timelineChipsRow.innerHTML = '';
                    timelineInput.style.display = '';
                    timelineInput.value = '';
                });
                timelineChipsRow.appendChild(chip);
            }

            timelineInput.addEventListener('focus', function() { renderTimelineDD(timelineInput.value); });
            timelineInput.addEventListener('input', function() { renderTimelineDD(timelineInput.value); });
            timelineInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && timelineInput.value.trim()) {
                    lockTimeline(timelineInput.value.trim());
                } else if (e.key === 'Escape') { closePalette(); }
            });

            /* ─────────────────────────────────────
               SLOT 3: Contacts (optional, multi)
            ───────────────────────────────────── */
            var slotContacts = buildSlot('Contacts', false);
            var contactInput = buildField('Filter contacts...');
            var contactDD = buildDropdown();
            var contactChipsRow = buildChipsRow();

            slotContacts.slotEl.appendChild(contactChipsRow);
            slotContacts.slotEl.appendChild(contactInput);
            slotContacts.slotEl.appendChild(contactDD);
            slots.appendChild(slotContacts.slotEl);

            function renderContactDD(query) {
                contactDD.innerHTML = '';
                var q = (query || '').toLowerCase().trim();
                var matches = q
                    ? contactOptions.filter(function(c) { return c.name.toLowerCase().indexOf(q) !== -1; })
                    : contactOptions;
                /* Filter out already-selected */
                var selNames = selectedContacts.map(function(c) { return c.name.toLowerCase(); });
                matches = matches.filter(function(c) { return selNames.indexOf(c.name.toLowerCase()) === -1; });
                if (matches.length === 0) {
                    var em = document.createElement('div');
                    em.className = 'cp-dd-item';
                    em.style.color = 'rgba(255,255,255,0.25)';
                    em.textContent = q ? 'No match' : 'No contacts';
                    contactDD.appendChild(em);
                    contactDD.classList.add('cp-dd-visible');
                    return;
                }
                matches.forEach(function(c) {
                    var item = document.createElement('div');
                    item.className = 'cp-dd-item cp-contact-item';
                    var n = document.createElement('div');
                    n.textContent = c.name;
                    item.appendChild(n);
                    if (c.sub) {
                        var s = document.createElement('div');
                        s.className = 'cp-dd-sub';
                        s.textContent = c.sub;
                        item.appendChild(s);
                    }
                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        addContact(c);
                    });
                    contactDD.appendChild(item);
                });
                contactDD.classList.add('cp-dd-visible');
            }

            function addContact(c) {
                if (selectedContacts.find(function(x) { return x.name === c.name; })) return;
                selectedContacts.push(c);
                contactInput.value = '';
                renderContactDD('');
                reRenderContactChips();
            }

            function reRenderContactChips() {
                contactChipsRow.innerHTML = '';
                selectedContacts.forEach(function(c) {
                    var chip = buildChip(c.name, 'contact', function() {
                        selectedContacts = selectedContacts.filter(function(x) { return x.name !== c.name; });
                        reRenderContactChips();
                    });
                    contactChipsRow.appendChild(chip);
                });
            }

            contactInput.addEventListener('focus', function() { renderContactDD(contactInput.value); });
            contactInput.addEventListener('input', function() { renderContactDD(contactInput.value); });
            contactInput.addEventListener('keydown', function(e) {
                var items = contactDD.querySelectorAll('.cp-dd-item.cp-contact-item');
                var activeEl = contactDD.querySelector('.cp-dd-active');
                var idx = activeEl ? Array.prototype.indexOf.call(items, activeEl) : -1;
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    idx = Math.min(idx + 1, items.length - 1);
                    Array.prototype.forEach.call(items, function(it) { it.classList.remove('cp-dd-active'); });
                    if (items[idx]) items[idx].classList.add('cp-dd-active');
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    idx = Math.max(idx - 1, 0);
                    Array.prototype.forEach.call(items, function(it) { it.classList.remove('cp-dd-active'); });
                    if (items[idx]) items[idx].classList.add('cp-dd-active');
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    var active = contactDD.querySelector('.cp-dd-active');
                    if (active) active.click();
                    else if (items.length === 1) items[0].click();
                } else if (e.key === 'Escape') { closePalette(); }
            });

            /* ─────────────────────────────────────
               SLOT 4: Volume — free-type + POS catalog auto-suggest
            ───────────────────────────────────── */
            /* Build the list of suggest options from pricingCatalog at palette-open time.  */
            /* Falls back to an empty array if the catalog isn't available yet.             */
            var volumeSuggestOptions = (function() {
                var opts = [];
                try {
                    if (typeof pricingCatalog !== 'undefined') {
                        Object.keys(pricingCatalog).forEach(function(cat) {
                            if (Array.isArray(pricingCatalog[cat])) {
                                pricingCatalog[cat].forEach(function(item) {
                                    if (item.name) {
                                        opts.push({
                                            name: item.name,
                                            sub: item.price ? item.price + (item.category ? ' · ' + item.category : '') : (item.category || '')
                                        });
                                    }
                                });
                            }
                        });
                    }
                } catch(e) { /* safe */ }
                return opts;
            })();

            var slotVolume = buildSlot('Volume', false);
            var volumeInput = buildField('e.g. 3 articles, 2 packs...');
            var volumeDD = buildDropdown();
            var volumeChipsRow = buildChipsRow();

            slotVolume.slotEl.appendChild(volumeChipsRow);
            slotVolume.slotEl.appendChild(volumeInput);
            slotVolume.slotEl.appendChild(volumeDD);
            slots.appendChild(slotVolume.slotEl);

            function renderVolumeDD(query) {
                volumeDD.innerHTML = '';
                var q = (query || '').toLowerCase().trim();
                if (!q) { volumeDD.classList.remove('cp-dd-visible'); return; }
                var matches = volumeSuggestOptions.filter(function(o) {
                    return o.name.toLowerCase().indexOf(q) !== -1;
                });
                if (matches.length === 0) { volumeDD.classList.remove('cp-dd-visible'); return; }
                matches.slice(0, 10).forEach(function(o) {
                    var item = document.createElement('div');
                    item.className = 'cp-dd-item cp-volume-item';
                    var n = document.createElement('div');
                    n.textContent = o.name;
                    item.appendChild(n);
                    if (o.sub) {
                        var s = document.createElement('div');
                        s.className = 'cp-dd-sub';
                        s.textContent = o.sub;
                        item.appendChild(s);
                    }
                    item.addEventListener('mousedown', function(e) {
                        e.preventDefault();
                        volumeDD.classList.remove('cp-dd-visible');
                        lockVolume(o.name);
                    });
                    volumeDD.appendChild(item);
                });
                volumeDD.classList.add('cp-dd-visible');
            }

            volumeInput.addEventListener('input', function() { renderVolumeDD(volumeInput.value); });
            volumeInput.addEventListener('focus', function() { renderVolumeDD(volumeInput.value); });
            volumeInput.addEventListener('blur', function() {
                setTimeout(function() { volumeDD.classList.remove('cp-dd-visible'); }, 150);
                if (volumeInput.value.trim()) lockVolume(volumeInput.value.trim());
            });
            volumeInput.addEventListener('keydown', function(e) {
                var items = volumeDD.querySelectorAll('.cp-dd-item.cp-volume-item');
                var activeEl = volumeDD.querySelector('.cp-dd-active');
                var idx = activeEl ? Array.prototype.indexOf.call(items, activeEl) : -1;
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    idx = Math.min(idx + 1, items.length - 1);
                    Array.prototype.forEach.call(items, function(it) { it.classList.remove('cp-dd-active'); });
                    if (items[idx]) items[idx].classList.add('cp-dd-active');
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    idx = Math.max(idx - 1, 0);
                    Array.prototype.forEach.call(items, function(it) { it.classList.remove('cp-dd-active'); });
                    if (items[idx]) items[idx].classList.add('cp-dd-active');
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    var active = volumeDD.querySelector('.cp-dd-active');
                    if (active) { active.dispatchEvent(new MouseEvent('mousedown')); }
                    else if (volumeInput.value.trim()) lockVolume(volumeInput.value.trim());
                } else if (e.key === 'Escape') { closePalette(); }
            });

            function lockVolume(val) {
                selectedVolume = val;
                volumeInput.style.display = 'none';
                volumeDD.classList.remove('cp-dd-visible');
                volumeChipsRow.innerHTML = '';
                var chip = buildChip(val, 'volume', function() {
                    selectedVolume = '';
                    volumeChipsRow.innerHTML = '';
                    volumeInput.style.display = '';
                    volumeInput.value = '';
                });
                volumeChipsRow.appendChild(chip);
            }

            /* ─────────────────────────────────────
               Footer: Go button
            ───────────────────────────────────── */
            var footer = document.createElement('div');
            footer.className = 'cp-footer';
            var hint = document.createElement('div');
            hint.className = 'cp-hint';
            hint.textContent = 'Client required · others optional';
            var goBtn = document.createElement('button');
            goBtn.className = 'cp-go-btn';
            goBtn.innerHTML = 'Go &rarr;';
            goBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!selectedClient) return;
                closePalette();
                onGo({
                    client: selectedClient,
                    timeline: selectedTimeline,
                    contacts: selectedContacts.slice(),
                    volume: selectedVolume
                });
            });
            footer.appendChild(hint);
            footer.appendChild(goBtn);
            palette.appendChild(footer);

            /* ─────────────────────────────────────
               Helpers
            ───────────────────────────────────── */
            function buildSlot(labelText, required) {
                var slotEl = document.createElement('div');
                slotEl.className = 'cp-slot';
                var lbl = document.createElement('div');
                lbl.className = 'cp-slot-label';
                lbl.textContent = labelText;
                if (required) {
                    var req = document.createElement('span');
                    req.className = 'cp-required';
                    req.textContent = '*';
                    lbl.appendChild(req);
                }
                slotEl.appendChild(lbl);
                return { slotEl: slotEl };
            }

            function buildField(placeholder) {
                var inp = document.createElement('input');
                inp.type = 'text';
                inp.className = 'cp-field';
                inp.placeholder = placeholder;
                return inp;
            }

            function buildDropdown() {
                var dd = document.createElement('div');
                dd.className = 'cp-dropdown';
                return dd;
            }

            function buildChipsRow() {
                var row = document.createElement('div');
                row.className = 'cp-chips-row';
                return row;
            }

            function buildChip(text, type, onRemove) {
                var chip = document.createElement('div');
                chip.className = 'cp-chip cp-chip-' + type;
                var label = document.createElement('span');
                label.textContent = text;
                var rm = document.createElement('button');
                rm.className = 'cp-chip-remove';
                rm.innerHTML = '&#10005;';
                rm.addEventListener('click', function(e) {
                    e.stopPropagation();
                    onRemove();
                    updateGoBtn();
                });
                chip.appendChild(label);
                chip.appendChild(rm);
                return chip;
            }

            function updateGoBtn() {
                if (selectedClient) {
                    goBtn.classList.add('cp-go-ready');
                } else {
                    goBtn.classList.remove('cp-go-ready');
                }
            }

            function closePalette() {
                overlay.classList.remove('cp-visible');
                setTimeout(function() {
                    if (overlay.parentNode) overlay.remove();
                }, 280);
                document.removeEventListener('keydown', globalKeyHandler);
            }

            function globalKeyHandler(e) {
                if (e.key === 'Escape') { closePalette(); }
                if (e.key === 'Enter' && selectedClient) {
                    /* Only fire Go if no input is currently focused inside palette */
                    var focused = document.activeElement;
                    if (!palette.contains(focused)) {
                        closePalette();
                        onGo({ client: selectedClient, timeline: selectedTimeline, contacts: selectedContacts.slice(), volume: selectedVolume });
                    }
                }
            }

            /* Outside click closes */
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closePalette();
            });

            /* Mount & animate in */
            overlay.appendChild(palette);
            document.body.appendChild(overlay);
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    overlay.classList.add('cp-visible');
                });
            });

            document.addEventListener('keydown', globalKeyHandler);

            /* Auto-focus client input */
            setTimeout(function() { clientInput.focus(); renderClientDD(''); }, 60);

            return { close: closePalette };
        }


        /* ══════════════════════════════════════════════
           Shared Component — Auto-Suggest Client Search
           Reusable popup for finding clients by name.
           showClientAutoSuggest(anchorEl, onSelect)
        ══════════════════════════════════════════════ */

        function showClientAutoSuggest(anchorEl, onSelect) {
            /* Remove any existing popup */
            var existing = document.querySelector('.client-auto-suggest');
            if (existing) existing.remove();

            /* Load client data — merge localStorage + pillData sources */
            var clients = [];
            if (window.ANC && typeof window.ANC.loadClients === 'function') {
                clients = window.ANC.loadClients();
            }
            /* Also pull hardcoded clients from pillData (AAS Flow section) */
            if (typeof pillData !== 'undefined' && pillData.left && pillData.left[0]) {
                var seen = {};
                clients.forEach(function(c) { seen[(c.name || '').toLowerCase()] = true; });
                pillData.left[0].forEach(function(p) {
                    if (p.isClient && p.label && !seen[p.label.toLowerCase()]) {
                        clients.push({ name: p.label, id: '', sub: p.sub || '' });
                        seen[p.label.toLowerCase()] = true;
                    }
                });
            }

            /* Build popup DOM */
            var popup = document.createElement('div');
            popup.className = 'client-auto-suggest';

            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Search clients...';
            popup.appendChild(input);

            var list = document.createElement('div');
            list.className = 'client-suggest-list';
            popup.appendChild(list);

            document.body.appendChild(popup);

            /* Position near the anchor button */
            var rect = anchorEl.getBoundingClientRect();
            var popupW = 280;
            var leftPos = rect.left + rect.width / 2 - popupW / 2;
            if (leftPos < 8) leftPos = 8;
            if (leftPos + popupW > window.innerWidth - 8) leftPos = window.innerWidth - popupW - 8;
            var topPos = rect.bottom + 6;
            if (topPos + 260 > window.innerHeight) topPos = rect.top - 260;
            popup.style.left = leftPos + 'px';
            popup.style.top = topPos + 'px';

            var activeIndex = -1;

            function renderSuggestions(query) {
                list.innerHTML = '';
                activeIndex = -1;
                var q = (query || '').toLowerCase().trim();
                var matches = clients;
                if (q) {
                    matches = clients.filter(function(c) {
                        return (c.name || '').toLowerCase().indexOf(q) !== -1 ||
                               (c.id || '').toLowerCase().indexOf(q) !== -1;
                    });
                }
                if (matches.length === 0) {
                    var empty = document.createElement('div');
                    empty.className = 'client-suggest-empty';
                    empty.textContent = q ? 'No clients matching "' + query + '"' : 'No clients found';
                    list.appendChild(empty);
                    return;
                }
                matches.forEach(function(client, idx) {
                    var item = document.createElement('div');
                    item.className = 'client-suggest-item';
                    item.setAttribute('data-idx', idx);

                    var nameEl = document.createElement('div');
                    nameEl.className = 'client-suggest-name';
                    nameEl.textContent = client.name || 'Unnamed';
                    item.appendChild(nameEl);

                    if (client.id || client.sub) {
                        var idEl = document.createElement('div');
                        idEl.className = 'client-suggest-id';
                        idEl.textContent = client.id || client.sub;
                        item.appendChild(idEl);
                    }

                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        closePopup();
                        if (typeof onSelect === 'function') onSelect(client);
                    });
                    list.appendChild(item);
                });
            }

            function updateActiveItem() {
                var items = list.querySelectorAll('.client-suggest-item');
                items.forEach(function(it, i) {
                    if (i === activeIndex) it.classList.add('active');
                    else it.classList.remove('active');
                });
                if (activeIndex >= 0 && items[activeIndex]) {
                    items[activeIndex].scrollIntoView({ block: 'nearest' });
                }
            }

            input.addEventListener('input', function() {
                renderSuggestions(input.value);
            });

            input.addEventListener('keydown', function(e) {
                var items = list.querySelectorAll('.client-suggest-item');
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    activeIndex = Math.min(activeIndex + 1, items.length - 1);
                    updateActiveItem();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    activeIndex = Math.max(activeIndex - 1, 0);
                    updateActiveItem();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (activeIndex >= 0 && items[activeIndex]) {
                        items[activeIndex].click();
                    }
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    closePopup();
                }
            });

            function closePopup() {
                if (popup.parentNode) popup.remove();
                document.removeEventListener('click', outsideClick, true);
            }

            function outsideClick(e) {
                if (!popup.contains(e.target) && e.target !== anchorEl) {
                    closePopup();
                }
            }
            /* Delay listener attach so the triggering click doesn't immediately close */
            setTimeout(function() {
                document.addEventListener('click', outsideClick, true);
            }, 50);

            /* Show all clients initially */
            renderSuggestions('');
            input.focus();

            return { close: closePopup };
        }


        /* ══════════════════════════════════════════════
           Call Card — F Client, See Campaign (NEW - Job 7)
           SWAPPED: regular click = instant, lightning = guided
        ══════════════════════════════════════════════ */

        (function initCallCardFindSeeCampaign() {
            var callBtn = document.getElementById('callFindSeeCampaignAG');
            var qgBtn = document.getElementById('callFindSeeCampaign');
            if (!callBtn || !qgBtn) return;

            /* ── Core: open campaigns filtered to client, timeline context ── */
            function runSeeCampaign(chips) {
                var clientName = chips.client ? (chips.client.name || chips.client) : '';
                var timeline = chips.timeline || '';
                var contacts = chips.contacts || [];

                /* Open campaigns panel */
                if (typeof openCampaigns === 'function') openCampaigns();

                /* Set filter to client */
                var filterLabel = document.getElementById('campaignsFilterLabel');
                if (filterLabel) filterLabel.textContent = clientName;

                /* Apply timeline context to filter if campaign table supports it */
                if (timeline && typeof window._campaignsSetTimeline === 'function') {
                    window._campaignsSetTimeline(timeline);
                }

                /* Re-render */
                if (typeof window._campaignsRender === 'function') window._campaignsRender();

                /* Auto-expand tracking columns */
                var trackToggle = document.getElementById('campTrackingToggle');
                var table = document.getElementById('campaignsTable');
                if (table && table.classList.contains('tracking-cols-hidden') && trackToggle) {
                    trackToggle.click();
                }

                /* Flash matching rows */
                setTimeout(function() {
                    var tbody = document.getElementById('campaignsTableBody');
                    if (!tbody) return;
                    var nameLC = clientName.toLowerCase().trim();
                    tbody.querySelectorAll('tr').forEach(function(row) {
                        var firstCell = row.querySelector('td');
                        if (firstCell && firstCell.textContent.toLowerCase().trim() === nameLC) {
                            row.style.transition = 'background 0.3s ease';
                            row.style.background = 'rgba(139, 92, 246, 0.2)';
                            setTimeout(function() { row.style.background = ''; }, 2000);
                        }
                    });
                }, 400);

                var toastMsg = 'Campaigns for ' + clientName;
                if (timeline) toastMsg += ' · ' + timeline;
                if (contacts.length) toastMsg += ' · ' + contacts.map(function(c) { return c.name; }).join(', ');
                if (typeof showWingToast === 'function') showWingToast(toastMsg, 'campaigns');
                if (typeof punchReport === 'function') punchReport({ action: 'F Client, See Campaign', client: clientName, color: '#8b5cf6', type: 'instant-find-campaign', data: { clientName: clientName, timeline: timeline, contacts: contacts.map(function(c){return c.name;}) } });
                console.log('[FindSeeCampaign] chips:', chips);
            }

            function openPalette() {
                showChipPalette({
                    title: '1 · See Campaign',
                    onGo: function(chips) { runSeeCampaign(chips); }
                });
            }

            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                qgBtn.classList.add('vibrating');
                setTimeout(function() { qgBtn.classList.remove('vibrating'); }, 300);
                openPalette();
            });

            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);
                openPalette();
            });

            console.log('[FindSeeCampaign-CC] Chip palette wired for button 1');
        })();


        /* ══════════════════════════════════════════════
           Call Card — F Client, Show Progress
           SWAPPED: regular click = instant, lightning = guided
        ══════════════════════════════════════════════ */

        (function initCallCardFindProgress() {
            var callBtn = document.getElementById('callFindProgressAG');
            var qgBtn = document.getElementById('callFindProgress');
            if (!callBtn || !qgBtn) return;

            /* ── Core: show progress for client filtered by timeline ── */
            function runShowProgress(chips) {
                var clientName = chips.client ? (chips.client.name || chips.client) : '';
                var timeline = chips.timeline || '';
                var contacts = chips.contacts || [];

                /* Open campaigns panel */
                if (typeof openCampaigns === 'function') openCampaigns();

                /* Set filter to client */
                var filterLabel = document.getElementById('campaignsFilterLabel');
                if (filterLabel) filterLabel.textContent = clientName;

                /* Apply timeline context if supported */
                if (timeline && typeof window._campaignsSetTimeline === 'function') {
                    window._campaignsSetTimeline(timeline);
                }

                /* Re-render */
                if (typeof window._campaignsRender === 'function') window._campaignsRender();

                /* Auto-expand tracking columns */
                var trackToggle = document.getElementById('campTrackingToggle');
                var table = document.getElementById('campaignsTable');
                if (table && table.classList.contains('tracking-cols-hidden') && trackToggle) {
                    trackToggle.click();
                }

                /* Flash matching rows */
                setTimeout(function() {
                    var tbody = document.getElementById('campaignsTableBody');
                    if (!tbody) return;
                    var nameLC = clientName.toLowerCase().trim();
                    tbody.querySelectorAll('tr').forEach(function(row) {
                        var firstCell = row.querySelector('td');
                        if (firstCell && firstCell.textContent.toLowerCase().trim() === nameLC) {
                            row.style.transition = 'background 0.3s ease';
                            row.style.background = 'rgba(139, 92, 246, 0.2)';
                            setTimeout(function() { row.style.background = ''; }, 2000);
                        }
                    });
                }, 400);

                var toastMsg = 'Progress for ' + clientName;
                if (timeline) toastMsg += ' · ' + timeline;
                if (typeof showWingToast === 'function') showWingToast(toastMsg, 'campaigns');
                if (typeof punchReport === 'function') punchReport({ action: 'F Client', client: clientName, color: '#8b5cf6', type: 'instant-find-client', data: { clientName: clientName, timeline: timeline, contacts: contacts.map(function(c){return c.name;}) } });
                console.log('[FindProgress] chips:', chips);
            }

            function openPalette() {
                showChipPalette({
                    title: '3 · Show Progress',
                    onGo: function(chips) { runShowProgress(chips); }
                });
            }

            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                qgBtn.classList.add('vibrating');
                setTimeout(function() { qgBtn.classList.remove('vibrating'); }, 300);
                openPalette();
            });

            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);
                openPalette();
            });

            console.log('[FindProgress-CC] Chip palette wired for button 3');
        })();


        /* ══════════════════════════════════════════════
           Call Card — F Client, Add New Order
           Now uses chip palette for client + volume context
           then opens mini POS pre-filled with those chips
        ══════════════════════════════════════════════ */

        (function initCallCardFindAddOrder() {
            var callBtn = document.getElementById('callFindAddOrderAG');
            var qgBtn = document.getElementById('callFindAddOrder');
            if (!callBtn || !qgBtn) return;

            var STORAGE_KEY = 'wingdash_campaigns';
            var BACKUP_KEY = 'wingdash_campaigns_backup';

            /* ── Helper: show mini POS overlay ── */
            function showMiniPOS(anchorEl, clientObj) {
                /* Remove any existing */
                var existing = document.querySelector('.mini-pos-overlay');
                if (existing) existing.remove();

                var clientName = clientObj.name || '';
                var clientId = clientObj.id || '';

                /* Build all services array from pricingCatalog */
                var categories = ['spotify', 'press', 'youtube', 'soundcloud', 'packages'];
                var allItems = [];
                categories.forEach(function(cat) {
                    if (pricingCatalog[cat]) {
                        pricingCatalog[cat].forEach(function(item) {
                            allItems.push({
                                name: item.name,
                                price: item.price || '',
                                category: item.category || cat
                            });
                        });
                    }
                });

                var selectedItems = [];
                var activeCategory = 'all';
                var searchQuery = '';

                /* Build overlay DOM */
                var overlay = document.createElement('div');
                overlay.className = 'mini-pos-overlay';

                /* Header */
                var header = document.createElement('div');
                header.className = 'mini-pos-header';
                var title = document.createElement('div');
                title.className = 'mini-pos-title';
                title.textContent = 'New Order — ' + clientName;
                header.appendChild(title);
                var closeBtn = document.createElement('button');
                closeBtn.className = 'mini-pos-close';
                closeBtn.innerHTML = '&#10005;';
                closeBtn.addEventListener('click', function() { closeOverlay(); });
                header.appendChild(closeBtn);
                overlay.appendChild(header);

                /* Category tabs */
                var tabsWrap = document.createElement('div');
                tabsWrap.className = 'mini-pos-tabs';
                var tabLabels = [
                    { key: 'all', label: 'All' },
                    { key: 'spotify', label: 'Spotify' },
                    { key: 'press', label: 'Press' },
                    { key: 'youtube', label: 'YouTube' },
                    { key: 'soundcloud', label: 'SoundCloud' },
                    { key: 'packages', label: 'Packages' }
                ];
                tabLabels.forEach(function(t) {
                    var tab = document.createElement('button');
                    tab.className = 'mini-pos-tab' + (t.key === 'all' ? ' active' : '');
                    tab.textContent = t.label;
                    tab.setAttribute('data-cat', t.key);
                    tab.addEventListener('click', function() {
                        activeCategory = t.key;
                        tabsWrap.querySelectorAll('.mini-pos-tab').forEach(function(tb) { tb.classList.remove('active'); });
                        tab.classList.add('active');
                        renderTiles();
                    });
                    tabsWrap.appendChild(tab);
                });
                overlay.appendChild(tabsWrap);

                /* Search box */
                var searchInput = document.createElement('input');
                searchInput.className = 'mini-pos-search';
                searchInput.type = 'text';
                searchInput.placeholder = 'Filter services...';
                searchInput.addEventListener('input', function() {
                    searchQuery = searchInput.value;
                    renderTiles();
                });
                overlay.appendChild(searchInput);

                /* Tiles grid */
                var tilesGrid = document.createElement('div');
                tilesGrid.className = 'mini-pos-tiles';
                overlay.appendChild(tilesGrid);

                /* Confirm button */
                var confirmBtn = document.createElement('button');
                confirmBtn.className = 'mini-pos-confirm';
                confirmBtn.disabled = true;
                confirmBtn.textContent = 'Select services to continue';
                confirmBtn.addEventListener('click', function() {
                    if (selectedItems.length === 0) return;
                    processOrder();
                });
                overlay.appendChild(confirmBtn);

                document.body.appendChild(overlay);

                /* Position near anchor */
                var rect = anchorEl.getBoundingClientRect();
                var olW = 380;
                var leftPos = rect.left + rect.width / 2 - olW / 2;
                if (leftPos < 8) leftPos = 8;
                if (leftPos + olW > window.innerWidth - 8) leftPos = window.innerWidth - olW - 8;
                var topPos = rect.bottom + 6;
                if (topPos + 520 > window.innerHeight) topPos = Math.max(8, rect.top - 520);
                overlay.style.left = leftPos + 'px';
                overlay.style.top = topPos + 'px';

                function parsePrice(priceStr) {
                    if (!priceStr) return 0;
                    var m = priceStr.match(/\$?([\d,]+\.?\d*)/);
                    return m ? parseFloat(m[1].replace(/,/g, '')) : 0;
                }

                function getFilteredItems() {
                    var items = allItems;
                    if (activeCategory !== 'all') {
                        items = items.filter(function(it) {
                            return (it.category || '').toLowerCase() === activeCategory;
                        });
                    }
                    if (searchQuery.trim()) {
                        var sq = searchQuery.toLowerCase().trim();
                        items = items.filter(function(it) {
                            return it.name.toLowerCase().indexOf(sq) !== -1;
                        });
                    }
                    return items;
                }

                function isSelected(item) {
                    return selectedItems.some(function(s) { return s.name === item.name && s.category === item.category; });
                }

                function toggleSelect(item) {
                    var idx = -1;
                    for (var i = 0; i < selectedItems.length; i++) {
                        if (selectedItems[i].name === item.name && selectedItems[i].category === item.category) {
                            idx = i; break;
                        }
                    }
                    if (idx >= 0) {
                        selectedItems.splice(idx, 1);
                    } else {
                        selectedItems.push(item);
                    }
                    updateConfirmBtn();
                }

                function updateConfirmBtn() {
                    if (selectedItems.length === 0) {
                        confirmBtn.disabled = true;
                        confirmBtn.textContent = 'Select services to continue';
                    } else {
                        confirmBtn.disabled = false;
                        var total = 0;
                        selectedItems.forEach(function(s) { total += parsePrice(s.price); });
                        confirmBtn.textContent = 'Confirm ' + selectedItems.length + ' service' + (selectedItems.length > 1 ? 's' : '') + ' — $' + total.toLocaleString('en-US', { minimumFractionDigits: 2 });
                    }
                }

                function renderTiles() {
                    tilesGrid.innerHTML = '';
                    var items = getFilteredItems();
                    if (items.length === 0) {
                        var emptyEl = document.createElement('div');
                        emptyEl.style.cssText = 'grid-column:1/-1;padding:16px;text-align:center;color:rgba(255,255,255,0.3);font-size:0.7rem;';
                        emptyEl.textContent = 'No services match this filter';
                        tilesGrid.appendChild(emptyEl);
                        return;
                    }
                    items.forEach(function(item) {
                        var tile = document.createElement('div');
                        tile.className = 'mini-pos-tile' + (isSelected(item) ? ' selected' : '');

                        var check = document.createElement('span');
                        check.className = 'mini-pos-tile-check';
                        check.textContent = '\u2713';
                        tile.appendChild(check);

                        var nameEl = document.createElement('div');
                        nameEl.className = 'mini-pos-tile-name';
                        nameEl.textContent = item.name;
                        tile.appendChild(nameEl);

                        var priceEl = document.createElement('div');
                        priceEl.className = 'mini-pos-tile-price';
                        priceEl.textContent = item.price || '\u2014';
                        tile.appendChild(priceEl);

                        var catEl = document.createElement('div');
                        catEl.className = 'mini-pos-tile-cat';
                        catEl.textContent = item.category || '';
                        tile.appendChild(catEl);

                        tile.addEventListener('click', function() {
                            toggleSelect(item);
                            tile.classList.toggle('selected', isSelected(item));
                            /* Re-render all tiles to sync selected states */
                            renderTiles();
                        });

                        tilesGrid.appendChild(tile);
                    });
                }

                function processOrder() {
                    /* 1. Add rows to campaigns for each selected service */
                    var rows = [];
                    try { rows = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(ex) { rows = []; }
                    var backups = [];
                    try { backups = JSON.parse(localStorage.getItem(BACKUP_KEY)) || []; } catch(ex2) { backups = []; }

                    var orderNames = [];
                    selectedItems.forEach(function(svc) {
                        var newRow = {
                            _id: 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                            clientName: clientName,
                            clientId: clientId,
                            orderName: svc.name,
                            orderId: 'ORD-' + Date.now().toString(36).toUpperCase(),
                            campaignType: '',
                            targetCount: '',
                            currentCount: '',
                            progressPct: '',
                            startDate: new Date().toISOString().split('T')[0],
                            eta: '',
                            trackingNotes: '',
                            paymentAmount: svc.price || '',
                            paymentStatus: '',
                            paymentLink: '',
                            orderDetails: svc.price || ''
                        };
                        rows.push(newRow);
                        backups.push(JSON.parse(JSON.stringify(newRow)));
                        orderNames.push(svc.name);
                    });

                    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
                    localStorage.setItem(BACKUP_KEY, JSON.stringify(backups));

                    /* 2. Generate payment card */
                    var services = selectedItems.map(function(svc) {
                        return {
                            name: svc.name,
                            id: '',
                            payment: '',
                            details: svc.price || ''
                        };
                    });

                    var cardTitle = clientName + ' Payment Card';
                    var now = new Date();
                    var dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    var timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                    /* Build services rows for payment card HTML */
                    var servicesHTML = '';
                    var totalAmount = 0;
                    services.forEach(function(s, i) {
                        var price = 0;
                        var priceMatch = (s.details || '').match(/\$?([\d,]+\.?\d*)/);
                        if (priceMatch) price = parseFloat(priceMatch[1].replace(/,/g, ''));
                        totalAmount += price;
                        servicesHTML += '<tr>' +
                            '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#b3b3b3;font-size:0.85rem;">' + (i + 1) + '</td>' +
                            '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:0.85rem;font-weight:500;">' + (s.name || 'Service') + '</td>' +
                            '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#b3b3b3;font-size:0.85rem;">' + (s.details || '\u2014') + '</td>' +
                            '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#1DB954;font-size:0.85rem;font-weight:600;text-align:right;">$' + (price > 0 ? price.toLocaleString('en-US', {minimumFractionDigits:2}) : '0.00') + '</td>' +
                            '</tr>';
                    });

                    var html = '<!DOCTYPE html><html lang="en"><head>' +
                        '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">' +
                        '<title>' + cardTitle + '</title>' +
                        '<style>' +
                        '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");' +
                        '*{margin:0;padding:0;box-sizing:border-box}' +
                        'body{background:#000;font-family:"Inter",system-ui,-apple-system,sans-serif;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;' +
                        'background-image:radial-gradient(circle at 20% 20%,rgba(29,185,84,0.04) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(29,185,84,0.03) 0%,transparent 50%)}' +
                        '.card{max-width:640px;width:100%;background:linear-gradient(135deg,#181818 0%,#121212 100%);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;' +
                        'box-shadow:0 4px 12px rgba(0,0,0,0.3),0 16px 48px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.04)}' +
                        '.card-header{padding:2rem 2rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);position:relative}' +
                        '.card-header::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#1DB954,#1ed760,#1DB954);box-shadow:0 0 20px rgba(29,185,84,0.4)}' +
                        '.card-label{font-size:0.625rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#727272;margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem}' +
                        '.card-label::before{content:"";width:16px;height:2px;background:#1DB954;border-radius:1px}' +
                        '.card-client{font-size:1.75rem;font-weight:700;letter-spacing:-0.02em;background:linear-gradient(135deg,#fff 0%,#a1a1aa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}' +
                        '.card-date{font-size:0.75rem;color:#727272;margin-top:0.5rem}' +
                        '.card-body{padding:1.5rem 2rem}' +
                        '.services-table{width:100%;border-collapse:collapse;margin-bottom:1.5rem}' +
                        '.services-table th{padding:10px 16px;text-align:left;font-size:0.625rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#727272;border-bottom:1px solid rgba(255,255,255,0.1)}' +
                        '.services-table th:last-child{text-align:right}' +
                        '.total-row{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;background:rgba(29,185,84,0.08);border:1px solid rgba(29,185,84,0.2);border-radius:12px;margin-bottom:1.5rem}' +
                        '.total-label{font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#b3b3b3}' +
                        '.total-amount{font-size:1.5rem;font-weight:700;color:#1DB954;text-shadow:0 0 20px rgba(29,185,84,0.3)}' +
                        '.payment-methods{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1.5rem}' +
                        '.pay-method{padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:all 0.2s ease}' +
                        '.pay-method:hover{background:rgba(29,185,84,0.08);border-color:rgba(29,185,84,0.3)}' +
                        '.pay-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}' +
                        '.pay-name{font-size:0.8rem;font-weight:500;color:#b3b3b3}' +
                        '.card-footer{padding:1.25rem 2rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center}' +
                        '.brand{font-size:0.625rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#727272}' +
                        '.brand-accent{color:#1DB954}' +
                        '.card-id{font-size:0.6rem;color:#3f3f46;font-family:monospace}' +
                        '</style></head><body>' +
                        '<div class="card">' +
                        '<div class="card-header">' +
                        '<div class="card-label">Payment Card <span style="display:inline-block;padding:3px 10px;border-radius:6px;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-left:8px;background:rgba(14,165,233,0.15);border:1px solid rgba(14,165,233,0.3);color:#7dd3fc;">Invoice</span></div>' +
                        '<div class="card-client">' + (clientName || 'Client') + '</div>' +
                        '<div class="card-date">' + dateStr + ' \u00b7 ' + timeStr + '</div>' +
                        '</div>' +
                        '<div class="card-body">' +
                        '<table class="services-table">' +
                        '<thead><tr><th>#</th><th>Service</th><th>Details</th><th>Amount</th></tr></thead>' +
                        '<tbody>' + servicesHTML + '</tbody>' +
                        '</table>' +
                        '<div class="total-row">' +
                        '<span class="total-label">Total Due</span>' +
                        '<span class="total-amount">$' + totalAmount.toLocaleString('en-US', {minimumFractionDigits:2}) + '</span>' +
                        '</div>' +
                        '<div class="payment-methods">' +
                        '<div class="pay-method" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);opacity:0.4;"><span class="pay-dot" style="background:#635bff"></span><span class="pay-name">Stripe</span></div>' +
                        '<div class="pay-method" style="background:rgba(0,112,186,0.15);border:1px solid #0070ba;box-shadow:0 0 12px rgba(0,112,186,0.2);"><span class="pay-dot" style="background:#0070ba"></span><span class="pay-name" style="color:#fff;font-weight:600;">PayPal &#10003;</span></div>' +
                        '<div class="pay-method" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);opacity:0.4;"><span class="pay-dot" style="background:#008cff"></span><span class="pay-name">Venmo</span></div>' +
                        '<div class="pay-method" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);opacity:0.4;"><span class="pay-dot" style="background:#00d632"></span><span class="pay-name">Cash App</span></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="card-footer">' +
                        '<span class="brand"><span class="brand-accent">Ahead</span> Artist Solutions</span>' +
                        '<span class="card-id">PC-' + Date.now() + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</body></html>';

                    /* Store in localStorage */
                    var storageKey = 'wingdash_payment_cards_' + clientName.replace(/\s+/g, '_').toLowerCase();
                    var saved = [];
                    try { saved = JSON.parse(localStorage.getItem(storageKey)) || []; } catch(e3) { saved = []; }
                    saved.push({
                        title: cardTitle,
                        html: html,
                        timestamp: new Date().toISOString()
                    });
                    localStorage.setItem(storageKey, JSON.stringify(saved));

                    /* Open as blob URL */
                    var blob = new Blob([html], { type: 'text/html' });
                    var url = URL.createObjectURL(blob);
                    window.open(url, '_blank');

                    /* Save payment record to disk via save server */
                    if (typeof saveResultToFile === 'function') saveResultToFile('payment', clientName, html, cardTitle);

                    /* Open campaigns panel filtered to client */
                    if (typeof openCampaigns === 'function') openCampaigns();
                    var filterLabel = document.getElementById('campaignsFilterLabel');
                    if (filterLabel) filterLabel.textContent = clientName;
                    if (typeof window._campaignsRender === 'function') window._campaignsRender();

                    /* Success toast */
                    if (typeof showWingToast === 'function') showWingToast(selectedItems.length + ' order' + (selectedItems.length > 1 ? 's' : '') + ' added + Payment Card — ' + clientName, 'campaigns');

                    /* Punch report */
                    if (typeof punchReport === 'function') punchReport({ action: 'Add Order', client: clientName, color: '#f59e0b', type: 'instant-add-order', data: { clientName: clientName, orderName: orderNames.join(', ') } });

                    console.log('[FindAddOrder] Orders created:', orderNames, 'for', clientName);

                    /* Close overlay */
                    closeOverlay();
                }

                function closeOverlay() {
                    if (overlay.parentNode) overlay.remove();
                    document.removeEventListener('click', outsideClickOL, true);
                }

                function outsideClickOL(e) {
                    if (!overlay.contains(e.target) && e.target !== anchorEl) {
                        closeOverlay();
                    }
                }
                setTimeout(function() {
                    document.addEventListener('click', outsideClickOL, true);
                }, 50);

                /* Initial render */
                renderTiles();
                searchInput.focus();
            }

            /* ── Chip palette entry point for both buttons ── */
            function openAddOrderPalette(anchorEl) {
                showChipPalette({
                    title: '2 · Add New Order',
                    onGo: function(chips) {
                        var clientObj = chips.client;
                        var volume = chips.volume || '';
                        var contacts = chips.contacts || [];
                        var timeline = chips.timeline || '';

                        /* Pass volume/contacts as context into mini POS title */
                        var enrichedClientObj = {
                            name: clientObj.name || '',
                            id: clientObj.id || '',
                            sub: clientObj.sub || '',
                            _volumeHint: volume,
                            _contactsHint: contacts.map(function(c){return c.name;}).join(', '),
                            _timelineHint: timeline
                        };

                        /* Open mini POS — it reads clientObj.name for the header */
                        showMiniPOS(anchorEl, enrichedClientObj);
                    }
                });
            }

            qgBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                qgBtn.classList.add('vibrating');
                setTimeout(function() { qgBtn.classList.remove('vibrating'); }, 300);
                openAddOrderPalette(qgBtn);
            });

            callBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                callBtn.classList.add('vibrating');
                setTimeout(function() { callBtn.classList.remove('vibrating'); }, 300);
                openAddOrderPalette(callBtn);
            });

            console.log('[FindAddOrder-CC] Chip palette wired for button 2');
        })();


        /* ══════════════════════════════════════════════
           Punch Card Assembly Line — 3-Card Pipeline
           Recent → GO → Working (executes jobs) → Complete
           Full pipeline overhaul: cards execute real work,
           auto-move to Complete, show results, handle errors.
        ══════════════════════════════════════════════ */

        (function initPunchAssemblyLine() {
            var STORAGE_KEY = 'wingdash_punch_reports';
            var WORKING_KEY = 'wingdash_working_reports';
            var COMPLETE_KEY = 'wingdash_complete_reports';
            var PIPELINE_STATE_KEY = 'wingdash_pipeline_state';
            var MAX_SLOTS = 5;
            var assemblyLine = document.getElementById('punchAssemblyLine');
            var slotsContainer = document.getElementById('punchAssemblySlots');
            var countLabel = document.getElementById('punchAssemblyCount');
            var clearBtn = document.getElementById('punchAssemblyClear');
            var goBtn = document.getElementById('punchGoBtn');
            var workingContainer = document.getElementById('punchWorkingSlots');
            var completeContainer = document.getElementById('punchCompleteSlots');
            var completeClearAll = document.getElementById('punchCompleteClearAll');
            if (!slotsContainer || !assemblyLine) return;

            /* ── Action color + icon map ── */
            var ACTION_META = {
                'Add Client':          { color: '#10b981', icon: '+' },
                'Add Client + Order':  { color: '#10b981', icon: '+' },
                'Mark Complete':       { color: '#ef4444', icon: '\u2713' },
                'F Client, Mark Complete': { color: '#ef4444', icon: '\u2713' },
                'Create Proposal':     { color: '#0ea5e9', icon: '\u26a1' },
                'Create Presentation': { color: '#6366f1', icon: '\u2728' },
                'F Client, Generate Presentation': { color: '#6366f1', icon: '\u2728' },
                'Add Presentation':    { color: '#f59e0b', icon: '\ud83c\udfac' },
                'Add Order':           { color: '#f59e0b', icon: '+' },
                'F Client, Add Order': { color: '#f59e0b', icon: '+' },
                'Create Payment Card': { color: '#1DB954', icon: '\ud83d\udcb3' },
                'F Client':         { color: '#8b5cf6', icon: '\ud83d\udd0d' },
                'F Client, See Campaign': { color: '#8b5cf6', icon: '\ud83d\udd0d' }
            };

            /* ── Job type classification ── */
            var JOB_CATEGORY = {
                'instant-add-client':        'instant',
                'instant-mark-complete':     'instant',
                'instant-add-order':         'instant',
                'instant-add-presentation':  'instant',
                'instant-find-client':       'instant',
                'instant-find-campaign':     'instant',
                'api-proposal':              'api',
                'api-presentation':          'api',
                'template-payment':          'template'
            };

            /* ── Result labels per job type ── */
            var RESULT_LABELS = {
                'instant-add-client':       'Saved \u2713',
                'instant-mark-complete':    'Done \u2713',
                'instant-add-order':        'Added \u2713',
                'instant-add-presentation': 'Linked \u2713',
                'instant-find-client':      'Found \u2713',
                'instant-find-campaign':    'Found \u2713',
                'api-proposal':             'View Proposal',
                'api-presentation':         'View Presentation',
                'template-payment':         'View Payment'
            };

            /* ── Expand / collapse the clamp zone ── */
            function expandClamp() {
                assemblyLine.classList.add('clamp-open');
            }
            function collapseClamp() {
                assemblyLine.classList.remove('clamp-open');
            }

            /* ── Clear button: clears Recent row and collapses ── */
            if (clearBtn) {
                clearBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    saveReports([]);
                    renderSlots([], false);
                    collapseClamp();
                    console.log('[Pipeline] Recent row cleared + clamp collapsed');
                });
            }

            /* ── Clear All Complete button ── */
            if (completeClearAll) {
                completeClearAll.addEventListener('click', function(e) {
                    e.stopPropagation();
                    saveComplete([]);
                    renderCompleteSlots([], false);
                    savePipelineState();
                    console.log('[Pipeline] All completed cards cleared');
                });
            }

            /* ── localStorage helpers ── */
            function loadData(key) {
                try {
                    var raw = localStorage.getItem(key);
                    return raw ? JSON.parse(raw) : [];
                } catch(e) { return []; }
            }
            function saveData(key, arr) {
                try { localStorage.setItem(key, JSON.stringify(arr)); } catch(e) {}
            }
            function loadReports() { return loadData(STORAGE_KEY); }
            function saveReports(r) { saveData(STORAGE_KEY, r); }
            function loadWorking() { return loadData(WORKING_KEY); }
            function saveWorking(r) { saveData(WORKING_KEY, r); }
            function loadComplete() { return loadData(COMPLETE_KEY); }
            function saveComplete(r) { saveData(COMPLETE_KEY, r); }

            /* ── Save full pipeline state snapshot ── */
            function savePipelineState() {
                try {
                    localStorage.setItem(PIPELINE_STATE_KEY, JSON.stringify({
                        recent: loadReports(),
                        working: loadWorking(),
                        complete: loadComplete(),
                        savedAt: new Date().toISOString()
                    }));
                } catch(e) {}
            }

            /* ── Format time like "4:32 PM" ── */
            function formatTime(isoStr) {
                try {
                    var d = new Date(isoStr);
                    var h = d.getHours();
                    var m = d.getMinutes();
                    var ampm = h >= 12 ? 'PM' : 'AM';
                    h = h % 12 || 12;
                    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
                } catch(e) { return ''; }
            }

            /* ── Generate unique ID ── */
            function genId() {
                return 'pr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
            }

            /* ── Build a report card DOM element ── */
            function buildCard(report, isNewest) {
                var meta = ACTION_META[report.action] || { color: '#94a3b8', icon: '\u2022' };
                var color = report.color || meta.color;

                var card = document.createElement('div');
                card.className = 'punch-report-card' + (isNewest ? ' newest' : '');
                card.style.borderLeftColor = color;

                var actionRow = document.createElement('div');
                actionRow.className = 'pr-action';

                var dot = document.createElement('span');
                dot.className = 'pr-dot';
                dot.style.background = color;
                dot.style.boxShadow = '0 0 4px ' + color;
                actionRow.appendChild(dot);

                var actionText = document.createTextNode(report.action || 'Action');
                actionRow.appendChild(actionText);
                card.appendChild(actionRow);

                var clientEl = document.createElement('div');
                clientEl.className = 'pr-client';
                clientEl.textContent = report.client || '\u2014';
                card.appendChild(clientEl);

                var timeEl = document.createElement('div');
                timeEl.className = 'pr-time';
                timeEl.textContent = formatTime(report.timestamp);
                card.appendChild(timeEl);

                return card;
            }

            /* ── Build animated dots element ── */
            function buildWorkingDots() {
                var dotsEl = document.createElement('div');
                dotsEl.className = 'punch-working-dots';
                dotsEl.innerHTML = '<span>\u2022</span><span>\u2022</span><span>\u2022</span>';
                return dotsEl;
            }

            /* ── Update Go button state ── */
            function updateGoBtn() {
                if (!goBtn) return;
                var reports = loadReports();
                if (reports.length > 0) {
                    goBtn.classList.remove('disabled');
                } else {
                    goBtn.classList.add('disabled');
                }
            }

            /* ── Render Recent Actions slots ── */
            function renderSlots(reports, animate) {
                var slots = slotsContainer.querySelectorAll('.punch-report-slot');
                for (var i = 0; i < slots.length; i++) {
                    slots[i].innerHTML = '';
                    if (i < reports.length) {
                        slots[i].classList.remove('empty');
                        slots[i].style.border = 'none';
                        var card = buildCard(reports[i], animate && i === 0);
                        if (animate && i === 0) {
                            card.style.animation = 'punchCardSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        }
                        slots[i].appendChild(card);
                    } else {
                        slots[i].classList.add('empty');
                        slots[i].style.border = '1.5px dashed rgba(255,255,255,0.08)';
                    }
                }
                if (countLabel) countLabel.textContent = reports.length + ' / ' + MAX_SLOTS;
                updateGoBtn();
            }

            /* ── Render Working slots ── */
            function renderWorkingSlots(working, animate) {
                if (!workingContainer) return;
                var slots = workingContainer.querySelectorAll('.punch-wc-slot');
                for (var i = 0; i < slots.length; i++) {
                    slots[i].innerHTML = '';
                    slots[i].style.position = 'relative';
                    slots[i].classList.remove('error-slot');
                    if (i < working.length) {
                        var w = working[i];
                        slots[i].classList.remove('empty');
                        slots[i].style.border = '';
                        var card = buildCard(w, false);
                        card.classList.remove('newest');
                        if (animate) card.classList.add('pipeline-enter');

                        /* Show error state */
                        if (w.jobStatus === 'error') {
                            slots[i].classList.add('error-slot');
                            card.style.animation = 'none';
                            var errMsg = document.createElement('div');
                            errMsg.className = 'punch-error-msg';
                            errMsg.textContent = w.errorMsg || 'Error';
                            errMsg.title = w.errorMsg || 'Error';
                            card.appendChild(errMsg);
                            var retryBtn = document.createElement('button');
                            retryBtn.className = 'punch-retry-btn';
                            retryBtn.textContent = 'Retry';
                            retryBtn.setAttribute('data-widx', String(i));
                            retryBtn.addEventListener('click', (function(idx) {
                                return function(e) {
                                    e.stopPropagation();
                                    retryWorkingCard(idx);
                                };
                            })(i));
                            card.appendChild(retryBtn);
                        }
                        /* Show working dots for in-progress jobs */
                        else if (w.jobStatus === 'running') {
                            card.appendChild(buildWorkingDots());
                        }

                        slots[i].appendChild(card);
                    } else {
                        slots[i].classList.add('empty');
                        slots[i].style.border = '1.5px dashed rgba(255,255,255,0.06)';
                    }
                }
            }

            /* ── Render Complete slots ── */
            function renderCompleteSlots(complete, animate) {
                if (!completeContainer) return;
                var slots = completeContainer.querySelectorAll('.punch-wc-slot');
                for (var i = 0; i < slots.length; i++) {
                    slots[i].innerHTML = '';
                    slots[i].style.position = 'relative';
                    if (i < complete.length) {
                        var c = complete[i];
                        slots[i].classList.remove('empty');
                        slots[i].style.border = '';
                        var card = buildCard(c, false);
                        card.classList.remove('newest');
                        if (animate) card.classList.add('pipeline-down');

                        /* Add result label */
                        var resultLabel = document.createElement('div');
                        resultLabel.className = 'punch-result-label';
                        resultLabel.textContent = c.resultLabel || RESULT_LABELS[c.type] || 'Done \u2713';
                        card.appendChild(resultLabel);

                        /* Make double-clickable — open result */
                        card.addEventListener('dblclick', (function(cardData) {
                            return function(e) {
                                e.stopPropagation();
                                openCompleteResult(cardData);
                            };
                        })(c));
                        card.style.cursor = 'pointer';
                        card.title = 'Double-click to open result';

                        slots[i].appendChild(card);

                        /* Add done checkmark */
                        var chk = document.createElement('span');
                        chk.className = 'punch-wc-done-check';
                        chk.textContent = '\u2713';
                        slots[i].appendChild(chk);

                        /* Add dismiss button */
                        var dismissBtn = document.createElement('button');
                        dismissBtn.className = 'punch-wc-dismiss-btn';
                        dismissBtn.textContent = '\u2715';
                        dismissBtn.title = 'Dismiss';
                        dismissBtn.addEventListener('click', (function(idx) {
                            return function(e) {
                                e.stopPropagation();
                                dismissCompleteCard(idx);
                            };
                        })(i));
                        slots[i].appendChild(dismissBtn);
                    } else {
                        slots[i].classList.add('empty');
                        slots[i].style.border = '1.5px dashed rgba(255,255,255,0.06)';
                    }
                }
            }

            /* ── Save result to file via save-result.py server (port 3001) ── */
            function saveResultToFile(type, clientName, html, title) {
                try {
                    fetch('http://localhost:3001/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: type, clientName: clientName, html: html, title: title })
                    })
                    .then(function(resp) { return resp.json(); })
                    .then(function(data) {
                        if (data.success) {
                            console.log('[SaveServer] Saved ' + type + ' → ' + data.path);
                        } else {
                            console.warn('[SaveServer] Save failed:', data.error);
                        }
                    })
                    .catch(function(err) {
                        console.warn('[SaveServer] Server not running or unreachable — skipping file save.', err.message || '');
                    });
                } catch(e) {
                    console.warn('[SaveServer] Could not fire save request:', e.message || '');
                }
            }

            /* ── Open result from a completed card ── */
            function openCompleteResult(cardData) {
                var cat = JOB_CATEGORY[cardData.type] || 'instant';

                if (cat === 'api' || cat === 'template') {
                    /* Try to open stored result as blob URL */
                    var html = cardData.resultHtml || '';
                    if (html) {
                        var blob = new Blob([html], { type: 'text/html' });
                        window.open(URL.createObjectURL(blob), '_blank');
                        console.log('[Pipeline] Opened result for:', cardData.action, cardData.client);
                        /* Auto-save a copy to disk */
                        var _cn = (cardData.data && cardData.data.clientName) || cardData.client || '';
                        var _saveType = cardData.type === 'api-proposal' ? 'proposal' : cardData.type === 'api-presentation' ? 'presentation' : cardData.type === 'template-payment' ? 'payment' : '';
                        if (_saveType && _cn) saveResultToFile(_saveType, _cn, html, cardData.action || _saveType);
                    } else {
                        /* Fallback: try to find in localStorage */
                        var cn = (cardData.data && cardData.data.clientName) || cardData.client || '';
                        var storageKey = '';
                        if (cardData.type === 'api-proposal') {
                            storageKey = 'wingdash_proposal_' + cn.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                        } else if (cardData.type === 'api-presentation') {
                            storageKey = 'wingdash_presentations_' + cn.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                        } else if (cardData.type === 'template-payment') {
                            storageKey = 'wingdash_payment_cards_' + cn.replace(/\s+/g, '_').toLowerCase();
                        }
                        if (storageKey) {
                            var stored = localStorage.getItem(storageKey);
                            if (stored) {
                                /* Payment cards store as array */
                                if (cardData.type === 'template-payment') {
                                    try {
                                        var arr = JSON.parse(stored);
                                        if (arr.length > 0) stored = arr[arr.length - 1].html;
                                    } catch(e) {}
                                }
                                /* Presentations need wrapping */
                                if (cardData.type === 'api-presentation') {
                                    stored = stored.replace(/^```html?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
                                    stored = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Presentation - ' + cn + '</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:system-ui,sans-serif;margin:0;padding:3rem 2rem;background:#000;color:#fff;min-height:100vh;}.pres-wrap{max-width:900px;margin:0 auto;background:linear-gradient(135deg,#282828,#181818);border:1px solid rgba(255,255,255,0.07);border-radius:32px;padding:4rem 3.5rem;}</style></head><body><div class="pres-wrap">' + stored + '</div></body></html>';
                                }
                                var blob2 = new Blob([stored], { type: 'text/html' });
                                window.open(URL.createObjectURL(blob2), '_blank');
                            }
                        }
                        console.log('[Pipeline] Opened fallback result for:', cardData.action);
                    }
                } else {
                    /* Instant jobs — show a confirmation tooltip */
                    if (typeof showWingToast === 'function') {
                        showWingToast(cardData.action + ' \u2014 ' + (cardData.client || '') + ' \u2713', 'pipeline');
                    }
                }
            }

            /* ── Dismiss a single complete card ── */
            function dismissCompleteCard(idx) {
                var complete = loadComplete();
                if (idx < 0 || idx >= complete.length) return;
                complete.splice(idx, 1);
                saveComplete(complete);
                renderCompleteSlots(complete, false);
                savePipelineState();
                console.log('[Pipeline] Dismissed complete card at index:', idx);
            }

            /* ── Move a working card → complete (with result) ── */
            function completeWorkingCard(idx, result) {
                var working = loadWorking();
                var complete = loadComplete();
                if (idx < 0 || idx >= working.length) return;

                var card = working.splice(idx, 1)[0];
                card.completedAt = new Date().toISOString();
                card.jobStatus = 'done';
                if (result) {
                    if (result.html) card.resultHtml = result.html;
                    if (result.label) card.resultLabel = result.label;
                    if (result.blobUrl) card.resultBlobUrl = result.blobUrl;
                }

                /* If complete is full, drop the oldest */
                if (complete.length >= MAX_SLOTS) {
                    complete = complete.slice(0, MAX_SLOTS - 1);
                }
                complete.unshift(card);

                saveWorking(working);
                saveComplete(complete);

                /* Brief green flash before re-render */
                var wSlots = workingContainer.querySelectorAll('.punch-wc-slot');
                /* Re-render both rows */
                renderWorkingSlots(working, false);
                renderCompleteSlots(complete, true);
                savePipelineState();
                console.log('[Pipeline] Card completed:', card.action, card.client);
            }

            /* ── Mark a working card as errored ── */
            function errorWorkingCard(idx, errMsg) {
                var working = loadWorking();
                if (idx < 0 || idx >= working.length) return;
                working[idx].jobStatus = 'error';
                working[idx].errorMsg = errMsg || 'Unknown error';
                saveWorking(working);
                renderWorkingSlots(working, false);
                savePipelineState();
                console.log('[Pipeline] Card errored:', working[idx].action, errMsg);
            }

            /* ── Retry a failed working card ── */
            function retryWorkingCard(idx) {
                var working = loadWorking();
                if (idx < 0 || idx >= working.length) return;
                working[idx].jobStatus = 'running';
                working[idx].errorMsg = '';
                saveWorking(working);
                renderWorkingSlots(working, false);
                executeJob(working[idx], idx);
                console.log('[Pipeline] Retrying card:', working[idx].action);
            }

            /* ══════════════════════════════════════════════
               JOB EXECUTION ENGINE
               Routes each card to its job based on type.
            ══════════════════════════════════════════════ */

            function executeJob(cardData, workingIdx) {
                var cat = JOB_CATEGORY[cardData.type] || 'instant';
                console.log('[Pipeline] Executing job:', cardData.type, '(' + cat + ') for', cardData.client);

                if (cat === 'instant') {
                    executeInstantJob(cardData, workingIdx);
                } else if (cat === 'api') {
                    executeApiJob(cardData, workingIdx);
                } else if (cat === 'template') {
                    executeTemplateJob(cardData, workingIdx);
                } else {
                    /* Unknown type — treat as instant */
                    executeInstantJob(cardData, workingIdx);
                }
            }

            /* ── Instant jobs: brief animation, then auto-complete ── */
            function executeInstantJob(cardData, workingIdx) {
                /* These jobs already executed their localStorage ops at punch time.
                   Show brief working state (500ms), then auto-move to Complete. */
                setTimeout(function() {
                    /* Re-check index validity (array may have shifted) */
                    var working = loadWorking();
                    var actualIdx = findWorkingIndex(cardData.id, working);
                    if (actualIdx < 0) return;

                    var resultLabel = RESULT_LABELS[cardData.type] || 'Done \u2713';
                    completeWorkingCard(actualIdx, { label: resultLabel });
                }, 500);
            }

            /* ── API jobs: fire Claude API call, show dots, auto-complete on response ── */
            function executeApiJob(cardData, workingIdx) {
                var clientName = (cardData.data && cardData.data.clientName) || cardData.client || '';

                if (cardData.type === 'api-proposal') {
                    /* Generate proposal via Claude API */
                    var promptText = 'Generate a single, clean proposal card in HTML for an artist services company called "Ahead Artist Solutions". ' +
                        'The proposal is for a client named "' + clientName + '". ' +
                        'Keep it to ONE compact card. Structure: ' +
                        '1) An h1 header with the client name, ' +
                        '2) A short 2-3 sentence summary, ' +
                        '3) A concise bullet list of key services (5-7 items max), ' +
                        '4) A single recommended pricing line. ' +
                        'Use clean semantic HTML. Return ONLY the inner HTML.';

                    showApiLoading('Pipeline: Generating proposal for ' + clientName + '...', 'Working card executing');

                    callClaudeAPI({
                        prompt: promptText,
                        maxTokens: 1500,
                        loadingMsg: 'Pipeline: Proposal for ' + clientName,
                        loadingSub: 'Card executing in Working row',
                        tag: 'PipelineProposal'
                    })
                    .then(function(html) {
                        hideApiLoading(true, 'Pipeline: Proposal ready for ' + clientName);

                        /* Save to localStorage */
                        var storageKey = 'wingdash_proposal_' + clientName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                        try { localStorage.setItem(storageKey, html); } catch(e) {}

                        /* Build full HTML doc for blob */
                        var fullHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Proposal - ' + clientName + '</title>' +
                            '<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:system-ui,sans-serif;padding:3rem 2rem;background:#0f172a;color:#e2e8f0;min-height:100vh;}.proposal-wrap{max-width:700px;margin:0 auto;background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:3rem;box-shadow:0 4px 24px rgba(0,0,0,0.4);}h1{color:#0ea5e9;margin-bottom:1rem;}h3{color:#7dd3fc;margin:1rem 0 0.5rem;}p{color:#94a3b8;line-height:1.7;margin-bottom:0.75rem;}ul{padding-left:1.5em;}li{color:#94a3b8;line-height:1.8;}strong{color:#e2e8f0;}</style></head>' +
                            '<body><div class="proposal-wrap">' + html + '</div></body></html>';

                        /* Auto-save to disk */
                        saveResultToFile('proposal', clientName, fullHtml, 'Proposal');

                        var working = loadWorking();
                        var actualIdx = findWorkingIndex(cardData.id, working);
                        if (actualIdx >= 0) {
                            completeWorkingCard(actualIdx, { html: fullHtml, label: 'View Proposal' });
                        }
                    })
                    .catch(function(err) {
                        hideApiLoading(false, 'Pipeline: Proposal error');
                        var working = loadWorking();
                        var actualIdx = findWorkingIndex(cardData.id, working);
                        if (actualIdx >= 0) {
                            errorWorkingCard(actualIdx, err.message || 'API call failed');
                        }
                    });

                } else if (cardData.type === 'api-presentation') {
                    /* Generate presentation via Claude API */
                    var tileCount = (cardData.data && cardData.data.tileCount) || 4;
                    var focus = (cardData.data && cardData.data.focus) || '';
                    var ft = focus ? ' Focus on: ' + focus + '.' : ' Cover the campaign overview.';
                    var pt = 'Generate a professional presentation card in HTML for "Ahead Artist Solutions". ' +
                        'Client: "' + clientName + '".' + ft + ' ' +
                        'Dark Spotify-green aesthetic. Use inline styles. Background: #000. ' +
                        'Structure: label, h1 client name, divider, overview, ' + tileCount + ' styled cards. ' +
                        'Keep compact. Return ONLY inner HTML with inline styles.';

                    showApiLoading('Pipeline: Generating presentation for ' + clientName + '...', 'Working card executing');

                    callClaudeAPI({
                        prompt: pt,
                        maxTokens: 2500,
                        loadingMsg: 'Pipeline: Presentation for ' + clientName,
                        loadingSub: 'Card executing in Working row',
                        tag: 'PipelinePresentation'
                    })
                    .then(function(ph) {
                        hideApiLoading(true, 'Pipeline: Presentation ready for ' + clientName);

                        /* Save to localStorage (array format for P1-P8 gallery) */
                        var presKey = 'wingdash_presentations_' + clientName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                        try {
                            var pipePresArr = [];
                            var pipeRaw = localStorage.getItem(presKey);
                            if (pipeRaw) {
                                try { var pp = JSON.parse(pipeRaw); if (Array.isArray(pp)) pipePresArr = pp; } catch(pe) {
                                    pipePresArr = [{ title: clientName + ' - P1', html: pipeRaw, timestamp: '' }];
                                }
                            }
                            if (pipePresArr.length < 8) {
                                var pipeNow = new Date();
                                var pipeTsStr = pipeNow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + pipeNow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                pipePresArr.push({ title: clientName + ' - P' + (pipePresArr.length + 1), html: ph, timestamp: pipeTsStr });
                                localStorage.setItem(presKey, JSON.stringify(pipePresArr));
                            }
                            if (typeof window._updateJourneyPresState === 'function') window._updateJourneyPresState(clientName);
                        } catch(e) {}

                        /* Build full HTML doc */
                        var fullHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Presentation - ' + clientName + '</title>' +
                            '<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:system-ui,sans-serif;padding:3rem 2rem;background:#000;color:#fff;min-height:100vh;}.pres-wrap{max-width:900px;margin:0 auto;background:linear-gradient(135deg,#282828,#181818);border:1px solid rgba(255,255,255,0.07);border-radius:32px;padding:4rem 3.5rem;}</style></head>' +
                            '<body><div class="pres-wrap">' + ph + '</div></body></html>';

                        /* Auto-save to disk */
                        saveResultToFile('presentation', clientName, fullHtml, 'Presentation');

                        var working = loadWorking();
                        var actualIdx = findWorkingIndex(cardData.id, working);
                        if (actualIdx >= 0) {
                            completeWorkingCard(actualIdx, { html: fullHtml, label: 'View Presentation' });
                        }
                    })
                    .catch(function(err) {
                        hideApiLoading(false, 'Pipeline: Presentation error');
                        var working = loadWorking();
                        var actualIdx = findWorkingIndex(cardData.id, working);
                        if (actualIdx >= 0) {
                            errorWorkingCard(actualIdx, err.message || 'API call failed');
                        }
                    });
                }
            }

            /* ── Template jobs: generate HTML from template, auto-complete ── */
            function executeTemplateJob(cardData, workingIdx) {
                var clientName = (cardData.data && cardData.data.clientName) || cardData.client || '';
                var cardTitle = (cardData.data && cardData.data.cardTitle) || clientName + ' Payment Card';

                showApiLoading('Pipeline: Generating payment card for ' + clientName + '...', 'Building template');

                /* Brief delay for visual feedback */
                setTimeout(function() {
                    try {
                        /* Pull services from campaigns localStorage */
                        var services = [];
                        try {
                            var rows = JSON.parse(localStorage.getItem('wingdash_campaigns')) || [];
                            services = rows.filter(function(r) {
                                return (r.clientName || '').toLowerCase().trim() === clientName.toLowerCase().trim();
                            }).map(function(r) {
                                return {
                                    name: r.orderName || r.orderDetails || 'Service',
                                    id: r.orderId || '',
                                    payment: r.paymentStatus || '',
                                    amount: r.paymentAmount || '',
                                    details: r.orderDetails || ''
                                };
                            });
                        } catch(e) {}

                        /* Generate payment card HTML (inline template) */
                        var now = new Date();
                        var dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                        var timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                        var servicesHTML = '';
                        var totalAmount = 0;
                        if (services.length > 0) {
                            services.forEach(function(s, i) {
                                var price = 0;
                                var priceMatch = (s.details || '').match(/\$?([\d,]+\.?\d*)/);
                                if (priceMatch) price = parseFloat(priceMatch[1].replace(/,/g, ''));
                                totalAmount += price;
                                servicesHTML += '<tr><td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#b3b3b3;">' + (i+1) + '</td>' +
                                    '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-weight:500;">' + (s.name||'Service') + '</td>' +
                                    '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#b3b3b3;">' + (s.details||'\u2014') + '</td>' +
                                    '<td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#1DB954;font-weight:600;text-align:right;">$' + (price>0?price.toLocaleString('en-US',{minimumFractionDigits:2}):'0.00') + '</td></tr>';
                            });
                        } else {
                            servicesHTML = '<tr><td colspan="4" style="padding:20px;color:#727272;text-align:center;">No services added yet</td></tr>';
                        }

                        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + cardTitle + '</title>' +
                            '<style>@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");' +
                            '*{margin:0;padding:0;box-sizing:border-box}body{background:#000;font-family:"Inter",system-ui,sans-serif;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}' +
                            '.card{max-width:640px;width:100%;background:linear-gradient(135deg,#181818,#121212);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden}' +
                            '.card-header{padding:2rem 2rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);position:relative}' +
                            '.card-header::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#1DB954,#1ed760,#1DB954)}' +
                            '.card-label{font-size:0.625rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#727272;margin-bottom:0.75rem}' +
                            '.card-client{font-size:1.75rem;font-weight:700;color:#fff}.card-date{font-size:0.75rem;color:#727272;margin-top:0.5rem}' +
                            '.card-body{padding:1.5rem 2rem}table{width:100%;border-collapse:collapse;margin-bottom:1.5rem}' +
                            'th{padding:10px 16px;text-align:left;font-size:0.625rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#727272;border-bottom:1px solid rgba(255,255,255,0.1)}' +
                            'th:last-child{text-align:right}' +
                            '.total-row{display:flex;justify-content:space-between;padding:1rem 1.25rem;background:rgba(29,185,84,0.08);border:1px solid rgba(29,185,84,0.2);border-radius:12px;margin-bottom:1.5rem}' +
                            '.total-label{font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#b3b3b3}' +
                            '.total-amount{font-size:1.5rem;font-weight:700;color:#1DB954}' +
                            '.card-footer{padding:1.25rem 2rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between}' +
                            '.brand{font-size:0.625rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#727272}.brand-accent{color:#1DB954}' +
                            '</style></head><body><div class="card"><div class="card-header"><div class="card-label">Payment Card</div>' +
                            '<div class="card-client">' + clientName + '</div><div class="card-date">' + dateStr + ' \u00b7 ' + timeStr + '</div></div>' +
                            '<div class="card-body"><table><thead><tr><th>#</th><th>Service</th><th>Details</th><th>Amount</th></tr></thead>' +
                            '<tbody>' + servicesHTML + '</tbody></table>' +
                            '<div class="total-row"><span class="total-label">Total Due</span><span class="total-amount">$' + totalAmount.toLocaleString('en-US',{minimumFractionDigits:2}) + '</span></div>' +
                            '</div><div class="card-footer"><span class="brand"><span class="brand-accent">Ahead</span> Artist Solutions</span>' +
                            '<span style="font-size:0.6rem;color:#3f3f46;font-family:monospace;">PC-' + Date.now() + '</span></div></div></body></html>';

                        /* Store in localStorage */
                        var storageKey = 'wingdash_payment_cards_' + clientName.replace(/\s+/g, '_').toLowerCase();
                        var saved = [];
                        try { saved = JSON.parse(localStorage.getItem(storageKey)) || []; } catch(e) { saved = []; }
                        saved.push({ title: cardTitle, html: html, timestamp: new Date().toISOString() });
                        localStorage.setItem(storageKey, JSON.stringify(saved));

                        /* Auto-save to disk */
                        saveResultToFile('payment', clientName, html, cardTitle);

                        hideApiLoading(true, 'Pipeline: Payment card ready');

                        var working = loadWorking();
                        var actualIdx = findWorkingIndex(cardData.id, working);
                        if (actualIdx >= 0) {
                            completeWorkingCard(actualIdx, { html: html, label: 'View Payment' });
                        }
                    } catch(err) {
                        hideApiLoading(false, 'Pipeline: Payment card error');
                        var working2 = loadWorking();
                        var actualIdx2 = findWorkingIndex(cardData.id, working2);
                        if (actualIdx2 >= 0) {
                            errorWorkingCard(actualIdx2, err.message || 'Template generation failed');
                        }
                    }
                }, 400);
            }

            /* ── Find card index in working array by ID ── */
            function findWorkingIndex(cardId, working) {
                if (!working) working = loadWorking();
                for (var i = 0; i < working.length; i++) {
                    if (working[i].id === cardId) return i;
                }
                return -1;
            }

            /* ══════════════════════════════════════════════
               GO BUTTON — Move Recent → Working + Execute
            ══════════════════════════════════════════════ */
            if (goBtn) {
                goBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var reports = loadReports();
                    if (reports.length === 0) return;

                    var working = loadWorking();

                    /* Flash the Go button green */
                    goBtn.classList.add('go-flash');
                    setTimeout(function() { goBtn.classList.remove('go-flash'); }, 600);

                    /* Move reports into working (fill available slots) */
                    var available = MAX_SLOTS - working.length;
                    if (available <= 0) {
                        console.log('[Pipeline] Working slots full \u2014 finish or wait for jobs');
                        return;
                    }

                    var toMove = reports.splice(0, available);
                    for (var i = 0; i < toMove.length; i++) {
                        toMove[i].startedAt = new Date().toISOString();
                        toMove[i].jobStatus = 'running';
                        working.push(toMove[i]);
                    }

                    saveReports(reports);
                    saveWorking(working);

                    /* Render: Recent empties, Working fills */
                    renderSlots(reports, false);
                    renderWorkingSlots(working, true);
                    savePipelineState();

                    console.log('[Pipeline] Moved', toMove.length, 'cards to Working \u2014 executing jobs...');

                    /* Execute each moved card's job */
                    for (var j = 0; j < toMove.length; j++) {
                        (function(card) {
                            /* Stagger starts slightly for visual effect */
                            setTimeout(function() {
                                var w = loadWorking();
                                var idx = findWorkingIndex(card.id, w);
                                if (idx >= 0 && w[idx].jobStatus === 'running') {
                                    executeJob(card, idx);
                                }
                            }, j * 150);
                        })(toMove[j]);
                    }
                });
            }

            /* ══════════════════════════════════════════════
               PUBLIC punchReport() — lands cards in Recent
            ══════════════════════════════════════════════ */
            window.punchReport = function(opts) {
                if (!opts || !opts.action) return;

                var report = {
                    id: genId(),
                    action: opts.action,
                    client: opts.client || '\u2014',
                    color: opts.color || (ACTION_META[opts.action] || {}).color || '#94a3b8',
                    icon: (ACTION_META[opts.action] || {}).icon || '\u2022',
                    timestamp: new Date().toISOString(),
                    type: opts.type || 'instant-add-client',
                    data: opts.data || {}
                };

                var reports = loadReports();

                /* If 5 slots full, animate the exit of the oldest before removing */
                if (reports.length >= MAX_SLOTS) {
                    var slots = slotsContainer.querySelectorAll('.punch-report-slot');
                    var lastSlot = slots[MAX_SLOTS - 1];
                    if (lastSlot) {
                        var exitingCard = lastSlot.querySelector('.punch-report-card');
                        if (exitingCard) {
                            exitingCard.classList.add('exiting');
                        }
                    }
                    /* Remove oldest after exit animation */
                    setTimeout(function() {
                        var current = loadReports();
                        if (current.length > MAX_SLOTS) {
                            current = current.slice(0, MAX_SLOTS);
                            saveReports(current);
                        }
                        renderSlots(current, false);
                    }, 300);
                }

                /* Prepend new report (newest first) */
                reports.unshift(report);
                if (reports.length > MAX_SLOTS) reports = reports.slice(0, MAX_SLOTS);
                saveReports(reports);

                /* Render with slide-in animation on newest */
                renderSlots(reports, true);

                /* Auto-expand the clamp zone to show the new report */
                expandClamp();

                savePipelineState();
                console.log('[Pipeline] Punched:', report.action, report.client, '(' + report.type + ')');
            };

            /* ══════════════════════════════════════════════
               RESTORE — load pipeline from localStorage on page load
            ══════════════════════════════════════════════ */
            var savedReports = loadReports();
            var savedWorking = loadWorking();
            var savedComplete = loadComplete();

            /* Clean up any stale "running" states from previous session
               (API calls that were in-flight when page closed) */
            var workingChanged = false;
            for (var wi = 0; wi < savedWorking.length; wi++) {
                if (savedWorking[wi].jobStatus === 'running') {
                    savedWorking[wi].jobStatus = 'error';
                    savedWorking[wi].errorMsg = 'Interrupted \u2014 page was closed';
                    workingChanged = true;
                }
            }
            if (workingChanged) saveWorking(savedWorking);

            if (savedReports.length > 0) {
                renderSlots(savedReports, false);
            }
            if (savedWorking.length > 0) {
                renderWorkingSlots(savedWorking, false);
            }
            if (savedComplete.length > 0) {
                renderCompleteSlots(savedComplete, false);
            }

            updateGoBtn();

            console.log('[Pipeline] Initialized \u2014 Recent:', savedReports.length, 'Working:', savedWorking.length, 'Complete:', savedComplete.length);
        })();


    
        /* ══════════════════════════════════════════════
           C1 — Push Notification Protocol
           ══════════════════════════════════════════════ */
        (function initNotificationProtocol() {
            var NOTIF_KEY = 'wingdash_notifications';
            var NOTIF_TYPES = {
                campaign_update:    { icon: '&#x1F4E2;', color: '#0ea5e9', label: 'Campaign Update' },
                payment_received:   { icon: '&#x1F4B0;', color: '#10b981', label: 'Payment Received' },
                campaign_complete:  { icon: '&#x2705;',  color: '#22c55e', label: 'Campaign Complete' },
                milestone_hit:      { icon: '&#x1F3AF;', color: '#f59e0b', label: 'Milestone Hit' }
            };

            /* Notification payload schema:
               {
                   id: string,
                   type: 'campaign_update' | 'payment_received' | 'campaign_complete' | 'milestone_hit',
                   title: string,
                   body: string,
                   clientId: string | null,
                   campaignId: string | null,
                   timestamp: ISO string,
                   read: boolean,
                   meta: {} (arbitrary)
               }
            */

            function loadNotifications() {
                try { return JSON.parse(localStorage.getItem(NOTIF_KEY) || '[]'); }
                catch(e) { return []; }
            }
            function saveNotifications(arr) {
                localStorage.setItem(NOTIF_KEY, JSON.stringify(arr));
            }

            /* Public API — accessible from anywhere in the app */
            window.WingNotify = {
                TYPES: NOTIF_TYPES,

                send: function(type, title, body, opts) {
                    opts = opts || {};
                    var notif = {
                        id: 'n_' + Date.now() + '_' + Math.random().toString(36).substr(2,5),
                        type: type,
                        title: title,
                        body: body || '',
                        clientId: opts.clientId || null,
                        campaignId: opts.campaignId || null,
                        timestamp: new Date().toISOString(),
                        read: false,
                        meta: opts.meta || {}
                    };
                    var all = loadNotifications();
                    all.unshift(notif);
                    if (all.length > 200) all = all.slice(0, 200);
                    saveNotifications(all);

                    /* Dispatch custom event for same-origin listeners */
                    window.dispatchEvent(new CustomEvent('wingdash-notification', { detail: notif }));

                    /* Also update localStorage flag for cross-tab propagation */
                    localStorage.setItem('wingdash_notif_ping', notif.id);
                    console.log('[Notify]', type, title);
                    return notif;
                },

                list: function(opts) {
                    opts = opts || {};
                    var all = loadNotifications();
                    if (opts.unreadOnly) all = all.filter(function(n) { return !n.read; });
                    if (opts.type) all = all.filter(function(n) { return n.type === opts.type; });
                    if (opts.clientId) all = all.filter(function(n) { return n.clientId === opts.clientId; });
                    return all;
                },

                markRead: function(id) {
                    var all = loadNotifications();
                    all.forEach(function(n) { if (n.id === id) n.read = true; });
                    saveNotifications(all);
                },

                markAllRead: function() {
                    var all = loadNotifications();
                    all.forEach(function(n) { n.read = true; });
                    saveNotifications(all);
                },

                unreadCount: function() {
                    return loadNotifications().filter(function(n) { return !n.read; }).length;
                },

                clear: function() {
                    saveNotifications([]);
                }
            };

            /* Cross-tab listener — detect notifications from other tabs/windows */
            window.addEventListener('storage', function(e) {
                if (e.key === 'wingdash_notif_ping' && e.newValue) {
                    var all = loadNotifications();
                    var latest = all[0];
                    if (latest) {
                        window.dispatchEvent(new CustomEvent('wingdash-notification', { detail: latest }));
                    }
                }
            });

            console.log('[Notify] Protocol initialized. Use WingNotify.send(type, title, body)');
        })();

    