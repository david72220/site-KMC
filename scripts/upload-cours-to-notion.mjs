/**
 * Upload des cours FR (Markdown) vers les pages Notion correspondantes.
 * Run: NOTION_TOKEN=xxx node scripts/upload-cours-to-notion.mjs
 *
 * Ce script est idempotent : il efface d'abord le contenu existant
 * de chaque page Notion avant d'uploader.
 */

import { Client } from '@notionhq/client';
import { markdownToBlocks } from '@tryfabric/martian';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COURS_DIR = path.join(__dirname, '../src/content/cours');
const NOTION_TOKEN = process.env.NOTION_TOKEN;

if (!NOTION_TOKEN) {
  console.error('NOTION_TOKEN manquant');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Mapping slug → Notion page ID (récupéré depuis la DB)
const SLUG_TO_PAGE_ID = {
  'avenir-fibre-optique-afrique':      '3849628038de8009bc2dd36d28295872',
  'securite-chantier-fibre':           '3849628038de8078a003dea9f29ab058',
  'equipements-actifs-reseau-fibre':   '3849628038de80069aa4c98b55cf82fa',
  'metiers-fibre-optique-cote-ivoire': '3849628038de8011b5e0eb0388ebc6dc',
  'ftth-ftto-fttb':                    '3849628038de8034b5a7d81d00dc03d2',
  'raccordement-fibre':                '3849628038de80948034ff2a931be5c1',
  'composants-installation-fibre':     '3849628038de80bf8d29d16d6f98cac9',
  'fibre-optique-vs-cuivre':           '3849628038de80d38c31fcc0db3ccacf',
  'histoire-fibre-optique':            '3849628038de80369b3de01211403c03',
  'quest-ce-que-la-fibre-optique':     '3849628038de81b98966ce96e99cf8a9',
};

async function getChildBlockIds(pageId) {
  const ids = [];
  let cursor;
  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    ids.push(...res.results.map((b) => b.id));
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return ids;
}

async function deleteAllBlocks(pageId) {
  const ids = await getChildBlockIds(pageId);
  for (const id of ids) {
    await notion.blocks.delete({ block_id: id });
  }
}

async function uploadBlocks(pageId, blocks) {
  // Notion limit : 100 blocs par requête
  for (let i = 0; i < blocks.length; i += 100) {
    await notion.blocks.children.append({
      block_id: pageId,
      children: blocks.slice(i, i + 100),
    });
  }
}

function preprocessMarkdown(md) {
  return md
    // Liens relatifs → absolus
    .replace(/\]\(\/([^)]+)\)/g, '](https://kmc.ci/$1)')
    // www. sans protocole → https://www.
    .replace(/\(www\./g, '(https://www.')
    // Liens markdown sans protocole (edge cases)
    .replace(/\]\((?!https?:\/\/)([a-z][a-z0-9+\-.]*\.)/gi, '](https://$1');
}

async function uploadCourse(slug) {
  const pageId = SLUG_TO_PAGE_ID[slug];
  if (!pageId) {
    console.warn(`⚠️  Pas de page Notion pour le slug : ${slug}`);
    return;
  }

  const filePath = path.join(COURS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Fichier MD introuvable : ${filePath}`);
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content: rawBody } = matter(raw);
  const mdBody = preprocessMarkdown(rawBody);

  console.log(`📤 Upload "${slug}" → ${pageId}...`);

  // 1. Supprimer l'ancien contenu
  await deleteAllBlocks(pageId);

  // 2. Convertir MD → blocs Notion
  let blocks;
  try {
    blocks = markdownToBlocks(mdBody);
  } catch (err) {
    console.error(`   Erreur conversion MD→blocs pour ${slug}:`, err.message);
    return;
  }

  // 3. Uploader
  await uploadBlocks(pageId, blocks);
  console.log(`   ✅ ${blocks.length} blocs uploadés`);
}

async function main() {
  const slugs = Object.keys(SLUG_TO_PAGE_ID);
  for (const slug of slugs) {
    try {
      await uploadCourse(slug);
      // Pause légère pour éviter le rate limit Notion
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error(`❌ Erreur pour ${slug}:`, err.message);
    }
  }
  console.log('\nTerminé.');
}

main();
