// matrix-view.js — barrier x tools matrix renderer (agent A4)

import { BARRIERS } from './data.js';

const STATUS_COLORS = {
  live: { bg: '#10b981', fg: '#03261b', label: 'LIVE' },
  wip:  { bg: '#f59e0b', fg: '#2a1a02', label: 'WIP'  },
  todo: { bg: '#6b7280', fg: '#f1f5f9', label: 'TODO' }
};

function maxToolCount(barriers) {
  return barriers.reduce((m, b) => Math.max(m, b.tools.length), 0);
}

function buildHeaderRow(colCount) {
  const tr = document.createElement('tr');
  const corner = document.createElement('th');
  corner.textContent = 'Barrier';
  corner.style.cssText = 'text-align:left;padding:10px 14px;background:#0f172a;color:#f1f5f9;border:1px solid #1e293b;font:600 13px/1.2 system-ui,sans-serif;';
  tr.appendChild(corner);

  for (let i = 0; i < colCount; i++) {
    const th = document.createElement('th');
    th.textContent = `Tool ${i + 1}`;
    th.style.cssText = 'text-align:left;padding:10px 14px;background:#0f172a;color:#f1f5f9;border:1px solid #1e293b;font:600 13px/1.2 system-ui,sans-serif;';
    tr.appendChild(th);
  }
  return tr;
}

function buildBarrierCell(barrier) {
  const td = document.createElement('td');
  td.style.cssText = 'padding:12px 14px;background:#1e293b;color:#f1f5f9;border:1px solid #0f172a;font:600 13px/1.3 system-ui,sans-serif;vertical-align:top;min-width:160px;';
  const title = document.createElement('div');
  title.textContent = `${barrier.icon}  ${barrier.label}`;
  title.style.cssText = 'font-size:14px;margin-bottom:4px;';
  const desc = document.createElement('div');
  desc.textContent = barrier.description;
  desc.style.cssText = 'font:400 11px/1.4 system-ui,sans-serif;color:#94a3b8;';
  td.appendChild(title);
  td.appendChild(desc);
  return td;
}

function buildToolCell(tool) {
  const td = document.createElement('td');
  if (!tool) {
    td.style.cssText = 'padding:12px 14px;background:#0b1220;border:1px solid #1e293b;';
    return td;
  }
  const c = STATUS_COLORS[tool.status] || STATUS_COLORS.todo;
  td.style.cssText = `padding:12px 14px;background:${c.bg};color:${c.fg};border:1px solid #0f172a;vertical-align:top;min-width:180px;font-family:system-ui,sans-serif;`;

  const name = document.createElement('div');
  name.textContent = tool.name;
  name.style.cssText = 'font:600 13px/1.3 system-ui,sans-serif;margin-bottom:4px;';

  const badge = document.createElement('span');
  badge.textContent = c.label;
  badge.style.cssText = `display:inline-block;padding:2px 6px;border-radius:4px;background:${c.fg};color:${c.bg};font:700 10px/1 system-ui,sans-serif;letter-spacing:0.5px;margin-bottom:6px;`;

  const note = document.createElement('div');
  note.textContent = tool.note;
  note.style.cssText = 'font:400 11px/1.4 system-ui,sans-serif;opacity:0.92;';

  td.appendChild(name);
  td.appendChild(badge);
  td.appendChild(note);
  return td;
}

export function renderMatrix(container) {
  if (!container) throw new Error('renderMatrix: container is required');
  container.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style.cssText = 'overflow-x:auto;padding:16px;background:#020617;border-radius:8px;';

  const table = document.createElement('table');
  table.style.cssText = 'border-collapse:collapse;width:100%;min-width:600px;';

  const colCount = maxToolCount(BARRIERS);
  table.appendChild(buildHeaderRow(colCount));

  BARRIERS.forEach(barrier => {
    const tr = document.createElement('tr');
    tr.appendChild(buildBarrierCell(barrier));
    for (let i = 0; i < colCount; i++) {
      tr.appendChild(buildToolCell(barrier.tools[i] || null));
    }
    table.appendChild(tr);
  });

  wrap.appendChild(table);
  container.appendChild(wrap);
  return table;
}
