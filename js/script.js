
const SITE_LINKS = {
  tradlinkerInvite: "https://discord.com/oauth2/authorize?client_id=1323028790770798673&scope=bot",
  tradcoordInvite: "#",
  tradassistInvite: "https://discord.com/oauth2/authorize?client_id=1419765128597078218",
  supportServer: "https://discord.gg/aNZYbRfBxq",
  donate: "https://donate.stripe.com/7sIeXJaO748k2t2fZ0",
  premiumServer: "https://buy.stripe.com/eVa9DpcWf6gsd7GfYY"
};

const BOTS = {
  tradlinker: {
    id: "tradlinker",
    short: "TL",
    name: "TradLinker",
    accentClass: "tl",
    accessBadge: "Free + Premium",
    accessStatus: {
      free: "✅ Disponible",
      premium: "✅ Étendu",
      platinium: "➖ N/A",
    },
    tagline: "Bot principal : relie les salons par langue et diffuse les messages traduits entre canaux liés.",
    description:
      "TradLinker est le cœur de l’écosystème. Il permet de créer des groupes de salons multilingues, d’y associer une langue par salon, puis de relayer les échanges avec traduction. Le code inclut aussi des sondages cross-canaux, un mode premium serveur et des outils d’exploitation (workers, maintenance, logs) côté admin.",
    stats: [
      "108 langues configurées (fichier languages.py)",
      "Free: 1 groupe / 5 salons par groupe",
      "Premium: 10 groupes / 15 salons par groupe",
      "Sondages multi-salons + suppression de sondages",
    ],
    features: [
      "Groupes de salons liés avec une langue attribuée par salon",
      "Ajout / retrait / suppression de groupes via slash commands",
      "Aide de configuration intégrée (/help) avec parcours guidé",
      "Commande de visualisation de la configuration (/6-show_groups)",
      "Sondages multi-salons traduits (création + suppression)",
      "Contexte “Show reactions” pour visualiser les réactions sur un message",
      "Gestion des limites free/premium et achat Premium serveur",
      "Pipeline de traitement avec workers, queue et protections anti-blocage (ops/admin)",
    ],
    useCases: [
      "Serveur communautaire avec salons FR / EN / ES reliés",
      "Support multilingue où chaque langue garde son salon dédié",
      "Animation de communauté via sondages diffusés dans les salons liés",
      "Structure scalable pour serveurs plus complexes en mode premium",
    ],
    commandPreview: [
      "/2-create_group", "/3-add_channel", "/4-remove_channel", "/5-delete_group", "/6-show_groups", "/1-create_poll"
    ],
    notes: [
      "Le code de /help mentionne explicitement l’accès à TradCoord pour les serveurs premium.",
      "Le plan premium TradLinker est le point d’entrée pour activer tout l’écosystème côté serveur.",
    ],
  },
  tradcoord: {
    id: "tradcoord",
    short: "TC",
    name: "TradCoord",
    accentClass: "tc",
    accessBadge: "Premium serveur uniquement",
    accessStatus: {
      free: "❌ Non",
      premium: "✅ Oui",
      platinium: "➖ N/A",
    },
    tagline: "Extension d’organisation premium : onboarding, règles, rôles de langue et coordination interactive.",
    description:
      "TradCoord sert à structurer l’accès aux salons linguistiques sur les serveurs premium. Il gère les messages de bienvenue, l’acceptation des règles, les rôles linguistiques et des messages de coordination interactifs (création, édition, suppression et nettoyage des rôles/permissions).",
    stats: [
      "Commandes onboarding / bienvenue / règles / coordination",
      "Restauration de vues persistantes après redémarrage",
      "Messages interactifs avec rôles de langue",
      "Accès restreint aux serveurs premium",
    ],
    features: [
      "Message de bienvenue configurable avec placeholders ({user}, {channel})",
      "Sélection de salon mentionné + bouton “Go to channel” pour guider les nouveaux",
      "Message d’acceptation des règles avec bouton persistant et attribution de rôle",
      "Message de coordination interactif pour la gestion des rôles de langue",
      "Édition de messages de coordination existants",
      "Suppression de scopes de coordination avec nettoyage des rôles et permissions",
      "Vues persistantes restaurées au redémarrage du bot",
      "Commandes de maintenance owner-only pour purge / désinstallation non premium",
    ],
    useCases: [
      "Onboarding premium propre vers les salons linguistiques",
      "Self-assign de rôles par langue sans ping massif",
      "Serveur traduisant automatiquement mais avec accès contrôlé par rôles",
      "Nettoyage sécurisé des rôles quand la structure change",
    ],
    commandPreview: [
      "/1-set_welcome", "/1-clear_welcome", "/2-set_rules_message", "/3-coordination", "/3-edit_coordination", "/3-delete_coordination"
    ],
    notes: [
      "TradCoord vérifie dans le code que le serveur est premium avant d’activer ses fonctions principales.",
      "Très pertinent pour compléter TradLinker sur des serveurs multi-langues structurés.",
    ],
  },
  tradassist: {
    id: "tradassist",
    short: "TA",
    name: "TradAssist",
    accentClass: "ta",
    accessBadge: "Illimité Premium serveur ou Platinium utilisateur",
    accessStatus: {
      free: "✅ Quotas mensuels",
      premium: "✅ Illimité (serveur premium)",
      platinium: "✅ Illimité (utilisateur)",
    },
    tagline: "Assistant personnel de traduction + extensions de traduction rapides pour serveurs et DMs.",
    description:
      "TradAssist couvre la traduction ponctuelle, les outils contextuels, les posts multilingues et la traduction par réaction. Il est utilisable gratuitement avec quotas mensuels, puis en illimité sur les serveurs premium ou pour les utilisateurs Platinium (avec couverture DM et levée de limites selon les fonctionnalités).",
    stats: [
      "111 langues dans le mapping principal",
      "83 drapeaux reconnus pour la traduction par réaction",
      "Context menus pour message et canal",
      "Platinium ≈ 3,49 €/mois (vu dans le code Stripe)",
    ],
    features: [
      " /1-translate_and_send : modal langue + texte, envoi dans le salon ou preview en DM",
      " /3-translate_channel : traduction des N derniers messages d’un canal avec pagination (max 100)",
      "Context menu “Translate channel”",
      " /4-translate_message + context menu “Translate message”",
      "Posts tutoriels multilingues avec bouton “Translate” (création / édition)",
      "Traduction par réaction drapeau avec messages silencieux auto-supprimés",
      "Réglages de délai auto-delete (/5-flagreact set_delay/show/list_flags)",
      "Gestion des quotas free, Premium serveur, Platinium utilisateur",
    ],
    useCases: [
      "Traduire rapidement un message précis via clic droit/context menu",
      "Préparer un post multilingue avec bouton de traduction réutilisable",
      "Traduire des canaux historiques lors d’un raid d’onboarding",
      "Réactions drapeaux pour traductions éphémères sans polluer le canal",
    ],
    commandPreview: [
      "/1-translate_and_send", "/2-multilang_post_create", "/3-translate_channel", "/4-translate_message", "/5-flagreact set_delay", "/6-buy_platinium"
    ],
    notes: [
      "Les quotas gratuits mensuels sont codés dans utils/limits.py (serveur + DM + bouton tutoriel).",
      "Le statut Platinium donne l’illimité en DM sur certaines features et lève aussi des limites en serveur.",
    ],
  },
};

