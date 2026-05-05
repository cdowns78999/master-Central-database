/* ============================================================
   VRChat Ultimate — Sidebar Navigation
   Auto-detects root vs pages/ depth for correct linking
   ============================================================ */

(function () {
  'use strict';

  // Detect if we're in pages/ or root
  const path = window.location.pathname.replace(/\\/g, '/');
  const isSubpage = path.includes('/pages/');
  const prefix = isSubpage ? '' : 'pages/';
  const homeLink = isSubpage ? '../index.html' : 'index.html';
  const currentFile = path.split('/').pop() || 'index.html';

  const NAV = [
    { icon: '\u{1F3E0}', label: 'Home',              href: homeLink,                      file: 'index.html' },
    { icon: '\u{1F6E1}', label: 'Report Behavior',   href: prefix + 'report.html',        file: 'report.html' },
    { icon: '\u{1F680}', label: 'Start Here',         href: prefix + 'start-here.html',    file: 'start-here.html' },
    { icon: '\u2615',    label: 'Gossip Column',      href: prefix + 'gossip.html',        file: 'gossip.html' },
    { icon: '\u{1F30D}', label: 'World of the Week',  href: prefix + 'world-of-week.html', file: 'world-of-week.html' },
    { icon: '\u{1F464}', label: 'Avatar Showcase',    href: prefix + 'avatars.html',       file: 'avatars.html' },
    { icon: '\u2B50',    label: 'Creator Spotlight',  href: prefix + 'creators.html',      file: 'creators.html' },
    { icon: '\u{1F4C5}', label: 'Event Calendar',     href: prefix + 'events.html',        file: 'events.html' },
    { icon: '\u{1F4AC}', label: 'Slang Dictionary',   href: prefix + 'slang.html',         file: 'slang.html' },
    { icon: '\u{1F4F0}', label: 'News Feed',          href: prefix + 'news.html',          file: 'news.html' },
    { icon: '\u{1F3A7}', label: 'DJ & Raves',         href: prefix + 'dj-raves.html',      file: 'dj-raves.html' },
    { icon: '\u{1F3AE}', label: 'Best Games',         href: prefix + 'games.html',         file: 'games.html' },
    { icon: '\u{1F3A8}', label: 'Avatar Creation',    href: prefix + 'avatar-creation.html', file: 'avatar-creation.html' },
    { icon: '\u{1F4BB}', label: 'Dev Corner',         href: prefix + 'dev-corner.html',    file: 'dev-corner.html' },
    { icon: '\u{1F5FA}', label: '50 Worlds',          href: prefix + 'worlds.html',        file: 'worlds.html' },
    { icon: '\u{1F9BE}', label: 'Body Tracking',      href: prefix + 'body-tracking.html', file: 'body-tracking.html' },
    { icon: '\u{1F51E}', label: '18+ Section',        href: prefix + 'adult.html',         file: 'adult.html' },
    { icon: '\u{1F4CA}', label: 'Market Report',      href: prefix + 'market-report.html', file: 'market-report.html' },
    { icon: '\u{1F4DC}', label: 'History',            href: prefix + 'history.html',       file: 'history.html' }
  ];

  // ---- Build sidebar HTML ----
  function buildSidebar() {
    const mount = document.getElementById('sidebar-mount');
    if (!mount) return;

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.innerHTML = '\u2630';
    document.body.appendChild(hamburger);

    // Create sidebar element
    const sidebar = document.createElement('nav');
    sidebar.id = 'sidebar';

    // Logo / brand header
    const logo = document.createElement('div');
    logo.className = 'sidebar-logo';
    logo.innerHTML = '<span class="gradient-text">VRC</span>&nbsp;Ultimate';
    sidebar.appendChild(logo);

    // Nav list
    const ul = document.createElement('ul');
    ul.className = 'sidebar-nav';

    NAV.forEach(function (item) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'nav-item';
      a.href = item.href;

      // Active detection
      if (currentFile === item.file) {
        a.classList.add('active');
      }

      a.innerHTML =
        '<span class="nav-icon">' + item.icon + '</span>' +
        '<span>' + item.label + '</span>';

      li.appendChild(a);
      ul.appendChild(li);
    });

    sidebar.appendChild(ul);
    mount.appendChild(sidebar);

    // ---- Hamburger toggle ----
    hamburger.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
      if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        e.target !== hamburger
      ) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ---- Init ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSidebar);
  } else {
    buildSidebar();
  }
})();
