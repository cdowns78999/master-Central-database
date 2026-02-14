/* ===== GUIDE.JS — HubSpot-Style Step Renderer ===== */

const PHASE_META = {
  1: { label: 'Safety',        color: '#e8634a' },
  2: { label: 'Disassembly',   color: '#f5a623' },
  3: { label: 'Swap Element',  color: '#4a90d9' },
  4: { label: 'Reassembly',    color: '#8b5cf6' },
  5: { label: 'Testing',       color: '#34c759' }
};

const ICON_MAP = {
  power:   '&#9889;',   // zap
  safety:  '&#128737;', // shield
  tools:   '&#128295;', // wrench
  panels:  '&#9638;',   // square
  heating: '&#128293;', // fire
  testing: '&#9888;'    // warning triangle (used as meter stand-in)
};

let allSteps = [];
let activePhase = null;
let completedSteps = new Set();

async function initGuide() {
  try {
    const res = await fetch('./data/steps.json');
    allSteps = await res.json();
  } catch(e) {
    console.error('Failed to load steps.json:', e);
    document.getElementById('guide-root').innerHTML = '<p>Error loading guide data.</p>';
    return;
  }

  renderFilters();
  renderProgressBar();
  renderCards();

  // Listen for phase filter events from overview cards
  window.addEventListener('filter-phase', (e) => {
    setPhaseFilter(e.detail.phase);
  });
}

function setPhaseFilter(phase) {
  activePhase = (activePhase === phase) ? null : phase;
  renderFilters();
  renderCards();
}

function renderFilters() {
  const container = document.getElementById('phase-filters');
  if (!container) return;

  const phases = [1, 2, 3, 4, 5];
  container.innerHTML = phases.map(p => {
    const meta = PHASE_META[p];
    const isActive = activePhase === p;
    return `<button class="phase-chip ${isActive ? 'active' : ''}"
                    data-phase="${p}"
                    style="--chip-color: ${meta.color}"
                    aria-pressed="${isActive}">
              <span class="chip-dot" style="background:${meta.color}"></span>
              ${meta.label}
            </button>`;
  }).join('');

  container.querySelectorAll('.phase-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      setPhaseFilter(parseInt(chip.dataset.phase));
    });
  });
}

function renderProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  const phases = [1, 2, 3, 4, 5];
  bar.innerHTML = phases.map(p => {
    const meta = PHASE_META[p];
    const stepsInPhase = allSteps.filter(s => s.phase === p);
    const doneInPhase = stepsInPhase.filter(s => completedSteps.has(s.id));
    const pct = stepsInPhase.length ? Math.round((doneInPhase.length / stepsInPhase.length) * 100) : 0;
    return `<div class="progress-segment" style="--seg-color: ${meta.color}">
              <div class="progress-fill" style="width:${pct}%; background:${meta.color}"></div>
              <span class="progress-label">${meta.label}</span>
            </div>`;
  }).join('');
}

function renderCards() {
  const root = document.getElementById('guide-root');
  if (!root) return;

  const filtered = activePhase ? allSteps.filter(s => s.phase === activePhase) : allSteps;

  if (filtered.length === 0) {
    root.innerHTML = '<p class="no-steps">No steps match the current filter.</p>';
    return;
  }

  // Group by phase
  const grouped = {};
  filtered.forEach(step => {
    if (!grouped[step.phase]) grouped[step.phase] = [];
    grouped[step.phase].push(step);
  });

  let html = '';
  for (const phase of Object.keys(grouped).sort((a,b) => a - b)) {
    const meta = PHASE_META[phase];
    html += `<div class="phase-group">
      <div class="phase-group-header" style="--phase-color: ${meta.color}">
        <span class="phase-badge" style="background:${meta.color}">${phase}</span>
        <span class="phase-title">${meta.label}</span>
      </div>
      <div class="step-cards">`;

    grouped[phase].forEach(step => {
      const icon = ICON_MAP[step.iconKey] || '&#9679;';
      const isDone = completedSteps.has(step.id);
      html += `
        <div class="step-card ${isDone ? 'completed' : ''}"
             data-step-id="${step.id}"
             data-related-part="${step.relatedPart || ''}"
             style="--card-accent: ${meta.color}">
          <div class="step-card-top">
            <div class="step-number" style="background:${meta.color}">${step.id}</div>
            <div class="step-icon">${icon}</div>
            <label class="step-check">
              <input type="checkbox" ${isDone ? 'checked' : ''} data-step-id="${step.id}">
              <span class="checkmark"></span>
            </label>
          </div>
          <h4 class="step-title">${step.title}</h4>
          <p class="step-desc">${step.description}</p>
          ${step.relatedPart ? `<button class="view-3d-btn" data-part="${step.relatedPart}">View in 3D &rarr;</button>` : ''}
          <div class="step-expand">
            <button class="expand-btn" aria-expanded="false">Details &#9662;</button>
            <div class="expand-content">
              <p>Category: ${step.category}</p>
              ${step.relatedPart ? `<p>Related part: <code>${step.relatedPart}</code></p>` : ''}
            </div>
          </div>
        </div>`;
    });

    html += '</div></div>';
  }

  root.innerHTML = html;

  // Wire up checkbox toggles
  root.querySelectorAll('.step-check input').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.stepId);
      if (e.target.checked) completedSteps.add(id);
      else completedSteps.delete(id);
      renderProgressBar();
      e.target.closest('.step-card').classList.toggle('completed', e.target.checked);
    });
  });

  // Wire up expand buttons
  root.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isOpen);
      btn.closest('.step-expand').classList.toggle('open', !isOpen);
    });
  });

  // Wire up "View in 3D" buttons
  root.querySelectorAll('.view-3d-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const partId = btn.dataset.part;
      if (window.DryerTrainer) {
        window.DryerTrainer.showSection('playground');
        window.DryerTrainer.focusPart(partId);
      }
    });
  });

  // Wire up card click -> sidebar update
  root.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.step-check') || e.target.closest('.expand-btn') || e.target.closest('.view-3d-btn')) return;
      const stepId = parseInt(card.dataset.stepId);
      const step = allSteps.find(s => s.id === stepId);
      updateSidebar(step);
    });
  });
}

function updateSidebar(step) {
  const sidebar = document.getElementById('guide-sidebar');
  if (!sidebar || !step) return;

  const meta = PHASE_META[step.phase];
  sidebar.innerHTML = `
    <div class="sidebar-detail" style="--detail-color: ${meta.color}">
      <div class="sidebar-phase-badge" style="background:${meta.color}">${meta.label}</div>
      <h3>Step ${step.id}: ${step.title}</h3>
      <p>${step.description}</p>
      ${step.relatedPart
        ? `<div class="sidebar-part-ref">
             <span>Related Part:</span>
             <code>${step.relatedPart}</code>
             <button class="sidebar-view-3d" data-part="${step.relatedPart}">Open in 3D &rarr;</button>
           </div>`
        : ''}
      <div class="sidebar-visual-placeholder">
        <div class="placeholder-box">
          <p>Visual context for "${step.title}"</p>
          <small>Image, GIF, or 3D viewport will render here</small>
        </div>
      </div>
    </div>`;

  sidebar.querySelectorAll('.sidebar-view-3d').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.DryerTrainer) {
        window.DryerTrainer.showSection('playground');
        window.DryerTrainer.focusPart(btn.dataset.part);
      }
    });
  });
}

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGuide);
} else {
  initGuide();
}
