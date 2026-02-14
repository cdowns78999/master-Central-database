/**
 * HANDY DASHBOARD MASTER ENGINE v19
 * "Entertainment Fusion" Edition
 */

const state = {
    user: "Chad Downs",
    tasks: [
        { id: 101, title: "Paint Masterpiece", type: "CREATIVE", date: "2026-05-01", time: "10:00", completed: false },
        { id: 102, title: "Vault Architecture", type: "LAB", date: "2026-01-23", time: "14:00", completed: true }
    ],
    xp: 45,
    rank: "ROOKIE",
    view: "home",
    isLocked: false
};

const UI = {
    mount: document.getElementById('stage_mount'),
    xpFill: document.getElementById('xp_fill'),
    rankName: document.getElementById('rank_name'),
    navItems: document.querySelectorAll('.nav-item'),
    wizard: {
        overlay: document.getElementById('wizard_overlay'),
        stepContent: document.getElementById('wizard_step_content'),
        indicator: document.getElementById('wizard_step_indicator'),
        dots: document.querySelectorAll('.progress-dots .dot'),
        nextBtn: document.getElementById('wizard_next_btn')
    },
    anomaly: document.getElementById('anomaly_overlay'),
    levelFlash: document.getElementById('level_flash')
};

// --- INITIALIZE ---
window.addEventListener('load', () => {
    engine.init();
});

