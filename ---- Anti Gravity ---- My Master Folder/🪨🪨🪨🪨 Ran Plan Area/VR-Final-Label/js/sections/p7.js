/* =========================================================
   P7 — WAV Drop
   Drag-drop + click-to-browse. WAV-only validation +
   duration extraction via Audio loadedmetadata.
   ========================================================= */

(function () {
  'use strict';

  function init() {
    var drop    = document.getElementById('p7-drop');
    var input   = document.getElementById('p7-file');
    var prompt  = document.getElementById('p7-drop-prompt');
    var loaded  = document.getElementById('p7-drop-loaded');
    var meta    = document.getElementById('p7-meta');
    var error   = document.getElementById('p7-error');
    var replace = document.getElementById('p7-replace');

    if (!drop || !input) return;

    // ---- Click to browse ----
    drop.addEventListener('click', function (e) {
      if (e.target && e.target.id === 'p7-replace') return;
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

    // ---- Handler ----
    function handleFile(file) {
      if (!file) return;
      var name = (file.name || '').toLowerCase();
      var isWav = name.endsWith('.wav') || file.type === 'audio/wav' || file.type === 'audio/x-wav' || file.type === 'audio/wave';
      if (!isWav) {
        flashError('WAV files only — got "' + (file.name || 'unknown') + '"');
        return;
      }

      hideError();

      var url = URL.createObjectURL(file);
      var audio = new Audio();
      audio.preload = 'metadata';

      audio.addEventListener('loadedmetadata', function () {
        var dur = isFinite(audio.duration) ? audio.duration : 0;
        showLoaded(file, dur);
        // Don't revoke right away — Safari may still be reading
        setTimeout(function () { URL.revokeObjectURL(url); }, 500);
      });

      audio.addEventListener('error', function () {
        // Still accept the file — duration just unknown
        showLoaded(file, 0);
        URL.revokeObjectURL(url);
      });

      audio.src = url;
    }

    function showLoaded(file, durationSec) {
      var durStr = formatDuration(durationSec);
      meta.innerHTML = checkmark() + ' ' +
        escapeHtml(file.name) +
        (durStr ? ' &middot; ' + durStr : '') +
        ' &middot; ' + formatSize(file.size);

      prompt.hidden = true;
      loaded.hidden = false;
      drop.classList.add('has-file');

      if (typeof window.captureFile === 'function') {
        window.captureFile('p7', 'wav', file);
      }
    }

    function flashError(msg) {
      error.hidden = false;
      error.textContent = msg;
      drop.classList.add('is-error');
      setTimeout(function () { drop.classList.remove('is-error'); }, 600);
    }

    function hideError() {
      error.hidden = true;
      error.textContent = '';
      drop.classList.remove('is-error');
    }

    function checkmark() { return '<span style="color:var(--vr-accent-glow)">&#10003;</span>'; }

    function formatDuration(sec) {
      if (!sec || !isFinite(sec)) return '';
      var m = Math.floor(sec / 60);
      var s = Math.round(sec % 60);
      return m + ':' + (s < 10 ? '0' + s : s);
    }

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
