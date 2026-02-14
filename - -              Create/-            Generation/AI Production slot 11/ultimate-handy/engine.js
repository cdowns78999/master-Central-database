/* 🧠 ENGINE.JS: ULTIMATE-11.0 GOD-MODE EDITION */

window.state = {
    isLocked: false,
    rank: 'ROOKIE',
    points: 45,
    level: 1,
    cards: [],
    animationQueue: []
};

// 46 & 94-96. The 6-Utility Drive (Enhanced)
const DRIVES = [
    { id: 'release', label: 'Release', icon: '🎵', color: 'var(--accent-cyan)', gradient: 'linear-gradient(135deg, #00F2FF, #0099CC)' },
    { id: 'social', label: 'Social', icon: '📱', color: 'var(--accent-pink)', gradient: 'linear-gradient(135deg, #FF00CC, #FF6699)' },
    { id: 'milestone', label: 'Goal', icon: '🏆', color: 'var(--accent-gold)', gradient: 'linear-gradient(135deg, #FFCB05, #FF9500)' },
    { id: 'lab', label: 'The Lab', icon: '🧪', color: '#9D50BB', gradient: 'linear-gradient(135deg, #9D50BB, #6E48AA)' },
    { id: 'deliver', label: 'Asset', icon: '📦', color: 'var(--accent-green)', gradient: 'linear-gradient(135deg, #43E97B, #2ECC71)' },
    { id: 'predict', label: 'Predictor', icon: '🔮', color: '#FF7F50', gradient: 'linear-gradient(135deg, #FF7F50, #FF6347)' }
];

// Rank System (162. Names & 177. XP thresholds)
const RANK_SYSTEM = {
    names: ["ROOKIE", "PRO", "ELITE", "COMMANDER"],
    xpPerLevel: 100,
    bonusXP: {
        'ROOKIE': 25,
        'PRO': 35,
        'ELITE': 50,
        'COMMANDER': 75
    }
};

// Anomaly Messages (201-202)
const ANOMALY_MESSAGES = ["BREACH", "LOGIC ERROR", "TIMELINE FIX", "QUANTUM FLUX", "PARADOX DETECTED", "CAUSALITY LOOP"];

