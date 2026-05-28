# Refonte scrollytelling, relief/fibre & responsive — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger et enrichir la home scrollytelling de KMC (effet relief/fibre, titre, transitions par glissement, zoom, section NRO + CTA), refondre la page formations au format fenêtres relief, supprimer la page infrastructure, et livrer une vraie déclinaison responsive téléphone/tablette.

**Architecture:** Site Astro statique. La home repose sur une timeline GSAP + ScrollTrigger (pin/scrub) gérée par `gsap.matchMedia` dans `ScrollytellingHero.astro` ; on conserve la branche desktop (≥1024px) et on enrichit la branche mobile (<1024px) en sections empilées soignées. Le langage visuel relief/fibre vit dans `global.css` (`.relief-panel`, `.relief-2`, `.fiber-pulse`). Un composant `FloatingCTA.astro` global est ajouté dans `Layout.astro`.

**Tech Stack:** Astro 6, Tailwind CSS v4 (`@theme` dans `global.css`), GSAP 3 + ScrollTrigger, Lenis, Notion API (`src/lib/notion.ts`).

**Spec de référence :** `docs/superpowers/specs/2026-05-28-refonte-scrollytelling-responsive-design.md`

**Note méthode (domaine visuel, pas de tests unitaires) :** chaque tâche est validée par (1) `npm run build` sans erreur et (2) une vérification visuelle ciblée. Pour la vérification visuelle, lancer `npm run dev` (http://localhost:4321) et inspecter, ou utiliser le skill `browse`/`gstack` pour screenshot desktop (1440px), tablette (820px) et téléphone (375px). Commits fréquents, un par tâche.

**Couleurs de référence :** bleu `#1e9ad7`, orange `#F59E0B`. Menu : `linear-gradient(rgba(16,50,88,.78),rgba(11,33,58,.82))`.

---

## Ordre des tâches

1. Suppression page infrastructure (isolé, sans risque) — §10
2. Composant FloatingCTA + intégration Layout — §8b
3. Effet relief/fibre : investigation + renforcement + `perspective` `#layer-ops` — §A
4. Hero scène 1 : titre, espacement, teinte fenêtre éléphant, recadrage techniciens — §1
5. Hero timeline : glissements (scènes 2 & 4), timing (2b), zoom (5) — §2,§4,§5
6. Section NRO + texte SEO + CTA contextuel — §8a
7. Fenêtres opérateurs : CTA contextuel + survol relief vérifié — §6,§7
8. Page formations refondue (fenêtres relief) — §9
9. Responsive : sections empilées <1024px — §B
10. Passe finale build + QA visuelle multi-écrans

---

## Task 1 : Supprimer la page infrastructure et le lien menu

**Files:**
- Delete: `src/pages/infrastructure.astro`
- Modify: `src/components/Navigation.astro:6` (retirer l'entrée `links`)

- [ ] **Step 1: Supprimer le fichier de page**

```bash
git rm "src/pages/infrastructure.astro"
```

- [ ] **Step 2: Retirer le lien du menu**

Dans `src/components/Navigation.astro`, supprimer la ligne :

```js
  { href: '/infrastructure/', label: 'Infrastructure' },
```

(Le tableau `links` est utilisé à la fois pour le menu desktop et mobile → une seule suppression suffit.)

- [ ] **Step 3: Vérifier l'absence de liens morts**

Run: `grep -rn "/infrastructure/" src/`
Expected: aucune occurrence (les mentions « infrastructure » en texte courant dans `SectionCatalogue.astro` et `habilitations.astro` ne sont PAS des liens et restent intactes).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: succès, et `dist/infrastructure/` n'existe plus. Vérifier :
Run: `ls dist/ | grep infrastructure || echo "OK: pas de page infrastructure"`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(nav): supprime la page infrastructure et son lien menu"
```

---

## Task 2 : Composant FloatingCTA « Demander un devis »

**Files:**
- Create: `src/components/FloatingCTA.astro`
- Modify: `src/layouts/Layout.astro:93` (insertion après `<slot />`)

- [ ] **Step 1: Créer le composant**

Create `src/components/FloatingCTA.astro` :

```astro
---
// Bouton flottant « Demander un devis » — présent sur toutes les pages via Layout.
// Lien vers /contact/. Masqué à l'impression. Sous le menu mobile ouvert (z-40 < nav z-50).
---
<a
  href="/contact/"
  class="floating-cta btn-cta-gradient fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold text-[#06121f] shadow-[0_8px_30px_-6px_rgba(0,0,0,.7)] transition-transform duration-300 hover:scale-105"
  aria-label="Demander un devis ou des informations sur une formation"
>
  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
  <span>Demander un devis</span>
</a>

<style>
  @media print { .floating-cta { display: none; } }
  /* Sur très petit écran : compacter le libellé si besoin */
  @media (max-width: 380px) {
    .floating-cta span { display: none; }
    .floating-cta { padding: 0.85rem; }
  }
</style>
```

- [ ] **Step 2: Intégrer dans Layout**

Dans `src/layouts/Layout.astro`, importer en tête du frontmatter (avec les autres imports si présents, sinon ajouter le bloc) et insérer juste après `<slot />` (ligne 93) :

Frontmatter (`---`) : `import FloatingCTA from '../components/FloatingCTA.astro';`

Body :
```astro
  <body>
    <slot />
    <FloatingCTA />
  </body>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succès.

- [ ] **Step 4: Vérification visuelle**

Lancer `npm run dev`, ouvrir `/`, `/contact/`, `/formations-fibre-optique/`, `/blog/` : le bouton flottant « Demander un devis » apparaît en bas à droite, ne masque pas le footer, et le clic mène à `/contact/`. Sur 375px le libellé se réduit à l'icône.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(cta): bouton flottant Demander un devis global (Layout)"
```

---

## Task 3 : Rétablir / renforcer l'effet relief + fibre

**Files:**
- Modify: `src/styles/global.css` (`.relief-panel`, `.relief-2`, `.fiber-pulse`)
- Modify: `src/components/ScrollytellingHero.astro` (`#layer-ops` / `#operators` — ajout `perspective`)

**Investigation d'abord (Step 1).** L'effet existe déjà dans le code ; il faut comprendre pourquoi il est peu visible avant de renforcer.

- [ ] **Step 1: Diagnostiquer**

Lancer `npm run dev`, ouvrir la home et inspecter au DevTools le `<nav class="relief-panel relief-2 fiber-pulse">` :
- La bordure dégradée orange→bleu est-elle rendue ? (vérifier que `border-color` n'est pas écrasé et que `border-box` est appliqué)
- `.fiber-pulse::after` est-il animé ? (vérifier le support de `@property --kmc-a` ; sur navigateurs sans support, `@supports not (background: conic-gradient(from 0deg))` masque l'effet)
- Le survol déclenche-t-il `.relief-2:hover` ? (vérifier `perspective` du parent : nav l'a `1000px`, `#layer-ops` ne l'a PAS → survol plat sur les fenêtres opérateurs)
- Y a-t-il un `overflow:hidden` parent qui coupe les halos latéraux (`box-shadow`) ? (`#scrolly-stage` a `overflow-hidden` → les halos des fenêtres internes sont rognés)

Noter les causes trouvées dans le message de commit.

- [ ] **Step 2: Renforcer la visibilité de l'effet dans `global.css`**

Augmenter l'intensité par défaut et au survol (valeurs indicatives, à affiner) — `.relief-panel` halos un cran plus visibles, `.fiber-pulse::after` opacité de pointe maintenue. Exemple d'ajustement du box-shadow par défaut :

```css
.relief-panel {
  /* …conserver background border-box… */
  box-shadow:
    -16px 0 46px -14px rgba(245,158,11,.6),
     16px 0 46px -14px rgba(30,154,215,.65),
     0 10px 25px -12px rgba(0,0,0,.8);
}
```

Garder les variantes `.relief-1:hover` / `.relief-2:hover` existantes (déjà accentuées). Ne pas casser les fallbacks `@supports` et `prefers-reduced-motion`.

- [ ] **Step 3: Ajouter `perspective` sur la grille opérateurs**

Dans `ScrollytellingHero.astro`, sur `#layer-ops` (ligne ~129) ou le conteneur `#operators`, ajouter `style="perspective:1000px;"` pour que `.relief-2:hover` (rotateX) ne soit plus plat.

- [ ] **Step 4: Si les halos sont rognés par `overflow-hidden`**

Si l'investigation (Step 1) confirme que `#scrolly-stage { overflow:hidden }` coupe les halos des fenêtres internes : ne PAS retirer l'overflow (il sert au pin/zoom). À la place, garder les halos latéraux dans le périmètre via des marges internes, OU accepter que les halos pleine intensité s'expriment surtout sur le menu (hors stage) et les fiches en page formations (hors stage). Documenter le choix.

- [ ] **Step 5: Build + vérification visuelle**

Run: `npm run build` → succès.
Visuel : menu affiche bordure dégradée + comète animée + réaction au survol (relief). Au scroll jusqu'aux 3 fenêtres opérateurs, le survol d'une fenêtre produit un relief (pas plat).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "fix(relief): renforce l'effet relief/fibre + perspective sur #layer-ops"
```

---

## Task 4 : Hero scène 1 — titre, espacement, teinte fenêtre éléphant, techniciens

**Files:**
- Modify: `src/components/ScrollytellingHero.astro` (`#layer-img0` : h1, `#elephant`, `#technicians`)

- [ ] **Step 1: Recolorer le titre serif (1a + 1b) + remonter le titre (1c)**

Remplacer le `<h1>` (lignes ~28-30) par une version avec spans colorés. K+M bleu, C orange, « fibre optique » orange. **Note : ceci change aussi `lg:top-[12%]` → `lg:top-[10%]`** (remonte le titre pour dégager de l'espace avec l'éléphant, cf. 1c) :

```astro
<h1 class="font-serif text-3xl md:text-5xl font-bold text-white text-center max-w-4xl lg:absolute lg:top-[10%] lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:px-6">
  <span class="text-[#1e9ad7]">K</span><span class="text-[#1e9ad7]">M</span><span class="text-[#F59E0B]">C</span>
  — Institut de formation professionnel en <span class="text-[#F59E0B]">fibre optique</span>
</h1>
```

(Garder un seul `<h1>` sur la page — c'est celui-ci.)

- [ ] **Step 2: Plus d'espace titre ↔ éléphant (1c)**

Le titre desktop est en `lg:absolute top-[12%]`, l'éléphant en `lg:absolute top-1/2`. Augmenter l'écart : passer le titre à `lg:top-[10%]` (déjà fait au step 1) et/ou descendre l'éléphant. En mobile (flux `gap-6`), augmenter à `gap-10` sur le conteneur `#layer-img0` pour un écart visible (~+2-4rem) sans chevauchement.

- [ ] **Step 3: Intérieur fenêtre éléphant plus clair que le menu (1d)**

Sur la `.relief-panel` de l'éléphant (ligne ~34), ajouter un `style` qui surcharge le background interne avec une teinte plus claire que le menu, en gardant la bordure dégradée :

```astro
<div class="relief-panel relief-2 fiber-pulse p-3"
     style="background:linear-gradient(rgba(28,70,116,.85),rgba(20,52,90,.88)) padding-box,linear-gradient(100deg,#f59e0b,#1e9ad7) border-box;">
```

- [ ] **Step 4: Recentrer l'image techniciens (1e)**

L'image `deux-techniciens-ivoiriens-fibre.png` est coupée à droite. Sur le `<img>` techniciens (ligne ~41), s'assurer d'un rendu non rogné : garder `object-contain` (déjà le cas) et vérifier que le conteneur `#technicians` ne force pas une largeur qui coupe. Si un recadrage `object-cover` est en cause ailleurs, passer à `object-contain` + `object-center`. Vérifier visuellement que les deux techniciens sont entiers.

- [ ] **Step 5: Build + vérification visuelle**

Run: `npm run build` → succès.
Visuel desktop + mobile : titre coloré correctement (K+M bleu, C orange, « fibre optique » orange), espace visible titre/éléphant, intérieur fenêtre éléphant plus clair que le menu, techniciens entiers.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(hero): titre coloré KMC, espacement, teinte fenêtre éléphant, recadrage techniciens"
```

---

## Task 5 : Hero timeline — glissements verticaux, timing, zoom réduit

**Files:**
- Modify: `src/components/ScrollytellingHero.astro` (branche desktop de `gsap.matchMedia`, lignes ~166-196)

- [ ] **Step 1: Scène 1→3 — glissement au lieu du fondu (2a)**

Dans la timeline, remplacer le fondu `.to(img0, { opacity: 0, … }, 0.4)` par :
- d'abord rendre `#layer-img1` visible : `.set(img1, { opacity: 1 }, 0.35)` (au lieu du `.to(img1,{opacity:1})` plus tardif) ;
- puis glisser la couche parente `#layer-img0` vers le haut : `.to(img0, { yPercent: -100, duration: 0.6, ease: 'power2.in' }, 0.4)`.

Translater **le parent** `#layer-img0`, pas les enfants (éléphant/techniciens gardent leurs transforms). Retirer l'ancien `.to(img1, { opacity: 1 }, 0.6)`.

- [ ] **Step 2: Timing texte plus tôt (2b)**

Avancer l'apparition de la carte texte : `.to(text, { opacity: 1, duration: 0.4 }, 1.2)` (au lieu de `1.7`).

- [ ] **Step 3: Scène 5 — glissement vers Image 2 (4a)**

Remplacer `.to([img1, text], { opacity: 0, … }, 2.6)` + `.to(img2,{opacity:1},2.6)` par :
- `.set(img2, { opacity: 1 }, 2.5)` (réseau visible dessous) ;
- `.to([img1, text], { yPercent: -100, duration: 0.6, ease: 'power2.in' }, 2.6)` (les deux couches glissent vers le haut) ;
- conserver `.to(video, { opacity: 1, duration: 0.4 }, 2.9)`.

- [ ] **Step 4: Zoom réduit de moitié + dézoom ajusté (5a)**

- Zoom (ligne ~184) : `scale: 2.3` → `scale: 1.65` (origine `6% 45%` inchangée).
- Dézoom (ligne ~193) : `scale: 1.3` → `scale: 1.25`.

- [ ] **Step 5: Build + vérification visuelle (scroll)**

Run: `npm run build` → succès.
Visuel desktop : en scrollant, la couche éléphant/techniciens **monte** pour révéler Image 1 (plus de passage au noir), la carte texte apparaît plus tôt, Image 1+texte **montent** pour révéler le réseau + vidéo, le zoom opérateurs est moins fort, le dézoom inclut le NRO. Vérifier l'absence de saut/clignotement aux transitions.

⚠️ Le cadrage du dézoom (`scale: 1.25`, origine `6% 45%`) suppose que le bâtiment NRO est visible au bord gauche d'`Image 2 - reseau.png` à ce niveau de zoom. **À affiner visuellement** : ajuster `scale` et/ou `transformOrigin` pour que le NRO soit effectivement cadré. Si le NRO n'est pas au bord gauche de l'image, ajuster l'origine en conséquence.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(hero): transitions par glissement vertical, timing texte, zoom réduit"
```

---

## Task 6 : Section présentation centre de formation + CTA contextuel

> Précision de vocabulaire : le « NRO » de la spec (§8) désigne le **bâtiment visible après le dézoom de `Image 2`**, pas cette couche. Cette couche est un **calque de texte de présentation** affiché APRÈS le dézoom. On la nomme donc `#layer-presentation` pour éviter la confusion.

**Files:**
- Modify: `src/components/ScrollytellingHero.astro` (nouvelle couche `#layer-presentation` + ajout dans la timeline ; CTA dans `#layer-text`)

- [ ] **Step 1: Ajouter la couche présentation dans le markup**

Avant la couche `#layer-formation` (ligne ~138), ajouter une couche `#layer-presentation` (z-55, sous formation z-60) avec le texte adapté de `KMC_presentation_site_SEO.md`. Hiérarchie : `<h2>`/`<h3>` (le `<h1>` reste le titre serif). Contenu condensé :

```astro
<!-- Texte présentation centre de formation (z-55) : après le dézoom NRO -->
<div id="layer-presentation" class="absolute inset-0 z-[55] flex items-center justify-center px-4 opacity-0 bg-[#070d18]/70">
  <div class="max-w-3xl text-center">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-5">Centre de formation de techniciens <span class="text-[#1e9ad7]">fibre optique</span> à Abidjan</h2>
    <p class="text-white/70 text-base md:text-lg leading-relaxed mb-4">KMC forme des techniciens immédiatement opérationnels sur les réseaux FTTH des trois grands opérateurs ivoiriens (Orange, MTN, Moov), en associant enseignement théorique et ateliers pratiques intensifs sur matériel professionnel.</p>
    <p class="text-white/60 text-sm md:text-base leading-relaxed mb-7">Sécurité chantier, habilitations de base, raccordement, soudure et mesures OTDR : nos apprenants sont évalués tout au long du parcours puis mis en situation en entreprise. Exemple de parcours : la formation <span class="text-[#F59E0B] font-semibold">FTTH-D2</span>.</p>
    <a href="/contact/" class="btn-cta-gradient inline-flex px-6 py-3 rounded-lg font-bold text-[#06121f]">Demander un devis ou des informations</a>
  </div>
</div>
```

- [ ] **Step 2: Insérer la couche dans la timeline (APRÈS la fin du dézoom)**

Récupérer l'élément : `const presentation = document.getElementById('layer-presentation');` (avec les autres `getElementById`).

⚠️ **Timing à respecter** : le dézoom est `.to(img2, { scale: 1.25, duration: 0.9 }, 7.3)` → il se **termine à 8.2**. Le texte de présentation ne doit apparaître qu'après, sinon il masque le dézoom NRO que la spec veut montrer. Donc **décaler aussi la fiche formation et le hold final** :

```js
// dézoom finit à 8.2
.to(presentation, { opacity: 1, duration: 0.4 }, 8.3)   // apparaît après le dézoom
.to(presentation, { opacity: 0, duration: 0.3 }, 9.0)
// Scène 10 : fiche formation — décalée après la présentation
.to(formation, { opacity: 1, duration: 0.6 }, 9.2)
.to({}, { duration: 1.0 }, 10.0);                        // hold final allongé
```

Remplacer les anciennes positions `.to(formation,{opacity:1},8.3)` et `.to({},{duration:1.0},9.1)` par celles ci-dessus. (Le `scrub` remappe l'ensemble sur la hauteur de scroll — pas besoin d'allonger `#scrolly`.)

- [ ] **Step 3: Ajouter un CTA dans la carte texte (#layer-text)**

Dans `#layer-text`, sous le label habilitation (après ligne ~115), ajouter un CTA discret :

```astro
<a href="/contact/" class="btn-cta-gradient mt-5 inline-flex px-5 py-2.5 rounded-lg font-bold text-[#06121f]">Demander un devis</a>
```

- [ ] **Step 4: Build + vérification visuelle**

Run: `npm run build` → succès.
Visuel : le dézoom NRO est bien **visible quelques instants** AVANT que la section texte « Centre de formation… » n'apparaisse (vérifier qu'il n'est plus masqué), puis le CTA, puis la fiche formation. Un seul `<h1>` sur la page (vérifier manuellement dans le markup que seul le titre serif est `h1`).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(hero): section NRO + texte centre de formation (SEO) + CTA contextuels"
```

---

## Task 7 : Fenêtres opérateurs — CTA + survol relief vérifié

**Files:**
- Modify: `src/components/OperatorWindow.astro`

- [ ] **Step 1: Ajouter un CTA dans chaque fenêtre opérateur**

À la fin de l'`<article>` d'`OperatorWindow.astro` (avant `</div>` de `relative z-10`), ajouter un lien contextuel :

```astro
<a href="/contact/" class="mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={`color:${op.color}`} aria-label={`Demander des informations sur la formation ${op.name}`}>
  Demander des informations →
</a>
```

- [ ] **Step 2: Vérifier le survol relief (dépend de Task 3 step 3)**

S'assurer que `#layer-ops`/`#operators` a bien `perspective` (ajouté en Task 3) pour que `.relief-2:hover` produise le relief sur les fenêtres opérateurs.

Note : `OperatorWindow` utilise `.relief-2` **sans** `.fiber-pulse` aujourd'hui (donc pas de comète sur ces fenêtres). C'est conforme à la spec (relief + survol dynamique). Si l'on souhaite la comète fibre ici aussi, ajouter la classe `fiber-pulse` à l'`<article>` — optionnel, à valider visuellement (ne pas surcharger).

- [ ] **Step 3: Build + vérification visuelle**

Run: `npm run build` → succès.
Visuel : chaque fenêtre opérateur a son CTA (couleur de l'opérateur) ; au survol, relief visible (translation + halos accentués). La comète n'est attendue que si `fiber-pulse` a été ajoutée.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(operators): CTA contextuel par fenêtre opérateur"
```

---

## Task 8 : Page formations refondue (fenêtres relief)

**Files:**
- Modify: `src/pages/formations-fibre-optique.astro`
- (Réutilise: `src/components/FormationCard.astro`)

- [ ] **Step 1: Remplacer la grille de cartes par des FormationCard relief**

Importer `FormationCard` dans le frontmatter : `import FormationCard from '../components/FormationCard.astro';`

Remplacer le bloc `<article class="formation-card …">…</article>` (lignes ~80-135) par une grille de `FormationCard` (style fenêtre relief de la home). La grille reçoit `perspective` pour le survol :

```astro
{formations.length > 0 && (
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8" style="perspective:1200px;">
    {formations.map((formation) => (
      <FormationCard formation={formation} />
    ))}
  </div>
)}
```

(1 colonne téléphone, 2 colonnes dès la tablette `md:` — conforme à la spec « 2 tablette, 2 desktop » pour des fiches denses.)

`FormationCard` utilise `.relief-1 fiber-pulse` et `max-w-2xl mx-auto` ; pour une grille 2 colonnes, retirer/neutraliser le `max-w-2xl` via un wrapper `w-full` ou adapter la carte (vérifier le rendu ; au besoin envelopper chaque carte dans `<div class="w-full">`). Garder l'option 1 colonne mobile.

- [ ] **Step 2: Conserver hero, états vide/erreur, JSON-LD, CTA devis**

Ne pas toucher au `<section>` hero (un seul `<h1>` = titre de page ligne ~49), aux blocs `notionError` / `formations.length === 0`, au JSON-LD `Course`, ni au CTA « Demander un devis » de bas de page. Les fiches restent en `<h3>` (pas de second `h1`).

- [ ] **Step 3: Build + vérification visuelle**

Run: `npm run build` → succès (les formations viennent de Notion ou du fallback ; si Notion indisponible au build, vérifier que la page ne plante pas).
Visuel : `/formations-fibre-optique/` affiche les fiches au format fenêtre relief (bordure dégradée, fiber-flow sous le titre, survol relief), grille responsive.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(formations): page formations au format fenêtres relief (FormationCard)"
```

---

## Task 9 : Responsive — sections empilées soignées (<1024px)

**Files:**
- Modify: `src/components/ScrollytellingHero.astro` (branche `mm.add('(max-width: 1023px)…')`, lignes ~208-225, + classes responsive sur les couches)

- [ ] **Step 1: Styliser les couches en mode empilé**

Aujourd'hui la branche mobile aplatit brutalement (`position:relative; opacity:1`). L'enrichir pour que chaque couche soit une vraie section verticale lisible :
- Chaque `#layer-*` en mode empilé : `min-height` confortable (ex. classes conditionnelles ou styles appliqués par la branche JS), padding vertical (`py-16`), centrage du contenu.
- S'assurer que les couches qui étaient `opacity-0` / `absolute` passent en flux normal et visibles.
- Les fenêtres relief conservées ; halos latéraux déjà désactivés <1024px pour le nav (cf. Navigation `@media`).
- Adapter les tailles d'images (`max-h`) pour tablette vs téléphone via classes Tailwind `sm:`/`md:`.

Approche recommandée : dans la branche mobile du `matchMedia`, après avoir mis `position:relative`, ajouter une classe utilitaire (ex. `stacked-section`) sur chaque `#layer-*` et définir son style dans un `<style>` du composant (padding, min-height, display flex centré). Veiller au cleanup (retrait des classes/styles inline au teardown, comme déjà fait).

- [ ] **Step 2: Vérifier l'ordre logique en empilé**

L'ordre DOM des couches détermine l'ordre vertical : img2(z-10) → img1(z-20) → img0(z-30) → text(z-40) → op-intro(z-50) → ops(z-50) → presentation(z-55) → formation(z-60). En empilé, cet ordre DOM donne réseau → image1 → éléphant → texte → … ce qui n'est PAS l'ordre narratif souhaité (éléphant d'abord). **Réordonner le markup** pour que l'ordre DOM corresponde à la narration : éléphant/titre → image1 → carte texte → réseau+vidéo → intro opérateurs → fenêtres opérateurs → présentation → fiche formation.

⚠️ **GARDE-FOU (à respecter absolument) :**
- Réordonner **uniquement à l'intérieur de `#scrolly-stage`**, et garder **tous les `#layer-*` comme enfants directs de `#scrolly-stage`**. Sortir une couche du stage casserait le `pin`/`scrub`.
- La timeline desktop cible les couches par `getElementById` (lignes ~154-164) et l'empilement visuel par `z-index` — donc le réordonnancement DOM **n'affecte pas** la séquence desktop. Le teardown mobile (`querySelectorAll('#scrolly-stage > div')`) et le stagger `.op-win` (sélecteur de classe) sont aussi indépendants de l'ordre.
- **Tester le desktop ≥1024px après réordonnancement** pour confirmer que rien n'a bougé.

- [ ] **Step 3: Build + vérification visuelle multi-écrans**

Run: `npm run build` → succès.
Visuel à 375px (téléphone) et 820px (tablette) : sections empilées dans l'ordre narratif, lisibles, fenêtres relief OK, vidéo visible, bouton flottant présent, pas de débordement horizontal. **Re-vérifier le desktop ≥1024px** : la timeline scrollytelling fonctionne toujours (le réordonnancement DOM ne l'a pas cassée).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(responsive): sections empilées soignées téléphone/tablette"
```

---

## Task 10 : Passe finale build + QA visuelle

**Files:** aucune création ; corrections ponctuelles si la QA révèle des défauts.

- [ ] **Step 1: Build complet propre**

Run: `npm run build`
Expected: 0 erreur ; pages attendues générées ; pas de page `infrastructure`.

- [ ] **Step 2: QA visuelle desktop (≥1024px)**

Parcourir toute la séquence : effet relief/fibre menu + fenêtres, titre coloré, espacement, fenêtre éléphant plus claire, techniciens entiers, glissements (pas de fondu noir), texte plus tôt, réseau+vidéo, zoom réduit, intro opérateurs, 3 fenêtres (survol relief), dézoom NRO, texte centre de formation + CTA, fiche formation, CTA flottant. Page `/formations-fibre-optique/` en fenêtres relief.

- [ ] **Step 3: QA visuelle tablette (820px) + téléphone (375px)**

Sections empilées dans l'ordre, lisibles, CTA flottant, pas de scroll horizontal.

- [ ] **Step 4: Corriger les défauts éventuels puis commit final**

```bash
git add -A
git commit -m "fix(qa): ajustements finaux refonte scrollytelling/responsive"
```

- [ ] **Step 5: Récapitulatif à l'utilisateur**

Lister ce qui a été fait par point (A, 1–10, B), signaler tout point nécessitant une validation visuelle de sa part avant push vers `main`/Vercel.

---

## Notes transverses

- **Ne pas pousser** vers `main`/Vercel sans accord explicite de l'utilisateur (déploiement = action sortante).
- **`@` skills utiles :** `browse`/`gstack` pour QA visuelle et screenshots multi-écrans ; `investigate` si un bug GSAP résiste.
- **Fichiers volumineux à ne pas committer :** ne pas ajouter les logs `.npm-cache/` (déjà du bruit dans le statut git) — utiliser des `git add` ciblés, pas `git add -A` aveugle si des fichiers parasites apparaissent. (Les steps utilisent `git add -A` pour la simplicité ; vérifier `git status` avant chaque commit.)
- **Notion :** la page formations dépend de `getFormations()` ; en l'absence de token au build local, le fallback gracieux évite le plantage mais la grille peut être vide — c'est normal en local.
