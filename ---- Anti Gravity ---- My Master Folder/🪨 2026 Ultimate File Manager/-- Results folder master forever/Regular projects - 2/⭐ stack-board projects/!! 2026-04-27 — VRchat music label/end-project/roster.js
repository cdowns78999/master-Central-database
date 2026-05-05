// roster.js — VRchat music label artist roster module (agent A7)

export const ARTISTS = [
  { id: 'nova',     handle: '@nova',     genre: 'synthwave', bio: 'Neon-soaked retro-futurist beats from a midnight VRchat balcony.',     avatarColor: '#a78bfa', releaseCount: 2 },
  { id: 'lume',     handle: '@lume',     genre: 'chillhop',  bio: 'Lo-fi loops and rainy rooftop chords for the late study crowd.',         avatarColor: '#fcd34d', releaseCount: 2 },
  { id: 'stardust', handle: '@stardust', genre: 'ambient',   bio: 'Drifting pads, soft drones, slow-motion soundscapes for floating worlds.', avatarColor: '#67e8f9', releaseCount: 1 },
  { id: 'velour',   handle: '@velour',   genre: 'dreampop',  bio: 'Velvet vocals tucked into shimmering reverb and warm tape hiss.',        avatarColor: '#f9a8d4', releaseCount: 2 },
  { id: 'kazu',     handle: '@kazu',     genre: 'lo-fi',     bio: 'Cassette-warm beats stitched together in a tiny Tokyo apartment.',       avatarColor: '#86efac', releaseCount: 1 }
];

if (typeof window !== 'undefined') window.ARTISTS = ARTISTS;

export function renderRoster(container) {
  if (!container) return;
  container.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'roster-wrap';

  const header = document.createElement('div');
  header.className = 'roster-header';
  header.innerHTML = `<h2 class="roster-title">Artist Roster</h2><span class="roster-count">${ARTISTS.length} artists</span>`;
  wrap.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'roster-grid';

  ARTISTS.forEach(artist => {
    const tile = document.createElement('article');
    tile.className = 'roster-tile';
    tile.dataset.artistId = artist.id;
    tile.innerHTML = `
      <div class="roster-avatar" style="background:${artist.avatarColor}">
        <span>${artist.handle.charAt(1).toUpperCase()}</span>
      </div>
      <div class="roster-meta">
        <div class="roster-handle">${artist.handle}</div>
        <div class="roster-genre">${artist.genre}</div>
        <div class="roster-releases">${artist.releaseCount} release${artist.releaseCount === 1 ? '' : 's'}</div>
      </div>
      <div class="roster-detail" hidden>
        <p class="roster-bio">${artist.bio}</p>
        <button class="roster-close" type="button" aria-label="close">close</button>
      </div>
    `;

    tile.addEventListener('click', (e) => {
      if (e.target.classList.contains('roster-close')) {
        tile.classList.remove('is-open');
        tile.querySelector('.roster-detail').hidden = true;
        return;
      }
      const opened = tile.classList.toggle('is-open');
      tile.querySelector('.roster-detail').hidden = !opened;
    });

    grid.appendChild(tile);
  });

  wrap.appendChild(grid);
  container.appendChild(wrap);
}