const engine = {
    init() {
        this.loadState();
        this.switchView('home');
        this.updateHUD();
        this.attachListeners();
    },

    loadState() {
        const saved = localStorage.getItem('handy_v19_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            state.tasks = parsed.tasks || state.tasks;
            state.xp = parsed.xp || 45;
            state.rank = parsed.rank || "ROOKIE";
        }
    },

    saveState() {
        localStorage.setItem('handy_v19_state', JSON.stringify(state));
    },

    updateHUD() {
        const progress = state.xp % 100;
        UI.xpFill.style.width = `${progress}%`;

        if (state.xp >= 300) state.rank = 'COMMANDER';
        else if (state.xp >= 200) state.rank = 'ELITE';
        else if (state.xp >= 100) state.rank = 'PRO';
        UI.rankName.innerText = state.rank;
    },

    attachListeners() {
        UI.navItems.forEach(item => {
            item.addEventListener('click', () => this.switchView(item.dataset.view));
        });

        UI.wizard.nextBtn.addEventListener('click', () => wizard.next());
    },

    switchView(view) {
        state.view = view;
        UI.navItems.forEach(n => n.classList.toggle('active', n.dataset.view === view));
        UI.mount.innerHTML = '';
        UI.mount.className = 'scroll-container screen-fade-in';

        switch (view) {
            case 'home': this.renderHome(); break;
            case 'vault': this.renderVault(); break;
            case 'lab': this.renderLab(); break;
            case 'grid': this.renderGrid(); break;
        }
        window.navigator.vibrate?.(10);
    },

    // --- RENDERERS ---
    renderHome() {
        UI.mount.innerHTML = `
            <div class="header-profile">
                <div class="greet">
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 5px;">Welcome back,</p>
                    <h1 style="font-size: 1.8rem; font-family: 'Outfit'; margin: 0;">${state.user}</h1>
                </div>
                <div class="profile-avatar">
                    <img src="https://via.placeholder.com/50" alt="Profile">
                </div>
            </div>

            <div class="search-bar glass-medium">
                <span class="search-icon">🔍</span>
                <span>Search missions, labs...</span>
            </div>

            <div class="category-row">
                <div class="cat-pill active">Featured</div>
                <div class="cat-pill glass-thin">Creative</div>
                <div class="cat-pill glass-thin">Technical</div>
                <div class="cat-pill glass-thin">Urgent</div>
            </div>

            <h2 style="font-size: 1.4rem; margin-bottom: 25px;">Active Missions</h2>
            <div id="active_missions_list"></div>
        `;

        const list = document.getElementById('active_missions_list');
        state.tasks.filter(t => !t.completed).forEach(task => {
            const card = document.createElement('div');
            card.className = 'glass-medium';
            card.style.cssText = 'padding: 25px; border-radius: var(--radius-md); margin-bottom: 20px; position: relative; overflow: hidden;';
            card.innerHTML = `
                <div style="color: var(--accent-cyan); font-family: 'JetBrains Mono'; font-size: 0.7rem; font-weight: 800; margin-bottom: 10px;">${task.type}</div>
                <h3 style="font-size: 1.4rem; font-family: 'Outfit'; margin-bottom: 15px;">${task.title}</h3>
                <div style="display: flex; gap: 10px; font-size: 0.75rem; color: var(--text-muted);">
                    <span>📅 ${task.date}</span>
                    <span>⏰ ${task.time}</span>
                </div>
            `;
            card.onclick = () => this.completeTask(task.id);
            list.appendChild(card);
        });
    },

    renderVault() {
        UI.mount.innerHTML = `
            <h1 style="text-align: center; font-family: 'Outfit'; font-size: 1.8rem; margin-bottom: 10px;">Mission Vault</h1>
            <p style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 40px;">Completed archives encrypted.</p>
            
            <div class="vault-arena">
                <div class="ghost-ticket glass-medium ghost-1"></div>
                <div class="ghost-ticket glass-medium ghost-2"></div>
                
                <div class="master-ticket">
                    <div style="height: 60%; position: relative; overflow: hidden; border-radius: 20px; margin-bottom: 20px;">
                        <img src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000" style="width:100%; height:100%; object-fit:cover; opacity: 0.9;">
                        <div style="position: absolute; inset: 0; background: linear-gradient(transparent, black);"></div>
                        <h4 style="position: absolute; bottom: 15px; left: 15px; color: white; margin: 0; font-family: 'Outfit'; font-size: 1.4rem;">Archives Secure</h4>
                    </div>
                    
                    <div style="padding-top: 10px; border-top: 2px dashed #eee;">
                        <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono'; font-size: 0.75rem;">
                            <span>COMPLETED</span>
                            <span style="color: var(--accent-pink);">ID-${Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                        </div>
                    </div>
                    <div class="ticket-notches"></div>
                </div>
            </div>

            <div style="display: flex; justify-content: center; gap: 8px; margin-top: 50px;">
                <div style="width: 8px; height: 8px; background: rgba(255,255,255,0.2); border-radius: 50%;"></div>
                <div style="width: 25px; height: 8px; background: var(--accent-cyan); border-radius: 10px; box-shadow: 0 0 10px var(--accent-cyan);"></div>
                <div style="width: 8px; height: 8px; background: rgba(255,255,255,0.2); border-radius: 50%;"></div>
            </div>
        `;
    },

    renderLab() {
        UI.mount.innerHTML = `
            <div style="text-align: center; margin-bottom: 40px; padding-top: 20px;">
                <div style="width: 100px; height: 100px; margin: 0 auto 20px; border-radius: 50%; border: 3px solid var(--accent-cyan); padding: 5px; background: rgba(0, 242, 255, 0.1);">
                    <img src="https://via.placeholder.com/100" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                </div>
                <h1 style="font-size: 1.8rem; font-family: 'Outfit'; margin-bottom: 5px;">${state.user}</h1>
                <p style="color: var(--accent-pink); font-weight: 800; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px;">${state.rank} COMMANDER</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
                <div class="glass-medium" style="padding: 20px; border-radius: var(--radius-md); text-align: center;">
                    <span style="font-size: 0.6rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase;">Missions</span>
                    <p style="font-size: 1.5rem; font-weight: 800; margin-top: 8px; font-family: 'Outfit';">${state.tasks.length}</p>
                </div>
                <div class="glass-medium" style="padding: 20px; border-radius: var(--radius-md); text-align: center;">
                    <span style="font-size: 0.6rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase;">Total XP</span>
                    <p style="font-size: 1.5rem; font-weight: 800; margin-top: 8px; font-family: 'Outfit'; color: var(--accent-cyan);">${state.xp}</p>
                </div>
            </div>

            <div class="glass-medium" style="border-radius: var(--radius-md); overflow: hidden;">
                <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;">
                    <span>Security Systems</span>
                    <span style="color: var(--accent-cyan);">ACTIVE</span>
                </div>
                <div style="padding: 20px; display: flex; justify-content: space-between;">
                    <span>Haptic Feedback</span>
                    <span style="color: var(--accent-cyan);">ON</span>
                </div>
            </div>
        `;
    },

    renderGrid() {
        UI.mount.innerHTML = `
            <h1 style="font-family: 'Outfit'; font-size: 1.8rem; margin-bottom: 30px;">Grid Access</h1>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${state.tasks.map(t => `
                    <div class="glass-thin" style="padding: 20px; border-radius: var(--radius-md); aspect-ratio: 1/1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border: 1.5px solid ${t.completed ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)'};">
                        <div style="font-family: 'JetBrains Mono'; font-size: 0.6rem; opacity: 0.5; margin-bottom: 10px;">${t.type}</div>
                        <div style="font-family: 'Outfit'; font-weight: 800; font-size: 0.9rem;">${t.title}</div>
                        ${t.completed ? '<div style="margin-top: 10px; font-size: 0.6rem; color: var(--accent-cyan);">COMPLETE</div>' : ''}
                    </div>
                `).join('')}
            </div>
        `;
    },

    // --- LOGIC ---
    completeTask(id) {
        const task = state.tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
            state.xp += 25;
            this.triggerShockProtocol();
            this.updateHUD();
            this.renderHome();
            this.saveState();
        }
    },

    triggerShockProtocol() {
        document.body.classList.add('shock-protocol');
        UI.anomaly.classList.remove('hidden');
        window.navigator.vibrate?.([100, 50, 100]);

        setTimeout(() => {
            document.body.classList.remove('shock-protocol');
            UI.anomaly.classList.add('hidden');
        }, 800);
    },

    toggleLock() {
        state.isLocked = !state.isLocked;
        document.body.classList.toggle('focus-locked', state.isLocked);
        window.navigator.vibrate?.(30);
    }
};

