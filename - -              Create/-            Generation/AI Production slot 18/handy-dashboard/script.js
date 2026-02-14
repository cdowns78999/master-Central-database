/**
 * HANDY DASHBOARD MASTER ENGINE
 * High-fidelity task logic & RPG feedback system.
 */

const state = {
    tasks: [],
    xp: 0,
    rank: 'ROOKIE',
    isLocked: false,
    view: 'home',
    wizardStep: 0,
    wizardData: {
        title: '',
        type: 'GENERAL',
        date: '',
        time: ''
    }
};

const UI = {
    taskFeed: document.getElementById('task_feed'),
    xpFill: document.getElementById('xp_fill'),
    xpText: document.getElementById('xp_text'),
    rankBadge: document.getElementById('rank_badge'),
    lockToggle: document.getElementById('lock_toggle'),
    appContainer: document.getElementById('app_container'),
    wizardOverlay: document.getElementById('wizard_overlay'),
    wizardStepContainer: document.getElementById('wizard_step_container'),
    wizardNext: document.getElementById('wizard_next'),
    wizardDots: document.querySelectorAll('#progress_dots .dot'),
    stepIndicator: document.querySelector('.step-indicator'),
    anomalyOverlay: document.getElementById('anomaly_overlay')
};

// --- INITIALIZATION ---
function init() {
    loadState();
    renderTasks();
    updateHUD();
    attachListeners();
}

function attachListeners() {
    // Lock Toggle
    UI.lockToggle.addEventListener('click', toggleLock);

    // Elevated Command (Add Task)
    document.getElementById('elevated_cmd').addEventListener('click', openWizard);

    // Wizard Nav
    UI.wizardNext.addEventListener('click', nextWizardStep);
    document.getElementById('wizard_close').addEventListener('click', closeWizard);

    // Bottom Nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => switchView(item.dataset.view));
    });
}

// --- STATE MANAGEMENT ---
function saveState() {
    localStorage.setItem('handy_state', JSON.stringify({
        tasks: state.tasks,
        xp: state.xp,
        rank: state.rank,
        isLocked: state.isLocked
    }));
}

function loadState() {
    const saved = localStorage.getItem('handy_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        state.tasks = parsed.tasks;
        state.xp = parsed.xp;
        state.rank = parsed.rank;
        state.isLocked = parsed.isLocked;
        if (state.isLocked) document.body.classList.add('focus-locked');
    }
}

// --- HUD & RPG SYSTEM ---
function updateHUD() {
    const levelXP = state.xp % 100;
    UI.xpFill.style.width = `${levelXP}%`;
    UI.xpText.innerText = `${levelXP} / 100 XP`;

    // Rank Logic
    if (state.xp >= 300) state.rank = 'COMMANDER';
    else if (state.xp >= 200) state.rank = 'ELITE';
    else if (state.xp >= 100) state.rank = 'PRO';
    else state.rank = 'ROOKIE';

    UI.rankBadge.innerText = state.rank;
    UI.rankBadge.className = `vibe-${state.rank.toLowerCase()}`;
}

function addXP(amount) {
    state.xp += amount;
    updateHUD();
    saveState();
}

function triggerShockProtocol() {
    document.body.classList.add('shock-protocol');
    UI.anomalyOverlay.classList.remove('hidden');

    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

    setTimeout(() => {
        document.body.classList.remove('shock-protocol');
        UI.anomalyOverlay.classList.add('hidden');
    }, 1000);
}

// --- TASK RENDERING ---
function renderTasks() {
    UI.taskFeed.innerHTML = '';
    const filteredTasks = state.view === 'vault'
        ? state.tasks.filter(t => t.completed)
        : state.tasks.filter(t => !t.completed);

    if (filteredTasks.length === 0) {
        UI.taskFeed.innerHTML = '<div style="opacity:0.3; text-align:center; margin-top:50px;">NO MISSIONS LOGGED</div>';
        return;
    }

    filteredTasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'ticket-card';
        card.innerHTML = `
            <div class="card-type">${task.type}</div>
            <div class="card-title">${task.title}</div>
            <div class="card-meta">
                <div class="meta-pill">📅 ${task.date || 'TBD'}</div>
                <div class="meta-pill">⏰ ${task.time || 'ANY'}</div>
            </div>
            <div class="barcode">ID-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
        `;

        card.addEventListener('click', () => completeTask(task.id));
        UI.taskFeed.appendChild(card);
    });
}

function completeTask(id) {
    if (state.isLocked) return;

    const taskIndex = state.tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        state.tasks[taskIndex].completed = true;
        addXP(25);
        triggerShockProtocol();
        renderTasks();
        saveState();
    }
}

// --- SWIFT WIZARD ---
const questions = [
    { label: 'MISSION TITLE', placeholder: 'What are we building?', type: 'text', key: 'title' },
    { label: 'MISSION TYPE', placeholder: 'General, Lab, or Grid?', type: 'text', key: 'type' },
    { label: 'TARGET DATE', placeholder: 'YYYY-MM-DD', type: 'date', key: 'date' },
    { label: 'TARGET TIME', placeholder: 'HH:MM', type: 'time', key: 'time' }
];

function openWizard() {
    if (state.isLocked) return;
    state.wizardStep = 0;
    state.wizardData = { title: '', type: 'GENERAL', date: '', time: '' };
    showWizardStep();
    UI.wizardOverlay.classList.remove('hidden');
}

function closeWizard() {
    UI.wizardOverlay.classList.add('hidden');
}

function showWizardStep() {
    const q = questions[state.wizardStep];
    UI.stepIndicator.innerText = `STEP ${state.wizardStep + 1}/4`;
    UI.wizardStepContainer.innerHTML = `
        <div class="wizard-question">${q.label}</div>
        <input type="${q.type}" id="wizard_input" class="wizard-input" placeholder="${q.placeholder}" autofocus>
    `;

    UI.wizardDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === state.wizardStep);
    });

    UI.wizardNext.innerText = state.wizardStep === 3 ? 'INITIALIZE MISSION' : 'PROCEED →';

    const input = document.getElementById('wizard_input');
    input.focus();
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') nextWizardStep();
    });
}

function nextWizardStep() {
    const input = document.getElementById('wizard_input');
    state.wizardData[questions[state.wizardStep].key] = input.value;

    if (state.wizardStep < 3) {
        state.wizardStep++;
        showWizardStep();
    } else {
        finalizeTask();
    }
}

function finalizeTask() {
    const newTask = {
        id: Date.now(),
        ...state.wizardData,
        completed: false
    };
    state.tasks.unshift(newTask);
    addXP(10);
    closeWizard();
    renderTasks();
    saveState();
}

// --- UTILS ---
function toggleLock() {
    state.isLocked = !state.isLocked;
    document.body.classList.toggle('focus-locked', state.isLocked);
    UI.lockToggle.classList.toggle('locked', state.isLocked);
    document.getElementById('lock_status').innerText = state.isLocked ? 'SYSTEM LOCKED' : 'UNLOCKED';

    if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
    saveState();
}

function switchView(view) {
    state.view = view;
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === view);
    });
    renderTasks();
}

// Start Engine
init();
