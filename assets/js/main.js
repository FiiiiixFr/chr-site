/* CHR Solution — site vitrine
   Interactions minimales : menu mobile, scroll reveal, toggle tarifs
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

  // Current year footer
  const y = document.querySelectorAll('[data-year]');
  y.forEach(el => el.textContent = new Date().getFullYear());
})();
