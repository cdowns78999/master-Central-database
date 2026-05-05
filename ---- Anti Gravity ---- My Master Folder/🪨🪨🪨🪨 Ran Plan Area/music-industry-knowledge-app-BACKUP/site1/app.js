// ============================================================
// Music Industry Knowledge App — Site 1 App Logic
// Reads MUSIC_DATA, renders all 26 sections, handles nav + parallax
// ============================================================

'use strict';

// ── Accent color map ─────────────────────────────────────────
const ACCENT_COLORS = {
  1:  '#4da6ff',
  2:  '#ff4da6',
  3:  '#ffd700',
  4:  '#a855f7',
  5:  '#14b8a6',
  6:  '#f97316',
  7:  '#ef4444',
  8:  '#84cc16',
  9:  '#8b5cf6',
  10: '#06b6d4',
  11: '#10b981',
  12: '#f43f5e',
  13: '#f59e0b',
  14: '#6366f1',
  15: '#64748b',
  16: '#eab308',
  17: '#0ea5e9',
  18: '#78716c',
  19: '#71717a',
  20: '#d946ef',
  21: '#ec4899',
  22: '#92400e',
  23: '#22c55e',
  24: '#3b82f6',
  25: '#6b7280',
  26: '#38bdf8',
};

// Short nav labels — letter/number combos, up to 2 chars
function navLabel(cat) {
  const map = {
    1: 'ST', 2: 'SM', 3: 'RY', 4: 'SY', 5: 'DI',
    6: 'PB', 7: 'RL', 8: 'MG', 9: 'BR', 10: 'MK',
    11: 'PL', 12: 'PR', 13: 'LV', 14: 'BK', 15: 'CT',
    16: 'CP', 17: 'RO', 18: 'PC', 19: 'MX', 20: 'MV',
    21: 'ME', 22: 'RD', 23: 'BL', 24: 'TM', 25: 'AI',
    26: 'GL',
  };
  return map[cat.id] || String(cat.id);
}

// Hex to rgba helper
function hexRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Escape HTML
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Build sidebar nav ────────────────────────────────────────
function buildSidebar(categories) {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `<div class="sidebar-logo">MI</div>`;

  categories.forEach(cat => {
    const accent = ACCENT_COLORS[cat.id];
    const a = document.createElement('a');
    a.className = 'nav-item';
    a.href = `#cat-${cat.id}`;
    a.dataset.catId = cat.id;
    a.style.setProperty('--accent', accent);
    a.title = cat.title;
    a.textContent = navLabel(cat);
    a.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth' });
    });
    sidebar.appendChild(a);
  });
}

// ── Render a single fact card ────────────────────────────────
function renderFactCard(text) {
  // Bold first sentence as a "stat" if it starts with a number or dollar sign
  const first = text.match(/^([^.!?]+[.!?])\s*/);
  if (first) {
    const head = first[1];
    const rest = text.slice(first[0].length);
    if (/^\$|^\d/.test(head)) {
      return `<div class="fact-card"><strong>${esc(head)}</strong>${esc(rest)}<span class="fact-src" title="Sources available">①</span></div>`;
    }
  }
  return `<div class="fact-card">${esc(text)}<span class="fact-src" title="Sources available">①</span></div>`;
}

// ── Render sources row ───────────────────────────────────────
function renderSources(sources) {
  return sources.map(s => `
    <a class="source-pill" href="${esc(s.url)}" target="_blank" rel="noopener">
      <span class="source-type ${esc(s.type)}">${esc(s.type)}</span>
      <span>${esc(s.name)}</span>
    </a>
  `).join('');
}

// ── Render bar chart (category 26) ──────────────────────────
function renderChart(chartData, accent) {
  const max = Math.max(...chartData.map(d => d.revenueUSD));
  const rows = chartData.map(d => {
    const pct = (d.revenueUSD / max) * 100;
    return `
      <div class="chart-bar-row">
        <div class="chart-region">${esc(d.region)}</div>
        <div class="chart-bar-wrap">
          <div class="chart-bar-fill" style="width:${pct.toFixed(1)}%; background:${accent};"></div>
        </div>
        <div class="chart-val">$${d.revenueUSD}B</div>
        <div style="font-size:10px;color:#555;">${d.streamingShare}% stream</div>
      </div>
    `;
  }).join('');
  return `<div class="chart-block">${rows}</div>`;
}

