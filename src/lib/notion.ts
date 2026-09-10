import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const FORMATION_DB_ID = import.meta.env.NOTION_FORMATION_DB_ID ?? process.env.NOTION_FORMATION_DB_ID ?? '1e49628038de8091a5d2c38db72951f4';

const NOTION_TOKEN = import.meta.env.NOTION_TOKEN ?? process.env.NOTION_TOKEN;
const notion = new Client({ auth: NOTION_TOKEN });

// ─── Snapshot de secours (filet anti-site-vide) ──────────────────────────────
// À chaque build réussi, les formations sont écrites dans src/data/formations-snapshot.json.
// Si Notion devient injoignable, le build suivant utilise ce snapshot au lieu
// de publier un site vide. Le fichier est commité → survit même à un repo neuf.
const SNAPSHOT_PATH = join(process.cwd(), 'src', 'data', 'formations-snapshot.json');

function loadFormationsSnapshot(): Formation[] {
    try {
        if (!existsSync(SNAPSHOT_PATH)) return [];
        const data = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf-8'));
        if (Array.isArray(data?.formations) && data.formations.length > 0) {
            return data.formations as Formation[];
        }
        return [];
    } catch {
        return [];
    }
}

export function saveFormationsSnapshot(formations: Formation[]): void {
    try {
        mkdirSync(join(process.cwd(), 'src', 'data'), { recursive: true });
        writeFileSync(
            SNAPSHOT_PATH,
            JSON.stringify(
                { updatedAt: new Date().toISOString(), count: formations.length, formations },
                null,
                2
            ) + '\n'
        );
        console.log(`[notion.ts] snapshot formations mis à jour (${formations.length} fiches)`);
    } catch (e) {
        console.warn('[notion.ts] impossible d\'écrire le snapshot formations:', e);
    }
}

export interface Formation {
    id: string;
    slug: string;
    nom: string;
    issue: string;
    programme: string;
    prerequis: string;
    lieu: string;
    dureeFormation: string;
    dureeStagePratique: string;
    coutFormation: string;
    prixFormation: string;
    theme: string;
    fraisAdministratifs: number | null;
    participants: string | null;
    tauxReussite: string;
    tauxAbandon: string;
    objectifsCompetences: string;
    publicCible: string;
    organisation: string;
    modalitesEvaluation: string;
    modalitesPratiques: string;
    versionDocument: string;
    url?: string;
}

function richText(prop: any): string {
    if (!prop?.rich_text?.length) return '';
    return prop.rich_text.map((t: any) => t.plain_text || '').join('');
}

function title(prop: any): string {
    if (!prop?.title?.length) return '';
    return prop.title.map((t: any) => t.plain_text || '').join('');
}

function number(prop: any): number | null {
    if (!prop || prop.number === null || prop.number === undefined) return null;
    return Number(prop.number);
}

/**
 * Exécute une requête Notion avec retry automatique sur rate-limit (429).
 * Notion autorise ~3 req/s par token : sans retry, une rafale de requêtes
 * (ex: build parallèle des pages de cours) fait échouer TOUTES les suivantes
 * et les formations disparaissent du site.
 */
async function notionRequest<T>(fn: () => Promise<T>, maxAttempts = 5): Promise<T> {
    let lastError: any;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error: any) {
            lastError = error;
            if (error?.code !== 'rate_limited' && error?.status !== 429) throw error;
            if (attempt === maxAttempts) throw error;
            // Notion renvoie retry_after (secondes) ; sinon backoff exponentiel.
            const retryAfterSec = Number(error?.headers?.get?.('retry-after')) || 0;
            const delayMs = retryAfterSec > 0 ? (retryAfterSec + 1) * 1000 : Math.min(30_000, 1000 * 2 ** attempt);
            console.warn(`[notion.ts] rate limited (429), tentative ${attempt}/${maxAttempts}, retry dans ${Math.round(delayMs / 1000)}s`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }
    throw lastError;
}

