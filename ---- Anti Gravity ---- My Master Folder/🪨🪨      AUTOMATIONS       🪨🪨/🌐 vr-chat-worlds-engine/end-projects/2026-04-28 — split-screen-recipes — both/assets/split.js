/* ============================================================
   split.js — view-toggle controller + recipe interactions
   Replaces split-screen layout. One view at a time, glowing
   center-top toggle button cycles through VIEWS[].
   Scales: add a new view = one entry in VIEWS.
   ============================================================ */

(function () {
  'use strict';

  // ---------- VIEWS CONFIG ----------
  const VIEWS = [
    { id: 'view-1', number: 1, label: 'VR CHAT WORLDS', color: '#0ea5e9', glow: 'rgba(14,165,233,0.6)' },
    { id: 'view-2', number: 2, label: 'RECIPES',        color: '#ec4899', glow: 'rgba(236,72,153,0.6)' }
  ];
  let currentViewIndex = 0;

  // ---------- Helpers ----------
  function darkenHex(hex, factor) {
    // factor 0.2 = 80% darker
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return hex;
    const n = parseInt(m[1], 16);
    let r = (n >> 16) & 0xff;
    let g = (n >> 8) & 0xff;
    let b = n & 0xff;
    r = Math.max(0, Math.round(r * factor));
    g = Math.max(0, Math.round(g * factor));
    b = Math.max(0, Math.round(b * factor));
    return '#' + [r, g, b].map(function (v) { return v.toString(16).padStart(2, '0'); }).join('');
  }

  function softenGlow(rgba, factor) {
    // turn rgba(...,0.6) into rgba(...,0.3) (factor 0.5)
    const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/i.exec(rgba || '');
    if (!m) return rgba;
    const a = m[4] != null ? parseFloat(m[4]) : 1;
    return 'rgba(' + m[1] + ',' + m[2] + ',' + m[3] + ',' + (a * factor).toFixed(3) + ')';
  }

  // ---------- View toggling ----------
  function applyView(idx) {
    const cfg = VIEWS[idx];
    if (!cfg) return;

    // Toggle .active class on each view section
    VIEWS.forEach(function (v, i) {
      const el = document.getElementById(v.id);
      if (!el) return;
      if (i === idx) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Update button content + colors via CSS custom properties
    const btn = document.getElementById('view-toggle');
    if (btn) {
      const num = btn.querySelector('.toggle-number');
      const lbl = btn.querySelector('.toggle-label');
      if (num) num.textContent = String(cfg.number);
      if (lbl) lbl.textContent = cfg.label;
      btn.style.setProperty('--toggle-color',      cfg.color);
      btn.style.setProperty('--toggle-color-dark', darkenHex(cfg.color, 0.2));
      btn.style.setProperty('--toggle-glow',       cfg.glow);
      btn.style.setProperty('--toggle-glow-soft',  softenGlow(cfg.glow, 0.5));
      btn.setAttribute('aria-label', 'Switch view (currently ' + cfg.label + ')');
    }
  }

  function cycleView() {
    currentViewIndex = (currentViewIndex + 1) % VIEWS.length;
    applyView(currentViewIndex);
  }

  function bindToggle() {
    const btn = document.getElementById('view-toggle');
    if (!btn) return;
    btn.addEventListener('click', cycleView);
    // keyboard: arrow-key cycling
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
        cycleView();
      }
    });
  }

  // ---------- Recipe interactions ----------
  function bindRecipeInteractions() {
    document.addEventListener('click', function (e) {
      // Orbit button → toggles .recipe-collapse for that tile
      const orbitBtn = e.target.closest('.orbit-btn');
      if (orbitBtn) {
        e.preventDefault();
        e.stopPropagation();
        const tile = orbitBtn.closest('.recipe-tile');
        if (!tile) return;
        const collapse = tile.querySelector('.recipe-collapse');
        if (!collapse) return;
        if (collapse.hasAttribute('hidden')) {
          collapse.removeAttribute('hidden');
        } else {
          collapse.setAttribute('hidden', '');
        }
        return;
      }

      // Source button → opens registry, pulses, highlights matching source row
      const srcBtn = e.target.closest('.source-btn');
      if (srcBtn) {
        e.preventDefault();
        e.stopPropagation();
        srcBtn.classList.add('pulse');
        setTimeout(function () { srcBtn.classList.remove('pulse'); }, 800);
        const tile = srcBtn.closest('.recipe-tile');
        const recipeName = tile ? tile.getAttribute('data-name') : null;
        openRegistry(recipeName);
        return;
      }

      // Registry close
      if (e.target.closest('.registry-close')) {
        closeRegistry();
        return;
      }

      // Overlay close
      if (e.target.closest('.overlay-close')) {
        closeOverlay();
        return;
      }

      // Click backdrop of overlay (but not its inner content)
      const overlay = document.getElementById('recipe-overlay');
      if (overlay && !overlay.hasAttribute('hidden') && e.target === overlay) {
        closeOverlay();
        return;
      }

      // Recipe tile body click (not on inner buttons / collapse) → open overlay
      const recipeTile = e.target.closest('.recipe-tile');
      if (recipeTile && !e.target.closest('.orbit-btn') && !e.target.closest('.recipe-collapse')) {
        const idx = parseInt(recipeTile.getAttribute('data-recipe-id'), 10);
        if (!isNaN(idx) && window.RECIPES_DATA && window.RECIPES_DATA[idx]) {
          openOverlay(window.RECIPES_DATA[idx]);
        }
      }
    });

    // Esc closes overlay/registry
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeOverlay();
        closeRegistry();
      }
    });
  }

  function openRegistry(highlightName) {
    const reg = document.getElementById('source-registry');
    if (!reg) return;
    reg.removeAttribute('hidden');
    if (highlightName) {
      const items = reg.querySelectorAll('.registry-list li');
      items.forEach(function (li) {
        const a = li.querySelector('a');
        if (a && a.textContent && a.textContent.toLowerCase().indexOf(String(highlightName).toLowerCase()) !== -1) {
          li.classList.add('highlight');
          li.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          li.classList.remove('highlight');
        }
      });
    }
  }
  function closeRegistry() {
    const reg = document.getElementById('source-registry');
    if (reg) reg.setAttribute('hidden', '');
  }

  function openOverlay(recipe) {
    const overlay = document.getElementById('recipe-overlay');
    const content = overlay && overlay.querySelector('.overlay-content');
    if (!overlay || !content) return;
    const esc = function (s) {
      if (s == null) return '';
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    const ing = Array.isArray(recipe.ingredients)
      ? '<ul>' + recipe.ingredients.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>'
      : '';
    const stp = Array.isArray(recipe.steps)
      ? '<ol>' + recipe.steps.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ol>'
      : '';
    content.innerHTML =
      '<h2>' + esc(recipe.name || 'Recipe') + '</h2>' +
      (recipe.unique_factor ? '<p><em>' + esc(recipe.unique_factor) + '</em></p>' : '') +
      (ing ? '<h4>Ingredients</h4>' + ing : '') +
      (stp ? '<h4>Steps</h4>' + stp : '');
    overlay.removeAttribute('hidden');
  }
  function closeOverlay() {
    const overlay = document.getElementById('recipe-overlay');
    if (overlay) overlay.setAttribute('hidden', '');
  }

  // ---------- Boot ----------
  function init() {
    bindToggle();
    bindRecipeInteractions();
    applyView(currentViewIndex);
    document.body.dataset.tilesReady = '1';
  }

  // Wait until inline loader is done
  window.addEventListener('tiles-rendered', init);

  // Fallback — if tiles-rendered never fires (e.g., all 6 fetches fail),
  // still wire up the toggle so navigation works.
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      if (!document.body.dataset.tilesReady) {
        bindToggle();
        bindRecipeInteractions();
        applyView(currentViewIndex);
      }
    }, 1500);
  });
})();
