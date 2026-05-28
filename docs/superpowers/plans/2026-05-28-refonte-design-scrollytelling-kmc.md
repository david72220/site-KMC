# Refonte design scrollytelling KMC — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la page d'accueil de KMC.ci par une séquence scrollytelling de 10 scènes avec un langage visuel unifié (effet « fenêtre éclairée en relief » + impulsions « flux fibre »), un menu redessiné, une fiche formation type alimentée par Notion, et déplacer le contenu NRO/SRO/PBO/Client vers une page `/infrastructure/`.

**Architecture :** Astro v6 statique. Le style signature (bordure dégradée orange→bleu, halos, relief au survol, comète flux fibre) est factorisé en classes CSS partagées dans `global.css` (source unique). La page d'accueil = un unique étage `sticky` piloté par une timeline GSAP/ScrollTrigger (déjà intégré via `src/lib/scroll`), avec fallback empilé sur mobile/`prefers-reduced-motion`. Les données formation viennent de Notion au build.

**Tech Stack :** Astro 6, Tailwind v4 (`@theme` dans global.css), GSAP + ScrollTrigger, Lenis, `@notionhq/client`, Google Fonts (Playfair Display).

**Spec de référence :** `docs/superpowers/specs/2026-05-28-refonte-design-scrollytelling-kmc-design.md`

**Vérification (pas de test-runner dans le projet) :** chaque tâche se vérifie par
`npm run build` (doit générer les pages sans erreur) + contrôle visuel via `npm run dev`
(navigateur, desktop + mobile + `prefers-reduced-motion`). Pour le contrôle navigateur, utiliser
le skill `browse` ou `verify` si disponible.

**Convention de commit :** commits fréquents, un par tâche (ou sous-étape cohérente).
Co-Author : `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`.

---

## Structure des fichiers

| Fichier | Responsabilité | Action |
|---|---|---|
| `src/styles/global.css` | Tokens (couleurs, `--font-serif`), classes partagées `.relief-panel`, `.relief-1/2`, `.fiber-pulse`, `.fiber-flow` | Modifier |
| `src/layouts/Layout.astro` | `<head>` — charger Playfair Display | Modifier (ligne 59) |
| `src/components/ui/ReliefPanel.astro` | Primitive panneau relief (prop `level`), slot | Créer |
| `src/components/Navigation.astro` | Menu signature (halo marine local, bande persistante, flux fibre, liens) | Réécrire |
| `src/lib/notion.ts` | `getFormationByName` + fallback statique FTTH-D2 | Modifier |
| `src/components/FormationCard.astro` | Fiche formation type (layout §5 spec) | Créer |
| `src/components/OperatorWindow.astro` | Fenêtre opérateur (relief niveau 2) | Créer |
| `src/data/operators.ts` | Contenu des 3 opérateurs (Orange/MOOV/MTN) extrait pour DRY | Créer |
| `src/components/ScrollytellingHero.astro` | Étage pinné + timeline GSAP des 10 scènes + fallback | Créer (remplace `ScrollytellingScene.astro`) |
| `src/pages/index.astro` | Assemble Navigation + ScrollytellingHero + Footer | Réécrire |
| `src/pages/infrastructure.astro` | Regroupe NRO/SRO/PBO/Client (SEO) | Créer |
| `src/components/ScrollytellingScene.astro` | — | Supprimer (remplacé) |
| `src/components/{HeroTunnel,FiberLine,ImageSeparator}.astro` | — | Conservés mais retirés de l'accueil |

> Note : `SectionNRO/SRO/PBO/ClientFinal/Catalogue` restent dans le repo ; ils sont
> déplacés/référencés depuis `/infrastructure/` (Task 8). `SectionCatalogue` reste utilisé
> par `/formations-fibre-optique/` (inchangé).

---

## Task 1 : Fondations style (tokens, police, classes partagées)

**Files:**
- Modify: `src/layouts/Layout.astro:59`
- Modify: `src/styles/global.css` (après le bloc `@theme`)
- Create: `src/components/ui/ReliefPanel.astro`

- [ ] **Step 1 : Charger Playfair Display**

Dans `src/layouts/Layout.astro`, remplacer la ligne 59 :

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

- [ ] **Step 2 : Ajouter le token serif dans `@theme`**

Dans `src/styles/global.css`, dans le bloc `@theme`, après `--font-display` (ligne 24) ajouter :

```css
    --font-serif: "Playfair Display", Georgia, serif;
```

- [ ] **Step 3 : Ajouter les classes partagées du langage visuel**

À la fin de `src/styles/global.css`, ajouter :

