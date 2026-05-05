// vr-chat-worlds-engine — minimal template JS
(function () {
  console.log('vr-chat-worlds template loaded');

  // Mark the active pill in the page-nav based on current filename
  var nav = document.querySelector('.page-nav');
  if (!nav) return;

  var path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === '' || path === '/') path = 'index.html';

  var links = nav.querySelectorAll('a');
  links.forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href === path) {
      a.classList.add('current');
    }
  });
})();
