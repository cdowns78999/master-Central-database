/**
 * StoneTile Component
 * Reusable tile class extracted from Official Tile.html
 *
 * Usage:
 *   const tile = new StoneTile('Artist Name', document.getElementById('container'));
 *
 * Each tile instance manages its own state and DOM independently.
 */

class StoneTile {
    constructor(name, container, options = {}) {
        this.id = 'tile-' + Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.container = container;
        this.options = {
            superTitle: options.superTitle || 'Campaign',
            onDelete: options.onDelete || null,
            ...options
        };

        // State
        this.currentSlide = 0;
        this.currentCat = 'press';
        this.currentSongIndices = { press: 0, spotify: 0, social: 0, other: 0 };
        this.categorySortOrders = { press: 'none', spotify: 'none', social: 'none', other: 'none' };
        this.contactSortOrder = 'none';
        this.totalSlides = 2;

        // Carousel physics state
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.targetX = 0;
        this.velocityX = 0;
        this.lastX = 0;
        this.lastTime = 0;
        this.animating = false;
        this.slideWidth = 0;

        // Physics constants
        this.friction = 0.92;
        this.lerp = 0.12;
        this.velocityScale = 0.3;

        // Data (Default)
        this.projectData = {
            press: [{ name: 'Song 1', reachout: 'Email Pitch Sent', first: '01.10', last: '01.22', method: 'Email', followup: '3 Pending', completed: false, contacts: [] }],
            spotify: [{ name: 'Song 1', reachout: 'Playlist Submitted', first: '01.12', last: '01.24', method: 'Portal', followup: '1 Pending', completed: false, contacts: [] }],
            social: [{ name: 'Song 1', reachout: 'DM Campaign Active', first: '01.15', last: '01.25', method: 'DM', followup: '5 Pending', completed: false, contacts: [] }],
            other: [{ name: 'Item 1', reachout: 'Misc Outreach', first: '01.05', last: '01.20', method: 'Various', followup: '0 Pending', completed: false, contacts: [] }]
        };

        // Full contact database per category
        this.contactDB = {
            press: [
                'CULTR - CULTR', 'Patrick - Earmilk', 'Will - Magnetic Mag', 'Petey - Magnetic Mag',
                'Kat - iHouseU.com', 'Connor - MP3MAG', 'Laury - Music Crowns', 'Joe - FlexMusicBlog',
                'Andrea - Knockturnal', 'Dylan - Salacious Sounds', 'Mark, Ariana - Nocturnal Times',
                'Joe - iHouseU.com', 'Max - RunTheTrap', 'Bobby - EDM Army', 'Mark - DjLifeMag',
                'Vianney - DataTransmission', 'Mary - iHeartRaves', 'Dylan - EDM House Network',
                'Vianney - DancingAstronaut.com', 'Alshaan - WeRaveYou - Solo', 'Alshaan - WeRaveYou - Round Up',
                'Branka - WeRaveYou Solo', 'Andrew / You - EDMTunes', 'Danae / Grant - EDMIdentity',
                'Sam - EDMManiac', 'Colin - FuxWithIt', 'Hayden - Electric Hawk', 'Angel - OneEDM',
                'New person - YourEDM', 'RaverRafting - RaverRafting', 'By The Wavs - FreshNewTracks',
                'Aiden - Earmilk (via Alshaan)', 'Mike - ThisSongISSick', 'Cameron - EDM.com',
                'Nick - EDM.com', 'sEAN / Bailie - River Beats', 'Bobby - ThatDrop', 'Nate - Vent Magazine',
                'Instagram Contact - DJMag Germany', 'Franz - MP3MAG', 'Ashley - Exron Music',
                'Nate - FlexMusicBlog', 'Marko - RaveJungle', 'Diana - EDMSauce',
                'Connor - iEDM', 'Tina - DanceMusicNW.com', 'Andrew - DanceRebel.com',
                '? - EDMUnplugged', 'Michael - Relentless Beats'
            ],
            spotify: ['Peter', 'Brandon', 'Tyler'],
            social: ['Influencer X', 'TikTok Star Y', 'Agency Z', 'Vibe Agency', 'Trend Setter', 'Viral Reach'],
            other: ['General Manager', 'Booking Agent', 'Legal Team', 'Accountant', 'Road Manager', 'Studio Owner']
        };

        // If data is provided, override defaults
        if (options.data) {
            this.projectData = options.data;
        } else if (options.projectData) {
            this.projectData = options.projectData;
        }

        // Build the tile
        this.render();
        this.bindEvents();

        // If full state is provided, set it
        if (options.fullState) {
            this.setData(options.fullState);
        } else {
            this.updateCardDisplay();
        }
    }

