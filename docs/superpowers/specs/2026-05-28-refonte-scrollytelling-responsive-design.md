# Spec — Refonte scrollytelling, effet relief/fibre & responsive KMC

> Date : 2026-05-28
> Branche : `refonte-scrollytelling-design`
> Périmètre : page d'accueil (`ScrollytellingHero`), navigation, page formations, suppression page infrastructure, responsive téléphone/tablette, CTA contact.

## Contexte

Le site KMC (Astro statique, GSAP + ScrollTrigger + Lenis) présente une séquence scrollytelling sur la home. Le client demande une série de corrections visuelles, le rétablissement de l'effet « relief/fibre » sur les fenêtres et le menu, une vraie déclinaison responsive (téléphone + tablette), une page formations au format des fenêtres de la home, et la suppression de la page infrastructure.

Fichiers principaux concernés :
- `src/components/ScrollytellingHero.astro` — séquence + timeline GSAP
- `src/styles/global.css` — classes `.relief-panel`, `.relief-1/2`, `.fiber-pulse`, `.fiber-flow`
- `src/components/Navigation.astro` — menu (relief) + lien Infrastructure à retirer
- `src/components/OperatorWindow.astro` — fenêtres opérateurs
- `src/components/FormationCard.astro` — fiche formation (réutilisée page formations)
- `src/pages/formations-fibre-optique.astro` — refonte au format fenêtres relief
- `src/pages/infrastructure.astro` — suppression
- `src/lib/notion.ts` — `getFormations()` (filtre « A afficher sur le site web ») déjà en place

Couleurs charte / logo : bleu `#1e9ad7`, orange `#F59E0B` (logo : losange extérieur orange, intérieur bleu ; lettres K+M bleu, C orange). Bleu nuit menu : `linear-gradient(rgba(16,50,88,.78),rgba(11,33,58,.82))`.

## Décisions validées avec le client

1. **Responsive** : sous 1024px, sections empilées plein écran soignées (pas de scroll-jacking), pour tablette ET téléphone, avec fenêtres relief et bouton flottant. (Pas de scrollytelling épinglé sur tactile.)
2. **CTA contact** : bouton flottant « Demander un devis » permanent sur tout le site + CTA contextuels dans les sections clés.
3. **Titre 1a** : « KMC » = K+M bleu `#1e9ad7`, C orange `#F59E0B`.

## Détail des modifications

### A. Rétablir / renforcer l'effet relief + fibre (menu & fenêtres)

**Investigation d'abord** : déterminer pourquoi l'effet est devenu peu/pas visible (vérifier en dev + build : conflit `overflow`/`isolation`, halo masqué par un parent, `@property --kmc-a` non animé sur le navigateur testé, ou effet trop discret).

**Cible attendue** (après correction) :
- Bordure dégradée orange→bleu nette sur menu + fenêtres.
- Halos latéraux (orange à gauche, bleu à droite) visibles.
- Comète `fiber-pulse` parcourant le périmètre (cycle ~5 s).
- **Accentuation au survol** : relief (`translateY` + scale léger) + halos renforcés. Vérifier que `.relief-2` a bien un parent avec `perspective` pour le `rotateX`.

Critère d'acceptation : sur Chrome desktop, le menu et au moins une fenêtre montrent visiblement (1) la bordure dégradée, (2) la comète animée, (3) une réaction au survol.

**Point dur identifié** : `.relief-2:hover` applique un `rotateX` qui nécessite un parent avec `perspective`. C'est OK pour le menu (`perspective:1000px`) et la couche `#scrolly-stage` (`perspective:1200px`), mais **`#layer-ops` (grille des 3 fenêtres opérateurs) n'a pas de `perspective`** → le survol y paraît plat. Ajouter `perspective` à `#layer-ops` (ou à `#operators`). Idem pour la grille de la page formations (§9).

### 1. Éléphant + titre serif (`ScrollytellingHero` couche `#layer-img0`)

- **1a** Titre serif : « <span bleu>KMC</span> » avec K+M en `#1e9ad7` et C en `#F59E0B`, puis « — Institut de formation professionnel en fibre optique » en blanc. (Spans colorés par lettre.)
- **1b** « fibre optique » du titre en orange `#F59E0B`.
- **1c** Plus d'espace vertical entre le titre et la fenêtre éléphant. Critère : écart clairement visible (≈ +2 à +4 rem) sans que l'éléphant sorte du cadre en desktop ni ne chevauche le titre en mobile.
- **1d** Intérieur de la fenêtre éléphant : même famille de teinte que le menu mais **plus claire**. Menu actuel ≈ `rgba(16,50,88,.78)→rgba(11,33,58,.82)` ; cible fenêtre éléphant ≈ `rgba(28,70,116,.85)→rgba(20,52,90,.88)` (à affiner visuellement). Garder la bordure dégradée orange→bleu.
- **1e** Image techniciens `deux-techniciens-ivoiriens-fibre.png` : recentrer pour ne plus couper le technicien de droite (`object-contain` + conteneur adapté, ou `object-position` centré). Vérifier rendu desktop + mobile.

