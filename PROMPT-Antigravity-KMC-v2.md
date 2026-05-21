# PROMPT INITIAL — Projet « KMC.ci v2 » (à coller dans Google Antigravity)

> Copier-coller l'intégralité de ce bloc comme premier message à l'agent Antigravity.
> Modèle recommandé : Gemini 3 Pro pour le scaffolding, basculer sur Claude Sonnet 4.5
> pour le calibrage fin des animations scroll.

---

## RÔLE & OBJECTIF

Tu es un développeur front-end senior spécialisé en sites « scrollytelling » primés
(niveau Awwwards). Tu vas reconstruire intégralement le site de KMC
(institut de formation en fibre optique et photovoltaïque, Abidjan, Côte d'Ivoire).

Le site actuel est sur `https://kmc.ci/` (WordPress). Avant de commencer, **ouvre-le
dans le navigateur** et relève : le logo exact, les couleurs réelles (extrais les
codes hex du CSS), le contenu textuel des formations, les coordonnées de contact.
Tu réutilises ce contenu, mais tu refais TOUT le design et la structure.

Tu travailles **section par section** : tu codes une section, tu lances le dev
server, tu scrolles toi-même dans Chrome pour vérifier visuellement l'effet, tu
prends une capture, tu corriges, puis tu passes à la suivante. Ne code jamais
plusieurs sections d'un coup sans vérification navigateur.

---

## STACK TECHNIQUE (décisions verrouillées — ne pas dévier)

- **Astro** en `output: 'static'` (le site sera hébergé sur Hostinger mutualisé,
  aucun serveur Node en production — build statique HTML/CSS/JS uniquement).
- **GSAP + ScrollTrigger** pour le pinning des sections et les timelines d'animation.
- **Lenis** pour le smooth scroll. **Point critique** : synchronise Lenis avec
  ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` et le `requestAnimationFrame`
  de Lenis, sinon le pin « saute ». Teste ça en priorité.
- **Three.js** uniquement pour le tunnel de fibre du hero (TubeGeometry +
  caméra pilotée par le scroll). Prévois un **fallback statique** (image/SVG) si
  WebGL est indisponible ou sur mobile bas de gamme.
- **Tailwind CSS** avec des design tokens centralisés (couleurs, typo, espacements).
- **Astro Content Collections** pour TOUT le contenu éditable et le blog (voir section
  « COUCHE CONTENU » — c'est non négociable).
- `@astrojs/sitemap`, `astro-seo` (ou meta manuels), `robots.txt`.
- Images en WebP/AVIF avec `<Image>` d'Astro, `srcset` responsive.

---

## ARCHITECTURE NARRATIVE — « Le parcours du signal »

Le site raconte le trajet de la lumière dans la fibre, de l'institut jusqu'au client
final. Une **ligne de fibre lumineuse continue** (SVG path animé au scroll, ou trail
Three.js) relie toutes les sections verticalement : elle se « dessine » au fur et à
mesure du scroll. Chaque section est **pinnée** : elle reste figée pendant que son
animation interne se joue, puis le scroll reprend.

**Section 0 — HERO : l'institut & le tunnel de fibre**
Logo + nom « Institut Professionnel de Formation en Fibre Optique KMC ».
Visuel central : un **tunnel 3D vu de l'intérieur de la fibre** (Three.js TubeGeometry,
parois translucides, lumière qui file vers le fond). Au scroll, la caméra avance dans
le tunnel. Accroche : « Devenez expert en fibre optique à Abidjan ».

**Section 1 — LES TROIS OPÉRATEURS**
Le tunnel débouche sur trois faisceaux/ports lumineux distincts, colorés en
**orange, jaune et bleu** (couleurs des trois opérateurs télécoms ivoiriens —
**NE JAMAIS les nommer ni utiliser leurs logos**, uniquement les couleurs comme
code visuel). Texte : nos formateurs sont expérimentés sur les réseaux des grands
opérateurs nationaux.

**Section 2 — LE NRO (Nœud de Raccordement Optique)**
Visuel 3D du NRO (baie de brassage / central optique, rendu isométrique 3D moderne).
Courte explication pédagogique : le point de départ du réseau optique.

**Section 3 — LE SRO (Sous-Répartiteur Optique) + Formation n°1**
Visuel 3D de l'armoire de rue SRO. La fibre s'y connecte. **Carte de la 1re formation
mise en avant** (ex. FTTH D1/D2/D3) avec CTA « En savoir plus ».

**Section 4 — LE PBO (Point de Branchement Optique) + Formation n°2**
Visuel 3D du PBO (boîtier de branchement en façade/poteau). **Carte de la 2e formation
mise en avant** (ex. Habilitations) avec CTA.

**Section 5 — LE CLIENT FINAL**
Visuel 3D de bâtiments (immeuble, maison individuelle, local commercial) éclairés par
l'arrivée de la fibre. Propositions de formations liées au raccordement client.

**Section 6 — CATALOGUE COMPLET DES FORMATIONS**
Fin du parcours. Liste exhaustive de toutes les formations **classées par domaine**
(Fibre optique / Habilitations / Photovoltaïque). Chaque formation = une carte
cliquable. Cette section sort du mode « pin », scroll redevient normal.

**Footer** : coordonnées (Abidjan, +225 07 16 04 60 69, contact@kmc.ci, horaires
Lun-Ven 9h-17h), liens, mentions.

Pages secondaires à générer aussi : `/formations-fibre-optique/`, `/habilitations/`,
`/contact/`, et `/blog/` + `/blog/[slug]`.

---

## DESIGN SYSTEM

- **Style** : moderne, 3D, sombre dans le tunnel puis plus lumineux en bas de page
  (le signal « éclaire » le parcours). Glassmorphism léger sur les cartes.
- **Couleurs** : base = couleurs réelles extraites de kmc.ci (à relever dans le
  navigateur). Accents = environnement ivoirien : ocre/terre de savane, teal lagune,
  or chaud, vert et orange du drapeau en touches. Tunnel intérieur : bleu nuit profond
  + traînées de lumière cyan/blanc.
- **Typo** : une display moderne pour les titres, une sans-serif lisible pour le corps.
- **Mobile-first** : tous les effets scroll doivent dégrader proprement sur mobile
  (pin simplifié ou désactivé, animations allégées). Le site doit rester rapide et
  utilisable sans WebGL.

---

## COUCHE CONTENU ÉDITABLE — CRITIQUE POUR L'AUTOMATISATION SEO

Une automatisation externe (n8n) modifiera chaque semaine les textes SEO et publiera
des articles de blog. **Aucun texte marketing/SEO ne doit être codé en dur dans les
composants `.astro`.** Tout doit vivre dans des Content Collections, schématisées et
validées par Zod :

- `src/content/sections/` — un fichier Markdown/JSON par zone de texte éditable
  (titre, accroche, description de chaque section). Frontmatter avec `seo_keywords`,
  `meta_title`, `meta_description`, `last_reviewed`.
- `src/content/formations/` — une entrée par formation (titre, domaine, niveau,
  description, durée, prérequis).
- `src/content/blog/` — articles de blog en Markdown, frontmatter complet
  (`title`, `description`, `pubDate`, `author`, `tags`, `image`, `draft`).

Objectif : qu'un script externe puisse écrire un nouveau fichier `.md` dans `blog/`
ou modifier le frontmatter d'une section, commit Git, et qu'un simple `astro build`
régénère le site. Documente le schéma de chaque collection dans un `README-CONTENU.md`.

---

## SEO TECHNIQUE (exigences fermes)

- **Corriger le bug majeur** : le site actuel est en `noindex, nofollow`. Le nouveau
  site doit être `index, follow`.
- Balises meta complètes par page + Open Graph + Twitter Card.
- **JSON-LD** : `EducationalOrganization` / `LocalBusiness` sur l'accueil (adresse
  Abidjan, téléphone, horaires), `Course` sur chaque formation, `Article` sur chaque
  post de blog, `BreadcrumbList`.
- HTML sémantique strict (`<header> <main> <section> <article> <h1>` unique par page).
- `sitemap.xml` auto-généré + `robots.txt`.
- Texte réellement présent dans le HTML (pas injecté en JS) pour être crawlable.
- Attributs `alt` descriptifs sur toutes les images.
- **Budget performance** : Lighthouse ≥ 90 sur mobile. Lazy-load des assets 3D,
  Three.js chargé en dynamique, code-splitting.

---

## CONTRAINTES HOSTINGER

- Build statique uniquement (`dist/`), uploadable par SFTP/File Manager.
- Génère un `.htaccess` : redirection HTTPS, compression Gzip/Brotli, cache headers
  longue durée sur les assets, page 404 personnalisée.
- Aucune dépendance à un runtime serveur. Tout est précompilé au build.

---

## MÉTHODE DE TRAVAIL ATTENDUE

1. Crée un plan d'implémentation détaillé et montre-le-moi avant de coder.
2. Initialise le projet Astro + toutes les dépendances.
3. Mets en place les design tokens et les Content Collections (schémas vides).
4. Implémente la synchro Lenis ↔ ScrollTrigger et VALIDE-la dans le navigateur
   avant toute autre animation.
5. Construis les 7 sections une par une, avec vérification navigateur à chaque étape.
6. Implémente SEO technique + blog.
7. Build de prod + rapport Lighthouse.

## LIVRABLES DE CETTE PHASE

- Projet Astro complet et buildable.
- Les 7 sections fonctionnelles avec scroll-jacking validé.
- Content Collections opérationnelles + `README-CONTENU.md`.
- `dist/` généré + `.htaccess` Hostinger.
- Rapport Lighthouse mobile.

Commence par le plan d'implémentation. Ne code pas avant que je l'aie validé.
