/* CHR Solution — site vitrine
   Interactions : menu mobile, scroll reveal, toggle tarifs, hero video loop
*/
(function() {
  'use strict';

  // Mobile drawer menu (slide from right)
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-main');
  if (toggle && nav) {
    // Inject backdrop & close button si pas déjà là
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }
    let closeBtn = nav.querySelector('.drawer-close');
    if (!closeBtn) {
      closeBtn = document.createElement('button');
      closeBtn.className = 'drawer-close';
      closeBtn.setAttribute('aria-label', 'Fermer le menu');
      closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      nav.insertBefore(closeBtn, nav.firstChild);
    }

    // Cloner les actions (Aide, Se connecter, Démo, FR/EN) dans le drawer
    const navActions = document.querySelector('.nav-actions');
    if (navActions && !nav.querySelector('.drawer-actions')) {
      const drawerActions = document.createElement('div');
      drawerActions.className = 'drawer-actions';
      navActions.querySelectorAll('a.btn, .lang-switch').forEach(el => {
        const clone = el.cloneNode(true);
        clone.classList.remove('btn-ghost'); // Aide passe en lien simple dans drawer
        drawerActions.appendChild(clone);
      });
      nav.appendChild(drawerActions);
    }

    const openDrawer = () => {
      nav.classList.add('open');
      backdrop.classList.add('is-open');
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
    };
    const closeDrawer = () => {
      nav.classList.remove('open');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      nav.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    backdrop.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    // Swipe-to-close: swipe droite sur le drawer le ferme
    let touchStartX = 0;
    nav.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    nav.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (dx > 60) closeDrawer();
    }, { passive: true });

    // Swipe-from-edge pour ouvrir : swipe depuis le bord droit
    let edgeStartX = null;
    document.addEventListener('touchstart', e => {
      const t = e.touches[0];
      if (t.clientX > window.innerWidth - 20) edgeStartX = t.clientX;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      if (edgeStartX === null) return;
      const dx = e.changedTouches[0].clientX - edgeStartX;
      if (dx < -60 && !nav.classList.contains('open')) openDrawer();
      edgeStartX = null;
    }, { passive: true });
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
