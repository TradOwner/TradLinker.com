(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Year
  const y = $('#year');
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile menu
  const menuToggle = $('#menuToggle');
  const nav = $('#siteNav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
    $$('#siteNav a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Reveal on scroll
  const revealEls = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Active nav highlight
  const navLinks = $$('#siteNav a[href^="#"]');
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObserver.observe(s));

  // Counter animation
  const counters = $$('.counter');
  const animateCounter = (el) => {
    const target = Number(el.dataset.count || 0);
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counterIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIo.observe(c));

  // Bot tabs
  const tabs = $$('.bot-tab');
  const panels = $$('.bot-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.bot;
      tabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === key));
    });
  });

  // Command filters
  $$('.command-filter').forEach(input => {
    input.addEventListener('input', () => {
      const listKey = input.dataset.filterFor;
      const q = input.value.trim().toLowerCase();
      const list = document.querySelector(`[data-command-list="${listKey}"]`);
      if (!list) return;
      $$('.cmd', list).forEach(item => {
        const txt = item.textContent?.toLowerCase() || '';
        item.classList.toggle('is-hidden', q && !txt.includes(q));
      });
    });
  });

  // Access simulator
  const state = {
    onServer: true,
    serverPremium: false,
    userPlatinium: false,
  };

  const nodes = {
    onServer: $('#ctxServer'),
    serverPremium: $('#ctxServerPremium'),
    userPlatinium: $('#ctxUserPlatinium'),
    summary: $('#simSummary'),
    featureGrid: $('#featureGrid'),
    presetFree: $('#presetFree'),
    presetPremium: $('#presetPremium'),
    presetPlatinium: $('#presetPlatinium'),
  };

  const features = [
    {
      title: 'TradLinker (groupes/salons liés)',
      desc: 'Le bot principal reste disponible. Premium augmente les limites (10 groupes / 15 salons).',
      eval: s => {
        if (!s.onServer) return ['warn', 'Utilisable surtout en serveur', 'TradLinker est pensé pour les salons de serveur.'];
        return s.serverPremium
          ? ['ok', 'Premium serveur', 'Limites étendues : jusqu’à 10 groupes et 15 salons par groupe.']
          : ['warn', 'Free serveur', 'Limites Free : 1 groupe et 5 salons par groupe.'];
      }
    },
    {
      title: 'TradCoord (welcome / règles / coordination)',
      desc: 'Extension d’organisation et onboarding multilingue.',
      eval: s => {
        if (!s.onServer) return ['no', 'Indisponible en DM', 'TradCoord ne sert qu’en serveur.'];
        return s.serverPremium
          ? ['ok', 'Disponible', 'TradCoord est accessible sur les serveurs Premium.']
          : ['no', 'Serveur Premium requis', 'TradCoord est réservé aux serveurs Premium.'];
      }
    },
    {
      title: 'TradAssist en DM',
      desc: 'translate_message, translate_and_send, multilang post (selon quotas/plan).',
      eval: s => {
        if (s.onServer) return ['warn', 'Mode serveur sélectionné', 'Passe en mode DM pour simuler l’usage assistant personnel.'];
        return s.userPlatinium
          ? ['ok', 'Illimité (supporté)', 'Fonctions supportées TradAssist en DM sans quotas.']
          : ['warn', 'Quotas Free', 'DM : message 5 / send 5 / post 2 par mois.'];
      }
    },
    {
      title: 'TradAssist sur serveur',
      desc: 'Traduction message/canal, posts multilang, drapeaux, etc. (fonctions supportées).',
      eval: s => {
        if (!s.onServer) return ['no', 'Indisponible en DM', 'Cette carte concerne les usages TradAssist en serveur.'];
        if (s.serverPremium) return ['ok', 'Illimité (supporté)', 'Le Premium serveur lève les quotas TradAssist supportés.'];
        if (s.userPlatinium) return ['ok', 'Illimité pour toi (supporté)', 'Le Platinium utilisateur bypass les quotas TradAssist supportés pour ton usage.'];
        return ['warn', 'Quotas Free', 'Exemples : message 20 • send 10 • channel 5 • post 5 • flag 20 / mois / serveur.'];
      }
    },
    {
      title: 'Réaction drapeau (TradAssist)',
      desc: 'Traduction par réaction avec auto-suppression configurable (flagreact).',
      eval: s => {
        if (!s.onServer) return ['no', 'Serveur uniquement', 'La traduction par réaction drapeau concerne les salons de serveur.'];
        if (s.serverPremium) return ['ok', 'Illimité (supporté)', 'Quotas levés via Premium serveur.'];
        if (s.userPlatinium) return ['ok', 'Illimité pour l’utilisateur', 'Le bypass utilisateur Platinium s’applique aux événements de serveur supportés.'];
        return ['warn', 'Quota Free', '20 traductions par réactions / mois / serveur (Free).'];
      }
    },
    {
      title: 'Bouton Translate des posts multilang',
      desc: 'Limite appliquée par message/post en Free.',
      eval: s => {
        if (s.serverPremium || s.userPlatinium) return ['ok', 'Illimité', 'Les clics sur le bouton Translate ne sont plus limités sur les fonctions supportées.'];
        return ['warn', '20 clics / post / mois', 'Limite Free par bouton (message).'];
      }
    }
  ];

  const renderSim = () => {
    state.onServer = !!nodes.onServer?.checked;
    state.serverPremium = !!nodes.serverPremium?.checked;
    state.userPlatinium = !!nodes.userPlatinium?.checked;

    if (nodes.serverPremium) {
      nodes.serverPremium.disabled = !state.onServer;
      if (!state.onServer) nodes.serverPremium.checked = false;
    }

    if (nodes.summary) {
      const mode = state.onServer ? 'Serveur' : 'DM / message privé';
      const planServer = state.onServer ? (state.serverPremium ? 'Premium serveur ✅' : 'Serveur Free') : 'N/A';
      const planUser = state.userPlatinium ? 'Utilisateur Platinium ✅' : 'Utilisateur Free';
      nodes.summary.innerHTML = `
        <p><strong>Mode :</strong> ${mode}</p>
        <p><strong>Statut serveur :</strong> ${planServer}</p>
        <p><strong>Statut utilisateur :</strong> ${planUser}</p>
      `;
    }

    if (nodes.featureGrid) {
      nodes.featureGrid.innerHTML = '';
      features.forEach(f => {
        const [kind, label, msg] = f.eval(state);
        const card = document.createElement('article');
        card.className = 'feature-card';
        card.innerHTML = `
          <div class="status ${kind}">${label}</div>
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
          <p style="margin-top:6px">${msg}</p>
        `;
        nodes.featureGrid.appendChild(card);
      });
    }
  };

  ['onServer', 'serverPremium', 'userPlatinium'].forEach(k => {
    nodes[k]?.addEventListener('change', renderSim);
  });
  nodes.presetFree?.addEventListener('click', () => {
    if (nodes.onServer) nodes.onServer.checked = true;
    if (nodes.serverPremium) nodes.serverPremium.checked = false;
    if (nodes.userPlatinium) nodes.userPlatinium.checked = false;
    renderSim();
  });
  nodes.presetPremium?.addEventListener('click', () => {
    if (nodes.onServer) nodes.onServer.checked = true;
    if (nodes.serverPremium) nodes.serverPremium.checked = true;
    if (nodes.userPlatinium) nodes.userPlatinium.checked = false;
    renderSim();
  });
  nodes.presetPlatinium?.addEventListener('click', () => {
    if (nodes.onServer) nodes.onServer.checked = false;
    if (nodes.serverPremium) nodes.serverPremium.checked = false;
    if (nodes.userPlatinium) nodes.userPlatinium.checked = true;
    renderSim();
  });
  renderSim();

  // Compare table filter
  const compareFilter = $('#compareFilter');
  compareFilter?.addEventListener('change', () => {
    const value = compareFilter.value;
    $$('.compare-table tbody tr').forEach(row => {
      const cat = row.getAttribute('data-cat');
      row.classList.toggle('hidden-row', value !== 'all' && cat !== value);
    });
  });
})();
