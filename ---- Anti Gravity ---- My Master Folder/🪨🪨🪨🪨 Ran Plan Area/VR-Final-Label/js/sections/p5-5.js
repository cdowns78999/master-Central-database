/* =========================================================
   P5.5 — Optional Label Opt-In behavior
   - autofills today's date
   - captures legal-name + signature on input
   - Sign: requires both filled, fires captureField + toast
   - Skip: fires captureField(false) + toast
   - locks both buttons after one click; "change your mind?" re-enables
   ========================================================= */

(function () {
  'use strict';

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function todayPretty() {
    var d = new Date();
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function todayIso() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function getCapture() {
    return (typeof window.captureField === 'function') ? window.captureField : function () {};
  }

  function init() {
    var form = document.getElementById('p5-5-form');
    if (!form) return;

    var captureField = getCapture();
    var legalInput   = document.getElementById('p5-5-legal-name');
    var sigInput     = document.getElementById('p5-5-signature');
    var todayInput   = document.getElementById('p5-5-today');
    var signBtn      = document.getElementById('p5-5-sign-btn');
    var skipBtn      = document.getElementById('p5-5-skip-btn');
    var undoBtn      = document.getElementById('p5-5-undo');
    var toast        = document.getElementById('p5-5-toast');

    // ---- Autofill today's date ----
    if (todayInput) {
      todayInput.value = todayPretty();
      captureField('p5-5', 'signed-on', todayIso());
    }

    // ---- Live capture for legal-name + signature ----
    function onTextInput(e) {
      var t = e.target;
      if (!t || !t.dataset) return;
      var key = t.dataset.key;
      if (!key) return;
      captureField('p5-5', key, t.value);
    }
    form.addEventListener('input', onTextInput);

    // ---- Toast helper ----
    var toastTimer = null;
    function showToast(msg, warm) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.remove('show', 'warm');
      // reflow trick to restart the transition
      void toast.offsetWidth;
      toast.classList.add('show');
      if (warm) toast.classList.add('warm');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove('show', 'warm');
      }, 2400);
    }

    function setLocked(locked) {
      signBtn.disabled = locked;
      skipBtn.disabled = locked;
      if (locked) {
        undoBtn.removeAttribute('hidden');
      } else {
        undoBtn.setAttribute('hidden', '');
      }
    }

    // ---- Sign click ----
    signBtn.addEventListener('click', function () {
      var legal = (legalInput.value || '').trim();
      var sig   = (sigInput.value   || '').trim();

      if (!legal || !sig) {
        // Visually nudge the empty field(s)
        if (!legal) { legalInput.focus(); flashError(legalInput); }
        else if (!sig) { sigInput.focus(); flashError(sigInput); }
        showToast('please fill both name + signature', true);
        return;
      }

      captureField('p5-5', 'legal-name', legal);
      captureField('p5-5', 'signature',  sig);
      captureField('p5-5', 'signed-on',  todayIso());
      captureField('p5-5', 'signed',     true);

      showToast('signed', true);
      setLocked(true);
    });

    // ---- Skip click ----
    skipBtn.addEventListener('click', function () {
      captureField('p5-5', 'signed', false);
      showToast('skipped — on to the files.', false);
      setLocked(true);
    });

    // ---- Undo click ----
    undoBtn.addEventListener('click', function () {
      setLocked(false);
      // Note: we leave the previously-captured `signed` flag in place until they
      // re-click Sign or Skip — re-enabling buttons just re-opens the choice.
    });

    // ---- Tiny error flash ----
    function flashError(el) {
      var orig = el.style.boxShadow;
      el.style.boxShadow = '0 0 0 3px rgba(255,127,84,0.35)';
      setTimeout(function () { el.style.boxShadow = orig; }, 600);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