```css
/* ============================================================
   Langage visuel KMC — fenêtre éclairée en relief + flux fibre
   ============================================================ */
@property --kmc-a { syntax: '<angle>'; initial-value: 0deg; inherits: false; }

/* Panneau relief : bordure dégradée orange→bleu + halos latéraux */
.relief-panel {
    position: relative;
    isolation: isolate;
    border: 1px solid transparent;
    border-radius: 1rem;
    background:
        linear-gradient(rgba(13,26,46,.95), rgba(10,20,36,.96)) padding-box,
        linear-gradient(100deg, #f59e0b, #1e9ad7) border-box;
    box-shadow:
        -14px 0 40px -16px rgba(245,158,11,.5),
         14px 0 40px -16px rgba(30,154,215,.55),
         0 10px 25px -12px rgba(0,0,0,.8);
    transition: transform .5s cubic-bezier(.2,.85,.25,1), box-shadow .5s ease;
    will-change: transform;
}

/* Relief niveau 1 (modéré) — fiches formation */
.relief-1:hover {
    transform: translateY(-10px);
    box-shadow:
        -18px 4px 55px -14px rgba(245,158,11,.8),
         18px 4px 55px -14px rgba(30,154,215,.85),
         0 40px 60px -20px rgba(0,0,0,.9);
}

/* Relief niveau 2 (prononcé) — menu, image 0, fenêtres opérateurs.
   Le parent doit avoir `perspective: 1000px`. */
.relief-2 { transform-style: preserve-3d; }
.relief-2:hover {
    transform: translateY(-20px) scale(1.06) rotateX(6deg);
    box-shadow:
        -24px 8px 70px -12px rgba(245,158,11,.95),
         24px 8px 70px -12px rgba(30,154,215,1),
         0 60px 80px -24px rgba(0,0,0,.95);
}

/* Impulsion flux fibre : comète parcourant le périmètre, 5s cycle / ~2s visible */
.fiber-pulse::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    z-index: 1;
    background: conic-gradient(from var(--kmc-a),
        transparent 0deg, transparent 8deg,
        rgba(125,211,252,.9) 15deg, #ffffff 19deg, rgba(245,158,11,.9) 24deg,
        transparent 32deg, transparent 360deg);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    filter: drop-shadow(0 0 4px rgba(125,211,252,.8));
    opacity: 0;
    animation: kmc-fiber 5s linear infinite;
}
@keyframes kmc-fiber {
    0%   { --kmc-a: -20deg; opacity: 0; }
    4%   { opacity: 1; }
    36%  { --kmc-a: 360deg; opacity: 1; }
    40%  { --kmc-a: 380deg; opacity: 0; }
    100% { --kmc-a: 380deg; opacity: 0; }
}

/* Fine ligne de flux animée (sous les titres de fiche) */
.fiber-flow {
    position: relative;
    height: 2px;
    border-radius: 2px;
    overflow: hidden;
    background: linear-gradient(90deg, transparent, rgba(30,154,215,.4), transparent);
}
.fiber-flow::before {
    content: "";
    position: absolute; top: 0; left: -30%;
    width: 30%; height: 100%;
    background: linear-gradient(90deg, transparent, #fff, #7dd3fc, transparent);
    animation: kmc-flow 3.2s linear infinite;
}
@keyframes kmc-flow { to { left: 120%; } }

/* Dégradations gracieuses */
@supports not (background: conic-gradient(from 0deg)) {
    .fiber-pulse::after { display: none; }
}
@media (prefers-reduced-motion: reduce) {
    .fiber-pulse::after,
    .fiber-flow::before { animation: none; opacity: 0; }
    .relief-1:hover, .relief-2:hover { transform: none; }
}
```

- [ ] **Step 4 : Créer la primitive `ReliefPanel`**

Create `src/components/ui/ReliefPanel.astro` :

```astro
---
interface Props {
  level?: 1 | 2;
  fiber?: boolean;
  class?: string;
}
const { level = 2, fiber = false, class: extra = '' } = Astro.props;
const classes = ['relief-panel', `relief-${level}`, fiber ? 'fiber-pulse' : '', extra]
  .filter(Boolean).join(' ');
---
<div class={classes}>
  <div class="relative z-10">
    <slot />
  </div>
</div>
```

- [ ] **Step 5 : Vérifier le build**

