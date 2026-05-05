/* =========================================================
   P1 — Cinematic Opener behavior
   Adds .visible to #p1 when it enters the viewport so the
   staggered fade-in keyframes (defined in css/sections/p1.css) fire.
   ========================================================= */
(function () {
  'use strict';

  function init() {
    var p1 = document.getElementById('p1');
    if (!p1) return;

    // Reduced motion → just show it, no observer needed.
    var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      p1.classList.add('visible');
      return;
    }

    // Fallback for browsers without IntersectionObserver — show immediately.
    if (!('IntersectionObserver' in window)) {
      p1.classList.add('visible');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          p1.classList.add('visible');
        } else {
          // Optional: remove on exit so the animation can replay on re-entry.
          // Comment the next line out for one-shot behavior.
          p1.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '0px'
    });

    observer.observe(p1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
