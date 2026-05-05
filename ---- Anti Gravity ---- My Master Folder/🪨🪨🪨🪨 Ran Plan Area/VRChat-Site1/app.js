/* ============================================================
   VRChat Ultimate — app.js
   Navigation, scroll-spy, age gate, interactivity
   ============================================================ */

'use strict';

/* ── DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollSpy();
  initAccordions();
  initPillFilters();
  initAgeGates();
  initSlangSearch();
  initCountdowns();
  initCopyButtons();
  initWorldModal();
  initAlphaNav();
  restoreAgeGates();
  initAvatarFilter();
  initWorldCategoryFilter();
  initDevTierSelector();
  initGossipToggle();
  initBodyTrackingQuiz();
  initGamesFilter();
  initNewsFilter();
  initFormHandlers();
});

/* ============================================================
   NAVIGATION & HAMBURGER
   ============================================================ */
function initNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer    = document.getElementById('nav-drawer');

  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    drawer.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', drawer.classList.contains('open'));
  });

  // Close drawer on nav link click
  drawer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });

  // Smooth scroll for all nav links
  document.querySelectorAll('.nav-link[data-target]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   SCROLL SPY — active nav link highlighting
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('.site-section[id]');
  const navLinks  = document.querySelectorAll('.nav-link[data-target]');

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === id);
          });
        }
      });
    },
    { rootMargin: '-55% 0px -40% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   ACCORDIONS
   ============================================================ */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');

      // close all siblings
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
      });

      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ============================================================
   PILL FILTERS (generic)
   ============================================================ */
function initPillFilters() {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const pills = group.querySelectorAll('.pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.dataset.filter;
        const targetGroup = pill.closest('[data-filter-group]').dataset.filterGroup;
        filterCards(targetGroup, filterVal);
      });
    });
  });
}

function filterCards(group, filter) {
  const container = document.querySelector(`[data-cards-group="${group}"]`);
  if (!container) return;
  const cards = container.querySelectorAll('[data-tags]');
  cards.forEach(card => {
    if (filter === 'all') {
      card.style.display = '';
    } else {
      const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
      card.style.display = tags.includes(filter) ? '' : 'none';
    }
  });
}

/* ============================================================
   AGE GATES (sections 16 + 17)
   ============================================================ */
function initAgeGates() {
  document.querySelectorAll('.age-gate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      sessionStorage.setItem(`age-verified-${sectionId}`, '1');
      const overlay = document.getElementById(`age-gate-${sectionId}`);
      if (overlay) overlay.style.display = 'none';
      const content = document.getElementById(`content-${sectionId}`);
      if (content) {
        content.classList.remove('content-lock');
        content.style.filter = '';
        content.style.pointerEvents = '';
      }
    });
  });

  document.querySelectorAll('.age-gate-decline').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.querySelector('#sec-history');
      if (nav) nav.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function restoreAgeGates() {
  ['18plus', 'sexmarket'].forEach(sectionId => {
    if (sessionStorage.getItem(`age-verified-${sectionId}`) === '1') {
      const overlay = document.getElementById(`age-gate-${sectionId}`);
      if (overlay) overlay.style.display = 'none';
      const content = document.getElementById(`content-${sectionId}`);
      if (content) {
        content.classList.remove('content-lock');
        content.style.filter = '';
        content.style.pointerEvents = '';
      }
    }
  });
}

/* ============================================================
   SLANG DICTIONARY SEARCH
   ============================================================ */
function initSlangSearch() {
  const input = document.getElementById('slang-search');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.slang-term-card').forEach(card => {
      const term = (card.dataset.term || '').toLowerCase();
      const def  = (card.dataset.def  || '').toLowerCase();
      card.style.display = (!q || term.includes(q) || def.includes(q)) ? '' : 'none';
    });
  });
}

/* ============================================================
   ALPHA NAV — Slang dictionary A-Z
   ============================================================ */
function initAlphaNav() {
  document.querySelectorAll('.alpha-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const letter = btn.dataset.letter;
      document.querySelectorAll('.slang-term-card').forEach(card => {
        const firstChar = (card.dataset.term || '').charAt(0).toUpperCase();
        card.style.display = (letter === 'ALL' || firstChar === letter) ? '' : 'none';
      });
    });
  });
}

