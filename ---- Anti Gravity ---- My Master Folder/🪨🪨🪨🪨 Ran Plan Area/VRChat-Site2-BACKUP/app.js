/* ============================================
   VRCHAT ULTIMATE — SITE 2 — APP.JS
   Hash-based SPA Router + Section Renderers
   ============================================ */

'use strict';

// ── Router Config ──
const NAV_ITEMS = [
  { id: 'section-1',  icon: '🚨', label: 'Report Behavior' },
  { id: 'section-2',  icon: '🎮', label: 'New to VRChat' },
  { id: 'section-3',  icon: '🫖', label: 'Gossip Column' },
  { id: 'section-4',  icon: '🌍', label: 'World of the Week' },
  { id: 'section-5',  icon: '👾', label: 'Avatar Showcase' },
  { id: 'section-6',  icon: '✨', label: 'Creator Spotlight' },
  { id: 'section-7',  icon: '📅', label: 'Event Calendar' },
  { id: 'section-8',  icon: '📖', label: 'Slang Dictionary' },
  { id: 'section-9',  icon: '📰', label: 'News Feed' },
  { id: 'section-10', icon: '🎧', label: 'DJ & Raves' },
  { id: 'section-11', icon: '🕹️', label: 'Best Games in VR' },
  { id: 'section-12', icon: '🛠️', label: 'Avatar Creation' },
  { id: 'section-13', icon: '💻', label: 'Dev Corner' },
  { id: 'section-14', icon: '🗺️', label: '50 Worlds' },
  { id: 'section-15', icon: '🦾', label: 'Body Tracking' },
  { id: 'section-16', icon: '🔞', label: 'Sex & VRChat 18+' },
  { id: 'section-17', icon: '💞', label: 'Interactive Toy Market' },
  { id: 'section-18', icon: '📜', label: 'VRChat History' },
];

// ── State ──
let currentSection = 'section-1';

// ── Init ──
function init() {
  renderSidebar();
  setupRouter();
  window.addEventListener('hashchange', route);
  route();
}

// ── Sidebar ──
function renderSidebar() {
  const list = document.getElementById('nav-list');
  list.innerHTML = NAV_ITEMS.map(item => `
    <div class="nav-item" data-id="${item.id}" onclick="navigateTo('${item.id}')">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
    </div>
  `).join('');
}

function updateActiveNav(id) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });
}

// ── Router ──
function setupRouter() {}

function navigateTo(id) {
  window.location.hash = id;
  closeSidebar();
}

function route() {
  const hash = window.location.hash.replace('#', '') || 'section-1';
  const valid = NAV_ITEMS.find(n => n.id === hash);
  currentSection = valid ? hash : 'section-1';
  updateActiveNav(currentSection);
  const nav = NAV_ITEMS.find(n => n.id === currentSection);
  document.getElementById('page-title').textContent = nav ? nav.label : '';
  document.getElementById('breadcrumb').textContent = `VRChat Ultimate › ${nav ? nav.label : ''}`;
  renderSection(currentSection);
}

// ── Mobile Sidebar ──
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('visible');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('visible');
}

// ── Render Dispatcher ──
function renderSection(id) {
  const el = document.getElementById('main-content');
  el.className = 'section-fade-enter';
  const renderers = {
    'section-1':  renderSection1,
    'section-2':  renderSection2,
    'section-3':  renderSection3,
    'section-4':  renderSection4,
    'section-5':  renderSection5,
    'section-6':  renderSection6,
    'section-7':  renderSection7,
    'section-8':  renderSection8,
    'section-9':  renderSection9,
    'section-10': renderSection10,
    'section-11': renderSection11,
    'section-12': renderSection12,
    'section-13': renderSection13,
    'section-14': renderSection14,
    'section-15': renderSection15,
    'section-16': renderSection16,
    'section-17': renderSection17,
    'section-18': renderSection18,
  };
  if (renderers[id]) el.innerHTML = renderers[id]();
  else el.innerHTML = `<p class="text-muted">Section not found.</p>`;
  el.void = void el.offsetWidth; // trigger reflow
  el.className = '';
  bindSectionEvents(id);
}

// ── Copy Code ──
function copyCode(btn) {
  const block = btn.closest('.code-block');
  const text = block.querySelector('code') ? block.querySelector('code').textContent : block.textContent.replace('Copy', '').trim();
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
}

// ── Checklist toggle ──
function toggleCheck(el) {
  el.classList.toggle('checked');
  el.textContent = el.classList.contains('checked') ? '✓' : '';
}

// ── Platform card expand ──
function togglePlatform(el) {
  el.classList.toggle('expanded');
}

// ── Age Gate ──
function checkAgeGate(section) {
  return sessionStorage.getItem(`age-verified-${section}`) === 'yes';
}
function confirmAge(section) {
  sessionStorage.setItem(`age-verified-${section}`, 'yes');
  route();
}
function denyAge() {
  navigateTo('section-1');
}

// ── Filter Pills ──
function setFilter(btn, group) {
  document.querySelectorAll(`[data-filter-group="${group}"]`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const val = btn.dataset.filter;
  document.querySelectorAll(`[data-filter="${group}"]`).forEach(card => {
    const cats = card.dataset.cat || '';
    card.style.display = (val === 'all' || cats.includes(val)) ? '' : 'none';
  });
}

// ── Slang Search ──
function filterSlang(q) {
  q = q.toLowerCase().trim();
  document.querySelectorAll('.term-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = (!q || text.includes(q)) ? '' : 'none';
  });
}

// ── Alpha Filter ──
function filterAlpha(letter, btn) {
  document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.term-card').forEach(card => {
    const word = card.querySelector('.term-word')?.textContent?.trim()[0]?.toUpperCase() || '';
    card.style.display = (letter === 'ALL' || word === letter) ? '' : 'none';
  });
  document.getElementById('slang-search').value = '';
}