const COMPARISON_CARDS = [
  {
    id: "free",
    title: "Free",
    subtitle: "Découverte et usage de base",
    items: [
      { label: "TradLinker (bot principal)", state: "yes", value: "Oui" },
      { label: "TradCoord (organisation premium)", state: "no", value: "Non" },
      { label: "TradAssist", state: "partial", value: "Oui (quotas)" },
      { label: "TradLinker groupes / salons", state: "partial", value: "1 / 5" },
      { label: "TradAssist en DM", state: "partial", value: "Oui (quotas)" },
      { label: "Réactions drapeaux TradAssist", state: "partial", value: "Oui (quota)" },
    ],
  },
  {
    id: "premium",
    title: "Premium serveur",
    subtitle: "Pour un serveur complet et structuré",
    items: [
      { label: "TradLinker étendu", state: "yes", value: "10 groupes / 15 salons" },
      { label: "TradCoord", state: "yes", value: "Oui" },
      { label: "TradAssist sur serveur", state: "yes", value: "Illimité" },
      { label: "Onboarding / règles / rôles langue", state: "yes", value: "Oui" },
      { label: "Coordination interactive", state: "yes", value: "Oui" },
      { label: "DM TradAssist sans Platinium", state: "partial", value: "Quotas Free" },
    ],
  },
  {
    id: "platinium",
    title: "Platinium utilisateur",
    subtitle: "Puissance perso, même hors serveur premium",
    items: [
      { label: "TradAssist en DM", state: "yes", value: "Illimité" },
      { label: "TradAssist sur serveurs", state: "yes", value: "Limites levées (selon feature)" },
      { label: "TradLinker Premium serveur", state: "no", value: "Non (abonnement serveur distinct)" },
      { label: "TradCoord", state: "no", value: "Non (réservé Premium serveur)" },
      { label: "Boutons tutorial “Translate”", state: "yes", value: "Illimité" },
      { label: "Prix visible dans code", state: "partial", value: "~3,49 €/mois" },
    ],
  },
];

