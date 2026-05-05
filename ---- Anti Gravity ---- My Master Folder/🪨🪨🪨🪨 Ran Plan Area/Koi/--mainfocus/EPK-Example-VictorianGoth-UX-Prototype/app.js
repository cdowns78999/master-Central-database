/* =============================================================
   LENORE ASHWORTH — EPK Prototype
   Interaction logic
   - Click-zones open/close panels
   - Panels are MUTUALLY EXCLUSIVE (elegant, theatrical — only one
     curtain rises at a time so the portrait never gets crowded)
   - Custom candle-flame cursor follows pointer
   - ESC closes any open panel
   - Mobile toggles mirror desktop behavior
   ============================================================= */

(function () {
  'use strict';

  // ---------- DOM refs ----------
  const leftZone     = document.getElementById('leftZone');
  const rightZone    = document.getElementById('rightZone');
  const leftPanel    = document.getElementById('leftPanel');
  const rightPanel   = document.getElementById('rightPanel');
  const leftClose    = document.getElementById('leftClose');
  const rightClose   = document.getElementById('rightClose');
  const mobileTop    = document.getElementById('mobileTop');
  const mobileBottom = document.getElementById('mobileBottom');
  const cursorFlame  = document.getElementById('cursorFlame');
  const cursorHalo   = document.getElementById('cursorHalo');
  const portraitStage = document.querySelector('.portrait-stage');

  // ---------- State ----------
  // 'left' | 'right' | null
  let openPanel = null;

  // =============================================================
  // PANEL CONTROL
  // Mutual exclusion: opening one closes the other. This keeps the
  // portrait as a single focal point and feels more deliberate than
  // flooding the viewport with two curtains at once.
  // =============================================================
  function openLeft() {
    if (openPanel === 'right') closeRight(/*instant*/ false);
    leftPanel.classList.add('is-open');
    leftPanel.setAttribute('aria-hidden', 'false');
    leftZone.classList.add('is-open');
    leftZone.setAttribute('aria-expanded', 'true');
    openPanel = 'left';
  }
  function closeLeft() {
    leftPanel.classList.remove('is-open');
    leftPanel.setAttribute('aria-hidden', 'true');
    leftZone.classList.remove('is-open');
    leftZone.setAttribute('aria-expanded', 'false');
    if (openPanel === 'left') openPanel = null;
  }
  function openRight() {
    if (openPanel === 'left') closeLeft();
    rightPanel.classList.add('is-open');
    rightPanel.setAttribute('aria-hidden', 'false');
    rightZone.classList.add('is-open');
    rightZone.setAttribute('aria-expanded', 'true');
    openPanel = 'right';
  }
  function closeRight() {
    rightPanel.classList.remove('is-open');
    rightPanel.setAttribute('aria-hidden', 'true');
    rightZone.classList.remove('is-open');
    rightZone.setAttribute('aria-expanded', 'false');
    if (openPanel === 'right') openPanel = null;
  }

  function toggleLeft() {
    if (openPanel === 'left') closeLeft();
    else openLeft();
  }
  function toggleRight() {
    if (openPanel === 'right') closeRight();
    else openRight();
  }

  // ---------- Wire up ----------
  leftZone.addEventListener('click',  toggleLeft);
  rightZone.addEventListener('click', toggleRight);

  leftClose.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLeft();
  });
  rightClose.addEventListener('click', function (e) {
    e.stopPropagation();
    closeRight();
  });

  mobileTop.addEventListener('click',    toggleLeft);
  mobileBottom.addEventListener('click', toggleRight);

  // ESC closes any panel
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openPanel) {
      if (openPanel === 'left') closeLeft();
      else if (openPanel === 'right') closeRight();
    }
  });

  // =============================================================
  // CUSTOM CANDLE-FLAME CURSOR
  // Smooth follow with light easing so the flame feels weighty.
  // Hides on touch devices (media query already handles display).
  // =============================================================
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let flameX = mouseX;
  let flameY = mouseY;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Halo state — only alive when hovering portrait/hero zone
  let haloAwake = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (portraitStage && cursorHalo && !prefersReducedMotion) {
    portraitStage.addEventListener('mouseenter', function () {
      haloAwake = true;
      cursorHalo.classList.add('is-awake');
    });
    portraitStage.addEventListener('mouseleave', function () {
      haloAwake = false;
      cursorHalo.classList.remove('is-awake');
    });
  }

  // Perlin-like flicker using two out-of-phase sines + a noise term
  let flickerT = 0;
  function pseudoNoiseIntensity(t) {
    // Combine three sine waves of differing frequency + small random jitter
    const a = Math.sin(t * 0.013);
    const b = Math.sin(t * 0.031 + 1.7);
    const c = Math.sin(t * 0.071 + 3.1);
    const jitter = (Math.random() - 0.5) * 0.08;
    // Map roughly to [0.75, 1.15]
    return 0.95 + (a * 0.10) + (b * 0.07) + (c * 0.05) + jitter;
  }

  function raf() {
    // Ease toward target — small lag for candle-like "drift"
    flameX += (mouseX - flameX) * 0.22;
    flameY += (mouseY - flameY) * 0.22;
    cursorFlame.style.transform =
      'translate(' + flameX + 'px, ' + flameY + 'px) translate(-50%, -60%)';

    // Candlelit halo — follow cursor, flicker intensity when awake
    if (cursorHalo && haloAwake) {
      flickerT += 1;
      const intensity = pseudoNoiseIntensity(flickerT);
      cursorHalo.style.setProperty('--halo-x', mouseX + 'px');
      cursorHalo.style.setProperty('--halo-y', mouseY + 'px');
      cursorHalo.style.setProperty('--halo-intensity', intensity.toFixed(3));
    }
    requestAnimationFrame(raf);
  }
  // Only run custom cursor on pointer: fine devices
  if (window.matchMedia('(pointer: fine)').matches) {
    requestAnimationFrame(raf);
  } else {
    cursorFlame.style.display = 'none';
  }

  // Press feedback — flame swells
  window.addEventListener('mousedown', function () {
    cursorFlame.classList.add('is-pressing');
  });
  window.addEventListener('mouseup', function () {
    cursorFlame.classList.remove('is-pressing');
  });

  // Hover feedback on interactive elements
  const hoverables = document.querySelectorAll(
    '.click-zone, .panel-close, .release-play, .panel-link, .mobile-toggle'
  );
  hoverables.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursorFlame.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', function () {
      cursorFlame.classList.remove('is-hovering');
    });
  });

  // =============================================================
  // Release "play" buttons — placeholder haptic
  // (Real audio integration would happen at EPK build-out time)
  // =============================================================
  document.querySelectorAll('.release-play').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.animate(
        [
          { transform: 'scale(1)',   boxShadow: '0 0 0 rgba(212,165,116,0.45)' },
          { transform: 'scale(1.2)', boxShadow: '0 0 26px rgba(212,165,116,0.8)' },
          { transform: 'scale(1)',   boxShadow: '0 0 0 rgba(212,165,116,0.0)' }
        ],
        { duration: 520, easing: 'cubic-bezier(.22,.8,.2,1)' }
      );
    });
  });

  // =============================================================
  // OPTIONAL: swallow focus rings only when interaction is mouse.
  // Keyboard tab still shows focus via :focus-visible.
  // =============================================================
  document.addEventListener('mousedown', function () {
    document.body.classList.add('using-mouse');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') document.body.classList.remove('using-mouse');
  });

})();
