// HANDY DASHBOARD - ENGINE.JS
// Swift Wizard, RPG Feedback, and Task Management Logic

class HandyDashboard {
  constructor() {
    this.state = {
      tasks: [],
      currentView: 'home',
      wizardStep: -1,
      isLocked: false,
      xp: 0,
      rank: 'ROOKIE',
      currentTask: null,
      wizardData: {
        type: '',
        title: '',
        description: '',
        date: '',
        time: ''
      }
    };
    
    this.rankThresholds = {
      'ROOKIE': 0,
      'PRO': 100,
      'ELITE': 200,
      'COMMANDER': 300
    };
    
    this.taskTypes = [
      { id: 'predict', icon: '🎯', label: 'Predict', gradient: '#ff8c00' },
      { id: 'social', icon: '🎭', label: 'Social', gradient: '#ff00cc' },
      { id: 'release', icon: '🚀', label: 'Release', gradient: '#00F2FF' }
    ];
    
    this.init();
  }
  
  init() {
    this.loadState();
    this.bindEvents();
    this.render();
  }
  
  // State Management
  loadState() {
    const saved = localStorage.getItem('handyDashboardState');
    if (saved) {
      this.state = { ...this.state, ...JSON.parse(saved) };
    }
  }
  
  saveState() {
    localStorage.setItem('handyDashboardState', JSON.stringify(this.state));
  }
  