// ── Render one category section ──────────────────────────────
function renderSection(cat) {
  const accent = ACCENT_COLORS[cat.id];
  const accentBg = hexRgba(accent, 0.04);
  const accentGhost = hexRgba(accent, 0.035);

  const factsHtml = cat.keyFacts.map(renderFactCard).join('');

  const mistakesHtml = cat.commonMistakes.map(m => `
    <li class="mistake-item">
      <span class="mistake-icon">⚠</span>
      <span>${esc(m)}</span>
    </li>
  `).join('');

  const sourcesHtml = renderSources(cat.sources);

  // Chart for category 26
  const chartHtml = (cat.id === 26 && cat.chartData)
    ? `
      <p class="facts-heading">Global Revenue by Market (2023)</p>
      ${renderChart(cat.chartData, accent)}
    `
    : '';

  return `
    <section
      class="cat-section"
      id="cat-${cat.id}"
      style="--accent: ${accent}; --accent-bg: ${accentBg}; --accent-ghost: ${accentGhost};"
    >
      <div class="parallax-bg" data-num="${String(cat.id).padStart(2, '0')}"></div>

      <div class="section-content">

        <div class="section-header">
          <div class="cat-number"># ${String(cat.id).padStart(2, '0')}</div>
          <h2 class="cat-title">${esc(cat.title)}</h2>
          <p class="cat-summary">${esc(cat.summary)}</p>
        </div>

        <div class="section-divider"></div>

        <p class="facts-heading">Key Facts</p>
        <div class="facts-grid">
          ${factsHtml}
        </div>

        <p class="facts-heading" style="margin-top:40px;">Standard Practice</p>
        <div class="standard-block">${esc(cat.standardPractice)}</div>

        <p class="facts-heading" style="margin-top:40px;">Common Mistakes</p>
        <ul class="mistakes-list">
          ${mistakesHtml}
        </ul>

        ${chartHtml}

        <p class="facts-heading" style="margin-top:40px;">Sources</p>
        <div class="sources-row">
          ${sourcesHtml}
        </div>

      </div>
    </section>
  `;
}

// ── Parallax scroll handler ──────────────────────────────────
function initParallax() {
  const bgs = document.querySelectorAll('.parallax-bg');
  window.addEventListener('scroll', () => {
    bgs.forEach(el => {
      const rect = el.closest('.cat-section').getBoundingClientRect();
      el.style.transform = `translateY(${-rect.top * 0.3}px)`;
    });
  }, { passive: true });
}

// ── Active nav tracking via IntersectionObserver ─────────────
function initActiveNav() {
  const navItems = document.querySelectorAll('.nav-item[data-cat-id]');
  const topbar = document.getElementById('topbar-active');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id; // "cat-N"
        const catId = id.replace('cat-', '');
        const accent = ACCENT_COLORS[parseInt(catId)];

        navItems.forEach(item => {
          const active = item.dataset.catId === catId;
          item.classList.toggle('active', active);
          item.style.setProperty('--accent', ACCENT_COLORS[parseInt(item.dataset.catId)]);
        });

        if (topbar) {
          const cat = MUSIC_DATA.categories.find(c => c.id === parseInt(catId));
          if (cat) {
            topbar.textContent = cat.title;
            topbar.style.color = accent;
          }
        }
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  });

  document.querySelectorAll('.cat-section').forEach(section => {
    observer.observe(section);
  });
}

// ── Curriculum: generate actionable steps from category data ─
function buildSteps(cat) {
  // Pull sentences from standardPractice and stitch with keyFacts
  const sentences = cat.standardPractice
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.trim().length > 20)
    .slice(0, 3);

  const factSentences = cat.keyFacts
    .map(f => f.split(/(?<=[.!?])\s+/)[0])
    .filter(s => s.trim().length > 20)
    .slice(0, 2);

  const all = [...sentences, ...factSentences].slice(0, 5);

  return all.map((s, i) => {
    // Convert declarative to imperative by trimming leading connectors
    const clean = s.replace(/^(typically|usually|often|most|many|artists|labels)\s+/i, '').trim();
    const imperative = clean.charAt(0).toUpperCase() + clean.slice(1);
    return `Step ${i + 1}: ${imperative}`;
  });
}

