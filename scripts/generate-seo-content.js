/**
 * SEO Content Generator
 * Génère le code Astro pour de nouvelles pages/blog posts
 * Basé sur les suggestions SEO
 */

const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');

// Charger les suggestions SEO
let suggestions;
try {
  suggestions = JSON.parse(
    readFileSync(path.join(__dirname, '../.seo-suggestions.json'), 'utf8')
  );
} catch (error) {
  console.log('Aucune suggestion trouvée. Exécuter npm run analyze-seo d\'abord.');
  process.exit(0);
}

// Générer contenu pour chaque suggestion
function generateContent(suggestions) {
  return suggestions
    .filter((s) => s.type === 'blog-post' || s.type === 'content')
    .map((suggestion) => {
      // Génération du contenu Markdown pour le blog
      const content = generateBlogPost(suggestion);
      return content;
    });
}

function generateBlogPost(suggestion) {
  // Titre optimisé
  const slug = suggestion.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  // Contenu généré (à améliorer avec IA si besoin)
  const content = `---
title: "${suggestion.title}"
pubDate: 2026-05-21
author: "Équipe KMC"
category: "${suggestion.type}"
tags: [fibre optique, formation, abidjan]
heroImage: "/images/blog/${slug}.jpg"

---

## Introduction

${suggestion.description}

## Pourquoi cette formation est importante

La formation en fibre optique représente une opportunité professionnelle majeure en Côte d'Ivoire, avec une demande croissante dans les secteurs des télécommunications et de l'infrastructure numérique.

## Programmes de la formation

- Théorie sur la physique de la lumière et les fibres optiques
- Techniques de soudure et d'épissure
- Mise en œuvre de réseaux FTTH
- Certification et évaluation pratique

## Conclusion

Rejoignez KMC pour acquérir les compétences nécessaires dans un secteur en forte croissance.

---

*Article généré automatiquement par l'outil SEO de KMC.ci*
`;

  return {
    slug,
    filename: `src/content/blog/${slug}.md`,
    content,
  };
}

// Fonction pour générer la page Astro
function generatePage(suggestion) {
  const pageContent = `---
/* ============================================
   PAGE – ${suggestion.title}
   Généré automatiquement par l'outil SEO
   ============================================ */

import Layout from '../layouts/Layout.astro';
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';

const pageTitle = '${suggestion.title}';
const pageDescription = '${suggestion.description}';
const pageImage = 'https://kmc.ci/images/og-${suggestion.slug}.jpg';
---

<Layout
  title={pageTitle}
  description={pageDescription}
  image={pageImage}
  type="website"
>
  <Navigation />

  <main id="main-content" class="min-h-screen bg-kmc-night pt-24 pb-20">
    <article class="max-w-4xl mx-auto px-6">
      <h1 class="text-4xl md:text-5xl font-bold text-kmc-white mb-6">${suggestion.title}</h1>
      <p class="text-lg text-kmc-light mb-8">${suggestion.description}</p>

      <div class="bg-kmc-night/50 rounded-xl p-8 border border-kmc-cyan/20">
        <p class="text-kmc-light">
          Cette page a été générée automatiquement en se basant sur les opportunités de marché identifiées.
          Elle complète l'offre de formation de KMC.ci.
        </p>
      </div>

      <!-- Contenu spécifique à ajouter ici -->
      <div class="mt-8 text-kmc-light">
        <p>Contenu supplémentaire à générer selon les besoins.</p>
      </div>
    </article>
  </main>

  <Footer />
</Layout>
`;

  return {
    slug: `src/pages/${suggestion.slug === 'technical-sitemap' ? 'sitemap-technical' : suggestion.slug}.astro`,
    content: pageContent,
    filename: pageContent,
  };
}

// Exécuter la génération
async function generateAllContent() {
  console.log('='.repeat(60));
  console.log('📝 GÉNÉRATION DE CONTENU SEO');
  console.log('='.repeat(60));

  const blogPosts = generateContent(suggestions);
  const pages = suggestions
    .filter((s) => s.type === 'technical' || s.type === 'content')
    .map(generatePage);

  console.log('\n📄 BLOG POSTS');
  blogPosts.forEach((post) => {
    console.log(`  ${post.filename}`);
    console.log(`    📏 ${post.content.length} caractères`);
  });

  console.log('\n📄 PAGES');
  pages.forEach((page) => {
    console.log(`  ${page.filename}`);
  });

  // Sauvegarder les fichiers
  try {
    blogPosts.forEach((post) => {
      writeFileSync(post.filename, post.content, 'utf8');
    });

    pages.forEach((page) => {
      writeFileSync(page.filename, page.content, 'utf8');
    });

    console.log('\n✅ Fichiers sauvegardés !');
    console.log('='.repeat(60));

    return {
      blogPosts,
      pages,
    };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error.message);
  }
}

// Exécuter
generateAllContent();
