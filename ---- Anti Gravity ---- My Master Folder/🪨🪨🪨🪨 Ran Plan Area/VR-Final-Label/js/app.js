/* =========================================================
   VR-Final-Label — App framework
   Foundation only. Section logic lives in js/sections/*.js
   ========================================================= */

(function () {
  'use strict';

  // ---- Global state ----
  // Shared field/file capture across all 11 sections.
  // Other agents read/write via captureField() / captureFile().
  window.__VRFL = window.__VRFL || {
    fields: {},   // { p2: { artistName: 'X', email: 'y@z' }, ... }
    files:  {},   // { p6: { coverArt: File }, p7: { wav: File } }
    state:  {    // misc cross-section flags
      submitted: false,
      travelCardVisible: false
    }
  };

  // ---- Helpers ----
  function captureField(pageId, key, value) {
    if (!pageId || !key) return;
    if (!window.__VRFL.fields[pageId]) window.__VRFL.fields[pageId] = {};
    window.__VRFL.fields[pageId][key] = value;
    document.dispatchEvent(new CustomEvent('vrfl:field', {
      detail: { pageId: pageId, key: key, value: value }
    }));
  }

  function captureFile(pageId, key, fileObj) {
    if (!pageId || !key) return;
    if (!window.__VRFL.files[pageId]) window.__VRFL.files[pageId] = {};
    window.__VRFL.files[pageId][key] = fileObj;
    document.dispatchEvent(new CustomEvent('vrfl:file', {
      detail: {
        pageId: pageId,
        key: key,
        name: fileObj && fileObj.name,
        size: fileObj && fileObj.size,
        type: fileObj && fileObj.type
      }
    }));
  }

  // Expose
  window.captureField = captureField;
  window.captureFile  = captureFile;

  // ---- Boot ----
  document.addEventListener('DOMContentLoaded', function () {
    console.log('VR-Final-Label booted');
  });
})();