const COMMANDS = [
  // TradLinker
  {
    bot: "tradlinker",
    botLabel: "TradLinker",
    category: "Configuration des groupes",
    access: "Free + Premium",
    commands: [
      { name: "/help", type: "Slash", desc: "Guide de configuration TradLinker avec étapes et rappel des limites Free/Premium." },
      { name: "/2-create_group", type: "Slash", desc: "Créer un groupe de salons liés pour la traduction." },
      { name: "/3-add_channel", type: "Slash", desc: "Ajouter un salon dans un groupe et choisir sa langue via une vue de sélection." },
      { name: "/4-remove_channel", type: "Slash", desc: "Retirer un salon d’un groupe existant." },
      { name: "/5-delete_group", type: "Slash", desc: "Supprimer un groupe de salons traduits." },
      { name: "/6-show_groups", type: "Slash", desc: "Afficher la configuration actuelle des groupes et salons." },
    ],
  },
  {
    bot: "tradlinker",
    botLabel: "TradLinker",
    category: "Monétisation & support",
    access: "Free + Premium",
    commands: [
      { name: "/7-donate", type: "Slash", desc: "Lien de donation pour soutenir le projet." },
      { name: "/8-buy_premium", type: "Slash", desc: "Souscrire / gérer le Premium serveur TradLinker." },
    ],
  },
  {
    bot: "tradlinker",
    botLabel: "TradLinker",
    category: "Sondages multi-salons",
    access: "Serveur (selon config TradLinker)",
    commands: [
      { name: "/1-create_poll", type: "Slash", desc: "Créer un sondage diffusé dans les salons liés avec durée et options multiples (jusqu’à 9 réponses + images)." },
      { name: "/1-delete_poll", type: "Slash", desc: "Supprimer un sondage créé (ou admin) parmi les sondages actifs du serveur." },
      { name: "Show reactions", type: "Menu contextuel", desc: "Afficher les réactions sur un message via le menu contextuel." },
    ],
  },
  {
    bot: "tradlinker",
    botLabel: "TradLinker",
    category: "Ops / admin (owner)",
    access: "Owner only",
    commands: [
      { name: "add_premium / remove_premium", type: "Prefix", desc: "Gérer les serveurs premium (administration)." },
      { name: "transfer_premium", type: "Prefix", desc: "Transférer un abonnement premium entre serveurs." },
      { name: "maintenance_on / maintenance_off", type: "Prefix", desc: "Basculer le mode maintenance." },
      { name: "worker_info / add_worker / remove_worker / restart_worker / set_max_worker", type: "Prefix", desc: "Superviser et ajuster les workers de diffusion." },
      { name: "loglevel / logstatus / clean_save / save", type: "Prefix", desc: "Logs et maintenance de sauvegarde." },
    ],
  },

  // TradCoord
  {
    bot: "tradcoord",
    botLabel: "TradCoord",
    category: "Onboarding & accueil",
    access: "Premium serveur",
    commands: [
      { name: "/1-set_welcome", type: "Slash", desc: "Configurer un message de bienvenue via modal, avec placeholders et salon mentionné." },
      { name: "/1-clear_welcome", type: "Slash", desc: "Désactiver et supprimer la configuration de bienvenue du serveur." },
      { name: "/2-set_rules_message", type: "Slash", desc: "Publier un message d’acceptation des règles avec bouton persistant et attribution de rôle." },
    ],
  },
  {
    bot: "tradcoord",
    botLabel: "TradCoord",
    category: "Coordination linguistique",
    access: "Premium serveur",
    commands: [
      { name: "/3-coordination", type: "Slash", desc: "Créer un message interactif de gestion de rôles (groupes, multi-groupes, all groups)." },
      { name: "/3-edit_coordination", type: "Slash", desc: "Éditer un message de coordination existant." },
      { name: "/3-delete_coordination", type: "Slash", desc: "Supprimer un scope de coordination et nettoyer rôles / overwrites de façon sécurisée." },
    ],
  },
  {
    bot: "tradcoord",
    botLabel: "TradCoord",
    category: "Maintenance (owner)",
    access: "Owner only",
    commands: [
      { name: "forcer_purge", type: "Prefix", desc: "Commande de maintenance propriétaire." },
      { name: "forcer_desinstallation_non_premium", type: "Prefix", desc: "Désinstallation forcée sur serveurs non premium (maintenance)." },
    ],
  },

  // TradAssist
  {
    bot: "tradassist",
    botLabel: "TradAssist",
    category: "Traduction ponctuelle",
    access: "Free (quotas) / Premium / Platinium",
    commands: [
      { name: "/1-translate_and_send", type: "Slash", desc: "Sélection de langue puis modal de texte à traduire ; envoi dans le salon ou preview en DM." },
      { name: "/4-translate_message", type: "Slash", desc: "Traduire un message par son ID dans le canal courant (ou DM), réponse éphémère." },
      { name: "Translate message", type: "Menu contextuel", desc: "Traduire un message directement depuis le clic droit/context menu." },
    ],
  },
  {
    bot: "tradassist",
    botLabel: "TradAssist",
    category: "Traduction de canal",
    access: "Free (quota) / Premium / Platinium",
    commands: [
      { name: "/3-translate_channel", type: "Slash", desc: "Traduire les N derniers messages du salon (jusqu’à 100) avec pagination." },
      { name: "Translate channel", type: "Menu contextuel", desc: "Version contextuelle pour lancer la traduction de canal depuis un message." },
    ],
  },
  {
    bot: "tradassist",
    botLabel: "TradAssist",
    category: "Posts multilingues & tutoriels",
    access: "Free (quotas) / Premium / Platinium",
    commands: [
      { name: "/2-multilang_post_create", type: "Slash", desc: "Créer un post/tutoriel avec pièces jointes + bouton Translate persistant." },
      { name: "/2-multilang_post_edit", type: "Slash", desc: "Éditer un post multilingue existant (texte + pièces jointes)." },
    ],
  },
  {
    bot: "tradassist",
    botLabel: "TradAssist",
    category: "Réactions drapeaux",
    access: "Free (quota) / Premium / Platinium",
    commands: [
      { name: "/5-flagreact set_delay", type: "Slash group", desc: "Régler le délai d’auto-suppression (5 à 300s) des messages traduits par réaction drapeau." },
      { name: "/5-flagreact show", type: "Slash group", desc: "Afficher le délai actuel." },
      { name: "/5-flagreact list_flags", type: "Slash group", desc: "Lister les drapeaux reconnus pour la traduction par réaction." },
    ],
  },
  {
    bot: "tradassist",
    botLabel: "TradAssist",
    category: "Abonnements",
    access: "Serveur / Utilisateur",
    commands: [
      { name: "/6-buy_platinium", type: "Slash", desc: "Souscrire / gérer Platinium (usage illimité en DM sur fonctions supportées + avantages serveur)." },
      { name: "/8-buy_premium", type: "Slash", desc: "Souscrire / gérer Premium serveur (commande également exposée côté TradAssist)." },
    ],
  },
  {
    bot: "tradassist",
    botLabel: "TradAssist",
    category: "Admin (owner)",
    access: "Owner only",
    commands: [
      { name: "add_platinium / remove_platinium", type: "Prefix", desc: "Gestion administrative des utilisateurs Platinium." },
      { name: "push_usage_now", type: "Prefix", desc: "Forcer une synchronisation/flush des usages (admin)." },
    ],
  },
];