    render() {
        const tile = document.createElement('div');
        tile.className = 'stone-tile';
        tile.id = this.id;
        tile.innerHTML = `
            <div class="tile-overlay" data-overlay></div>

            <!-- Header -->
            <div class="tile-header">
                <div class="tile-name">
                    <div class="tile-icon">🎵</div>
                    <div class="tile-titles">
                        <span class="tile-super-title" contenteditable="true">${this.options.superTitle}</span>
                        <span class="tile-title" data-title contenteditable="false">${this.name}</span>
                    </div>
                </div>
                <div class="tile-status">
                    <div class="status-dot"></div>
                    <span>Active</span>
                </div>
                <button class="tile-delete-btn" data-delete-tile title="Delete Card">×</button>
            </div>

            <!-- Fields Carousel -->
            <div class="fields-wrapper" data-wrapper>
                <div class="fields-carousel" data-carousel>
                    <!-- Slide 1 -->
                    <div class="fields-slide" data-slide="0" data-cols="3">
                        <div class="field" data-span="2" data-field="reachout">
                            <div class="field-label">Reach Out</div>
                            <div class="field-value" data-val="reachout" contenteditable="false">Email Pitch Sent</div>
                        </div>
                        <div class="field complete-field" data-complete>
                            <div>
                                <div class="field-label">Done</div>
                            </div>
                            <div class="check-box"></div>
                        </div>
                        <div class="field" data-field="first">
                            <div class="field-label">First</div>
                            <div class="field-value" data-val="first" contenteditable="false">01.10</div>
                        </div>
                        <div class="field" data-field="last">
                            <div class="field-label">Last</div>
                            <div class="field-value" data-val="last" contenteditable="false">01.22</div>
                        </div>
                        <div class="field" data-field="method">
                            <div class="field-label">Contact</div>
                            <div class="field-value" data-val="method" contenteditable="false">Email</div>
                        </div>
                    </div>

                    <!-- Slide 2 -->
                    <div class="fields-slide" data-slide="1" data-cols="3">
                        <div class="field" data-field="followup">
                            <div class="field-label">Follow Up</div>
                            <div class="field-value" data-val="followup" contenteditable="false">3 Pending</div>
                        </div>
                        <div class="field" data-field="notes">
                            <div class="field-label">Notes</div>
                            <div class="field-value" contenteditable="false">Click to add...</div>
                        </div>
                        <div class="field" data-field="priority">
                            <div class="field-label">Priority</div>
                            <div class="field-value" contenteditable="false">High</div>
                        </div>
                        <div class="field add-field" data-span="3" data-add-field>
                            <div class="field-label" style="text-align: center; margin: 0;">+ Add Field</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contacts Zone -->
            <div class="contact-zone" data-contact-zone>
                <div class="contact-header">
                    <div class="contact-label">Assign Contact</div>
                    <div class="add-contact-btn" data-add-contact title="Add Contact"></div>
                    <div class="contact-picker" data-contact-picker></div>
                </div>
                <div class="contact-tags" data-contact-tags></div>
            </div>

            <!-- Carousel Dots -->
            <div class="carousel-dots">
                <div class="dot active" data-dot="0"></div>
                <div class="dot" data-dot="1"></div>
            </div>

            <!-- Category Bar -->
            <div class="category-bar">
                <button class="cat-btn active" data-cat="press">
                    <div class="cat-btn-inner">
                        <span class="cat-label">Press</span>
                    </div>
                    <div class="dropup" data-dropup="press">
                        <div class="dropup-header">Press Songs</div>
                        <div class="dropup-list"></div>
                    </div>
                </button>

                <button class="cat-btn" data-cat="spotify">
                    <div class="cat-btn-inner">
                        <span class="cat-label">Spotify</span>
                    </div>
                    <div class="dropup" data-dropup="spotify">
                        <div class="dropup-header">Spotify Songs</div>
                        <div class="dropup-list"></div>
                    </div>
                </button>

                <button class="cat-btn" data-cat="social">
                    <div class="cat-btn-inner">
                        <span class="cat-label">Social</span>
                    </div>
                    <div class="dropup" data-dropup="social">
                        <div class="dropup-header">Social Songs</div>
                        <div class="dropup-list"></div>
                    </div>
                </button>

                <button class="cat-btn" data-cat="other">
                    <div class="cat-btn-inner">
                        <span class="cat-label">Other</span>
                    </div>
                    <div class="dropup" data-dropup="other">
                        <div class="dropup-header">Other Items</div>
                        <div class="dropup-list"></div>
                    </div>
                </button>
            </div>
        `;

        this.container.appendChild(tile);
        this.element = tile;

        // Cache DOM references
        this.dom = {
            carousel: tile.querySelector('[data-carousel]'),
            wrapper: tile.querySelector('[data-wrapper]'),
            overlay: tile.querySelector('[data-overlay]'),
            contactZone: tile.querySelector('[data-contact-zone]'),
            contactTags: tile.querySelector('[data-contact-tags]'),
            contactPicker: tile.querySelector('[data-contact-picker]'),
            title: tile.querySelector('[data-title]')
        };

        this.slideWidth = this.dom.wrapper.offsetWidth;
    }

