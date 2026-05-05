/**
 * StoneTile Class - Modular "God-Mode" Component
 * Encapsulates interaction logic, carousel physics, and data management.
 */

class StoneTile {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`[StoneTile] Container #${containerId} not found.`);
            return;
        }

        this.id = containerId;
        this.data = options.data || this.getDefaultData();
        this.contacts = options.contacts || [];
        this.currentSlide = 0;
        this.currentCat = 'press';
        this.currentSongIndex = 0;
        this.totalSlides = 2; // Default for current template

        // Physics
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.targetX = 0;
        this.velocityX = 0;
        this.lastX = 0;
        this.lastTime = 0;
        this.animating = false;

        this.init();
    }

    getDefaultData() {
        return {
            press: [{ name: 'New Project', reachout: '—', first: 'MM.DD', last: 'MM.DD', method: '—', followup: '0 Pending', completed: false, contacts: [] }],
            spotify: [{ name: 'New Project', reachout: '—', first: 'MM.DD', last: 'MM.DD', method: '—', followup: '0 Pending', completed: false, contacts: [] }],
            social: [{ name: 'New Project', reachout: '—', first: 'MM.DD', last: 'MM.DD', method: '—', followup: '0 Pending', completed: false, contacts: [] }],
            other: [{ name: 'New Project', reachout: '—', first: 'MM.DD', last: 'MM.DD', method: '—', followup: '0 Pending', completed: false, contacts: [] }]
        };
    }

    init() {
        this.render();
        this.setupEventListeners();
        this.applyMomentum();
    }

    render() {
        const song = this.data[this.currentCat][this.currentSongIndex];

        this.container.innerHTML = `
            <div class="stone-card ${song.completed ? 'completed' : ''}" id="${this.id}-card">
                <div class="card-header">
                    <div class="card-name">
                        <div class="card-icon">💎</div>
                        <div class="card-titles">
                            <span class="card-super-title">Return To Grace</span>
                            <span class="card-title">${song.name}</span>
                        </div>
                    </div>
                    <div class="card-status">
                        <div class="status-dot"></div>
                        <span>Active</span>
                    </div>
                </div>

                <div class="fields-wrapper">
                    <div class="fields-carousel" id="${this.id}-carousel">
                        <!-- Slide 1 -->
                        <div class="fields-slide" data-slide="0" data-cols="3">
                            <div class="field" data-span="2">
                                <div class="field-label">Reach Out</div>
                                <div class="field-value">${song.reachout}</div>
                            </div>
                            <div class="field complete-field" onclick="${this.id}.toggleComplete()">
                                <div class="field-label">Done</div>
                                <div class="check-box"></div>
                            </div>
                            <div class="field">
                                <div class="field-label">First</div>
                                <div class="field-value">${song.first}</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Last</div>
                                <div class="field-value">${song.last}</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Contact</div>
                                <div class="field-value">${song.method}</div>
                            </div>
                        </div>
                        <!-- Slide 2 -->
                        <div class="fields-slide" data-slide="1" data-cols="3">
                            <div class="field">
                                <div class="field-label">Follow Up</div>
                                <div class="field-value">${song.followup}</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Notes</div>
                                <div class="field-value">Click to add...</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Priority</div>
                                <div class="field-value">High</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="carousel-dots">
                    <div class="stone-dot active" data-slide="0"></div>
                    <div class="stone-dot" data-slide="1"></div>
                </div>

                <div class="category-bar">
                    ${['press', 'spotify', 'social', 'other'].map(cat => `
                        <button class="cat-btn ${this.currentCat === cat ? 'active' : ''}" data-cat="${cat}">
                            <div class="cat-btn-inner">
                                <span class="cat-label">${cat}</span>
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Carousel Drag
        const wrapper = this.container.querySelector('.fields-wrapper');
        const carousel = this.container.querySelector('.fields-carousel');

        wrapper.addEventListener('mousedown', e => {
            this.isDragging = true;
            this.startX = e.clientX;
            this.lastX = e.clientX;
            this.lastTime = Date.now();
            this.velocityX = 0;

            if (!this.animating) {
                this.animating = true;
                this.applyMomentum();
            }
        });

        window.addEventListener('mousemove', e => {
            if (!this.isDragging) return;
            const now = Date.now();
            const dt = now - this.lastTime;
            if (dt > 0) this.velocityX = (e.clientX - this.lastX) * 0.3;
            this.targetX = this.currentX + (e.clientX - this.startX);
            this.startX = e.clientX;
            this.lastX = e.clientX;
            this.lastTime = now;
        });

        window.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                this.velocityX *= 1.5;
            }
        });

        // Category Switches
        this.container.querySelectorAll('.cat-btn').forEach(btn => {
            btn.onclick = () => this.setCategory(btn.dataset.cat);
        });
    }

    applyMomentum() {
        if (!this.animating) return;
        const carousel = this.container.querySelector('.fields-carousel');
        const wrapper = this.container.querySelector('.fields-wrapper');
        const slideWidth = wrapper.offsetWidth;

        if (this.isDragging) {
            this.currentX += (this.targetX - this.currentX) * 0.25;
        } else {
            this.targetX += this.velocityX;
            this.velocityX *= 0.92;
            this.currentX += (this.targetX - this.currentX) * 0.12;

            if (Math.abs(this.velocityX) < 0.5 && Math.abs(this.currentX - this.targetX) < 1) {
                const index = Math.round(-this.currentX / slideWidth);
                const clamped = Math.max(0, Math.min(index, this.totalSlides - 1));
                this.targetX = -clamped * slideWidth;
                if (Math.abs(this.currentX - this.targetX) < 0.5) this.animating = false;
            }
        }

        carousel.style.transform = `translateX(${this.currentX}px)`;
        this.updateDots();
        requestAnimationFrame(() => this.applyMomentum());
    }

    updateDots() {
        const wrapper = this.container.querySelector('.fields-wrapper');
        const slideIndex = Math.round(-this.currentX / wrapper.offsetWidth);
        const clamped = Math.max(0, Math.min(slideIndex, this.totalSlides - 1));
        this.container.querySelectorAll('.stone-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === clamped);
        });
    }

    setCategory(cat) {
        this.currentCat = cat;
        this.render();
        this.setupEventListeners();
    }

    toggleComplete() {
        const song = this.data[this.currentCat][this.currentSongIndex];
        song.completed = !song.completed;
        this.render();
        this.setupEventListeners();
    }
}

// Global hook for events in HTML strings
window.StoneTile = StoneTile;
