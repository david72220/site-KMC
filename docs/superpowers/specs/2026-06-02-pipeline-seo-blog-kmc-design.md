# Spec — Pipeline SEO Blog KMC
**Date :** 2026-06-02  
**Projet :** Site KMC (`/Documents/Antigravity/Site KMC/`)  
**Statut :** Design validé — en attente d'implémentation

---

## Objectif

Construire un pipeline automatisé qui analyse le SEO du site KMC, surveille les concurrents, génère des idées de contenu, les enrichit avec IA, et les publie sur le site kmc.ci ainsi que sur Facebook et LinkedIn — le tout piloté depuis Notion.

---

## Architecture globale

```
Notion (Blog DB + Cours DB)
        │
        │ webhooks (checkbox)
        ▼
N8N — 5 workflows
  WF1 SEO-KMC ──────────────────────────────────┐
  WF2 Veille-Concurrents ──────────────────────┐ │ → WF3 Suggestions
  WF4 Génération-Contenu ← webhook "Générer"   │ │    → crée pages Notion
  WF5 Publication ← webhook "Publier"          │ │
        │                                      └─┘
        ├─► GitHub API → src/content/blog/*.md ou src/content/cours/*.md
        │       ↓ push → Vercel auto-deploy → kmc.ci
        ├─► Facebook Graph API (post court)
        └─► LinkedIn API (post court)
```

---

## Bases de données Notion

### IDs

| Base | ID Notion |
|---|---|
| DB Blog | `3739628038de80348128de6db5f9e878` |
| DB Cours gratuits | `3739628038de8063bf15fa861f76d028` |
| Rapport SEO KMC (page) | `3739628038de8059b56aeb2af9c73fbf` |
| Rapport Veille Concurrents (page) | `3739628038de806c8b0adf0343cb803f` |

> Les deux pages Rapport sont des pages simples (non-DB) qui stockent les résultats intermédiaires entre WF1/WF2 et WF3.

### Schéma — DB Blog

| Propriété | Type | Notes |
|---|---|---|
| `Nom` | title | Titre de l'article |
| `Statut` | select | `Idée` / `En génération` / `Généré` / `En publication` / `Publié` / `Erreur` |
| `Mot-clé SEO` | rich_text | Mot-clé principal ciblé |
| `Catégorie` | select | Fibre optique / Photovoltaïque / Formation / Actualités |
| `Tags` | multi_select | Tags libres |
| `Description` | rich_text | Meta description (160 car. max) |
| `Slug` | rich_text | Nom du fichier `.md` (ex: `guide-certification-fibre-2026`) |
| `Source` | select | `Serper.dev` / `Manuel` / `Suggestion IA` |
| `Fichier SEO` | files | Fichier manuel optionnel (PDF, TXT, CSV) pour enrichir WF2 |
| `Image hero` | url | URL raw GitHub après commit de l'image Imagen 3 |
| `Date publication` | date | Remplie automatiquement par WF5 |
| `URL publiée` | url | `https://kmc.ci/blog/{slug}/` — remplie par WF5 |
| `Moteur LLM` | select | `DeepSeek V4` / `Manuel` |
| `▶ Lancer génération` | checkbox | Coche → déclenche WF4 (repassé ☐ automatiquement) |
| `▶ Lancer publication` | checkbox | Coche → déclenche WF5 (repassé ☐ automatiquement) |

> Le contenu Markdown complet est stocké dans le **corps de la page Notion** (blocks), pas dans une propriété (limite 2000 chars/objet).

### Schéma — DB Cours gratuits

| Propriété | Type | Notes |
|---|---|---|
| `Nom` | title | Titre du cours |
| `Statut` | select | `Idée` / `Fichier déposé` / `En formatage` / `Formaté` / `En publication` / `Publié` / `Erreur` |
| `Fichier TXT` | files | Texte brut déposé manuellement (rédigé avec Claude/Perplexity) |
| `Niveau` | select | Débutant / Intermédiaire / Avancé |
| `Durée estimée` | rich_text | Ex : `2h30` |
| `Catégorie` | select | Fibre optique / Photovoltaïque / Habilitations / Sécurité |
| `Tags` | multi_select | Tags libres |
| `Slug` | rich_text | Nom du fichier `.md` |
| `Image hero` | url | URL raw GitHub après commit |
| `Date publication` | date | Remplie par WF5 |
| `URL publiée` | url | `https://kmc.ci/cours/{slug}/` |
| `▶ Lancer formatage` | checkbox | Coche → déclenche WF4 branche Cours (repassé ☐ auto) |
| `▶ Lancer publication` | checkbox | Coche → déclenche WF5 (repassé ☐ auto) |

