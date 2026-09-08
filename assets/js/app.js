/* Lynx Studio — interactive story carousels.
   Progressive enhancement: without JS the rails still scroll natively
   (scroll-snap) and all step text is already in the DOM. */
(function () {
  'use strict';

  var pad2 = function (n) { return n < 10 ? '0' + n : String(n); };
  var pitchFor = function () { return window.innerWidth < 700 ? 116 : 168; };

  function setupJourney(section) {
    var rail = section.querySelector('[data-rail]');
    var track = section.querySelector('[data-track]');
    var counter = section.querySelector('[data-counter]');
    var dots = Array.prototype.slice.call(section.querySelectorAll('.dot'));
    var slides = Array.prototype.slice.call(section.querySelectorAll('.slide'));
    if (!rail || !track || !slides.length) return;

    var total = slides.length;
    var active = 0;
    var ticking = false;

    function render() {
      if (counter) counter.textContent = pad2(active + 1) + ' / ' + pad2(total);
      track.style.setProperty('--active', String(active));
      track.style.setProperty('--pitch', pitchFor() + 'px');
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('is-active', i === active);
        dots[i].setAttribute('aria-current', i === active ? 'true' : 'false');
      }
    }

    function measure() {
      var w = rail.clientWidth;
      if (!w) return;
      var next = Math.max(0, Math.min(total - 1, Math.round(rail.scrollLeft / w)));
      if (next !== active) { active = next; render(); }
      else { track.style.setProperty('--pitch', pitchFor() + 'px'); }
    }

    rail.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { ticking = false; measure(); });
    }, { passive: true });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        var w = rail.clientWidth;
        if (rail.scrollTo) rail.scrollTo({ left: i * w, behavior: 'smooth' });
        else rail.scrollLeft = i * w;
        active = i; render();
      });
    });

    render();
    return { measure: measure, render: render };
  }

  function init() {
    var journeys = Array.prototype.slice.call(document.querySelectorAll('.journey'))
      .map(setupJourney).filter(Boolean);

    // Keep pitch/active in sync on resize.
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { journeys.forEach(function (j) { j.measure(); }); }, 120);
    });

    // Nudge muted autoplay videos that some browsers pause until interaction.
    Array.prototype.slice.call(document.querySelectorAll('video')).forEach(function (v) {
      v.muted = true;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
