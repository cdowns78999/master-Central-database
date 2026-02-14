/* 🧠 ENGINE.JS: THE FROM-SCRATCH ULTIMATE DRIVE (V10.0) */

window.state = {
    isLocked: false,
    isHidden: false,
    rank: 'ROOKIE', // 162. Names
    points: 45,
    level: 1,
    cards: []
};

// 46 & 94-96. The 6-Utility Drive
const DRIVES = [
    { id: 'release', label: 'Release', icon: '🎵', color: 'var(--accent-cyan)' },
    { id: 'social', label: 'Social', icon: '📱', color: 'var(--accent-pink)' },
    { id: 'milestone', label: 'Goal', icon: '🏆', color: 'var(--accent-yellow)' },
    { id: 'lab', label: 'The Lab', icon: '🧪', color: '#9D50BB' },
    { id: 'deliver', label: 'Asset', icon: '📦', color: '#00F2FF' },
    { id: 'predict', label: 'Predictor', icon: '🔮', color: '#FF7F50' }
];

window.engine = {
    add() {
        if (window.state.isLocked) return;
        const id = Date.now();
        window.navigator.vibrate?.(10);
        window.state.cards.push({
            id,
            status: 'wizard',
            driveIdx: 1, // Default to Social
            step: -1,
            data: { title: '', caption: '', selectedDate: '23', selectedTime: '18:00' }
        });
        this.render();
    },

    toggleLock() {
        window.state.isLocked = !window.state.isLocked;
        window.navigator.vibrate?.([30, 10, 30]); // 38. Haptic Sequence
        const dot = document.getElementById('lock-dot');
        const pill = document.getElementById('lock-pill');
        if (dot) dot.className = window.state.isLocked ? 'status-dot active' : 'status-dot';
        if (pill) pill.style.borderColor = window.state.isLocked ? 'var(--accent-cyan)' : 'var(--glass-border)';
        this.render();
    },

    toggleHide() {
        window.state.isHidden = !window.state.isHidden;
        window.navigator.vibrate?.([30, 10, 30]); // 38. Haptic Sequence
        const hidePill = document.querySelector('.hide-pill');
        const hideIcon = document.querySelector('.hide-icon');
        const mount = document.getElementById('stage-mount');
        
        if (hidePill) {
            hidePill.style.borderColor = window.state.isHidden ? 'var(--accent-vibrant)' : 'var(--glass-border)';
            hideIcon.textContent = window.state.isHidden ? '🙈' : '👁️';
        }
        
        if (mount) {
            mount.style.display = window.state.isHidden ? 'none' : 'block';
        }
        
        // Also hide bottom nav when hidden
        const nav = document.querySelector('.bottom-nav');
        if (nav) {
            nav.style.display = window.state.isHidden ? 'none' : 'flex';
        }
    },

    next(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (!card) return;

        // 39 & 158. Zoom-In Pop Logic
        const el = document.getElementById(`card-${id}`);
        if (el) el.style.transform = 'scale(1.05)';

        setTimeout(() => {
            if (el) el.style.transform = 'scale(1)';
            card.step++;
            if (card.step > 3) {
                card.status = 'baked';
                this.triggerAnomaly();
                this.updateXP(25); // 168. Award
            }
            this.render();
        }, 150);
    },

    prev(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (card && card.step > -1) { card.step--; this.render(); }
    },

    updateDrive(id, dir) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.driveIdx = (card.driveIdx + dir + DRIVES.length) % DRIVES.length;
            this.render();
        }
    },

    updateData(id, key, val) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.data[key] = val;
            if (key.includes('selected')) this.render(); // Redraw for visual selection
        }
    },

    delete(id) {
        if (window.state.isLocked) return;
        window.navigator.vibrate?.(10); // 112. Click feedback
        window.state.cards = window.state.cards.filter(c => c.id !== id);
        this.render();
    },

    updateXP(amt) {
        window.state.points += amt;
        const level = Math.floor(window.state.points / 100) + 1;
        if (level > window.state.level) {
            window.state.level = level;
            this.triggerLevelFlash(); // 169. Gold Flash
        }
        this.render();
    },

    triggerAnomaly() {
        const overlay = document.getElementById('anomaly-overlay');
        const text = document.getElementById('anomaly-text');
        if (!overlay) return;

        // 187 & 188. Anomaly Logic
        const msgs = ["BREACH", "LOGIC ERROR", "TIMELINE FIX"];
        text.innerText = msgs[Math.floor(Math.random() * msgs.length)];

        // 173. Random Tilt
        const tilt = (Math.random() * 10 - 5).toFixed(1);
        text.style.transform = `rotate(${tilt}deg)`;

        overlay.style.display = 'flex';
        document.body.style.filter = 'invert(1) hue-rotate(180deg)'; // 174 & 175
        document.body.style.animation = 'shake 0.1s infinite'; // 176. Intensity

        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.filter = 'none';
            document.body.style.animation = 'none';
        }, 400);
    },

    triggerLevelFlash() {
        const flash = document.createElement('div');
        flash.setAttribute('style', 'position:fixed; inset:0; background:radial-gradient(circle, #FFCB05 0%, transparent 70%); z-index:10002; pointer-events:none; opacity:0; animation:flash 0.5s ease-out;');
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);
    },

    render() {
        const mount = document.getElementById('stage-mount');
        if (!mount) return;

        // 88 & 162. Refresh Rank
        const ranks = ["ROOKIE", "PRO", "ELITE", "COMMANDER"];
        const curRank = ranks[Math.min(window.state.level - 1, 3)];
        const badge = document.getElementById('rank-badge');
        if (badge) badge.innerText = curRank;

        const fill = document.getElementById('xp-fill');
        if (fill) fill.style.width = (window.state.points % 100) + '%';

        mount.innerHTML = `
            ${window.state.cards.map((card, idx) => `
                <article id="card-${card.id}" class="handy-card ${card.status === 'wizard' ? 'active-wizard' : ''}" style="z-index:${100 - idx};">
                    <div class="card-shine"></div>
                    ${this.renderContent(card)}
                </article>
            `).join('')}

            ${window.state.cards.length === 0 ? `
                <div class="handy-card" onclick="engine.add()" style="border: 1px dashed var(--glass-border); text-align: center; color: var(--text-muted); opacity: 0.7;">
                    <div style="font-size: 2.5rem; margin-bottom:10px;">⚡</div>
                    <span style="font-weight: 900; font-size: 0.9rem;">INITIALIZE COMMAND</span>
                </div>
            ` : ''}
        `;
    },

    renderContent(card) {
        const drive = DRIVES[card.driveIdx];

        if (card.status === 'wizard') {
            if (card.step === -1) {
                return `
                    <div class="swift-wizard">
                        <div class="wizard-label">CHOOSE UTILITY DRIVE</div>
                        <div class="carousel-view">
                            <button onclick="engine.updateDrive(${card.id}, -1)" style="background:none; border:none; color:white; font-size:1.5rem;">‹</button>
                            <div style="text-align: center;">
                                <div class="carousel-icon">${drive.icon}</div>
                                <div class="carousel-label">${drive.label}</div>
                            </div>
                            <button onclick="engine.updateDrive(${card.id}, 1)" style="background:none; border:none; color:white; font-size:1.5rem;">›</button>
                        </div>
                        <button class="btn-primary" onclick="engine.next(${card.id})">INITIALIZE DRIVE</button>
                    </div>
                `;
            } else {
                const steps = [
                    { q: 'MISSION TITLE', k: 'title', t: 'text' },
                    { q: 'TARGET DATE', k: 'date', t: 'date-pills' },
                    { q: 'TARGET TIME', k: 'time', t: 'time-row' },
                    { q: 'MISSION BRIEF', k: 'caption', t: 'text' }
                ];
                const cur = steps[card.step];
                let inputHtml = '';

                if (cur.t === 'date-pills') {
                    const days = [{ d: 'Thu', n: '21' }, { d: 'Fri', n: '22' }, { d: 'Sat', n: '23' }, { d: 'Sun', n: '24' }, { d: 'Mon', n: '25' }];
                    inputHtml = `
                        <div class="date-selector">
                            ${days.map(d => `
                                <div class="date-pill ${card.data.selectedDate === d.n ? 'active' : ''}" onclick="engine.updateData(${card.id}, 'selectedDate', '${d.n}')">
                                    <div class="pill-day">${d.d}</div><div class="pill-num">${d.n}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                } else if (cur.t === 'time-row') {
                    const tms = ['16:00', '17:00', '18:00', '19:00', '20:00'];
                    inputHtml = `
                        <div style="display: flex; gap: 10px; overflow-x: auto; padding: 10px 0;">
                            ${tms.map(t => `
                                <div style="flex: 0 0 80px; padding:12px; border-radius:15px; border:1px solid ${card.data.selectedTime === t ? 'var(--accent-vibrant)' : 'var(--glass-border)'}; text-align:center; background:${card.data.selectedTime === t ? 'rgba(255,0,204,0.2)' : 'rgba(0,0,0,0.2)'}" 
                                     onclick="engine.updateData(${card.id}, 'selectedTime', '${t}')">${t}</div>
                            `).join('')}
                        </div>
                    `;
                } else {
                    inputHtml = `
                        <input type="text" class="handy-input" onchange="engine.updateData(${card.id}, '${cur.k}', this.value)" onkeydown="if(event.key==='Enter') engine.next(${card.id})" value="${card.data[cur.k]}" placeholder="Enter ${cur.q.toLowerCase()}..." autofocus style="width:100%; padding:20px; background:rgba(0,0,0,0.2); border:1px solid var(--glass-border); border-radius:15px; color:white;">
                    `;
                }

                return `
                    <div class="swift-wizard">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                            <div class="wizard-label">STEP ${card.step + 1} / 4</div>
                            <button onclick="engine.prev(${card.id})" style="background:none; border:none; color:var(--text-dim); font-size:0.7rem; font-weight:700;">REVERSE</button>
                        </div>
                        <div style="font-size:1.4rem; font-weight:800; margin-bottom:25px;">${cur.q}</div>
                        ${inputHtml}
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:35px;">
                            <div style="display:flex; gap:8px;">${[0, 1, 2, 3].map(i => `<div style="width:7px; height:7px; border-radius:50%; background:${card.step === i ? 'var(--accent-vibrant)' : 'rgba(255,255,255,0.1)'}"></div>`).join('')}</div>
                            <button onclick="engine.next(${card.id})" class="btn-primary" style="width:auto; padding:12px 30px;">PROCEED</button>
                        </div>
                    </div>
                `;
            }
        } else {
            // 🎨 PROFESSIONAL BAKED TICKET
            return `
                <div class="ticket-card" style="position: relative;">
                    ${!window.state.isLocked ? `<button onclick="engine.delete(${card.id})" style="position: absolute; top:15px; right:15px; background:rgba(0,0,0,0.5); color:white; border:none; width:30px; height:30px; border-radius:50%; font-weight:900; z-index:10; cursor:pointer;">✕</button>` : ''}
                    
                    <div class="ticket-top">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" class="ticket-img">
                        <div style="position:absolute; bottom:20px; left:25px; color:white; z-index:2;">
                            <div style="font-size:0.75rem; font-weight:800; opacity:0.8; text-transform:uppercase;">${drive.label} Mission active</div>
                            <h2 style="font-size:1.8rem; font-weight:900; margin-top:5px;">${card.data.title || 'Inbound Mission'}</h2>
                        </div>
                        <div style="position:absolute; inset:0; background:linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 60%); z-index:1;"></div>
                    </div>
                    
                    <div class="ticket-inner">
                        <div class="ticket-bottom">
                            <div class="ticket-info-row">
                                <div class="info-item">
                                    <label>Date</label>
                                    <value>April ${card.data.selectedDate}, 2026</value>
                                </div>
                                <div class="info-item" style="text-align:right;">
                                    <label>Time</label>
                                    <value>${card.data.selectedTime}</value>
                                </div>
                            </div>
                            <div class="info-item">
                                <label>Briefing</label>
                                <p style="font-size:0.85rem; line-height:1.5; color:#555; margin-top:5px;">${card.data.caption || 'Operational parameters established. Standby for deployment.'}</p>
                            </div>
                            
                            <div class="barcode-area">
                                <img src="https://www.cognex.com/api/Sitecore/Barcode/GetBarcode?text=ULTIMATE-HANDY-CMD-${card.id}&height=60&width=300&type=Code128" class="barcode-img">
                            </div>
                        </div>
                    </div>

                    ${window.state.isLocked ? `
                        <div style="padding:20px;">
                            <button onclick="engine.updateXP(100); engine.delete(${card.id})" class="btn-primary">MISSION ACCOMPLISHED</button>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }
};

// 176. Shake Keyframes
const st = document.createElement('style');
st.innerHTML = \`@keyframes shake { 0%{transform:translate(1px,1px)} 20%{transform:translate(-3px,0px)} 40%{transform:translate(1px,-1px)} 60%{transform:translate(-1px,1px)} 100%{transform:translate(1px,-2px)} } @keyframes flash { 0%{opacity:0.8} 100%{opacity:0} }\`;
document.head.appendChild(st);
