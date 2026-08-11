// Mobile nav toggle + active-link highlighting
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
  }

  // Highlight the current page in the nav based on filename
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // --- Scroll-reveal animations ---
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // --- Auto-rotating slideshow ---
  var show = document.querySelector('.slideshow');
  if (show) {
    var INTERVAL = parseInt(show.dataset.interval, 10) || 2500; // ms between slides
    var slides = Array.prototype.slice.call(show.querySelectorAll('.slide'));
    var dotsWrap = show.querySelector('.dots');
    var current = 0;
    var timer = null;

    // build dots
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(i) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }
    function next() { go(current + 1); }
    function start() { timer = setInterval(next, INTERVAL); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    go(0);
    start();

    // pause on hover / when tab hidden
    show.addEventListener('mouseenter', stop);
    show.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    // arrows
    var prev = show.querySelector('.arrow.prev');
    var nxt = show.querySelector('.arrow.next');
    if (prev) prev.addEventListener('click', function () { go(current - 1); restart(); });
    if (nxt) nxt.addEventListener('click', function () { next(); restart(); });
  }
})();
