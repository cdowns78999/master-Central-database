/* =====================================================================
   CAT DETECTIVE FILES — dossier.js
   Fetches data/angora.json + data/ragdoll.json, renders into mount tiles.
   ===================================================================== */

(function(){
  'use strict';

  const DATA = {
    angora:  'data/angora.json',
    ragdoll: 'data/ragdoll.json'
  };

  function escapeHTML(str){
    return String(str == null ? '' : str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function safeURL(url){
    if(!url) return '';
    const u = String(url).trim();
    if(!/^https?:\/\//i.test(u)) return 'https://' + u.replace(/^\/+/,'');
    return u;
  }

  function renderGenesis(genesis){
    if(!Array.isArray(genesis) || !genesis.length){
      return '<div class="tile-error">NO RECORDS ON FILE</div>';
    }
    return genesis.map(row => {
      const decade = escapeHTML(row.decade || '????');
      const facts = Array.isArray(row.facts) ? row.facts : [];
      const factsHTML = facts.map(f => '<li>' + escapeHTML(f) + '</li>').join('');
      let sourceHTML = '';
      if(row.source){
        const href = safeURL(row.source);
        sourceHTML = '<a class="decade-source" href="' + escapeHTML(href) +
                     '" target="_blank" rel="noopener noreferrer">' +
                     escapeHTML(row.source) + '</a>';
      }
      return (
        '<div class="decade-row">' +
          '<span class="decade-label">[ ' + decade + ' ]</span>' +
          '<ul class="decade-facts">' + factsHTML + '</ul>' +
          sourceHTML +
        '</div>'
      );
    }).join('');
  }

  function renderToday(today){
    if(!today || typeof today !== 'object'){
      return '<div class="tile-error">NO RECORDS ON FILE</div>';
    }
    const summary = today.summary
      ? '<div class="today-summary">' + escapeHTML(today.summary) + '</div>'
      : '';
    const facts = Array.isArray(today.facts) ? today.facts : [];
    const factsHTML = facts.length
      ? '<ul class="today-facts">' +
          facts.map(f => '<li>' + escapeHTML(f) + '</li>').join('') +
        '</ul>'
      : '';
    const sources = Array.isArray(today.sources) ? today.sources : [];
    const sourcesHTML = sources.length
      ? '<div class="today-sources">' +
          '<div class="today-sources-label">Sources on File</div>' +
          '<div class="today-sources-list">' +
            sources.map(s => {
              const href = safeURL(s);
              return '<a href="' + escapeHTML(href) +
                     '" target="_blank" rel="noopener noreferrer">' +
                     escapeHTML(s) + '</a>';
            }).join('') +
          '</div>' +
        '</div>'
      : '';
    return summary + factsHTML + sourcesHTML;
  }

  function mount(tileId, slotName, html){
    const tile = document.getElementById(tileId);
    if(!tile) return;
    const slot = tile.querySelector('[data-slot="' + slotName + '"]');
    if(!slot) return;
    slot.innerHTML = html;
  }

  function setBreedHeader(tileId, breedName){
    if(!breedName) return;
    const tile = document.getElementById(tileId);
    if(!tile) return;
    const header = tile.querySelector('.tile-breed');
    if(header) header.textContent = String(breedName).toUpperCase();
  }

  async function loadAll(){
    try{
      const [angoraRes, ragdollRes] = await Promise.all([
        fetch(DATA.angora,  {cache:'no-store'}),
        fetch(DATA.ragdoll, {cache:'no-store'})
      ]);
      if(!angoraRes.ok)  throw new Error('angora.json HTTP ' + angoraRes.status);
      if(!ragdollRes.ok) throw new Error('ragdoll.json HTTP ' + ragdollRes.status);
      const [angora, ragdoll] = await Promise.all([
        angoraRes.json(),
        ragdollRes.json()
      ]);

      // Sync breed headers from JSON (in case naming changes)
      setBreedHeader('tile-angora-genesis',  angora.breed);
      setBreedHeader('tile-angora-today',    angora.breed);
      setBreedHeader('tile-ragdoll-genesis', ragdoll.breed);
      setBreedHeader('tile-ragdoll-today',   ragdoll.breed);

      mount('tile-angora-genesis',  'genesis', renderGenesis(angora.genesis));
      mount('tile-ragdoll-genesis', 'genesis', renderGenesis(ragdoll.genesis));
      mount('tile-angora-today',    'today',   renderToday(angora.today));
      mount('tile-ragdoll-today',   'today',   renderToday(ragdoll.today));
    }catch(err){
      const msg = '<div class="tile-error">DATA LOAD FAILED &mdash; ' +
                  escapeHTML(err.message) + '</div>';
      ['tile-angora-genesis','tile-ragdoll-genesis',
       'tile-angora-today','tile-ragdoll-today'].forEach(id => {
        const tile = document.getElementById(id);
        if(!tile) return;
        const slot = tile.querySelector('[data-slot]');
        if(slot) slot.innerHTML = msg;
      });
      console.error('[dossier] load failed:', err);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadAll);
  }else{
    loadAll();
  }
})();
