# Refonte design — Séquence scrollytelling KMC (10 points)

> Design validé le 2026-05-28. Refonte de la page d'accueil du site KMC.ci autour d'une
> séquence scrollytelling de 10 scènes, d'un nouvel effet visuel signature « fenêtre
> éclairée en relief », d'un menu redessiné et d'une fiche formation type.

---

## 1. Contexte et objectif

Le site (Astro v6 statique, GSAP + ScrollTrigger, Lenis, Tailwind v4, données Notion) possède
aujourd'hui une page d'accueil composée d'un `ScrollytellingScene` court, d'un `HeroTunnel` 3D,
puis d'une série de sections (`SectionOperators`, `SectionNRO/SRO/PBO/ClientFinal`,
`SectionCatalogue`) séparées par des `ImageSeparator`.

**Objectif :** remplacer entièrement la page d'accueil par une **séquence narrative de 10 scènes**
décrite par le client, avec un langage visuel unifié (effet « fenêtre éclairée en relief »,
fond bleu marine localisé au menu, impulsions lumineuses « flux fibre »).

**Périmètre :**
- ✅ Refonte page d'accueil = uniquement la séquence des 10 points.
- ✅ Refonte du menu (`Navigation.astro`).
- ✅ Nouvelle fiche formation type (alimentée par Notion, FTTH-D2 en vedette).
- ✅ Déplacement du contenu NRO/SRO/PBO/Client final vers une page séparée (préservation SEO).
- ❌ Hors périmètre : pages `/contact/`, `/habilitations/`, `/blog/`, automatisation SEO, Notion pipeline (inchangés).

---

## 2. Langage visuel validé (décisions verrouillées)

### 2.1 Effet signature « fenêtre éclairée en relief »

Élément récurrent : menu, image éléphant d'accueil, fenêtres opérateurs, fiches formation.

- **Contour** : bordure dégradée `linear-gradient(100deg, #f59e0b, #1e9ad7)` (orange → bleu)
  appliquée en `border-box` (technique double-background padding-box/border-box).
- **Halo latéral** : `box-shadow` orange à gauche, bleu à droite.
  Base : `-14px 0 40px -16px rgba(245,158,11,.5), 14px 0 40px -16px rgba(30,154,215,.55)`.
- **Fond du panneau** : sombre translucide `rgba(13,26,46,.95)` → `rgba(10,20,36,.96)`.
- **Relief au survol — deux niveaux :**
  - **Niveau 2 (prononcé)** — pour **menu, image 0, fenêtres opérateurs** :
    `transform: translateY(-20px) scale(1.06) rotateX(6deg)` + ombre au sol + halos renforcés.
    Nécessite `perspective` sur le conteneur et `transform-style: preserve-3d`.
  - **Niveau 1 (modéré)** — pour **fiches formation** :
    `transform: translateY(-10px)` + ombre renforcée, **sans** scale ni rotateX.
- **Transition** : `transform .45–.5s cubic-bezier(.2,.85,.25,1), box-shadow .45–.5s ease`.

### 2.2 Impulsion « flux fibre » (autour des cadres)

Comète lumineuse qui parcourt le périmètre d'un cadre **toutes les 5 s, visible ~2 s**.

- Technique : pseudo-élément `::after` en `conic-gradient(from var(--a), …)` avec une comète
  blanc/cyan/orange étroite, masqué en anneau via `mask` (`mask-composite: exclude` + padding).
- Variable animée `@property --a { syntax:'<angle>'; initial-value:0deg; inherits:false }`.
- Keyframes (cycle 5 s) :
  `0%{--a:-20deg;opacity:0} 4%{opacity:1} 36%{--a:360deg;opacity:1} 40%{--a:380deg;opacity:0} 100%{opacity:0}`.
- Appliqué : menu (point 2), fiche formation (point 10), fenêtres opérateurs (optionnel).
- **Fallback** : `@supports not (background: conic-gradient(from 0deg))` ou absence de `@property`
  → l'effet est simplement absent (la bordure dégradée statique reste). `prefers-reduced-motion`
  → animation désactivée.

### 2.3 Couleurs et fond