const FAQS = [
  {
    q: "Pourquoi séparer TradLinker, TradCoord et TradAssist ?",
    a: "Parce que leurs rôles sont différents : TradLinker gère le lien structurel entre salons traduits, TradCoord gère l’organisation du serveur (onboarding/rôles), et TradAssist couvre la traduction ponctuelle et personnelle. Cette séparation rend le produit plus lisible et évite de tout entasser dans un seul bot.",
  },
  {
    q: "TradCoord est-il disponible en free ?",
    a: "Non. D’après ton positionnement et le code, TradCoord est réservé aux serveurs Premium. C’est cohérent pour un module d’organisation avancée (onboarding, règles, coordination de rôles).",
  },
  {
    q: "TradAssist est-il utilisable sans serveur premium ?",
    a: "Oui, avec quotas gratuits. Et un utilisateur Platinium peut obtenir l’illimité sur les fonctionnalités prévues, y compris en DM et avec levée de certaines limites côté serveur.",
  },
  {
    q: "Que faut-il personnaliser sur ce site avant mise en ligne ?",
    a: "Les liens d’invitation (TradLinker/TradCoord/TradAssist), le lien du serveur support, ton repo GitHub/doc, tes captures d’écran, ton branding (logos/avatars) et éventuellement les tarifs/packs si tu veux les afficher publiquement.",
  },
  {
    q: "Puis-je transformer cette version en multi-pages ?",
    a: "Oui. La structure de données JS (BOTS / COMMANDS / FAQS) permet facilement de scinder en pages ‘/tradlinker’, ‘/tradcoord’, ‘/tradassist’ tout en gardant un comparatif central.",
  },
];

const BOT_IMAGES = {
  tradlinker: './image/Avatar%20Linker%20rond.png',
  tradcoord: './image/Avatar%20Orga%20rond.png',
  tradassist: './image/Avatar%20Assistant%20rond.png',
};

const PANEL_META = {
  suite: { title: 'La suite', subtitle: 'Architecture produit', badge:'🧩' },
  bots: { title: 'Bots', subtitle: 'Fiches détaillées par bot', badge:'🤖' },
  tradlinker: { title: 'TradLinker', subtitle: 'Bot principal', badge:'TL' },
  tradcoord: { title: 'TradCoord', subtitle: 'Extension d’organisation premium', badge:'TC' },
  tradassist: { title: 'TradAssist', subtitle: 'Assistant perso + extension serveur', badge:'TA' },
  offres: { title: 'Offres', subtitle: 'Free / Premium / Platinium', badge:'💳' },
  commandes: { title: 'Commandes', subtitle: 'Explorateur interactif', badge:'⌨️' },
  workflow: { title: 'Workflow', subtitle: 'Mise en place recommandée', badge:'🛠️' },
  faq: { title: 'FAQ', subtitle: 'Questions fréquentes', badge:'❓' },
  legal: { title: 'Légal', subtitle: 'Conditions & confidentialité', badge:'⚖️' },
};

const overlayState = { stack: [] };

