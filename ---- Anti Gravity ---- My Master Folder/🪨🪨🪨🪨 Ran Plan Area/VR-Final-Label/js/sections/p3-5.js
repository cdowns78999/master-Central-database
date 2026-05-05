/* =========================================================
   P3.5 — Cover License Confirm (Agent 4)
   Wires checkbox to captureField('p3-5', 'license-confirmed', boolean)
   ========================================================= */

(function () {
  'use strict';

  function init() {
    var checkbox = document.getElementById('p35-license');
    if (!checkbox) return;

    var key = checkbox.getAttribute('data-vrfl-key') || 'license-confirmed';

    var handler = function () {
      if (typeof window.captureField === 'function') {
        window.captureField('p3-5', key, checkbox.checked);
      }
    };

    checkbox.addEventListener('change', handler);

    // Set initial state in store
    handler();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
