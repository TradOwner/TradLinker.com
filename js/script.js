document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  const year = document.getElementById('year');
  const pagePanels = [...document.querySelectorAll('.page-panel')];
  const pageMap = new Map(pagePanels.map(p => [p.id, p]));
  const pageLinks = [...document.querySelectorAll('a[href^="#"]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = new Date().getFullYear();

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Reveal on scroll (kept from original)
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  let currentPageId = pagePanels.find(p => p.classList.contains('is-active'))?.id || 'home';

  function closeMenu() {
    if (!menuBtn || !nav) return;
    menuBtn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }

  function markActiveLink(pageId) {
    const normalized = '#' + pageId;
    document.querySelectorAll('#siteNav a[href^="#"]').forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === normalized);
    });
  }

  function showPage(pageId, opts = {}) {
    const next = pageMap.get(pageId);
    if (!next) return false;
    const current = pageMap.get(currentPageId);

    if (current && current !== next) {
      current.classList.remove('is-active', 'entering');
      current.setAttribute('hidden', '');
    }

    next.removeAttribute('hidden');
    next.classList.add('is-active');

    if (!reduceMotion) {
      next.classList.remove('entering');
      void next.offsetWidth; // restart animation
      next.classList.add('entering');
    }

    currentPageId = pageId;
    markActiveLink(pageId);
    closeMenu();

    if (opts.updateHash !== false && location.hash !== '#' + pageId) {
      history.replaceState(null, '', '#' + pageId);
    }

    if (opts.scrollTop !== false) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    return true;
  }

  // Init hidden state
  pagePanels.forEach(panel => {
    if (!panel.classList.contains('is-active')) panel.setAttribute('hidden', '');
  });

  // Click navigation / internal page links
  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetId = href.slice(1);

      if (!pageMap.has(targetId)) {
        closeMenu();
        return;
      }

      e.preventDefault();
      showPage(targetId, { updateHash: true, scrollTop: true });
    });
  });


  // Clickable home tiles -> dedicated bot pages
  const homeTiles = [...document.querySelectorAll('[data-card-page]')];
  homeTiles.forEach(tile => {
    const targetId = tile.getAttribute('data-card-page');
    if (!targetId || !pageMap.has(targetId)) return;

    tile.style.cursor = 'pointer';

    tile.addEventListener('click', () => {
      showPage(targetId, { updateHash: true, scrollTop: true });
    });

    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showPage(targetId, { updateHash: true, scrollTop: true });
      }
    });
  });



  // Offres: boutons -> tuiles explicatives (une seule visible à la fois)
  const offerToggleButtons = [...document.querySelectorAll('[data-offer-toggle]')];
  const offerPanels = [...document.querySelectorAll('[data-offer-panel]')];
  const offerPanelMap = new Map(offerPanels.map(panel => [panel.getAttribute('data-offer-panel'), panel]));

  function showOfferPanel(panelId) {
    if (!offerPanelMap.has(panelId)) return;

    offerPanels.forEach(panel => {
      const isTarget = panel.getAttribute('data-offer-panel') === panelId;
      if (isTarget) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });

    offerToggleButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-offer-toggle') === panelId;
      btn.classList.toggle('is-active', isActive);
      btn.classList.toggle('offer-toggle', true);
      btn.setAttribute('aria-expanded', String(isActive));
    });

    const activePanel = offerPanelMap.get(panelId);
    if (activePanel) {
      activePanel.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }

  offerToggleButtons.forEach(btn => {
    btn.classList.add('offer-toggle');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-offer-toggle');
      if (!target) return;
      showOfferPanel(target);
    });
  });
  function handleHashChange(initial = false) {
    const targetId = (location.hash || '#home').slice(1);
    if (pageMap.has(targetId)) {
      showPage(targetId, { updateHash: false, scrollTop: !initial });
    } else if (initial) {
      showPage('home', { updateHash: false, scrollTop: false });
    }
  }

  window.addEventListener('hashchange', () => handleHashChange(false));
  handleHashChange(true);
});