### 2. Transition vers Image 1 (remplacer le fondu actuel)

Le fondu actuel = `.to(img0,{opacity:0})` (ligne 175). Comme `#layer-img0` a un fond `bg-[#070d18]` et est au-dessus de `#layer-img1`, le fondu passe momentanément par du noir.

- **2a** Remplacer ce fondu par un **glissement vers le haut de la couche parente `#layer-img0`** (`yPercent: -100`), qui révèle `#layer-img1` dessous.
  - **Important** : translater le PARENT `#layer-img0`, pas les enfants éléphant/techniciens (qui ont déjà leurs propres transforms `xPercent/yPercent`, lignes 167-168). Les enfants suivent le parent.
  - **Pré-requis d'état** : `#layer-img1` démarre actuellement à `opacity-0` (ligne 21). Passer son opacité à 1 **juste avant** le glissement (sinon on révèle du vide). `#layer-img1` est z-20, sous `#layer-img0` (z-30) → ordre correct.
- **2b** Réduire la durée pendant laquelle Image 1 reste seule avant l'apparition de `#layer-text` (avancer le `.to(text,{opacity:1})`, actuellement à la position 1.7).

### 3. Carte texte + logos FDFP/AEJ (`#layer-text`)

Conservée telle quelle. Ajuster uniquement le timing pour enchaîner proprement avec 2b. Ajouter un CTA « Demander un devis » (voir §8b).

### 4. Transition vers Image 2 réseau (remplacer le fondu)

- **4a** Remplacer `.to([img1,text],{opacity:0})` (ligne 180, fondu opacité) par un **glissement vers le haut** d'Image 1 + carte texte (`yPercent: -100`), révélant `#layer-img2` (réseau, z-10) dessous ; `#layer-img2` doit être à opacity 1 avant le glissement. La vidéo `#flux-video` apparaît quasi instantanément (opacity rapide). Ici il n'y a pas de couche noire intermédiaire : le glissement révèle directement le réseau.

### 5. Zoom opérateurs

