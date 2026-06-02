# Pipeline SEO Blog KMC — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le pipeline complet d'automatisation SEO qui génère, enrichit et publie des articles de blog et des cours gratuits sur kmc.ci depuis Notion via N8N.

**Architecture:** Notion pilote tout (checkboxes → webhooks N8N). Cinq workflows modulaires : WF1/WF2 collectent les données SEO, WF3 génère les idées, WF4 produit le contenu (DeepSeek + Imagen 3), WF5 publie sur GitHub/Vercel/Facebook/LinkedIn.

**Tech Stack:** Astro v6 (static) · N8N (VPS `https://n8n.srv1179315.hstgr.cloud`) · Notion API · DeepSeek V4 Pro (`172.18.0.1:11434`) · Imagen 3 (Google AI Studio) · GitHub API · Serper.dev · Facebook Graph API · LinkedIn API

---

## Références critiques

```
Repo GitHub     : david72220/site-KMC
Projet local    : /Users/davidollivier/Documents/Antigravity/Site KMC/
N8N URL         : https://n8n.srv1179315.hstgr.cloud
DeepSeek        : POST http://172.18.0.1:11434/api/chat  { think:false, num_predict:8000, timeout:540000 }
Notion token    : credential N8N "Notion API" existant
DB Blog         : 3739628038de80348128de6db5f9e878
DB Cours        : 3739628038de8063bf15fa861f76d028
Page Rapport SEO: 3739628038de8059b56aeb2af9c73fbf
Page Rapport Veille: 3739628038de806c8b0adf0343cb803f
Spec            : docs/superpowers/specs/2026-06-02-pipeline-seo-blog-kmc-design.md
```

> ⚠️ **Auth webhooks N8N :** Les automations Notion ne permettent pas d'ajouter des headers HTTP personnalisés. Le token de sécurité est donc passé dans le **body JSON** (`body.token`). Dans chaque webhook N8N (WF4, WF5), activer **"Never log request body"** pour éviter que le token soit loggué, et valider le token via un nœud Code en tête de workflow (`if (body.token !== 'SECRET') throw ...`).

---

## Fichiers à créer / modifier

| Action | Fichier | Rôle |
|---|---|---|
| Créer | `src/content/cours/.gitkeep` | Dossier placeholder cours |
| Créer | `src/pages/cours.astro` | Liste des cours gratuits |
| Créer | `src/pages/cours/[id].astro` | Template cours (table des matières, badges niveau/durée) |
| Modifier | `src/components/Navigation.astro` | Séparer "Blog" et "Cours gratuits" |
| Créer | `public/images/cours/.gitkeep` | Dossier images cours |

---

## Phase 1 — Schémas Notion

### Task 1 : Enrichir DB Blog

**Contexte :** La DB Blog (`3739628038de80348128de6db5f9e878`) n'a que le champ `Nom`. Ajouter toutes les propriétés du schéma validé en spec. Utiliser le MCP Notion.

- [ ] **Ajouter `Statut`** (select, options : Idée / En génération / Généré / En publication / Publié / Erreur)

```
mcp__claude_ai_Notion__notion-update-data-source
collection_id: "37396280-38de-8022-b85c-000b7dacf06b"
Ajouter propriété Statut de type select avec les 6 options
```

- [ ] **Ajouter les propriétés texte/sélection** : `Mot-clé SEO` (rich_text), `Catégorie` (select : Fibre optique/Photovoltaïque/Formation/Actualités), `Tags` (multi_select), `Description` (rich_text), `Slug` (rich_text), `Source` (select : Serper.dev/Manuel/Suggestion IA), `Moteur LLM` (select : DeepSeek V4/Manuel)

- [ ] **Ajouter les propriétés media/date** : `Fichier SEO` (files), `Image hero` (url), `Date publication` (date), `URL publiée` (url)

- [ ] **Ajouter les checkboxes de déclenchement** : `▶ Lancer génération` (checkbox), `▶ Lancer publication` (checkbox)

- [ ] **Vérifier** : ouvrir la DB Blog dans Notion, confirmer que les 14 propriétés sont visibles

- [ ] **Commit**
```bash
git commit --allow-empty -m "feat: DB Blog Notion — schéma 14 propriétés ajoutées"
```

---

### Task 2 : Enrichir DB Cours gratuits

**Contexte :** DB Cours (`3739628038de8063bf15fa861f76d028`), mêmes étapes.

- [ ] **Ajouter `Statut`** (select, options : Idée / Fichier déposé / En formatage / Formaté / En publication / Publié / Erreur)

- [ ] **Ajouter les propriétés** : `Fichier TXT` (files), `Niveau` (select : Débutant/Intermédiaire/Avancé), `Durée estimée` (rich_text), `Catégorie` (select : Fibre optique/Photovoltaïque/Habilitations/Sécurité), `Tags` (multi_select), `Slug` (rich_text), `Image hero` (url), `Date publication` (date), `URL publiée` (url)

- [ ] **Ajouter les checkboxes** : `▶ Lancer formatage` (checkbox), `▶ Lancer publication` (checkbox)

- [ ] **Vérifier** : ouvrir la DB Cours dans Notion, confirmer les 12 propriétés

- [ ] **Partager les 4 bases/pages avec l'intégration Notion** : DB Blog, DB Cours, Page Rapport SEO, Page Rapport Veille → bouton "Connecter à une intégration" dans chaque page

- [ ] **Commit**
```bash
git commit --allow-empty -m "feat: DB Cours Notion — schéma 12 propriétés ajoutées"
```

---

## Phase 2 — Templates Astro

### Task 3 : Vérification Content Collections + dossier cours

> ⚠️ Avant de créer les fichiers glob, vérifier si `src/content/config.ts` existe. S'il existe, la collection `cours` doit y être déclarée.

