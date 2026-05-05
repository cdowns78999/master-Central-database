/**
 * Blueprint Panel Switcher
 * Engineering theme — precision one-click navigation
 */

(function () {
  'use strict';

  // ── Helpers ────────────────────────────────────────────────────────────────

  /** Hide all panels by adding .hidden, clear active state on all nav buttons */
  function hideAll(panels, buttons) {
    panels.forEach(function (p) {
      p.classList.add('hidden');
      p.style.opacity = '0';
    });
    buttons.forEach(function (b) {
      b.classList.remove('active');
    });
  }

  /** Show a single panel with a quick opacity fade */
  function showPanel(panel) {
    panel.classList.remove('hidden');
    // Force reflow so the transition fires
    void panel.offsetWidth;
    panel.style.opacity = '1';
  }

  // ── Init ───────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    var navButtons = Array.prototype.slice.call(
      document.querySelectorAll('nav button[data-target]')
    );
    var panels = Array.prototype.slice.call(
      document.querySelectorAll('.panel')
    );

    if (!navButtons.length || !panels.length) return;

    // Wire up each nav button
    navButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-target');
        var targetPanel = document.querySelector(targetId);
        if (!targetPanel) return;

        hideAll(panels, navButtons);

        btn.classList.add('active');
        showPanel(targetPanel);
      });
    });

    // Default: show #overview on load
    var defaultPanel = document.querySelector('#overview');
    var defaultBtn   = document.querySelector('nav button[data-target="#overview"]');

    if (defaultPanel) {
      hideAll(panels, navButtons);
      if (defaultBtn) defaultBtn.classList.add('active');
      showPanel(defaultPanel);
    } else {
      // Fallback: show first panel if #overview doesn't exist
      hideAll(panels, navButtons);
      if (navButtons[0]) navButtons[0].classList.add('active');
      showPanel(panels[0]);
    }
  });

})();
