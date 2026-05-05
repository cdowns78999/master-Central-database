/* ============================================================
   3D Photo Showcase — Shared Left Nav
   Highlights the active item based on current page filename.
   ============================================================ */
(function () {
  'use strict';

  function activate() {
    var nav = document.querySelector('.left-nav');
    if (!nav) return;

    // Derive current page key from the URL path.
    var path = window.location.pathname || '';
    var file = path.split('/').pop() || '';
    // strip query/hash + extension
    file = file.split('?')[0].split('#')[0];
    var key = file.replace(/\.html?$/i, '').toLowerCase();

    // Empty path (e.g. "/") or "index" both mean Home.
    if (!key || key === '') key = 'index';

    var links = nav.querySelectorAll('.left-nav__link');
    var matched = false;

    links.forEach(function (link) {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');

      var pageAttr = (link.getAttribute('data-page') || '').toLowerCase();
      if (pageAttr && pageAttr === key) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
        matched = true;
      }
    });

    // Fallback: if nothing matched and we're at site root, light up Home.
    if (!matched) {
      var home = nav.querySelector('.left-nav__link[data-page="index"]');
      if (home && (key === 'index' || key === '')) {
        home.classList.add('is-active');
        home.setAttribute('aria-current', 'page');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', activate);
  } else {
    activate();
  }
})();