- [ ] **Vérifier l'existence de `src/content/config.ts`**
```bash
ls "/Users/davidollivier/Documents/Antigravity/Site KMC/src/content/"
```
- Si `config.ts` absent → le site utilise `import.meta.glob` direct (comme le blog existant). Continuer.
- Si `config.ts` présent → ajouter la collection `cours` avec le même schéma que `blog`.

### Task 3b : Dossier cours + placeholder

**Files :**
- Créer : `src/content/cours/.gitkeep`
- Créer : `public/images/cours/.gitkeep`

- [ ] **Créer les dossiers**
```bash
mkdir -p "/Users/davidollivier/Documents/Antigravity/Site KMC/src/content/cours"
mkdir -p "/Users/davidollivier/Documents/Antigravity/Site KMC/src/pages/cours"
mkdir -p "/Users/davidollivier/Documents/Antigravity/Site KMC/public/images/cours"
touch "/Users/davidollivier/Documents/Antigravity/Site KMC/src/content/cours/.gitkeep"
touch "/Users/davidollivier/Documents/Antigravity/Site KMC/public/images/cours/.gitkeep"
```

- [ ] **Créer un fichier cours de test** `src/content/cours/test-cours-fibre-optique.md` :
```markdown
---
title: "Introduction à la fibre optique — Cours gratuit"
pubDate: 2026-06-02
author: "Équipe KMC"
category: "Fibre optique"
niveau: "Débutant"
duree: "2h30"
tags: [fibre optique, débutant, introduction]
heroImage: "/images/cours/test-cours-fibre-optique.jpg"
description: "Cours gratuit d'introduction à la fibre optique pour débutants."
---

## Introduction

Ce cours présente les bases de la fibre optique.

## Prérequis

Aucun prérequis technique nécessaire.

## Module 1 — Les principes de base

La fibre optique transmet des données sous forme de lumière.

| Caractéristique | Valeur |
|---|---|
| Vitesse max | 10 Gbit/s |
| Atténuation | 0.2 dB/km |

## Conclusion

Vous avez appris les bases. Passez à la formation complète !
```

- [ ] **Commit**
```bash
cd "/Users/davidollivier/Documents/Antigravity/Site KMC"
git add src/content/cours/ public/images/cours/
git commit -m "feat: ajout dossier cours gratuits + fichier de test"
```

---

### Task 4 : Page liste cours.astro

**Files :**
- Créer : `src/pages/cours.astro`

Pattern : calquer sur `src/pages/blog.astro` — même structure, adapter pour les champs `niveau` et `duree`.

- [ ] **Créer `src/pages/cours.astro`** :

```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';

interface CoursPost {
  id: string;
  data: {
    title: string;
    description: string;
    pubDate: string;
    category: string;
    niveau: string;
    duree: string;
    tags: string[];
    heroImage?: string;
    author?: string;
  };
}

const postModules = import.meta.glob('../content/cours/*.md', { eager: true });

const cours = Object.entries(postModules).map(([path, mod]: [string, any]) => {
  const id = path.split('/').pop()?.replace('.md', '') || '';
  return { id, data: mod.frontmatter as CoursPost['data'] };
}).sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());

const pageTitle = 'Cours gratuits — KMC';
const pageDescription = 'Cours gratuits en fibre optique, photovoltaïque et habilitations électriques. Apprenez les bases avec KMC à Abidjan.';
---

<Layout title={pageTitle} description={pageDescription}>
  <Navigation />

  <main class="min-h-screen bg-[#0B1120] pt-24 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b97d3]/10 border border-[#3b97d3]/20 text-[#3b97d3] text-sm font-medium mb-4">
          Apprentissage gratuit
        </span>
        <h1 class="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
          Cours gratuits KMC
        </h1>
        <p class="text-lg text-white/60 max-w-2xl mx-auto">
          Découvrez nos cours gratuits sur la fibre optique, le photovoltaïque et les habilitations électriques.
        </p>
      </div>

      {cours.length === 0 ? (
        <p class="text-center text-white/40 py-20">Aucun cours disponible pour le moment.</p>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cours.map((c) => (
            <article class="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-[#3b97d3]/30 transition-all duration-300 group">
              {c.data.heroImage && (
                <div class="aspect-video overflow-hidden">
                  <img
                    src={c.data.heroImage}
                    alt={c.data.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div class="p-6">
                <div class="flex items-center gap-2 mb-3">
                  {c.data.niveau && (
                    <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-[#3b97d3]/10 text-[#3b97d3] border border-[#3b97d3]/20">
                      {c.data.niveau}
                    </span>
                  )}
                  {c.data.duree && (
                    <span class="text-xs text-white/40 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                      </svg>
                      {c.data.duree}
                    </span>
                  )}
                </div>
                <h2 class="text-lg font-display font-bold text-white mb-2 line-clamp-2 group-hover:text-[#3b97d3] transition-colors">
                  {c.data.title}
                </h2>
                <p class="text-sm text-white/50 mb-4 line-clamp-2">{c.data.description}</p>
                <a
                  href={`/cours/${c.id}/`}
                  class="inline-flex items-center gap-2 text-sm text-[#3b97d3] font-medium hover:gap-3 transition-all duration-300"
                >
                  Commencer le cours
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  </main>

  <Footer />
</Layout>
```

- [ ] **Build de vérification**
```bash
cd "/Users/davidollivier/Documents/Antigravity/Site KMC" && npm run build 2>&1 | tail -5
```
Attendu : `✓ Completed` sans erreur.

- [ ] **Commit**
```bash
git add src/pages/cours.astro
git commit -m "feat: page liste cours gratuits /cours/"
```

---

### Task 5 : Template cours/[id].astro

**Files :**
- Créer : `src/pages/cours/[id].astro`

Différences vs `blog/[id].astro` : badges Niveau+Durée, table des matières générée depuis les H2, CTA "S'inscrire à la formation complète".

- [ ] **Créer le dossier**
```bash
mkdir -p "/Users/davidollivier/Documents/Antigravity/Site KMC/src/pages/cours"
```

- [ ] **Créer `src/pages/cours/[id].astro`** :

