// ─── 4-BOX FADE CHAIN ─────────────────────────────

function loadConvo(id, skipMid) {
  activeConvo = id;
  document.querySelectorAll('#chat-list .chat-item').forEach(el => el.classList.remove('active'));
  if (event && event.currentTarget) event.currentTarget.classList.add('active');

  // reset boxes 2/3/4 when a new box 1 card is clicked
  closeBox3();
  closeBox4();

  const c = convos[id] || { headerAvatars:['👤'], name:'Conversation', messages:[] };

  if (c.midCards && !skipMid) {
    openBox2(id, c.name, c.midCards);
    return;
  }

  const wrap = document.querySelector('.convo-avatars');
  wrap.innerHTML = c.headerAvatars.map(a => `<div class="convo-av">${a}</div>`).join('');
  document.getElementById('convo-name').textContent = c.name;
  renderThread(c.messages);
}

function openBox2(id, title, cards) {
  const panel = document.getElementById('mid-panel');
  document.getElementById('mid-title').textContent = title;
  const list = document.getElementById('mid-list');
  list.innerHTML = '';
  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'chat-item';
    el.innerHTML = card.html;
    el.addEventListener('click', function(e) {
      openBox3(card.convoId, title);
    });
    list.appendChild(el);
  });
  panel.classList.add('open');
}

function closeMidPanel() {
  document.getElementById('mid-panel').classList.remove('open');
  closeBox3();
  closeBox4();
}

function openBox3(id, parentTitle) {
  closeBox4();
  const panel = document.getElementById('box3-panel');
  document.getElementById('box3-title').textContent = 'More Details';
  const list = document.getElementById('box3-list');
  list.innerHTML = '';

  // build a placeholder card in box3
  const c = convos[id] || { headerAvatars:['👤'], name:'Conversation', messages:[] };
  const el = document.createElement('div');
  el.className = 'chat-item';
  el.innerHTML = `<div class="chat-top-row">
    <div class="avatar-wrap"><div class="avatar">${c.headerAvatars[0]||'👤'}</div></div>
    <div class="chat-info">
      <div class="chat-name">${c.name}</div>
      <div class="chat-preview">Tap to open thread</div>
    </div>
  </div>
  <div class="chat-boxes">
    <div class="chat-box"></div><div class="chat-box"></div>
    <div class="chat-box"></div><div class="chat-box"></div>
  </div>`;
  el.addEventListener('click', function() {
    openBox4(id);
  });
  list.appendChild(el);
  panel.classList.add('open');
}

function closeBox3() {
  document.getElementById('box3-panel').classList.remove('open');
}

function openBox4(id) {
  const panel = document.getElementById('box4-panel');
  document.getElementById('box4-title').textContent = 'Thread';
  const list = document.getElementById('box4-list');
  list.innerHTML = '';

  const c = convos[id] || { headerAvatars:['👤'], name:'Conversation', messages:[] };
  const el = document.createElement('div');
  el.className = 'chat-item';
  el.innerHTML = `<div class="chat-top-row">
    <div class="avatar-wrap"><div class="avatar">${c.headerAvatars[0]||'👤'}</div></div>
    <div class="chat-info">
      <div class="chat-name">${c.name}</div>
      <div class="chat-preview">Open full thread →</div>
    </div>
  </div>
  <div class="chat-boxes">
    <div class="chat-box"></div><div class="chat-box"></div>
    <div class="chat-box"></div><div class="chat-box"></div>
  </div>`;
  el.addEventListener('click', function() {
    // load the actual thread in right panel
    const wrap = document.querySelector('.convo-avatars');
    wrap.innerHTML = c.headerAvatars.map(a => `<div class="convo-av">${a}</div>`).join('');
    document.getElementById('convo-name').textContent = c.name;
    renderThread(c.messages);
  });
  list.appendChild(el);
  panel.classList.add('open');
}

function closeBox4() {
  document.getElementById('box4-panel').classList.remove('open');
}
