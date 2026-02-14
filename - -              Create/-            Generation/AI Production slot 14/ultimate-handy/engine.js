/* ====================================================
   ULTIMATE HANDY DASHBOARD v14.0 - CORE ENGINE
   200-POINT LOGIC IMPLEMENTATION
   ==================================================== */

const engine = {
    // ------------------
    // STATE MANAGEMENT
    // ------------------
    state: {
        tasks: [],
        xp: 0,
        level: 1,
        isLocked: false,
        rank: "ROOKIE",
        wizard: {
            active: false,
            step: -1, // -1 is type selection
            tempTask: {
                id: null,
                type: 'general',
                title: '',
                date: '',
                time: '',
                status: 'active',
                xpAwarded: 100
            }
        }
    },

    // ------------------
    // CORE INITIALIZATION
    // ------------------
    load() {
        const saved = localStorage.getItem('handy_dashboard_v14_v2');
        if (saved) {
            this.state = JSON.parse(saved);
            // Ensure wizard is reset on load
            this.state.wizard.active = false;
        }
    },

    save() {
        localStorage.setItem('handy_dashboard_v14_v2', JSON.stringify(this.state));
    },

    render() {
        const mount = document.getElementById('stage-mount');
        if (this.state.wizard.active) {
            mount.innerHTML = this.renderWizard();
        } else {
            const activeTasks = this.state.tasks.filter(t => t.status === 'active');
            if (activeTasks.length === 0) {
                mount.innerHTML = this.renderHomeView();
            } else {
                mount.innerHTML = activeTasks.map(task => this.renderActiveCard(task)).join('');
            }
        }
        this.updateRankUI();
    },

    renderHomeView() {
        return `
            <div class="screen-animation-fade" style="width: 100%;">
                
                <!-- Search Glass -->
                <div class="glass-btn" style="width: 100%; border-radius: 20px; display: flex; align-items: center; padding: 15px 20px; margin-bottom: 30px; justify-content: flex-start; height: auto;">
                    <span style="font-size: 1.2rem; margin-right: 15px;">🔍</span>
                    <span style="color: rgba(255,255,255,0.3); font-size: 0.9rem;">Search missions, logs, data...</span>
                </div>

                <!-- Category Pills -->
                <div style="display: flex; gap: 12px; overflow-x: auto; margin-bottom: 35px; padding-bottom: 5px; scrollbar-width: none;">
                    <div style="background: var(--accent-cyan); color: var(--bg); padding: 10px 22px; border-radius: 40px; font-weight: 800; font-size: 0.8rem; white-space: nowrap;">Featured</div>
                    <div class="meta-pill" style="padding: 10px 22px; white-space: nowrap;">Studio</div>
                    <div class="meta-pill" style="padding: 10px 22px; white-space: nowrap;">Release</div>
                    <div class="meta-pill" style="padding: 10px 22px; white-space: nowrap;">Social</div>
                </div>

                <!-- Trending / Active Section -->
                <h2 style="font-size: 1.2rem; font-family: 'Outfit'; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                    Trending Missions <span style="width: 8px; height: 8px; background: var(--accent-pink); border-radius: 50%; box-shadow: 0 0 10px var(--accent-pink);"></span>
                </h2>

                <div class="stack-arena" onclick="engine.add()">
                    <div class="stack-card-bg stack-card-1"></div>
                    <div class="stack-card-bg stack-card-2"></div>
                    
                    <div class="handy-card" style="z-index: 10; cursor: pointer; height: 400px; padding: 0; overflow: hidden; border-radius: 40px;">
                        <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;">
                        <div style="position: absolute; inset: 0; background: linear-gradient(to top, var(--bg) 20%, transparent 80%);"></div>
                        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 30px;">
                            <div style="background: var(--accent-pink); padding: 5px 12px; border-radius: 8px; width: fit-content; font-size: 0.6rem; font-weight: 900; text-transform: uppercase; margin-bottom: 15px;">TOP PRIORITY</div>
                            <h3 style="font-size: 1.8rem; font-family: 'Outfit'; line-height: 1.1; margin-bottom: 10px;">God-Mode<br>Activation</h3>
                            <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">Evolution 14.0 Subsystem Ready</p>
                        </div>
                    </div>
                </div>

                <!-- Small Grid -->
                <div class="grid-view" style="margin-top: 30px;">
                    <div class="handy-card" style="height: 150px; background: url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000'); background-size: cover; padding: 0; position: relative;">
                        <div style="position: absolute; inset:0; background: rgba(0,0,0,0.5);"></div>
                        <h4 style="position: absolute; bottom: 15px; left: 15px; font-size: 1rem; font-family: 'Outfit';">Live Stream</h4>
                    </div>
                    <div class="handy-card" style="height: 150px; background: url('https://images.unsplash.com/photo-1514525253361-b83f83ef908a?q=80&w=1000'); background-size: cover; padding: 0; position: relative;">
                        <div style="position: absolute; inset:0; background: rgba(0,0,0,0.5);"></div>
                        <h4 style="position: absolute; bottom: 15px; left: 15px; font-size: 1rem; font-family: 'Outfit';">Artist Expo</h4>
                    </div>
                </div>

                <div style="height: 40px;"></div>
            </div>
        `;
    },

    renderVault() {
        const baked = this.state.tasks.filter(t => t.status === 'baked');
        if (baked.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">🗄️</div>
                    <h3>Vault Empty</h3>
                    <p>Archive completed missions to build your legacy.</p>
                </div>
            `;
        }
        return `
            <div class="screen-animation-fade" style="width: 100%;">
                <h2 style="font-family: 'Outfit'; margin-bottom: 25px;">Archived Missions</h2>
                ${baked.map(task => this.renderBakedCard(task)).join('')}
            </div>
        `;
    },

    renderLab() {
        return `
            <div class="screen-animation-fade" style="width: 100%;">
                <!-- Profile-style stats grid from Slot 6 -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="width: 80px; height: 80px; margin: 0 auto 15px; border-radius: 50%; border: 3px solid var(--accent-cyan); display: flex; align-items: center; justify-content: center; background: rgba(0, 242, 255, 0.1);">
                        <span style="font-size: 2.5rem;">🧠</span>
                    </div>
                    <h2 style="font-family: 'Outfit'; margin-bottom: 5px;">${this.state.rank}</h2>
                    <p style="color: var(--accent-pink); font-size: 0.7rem; font-weight: 800; letter-spacing: 2px;">GOD-MODE LEVEL ${this.state.level}</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
                    <div class="handy-card" style="min-height: auto; padding: 20px; text-align: center;">
                        <span style="color: rgba(255,255,255,0.4); font-size: 0.6rem; font-weight: 800; letter-spacing: 1px;">TOTAL XP</span>
                        <p style="font-size: 1.5rem; font-weight: 900; margin-top: 5px; color: var(--accent-cyan);">${this.state.xp}</p>
                    </div>
                    <div class="handy-card" style="min-height: auto; padding: 20px; text-align: center;">
                        <span style="color: rgba(255,255,255,0.4); font-size: 0.6rem; font-weight: 800; letter-spacing: 1px;">MISSIONS</span>
                        <p style="font-size: 1.5rem; font-weight: 900; margin-top: 5px;">${this.state.tasks.length}</p>
                    </div>
                </div>

                <div class="handy-card" style="min-height: auto; padding: 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 700;">Security Protocol</span>
                        <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.7rem;">${this.state.isLocked ? 'ACTIVE' : 'OFFLINE'}</span>
                    </div>
                    <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;" onclick="engine.triggerShock('ANOMALY TEST', 'hazard')">
                        <span style="font-weight: 700;">Anomaly Testing</span>
                        <span style="font-size: 1.2rem;">⚡</span>
                    </div>
                </div>

                <div class="tech-id" style="text-align: center; margin-top: 40px;">ENGINE: HANDY-14.0</div>
            </div>
        `;
    },

    reset() {
        this.state.wizard.active = false;
        this.state.wizard.step = -1;
    },

    // ------------------
    // COMMAND ACTIONS
    // ------------------
    add() {
        if (this.state.isLocked) {
            this.triggerShock("SYSTEM LOCKED", "hazard");
            return;
        }
        this.state.wizard.active = true;
        this.state.wizard.step = -1;
        this.state.wizard.tempTask = {
            id: Date.now(),
            type: 'general',
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: '12:00 PM',
            status: 'active',
            xpAwarded: 100
        };
        this.render();
        this.haptic([10]);
    },

    toggleLock() {
        this.state.isLocked = !this.state.isLocked;
        document.body.classList.toggle('focus-locked', this.state.isLocked);
        const pill = document.getElementById('lock-pill');
        const dot = document.getElementById('lock-dot');
        const text = document.getElementById('lock-text');

        if (this.state.isLocked) {
            pill.classList.add('locked');
            text.innerText = "🔒";
            this.haptic([30, 10, 30]);
        } else {
            pill.classList.remove('locked');
            text.innerText = "🔓";
            this.haptic([10, 5, 10]);
        }
        this.save();
        this.render();
    },

    // ------------------
    // WIZARD ENGINE
    // ------------------
    nextStep() {
        if (this.state.wizard.step === -1) {
            this.state.wizard.step = 0;
        } else if (this.state.wizard.step === 0) {
            const input = document.getElementById('wiz-title');
            if (!input.value.trim()) {
                this.triggerShock("MISSING TITLE", "hazard");
                return;
            }
            this.state.wizard.tempTask.title = input.value.trim();
            this.state.wizard.step = 1;
        } else if (this.state.wizard.step === 1) {
            this.state.wizard.step = 2;
        } else if (this.state.wizard.step === 2) {
            this.finishWizard();
            return;
        }
        this.haptic([20]);
        this.render();
    },

    prevStep() {
        if (this.state.wizard.step > -1) {
            this.state.wizard.step--;
            this.haptic([15]);
            this.render();
        } else {
            this.cancelWizard();
        }
    },

    cancelWizard() {
        this.state.wizard.active = false;
        this.haptic([5]);
        this.render();
    },

    finishWizard() {
        const newTask = { ...this.state.wizard.tempTask };
        this.state.tasks.unshift(newTask);
        this.state.wizard.active = false;
        this.render();
        this.triggerShock("DEPLOYED", "cyan");
        this.addXP(25);
        this.save();
    },

    setType(type) {
        this.state.wizard.tempTask.type = type;
        this.nextStep();
    },

    setDate(date) {
        this.state.wizard.tempTask.date = date;
        const pills = document.querySelectorAll('.date-pill');
        pills.forEach(p => p.classList.remove('active'));
        event.currentTarget.classList.add('active');
    },

    setTime(time) {
        this.state.wizard.tempTask.time = time;
        const pills = document.querySelectorAll('.time-pill');
        pills.forEach(p => p.classList.remove('active'));
        event.currentTarget.classList.add('active');
    },

    // ------------------
    // MISSION ACTIONS
    // ------------------
    bakeTask(id) {
        const idx = this.state.tasks.findIndex(t => t.id === id);
        if (idx !== -1) {
            this.state.tasks[idx].status = 'baked';
            this.triggerShock("MISSION COMPLETE", "cyan");
            this.addXP(100);
            this.save();
            this.render();
        }
    },

    deleteTask(id) {
        if (this.state.isLocked) return;
        this.state.tasks = this.state.tasks.filter(t => t.id !== id);
        this.haptic([50]);
        this.save();
        this.render();
    },

    // ------------------
    // RPG SYSTEM
    // ------------------
    addXP(amount) {
        this.state.xp += amount;

        // Show floating popup
        const popup = document.getElementById('xp-popup');
        popup.innerText = `+${amount} XP`;
        popup.classList.add('active');
        setTimeout(() => popup.classList.remove('active'), 1200);

        // Level up logic
        if (this.state.xp >= this.state.level * 100) {
            this.state.level++;
            this.triggerLevelUp();
        }

        this.updateRank();
        this.save();
        this.updateRankUI();
    },

    updateRank() {
        const ranks = ["ROOKIE", "PRO", "ELITE", "COMMANDER"];
        const idx = Math.min(this.state.level - 1, ranks.length - 1);
        this.state.rank = ranks[idx];
    },

    updateRankUI() {
        const badge = document.getElementById('rank-badge');
        const fill = document.getElementById('xp-fill');
        const percentText = document.getElementById('xp-percent');
        const rankIcon = document.getElementById('rank-icon');

        if (badge) badge.innerText = this.state.rank;

        const currentLevelXP = (this.state.level - 1) * 100;
        const progressXP = this.state.xp - currentLevelXP;
        const progressPercent = Math.min(100, Math.max(0, progressXP));

        if (fill) fill.style.width = `${progressPercent}%`;
        if (percentText) percentText.innerText = `${progressPercent}%`;

        const icons = ["⭐", "🎖️", "🏆", "👑"];
        const iconIdx = Math.min(this.state.level - 1, icons.length - 1);
        if (rankIcon) rankIcon.innerText = icons[iconIdx];
    },

    triggerLevelUp() {
        const flash = document.getElementById('level-flash');
        flash.classList.add('active');
        setTimeout(() => flash.classList.remove('active'), 800);
        this.triggerShock("LEVEL UP", "gold");
        this.haptic([100, 50, 100, 50, 100]);
    },

    // ------------------
    // FEEDBACK & ANIMATIONS
    // ------------------
    triggerShock(msg, theme) {
        const overlay = document.getElementById('anomaly-overlay');
        const text = document.getElementById('anomaly-text');

        text.innerText = msg;
        text.style.color = theme === 'hazard' ? 'var(--hazard-red)' : (theme === 'gold' ? 'var(--rank-gold)' : 'var(--accent-cyan)');

        overlay.classList.add('active');
        document.body.classList.add('screen-shake');

        setTimeout(() => {
            overlay.classList.remove('active');
            document.body.classList.remove('screen-shake');
        }, 500);

        this.haptic([30, 10, 30]);
    },

    haptic(pattern) {
        if (navigator.vibrate) navigator.vibrate(pattern);
    },

    // ------------------
    // RENDER HELPERS
    // ------------------
    renderActiveCard(task) {
        return `
            <div class="handy-card card-pop type-${task.type}" data-type="${task.type}">
                <div class="card-notch-right"></div>
                
                <div class="card-header">
                    <div class="card-type-badge">
                        <span class="card-type-icon">${this.getTypeIcon(task.type)}</span>
                        ${task.type}
                    </div>
                    <button class="delete-btn" onclick="engine.deleteTask(${task.id})">×</button>
                </div>

                <h2 class="card-title">${task.title}</h2>
                <div class="mission-brief">
                    Mission critical parameters established. Timeline locked to Target Vector.
                </div>

                <div class="card-separator">
                    <div class="sep-punch-right"></div>
                </div>

                <div class="metadata-row">
                    <div class="meta-pill">
                        <span class="meta-icon">📅</span>
                        ${task.date}
                    </div>
                    <div class="meta-pill">
                        <span class="meta-icon">⏰</span>
                        ${task.time}
                    </div>
                </div>

                <button class="complete-btn" onclick="engine.bakeTask(${task.id})">MISSION COMPLETE</button>
                <div class="barcode">▮▯▮▮▯▯▮▯▮▮▯▮▮▮▯▯▮▯▮▮</div>
            </div>
        `;
    },

    renderBakedCard(task) {
        return `
            <div class="handy-card baked type-${task.type}" data-type="${task.type}">
                <div class="card-notch-right"></div>
                <div class="baked-header">
                    <span class="baked-icon">${this.getTypeIcon(task.type)}</span>
                    <span class="baked-label">Mission Archived</span>
                </div>
                <h2 class="baked-title">${task.title}</h2>
                <div class="baked-stats">
                    <div class="baked-stat">
                        <div class="baked-stat-value">100%</div>
                        <div class="baked-stat-label">Sync</div>
                    </div>
                    <div class="baked-stat">
                        <div class="baked-stat-value">+100</div>
                        <div class="baked-stat-label">XP</div>
                    </div>
                </div>
                <div class="metadata-row" style="justify-content: center; margin-top: 20px;">
                    <div class="meta-pill">
                        <span class="meta-icon">🔒</span>
                        ARCHIVED: ${task.date}
                    </div>
                </div>
                <div class="barcode">▮▯▮▮▯▯▮▯▮▮▯▮▮▮▯▯▮▯▮▮</div>
            </div>
        `;
    },

    renderWizard() {
        const step = this.state.wizard.step;
        let content = '';

        if (step === -1) {
            content = `
                <div class="type-carousel slide-left">
                    <div class="wizard-question">SELECT MISSION TYPE</div>
                    <div class="carousel-display">
                        <span class="carousel-arrow" onclick="engine.rotateType(-1)">‹</span>
                        <div class="carousel-icon-wrap" style="--type-color: ${this.getTypeColor(this.state.wizard.tempTask.type)}">
                            <span class="carousel-icon">${this.getTypeIcon(this.state.wizard.tempTask.type)}</span>
                            <span class="carousel-type-name">${this.state.wizard.tempTask.type.toUpperCase()}</span>
                        </div>
                        <span class="carousel-arrow" onclick="engine.rotateType(1)">›</span>
                    </div>
                    <button class="initialize-btn" onclick="engine.nextStep()">INITIALIZE →</button>
                </div>
            `;
        } else if (step === 0) {
            content = `
                <div class="wizard-content slide-left">
                    <div class="wizard-step-label">STEP 01/03</div>
                    <div class="wizard-question">NAME YOUR MISSION</div>
                    <input type="text" id="wiz-title" class="wizard-input" placeholder="e.g. Studio Session Alpha" autofocus value="${this.state.wizard.tempTask.title}">
                    <div class="wizard-dots">
                        <div class="wizard-dot active"></div>
                        <div class="wizard-dot"></div>
                        <div class="wizard-dot"></div>
                    </div>
                    <div class="wizard-actions">
                        <button class="proceed-btn" onclick="engine.nextStep()">PROCEED →</button>
                    </div>
                </div>
            `;
        } else if (step === 1) {
            content = `
                <div class="wizard-content slide-left">
                    <div class="wizard-step-label">STEP 02/03</div>
                    <div class="wizard-question">TARGET DATE</div>
                    <div class="date-picker-vertical">
                        ${this.generateDates().map(d => `
                            <div class="date-pill ${this.state.wizard.tempTask.date === d.iso ? 'active' : ''}" onclick="engine.setDate('${d.iso}')">
                                <span class="day-name">${d.dayName}</span>
                                <span class="day-number">${d.dayNumber}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="wizard-dots">
                        <div class="wizard-dot completed"></div>
                        <div class="wizard-dot active"></div>
                        <div class="wizard-dot"></div>
                    </div>
                    <div class="wizard-actions">
                        <button class="proceed-btn" onclick="engine.nextStep()">PROCEED →</button>
                    </div>
                </div>
            `;
        } else if (step === 2) {
            content = `
                <div class="wizard-content slide-left">
                    <div class="wizard-step-label">STEP 03/03</div>
                    <div class="wizard-question">DEPLOYMENT TIME</div>
                    <div class="time-picker-horizontal">
                        ${this.generateTimes().map(t => `
                            <div class="time-pill ${this.state.wizard.tempTask.time === t ? 'active' : ''}" onclick="engine.setTime('${t}')">
                                ${t}
                            </div>
                        `).join('')}
                    </div>
                    <div class="wizard-dots">
                        <div class="wizard-dot completed"></div>
                        <div class="wizard-dot completed"></div>
                        <div class="wizard-dot active"></div>
                    </div>
                    <div class="wizard-actions">
                        <button class="proceed-btn" onclick="engine.nextStep()">FINALIZE MISSION →</button>
                    </div>
                </div>
            `;
        }

        return `
            <div class="handy-card wizard-card wizard-complete-pop">
                <div class="card-notch-right"></div>
                <div class="wizard-progress">
                    <div class="wizard-step-label">MISSION CONFIG</div>
                    <button class="wizard-back-btn" onclick="engine.prevStep()">REVERSE</button>
                </div>
                ${content}
            </div>
        `;
    },

    getTypeIcon(type) {
        const icons = { social: '📱', release: '🎵', predict: '📈', general: '🛠️' };
        return icons[type] || '🎯';
    },

    getTypeColor(type) {
        const colors = { social: '#E91E9C', release: '#00F2FF', predict: '#FFA726', general: '#9D50BB' };
        return colors[type] || '#fff';
    },

    rotateType(dir) {
        const types = ['social', 'release', 'predict', 'general'];
        let idx = types.indexOf(this.state.wizard.tempTask.type);
        idx = (idx + dir + types.length) % types.length;
        this.state.wizard.tempTask.type = types[idx];
        this.render();
        this.haptic([10]);
    },

    generateDates() {
        const dates = [];
        const today = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            dates.push({
                dayName: i === 0 ? "TODAY" : days[d.getDay()].toUpperCase(),
                dayNumber: d.getDate(),
                iso: d.toISOString().split('T')[0]
            });
        }
        return dates;
    },

    generateTimes() {
        const times = [];
        for (let h = 0; h < 24; h++) {
            const hour = h % 12 || 12;
            const ampm = h < 12 ? 'AM' : 'PM';
            times.push(`${hour}:00 ${ampm}`);
            times.push(`${hour}:30 ${ampm}`);
        }
        return times;
    }
};
