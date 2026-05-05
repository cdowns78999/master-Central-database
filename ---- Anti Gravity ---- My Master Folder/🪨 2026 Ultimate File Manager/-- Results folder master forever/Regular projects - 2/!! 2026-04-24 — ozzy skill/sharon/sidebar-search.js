(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', initSidebarSearch);

  function injectStyles() {
    if (document.getElementById('sidebar-search-styles')) return;
    var s = document.createElement('style');
    s.id = 'sidebar-search-styles';
    s.textContent =
      '.sidebar-search-wrap{display:flex;gap:4px;padding:6px 8px;box-sizing:border-box;width:100%}' +
      '.sidebar-search{flex:1;padding:6px 8px;font-size:13px;border:1px solid #ccc;border-radius:6px;outline:none;background:#fff}' +
      '.sidebar-search:focus{border-color:#6366f1;box-shadow:0 0 0 2px rgba(99,102,241,.2)}' +
      '.sidebar-search-clear{padding:0 8px;font-size:13px;border:1px solid #ccc;border-radius:6px;background:#f5f5f5;cursor:pointer}' +
      '.sidebar-search-clear:hover{background:#ececec}' +
      '.sidebar-item.hidden{display:none !important}';
    document.head.appendChild(s);
  }

  function initSidebarSearch() {
    var sidebar = document.querySelector('.sidebar') || document.querySelector('aside.sidebar');
    if (!sidebar) return;
    injectStyles();

    var wrap = document.createElement('div');
    wrap.className = 'sidebar-search-wrap';
    var input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Filter categories…';
    input.className = 'sidebar-search';
    var clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'sidebar-search-clear';
    clear.setAttribute('aria-label', 'Clear filter');
    clear.textContent = '✕';
    wrap.appendChild(input);
    wrap.appendChild(clear);

    var header = sidebar.querySelector('.group-header, .sidebar-header, h1, h2, h3');
    if (header && header.parentNode === sidebar) header.insertAdjacentElement('afterend', wrap);
    else sidebar.insertBefore(wrap, sidebar.firstChild);

    function applyFilter() {
      var q = input.value.trim().toLowerCase();
      var items = sidebar.querySelectorAll('.sidebar-item');
      for (var i = 0; i < items.length; i++) {
        var match = !q || (items[i].textContent || '').toLowerCase().indexOf(q) !== -1;
        items[i].classList.toggle('hidden', !match);
      }
    }

    input.addEventListener('input', applyFilter);
    clear.addEventListener('click', function () { input.value = ''; applyFilter(); input.focus(); });
  }
})();
