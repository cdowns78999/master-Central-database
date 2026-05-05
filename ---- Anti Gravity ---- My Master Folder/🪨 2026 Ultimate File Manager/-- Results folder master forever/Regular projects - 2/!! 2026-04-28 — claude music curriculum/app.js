/* ============================================================
   Claude × Music Business — 12-Tool Curriculum
   app.js  —  tile grid, markdown loader, quiz, progress
   ============================================================ */

/* ----- Lesson manifest (matches research/*.md filenames) ----- */
const LESSONS = [
  { n: 1,  slug: '01-skills',             title: 'Skills',            icon: '🎯', diff: 'easy'     },
  { n: 2,  slug: '02-subagents',          title: 'Subagents',         icon: '🤖', diff: 'medium'   },
  { n: 3,  slug: '03-mcp-servers',        title: 'MCP Servers',       icon: '🔌', diff: 'medium'   },
  { n: 4,  slug: '04-hooks',              title: 'Hooks',             icon: '🪝', diff: 'advanced' },
  { n: 5,  slug: '05-memory',             title: 'Memory',            icon: '🧠', diff: 'easy'     },
  { n: 6,  slug: '06-prompt-caching',     title: 'Prompt Caching',    icon: '💰', diff: 'medium'   },
  { n: 7,  slug: '07-agent-sdk',          title: 'Agent SDK',         icon: '🛠', diff: 'advanced' },
  { n: 8,  slug: '08-computer-use',       title: 'Computer Use',      icon: '🖱', diff: 'advanced' },
  { n: 9,  slug: '09-vision',             title: 'Vision',            icon: '👁', diff: 'medium'   },
  { n: 10, slug: '10-tool-use',           title: 'Tool Use',          icon: '🔧', diff: 'medium'   },
  { n: 11, slug: '11-files-api',          title: 'Files API',         icon: '📎', diff: 'easy'     },
  { n: 12, slug: '12-extended-thinking',  title: 'Extended Thinking', icon: '💭', diff: 'advanced' }
];

const STORAGE_KEY = 'claude-music-curriculum-progress';
const FETCHABLE = location.protocol === 'http:' || location.protocol === 'https:';

/* ----- State ----- */
const state = {
  progress: loadProgress(),   // { [slug]: { complete: bool, quizPassed: bool } }
  currentLesson: null,        // index into LESSONS
  quizState: {},              // { [questionIndex]: { answered, correct } } for current lesson
  cache: {}                   // { [slug]: parsedLesson }
};

/* ----- DOM refs ----- */
const tileGrid     = document.getElementById('tileGrid');
const modalEl      = document.getElementById('lessonModal');
const modalIcon    = document.getElementById('modalIcon');
const modalNumber  = document.getElementById('modalNumber');
const modalPill    = document.getElementById('modalPill');
const modalTitle   = document.getElementById('modalTitle');
const modalBody    = document.getElementById('modalBody');
const closeBtn     = document.getElementById('closeModal');
const prevBtn      = document.getElementById('prevLesson');
const nextBtn      = document.getElementById('nextLesson');
const completeBtn  = document.getElementById('completeBtn');
const progressFill = document.getElementById('progressFill');
const progressCount= document.getElementById('progressCount');
const resetBtn     = document.getElementById('resetBtn');

/* ============================================================
   Boot
   ============================================================ */
renderTiles();
updateProgressBar();

closeBtn.addEventListener('click', closeModal);
modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (modalEl.hidden) return;
  if (e.key === 'Escape')      closeModal();
  if (e.key === 'ArrowLeft')   navLesson(-1);
  if (e.key === 'ArrowRight')  navLesson(+1);
});