// ── World Modal ──
function openWorldModal(name, creator, category, desc, vibe) {
  const overlay = document.createElement('div');
  overlay.className = 'world-modal-overlay';
  overlay.innerHTML = `
    <div class="world-modal" style="position:relative">
      <button class="modal-close" onclick="this.closest('.world-modal-overlay').remove()">✕</button>
      <div class="tag purple mb-12">${category}</div>
      <h2 style="font-size:1.5rem;font-weight:900;margin-bottom:8px">${name}</h2>
      <p class="text-muted mb-12">by ${creator}</p>
      <p style="color:var(--text-secondary);line-height:1.7;margin-bottom:16px">${desc}</p>
      <div class="card-tags">
        ${vibe.map(v => `<span class="tag cyan">${v}</span>`).join('')}
      </div>
      <div style="margin-top:20px">
        <a href="https://vrchat.com/home/search/${encodeURIComponent(name)}" target="_blank" class="btn btn-primary">Open in VRChat ↗</a>
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ── Wizard ──
function wizardNext(current, next) {
  document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('visible'));
  document.querySelectorAll('.wizard-dot').forEach((d, i) => {
    if (i < next - 1) d.classList.add('done');
    d.classList.toggle('active', i === next - 1);
  });
  const panel = document.getElementById(`wizard-panel-${next}`);
  if (panel) panel.classList.add('visible');
}

// ── Quiz ──
function quizAnswer(result) {
  const res = document.getElementById('quiz-result');
  if (res) { res.textContent = result; res.classList.add('visible'); }
}

// ── Bind events per section ──
function bindSectionEvents(id) {
  if (id === 'section-8') {
    const input = document.getElementById('slang-search');
    if (input) input.addEventListener('input', e => filterSlang(e.target.value));
  }
}

/* ============================================================
   SECTION RENDERERS
   ============================================================ */

// ─── SECTION 1: Report Behavior ───
function renderSection1() {
  return `
  <div class="section-header">
    <h1 class="section-title">🚨 Report <span>Violating</span> & Predatory Behavior</h1>
    <p class="section-desc">VRChat is built on community trust. Know your rights, know the tools, and never hesitate to report harm.</p>
  </div>

  <div class="card warning-card full-width mb-16">
    <div class="warning-icon">⚠️</div>
    <div class="card-title">What is Reportable?</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin-top:10px">
      ${['Sexual harassment or solicitation','Hate speech, slurs, racism','Predatory behavior toward minors','Cyberstalking or doxxing','Non-consensual avatar cloning','Crashing or exploiting worlds','Threatening or violent speech','Unwanted sexual content (ERP)'].map(item =>
        `<div style="display:flex;gap:8px;align-items:flex-start;font-size:0.85rem;color:var(--text-secondary)"><span style="color:var(--red);margin-top:2px">●</span>${item}</div>`
      ).join('')}
    </div>
  </div>

  <div class="card stat-card">
    <div class="stat-value">44%</div>
    <div class="stat-label">of young people in VR encounter hate speech or harassment</div>
    <div class="stat-source">Source: Florida Atlantic University Study, 2024</div>
  </div>

  <div class="card stat-card">
    <div class="stat-value">62%</div>
    <div class="stat-label">of VR users report experiencing or witnessing sexual harassment</div>
    <div class="stat-source">Source: Center for Countering Digital Hate, 2023</div>
  </div>

  <div class="card stat-card">
    <div class="stat-value">18+</div>
    <div class="stat-label">VRChat requires age verification for adult content since 2023 EAC rollout</div>
    <div class="stat-source">Source: VRChat Blog</div>
  </div>

  <div class="section-divider"></div>
  <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:16px">Anonymous Report Wizard</h2>

  <div class="card accent-border">
    <div class="wizard-steps">
      <div class="wizard-dot active" id="wd-1">1</div>
      <div style="flex:1;height:2px;background:var(--border);align-self:center"></div>
      <div class="wizard-dot" id="wd-2">2</div>
      <div style="flex:1;height:2px;background:var(--border);align-self:center"></div>
      <div class="wizard-dot" id="wd-3">3</div>
      <div style="flex:1;height:2px;background:var(--border);align-self:center"></div>
      <div class="wizard-dot" id="wd-4">4</div>
    </div>

    <div id="wizard-panel-1" class="wizard-panel visible">
      <div class="card-title mb-8">Step 1: What type of incident?</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${['Harassment / Hate Speech','Sexual Misconduct','Minor Safety Issue','Threats / Violence','Exploitation / Hacking','Other'].map(t =>
          `<button class="quiz-option" onclick="wizardNext(1,2)">${t}</button>`
        ).join('')}
      </div>
    </div>

    <div id="wizard-panel-2" class="wizard-panel">
      <div class="card-title mb-8">Step 2: Gather your evidence</div>
      <ul style="list-style:disc;padding-left:20px;color:var(--text-secondary);font-size:0.88rem;line-height:2">
        <li>Take screenshots or screen recording</li>
        <li>Note the exact time and world name</li>
        <li>Copy the offender's VRChat username exactly</li>
        <li>Save any relevant chat logs</li>
      </ul>
      <button class="btn btn-outline mt-16" onclick="wizardNext(2,3)">I have evidence →</button>
    </div>

    <div id="wizard-panel-3" class="wizard-panel">
      <div class="card-title mb-8">Step 3: Report In-App</div>
      <ol style="padding-left:20px;color:var(--text-secondary);font-size:0.88rem;line-height:2.2">
        <li>Open your Quick Menu (click the VRChat button)</li>
        <li>Select the user from your recent interactions</li>
        <li>Choose "Report User"</li>
        <li>Select the violation category</li>
        <li>Add a description and attach evidence</li>
        <li>Submit — you'll get a confirmation number</li>
      </ol>
      <button class="btn btn-outline mt-16" onclick="wizardNext(3,4)">Reported! →</button>
    </div>

    <div id="wizard-panel-4" class="wizard-panel">
      <div class="card-title mb-8">✅ Done. What's Next?</div>
      <p class="card-body">Your report has been sent to VRChat Trust & Safety. You can also escalate to external authorities if needed. Use the Block & Mute tools immediately for your safety.</p>
      <div class="card-tags mt-12">
        <a href="https://help.vrchat.com/hc/en-us/requests/new" target="_blank" class="btn btn-primary" style="text-decoration:none">VRChat Support Ticket</a>
        <a href="https://www.cybertipline.org/" target="_blank" class="btn btn-outline" style="text-decoration:none">NCMEC CyberTipline</a>
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
  <div class="card-grid col-2">
    <div class="card resource-card">
      <div class="resource-name">🆘 Crisis Text Line</div>
      <div class="resource-desc">Text HOME to 741741 — free, confidential, 24/7 crisis counseling for any emotional distress</div>
      <div class="resource-link"><a href="https://www.crisistextline.org/" target="_blank">crisistextline.org →</a></div>
    </div>
    <div class="card resource-card">
      <div class="resource-name">🔒 VRChat Trust & Safety</div>
      <div class="resource-desc">Official reporting portal, safety guides, and community standards documentation</div>
      <div class="resource-link"><a href="https://help.vrchat.com/hc/en-us/categories/360000105003" target="_blank">help.vrchat.com →</a></div>
    </div>
    <div class="card resource-card">
      <div class="resource-name">🧒 NCMEC CyberTipline</div>
      <div class="resource-desc">For reports involving minors: National Center for Missing & Exploited Children</div>
      <div class="resource-link"><a href="https://www.cybertipline.org/" target="_blank">cybertipline.org →</a></div>
    </div>
    <div class="card resource-card">
      <div class="resource-name">🛡️ StopBullying.gov</div>
      <div class="resource-desc">Federal resources for cyberbullying prevention, reporting, and recovery</div>
      <div class="resource-link"><a href="https://www.stopbullying.gov/" target="_blank">stopbullying.gov →</a></div>
    </div>
  </div>`;
}

// ─── SECTION 2: New to VRChat ───
function renderSection2() {
  return `
  <div class="section-header">
    <h1 class="section-title">🎮 New to <span>VRChat?</span> Start Here</h1>
    <p class="section-desc">Your complete onboarding guide — from first login to thriving community member.</p>
  </div>

  <div class="card-grid">
    <div class="card platform-card" onclick="togglePlatform(this)">
      <div class="platform-icon">🖥️</div>
      <div class="card-title">PC Desktop</div>
      <div class="card-body">No headset? No problem. Full VRChat on keyboard & mouse.</div>
      <div class="expand-content">
        <ul class="checklist">
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Download VRChat on Steam (free)</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Create a VRChat account (not Steam login)</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Set display name & pronouns</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Pick a starter avatar in the Avatar menu</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Visit "The Black Cat" world to meet people</li>
        </ul>
        <p style="font-size:0.78rem;color:var(--text-muted);margin-top:8px">Minimum: GTX 1060, 8GB RAM, Windows 10</p>
      </div>
    </div>
    <div class="card platform-card" onclick="togglePlatform(this)">
      <div class="platform-icon">🥽</div>
      <div class="card-title">VR Headset</div>
      <div class="card-body">Full immersive experience. Supports Meta Quest, Valve Index, Pico & more.</div>
      <div class="expand-content">
        <ul class="checklist">
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Install VRChat from your headset's app store</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Link or create a VRChat account</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Calibrate guardian/boundary</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Test your microphone in Settings</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Visit a beginner-friendly world like "Just B Club"</li>
        </ul>
        <div class="card-tags mt-8">
          <span class="tag green">Quest 2/3/Pro</span>
          <span class="tag cyan">Valve Index</span>
          <span class="tag purple">Pico 4</span>
        </div>
      </div>
    </div>
    <div class="card platform-card" onclick="togglePlatform(this)">
      <div class="platform-icon">📱</div>
      <div class="card-title">Mobile (Beta)</div>
      <div class="card-body">VRChat Mobile launched 2024 — iOS & Android access to social spaces.</div>
      <div class="expand-content">
        <ul class="checklist">
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Download from App Store or Google Play</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Mobile-only worlds available immediately</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Cross-platform with PC/Quest users</li>
          <li><span class="check-box" onclick="toggleCheck(this);event.stopPropagation()"></span>Limited avatar customization vs desktop</li>
        </ul>
        <p style="font-size:0.78rem;color:var(--text-muted);margin-top:8px">Note: Some worlds are PC-only or Quest-only</p>
      </div>
    </div>
  </div>

  <div class="section-divider"></div>

  <div class="card checklist-card accent-border">
    <div class="card-title">✅ First 10 Minutes Checklist</div>
    <ul class="checklist">
      <li><span class="check-box" onclick="toggleCheck(this)"></span>Set your avatar (don't get stuck as a robot)</li>
      <li><span class="check-box" onclick="toggleCheck(this)"></span>Turn on Safe Mode if feeling overwhelmed</li>
      <li><span class="check-box" onclick="toggleCheck(this)"></span>Learn the Quick Menu (X / left grip)</li>
      <li><span class="check-box" onclick="toggleCheck(this)"></span>Mute/unmute test — people CAN hear you</li>
      <li><span class="check-box" onclick="toggleCheck(this)"></span>Visit a public world with 10–20 people</li>
      <li><span class="check-box" onclick="toggleCheck(this)"></span>Add your first friend</li>
      <li><span class="check-box" onclick="toggleCheck(this)"></span>Read the Community Guidelines once</li>
      <li><span class="check-box" onclick="toggleCheck(this)"></span>Set up your Trust Rank preferences</li>
    </ul>
  </div>

  <div class="card-grid col-2 mt-20">
    <div class="card tip-card">
      <div class="tip-icon">💡</div>
      <div class="card-title">Safety 101</div>
      <div class="card-body">
        <strong style="color:var(--accent)">Trust & Safety Rank</strong> — New users start as "Visitor". You level up by spending time in VRChat, not buying things.<br><br>
        <strong style="color:var(--accent)">Safe Mode</strong> — Blocks all user-uploaded content. Use it in crowded or new worlds.<br><br>
        <strong style="color:var(--accent)">Personal Space</strong> — Turn on in Settings to block people from entering your physical space.<br><br>
        <strong style="color:var(--accent)">Mute All</strong> — One button in Quick Menu. Use it freely.
      </div>
    </div>
    <div class="card tip-card">
      <div class="tip-icon">🏆</div>
      <div class="card-title">Trust Rank Explained</div>
      <div class="card-body">
        VRChat's trust system unlocks features based on legitimate usage:<br><br>
        <span style="color:var(--text-muted)">Visitor</span> → <span style="color:#88aaff">New User</span> → <span style="color:var(--accent)">User</span> → <span style="color:var(--green)">Known User</span> → <span style="color:var(--yellow)">Trusted User</span><br><br>
        Higher trust = see more content by default. Trusted users can upload avatars without moderation hold.
      </div>
    </div>
  </div>

  <div class="card-grid col-2 mt-0">
    <div class="card resource-card">
      <div class="resource-name">📚 VRChat Wiki</div>
      <div class="resource-desc">Official comprehensive documentation — controls, features, safety, SDK</div>
      <div class="resource-link"><a href="https://docs.vrchat.com" target="_blank">docs.vrchat.com →</a></div>
    </div>
    <div class="card resource-card">
      <div class="resource-name">🎓 VRCreators.net</div>
      <div class="resource-desc">Beginner-friendly guides written by the community, not the devs</div>
      <div class="resource-link"><a href="https://vrchatguide.com" target="_blank">vrchatguide.com →</a></div>
    </div>
  </div>`;
}

// ─── SECTION 3: Gossip Column ───
function renderSection3() {
  const stories = [
    { title: 'Drama at "The Black Cat"', tea: '🔥🔥🔥🔥', type: 'receipts', category: 'community', date: 'Apr 7, 2026', body: 'A well-known world host was caught on stream using alts to inflate their player count metrics and game world rankings. Screenshots confirm three separate alt accounts, all with the same typing patterns. The host has since gone quiet.' },
    { title: 'SDK Drama: Plugin Dev Goes Rogue', tea: '🔥🔥🔥', type: 'rumor', category: 'dev', date: 'Apr 3, 2026', body: 'Allegedly a prominent VCC plugin developer pushed an update that quietly exfiltrates world metadata from users\' local SDK installs. No confirmed evidence yet, but three separate devs have reported unusual network traffic.' },
    { title: 'Creator Economy Payout Dispute', tea: '🔥🔥🔥🔥🔥', type: 'receipts', category: 'economy', date: 'Mar 29, 2026', body: 'A top-10 avatar creator claims VRChat\'s payout algorithm changed without notice, dropping their monthly earnings by 40%. They\'ve posted receipts showing two consecutive months of unexplained dips. Three other creators report the same pattern.' },
  ];
  const dramas = ['all','community','dev','economy','social','events'];
  return `
  <div class="section-header">
    <h1 class="section-title">🫖 The <span>Gossip</span> Column</h1>
    <p class="section-desc">Community intel, hot receipts, and unverified rumors — clearly labeled. Tip anonymously below.</p>
  </div>

  <div class="filter-row">
    ${dramas.map((d,i) => `<button class="filter-pill ${i===0?'active':''}" data-filter="${d}" data-filter-group="gossip" onclick="setFilter(this,'gossip')">${d.charAt(0).toUpperCase()+d.slice(1)}</button>`).join('')}
  </div>

  <div class="card-grid">
    ${stories.map(s => `
    <div class="card gossip-card" data-filter="gossip" data-cat="${s.category}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
        <span class="${s.type === 'receipts' ? 'receipt-badge' : 'rumor-badge'}">${s.type === 'receipts' ? '📄 RECEIPTS' : '💭 RUMOR'}</span>
        <span class="tea-meter">${s.tea}</span>
      </div>
      <div class="card-title">${s.title}</div>
      <div class="card-meta"><span>${s.date}</span><span class="tag gray">${s.category}</span></div>
      <div class="card-body">${s.body}</div>
    </div>`).join('')}

    <div class="card tip-form-card accent-border">
      <div class="card-title">📬 Submit a Tip Anonymously</div>
      <div class="card-body mb-12">No account required. Tips may be published or investigated at editorial discretion.</div>
      <textarea class="input" rows="4" placeholder="Describe the situation... Include usernames, world names, and any evidence you have." style="resize:vertical"></textarea>
      <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
        <select class="input" style="flex:1">
          <option>Community Drama</option>
          <option>Dev / SDK</option>
          <option>Creator Economy</option>
          <option>Social / Relationship</option>
          <option>Events</option>
          <option>Other</option>
        </select>
        <button class="btn btn-primary" onclick="this.textContent='Submitted!';setTimeout(()=>this.textContent='Submit Tip',2000)">Submit Tip</button>
      </div>
      <p style="font-size:0.72rem;color:var(--text-muted);margin-top:8px">No identifying info is stored. Tips are reviewed before publishing.</p>
    </div>
  </div>`;
}

// ─── SECTION 4: World of the Week ───
function renderSection4() {
  const past = [
    { name: 'Midnight Rooftop', creator: 'neonveil', vibe: ['Chill','Social'], desc: 'A stunning city skyline at perpetual 2am. Perfect for late-night conversations.' },
    { name: 'Haunted Eastbridge Asylum', creator: 'grimcraft_vr', vibe: ['Spooky','Game'], desc: 'Fully voiced horror exploration with branching narrative paths.' },
    { name: 'Pixel Art Gallery', creator: 'dot_witch', vibe: ['Art','Chill'], desc: 'Community-curated pixel art exhibitions that update every two weeks.' },
  ];
  return `
  <div class="section-header">
    <h1 class="section-title">🌍 World of <span>the Week</span></h1>
    <p class="section-desc">Handpicked each week by the editorial team. These worlds are worth your time.</p>
  </div>

  <div class="card hero-world-card">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px">
      <div style="flex:1">
        <div class="tag purple mb-12">⭐ EDITOR'S PICK — WEEK OF APR 7, 2026</div>
        <div class="world-name">Celestial Drift Observatory</div>
        <div style="color:var(--text-muted);font-size:0.9rem;margin-bottom:12px">by <strong style="color:var(--text-secondary)">astronaut_vr</strong></div>
        <p style="color:var(--text-secondary);max-width:600px;line-height:1.7;font-size:0.95rem">A breathtaking planetarium that responds to your real-world location's night sky. Walk across suspended glass bridges between galaxies, trigger constellation stories by touching glowing orbs, and wind down in the zero-gravity meditation pod. Best experienced with spatial audio headphones.</p>
        <div class="vibe-tags">
          <span class="tag cyan">Chill</span>
          <span class="tag purple">Art</span>
          <span class="tag green">Social</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;min-width:160px">
        <div class="card stat-card" style="padding:14px;margin:0">
          <div class="stat-value" style="font-size:1.5rem">9.4</div>
          <div class="stat-label">Vibe Rating</div>
        </div>
        <a href="https://vrchat.com/home/search/Celestial%20Drift%20Observatory" target="_blank" class="btn btn-primary" style="text-decoration:none;justify-content:center">Open World ↗</a>
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px;color:var(--text-secondary)">Past World Archive</h2>

  <div class="card-grid">
    ${past.map(w => `
    <div class="card world-card" onclick="openWorldModal('${w.name}','${w.creator}','World Archive','${w.desc}',${JSON.stringify(w.vibe)})">
      <div class="card-title">${w.name}</div>
      <div class="card-meta">by ${w.creator}</div>
      <div class="card-body">${w.desc}</div>
      <div class="vibe-tags mt-12">
        ${w.vibe.map(v => `<span class="tag cyan">${v}</span>`).join('')}
      </div>
      <div class="card-footer">
        <span class="text-muted" style="font-size:0.78rem">Click for full details</span>
        <span class="tag purple">Archive</span>
      </div>
    </div>`).join('')}

    <div class="card accent-border" style="display:flex;flex-direction:column;justify-content:center;text-align:center;padding:28px;cursor:pointer" onclick="navigateTo('section-14')">
      <div style="font-size:2rem;margin-bottom:8px">🗺️</div>
      <div class="card-title">Explore 50 Worlds</div>
      <div class="card-body mt-8">Browse our full curated database of 50 worlds across 20 categories</div>
      <div class="mt-12"><button class="btn btn-outline">Go to 50 Worlds →</button></div>
    </div>
  </div>`;
}

// ─── SECTION 5: Avatar Showcase ───
function renderSection5() {
  const avatars = [
    { name: 'Neon Kitsune', style: 'Fantasy', platform: 'Quest', fbt: true, facetrak: false, creator: 'foxcreations_vr', link: 'https://booth.pm' },
    { name: 'Cyberpunk Mech', style: 'Sci-Fi', platform: 'PC-Only', fbt: false, facetrak: false, creator: 'mech_studio', link: 'https://booth.pm' },
    { name: 'Pastel Bunny', style: 'Cute / Kawaii', platform: 'Quest', fbt: true, facetrak: true, creator: 'softpetal', link: 'https://booth.pm' },
    { name: 'Dark Elf Mage', style: 'Fantasy', platform: 'PC-Only', fbt: true, facetrak: false, creator: 'elf_works', link: 'https://booth.pm' },
    { name: 'Retro Robot', style: 'Sci-Fi', platform: 'Quest', fbt: false, facetrak: false, creator: 'retrobot3d', link: 'https://booth.pm' },
    { name: 'Harajuku Doll', style: 'Cute / Kawaii', platform: 'Quest', fbt: true, facetrak: true, creator: 'harucreate', link: 'https://booth.pm' },
  ];
  return `
  <div class="section-header">
    <h1 class="section-title">👾 Avatar <span>Showcase</span></h1>
    <p class="section-desc">Community-curated avatar picks — Quest-compatible, FBT-ready, and face-tracking enabled builds.</p>
  </div>

  <div class="filter-row">
    ${['all','Quest','PC-Only','FBT-Ready','Face-Tracking'].map((f,i)=>`<button class="filter-pill ${i===0?'active':''}" data-filter="${f}" data-filter-group="avatar" onclick="setFilter(this,'avatar')">${f}</button>`).join('')}
  </div>

  <div class="card-grid">
    ${avatars.map(a => `
    <div class="card avatar-card" data-filter="avatar" data-cat="${a.platform}${a.fbt?' FBT-Ready':''}${a.facetrak?' Face-Tracking':''}">
      <div class="avatar-platform">
        <span class="tag ${a.platform==='Quest'?'green':'purple'}">${a.platform}</span>
      </div>
      <div class="card-title">${a.name}</div>
      <div class="card-meta">by ${a.creator} · <span class="text-muted">${a.style}</span></div>
      <div class="card-tags mt-8">
        ${a.fbt?'<span class="tag cyan">FBT Ready</span>':''}
        ${a.facetrak?'<span class="tag orange">Face Tracking</span>':''}
      </div>
      <div class="card-footer">
        <a href="${a.link}" target="_blank" class="btn btn-ghost" style="text-decoration:none;font-size:0.78rem">View on BOOTH ↗</a>
      </div>
    </div>`).join('')}
  </div>

  <div class="section-divider"></div>
  <div class="card-grid col-2">
    <div class="card stat-card">
      <div class="stat-value">May 2025</div>
      <div class="stat-label">VRChat Avatar Marketplace officially launched — creators can now sell avatars directly</div>
      <div class="stat-source">Source: VRChat Blog, May 2025</div>
    </div>
    <div class="card" style="border-top:3px solid var(--pink)">
      <div class="card-title">🎌 Babiniku Culture</div>
      <div class="card-body">Babiniku (VTuber-style feminine avatar use by any gender) is a major VRChat cultural phenomenon. Thousands of users explore gender expression through anime-style avatars, often reporting transformative experiences of comfort and identity discovery in virtual space.</div>
      <div class="card-tags mt-10">
        <span class="tag pink">Identity</span>
        <span class="tag cyan">Culture</span>
      </div>
    </div>
  </div>`;
}

// ─── SECTION 6: Creator Spotlight ───
function renderSection6() {
  const creators = [
    { name: 'VoidScript', medium: 'World Designer', emoji: '🌌', works: ['The Null Space', 'Fractured Mirror', 'Grid 7'], tools: ['Unity', 'Blender', 'UDON#'], quote: 'I build the worlds I needed when I was lonely.' },
    { name: 'Softpetal', medium: 'Avatar Artist', emoji: '🌸', works: ['Pastel Bunny','Cloud Miku','Lumi v2'], tools: ['VRoid', 'Blender', 'Substance Painter'], quote: 'Every avatar I release lets someone be themselves.' },
    { name: 'GhostBeats', medium: 'DJ / Event Host', emoji: '👻', works: ['Ghost Club Residency','NYE Rave 2026','Spooky Frequencies'], tools: ['Ableton', 'VDJ', 'OBS'], quote: 'The crowd is real even if the room isn\'t.' },
  ];
  return `
  <div class="section-header">
    <h1 class="section-title">✨ Creator <span>Spotlight</span></h1>
    <p class="section-desc">The artists, builders, and performers making VRChat worth showing up for.</p>
  </div>

  <div class="card-grid">
    ${creators.map(c => `
    <div class="card profile-card">
      <div class="creator-avatar">${c.emoji}</div>
      <div class="card-title">${c.name}</div>
      <div class="card-meta"><span class="tag cyan">${c.medium}</span></div>
      <div class="card-body">
        <strong style="color:var(--text-primary);font-size:0.82rem">Notable Works</strong>
        <div style="margin:6px 0 10px">${c.works.map(w=>`<span style="display:inline-block;margin:2px 4px 2px 0;font-size:0.8rem;color:var(--text-secondary)">• ${w}</span>`).join('')}</div>
        <strong style="color:var(--text-primary);font-size:0.82rem">Tools</strong>
        <div class="card-tags" style="margin-top:6px">${c.tools.map(t=>`<span class="tag gray">${t}</span>`).join('')}</div>
      </div>
      <div class="card" style="background:rgba(0,212,255,0.05);border:1px solid var(--border-accent);padding:12px;margin-top:12px;border-radius:8px">
        <p style="font-style:italic;font-size:0.85rem;color:var(--text-primary)">"${c.quote}"</p>
      </div>
    </div>`).join('')}

    <div class="card nominate-card">
      <div style="font-size:2.5rem;margin-bottom:12px">🏆</div>
      <div class="card-title">Nominate a Creator</div>
      <div class="card-body" style="max-width:280px;margin:8px auto">Know someone building incredible things in VRChat? Put them on the radar.</div>
      <div style="margin-top:20px;display:flex;flex-direction:column;gap:10px;max-width:320px;margin-left:auto;margin-right:auto">
        <input class="input" placeholder="VRChat username..." />
        <input class="input" placeholder="Why they deserve the spotlight..." />
        <button class="btn btn-primary" onclick="this.textContent='Submitted! ✓';setTimeout(()=>this.textContent='Submit Nomination',2000)">Submit Nomination</button>
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
  <div class="card">
    <div class="card-title mb-12">💰 Creator Earnings Tiers</div>
    <table class="earnings-table">
      <thead><tr><th>Tier</th><th>Monthly Sales</th><th>Est. Earnings</th><th>What They Sell</th></tr></thead>
      <tbody>
        <tr><td class="tier-name">Hobbyist</td><td>1–10</td><td>$5–50/mo</td><td>Free/cheap avatars, first uploads</td></tr>
        <tr><td class="tier-name">Emerging</td><td>11–100</td><td>$50–500/mo</td><td>Niche avatars, simple worlds</td></tr>
        <tr><td class="tier-name">Established</td><td>101–500</td><td>$500–2,500/mo</td><td>Popular avatar bases, event worlds</td></tr>
        <tr><td class="tier-name">Professional</td><td>501–2000</td><td>$2,500–10K/mo</td><td>Full avatar lines, commissions</td></tr>
        <tr><td class="tier-name">Top Creator</td><td>2000+</td><td>$10K+/mo</td><td>Studios, branded collabs, IP</td></tr>
      </tbody>
    </table>
    <p style="font-size:0.75rem;color:var(--text-muted);margin-top:10px">Estimates based on community surveys and creator disclosures. VRChat takes 30% platform fee.</p>
  </div>`;
}

// ─── SECTION 7: Event Calendar ───
function renderSection7() {
  const events = [
    { name: 'Neon Noir Jazz Night', date: 'Apr 12, 2026 · 9PM EST', host: 'velvet_vr', type: 'Music/DJ', world: 'Neon Noir Lounge', featured: false },
    { name: 'Saturday Fursuit Meetup', date: 'Apr 13, 2026 · 2PM EST', host: 'fluffhub_admin', type: 'Meetup', world: 'Fur Den Central', featured: false },
    { name: 'VRChat Game Night: Murder 4', date: 'Apr 14, 2026 · 8PM EST', host: 'gamevr_official', type: 'Game Night', world: 'Murder 4 World', featured: false },
    { name: 'Midnight Roleplay: Cyberpunk City', date: 'Apr 15, 2026 · 11PM EST', host: 'rp_district', type: 'Roleplay', world: 'Neo Shibuya', featured: false },
    { name: 'Furality Ultra', date: 'Jun 4–7, 2026', host: 'furality_official', type: 'Seasonal', world: 'Furality Hub', featured: true },
  ];
  const types = ['all','Music/DJ','Roleplay','Game Night','Meetup','Seasonal'];
  return `
  <div class="section-header">
    <h1 class="section-title">📅 Event <span>Calendar</span></h1>
    <p class="section-desc">What's happening in the metaverse this week and beyond.</p>
  </div>

  <div class="filter-row">
    ${types.map((t,i)=>`<button class="filter-pill ${i===0?'active':''}" data-filter="${t}" data-filter-group="event" onclick="setFilter(this,'event')">${t}</button>`).join('')}
  </div>

  <div class="card-grid">
    <div class="card featured-card" data-filter="event" data-cat="Seasonal">
      <div class="tag red mb-12">⭐ EDITOR'S PICK</div>
      <div class="card-title" style="font-size:1.3rem">Furality Ultra 2026</div>
      <div class="event-date">June 4–7, 2026 · Multi-Day Festival</div>
      <div class="card-body mt-8">The world's largest VR furry convention returns for its most ambitious year yet. 40+ worlds, 200+ performers, art galleries, game nights, and DJ sets around the clock. Attendance typically exceeds 50,000 unique visitors over the 4-day run.</div>
      <div class="card-tags mt-12">
        <span class="tag cyan">Seasonal</span>
        <span class="tag purple">Music/DJ</span>
        <span class="tag green">Meetup</span>
        <a href="https://furality.org" target="_blank" class="btn btn-outline" style="text-decoration:none;margin-left:auto">furality.org ↗</a>
      </div>
    </div>

    ${events.filter(e=>!e.featured).map(e=>`
    <div class="card event-card" data-filter="event" data-cat="${e.type}">
      <div class="event-date">${e.date}</div>
      <div class="card-title">${e.name}</div>
      <div class="card-meta">Hosted by ${e.host} · ${e.world}</div>
      <div class="card-tags mt-8">
        <span class="tag cyan">${e.type}</span>
      </div>
    </div>`).join('')}
  </div>

  <div class="section-divider"></div>
  <div class="card-grid col-2">
    <div class="card resource-card">
      <div class="resource-name">📆 VRC.TL</div>
      <div class="resource-desc">Community event aggregator with timezone conversion and RSVP tracking</div>
      <div class="resource-link"><a href="https://vrc.tl" target="_blank">vrc.tl →</a></div>
    </div>
    <div class="card resource-card">
      <div class="resource-name">🎉 VRChatEvents.com</div>
      <div class="resource-desc">Curated event calendar with organizer profiles and world links</div>
      <div class="resource-link"><a href="https://vrchatevents.com" target="_blank">vrchatevents.com →</a></div>
    </div>
    <div class="card resource-card">
      <div class="resource-name">📋 VRCList</div>
      <div class="resource-desc">Community-run directory for worlds, groups, and recurring events</div>
      <div class="resource-link"><a href="https://vrclist.com" target="_blank">vrclist.com →</a></div>
    </div>
  </div>`;
}

// ─── SECTION 8: Slang Dictionary ───
function renderSection8() {
  const terms = [
    { word: 'Crasher', def: 'A person or bot that intentionally crashes a world instance using malicious assets or exploits.', example: '"Watch out, there\'s a crasher in the public lobby — switch instances."', newcomer: true },
    { word: 'Cloning', def: 'Ripping an avatar from a public instance without the creator\'s permission, using third-party extraction tools.', example: '"That\'s clearly a clone — look at the broken shapekeys."', newcomer: true },
    { word: 'Deskie', def: 'Slang for a user playing VRChat on desktop/keyboard-mouse instead of in a headset.', example: '"She\'s a deskie but she still dances better than most headset users."', newcomer: true },
    { word: 'EAC', def: 'Easy Anti-Cheat — the anti-exploit system VRChat added in 2023, controversial for blocking some modding tools.', example: '"EAC broke half my SDK mods overnight."', newcomer: false },
    { word: 'Earmuffs', def: 'A moderation tool that mutes a user for yourself only, without blocking them entirely.', example: '"Put earmuffs on anyone who won\'t stop mic-spamming."', newcomer: true },
    { word: 'FBT', def: 'Full Body Tracking — using extra trackers (hip, feet, chest) for full avatar body movement beyond just hands and head.', example: '"You need at least 3-point FBT to do the splits in-game."', newcomer: true },
    { word: 'Fallback', def: 'A simplified low-polygon avatar automatically shown when a user\'s avatar can\'t be rendered (performance limit or safety mode).', example: '"Your fallback is that grey robot everyone gets."', newcomer: true },
    { word: 'Instance', def: 'A single running copy of a world. Multiple instances of the same world can exist simultaneously with different players.', example: '"The public instance was full so we made a friends+ instance."', newcomer: true },
    { word: 'Kitbash', def: 'Combining parts from multiple different 3D models to create a new avatar, often without proper licensing.', example: '"That\'s clearly a kitbash — three different bases welded together."', newcomer: false },
    { word: 'OSC', def: 'Open Sound Control — a protocol VRChat supports for connecting external apps, toys, and controllers to avatar parameters.', example: '"I set up OSC so my heartrate controls my avatar\'s glow."', newcomer: false },
    { word: 'Phantom Sense', def: 'The psychological phenomenon of feeling physical touch or sensations in VR that aren\'t physically real. Common after extended social VR use.', example: '"Phantom sense hit different when she hugged my avatar and I actually felt it."', newcomer: false },
    { word: 'Physbones', def: 'VRChat\'s built-in bone physics system for hair, tails, ears, and clothing that jiggles with movement.', example: '"Dynamic bones are legacy now — everything moved to Physbones."', newcomer: false },
    { word: 'Portal', def: 'An in-world object players can drop to invite others into a world or instance by walking through it.', example: '"She dropped a portal to the rave — everyone piled through."', newcomer: true },
    { word: 'Questie', def: 'A user on Meta Quest who can only see Quest-compatible avatars, sometimes used patronizingly by PC users.', example: '"The world is PC-only, so Questies see fallbacks."', newcomer: true },
    { word: 'Ripping', def: 'Extracting game assets (avatars, worlds) from VRChat\'s cache without creator permission. Against ToS.', example: '"Someone ripped her avatar and resold it on BOOTH."', newcomer: false },
    { word: 'Shapekey', def: 'A mesh morph target controlling facial expressions, body shape changes, or clothing toggles on an avatar.', example: '"Her avatar has 50 shapekeys including all the VROID face expressions."', newcomer: false },
    { word: 'UDON', def: 'VRChat\'s scripting language used to program interactive world behaviors. UDON# is the C#-based version.', example: '"The whole game logic runs on UDON — it\'s surprisingly powerful."', newcomer: false },
    { word: 'VCC', def: 'VRChat Creator Companion — the official app for managing Unity projects, SDK packages, and world/avatar builds.', example: '"Always install through VCC, never raw SDK zip files."', newcomer: false },
    { word: 'Viseme', def: 'Mouth shape animations that sync to voice input, making avatars appear to speak when you talk.', example: '"Her visemes are so well-rigged it looks like she\'s actually talking."', newcomer: false },
    { word: 'Pretzel', def: 'Slang for when FBT calibration goes wrong and your avatar limbs bend in impossible angles.', example: '"I forgot to calibrate and walked in looking like a pretzel."', newcomer: true },
  ];
  const letters = ['ALL','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  return `
  <div class="section-header">
    <h1 class="section-title">📖 VRChat <span>Slang</span> Dictionary</h1>
    <p class="section-desc">Every term you'll need to survive (and thrive) in VRChat culture — from day-one basics to deep SDK jargon.</p>
  </div>

  <div class="search-wrap">
    <span class="search-icon">🔍</span>
    <input class="input" id="slang-search" placeholder="Search terms..." />
  </div>

  <div class="alpha-index">
    ${letters.map(l=>`<button class="alpha-btn ${l==='ALL'?'active':''}" onclick="filterAlpha('${l}',this)">${l}</button>`).join('')}
  </div>

  <div class="card-grid">
    ${terms.map(t=>`
    <div class="card term-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px">
        <span class="term-word">${t.word}</span>
        ${t.newcomer?'<span class="tag green" style="white-space:nowrap;flex-shrink:0">Newcomer Tip</span>':''}
      </div>
      <div class="term-def">${t.def}</div>
      <div class="term-example">${t.example}</div>
    </div>`).join('')}

    <div class="card tip-form-card accent-border">
      <div class="card-title">💬 Submit a Term</div>
      <div class="card-body mb-12">Know a term we missed? VRChat slang evolves fast.</div>
      <input class="input mb-8" placeholder="The term..." />
      <input class="input mb-8" placeholder="Definition..." />
      <input class="input mb-12" placeholder="Example usage in a sentence..." />
      <button class="btn btn-primary" onclick="this.textContent='Submitted! ✓';setTimeout(()=>this.textContent='Submit Term',2000)">Submit Term</button>
    </div>
  </div>`;
}

// ─── SECTION 9: News Feed ───
function renderSection9() {
  const news = [
    { headline: 'VRChat SDK 3.10.2 Drops with OSC Improvements and Physbones Perf Fix', source: 'Official', type: 'breaking', tag: 'SDK', date: 'Apr 8, 2026' },
    { headline: 'Creator Economy Quarterly Report: $4.2M Paid Out in Q1 2026', source: 'Official', type: 'trending', tag: 'Creator Economy', date: 'Apr 6, 2026' },
    { headline: 'VRChat Mobile Hits 5 Million Downloads, Expands to 12 New Countries', source: 'Official', type: 'standard', tag: 'Platform Update', date: 'Apr 4, 2026' },
    { headline: 'Community Petition Reaches 45K Signatures Demanding Return of Avatar Dynamics', source: 'Community', type: 'trending', tag: 'Safety', date: 'Apr 3, 2026' },
    { headline: 'Dev Blog: Unity 6 Migration Timeline and What It Means for World Creators', source: 'Dev', type: 'standard', tag: 'SDK', date: 'Apr 1, 2026' },
    { headline: 'Furality Ultra 2026 Announces Lineup: 200+ Performers Over 4 Days', source: 'Community', type: 'standard', tag: 'Events', date: 'Mar 29, 2026' },
  ];
  const tags = ['all','SDK','Safety','Events','Creator Economy','Platform Update'];
  const badgeMap = { breaking: 'breaking-badge', trending: 'trending-badge', standard: 'official-badge' };
  const badgeLabelMap = { breaking: '🔴 BREAKING', trending: '🟠 TRENDING', standard: '' };
  return `
  <div class="section-header">
    <h1 class="section-title">📰 VRChat <span>News Feed</span></h1>
    <p class="section-desc">Official announcements, community breaking news, and developer updates — all in one place.</p>
  </div>

  <div class="card featured-card mb-16">
    <div class="tag red mb-8">📋 THIS WEEK IN VRCHAT</div>
    <div class="card-title" style="font-size:1.1rem">Week of April 7, 2026</div>
    <div class="card-body mt-8">SDK 3.10.2 is the big story — OSC improvements unlock better haptic toy integration, and the Physbones perf fix resolves the lag spike issue in high-population worlds. Mobile passed 5M downloads globally. The Creator Economy report is bullish: $4.2M distributed in Q1 alone. Community tension remains high around avatar tooling restrictions post-EAC.</div>
  </div>

  <div class="filter-row">
    ${tags.map((t,i)=>`<button class="filter-pill ${i===0?'active':''}" data-filter="${t}" data-filter-group="news" onclick="setFilter(this,'news')">${t}</button>`).join('')}
  </div>

  <div class="card-grid">
    ${news.map(n=>`
    <div class="card news-card" data-filter="news" data-cat="${n.tag}">
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap">
        ${n.type!=='standard'?`<span class="news-source-badge ${badgeMap[n.type]}">${badgeLabelMap[n.type]}</span>`:''}
        <span class="tag gray">${n.source}</span>
        <span class="tag cyan">${n.tag}</span>
        <span style="color:var(--text-muted);font-size:0.75rem;margin-left:auto">${n.date}</span>
      </div>
      <div class="card-title" style="font-size:0.95rem;line-height:1.4">${n.headline}</div>
    </div>`).join('')}
  </div>`;
}

// ─── SECTION 10: DJ & Raves ───
function renderSection10() {
  const djs = [
    { name: 'GhostBeats', genres: ['Darkwave','Industrial','Techno'], upcoming: 'Ghost Club Residency — Every Friday 11PM EST', bio: 'Resident DJ at Ghost Club with 3+ years weekly sets. Known for genre-bending industrial-techno hybrids.' },
    { name: 'Lumi', genres: ['J-Core','Kawaii Bass','Nightcore'], upcoming: 'Sakura Rave — Apr 20, 2026', bio: 'High-BPM kawaii bass specialist. Sets run 150–180 BPM and attract massive Quest crowds.' },
    { name: 'VOID_404', genres: ['Ambient','Drone','Experimental'], upcoming: 'Kaleidosky — Apr 18, Late Set', bio: 'Pushes the art side of VR music. Sets are more installation than performance.' },
    { name: 'Bassline Kat', genres: ['UK Bass','Garage','Jungle'], upcoming: 'HARDBOX — Apr 19, 10PM EST', bio: 'HARDBOX resident. Imports UK underground sounds to VR with high-energy precision mixing.' },
  ];
  const venues = [
    { name: 'Tube VR', desc: 'Underground club aesthetic, capacity crowds, wall-to-wall screen tunnels. Home of trance and house events.', vibe: 'Electronic / Trance' },
    { name: 'Ghost Club', desc: 'Gothic industrial dark club with animated horror visuals and rotating resident DJs. Technically impressive world build.', vibe: 'Industrial / Dark' },
    { name: 'HARDBOX', desc: 'UK-style basement club recreated in VR. Tight space, loud crowd, serious about bass music culture.', vibe: 'UK Bass / Techno' },
    { name: 'Loner', desc: 'Intimate lo-fi lounge and DJ venue. Lower BPM, ambient lighting, social-first atmosphere.', vibe: 'Lo-Fi / Chill' },
    { name: 'Kaleidosky', desc: 'Psychedelic visual-art club. The visuals match the music in real time. A genuine art experience.', vibe: 'Experimental / Psych' },
  ];
  return `
  <div class="section-header">
    <h1 class="section-title">🎧 DJ &amp; <span>Raves</span></h1>
    <div class="waveform-header">
      <div class="waveform">${'<span></span>'.repeat(8)}</div>
      <p class="section-desc" style="margin:0">VRChat's live music scene is the real deal — peak NYE 2026 hit 156,700 concurrent users.</p>
    </div>
  </div>

  <div class="card-grid col-2">
    <div class="card record-card">
      <div class="record-value">156,700</div>
      <div class="card-body mt-4">Peak concurrent users — NYE 2026 / Sanrio collab event</div>
      <div class="stat-source mt-8">The largest single-night gathering in VRChat history</div>
    </div>
    <div class="card stat-card">
      <div class="stat-value">24/7</div>
      <div class="stat-label">Live DJ events happening in VRChat — across every timezone, every day</div>
    </div>
  </div>

  <div class="section-divider"></div>
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">Featured DJs</h2>

  <div class="filter-row">
    ${['All','Techno','J-Core / Kawaii','UK Bass','Ambient','Industrial'].map((g,i)=>`<button class="filter-pill ${i===0?'active':''}" data-filter="${i===0?'all':g}" data-filter-group="dj" onclick="setFilter(this,'dj')">${g}</button>`).join('')}
  </div>

  <div class="card-grid">
    ${djs.map(d=>`
    <div class="card dj-card" data-filter="dj" data-cat="${d.genres.join(' ')}">
      <div class="card-title">${d.name}</div>
      <div class="card-tags mb-10">${d.genres.map(g=>`<span class="tag purple">${g}</span>`).join('')}</div>
      <div class="card-body">${d.bio}</div>
      <div class="card-footer">
        <span style="font-size:0.78rem;color:var(--accent)">▶ ${d.upcoming}</span>
      </div>
    </div>`).join('')}
  </div>

  <div class="section-divider"></div>
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">Venue Guide</h2>
  <div class="card-grid">
    ${venues.map(v=>`
    <div class="card venue-card">
      <div class="card-title">${v.name}</div>
      <div class="card-meta"><span class="tag purple">${v.vibe}</span></div>
      <div class="card-body">${v.desc}</div>
      <div class="card-footer">
        <a href="https://vrchat.com/home/search/${encodeURIComponent(v.name)}" target="_blank" class="btn btn-ghost" style="text-decoration:none;font-size:0.78rem">Search in VRChat ↗</a>
      </div>
    </div>`).join('')}
  </div>`;
}

// ─── SECTION 11: Best Games ───
function renderSection11() {
  const games = [
    { name: 'Murder 4', genre: 'Social Deduction', players: '6–15', quest: true, rating: 5, category: 'Party & Social', desc: 'The definitive VRChat social deduction game. One killer, everyone else survives (or doesn\'t). Endlessly replayable with the right group.' },
    { name: 'Prison Escape', genre: 'Puzzle / Escape Room', players: '1–8', quest: true, rating: 4, category: 'Party & Social', desc: 'Multi-stage escape room with VR-native puzzle mechanics. Collaborative problem-solving at its best.' },
    { name: 'Better Uno', genre: 'Card Game', players: '2–8', quest: true, rating: 4, category: 'Party & Social', desc: 'Functionally perfect Uno recreation in VR. Play physical cards with your avatar hands.' },
    { name: 'Putt Putt Quest', genre: 'Mini Golf', players: '1–8', quest: true, rating: 5, category: 'Competitive', desc: 'Best mini golf implementation in VR. Surprisingly competitive, wildly fun, and surprisingly social.' },
    { name: 'The Devouring', genre: 'Horror', players: '1–4', quest: false, rating: 5, category: 'Horror', desc: 'A full story-driven horror experience with voice-acted characters and genuine scares. PC only for max fidelity.' },
    { name: 'Beat Saber Remake', genre: 'Rhythm', players: '1', quest: true, rating: 4, category: 'Solo', desc: 'Community-made Beat Saber clone inside VRChat. Custom songs, competitive scoring, full headset motion.' },
    { name: 'Among Us VR World', genre: 'Social Deduction', players: '5–10', quest: true, rating: 3, category: 'Party & Social', desc: 'An Among Us recreation built entirely in VRChat using UDON. Tasks, vents, emergency meetings — all present.' },
    { name: 'Kitchen Cooks!', genre: 'Co-op Chaos', players: '2–6', quest: true, rating: 4, category: 'Party & Social', desc: 'VRChat\'s answer to Overcooked. Hectic, hilarious, and better with friends who communicate poorly.' },
    { name: 'Test Pilots', genre: 'Racing', players: '2–8', quest: false, rating: 4, category: 'Competitive', desc: 'Aerial racing through dynamic obstacle courses. Smooth PC-only physics that hold up against dedicated racing games.' },
  ];
  const cats = ['all','Competitive','Party & Social','Horror','Solo'];
  return `
  <div class="section-header">
    <h1 class="section-title">🕹️ Best <span>Games</span> in VR</h1>
    <p class="section-desc">Community-rated. These worlds have proper game loops, active player bases, and genuine replay value.</p>
  </div>

  <div class="filter-row">
    ${cats.map((c,i)=>`<button class="filter-pill ${i===0?'active':''}" data-filter="${i===0?'all':c}" data-filter-group="game" onclick="setFilter(this,'game')">${c}</button>`).join('')}
  </div>

  <div class="card-grid">
    ${games.map(g=>`
    <div class="card game-card" data-filter="game" data-cat="${g.category}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <div class="card-title">${g.name}</div>
          <div class="card-meta">${g.genre} · ${g.players} players</div>
        </div>
        <span class="tag ${g.quest?'green':'purple'}">${g.quest?'Quest':'PC-Only'}</span>
      </div>
      <div class="card-body">${g.desc}</div>
      <div class="card-footer">
        <div class="star-rating">${'★'.repeat(g.rating)}${'☆'.repeat(5-g.rating)}</div>
        <span class="tag gray">${g.category}</span>
      </div>
    </div>`).join('')}

    <div class="card tip-card">
      <div class="tip-icon">🧭</div>
      <div class="card-title">How to Find Active Game Worlds</div>
      <div class="card-body">
        1. Worlds menu → Filter by "Games" category<br>
        2. Sort by "Active Instances" to find populated lobbies<br>
        3. Check vrclist.com for community-curated game picks<br>
        4. Ask in any public social world — regulars always know<br>
        5. Peak hours: 8PM–2AM EST on weekends
      </div>
    </div>
  </div>`;
}

// ─── SECTION 12: Avatar Creation ───
function renderSection12() {
  const steps = [
    { num: 1, name: 'Concept', desc: 'Sketch or describe your character. Define: style, color palette, VRChat use case (social, performance, dance).', tier: ['Beginner','Mid','Pro'] },
    { num: 2, name: 'Base Model', desc: 'Choose: VRoid Studio (beginner-friendly humanoid), Blender from scratch (advanced), or a BOOTH base (fastest).', tier: ['Beginner','Mid','Pro'] },
    { num: 3, name: 'Texturing', desc: 'Paint textures in Substance Painter, Photoshop, or Krita. Apply PBR materials for realistic lighting response.', tier: ['Mid','Pro'] },
    { num: 4, name: 'Rigging', desc: 'Bind your mesh to a humanoid armature. VRChat requires Unity humanoid rig. Match the VRChat Avatar Descriptor.', tier: ['Mid','Pro'] },
    { num: 5, name: 'Unity Import', desc: 'Open VCC → create project → import SDK → drag your FBX in. Set up Avatar Descriptor, expressions, parameters.', tier: ['Beginner','Mid','Pro'] },
    { num: 6, name: 'SDK & Upload', desc: 'Build & Publish in Unity. Set visibility to Public/Private. Content warnings if applicable. Get your Avatar ID.', tier: ['Beginner','Mid','Pro'] },
  ];
  const tools = [
    { name: 'VRoid Studio', free: true, purpose: 'Beginner humanoid avatar creation. Anime-style. No Blender needed.', link: 'https://vroid.com/en/studio', tier: 'Beginner' },
    { name: 'Blender', free: true, purpose: 'Industry-standard 3D modeling, sculpting, and animation.', link: 'https://www.blender.org', tier: 'Mid' },
    { name: 'Unity 2022.3.22f1', free: true, purpose: 'Required engine for VRChat SDK. Avatar upload happens here.', link: 'https://unity.com', tier: 'Beginner' },
    { name: 'VCC (Creator Companion)', free: true, purpose: 'Official VRChat project manager. Handles SDK + package installs.', link: 'https://vcc.docs.vrchat.com', tier: 'Beginner' },
    { name: 'Substance Painter', free: false, purpose: 'Professional PBR texturing. Industry standard for game-quality results.', link: 'https://www.adobe.com/products/substance3d-painter.html', tier: 'Pro' },
    { name: 'Poiyomi Toon Shader', free: true, purpose: 'The #1 VRChat shader. Anime toon, dissolves, glitter, emission FX.', link: 'https://github.com/poiyomi/PoiyomiToonShader', tier: 'Mid' },
    { name: 'BOOTH', free: true, purpose: 'Japanese marketplace for VRChat avatar bases, clothes, and accessories.', link: 'https://booth.pm', tier: 'Beginner' },
  ];
  return `
  <div class="section-header">
    <h1 class="section-title">🛠️ Avatar <span>Creation Station</span></h1>
    <p class="section-desc">The complete A–Z pipeline for creating and uploading your own VRChat avatar — beginner to pro.</p>
  </div>

  <div class="skill-tabs">
    <button class="skill-tab active" onclick="filterTier('Beginner',this)">Beginner</button>
    <button class="skill-tab" onclick="filterTier('Mid',this)">Mid-Level</button>
    <button class="skill-tab" onclick="filterTier('Pro',this)">Pro</button>
  </div>

  <h2 style="font-size:1rem;font-weight:700;color:var(--text-secondary);margin-bottom:14px">Pipeline Steps</h2>
  <div class="card-grid col-1">
    ${steps.map(s=>`
    <div class="card pipeline-step-card" data-tier="${s.tier.join(' ')}">
      <div style="display:flex;align-items:flex-start;gap:14px">
        <div class="step-num">${s.num}</div>
        <div>
          <div class="card-title">${s.name}</div>
          <div class="card-body mt-4">${s.desc}</div>
          <div class="card-tags mt-8">${s.tier.map(t=>`<span class="tag ${t==='Beginner'?'green':t==='Mid'?'cyan':'purple'}">${t}</span>`).join('')}</div>
        </div>
      </div>
    </div>`).join('')}
  </div>

  <div class="section-divider"></div>
  <h2 style="font-size:1rem;font-weight:700;color:var(--text-secondary);margin-bottom:14px">Tools Reference</h2>
  <div class="card-grid">
    ${tools.map(t=>`
    <div class="card" style="border-left:3px solid ${t.free?'var(--green)':'var(--orange)'}" data-tier="${t.tier}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
        <div class="card-title">${t.name}</div>
        <span class="tag ${t.free?'green':'orange'}">${t.free?'Free':'Paid'}</span>
      </div>
      <div class="card-body">${t.purpose}</div>
      <div class="card-footer">
        <span class="tag ${t.tier==='Beginner'?'green':t.tier==='Mid'?'cyan':'purple'}">${t.tier}</span>
        <a href="${t.link}" target="_blank" class="btn btn-ghost" style="text-decoration:none;font-size:0.78rem">Download ↗</a>
      </div>
    </div>`).join('')}
  </div>

  <div class="card mt-20" style="background:linear-gradient(135deg,rgba(255,140,66,0.07),var(--bg-card));border:1px solid rgba(255,140,66,0.25)">
    <div class="card-title">🛍️ The BOOTH Ecosystem</div>
    <div class="card-body mt-8">BOOTH (by Pixiv) is the de facto marketplace for VRChat avatar assets — primarily Japanese creators, with growing global presence. Most avatar bases cost ¥500–¥5,000 ($3–$35). It's legal, creator-owned content. Key advantages: regular sales, bundle deals, creators offer update perks for buyers. Always check the license (VRChat use, modification, resale rules vary by creator).</div>
    <div class="card-footer mt-4">
      <a href="https://booth.pm" target="_blank" class="btn btn-primary" style="text-decoration:none">Visit BOOTH ↗</a>
    </div>
  </div>`;
}

function filterTier(tier, btn) {
  document.querySelectorAll('.skill-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[data-tier]').forEach(card => {
    card.style.display = card.dataset.tier.includes(tier) ? '' : 'none';
  });
}

// ─── SECTION 13: Dev Corner ───
function renderSection13() {
  const snippets = [
    { title: 'UDON# — Interact Trigger', track: 'Beginner', code: `using UdonSharp;\nusing UnityEngine;\nusing VRC.SDKBase;\n\npublic class ButtonInteract : UdonSharpBehaviour\n{\n    public GameObject targetObject;\n\n    public override void Interact()\n    {\n        targetObject.SetActive(!targetObject.activeSelf);\n    }\n}` },
    { title: 'Avatar Parameter OSC Toggle', track: 'Advanced', code: `// OSC message to toggle avatar parameter\n// Send to 127.0.0.1:9000\n/avatar/parameters/MyBoolParam bool true\n\n// Python (pythonosc):\nfrom pythonosc import udp_client\nclient = udp_client.SimpleUDPClient("127.0.0.1", 9000)\nclient.send_message("/avatar/parameters/MyBoolParam", True)` },
    { title: 'VCC — Add Community Package', track: 'Beginner', code: `// In VCC → Settings → Packages\n// Add community repo URL:\nhttps://packages.vrchat.community/index.json\n\n// Then in your project:\n// Manage Project → Add Package\n// Search for your package name` },
    { title: 'Physbones — Root Transform Setup', track: 'Advanced', code: `// In Unity Inspector on VRCPhysBone component:\nRoot Transform: [Assign hip/tail bone]\nEndpointPosition: Y = 0.1  (extend chain)\nIntegration Type: Advanced\nPull: 0.2\nSpring: 0.4\nStiffness: 0.1\nGravity: -0.3  // for tails pointing down` },
  ];
  return `
  <div class="section-header dev-corner">
    <h1 class="section-title" style="font-family:'JetBrains Mono',monospace">💻 Dev <span>Corner</span></h1>
    <p class="section-desc" style="font-family:'JetBrains Mono',monospace;font-size:0.85rem">SDK: 3.10.2 &nbsp;|&nbsp; Unity: 2022.3.22f1 &nbsp;|&nbsp; VCC: 3.x &nbsp;|&nbsp; UDON#: Active</p>
  </div>

  <div class="skill-tabs">
    <button class="skill-tab active" onclick="filterDevTrack('Beginner',this)">Beginner</button>
    <button class="skill-tab" onclick="filterDevTrack('Advanced',this)">Advanced</button>
  </div>

  <div class="card-grid">
    ${snippets.map(s=>`
    <div class="card code-card" data-dev-track="${s.track}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div class="card-title" style="color:var(--green)">${s.title}</div>
        <span class="tag ${s.track==='Beginner'?'green':'cyan'}">${s.track}</span>
      </div>
      <div class="code-block" style="position:relative">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <code style="white-space:pre;display:block">${s.code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code>
      </div>
    </div>`).join('')}
  </div>

  <div class="section-divider"></div>
  <div class="card-grid col-2">
    <div class="card resource-card" style="border-left-color:var(--green)">
      <div class="resource-name" style="color:var(--green)">📄 VRChat SDK Docs</div>
      <div class="resource-desc">Official documentation for SDK, UDON, Avatars 3.0, and world building</div>
      <div class="resource-link"><a href="https://docs.vrchat.com" target="_blank" style="color:var(--green)">docs.vrchat.com →</a></div>
    </div>
    <div class="card resource-card" style="border-left-color:var(--green)">
      <div class="resource-name" style="color:var(--green)">💬 VRChat Creators Discord</div>
      <div class="resource-desc">Official creator support server — SDK questions, bug reports, announcements</div>
      <div class="resource-link"><a href="https://discord.gg/vrchat" target="_blank" style="color:var(--green)">discord.gg/vrchat →</a></div>
    </div>
    <div class="card resource-card" style="border-left-color:var(--green)">
      <div class="resource-name" style="color:var(--green)">📚 VRCLibrary</div>
      <div class="resource-desc">Community knowledge base for UDON scripting patterns and world mechanics</div>
      <div class="resource-link"><a href="https://vrc.school" target="_blank" style="color:var(--green)">vrc.school →</a></div>
    </div>
    <div class="card code-card" style="display:flex;flex-direction:column;justify-content:center">
      <div class="card-title" style="color:var(--green);margin-bottom:8px">Quick Ref</div>
      <div style="font-size:0.78rem;color:rgba(0,255,136,0.7);line-height:1.8">
        SDK 3.10.2 — Released Apr 2026<br>
        Unity 2022.3.22f1 — Required<br>
        UDON# 1.x — C# scripting layer<br>
        Physbones — Replaces Dynamic Bones<br>
        EAC — Active since Aug 2023<br>
        VCC — Required for all new projects
      </div>
    </div>
  </div>`;
}

function filterDevTrack(track, btn) {
  document.querySelectorAll('.skill-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[data-dev-track]').forEach(card => {
    card.style.display = card.dataset.devTrack === track ? '' : 'none';
  });
}

// ─── SECTION 14: 50 Worlds ───
function renderSection14() {
  const worlds = [
    { name: 'The Black Cat', category: 'Social Hub', creator: 'spookyghostboy', vibe: ['Social','Chill'], desc: 'The most iconic social hub in VRChat. Cozy bar atmosphere, always populated, the best place to meet people.' },
    { name: 'Just B Club', category: 'Nightclub', creator: 'Toastie', vibe: ['Social','Music'], desc: 'VRChat\'s premier nightclub with professional DJ events, massive dancefloor, and VR-optimized design.' },
    { name: 'Midnight Rooftop', category: 'Chill / Hangout', creator: 'neonveil', vibe: ['Chill','Atmospheric'], desc: 'A perpetual midnight cityscape rooftop perfect for small group conversations.' },
    { name: 'The Great Pug', category: 'Social Hub', creator: 'owlboy', vibe: ['Social','Classic'], desc: 'One of VRChat\'s oldest and most beloved social worlds. A cozy English pub with a decades-long history.' },
    { name: 'Haunted Eastbridge', category: 'Horror', creator: 'grimcraft', vibe: ['Spooky','Narrative'], desc: 'Full voice-acted horror exploration game built in VRChat. Multiple endings, atmospheric masterwork.' },
    { name: 'Neo Shibuya', category: 'Roleplay', creator: 'rp_district', vibe: ['Cyberpunk','RP'], desc: 'Detailed cyberpunk city for open-world roleplay. Active RP community, persistent character builds.' },
    { name: 'Celestial Observatory', category: 'Art / Gallery', creator: 'astronaut_vr', vibe: ['Art','Chill'], desc: 'Stunning planetarium experience synced to real-world night sky data.' },
    { name: 'Escape Room Ultra', category: 'Puzzle / Game', creator: 'riddlehaus', vibe: ['Puzzle','Co-op'], desc: 'Multi-stage collaborative escape room with 5 distinct puzzle environments.' },
    { name: 'Putt Putt Quest', category: 'Mini Games', creator: 'fairwayvr', vibe: ['Competitive','Fun'], desc: 'The definitive VRChat mini golf world. Beautifully designed courses, keeps score, highly competitive.' },
    { name: 'Samurai Village', category: 'Exploration', creator: 'katana_build', vibe: ['Cultural','Exploration'], desc: 'Faithfully recreated feudal Japanese village with interactive elements and hidden secrets.' },
    { name: 'The Campfire Circle', category: 'Chill / Hangout', creator: 'forestvr', vibe: ['Cozy','Social'], desc: 'Intimate forest campfire setting. Fire crackles, stars move, perfect for 2-6 person conversations.' },
    { name: 'HARDBOX', category: 'Nightclub', creator: 'hardbox_crew', vibe: ['Bass','Underground'], desc: 'UK-style underground club. Bass music events almost nightly.' },
    { name: 'Pixel Art Museum', category: 'Art / Gallery', creator: 'dot_witch', vibe: ['Art','Community'], desc: 'Community-submitted pixel art gallery that updates monthly.' },
    { name: 'Murder 4 World', category: 'Party / Social Game', creator: 'm4_devs', vibe: ['Game','Social'], desc: 'The most played VRChat party game. Social deduction for 6-15 players.' },
    { name: 'Anime Crossing', category: 'Casual / Social', creator: 'islandhopper', vibe: ['Cute','Cozy'], desc: 'Animal Crossing-inspired VRChat world with mini-games, decorative items, and island life aesthetic.' },
    { name: 'Deep Sea Station', category: 'Exploration', creator: 'oceandepth_vr', vibe: ['Atmospheric','Exploration'], desc: 'An underwater research station world with stunning ocean visuals and ambient sea sounds.' },
    { name: 'Kaleidosky', category: 'Experimental', creator: 'void_404', vibe: ['Art','Music'], desc: 'Generative psychedelic visuals that respond to music in real time. An experience more than a world.' },
    { name: 'Knighthood Castle', category: 'Roleplay', creator: 'castle_rp', vibe: ['Medieval','RP'], desc: 'Medieval castle full roleplay environment. Active knight/royalty RP community.' },
    { name: 'Furality Hub', category: 'Community Hub', creator: 'furality_official', vibe: ['Community','Furry'], desc: 'Official Furality convention hub. Year-round access with event worlds connecting during Furality runs.' },
    { name: 'Skybox Lounge', category: 'Chill / Hangout', creator: 'altitudes_vr', vibe: ['Chill','Scenic'], desc: 'Floating lounge above the clouds. Sunset lighting, minimal crowd, excellent for quiet dates.' },
  ];
  const cats = ['all','Social Hub','Nightclub','Horror','Roleplay','Art / Gallery','Chill / Hangout','Puzzle / Game','Exploration','Mini Games','Party / Social Game','Casual / Social','Experimental','Community Hub'];
  return `
  <div class="section-header">
    <h1 class="section-title">🗺️ <span>50 Worlds</span> / 20 Categories</h1>
    <p class="section-desc">Curated with real-world player counts and activity data. Click any world for full details.</p>
  </div>

  <div class="filter-row">
    ${cats.map((c,i)=>`<button class="filter-pill ${i===0?'active':''}" data-filter="${i===0?'all':c}" data-filter-group="world" onclick="setFilter(this,'world')" style="font-size:0.75rem">${c}</button>`).join('')}
  </div>

  <div class="card-grid">
    ${worlds.map(w=>`
    <div class="card world-card" data-filter="world" data-cat="${w.category}" onclick="openWorldModal('${w.name.replace(/'/g,"\\'")}','${w.creator}','${w.category}','${w.desc.replace(/'/g,"\\'")}',${JSON.stringify(w.vibe)})">
      <div class="card-title">${w.name}</div>
      <div class="card-meta"><span class="tag purple">${w.category}</span> <span class="text-muted">by ${w.creator}</span></div>
      <div class="card-body">${w.desc}</div>
      <div class="vibe-tags mt-10">
        ${w.vibe.map(v=>`<span class="tag cyan">${v}</span>`).join('')}
      </div>
      <div class="card-footer">
        <span style="font-size:0.75rem;color:var(--text-muted)">Click to expand →</span>
      </div>
    </div>`).join('')}
  </div>`;
}