Run: `npm run build`
Expected: build OK, aucune erreur (les pages existantes se régénèrent ; le nouveau composant n'est pas encore utilisé).

- [ ] **Step 6 : Commit**

```bash
git add src/layouts/Layout.astro src/styles/global.css src/components/ui/ReliefPanel.astro
git commit -m "feat(design): tokens, Playfair Display et classes relief/flux partagées"
```

---

## Task 2 : Menu (`Navigation.astro`)

**Files:**
- Modify (réécriture du markup + style) : `src/components/Navigation.astro`

Conserver la logique JS existante (scroll solidify, toggle mobile, escape) ; remplacer le markup
desktop et ajouter le style signature. Liens mis à jour (§4 spec).

- [ ] **Step 1 : Mettre à jour les listes de liens**

Dans le frontmatter de `Navigation.astro`, remplacer `navLinks`/`pageLinks` par une liste unique :

```astro
---
const links = [
  { href: '/', label: 'Accueil' },
  { href: '/#operators', label: 'Opérateurs' },
  { href: '/formations-fibre-optique/', label: 'Formations' },
  { href: '/infrastructure/', label: 'Infrastructure' },
  { href: '/habilitations/', label: 'Habilitations' },
  { href: '/blog/', label: 'Blog' },
];
---
```

- [ ] **Step 2 : Markup du menu signature**

Remplacer le `<header>` par une barre flottante `relief-panel relief-2 fiber-pulse` avec halo
marine local et bande persistante. Header en `fixed`, conteneur avec `perspective`. Points clés :

```astro
<header id="main-nav" class="fixed top-0 left-0 w-full z-50">
  <div class="navzone relative mx-auto max-w-7xl px-4 pt-4 pb-8" style="perspective:1000px;">
    <!-- halo bleu marine LOCAL au menu -->
    <div class="navzone-halo" aria-hidden="true"></div>
    <!-- bande lumineuse persistante -->
    <div class="navzone-band" aria-hidden="true"></div>

    <nav class="relief-panel relief-2 fiber-pulse flex items-center justify-between px-5 py-3"
         style="background:linear-gradient(rgba(16,50,88,.78),rgba(11,33,58,.82)) padding-box,linear-gradient(100deg,#f59e0b,#1e9ad7) border-box;">
      <a href="/" class="relative z-10 flex items-center">
        <span class="bg-white/95 rounded-lg px-3 py-1.5">
          <img src="/images/logo-kmc.png" alt="KMC" class="h-8 w-auto object-contain" />
        </span>
      </a>
      <div class="relative z-10 hidden lg:flex items-center gap-1">
        {links.map((l) => (
          <a href={l.href} class="px-3 py-2 rounded-lg text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition">{l.label}</a>
        ))}
      </div>
      <a href="/contact/" class="relative z-10 hidden lg:inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold text-[#06121f]"
         style="background:linear-gradient(100deg,#f59e0b,#1e9ad7);">Nous contacter</a>
      <!-- bouton hamburger mobile : conserver l'existant -->
      ...
    </nav>
  </div>
  <!-- menu mobile : conserver l'existant -->
</header>
```

- [ ] **Step 3 : Styles spécifiques du menu (scoped `<style>` du composant)**

```css
.navzone-halo {
  position: absolute; left: 4%; right: 4%; top: 6px; height: 120px; z-index: -2;
  border-radius: 30px; filter: blur(10px);
  background: radial-gradient(ellipse at 50% 0%, #103258 0%, rgba(16,50,88,.35) 45%, transparent 75%);
}
.navzone-band {
  position: absolute; left: 8%; right: 8%; top: 60px; height: 26px; z-index: -1;
  filter: blur(22px); opacity: .7; transition: opacity .45s ease;
  background: linear-gradient(100deg, rgba(245,158,11,.4), rgba(30,154,215,.45));
}
.navzone:hover .navzone-band { opacity: 1; }
/* mobile : barre solide simple, pas de halo/band/fibre */
@media (max-width: 1023px) {
  .navzone-halo, .navzone-band { display: none; }
  #main-nav .fiber-pulse::after { display: none; }
}
```

- [ ] **Step 4 : Conserver la logique JS**

Garder le `<script>` existant (scroll solidify, toggle mobile, escape, fermeture au clic).
Adapter les sélecteurs si des classes ont changé (le solidify peut cibler `nav` plutôt que `header`).

- [ ] **Step 5 : Build + contrôle visuel**

Run: `npm run build` → OK.
Run: `npm run dev`, ouvrir `/` : vérifier barre flottante, halo marine local, bande persistante au scroll, comète flux fibre toutes les 5s, intensification au survol. Tester le menu mobile (< 1024px).

- [ ] **Step 6 : Commit**

```bash
git add src/components/Navigation.astro
git commit -m "feat(nav): menu relief signature (halo marine local, bande persistante, flux fibre)"
```

---

## Task 3 : Helper Notion + fallback (`notion.ts`)

**Files:**
- Modify: `src/lib/notion.ts`

- [ ] **Step 1 : Ajouter un fallback statique et `getFormationByName`**

À la fin de `src/lib/notion.ts`, ajouter :

```ts
// Fallback statique si Notion est indisponible au build (évite une fiche vide).
export const FALLBACK_FORMATION: Formation = {
  id: 'fallback-ftth-d2',
  nom: 'FTTH-D2',
  issue: "Réaliser un raccordement FTTH complet, souder des fibres optiques, effectuer des mesures de réflectométrie OTDR et diagnostiquer une coupure réseau en autonomie.",
  programme: "Soudure et épissure de fibres monomodes · Raccordement PBO / PTO · Mesures OTDR · Lecture de plans FTTH · Pose de câbles façade et conduit · Sécurité chantier télécom.",
  prerequis: "Niveau 3ᵉ, savoir lire et écrire",
  lieu: "Centre KMC — Angré, Cocody, Abidjan",
  dureeFormation: "3 semaines (105 h)",
  dureeStagePratique: "2 semaines",
  coutFormation: '',
  fraisAdministratifs: null,
  participants: 12,
  tauxReussite: "94 %",
  tauxAbandon: "4 %",
};

export async function getFormationByName(nom: string): Promise<Formation> {
  const all = await getFormations();
  const match = all.find((f) => f.nom?.trim().toUpperCase() === nom.trim().toUpperCase());
  return match ?? all[0] ?? FALLBACK_FORMATION;
}
```

- [ ] **Step 2 : Build**

Run: `npm run build`
Expected: OK. (Sans credentials Notion, `getFormations()` renvoie `[]` → `getFormationByName` renverra le fallback — comportement attendu, à valider en Task 4.)

- [ ] **Step 3 : Commit**

```bash
git add src/lib/notion.ts
git commit -m "feat(notion): getFormationByName + fallback statique FTTH-D2"
```

---

## Task 4 : Fiche formation (`FormationCard.astro`)

**Files:**
- Create: `src/components/FormationCard.astro`

Implémente le layout §5 de la spec. Style : `relief-panel relief-1 fiber-pulse`.

- [ ] **Step 1 : Créer le composant**

```astro
---
import type { Formation } from '../lib/notion';
interface Props { formation: Formation; }
const { formation: f } = Astro.props;
const pct = (v: number | null) => (v != null ? `${v} %` : '');
---
<article class="relief-panel relief-1 fiber-pulse mx-auto max-w-2xl px-8 py-9 md:px-10">
  <div class="relative z-10">
    <h3 class="text-center font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">{f.nom}</h3>
    <div class="fiber-flow w-3/5 mx-auto mt-3 mb-7"></div>

    <div class="flex justify-between gap-8 text-sm">
      <div class="flex-1 space-y-2.5">
        <p><span class="text-[#7dd3fc] font-semibold">Durée de formation en institut :</span><br/>{f.dureeFormation}</p>
        <p><span class="text-[#7dd3fc] font-semibold">Durée du stage en entreprise :</span><br/>{f.dureeStagePratique}</p>
        <p><span class="text-[#7dd3fc] font-semibold">Participants maximum :</span><br/>{f.participants ?? '—'}</p>
      </div>
      <div class="flex-1 space-y-2.5 text-right">
        <p><span class="text-[#7dd3fc] font-semibold">Prérequis :</span><br/>{f.prerequis}</p>
        <p><span class="text-[#7dd3fc] font-semibold">Lieu de la formation :</span><br/>{f.lieu}</p>
      </div>
    </div>

    <h4 class="text-center text-lg font-bold text-white mt-6 mb-2.5">Programme de formation</h4>
    <p class="text-center text-sm text-white/60 leading-relaxed max-w-xl mx-auto">{f.programme}</p>

    <p class="text-center text-sm text-[#7dd3fc] font-semibold mt-6 mb-2">À l'issue de cette formation, vous saurez :</p>
    <p class="text-center text-sm text-white/75 leading-relaxed max-w-xl mx-auto">{f.issue}</p>

    <div class="flex justify-between mt-7 pt-4 border-t border-white/10">
      <div>
        <span class="block text-[11px] uppercase tracking-wider text-white/50">Taux de réussite</span>
        <span class="text-xl font-bold text-[#34d399]">{f.tauxReussite}</span>
      </div>
      <div class="text-right">
        <span class="block text-[11px] uppercase tracking-wider text-white/50">Taux d'abandon</span>
        <span class="text-xl font-bold text-[#fb923c]">{f.tauxAbandon}</span>
      </div>
    </div>
  </div>
</article>
```

- [ ] **Step 2 : Vérification temporaire**

Pour valider le rendu isolément, créer une page de test temporaire `src/pages/_test-card.astro` :

```astro
---
import Layout from '../layouts/Layout.astro';
import FormationCard from '../components/FormationCard.astro';
import { getFormationByName } from '../lib/notion';
const f = await getFormationByName('FTTH-D2');
---
<Layout title="Test fiche"><main class="py-20"><FormationCard formation={f} /></main></Layout>
```

Run: `npm run build` puis `npm run dev`, ouvrir `/_test-card` : vérifier layout (Nom centré serif, 2 colonnes, programme/issue centrés, taux en bas), relief niveau 1 au survol, comète flux fibre, ligne de flux. Avec ou sans credentials Notion (fallback).

- [ ] **Step 3 : Supprimer la page de test et commit**

```bash
rm src/pages/_test-card.astro
git add src/components/FormationCard.astro
git commit -m "feat(formation): fiche formation type (layout spec §5, relief niveau 1 + flux fibre)"
```

---

## Task 5 : Données + fenêtre opérateur (`operators.ts`, `OperatorWindow.astro`)

**Files:**
- Create: `src/data/operators.ts`
- Create: `src/components/OperatorWindow.astro`

Reprendre le contenu SEO de l'actuel `SectionOperators.astro` (descriptions, compétences,
matériel) dans une donnée structurée, **ordre client : Orange, MOOV, MTN**.

