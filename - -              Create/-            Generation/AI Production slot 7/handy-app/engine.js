/* 🧠 ENGINE.JS: THE ULTIMATE HANDY "FIDELITY" DRIVE (200-POINT VERSION) */

window.state = {
    isLocked: false,
    rank: 'ROOKIE',
    points: 45,
    level: 1,
    cards: []
};

// 46. Type Icons & Specific Colors
const TILE_TYPES = [
    { id: 'release', label: 'Release', icon: '🎵', color: 'var(--accent-cyan)' },
    { id: 'social', label: 'Social', icon: '📱', color: 'var(--accent-pink)' },
    { id: 'milestone', label: 'Goal', icon: '🏆', color: 'var(--accent-yellow)' },
    { id: 'lab', label: 'Laboratory', icon: '🧪', color: '#9D50BB' },
    { id: 'deliver', label: 'Asset', icon: '📦', color: '#00F2FF' },
    { id: 'predict', label: 'Predictor', icon: '🔮', color: '#FF7F50' }
];

window.engine = {
    add() {
        if (window.state.isLocked) {
            this.triggerErrorFeedback(); // 190. Error Pulse
            return;
        }
        const id = Date.now();
        window.state.cards.push({
            id,
            status: 'wizard',
            typeIndex: 1,
            step: -1,
            data: {
                title: '',
                date: '',
                time: '',
                caption: '',
                platform: 'IG',
                contentType: 'Post',
                selectedDate: null,
                selectedTime: null
            }
        });
        this.render();
    },

    toggleLock() {
        window.state.isLocked = !window.state.isLocked;
        window.navigator.vibrate?.([30, 10, 30]); // 38. Haptic Vibrate
        this.render();
        // 37. Focus mode mesh dimming is handled via body class in CSS
        document.body.classList.toggle('focus-mode', window.state.isLocked);
    },

    next(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (!card) return;

        // 39 & 158. Zoom-In Pop / Wizard Complete Pop
        const el = document.getElementById(`card-${id}`);
        if (el) el.style.transform = 'scale(1.05)';

        setTimeout(() => {
            if (el) el.style.transform = 'scale(1)';
            card.step++;
            if (card.step > 3) {
                card.status = 'baked';
                this.triggerAnomaly();
                this.updateRank(25); // 168. XP Gain
            }
            this.render();
        }, 150);
    },

    prev(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (card && card.step > -1) {
            card.step--;
            this.render();
        }
    },

    updateType(id, dir) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.typeIndex = (card.typeIndex + dir + TILE_TYPES.length) % TILE_TYPES.length;
            this.render();
        }
    },

    updateData(id, key, val) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.data[key] = val;
            if (key === 'selectedDate' || key === 'selectedTime') this.render();
        }
    },

    delete(id) {
        if (window.state.isLocked) return;
        window.navigator.vibrate?.(10); // 112. Vibrate on delete
        window.state.cards = window.state.cards.filter(c => c.id !== id);
        this.render();
    },

    updateRank(change) {
        window.state.points += change;
        // 163. Level Threshold Logic
        const nextLevel = Math.floor(window.state.points / 100) + 1;
        if (nextLevel > window.state.level) {
            window.state.level = nextLevel;
            this.triggerLevelUp(); // 169. Level Up Flash
        }
        this.render();
    },

    triggerAnomaly() {
        const overlay = document.getElementById('anomaly-overlay');
        const text = document.getElementById('anomaly-text');
        if (!overlay) return;

        // 187. Anomaly Messages
        const msgs = ["BREACH", "LOGIC ERROR", "TIMELINE FIX", "SYSTEM OVERRIDE"];
        text.innerText = msgs[Math.floor(Math.random() * msgs.length)];

        // 173. Random Tilt
        const tilt = (Math.random() * 10 - 5).toFixed(2);
        text.style.transform = `rotate(${tilt}deg)`;

        overlay.style.display = 'flex';
        document.body.style.filter = 'invert(1) hue-rotate(180deg)'; // 174 & 175
        document.body.classList.add('shaking'); // 176. Shake Intensity

        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.filter = 'none';
            document.body.classList.remove('shaking');
        }, 400);
    },

    triggerLevelUp() {
        const flash = document.createElement('div');
        flash.className = 'level-up-flash'; // 169. Gold Flash
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);
    },

    triggerErrorFeedback() {
        window.navigator.vibrate?.(50); // 190. Long pulse on error
        const pill = document.querySelector('.focus-pill');
        if (pill) {
            pill.style.animation = 'shake 0.2s 3';
            setTimeout(() => pill.style.animation = '', 600);
        }
    },

    render() {
        const mount = document.getElementById('stage-mount');
        if (!mount) return;

        // 88. Update rank/badge in header
        const ranks = ["ROOKIE", "PRO", "ELITE", "COMMANDER"];
        const rankIdx = Math.min(window.state.level - 1, ranks.length - 1);
        const rankName = ranks[rankIdx];

        const badge = document.getElementById('rank-badge');
        if (badge) badge.innerText = rankName;

        const fill = document.getElementById('xp-fill');
        if (fill) fill.style.width = (window.state.points % 100) + '%';

        mount.innerHTML = `
            ${window.state.cards.map((card, idx) => `
                <div id="card-${card.id}" class="handy-card ${card.status === 'wizard' ? 'active-wizard' : ''}" 
                     style="z-index:${100 - idx}; transform: scale(${card.status === 'baked' ? 1 : 1});">
                    <div class="card-shine"></div>
                    ${this.renderCardContent(card)}
                </div>
            `).join('')}

            ${window.state.cards.length === 0 ? `
                <div class="handy-card init-card" onclick="engine.add()">
                    <div class="init-icon">⚡</div>
                    <span class="init-text">INITIALIZE COMMAND</span>
                </div>
            ` : ''}
        `;
    },

    renderCardContent(card) {
        const type = TILE_TYPES[card.typeIndex];

        if (card.status === 'wizard') {
            if (card.step === -1) {
                // 138-144. TYPE CAROUSEL
                return `
                    <div class="swift-wizard">
                        <div class="wizard-label">CHOOSE UTILITY DRIVE</div>
                        <div class="carousel-container">
                            <button class="nav-arrow" onclick="engine.updateType(${card.id}, -1)">‹</button>
                            <div class="carousel-main">
                                <div class="carousel-icon" style="text-shadow: 0 0 30px ${type.color}66;">${type.icon}</div>
                                <div class="carousel-label" style="color:${type.color};">${type.label}</div>
                            </div>
                            <button class="nav-arrow" onclick="engine.updateType(${card.id}, 1)">›</button>
                        </div>
                        <button class="btn-next primary-action" onclick="engine.next(${card.id})">INITIALIZE →</button>
                    </div>
                `;
            } else {
                // 145-157. WIZARD STEPS
                const steps = [
                    { label: 'MISSION TITLE', key: 'title', type: 'text', placeholder: 'e.g. Midnight Release' },
                    { label: 'TARGET DATE', key: 'date', type: 'special-date' },
                    { label: 'TARGET TIME', key: 'time', type: 'special-time' },
                    { label: 'MISSION BRIEF', key: 'caption', type: 'text', placeholder: 'Explain the goal...' }
                ];
                const curr = steps[card.step];

                let inputHtml = '';
                if (curr.type === 'special-date') {
                    // 146-148. VERTICAL DATE PILLS
                    const dates = [
                        { d: 'Thu', n: '21' }, { d: 'Fri', n: '22' }, { d: 'Sat', n: '23' }, { d: 'Sun', n: '24' }
                    ];
                    inputHtml = `
                        <div class="date-selector">
                            ${dates.map(d => `
                                <div class="date-pill ${card.data.selectedDate === d.n ? 'active' : ''}" 
                                     onclick="engine.updateData(${card.id}, 'selectedDate', '${d.n}')">
                                    <div class="day">${d.d}</div>
                                    <div class="num">${d.n}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                } else if (curr.type === 'special-time') {
                    // 149-150. HORIZONTAL TIME PILLS
                    const times = ['16:00', '17:00', '18:00', '19:00', '20:00'];
                    inputHtml = `
                        <div class="time-selector">
                            ${times.map(t => `
                                <div class="time-pill ${card.data.selectedTime === t ? 'active' : ''}" 
                                     onclick="engine.updateData(${card.id}, 'selectedTime', '${t}')">
                                    ${t}
                                </div>
                            `).join('')}
                        </div>
                    `;
                } else {
                    inputHtml = `
                        <input type="${curr.type}" class="handy-input" 
                               placeholder="${curr.placeholder}"
                               onchange="engine.updateData(${card.id}, '${curr.key}', this.value)"
                               onkeydown="if(event.key==='Enter') engine.next(${card.id})" 
                               value="${card.data[curr.key]}" autofocus>
                    `;
                }

                return `
                    <div class="swift-wizard">
                        <div class="wizard-header">
                            <div class="wizard-label">STEP ${card.step + 1} / 4</div>
                            <button class="btn-reverse" onclick="engine.prev(${card.id})">← REVERSE</button>
                        </div>
                        <div class="wizard-question">${curr.label}</div>
                        
                        ${inputHtml}

                        <div class="carousel-nav">
                            <div class="dots-indicator">
                                ${[0, 1, 2, 3].map(i => `<div class="dot ${card.step === i ? 'active' : ''}"></div>`).join('')}
                            </div>
                            <button class="btn-next" onclick="engine.next(${card.id})">PROCEED →</button>
                        </div>
                    </div>
                `;
            }
        } else {
            // 81-120. BAKED STATE (TICKET HIGH-FIDELITY)
            return `
                <div class="baked-content">
                    ${!window.state.isLocked ? `
                        <button class="btn-delete" onclick="engine.delete(${card.id})">✕</button>
                    ` : ''}
                    
                    <div class="baked-header">
                        <div class="baked-info">
                            <div class="baked-type-label" style="color: ${type.color};">${type.label} BAKED</div>
                            <h2 class="baked-title">${card.data.title || 'Untitled Mission'}</h2>
                        </div>
                        <div class="baked-main-icon" style="filter: drop-shadow(0 0 15px ${type.color}44);">${type.icon}</div>
                    </div>
                    
                    <div class="baked-meta">
                        <div class="meta-pill">📅 ${card.data.selectedDate ? 'April ' + card.data.selectedDate : (card.data.date || 'TBD')}</div>
                        <div class="meta-pill">⏰ ${card.data.selectedTime || card.data.time || '--:--'}</div>
                    </div>

                    <p class="baked-brief" style="border-left-color: ${type.color};">${card.data.caption || 'No briefing documented...'}</p>

                    <div class="utility-barcode">|| ||| | ||| || ||| | ||| || ||| | |||</div>

                    ${window.state.isLocked ? `
                        <button onclick="engine.updateRank(100); engine.delete(${card.id})" class="btn-complete">MISSION COMPLETE</button>
                    ` : ''}
                </div>
            `;
        }
    }
};
