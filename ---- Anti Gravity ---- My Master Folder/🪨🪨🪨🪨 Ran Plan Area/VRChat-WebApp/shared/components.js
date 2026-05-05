/* ============================================================
   VRChat Ultimate — Reusable Components
   ============================================================ */

/**
 * createCard(title, body, tags, footer)
 * Returns a DOM element — a .card with optional tags array and footer text.
 *
 * @param {string} title  - Card heading
 * @param {string} body   - Card body (HTML allowed)
 * @param {string[]} tags - Array of tag strings (rendered as .badge pills)
 * @param {string} footer - Footer text (rendered as .card-secondary)
 * @returns {HTMLElement}
 */
function createCard(title, body, tags, footer) {
  var card = document.createElement('div');
  card.className = 'card';

  // Header
  if (title) {
    var h = document.createElement('h3');
    h.style.fontSize = '1.25rem';
    h.style.fontWeight = '700';
    h.style.marginBottom = '0.75rem';
    h.style.color = 'var(--text-bright)';
    h.textContent = title;
    card.appendChild(h);
  }

  // Body
  if (body) {
    var p = document.createElement('div');
    p.style.fontSize = '0.95rem';
    p.style.color = 'var(--text-dim)';
    p.style.lineHeight = '1.7';
    p.style.flex = '1';
    p.innerHTML = body;
    card.appendChild(p);
  }

  // Tags
  if (tags && tags.length) {
    var tagWrap = document.createElement('div');
    tagWrap.style.display = 'flex';
    tagWrap.style.flexWrap = 'wrap';
    tagWrap.style.gap = '0.4rem';
    tagWrap.style.marginTop = '0.75rem';
    tags.forEach(function (t) {
      var badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = t;
      tagWrap.appendChild(badge);
    });
    card.appendChild(tagWrap);
  }

  // Footer
  if (footer) {
    var ft = document.createElement('div');
    ft.className = 'card-secondary';
    ft.style.marginTop = '0.75rem';
    ft.textContent = footer;
    card.appendChild(ft);
  }

  return card;
}

/**
 * createBadge(text, colorVar)
 * Returns a styled .badge span element.
 *
 * @param {string} text     - Badge label
 * @param {string} colorVar - CSS variable name (e.g. '--vrc-lavender') or hex
 * @returns {HTMLElement}
 */
function createBadge(text, colorVar) {
  var badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = text;
  if (colorVar) {
    var color = colorVar.startsWith('--') ? 'var(' + colorVar + ')' : colorVar;
    badge.style.borderColor = color;
    badge.style.color = color;
    badge.style.background = 'transparent';
    badge.style.border = '1px solid ' + color;
  }
  return badge;
}

/**
 * createStatCard(number, label)
 * Returns a .stat-card element for dashboard grids.
 *
 * @param {string|number} number - The big stat number
 * @param {string} label         - Label underneath
 * @returns {HTMLElement}
 */
function createStatCard(number, label) {
  var card = document.createElement('div');
  card.className = 'stat-card';

  var num = document.createElement('div');
  num.className = 'stat-number';
  num.textContent = number;
  card.appendChild(num);

  var lbl = document.createElement('div');
  lbl.className = 'stat-label';
  lbl.textContent = label;
  card.appendChild(lbl);

  return card;
}

/**
 * createFilterPills(items, containerId)
 * Renders clickable filter pills into a container.
 * First pill ("All") is active by default.
 * Returns an object with `onFilter(callback)` to subscribe to changes.
 *
 * @param {string[]} items       - Labels for filter pills (prepends "All" automatically)
 * @param {string}   containerId - ID of the DOM element to render into
 * @returns {{ onFilter: function }}
 */
function createFilterPills(items, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return { onFilter: function () {} };

  var allItems = ['All'].concat(items);
  var callbacks = [];

  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.gap = '0.5rem';
  container.style.marginBottom = '1.5rem';

  allItems.forEach(function (label, i) {
    var pill = document.createElement('button');
    pill.className = 'filter-pill' + (i === 0 ? ' active' : '');
    pill.textContent = label;
    pill.addEventListener('click', function () {
      container.querySelectorAll('.filter-pill').forEach(function (p) {
        p.classList.remove('active');
      });
      pill.classList.add('active');
      var value = label === 'All' ? null : label;
      callbacks.forEach(function (cb) { cb(value); });
    });
    container.appendChild(pill);
  });

  return {
    onFilter: function (cb) {
      if (typeof cb === 'function') callbacks.push(cb);
    }
  };
}

/**
 * ageGate(key)
 * Shows a modal overlay requiring age verification.
 * Stores confirmation in sessionStorage under `key`.
 * If already verified this session, returns immediately.
 *
 * @param {string} key - sessionStorage key (e.g. 'vrc-age-verified')
 */
function ageGate(key) {
  key = key || 'vrc-age-verified';

  // Already verified this session
  if (sessionStorage.getItem(key) === 'true') return;

  // Build overlay
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';

  var box = document.createElement('div');
  box.className = 'modal-box';
  box.style.textAlign = 'center';

  box.innerHTML =
    '<h2 style="margin-bottom:1rem;color:var(--vrc-lavender);font-size:1.5rem;">' +
      '\u{1F51E} Age Verification' +
    '</h2>' +
    '<p style="color:var(--text-dim);margin-bottom:1.5rem;line-height:1.7;">' +
      'This section contains mature content intended for adults 18 years and older. ' +
      'By continuing, you confirm that you are at least 18 years of age.' +
    '</p>' +
    '<div style="display:flex;gap:1rem;justify-content:center;">' +
      '<button class="btn btn-accent" id="age-confirm">' +
        'I am 18+  —  Enter' +
      '</button>' +
      '<button class="btn btn-ghost" id="age-deny">' +
        'Go Back' +
      '</button>' +
    '</div>';

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Prevent scroll while overlay is up
  document.body.style.overflow = 'hidden';

  document.getElementById('age-confirm').addEventListener('click', function () {
    sessionStorage.setItem(key, 'true');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    document.body.style.overflow = '';
    setTimeout(function () { overlay.remove(); }, 300);
  });

  document.getElementById('age-deny').addEventListener('click', function () {
    window.history.back();
  });
}
