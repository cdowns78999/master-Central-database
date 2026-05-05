// Sharon — click-to-preview overlay for sample tiles
(() => {
  let backdrop, overlay, contentHost;

  function build() {
    backdrop = document.createElement('div');
    backdrop.className = 'sharon-backdrop';

    overlay = document.createElement('div');
    overlay.className = 'sharon-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'sharon-close';
    closeBtn.setAttribute('aria-label', 'Close preview');
    closeBtn.textContent = '×'; // ×
    closeBtn.addEventListener('click', close);

    contentHost = document.createElement('div');
    contentHost.className = 'sharon-overlay-content';

    overlay.appendChild(closeBtn);
    overlay.appendChild(contentHost);
    backdrop.addEventListener('click', close);
    document.body.appendChild(backdrop);
    document.body.appendChild(overlay);
  }

  function open(tile) {
    if (!backdrop) build();
    const source = tile.querySelector('.sample-content');
    contentHost.innerHTML = '';
    if (source) contentHost.appendChild(source.cloneNode(true));
    document.body.classList.add('sharon-locked');
    // next frame so transition runs
    requestAnimationFrame(() => {
      backdrop.classList.add('is-open');
      overlay.classList.add('is-open');
    });
  }

  function close() {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    backdrop.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('sharon-locked');
    setTimeout(() => { if (contentHost) contentHost.innerHTML = ''; }, 200);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sample-tile[data-sample-id]').forEach((tile) => {
      tile.addEventListener('click', () => open(tile));
    });
  });
})();
