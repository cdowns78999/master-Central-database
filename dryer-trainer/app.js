/* ===== APP.JS — Nav Logic & Initialization ===== */

(function() {
  'use strict';

  const sections = document.querySelectorAll('.page-section');
  const navBtns  = document.querySelectorAll('.nav-btn');

  // Switch visible section
  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    navBtns.forEach(b => b.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      // Re-trigger animation
      target.style.animation = 'none';
      target.offsetHeight; // reflow
      target.style.animation = '';
    }

    navBtns.forEach(b => {
      if (b.dataset.section === id) b.classList.add('active');
    });
  }

  // Nav button clicks
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.section);
    });
  });

  // CTA button on overview
  const ctaBtn = document.querySelector('.cta-btn[data-section]');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      showSection(ctaBtn.dataset.section);
    });
  }

  // Phase cards on overview -> jump to guide with filter
  document.querySelectorAll('.phase-card[data-phase]').forEach(card => {
    card.addEventListener('click', () => {
      showSection('guide');
      // Dispatch custom event so guide.js can filter
      const phase = parseInt(card.dataset.phase);
      window.dispatchEvent(new CustomEvent('filter-phase', { detail: { phase } }));
    });
  });

  // 3D preset buttons -> also update guide
  document.querySelectorAll('.preset-btn[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('viewer-preset', { detail: { preset: btn.dataset.preset } }));
    });
  });

  // Expose for modules
  window.DryerTrainer = {
    showSection,
    focusPart(partId) {
      window.dispatchEvent(new CustomEvent('focus-part', { detail: { partId } }));
    }
  };

})();