- [ ] **Step 1 : Extraire les données opérateurs**

```ts
// src/data/operators.ts
export interface Operator {
  id: string; name: string; color: string; tagline: string;
  description: string; skills: string[]; gear: string[];
}
export const operators: Operator[] = [
  { id: 'orange', name: 'Orange CI', color: '#F97316',
    tagline: 'Leader des télécoms en Côte d\'Ivoire',
    description: 'Premier opérateur télécom de Côte d\'Ivoire depuis 1996, Orange CI déploie le réseau FTTH dans Abidjan, Bouaké, San Pedro et Yamoussoukro.',
    skills: ['Raccordement PBO Orange', 'Soudure de fibres monomodes', 'Configuration ONT Livebox', 'Mesures OTDR et dépannage', 'Pose câbles façade/conduit/aérien'],
    gear: ['Boîtiers PBO Orange', 'ONT Livebox 5', 'OTDR Yokogawa', 'Connecteurs SC/APC', 'Fusionneuse Fujikura'] },
  { id: 'moov', name: 'Moov Africa', color: '#1e9ad7',
    tagline: 'Filiale Maroc Telecom — FTTB immeuble & entreprises',
    description: 'Moov Africa déploie le FTTB en immeuble et sur les campus d\'entreprises, avec distribution verticale et raccordements multi-logements.',
    skills: ['Distribution verticale immeuble', 'Raccordement multi-logements', 'Configuration équipements', 'Lecture de plans', 'Gestion GTL'],
    gear: ['Boîtiers FTTB Moov', 'Terminaux optiques', 'OPM (mesureur de puissance)', 'Connecteurs SC/APC', 'Câbles armés'] },
  { id: 'mtn', name: 'MTN Côte d\'Ivoire', color: '#EAB308',
    tagline: 'Expansion FTTH résidentiel haut de gamme',
    description: 'MTN étend son réseau FTTH dans les zones résidentielles haut de gamme, avec un fort accent sur la certification et le SAV.',
    skills: ['Déploiement FTTH résidentiel', 'Configuration terminaux', 'Tests de certification', 'Maintenance préventive', 'SAV client'],
    gear: ['ONT MTN', 'Testeur fibre', 'Cliveur', 'Connecteurs LC/UPC', 'Réflectomètre OTDR'] },
];
```

