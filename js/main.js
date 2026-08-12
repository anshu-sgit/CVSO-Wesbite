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

// --- Animated particle network for page headers (canvas.hero-net) ---
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  Array.prototype.forEach.call(document.querySelectorAll('canvas.hero-net'), function (cv) {
    var ctx = cv.getContext && cv.getContext('2d');
    if (!ctx) return;
    var rgb = cv.getAttribute('data-rgb') || '240,224,150';
    var W = 0, H = 0, DPR = 1, N = 0, pts = [];
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      N = Math.max(26, Math.min(80, Math.round(W * H / 12000)));
      pts = [];
      for (var i = 0; i < N; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 });
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < N; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.x = Math.max(0, Math.min(W, p.x)); p.y = Math.max(0, Math.min(H, p.y));
      }
      for (var a = 0; a < N; a++) for (var b = a + 1; b < N; b++) {
        var pa = pts[a], pb = pts[b], dx = pa.x - pb.x, dy = pa.y - pb.y, dd = dx * dx + dy * dy;
        if (dd < 11000) { ctx.strokeStyle = 'rgba(' + rgb + ',' + ((1 - dd / 11000) * .32).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); }
      }
      ctx.fillStyle = 'rgba(' + rgb + ',.75)';
      for (var j = 0; j < N; j++) { ctx.beginPath(); ctx.arc(pts[j].x, pts[j].y, 1.7, 0, 6.283); ctx.fill(); }
      if (!reduce) requestAnimationFrame(frame);
    }
    resize(); window.addEventListener('resize', resize); frame();
  });
})();
