const app = {
    currentWeek: 1,
    weeks: [
        { id: 1, title: 'Week 1', date: '01/30', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500' }
    ],
    visionTasks: ['', '', '', '', ''],
    whisperActiveIndex: 0,
    weeklyActiveIndex: 0,
    warmUpTimer: null,
    focusState: null,
    weeklyData: [
        { date: '01/06', label: 'Week 1', tasks: ['', '', '', '', ''] }
    ],
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
            } else if (this.focusState.type === 'week') {
                const weekIdx = Math.floor(this.focusState.index / 10);
                const taskIdx = this.focusState.index % 10;
                this.weeklyData[weekIdx].tasks[taskIdx] = val;
                this.renderAllWeekTasks();
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
                    this.renderWeeklyDateSlot();
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

        const weekCards = this.weeklyData.map((w, idx) => `
            <div class="glass-medium week-card active-glow" data-week="${idx}" style="min-height: 140px; border-radius: 20px; padding: 16px; position: relative; overflow: hidden; cursor: pointer;" onclick="app.toggleWeekSheet(${idx})">
                <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4;">
                <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26, 11, 46, 0.85) 0%, rgba(75, 76, 237, 0.4) 100%);"></div>
                <div style="position: relative; display: flex; justify-content: space-between; align-items: flex-start;">
                    <h4 style="font-size: 1.1rem; color: white;">${w.label}</h4>
                    ${idx === 0 ? '<div id="weekly-date-mount"></div>' : `<span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 800;">${w.date}</span>`}
                </div>
                <div id="week-task-sheet-${idx}" class="week-task-rollout">
                    <!-- Tasks hydrated -->
                </div>
            </div>
        `).join('');

        mount.innerHTML = weekCards + `
            <div class="glass-thin week-card add-week-btn" onclick="app.addNewWeek()" style="min-height: 60px; border-radius: 20px; border: 2px dashed rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;">
                <span style="font-size: 1.5rem; color: var(--text-ghost);">+</span>
            </div>
        `;

        // Render date slot and tasks
        this.renderWeeklyDateSlot();
        this.renderAllWeekTasks();
    },

    toggleWeekSheet(idx) {
        const sheet = document.getElementById(`week-task-sheet-${idx}`);
        if (sheet) sheet.classList.toggle('open');
    },

    renderAllWeekTasks() {
        this.weeklyData.forEach((w, idx) => {
            const mount = document.getElementById(`week-task-sheet-${idx}`);
            if (!mount) return;

            const tasks = w.tasks || ['', '', '', '', ''];
            mount.innerHTML = tasks.map((task, i) => `
                <div class="recap-task-row" onclick="event.stopPropagation(); app.enterFocusMode('week', ${idx * 10 + i}, '${task.replace(/'/g, "\\'")}')">
                    <div class="task-dot"></div>
                    <div class="task-input" style="cursor: pointer;">${task || '<span style="opacity:0.4;">Task #' + (i + 1) + '</span>'}</div>
                </div>
            `).join('');
        });
    },

    addNewWeek() {
        const lastWeek = this.weeklyData[this.weeklyData.length - 1];
        const lastDate = lastWeek.date.split('/');
        const month = parseInt(lastDate[0]);
        const day = parseInt(lastDate[1]);
        const year = new Date().getFullYear();

        // Add 7 days to last week's date
        const newDate = new Date(year, month - 1, day + 7);
        const mm = String(newDate.getMonth() + 1).padStart(2, '0');
        const dd = String(newDate.getDate()).padStart(2, '0');

        const newWeek = {
            date: `${mm}/${dd}`,
            label: `Week ${this.weeklyData.length + 1}`,
            tasks: ['', '', '', '', '']
        };

        this.weeklyData.push(newWeek);
        this.renderWeeks();
        this.showFeedback(`${newWeek.label} Added!`);
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

    renderWeeklyDateSlot() {
        const mount = document.getElementById('weekly-date-mount');
        if (!mount) return;

        const current = this.weeklyData[this.weeklyActiveIndex];
        mount.innerHTML = `
            <div class="weekly-date-carousel">
                <div class="weekly-cycle-dot" onclick="event.stopPropagation(); app.cycleWeeklyDate()"></div>
                <div class="weekly-date-single" contenteditable="true" spellcheck="false"
                     onblur="app.parseWeeklyDate(this.innerText)">${current.date}</div>
            </div>
        `;
    },

    cycleWeeklyDate() {
        this.weeklyActiveIndex = (this.weeklyActiveIndex + 1) % this.weeklyData.length;
        this.renderWeeklyDateSlot();
        this.showFeedback(this.weeklyData[this.weeklyActiveIndex].label);
    },

    parseWeeklyDate(inputDate) {
        // Parse mm/dd and auto-fill subsequent weeks
        const match = inputDate.match(/(\d{1,2})\/(\d{1,2})/);
        if (!match) return;

        const month = parseInt(match[1]);
        const day = parseInt(match[2]);
        const year = new Date().getFullYear();

        // Update Week 1 and calculate all others (7-day intervals)
        this.weeklyData.forEach((w, i) => {
            const offset = i * 7;
            const date = new Date(year, month - 1, day + offset);
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            w.date = `${mm}/${dd}`;
        });

        this.renderWeeks();
        this.showFeedback('All weeks updated!');
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