prevBtn.addEventListener('click', () => navLesson(-1));
nextBtn.addEventListener('click', () => navLesson(+1));
completeBtn.addEventListener('click', markComplete);
resetBtn.addEventListener('click', () => {
  if (!confirm('Reset all lesson progress? This cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEY);
  state.progress = {};
  renderTiles();
  updateProgressBar();
});

/* ============================================================
   Progress (localStorage)
   ============================================================ */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function isComplete(slug) {
  return !!state.progress[slug]?.complete;
}

function updateProgressBar() {
  const completed = LESSONS.filter(l => isComplete(l.slug)).length;
  progressCount.textContent = completed;
  progressFill.style.width = `${(completed / LESSONS.length) * 100}%`;
}

/* ============================================================
   Tile rendering
   ============================================================ */
function renderTiles() {
  tileGrid.innerHTML = '';
  LESSONS.forEach((l, idx) => {
    const tile = document.createElement('div');
    tile.className = 'tile' + (isComplete(l.slug) ? ' completed' : '');
    tile.setAttribute('role', 'listitem');
    tile.tabIndex = 0;
    tile.innerHTML = `
      <div class="tile-num">Lesson ${String(l.n).padStart(2, '0')}</div>
      <div class="tile-icon">${l.icon}</div>
      <h3 class="tile-title">${l.title}</h3>
      <div class="tile-foot">
        <span class="pill ${l.diff}">${l.diff}</span>
        <span class="tile-arrow">→</span>
      </div>
    `;
    tile.addEventListener('mousemove', (e) => {
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', `${e.clientX - r.left}px`);
      tile.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    tile.addEventListener('click', () => openLesson(idx));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLesson(idx); }
    });
    tileGrid.appendChild(tile);
  });
}

/* ============================================================
   Modal open / close / nav
   ============================================================ */
function openLesson(idx) {
  state.currentLesson = idx;
  state.quizState = {};
  const l = LESSONS[idx];

  modalIcon.textContent = l.icon;
  modalNumber.textContent = String(l.n).padStart(2, '0');
  modalTitle.textContent = l.title;
  modalPill.textContent = l.diff;
  modalPill.className = 'modal-pill ' + l.diff;

  modalEl.hidden = false;
  document.body.style.overflow = 'hidden';

  loadAndRenderLesson(l);
  refreshNavButtons();
  refreshCompleteButton();
}

function closeModal() {
  modalEl.hidden = true;
  document.body.style.overflow = '';
  state.currentLesson = null;
}

function navLesson(delta) {
  if (state.currentLesson === null) return;
  const next = state.currentLesson + delta;
  if (next < 0 || next >= LESSONS.length) return;
  openLesson(next);
}

function refreshNavButtons() {
  prevBtn.disabled = state.currentLesson <= 0;
  nextBtn.disabled = state.currentLesson >= LESSONS.length - 1;
}

function refreshCompleteButton() {
  const l = LESSONS[state.currentLesson];
  const lp = state.progress[l.slug] || {};
  if (lp.complete) {
    completeBtn.classList.add('is-complete');
    completeBtn.textContent = '✓ Completed';
    completeBtn.disabled = true;
    return;
  }
  completeBtn.classList.remove('is-complete');
  completeBtn.textContent = 'Mark complete';

  // Need quiz passed (if quiz exists) — figure out from cache
  const cached = state.cache[l.slug];
  if (!cached) { completeBtn.disabled = true; return; }
  if (!cached.quiz || cached.quiz.length === 0) {
    completeBtn.disabled = false;
    return;
  }
  completeBtn.disabled = !lp.quizPassed;
}

function markComplete() {
  const l = LESSONS[state.currentLesson];
  state.progress[l.slug] = { ...(state.progress[l.slug] || {}), complete: true };
  saveProgress();
  renderTiles();
  updateProgressBar();
  refreshCompleteButton();
}

/* ============================================================
   Lesson loader
   ============================================================ */
async function loadAndRenderLesson(lesson) {
  // Cached?
  if (state.cache[lesson.slug]) {
    renderLesson(state.cache[lesson.slug]);
    refreshCompleteButton();
    return;
  }

  showLoadingPlaceholder(lesson);

  if (!FETCHABLE) {
    // file:// — can't fetch
    showLoadingPlaceholder(lesson, {
      err: 'This page is open via file://. Serve it over HTTP to load lessons (e.g. `python -m http.server`).'
    });
    return;
  }

  try {
    const res = await fetch(`research/${lesson.slug}.md`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    const parsed = parseLesson(md);
    state.cache[lesson.slug] = parsed;
    renderLesson(parsed);
    refreshCompleteButton();
  } catch (err) {
    showLoadingPlaceholder(lesson, { err: err.message });
  }
}

function showLoadingPlaceholder(lesson, opts = {}) {
  const errBlock = opts.err
    ? `<div class="lesson-error">Couldn't load <code>research/${lesson.slug}.md</code> — ${escapeHtml(opts.err)}</div>`
    : '';
  modalBody.innerHTML = `
    <div class="lesson-loading">
      ${opts.err ? '' : '<div class="spinner"></div>'}
      <h3>${opts.err ? 'Lesson not ready yet' : 'Lesson loading...'}</h3>
      <p>${opts.err ? 'The research agent may still be writing this file.' :
                      'Fetching <code>research/' + lesson.slug + '.md</code>'}</p>
      ${errBlock}
      <button class="retry-btn" id="retryLoad">Retry</button>
    </div>
  `;
  document.getElementById('retryLoad').addEventListener('click', () => {
    delete state.cache[lesson.slug];
    loadAndRenderLesson(lesson);
  });
}

/* ============================================================
   Markdown parsing
   - We support: # / ## / ### headings, **bold**, *em*, `code`,
     fenced ```code blocks```, - and 1. lists, > quotes, [text](url),
     paragraphs, plus YAML frontmatter and a custom Quiz block.
   - Quiz format inside the markdown:
       ## Quiz
       1. Question text?
          - [ ] Wrong answer
          - [x] Correct answer
          - [ ] Another wrong answer
   ============================================================ */
function parseLesson(raw) {
  // Strip frontmatter (--- ... ---) if present
  let body = raw;
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fm) body = raw.slice(fm[0].length);

  // Split out quiz section so we can render it interactively
  const quizSplit = splitQuizSection(body);
  const quiz = quizSplit.quiz;
  const mdNoQuiz = quizSplit.body;

  return {
    html: mdToHtml(mdNoQuiz),
    quiz
  };
}

function splitQuizSection(md) {
  // find a heading (## or #) that starts with "Quiz"
  const lines = md.split(/\r?\n/);
  let quizStart = -1;
  let quizEnd = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,3}\s+Quiz\b/i.test(lines[i])) { quizStart = i; break; }
  }
  if (quizStart === -1) return { body: md, quiz: [] };

  // quiz ends at next heading of same or higher level
  const headerLevel = (lines[quizStart].match(/^#+/) || [''])[0].length;
  for (let i = quizStart + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+/);
    if (m && m[1].length <= headerLevel) { quizEnd = i; break; }
  }

  const beforeQuiz = lines.slice(0, quizStart).join('\n');
  const afterQuiz  = lines.slice(quizEnd).join('\n');
  const quizLines  = lines.slice(quizStart + 1, quizEnd).join('\n');
  const quiz = parseQuizBlock(quizLines);
  return {
    body: (beforeQuiz + '\n' + afterQuiz).replace(/\n{3,}/g, '\n\n'),
    quiz
  };
}