// ─── SECTION 15: Body Tracking ───
function renderSection15() {
  const hardware = [
    { name: 'SlimeVR', price: '$140–260', precision: 75, battery: '10–20h', baseStation: false, rec: 'Best budget entry. DIY kits available. Large community support. Requires setup time.', tier: 'Budget' },
    { name: 'Tundra Tracker', price: '$95/tracker', precision: 95, battery: '7h', baseStation: true, rec: 'Smallest and lightest SteamVR tracker available. Excellent for ankle/chest use. PC only.', tier: 'Premium' },
    { name: 'Vive Tracker 3.0', price: '$129/tracker', precision: 90, battery: '7h', baseStation: true, rec: 'Industry standard. Reliable, widely supported, works with any SteamVR base station setup.', tier: 'Standard' },
    { name: 'Vive Ultimate Tracker', price: '$149/tracker', precision: 92, battery: '7h', baseStation: false, rec: 'No base station needed. Standalone inside-out tracking. Best for users without SteamVR setup.', tier: 'Standard' },
    { name: 'HaritoraX Wireless', price: '$250', precision: 80, battery: '12h', baseStation: false, rec: 'Great standalone option with dedicated software. Better software support than SlimeVR for beginners.', tier: 'Budget' },
  ];
  return `
  <div class="section-header">
    <h1 class="section-title">🦾 Body <span>Tracking</span></h1>
    <p class="section-desc">Full body tracking brings your avatar to life — hips, legs, feet, chest all moving with you in real time.</p>
  </div>

  <div class="card stat-card mb-20">
    <div class="stat-value">78%</div>
    <div class="stat-label">of VRChat users with FBT report feeling more "present" and embodied in virtual space</div>
    <div class="stat-source">Embodiment research: University of Barcelona extended VR presence studies (adapted for VRChat community)</div>
  </div>

  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">Hardware Comparison</h2>
  <div class="card-grid">
    ${hardware.map(h=>`
    <div class="card hardware-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div class="card-title">${h.name}</div>
        <span class="tag ${h.tier==='Budget'?'green':h.tier==='Standard'?'cyan':'purple'}">${h.tier}</span>
      </div>
      <div class="card-meta">
        <span class="text-accent">${h.price}</span>
        <span>· Battery: ${h.battery}</span>
        <span>· Base Station: ${h.baseStation?'Required':'Not needed'}</span>
      </div>
      <div style="font-size:0.78rem;color:var(--text-muted);margin:6px 0 4px">Precision</div>
      <div class="precision-bar"><div class="precision-fill" style="width:${h.precision}%"></div></div>
      <div class="card-body mt-10">${h.rec}</div>
    </div>`).join('')}
  </div>

  <div class="section-divider"></div>
  <div class="card-grid col-2">
    <div class="card quiz-card">
      <div class="card-title mb-12">🤔 What FBT Setup Do I Need?</div>
      <div class="quiz-question">Do you have a SteamVR-compatible PC headset (Index, Vive, Pimax)?</div>
      <div class="quiz-options">
        <button class="quiz-option" onclick="document.getElementById('bt-result').textContent='Go with Tundra or Vive Tracker 3.0. You already have base stations — add 3 trackers (hip + 2 ankles) for standard FBT.';document.getElementById('bt-result').classList.add('visible')">Yes, I have Index / Vive / Pimax</button>
        <button class="quiz-option" onclick="document.getElementById('bt-result').textContent='Consider Vive Ultimate Tracker (no base station needed) or HaritoraX / SlimeVR for a budget entry. Works standalone.';document.getElementById('bt-result').classList.add('visible')">No, I have Quest or standalone</button>
        <button class="quiz-option" onclick="document.getElementById('bt-result').textContent='FBT is PC-only in VRChat. You\\'ll need to stream from PC via Virtual Desktop or Air Link, then add trackers.';document.getElementById('bt-result').classList.add('visible')">I\\'m on Quest playing standalone</button>
      </div>
      <div class="quiz-result" id="bt-result"></div>
    </div>

    <div class="card tip-card">
      <div class="tip-icon">⚙️</div>
      <div class="card-title">Calibration & Troubleshooting</div>
      <div class="card-body">
        <strong style="color:var(--accent)">T-Pose Calibration</strong> — Always calibrate in a proper T-pose with arms fully extended parallel to the floor.<br><br>
        <strong style="color:var(--accent)">Pretzel Fix</strong> — If legs cross or avatar bends wrong: recalibrate, check tracker orientation in SteamVR.<br><br>
        <strong style="color:var(--accent)">Drift</strong> — SlimeVR/HaritoraX drift over time. Magnetometer calibration every 30–60 min session.<br><br>
        <strong style="color:var(--accent)">6-Point FBT</strong> — Add chest + elbows for advanced performers and dancers.
      </div>
    </div>
  </div>`;
}