- **Fond du site** : sombre, radial `radial-gradient(circle at 50% 30%, #0c1426, #070d18 75%)`.
  (Légèrement bleuté, plus sombre que le marine.)
- **Bleu marine `#103258`** : **localisé uniquement autour du menu** (halo `radial-gradient`
  flouté derrière la barre), pas sur tout le site.
- Orange charte `#f59e0b` / `#f97316` ; bleu KMC `#1e9ad7` ; cyan accent `#7dd3fc`.
- Verts/oranges d'état pour taux : réussite `#34d399`, abandon `#fb923c`.

### 2.4 Typographie

- **Titres principaux** : **Playfair Display** (serif classique élégante), à charger via
  Google Fonts dans `Layout.astro` (ajouter `Playfair+Display:wght@600;700`).
- Corps : Inter (existant). `Space Grotesk` conservé pour sous-titres techniques si besoin.
- Nouveau token CSS `--font-serif: "Playfair Display", Georgia, serif;` dans `global.css`.

---

## 3. La séquence des 10 scènes

La page d'accueil est **une seule séquence pinned scrollytelling**. Un conteneur `#scrolly`
de grande hauteur (≈ **900–1000 vh**) contient un étage `sticky top-0 h-screen` dans lequel des
couches absolues s'animent selon la progression de scroll (GSAP timeline + ScrollTrigger `scrub`,
piloté par Lenis comme l'actuel `lib/scroll`).

> Les valeurs de progression `p` ci-dessous (0 → 1 sur toute la séquence) sont indicatives et
> seront affinées au montage. Chaque scène ≈ 70–110 vh de scroll.

| # | Scène | Progression | Comportement |
|---|-------|-------------|--------------|
| 1 | **Image 0 — Éléphant** | 0 → 0.06 | `Image 0 - Elephant.png` centrée sur fond noir, traitée en **relief signature niveau 2** (panneau/cadre lumineux orange-gauche / bleu-droite, intensifié au survol). **Titre serif** au-dessus : « KMC — Institut de formation professionnel en fibre optique » (Playfair Display). Lumières identiques au menu. |
| 2 | **Menu** | persistant | Voir §4. Présent en `fixed` au-dessus de toute la séquence. |
| 3 | **Fondu → Image 1** | 0.06 → 0.16 | Léger fondu au noir, puis `Image 1 - centre de formation.png` apparaît en fondu (plein cadre, `object-cover`). |
| 4 | **Fenêtre texte + 2 logos** | 0.16 → 0.20 | Scroll très court (quasi instantané) : la carte texte actuelle (H1/H2/texte enrichi + logos **FDFP** et **AEJ**) apparaît en overlay sur Image 1. Réutilise le contenu de l'actuel `ScrollytellingScene` (carte verre dépoli). |
| 5 | **Fondu → Image 2 + flux fibre** | 0.20 → 0.34 | Fondu vers `Image 2 - reseau.png`. Quasi instantanément, la `video flux fibre.mp4` se révèle par-dessus (effet « image par image » du flux). **Décision technique §6.3.** |
| 6 | **Zoom opérateurs** | 0.34 → 0.44 | Zoom sur la **partie gauche** de l'image (bâtiments Orange / MOOV / MTN) : `scale ~1.45, transform-origin: left center` (comme l'actuel). |
| 7 | **Texte intro opérateurs** | 0.44 → 0.52 | Overlay du texte existant : « KMC forme les techniciens des **3 opérateurs nationaux** » + paragraphe (repris tel quel de `SectionOperators`). Fond assombri pour lisibilité. |
| 8 | **3 fenêtres opérateurs** | 0.52 → 0.72 | Apparition successive de 3 fenêtres **relief signature niveau 2** : **Orange**, puis **MOOV**, puis **MTN** (ordre du client). Chaque fenêtre = spécificités réseau + compétences + matériel (contenu SEO repris de `SectionOperators`). Dynamique au survol. |
| 9 | **Dézoom + NRO** | 0.72 → 0.82 | Les fenêtres disparaissent, retour au visuel zoomé de la scène 6, puis **léger dézoom** (`scale 1.45 → ~1.2`, origine ajustée) pour **inclure le bâtiment NRO**. Valeurs dépendent de la composition d'Image 2 — **à caler visuellement §6.4**. |
| 10 | **Fiche formation FTTH-D2** | 0.82 → 0.96 | Apparition de la fiche formation **FTTH-D2** (voir §5), relief **niveau 1** + impulsion fibre. Données Notion. |
| — | **Sortie + CTA** | 0.96 → 1 | Maintien de la fiche + bouton « Voir le catalogue complet » → `/formations-fibre-optique/`. Fin du pin, footer ensuite. |