### Flux des statuts

```
WF3 crée la page          → Statut: Idée
Tu coches ▶ Lancer génération
                           → WF4 démarre → Statut: En génération
WF4 termine                → Statut: Généré + contenu dans body
Tu coches ▶ Lancer publication
                           → WF5 démarre → Statut: En publication
WF5 termine                → Statut: Publié + URL remplie
Erreur dans WF4/WF5        → Statut: Erreur + message dans Description
```

---

## Détail des 5 workflows N8N

### WF1 — SEO-KMC

**Déclencheur :** Cron lundi 8h00  
**Rôle :** Analyser le positionnement SEO actuel de kmc.ci et identifier les opportunités.

**Nœuds :**
1. `[Schedule Trigger]` — lundi 8h00
2. `[HTTP Request × 4]` → Serper.dev API
   - `"fibre optique formation Abidjan"`
   - `"certification fibre optique Côte d'Ivoire"`
   - `"formation photovoltaïque Abidjan"`
   - `"site:kmc.ci"` (pages indexées)
3. `[Code]` — extrait titres, snippets, URLs, domaines concurrents des top 10
4. `[Notion — Update page]` → écrase le corps de `Rapport SEO KMC` (`3739628038de8059b56aeb2af9c73fbf`)
5. `[Execute Workflow]` → déclenche WF2

---

### WF2 — Veille-Concurrents

**Déclencheur :** Appelé par WF1 (ou manuel depuis N8N)  
**Rôle :** Surveiller les concurrents + intégrer les fichiers manuels déposés dans Notion.

**Nœuds :**
1. `[Execute Workflow Trigger]`
2. `[Notion — Query DB Blog]` — filtre : `Fichier SEO` non vide + `Statut` = `Idée`
3. `[IF]` — fichiers manuels présents ?
   - OUI → `[HTTP Request]` télécharge chaque fichier → extrait contenu texte
   - NON → continue
4. `[HTTP Request × 3]` → Serper.dev
   - `"meilleur centre formation fibre optique Abidjan"`
   - `"cours fibre optique gratuit Afrique"`
   - `"blog fibre optique Côte d'Ivoire 2026"`
5. `[Code]` — fusionne Serper + fichiers manuels en un rapport structuré
6. `[Notion — Update page]` → écrase `Rapport Veille Concurrents` (`3739628038de806c8b0adf0343cb803f`)
7. `[Execute Workflow]` → déclenche WF3

---

### WF3 — Suggestions

**Déclencheur :** Appelé par WF2 (ou déclenchement manuel)  
**Rôle :** Générer 5-10 idées de contenu optimisées SEO et les injecter dans les deux bases Notion.

**Nœuds :**
1. `[Execute Workflow Trigger]`
2. `[Notion — Lire page]` → `Rapport SEO KMC`
3. `[Notion — Lire page]` → `Rapport Veille Concurrents`
4. `[Code]` — formate les deux rapports en prompt structuré
5. `[HTTP Request]` → DeepSeek V4 Pro (`172.18.0.1:11434/api/chat`)
   - `think: false`, `num_predict: 4000`
   - Prompt : génère 5 idées articles blog + 2 idées cours gratuits avec titre, mot-clé, description, catégorie, tags, slug
6. `[Code]` — parse JSON DeepSeek → tableau de 7 entrées
7. `[Loop]` — pour chaque suggestion :
   - Blog → `[Notion — Create page]` dans DB Blog (Statut: Idée, Source: Suggestion IA)
   - Cours → `[Notion — Create page]` dans DB Cours gratuits (Statut: Idée)

---

### WF4 — Génération-Contenu

**Déclencheur :** Webhook Notion (coche `▶ Lancer génération` ou `▶ Lancer formatage`)  
**Rôle :** Générer le contenu complet (article blog ou cours formaté) + image hero.

**Webhooks Notion à configurer :**
- DB Blog, trigger `▶ Lancer génération` → `webhook/kmc-generer-blog` (payload: `page_id`, `db_type=blog`)
- DB Cours, trigger `▶ Lancer formatage` → `webhook/kmc-formater-cours` (payload: `page_id`, `db_type=cours`)

