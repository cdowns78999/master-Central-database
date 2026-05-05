/* ================================================================
   Becca ♥ Chad Numerology
   Animates the binary-note stream across the top "staff" so 0s
   and 1s drift like notes across the musical lines.
   ================================================================ */

(function () {
  'use strict';

  const stream = document.getElementById('binaryStream');
  if (!stream) return;

  // 5 staff lines => 5 drift tracks at those y-positions
  const trackY = [22, 38, 54, 70, 86];

  // Check reduced-motion preference
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function spawnNote() {
    const note = document.createElement('span');
    note.className = 'binary-note';
    note.textContent = Math.random() > 0.5 ? '1' : '0';

    // Pick a staff line, with a small vertical jitter so it looks like a note head
    const y = trackY[Math.floor(Math.random() * trackY.length)];
    const jitter = (Math.random() - 0.5) * 6;
    note.style.top = (y + jitter - 8) + 'px';

    // Duration + delay + size vary so the stream feels alive
    const duration = 14 + Math.random() * 10;          // 14s–24s
    const fontSize = 12 + Math.random() * 6;           // 12–18px
    note.style.fontSize = fontSize + 'px';
    note.style.animationDuration = duration + 's';
    note.style.animationDelay = '0s';

    // Slight opacity variation
    note.style.setProperty('--note-opacity', (0.55 + Math.random() * 0.35).toFixed(2));

    stream.appendChild(note);

    // Clean up after it finishes
    setTimeout(() => {
      if (note.parentNode) note.parentNode.removeChild(note);
    }, (duration + 1) * 1000);
  }

  if (!reduceMotion) {
    // Pre-seed a handful so the staff isn't empty on first paint
    for (let i = 0; i < 6; i++) {
      setTimeout(spawnNote, i * 900);
    }
    // Then keep a steady drip
    setInterval(spawnNote, 1100);
  } else {
    // Static: sprinkle a few stationary 0/1s along the staff
    for (let i = 0; i < 10; i++) {
      const note = document.createElement('span');
      note.className = 'binary-note';
      note.textContent = Math.random() > 0.5 ? '1' : '0';
      note.style.top = (trackY[i % trackY.length] - 8) + 'px';
      note.style.left = (10 + i * 9) + '%';
      note.style.animation = 'none';
      note.style.opacity = '0.35';
      stream.appendChild(note);
    }
  }
})();
