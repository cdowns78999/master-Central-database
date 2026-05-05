// ─────────────────────────────────────────────────────────────
// Sample Pack Template — app.js
// Swap SAMPLE_CATEGORIES for your real data. Keep the shape.
// ─────────────────────────────────────────────────────────────

const SAMPLE_CATEGORIES = [
  { id: 'overview',   label: 'OV',  title: 'Overview',    accent: '#4da6ff',
    blurb: 'High-level intro. The landing panel for your app.' },
  { id: 'history',    label: 'HX',  title: 'History',     accent: '#b388ff',
    blurb: 'Timeline, origins, key moments.' },
  { id: 'players',    label: 'PL',  title: 'Key Players', accent: '#10b981',
    blurb: 'People, labels, orgs worth knowing.' },
  { id: 'markets',    label: 'MK',  title: 'Markets',     accent: '#f59e0b',
    blurb: 'Revenue streams, geographies, segments.' },
  { id: 'tools',      label: 'TL',  title: 'Tools',       accent: '#ef4444',
    blurb: 'Software, platforms, and tech stacks.' },
  { id: 'glossary',   label: 'GL',  title: 'Glossary',    accent: '#06b6d4',
    blurb: 'Definitions you will run into repeatedly.' },
  { id: 'resources',  label: 'RS',  title: 'Resources',   accent: '#ec4899',
    blurb: 'External links, docs, and further reading.' },
  { id: 'about',      label: 'AB',  title: 'About',       accent: '#94a3b8',
    blurb: 'Credits, changelog, contact.' }
];

// ── State ────────────────────────────────────────────────────
let activeId = SAMPLE_CATEGORIES[0].id;

// ── Build sidebar ────────────────────────────────────────────
function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  const pill = sidebar.querySelector('#nav-pill');

  SAMPLE_CATEGORIES.forEach(cat => {
    const a = document.createElement('a');
    a.className = 'nav-item';
    a.href = `#${cat.id}`;
    a.dataset.catId = cat.id;
    a.style.setProperty('--accent', cat.accent);
    a.title = cat.title;
    a.textContent = cat.label;
    a.addEventListener('click', e => {
      e.preventDefault();
      setActive(cat.id);
    });
    sidebar.insertBefore(a, pill);
  });
}

// ── Animated active pill (follows hovered/active nav item) ──
function movePill(targetEl) {
  const sidebar = document.getElementById('sidebar');
  const pill = sidebar.querySelector('#nav-pill');
  if (!targetEl) { pill.style.opacity = '0'; return; }
  const rect = targetEl.getBoundingClientRect();
  const parentRect = sidebar.getBoundingClientRect();
  pill.style.opacity = '1';
  pill.style.transform = `translateY(${rect.top - parentRect.top}px)`;
  pill.style.height = rect.height + 'px';
  pill.style.background = `color-mix(in srgb, ${getComputedStyle(targetEl).getPropertyValue('--accent')} 18%, transparent)`;
}

// ── Render main content (buttery swap) ──────────────────────
function renderContent(cat) {
  const swap = document.getElementById('content-swap');
  // Exit
  swap.classList.add('is-leaving');
  setTimeout(() => {
    swap.innerHTML = `
      <div class="content-inner" style="--accent:${cat.accent}">
        <div class="eyebrow">${cat.label} · CATEGORY</div>
        <h1 class="content-title">${cat.title}</h1>
        <p class="content-blurb">${cat.blurb}</p>
        <div class="card-grid">
          ${[1,2,3,4].map(n => `
            <div class="card">
              <div class="card-head">Sample ${n}</div>
              <div class="card-body">Placeholder body for ${cat.title} sample ${n}. Swap with real data.</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    // Enter
    swap.classList.remove('is-leaving');
    swap.classList.add('is-entering');
    requestAnimationFrame(() => {
      swap.classList.remove('is-entering');
    });
  }, 220);
}

// ── Activate a category ──────────────────────────────────────
function setActive(id) {
  const cat = SAMPLE_CATEGORIES.find(c => c.id === id);
  if (!cat) return;
  activeId = id;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.catId === id);
  });
  const activeEl = document.querySelector(`.nav-item[data-cat-id="${id}"]`);
  movePill(activeEl);

  // Update topbar
  document.getElementById('topbar-active').textContent = cat.title;
  document.getElementById('topbar-active').style.color = cat.accent;

  // Swap content
  renderContent(cat);
}

// ── Theme slider ─────────────────────────────────────────────
function wireThemes() {
  const dots = document.querySelectorAll('.theme-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      document.documentElement.setAttribute('data-theme', dot.dataset.theme);
    });
  });
}

// ── FAB (floating action button) ─────────────────────────────
function wireFab() {
  const fab = document.getElementById('fab');
  fab.addEventListener('click', () => {
    fab.classList.add('pulse');
    setTimeout(() => fab.classList.remove('pulse'), 500);
    // Hook: your primary action goes here.
    console.log('[FAB] clicked — active category:', activeId);
  });
}

// ── Boot ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  wireThemes();
  wireFab();
  setActive(SAMPLE_CATEGORIES[0].id);

  // Keep pill aligned on resize
  window.addEventListener('resize', () => {
    const activeEl = document.querySelector('.nav-item.active');
    movePill(activeEl);
  });
});
