// Force the custom domain when the GitHub Pages project URL is used
(function () {
  const githubHost = 'tradowner.github.io';
  const customDomain = 'https://tradlinker.com';

  if (window.location.hostname !== githubHost) return;

  let path = window.location.pathname || '/';

  // Convert /tradlinker.com/fr/ -> /fr/
  path = path.replace(/^\/tradlinker\.com(?=\/|$)/, '') || '/';

  const target = customDomain + path + window.location.search + window.location.hash;
  window.location.replace(target);
})();

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  const year = document.getElementById('year');
  const pagePanels = [...document.querySelectorAll('.page-panel')];
  const pageMap = new Map(pagePanels.map(p => [p.id, p]));
  const pageLinks = [...document.querySelectorAll('a[href^="#"]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const languageLinks = [...document.querySelectorAll('.lang-option[href]')];
  languageLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const target = link.getAttribute('href');
      if (!target) return;

      // Keep the active home section when changing language, exactly like
      // the previous select-based language switcher did.
      const segments = window.location.pathname.split('/').filter(Boolean);
      const onLocaleHome = segments.length === 1;
      const hash = onLocaleHome ? (window.location.hash || '') : '';
      if (!hash) return;

      event.preventDefault();
      window.location.assign(target + hash);
    });
  });

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
      current.classList.add('panel-hidden');
    }

    next.classList.remove('panel-hidden');
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

  // Init hidden state: use CSS class rather than the HTML hidden attribute, so content remains renderable in the DOM.
  pagePanels.forEach(panel => {
    if (panel.classList.contains('is-active')) {
      panel.classList.remove('panel-hidden');
    } else {
      panel.classList.add('panel-hidden');
    }
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
    if (!targetId) return;

    tile.style.cursor = 'pointer';

    const openTarget = () => {
      if (pageMap.has(targetId)) {
        showPage(targetId, { updateHash: true, scrollTop: true });
        return;
      }

      const locale = document.documentElement.lang.toLowerCase().split('-')[0] || 'en';
      window.location.assign(`/${locale}/${targetId}/`);
    };

    tile.addEventListener('click', openTarget);
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTarget();
      }
    });
  });

  // Offres: boutons -> tuiles explicatives (une seule visible à la fois, sans attribut HTML hidden)
  const offerToggleButtons = [...document.querySelectorAll('[data-offer-toggle]')];
  const offerPanels = [...document.querySelectorAll('[data-offer-panel]')];
  const offerPanelMap = new Map(offerPanels.map(panel => [panel.getAttribute('data-offer-panel'), panel]));

  function showOfferPanel(panelId) {
    if (!offerPanelMap.has(panelId)) return;

    offerPanels.forEach(panel => {
      const isTarget = panel.getAttribute('data-offer-panel') === panelId;
      if (isTarget) {
        panel.classList.remove('offer-panel-hidden');
      } else {
        panel.classList.add('offer-panel-hidden');
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
    const rawHash = location.hash || '';

    if (!rawHash && initial) {
      markActiveLink(currentPageId);
      return;
    }

    const targetId = (rawHash || '#home').slice(1);
    if (pageMap.has(targetId)) {
      showPage(targetId, { updateHash: false, scrollTop: !initial });
    } else if (initial) {
      markActiveLink(currentPageId);
    }
  }

  window.addEventListener('hashchange', () => handleHashChange(false));
  handleHashChange(true);
});
