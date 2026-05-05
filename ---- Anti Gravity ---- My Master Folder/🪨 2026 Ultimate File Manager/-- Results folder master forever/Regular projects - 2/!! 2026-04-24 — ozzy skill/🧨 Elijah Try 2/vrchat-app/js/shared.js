(function() {
  var currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  var navLinks = document.querySelectorAll('.topnav-link');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    var page = href.replace('pages/', '').replace('.html', '');
    if (page === currentPage) {
      link.classList.add('active');
    }
  });
})();

(function() {
  var wizardSteps = document.querySelectorAll('.wizard-step');
  var prevBtn = document.getElementById('wizard-prev');
  var nextBtn = document.getElementById('wizard-next');
  var currentStep = 0;
  if (!wizardSteps.length) return;
  function showStep(n) {
    wizardSteps.forEach(function(s) { s.classList.remove('active'); });
    wizardSteps[n].classList.add('active');
    var bars = document.querySelectorAll('.wizard-progress .wp-step');
    bars.forEach(function(b, i) {
      b.classList.remove('done', 'active');
      if (i < n) b.classList.add('done');
      if (i === n) b.classList.add('active');
    });
    if (prevBtn) prevBtn.style.visibility = n === 0 ? 'hidden' : 'visible';
    if (nextBtn) {
      if (n === wizardSteps.length - 1) {
        nextBtn.textContent = 'Done';
      } else {
        nextBtn.textContent = 'Next →';
      }
    }
    currentStep = n;
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (currentStep < wizardSteps.length - 1) {
        showStep(currentStep + 1);
      }
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentStep > 0) showStep(currentStep - 1);
    });
  }
  showStep(0);
})();

(function() {
  document.querySelectorAll('.wizard-option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      var parent = opt.closest('.wizard-options');
      parent.querySelectorAll('.wizard-option').forEach(function(o) {
        o.classList.remove('selected');
      });
      opt.classList.add('selected');
    });
  });
})();
