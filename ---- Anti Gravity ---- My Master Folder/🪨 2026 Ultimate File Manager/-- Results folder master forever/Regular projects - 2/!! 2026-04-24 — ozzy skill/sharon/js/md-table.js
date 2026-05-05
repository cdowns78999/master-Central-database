/* md-table.js
 * Tiny vanilla parser for markdown tables.
 * Attaches to window — no imports/exports.
 *
 * Usage:
 *   const rows = parseMdTable(text);     // [{col1: val, ...}, ...]
 *   const rows = await loadMdTable(url); // fetch + parse
 */
(function () {
  'use strict';

  function splitRow(line) {
    // Trim leading/trailing whitespace, then strip a single leading/trailing pipe if present.
    var s = String(line).trim();
    if (s.charAt(0) === '|') s = s.slice(1);
    if (s.charAt(s.length - 1) === '|') s = s.slice(0, -1);
    var parts = s.split('|');
    for (var i = 0; i < parts.length; i++) parts[i] = parts[i].trim();
    return parts;
  }

  function isSeparatorRow(cells) {
    // Separator cells look like ---, :---, :---:, ---:
    if (!cells.length) return false;
    for (var i = 0; i < cells.length; i++) {
      if (!/^:?-{3,}:?$/.test(cells[i])) return false;
    }
    return true;
  }

  function isTableLine(line) {
    return /^\s*\|/.test(line) || /\|/.test(line);
  }

  window.parseMdTable = function (text) {
    if (!text) return [];
    var lines = String(text).split(/\r?\n/);
    var i = 0;

    // Find the first line that starts (after optional whitespace) with a pipe.
    while (i < lines.length && !/^\s*\|/.test(lines[i])) i++;
    if (i >= lines.length) return [];

    var headerCells = splitRow(lines[i]);
    i++;

    // Skip blank lines between header and separator (lenient).
    while (i < lines.length && lines[i].trim() === '') i++;

    // Expect separator row — skip it if found.
    if (i < lines.length) {
      var maybeSep = splitRow(lines[i]);
      if (isSeparatorRow(maybeSep)) i++;
    }

    var headers = headerCells.map(function (h) { return h.toLowerCase(); });
    var rows = [];

    for (; i < lines.length; i++) {
      var raw = lines[i];
      if (raw.trim() === '') continue;          // skip blanks within / after table
      if (!/^\s*\|/.test(raw)) break;           // table block ended
      var cells = splitRow(raw);
      if (isSeparatorRow(cells)) continue;      // tolerate stray separators
      var obj = {};
      for (var c = 0; c < headers.length; c++) {
        obj[headers[c]] = cells[c] !== undefined ? cells[c] : '';
      }
      rows.push(obj);
    }

    return rows;
  };

  window.loadMdTable = async function (url) {
    var res = await fetch(url);
    if (!res.ok) throw new Error('load failed: ' + url);
    var text = await res.text();
    return window.parseMdTable(text);
  };
})();
