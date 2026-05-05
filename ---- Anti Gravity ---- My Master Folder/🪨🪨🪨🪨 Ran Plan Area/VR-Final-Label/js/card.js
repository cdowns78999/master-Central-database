/* =========================================================
   VR-Final-Label — Hover Travel Card
   Owned by Agent 3.
   Listens to vrfl:field / vrfl:file from app.js, renders #travel-card.
   ========================================================= */

(function () {
  'use strict';

  // Guard against double-load
  if (window.__VRFL_CARD_INIT__) return;
  window.__VRFL_CARD_INIT__ = true;

  var card = null;
  var photoObjectUrl = null;

  // Map of capture-keys we care about, where each surfaces a card row.
  // When other agents capture these fields/files, the card auto-updates.
  var ROWS = [
    // P3 — song pick
    { page: 'p3', key: 'songTitle',  tag: 'song',   format: function (v, all) {
        var artist = all.p3 && all.p3.songArtist;
        return artist ? (v + ' — ' + artist) : v;
      }
    },
    { page: 'p3', key: 'songArtist', skipIfPaired: 'songTitle' }, // suppressed, folded into songTitle row

    // P3.5 — vibe / theme
    { page: 'p3-5', key: 'theme',    tag: 'theme'  },
    { page: 'p3-5', key: 'vibe',     tag: 'vibe'   },

    // P4 — cover treatment
    { page: 'p4', key: 'coverStyle', tag: 'style'  },

    // P5 — credits / collaborators
    { page: 'p5', key: 'credits',    tag: 'credits'},

    // P6 — cover art file
    { page: 'p6', key: 'coverArt',   tag: 'art',    isFile: true },

    // P7 — wav file
    { page: 'p7', key: 'wav',        tag: 'wav',    isFile: true },
    { page: 'p7', key: 'audio',      tag: 'audio',  isFile: true },

    // P8 — go / release prefs
    { page: 'p8', key: 'releaseDate',tag: 'release'}
  ];

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
  function ensureCard() {
    if (card) return card;
    card = document.getElementById('travel-card');
    return card;
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

  function getInitials(name) {
    if (!name) return '?';
    var parts = String(name).trim().split(/\s+/);
    var first = parts[0] ? parts[0][0] : '';
    var last  = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase() || '?';
  }

  function renderCard() {
    var c = ensureCard();
    if (!c) return;

    var data  = window.__VRFL || { fields: {}, files: {} };
    var p2    = data.fields.p2 || {};
    var files = data.files || {};

    var name  = p2.stageName || p2.realName || 'new artist';
    var email = p2.email || '';

    // Photo: prefer captured file (turn into object URL once)
    var photoFile = files.p2 && files.p2.photo;
    var photoHtml;
    if (photoFile && photoFile instanceof File) {
      // Refresh URL only when file identity changes
      if (photoObjectUrl && photoObjectUrl.__file !== photoFile) {
        URL.revokeObjectURL(photoObjectUrl);
        photoObjectUrl = null;
      }
      if (!photoObjectUrl) {
        var url = URL.createObjectURL(photoFile);
        photoObjectUrl = url;
        photoObjectUrl.__file = photoFile; // tag won't actually attach to string; safe no-op
      }
      photoHtml = '<img class="tc-photo" src="' + escapeHtml(photoObjectUrl) + '" alt="" />';
    } else {
      photoHtml = '<div class="tc-photo tc-photo-fallback">' + escapeHtml(getInitials(name)) + '</div>';
    }

    // Build dynamic rows
    var rowsHtml = '';
    var seen = {};
    ROWS.forEach(function (row) {
      // suppress folded keys
      if (row.skipIfPaired) {
        var f = data.fields[row.page] || {};
        if (f[row.skipIfPaired]) return;
      }

      var val;
      if (row.isFile) {
        val = (files[row.page] || {})[row.key];
        if (val) {
          rowsHtml += '<div class="tc-row">'
            + '<span class="tc-tag">' + escapeHtml(row.tag) + '</span>'
            + '<span class="tc-val"><span class="tc-check">&#10003;</span> ' + escapeHtml(val.name || 'uploaded') + '</span>'
            + '</div>';
        }
      } else {
        var bag = data.fields[row.page] || {};
        val = bag[row.key];
        if (val != null && String(val).trim() !== '') {
          var display = row.format ? row.format(val, data.fields) : val;
          var dedupKey = row.tag + '|' + display;
          if (seen[dedupKey]) return;
          seen[dedupKey] = true;
          rowsHtml += '<div class="tc-row">'
            + '<span class="tc-tag">' + escapeHtml(row.tag) + '</span>'
            + '<span class="tc-val">' + escapeHtml(display) + '</span>'
            + '</div>';
        }
      }
    });

    var dividerHtml = rowsHtml ? '<div class="tc-divider"></div>' : '';

    c.innerHTML =
      '<div class="tc-head">'
      +   photoHtml
      +   '<div class="tc-id">'
      +     '<div class="tc-name">' + escapeHtml(name) + '</div>'
      +     (email ? '<div class="tc-email">' + escapeHtml(email) + '</div>' : '')
      +   '</div>'
      + '</div>'
      + dividerHtml
      + '<div class="tc-rows">' + rowsHtml + '</div>';
  }

  // ------------------------------------------------------
  // SHOW / HIDE
  // ------------------------------------------------------
  function showTravelCard() {
    var c = ensureCard();
    if (!c) return;
    renderCard();
    c.classList.remove('hidden');
    c.classList.add('visible');
    if (window.__VRFL && window.__VRFL.state) {
      window.__VRFL.state.travelCardVisible = true;
    }
  }

  function hideTravelCard() {
    var c = ensureCard();
    if (!c) return;
    c.classList.add('hidden');
    c.classList.remove('visible');
    if (window.__VRFL && window.__VRFL.state) {
      window.__VRFL.state.travelCardVisible = false;
    }
  }

  // ------------------------------------------------------
  // EVENT WIRING
  // ------------------------------------------------------
  // app.js dispatches on `document`. We also listen on `window` so either contract works.
  function onCapture() { renderCard(); }
  document.addEventListener('vrfl:field', onCapture);
  document.addEventListener('vrfl:file',  onCapture);
  window.addEventListener('vrfl:field',   onCapture);
  window.addEventListener('vrfl:file',    onCapture);

  // ------------------------------------------------------
  // SCROLL POLISH — hide card when user is back at P1/P2
  // ------------------------------------------------------
  function onScroll() {
    var st = window.__VRFL && window.__VRFL.state;
    if (!st || !st.submitted) return;
    var p3 = document.getElementById('p3');
    if (!p3) return;
    var rect = p3.getBoundingClientRect();
    // Card pinned only after we're at or past P3
    if (rect.top <= window.innerHeight * 0.5) {
      if (!st.travelCardVisible) showTravelCard();
    } else {
      if (st.travelCardVisible) hideTravelCard();
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ------------------------------------------------------
  // EXPORT
  // ------------------------------------------------------
  window.showTravelCard = showTravelCard;
  window.hideTravelCard = hideTravelCard;
  window.renderTravelCard = renderCard;

  // Initial render attempt once DOM is ready (card lives on body load)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { ensureCard(); });
  } else {
    ensureCard();
  }
})();
