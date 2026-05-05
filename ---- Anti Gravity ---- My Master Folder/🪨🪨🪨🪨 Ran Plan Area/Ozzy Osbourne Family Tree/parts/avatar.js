/* ==========================================================================
   avatar.js — Ozzy Family Tree 3D Spinning Avatar Injector
   --------------------------------------------------------------------------
   Finds every <div class="avatar-slot" data-member-id="..." data-member-name="...">
   and injects a 3D spinning polaroid placeholder (front: photo/silhouette,
   back: typewriter evidence tag).

   Expected slot attributes:
     data-member-id      required (e.g. "ozzy-osbourne")
     data-member-name    optional (falls back to id — de-slugged)
     data-member-relationship  optional (back-face subtitle)
     data-photo-path     optional override (defaults to assets/photos/{id}.jpg)

   If the photo file exists it's shown; otherwise the silhouette placeholder
   stays visible. Uses Image() onerror fallback — no 404 flash.
   ========================================================================== */

(function () {
  'use strict';

  // Inline silhouette SVG (person bust)
  const SILHOUETTE_SVG = `
<svg class="avatar-silhouette" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M32 8c-7 0-12 5-12 12 0 6 3 10 7 12-6 2-13 6-15 14-1 4 2 7 6 7h28c4 0 7-3 6-7-2-8-9-12-15-14 4-2 7-6 7-12 0-7-5-12-12-12z"/>
</svg>`.trim();

  // Turn "john-thomas-osbourne" → "John Thomas Osbourne"
  function deslug(id) {
    if (!id) return '';
    return id
      .split('-')
      .map(w => w.length ? w[0].toUpperCase() + w.slice(1) : w)
      .join(' ');
  }

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildAvatar(slot) {
    // Idempotent: skip if we've already rendered
    if (slot.dataset.avatarReady === '1') return;

    const id = slot.dataset.memberId || 'unknown';
    const name = slot.dataset.memberName || deslug(id);
    const rel = slot.dataset.memberRelationship || '';
    const photoPath = slot.dataset.photoPath || `assets/photos/${id}.jpg`;

    // Short name for front caption — first name or first two words
    const firstName = name.split(/\s+/).slice(0, 2).join(' ');

    slot.innerHTML = `
      <div class="avatar-card" aria-label="Avatar for ${escapeHtml(name)}">
        <!-- FRONT: photo placeholder polaroid -->
        <div class="avatar-face avatar-front">
          <div class="avatar-tape"></div>
          <div class="avatar-clip"></div>
          <div class="avatar-photo-window" data-photo-target="1">
            ${SILHOUETTE_SVG}
          </div>
          <div class="avatar-caption">PHOTO / ${escapeHtml(firstName)}</div>
        </div>

        <!-- BACK: evidence tag -->
        <div class="avatar-face avatar-back">
          <div class="avatar-back-header">EVIDENCE TAG</div>
          <div class="avatar-back-name">${escapeHtml(name)}</div>
          <div class="avatar-back-rel">${escapeHtml(rel || 'Subject of interest')}</div>
          <div class="avatar-back-id">#${escapeHtml(id)}</div>
        </div>
      </div>
    `;

    slot.dataset.avatarReady = '1';

    // Try to load real photo in the background. If it loads, swap silhouette
    // for the <img>. If it fails (404 or any error), leave placeholder alone.
    const photoWindow = slot.querySelector('[data-photo-target="1"]');
    if (photoWindow && photoPath) {
      const probe = new Image();
      probe.onload = function () {
        // Replace silhouette with the loaded image
        photoWindow.innerHTML = `<img src="${escapeHtml(photoPath)}" alt="${escapeHtml(name)}" loading="lazy">`;
      };
      probe.onerror = function () {
        // No-op: silhouette stays. Helpful hint in dataset for debugging.
        slot.dataset.photoStatus = 'missing';
      };
      probe.src = photoPath;
    }
  }

  function init(root) {
    const scope = root || document;
    const slots = scope.querySelectorAll('.avatar-slot');
    slots.forEach(buildAvatar);
  }

  // Expose a tiny API so pages can re-run after injecting more cards
  window.OzzyAvatar = {
    init: init,
    build: buildAvatar
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); });
  } else {
    init();
  }
})();
