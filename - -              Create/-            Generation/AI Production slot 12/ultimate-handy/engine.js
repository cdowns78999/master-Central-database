/* 🧠 ENGINE.JS: ULTIMATE HANDY EVOLUTION 12.0 - GOD-MODE EDITION */

window.state = {
    isLocked: false,
    rank: 'ROOKIE',
    points: 42,
    level: 1,
    cards: []
};

const DRIVES = [
    { id: 'release', label: 'RELEASE', icon: '🎵', color: '#00F2FF', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' },
    { id: 'social', label: 'SOCIAL', icon: '📱', color: '#FF00CC', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80' },
    { id: 'goal', label: 'GOAL', icon: '🏆', color: '#FFCB05', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' },
    { id: 'lab', label: 'LAB', icon: '🧪', color: '#6e48aa', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80' },
    { id: 'asset', label: 'ASSET', icon: '📦', color: '#00F2FF', img: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80' },
    { id: 'predict', label: 'PREDICT', icon: '🔮', color: '#FF7F50', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' }
];

const ANOMALY_MESSAGES = ["BREACH", "LOGIC ERROR", "TIMELINE FIX", "QUANTUM SYNC", "SYSTEM GLITCH", "DATA CORRUPT"];

const RANKS = ["ROOKIE", "PRO", "ELITE", "COMMANDER"];

window.engine = {
    initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 20 + 's';
            p.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(p);
        }
    },

    add() {
        if (window.state.isLocked) {
            this.triggerErrorFeedback();
            return;
        }
        
        const id = Date.now();
        window.navigator.vibrate?.(15);
        
        window.state.cards.unshift({
            id,
            status: 'wizard',
            driveIdx: 0,
            step: -1,
            data: {
                title: '',
                caption: '',
                selectedDate: '24',
                selectedTime: '12:00'
            }
        });
        
        this.render();
    },

    toggleLock() {
        window.state.isLocked = !window.state.isLocked;
        window.navigator.vibrate?.([30, 10, 30]);

        const dot = document.getElementById('lock-dot');
        const pill = document.getElementById('lock-pill');

        if (dot) {
            dot.className = window.state.isLocked ? 'status-dot active' : 'status-dot unlocked';
        }
        if (pill) {
            if (window.state.isLocked) {
                pill.classList.add('locked');
            } else {
                pill.classList.remove('locked');
            }
        }

        this.render();
    },

    next(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (!card) return;

        const el = document.getElementById(`card-${id}`);
        if (el) el.style.transform = 'scale(1.05)';

        setTimeout(() => {
            if (el) el.style.transform = 'scale(1)';
            card.step++;
            
            if (card.step > 3) {
                card.status = 'baked';
                this.executeAnomaly();
                this.updateXP(25, el);
            }
            
            this.render();
        }, 150);
    },

    reverse(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (card && card.step > -1) {
            card.step--;
            this.render();
        }
    },

    updateDrive(id, dir) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.driveIdx = (card.driveIdx + dir + DRIVES.length) % DRIVES.length;
            this.render();
        }
    },

    setData(id, key, val) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.data[key] = val;
            if (key.startsWith('selected')) this.render();
        }
    },

    delete(id) {
        if (window.state.isLocked) return;
        window.navigator.vibrate?.(12);
        window.state.cards = window.state.cards.filter(c => c.id !== id);
        this.render();
    },

    updateXP(amt, originEl) {
        window.state.points += amt;

        if (originEl) {
            this.spawnXPPopup(amt, originEl);
        }

        const newLevel = Math.floor(window.state.points / 100) + 1;
        if (newLevel > window.state.level) {
            window.state.level = newLevel;
            this.triggerLevelUp();
        }
        
        this.updateRankUI();
    },

    spawnXPPopup(amt, el) {
        const rect = el.getBoundingClientRect();
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.innerText = `+${amt} XP`;
        popup.style.left = `${rect.left + rect.width / 2}px`;
        popup.style.top = `${rect.top}px`;
        document.getElementById('xp-popups').appendChild(popup);
        setTimeout(() => popup.remove(), 1200);
    },

    updateRankUI() {
        window.state.rank = RANKS[Math.min(window.state.level - 1, 3)];

        const badge = document.getElementById('rank-badge');
        const fill = document.getElementById('xp-fill');
        const percent = document.getElementById('xp-percent');

        if (badge) badge.innerText = window.state.rank;
        
        const xpPercent = window.state.points % 100;
        if (fill) fill.style.width = `${xpPercent}%`;
        if (percent) percent.innerText = `${xpPercent}%`;
    },

    executeAnomaly() {
        const overlay = document.getElementById('anomaly-overlay');
        const text = document.getElementById('anomaly-text');

        if (!overlay || !text) return;

        text.innerText = ANOMALY_MESSAGES[Math.floor(Math.random() * ANOMALY_MESSAGES.length)];

        const tilt = (Math.random() * 10 - 5).toFixed(1);
        text.style.transform = `rotate(${tilt}deg)`;

        overlay.style.display = 'flex';
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        document.body.style.animation = 'shake 0.1s infinite';

        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.filter = 'none';
            document.body.style.animation = 'none';
        }, 400);
    },

    triggerLevelUp() {
        const flash = document.getElementById('level-flash');
        if (flash) {
            flash.classList.add('active');
            setTimeout(() => flash.classList.remove('active'), 700);
        }
        
        window.navigator.vibrate?.([50, 30, 50, 30, 100]);
    },

    triggerErrorFeedback() {
        window.navigator.vibrate?.(50);
        const pill = document.getElementById('lock-pill');
        if (pill) {
            pill.style.animation = 'shake 0.3s 2';
            setTimeout(() => pill.style.animation = '', 600);
        }
    },

    render() {
        const mount = document.getElementById('stage-mount');
        if (!mount) return;

        this.updateRankUI();

        if (window.state.cards.length === 0) {
            mount.innerHTML = `
                <div class="handy-card construction-card" onclick="engine.add()">
                    <div>⚡</div>
                    <h2>INITIALIZE COMMAND</h2>
                    <p>Tap to deploy mission-critical utility drives</p>
                    <div class="tech-id">ENGINE: ULTIMATE-12.0</div>
                </div>
            `;
            return;
        }

        mount.innerHTML = window.state.cards.map((card, idx) => `
            <article id="card-${card.id}" class="handy-card ${card.status === 'wizard' ? 'active-wizard' : ''}" style="z-index: ${200 - idx};">
                <div class="card-shine"></div>
                ${this.renderCardContent(card)}
            </article>
        `).join('');
    },

    renderCardContent(card) {
        const drive = DRIVES[card.driveIdx];

        if (card.status === 'wizard') {
            return this.renderWizard(card, drive);
        } else {
            return this.renderBaked(card, drive);
        }
    },

    renderWizard(card, drive) {
        if (card.step === -1) {
            return `
                <div class="swift-wizard">
                    <div class="step-indicator">
                        <span class="step-label">SELECTION MODE</span>
                    </div>
                    <div class="question-text">CHOOSE UTILITY DRIVE</div>
                    <div class="carousel-container">
                        <button class="carousel-btn" onclick="engine.updateDrive(${card.id}, -1)">‹</button>
                        <div class="carousel-active">
                            <div class="carousel-icon">${drive.icon}</div>
                            <div class="carousel-label">${drive.label}</div>
                        </div>
                        <button class="carousel-btn" onclick="engine.updateDrive(${card.id}, 1)">›</button>
                    </div>
                    <div class="wizard-footer">
                        <div class="dots-progress">
                            <div class="dot active"></div>
                            ${[0, 1, 2, 3].map(() => `<div class="dot"></div>`).join('')}
                        </div>
                        <button class="proceed-btn" onclick="engine.next(${card.id})">INITIALIZE</button>
                    </div>
                </div>
            `;
        }

        const steps = [
            { q: 'MISSION TITLE', k: 'title', type: 'text', placeholder: 'Enter campaign name...' },
            { q: 'TARGET DATE', k: 'date', type: 'date' },
            { q: 'TARGET TIME', k: 'time', type: 'time' },
            { q: 'MISSION BRIEF', k: 'caption', type: 'text', placeholder: 'Operational parameters...' }
        ];

        const cur = steps[card.step];
        let inputHtml = '';

        if (cur.type === 'date') {
            const days = [
                { d: 'MON', n: '20' }, { d: 'TUE', n: '21' }, { d: 'WED', n: '22' },
                { d: 'THU', n: '23' }, { d: 'FRI', n: '24' }, { d: 'SAT', n: '25' }, { d: 'SUN', n: '26' }
            ];
            inputHtml = `
                <div class="date-grid">
                    ${days.map(d => `
                        <div class="date-pill ${card.data.selectedDate === d.n ? 'active' : ''}" onclick="engine.setData(${card.id}, 'selectedDate', '${d.n}')">
                            <span class="dp-day">${d.d}</span>
                            <span class="dp-num">${d.n}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (cur.type === 'time') {
            const times = ['09:00', '12:00', '15:00', '18:00', '21:00'];
            inputHtml = `
                <div class="date-grid">
                    ${times.map(t => `
                        <div class="date-pill ${card.data.selectedTime === t ? 'active' : ''}" style="flex: 0 0 100px; height: 60px;" onclick="engine.setData(${card.id}, 'selectedTime', '${t}')">
                            <span class="dp-num" style="font-size: 0.9rem;">${t}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            inputHtml = `
                <input type="text" class="premium-input" 
                    value="${card.data[cur.k]}" 
                    placeholder="${cur.placeholder}"
                    onchange="engine.setData(${card.id}, '${cur.k}', this.value)"
                    onkeydown="if(event.key==='Enter') engine.next(${card.id})"
                    autofocus>
            `;
        }

        return `
            <div class="swift-wizard">
                <div class="step-indicator">
                    <span class="step-label">PHASE 0${card.step + 1} / 04</span>
                    <button class="reverse-btn" onclick="engine.reverse(${card.id})">REVERSE</button>
                </div>
                <div class="question-text">${cur.q}</div>
                ${inputHtml}
                <div class="wizard-footer">
                    <div class="dots-progress">
                        <div class="dot"></div>
                        ${[0, 1, 2, 3].map(i => `<div class="dot ${card.step === i ? 'active' : ''}"></div>`).join('')}
                    </div>
                    <button class="proceed-btn" onclick="engine.next(${card.id})">PROCEED</button>
                </div>
            </div>
        `;
    },

    renderBaked(card, drive) {
        const dateStr = `APRIL ${card.data.selectedDate}, 2026`;
        const timeStr = `${card.data.selectedTime} UTC`;

        return `
            <div class="ticket-inner">
                ${!window.state.isLocked ? `<button class="delete-btn" onclick="engine.delete(${card.id})">✕</button>` : ''}
                
                <div class="ticket-visual">
                    <img src="${drive.img}" alt="visual">
                    <div class="visual-overlay"></div>
                    <div class="type-tag" style="color: ${drive.color}">${drive.label} ENGINE</div>
                    <div>
                        <h2>${card.data.title || 'Inbound Mission'}</h2>
                    </div>
                </div>

                <div class="ticket-bottom">
                    <div class="ticket-info-row">
                        <div class="info-item">
                            <label>STAMP</label>
                            <value>${dateStr}</value>
                        </div>
                        <div class="info-item" style="text-align: right;">
                            <label>CYCLE</label>
                            <value>${timeStr}</value>
                        </div>
                    </div>

                    <div class="mission-brief">
                        <label>MISSION BRIEFING</label>
                        <p>${card.data.caption || 'Operational parameters established. Standby for deployment into the stream.'}</p>
                    </div>

                    <div class="barcode-area">
                        <img src="https://www.cognex.com/api/Sitecore/Barcode/GetBarcode?text=ULT-HANDY-887-${~~(card.id / 10000)}&height=50&width=300&type=Code128" class="barcode-img" alt="barcode">
                        <span class="barcode-id">ID: 887-HANDY-ALPHA-${card.id % 10000}</span>
                    </div>
                </div>

                ${window.state.isLocked ? `
                    <div style="padding: 24px; background: #fff;">
                        <button class="proceed-btn" style="width: 100%; height: 60px; font-size: 0.9rem; letter-spacing: 2px;" onclick="engine.updateXP(100, this.parentElement); engine.delete(${card.id})">MISSION COMPLETE</button>
                    </div>
                ` : ''}
            </div>
        `;
    }
};

// Inject keyframes if not present
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
`;
document.head.appendChild(style);