  // Event Binding
  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.switchView(view);
      });
    });
    
    // Center Command Button
    const centerBtn = document.getElementById('centerCommandBtn');
    centerBtn.addEventListener('click', () => {
      if (this.state.currentView === 'home') {
        this.openWizard();
      } else {
        this.switchView('home');
      }
    });
    
    // Floating Add Button
    const floatingAdd = document.getElementById('floatingAddBtn');
    floatingAdd.addEventListener('click', () => {
      this.openWizard();
    });
    
    // Lock Toggle
    const lockToggle = document.getElementById('lockToggle');
    lockToggle.addEventListener('click', () => {
      this.toggleLock();
    });
    
    // Wizard Overlay Close
    const wizardOverlay = document.getElementById('wizardOverlay');
    wizardOverlay.addEventListener('click', (e) => {
      if (e.target === wizardOverlay) {
        this.closeWizard();
      }
    });
    
    // Keyboard Support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.wizardStep >= 0) {
        this.closeWizard();
      }
      if (e.key === 'Enter' && this.state.wizardStep >= 0) {
        const activeInput = document.querySelector('.wizard-input:focus');
        if (activeInput) {
          this.wizardNext();
        }
      }
    });
  }
  
  // View Management
  switchView(viewName) {
    this.state.currentView = viewName;
    
    // Update Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewName}"]`)?.classList.add('active');
    
    // Update Views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    document.getElementById(`${viewName}View`)?.classList.add('active');
    
    // Show/hide floating add button
    const floatingAdd = document.getElementById('floatingAddBtn');
    if (viewName === 'home') {
      floatingAdd.style.display = 'none';
    } else {
      floatingAdd.style.display = 'flex';
    }
    
    this.render();
    this.saveState();
  }
  
  // Swift Wizard Functions
  openWizard() {
    this.state.wizardStep = -1;
    this.state.wizardData = {
      type: '',
      title: '',
      description: '',
      date: '',
      time: ''
    };
    
    document.getElementById('wizardOverlay').classList.add('active');
    this.renderWizard();
  }
  
  closeWizard() {
    document.getElementById('wizardOverlay').classList.remove('active');
    this.state.wizardStep = -1;
    this.saveState();
  }
  
  wizardNext() {
    const maxStep = 4; // -1 (type) to 3 (time)
    
    if (this.state.wizardStep < maxStep) {
      this.state.wizardStep++;
      this.renderWizard();
    } else {
      this.createTask();
    }
  }
  
  wizardPrevious() {
    if (this.state.wizardStep > -1) {
      this.state.wizardStep--;
      this.renderWizard();
    }
  }
  
  renderWizard() {
    const wizardCard = document.getElementById('wizardCard');
    
    if (this.state.wizardStep === -1) {
      // Type Selection
      wizardCard.innerHTML = `
        <div class="wizard-header">
          <div class="wizard-step">SELECT TYPE</div>
          <button class="wizard-reverse" onclick="app.closeWizard()">✕</button>
        </div>
        <div class="wizard-question">Choose your mission type</div>
        <div class="type-carousel">
          ${this.taskTypes.map(type => `
            <div class="type-option" onclick="app.selectType('${type.id}')">
              <div class="type-icon-carousel type-${type.id}" style="background: ${type.gradient}">
                ${type.icon}
              </div>
              <div class="type-label">${type.label}</div>
            </div>
          `).join('')}
        </div>
        <div class="wizard-nav">
          <div></div>
          <button class="wizard-proceed" onclick="app.wizardNext()" style="display: ${this.state.wizardData.type ? 'block' : 'none'}">
            INITIALIZE →
          </button>
        </div>
      `;
    } else if (this.state.wizardStep === 0) {
      // Mission Title
      wizardCard.innerHTML = `
        <div class="wizard-header">
          <div class="wizard-step">MISSION TITLE</div>
          <button class="wizard-reverse" onclick="app.wizardPrevious()">←</button>
        </div>
        <div class="wizard-question">What is the name of your mission?</div>
        <input 
          class="wizard-input" 
          type="text" 
          placeholder="Enter mission title..."
          value="${this.state.wizardData.title || ''}"
          oninput="app.updateWizardData('title', this.value)"
          autofocus
        />
        <div class="wizard-nav">
          <div class="wizard-dots">
            ${[0,1,2,3,4].map(i => `
              <div class="dot ${i === this.state.wizardStep + 1 ? 'active' : ''}"></div>
            `).join('')}
          </div>
          <button class="wizard-proceed" onclick="app.wizardNext()">
            PROCEED →
          </button>
        </div>
      `;
    } else if (this.state.wizardStep === 1) {
      // Mission Description
      wizardCard.innerHTML = `
        <div class="wizard-header">
          <div class="wizard-step">MISSION BRIEF</div>
          <button class="wizard-reverse" onclick="app.wizardPrevious()">←</button>
        </div>
        <div class="wizard-question">Describe the mission objectives</div>
        <input 
          class="wizard-input" 
          type="text" 
          placeholder="Enter mission description..."
          value="${this.state.wizardData.description || ''}"
          oninput="app.updateWizardData('description', this.value)"
          autofocus
        />
        <div class="wizard-nav">
          <div class="wizard-dots">
            ${[0,1,2,3,4].map(i => `
              <div class="dot ${i === this.state.wizardStep + 1 ? 'active' : ''}"></div>
            `).join('')}
          </div>
          <button class="wizard-proceed" onclick="app.wizardNext()">
            PROCEED →
          </button>
        </div>
      `;
    } else if (this.state.wizardStep === 2) {
      // Date Selection
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dates = this.generateNextDates();
      
      wizardCard.innerHTML = `
        <div class="wizard-header">
          <div class="wizard-step">TARGET DATE</div>
          <button class="wizard-reverse" onclick="app.wizardPrevious()">←</button>
        </div>
        <div class="wizard-question">When will this mission be complete?</div>
        <div class="date-picker-vertical">
          ${dates.map((date, index) => `
            <div class="date-pill ${this.state.wizardData.date === date.value ? 'active' : ''}" 
                 onclick="app.selectDate('${date.value}')">
              <div style="font-size: 0.8rem; opacity: 0.7">${days[index % 7]}</div>
              <div style="font-weight: 900">${date.label}</div>
            </div>
          `).join('')}
        </div>
        <div class="wizard-nav">
          <div class="wizard-dots">
            ${[0,1,2,3,4].map(i => `
              <div class="dot ${i === this.state.wizardStep + 1 ? 'active' : ''}"></div>
            `).join('')}
          </div>
          <button class="wizard-proceed" onclick="app.wizardNext()" ${!this.state.wizardData.date ? 'style="opacity: 0.5; cursor: not-allowed"' : ''}>
            PROCEED →
          </button>
        </div>
      `;
    } else if (this.state.wizardStep === 3) {
      // Time Selection
      const times = this.generateTimeSlots();
      
      wizardCard.innerHTML = `
        <div class="wizard-header">
          <div class="wizard-step">TARGET TIME</div>
          <button class="wizard-reverse" onclick="app.wizardPrevious()">←</button>
        </div>
        <div class="wizard-question">What time is the deadline?</div>
        <div class="time-picker-horizontal">
          ${times.map(time => `
            <div class="time-pill ${this.state.wizardData.time === time ? 'active' : ''}" 
                 onclick="app.selectTime('${time}')">
              ${time}
            </div>
          `).join('')}
        </div>
        <div class="wizard-nav">
          <div class="wizard-dots">
            ${[0,1,2,3,4].map(i => `
              <div class="dot ${i === this.state.wizardStep + 1 ? 'active' : ''}"></div>
            `).join('')}
          </div>
          <button class="wizard-proceed" onclick="app.wizardNext()" ${!this.state.wizardData.time ? 'style="opacity: 0.5; cursor: not-allowed"' : ''}>
            DEPLOY MISSION →
          </button>
        </div>
      `;
    }
  }
  
  // Wizard Data Management
  selectType(typeId) {
    this.state.wizardData.type = typeId;
    this.renderWizard();
  }
  
  selectDate(date) {
    this.state.wizardData.date = date;
    this.renderWizard();
  }
  
  selectTime(time) {
    this.state.wizardData.time = time;
    this.renderWizard();
  }
  
  updateWizardData(field, value) {
    this.state.wizardData[field] = value;
  }
  
  // Task Management
  createTask() {
    const type = this.taskTypes.find(t => t.id === this.state.wizardData.type);
    const task = {
      id: Date.now(),
      type: this.state.wizardData.type,
      title: this.state.wizardData.title,
      description: this.state.wizardData.description,
      date: this.state.wizardData.date,
      time: this.state.wizardData.time,
      status: 'active',
      icon: type.icon,
      gradient: type.gradient,
      createdAt: new Date().toISOString()
    };
    
    this.state.tasks.push(task);
    this.closeWizard();
    this.render();
    this.saveState();
    
    // Haptic feedback
    this.vibrate([30, 10, 30]);
  }
  
  deleteTask(taskId) {
    if (this.state.isLocked) {
      this.showError('System is locked');
      return;
    }
    
    this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
    this.render();
    this.saveState();
    this.vibrate(10);
  }
  
  completeTask(taskId) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    task.status = 'completed';
    task.completedAt = new Date().toISOString();
    
    // Award XP
    this.awardXP(100);
    
    // Trigger Anomaly Breach
    this.triggerAnomaly();
    
    this.render();
    this.saveState();
  }
  
  // RPG System
  awardXP(amount) {
    this.state.xp += amount;
    this.checkRank();
    this.updateRankDisplay();
    this.showXPPopup(amount);
    this.saveState();
  }
  
  checkRank() {
    const ranks = Object.keys(this.rankThresholds).reverse();
    for (const rank of ranks) {
      if (this.state.xp >= this.rankThresholds[rank]) {
        if (rank !== this.state.rank) {
          this.state.rank = rank;
          this.showLevelUp();
        }
        break;
      }
    }
  }
  
  updateRankDisplay() {
    const rankName = document.querySelector('.rank-name');
    const xpFill = document.getElementById('xpFill');
    const xpText = document.querySelector('.xp-text');
    const lockText = document.querySelector('.lock-text');
    
    rankName.textContent = this.state.rank;
    
    // Calculate XP progress
    const currentRankThreshold = this.rankThresholds[this.state.rank];
    const nextRankThreshold = this.getNextRankThreshold();
    const xpNeeded = nextRankThreshold - currentRankThreshold;
    const xpProgress = this.state.xp - currentRankThreshold;
    const percentage = (xpProgress / xpNeeded) * 100;
    
    xpFill.style.width = `${Math.min(percentage, 100)}%`;
    xpText.textContent = `${this.state.xp}/${nextRankThreshold} XP`;
    
    lockText.textContent = this.state.isLocked ? 'LOCKED' : 'UNLOCKED';
  }
  
  getNextRankThreshold() {
    const ranks = Object.keys(this.rankThresholds);
    const currentIndex = ranks.indexOf(this.state.rank);
    if (currentIndex < ranks.length - 1) {
      return this.rankThresholds[ranks[currentIndex + 1]];
    }
    return this.state.xp + 100; // For highest rank
  }
  
  showXPPopup(amount) {
    const popup = document.getElementById('xpPopup');
    popup.textContent = `+${amount} XP`;
    popup.style.animation = 'none';
    setTimeout(() => {
      popup.style.animation = 'xpFloat 1.5s ease-out';
    }, 10);
  }
  
  showLevelUp() {
    const overlay = document.getElementById('anomalyOverlay');
    const message = document.getElementById('anomalyMessage');
    
    message.textContent = `LEVEL UP: ${this.state.rank}!`;
    overlay.classList.add('active');
    
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 2000);
  }
  
  triggerAnomaly() {
    const overlay = document.getElementById('anomalyOverlay');
    const message = document.getElementById('anomalyMessage');
    const messages = ['BREACH DETECTED', 'LOGIC ERROR', 'TIMELINE FIX', 'MISSION COMPLETE'];
    
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    overlay.classList.add('active');
    
    // Screen shake
    document.body.style.animation = 'none';
    setTimeout(() => {
      document.body.style.animation = 'shake 0.4s ease-out';
    }, 10);
    
    setTimeout(() => {
      overlay.classList.remove('active');
      document.body.style.animation = '';
    }, 400);
  }
  
  // Lock System
  toggleLock() {
    this.state.isLocked = !this.state.isLocked;
    
    const rankPill = document.getElementById('rankPill');
    const lockText = document.querySelector('.lock-text');
    
    if (this.state.isLocked) {
      rankPill.classList.add('locked');
      document.body.classList.add('focus-locked');
    } else {
      rankPill.classList.remove('locked');
      document.body.classList.remove('focus-locked');
    }
    
    lockText.textContent = this.state.isLocked ? 'LOCKED' : 'UNLOCKED';
    this.render();
    this.saveState();
    
    this.vibrate([30, 10, 30]);
  }
  
  // Rendering Functions
  render() {
    this.updateRankDisplay();
    this.renderTasks();
  }
  
  renderTasks() {
    const homeGrid = document.getElementById('tasksGrid');
    const vaultGrid = document.getElementById('vaultGrid');
    const allTasksGrid = document.getElementById('allTasksGrid');
    
    const activeTasks = this.state.tasks.filter(t => t.status === 'active');
    const completedTasks = this.state.tasks.filter(t => t.status === 'completed');
    
    // Home View - Active Tasks
    if (activeTasks.length === 0) {
      homeGrid.innerHTML = `
        <div class="construction-card">
          <div class="construction-icon">📋</div>
          <h3>No Active Missions</h3>
          <p>Tap the center button to deploy your first mission</p>
        </div>
      `;
    } else {
      homeGrid.innerHTML = activeTasks.map(task => this.renderTaskCard(task)).join('');
    }
    
    // Vault View - Completed Tasks
    if (completedTasks.length === 0) {
      vaultGrid.innerHTML = `
        <div class="construction-card">
          <div class="construction-icon">🏆</div>
          <h3>No Completed Missions</h3>
          <p>Complete missions to see them here</p>
        </div>
      `;
    } else {
      vaultGrid.innerHTML = completedTasks.map(task => this.renderTaskCard(task)).join('');
    }
    
    // Grid View - All Tasks
    if (this.state.tasks.length === 0) {
      allTasksGrid.innerHTML = `
        <div class="construction-card">
          <div class="construction-icon">📊</div>
          <h3>No Missions</h3>
          <p>Create your first mission to get started</p>
        </div>
      `;
    } else {
      allTasksGrid.innerHTML = this.state.tasks.map(task => this.renderTaskCard(task)).join('');
    }
  }
  
  renderTaskCard(task) {
    const isCompleted = task.status === 'completed';
    const typeInfo = this.taskTypes.find(t => t.id === task.type);
    const canDelete = !this.state.isLocked && !isCompleted;
    
    return `
      <div class="handy-card ${isCompleted ? 'baked' : ''}" data-task-id="${task.id}">
        ${canDelete ? `<button class="delete-btn" onclick="app.deleteTask(${task.id})">✕</button>` : ''}
        
        <div class="card-header">
          <div class="type-icon type-${task.type}" style="background: linear-gradient(135deg, ${task.gradient}, ${task.gradient}dd)">
            ${task.icon}
          </div>
        </div>
        
        <div class="card-subtitle" style="color: ${task.gradient}">${typeInfo.label}</div>
        <div class="card-title">${task.title}</div>
        <div class="card-description">${task.description}</div>
        
        <div class="card-metadata">
          <div class="metadata-pill">
            📅 <span>${this.formatDate(task.date)}</span>
          </div>
          <div class="metadata-pill">
            ⏰ <span>${task.time}</span>
          </div>
        </div>
        
        ${!isCompleted ? `<button class="finish-btn" onclick="app.completeTask(${task.id})">MISSION COMPLETE</button>` : ''}
        
        <div class="utility-barcode">${this.generateBarcode()}</div>
      </div>
    `;
  }
  
  // Utility Functions
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  generateBarcode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  
  generateNextDates() {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const value = date.toISOString().split('T')[0];
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      if (i === 0) {
        dates.push({ value, label: 'TODAY' });
      } else if (i === 1) {
        dates.push({ value, label: 'TOMORROW' });
      } else {
        dates.push({ value, label });
      }
    }
    
    return dates;
  }
  
  generateTimeSlots() {
    const times = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour, minute);
        const label = time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        });
        times.push(label);
      }
    }
    return times;
  }
  
  vibrate(pattern) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }
  
  showError(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #FF4B4B;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 600;
      z-index: 10002;
      animation: fadeIn 0.3s ease;
    `;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    this.vibrate(50);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 2000);
  }
}

// Initialize App
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new HandyDashboard();
});

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(10px, -5px); }
    50% { transform: translate(-8px, 3px); }
    75% { transform: translate(5px, -2px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
`;
document.head.appendChild(style);