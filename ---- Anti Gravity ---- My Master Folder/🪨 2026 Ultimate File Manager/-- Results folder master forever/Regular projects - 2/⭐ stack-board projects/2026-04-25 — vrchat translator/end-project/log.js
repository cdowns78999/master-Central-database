// log.js — session log renderer (agent A3)

const LANG_LABEL = {
  auto: 'AUTO',
  jp: 'JP', ja: 'JP',
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  ko: 'KO'
};

function pad(n) { return String(n).padStart(2, '0'); }

function fmtTime(d = new Date()) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function langLabel(code) {
  if (!code) return '--';
  return LANG_LABEL[code.toLowerCase()] || code.toUpperCase().slice(0, 3);
}

function ensureMount() {
  return document.getElementById('sessionLog');
}

function bumpCount() {
  const el = document.getElementById('logCount');
  if (!el) return;
  const cur = parseInt(el.textContent, 10) || 0;
  el.textContent = String(cur + 1);
}

/**
 * Append one row to #sessionLog.
 * @param {string} from — source lang code (e.g. 'jp', 'auto')
 * @param {string} to   — target lang code
 * @param {string} src  — source text
 * @param {string} dst  — translated text
 */
export function addEntry(from, to, src, dst) {
  const mount = ensureMount();
  if (!mount) return;

  const row = document.createElement('div');
  row.className = 'log-entry';

  const time = document.createElement('div');
  time.className = 'log-time';
  time.textContent = fmtTime();

  const badges = document.createElement('div');
  badges.className = 'log-badges';
  const fromB = document.createElement('span');
  fromB.className = 'lang-badge from';
  fromB.textContent = langLabel(from);
  const toB = document.createElement('span');
  toB.className = 'lang-badge to';
  toB.textContent = langLabel(to);
  badges.appendChild(fromB);
  badges.appendChild(toB);

  const text = document.createElement('div');
  text.className = 'log-text';
  const srcSpan = document.createElement('span');
  srcSpan.className = 'log-src';
  srcSpan.textContent = src ?? '';
  const arrow = document.createElement('span');
  arrow.className = 'log-arrow';
  arrow.textContent = '→';
  const dstSpan = document.createElement('span');
  dstSpan.className = 'log-dst';
  dstSpan.textContent = dst ?? '';
  const line = document.createElement('div');
  line.appendChild(srcSpan);
  line.appendChild(arrow);
  line.appendChild(dstSpan);
  text.appendChild(line);

  row.appendChild(time);
  row.appendChild(badges);
  row.appendChild(text);

  mount.prepend(row);
  bumpCount();
}

/**
 * Pull all entries as a flat text dump (newest first).
 * Used by the Save button.
 */
export function dumpEntries() {
  const mount = ensureMount();
  if (!mount) return '';
  const rows = Array.from(mount.querySelectorAll('.log-entry'));
  return rows.map((r) => {
    const t = r.querySelector('.log-time')?.textContent || '';
    const fb = r.querySelectorAll('.lang-badge')[0]?.textContent || '';
    const tb = r.querySelectorAll('.lang-badge')[1]?.textContent || '';
    const src = r.querySelector('.log-src')?.textContent || '';
    const dst = r.querySelector('.log-dst')?.textContent || '';
    return `[${t}] ${fb} -> ${tb}    ${src}    =>    ${dst}`;
  }).join('\n');
}

/**
 * Seed demo data on first paint so the panel never feels empty.
 */
export function seedDemo() {
  // Newest last, prepended in order so display order is newest-first.
  const seeds = [
    { from: 'jp', to: 'en', src: 'またね',                 dst: 'See you later' },
    { from: 'en', to: 'jp', src: 'Nice to meet you',       dst: 'はじめまして' },
    { from: 'jp', to: 'en', src: 'こんにちは',             dst: 'Hello' }
  ];
  // Reverse so the last addEntry call (newest) ends up on top.
  seeds.slice().reverse().forEach((s) => addEntry(s.from, s.to, s.src, s.dst));
}
