/* CHR Solution — site vitrine
   Interactions : menu mobile, scroll reveal, toggle tarifs, hero video loop
*/
(function() {
  'use strict';

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-main');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Pricing toggle (module selector)
  const tabs = document.querySelectorAll('[data-pricing-tab]');
  const panels = document.querySelectorAll('[data-pricing-panel]');
  if (tabs.length && panels.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.pricingTab;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.dataset.pricingPanel === target));
      });
    });
  }

  // Current year
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // Hero video carousel — crossfade entre plusieurs vidéos en boucle
  const heroCarousel = document.querySelector('[data-hero-carousel]');
  if (heroCarousel) {
    const videos = heroCarousel.querySelectorAll('video');
    let current = 0;

    function showNext() {
      const next = (current + 1) % videos.length;
      const nextVideo = videos[next];
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
      nextVideo.classList.add('is-active');
      // Retire la classe active de l'ancienne après transition CSS
      setTimeout(() => {
        videos[current].classList.remove('is-active');
        videos[current].pause();
        current = next;
      }, 1200);
    }

    // Précharger et démarrer la première vidéo
    videos[0].classList.add('is-active');
    videos[0].play().catch(() => {});

    // Écoute fin de chaque vidéo pour enchaîner
    videos.forEach((v, i) => {
      v.addEventListener('ended', showNext);
      // Précharger les suivantes en silence
      if (i > 0) v.load();
    });

    // Fallback de sécurité : si `ended` ne se déclenche pas (vidéo bouclée par erreur ou erreur réseau), toggle toutes les 8s
    setInterval(() => {
      if (videos[current].paused || videos[current].currentTime > videos[current].duration - 0.3) {
        showNext();
      }
    }, 9000);
  }
})();
