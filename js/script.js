window.TRAD_SITE = window.TRAD_SITE || {};

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function navToggleInit() {
    const topbar = document.querySelector('.topbar');
    const btn = document.querySelector('.nav-toggle');
    if (!topbar || !btn) return;
    btn.addEventListener('click', () => {
      const open = topbar.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!topbar.contains(e.target)) {
        topbar.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function footerYear() {
    const y = document.querySelector('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  }

  function copyText(text, button) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      const prev = button.textContent;
      button.textContent = 'Copié';
      setTimeout(() => (button.textContent = prev), 1000);
    }).catch(() => {});
  }

  function renderHome() {
    const data = window.TRAD_SITE_DATA;
    if (!data) return;

    const botGrid = document.querySelector('[data-home-bots]');
    if (botGrid) {
      botGrid.innerHTML = data.bots.map(bot => `
        <article class="card bot-card">
          <img src="${esc(bot.avatar)}" alt="${esc(bot.name)}">
          <div>
            <h3>${esc(bot.name)}</h3>
            <p class="sub">${esc(bot.tagline)}</p>
            <p>${esc(bot.short)}</p>
            <div class="tags">
              ${(bot.highlights || []).map(t => `<span class="pill">${esc(t)}</span>`).join('')}
            </div>
            <div class="hero-actions" style="margin-top:.8rem">
              <a class="btn btn-secondary btn-sm" href="${esc(bot.page)}">Voir la fiche</a>
              <a class="btn btn-primary btn-sm" href="${esc(bot.invite)}" target="_blank" rel="noopener noreferrer">Tester ${esc(bot.name)}</a>
            </div>
          </div>
        </article>
      `).join('');
    }

    const compareWrap = document.querySelector('[data-compare-table]');
    if (compareWrap) {
      const rows = [
        ['Rôle principal', ...data.bots.map(b => b.tagline)],
        ['Fonctions publiques', ...data.bots.map(b => `${b.features.length} fonctionnalités`)],
        ['Commandes publiques', ...data.bots.map(b => `${b.commands.length} entrées`)],
        ['DM', ...data.bots.map(b => b.support.dm ? 'Oui' : 'Non')],
        ['Serveurs', ...data.bots.map(b => b.support.server ? 'Oui' : 'Non')],
        ['Premium', ...data.bots.map(b => b.planHint || 'Optionnel')],
      ];
      compareWrap.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Critère</th>
              ${data.bots.map(b => `<th>${esc(b.name)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      `;
    }
  }

  function buildFeatureCards(bot) {
    const el = document.querySelector('[data-features-grid]');
    if (!el) return;
    el.innerHTML = bot.features.map(f => `
      <article class="card">
        <div class="icon">${esc(f.icon || '✨')}</div>
        <h3>${esc(f.title)}</h3>
        <p>${esc(f.text)}</p>
      </article>
    `).join('');
  }

  function buildKpis(bot) {
    const row = document.querySelector('[data-bot-kpis]');
    if (!row) return;
    const publicCount = bot.commands.length;
    const slashCount = bot.commands.filter(c => c.type === 'slash').length;
    const ctxCount = bot.commands.filter(c => c.type === 'context').length;
    const groupCount = bot.commands.filter(c => c.type === 'group').length;
    const items = [
      [`${publicCount}`, 'Entrées publiques'],
      [`${slashCount}`, 'Slash commands'],
      [`${ctxCount}`, 'Menus contextuels'],
      [`${groupCount}`, 'Groupes de commandes'],
    ];
    row.innerHTML = items.map(([v, l]) => `
      <div class="kpi"><strong>${esc(v)}</strong><span>${esc(l)}</span></div>
    `).join('');
  }

  function renderCommandCard(cmd) {
    const tags = [
      {label: cmd.type === 'slash' ? 'Slash' : cmd.type === 'context' ? 'Context menu' : 'Groupe', cls: cmd.type === 'context' ? 'context' : ''},
      ...(cmd.scope?.includes('Serveur') ? [{label:'Serveur', cls:'server'}] : []),
      ...(cmd.scope?.includes('DM') ? [{label:'DM', cls:'dm'}] : []),
      ...(cmd.premium ? [{label:'Premium', cls:'premium'}] : []),
    ];

    const params = (cmd.params || []).length
      ? (cmd.params || []).map(p => `
          <div class="param">
            <code>${esc(p.name)}</code>${p.required === false ? ' <span class="muted">(optionnel)</span>' : ''}
            ${p.type ? `<small>Type : ${esc(p.type)}</small>` : ''}
            ${p.desc ? `<small>${esc(p.desc)}</small>` : ''}
          </div>
        `).join('')
      : '<p class="muted" style="margin:0">Aucun paramètre à saisir.</p>';

    const uses = (cmd.uses || []).map(u => `<li>${esc(u)}</li>`).join('') || '<li>Aucun détail supplémentaire.</li>';
    const notes = (cmd.notes || []).map(u => `<li>${esc(u)}</li>`).join('') || '<li>—</li>';

    const dataTags = [cmd.type, ...(cmd.tags || [])].join(' ').toLowerCase();
    const commandText = [cmd.name, cmd.summary, ...(cmd.uses || []), ...(cmd.tags || [])].join(' ').toLowerCase();

    return `
      <article class="command-card" data-command-tags="${esc(dataTags)}" data-command-text="${esc(commandText)}">
        <div class="command-head">
          <div>
            <div class="command-title-row">
              <span class="command-name">${esc(cmd.name)}</span>
              ${tags.map(t => `<span class="pill ${esc(t.cls || '')}">${esc(t.label)}</span>`).join('')}
            </div>
            <div class="command-desc">${esc(cmd.summary)}</div>
          </div>
          <div class="command-actions">
            <button type="button" class="btn btn-secondary btn-sm copy-command">Copier</button>
            <button type="button" class="btn btn-ghost btn-sm toggle-card">Détails <span class="toggle-details">⌄</span></button>
          </div>
        </div>
        <div class="command-details">
          <div class="command-details-grid">
            <div>
              <div class="details-box">
                <h4>Paramètres publics</h4>
                <div class="param-list">${params}</div>
              </div>
            </div>
            <div style="display:grid; gap:.65rem">
              <div class="details-box">
                <h4>Ce que fait la commande</h4>
                <ul>${uses}</ul>
              </div>
              <div class="details-box">
                <h4>Notes d’usage</h4>
                <ul>${notes}</ul>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderCommandExplorer(bot) {
    const list = document.querySelector('[data-command-list]');
    if (!list) return;
    list.innerHTML = bot.commands.map(renderCommandCard).join('');

    list.addEventListener('click', (e) => {
      const btnCopy = e.target.closest('.copy-command');
      if (btnCopy) {
        const card = btnCopy.closest('.command-card');
        const name = $('.command-name', card)?.textContent?.trim() || '';
        copyText(name, btnCopy);
        return;
      }
      const toggle = e.target.closest('.toggle-card');
      if (toggle) {
        const card = toggle.closest('.command-card');
        card.classList.toggle('open');
      }
    });

    const search = document.querySelector('[data-command-search]');
    const chips = $$('.chip[data-filter]');
    const empty = document.querySelector('[data-no-results]');

    const applyFilter = () => {
      const q = (search?.value || '').trim().toLowerCase();
      const activeChip = document.querySelector('.chip.active[data-filter]');
      const filter = activeChip?.dataset.filter || 'all';
      let shown = 0;

      $$('.command-card', list).forEach(card => {
        const text = card.dataset.commandText || '';
        const tags = card.dataset.commandTags || '';
        const matchesText = !q || text.includes(q);
        const matchesType = filter === 'all' || tags.includes(filter);
        const show = matchesText && matchesType;
        card.classList.toggle('hidden', !show);
        if (show) shown++;
      });

      if (empty) empty.classList.toggle('hidden', shown !== 0);
    };

    search?.addEventListener('input', applyFilter);
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyFilter();
    }));

    applyFilter();
  }

  function renderFaq(bot) {
    const wrap = document.querySelector('[data-faq-list]');
    if (!wrap || !bot.faq?.length) return;
    wrap.innerHTML = bot.faq.map((item, i) => `
      <div class="faq-item ${i === 0 ? 'open' : ''}">
        <button type="button" class="faq-q">
          <span>${esc(item.q)}</span>
          <span class="caret">⌄</span>
        </button>
        <div class="faq-a">${esc(item.a)}</div>
      </div>
    `).join('');

    wrap.addEventListener('click', (e) => {
      const q = e.target.closest('.faq-q');
      if (!q) return;
      q.closest('.faq-item').classList.toggle('open');
    });
  }

  function renderBotPage() {
    const slug = document.body.dataset.botPage;
    if (!slug) return;
    const data = window.TRAD_SITE_DATA;
    const bot = data?.bots?.find(b => b.slug === slug);
    if (!bot) return;

    document.title = `${bot.name} · TradLinker.com`;

    const nameEls = $$('[data-bot-name]');
    nameEls.forEach(el => el.textContent = bot.name);
    const desc = $('[data-bot-description]');
    if (desc) desc.textContent = bot.fullIntro;
    const role = $('[data-bot-role]');
    if (role) role.textContent = bot.role;
    const avatar = $('[data-bot-avatar]');
    if (avatar) { avatar.src = bot.avatar; avatar.alt = bot.name; }
    const invites = $$('[data-bot-invite]');
    invites.forEach(a => a.href = bot.invite);
    const ctaTexts = $$('[data-bot-cta-text]');
    ctaTexts.forEach(el => el.textContent = bot.cta || `Ajouter ${bot.name}`);
    const support = $('[data-bot-support-link]');
    if (support && bot.supportServer) support.href = bot.supportServer;

    const meta = $('[data-bot-meta]');
    if (meta) {
      const pills = [];
      if (bot.support?.server) pills.push('<span class="pill server">Serveurs</span>');
      if (bot.support?.dm) pills.push('<span class="pill dm">DM</span>');
      if (bot.planHint) pills.push(`<span class="pill premium">${esc(bot.planHint)}</span>`);
      (bot.metaTags || []).forEach(t => pills.push(`<span class="pill">${esc(t)}</span>`));
      meta.innerHTML = pills.join('');
    }

    const publicNotes = $('[data-public-notes]');
    if (publicNotes && bot.publicNotes) {
      publicNotes.innerHTML = bot.publicNotes.map(n => `<li>${esc(n)}</li>`).join('');
    }

    buildKpis(bot);
    buildFeatureCards(bot);
    renderCommandExplorer(bot);
    renderFaq(bot);
  }

  function initSmoothAnchorActive() {
    const links = $$('[data-section-link]');
    if (!links.length) return;
    links.forEach(a => a.addEventListener('click', () => {
      links.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    }));
  }

  navToggleInit();
  footerYear();
  renderHome();
  renderBotPage();
  initSmoothAnchorActive();
})();