**Nœuds communs :**
1. `[Webhook]` — reçoit `page_id` + `db_type`
2. `[Notion — Lire propriétés]` → titre, mot-clé, catégorie, tags, description, slug
3. `[Notion — Update]` → Statut : `En génération`
4. `[IF]` → `db_type` = `blog` ou `cours` ?

**Branche BLOG :**
5. `[HTTP Request]` → Serper.dev : recherche `{mot-clé}` → contexte top 5 résultats
6. `[HTTP Request]` → DeepSeek V4 Pro
   - Prompt structuré : article 1200-1500 mots, H2/H3 SEO, liens internes kmc.ci, `think: false`, `num_predict: 8000`
7. `[HTTP Request]` → Imagen 3 API (Google AI Studio)
   - `POST https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict`
   - Header : `x-goog-api-key`
8. `[HTTP Request]` → GitHub API : commit image en `public/images/blog/{slug}.jpg` (base64)

**Branche COURS :**
5. `[HTTP Request]` → télécharge `Fichier TXT` depuis l'URL Notion
6. `[HTTP Request]` → DeepSeek V4 Pro
   - Prompt : transformer TXT brut en Markdown enrichi (H2/H3, tableaux, callouts, résumé), `think: false`, `num_predict: 8000`
7. `[HTTP Request]` → Imagen 3 API → image hero
8. `[HTTP Request]` → GitHub API : commit image en `public/images/cours/{slug}.jpg`

**Nœuds communs (suite) :**
9. `[Code]` — découpe Markdown en chunks ≤ 1900 chars (limite Notion rich_text)
10. `[Notion — Update page body]` — écrit le contenu en blocks
11. `[Notion — Update propriétés]`
    - `Image hero` ← URL raw GitHub
    - `Statut` ← `Généré` (blog) ou `Formaté` (cours)
    - `Moteur LLM` ← `DeepSeek V4`
    - `▶ Lancer génération` (ou `▶ Lancer formatage`) ← `false`

---

### WF5 — Publication

**Déclencheur :** Webhook Notion (coche `▶ Lancer publication` — les deux bases)  
**Rôle :** Publier sur kmc.ci, Facebook et LinkedIn.

**Webhooks Notion à configurer :**
- DB Blog, trigger `▶ Lancer publication` → `webhook/kmc-publier` (payload: `page_id`, `db_type=blog`)
- DB Cours, trigger `▶ Lancer publication` → `webhook/kmc-publier` (payload: `page_id`, `db_type=cours`)

**Nœuds :**
1. `[Webhook]` — reçoit `page_id` + `db_type`
2. `[Notion — Update]` → Statut : `En publication`
3. `[Notion — Lire propriétés]` → slug, titre, description, catégorie, tags, image, db_type, niveau (cours)
4. `[Notion — Lire page body]` → blocks → convertit en Markdown
5. `[Code]` — construit fichier `.md` complet avec frontmatter :

```markdown
---
title: "..."
pubDate: YYYY-MM-DD
author: "Équipe KMC"
category: "..."
tags: [...]
heroImage: "/images/blog/{slug}.jpg"   # ou /cours/
description: "..."
# Pour les cours uniquement :
niveau: "Débutant"
duree: "2h30"
---
[contenu markdown]
```

6. `[HTTP Request → GitHub API]`
   - GET d'abord pour récupérer le SHA si fichier existant
   - PUT avec contenu base64 + SHA
   - Blog : `src/content/blog/{slug}.md`
   - Cours : `src/content/cours/{slug}.md`
   - Push → Vercel auto-deploy
7. `[HTTP Request → DeepSeek V4 Pro]`
   - Prompt : post court 150 mots, accroche + lien `https://kmc.ci/{blog|cours}/{slug}/`
8. `[Parallel ×2]`
   - `[HTTP Request]` → Facebook Graph API : POST sur Page KMC
   - `[HTTP Request]` → LinkedIn API : POST sur Company KMC
9. `[Notion — Update propriétés]`
   - `Statut` ← `Publié`
   - `Date publication` ← today
   - `URL publiée` ← `https://kmc.ci/{blog|cours}/{slug}/`
   - `▶ Lancer publication` ← `false`

---

## Templates Astro

### Structure fichiers

