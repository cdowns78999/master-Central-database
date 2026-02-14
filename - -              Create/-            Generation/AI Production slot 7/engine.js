/* 🧠 ENGINE.JS: FINAL ELITE TRANSFORMATION */

window.state = {
    isLocked: false,
    rank: 'Rookie',
    points: 0,
    cards: []
};

const PHASES = [
    { id: 1, icon: '🚀', description: 'Stream 01: Discovery', color: 'var(--accent-cyan)' },
    { id: 2, icon: '🧠', description: 'Stream 02: Jumpstart', color: 'var(--accent-pink)' },
    { id: 3, icon: '📦', description: 'Stream 03: Archive', color: 'var(--text-ghost)' }
];

const TILE_TYPES = [
    { id: 'release', label: 'Release', icon: '🎵', color: 'var(--accent-cyan)' },
    { id: 'social', label: 'Social', icon: '📱', color: '#FF0050' },
    { id: 'milestone', label: 'Goal', icon: '🏆', color: 'var(--accent-yellow)' },
    { id: 'task', label: 'Task', icon: '⚙️', color: '#FF4B4B' },
    { id: 'decision', label: 'Choice', icon: '⚖️', color: '#9D50BB' },
    { id: 'deliverable', label: 'Asset', icon: '📦', color: '#2ecc71' },
    { id: 'predictor', label: 'Lab', icon: '🧪', color: 'var(--plasma)' }
];

