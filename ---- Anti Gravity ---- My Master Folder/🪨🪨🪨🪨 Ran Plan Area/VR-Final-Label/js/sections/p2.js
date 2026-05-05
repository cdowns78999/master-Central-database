/* =========================================================
   P2 — Artist Info Form behavior
   Owned by Agent 3.
   On submit: capture all fields, morph the form, then summon the travel card.
   ========================================================= */

(function () {
  'use strict';

  if (window.__VRFL_P2_INIT__) return;
  window.__VRFL_P2_INIT__ = true;

  function init() {
    var form = document.getElementById('p2-form');
    if (!form) return;

    var wrap = document.getElementById('p2-form-wrap');
    var photoInput = document.getElementById('p2-photo');

    // Helper: capture a single field via the global API (with fallback)
    function capture(key, value) {
      if (typeof window.captureField === 'function') {
        window.captureField('p2', key, value);
      } else {
        // Fallback: write directly to __VRFL and dispatch a compatible event
        window.__VRFL = window.__VRFL || { fields: {}, files: {} };
        if (!window.__VRFL.fields.p2) window.__VRFL.fields.p2 = {};
        window.__VRFL.fields.p2[key] = value;
        document.dispatchEvent(new CustomEvent('vrfl:field', {
          detail: { pageId: 'p2', key: key, value: value }
        }));
      }
    }

    function captureFile(key, fileObj) {
      if (typeof window.captureFile === 'function') {
        window.captureFile('p2', key, fileObj);
      } else {
        window.__VRFL = window.__VRFL || { fields: {}, files: {} };
        if (!window.__VRFL.files.p2) window.__VRFL.files.p2 = {};
        window.__VRFL.files.p2[key] = fileObj;
        document.dispatchEvent(new CustomEvent('vrfl:file', {
          detail: { pageId: 'p2', key: key, name: fileObj && fileObj.name }
        }));
      }
    }

    // Live capture on blur — useful for debugging + early card preview
    var liveTargets = form.querySelectorAll('input[data-key], textarea[data-key]');
    liveTargets.forEach(function (el) {
      if (el.type === 'file') {
        el.addEventListener('change', function () {
          var f = el.files && el.files[0];
          if (f) captureFile(el.dataset.key, f);
        });
      } else {
        el.addEventListener('blur', function () {
          var v = el.value && el.value.trim();
          if (v) capture(el.dataset.key, v);
        });
      }
    });

    function readAndCaptureAll() {
      var fields = form.querySelectorAll('input[data-key], textarea[data-key]');
      fields.forEach(function (el) {
        if (el.type === 'file') {
          var f = el.files && el.files[0];
          if (f) captureFile(el.dataset.key, f);
          return;
        }
        var v = el.value;
        if (v != null) {
          if (typeof v === 'string') v = v.trim();
          if (v !== '') capture(el.dataset.key, v);
        }
      });
    }

    function validate() {
      // Lightweight: required = stage-name + email
      var stageName = document.getElementById('p2-stage-name');
      var email     = document.getElementById('p2-email');
      var ok = true;

      [stageName, email].forEach(function (el) {
        if (!el) return;
        if (!el.value || !el.value.trim()) {
          el.style.borderColor = 'var(--vr-warm)';
          el.style.boxShadow   = '0 0 0 3px rgba(255,127,84,0.18)';
          ok = false;
        } else {
          el.style.borderColor = '';
          el.style.boxShadow   = '';
        }
      });

      if (email && email.value) {
        var rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!rx.test(email.value.trim())) {
          email.style.borderColor = 'var(--vr-warm)';
          email.style.boxShadow   = '0 0 0 3px rgba(255,127,84,0.18)';
          ok = false;
        }
      }

      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validate()) {
        // Focus the first invalid field
        var firstBad = form.querySelector('input[style*="border-color"]');
        if (firstBad) firstBad.focus();
        return;
      }

      readAndCaptureAll();

      // Mark global state
      if (window.__VRFL && window.__VRFL.state) {
        window.__VRFL.state.submitted = true;
      }

      // Morph the form — silhouette flies up-right, fades, blurs
      if (wrap) wrap.classList.add('morphing');

      // After morph, summon the card
      var SHOW_DELAY_MS = 950; // start summon slightly before morph finishes for overlap polish
      setTimeout(function () {
        if (typeof window.showTravelCard === 'function') {
          window.showTravelCard();
        }

        // Auto-scroll to next section so user feels the handoff
        var p3 = document.getElementById('p3');
        if (p3) {
          try { p3.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_e) {}
        }
      }, SHOW_DELAY_MS);

      // Hide the form wrap fully after animation so it doesn't block the next section
      setTimeout(function () {
        if (wrap) {
          wrap.style.display = 'none';
        }
      }, 1200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
