/* ============================================================
   LESSONS DIRECTORY PANEL — tab-filter logic
   Toggles .filter-active on .ld-card based on the active pill.
   Safe to include multiple times / on partial DOM.
   ============================================================ */
(function () {
  'use strict';

  function init(root) {
    var scope = root || document;
    var sections = scope.querySelectorAll('.lessons-dossier');
    if (!sections.length) return;

    sections.forEach(function (section) {
      var tabs  = section.querySelectorAll('.ld-pill[data-filter]');
      var cards = section.querySelectorAll('.ld-card[data-cat]');
      if (!tabs.length || !cards.length) return;

      function applyFilter(filter) {
        cards.forEach(function (card) {
          var cat = card.getAttribute('data-cat');
          var match = (filter === 'all') || (filter === cat);
          if (match) {
            card.classList.add('filter-active');
          } else {
            card.classList.remove('filter-active');
          }
        });

        tabs.forEach(function (tab) {
          var isActive = tab.getAttribute('data-filter') === filter;
          tab.classList.toggle('is-active', isActive);
          tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          var filter = tab.getAttribute('data-filter') || 'all';
          applyFilter(filter);
        });

        // Keyboard: left/right arrow to step through tabs
        tab.addEventListener('keydown', function (e) {
          var key = e.key;
          if (key !== 'ArrowRight' && key !== 'ArrowLeft') return;
          e.preventDefault();
          var list = Array.prototype.slice.call(tabs);
          var idx  = list.indexOf(tab);
          var next = key === 'ArrowRight'
            ? list[(idx + 1) % list.length]
            : list[(idx - 1 + list.length) % list.length];
          if (next) {
            next.focus();
            next.click();
          }
        });
      });

      // Initialize: honor whichever pill already has .is-active, else default 'all'
      var initialTab = section.querySelector('.ld-pill.is-active[data-filter]') ||
                       section.querySelector('.ld-pill[data-filter="all"]') ||
                       tabs[0];
      if (initialTab) {
        applyFilter(initialTab.getAttribute('data-filter') || 'all');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }

  // Expose a manual hook for hosts that lazy-load the partial
  window.LessonsDossier = { init: init };
})();
