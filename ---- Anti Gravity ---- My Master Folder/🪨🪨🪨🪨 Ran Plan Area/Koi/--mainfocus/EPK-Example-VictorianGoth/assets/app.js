/* =========================================================
   SERAPHINE MOURN — EPK  |  app.js
   Nav transitions, faux audio player, scroll triggers, cursor.
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Custom cursor (flame + trail) ---------- */
  const setupCursor = () => {
    if (matchMedia('(pointer: coarse)').matches) return;

    const flame = document.createElement('div');
    flame.className = 'cursor-flame';
    document.body.appendChild(flame);

    const trails = [];
    for (let i = 0; i < 6; i++) {
      const t = document.createElement('div');
      t.className = 'cursor-trail';
      t.style.opacity = (1 - i / 7).toFixed(2);
      document.body.appendChild(t);
      trails.push({ el: t, x: 0, y: 0 });
    }

    let mx = -100, my = -100;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const loop = () => {
      flame.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      let tx = mx, ty = my;
      trails.forEach((t, i) => {
        t.x += (tx - t.x) * (0.35 - i * 0.04);
        t.y += (ty - t.y) * (0.35 - i * 0.04);
        t.el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
        tx = t.x; ty = t.y;
      });
      requestAnimationFrame(loop);
    };
    loop();

    // Hover swell on links / buttons
    const hoverables = document.querySelectorAll('a, button, .track-card, .press-photo');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => flame.style.transform += ' scale(1.8)');
      el.addEventListener('mouseleave', () => { /* reset handled by loop */ });
    });
  };

  /* ---------- Curtain transition ---------- */
  const setupCurtain = () => {
    const curtain = document.querySelector('.curtain');
    if (!curtain) return;

    // Raise curtain on load
    requestAnimationFrame(() => {
      setTimeout(() => curtain.classList.add('rising'), 250);
    });

    // On internal nav, drop curtain and then navigate
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
          href.startsWith('http') || a.hasAttribute('target')) return;

      a.addEventListener('click', e => {
        // Internal same-origin page change
        if (href.endsWith('.html') || href === '/' || href === './') {
          e.preventDefault();
          curtain.classList.remove('rising');
          curtain.classList.add('falling');
          setTimeout(() => { location.href = href; }, 800);
        }
      });
    });
  };

  /* ---------- Scroll-driven reveals ---------- */
  const setupReveals = () => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  };

  /* ---------- Hero parallax ---------- */
  const setupParallax = () => {
    const hero = document.querySelector('.overture-inner');
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const pct = Math.min(1, y / vh);
      hero.style.setProperty('--scroll', pct.toString());
      hero.style.opacity = (1 - pct * 0.9).toString();
    };
    addEventListener('scroll', onScroll, { passive: true });
  };

  /* ---------- Scroll-driven gradient angle for intermission ---------- */
  const setupIntermissionGradient = () => {
    const w = document.querySelector('.intermission .whisper');
    if (!w) return;
    const onScroll = () => {
      const r = w.getBoundingClientRect();
      const pct = 1 - (r.top / window.innerHeight);
      const angle = 180 + Math.max(-40, Math.min(40, pct * 60));
      w.style.setProperty('--angle', angle + 'deg');
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* ---------- Faux audio player ---------- */
  const setupPlayers = () => {
    document.querySelectorAll('.opera-player').forEach(player => {
      const btn   = player.querySelector('.op-play');
      const wave  = player.querySelector('.op-waveform');
      const time  = player.querySelector('.op-time');
      const prog  = player.querySelector('.progress-line');
      const dur   = parseInt(player.dataset.duration || '245', 10); // seconds
      const bars  = 64;

      // Build pseudo-random waveform
      if (wave && !wave.children.length) {
        // Deterministic pseudo-random from track title for variety
        const seed = (player.dataset.seed || 'm').split('').reduce((a,c)=>a+c.charCodeAt(0),0);
        const rng = mulberry32(seed);
        for (let i = 0; i < bars; i++) {
          const bar = document.createElement('div');
          bar.className = 'bar';
          const pos = i / bars;
          // Opera-like envelope: rise, hold, crescendo, decay
          const env = Math.sin(pos * Math.PI) * 0.7 + 0.3;
          const jitter = rng() * 0.6;
          const h = Math.max(10, Math.min(100, (env * 80 + jitter * 25)));
          bar.style.height = h + '%';
          wave.appendChild(bar);
        }
        const line = document.createElement('div');
        line.className = 'progress-line';
        wave.appendChild(line);
      }

      const progressLine = wave?.querySelector('.progress-line');
      let playing = false;
      let elapsed = 0;
      let raf = 0;

      const fmt = s => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
      };

      if (time) time.textContent = `${fmt(0)} / ${fmt(dur)}`;

      const tick = () => {
        if (!playing) return;
        elapsed += 1/60;
        if (elapsed >= dur) {
          elapsed = 0;
          stop();
          return;
        }
        const pct = elapsed / dur;
        if (progressLine) progressLine.style.left = (pct * 100) + '%';
        if (wave) {
          const bars = wave.querySelectorAll('.bar');
          const active = Math.floor(pct * bars.length);
          bars.forEach((b, i) => b.classList.toggle('active', i <= active));
        }
        if (time) time.textContent = `${fmt(elapsed)} / ${fmt(dur)}`;
        raf = requestAnimationFrame(tick);
      };
      const stop = () => {
        playing = false;
        cancelAnimationFrame(raf);
        btn?.classList.remove('playing');
      };

      btn?.addEventListener('click', e => {
        e.preventDefault();
        // Stop all other players
        document.querySelectorAll('.opera-player').forEach(p => {
          if (p !== player) p._stop?.();
        });
        playing = !playing;
        if (playing) {
          btn.classList.add('playing');
          raf = requestAnimationFrame(tick);
        } else {
          stop();
        }
      });

      // Seek on waveform click
      wave?.addEventListener('click', e => {
        const rect = wave.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        elapsed = Math.max(0, Math.min(dur, pct * dur));
        const bars = wave.querySelectorAll('.bar');
        const active = Math.floor(pct * bars.length);
        bars.forEach((b, i) => b.classList.toggle('active', i <= active));
        if (progressLine) progressLine.style.left = (pct * 100) + '%';
        if (time) time.textContent = `${fmt(elapsed)} / ${fmt(dur)}`;
      });

      player._stop = stop;
    });
  };

  // Seedable PRNG for waveforms
  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* ---------- Candle flicker via random opacity on heavy candles ---------- */
  const setupCandleAmbience = () => {
    const flames = document.querySelectorAll('.candle');
    if (!flames.length) return;
    setInterval(() => {
      flames.forEach(c => {
        if (Math.random() > 0.75) {
          c.style.opacity = (0.7 + Math.random() * 0.3).toString();
        }
      });
    }, 240);
  };

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    setupCurtain();
    setupCursor();
    setupReveals();
    setupParallax();
    setupIntermissionGradient();
    setupPlayers();
    setupCandleAmbience();
  });
})();
