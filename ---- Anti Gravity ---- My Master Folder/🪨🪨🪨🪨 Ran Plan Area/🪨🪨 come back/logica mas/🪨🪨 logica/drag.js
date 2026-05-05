let draggedCard = null;
let ghostEl     = null;
let sourceList  = null;
let dropped     = false;

// ─── DRAG START ───────────────────────────────────────
document.addEventListener('dragstart', function(e) {
  const card = e.target.closest('.chat-item');
  if (!card) return;

  draggedCard = card;
  sourceList  = card.parentElement;
  dropped     = false;

  // Clone card for a clean drag image
  const clone = card.cloneNode(true);
  clone.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:' + card.offsetWidth + 'px;pointer-events:none;';
  document.body.appendChild(clone);
  e.dataTransfer.setDragImage(clone, 24, 20);
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => clone.remove(), 0);

  // Ghost holds the slot
  ghostEl = document.createElement('div');
  ghostEl.className = 'ghost';
  ghostEl.style.height = card.offsetHeight + 'px';
  sourceList.insertBefore(ghostEl, card);

  // Hide original after browser captures drag image
  setTimeout(() => { card.style.display = 'none'; }, 0);
});

// ─── DRAG END (cancel or after drop) ──────────────────
document.addEventListener('dragend', function() {
  if (draggedCard) draggedCard.style.display = '';
  if (!dropped && ghostEl) { ghostEl.remove(); ghostEl = null; }
  document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
  draggedCard = null;
  sourceList  = null;
  dropped     = false;
});

// ─── DRAG OVER ────────────────────────────────────────
document.addEventListener('dragover', function(e) {
  e.preventDefault();
  const col = e.target.closest('.kanban-col');
  if (!col) return;
  document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
  col.classList.add('drag-over');
});

// ─── DRAG LEAVE ───────────────────────────────────────
document.addEventListener('dragleave', function(e) {
  if (e.relatedTarget && e.relatedTarget.closest) {
    const col = e.target.closest('.kanban-col');
    if (col && !col.contains(e.relatedTarget)) col.classList.remove('drag-over');
  }
});

// ─── DROP ─────────────────────────────────────────────
document.addEventListener('drop', function(e) {
  e.preventDefault();
  const col = e.target.closest('.kanban-col');
  if (!col) return;

  col.classList.remove('drag-over');
  const list = col.querySelector('.card-list');
  if (!draggedCard || !list || list === sourceList) return;

  dropped = true;

  // Remove ghost
  if (ghostEl) { ghostEl.remove(); ghostEl = null; }

  // Remove drop-hint from target
  const hint = list.querySelector('.drop-hint');
  if (hint) hint.remove();

  // Show card and move it
  draggedCard.style.display = '';
  list.appendChild(draggedCard);

  // Flash animation
  draggedCard.classList.add('drop-flash');
  draggedCard.addEventListener('animationend', () => {
    draggedCard.classList.remove('drop-flash');
  }, { once: true });

  // Restore drop-hint in source if empty (not col1)
  if (sourceList && sourceList.id !== 'col1-list') {
    if (!sourceList.querySelector('.chat-item') && !sourceList.querySelector('.drop-hint')) {
      const h = document.createElement('div');
      h.className = 'drop-hint';
      h.textContent = 'Drop cards here';
      sourceList.appendChild(h);
    }
  }
});
