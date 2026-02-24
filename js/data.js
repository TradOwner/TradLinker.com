window.TRAD_SITE_DATA = {
  supportServer: "https://discord.gg/c5zvbAWwu8",
  bots: [
    {
      slug: "tradlinker",
      name: "TradLinker",
      page: "tradlinker.html",
      avatar: "image/Avatar%20Linker%20rond.png",
      invite: "https://discord.com/oauth2/authorize?client_id=1323028790770798673&scope=bot+applications.commands",
      supportServer: "https://discord.gg/c5zvbAWwu8",
      tagline: "Le cœur du chat multilingue synchronisé",
      short: "Relie des salons par groupe et traduit automatiquement les messages entre eux, avec synchronisation des réponses, réactions et mises à jour visibles.",
      fullIntro: "Le bot principal pour créer des conversations multilingues fluides entre plusieurs salons Discord, tout en gardant une expérience proche d’un chat natif.",
      role: "TradLinker relie des salons entre eux par groupe, attribue une langue à chaque salon, traduit les messages envoyés dans chaque salon vers les autres, et maintient publiquement la cohérence des réponses, réactions et messages relayés.",
      cta: "Ajouter TradLinker",
      support: { server: true, dm: false },
      planHint: "Free + Premium serveur",
      metaTags: ["Relay", "Webhooks", "Polls multilingues"],
      highlights: ["Groupes de salons", "Réactions synchronisées", "Sondages multilingues"],
      publicNotes: [
        "Les commandes de gestion de groupes nécessitent des permissions de gestion des salons (Manage Channels).",
        "Le plan gratuit est limité (vu dans l’aide embarquée) ; Premium augmente les quotas de groupes et de salons par groupe.",
        "Les comportements listés (relay, sync réponses/réactions/édition/suppression) sont des fonctions visibles publiquement côté utilisateurs."
      ],
      features: [
        { icon: "🌐", title: "Relais multilingue entre salons", text: "Chaque salon d’un groupe reçoit la traduction des messages des autres salons, selon la langue assignée à ce salon." },
        { icon: "🪪", title: "Imitation de l’auteur", text: "Les messages relayés utilisent des webhooks pour reproduire le nom affiché et l’avatar de l’auteur d’origine quand c’est possible." },
        { icon: "🧩", title: "Mise en page, pièces jointes et stickers", text: "Le relay gère le texte, les pièces jointes, les stickers (avec fallback texte si besoin) et conserve un rendu lisible." },
        { icon: "↩️", title: "Réponses synchronisées", text: "Les replies sont reproduites dans les salons liés (référence native quand possible, sinon entête d’imitation)." },
        { icon: "📝", title: "Édition / suppression synchronisées", text: "Les modifications et suppressions du message source sont répercutées sur les copies relayées." },
        { icon: "😀", title: "Réactions synchronisées", text: "Les réactions sont agrégées et “miroir” entre les copies du même message, avec menu contextuel pour afficher le détail global." },
        { icon: "📊", title: "Sondages multilingues", text: "Création de sondages dans les salons liés, options traduites par salon, votes synchronisés et résultats consultables." },
        { icon: "🧭", title: "Visualisation de configuration", text: "Une vue de gestion permet de contrôler les groupes et canaux liés depuis une interface Discord éphémère." }
      ],
      commands: [
        {
          name: "/help",
          type: "slash",
          scope: "Serveur, DM",
          premium: false,
          summary: "Affiche le guide de démarrage TradLinker et rappelle les étapes de configuration (groupes, salons, premium).",
          params: [],
          uses: [
            "Explique la séquence de setup de base (créer un groupe, ajouter des salons, vérifier la config).",
            "Présente les limites free / premium visibles dans l’aide et les bots complémentaires (TradCoord / TradAssist)."
          ],
          notes: ["Réponse éphémère.", "Pratique comme point d’entrée pour les admins."],
          tags: ["guide", "setup"]
        },
        {
          name: "/1-create_poll",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Crée un sondage dans les salons liés du groupe courant, avec options (et images optionnelles) traduites par salon.",
          params: [
            { name: "duration", type: "choix", desc: "Durée prédéfinie (15 min à 3 jours)" },
            { name: "question", type: "texte", desc: "Question du sondage" },
            { name: "answer1", type: "texte", desc: "Réponse 1" },
            { name: "answer2", type: "texte", desc: "Réponse 2" },
            { name: "answer3…answer9", type: "texte", desc: "Réponses supplémentaires", required: false },
            { name: "image1…image9", type: "pièces jointes", desc: "Images optionnelles alignées avec chaque réponse", required: false }
          ],
          uses: [
            "Le salon où la commande est lancée doit appartenir à un groupe TradLinker.",
            "Traduit la question et les options pour chaque salon cible du groupe.",
            "Synchronise les votes et met à jour les boutons de vote dans tous les salons du sondage."
          ],
          notes: ["Réponse éphémère pendant la création.", "Résultats consultables après la fin pendant une fenêtre limitée."],
          tags: ["poll", "sondage", "linked", "vote"]
        },
        {
          name: "/1-delete_poll",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Supprime un de vos sondages (ou tous, si vous êtes admin serveur), via un sélecteur interactif.",
          params: [],
          uses: [
            "Liste les sondages actifs du serveur créés par l’utilisateur (ou tous pour les admins Manage Server).",
            "Affiche un menu de sélection + confirmation de suppression."
          ],
          notes: ["Réponse éphémère.", "Limité aux sondages visibles dans le serveur courant."],
          tags: ["poll", "cleanup", "delete"]
        },
        {
          name: "/2-create_group",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Crée un groupe de salons liés qui servira de base au relay multilingue.",
          params: [
            { name: "group_name", type: "texte", desc: "Nom du groupe de salons" }
          ],
          uses: [
            "Crée une structure de groupe vide dans la configuration du serveur.",
            "Vérifie les quotas du plan avant création."
          ],
          notes: ["Nécessite Manage Channels.", "Refuse si le nom existe déjà."],
          tags: ["group", "setup", "admin"]
        },
        {
          name: "/3-add_channel",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Ajoute un salon à un groupe puis ouvre une sélection de langue pour définir la langue cible de ce salon.",
          params: [
            { name: "group_name", type: "texte", desc: "Nom du groupe existant" },
            { name: "channel", type: "salon texte", desc: "Salon à relier" }
          ],
          uses: [
            "Ajoute un salon dans la configuration du groupe et associe une langue via une vue interactive.",
            "Permet aussi de mettre à jour la langue d’un salon déjà présent dans le groupe."
          ],
          notes: ["Nécessite Manage Channels.", "Quotas de salons par groupe selon plan free / premium."],
          tags: ["group", "channel", "language", "setup"]
        },
        {
          name: "/4-remove_channel",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Retire un salon d’un groupe de salons liés.",
          params: [
            { name: "group_name", type: "texte", desc: "Nom du groupe" },
            { name: "channel", type: "salon texte", desc: "Salon à retirer" }
          ],
          uses: ["Supprime l’association du salon dans la config du groupe."],
          notes: ["Nécessite Manage Channels.", "Autocomplétion sur le nom de groupe."],
          tags: ["group", "channel", "remove"]
        },
        {
          name: "/5-delete_group",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Supprime un groupe de salons liés et sa configuration.",
          params: [
            { name: "group_name", type: "texte", desc: "Nom du groupe à supprimer" }
          ],
          uses: ["Supprime entièrement le groupe dans la configuration du serveur."],
          notes: ["Nécessite Manage Channels.", "Autocomplétion sur le nom de groupe."],
          tags: ["group", "delete", "admin"]
        },
        {
          name: "/6-show_groups",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Affiche la configuration des groupes et salons liés dans une vue de gestion interactive.",
          params: [],
          uses: [
            "Montre les groupes du serveur et les salons associés.",
            "S’appuie sur une interface éphémère (embed + boutons) pour naviguer dans la configuration."
          ],
          notes: ["Nécessite Manage Channels."],
          tags: ["group", "config", "viewer"]
        },
        {
          name: "/7-donate",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Crée un lien de donation pour soutenir le projet avec un montant personnalisé.",
          params: [
            { name: "amount", type: "nombre", desc: "Montant (minimum 1€)" }
          ],
          uses: ["Démarre un checkout Stripe côté Discord avec montant dynamique."],
          notes: ["Réponse éphémère.", "Commande de soutien, distincte du Premium."],
          tags: ["donation", "stripe"]
        },
        {
          name: "/8-buy_premium",
          type: "slash",
          scope: "Serveur",
          premium: true,
          summary: "Ouvre l’achat (ou la gestion/annulation) de l’abonnement Premium pour le serveur courant.",
          params: [],
          uses: [
            "Vérifie si le serveur est déjà Premium et propose la gestion/annulation le cas échéant.",
            "Sinon génère un checkout Stripe pour l’upgrade serveur."
          ],
          notes: ["À lancer dans un serveur (pas en DM).", "Réponse éphémère."],
          tags: ["premium", "billing", "stripe"]
        },
        {
          name: "Show reactions (menu contextuel message)",
          type: "context",
          scope: "Serveur",
          premium: false,
          summary: "Affiche les réactions agrégées d’un message et de toutes ses copies relayées (comptage global par emoji + pseudos).",
          params: [
            { name: "message", type: "clic droit sur message", desc: "Message source ou message relayé" }
          ],
          uses: [
            "Reconstruit la famille du message (original + traductions relayées).",
            "Agrège les réactions synchronisées et affiche le détail côté utilisateur."
          ],
          notes: ["Menu contextuel Discord (Apps → Show reactions)."],
          tags: ["context", "reaction", "sync"]
        }
      ],
      faq: [
        { q: "Par quoi commencer pour configurer un serveur ?", a: "Commence par /help, puis crée un groupe avec /2-create_group et ajoute tes salons avec /3-add_channel (un salon = une langue)." },
        { q: "Est-ce que TradLinker conserve les réponses et réactions ?", a: "Oui, le code fourni montre la synchronisation des replies (native/fallback) et des réactions entre copies relayées, ainsi qu’un menu contextuel pour voir l’agrégat." },
        { q: "TradLinker suffit-il pour l’onboarding et les rôles de langue ?", a: "Pour ça, TradCoord est le complément dédié (welcome, règles, coordination des rôles)." }
      ]
    },
    {
      slug: "tradcoord",
      name: "TradCoord",
      page: "tradcoord.html",
      avatar: "image/Avatar%20Orga%20rond.png",
      invite: "https://discord.com/oauth2/authorize?client_id=1326539242590961746&permissions=8&integration_type=0&scope=bot+applications.commands",
      supportServer: "https://discord.gg/c5zvbAWwu8",
      tagline: "L’extension d’organisation Premium",
      short: "Gère l’accueil, l’acceptation des règles et les messages de coordination pour distribuer les rôles de langue / accès aux salons multilingues.",
      fullIntro: "Le compagnon de TradLinker pour structurer l’accès aux salons multilingues et fluidifier l’onboarding des membres, avec des messages interactifs persistants.",
      role: "TradCoord ajoute des fonctions d’organisation côté serveur (accueil, message d’acceptation des règles, messages interactifs de coordination des rôles de langue) pour accompagner l’usage de TradLinker, surtout en Premium.",
      cta: "Ajouter TradCoord",
      support: { server: true, dm: false },
      planHint: "Premium serveur (principalement)",
      metaTags: ["Onboarding", "Rôles de langue", "Coordination"],
      highlights: ["Welcome", "Rules acceptance", "Coordination rôles"],
      publicNotes: [
        "Les commandes de TradCoord sont orientées administration de serveur (permissions de gestion requises selon la commande).",
        "Le code fourni montre des vérifications Premium sur les fonctions principales (welcome, rules, coordination).",
        "Les vues persistantes (boutons/menus) sont des comportements publics visibles par les membres."
      ],
      features: [
        { icon: "👋", title: "Message de bienvenue configurable", text: "Configuration d’un welcome message via modal, avec placeholders publics comme {user} et {channel}, et choix du salon de mention." },
        { icon: "📜", title: "Acceptation des règles par bouton", text: "Envoie un message de règles avec bouton persistant ; l’utilisateur accepte, reçoit un rôle et l’action peut être journalisée." },
        { icon: "🏷️", title: "Coordination des rôles de langue", text: "Crée des messages interactifs pour attribuer les rôles de langue (un rôle par langue selon le scope choisi)." },
        { icon: "🔐", title: "Gestion des accès aux salons", text: "Met à jour les permissions des salons selon les rôles de coordination, pour ouvrir les bons canaux aux bonnes langues." },
        { icon: "♻️", title: "Édition et migration des coordinations", text: "Peut éditer des messages interactifs existants, migrer d’anciens mappings et nettoyer les rôles inutiles." },
        { icon: "🧹", title: "Suppression sûre d’un scope", text: "La suppression d’une coordination retire les messages liés, nettoie les overwrites et ne supprime que les rôles vraiment inutilisés." }
      ],
      commands: [
        {
          name: "/1-set_welcome",
          type: "slash",
          scope: "Serveur",
          premium: true,
          summary: "Configure un message de bienvenue pour le serveur via un modal, puis un sélecteur de salon à mentionner.",
          params: [
            { name: "send_channel", type: "salon texte", desc: "Salon où le message de bienvenue sera envoyé" }
          ],
          uses: [
            "Ouvre un modal pour saisir le texte de bienvenue (max ~600 caractères).",
            "Permet de choisir un salon à mentionner dans le message (placeholder {channel}).",
            "Enregistre la configuration de bienvenue du serveur."
          ],
          notes: ["Nécessite Manage Messages.", "Vérification Premium serveur dans le code."],
          tags: ["welcome", "onboarding", "premium"]
        },
        {
          name: "/1-clear_welcome",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Désactive le welcome message et supprime les données de configuration de bienvenue du serveur.",
          params: [],
          uses: ["Retire la configuration de welcome stockée pour le serveur et persiste l’état mis à jour."],
          notes: ["Nécessite Manage Messages."],
          tags: ["welcome", "cleanup"]
        },
        {
          name: "/2-set_rules_message",
          type: "slash",
          scope: "Serveur",
          premium: true,
          summary: "Crée un message d’acceptation des règles avec bouton persistant, rôle à attribuer, salon de log et salon de langue.",
          params: [
            { name: "message_channel", type: "salon texte", desc: "Salon où poster le message de règles" },
            { name: "log_channel", type: "salon texte", desc: "Salon pour journaliser les acceptations" },
            { name: "language_channel", type: "salon texte", desc: "Salon de redirection / information langue" },
            { name: "role", type: "rôle", desc: "Rôle attribué lors de l’acceptation" }
          ],
          uses: [
            "Envoie un message de règles avec un bouton d’acceptation persistant.",
            "Attribue le rôle configuré au membre lors du clic.",
            "Utilise les salons de log et de langue fournis dans la configuration."
          ],
          notes: ["Nécessite Manage Messages.", "Vérification Premium serveur dans le code."],
          tags: ["rules", "onboarding", "role", "premium"]
        },
        {
          name: "/3-coordination",
          type: "slash",
          scope: "Serveur",
          premium: true,
          summary: "Crée un message interactif de gestion des rôles de langue (coordination) pour un scope de groupes TradLinker.",
          params: [
            { name: "channel", type: "salon texte", desc: "Salon où envoyer le message de coordination" }
          ],
          uses: [
            "Lit la configuration TradLinker du serveur pour proposer un scope (groupes / all groups).",
            "Crée/réutilise des rôles par langue pour le scope choisi.",
            "Publie un message interactif (boutons) pour que les membres choisissent leur langue."
          ],
          notes: ["Nécessite Manage Messages.", "Vérification Premium serveur dans le code."],
          tags: ["coordination", "roles", "language", "premium"]
        },
        {
          name: "/3-delete_coordination",
          type: "slash",
          scope: "Serveur",
          premium: true,
          summary: "Supprime un scope de coordination et nettoie proprement messages, overwrites et rôles associés.",
          params: [],
          uses: [
            "Affiche les scopes de coordination disponibles via un sélecteur.",
            "Supprime/désactive les messages de coordination liés au scope.",
            "Nettoie les permissions et rôles non utilisés."
          ],
          notes: ["Nécessite Manage Messages + Manage Roles.", "Vérification Premium serveur dans le code."],
          tags: ["coordination", "delete", "cleanup", "premium"]
        },
        {
          name: "/3-edit_coordination",
          type: "slash",
          scope: "Serveur",
          premium: true,
          summary: "Édite un message de coordination existant (scope, rôles/langues, contenu interactif).",
          params: [],
          uses: [
            "Liste les messages interactifs de coordination existants.",
            "Recalcule / ajuste le mapping des rôles de langue et les overwrites si nécessaire.",
            "Met à jour le message interactif persistant."
          ],
          notes: ["Nécessite Manage Messages.", "Vérification Premium serveur dans le code."],
          tags: ["coordination", "edit", "roles", "premium"]
        }
      ],
      faq: [
        { q: "TradCoord fonctionne-t-il seul ?", a: "Il peut être ajouté seul, mais son intérêt principal est de compléter TradLinker en s’appuyant sur les groupes/salons multilingues et les rôles de langue." },
        { q: "Pourquoi plusieurs commandes commencent par le même numéro ?", a: "Le préfixe numéroté sert à organiser les commandes par thématique dans Discord (welcome, rules, coordination)." },
        { q: "Les messages interactifs restent-ils actifs après redémarrage ?", a: "Oui, le code fourni montre la restauration de vues persistantes pour les messages de coordination et de règles." }
      ]
    },
    {
      slug: "tradassist",
      name: "TradAssist",
      page: "tradassist.html",
      avatar: "image/Avatar%20Assistant%20rond.png",
      invite: "https://discord.com/oauth2/authorize?client_id=1419765128597078218&permissions=8&integration_type=0&scope=bot+applications.commands",
      supportServer: "https://discord.gg/c5zvbAWwu8",
      tagline: "Le traducteur personnel + toolbox de traduction",
      short: "Traduit des messages ponctuels, des canaux récents, crée des posts multilingues avec bouton Translate et propose la traduction par réaction drapeau auto-supprimée.",
      fullIntro: "Le bot assistant de traduction pour usages ponctuels (DM et serveur) et comme extension de fonctionnalités de traduction dans les serveurs Discord.",
      role: "TradAssist fournit des commandes de traduction ponctuelle (message, salon, saisie utilisateur), des posts multilang avec bouton Translate et un mode de traduction par réaction drapeau, en complément de TradLinker ou en usage autonome.",
      cta: "Ajouter TradAssist",
      support: { server: true, dm: true },
      planHint: "Free + Premium + Platinium user",
      metaTags: ["DM", "Context menus", "Flag reactions"],
      highlights: ["Traduction éphémère", "Posts avec bouton Translate", "Réactions drapeaux"],
      publicNotes: [
        "Plusieurs commandes sont disponibles en DM et en serveur ; certaines sont serveur-only (ex. traduction de canal, réglages flagreact).",
        "Le code inclut des quotas mensuels (free) et des upgrades Premium serveur / Platinium utilisateur.",
        "Les sorties sont majoritairement éphémères pour éviter le spam et les notifications."
      ],
      features: [
        { icon: "🧠", title: "Traduction ponctuelle rapide", text: "Traduis un message ciblé (ID ou menu contextuel) dans la langue de l’utilisateur, avec résultat éphémère." },
        { icon: "📚", title: "Traduction de canal (fenêtre paginée)", text: "Traduit les derniers messages d’un salon (jusqu’à 100), puis navigation Previous/Next en éphémère." },
        { icon: "✍️", title: "Saisie + traduction", text: "Sélection de langue puis modal de saisie pour traduire son propre texte, avec aperçu prêt à copier/coller." },
        { icon: "📌", title: "Posts multilingues avec bouton Translate", text: "Crée un message public avec pièces jointes et bouton Translate persistant ; chaque membre peut obtenir sa traduction en éphémère." },
        { icon: "🛠️", title: "Édition des posts multilang", text: "Permet d’éditer un post existant du bot (texte + remplacement optionnel des pièces jointes)." },
        { icon: "🏳️", title: "Traduction par réaction drapeau", text: "Réagis avec un drapeau pour obtenir une traduction silencieuse en réponse, auto-supprimée après un délai configurable." },
        { icon: "📎", title: "Gestion média/stickers", text: "Les traductions récupèrent aussi les pièces jointes/stickers quand possible (ou affichent un fallback utile)." },
        { icon: "💳", title: "Upgrades intégrés", text: "Commandes publiques pour acheter Premium serveur ou Platinium utilisateur directement depuis Discord." }
      ],
      commands: [
        {
          name: "/1-translate_and_send",
          type: "slash",
          scope: "Serveur, DM",
          premium: false,
          summary: "Ouvre un sélecteur de langue paginé puis un modal pour traduire ton texte ; renvoie un aperçu éphémère prêt à envoyer/copier.",
          params: [],
          uses: [
            "Choix de langue via menu paginé.",
            "Modal de saisie du texte à traduire.",
            "Retourne la traduction en messages éphémères (serveur/DM selon contexte)."
          ],
          notes: ["Soumis aux quotas free si aucun upgrade n’est actif."],
          tags: ["translate", "input", "dm", "server"]
        },
        {
          name: "/2-multilang_post_create",
          type: "slash",
          scope: "Serveur, DM",
          premium: false,
          summary: "Crée un post multilingue avec bouton Translate persistant, texte saisi via modal et jusqu’à 5 pièces jointes.",
          params: [
            { name: "a1…a5", type: "pièces jointes", desc: "Jusqu’à 5 pièces jointes pour le post", required: false }
          ],
          uses: [
            "Stocke temporairement les pièces jointes puis ouvre un modal pour le contenu texte.",
            "Publie un message public avec bouton Translate.",
            "Le bouton fournit une traduction éphémère au membre qui clique."
          ],
          notes: ["Quota distinct pour création de posts et usages du bouton en plan free."],
          tags: ["post", "tutorial", "button", "translate"]
        },
        {
          name: "/2-multilang_post_edit",
          type: "slash",
          scope: "Serveur, DM",
          premium: false,
          summary: "Édite un post multilang existant du bot (texte + remplacement optionnel des pièces jointes).",
          params: [
            { name: "message_id", type: "texte/ID", desc: "ID du message à éditer dans le salon courant" },
            { name: "a1…a5", type: "pièces jointes", desc: "Nouvelles pièces jointes (remplacement optionnel)", required: false }
          ],
          uses: [
            "Récupère le message ciblé dans le salon courant.",
            "Vérifie que le message appartient au bot.",
            "Ouvre un modal d’édition du texte."
          ],
          notes: ["En serveur, Manage Messages peut être requis.", "Soumis au quota tutorial_post en free."],
          tags: ["post", "edit", "tutorial"]
        },
        {
          name: "/3-translate_channel",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Traduit les derniers messages du salon (1 à 100) dans la langue de l’utilisateur, avec pagination éphémère.",
          params: [],
          uses: [
            "Ouvre un modal pour choisir combien de messages traduire (1–100).",
            "Construit une session de pagination (Previous/Next/Close).",
            "Inclut pièces jointes / stickers quand possible."
          ],
          notes: ["Serveur-only.", "Sortie éphémère pour éviter l’encombrement du salon."],
          tags: ["translate", "channel", "history", "server"]
        },
        {
          name: "Translate channel (menu contextuel message)",
          type: "context",
          scope: "Serveur",
          premium: false,
          summary: "Version menu contextuel de la traduction de canal : ouvre le même modal de limite à partir d’un message du salon.",
          params: [
            { name: "message", type: "clic droit sur message", desc: "Message du salon dont on veut traduire l’historique" }
          ],
          uses: ["Lance la même logique que /3-translate_channel pour le salon du message sélectionné."],
          notes: ["Menu contextuel Discord (Apps → Translate channel)."],
          tags: ["context", "channel", "history"]
        },
        {
          name: "/4-translate_message",
          type: "slash",
          scope: "Serveur, DM",
          premium: false,
          summary: "Traduit un message ciblé par ID (dans le salon courant) en réponse éphémère.",
          params: [
            { name: "message_id", type: "texte/ID", desc: "ID du message à traduire dans ce salon" }
          ],
          uses: [
            "Fetch du message dans le salon courant (ou DM).",
            "Traduit le contenu texte et joint les médias/stickers visibles au besoin.",
            "Découpe la sortie en plusieurs messages si nécessaire."
          ],
          notes: ["Utile quand le menu contextuel n’est pas disponible."],
          tags: ["translate", "message", "dm", "server"]
        },
        {
          name: "Translate message (menu contextuel message)",
          type: "context",
          scope: "Serveur, DM",
          premium: false,
          summary: "Traduit immédiatement un message via clic droit (Apps) et affiche la traduction en éphémère.",
          params: [
            { name: "message", type: "clic droit sur message", desc: "Message à traduire" }
          ],
          uses: ["Version la plus rapide pour traduire un message sans copier son ID."],
          notes: ["Menu contextuel Discord (Apps → Translate message)."],
          tags: ["context", "message", "translate"]
        },
        {
          name: "/5-flagreact (groupe)",
          type: "group",
          scope: "Serveur",
          premium: false,
          summary: "Groupe de commandes publiques pour régler la traduction par réaction drapeau (délai auto-delete, affichage, flags reconnus).",
          params: [],
          uses: [
            "Expose les sous-commandes set_delay, show et list_flags.",
            "Complète la fonction publique “réagir avec un drapeau → traduction silencieuse auto-supprimée”."
          ],
          notes: ["La traduction par réaction fonctionne en usage public ; les réglages sont serveur-only."],
          tags: ["group", "flagreact", "settings"]
        },
        {
          name: "/5-flagreact set_delay",
          type: "slash",
          scope: "Serveur",
          premium: false,
          summary: "Règle le délai d’auto-suppression des traductions par drapeau (5 à 300 secondes).",
          params: [
            { name: "seconds", type: "entier 5–300", desc: "Délai avant suppression des réponses de traduction" }
          ],
          uses: ["Enregistre un délai par serveur pour les messages de traduction par réaction drapeau."],
          notes: ["Nécessite Manage Server (ou admin)."],
          tags: ["flagreact", "settings", "server"]
        },
        {
          name: "/5-flagreact show",
          type: "slash",
          scope: "Serveur, DM",
          premium: false,
          summary: "Affiche le délai d’auto-suppression actuellement appliqué (serveur courant ou défaut).",
          params: [],
          uses: ["Retourne la valeur du délai de suppression utilisée pour flagreact."],
          notes: ["Réponse éphémère."],
          tags: ["flagreact", "settings"]
        },
        {
          name: "/5-flagreact list_flags",
          type: "slash",
          scope: "Serveur, DM",
          premium: false,
          summary: "Liste les drapeaux reconnus pour déclencher la traduction par réaction.",
          params: [],
          uses: ["Affiche les emojis drapeaux associés à des langues reconnues."],
          notes: ["Réponse éphémère."],
          tags: ["flagreact", "flags", "emoji"]
        },
        {
          name: "/6-buy_platinium",
          type: "slash",
          scope: "Serveur, DM",
          premium: true,
          summary: "Ouvre l’abonnement Platinium (utilisateur) ou la page de gestion/annulation si déjà actif.",
          params: [],
          uses: [
            "Upgrade utilisateur (pas serveur) pour lever des quotas sur les fonctions supportées, y compris en DM.",
            "Affiche les avantages et quotas comparatifs du plan free."
          ],
          notes: ["Réponse éphémère.", "Abonnement utilisateur distinct de Premium serveur."],
          tags: ["platinium", "billing", "stripe", "premium"]
        },
        {
          name: "/8-buy_premium",
          type: "slash",
          scope: "Serveur",
          premium: true,
          summary: "Ouvre l’achat (ou la gestion) du Premium serveur depuis TradAssist.",
          params: [],
          uses: ["Permet d’acheter / gérer le Premium du serveur courant sans quitter TradAssist."],
          notes: ["Serveur-only dans le code.", "Réponse éphémère."],
          tags: ["premium", "billing", "server", "stripe"]
        }
      ],
      faq: [
        { q: "TradAssist remplace-t-il TradLinker ?", a: "Non : TradAssist couvre surtout des traductions ponctuelles et outils de confort. TradLinker reste le bot principal pour relier et synchroniser des salons multilingues." },
        { q: "Quelle différence entre Premium et Platinium ?", a: "Premium est côté serveur (quotas / accès complémentaires). Platinium est côté utilisateur et lève des limites personnelles sur certaines fonctions, notamment en DM." },
        { q: "Le mode drapeau spamme-t-il le salon ?", a: "Le code montre des réponses silencieuses et auto-supprimées après un délai configurable, justement pour limiter l’encombrement." }
      ]
    }
  ]
};
