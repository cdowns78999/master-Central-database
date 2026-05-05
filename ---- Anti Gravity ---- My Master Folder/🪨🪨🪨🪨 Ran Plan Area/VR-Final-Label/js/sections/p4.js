/* =========================================================
   P4 — Cover Theme Picker (Agent 4)
   Tile select (radio), chip toggle (multi), custom textarea reveal,
   text/textarea capture — all flow through captureField('p4', ...)
   ========================================================= */

(function () {
  'use strict';

  function init() {
    var section = document.getElementById('p4');
    if (!section) return;

    // ---- Theme tiles (radio behavior) ----
    var tiles = section.querySelectorAll('.p4-tile');
    var customWrap = section.querySelector('#p4-custom-wrap');

    tiles.forEach(function (tile) {
      tile.addEventListener('click', function () {
        var theme = tile.getAttribute('data-theme');
        if (!theme) return;

        tiles.forEach(function (t) {
          t.classList.remove('is-selected');
          t.setAttribute('aria-checked', 'false');
        });
        tile.classList.add('is-selected');
        tile.setAttribute('aria-checked', 'true');

        if (typeof window.captureField === 'function') {
          window.captureField('p4', 'theme', theme);
        }

        if (customWrap) {
          if (theme === 'custom') {
            customWrap.classList.add('is-open');
            // focus textarea on next paint for clean UX
            var ta = customWrap.querySelector('textarea');
            if (ta) setTimeout(function () { ta.focus(); }, 200);
          } else {
            customWrap.classList.remove('is-open');
          }
        }
      });
    });

    // ---- Mood chips (multi-select) ----
    var chips = section.querySelectorAll('.p4-chip');
    var selectedMoods = [];

    function pushMoods() {
      if (typeof window.captureField === 'function') {
        window.captureField('p4', 'moods', selectedMoods.slice());
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var mood = chip.getAttribute('data-mood');
        if (!mood) return;

        var idx = selectedMoods.indexOf(mood);
        if (idx === -1) {
          selectedMoods.push(mood);
          chip.classList.add('is-active');
          chip.setAttribute('aria-pressed', 'true');
        } else {
          selectedMoods.splice(idx, 1);
          chip.classList.remove('is-active');
          chip.setAttribute('aria-pressed', 'false');
        }

        pushMoods();
      });
    });

    // ---- Text inputs / textareas with data-vrfl-key ----
    var textInputs = section.querySelectorAll('[data-vrfl-key]');
    textInputs.forEach(function (el) {
      var key = el.getAttribute('data-vrfl-key');
      if (!key) return;

      var handler = function () {
        var value = el.value != null ? el.value.trim() : '';
        if (typeof window.captureField === 'function') {
          window.captureField('p4', key, value);
        }
      };

      el.addEventListener('input', handler);
      el.addEventListener('change', handler);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
