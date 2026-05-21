/**
 * Notion Webhook Handler
 * Reçoit les modifications SEO et les enregistre dans Notion
 * Utilisé par GitHub Actions workflows
 */

const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');
const body-parser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuration
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PORT = process.env.PORT || 3000;

// Database ID pour les modifications
const MODIFICATIONS_DB = '3669628038de808f8046f97af7b0e4db';

// Route pour recevoir les webhook
app.post('/webhook/seo', async (req, res) => {
  try {
    const { action, data } = req.body;

    console.log('📡 Webhook reçu - Action:', action);

    if (action === 'analysis_complete') {
      // Enregistrer les résultats d'analyse
      await saveAnalysisResults(data);
    } else if (action === 'suggestion_approved') {
      // Marquer une suggestion comme approuvée
      await approveSuggestion(data);
    } else if (action === 'deploy_request') {
      // Demande de déploiement
      await requestDeployment(data);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

// Sauvegarder résultats d'analyse
async function saveAnalysisResults(data) {
  const page = await notion.pages.create({
    parent: { database_id: MODIFICATIONS_DB },
    properties: {
      'Date de l\'analyse': { date: { start: new Date() } },
      'Analyse SEO': { rich_text: [{ text: { content: data.analysis || '' } }] },
      'Concurrents détectés': {
        rich_text: data.competitors?.map((c) => ({ text: { content: c } })) || [],
      },
      'Opportunités macroéconomiques': {
        rich_text: data.macro?.ci?.growthRate
          ? [{ text: { content: `Croissance PIB CI: ${data.macro.ci.growthRate}%` } }]
          : [],
      },
      'Suggestions': {
        relation: data.suggestions?.map((s) => ({ id: s.id })),
      },
      'Status': { select: { name: 'À traiter' } },
    },
  });

  console.log('✅ Résultats sauvegardés dans Notion (Page:', page.id, ')');
  return page;
}

// Approuver une suggestion
async function approveSuggestion(data) {
  const { suggestionId, approvalNotes } = data;

  // Mettre à jour la suggestion dans Notion
  const page = await notion.pages.update({
    page_id: suggestionId,
    properties: {
      'Status': { select: { name: 'Approuvée' } },
      'Notes d\'approbation': {
        rich_text: approvalNotes ? [{ text: { content: approvalNotes } }] : [],
      },
    },
  });

  console.log('✅ Suggestion approuvée (Page:', page.id, ')');
  return page;
}

// Demander un déploiement
async function requestDeployment(data) {
  const { suggestionId, deployReason } = data;

  // Créer une entrée dans le workflow de déploiement
  const entry = await notion.pages.create({
    parent: { database_id: '3669628038de800ea598fcfecff7f9a7' }, // À remplacer
    properties: {
      'Suggestion': { relation: [{ id: suggestionId }] },
      'Raison du déploiement': { rich_text: [{ text: { content: deployReason || '' } }] },
      'Status': { select: { name: 'En attente de validation' } },
      'Date de demande': { date: { start: new Date() } },
    },
  });

  console.log('🚀 Demande de déploiement créée (Page:', entry.id, ')');
  return entry;
}

// Lancer le serveur webhook
// Pour l'instant, c'est une version sans serveur
// Pour l'utiliser, déployer via Vercel ou Railway

console.log('='.repeat(60));
console.log('🔌 NOTION WEBHOOK CONFIGURATION');
console.log('='.repeat(60));
console.log('Database ID:', MODIFICATIONS_DB);
console.log('');
console.log('Pour utiliser ce webhook :');
console.log('1. Déployer via npm run webhook:deploy');
console.log('2. Configurer le webhook dans votre workflow GitHub');
console.log('');
console.log('Alternativement : utiliser les scripts Node.js directs');