```astro
---
import Layout from '../../layouts/Layout.astro';
import Navigation from '../../components/Navigation.astro';
import Footer from '../../components/Footer.astro';

interface CoursPost {
  id: string;
  data: {
    title: string;
    description: string;
    pubDate: string;
    category: string;
    niveau: string;
    duree: string;
    tags: string[];
    heroImage?: string;
    author?: string;
  };
  Content: any;
}

export async function getStaticPaths() {
  const postModules = import.meta.glob('../../content/cours/*.md', { eager: true });
  const allCours = Object.entries(postModules).map(([path, mod]: [string, any]) => {
    const id = path.split('/').pop()?.replace('.md', '') || '';
    return { id, data: mod.frontmatter, Content: mod.Content } as CoursPost;
  });
  return allCours.map((c) => ({ params: { id: c.id }, props: { cours: c } }));
}

interface Props { cours: CoursPost; }

const { cours } = Astro.props;
const ContentComponent = cours.Content;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: cours.data.title,
  description: cours.data.description,
  url: `https://kmc.ci/cours/${cours.id}/`,
  provider: { '@type': 'Organization', name: 'KMC', url: 'https://kmc.ci' },
  datePublished: new Date(cours.data.pubDate).toISOString(),
  educationalLevel: cours.data.niveau,
  image: cours.data.heroImage ? `https://kmc.ci${cours.data.heroImage}` : 'https://kmc.ci/images/og-default.jpg',
};
---

<Layout
  title={cours.data.title}
  description={cours.data.description}
  image={cours.data.heroImage ? `https://kmc.ci${cours.data.heroImage}` : undefined}
  type="article"
  jsonLd={jsonLd}