// ── Curriculum: build HTML content for a category ────────────
function buildCurrContent(cat) {
  const accent = ACCENT_COLORS[cat.id];

  // Badge + hero
  const badge = `<span class="curr-badge" style="background:${hexRgba(accent,0.15)};color:${accent};border:1px solid ${hexRgba(accent,0.3)};">${esc(cat.title)}</span>`;
  const hero = `<h2 class="curr-hero" style="color:${accent};">The Complete Guide to ${esc(cat.title)}</h2>`;
  const subtitle = `<p class="curr-subtitle">${esc(cat.summary)}</p>`;

  function sectionLabel(text) {
    return `
      <p class="curr-section-label">
        <span class="curr-section-dot" style="background:${accent};"></span>
        ${text}
      </p>
    `;
  }

  // Foundation — first 2-3 keyFacts
  const foundFacts = cat.keyFacts.slice(0, 3);
  const foundHtml = `<ul class="curr-fact-list">${foundFacts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`;

  // Core concepts — standardPractice split into paragraphs
  const practiceParas = cat.standardPractice
    .split(/\.\s+(?=[A-Z])/)
    .filter(p => p.trim())
    .map(p => `<p class="curr-prose" style="margin-bottom:10px;">${esc(p.trim().replace(/\.?$/, '.'))} </p>`)
    .join('');

  // Standard practice facts — next 2-3 keyFacts
  const practFacts = cat.keyFacts.slice(3, 6);
  const practHtml = practFacts.length
    ? `<ul class="curr-fact-list">${practFacts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`
    : foundHtml;

  // Common pitfalls — warning cards
  const warningsHtml = `<div class="curr-warnings">${cat.commonMistakes.map(m => `
    <div class="curr-warning-card">
      <span class="curr-warning-icon">⚠</span>
      <span>${esc(m)}</span>
    </div>
  `).join('')}</div>`;

  // Hands-on steps
  const steps = buildSteps(cat);
  const stepsHtml = `<ol class="curr-step-list">${steps.map((s, i) => `
    <li>
      <span class="curr-step-num" style="background:${hexRgba(accent,0.2)};color:${accent};">${i + 1}</span>
      <span>${esc(s.replace(/^Step \d+:\s*/, ''))}</span>
    </li>
  `).join('')}</ol>`;

  // Sources row
  const sourcesHtml = `<div class="curr-sources">${renderSources(cat.sources)}</div>`;

  return `
    ${badge}
    ${hero}
    ${subtitle}

    ${sectionLabel('FOUNDATION — What you need to know before anything else.')}
    ${foundHtml}

    ${sectionLabel('CORE CONCEPTS — How it actually works.')}
    ${practiceParas}

    ${sectionLabel('STANDARD PRACTICE — What professionals do in this space today.')}
    ${practHtml}

    ${sectionLabel('COMMON PITFALLS — What to avoid.')}
    ${warningsHtml}

    ${sectionLabel('HANDS-ON IMPLEMENTATION — Take this into your own hands.')}
    ${stepsHtml}

    ${sectionLabel('SOURCES')}
    ${sourcesHtml}
  `;
}

// ── Open curriculum overlay for a given category id ──────────
function openCurriculum(catId) {
  const cat = MUSIC_DATA.categories.find(c => c.id === catId);
  if (!cat) return;

  const content = document.getElementById('curr-content');
  const overlay = document.getElementById('curriculum-overlay');
  const panel = overlay.querySelector('.curr-panel');

  content.innerHTML = buildCurrContent(cat);
  overlay.classList.remove('hidden');

  // Re-trigger slide-in animation
  panel.style.animation = 'none';
  panel.offsetHeight; // reflow
  panel.style.animation = '';

  // Sync button accent to active category
  const accent = ACCENT_COLORS[catId];
  const btn = document.getElementById('curriculum-btn');
  if (btn) btn.style.setProperty('--accent', accent);
}

// ── Close curriculum overlay ─────────────────────────────────
function closeCurriculum() {
  document.getElementById('curriculum-overlay').classList.add('hidden');
}

// ── Wire curriculum button + overlay events ──────────────────
function initCurriculum() {
  const btn = document.getElementById('curriculum-btn');
  const overlay = document.getElementById('curriculum-overlay');
  const closeBtn = overlay.querySelector('.curr-close');

  // Track currently visible category via IntersectionObserver result
  // We piggyback on the topbar-active element text → find matching cat
  btn.addEventListener('click', () => {
    const topbar = document.getElementById('topbar-active');
    const activeTitle = topbar ? topbar.textContent.trim() : '';
    let cat = MUSIC_DATA.categories.find(c => c.title === activeTitle);

    // Fallback: first category
    if (!cat) cat = MUSIC_DATA.categories[0];
    if (cat) openCurriculum(cat.id);
  });

  closeBtn.addEventListener('click', closeCurriculum);

  // Click backdrop (not panel) to close
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCurriculum();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCurriculum();
  });
}

// ── Main render ──────────────────────────────────────────────
function init() {
  if (typeof MUSIC_DATA === 'undefined') {
    console.error('MUSIC_DATA not found — ensure data/data.js is loaded first.');
    return;
  }

  const { categories } = MUSIC_DATA;

  // Build sidebar
  buildSidebar(categories);

  // Render all sections
  const main = document.getElementById('main');
  main.innerHTML = categories.map(renderSection).join('');

  // Init parallax
  initParallax();

  // Init active nav tracking
  initActiveNav();

  // Init curriculum overlay
  initCurriculum();
}

// Run after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