function qs(sel, root=document) { return root.querySelector(sel); }
function All(sel, root=document) { return [...root.querySelectorAll(sel)]; }
function escapeHtml(str='') {
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function iconTick(state) {
  if (state === 'yes') return '✅';
  if (state === 'no') return '❌';
  return '⚠️';
}
function unique(arr) { return [...new Set(arr)]; }

function initBase() {
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  qs('#ctaTradLinker').href = SITE_LINKS.tradlinkerInvite;
  qs('#supportLink').href = SITE_LINKS.supportServer;
  qs('#premiumLink').href = SITE_LINKS.premiumServer;
  qs('#donateLink').href = SITE_LINKS.donate;

  const menuBtn = qs('#menuBtn');
  const nav = qs('#mainNav');
  menuBtn?.addEventListener('click', () => {
    const exp = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!exp));
    nav.classList.toggle('open');
  });

  All('[data-open]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = btn.dataset.open;
    if (!id) return;
    openPanel(id);
    menuBtn?.setAttribute('aria-expanded','false');
    nav?.classList.remove('open');
  }));

  initCounters();
  initReveal();
  initKeyboard();
  qs('#overlayBackdrop').addEventListener('click', closeTopPanel);
}

function initReveal() {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
  }), {threshold: .14});
  All('.reveal').forEach(el => io.observe(el));
}

function initCounters() {
  const els = All('[data-counter]');
  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.counter || 0);
    const start = performance.now();
    const dur = 750;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1-p,3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    io.unobserve(el);
  }), {threshold:.45});
  els.forEach(el => io.observe(el));
}

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlayState.stack.length) closeTopPanel();
  });
}

function openPanel(id) {
  if (!PANEL_META[id]) return;
  const stack = overlayState.stack;
  if (stack[stack.length-1] === id) return;
  stack.push(id);
  renderOverlay();
}
function closeTopPanel() { overlayState.stack.pop(); renderOverlay(); }
function closeToIndex(index) {
  overlayState.stack = overlayState.stack.slice(0, index+1);
  renderOverlay();
}

function renderOverlay() {
  const shell = qs('#overlayShell');
  const stackEl = qs('#overlayStack');
  const stack = overlayState.stack;
  shell.classList.toggle('open', stack.length > 0);
  shell.setAttribute('aria-hidden', String(stack.length === 0));
  stackEl.innerHTML = '';
  if (!stack.length) return;

  stack.forEach((id, idx) => {
    const panel = document.createElement('section');
    panel.className = 'overlay-panel';
    if (idx === stack.length - 2) panel.classList.add('depth-1');
    if (idx <= stack.length - 3) panel.classList.add('depth-2');
    panel.innerHTML = renderPanelScaffold(id, idx);
    stackEl.appendChild(panel);
    requestAnimationFrame(() => panel.classList.add('show'));
    hydratePanel(panel, id, idx);
  });
}

function renderPanelScaffold(id, idx) {
  const m = PANEL_META[id] || { title:id, subtitle:'', badge:'•' };
  const breadcrumb = overlayState.stack.map((pid, i) => {
    const label = PANEL_META[pid]?.title || pid;
    const cls = i === idx ? 'active' : '';
    return `<button class="icon-btn ${cls}" data-bc-index="${i}">${escapeHtml(label)}</button>`;
  }).join('');
  return `
    <div class="panel-head">
      <div class="panel-head-left">
        <div class="panel-badge">${escapeHtml(m.badge)}</div>
        <div class="panel-title-wrap">
          <h2>${escapeHtml(m.title)}</h2>
          <p>${escapeHtml(m.subtitle)}</p>
        </div>
      </div>
      <div class="panel-actions">
        <div class="crumbs">${breadcrumb}</div>
        <button class="icon-btn" data-close>Fermer</button>
      </div>
    </div>
    <div class="panel-body" data-panel-body></div>
  `;
}

function hydratePanel(panel, id, idx) {
  qs('[data-close]', panel)?.addEventListener('click', closeTopPanel);
  All('[data-bc-index]', panel).forEach(b => b.addEventListener('click', () => closeToIndex(Number(b.dataset.bcIndex))));
  const body = qs('[data-panel-body]', panel);
  body.innerHTML = renderPanelContent(id);
  wirePanelInteractions(panel, id);
}

function wirePanelInteractions(panel, id) {
  All('[data-open]', panel).forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openPanel(btn.dataset.open);
  }));
  if (id === 'commandes') initCommandExplorer(panel);
  if (id === 'legal') initLegalPanel(panel);
}

function renderPanelContent(id) {
  switch(id) {
    case 'suite': return renderSuitePanel();
    case 'bots': return renderBotsPanel();
    case 'tradlinker':
    case 'tradcoord':
    case 'tradassist': return renderBotPage(BOTS[id]);
    case 'offres': return renderOffersPanel();
    case 'commandes': return renderCommandsPanel();
    case 'workflow': return renderWorkflowPanel();
    case 'faq': return renderFaqPanel();
    case 'legal': return renderLegalPanel();
    default: return `<div class="empty">Panneau introuvable.</div>`;
  }
}