function parseQuizBlock(text) {
  // Numbered questions: "1. Question?"  followed by - [ ] / - [x] options
  const questions = [];
  const lines = text.split(/\r?\n/);
  let cur = null;
  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const qMatch = line.match(/^\s*\d+\.\s+(.+)$/);
    const oMatch = line.match(/^\s*[-*]\s*\[( |x|X)\]\s+(.+)$/);
    if (qMatch && !oMatch) {
      if (cur) questions.push(cur);
      cur = { q: qMatch[1].trim(), options: [] };
    } else if (oMatch && cur) {
      cur.options.push({
        text: oMatch[2].trim(),
        correct: oMatch[1].toLowerCase() === 'x'
      });
    }
  }
  if (cur) questions.push(cur);
  // Drop questions with no options
  return questions.filter(q => q.options.length > 0);
}

/* Tiny markdown -> HTML (handles the subset we use) */
function mdToHtml(md) {
  // Normalize newlines
  md = md.replace(/\r\n/g, '\n').trim();

  // Pull out fenced code blocks first to protect them
  const codeBlocks = [];
  md = md.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (_, lang, code) => {
    codeBlocks.push({ lang, code });
    return ` CODEBLOCK${codeBlocks.length - 1} `;
  });

  // Escape raw HTML
  md = escapeHtml(md);

  // Headings
  md = md.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
  md = md.replace(/^##### (.+)$/gm,  '<h5>$1</h5>');
  md = md.replace(/^#### (.+)$/gm,   '<h4>$1</h4>');
  md = md.replace(/^### (.+)$/gm,    '<h3>$1</h3>');
  md = md.replace(/^## (.+)$/gm,     '<h2>$1</h2>');
  md = md.replace(/^# (.+)$/gm,      '<h1>$1</h1>');

  // Blockquotes
  md = md.replace(/(^>\s.+(\n>\s.+)*)/gm, (block) => {
    const inner = block.split('\n').map(l => l.replace(/^>\s?/, '')).join('\n');
    return `<blockquote>${inner}</blockquote>`;
  });

  // Lists — group consecutive list lines
  md = md.replace(/(?:^[ \t]*[-*]\s+.+(?:\n|$))+?/gm, (block) => {
    const items = block.trim().split(/\n/).map(l =>
      `<li>${l.replace(/^[ \t]*[-*]\s+/, '')}</li>`
    ).join('');
    return `<ul>${items}</ul>\n`;
  });
  md = md.replace(/(?:^[ \t]*\d+\.\s+.+(?:\n|$))+?/gm, (block) => {
    const items = block.trim().split(/\n/).map(l =>
      `<li>${l.replace(/^[ \t]*\d+\.\s+/, '')}</li>`
    ).join('');
    return `<ol>${items}</ol>\n`;
  });

  // Inline: links, bold, italics, code
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  md = md.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  md = md.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  md = md.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // Paragraphs — wrap stretches that aren't already block-level
  md = md.split(/\n{2,}/).map(chunk => {
    const trimmed = chunk.trim();
    if (!trimmed) return '';
    if (/^<(h\d|ul|ol|blockquote|pre|p|div|table)/.test(trimmed)) return trimmed;
    if (/^ CODEBLOCK\d+ $/.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n\n');

  // Restore code blocks
  md = md.replace(/ CODEBLOCK(\d+) /g, (_, i) => {
    const cb = codeBlocks[Number(i)];
    const langClass = cb.lang ? ` class="language-${cb.lang}"` : '';
    return `<pre><code${langClass}>${escapeHtml(cb.code)}</code></pre>`;
  });

  return md;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   Render lesson into modal body
   ============================================================ */
function renderLesson(parsed) {
  modalBody.innerHTML = parsed.html;

  if (parsed.quiz && parsed.quiz.length > 0) {
    const quizWrap = document.createElement('div');
    quizWrap.className = 'quiz-container';
    quizWrap.innerHTML = `<h2>Quiz</h2>`;

    parsed.quiz.forEach((q, qi) => {
      const block = document.createElement('div');
      block.className = 'quiz-block';
      block.innerHTML = `
        <p class="quiz-question">${qi + 1}. ${escapeHtml(q.q)}</p>
        <div class="quiz-options" data-q="${qi}">
          ${q.options.map((o, oi) => `
            <button class="quiz-option" data-q="${qi}" data-o="${oi}" data-correct="${o.correct}">
              <span class="opt-letter">${String.fromCharCode(65 + oi)}</span>
              <span>${escapeHtml(o.text)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" data-q="${qi}"></div>
      `;
      quizWrap.appendChild(block);
    });

    const summary = document.createElement('div');
    summary.className = 'quiz-summary';
    summary.id = 'quizSummary';
    summary.style.display = 'none';
    summary.textContent = '🎉 All correct — you can mark this lesson complete.';
    quizWrap.appendChild(summary);

    modalBody.appendChild(quizWrap);

    // Wire option clicks
    quizWrap.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', onQuizClick);
    });
  }

  // Snap modal body to top
  modalBody.scrollTop = 0;
}

function onQuizClick(e) {
  const btn = e.currentTarget;
  const qi  = Number(btn.dataset.q);
  const oi  = Number(btn.dataset.o);
  const correct = btn.dataset.correct === 'true';

  // Don't re-allow once locked-in correct
  if (state.quizState[qi]?.correct) return;

  const block = btn.closest('.quiz-block');
  const feedback = block.querySelector(`.quiz-feedback[data-q="${qi}"]`);
  const allOpts = block.querySelectorAll('.quiz-option');

  if (correct) {
    btn.classList.add('locked-correct');
    allOpts.forEach(o => { if (o !== btn) o.disabled = true; });
    feedback.textContent = '✓ Correct.';
    feedback.classList.remove('bad');
    feedback.classList.add('good');
    state.quizState[qi] = { answered: true, correct: true };
    checkQuizComplete();
  } else {
    btn.classList.add('locked-wrong');
    btn.disabled = true;
    feedback.textContent = '✗ Try again.';
    feedback.classList.remove('good');
    feedback.classList.add('bad');
    state.quizState[qi] = { answered: true, correct: false };
  }
}

function checkQuizComplete() {
  const l = LESSONS[state.currentLesson];
  const cached = state.cache[l.slug];
  if (!cached || !cached.quiz) return;
  const total = cached.quiz.length;
  const passed = Object.values(state.quizState).filter(s => s.correct).length;
  if (passed === total && total > 0) {
    state.progress[l.slug] = { ...(state.progress[l.slug] || {}), quizPassed: true };
    saveProgress();
    const summary = document.getElementById('quizSummary');
    if (summary) summary.style.display = 'block';
    refreshCompleteButton();
  }
}
