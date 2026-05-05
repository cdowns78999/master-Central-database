const app = {
    currentWeek: 1,
    weeks: [
        { id: 1, title: 'Week 1', date: 'MM/DD', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500' }
    ],
    visionTasks: ['', '', '', '', ''],
    whisperActiveIndex: 0,
    weeklyActiveIndex: 0,
    warmUpTimer: null,
    focusState: null,
    weeklyData: [
        { date: 'MM/DD', label: 'Week 1', tasks: ['', '', '', '', ''] }
    ],
    whisperData: [
        { date: 'MM/DD', tasks: ['', '', '', '', ''] },
        { date: 'MM/DD', tasks: ['', '', '', '', ''] },
        { date: 'MM/DD', tasks: ['', '', '', '', ''] },
        { date: 'MM/DD', tasks: ['', '', '', '', ''] }
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
                    this.renderTargetOptions();
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
                    <h4 class="dblclick-edit" ondblclick="event.stopPropagation(); app.enableEdit(this)" onblur="app.saveWeekLabel(${idx}, this.innerText); this.contentEditable='false';" style="font-size: 1.1rem; color: white; cursor: default;">${w.label}</h4>
                    <div class="weekly-date-carousel">
                        <div class="weekly-cycle-dot" onclick="event.stopPropagation(); app.cycleWeeklyDate(${idx})"></div>
                        <div class="weekly-date-single" contenteditable="true" spellcheck="false"
                             onblur="app.updateWeekDate(${idx}, this.innerText)">${w.date}</div>
                    </div>
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

        // Render tasks
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
        const newWeek = {
            date: `MM/DD`,
            label: `Week ${this.weeklyData.length + 1}`,
            tasks: ['', '', '', '', '']
        };

        this.weeklyData.push(newWeek);
        this.renderWeeks();
        this.renderTargetOptions();
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

    cycleWeeklyDate(idx) {
        // Simple feedback for the dot on any card
        this.showFeedback('Date Cycle Ready');
    },

    updateWeekDate(idx, newDate) {
        if (this.weeklyData[idx]) {
            if (idx === 0) {
                // If Week 1 is updated, propagate to all others
                this.parseWeeklyDate(newDate);
            } else {
                // Otherwise just update this specific card
                this.weeklyData[idx].date = newDate;
                this.showFeedback('Date Updated');
            }
        }
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
        } else if (target.startsWith('week-')) {
            const weekIdx = parseInt(target.split('-')[1]);
            const weekData = this.weeklyData[weekIdx];
            if (weekData) {
                weekData.tasks = tasks.slice(0, 5);
                while (weekData.tasks.length < 5) weekData.tasks.push('');
                this.renderAllWeekTasks();
                const sheet = document.getElementById(`week-task-sheet-${weekIdx}`);
                if (sheet && !sheet.classList.contains('open')) {
                    sheet.classList.add('open');
                }
                this.showFeedback(`${weekData.label} Updated!`);
            }
        }

        input.value = '';
        this.showFeedback('Tasks Added!');
    },

    clearActiveCard() {
        const target = document.getElementById('target-selection').value;
        if (target === 'recap') {
            this.whisperData[this.whisperActiveIndex].tasks = ['', '', '', '', ''];
            this.renderWhisperTasks();
            this.showFeedback('Recap Cleared');
        } else if (target.startsWith('week-')) {
            const weekIdx = parseInt(target.split('-')[1]);
            if (this.weeklyData[weekIdx]) {
                this.weeklyData[weekIdx].tasks = ['', '', '', '', ''];
                this.renderAllWeekTasks();
                this.showFeedback(`${this.weeklyData[weekIdx].label} Cleared`);
            }
        }
    },

    clearAllCards() {
        // Just updating the fields for a fresh start
        this.whisperData.forEach(d => {
            d.tasks = ['', '', '', '', ''];
            d.date = 'MM/DD';
        });
        this.weeklyData.forEach(w => {
            w.tasks = ['', '', '', '', ''];
            w.date = 'MM/DD';
        });

        this.renderWhisperTasks();
        this.renderAllWeekTasks();
        this.renderWhisperSlots();
        this.renderWeeks();
        this.showFeedback('Data Reset Fresh');
    },

    saveTitle(type, text) {
        console.log(`Saving title for ${type}: ${text}`);
        this.showFeedback('Title Saved');
    },

    enableEdit(el) {
        el.contentEditable = 'true';
        el.focus();
        // Select all text
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    },

    saveWeekLabel(idx, text) {
        if (this.weeklyData[idx]) {
            this.weeklyData[idx].label = text.trim();
            this.showFeedback('Week Label Saved');
        }
    },

    renderTargetOptions() {
        const select = document.getElementById('target-selection');
        if (!select) return;

        let options = '<option value="recap">Target: Recap Card</option>';
        this.weeklyData.forEach((w, idx) => {
            options += `<option value="week-${idx}">Target: ${w.label}</option>`;
        });
        select.innerHTML = options;
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
    },

    toggleCommandCenter() {
        const cc = document.querySelector('.command-center');
        if (cc) {
            cc.classList.toggle('open');
            this.showFeedback(cc.classList.contains('open') ? 'Console Active' : 'Console Hidden');
        }
    }
};

window.onload = () => app.init();