function renderSuitePanel() {
  return `
    <div class="panel-grid">
      <div class="card">
        <h3>Architecture recommandée</h3>
        <p>Tu peux présenter la suite comme un système modulaire :</p>
        <ul>
          <li><strong>TradLinker</strong> = base de traduction et de relais entre salons.</li>
          <li><strong>TradCoord</strong> = couche d’organisation (premium serveur uniquement).</li>
          <li><strong>TradAssist</strong> = assistant personnel + outils rapides de traduction côté serveur.</li>
        </ul>
        <div class="inline-actions">
          <button class="btn sm" data-open="tradlinker">Voir TradLinker</button>
          <button class="btn sm" data-open="tradcoord">Voir TradCoord</button>
          <button class="btn sm" data-open="tradassist">Voir TradAssist</button>
        </div>
      </div>
      <div class="card">
        <h3>Pourquoi une navigation overlay ?</h3>
        <p>Au lieu d’une one-page très longue, chaque section s’ouvre en panneau. On garde le contexte visuel de la page précédente tout en gagnant en profondeur de contenu — effet plus “app moderne”.</p>
        <ul>
          <li>Échap pour fermer le panneau courant</li>
          <li>Fil d’Ariane cliquable dans chaque panneau</li>
          <li>Contenus mieux segmentés : bots, offres, commandes, FAQ, légal</li>
        </ul>
      </div>
    </div>
    <div class="grid-3" style="margin-top:14px">${['tradlinker','tradcoord','tradassist'].map(k => botTile(BOTS[k], true)).join('')}</div>
  `;
}

function botTile(bot, includeAction=false) {
  return `
    <button class="bot-tile" data-open="${bot.id}">
      <div class="top">
        <img src="${BOT_IMAGES[bot.id]}" alt="${bot.name}" />
        <div><h3>${bot.name}</h3><small>${escapeHtml(bot.accessBadge)}</small></div>
      </div>
      <p>${escapeHtml(bot.tagline)}</p>
      <div class="tags">${(bot.commandPreview||[]).slice(0,3).map(c=>`<span>${escapeHtml(c)}</span>`).join('')}</div>
      ${includeAction ? '<div class="inline-actions"><span class="btn sm">Ouvrir la fiche</span></div>' : ''}
    </button>
  `;
}

function renderBotsPanel() {
  return `
    <div class="panel-grid">
      <div class="card">
        <h3>Pages détaillées par bot</h3>
        <p>Chaque fiche inclut : rôle produit, accès (Free/Premium/Platinium), fonctionnalités, cas d’usage, commandes clés et notes d’implémentation utiles pour une présentation crédible.</p>
        <div class="kv" style="margin-top:12px">
          <div class="cell"><b>TradLinker</b><span>Bot principal de traduction multi-salons</span></div>
          <div class="cell"><b>TradCoord</b><span>Extension d’organisation premium serveur</span></div>
          <div class="cell"><b>TradAssist</b><span>Assistant perso + extension serveur</span></div>
        </div>
      </div>
      <div class="card">
        <h3>Navigation conseillée</h3>
        <ul>
          <li>Accueil → <strong>Bots</strong> pour comprendre la suite</li>
          <li>Puis <strong>Offres</strong> pour clarifier Premium vs Platinium</li>
          <li>Puis <strong>Commandes</strong> pour la profondeur technique</li>
        </ul>
      </div>
    </div>
    <div class="grid-3" style="margin-top:14px">${['tradlinker','tradcoord','tradassist'].map(k => botTile(BOTS[k], false)).join('')}</div>
  `;
}

