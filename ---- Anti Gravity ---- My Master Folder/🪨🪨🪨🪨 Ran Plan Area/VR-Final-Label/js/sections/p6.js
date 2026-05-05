/* =========================================================
   P6 — Cover Art Drop
   Drag-drop + click-to-browse. Image dim validation.
   ========================================================= */

(function () {
  'use strict';

  function init() {
    var drop    = document.getElementById('p6-drop');
    var input   = document.getElementById('p6-file');
    var prompt  = document.getElementById('p6-drop-prompt');
    var preview = document.getElementById('p6-drop-preview');
    var thumb   = document.getElementById('p6-thumb');
    var meta    = document.getElementById('p6-meta');
    var warn    = document.getElementById('p6-warn');
    var replace = document.getElementById('p6-replace');

    if (!drop || !input) return;

    // ---- Click to browse ----
    drop.addEventListener('click', function (e) {
      // ignore clicks from inner buttons
      if (e.target && (e.target.id === 'p6-replace')) return;
      input.click();
    });

    drop.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input.click();
      }
    });

    // ---- Drag-and-drop ----
    ['dragenter', 'dragover'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        drop.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (ev === 'dragleave' && drop.contains(e.relatedTarget)) return;
        drop.classList.remove('is-dragover');
      });
    });

    drop.addEventListener('drop', function (e) {
      var files = e.dataTransfer && e.dataTransfer.files;
      if (files && files.length) handleFile(files[0]);
    });

    input.addEventListener('change', function () {
      if (input.files && input.files.length) handleFile(input.files[0]);
    });

    replace.addEventListener('click', function (e) {
      e.stopPropagation();
      input.value = '';
      input.click();
    });

    // ---- File handler ----
    function handleFile(file) {
      if (!file) return;
      var okType = (file.type === 'image/jpeg' || file.type === 'image/png');
      if (!okType) {
        showWarn('Only JPG or PNG accepted.');
        return;
      }

      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth;
        var h = img.naturalHeight;

        var warnings = [];
        var ratio = w / h;
        var nearSquare = ratio > 0.95 && ratio < 1.05;
        if (!nearSquare) warnings.push('image is not square');
        if (w < 1400 || h < 1400) warnings.push('below 1400x1400 minimum');

        thumb.src = url;
        meta.innerHTML = checkmark() + ' ' +
          escapeHtml(file.name) + ' &middot; ' +
          w + '&times;' + h + ' &middot; ' +
          formatSize(file.size);

        if (warnings.length) {
          warn.hidden = false;
          warn.textContent = '! ' + warnings.join(' &middot; ').replace(/&middot;/g, '·');
        } else {
          warn.hidden = true;
          warn.textContent = '';
        }

        prompt.hidden = true;
        preview.hidden = false;
        drop.classList.add('has-file');

        if (typeof window.captureFile === 'function') {
          window.captureFile('p6', 'cover-art', file);
        }
      };
      img.onerror = function () {
        showWarn('Could not read this image.');
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }

    function showWarn(msg) {
      warn.hidden = false;
      warn.textContent = '! ' + msg;
      preview.hidden = false;
      prompt.hidden = true;
    }

    function checkmark() { return '<span style="color:var(--vr-accent-glow)">&#10003;</span>'; }

    function formatSize(bytes) {
      if (bytes < 1024) return bytes + 'B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
      return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
    }

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