- [ ] **Step 2 : Créer `OperatorWindow.astro`**

```astro
---
import type { Operator } from '../data/operators';
interface Props { op: Operator; }
const { op } = Astro.props;
---
<article class="relief-panel relief-2 px-7 py-7" aria-label={`Formation fibre ${op.name}`}>
  <div class="relative z-10">
    <h3 class="font-display text-xl font-bold" style={`color:${op.color}`}>{op.name}</h3>
    <p class="text-white/40 text-xs mb-4">{op.tagline}</p>
    <p class="text-white/65 text-sm leading-relaxed mb-4">{op.description}</p>
    <p class="text-xs font-semibold uppercase tracking-wider mb-2" style={`color:${op.color}`}>Compétences</p>
    <ul class="space-y-1.5 mb-4">
      {op.skills.map((s) => (
        <li class="flex items-start gap-2 text-sm text-white/60"><span style={`color:${op.color}`}>▸</span>{s}</li>
      ))}
    </ul>
    <p class="text-xs font-semibold uppercase tracking-wider mb-2" style={`color:${op.color}`}>Matériel</p>
    <div class="flex flex-wrap gap-1.5">
      {op.gear.map((g) => (
        <span class="px-2 py-1 rounded-md text-xs border" style={`color:${op.color};border-color:${op.color}33;background:${op.color}14`}>{g}</span>
      ))}
    </div>
  </div>
</article>
```

