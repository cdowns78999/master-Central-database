const app = {
    currentWeek: 1,
    weeks: [
        { id: 1, title: 'Week 1', date: '01/30', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500' }
    ],
    visionTasks: ['', '', '', '', ''],
    whisperActiveIndex: 0,
    warmUpTimer: null,
    focusState: null,
    whisperData: [
        { date: '01/24', tasks: ['Sync Team', 'Review Assets', 'Update Ledger', 'Client Call', 'EOD Report'] },
        { date: '01/25', tasks: ['Deep Work', 'Brand Strategy', 'Draft V2', 'Internal QA', 'Final Polish'] },
        { date: '01/26', tasks: ['Launch Prep', 'Final Check', 'Submit PR', 'Tea Break', 'Standup'] },
        { date: '01/30', tasks: ['Recap Call', 'Note Extraction', 'Logic Build', 'Deploy', 'Celebrate'] }
    ],

    init() {
        this.load('home');

        // GLOBAL CLICK-AWAY RESET
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.whisper-cycle-dot')) {
                this.resetWarmUp();
            }
        });
    },

    cycleValue(type, index) {
        if (type === 'week-date') {
            const current = this.weeks[index].date;
            // Simple Rolodex logic: mm/dd -> mm/dd+1 -> Status
            const statusOptions = ['READY', 'PENDING', 'URGENT', 'LOCKED'];
            if (statusOptions.includes(current)) {
                const nextIdx = (statusOptions.indexOf(current) + 1) % statusOptions.length;
                this.weeks[index].date = statusOptions[nextIdx];
            } else {
                // If it's a date, flip to first status or just keep it editable
                this.weeks[index].date = statusOptions[0];
            }
        }
        this.renderWeeks();
    },

    enterFocusMode(type, index, currentVal) {
        const overlay = document.getElementById('focus-overlay');
        const mount = document.getElementById('focus-mount');

        this.focusState = { type, index };

        mount.innerHTML = `
            <div class="recap-task-row active-glow" style="margin-bottom: 0;">
                <div class="task-dot"></div>
                <input type="text" id="focused-input" class="task-input" 
                       value="${currentVal}" 
                       onkeydown="if(event.key==='Enter') app.exitFocusMode()">
            </div>
        `;

        overlay.classList.add('active');
        setTimeout(() => {
            const input = document.getElementById('focused-input');
            input.focus();
            input.select();
        }, 300);
    },

    exitFocusMode() {
        const overlay = document.getElementById('focus-overlay');
        const input = document.getElementById('focused-input');
        if (!overlay || !overlay.classList.contains('active')) return;

        if (input && this.focusState) {
            const val = input.value;
            if (this.focusState.type === 'whisper') {
                this.saveWhisperTask(this.focusState.index, val);
                this.renderWhisperTasks();
            }
        }

        overlay.classList.remove('active');
        this.focusState = null;
    },

    load(screenName) {
        const mount = document.getElementById('screen-mount');
        mount.style.opacity = '0';

        setTimeout(() => {
            if (SCREENS[screenName]) {
                mount.innerHTML = SCREENS[screenName];
                mount.style.opacity = '1';

                if (screenName === 'home') {
                    this.renderWeeks();
                    this.renderWhisperSlots();
                    this.renderWhisperTasks();
                }

                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                const index = ['home', 'search', 'ticket', 'save', 'profile'].indexOf(screenName);
                if (index !== -1) document.querySelectorAll('.tab-btn')[index].classList.add('active');
            }
        }, 150);
    },

    renderWeeks() {
        const mount = document.getElementById('weeks-mount');
        if (!mount) return;

        mount.innerHTML = this.weeks.map((w, idx) => `
            <div class="glass-medium week-card" style="min-height: 140px; border-radius: 20px; padding: 18px; position: relative; overflow: hidden; cursor: pointer; animation: screenFade 0.5s ease-out forwards; animation-delay: ${idx * 0.1}s;">
                <img src="${w.img}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4;">
                <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26, 11, 46, 0.85) 0%, rgba(75, 76, 237, 0.4) 100%);"></div>
                <div style="position: relative; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 class="editable-title" contenteditable="true" onblur="app.saveTitle('week', this.innerText)" style="font-size: 1.1rem; color: white; margin-bottom: 8px;">${w.title}</h4>
                        <div class="rolodex-btn" onclick="event.stopPropagation(); app.cycleValue('week-date', ${idx})">${w.date}</div>
                    </div>
                </div>
            </div>
        `).join('') + `
            <div class="glass-thin week-card add-week-btn" onclick="app.addNewWeek()" style="min-height: 140px; border-radius: 20px; border: 2px dashed rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;">
                <span style="font-size: 2rem; color: var(--text-ghost);">+</span>
            </div>
        `;
    },

    addNewWeek() {
        this.currentWeek++;
        const now = new Date();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');

        const newWeek = {
            id: this.currentWeek,
            title: `Week ${this.currentWeek}`,
            date: `${mm}/${dd}`,
            img: this.weeks[0].img
        };

        this.weeks.unshift(newWeek);
        this.renderWeeks();
        this.showFeedback(`Week ${this.currentWeek} Added!`);
    },

    renderWhisperSlots() {
        const mount = document.getElementById('whisper-slots-mount');
        if (!mount) return;

        mount.innerHTML = this.whisperData.map((d, i) => {
            const relIndex = (i - this.whisperActiveIndex + this.whisperData.length) % this.whisperData.length;
            let className = 'whisper-date';
            if (relIndex === 0) className += ' whisper-active whisper-color-0';
            else if (relIndex === 1) className += ' whisper-ghost-1 whisper-color-1';
            else if (relIndex === 2) className += ' whisper-ghost-2 whisper-color-2';
            else className += ' whisper-ghost-3 whisper-color-3';

            return `<div class="${className}">${d.date}</div>`;
        }).join('');
    },

    renderWhisperTasks() {
        const mount = document.getElementById('whisper-task-sheet');
        if (!mount) return;

        const currentTasks = this.whisperData[this.whisperActiveIndex].tasks;
        mount.innerHTML = currentTasks.map((task, i) => `
            <div class="recap-task-row" onclick="event.stopPropagation(); app.enterFocusMode('whisper', ${i}, '${task}')">
                <div class="task-dot"></div>
                <div class="task-input" style="cursor: pointer;">${task || '<span style="opacity:0.4;">Vision #' + (i + 1) + '</span>'}</div>
            </div>
        `).join('');
    },

    saveWhisperTask(index, value) {
        this.whisperData[this.whisperActiveIndex].tasks[index] = value;
    },

    cycleWhisperDate() {
        const dot = document.querySelector('.whisper-cycle-dot');
        if (dot) {
            dot.classList.add('warmed-up');
            clearTimeout(this.warmUpTimer);
            this.warmUpTimer = setTimeout(() => this.resetWarmUp(), 3000);
        }

        this.whisperActiveIndex = (this.whisperActiveIndex + 1) % this.whisperData.length;
        this.renderWhisperSlots();
        this.renderWhisperTasks();

        const card = document.getElementById('recap-main-card');
        if (card) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = 'scale(1)', 100);
        }
    },

    resetWarmUp() {
        const dot = document.querySelector('.whisper-cycle-dot');
        if (dot) dot.classList.remove('warmed-up');
        clearTimeout(this.warmUpTimer);
    },

    toggleWhisperSheet() {
        const sheet = document.getElementById('whisper-task-sheet');
        if (sheet) sheet.classList.toggle('open');
    },

    processBulkTasks() {
        const input = document.getElementById('bulk-task-input');
        const target = document.getElementById('target-selection').value;
        if (!input || !input.value.trim()) return;

        const tasks = input.value.split('\n').map(t => t.trim()).filter(t => t !== '');

        if (target === 'recap') {
            this.whisperData[this.whisperActiveIndex].tasks = tasks.slice(0, 5);
            while (this.whisperData[this.whisperActiveIndex].tasks.length < 5) {
                this.whisperData[this.whisperActiveIndex].tasks.push('');
            }
            this.renderWhisperTasks();
            if (!document.getElementById('whisper-task-sheet').classList.contains('open')) {
                this.toggleWhisperSheet();
            }
        } else {
            console.log('Adding to Weekly Vision:', tasks);
            this.visionTasks = tasks.slice(0, 5);
            while (this.visionTasks.length < 5) this.visionTasks.push('');
            this.showFeedback('Weekly Vision Updated!');
        }

        input.value = '';
        this.showFeedback('Tasks Added!');
    },

    clearActiveCard() {
        const target = document.getElementById('target-selection').value;
        if (target === 'recap') {
            this.whisperData[this.whisperActiveIndex].tasks = ['', '', '', '', ''];
            this.renderWhisperTasks();
        } else {
            this.visionTasks = ['', '', '', '', ''];
        }
        this.showFeedback(`${target === 'recap' ? 'Recap' : 'Weekly Vision'} Cleared`);
    },

    clearAllCards() {
        // Clear all recap dates
        this.whisperData.forEach(d => d.tasks = ['', '', '', '', '']);
        // Clear weekly vision
        this.visionTasks = ['', '', '', '', ''];

        this.renderWhisperTasks();
        this.showFeedback('All Cards Cleared');
    },

    saveTitle(type, text) {
        console.log(`Saving title for ${type}: ${text}`);
        this.showFeedback('Title Saved');
    },

    showFeedback(msg) {
        const existing = document.querySelector('.feedback-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'feedback-toast';
        toast.style.cssText = `
            position: fixed; top: 100px; left: 50%; transform: translateX(-50%);
            background: var(--accent-cyan); color: black; padding: 10px 20px;
            border-radius: 20px; font-weight: 800; font-size: 0.8rem;
            z-index: 10000; animation: screenFade 0.3s ease-out;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        `;
        toast.innerText = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
};

window.onload = () => app.init();