- **5a** Réduire le zoom de moitié sur la valeur de zoom et **ajuster le dézoom en cohérence** :
  - Zoom (ligne 184) : `scale: 2.3 → ~1.65` (origine inchangée `6% 45%`).
  - Dézoom (ligne 193) : actuellement `scale: 1.3`. Le garder à `~1.3` reste valable (le dézoom est plus léger qu'avant, ce qui est le but : inclure le NRO sans tout réafficher). Valeur explicite retenue : **dézoom `scale: 1.25`**, à affiner visuellement pour cadrer le bâtiment NRO.

### 6 & 7. Texte « 3 opérateurs » + 3 fenêtres cascade

Conservés. Les 3 `OperatorWindow` gardent `.relief-2` + survol dynamique (cf. §A). Vérifier le `perspective` parent pour le hover.

### 8. Dézoom + NRO + texte centre de formation + CTA

- **8a** Après le dézoom (`scale ~1.3`), nouvelle section texte (nouvelle couche `#layer-nro` ou bloc après la fiche) présentant le rôle du centre de formation + exemple de formation, contenu adapté de `KMC_presentation_site_SEO.md` :
  - Titre SEO : « Centre de formation de techniciens fibre optique à Abidjan ».
  - Paragraphes : qui sommes-nous, formation sur les 3 opérateurs, théorie + ateliers pratiques, sécurité & habilitations, parcours → emploi.
  - Hiérarchie : **un seul `<h1>` sur la home** = le titre serif §1 (ligne 28). La carte texte §3 utilise déjà des `<h2>` (lignes 63/69) — OK. Ce nouveau bloc NRO utilisera `<h2>`/`<h3>`. Audit global : vérifier qu'il n'y a qu'un seul `h1` sur la page d'accueil après l'ajout.
- **8b** CTA « Demander un devis » :
  - **Bouton flottant** permanent : composant `FloatingCTA.astro` placé **dans `Layout.astro`, juste après le `<slot />`** (source unique → présence garantie sur toutes les pages sans le rajouter page par page). Lien `/contact/`. Masqué à l'impression, `aria-label` explicite, `z-index` sous le menu mobile ouvert, ne recouvre pas le footer (le footer a une marge/padding bas suffisante ou le bouton se masque en bas de page si nécessaire).
  - CTA contextuels : carte texte (§3), section NRO (§8a), fiches formation, fenêtres opérateurs.

### 9. Page formations (`/formations-fibre-optique/`)

- Refonte au format des fenêtres de la home : réutiliser `FormationCard.astro` (style relief + fiber) pour chaque formation.
- Source : `getFormations()` (filtre Notion « A afficher sur le site web » déjà actif, fallback gracieux).
- Mise en page : grille responsive de fiches relief (1 col mobile, 2 tablette, 2–3 desktop selon densité), fond nuit, titre de page, CTA devis. Ajouter `perspective` au conteneur de la grille pour que le survol `.relief-2`/`.relief-1` ne soit pas plat (cf. §A).
- **Hiérarchie** : la page conserve **exactement un `<h1>`** = le titre de page (ligne 49 actuelle). Les fiches `FormationCard` utilisent `<h3>` (déjà le cas) → pas de conflit.
- Conserver le JSON-LD `Course` existant + états d'erreur/vide.

### 10. Suppression page infrastructure

- Supprimer `src/pages/infrastructure.astro`.
- Retirer l'entrée `{ href: '/infrastructure/', label: 'Infrastructure' }` du menu (`Navigation.astro`).
- Composants `SectionNRO/SRO/PBO/ClientFinal` laissés dans le repo (dormants, plus référencés).
- Vérifier qu'aucun **lien** interne ne pointe vers `/infrastructure/` (sitemap régénéré au build). Note : les occurrences du mot « infrastructure » dans `SectionCatalogue.astro` et `habilitations.astro` sont du texte courant (pas des liens) → **laissées intactes**.

### B. Responsive téléphone + tablette

Sous 1024px (et `prefers-reduced-motion`), remplacer le simple « aplatissement » actuel par des **sections empilées plein écran soignées** :
- Chaque scène (éléphant+titre, image 1, carte texte, réseau+vidéo, intro opérateurs, 3 fenêtres, NRO+texte SEO, fiche formation) = bloc vertical lisible.
- Espacements, tailles de police et hauteurs d'images adaptés tablette vs téléphone (breakpoints Tailwind `sm`/`md`).
- Fenêtres relief conservées ; halos latéraux éventuellement atténués sur très petit écran (déjà désactivés <1024px pour le nav band).
- Bouton flottant CTA présent.
- Pas de pin/scrub GSAP sous 1024px (la branche `mm.add('(max-width:1023px)…')` reste le mode empilé, mais avec un vrai styling au lieu de `position:relative` brut).

## Architecture & approche technique

- **Timeline GSAP** : refactor des transitions (fondu → glissement vertical) dans la branche desktop de `gsap.matchMedia`. Garder `scrub` + `pin` ; ajuster les positions temporelles (labels recommandés pour lisibilité).
- **Z-index / couches** : les couches révélées par glissement doivent être visibles (opacity 1) sous la couche qui monte ; ajuster l'ordre d'empilement si besoin.
- **Nouvelle couche NRO** : ajouter `#layer-nro` (z entre ops et formation) ou intégrer au bloc formation.
- **Composant `FloatingCTA.astro`** : nouveau, inclus dans `Layout.astro` ou chaque page, masqué à l'impression, accessible (aria-label), ne masque pas le footer.
- **Responsive empilé** : enrichir le bloc CSS/markup de la branche mobile (classes Tailwind sur les couches plutôt que styles inline minimalistes).

## Tests / vérification

- `npm run build` : 0 erreur, pages générées (la page infrastructure ne doit plus apparaître).
- Vérification visuelle desktop (Chrome) : effet relief + comète + survol ; nouvelles transitions par glissement ; zoom réduit ; section NRO + texte ; bouton flottant.
- Vérification responsive : largeurs ~375px (téléphone) et ~820px (tablette) — sections empilées lisibles, fenêtres relief OK, CTA flottant OK, pas de débordement horizontal.
- Page formations : fiches relief alimentées par Notion (ou fallback).
- Aucun lien mort vers `/infrastructure/`.

## Hors périmètre (YAGNI)

- Pas de refonte du blog, des habilitations, du contact (au-delà de la réception du paramètre `?formation=`).
- Pas de suppression des composants SectionNRO/SRO/PBO/ClientFinal.
- Pas de nouveau contenu Notion (on consomme l'existant).