### Logos et assets (tous présents dans `public/images/`)
`Image 0 - Elephant.png`, `Image 1 - centre de formation.png`, `Image 2 - reseau.png`,
`video flux fibre.mp4`, `logo-kmc.png`, `FDFP.png`, `AEJ.png`.

---

## 4. Menu (`Navigation.astro`)

- Barre **noire flottante** (`fixed top`), contour dégradé orange→bleu, relief signature niveau 2.
- **Halo bleu marine `#103258` localisé** derrière/autour de la barre uniquement
  (`radial-gradient` flouté en pseudo-élément), + **bande lumineuse persistante en dessous**
  (reste visible pendant tout le scroll).
- **Impulsion flux fibre** sur le cadre (§2.2), 5 s / ~2 s.
- Lumières **intensifiées au survol** du menu.
- Logo dans pastille blanche, wordmark possible en Playfair.
- **Menu mobile** : conserver le pattern hamburger existant ; halo/relief simplifiés, impulsion
  fibre désactivée sur mobile.

### Liens de navigation (mis à jour)

La page d'accueil étant une séquence pinned, les ancres internes (`/#nro`, etc.) ne sont plus
pertinentes. Nouveaux liens :

| Libellé | Cible |
|---------|-------|
| Accueil | `/` |
| Opérateurs | `/#operators` (ancre vers la scène 7/8 du scrolly — voir §6.5) |
| Formations | `/formations-fibre-optique/` |
| Infrastructure | `/infrastructure/` (nouvelle page, §7) |
| Habilitations | `/habilitations/` |
| Blog | `/blog/` |
| Contact (CTA) | `/contact/` |

---

## 5. Fiche formation type (`FormationCard.astro`)

Composant réutilisable (même style pour **toutes** les fiches du site). Relief **niveau 1** +
impulsion fibre + fine **ligne de flux animée** sous le titre.

### Layout (selon description client)

```
                 ┌──────────────────────────────────────┐
                 │            Nom  (centré, Playfair)     │
                 │        ───── ligne flux animée ─────    │
                 │                                          │
                 │  Durée de formation institut : …   Prérequis : …          │
                 │  Durée du stage entreprise : …     Lieu de la formation : …│
                 │  Participants maximum : …                                  │
                 │                                          │
                 │        Programme de formation  (centré, plus gros)         │
                 │              [contenu programme, centré]                   │
                 │                                          │
                 │     À l'issue de cette formation, vous saurez : (centré)   │
                 │              [contenu issue, centré]                       │
                 │                                          │
                 │  Taux de réussite : XX %        Taux d'abandon : XX %       │
                 └──────────────────────────────────────┘
```

### Mapping des champs Notion (interface `Formation` existante, `src/lib/notion.ts`)

| Emplacement | Label affiché | Champ |
|---|---|---|
| Centré (grand, Playfair) | — | `nom` |
| Gauche, petite police | « Durée de formation en institut : » | `dureeFormation` |
| Gauche | « Durée du stage en entreprise : » | `dureeStagePratique` |
| Gauche | « Participants maximum : » | `participants` |
| Droite (même ligne que durée institut) | « Prérequis : » | `prerequis` |
| Droite | « Lieu de la formation : » | `lieu` |
| Centré, plus gros | « Programme de formation » + contenu | `programme` |
| Centré, petite police | « À l'issue de cette formation, vous saurez : » + contenu | `issue` |
| Bas gauche | « Taux de réussite : » | `tauxReussite` |
| Bas droite (même ligne) | « Taux d'abandon : » | `tauxAbandon` |

