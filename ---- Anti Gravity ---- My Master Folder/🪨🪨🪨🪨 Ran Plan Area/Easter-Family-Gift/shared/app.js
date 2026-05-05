/* ============================================================
   app.js — Shared application logic
   Easter Family Gift App · 2026
   ============================================================ */

(function () {
  'use strict';

  /* ── Active nav link detection ──────────────────────────── */
  function setActiveNavLink() {
    // Get the current page filename (e.g. "grand-daddy.html")
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    const navLinks = document.querySelectorAll('.sidebar-nav a, .nav-list a');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      // Match on filename — supports relative paths like "../grand-daddy.html"
      const linkFile = href ? href.substring(href.lastIndexOf('/') + 1) : '';

      if (linkFile === filename) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ── Hamburger / sidebar toggle ─────────────────────────── */
  function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!hamburger) return;

    function openSidebar() {
      document.body.classList.add('sidebar-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
    }

    function closeSidebar() {
      document.body.classList.remove('sidebar-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', function () {
      const isOpen = document.body.classList.contains('sidebar-open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // Close on overlay click (mobile tap-outside)
    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('sidebar-open')) {
        closeSidebar();
      }
    });

    // Set initial ARIA state
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-controls', 'sidebar');
  }

  /* ── Close sidebar on nav link click (mobile UX) ────────── */
  function initNavLinkClose() {
    const navLinks = document.querySelectorAll('.sidebar-nav a, .nav-list a');

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        // Only close on mobile (sidebar is overlay-mode)
        if (window.innerWidth <= 768) {
          document.body.classList.remove('sidebar-open');
        }
      });
    });
  }

  /* ── Sidebar ARIA role ───────────────────────────────────── */
  function initSidebarAria() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    if (!sidebar.id) sidebar.id = 'sidebar';
    sidebar.setAttribute('role', 'navigation');
    sidebar.setAttribute('aria-label', 'Family members');
  }

  /* ── Init ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLink();
    initHamburger();
    initNavLinkClose();
    initSidebarAria();
  });

})();