>
  <Navigation />

  <main id="main-content" class="min-h-screen bg-[#0B1120] pt-24 pb-20">
    <article class="max-w-4xl mx-auto px-6">
      <div class="reveal-item opacity-0 translate-y-6 mb-8">
        <a href="/cours/" class="inline-flex items-center gap-2 text-sm text-[#3b97d3] hover:text-[#3b97d3]/80 transition-colors mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Retour aux cours
        </a>

        <div class="flex flex-wrap items-center gap-3 mb-6">
          {cours.data.niveau && (
            <span class="text-sm font-medium px-4 py-1.5 rounded-full bg-[#3b97d3]/10 text-[#3b97d3] border border-[#3b97d3]/20">
              {cours.data.niveau}
            </span>
          )}
          {cours.data.duree && (
            <span class="flex items-center gap-1.5 text-sm text-white/50">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              {cours.data.duree}
            </span>
          )}
          {cours.data.category && (
            <span class="text-sm text-white/40">{cours.data.category}</span>
          )}
        </div>

        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-6 leading-tight">
          {cours.data.title}
        </h1>
      </div>

      {cours.data.heroImage && (
        <div class="reveal-item opacity-0 translate-y-6 mb-12 rounded-xl overflow-hidden border border-white/[0.08]">
          <img src={cours.data.heroImage} alt={cours.data.title} class="w-full h-auto object-cover" loading="eager" />
        </div>
      )}

      <!-- Table des matières (js côté client) -->
      <nav id="toc" class="reveal-item opacity-0 translate-y-6 mb-12 p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl hidden">
        <h2 class="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Sommaire</h2>
        <ul id="toc-list" class="space-y-2 text-sm"></ul>
      </nav>

      <div class="reveal-item opacity-0 translate-y-6 prose-content">
        <ContentComponent />
      </div>

      <!-- CTA inscription formation complète -->
      <div class="reveal-item opacity-0 translate-y-6 mt-16 p-8 bg-[#3b97d3]/5 border border-[#3b97d3]/20 rounded-2xl text-center">
        <h2 class="text-2xl font-display font-bold text-white mb-3">Aller plus loin ?</h2>
        <p class="text-white/60 mb-6">Ce cours est un aperçu. Rejoignez une formation complète et certifiante chez KMC.</p>
        <a href="/formations-fibre-optique/" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3b97d3] text-[#0B1120] font-semibold text-sm hover:bg-[#3b97d3]/90 transition-colors">
          Voir les formations complètes
        </a>
      </div>

      <div class="reveal-item opacity-0 translate-y-6 mt-8 pt-8 border-t border-white/[0.08] flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#3b97d3]/10 border border-[#3b97d3]/20 flex items-center justify-center">
            <span class="text-[#3b97d3] font-display font-bold text-sm">K</span>
          </div>
          <div>
            <p class="text-white font-medium text-sm">{cours.data.author || 'KMC'}</p>
            <p class="text-white/50 text-xs">Centre de formation</p>
          </div>
        </div>
        <a href="/cours/" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#3b97d3]/10 text-[#3b97d3] border border-[#3b97d3]/20 hover:bg-[#3b97d3]/20 transition-all text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Tous les cours
        </a>
      </div>
    </article>
  </main>

  <Footer />
</Layout>

<script>
  // Reveal animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal-item').forEach((el) => observer.observe(el));

  // Table des matières : génère depuis les H2 de l'article
  const h2s = document.querySelectorAll('.prose-content h2');
  if (h2s.length > 1) {
    const toc = document.getElementById('toc');
    const tocList = document.getElementById('toc-list');
    if (toc && tocList) {
      toc.classList.remove('hidden');
      h2s.forEach((h2, i) => {
        const id = `section-${i}`;
        h2.id = id;
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${id}" class="text-white/60 hover:text-[#3b97d3] transition-colors">${h2.textContent}</a>`;
        tocList.appendChild(li);
      });
    }
  }
</script>

<style>
  .prose-content { color: #e2e8f0; line-height: 1.8; font-size: 1.125rem; }
  .prose-content :global(h2) { font-family: 'Space Grotesk', sans-serif; font-size: 1.75rem; font-weight: 700; color: #f8fafc; margin-top: 2.5rem; margin-bottom: 1rem; }
  .prose-content :global(h3) { font-family: 'Space Grotesk', sans-serif; font-size: 1.375rem; font-weight: 600; color: #f8fafc; margin-top: 2rem; margin-bottom: 0.75rem; }
  .prose-content :global(p) { margin-bottom: 1.25rem; color: #cbd5e1; }
  .prose-content :global(a) { color: #3b97d3; text-decoration: underline; text-underline-offset: 3px; }
  .prose-content :global(ul), .prose-content :global(ol) { margin-bottom: 1.25rem; padding-left: 1.5rem; }
  .prose-content :global(li) { margin-bottom: 0.5rem; color: #cbd5e1; }
  .prose-content :global(strong) { color: #f8fafc; font-weight: 600; }
  .prose-content :global(blockquote) { border-left: 3px solid #3b97d3; padding-left: 1.25rem; margin: 1.5rem 0; font-style: italic; color: #94a3b8; }
  .prose-content :global(table) { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
  .prose-content :global(th), .prose-content :global(td) { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .prose-content :global(th) { font-weight: 600; color: #f8fafc; background: rgba(255,255,255,0.03); }
  .prose-content :global(img) { border-radius: 0.75rem; margin: 1.5rem 0; border: 1px solid rgba(255,255,255,0.08); width: 100%; }
  .prose-content :global(code) { background: rgba(59,151,211,0.1); color: #3b97d3; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.875rem; }
  .prose-content :global(pre) { background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; padding: 1.25rem; overflow-x: auto; margin: 1.5rem 0; }
  .prose-content :global(pre code) { background: none; padding: 0; color: #cbd5e1; }
</style>
```

- [ ] **Build de vérification**
```bash
cd "/Users/davidollivier/Documents/Antigravity/Site KMC" && npm run build 2>&1 | tail -5
```
Attendu : `✓ Completed` et `/cours/test-cours-fibre-optique/index.html` dans le build.

- [ ] **Vérification manuelle** : `npm run preview` → naviguer sur `http://localhost:4321/cours/` et `http://localhost:4321/cours/test-cours-fibre-optique/`
  - ✅ Liste avec badge Niveau + Durée visible
  - ✅ Page détail avec table des matières générée
  - ✅ CTA "Voir les formations complètes" visible

- [ ] **Commit**
```bash
git add src/pages/cours/ src/pages/cours.astro
git commit -m "feat: template cours gratuits — liste + détail avec ToC et badges niveau/durée"
```

---

### Task 6 : Mise à jour Navigation

**Files :**
- Modifier : `src/components/Navigation.astro` lignes 3-5

La navigation actuelle a `{ href: '/blog/', label: 'Blog / Cours gratuits' }`. Remplacer par deux entrées séparées.

- [ ] **Modifier `src/components/Navigation.astro`** — remplacer le tableau `links` :

```astro
const links = [
  { href: '/', label: 'Accueil' },
  { href: '/formations-fibre-optique/', label: 'Formations' },
  { href: '/cours/', label: 'Cours gratuits' },
  { href: '/blog/', label: 'Blog' },
];
```

- [ ] **Build + preview vérification**
```bash
cd "/Users/davidollivier/Documents/Antigravity/Site KMC" && npm run build 2>&1 | tail -3
```

- [ ] **Commit + push**
```bash
git add src/components/Navigation.astro
git commit -m "feat: navigation — séparer Blog et Cours gratuits"
git push origin main
```
Vercel déploie automatiquement.

---

## Phase 3 — WF5 Publication ⚡ PRIORITÉ ABSOLUE — commencer ici

> **WF5 est le workflow le plus critique — il valide tout le pipeline de bout en bout AVANT d'implémenter WF4, WF3, etc.**
> Pour tester sans WF4 : créer manuellement une page test dans DB Blog avec body Markdown, renseigner le slug, cocher `▶ Lancer publication`.

### Task 7 : Créer WF5 — squelette + webhook

**Contexte N8N :** Utiliser `mcp__n8n__n8n_create_workflow` puis `mcp__n8n__n8n_update_partial_workflow` pour ajouter les nœuds. Toujours suivre le protocole : get → validateOnly → apply.

- [ ] **Créer le workflow WF5**
```
mcp__n8n__n8n_create_workflow
name: "KMC — WF5 Publication Blog et Cours"
nodes: [Webhook trigger]
```

- [ ] **Ajouter nœud Webhook** avec path `kmc-publier`, méthode POST, authType `headerAuth` avec token secret (ex: `kmc-pub-secret-2026`) — **jamais sans auth**

- [ ] **Ajouter nœud "Update Notion statut"** → `PATCH /v1/pages/{page_id}` → Statut : `En publication`

- [ ] **Valider la structure**
```
mcp__n8n__n8n_validate_workflow  id: <WF5_ID>
```

- [ ] **Test webhook avec payload minimal** :
```json
{
  "page_id": "ID_PAGE_TEST_BLOG",
  "db_type": "blog"
}
```
Attendu : statut Notion mis à jour à "En publication".

---

### Task 8 : WF5 — lecture Notion + construction .md

- [ ] **Ajouter nœud "Lire propriétés page Notion"** → `GET /v1/pages/{page_id}` → extraire slug, titre, description, catégorie, tags, heroImage, niveau, duree

- [ ] **Ajouter nœud Code "Lire body page Notion avec pagination"** — l'API Notion retourne max 100 blocks par appel, il faut paginer si `has_more === true` :
```javascript
const pageId = $input.first().json.body.page_id;
const token = $env.NOTION_TOKEN; // ou utiliser this.helpers.httpRequest avec credential

let allBlocks = [];
let cursor = undefined;
let hasMore = true;

while (hasMore) {
  const url = `https://api.notion.com/v1/blocks/${pageId}/children` + (cursor ? `?start_cursor=${cursor}` : '');
  const res = await this.helpers.httpRequest({
    method: 'GET',
    url,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
    },
  });
  allBlocks = allBlocks.concat(res.results || []);
  hasMore = res.has_more;
  cursor = res.next_cursor;
}

return allBlocks.map(b => ({ json: b }));
```
> Note : utiliser un nœud HTTP Request dédié avec le credential Notion si `this.helpers.httpRequest` pose problème (voir gotcha CLAUDE.md sur `httpRequestWithAuthentication`).

- [ ] **Ajouter nœud Code "Convertir blocks en Markdown"** :
```javascript
// Convertit les blocks Notion paragraph en Markdown plain text
function blocksToMarkdown(blocks) {
  return blocks.map(b => {
    if (b.type === 'paragraph') {
      return b.paragraph.rich_text.map(t => t.plain_text).join('');
    }
    if (b.type === 'heading_2') {
      return '## ' + b.heading_2.rich_text.map(t => t.plain_text).join('');
    }
    if (b.type === 'heading_3') {
      return '### ' + b.heading_3.rich_text.map(t => t.plain_text).join('');
    }
    if (b.type === 'bulleted_list_item') {
      return '- ' + b.bulleted_list_item.rich_text.map(t => t.plain_text).join('');
    }
    return '';
  }).filter(Boolean).join('\n\n');
}

const blocks = $input.all().map(i => i.json);
const markdown = blocksToMarkdown(blocks);
return [{ json: { markdown } }];
```

- [ ] **Ajouter nœud Code "Construire fichier .md"** :
```javascript
const props = $('Lire propriétés').first().json;
const { markdown } = $('Convertir blocks').first().json;
const dbType = $('Webhook').first().json.body.db_type;

// Échapper les guillemets pour YAML valide
const esc = (s) => (s || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');

// Normaliser les tags (tableau de strings ou objets Notion {name:...})
const rawTags = Array.isArray(props.tags) ? props.tags : [];
const tagsYaml = rawTags.map(t => {
  const name = typeof t === 'string' ? t : (t.name || '');
  return `"${esc(name)}"`;
}).join(', ');

const today = new Date().toISOString().split('T')[0];
const path = dbType === 'cours'
  ? `src/content/cours/${props.slug}.md`
  : `src/content/blog/${props.slug}.md`;

const extraFrontmatter = dbType === 'cours'
  ? `niveau: "${esc(props.niveau)}"\nduree: "${esc(props.duree)}"\n`
  : '';

const fileContent = `---
title: "${esc(props.title)}"
pubDate: ${today}
author: "Équipe KMC"
category: "${esc(props.category)}"
tags: [${tagsYaml}]
heroImage: "/images/${dbType}/${props.slug}.jpg"
description: "${esc(props.description)}"
${extraFrontmatter}---

${markdown}`;

return [{ json: { path, fileContent, slug: props.slug, dbType } }];
```

---

### Task 9 : WF5 — commit GitHub + réseaux sociaux

- [ ] **Ajouter nœud "GitHub GET SHA"** → `GET https://api.github.com/repos/david72220/site-KMC/contents/{path}` (credential `GitHub PAT`) → extraire `sha` si 200, `null` si 404

- [ ] **Ajouter nœud Code "Préparer PUT GitHub"** :
```javascript
const { path, fileContent } = $('Construire fichier').first().json;
const sha = $('GitHub GET SHA').first().json.sha || null;
const body = {
  message: `feat: publication automatique ${path}`,
  content: Buffer.from(fileContent).toString('base64'),
  branch: 'main',
};
if (sha) body.sha = sha;
return [{ json: { path, body } }];
```

- [ ] **Ajouter nœud "GitHub PUT fichier"** → `PUT https://api.github.com/repos/david72220/site-KMC/contents/{path}` avec body JSON

- [ ] **Ajouter nœud "DeepSeek génère post social"** → POST `http://172.18.0.1:11434/api/chat`
```json
{
  "model": "deepseek-v4-pro:cloud",
  "think": false,
  "num_predict": 300,
  "messages": [{
    "role": "user",
    "content": "Génère un post court de 150 mots pour Facebook et LinkedIn à partir de cet article KMC. Accroche forte, 3 points clés, appel à l'action avec le lien https://kmc.ci/{dbType}/{slug}/. Ton professionnel mais accessible."
  }]
}
```

- [ ] **Ajouter 2 nœuds parallèles :**
  - **Facebook** : `POST https://graph.facebook.com/v19.0/{PAGE_ID}/feed` avec `message` + `access_token` (credential `Facebook Page Token`)
  - **LinkedIn** : nœud LinkedIn OAuth2 N8N → post sur la page entreprise

- [ ] **Ajouter nœud "Update Notion final"** → `PATCH /v1/pages/{page_id}` :
  - `Statut` → `Publié`
  - `Date publication` → today
  - `URL publiée` → `https://kmc.ci/{dbType}/{slug}/`
  - `▶ Lancer publication` → `false`

- [ ] **Ajouter nœud Error Trigger** → en cas d'erreur → `PATCH /v1/pages/{page_id}` Statut : `Erreur` + message dans Description

- [ ] **Test complet WF5** : créer une page test dans DB Blog avec body + slug rempli, cocher `▶ Lancer publication`
  - ✅ Fichier `.md` apparu dans repo GitHub
  - ✅ Vercel rebuild déclenché
  - ✅ Post Facebook + LinkedIn créés
  - ✅ Statut Notion → Publié + URL remplie

- [ ] **Valider + noter l'ID WF5**
```
mcp__n8n__n8n_validate_workflow  id: <WF5_ID>
```

- [ ] **Commit**
```bash
git commit --allow-empty -m "feat: WF5 Publication opérationnel — GitHub + Vercel + Facebook + LinkedIn"
```

---

## Phase 4 — WF4 Génération-Contenu

### Task 10 : WF4 — squelette + branche Blog

- [ ] **Créer WF4** : `mcp__n8n__n8n_create_workflow` name: "KMC — WF4 Génération Contenu"

- [ ] **Ajouter 2 webhooks** :
  - Path `kmc-generer-blog`, authType headerAuth, token `kmc-gen-secret-2026`
  - Path `kmc-formater-cours`, authType headerAuth, token `kmc-gen-secret-2026`
  > Les deux webhooks convergent vers le même flux après identification du `db_type`

- [ ] **Ajouter nœud IF** → `db_type == "blog"` → branche TRUE = blog, FALSE = cours

**Branche BLOG :**

- [ ] **Nœud "Serper contexte mot-clé"** → `POST https://google.serper.dev/search` header `X-API-KEY` (credential `Serper.dev API`)
```json
{ "q": "{mot_cle_seo}", "gl": "ci", "hl": "fr", "num": 5 }
```

- [ ] **Nœud "DeepSeek article"** → POST `http://172.18.0.1:11434/api/chat`
```json
{
  "model": "deepseek-v4-pro:cloud",
  "think": false,
  "num_predict": 8000,
  "options": { "timeout": 540000 },
  "messages": [{
    "role": "user",
    "content": "Rédige un article de blog SEO de 1200-1500 mots sur '{mot_cle}' pour kmc.ci (centre de formation fibre optique Abidjan). Structure : H2 (4-5 sections), H3 sous-sections, inclure des liens internes vers /formations-fibre-optique/ et /contact/. Ton expert et accessible. Retourne uniquement le Markdown sans frontmatter. Contexte concurrents : {serper_results}"
  }]
}
```

- [ ] **Nœud "Imagen 3"** → POST `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict` header `x-goog-api-key`
```json
{
  "instances": [{ "prompt": "Photo professionnelle de technicien fibre optique travaillant sur un réseau en Côte d'Ivoire, style corporate, fond sombre, haute qualité" }],
  "parameters": { "sampleCount": 1, "aspectRatio": "16:9" }
}
```

- [ ] **Nœud Code "Decode image base64 → commit GitHub"** :
```javascript
const imageB64 = $input.first().json.predictions[0].bytesBase64Encoded;
const slug = $('Lire propriétés').first().json.slug;
return [{
  json: {
    path: `public/images/blog/${slug}.jpg`,
    content: imageB64,
    message: `feat: image blog ${slug}`,
  }
}];
```

- [ ] **Nœud "GitHub PUT image"** → `PUT https://api.github.com/repos/david72220/site-KMC/contents/{path}` (GET SHA préalable si existe)

---

### Task 11 : WF4 — branche Cours

- [ ] **Nœud "Lire Fichier TXT"** → `GET /v1/pages/{page_id}` (Notion API) → extraire `properties['Fichier TXT'].files[0].file.url` → `GET {url}` → récupérer le contenu texte brut

- [ ] **Nœud "DeepSeek TXT→MD"** → POST `http://172.18.0.1:11434/api/chat`
```json
{
  "model": "deepseek-v4-pro:cloud",
  "think": false,
  "num_predict": 8000,
  "options": { "timeout": 540000 },
  "messages": [{
    "role": "user",
    "content": "Transforme ce texte brut en cours Markdown enrichi pour un site de formation. Structure : H2 pour les grandes sections, H3 pour les sous-sections, tableaux récapitulatifs, blocs de mise en valeur (> citation), liste des objectifs en début. Conserve TOUT le contenu sans rien supprimer. Retourne uniquement le Markdown.\n\n{fichier_txt}"
  }]
}
```

- [ ] **Nœud "Imagen 3 cours"** → même appel que blog mais prompt adapté :
```
"Illustration pédagogique sur {titre_cours}, style éducatif professionnel, icônes techniques fibre optique ou photovoltaïque, fond sombre avec accents bleus"
```

- [ ] **Nœud "GitHub PUT image cours"** → `public/images/cours/{slug}.jpg`

---

### Task 12 : WF4 — écriture Notion + finalisation

Les deux branches convergent ici.

- [ ] **Nœud Code "Découpe MD en chunks"** :
```javascript
function chunkText(text, maxLen = 1900) {
  const chunks = [];
  let current = '';
  for (const line of text.split('\n')) {
    if ((current + '\n' + line).length > maxLen) {
      if (current) chunks.push(current.trim());
      current = line;
    } else {
      current = current ? current + '\n' + line : line;
    }
  }
  if (current) chunks.push(current.trim());
  return chunks;
}
const md = $input.first().json.markdown;
return chunkText(md).map(c => ({ json: { chunk: c } }));
```

- [ ] **Nœud IF "Contenu existant ?"** → `GET /v1/blocks/{page_id}/children` → si résultats → supprimer chaque block via `DELETE /v1/blocks/{block_id}`

- [ ] **Nœud "Append Block Children"** → `PATCH https://api.notion.com/v1/blocks/{page_id}/children`
```json
{
  "children": [
    { "object": "block", "type": "paragraph", "paragraph": { "rich_text": [{ "type": "text", "text": { "content": "{chunk}" } }] } }
  ]
}
```

- [ ] **Nœud "Update propriétés Notion"** :
  - `Image hero` → URL raw GitHub `https://raw.githubusercontent.com/david72220/site-KMC/main/public/images/{dbType}/{slug}.jpg`
  - `Statut` → `Généré` (blog) ou `Formaté` (cours)
  - `Moteur LLM` → `DeepSeek V4`
  - `▶ Lancer génération` / `▶ Lancer formatage` → `false`

- [ ] **Error Trigger** → Statut : `Erreur` + message dans Description

- [ ] **Test WF4** : créer page test dans DB Blog (remplir Mot-clé SEO + Slug), cocher `▶ Lancer génération`
  - ✅ Statut passe à "En génération" puis "Généré"
  - ✅ Body de la page Notion contient le Markdown
  - ✅ Image dans GitHub `public/images/blog/{slug}.jpg`

- [ ] **Valider + noter l'ID WF4**

- [ ] **Commit**
```bash
git commit --allow-empty -m "feat: WF4 Génération Contenu opérationnel — blog DeepSeek+Imagen3 + cours TXT→MD"
```

---

## Phase 5 — WF3 Suggestions

### Task 13 : WF3 — création + test

- [ ] **Créer WF3** : name "KMC — WF3 Suggestions SEO"

- [ ] **Nœud "Lire Rapport SEO"** → `GET /v1/blocks/3739628038de8059b56aeb2af9c73fbf/children` → extraire texte

- [ ] **Nœud "Lire Rapport Veille"** → `GET /v1/blocks/3739628038de806c8b0adf0343cb803f/children` → extraire texte

- [ ] **Nœud Code "Formate prompt suggestions"** :
```javascript
const seo = $('Lire Rapport SEO').all().map(i => i.json).filter(b => b.type === 'paragraph').map(b => b.paragraph.rich_text.map(t => t.plain_text).join('')).join('\n');
const veille = $('Lire Rapport Veille').all().map(i => i.json).filter(b => b.type === 'paragraph').map(b => b.paragraph.rich_text.map(t => t.plain_text).join('')).join('\n');
return [{ json: { seo, veille } }];
```

- [ ] **Nœud "DeepSeek suggestions"** :
```json
{
  "model": "deepseek-v4-pro:cloud",
  "think": false,
  "num_predict": 4000,
  "messages": [{
    "role": "user",
    "content": "Tu es expert SEO en Côte d'Ivoire. Analyse ces données SEO et de veille concurrentielle, puis génère exactement 5 idées d'articles blog et 2 idées de cours gratuits pour kmc.ci (fibre optique/photovoltaïque/formation).\n\nSEO KMC:\n{seo}\n\nVeille:\n{veille}\n\nRéponds UNIQUEMENT en JSON valide (pas de markdown) :\n{\"blog\":[{\"title\":\"\",\"keyword\":\"\",\"description\":\"\",\"category\":\"\",\"tags\":[],\"slug\":\"\"}],\"cours\":[{\"title\":\"\",\"niveau\":\"\",\"category\":\"\",\"tags\":[],\"slug\":\"\"}]}"
  }]
}
```

- [ ] **Nœud Code "Parse + nettoyer JSON"** :
```javascript
let raw = $input.first().json.message.content;
// Nettoyer les balises markdown éventuelles
raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
try {
  const parsed = JSON.parse(raw);
  const items = [
    ...parsed.blog.map(b => ({ ...b, db_type: 'blog' })),
    ...parsed.cours.map(c => ({ ...c, db_type: 'cours' }))
  ];
  return items.map(i => ({ json: i }));
} catch(e) {
  throw new Error('DeepSeek JSON invalide: ' + raw.substring(0, 200));
}
```

- [ ] **Nœud IF** → `db_type == "blog"` → branche blog / cours

- [ ] **Nœud "Créer page DB Blog"** → `POST /v1/pages`
```json
{
  "parent": { "database_id": "3739628038de80348128de6db5f9e878" },
  "properties": {
    "Nom": { "title": [{ "text": { "content": "{title}" } }] },
    "Statut": { "select": { "name": "Idée" } },
    "Mot-clé SEO": { "rich_text": [{ "text": { "content": "{keyword}" } }] },
    "Description": { "rich_text": [{ "text": { "content": "{description}" } }] },
    "Catégorie": { "select": { "name": "{category}" } },
    "Tags": { "multi_select": "{tags}".split(',').map(t => ({ "name": t.trim() })) },
    "Slug": { "rich_text": [{ "text": { "content": "{slug}" } }] },
    "Source": { "select": { "name": "Suggestion IA" } }
  }
}
```

- [ ] **Nœud "Créer page DB Cours"** → `POST /v1/pages` DB Cours (`3739628038de8063bf15fa861f76d028`) avec les champs cours

- [ ] **Test WF3** : déclencher manuellement depuis N8N
  - ✅ 5 nouvelles pages "Idée" dans DB Blog
  - ✅ 2 nouvelles pages "Idée" dans DB Cours

- [ ] **Commit**
```bash
git commit --allow-empty -m "feat: WF3 Suggestions SEO opérationnel — 7 idées générées par DeepSeek"
```

---

## Phase 6 — WF1 et WF2 (Intelligence SEO)

### Task 14 : WF1 — SEO-KMC

- [ ] **Créer WF1** : name "KMC — WF1 Analyse SEO"

- [ ] **Nœud Cron** : lundi 8h00 (`0 8 * * 1`)

- [ ] **4 nœuds HTTP Serper.dev** (en parallèle) :
```json
{ "q": "fibre optique formation Abidjan", "gl": "ci", "hl": "fr", "num": 10 }
{ "q": "certification fibre optique Côte d'Ivoire", "gl": "ci", "hl": "fr", "num": 10 }
{ "q": "formation photovoltaïque Abidjan", "gl": "ci", "hl": "fr", "num": 10 }
{ "q": "site:kmc.ci", "gl": "ci", "hl": "fr", "num": 10 }
```
Header : `X-API-KEY` (credential `Serper.dev API`)

- [ ] **Nœud Code "Extraire données SEO"** : fusionne les 4 résultats → top domaines, titres concurrents, snippets

- [ ] **Nœud "Écrire Rapport SEO"** → supprimer blocks existants de la page `3739628038de8059b56aeb2af9c73fbf` puis `PATCH /v1/blocks/{id}/children` avec le rapport formaté en texte

- [ ] **Nœud Execute Workflow** → déclenche WF2

- [ ] **Test** : exécuter manuellement → vérifier contenu page Rapport SEO dans Notion

---

### Task 15 : WF2 — Veille-Concurrents

- [ ] **Créer WF2** : name "KMC — WF2 Veille Concurrents"

- [ ] **Nœud "Query DB Blog — fichiers manuels"** → `POST /v1/databases/3739628038de80348128de6db5f9e878/query`
```json
{
  "filter": {
    "and": [
      { "property": "Fichier SEO", "files": { "is_not_empty": true } },
      { "property": "Statut", "select": { "equals": "Idée" } }
    ]
  }
}
```

- [ ] **Nœud IF** → fichiers présents → télécharger chaque fichier (URL directe depuis `properties['Fichier SEO'].files[0].file.url`)

- [ ] **3 nœuds Serper.dev concurrents** :
```json
{ "q": "meilleur centre formation fibre optique Abidjan", "gl": "ci", "hl": "fr", "num": 5 }
{ "q": "cours fibre optique gratuit Afrique", "gl": "ci", "hl": "fr", "num": 5 }
{ "q": "blog fibre optique Côte d'Ivoire 2026", "gl": "ci", "hl": "fr", "num": 5 }
```

- [ ] **Nœud Code "Fusionner rapports"** : Serper + contenu fichiers manuels → rapport unifié

- [ ] **Nœud "Écrire Rapport Veille"** → supprimer + réécrire page `3739628038de806c8b0adf0343cb803f`

- [ ] **Nœud Execute Workflow** → déclenche WF3

- [ ] **Test** : exécuter manuellement → vérifier page Rapport Veille dans Notion

- [ ] **Commit**
```bash
git commit --allow-empty -m "feat: WF1 SEO-KMC + WF2 Veille-Concurrents opérationnels"
```

---

## Phase 7 — Automations Notion

### Task 16 : Configurer les 4 webhooks Notion

> Ces automations doivent être créées manuellement dans l'interface Notion (⚡ Automations) — pas d'API Notion pour ça.

- [ ] **DB Blog — automation 1** : Trigger "Propriété modifiée" → `▶ Lancer génération` → Action "Envoyer webhook" → `https://n8n.srv1179315.hstgr.cloud/webhook/kmc-generer-blog` POST body :
```json
{ "page_id": "{{page.id}}", "db_type": "blog", "token": "kmc-gen-secret-2026" }
```

- [ ] **DB Cours — automation 1** : Trigger `▶ Lancer formatage` → webhook `kmc-formater-cours` body :
```json
{ "page_id": "{{page.id}}", "db_type": "cours", "token": "kmc-gen-secret-2026" }
```

- [ ] **DB Blog — automation 2** : Trigger `▶ Lancer publication` → webhook `kmc-publier` body :
```json
{ "page_id": "{{page.id}}", "db_type": "blog", "token": "kmc-pub-secret-2026" }
```

- [ ] **DB Cours — automation 2** : Trigger `▶ Lancer publication` → webhook `kmc-publier` body :
```json
{ "page_id": "{{page.id}}", "db_type": "cours", "token": "kmc-pub-secret-2026" }
```

- [ ] **Test d'intégration** : dans DB Blog, cocher `▶ Lancer génération` sur une page test → vérifier que WF4 se déclenche dans N8N

---

## Phase 8 — Validation sécurité

### Task 17 : /n8n-validate

- [ ] **Lancer `/n8n-validate`** sur les 5 workflows
  - Vérifier : nœuds orphelins, expressions invalides, timeouts DeepSeek à 540s, Error Triggers présents

- [ ] **Corriger les issues trouvées**

- [ ] **Activer tous les workflows** dans N8N (toggle Actif)

---

### Task 18 : /security-review

- [ ] **Lancer `/security-review`**
  - ✅ Tous les webhooks ont un token d'auth header
  - ✅ GitHub PAT en fine-grained token (scope `contents:write` sur `site-KMC` uniquement)
  - ✅ Credentials N8N avec option "Never log" activée pour les tokens sensibles
  - ✅ Token Notion limité aux 4 DB/pages du projet
  - ✅ WF4/WF5 vérifient le token avant de traiter la requête

- [ ] **Corriger les issues trouvées**

---

## Phase 9 — Test end-to-end + déploiement

### Task 19 : Test pipeline complet

- [ ] **Test pipeline blog complet** :
  1. Exécuter WF1 manuellement → Rapport SEO Notion mis à jour ✅
  2. WF2 s'enchaîne → Rapport Veille mis à jour ✅
  3. WF3 s'enchaîne → 5 idées blog créées dans DB Blog ✅
  4. Sur une idée → cocher `▶ Lancer génération` → WF4 → article généré + image ✅
  5. Relire l'article dans Notion → cocher `▶ Lancer publication` → WF5 ✅
  6. Vérifier `https://kmc.ci/blog/{slug}/` en ligne ✅
  7. Vérifier le post sur Facebook et LinkedIn ✅

- [ ] **Test pipeline cours** :
  1. Créer une page dans DB Cours, déposer un fichier TXT
  2. Cocher `▶ Lancer formatage` → WF4 branche cours → Markdown enrichi ✅
  3. Cocher `▶ Lancer publication` → WF5 → page en ligne ✅
  4. Vérifier `https://kmc.ci/cours/{slug}/` avec table des matières ✅

- [ ] **Supprimer le fichier test** `src/content/cours/test-cours-fibre-optique.md` (remplacé par le vrai contenu)

- [ ] **Commit final + push**
```bash
cd "/Users/davidollivier/Documents/Antigravity/Site KMC"
git add src/ public/
git commit -m "feat: pipeline SEO blog complet — WF1→WF5 validés, templates cours, navigation mise à jour"
git push origin main
```

---

## Résumé des IDs et credentials à noter

| Élément | Valeur / Action |
|---|---|
| WF1 ID N8N | À noter après création |
| WF2 ID N8N | À noter après création |
| WF3 ID N8N | À noter après création |
| WF4 ID N8N | À noter après création |
| WF5 ID N8N | À noter après création |
| Token webhook génération | `kmc-gen-secret-2026` (à changer en production) |
| Token webhook publication | `kmc-pub-secret-2026` (à changer en production) |
| Credential N8N à créer | Serper.dev API, Google AI Studio, GitHub PAT, Facebook Page Token, LinkedIn OAuth2 |

---

*Plan rédigé le 2026-06-02 — Spec : `docs/superpowers/specs/2026-06-02-pipeline-seo-blog-kmc-design.md`*