### Sélection de la fiche d'accueil

- Helper dans `notion.ts` : `getFormationByName(nom: string)` (ou filtrage côté composant)
  pour récupérer **FTTH-D2**. Fallback : première formation, sinon **données statiques de secours**
  si Notion indisponible (le build Astro est statique — éviter une page vide).
- Le composant `FormationCard` accepte une `Formation` en prop ; il sera aussi réutilisable
  dans `/formations-fibre-optique/` (catalogue).

---

## 6. Architecture technique

### 6.1 Composants

| Fichier | Rôle | Action |
|---|---|---|
| `src/components/Navigation.astro` | Menu signature + flux fibre | **Réécrire** (§4) |
| `src/components/ScrollytellingHero.astro` | Étage pinné + timeline GSAP des 10 scènes | **Nouveau** (remplace l'actuel `ScrollytellingScene.astro`) |
| `src/components/OperatorWindow.astro` | Fenêtre opérateur relief niveau 2 (scène 8) | **Nouveau** (contenu repris de `SectionOperators`) |
| `src/components/FormationCard.astro` | Fiche formation type (§5) | **Nouveau** |
| `src/components/ui/ReliefPanel.astro` | Primitive panneau relief (niveau 1/2, props) factorisant le style signature | **Nouveau** (optionnel mais recommandé pour cohérence) |
| `src/pages/index.astro` | Assemble Navigation + ScrollytellingHero + Footer | **Réécrire** (retirer HeroTunnel, FiberLine, sections, séparateurs) |
| `src/pages/infrastructure.astro` | Page NRO/SRO/PBO/Client (SEO) | **Nouveau** (§7) |
| `src/components/Section{NRO,SRO,PBO,ClientFinal}.astro` | Contenu technique | **Déplacés** vers `/infrastructure/`, restylés au nouveau langage |
| `src/components/{HeroTunnel,FiberLine,ImageSeparator,SectionCatalogue}.astro` | — | Retirés de l'accueil (conservés dans le repo, réutilisables ailleurs) |
| `src/styles/global.css` | Tokens couleurs, `--font-serif`, utilitaires relief/flux | **Mettre à jour** |
| `src/layouts/Layout.astro` | `<head>` | **Ajouter** Playfair Display |
| `src/lib/notion.ts` | API Notion | **Ajouter** `getFormationByName` + fallback statique |

### 6.2 Orchestration scroll

- Réutiliser `lib/scroll` (gsap, ScrollTrigger, initLenis) — déjà intégré Lenis.
- Une `gsap.timeline()` unique, attachée à `ScrollTrigger.create({ trigger:'#scrolly',
  start:'top top', end:'bottom bottom', scrub:1–1.5, pin:'#scrolly-stage', invalidateOnRefresh:true })`.
- Couches absolues empilées (`z-index`) dans `#scrolly-stage` (sticky 100vh) ; on anime
  `opacity`, `scale`, `transformOrigin`, `y` par scène. `will-change: transform, opacity` sur
  les couches lourdes.

### 6.3 Décision — effet « flux fibre » sur la vidéo (scène 5)

Deux options ; **défaut recommandé : A** (robuste, fidèle à l'actuel) :
- **A — Autoplay révélé** : la vidéo (`autoplay loop muted playsinline`) est dévoilée par
  `opacity` au point 5. Simple, fluide mobile. ✅ par défaut.
- **B — Scrub frame-by-frame** : `video.currentTime` piloté par la progression de scroll
  (vrai « image par image »). Plus fidèle au brief mais lourd/saccadé sur mobile et fragile
  (décodage). À considérer en amélioration desktop uniquement.

> Question ouverte à confirmer avec le client si « image par image » est impératif.

### 6.4 Point d'attention — scène 9 (dézoom NRO)

Les valeurs de `scale`/`transform-origin` dépendent de l'emplacement du bâtiment NRO dans
`Image 2 - reseau.png`. À caler visuellement pendant l'implémentation (vérifier que le NRO est
adjacent aux 3 opérateurs dans l'image). Si l'image ne contient pas de NRO identifiable,
prévoir une variante (overlay label « NRO » ou recadrage différent).

### 6.5 Accessibilité, mobile, performances

- **`prefers-reduced-motion`** et **mobile (< lg)** : pas de pin/scrub fragile. Fallback =
  version empilée en flux normal — chaque scène devient une section verticale classique
  (image + texte + fenêtres + fiche), sans zoom ni comètes. Détection : media query +
  garde JS (ne pas initialiser ScrollTrigger pin si mobile/reduced-motion).
- **Préchargement** : `Image 0` et `Image 1` en `loading="eager"` ; vidéo `preload="auto"` ;
  reste en `lazy`.
- **`@property` / `conic-gradient`** : dégradation gracieuse (§2.2) — la bordure statique reste.
- Conserver `overflow-x: clip` sur `body` (déjà en place pour le sticky).
- SEO : le contenu textuel (H1 serif, paragraphes opérateurs, fiche) doit rester dans le DOM
  (pas masqué par `display:none`) — utiliser `opacity` pour les transitions afin que le texte
  reste indexable.

---

## 7. Page `/infrastructure/` (préservation SEO)

- Nouvelle page regroupant le contenu de `SectionNRO`, `SectionSRO`, `SectionPBO`,
  `SectionClientFinal` (riche en SEO : NRO, SRO, PBO, témoignages).
- Restylée au nouveau langage (fenêtres relief signature, fond sombre).
- Liée depuis le menu (« Infrastructure ») et depuis la fin de l'accueil.
- Métadonnées propres (title/description), incluse au sitemap.

---

## 8. Étapes d'implémentation (haut niveau)

1. **Fondations style** : tokens `global.css` (couleurs, `--font-serif`, utilitaires relief/flux),
   Playfair Display dans `Layout.astro`, primitive `ReliefPanel`.
2. **Menu** : réécrire `Navigation.astro` (halo marine local, bande persistante, flux fibre, liens).
3. **Fiche formation** : `FormationCard.astro` + `getFormationByName`/fallback dans `notion.ts`.
4. **Fenêtres opérateurs** : `OperatorWindow.astro` (contenu repris de `SectionOperators`).
5. **Séquence** : `ScrollytellingHero.astro` (10 scènes, timeline GSAP, fallback mobile/reduced-motion).
6. **Page index** : réécrire `index.astro` (Navigation + ScrollytellingHero + Footer).
7. **Page infrastructure** : `/infrastructure/` (déplacer/restyler NRO/SRO/PBO/Client).
8. **Vérifications** : `npm run build` (10 pages), test navigateur desktop + mobile + reduced-motion,
   contrôle des scènes 5 et 9 (décisions §6.3/§6.4), indexabilité du texte.

---

## 9. Critères de succès

- La page d'accueil déroule fidèlement les 10 scènes au scroll (desktop), avec fallback propre
  sur mobile / `prefers-reduced-motion`.
- Effet signature cohérent (contour orange→bleu, relief niveau 2 menu/opérateurs, niveau 1 fiches).
- Menu : halo marine local + bande persistante + impulsion flux fibre 5 s/2 s + intensification survol.
- Fiche FTTH-D2 alimentée par Notion, layout conforme au §5, fallback si Notion indisponible.
- Contenu NRO/SRO/PBO/Client préservé sur `/infrastructure/` (SEO).
- `npm run build` vert ; texte des scènes reste dans le DOM (indexable).

---

## 10. Risques / questions ouvertes

- **Scène 5** : « image par image » strict (option B) vs autoplay révélé (option A par défaut) — à confirmer.
- **Scène 9** : position du NRO dans `Image 2` à vérifier (valeurs de zoom).
- **Ancre « Opérateurs »** dans un scrolly pinné : navigation par ancre vers une scène pinnée
  nécessite un calcul de scroll (offset dans la hauteur du `#scrolly`) — à implémenter ou
  remplacer par un défilement vers la page `/infrastructure/`.
- **Longueur de la séquence** (~900–1000 vh) : valider le confort de scroll, ajuster les durées.
- **`@property`** non supporté sur très anciens navigateurs : effet flux absent (acceptable).
```
