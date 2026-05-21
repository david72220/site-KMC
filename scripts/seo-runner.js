#!/usr/bin/env node
/**
 * SEO Runner - Exécute l'analyse SEO et prépare les modifications
 * Utilisation : npm run analyze-seo
 */

const { analyzeSEO } = require('./analyze-seo');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('🔍 SEO ANALYSIS FOR KMC.CI');
console.log('='.repeat(60));

async function runSEOAnalysis() {
  try {
    // Vérifier l'API key Notion
    const notionToken = process.env.NOTION_TOKEN;
    if (!notionToken) {
      console.error('\n❌ Erreur : NOTION_TOKEN n\'est pas défini dans .env');
      console.error('Instructions :');
      console.error('1. Copiez .env.example vers .env');
      console.error('2. Ajoutez votre NOTION_TOKEN');
      process.exit(1);
    }

    // Exécuter analyse
    const results = await analyzeSEO();

    // Sauvegarder résultats pour le développement
    const suggestionsJSON = JSON.stringify(results.suggestions, null, 2);
    writeFileSync(
      path.join(__dirname, '../.seo-suggestions.json'),
      suggestionsJSON,
      'utf8'
    );

    // Afficher suggestions
    console.log('\n' + '='.repeat(60));
    console.log('📋 SUGGESTIONS PRIORITAIRES');
    console.log('='.repeat(60));

    results.suggestions
      .filter((s) => s.priority === 'high' || s.priority === 'medium')
      .forEach((suggestion) => {
        console.log(`\n${'─'.repeat(60)}`);
        console.log(`📌 ${suggestion.title}`);
        console.log(`   Type : ${suggestion.type}`);
        console.log(`   Priorité : ${suggestion.priority}`);
        console.log(`   Trafic estimé : ${suggestion.estimatedTraffic.toLocaleString()} mensuel`);
        console.log(`   Conversion estimée : ${suggestion.estimatedConversion}%`);
        console.log(`\n   Description : ${suggestion.description}`);
      });

    console.log('\n' + '='.repeat(60));
    console.log('✅ Analyse terminée. Suggestions sauvegardées dans .seo-suggestions.json');
    console.log('='.repeat(60));

    // Retourner les suggestions pour utilisation dans le dev script
    return results;
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'analyse SEO:', error.message);
    process.exit(1);
  }
}

// Exécuter
runSEOAnalysis();