function renderBotPage(bot) {
  if (!bot) return '<div class="empty">Bot introuvable</div>';
  const access = bot.accessStatus || {};
  const related = ['tradlinker','tradcoord','tradassist'].filter(id => id !== bot.id);
  const cmdGroups = COMMANDS.filter(g => g.bot === bot.id).slice(0, 3);
  return `
    <div class="card">
      <div class="bot-header">
        <img src="${BOT_IMAGES[bot.id]}" alt="${bot.name}" />
        <div>
          <h1>${bot.name}</h1>
          <p>${escapeHtml(bot.tagline)}</p>
        </div>
      </div>
      <div class="access-strip">
        <span><strong>Accès</strong> · ${escapeHtml(bot.accessBadge)}</span>
        <span>Free : ${escapeHtml(access.free || '—')}</span>
        <span>Premium serveur : ${escapeHtml(access.premium || '—')}</span>
        <span>Platinium : ${escapeHtml(access.platinium || '—')}</span>
      </div>
      <p style="margin-top:12px;color:var(--muted)">${escapeHtml(bot.description)}</p>
    </div>

    <div class="panel-grid" style="margin-top:14px">
      <div class="card">
        <h3>Fonctionnalités clés</h3>
        <ul>${(bot.features||[]).map(f=>`<li>${escapeHtml(String(f).trim())}</li>`).join('')}</ul>
      </div>
      <div class="card">
        <h3>Cas d’usage</h3>
        <ul>${(bot.useCases||[]).map(u=>`<li>${escapeHtml(u)}</li>`).join('')}</ul>
        <h3 style="margin-top:14px">Notes utiles</h3>
        <ul>${(bot.notes||[]).map(n=>`<li>${escapeHtml(n)}</li>`).join('')}</ul>
      </div>
    </div>

    <div class="two-col" style="margin-top:14px">
      <div class="card">
        <h3>Commandes / entrées phares</h3>
        <div class="tags">${(bot.commandPreview||[]).map(c=>`<span>${escapeHtml(c)}</span>`).join('')}</div>
        <div class="inline-actions"><button class="btn sm" data-open="commandes">Explorer toutes les commandes</button></div>
      </div>
      <div class="card">
        <h3>Stats / points forts</h3>
        <ul>${(bot.stats||[]).map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ul>
      </div>
    </div>

    <div class="card" style="margin-top:14px">
      <h3>Extraits par catégorie</h3>
      ${cmdGroups.length ? cmdGroups.map(g => `
        <div class="command-group" style="margin-top:10px">
          <header><h4>${escapeHtml(g.category)}</h4><span>${escapeHtml(g.access)}</span></header>
          <div>${g.commands.slice(0,4).map(c => `
            <div class="command-item">
              <code>${escapeHtml(c.name)}</code> · <small>${escapeHtml(c.type)}</small>
              <p>${escapeHtml(c.desc)}</p>
            </div>`).join('')}</div>
        </div>`).join('') : '<div class="empty">Pas d’extraits de commandes disponibles pour ce bot.</div>'}
    </div>

    <div class="card" style="margin-top:14px">
      <h3>Continuer</h3>
      <div class="inline-actions">
        ${related.map(id => `<button class="btn sm" data-open="${id}">Voir ${BOTS[id].name}</button>`).join('')}
        <button class="btn sm" data-open="offres">Voir les offres</button>
      </div>
    </div>
  `;
}

function renderOffersPanel() {
  return `
    <div class="card">
      <h3>Différence essentielle</h3>
      <p><strong>Premium</strong> est un abonnement <strong>serveur</strong> (TradLinker étendu + TradCoord + TradAssist illimité sur ce serveur pour les fonctionnalités supportées). <strong>Platinium</strong> est un abonnement <strong>utilisateur</strong> centré sur TradAssist (DM + usages personnels avancés).</p>
      <div class="inline-actions">
        <a class="btn sm primary" href="${SITE_LINKS.premiumServer}" target="_blank" rel="noopener noreferrer">Premium serveur</a>
        <button class="btn sm" data-open="tradassist">Voir TradAssist</button>
      </div>
    </div>
    <div class="compare-grid" style="margin-top:14px">
      ${COMPARISON_CARDS.map(card => `
        <article class="compare-card">
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.subtitle)}</p>
          <ul>${card.items.map(item => `<li>${iconTick(item.state)} <b>${escapeHtml(item.label)}</b><span>${escapeHtml(item.value)}</span></li>`).join('')}</ul>
        </article>`).join('')}
    </div>
    <div class="panel-grid" style="margin-top:14px">
      <div class="card">
        <h3>Exemples de choix</h3>
        <ul>
          <li><strong>Communauté entière :</strong> Premium serveur</li>
          <li><strong>Usage perso / DM :</strong> Platinium utilisateur</li>
          <li><strong>Découverte :</strong> Free + TradLinker</li>
        </ul>
      </div>
      <div class="card">
        <h3>Message produit recommandé</h3>
        <ul>
          <li>TradCoord = uniquement serveurs Premium</li>
          <li>TradAssist = quotas Free, illimité Premium serveur / Platinium utilisateur</li>
          <li>Préciser “fonctions supportées” quand tu parles d’illimité</li>
        </ul>
      </div>
    </div>
  `;
}

function renderCommandsPanel() {
  const bots = unique(COMMANDS.map(c => c.bot));
  const categories = unique(COMMANDS.map(c => c.category));
  return `
    <div class="command-toolbar">
      <input id="cmdSearch" type="search" placeholder="Rechercher une commande (ex: /3-translate_channel, welcome, poll)…" />
      <select id="cmdBotFilter"><option value="all">Tous les bots</option>${bots.map(b => `<option value="${b}">${escapeHtml(BOTS[b]?.name || b)}</option>`).join('')}</select>
      <select id="cmdCategoryFilter"><option value="all">Toutes les catégories</option>${categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('')}</select>
    </div>
    <div id="cmdResults"></div>
  `;
}