const wizard = {
    step: 0,
    data: { title: '', type: 'GENERAL', date: '', time: '' },
    steps: [
        { title: "MISSION TITLE", placeholder: "What are we building?", key: "title", type: "text" },
        { title: "MISSION TYPE", placeholder: "Creative, Lab, Grid...", key: "type", type: "text" },
        { title: "TARGET DATE", placeholder: "YYYY-MM-DD", key: "date", type: "date" },
        { title: "TARGET TIME", placeholder: "HH:MM", key: "time", type: "time" }
    ],

    open() {
        if (state.isLocked) return;
        this.step = 0;
        this.data = { title: '', type: 'GENERAL', date: '', time: '' };
        this.render();
        UI.wizard.overlay.classList.remove('hidden');
    },

    close() {
        UI.wizard.overlay.classList.add('hidden');
    },

    render() {
        const s = this.steps[this.step];
        UI.wizard.indicator.innerText = `STEP ${this.step + 1}/4`;
        UI.wizard.stepContent.innerHTML = `
            <div class="wizard-title">${s.title}</div>
            <input type="${s.type}" id="wiz_input" class="wizard-input" placeholder="${s.placeholder}" autofocus>
        `;

        UI.wizard.dots.forEach((d, i) => d.classList.toggle('active', i === this.step));
        UI.wizard.nextBtn.innerText = this.step === 3 ? "INITIALIZE MISSION" : "PROCEED →";

        const input = document.getElementById('wiz_input');
        input.focus();
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.next();
        });
    },

    next() {
        const val = document.getElementById('wiz_input').value;
        if (!val && this.step === 0) return;

        this.data[this.steps[this.step].key] = val;

        if (this.step < 3) {
            this.step++;
            this.render();
        } else {
            this.finish();
        }
    },

    finish() {
        const newTask = {
            id: Date.now(),
            title: this.data.title,
            type: this.data.type || 'MISSION',
            date: this.data.date || 'TBD',
            time: this.data.time || 'ANY',
            completed: false
        };
        state.tasks.unshift(newTask);
        state.xp += 10;
        engine.updateHUD();
        engine.saveState();
        engine.switchView('home');
        this.close();
    }
};