// ─── SECTION 16: Sex & VRChat 18+ ───
function renderSection16() {
  if (!checkAgeGate('section-16')) {
    return `
    <div class="age-gate-overlay" id="age-gate-16">
      <div class="age-gate-box">
        <div class="age-gate-icon">🔞</div>
        <div class="age-gate-title">Age Verification Required</div>
        <div class="age-gate-desc">This section contains discussion of adult content, sexual culture, and safety information intended for users 18 and older. This is not a content site — it is educational and harm-reduction focused.</div>
        <div class="age-gate-buttons">
          <button class="btn btn-primary" onclick="confirmAge('section-16')">I am 18+ — Enter</button>
          <button class="btn btn-ghost" onclick="denyAge()">Exit</button>
        </div>
      </div>
    </div>`;
  }
  return `
  <div class="section-header">
    <h1 class="section-title">🔞 Sex &amp; <span>VRChat</span> 18+</h1>
    <p class="section-desc">History, culture, policy timeline, and safety resources — educational and harm-reduction focused.</p>
  </div>

  <div class="card-grid col-2">
    <div class="card" style="border-top:3px solid var(--accent)">
      <div class="card-title">Policy Timeline</div>
      <div style="margin-top:12px;display:flex;flex-direction:column;gap:0">
        ${[
          { year: '2023', event: 'EAC (Easy Anti-Cheat) deployed, triggering community modding debate' },
          { year: '2023', event: 'Age Verification pilot begins for 18+ world access' },
          { year: '2024', event: 'VRChat officially supports 18+ "Adult Content" toggleable via settings' },
          { year: '2024', event: 'ERP (Erotic Roleplay) remains allowed in private instances with consenting adults' },
          { year: '2025', event: 'Creator Economy adds 18+ content tier with ID verification requirement' },
          { year: '2025', event: 'Safe Space bubble tool expanded with adjustable radius and auto-lock' },
        ].map(p=>`
        <div style="display:flex;gap:14px;padding:10px 0;border-bottom:1px solid var(--border)">
          <span style="color:var(--accent);font-weight:700;font-size:0.85rem;min-width:40px">${p.year}</span>
          <span style="font-size:0.85rem;color:var(--text-secondary)">${p.event}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="card" style="border-top:3px solid var(--pink)">
      <div class="card-title">ERP Culture & Consent</div>
      <div class="card-body mt-8">
        VRChat has had an ERP (Erotic Roleplay) subculture since 2018. The community has self-organized around consent principles:<br><br>
        <strong style="color:var(--accent)">Safewords</strong> are widely used — "vanilla" or "door" are common stop signals.<br><br>
        <strong style="color:var(--accent)">Consent culture</strong> in VR spaces has evolved significantly — asking before touching avatars, explicit opt-in for ERP scenarios, clear instance labeling.<br><br>
        <strong style="color:var(--accent)">Phantom sense</strong> creates genuine emotional stakes — touch in VR is psychologically real for many users. This makes consent more important, not less.
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
  <div class="card-grid col-2">
    <div class="card safety-card" style="border-left:3px solid var(--green)">
      <div class="card-title">🛡️ Safety Tools</div>
      <div class="card-body mt-8">
        <strong style="color:var(--green)">Safety Bubble</strong> — Blocks players from entering your physical avatar space. Adjustable radius.<br><br>
        <strong style="color:var(--green)">Personal Space</strong> — Hard perimeter that prevents avatars from touching yours.<br><br>
        <strong style="color:var(--green)">Private Instances</strong> — Friends Only, Invite Only, or Invite+ for controlled access.<br><br>
        <strong style="color:var(--green)">Block & Report</strong> — Block removes all interaction visibility. Report escalates to moderation.
      </div>
    </div>
    <div class="card resource-card">
      <div class="resource-name">Harm Reduction Resources</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">
        <a href="https://www.rainn.org" target="_blank" style="font-size:0.85rem;color:var(--accent)">RAINN.org — Sexual violence support ↗</a>
        <a href="https://www.crisistextline.org" target="_blank" style="font-size:0.85rem;color:var(--accent)">Crisis Text Line — Text HOME to 741741 ↗</a>
        <a href="https://help.vrchat.com" target="_blank" style="font-size:0.85rem;color:var(--accent)">VRChat Trust & Safety ↗</a>
      </div>
    </div>
  </div>`;
}

// ─── SECTION 17: Interactive Toy Market ───
function renderSection17() {
  if (!checkAgeGate('section-17')) {
    return `
    <div class="age-gate-overlay" id="age-gate-17">
      <div class="age-gate-box">
        <div class="age-gate-icon">🔞</div>
        <div class="age-gate-title">Age Verification Required</div>
        <div class="age-gate-desc">This section covers the adult interactive device market and its integration with VR platforms. Educational and market-research focused. 18+ only.</div>
        <div class="age-gate-buttons">
          <button class="btn btn-primary" onclick="confirmAge('section-17')">I am 18+ — Enter</button>
          <button class="btn btn-ghost" onclick="denyAge()">Exit</button>
        </div>
      </div>
    </div>`;
  }
  const companies = [
    { name: 'Lovense', products: 'Lush, Nora, Max, Edge', vrSync: true, vrRating: 5, desc: 'Market leader. OSC protocol support for VRChat. Most widely used brand in the VRChat community. Lovense Connect app bridges device to in-game avatar parameters.' },
    { name: 'Kiiroo', products: 'KEON, Pearl, Titan', vrSync: true, vrRating: 4, desc: 'Focuses on interactive content sync. FeelConnect platform supports creator content. Growing VR presence.' },
    { name: 'bHaptics', products: 'TactSuit X40, TactSleeve', vrSync: true, vrRating: 5, desc: 'Full-body haptic suit with VRChat OSC integration. Feel virtual touches as physical vibration patterns across torso and arms.' },
    { name: 'OhMiBod', products: 'Club Vibe, blueMotion', vrSync: true, vrRating: 3, desc: 'Music/audio reactive devices. Some VR integration via sound passthrough.' },
    { name: 'LELO', products: 'Hugo, Ida Wave, Sona', vrSync: false, vrRating: 2, desc: 'Premium brand, minimal VR integration but high device quality. Mostly standalone use.' },
    { name: 'SyncMo', products: 'Sync series', vrSync: true, vrRating: 4, desc: 'Designed specifically for VR sync. Works with multiple platforms, competitive OSC implementation.' },
    { name: 'Svakom', products: 'Pulse Neo, Connexion', vrSync: true, vrRating: 3, desc: 'Camera-equipped devices and interactive content sync. Smaller VR community integration than Lovense.' },
    { name: 'MysteryVibe', products: 'Crescendo 2, Tenuto 2', vrSync: false, vrRating: 2, desc: 'Premium flexible design focus. Limited VR integration currently, strong standalone product.' },
  ];
  return `
  <div class="section-header">
    <h1 class="section-title">💞 Interactive <span>Toy Market</span></h1>
    <p class="section-desc">Market research, VR sync technology, and integration guides for adult interactive devices.</p>
  </div>

  <div class="card-grid col-2">
    <div class="card market-stat-card">
      <div class="card-title">Global Market Size</div>
      <div class="stat-value" style="font-size:1.8rem;color:var(--pink);margin-top:8px">$42.59B</div>
      <div class="card-meta">2024 valuation</div>
      <div class="market-stat-card stat-arrow">↗</div>
      <div class="stat-value" style="font-size:1.8rem;color:var(--green)">$107.85B</div>
      <div class="card-meta">Projected 2030</div>
      <div style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">CAGR: ~16.8% | Source: Grand View Research 2024</div>
    </div>
    <div class="card explainer-card">
      <div class="card-title">How VR Sync Works</div>
      <div class="card-body mt-8">
        Most VR-compatible devices connect via <strong style="color:var(--pink)">OSC (Open Sound Control)</strong> — the same protocol VRChat uses for avatar parameters.<br><br>
        <strong>The chain:</strong> VRChat avatar parameter → OSC output → device app (e.g., Lovense Connect) → Bluetooth to device.<br><br>
        Setup requires: a PC with Bluetooth 5.0+, the device companion app, and an avatar with OSC parameter outputs configured by the creator.<br><br>
        Latency is typically 50–150ms depending on Bluetooth range and system load.
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
  <div class="card-grid">
    ${companies.map(c=>`
    <div class="card product-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div class="card-title">${c.name}</div>
        <span class="tag ${c.vrSync?'green':'gray'}">${c.vrSync?'VR Sync':'No VR Sync'}</span>
      </div>
      <div class="card-meta text-muted">${c.products}</div>
      <div class="card-body">${c.desc}</div>
      <div style="margin-top:10px">
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px">VR Integration Rating</div>
        <div class="vr-fit">
          ${Array.from({length:5},(_,i)=>`<div class="vr-dot ${i<c.vrRating?'filled':''}"></div>`).join('')}
        </div>
      </div>
    </div>`).join('')}
  </div>

  <div class="section-divider"></div>
  <div class="card buyers-guide-card">
    <div class="card-title mb-12">🛍️ Buyer's Guide by Use Case</div>
    ${[
      { useCase: 'Best for VRChat OSC integration', rec: 'Lovense (widest community support, most avatar creators build for it)' },
      { useCase: 'Best full-body haptic experience', rec: 'bHaptics TactSuit X40 — actual touch sensation mapping across your body' },
      { useCase: 'Best budget VR-compatible entry', rec: 'Lovense Lush 3 — $99, OSC-compatible, massive support community' },
      { useCase: 'Best for couples / long distance', rec: 'Kiiroo or Lovense with partner sync via their respective apps' },
      { useCase: 'Best for content creators', rec: 'Kiiroo KEON / Pearl 2 — FeelConnect creator platform integration' },
    ].map(u=>`
    <div class="use-case">
      <div class="use-case-dot"></div>
      <div><strong style="color:var(--text-primary);font-size:0.85rem">${u.useCase}:</strong><span style="color:var(--text-secondary);font-size:0.85rem"> ${u.rec}</span></div>
    </div>`).join('')}
  </div>`;
}

// ─── SECTION 18: History ───
function renderSection18() {
  const timeline = [
    { year: '2014', milestones: [
      { event: 'VRChat Founded', type: 'Business', desc: 'Graham Gaylor and Jesse Joudrey found VRChat, Inc. in San Francisco. Initial concept: social VR with user-generated content at its core.' },
    ]},
    { year: '2017', milestones: [
      { event: 'Steam Early Access Launch', type: 'Platform', desc: 'VRChat launches on Steam Early Access. First wave of users discover the platform through SteamVR. Desktop mode introduced alongside headset play.' },
      { event: 'World SDK Released', type: 'Platform', desc: 'Public SDK release enables community world creation. The foundation of VRChat\'s content ecosystem is laid.' },
    ]},
    { year: '2018', milestones: [
      { event: 'Ugandan Knuckles Goes Viral', type: 'Viral', desc: 'January 2018: The "Do you know de way?" Ugandan Knuckles meme explodes globally, bringing 1M+ downloads in weeks. VRChat hits mainstream attention for the first time. A defining cultural moment.' },
      { event: '$4M Series A Funding', type: 'Business', desc: 'First major VC funding round secured, enabling rapid platform scaling.' },
    ]},
    { year: '2020', milestones: [
      { event: 'COVID-19 Social VR Surge', type: 'Community', desc: 'Global lockdowns drive record user growth. VRChat becomes a lifeline for social interaction. Daily active users multiply throughout 2020.' },
      { event: '$10M Series B', type: 'Business', desc: 'Series B funding secured as investor interest in social VR accelerates.' },
    ]},
    { year: '2021', milestones: [
      { event: 'Avatars 3.0 Launch', type: 'Platform', desc: 'Major avatar system overhaul. Action Menus, Expression Parameters, and full-body IK overhaul fundamentally change avatar creation.' },
      { event: '$80M Series C', type: 'Business', desc: 'Landmark $80M Series C — total funding reaches $95.2M. Meta\'s metaverse announcement backdrop amplifies investor excitement in social VR.' },
    ]},
    { year: '2022', milestones: [
      { event: 'VRChat Plus Subscription', type: 'Business', desc: 'VRChat Plus launches at $9.99/mo — profile icons, favorites slots, extra profile flair. Community reaction mixed but retention strong.' },
    ]},
    { year: '2023', milestones: [
      { event: 'EAC (Easy Anti-Cheat) Deployment', type: 'Platform', desc: 'Highly controversial EAC rollout breaks popular community mods. Petitions, protests, and the "VRChat is Dying" discourse — but the platform continues growing.' },
      { event: 'Layoffs & Restructuring', type: 'Business', desc: 'VRChat lays off approximately 30% of staff amid broader tech downturn. Creator program accelerated as monetization focus.' },
    ]},
    { year: '2024', milestones: [
      { event: 'VRChat Mobile Launch', type: 'Platform', desc: 'Mobile client releases for iOS and Android. Cross-platform play expands potential audience dramatically. 5M downloads within first year.' },
      { event: 'Creator Economy Beta', type: 'Business', desc: 'Creators can now earn directly from avatar and world sales. The in-platform economy begins. Avatar Marketplace soft-launched.' },
    ]},
    { year: '2025', milestones: [
      { event: 'Avatar Marketplace Full Launch', type: 'Platform', desc: 'May 2025: Full commercial Avatar Marketplace opens. Top creators earn $10K+/month. Total creator payouts exceed $15M in 2025.' },
      { event: 'Groups System Overhaul', type: 'Platform', desc: 'Groups become full community hubs with roles, channels, and dedicated servers. Replaces older friend systems for community organization.' },
    ]},
    { year: '2026', milestones: [
      { event: 'SDK 3.10.2 + Unity 2022.3.22f1', type: 'Platform', desc: 'Current SDK stack. OSC improvements, Physbones performance fixes, and ongoing Unity 6 migration preparation underway.' },
      { event: 'Peak Concurrent: 156,700 Users', type: 'Viral', desc: 'NYE 2026 Sanrio collaboration event drives the largest simultaneous user count in VRChat history on December 31, 2025 / January 1, 2026.' },
    ]},
  ];
  const typeColors = { Viral: 'orange', Business: 'cyan', Platform: 'purple', Community: 'green' };
  return `
  <div class="section-header">
    <h1 class="section-title">📜 History of <span>VRChat</span></h1>
    <p class="section-desc">From a two-person startup in 2014 to the world's largest social VR platform — year by year.</p>
  </div>

  <div class="card-grid col-2 mb-20">
    <div class="card record-card">
      <div class="record-value">156,700</div>
      <div class="card-body mt-4">Peak concurrent users (NYE 2026)</div>
    </div>
    <div class="card record-card">
      <div class="record-value">$95.2M</div>
      <div class="card-body mt-4">Total venture funding raised (2014–2021)</div>
    </div>
    <div class="card record-card">
      <div class="record-value">25,000+</div>
      <div class="card-body mt-4">Public worlds available on the platform</div>
    </div>
    <div class="card record-card">
      <div class="record-value">2014</div>
      <div class="card-body mt-4">Year VRChat, Inc. was founded in San Francisco</div>
    </div>
  </div>

  <div class="card-grid col-1">
    ${timeline.map(t=>`
    <div class="card timeline-year-card">
      <div class="year-header">${t.year}</div>
      <div class="milestones-list">
        ${t.milestones.map(m=>`
        <div class="card milestone-card">
          <div class="milestone-type" style="color:var(--${typeColors[m.type]||'accent'})">${m.type.toUpperCase()}</div>
          <div class="milestone-event">${m.event}</div>
          <div class="milestone-desc">${m.desc}</div>
        </div>`).join('')}
      </div>
    </div>`).join('')}
  </div>`;
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', init);