```
src/
├── content/
│   ├── blog/              ← existe ✅ — articles .md
│   └── cours/             ← NOUVEAU — cours .md (créé par WF5)
├── pages/
│   ├── blog.astro         ← inchangé ✅
│   ├── blog/[id].astro    ← inchangé ✅
│   ├── cours.astro        ← NOUVEAU — liste des cours gratuits
│   └── cours/[id].astro   ← NOUVEAU — template cours enrichi
public/
├── images/
│   ├── blog/              ← images générées par WF4 blog
│   └── cours/             ← NOUVEAU — images générées par WF4 cours
```

### Différences template cours vs blog

| Élément | Blog | Cours |
|---|---|---|
| Badge | Catégorie | Niveau + Durée |
| Table des matières | Non | Oui (générée depuis les H2) |
| CTA footer | "Voir nos formations" | "S'inscrire à la formation complète" |
| Images inline | Rares | Plusieurs (Markdown standard) |

### Navigation

Ajouter "Cours gratuits" dans `Navigation.astro` :
```
Accueil | Formations | Cours gratuits | Blog | Contact
```

---

## Credentials et variables

### Nouveaux credentials N8N à créer

| Credential | Service | Type | Endpoint / Source |
|---|---|---|---|
| `Serper.dev API` | Recherche Google | HTTP Header Auth (`X-API-KEY`) | serper.dev → Dashboard |
| `Google AI Studio` | Imagen 3 | HTTP Header Auth (`x-goog-api-key`) | aistudio.google.com → API keys |
| `GitHub PAT` | Commit fichiers | HTTP Header Auth (`Authorization: token xxx`) | GitHub → Settings → Developer → PAT (scope: `repo`) |
| `Facebook Page Token` | Post Facebook | HTTP Header Auth | Facebook Developers → Page Access Token (long-lived) |
| `LinkedIn OAuth2` | Post LinkedIn | OAuth2 | LinkedIn Developers → App (scope: `w_organization_social`) |

### Variables Vercel — aucune nouvelle requise

Le site Astro lit les `.md` au build. N8N écrit directement dans GitHub → Vercel rebuild auto.

### Actions Notion requises

- Partager DB Blog avec l'intégration Notion existante
- Partager DB Cours gratuits avec l'intégration Notion existante
- Partager les deux pages Rapport avec l'intégration

---

## Gotchas critiques

### GitHub API — mise à jour de fichier
Obligatoire : récupérer le SHA avant PUT si le fichier existe déjà.
```
GET /repos/david72220/site-KMC/contents/src/content/blog/{slug}.md → { sha }
PUT /repos/david72220/site-KMC/contents/src/content/blog/{slug}.md
    body: { content: base64(markdown), sha: "...", message: "..." }
```

### DeepSeek V4 Pro — paramètre think
Toujours passer `think: false` dans le body. Sans ça, le raisonnement consomme tous les tokens et `message.content` revient vide.

### Notion — limite rich_text
Max 2000 chars par text object. Découper le Markdown en chunks de 1900 chars avant d'écrire les blocks.

### Notion — lecture fichiers (rollup)
L'API Notion retourne `files: []` vide pour les rollups de fichiers. Pour lire `Fichier TXT` dans la DB Cours, fetch la page directement via `GET /v1/pages/{id}` pour accéder aux fichiers.

### LinkedIn — Marketing API
Poster sur une page entreprise nécessite l'accès "Marketing Developer Platform". Délai d'approbation 1-2 semaines. À demander en amont.

### Facebook — token long-lived
Générer un token long-lived (~60 jours) via l'API Graph. Mettre en place un rappel de renouvellement.

### Imagen 3 — format réponse
L'API retourne l'image encodée en base64 dans `predictions[0].bytesBase64Encoded`. Décoder avant de committer dans GitHub.

### Serper.dev — quota
Free tier : 2500 requêtes/mois. WF1+WF2 : ~10 requêtes/semaine = ~40/mois. Suffisant.

---

## Ordre d'implémentation recommandé

1. Enrichir les schémas Notion (ajouter toutes les propriétés aux deux DBs)
2. Créer les templates Astro (`cours.astro` + `cours/[id].astro`) + dossier `src/content/cours/`
3. Mettre à jour la Navigation
4. WF5 Publication (le plus critique — valide tout le pipeline de bout en bout)
5. WF4 Génération-Contenu
6. WF3 Suggestions
7. WF1 SEO-KMC
8. WF2 Veille-Concurrents
9. Configurer les automations Notion (webhooks)
10. Tests end-to-end

---

*Spec rédigée le 2026-06-02 — Design validé en session de brainstorming*