/* ============================================================
   COUNTDOWN TIMERS (static display with real calculation)
   ============================================================ */
function initCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const target = new Date(el.dataset.countdown);
    updateCountdown(el, target);
    setInterval(() => updateCountdown(el, target), 1000);
  });
}

function updateCountdown(el, target) {
  const now  = Date.now();
  const diff = target.getTime() - now;
  if (diff <= 0) {
    el.innerHTML = '<span class="badge badge-green">LIVE NOW</span>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  el.innerHTML = `
    <div class="countdown">
      <div class="countdown-unit"><span class="countdown-num">${d}</span><span class="countdown-label">days</span></div>
      <div class="countdown-unit"><span class="countdown-num">${String(h).padStart(2,'0')}</span><span class="countdown-label">hrs</span></div>
      <div class="countdown-unit"><span class="countdown-num">${String(m).padStart(2,'0')}</span><span class="countdown-label">min</span></div>
      <div class="countdown-unit"><span class="countdown-num">${String(s).padStart(2,'0')}</span><span class="countdown-label">sec</span></div>
    </div>`;
}

/* ============================================================
   COPY BUTTONS
   ============================================================ */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.classList.add('btn-primary');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('btn-primary');
        }, 1800);
      }).catch(() => {
        // fallback
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      });
    });
  });
}

/* ============================================================
   WORLD SPOTLIGHT MODAL
   ============================================================ */
function initWorldModal() {
  const modal = document.getElementById('world-modal');
  if (!modal) return;

  document.querySelectorAll('[data-world]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a, button')) return;
      const name    = card.dataset.world    || 'Unknown World';
      const creator = card.dataset.creator  || 'Unknown Creator';
      const desc    = card.dataset.desc     || 'No description available.';
      const cat     = card.dataset.category || 'General';

      document.getElementById('modal-world-name').textContent    = name;
      document.getElementById('modal-world-creator').textContent = creator;
      document.getElementById('modal-world-desc').textContent    = desc;
      document.getElementById('modal-world-cat').textContent     = cat;

      modal.classList.remove('hidden');
    });
  });

  document.getElementById('world-modal-close')?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.add('hidden');
  });
}

/* ============================================================
   AVATAR FILTERS
   ============================================================ */
function initAvatarFilter() {
  const avatarPills = document.querySelectorAll('#avatar-filter .pill');
  avatarPills.forEach(pill => {
    pill.addEventListener('click', () => {
      avatarPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;
      document.querySelectorAll('.avatar-card').forEach(card => {
        card.style.display = (f === 'all' || (card.dataset.tags && card.dataset.tags.split(',').includes(f)))
          ? '' : 'none';
      });
    });
  });
}

/* ============================================================
   WORLD CATEGORY FILTERS (50 Worlds)
   ============================================================ */
function initWorldCategoryFilter() {
  const worldPills = document.querySelectorAll('#worlds-filter .pill');
  worldPills.forEach(pill => {
    pill.addEventListener('click', () => {
      worldPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;
      document.querySelectorAll('.world-card').forEach(card => {
        card.style.display = (f === 'all' || (card.dataset.cat && card.dataset.cat === f))
          ? '' : 'none';
      });
    });
  });
}

/* ============================================================
   DEV SKILL TIER SELECTOR
   ============================================================ */
function initDevTierSelector() {
  // Scope separately to each section to avoid cross-section interference
  const avatarCreationBtns = document.querySelectorAll('#sec-avatar-creation .dev-tier-btn');
  if (avatarCreationBtns.length) {
    avatarCreationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        avatarCreationBtns.forEach(b => { b.classList.remove('active'); b.classList.replace('btn-primary','btn-ghost'); });
        btn.classList.add('active');
        btn.classList.replace('btn-ghost', 'btn-primary');
        const tier = btn.dataset.tier;
        document.querySelectorAll('#sec-avatar-creation .dev-tier-content').forEach(el => {
          el.style.display = el.dataset.tier === tier ? '' : 'none';
        });
      });
    });
  }

  const devBtns = document.querySelectorAll('#sec-dev .dev-tier-btn');
  if (devBtns.length) {
    devBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        devBtns.forEach(b => { b.classList.remove('active'); b.classList.replace('btn-primary','btn-ghost'); });
        btn.classList.add('active');
        btn.classList.replace('btn-ghost', 'btn-primary');
        const tier = btn.dataset.tier;
        document.querySelectorAll('#sec-dev .dev-tier-content').forEach(el => {
          el.style.display = el.dataset.tier === tier ? '' : 'none';
        });
      });
    });
  }
}

/* ============================================================
   GOSSIP — Receipts vs Rumors toggle
   ============================================================ */
function initGossipToggle() {
  const toggleBtns = document.querySelectorAll('.gossip-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ============================================================
   BODY TRACKING — "What do I need?" quiz
   ============================================================ */
function initBodyTrackingQuiz() {
  const quizSteps = document.querySelectorAll('.quiz-step');
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const next = opt.dataset.next;
      quizSteps.forEach(step => step.style.display = 'none');
      if (next) {
        const nextEl = document.getElementById(next);
        if (nextEl) nextEl.style.display = '';
      }
    });
  });

  document.querySelectorAll('.quiz-reset').forEach(btn => {
    btn.addEventListener('click', () => {
      quizSteps.forEach(step => step.style.display = 'none');
      const first = document.getElementById('quiz-step-1');
      if (first) first.style.display = '';
    });
  });
}

/* ============================================================
   GAMES FILTER — dedicated handler for #games-filter
   ============================================================ */
function initGamesFilter() {
  const pills = document.querySelectorAll('#games-filter .pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;
      document.querySelectorAll('.game-card').forEach(card => {
        if (f === 'all') {
          card.style.display = '';
        } else {
          const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
          card.style.display = tags.includes(f) ? '' : 'none';
        }
      });
    });
  });
}

/* ============================================================
   NEWS FILTER — dedicated handler for #news-filter
   ============================================================ */
function initNewsFilter() {
  const pills = document.querySelectorAll('#news-filter .pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;
      document.querySelectorAll('.news-card').forEach(card => {
        if (f === 'all') {
          card.style.display = '';
        } else {
          const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
          card.style.display = tags.includes(f) ? '' : 'none';
        }
      });
    });
  });
}

/* ============================================================
   FORM HANDLERS — tip, slang, news-tip, nominate
   ============================================================ */
function initFormHandlers() {
  const tipForm = document.getElementById('tip-form');
  if (tipForm) {
    tipForm.addEventListener('submit', e => {
      e.preventDefault();
      const confirm = tipForm.querySelector('.tip-confirm');
      if (confirm) confirm.style.display = '';
      tipForm.querySelectorAll('input, textarea, select').forEach(el => el.disabled = true);
      tipForm.querySelector('[type="submit"]').disabled = true;
    });
  }

  const slangForm = document.getElementById('slang-form');
  if (slangForm) {
    slangForm.addEventListener('submit', e => {
      e.preventDefault();
      const confirm = slangForm.querySelector('.slang-confirm');
      if (confirm) confirm.style.display = '';
      slangForm.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
      slangForm.querySelector('[type="submit"]').disabled = true;
    });
  }

  const newsTipForm = document.getElementById('news-tip-form');
  if (newsTipForm) {
    newsTipForm.addEventListener('submit', e => {
      e.preventDefault();
      const confirm = newsTipForm.querySelector('.news-tip-confirm');
      if (confirm) confirm.style.display = '';
      newsTipForm.querySelectorAll('input, textarea, select').forEach(el => el.disabled = true);
      newsTipForm.querySelector('[type="submit"]').disabled = true;
    });
  }

  const nominateForm = document.getElementById('nominate-form');
  if (nominateForm) {
    nominateForm.addEventListener('submit', e => {
      e.preventDefault();
      const confirm = nominateForm.querySelector('.nominate-confirm');
      if (confirm) confirm.style.display = '';
      nominateForm.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
      nominateForm.querySelector('[type="submit"]').disabled = true;
    });
  }
}