- [ ] **Step 3 : Build (le composant n'est pas encore monté, mais doit compiler)**

Run: `npm run build` → OK.

- [ ] **Step 4 : Commit**

```bash
git add src/data/operators.ts src/components/OperatorWindow.astro
git commit -m "feat(operators): données + fenêtre opérateur relief niveau 2"
```

---

## Task 6 : Séquence scrollytelling (`ScrollytellingHero.astro`)

**Files:**
- Create: `src/components/ScrollytellingHero.astro`
- Référence d'animation : `src/lib/scroll` (exports `gsap`, `ScrollTrigger`, `initLenis`)

Pièce maîtresse. Un étage `#scrolly-stage` `sticky top-0 h-screen` dans `#scrolly`
(hauteur ≈ 950vh). Couches absolues empilées, animées par une timeline GSAP scrubée.
Fallback empilé sur mobile/`prefers-reduced-motion` (pas de pin).

> Les valeurs de progression sont **indicatives** (à affiner au montage, Task 9).

- [ ] **Step 1 : Markup des couches**

Créer `src/components/ScrollytellingHero.astro`. Structure des couches (du fond vers l'avant) :

```astro
---
import { getFormationByName } from '../lib/notion';
import { operators } from '../data/operators';
import OperatorWindow from './OperatorWindow.astro';
import FormationCard from './FormationCard.astro';
const formation = await getFormationByName('FTTH-D2');
---
<section id="scrolly" aria-label="Présentation KMC" style="height:950vh;">
  <div id="scrolly-stage" class="sticky top-0 h-screen w-full overflow-hidden bg-[#070d18]" style="perspective:1200px;">

    <!-- Couche IMG2 + vidéo (z-10) : utilisée scènes 5,6,9 -->
    <div id="layer-img2" class="absolute inset-0 z-10 opacity-0 will-change-transform">
      <img src="/images/Image 2 - reseau.png" alt="Réseau fibre optique" class="w-full h-full object-cover" />
      <video id="flux-video" class="absolute inset-0 w-full h-full object-cover opacity-0"
             autoplay loop muted playsinline preload="auto">
        <source src="/images/video flux fibre.mp4" type="video/mp4" />
      </video>
    </div>

    <!-- Couche IMG1 (z-20) : scènes 3,4 -->
    <div id="layer-img1" class="absolute inset-0 z-20 opacity-0">
      <img src="/images/Image 1 - centre de formation.png" alt="Centre de formation KMC" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#070d18]/85 via-[#070d18]/30 to-transparent"></div>
    </div>

    <!-- Couche IMG0 éléphant + titre serif (z-30) : scène 1 -->
    <div id="layer-img0" class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#070d18]">
      <h1 class="font-serif text-3xl md:text-5xl font-bold text-white text-center px-6 mb-8 max-w-4xl">
        KMC — Institut de formation professionnel en fibre optique
      </h1>
      <div class="relief-panel relief-2 fiber-pulse p-3">
        <img src="/images/Image 0 - Elephant.png" alt="KMC" class="relative z-10 max-h-[50vh] w-auto object-contain" />
      </div>
    </div>

    <!-- Carte texte + logos (z-40) : scène 4 -->
    <div id="layer-text" class="absolute inset-0 z-40 flex items-end justify-center pb-12 px-4 opacity-0">
      <!-- reprendre la carte verre dépoli de l'ancien ScrollytellingScene (H1/H2/texte + logos FDFP/AEJ) -->
      ...
    </div>

    <!-- Texte intro opérateurs (z-50) : scène 7 -->
    <div id="layer-op-intro" class="absolute inset-0 z-50 flex items-center justify-center px-4 opacity-0 bg-[#070d18]/60">
      <div class="max-w-3xl text-center">
        <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-6">KMC forme les techniciens des<br/><span class="text-[#1e9ad7]">3 opérateurs nationaux</span></h2>
        <p class="text-white/70 text-lg leading-relaxed">KMC est le premier centre de formation en Côte d'Ivoire à former des techniciens fibre optique pour Orange CI, MTN Côte d'Ivoire et Moov Africa…</p>
      </div>
    </div>

    <!-- 3 fenêtres opérateurs (z-50) : scène 8 -->
    <div id="layer-ops" class="absolute inset-0 z-50 flex items-center justify-center px-4 opacity-0" aria-hidden="false">
      <div id="operators" class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {operators.map((op, i) => (
          <div class={`op-win op-win-${i}`}><OperatorWindow op={op} /></div>
        ))}
      </div>
    </div>

    <!-- Fiche formation (z-60) : scène 10 -->
    <div id="layer-formation" class="absolute inset-0 z-60 flex flex-col items-center justify-center px-4 opacity-0">
      <FormationCard formation={formation} />
      <a href="/formations-fibre-optique/" class="mt-7 inline-flex px-6 py-3 rounded-lg font-bold text-[#06121f]" style="background:linear-gradient(100deg,#f59e0b,#1e9ad7);">Voir le catalogue complet</a>
    </div>

  </div>
</section>
```

> Pour `#layer-text`, copier le contenu de la carte verre dépoli de l'actuel
> `ScrollytellingScene.astro` (lignes 47-117) — H1, H2, texte enrichi, logos FDFP/AEJ.

- [ ] **Step 2 : Timeline GSAP (script du composant)**

```astro
<script>
  import { gsap, ScrollTrigger, initLenis } from '../lib/scroll';
  initLenis();

  function isMobileOrReduced() {
    return window.matchMedia('(max-width: 1023px)').matches
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initStacked() {
    // Fallback : tout visible en flux normal (l'étage n'est plus pinné).
    document.querySelectorAll('#scrolly-stage > div').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.position = 'relative';
    });
    const stage = document.getElementById('scrolly-stage');
    const scrolly = document.getElementById('scrolly');
    if (stage) { stage.style.position = 'static'; stage.style.height = 'auto'; }
    if (scrolly) scrolly.style.height = 'auto';
    const v = document.getElementById('flux-video') as HTMLVideoElement | null;
    if (v) v.style.opacity = '1';
  }

  function initScrolly() {
    const img0 = document.getElementById('layer-img0');
    const img1 = document.getElementById('layer-img1');
    const img2 = document.getElementById('layer-img2');
    const video = document.getElementById('flux-video');
    const text = document.getElementById('layer-text');
    const opIntro = document.getElementById('layer-op-intro');
    const ops = document.getElementById('layer-ops');
    const formation = document.getElementById('layer-formation');
    const opWins = gsap.utils.toArray<HTMLElement>('.op-win');

    const tl = gsap.timeline();
    // Scène 1→3 : éléphant disparaît, image1 apparaît
    tl.to(img0, { opacity: 0, duration: 0.6 }, 0.6)
      .to(img1, { opacity: 1, duration: 0.6 }, 0.8)
    // Scène 4 : texte + logos (quasi instantané)
      .to(text, { opacity: 1, duration: 0.3 }, 1.3)
    // Scène 5 : image1+texte → image2, vidéo révélée
      .to([img1, text], { opacity: 0, duration: 0.6 }, 2.0)
      .to(img2, { opacity: 1, duration: 0.6 }, 2.0)
      .to(video, { opacity: 1, duration: 0.4 }, 2.3)
    // Scène 6 : zoom partie gauche (Orange/MOOV/MTN)
      .to(img2, { scale: 1.45, transformOrigin: 'left center', duration: 1 }, 2.8)
    // Scène 7 : intro opérateurs
      .to(opIntro, { opacity: 1, duration: 0.5 }, 3.9)
      .to(opIntro, { opacity: 0, duration: 0.4 }, 4.7)
    // Scène 8 : 3 fenêtres apparaissent en cascade
      .to(ops, { opacity: 1, duration: 0.2 }, 4.8)
      .from(opWins, { opacity: 0, y: 40, stagger: 0.4, duration: 0.5 }, 4.9)
      .to(ops, { opacity: 0, duration: 0.4 }, 6.4)
    // Scène 9 : dézoom pour inclure le NRO (valeurs à caler — Task 9)
      .to(img2, { scale: 1.2, transformOrigin: '35% center', duration: 0.8 }, 6.6)
    // Scène 10 : fiche formation
      .to(formation, { opacity: 1, duration: 0.6 }, 7.4);

    ScrollTrigger.create({
      trigger: '#scrolly', start: 'top top', end: 'bottom bottom',
      scrub: 1.2, pin: '#scrolly-stage', invalidateOnRefresh: true, animation: tl,
    });
  }

  function boot() { isMobileOrReduced() ? initStacked() : initScrolly(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
</script>
```

- [ ] **Step 3 : Build**

Run: `npm run build`
Expected: OK, page d'accueil régénérée (après Task 7 elle utilisera ce composant).

- [ ] **Step 4 : Commit**

```bash
git add src/components/ScrollytellingHero.astro
git commit -m "feat(hero): séquence scrollytelling 10 scènes + fallback empilé mobile/reduced-motion"
```

---

## Task 7 : Réécrire la page d'accueil (`index.astro`)

**Files:**
- Modify: `src/pages/index.astro`
- Delete: `src/components/ScrollytellingScene.astro`

- [ ] **Step 1 : Simplifier `index.astro`**

Remplacer le `<main>` pour n'utiliser que `ScrollytellingHero` :

```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/Navigation.astro';
import ScrollytellingHero from '../components/ScrollytellingHero.astro';
import Footer from '../components/Footer.astro';
// ... (conserver pageTitle, pageDescription, jsonLd existants)
---
<Layout title={pageTitle} description={pageDescription} image={pageImage} type="website" jsonLd={{ /* inchangé */ }}>
  <Navigation />
  <main id="main-content">
    <ScrollytellingHero />
  </main>
  <Footer />
</Layout>
```

Retirer les imports/usages de `HeroTunnel`, `FiberLine`, `SectionOperators`, `SectionNRO`,
`SectionSRO`, `SectionPBO`, `SectionClientFinal`, `SectionCatalogue`, `ImageSeparator`.
Conserver le `<script>` Lenis pour les ancres (adapter `/#operators`, voir §4 spec).

- [ ] **Step 2 : Supprimer l'ancien composant**

```bash
git rm src/components/ScrollytellingScene.astro
```

- [ ] **Step 3 : Build + contrôle visuel complet**

Run: `npm run build` (vérifier le nombre de pages générées, aucune erreur).
Run: `npm run dev`, ouvrir `/` : dérouler les 10 scènes au scroll (desktop). Vérifier chaque
transition. Tester en mobile (< 1024px) et avec `prefers-reduced-motion` → version empilée.

- [ ] **Step 4 : Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(home): page d'accueil = séquence scrollytelling (retrait tunnel 3D + sections)"
```

---

## Task 8 : Page `/infrastructure/` (préservation SEO)

**Files:**
- Create: `src/pages/infrastructure.astro`
- Référence : `SectionNRO/SRO/PBO/ClientFinal.astro` (contenu à reprendre)

- [ ] **Step 1 : Créer la page**

```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/Navigation.astro';
import SectionNRO from '../components/SectionNRO.astro';
import SectionSRO from '../components/SectionSRO.astro';
import SectionPBO from '../components/SectionPBO.astro';
import SectionClientFinal from '../components/SectionClientFinal.astro';
import Footer from '../components/Footer.astro';
---
<Layout title="Infrastructure fibre optique — NRO, SRO, PBO" description="De la NRO au client final : comprendre l'architecture FTTH et les compétences techniques formées par KMC.">
  <Navigation />
  <main id="main-content" class="pt-28">
    <SectionNRO />
    <SectionSRO />
    <SectionPBO />
    <SectionClientFinal />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2 : Restyler les sections au langage relief (optionnel mais recommandé)**

Dans chaque `Section{NRO,SRO,PBO,ClientFinal}.astro`, remplacer les cartes/encadrés par la
classe `relief-panel relief-2` (parent `perspective`) pour cohérence visuelle. Conserver le
contenu textuel SEO intact.

- [ ] **Step 3 : Build + contrôle**

Run: `npm run build` (la route `/infrastructure/` doit apparaître).
Run: `npm run dev`, ouvrir `/infrastructure/` : contenu présent, style cohérent, lien menu actif.

- [ ] **Step 4 : Commit**

```bash
git add src/pages/infrastructure.astro src/components/Section*.astro
git commit -m "feat(infra): page /infrastructure/ (NRO/SRO/PBO/Client) — préservation SEO"
```

---

## Task 9 : Réglages finaux (scène 9, timings, vérif globale)

**Files:**
- Modify: `src/components/ScrollytellingHero.astro` (valeurs de timeline)

- [ ] **Step 1 : Caler la scène 9 (dézoom NRO)**

Avec `npm run dev`, observer `Image 2 - reseau.png` : repérer la position du bâtiment NRO.
Ajuster `scale` et `transformOrigin` du `.to(img2, …)` de la scène 9 pour l'inclure
correctement. Si le NRO n'est pas identifiable dans l'image, ajouter un label overlay « NRO »
ou ajuster le recadrage (voir §6.4 spec).

- [ ] **Step 2 : Affiner les timings de la timeline**

Régler les positions/durées des scènes pour un scroll confortable (éviter les transitions trop
rapides/lentes). Ajuster la hauteur `#scrolly` (≈ 950vh) si nécessaire.

- [ ] **Step 3 : Vérification finale**

Run: `npm run build` → OK, toutes les pages générées.
Contrôle navigateur (skill `browse`/`verify`) :
- Desktop : 10 scènes fluides, menu (halo/band/fibre), fiche FTTH-D2, lien catalogue, footer.
- Mobile < 1024px : version empilée lisible, menu solide.
- `prefers-reduced-motion` : version empilée, pas d'animations.
- SEO : vérifier que H1/paragraphes/fiche sont dans le DOM (View Source) et non en `display:none`.

- [ ] **Step 4 : Commit final**

```bash
git add src/components/ScrollytellingHero.astro
git commit -m "fix(hero): calage scène 9 (NRO) et timings de la séquence"
```

---

## Notes d'exécution

- **Ordre des tâches :** 1 → 9 séquentiel. Tasks 3, 4, 5 sont indépendantes entre elles
  (après Task 1) et peuvent être parallélisées si exécution multi-agent.
- **Pas de test-runner** : ne pas tenter d'installer vitest/jest (YAGNI). Vérification =
  `npm run build` + dogfood navigateur.
- **Credentials Notion** : si absents en local, le fallback FTTH-D2 s'affiche (attendu).
  En production Vercel, les variables d'env fournissent les vraies données.
- **`@property`** : testé OK sur Chrome/Safari récents (cible du client, macOS). Fallback prévu.
- **Risque résiduel** : scène 9 dépend de la composition d'`Image 2` (Task 9, step 1).