window.engine = {
    add(phaseId) {
        if (window.state.isLocked) return;
        const id = Date.now();
        window.state.cards.push({
            id,
            phaseId,
            status: 'wizard',
            typeIndex: 0, // Carousel index for type
            step: -1, // -1 means choosing type
            data: { title: '', date: '', time: '', caption: '' }
        });
        this.render();
    },

    next(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (!card) return;

        card.step++;
        if (card.step > 3) {
            card.status = 'baked';
            this.updateRank(50);
        }
        this.render();
    },

    prev(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (card && card.step > -1) {
            card.step--;
            this.render();
        }
    },

    updateType(id, direction) {
        const card = window.state.cards.find(c => c.id === id);
        if (!card) return;
        card.typeIndex = (card.typeIndex + direction + TILE_TYPES.length) % TILE_TYPES.length;
        this.render();
    },

    updateData(id, key, value) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) card.data[key] = value;
    },

    edit(id) {
        const card = window.state.cards.find(c => c.id === id);
        if (card) {
            card.status = 'wizard';
            card.step = 0;
            this.render();
        }
    },

    delete(id) {
        if (window.state.isLocked) return;
        window.state.cards = window.state.cards.filter(c => c.id !== id);
        this.render();
    },

    toggleLock() {
        window.state.isLocked = !window.state.isLocked;
        this.render();
    },

    updateRank(change) {
        window.state.points += change;
        if (window.state.points > 1000) window.state.rank = 'Master';
        else if (window.state.points > 500) window.state.rank = 'Elite';
        else if (window.state.points > 200) window.state.rank = 'Pro';
        this.render();
    },

    render() {
        const mount = document.getElementById('stage-mount');
        if (!mount) return;

        // Sync Stats
        const rankVal = document.getElementById('rank-val');
        const ptsVal = document.getElementById('pts-val');
        if (rankVal) rankVal.innerText = window.state.rank;
        if (ptsVal) ptsVal.innerText = window.state.points;

        mount.innerHTML = `
            <div class="lock-pill-container">
                <div class="lock-pill">
                    <div class="lock-status ${window.state.isLocked ? 'locked' : ''}"></div>
                    <span style="font-size: 0.7rem; font-weight: 800; letter-spacing: 1px;">SYSTEM ${window.state.isLocked ? 'LOCKED' : 'OPEN'}</span>
                    <button onclick="engine.toggleLock()" style="padding: 6px 15px; border-radius: 12px; background: ${window.state.isLocked ? 'rgba(255,255,255,0.1)' : 'var(--primary)'}; border:none; color:white; font-size:0.65rem; font-weight:800; cursor:pointer;">${window.state.isLocked ? 'UNLOCK' : 'LOCK'}</button>
                </div>
            </div>

            <div style="display: flex; gap: 30px; height: 100%; padding-top: 40px;">
                ${PHASES.map(phase => `
                    <div style="flex: 1; min-width: 320px; display: flex; flex-direction: column; gap: 20px;">
                         <h3 style="font-size: 0.85rem; color: ${phase.color}">${phase.icon} ${phase.description}</h3>
                         <div style="display: flex; flex-direction: column; gap: 15px;">
                            ${window.state.cards.filter(c => c.phaseId === phase.id).map(card => `
                                <div class="glass-medium card-item" style="padding: 24px; border-radius: 24px; border-left: 5px solid ${card.step === -1 ? 'var(--glass-border)' : TILE_TYPES[card.typeIndex].color}">
                                    ${this.renderCardContent(card)}
                                </div>
                            `).join('')}
                            ${!window.state.isLocked ? `
                                <button onclick="engine.add(${phase.id})" class="glass-thin" style="padding: 20px; border-radius: 24px; border: 1px dashed var(--glass-border); color: var(--text-ghost); cursor: pointer; transition: 0.3s;" onmouseover="this.style.color='white'; this.style.borderColor='var(--accent-cyan)'">+ New Mission</button>
                            ` : ''}
                         </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    renderCardContent(card) {
        if (card.status === 'wizard') {
            if (card.step === -1) {
                const currentType = TILE_TYPES[card.typeIndex];
                return `
                    <div class="carousel-wizard" style="text-align: center;">
                        <div style="font-size: 0.6rem; font-weight: 800; color: var(--accent-cyan); margin-bottom: 5px;">CAROUSEL: CHOOSE TYPE</div>
                        <div style="display: flex; align-items: center; justify-content: space-between; margin: 15px 0;">
                            <button onclick="engine.updateType(${card.id}, -1)" style="background:none; border:none; color:white; font-size: 1.5rem; cursor:pointer;">‹</button>
                            <div style="flex: 1;">
                                <div style="font-size: 2.5rem; margin-bottom: 5px;">${currentType.icon}</div>
                                <div style="font-weight: 800; letter-spacing: 1px;">${currentType.label}</div>
                            </div>
                            <button onclick="engine.updateType(${card.id}, 1)" style="background:none; border:none; color:white; font-size: 1.5rem; cursor:pointer;">›</button>
                        </div>
                        <button onclick="engine.next(${card.id})" style="width:100%; padding:12px; background:var(--primary); color:white; border-radius:12px; border:none; font-weight:800; font-size: 0.75rem; cursor:pointer;">SELECT TYPE →</button>
                        <div style="margin-top: 15px; display: flex; justify-content: center; gap: 6px;">
                            ${TILE_TYPES.map((_, i) => `<div class="nav-dot ${card.typeIndex === i ? 'active' : ''}"></div>`).join('')}
                        </div>
                    </div>
                `;
            } else {
                const steps = [
                    { label: 'Mission Title', key: 'title', type: 'text' },
                    { label: 'Due Date', key: 'date', type: 'date' },
                    { label: 'Due Time', key: 'time', type: 'time' },
                    { label: 'Short Caption', key: 'caption', type: 'text' }
                ];
                const curr = steps[card.step];
                return `
                    <div class="carousel-wizard">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.6rem; color: var(--accent-cyan); font-weight: 800;">WIZARD STEP ${card.step + 1}/4</span>
                            <button onclick="engine.prev(${card.id})" style="background:none; border:none; color:var(--text-ghost); font-size:0.7rem; cursor:pointer;">← Back</button>
                        </div>
                        <div style="font-size: 0.85rem; margin-top: 10px; color: var(--text-muted);">${curr.label}</div>
                        <input type="${curr.type}" class="wizard-field" style="margin-top: 10px;" value="${card.data[curr.key]}"
                               onchange="engine.updateData(${card.id}, '${curr.key}', this.value)"
                               onkeydown="if(event.key==='Enter') engine.next(${card.id})" autofocus>
                        <button onclick="engine.next(${card.id})" style="margin-top: 20px; width:100%; padding:12px; background:var(--primary); color:white; border-radius:12px; border:none; font-weight:800; cursor:pointer;">PROCEED →</button>
                    </div>
                `;
            }
        } else {
            const typeInfo = TILE_TYPES[card.typeIndex];
            return `
                <div style="position: relative;">
                    ${!window.state.isLocked ? `
                        <div style="position: absolute; top: -10px; right: -10px; display: flex; gap: 5px;">
                            <button onclick="engine.edit(${card.id})" style="background:rgba(255,255,255,0.05); color:white; border:none; width:24px; height:24px; border-radius:50%; font-size:10px; cursor:pointer;">✎</button>
                            <button onclick="engine.delete(${card.id})" style="background:rgba(255,75,75,0.1); color:#FF4B4B; border:none; width:24px; height:24px; border-radius:50%; font-size:10px; cursor:pointer;">✕</button>
                        </div>
                    ` : ''}
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div style="font-size: 0.6rem; font-weight: 800; color: ${typeInfo.color}; text-transform: uppercase;">${typeInfo.label}</div>
                            <h4 style="font-size: 1.15rem; font-weight: 900; margin-top: 4px;">${card.data.title}</h4>
                        </div>
                        <div style="font-size: 1.8rem;">${typeInfo.icon}</div>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <div style="padding: 5px 12px; background: rgba(0,0,0,0.2); border-radius: 10px; font-size: 0.7rem; color: var(--text-muted);">📅 ${card.data.date}</div>
                        <div style="padding: 5px 12px; background: rgba(0,0,0,0.2); border-radius: 10px; font-size: 0.7rem; color: var(--text-muted);">⏰ ${card.data.time}</div>
                    </div>
                    <p style="font-size: 0.8rem; margin-top: 12px; line-height: 1.5; color: var(--text-ghost);">${card.data.caption}</p>
                    ${window.state.isLocked ? `
                        <button onclick="engine.updateRank(100); engine.delete(${card.id})" style="margin-top: 15px; width: 100%; padding: 10px; border-radius: 12px; border: 1px solid var(--accent-cyan); color: var(--accent-cyan); background: none; font-weight: 800; font-size: 0.7rem; cursor: pointer;">ACCOMPLISH TASK</button>
                    ` : ''}
                </div>
            `;
        }
    }
};
