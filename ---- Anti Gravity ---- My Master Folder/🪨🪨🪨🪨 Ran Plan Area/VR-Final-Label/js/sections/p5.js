/* =========================================================
   P5 — Release Metadata behavior
   - sets release-date min = today + 21 days
   - captures all field changes via captureField('p5', ...)
   - pre-fills release-title from P3 song-title (and re-checks on view)
   ========================================================= */

(function () {
  'use strict';

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function isoPlus(days) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function getCapture() {
    return (typeof window.captureField === 'function') ? window.captureField : function () {};
  }

  function safeGetSongTitle() {
    try {
      var f = window.__VRFL && window.__VRFL.fields && window.__VRFL.fields.p3;
      return (f && (f['song-title'] || f.songTitle)) || '';
    } catch (_) { return ''; }
  }

  function init() {
    var form = document.getElementById('p5-form');
    if (!form) return;

    var captureField = getCapture();

    // ---- Release date min = today + 21 days ----
    var dateInput = document.getElementById('p5-release-date');
    if (dateInput) {
      var minDate = isoPlus(21);
      dateInput.setAttribute('min', minDate);
      if (!dateInput.value) {
        dateInput.value = minDate;
        captureField('p5', 'release-date', minDate);
      }
    }

    // ---- Capture pre-filled defaults ----
    captureField('p5', 'label-name',      'VR Final Label');
    captureField('p5', 'language',        'English');
    captureField('p5', 'secondary-genre', 'None');
    captureField('p5', 'explicit',        'No');
    captureField('p5', 'presave-enabled', true);

    // ---- Universal change listener ----
    function onChange(e) {
      var t = e.target;
      if (!t || !t.dataset) return;
      var key = t.dataset.key;
      if (!key) return;

      var value;
      if (t.type === 'checkbox')      value = !!t.checked;
      else if (t.type === 'radio')    { if (!t.checked) return; value = t.value; }
      else                            value = t.value;

      captureField('p5', key, value);
    }

    form.addEventListener('input',  onChange);
    form.addEventListener('change', onChange);

    // ---- Pre-fill release-title from P3 song-title ----
    var titleInput = document.getElementById('p5-release-title');

    function prefillTitle() {
      if (!titleInput) return;
      // Don't clobber a user-edited value
      if (titleInput.dataset.userEdited === '1') return;
      var t = safeGetSongTitle();
      if (t && titleInput.value !== t) {
        titleInput.value = t;
        captureField('p5', 'release-title', t);
      }
    }

    if (titleInput) {
      titleInput.addEventListener('input', function () {
        titleInput.dataset.userEdited = '1';
      });
    }

    // 1) Try once now (P3 may already exist)
    setTimeout(prefillTitle, 50);

    // 2) Listen for live P3 updates
    document.addEventListener('vrfl:field', function (ev) {
      if (!ev || !ev.detail) return;
      if (ev.detail.pageId === 'p3' &&
          (ev.detail.key === 'song-title' || ev.detail.key === 'songTitle')) {
        prefillTitle();
      }
    });

    // 3) Re-check when P5 scrolls into view
    if ('IntersectionObserver' in window) {
      var section = document.getElementById('p5');
      if (section) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) prefillTitle();
          });
        }, { threshold: 0.25 });
        io.observe(section);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