function slugifyFormation(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Recherche insensible à la casse et aux variantes d'apostrophe (droite vs typographique).
function prop(p: Record<string, any>, name: string): any {
    const norm = (s: string) => s.toLowerCase().replace(/[‘’‚‛`]/g, "'");
    const target = norm(name);
    const key = Object.keys(p).find(k => norm(k) === target);
    return key ? p[key] : undefined;
}

function mapPage(page: any): Formation | null {
    const p = page.properties;
    const nom = title(p['Nom']);
    if (!nom) return null;
    return {
        id: page.id,
        slug: slugifyFormation(nom),
        nom,
        issue: richText(prop(p, "A L'ISSUE DE CETTE FORMATION")),
        programme: richText(prop(p, 'Programme de formation')),
        prerequis: richText(prop(p, 'Prérequis')),
        lieu: richText(p['Lieu']),
        dureeFormation: richText(prop(p, 'Durée de la formation')),
        dureeStagePratique: richText(prop(p, 'Durée du stage en entreprise')),
        coutFormation: richText(prop(p, 'Coût de la formation')),
        prixFormation: richText(prop(p, 'Prix de la formation')),
        theme: prop(p, 'Thème')?.select?.name || '',
        fraisAdministratifs: number(prop(p, 'Coût des frais administratifs')),
        participants: richText(p['Participants']) || null,
        tauxReussite: richText(prop(p, 'Taux de réussite')),
        tauxAbandon: richText(prop(p, "Taux d'abandon")),
        objectifsCompetences: richText(prop(p, 'Objectifs et Compétences Visées')),
        publicCible: richText(prop(p, 'Public Cible et Prérequis')),
        organisation: richText(prop(p, 'Organisation et Modalités Pédagogiques')),
        modalitesEvaluation: richText(prop(p, "Modalités d'Évaluation et de Suivi")),
        modalitesPratiques: richText(prop(p, 'Modalités Pratiques, Accessibilité')),
        versionDocument: richText(prop(p, 'Version du document')),
        url: page.url,
    };
}

export async function getFormations(): Promise<Formation[]> {
    try {
        // Essaie d'abord avec le filtre checkbox (si la propriété existe dans Notion)
        try {
            const response = await notionRequest(() =>
                notion.databases.query({
                    database_id: FORMATION_DB_ID,
                    filter: {
                        property: 'A afficher sur le site web',
                        checkbox: { equals: true },
                    },
                    sorts: [{ property: 'Nom', direction: 'ascending' }],
                    page_size: 100,
                })
            );
            const formations = response.results.map(mapPage).filter(Boolean) as Formation[];
            if (formations.length === 0) throw new Error('query OK mais 0 formation retournée');
            // Build réussi → met à jour le snapshot de secours (commité dans le repo).
            saveFormationsSnapshot(formations);
            return formations;
        } catch {
            // La propriété checkbox n'existe pas encore dans Notion → tout afficher
            const response = await notionRequest(() =>
                notion.databases.query({
                    database_id: FORMATION_DB_ID,
                    sorts: [{ property: 'Nom', direction: 'ascending' }],
                    page_size: 100,
                })
            );
            const formations = response.results.map(mapPage).filter(Boolean) as Formation[];
            if (formations.length === 0) throw new Error('query OK mais 0 formation retournée');
            // Build réussi → met à jour le snapshot de secours (commité dans le repo).
            saveFormationsSnapshot(formations);
            return formations;
        }
    } catch (error) {
        // Notion indisponible ou vide : ne JAMAIS publier un site sans formations.
        // Soit on utilise le dernier snapshot connu, soit on fait échouer le build
        // (Vercel garde alors l'ancien déploiement correct en ligne).
        console.warn('Notion API indisponible ou vide:', error);
        const snapshot = loadFormationsSnapshot();
        if (snapshot.length > 0) {
            console.warn(`[notion.ts] Utilisation du snapshot de secours (${snapshot.length} formations, mise à jour au dernier build réussi).`);
            return snapshot;
        }
        throw new Error(
            'AUCUNE formation disponible (Notion injoignable ET aucun snapshot). ' +
            'Build interrompu pour ne pas publier un site sans formations. ' +
            'Vérifiez NOTION_TOKEN / DB ID, ou restaurez src/data/formations-snapshot.json.'
        );
    }
}

// Fallback statique si Notion est indisponible au build (évite une fiche vide).
export const FALLBACK_FORMATION: Formation = {
  id: 'fallback-ftth-d2',
  slug: 'ftth-d2',
  nom: 'FTTH-D2',
  issue: "Réaliser un raccordement FTTH complet, souder des fibres optiques, effectuer des mesures de réflectométrie OTDR et diagnostiquer une coupure réseau en autonomie.",
  programme: "Soudure et épissure de fibres monomodes · Raccordement PBO / PTO · Mesures OTDR · Lecture de plans FTTH · Pose de câbles façade et conduit · Sécurité chantier télécom.",
  prerequis: "Niveau 3ᵉ, savoir lire et écrire",
  lieu: "Centre KMC — Angré, Cocody, Abidjan",
  dureeFormation: "3 semaines (105 h)",
  dureeStagePratique: "2 semaines",
  coutFormation: 'Sur devis',
  prixFormation: 'Sur devis',
  theme: 'Fibre optique',
  fraisAdministratifs: null,
  participants: '12',
  tauxReussite: "94 %",
  tauxAbandon: "4 %",
  objectifsCompetences: '',
  publicCible: '',
  organisation: '',
  modalitesEvaluation: '',
  modalitesPratiques: '',
  versionDocument: '',
};

export async function getFormationByName(nom: string): Promise<Formation> {
  const all = await getFormations();
  const match = all.find((f) => f.nom?.trim().toUpperCase() === nom.trim().toUpperCase());
  return match ?? all[0] ?? FALLBACK_FORMATION;
}

// ─── Cours gratuits ───────────────────────────────────────────────────────────

const COURS_DB_ID = import.meta.env.NOTION_COURS_DB_ID ?? process.env.NOTION_COURS_DB_ID ?? '3739628038de8063bf15fa861f76d028';
const n2m = new NotionToMarkdown({ notionClient: notion });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface CoursNotion {
  id: string;
  nom: string;
  slug: string;
  objectif: string;
  niveau: string;
  duree: string;
  categorie: string;
  tags: string[];
  imageHero: string;
  identifiant: number;
}

export async function getCours(): Promise<CoursNotion[]> {
  try {
    const response = await notionRequest(() =>
        notion.databases.query({
            database_id: COURS_DB_ID,
            filter: {
                property: '▶ Lancer publication',
                checkbox: { equals: true },
            },
            page_size: 100,
        })
    );
    const items = response.results
      .map((page: any) => {
        const p = page.properties;
        const nom = title(p['Nom']);
        if (!nom) return null;
        const rawSlug = richText(p['Slug']);
        const isValidSlug = /^[a-z0-9-]+$/.test(rawSlug);
        return {
          id: page.id,
          nom,
          slug: isValidSlug ? rawSlug : slugify(nom),
          objectif: isValidSlug ? '' : rawSlug,
          niveau: p['Niveau']?.select?.name || '',
          duree: richText(p['Durée estimée']),
          categorie: p['Catégorie']?.select?.name || '',
          tags: (p['Tags']?.multi_select || []).map((t: any) => t.name),
          imageHero: p['Image hero']?.url || '',
          identifiant: p['Identifiant']?.unique_id?.number ?? 9999,
        } as CoursNotion;
      })
      .filter(Boolean) as CoursNotion[];
    items.sort((a, b) => a.identifiant - b.identifiant);
    return items;
  } catch (error: any) {
    console.error('[notion.ts] getCours() FAILED:', error?.code, error?.message);
    console.error('[notion.ts] NOTION_TOKEN présent :', !!NOTION_TOKEN);
    console.error('[notion.ts] DB ID :', COURS_DB_ID);
    return [];
  }
}

export async function getAllCoursSlugs(): Promise<string[]> {
  const cours = await getCours();
  console.log(`[notion.ts] getAllCoursSlugs : ${cours.length} cours publiés`, cours.map(c => c.slug));
  return cours.map((c) => c.slug);
}

export async function getCoursContent(pageId: string): Promise<string> {
  try {
    const mdBlocks = await notionRequest(() => n2m.pageToMarkdown(pageId), 8);
    const md = n2m.toMarkdownString(mdBlocks).parent;
    // Reconvertit les URLs absolues kmc.ci → relatives (utilisé pour les assets internes)
    return md.replace(/https:\/\/kmc\.ci\//g, '/');
  } catch (error) {
    console.warn(`Notion content fetch failed for ${pageId}:`, error);
    return '';
  }
}
