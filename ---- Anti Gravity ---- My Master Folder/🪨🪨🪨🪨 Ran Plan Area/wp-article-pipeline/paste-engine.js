/* ============================================================
   paste-engine.js — Paste Detection & Banner System
   Standalone module: window.PasteEngine = { ... }
   No ES modules, no build step.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- tiny helpers ---------- */

  var _counter = 0;
  function uid() {
    return 'paste-' + Date.now() + '-' + (++_counter);
  }

  function truncate(str, max) {
    if (!str) return '';
    return str.length > max ? str.slice(0, max) + '\u2026' : str;
  }

  /* ---------- regex patterns ---------- */

  var RE_YOUTUBE = /(?:youtube\.com\/(?:watch\?.*v=|shorts\/)|youtu\.be\/)([\w-]{11})/i;
  var RE_GDRIVE  = /drive\.google\.com/i;
  var RE_DROPBOX = /dropbox\.com/i;
  var RE_IMAGE   = /https?:\/\/\S+\.(?:jpe?g|png|gif|webp|svg)(?:\?[^\s]*)?$/i;
  var RE_URL     = /^https?:\/\/\S+$/i;

  /* ---------- extractors ---------- */

  function extractYouTubeId(url) {
    var m = url.match(RE_YOUTUBE);
    return m ? m[1] : null;
  }

  function extractGDriveName(url) {
    // Try to pull a human-readable segment from the URL path
    // Common patterns:
    //   /file/d/ID/view  — no filename in URL
    //   /folders/ID      — no folder name in URL
    // Best-effort: grab the last meaningful path segment
    try {
      var u = new URL(url);
      var parts = u.pathname.split('/').filter(Boolean);
      // If /folders/<id> or /file/d/<id>
      if (parts.includes('folders')) return 'Google Drive folder';
      if (parts.includes('file'))    return 'Google Drive file';
      return 'Google Drive link';
    } catch (_) {
      return 'Google Drive link';
    }
  }

  function extractDropboxName(url) {
    try {
      var u = new URL(url);
      var parts = u.pathname.split('/').filter(Boolean);
      // Last segment is usually the filename (may be URL-encoded)
      var last = parts[parts.length - 1] || '';
      var decoded = decodeURIComponent(last).replace(/\?.*$/, '');
      return decoded || 'Dropbox link';
    } catch (_) {
      return 'Dropbox link';
    }
  }

  /* ---------- type detection ---------- */

  function detectPasteType(text) {
    if (!text || typeof text !== 'string') return 'text';
    var trimmed = text.trim();

    if (RE_YOUTUBE.test(trimmed)) return 'youtube';
    if (RE_GDRIVE.test(trimmed))  return 'gdrive';
    if (RE_DROPBOX.test(trimmed)) return 'dropbox';
    if (RE_IMAGE.test(trimmed))   return 'image';
    if (RE_URL.test(trimmed))     return 'url';
    return 'text';
  }

  /* ---------- banner creation ---------- */

  function createBanner(text) {
    var raw     = (text || '').trim();
    var type    = detectPasteType(raw);
    var display = '';
    var thumbnail = null;

    switch (type) {
      case 'youtube':
        var vid = extractYouTubeId(raw);
        thumbnail = 'https://img.youtube.com/vi/' + vid + '/mqdefault.jpg';
        display = 'YouTube \u2014 ' + vid;
        break;

      case 'gdrive':
        display = extractGDriveName(raw);
        break;

      case 'dropbox':
        display = extractDropboxName(raw);
        break;

      case 'image':
        thumbnail = raw;
        display = truncate(raw.split('/').pop().split('?')[0], 40);
        break;

      case 'url':
        try {
          var parsed = new URL(raw);
          display = parsed.hostname + truncate(parsed.pathname, 40);
        } catch (_) {
          display = truncate(raw, 60);
        }
        break;

      default: // 'text'
        display = truncate(raw, 80);
        break;
    }

    return {
      id:        uid(),
      type:      type,
      raw:       raw,
      display:   display,
      thumbnail: thumbnail,
      timestamp: new Date().toISOString()
    };
  }

  /* ---------- type icons (inline SVG-free, plain text) ---------- */

  var ICONS = {
    youtube:  '\u25B6',   // ▶
    gdrive:   '\uD83D\uDCC1', // 📁
    dropbox:  '\uD83D\uDCE6', // 📦
    image:    '\uD83D\uDDBC', // 🖼
    url:      '\uD83D\uDD17', // 🔗
    text:     '\uD83D\uDCDD'  // 📝
  };

  /* ---------- CSS (injected once) ---------- */

  var CSS_INJECTED = false;
  var STYLE_BLOCK = [
    '.pe-banner {',
    '  width: 160px;',
    '  background: #fff;',
    '  border: 1px solid #e2e2e2;',
    '  border-radius: 8px;',
    '  box-shadow: 0 1px 4px rgba(0,0,0,.08);',
    '  overflow: hidden;',
    '  position: relative;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
    '  font-size: 12px;',
    '  color: #333;',
    '  animation: peFadeIn .25s ease-out;',
    '}',
    '@keyframes peFadeIn {',
    '  from { opacity: 0; transform: translateY(6px); }',
    '  to   { opacity: 1; transform: translateY(0); }',
    '}',
    '.pe-banner-thumb {',
    '  width: 100%;',
    '  height: 90px;',
    '  object-fit: cover;',
    '  display: block;',
    '}',
    '.pe-banner-body {',
    '  padding: 8px 24px 8px 8px;',
    '  word-break: break-word;',
    '  line-height: 1.35;',
    '}',
    '.pe-banner-icon {',
    '  margin-right: 4px;',
    '}',
    '.pe-banner-close {',
    '  position: absolute;',
    '  top: 4px;',
    '  right: 4px;',
    '  width: 20px;',
    '  height: 20px;',
    '  border: none;',
    '  background: rgba(0,0,0,.45);',
    '  color: #fff;',
    '  border-radius: 50%;',
    '  font-size: 13px;',
    '  line-height: 20px;',
    '  text-align: center;',
    '  cursor: pointer;',
    '  padding: 0;',
    '  z-index: 2;',
    '}',
    '.pe-banner-close:hover {',
    '  background: rgba(0,0,0,.7);',
    '}',
    '.pe-banner-type {',
    '  display: inline-block;',
    '  background: #f0f0f0;',
    '  color: #666;',
    '  font-size: 10px;',
    '  padding: 1px 5px;',
    '  border-radius: 3px;',
    '  margin-bottom: 4px;',
    '  text-transform: uppercase;',
    '  letter-spacing: .4px;',
    '}'
  ].join('\n');

  function injectCSS() {
    if (CSS_INJECTED) return;
    var style = document.createElement('style');
    style.textContent = STYLE_BLOCK;
    document.head.appendChild(style);
    CSS_INJECTED = true;
  }

  /* ---------- render ---------- */

  function renderBannerHTML(banner) {
    injectCSS();

    var html = '';
    html += '<div class="pe-banner" data-paste-id="' + banner.id + '">';
    html += '<button class="pe-banner-close" title="Remove">&times;</button>';

    // Thumbnail row
    if (banner.thumbnail) {
      html += '<img class="pe-banner-thumb" src="' + escAttr(banner.thumbnail) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">';
    }

    // Body
    html += '<div class="pe-banner-body">';
    html += '<span class="pe-banner-type">' + esc(banner.type) + '</span><br>';
    html += '<span class="pe-banner-icon">' + (ICONS[banner.type] || '') + '</span>';
    html += '<span>' + esc(banner.display) + '</span>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  /* ---------- tiny sanitizers ---------- */

  function esc(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function escAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- public API ---------- */

  window.PasteEngine = {
    detectPasteType:  detectPasteType,
    createBanner:     createBanner,
    extractYouTubeId: extractYouTubeId,
    renderBannerHTML: renderBannerHTML
  };

})();