function initCommandExplorer(panel) {
  const search = qs('#cmdSearch', panel);
  const botFilter = qs('#cmdBotFilter', panel);
  const catFilter = qs('#cmdCategoryFilter', panel);
  const out = qs('#cmdResults', panel);

  const render = () => {
    const q = (search.value || '').trim().toLowerCase();
    const botVal = botFilter.value;
    const catVal = catFilter.value;
    const groups = COMMANDS.filter(g => (botVal === 'all' || g.bot === botVal) && (catVal === 'all' || g.category === catVal))
      .map(g => ({ ...g, commands: g.commands.filter(c => {
        const hay = `${g.botLabel} ${g.category} ${c.name} ${c.type} ${c.desc}`.toLowerCase();
        return !q || hay.includes(q);
      }) }))
      .filter(g => g.commands.length);

    if (!groups.length) {
      out.innerHTML = '<div class="empty">Aucun résultat. Essaie un autre mot-clé ou retire un filtre.</div>';
      return;
    }

    out.innerHTML = groups.map(g => `
      <section class="command-group">
        <header><h4>${escapeHtml(g.botLabel)} · ${escapeHtml(g.category)}</h4><span>${escapeHtml(g.access)}</span></header>
        <div>${g.commands.map(c => `
          <div class="command-item">
            <code>${escapeHtml(c.name)}</code> · <small>${escapeHtml(c.type)}</small>
            <p>${escapeHtml(c.desc)}</p>
          </div>`).join('')}</div>
      </section>`).join('');
  };

  [search, botFilter, catFilter].forEach(el => el.addEventListener('input', render));
  [botFilter, catFilter].forEach(el => el.addEventListener('change', render));
  render();
}

function renderWorkflowPanel() {
  const steps = [
    ['01','Installer TradLinker','Créer les groupes de salons liés (FR/EN/ES…), associer les langues et valider le flux de discussion multilingue.'],
    ['02','Structurer avec TradCoord (Premium serveur)','Configurer welcome, règles et rôles de langue pour un onboarding propre et scalable.'],
    ['03','Ajouter TradAssist','Activer les traductions ponctuelles (message, canal, réaction drapeau) et les posts multilingues.'],
    ['04','Clarifier les accès','Expliquer à l’équipe et aux membres la différence Premium serveur vs Platinium utilisateur.'],
    ['05','Documenter','Partager un mini guide interne avec commandes utiles et cas d’usage courants.'],
  ];
  return `
    <div class="panel-grid">
      <div class="card">
        <h3>Ordre de mise en place recommandé</h3>
        <div class="steps">${steps.map(s => `<div class="step"><div class="n">${s[0]}</div><div><h4>${escapeHtml(s[1])}</h4><p>${escapeHtml(s[2])}</p></div></div>`).join('')}</div>
      </div>
      <div class="card">
        <h3>Résultat attendu</h3>
        <ul>
          <li>Conversation multilingue unifiée (TradLinker)</li>
          <li>Onboarding propre et rôles de langue (TradCoord)</li>
          <li>Traductions ponctuelles et contenus multilingues avancés (TradAssist)</li>
        </ul>
        <div class="inline-actions"><button class="btn sm" data-open="bots">Voir les bots</button><button class="btn sm" data-open="commandes">Voir les commandes</button></div>
      </div>
    </div>
  `;
}

function renderFaqPanel() {
  return `<div class="faq">${FAQS.map((f, idx) => `<details ${idx===0?'open':''}><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`).join('')}</div>`;
}

function renderLegalPanel() {
  return `
    <div class="tabs">
      <button class="active" data-legal-tab="terms">Conditions d’utilisation</button>
      <button data-legal-tab="privacy">Politique de confidentialité</button>
      <a class="btn sm" href="./terms-of-service.md" target="_blank" rel="noopener noreferrer">Ouvrir .md (CGU)</a>
      <a class="btn sm" href="./privacy-policy.md" target="_blank" rel="noopener noreferrer">Ouvrir .md (Privacy)</a>
    </div>
    <div class="md-wrap" id="legalContent"><p class="muted">Chargement…</p></div>
  `;
}

async function initLegalPanel(panel) {
  const content = qs('#legalContent', panel);
  const tabs = All('[data-legal-tab]', panel);
  const cache = {};
  async function load(which) {
    const path = which === 'privacy' ? './privacy-policy.md' : './terms-of-service.md';
    if (!cache[which]) {
      try {
        const resp = await fetch(path);
        const txt = await resp.text();
        cache[which] = markdownToHtml(txt);
      } catch (e) {
        cache[which] = '<p class="muted">Impossible de charger le fichier markdown.</p>';
      }
    }
    content.innerHTML = cache[which];
    tabs.forEach(t => t.classList.toggle('active', t.dataset.legalTab === which));
  }
  tabs.forEach(t => t.addEventListener('click', () => load(t.dataset.legalTab)));
  load('terms');
}

function markdownToHtml(md) {
  let text = escapeHtml(md || '').replace(/\r/g,'');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\[(.+?)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { if (inList) { html += '</ul>'; inList = false; } continue; }
    if (/^[-*]\s+/.test(line)) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${line.replace(/^[-*]\s+/, '')}</li>`;
      continue;
    }
    if (inList) { html += '</ul>'; inList = false; }
    html += `<p>${line}</p>`;
  }
  if (inList) html += '</ul>';
  return html;
}

document.addEventListener('DOMContentLoaded', initBase);