window.engine = {
    add() {
        if (window.state.isLocked) {
            this.showFloatingText("SYSTEM LOCKED", "error");
            window.navigator.vibrate?.(50); // 204. Error vibration
            return;
        }
        
        const id = Date.now();
        window.navigator.vibrate?.(10);
        
        // Create new card with enhanced data
        const newCard = {
            id,
            status: 'wizard',
            driveIdx: 1, // Default to Social
            step: -1,
            data: { 
                title: '', 
                caption: '', 
                selectedDate: '23', 
                selectedTime: '18:00',
                createdAt: new Date().toISOString()
            },
            zDepth: window.state.cards.length
        };
        
        window.state.cards.unshift(newCard); // Add to front for proper stacking
        this.animateCardEntry(id);
        this.render();
    },

    toggleLock() {
        window.state.isLocked = !window.state.isLocked;
        
        // 38 & 195. Enhanced haptic pattern
        window.navigator.vibrate?.([30, 10, 30, 10, 30]);
        
        const dot = document.getElementById('lock-dot');
        const pill = document.getElementById('lock-pill');
        const body = document.body;
        
        if (dot) dot.className = window.state.isLocked ? 'status-dot active' : 'status-dot';
        if (pill) {
            pill.classList.toggle('locked', window.state.isLocked);
            
            // 43. Focus mode - dim mesh when locked
            if (window.state.isLocked) {
                body.classList.add('focus-mode');
                this.showFloatingText("SYSTEM LOCKED", "system");
            } else {
                body.classList.remove('focus-mode');
                this.showFloatingText("SYSTEM UNLOCKED", "system");
            }
        }
        
        this.render();
    },

    next(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (!card) return;

        // 51. Zoom-in pop animation
        this.animateCardPop(id);

        setTimeout(() => {
            card.step++;
            if (card.step > 3) {
                this.bakeCard(id);
            }
            this.render();
        }, 200);
    },

    bakeCard(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (!card) return;

        card.status = 'baked';
        
        // 190-191. Trigger anomaly system
        this.triggerAnomaly();
        
        // 196. Award XP based on current rank
        const rankXP = RANK_SYSTEM.bonusXP[RANK_SYSTEM.names[Math.min(window.state.level - 1, 3)]] || 25;
        this.updateXP(rankXP, id);
        
        // 211-212. Reward sound simulation
        this.playRewardSound();
    },

    prev(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (card && card.step > -1) { 
            card.step--; 
            this.animateCardSlide(id, 'right');
            this.render(); 
        }
    },

    updateDrive(id, dir) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.driveIdx = (card.driveIdx + dir + DRIVES.length) % DRIVES.length;
            this.animateDriveChange(id);
            this.render();
        }
    },

    updateData(id, key, val) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.data[key] = val;
            
            // Auto-proceed on drive selection (172)
            if (key === 'driveIdx' && card.step === -1) {
                setTimeout(() => this.next(id), 300);
            }
            
            // Redraw for visual selections
            if (key.includes('selected')) this.render(); 
        }
    },

    delete(id) {
        if (window.state.isLocked) {
            this.showFloatingText("CANNOT DELETE - SYSTEM LOCKED", "error");
            return;
        }
        
        window.navigator.vibrate?.(10); // 112. Delete feedback
        
        // Animate card removal
        this.animateCardExit(id);
        
        setTimeout(() => {
            window.state.cards = window.state.cards.filter(c => c.id !== id);
            this.render();
        }, 300);
    },

    updateXP(amt, sourceId = null) {
        window.state.points += amt;
        
        // Show floating XP popup
        if (sourceId && amt > 0) {
            this.showFloatingXP(amt, sourceId);
        }
        
        const newLevel = Math.floor(window.state.points / RANK_SYSTEM.xpPerLevel) + 1;
        if (newLevel > window.state.level) {
            this.levelUp(newLevel);
        }
        
        this.render();
    },

    levelUp(newLevel) {
        const oldLevel = window.state.level;
        window.state.level = newLevel;
        
        const newRank = RANK_SYSTEM.names[Math.min(newLevel - 1, 3)];
        
        // 169. Level up flash
        this.triggerLevelFlash(newRank);
        
        // 198. Congrats flash for Elite rank
        if (newRank === 'ELITE' || newRank === 'COMMANDER') {
            this.triggerCongratsFlash();
        }
        
        this.showFloatingText(`${newRank} UNLOCKED!`, "rank");
    },

    triggerAnomaly() {
        const overlay = document.getElementById('anomaly-overlay');
        const text = document.getElementById('anomaly-text');
        const body = document.body;
        
        if (!overlay) return;

        // 202. Random anomaly message
        text.innerText = ANOMALY_MESSAGES[Math.floor(Math.random() * ANOMALY_MESSAGES.length)];

        // 187. Random tilt
        const tilt = (Math.random() * 10 - 5).toFixed(1);
        text.style.transform = `rotate(${tilt}deg)`;

        overlay.style.display = 'flex';
        
        // 188-189. Invert and hue shift
        body.style.filter = 'invert(1) hue-rotate(180deg)';
        body.style.animation = 'shake 0.1s infinite';

        setTimeout(() => {
            overlay.style.display = 'none';
            body.style.filter = 'none';
            body.style.animation = 'none';
        }, 400);
    },

    triggerLevelFlash(rank) {
        const overlay = document.getElementById('level-up-overlay');
        const title = document.getElementById('rank-title');
        
        if (overlay && title) {
            title.innerText = `${rank} UNLOCKED`;
            overlay.style.display = 'flex';
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                overlay.style.opacity = '1';
                overlay.style.transition = 'opacity 0.5s ease-out';
            }, 50);
            
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 2000);
        }
    },

    triggerCongratsFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            inset: 0;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%);
            z-index: 10003;
            pointer-events: none;
            opacity: 0;
            animation: congratsFlash 0.8s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 800);
    },

    showFloatingXP(amount, sourceId) {
        const container = document.getElementById('xp-popup-container');
        const cardElement = document.getElementById(`card-${sourceId}`);
        
        if (!container || !cardElement) return;
        
        const rect = cardElement.getBoundingClientRect();
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.textContent = `+${amount} XP`;
        popup.style.left = rect.left + rect.width / 2 + 'px';
        popup.style.top = rect.top + 'px';
        
        container.appendChild(popup);
        setTimeout(() => popup.remove(), 2000);
    },

    showFloatingText(text, type = 'info') {
        const container = document.getElementById('xp-popup-container');
        if (!container) return;
        
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.textContent = text;
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        
        // Color based on type
        if (type === 'error') {
            popup.style.color = 'var(--accent-hazard)';
        } else if (type === 'system') {
            popup.style.color = 'var(--accent-cyan)';
        } else if (type === 'rank') {
            popup.style.color = 'var(--accent-gold)';
        }
        
        container.appendChild(popup);
        setTimeout(() => popup.remove(), 2000);
    },

    // ===== ANIMATION HELPERS =====
    animateCardEntry(id) {
        const el = document.getElementById(`card-${id}`);
        if (el) {
            el.style.transform = 'scale(0.8) translateY(20px)';
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.transition = 'all 0.4s var(--spring-smooth)';
                el.style.transform = 'scale(1) translateY(0)';
                el.style.opacity = '1';
            }, 50);
        }
    },

    animateCardPop(id) {
        const el = document.getElementById(`card-${id}`);
        if (el) {
            el.style.transition = 'all 0.2s var(--spring-snappy)';
            el.style.transform = 'scale(1.05)';
        }
    },

    animateCardSlide(id, direction) {
        const el = document.getElementById(`card-${id}`);
        if (el) {
            el.style.transition = 'all 0.3s var(--spring-smooth)';
            if (direction === 'right') {
                el.style.transform = 'translateX(20px)';
            } else {
                el.style.transform = 'translateX(-20px)';
            }
        }
    },

    animateCardExit(id) {
        const el = document.getElementById(`card-${id}`);
        if (el) {
            el.style.transition = 'all 0.3s var(--spring-smooth)';
            el.style.transform = 'scale(0.9) translateY(-20px)';
            el.style.opacity = '0';
        }
    },

    animateDriveChange(id) {
        const el = document.getElementById(`card-${id}`);
        if (el) {
            el.style.transition = 'all 0.4s var(--spring-smooth)';
            el.style.transform = 'scale(0.95)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 200);
        }
    },

    playRewardSound() {
        // Simulate reward sound with visual feedback
        document.body.style.filter = 'brightness(1.2)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 100);
    },

    render() {
        const mount = document.getElementById('stage-mount');
        if (!mount) return;

        // 88 & 162. Refresh rank system
        const curRank = RANK_SYSTEM.names[Math.min(window.state.level - 1, 3)];
        const badge = document.getElementById('rank-badge');
        if (badge) badge.innerText = curRank;

        // XP bar with percentage
        const xpPercent = window.state.points % RANK_SYSTEM.xpPerLevel;
        const fill = document.getElementById('xp-fill');
        const percentage = document.getElementById('xp-percentage');
        if (fill) fill.style.width = xpPercent + '%';
        if (percentage) percentage.textContent = xpPercent + '%';

        // Render cards with proper z-index stacking
        mount.innerHTML = `
            ${window.state.cards.map((card, idx) => `
                <article id="card-${card.id}" class="handy-card ${card.status === 'wizard' ? 'active-wizard' : ''}" 
                         style="z-index: ${100 - idx};">
                    <div class="card-shine"></div>
                    ${this.renderContent(card)}
                </article>
            `).join('')}

            ${window.state.cards.length === 0 ? `
                <div class="handy-card" onclick="engine.add()" 
                     style="border: 2px dashed var(--glass-border); text-align: center; 
                            color: var(--text-muted); opacity: 0.7; cursor: pointer;
                            padding: 40px; min-height: 200px; display: flex; flex-direction: column;
                            align-items: center; justify-content: center;">
                    <div style="font-size: 3rem; margin-bottom: 15px; filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));">⚡</div>
                    <span style="font-weight: 900; font-size: 1rem; letter-spacing: 1px;">INITIALIZE COMMAND</span>
                    <span style="font-size: 0.75rem; margin-top: 8px; opacity: 0.7;">Tap to create your first mission</span>
                </div>
            ` : ''}
        `;

        // Re-apply animations after render
        setTimeout(() => {
            window.state.cards.forEach(card => {
                const el = document.getElementById(`card-${card.id}`);
                if (el && card.status === 'wizard' && card.step > -1) {
                    el.style.transform = 'scale(1)';
                    el.style.opacity = '1';
                }
            });
        }, 50);
    },

    renderContent(card) {
        const drive = DRIVES[card.driveIdx];

        if (card.status === 'wizard') {
            if (card.step === -1) {
                // Drive selection carousel
                return `
                    <div class="swift-wizard">
                        <div class="wizard-label">CHOOSE UTILITY DRIVE</div>
                        <div class="carousel-view">
                            <button onclick="engine.updateDrive(${card.id}, -1)" 
                                    class="carousel-nav carousel-prev">
                                ‹
                            </button>
                            <div class="carousel-center">
                                <div class="carousel-icon" style="background: ${drive.gradient};">
                                    ${drive.icon}
                                </div>
                                <div class="carousel-label">${drive.label}</div>
                                <div class="carousel-description">Advanced ${drive.label.toLowerCase()} systems</div>
                            </div>
                            <button onclick="engine.updateDrive(${card.id}, 1)" 
                                    class="carousel-nav carousel-next">
                                ›
                            </button>
                        </div>
                        <button class="btn-primary elite" onclick="engine.next(${card.id})">
                            INITIALIZE DRIVE
                        </button>
                    </div>
                `;
            } else {
                // Enhanced wizard steps
                const steps = [
                    { q: 'MISSION TITLE', k: 'title', t: 'text', placeholder: 'Enter mission designation...' },
                    { q: 'TARGET DATE', k: 'date', t: 'date-pills' },
                    { q: 'TARGET TIME', k: 'time', t: 'time-row' },
                    { q: 'MISSION BRIEF', k: 'caption', t: 'text', placeholder: 'Enter operational parameters...' }
                ];
                const cur = steps[card.step];
                
                let inputHtml = '';
                if (cur.t === 'date-pills') {
                    const days = [
                        { d: 'Thu', n: '21' }, 
                        { d: 'Fri', n: '22' }, 
                        { d: 'Sat', n: '23' }, 
                        { d: 'Sun', n: '24' }, 
                        { d: 'Mon', n: '25' }
                    ];
                    inputHtml = `
                        <div class="date-selector">
                            ${days.map(d => `
                                <div class="date-pill ${card.data.selectedDate === d.n ? 'active' : ''}" 
                                     onclick="engine.updateData(${card.id}, 'selectedDate', '${d.n}')">
                                    <div class="pill-day">${d.d}</div>
                                    <div class="pill-num">${d.n}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                } else if (cur.t === 'time-row') {
                    const times = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
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
                        <input type="text" class="handy-input" 
                               onchange="engine.updateData(${card.id}, '${cur.k}', this.value)" 
                               onkeydown="if(event.key==='Enter') engine.next(${card.id})" 
                               value="${card.data[cur.k] || ''}" 
                               placeholder="${cur.placeholder}" 
                               autofocus>
                    `;
                }

                return `
                    <div class="swift-wizard">
                        <div class="wizard-header">
                            <div class="wizard-label">STEP ${card.step + 1} / 4</div>
                            <button onclick="engine.prev(${card.id})" class="wizard-reverse">
                                REVERSE
                            </button>
                        </div>
                        <div class="wizard-question">${cur.q}</div>
                        ${inputHtml}
                        <div class="wizard-footer">
                            <div class="progress-dots">
                                ${[0, 1, 2, 3].map(i => `
                                    <div class="progress-dot ${card.step === i ? 'active' : ''}"></div>
                                `).join('')}
                            </div>
                            <button onclick="engine.next(${card.id})" class="btn-primary elite proceed">
                                PROCEED
                            </button>
                        </div>
                    </div>
                `;
            }
        } else {
            // Professional baked ticket
            return `
                <div class="ticket-card">
                    ${!window.state.isLocked ? `
                        <button onclick="engine.delete(${card.id})" class="delete-btn">
                            ✕
                        </button>
                    ` : ''}
                     
                    <div class="ticket-top">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" 
                             class="ticket-img">
                        <div class="ticket-overlay">
                            <div class="ticket-type" style="background: ${drive.gradient};">
                                ${drive.icon} ${drive.label}
                            </div>
                            <h2 class="ticket-title">${card.data.title || 'Inbound Mission'}</h2>
                        </div>
                    </div>
                     
                    <div class="ticket-inner">
                        <div class="ticket-bottom">
                            <div class="ticket-info-row">
                                <div class="info-item">
                                    <label>Date</label>
                                    <value>April ${card.data.selectedDate}, 2026</value>
                                </div>
                                <div class="info-item" style="text-align: right;">
                                    <label>Time</label>
                                    <value>${card.data.selectedTime}</value>
                                </div>
                            </div>
                            <div class="info-item">
                                <label>Briefing</label>
                                <p class="briefing-text">
                                    ${card.data.caption || 'Operational parameters established. Standby for deployment.'}
                                </p>
                            </div>
                            
                            <div class="barcode-area">
                                <img src="https://www.cognex.com/api/Sitecore/Barcode/GetBarcode?text=ULTIMATE-HANDY-CMD-${card.id}&height=60&width=300&type=Code128" 
                                     class="barcode-img">
                                <div class="barcode-text">ULTIMATE-HANDY-CMD-${card.id}</div>
                            </div>
                        </div>
                    </div>

                    ${window.state.isLocked ? `
                        <div class="mission-complete-section">
                            <button onclick="engine.updateXP(100, ${card.id}); engine.delete(${card.id})" 
                                    class="btn-primary elite mission-complete">
                                MISSION ACCOMPLISHED
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }
};

// Add required CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(1px, 1px); }
        20% { transform: translate(-3px, 0px); }
        40% { transform: translate(1px, -1px); }
        60% { transform: translate(-1px, 1px); }
        80% { transform: translate(1px, -2px); }
    }
    
    @keyframes flash {
        0% { opacity: 0.8; }
        100% { opacity: 0; }
    }
    
    @keyframes congratsFlash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    .focus-mode .mesh-bg {
        opacity: 0.2;
        filter: blur(80px);
    }
    
    .wizard-input:focus {
        outline: none;
        border-color: var(--accent-cyan);
        box-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
    }
`;
document.head.appendChild(styleSheet);