    bindEvents() {
        const tile = this.element;

        // Delete tile button
        tile.querySelector('[data-delete-tile]').addEventListener('click', () => {
            if (this.options.onDelete) {
                this.options.onDelete(this);
            }
            this.element.remove();
        });

        // Category buttons
        tile.querySelectorAll('.cat-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleDropup(btn, e));
        });

        // Overlay click to close
        this.dom.overlay.addEventListener('click', () => this.closeAllDropups());

        // Complete toggle
        tile.querySelector('[data-complete]').addEventListener('click', () => this.toggleComplete());

        // Add contact button
        tile.querySelector('[data-add-contact]').addEventListener('click', (e) => this.toggleContactPicker(e));

        // Dots
        tile.querySelectorAll('[data-dot]').forEach(dot => {
            dot.addEventListener('click', () => this.goToSlide(parseInt(dot.dataset.dot)));
        });

        // Carousel drag events
        this.bindCarouselEvents();

        // Field editing
        tile.querySelectorAll('.field-value[contenteditable]').forEach(el => {
            this.initFieldEditing(el, 'field');
        });

        // Title editing
        this.initFieldEditing(this.dom.title, 'name');

        // SuperTitle editing
        const superTitleEl = tile.querySelector('.tile-super-title');
        if (superTitleEl) {
            this.initFieldEditing(superTitleEl, 'superTitle');
        }
    }

    bindCarouselEvents() {
        const wrapper = this.dom.wrapper;

        // Prevent context menu
        wrapper.addEventListener('contextmenu', e => e.preventDefault());

        // Mouse events
        wrapper.addEventListener('mousedown', e => {
            if (e.button === 2 || e.button === 0) {
                this.isDragging = true;
                this.startX = e.clientX;
                this.lastX = e.clientX;
                this.lastTime = Date.now();
                this.velocityX = 0;
                wrapper.style.cursor = 'grabbing';

                if (!this.animating) {
                    this.animating = true;
                    this.animate();
                }
            }
        });

        document.addEventListener('mousemove', e => {
            if (!this.isDragging) return;

            const now = Date.now();
            const dt = now - this.lastTime;

            if (dt > 0) {
                this.velocityX = (e.clientX - this.lastX) * this.velocityScale;
            }

            this.targetX = this.currentX + (e.clientX - this.startX);
            this.startX = e.clientX;
            this.lastX = e.clientX;
            this.lastTime = now;
        });

        document.addEventListener('mouseup', e => {
            if (this.isDragging) {
                this.isDragging = false;
                wrapper.style.cursor = '';
                this.velocityX *= 1.5;
            }
        });

        // Touch events
        wrapper.addEventListener('touchstart', e => {
            this.isDragging = true;
            this.startX = e.touches[0].clientX;
            this.lastX = this.startX;
            this.lastTime = Date.now();
            this.velocityX = 0;

            if (!this.animating) {
                this.animating = true;
                this.animate();
            }
        }, { passive: true });

        wrapper.addEventListener('touchmove', e => {
            if (!this.isDragging) return;

            const touch = e.touches[0];
            const now = Date.now();
            const dt = now - this.lastTime;

            if (dt > 0) {
                this.velocityX = (touch.clientX - this.lastX) * this.velocityScale;
            }

            this.targetX = this.currentX + (touch.clientX - this.startX);
            this.startX = touch.clientX;
            this.lastX = touch.clientX;
            this.lastTime = now;
        }, { passive: true });

        wrapper.addEventListener('touchend', () => {
            this.isDragging = false;
            this.velocityX *= 1.5;
        });
    }

    animate() {
        if (!this.animating) return;

        if (this.isDragging) {
            this.currentX += (this.targetX - this.currentX) * 0.25;
        } else {
            this.targetX += this.velocityX;
            this.velocityX *= this.friction;
            this.currentX += (this.targetX - this.currentX) * this.lerp;

            if (Math.abs(this.velocityX) < 0.5 && Math.abs(this.currentX - this.targetX) < 1) {
                this.snapToNearestSlide();
                if (Math.abs(this.currentX - this.targetX) < 0.5) {
                    this.animating = false;
                }
            }
        }

        // Boundary resistance
        const maxX = 0;
        const minX = -this.slideWidth * (this.totalSlides - 1);

        if (this.currentX > maxX) {
            this.targetX = maxX;
            this.currentX += (maxX - this.currentX) * 0.3;
            this.velocityX *= 0.5;
        } else if (this.currentX < minX) {
            this.targetX = minX;
            this.currentX += (minX - this.currentX) * 0.3;
            this.velocityX *= 0.5;
        }

        this.dom.carousel.style.transform = `translateX(${this.currentX}px)`;
        this.updateDots();

        requestAnimationFrame(() => this.animate());
    }

    snapToNearestSlide() {
        const slideIndex = Math.round(-this.currentX / this.slideWidth);
        const clampedIndex = Math.max(0, Math.min(slideIndex, this.totalSlides - 1));
        this.targetX = -clampedIndex * this.slideWidth;
        this.currentSlide = clampedIndex;
    }

    updateDots() {
        const slideIndex = Math.round(-this.currentX / this.slideWidth);
        const clampedIndex = Math.max(0, Math.min(slideIndex, this.totalSlides - 1));
        this.element.querySelectorAll('[data-dot]').forEach((dot, i) => {
            dot.classList.toggle('active', i === clampedIndex);
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.targetX = -index * this.slideWidth;
        this.velocityX = 0;

        if (!this.animating) {
            this.animating = true;
            this.animate();
        }
    }

    toggleDropup(btn, e) {
        e.stopPropagation();
        const wasOpen = btn.classList.contains('open');
        const cat = btn.dataset.cat;

        this.closeAllDropups();

        if (!wasOpen) {
            this.renderDropupList(cat);
            btn.classList.add('open');
            this.dom.overlay.classList.add('active');
        }

        this.setCategory(cat);
    }

    closeAllDropups() {
        this.element.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('open'));
        this.dom.overlay.classList.remove('active');
        this.dom.contactPicker.classList.remove('active');
    }

    renderDropupList(cat) {
        const dropup = this.element.querySelector(`[data-dropup="${cat}"]`);
        const list = dropup.querySelector('.dropup-list');
        const header = dropup.querySelector('.dropup-header');

        // Add/Update Sort Toggle in Header
        let sortSpan = header.querySelector('.sort-toggle');
        if (!sortSpan) {
            sortSpan = document.createElement('span');
            sortSpan.className = 'sort-toggle';
            header.appendChild(sortSpan);
        }
        sortSpan.innerText = this.categorySortOrders[cat] === 'none' ? 'A-Z' : (this.categorySortOrders[cat] === 'asc' ? 'A-Z ↑' : 'Z-A ↓');
        sortSpan.onclick = (e) => this.toggleDatabaseSort(cat, e);

        list.innerHTML = '';

        // 'Add New' at the TOP
        const addBtn = document.createElement('div');
        addBtn.className = 'dropup-item add-item';
        addBtn.style.borderBottom = '1px solid var(--tile-surface)';
        addBtn.style.color = 'var(--tile-press)';
        addBtn.innerHTML = `<span class="icon">➕</span> Add New ${cat === 'other' ? 'Item' : 'Song'}`;
        addBtn.onclick = (e) => {
            e.stopPropagation();
            this.showInlineInput(addBtn, 'song', cat);
        };
        list.appendChild(addBtn);

        let songs = [...this.projectData[cat]];
        if (this.categorySortOrders[cat] === 'asc') {
            songs.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.categorySortOrders[cat] === 'desc') {
            songs.sort((a, b) => b.name.localeCompare(a.name));
        }

        songs.forEach((song) => {
            const index = this.projectData[cat].indexOf(song);
            const item = document.createElement('div');
            item.className = 'dropup-item';
            if (index === this.currentSongIndices[cat]) {
                item.style.background = 'rgba(255,255,255,0.05)';
            }

            item.innerHTML = `
                <span class="icon">${song.completed ? '✅' : '💿'}</span>
                <span style="flex: 1;">${song.name}</span>
                <div class="delete-btn" data-delete-song="${index}" data-cat="${cat}">×</div>
            `;

            // Click to select
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-btn')) return;
                e.stopPropagation();
                this.selectSong(cat, index);
                this.closeAllDropups();
            });

            // Delete button
            const deleteBtn = item.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                this.handleTripleDelete(e, deleteBtn, 'song', index, cat);
            });

            list.appendChild(item);
        });
    }

    toggleDatabaseSort(cat, e) {
        e.stopPropagation();
        if (cat === 'contact') {
            if (this.contactSortOrder === 'none' || this.contactSortOrder === 'desc') {
                this.contactSortOrder = 'asc';
            } else {
                this.contactSortOrder = 'desc';
            }
            // Re-render contact picker
            this.dom.contactPicker.classList.remove('active');
            this.toggleContactPicker(e);
        } else {
            if (this.categorySortOrders[cat] === 'none' || this.categorySortOrders[cat] === 'desc') {
                this.categorySortOrders[cat] = 'asc';
            } else {
                this.categorySortOrders[cat] = 'desc';
            }
            this.renderDropupList(cat);
        }
    }

    showInlineInput(el, type, cat) {
        const container = document.createElement('div');
        container.className = 'inline-add-container';

        const input = document.createElement('input');
        input.className = 'inline-input';
        input.placeholder = type === 'song' ? 'Enter name...' : 'First Name - Outlet';

        input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                const val = input.value.trim();
                if (val) {
                    if (type === 'song') {
                        const newEntry = {
                            name: val,
                            reachout: 'New Outreach',
                            first: 'MM.DD',
                            last: 'MM.DD',
                            method: 'Pending',
                            followup: '0 Pending',
                            completed: false,
                            contacts: []
                        };
                        this.projectData[cat].unshift(newEntry);
                        this.selectSong(cat, 0);
                        this.closeAllDropups();
                    } else {
                        // Add to database
                        if (!this.contactDB[this.currentCat].includes(val)) {
                            this.contactDB[this.currentCat].unshift(val);
                        }
                        this.addContact(val);
                        this.dom.contactPicker.classList.remove('active');
                    }
                }
            }
            if (e.key === 'Escape') {
                if (type === 'song') {
                    this.renderDropupList(cat);
                } else {
                    this.dom.contactPicker.classList.remove('active');
                    this.toggleContactPicker(e);
                }
            }
        };

        container.appendChild(input);
        el.replaceWith(container);
        input.focus();

        container.onclick = (e) => e.stopPropagation();
    }

    handleTripleDelete(e, btn, type, index, cat) {
        e.stopPropagation();

        let clicks = parseInt(btn.dataset.clicks || 0) + 1;
        btn.dataset.clicks = clicks;

        // Clear other buttons' warning states
        this.element.querySelectorAll('.delete-btn').forEach(b => {
            if (b !== btn) {
                b.classList.remove('warn-1', 'warn-2');
                b.dataset.clicks = 0;
            }
        });

        if (clicks === 1) {
            btn.classList.add('warn-1');
        } else if (clicks === 2) {
            btn.classList.remove('warn-1');
            btn.classList.add('warn-2');
        } else if (clicks === 3) {
            // EXECUTE DELETE
            if (type === 'song') {
                this.projectData[cat].splice(index, 1);
                if (this.currentSongIndices[cat] >= this.projectData[cat].length) {
                    this.currentSongIndices[cat] = Math.max(0, this.projectData[cat].length - 1);
                }
                if (this.projectData[cat].length === 0) {
                    this.projectData[cat].push({ name: 'New Entry', reachout: '—', first: 'MM.DD', last: 'MM.DD', method: 'Pending', followup: '0 Pending', completed: false, contacts: [] });
                    this.currentSongIndices[cat] = 0;
                }
                this.renderDropupList(cat);
                this.updateCardDisplay();
            } else {
                this.contactDB[this.currentCat].splice(index, 1);
                this.dom.contactPicker.classList.remove('active');
                this.toggleContactPicker(e);
            }
        }

        // Reset after 2 seconds
        clearTimeout(btn.deleteTimeout);
        btn.deleteTimeout = setTimeout(() => {
            btn.classList.remove('warn-1', 'warn-2');
            btn.dataset.clicks = 0;
        }, 2000);
    }

    setCategory(cat) {
        this.currentCat = cat;
        this.element.querySelectorAll('.cat-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === cat);
        });
        this.updateCardDisplay();
    }

    selectSong(cat, index) {
        this.currentSongIndices[cat] = index;
        this.setCategory(cat);
    }

    updateCardDisplay() {
        const cat = this.currentCat;
        const index = this.currentSongIndices[cat];
        const song = this.projectData[cat][index];

        if (!song) return;

        this.element.querySelector('[data-val="reachout"]').innerText = song.reachout;
        this.element.querySelector('[data-val="first"]').innerText = song.first;
        this.element.querySelector('[data-val="last"]').innerText = song.last;
        this.element.querySelector('[data-val="method"]').innerText = song.method;
        this.element.querySelector('[data-val="followup"]').innerText = song.followup;

        this.element.classList.toggle('completed', song.completed);
        this.renderContacts();
    }

    toggleComplete() {
        const song = this.projectData[this.currentCat][this.currentSongIndices[this.currentCat]];
        song.completed = !song.completed;
        this.updateCardDisplay();
    }

    toggleContactPicker(e) {
        e.stopPropagation();
        const picker = this.dom.contactPicker;
        const isActive = picker.classList.contains('active');

        if (!isActive) {
            let items = [...this.contactDB[this.currentCat]];

            // Apply sorting
            if (this.contactSortOrder === 'asc') {
                items.sort((a, b) => a.localeCompare(b));
            } else if (this.contactSortOrder === 'desc') {
                items.sort((a, b) => b.localeCompare(a));
            }

            let html = `
                <div class="picker-item add-item" data-add-new-contact style="border-bottom: 1px solid var(--tile-surface); color: var(--tile-press);">
                    <span class="icon">➕</span> Add New Contact
                </div>
                <div class="inline-add-container" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px 6px;">
                    <span style="font-size: 9px; color: var(--tile-text-dim);">SORT</span>
                    <span class="sort-toggle" data-sort-contacts>
                        ${this.contactSortOrder === 'none' ? 'A-Z' : (this.contactSortOrder === 'asc' ? 'A-Z ↑' : 'Z-A ↓')}
                    </span>
                </div>
            `;

            html += items.map((name, idx) => {
                const actualIdx = this.contactDB[this.currentCat].indexOf(name);
                return `<div class="picker-item" data-contact-name="${name.replace(/'/g, "\\'")}">
                    ${name}
                    <div class="delete-btn" data-delete-contact="${actualIdx}">×</div>
                </div>`;
            }).join('');

            picker.innerHTML = html;

            // Bind events
            picker.querySelector('[data-add-new-contact]').addEventListener('click', (e) => {
                e.stopPropagation();
                this.showInlineInput(picker.querySelector('[data-add-new-contact]'), 'contact', this.currentCat);
            });

            picker.querySelector('[data-sort-contacts]').addEventListener('click', (e) => {
                this.toggleDatabaseSort('contact', e);
            });

            picker.querySelectorAll('.picker-item[data-contact-name]').forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-btn')) return;
                    e.stopPropagation();
                    this.addContact(item.dataset.contactName);
                    picker.classList.remove('active');
                });

                const deleteBtn = item.querySelector('.delete-btn');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', (e) => {
                        const idx = parseInt(deleteBtn.dataset.deleteContact);
                        this.handleTripleDelete(e, deleteBtn, 'contact', idx, this.currentCat);
                    });
                }
            });
        }

        picker.classList.toggle('active');
    }

    addContact(name) {
        const song = this.projectData[this.currentCat][this.currentSongIndices[this.currentCat]];
        if (!song.contacts) song.contacts = [];
        if (!song.contacts.includes(name)) {
            song.contacts.push(name);
            this.renderContacts();
        }
    }

    removeContact(index, e) {
        e.stopPropagation();
        const song = this.projectData[this.currentCat][this.currentSongIndices[this.currentCat]];
        song.contacts.splice(index, 1);
        this.renderContacts();
    }

    renderContacts() {
        const zone = this.dom.contactZone;
        const tagsContainer = this.dom.contactTags;
        const song = this.projectData[this.currentCat][this.currentSongIndices[this.currentCat]];

        if (song) {
            zone.classList.add('active');
            tagsContainer.innerHTML = (song.contacts || []).map((name, i) => `
                <div class="tag-contact">
                    <span>${name}</span>
                    <div class="tag-remove" data-remove-contact="${i}">×</div>
                </div>
            `).join('');

            tagsContainer.querySelectorAll('[data-remove-contact]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.removeContact(parseInt(btn.dataset.removeContact), e);
                });
            });
        } else {
            zone.classList.remove('active');
        }
    }

    initFieldEditing(el, type = 'field') {
        el.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            el.contentEditable = 'true';
            el.classList.add('editing');
            el.focus();
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        });

        el.addEventListener('blur', () => {
            el.contentEditable = 'false';
            el.classList.remove('editing');

            if (type === 'name') {
                this.name = el.innerText;
            } else if (type === 'superTitle') {
                this.options.superTitle = el.innerText;
            } else {
                const fieldKey = el.dataset.val;
                if (fieldKey) {
                    const song = this.projectData[this.currentCat][this.currentSongIndices[this.currentCat]];
                    if (song) {
                        song[fieldKey] = el.innerText;
                    }
                }
            }
        });

        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); el.blur(); }
            if (e.key === 'Escape') el.blur();
        });
    }

    // Export data for saving
    getData() {
        return {
            id: this.id,
            name: this.name,
            superTitle: this.element.querySelector('.tile-super-title').innerText,
            projectData: this.projectData,
            contactDB: this.contactDB,
            currentCat: this.currentCat,
            currentSongIndices: this.currentSongIndices,
            categorySortOrders: this.categorySortOrders,
            contactSortOrder: this.contactSortOrder
        };
    }

    // Import data from save
    setData(data) {
        if (data.name) {
            this.name = data.name;
            this.dom.title.innerText = data.name;
        }
        if (data.superTitle) {
            this.element.querySelector('.tile-super-title').innerText = data.superTitle;
        }
        if (data.projectData) {
            this.projectData = data.projectData;
        }
        if (data.contactDB) {
            this.contactDB = data.contactDB;
        }
        if (data.currentCat) {
            this.currentCat = data.currentCat;
        }
        if (data.currentSongIndices) {
            this.currentSongIndices = data.currentSongIndices;
        }
        if (data.categorySortOrders) {
            this.categorySortOrders = data.categorySortOrders;
        }
        if (data.contactSortOrder) {
            this.contactSortOrder = data.contactSortOrder;
        }
        this.updateCardDisplay();
    }

    destroy() {
        this.element.remove();
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StoneTile;
}
