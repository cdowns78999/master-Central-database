/* =========================================================
   P3 — Song Pick (Agent 4)
   Wires inputs to captureField('p3', key, value)
   ========================================================= */

(function () {
  'use strict';

  function init() {
    var section = document.getElementById('p3');
    if (!section) return;

    var inputs = section.querySelectorAll('[data-vrfl-key]');
    if (!inputs.length) return;

    inputs.forEach(function (el) {
      var key = el.getAttribute('data-vrfl-key');
      if (!key) return;

      var handler = function () {
        var value = el.value != null ? el.value.trim() : '';
        if (typeof window.captureField === 'function') {
          window.captureField('p3', key, value);
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
