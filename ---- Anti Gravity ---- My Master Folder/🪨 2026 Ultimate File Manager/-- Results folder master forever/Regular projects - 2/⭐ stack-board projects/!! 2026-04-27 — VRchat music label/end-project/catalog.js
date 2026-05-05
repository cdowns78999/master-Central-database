// catalog.js — VRchat music label release catalog module (agent A7)

export const RELEASES = [
  { id: 'r01', artistId: 'nova',     title: 'Midnight Arcade',      releaseDate: '2026-01-12', status: 'live',      plays: 184230, coverColor: '#a78bfa' },
  { id: 'r02', artistId: 'nova',     title: 'Chrome Sunset',        releaseDate: '2026-05-02', status: 'scheduled', plays: 0,      coverColor: '#c4b5fd' },
  { id: 'r03', artistId: 'lume',     title: 'Paper Lanterns',       releaseDate: '2025-11-20', status: 'live',      plays: 92410,  coverColor: '#fcd34d' },
  { id: 'r04', artistId: 'lume',     title: 'Tea & Tape Hiss',      releaseDate: '2026-04-29', status: 'scheduled', plays: 0,      coverColor: '#fde68a' },
  { id: 'r05', artistId: 'stardust', title: 'Floating Garden',      releaseDate: '2026-02-08', status: 'live',      plays: 56120,  coverColor: '#67e8f9' },
  { id: 'r06', artistId: 'velour',   title: 'Soft Static',          releaseDate: '2025-09-14', status: 'live',      plays: 211440, coverColor: '#f9a8d4' },
  { id: 'r07', artistId: 'velour',   title: 'Slow Motion Hearts',   releaseDate: '2026-06-21', status: 'draft',     plays: 0,      coverColor: '#fbcfe8' },
  { id: 'r08', artistId: 'kazu',     title: 'Cassette Apartment',   releaseDate: '2026-03-30', status: 'live',      plays: 31870,  coverColor: '#86efac' }
];

if (typeof window !== 'undefined') window.RELEASES = RELEASES;

const STATUS_LABEL = { live: 'Live', scheduled: 'Scheduled', draft: 'Draft' };

function lookupArtistHandle(artistId) {
  const list = (typeof window !== 'undefined' && window.ARTISTS) ? window.ARTISTS : [];
  const a = list.find(x => x.id === artistId);
  return a ? a.handle : artistId;
}

function fmtPlays(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000)    return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

export function renderCatalog(container) {
  if (!container) return;
  container.innerHTML = '';

  let sortKey = 'releaseDate';
  let sortDir = 'desc';

  const wrap = document.createElement('div');
  wrap.className = 'catalog-wrap';

  const header = document.createElement('div');
  header.className = 'catalog-header';
  header.innerHTML = `<h2 class="catalog-title">Release Catalog</h2><span class="catalog-count">${RELEASES.length} releases</span>`;
  wrap.appendChild(header);

  const table = document.createElement('table');
  table.className = 'catalog-table';

  const cols = [
    { key: 'title',       label: 'Title' },
    { key: 'artistId',    label: 'Artist' },
    { key: 'releaseDate', label: 'Release' },
    { key: 'status',      label: 'Status' },
    { key: 'plays',       label: 'Plays' }
  ];

  const thead = document.createElement('thead');
  const trh = document.createElement('tr');
  cols.forEach(c => {
    const th = document.createElement('th');
    th.textContent = c.label;
    th.className = 'catalog-th';
    th.dataset.key = c.key;
    th.addEventListener('click', () => {
      if (sortKey === c.key) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey = c.key;
        sortDir = 'asc';
      }
      drawBody();
      drawHeaderState();
    });
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  function drawHeaderState() {
    trh.querySelectorAll('th').forEach(th => {
      th.classList.remove('is-sorted-asc', 'is-sorted-desc');
      if (th.dataset.key === sortKey) {
        th.classList.add(sortDir === 'asc' ? 'is-sorted-asc' : 'is-sorted-desc');
      }
    });
  }

  function drawBody() {
    const rows = [...RELEASES].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    tbody.innerHTML = '';
    rows.forEach(r => {
      const tr = document.createElement('tr');
      tr.className = 'release-row';
      tr.dataset.releaseId = r.id;
      tr.innerHTML = `
        <td class="release-title">
          <span class="release-cover" style="background:${r.coverColor}"></span>
          ${r.title}
        </td>
        <td class="release-artist">${lookupArtistHandle(r.artistId)}</td>
        <td class="release-date">${r.releaseDate}</td>
        <td class="release-status">
          <span class="status-pill status-${r.status}">${STATUS_LABEL[r.status] || r.status}</span>
        </td>
        <td class="release-plays">${fmtPlays(r.plays)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  drawBody();
  drawHeaderState();
  wrap.appendChild(table);
  container.appendChild(wrap);
}
