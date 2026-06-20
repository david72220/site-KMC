import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const FORMATION_DB_ID = import.meta.env.NOTION_FORMATION_DB_ID ?? process.env.NOTION_FORMATION_DB_ID ?? '1e49628038de8091a5d2c38db72951f4';

const NOTION_TOKEN = import.meta.env.NOTION_TOKEN ?? process.env.NOTION_TOKEN;
const notion = new Client({ auth: NOTION_TOKEN });

export interface Formation {
    id: string;
    nom: string;
    issue: string;           // "A L'ISSUE DE CETTE FORMATION"
    programme: string;       // "Programme de formation"
    prerequis: string;
    lieu: string;
    dureeFormation: string;
    dureeStagePratique: string;
    coutFormation: string;
    fraisAdministratifs: number | null;
    participants: number | null;
    tauxReussite: string;
    tauxAbandon: string;
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
        nom,
        issue: richText(prop(p, "A L'ISSUE DE CETTE FORMATION")),
        programme: richText(prop(p, 'Programme de formation')),
        prerequis: richText(prop(p, 'Prérequis')),
        lieu: richText(p['Lieu']),
        dureeFormation: richText(prop(p, 'Durée de la formation')),
        dureeStagePratique: richText(prop(p, 'Durée du stage en entreprise')),
        coutFormation: richText(prop(p, 'Coût de la formation')),
        fraisAdministratifs: number(prop(p, 'Coût des frais administratifs')),
        participants: number(p['Participants']),
        tauxReussite: richText(prop(p, 'Taux de réussite')),
        tauxAbandon: richText(prop(p, "Taux d'abandon")),
        url: page.url,
    };
}

export async function getFormations(): Promise<Formation[]> {
    try {
        // Essaie d'abord avec le filtre checkbox (si la propriété existe dans Notion)
        try {
            const response = await notion.databases.query({
                database_id: FORMATION_DB_ID,
                filter: {
                    property: 'A afficher sur le site web',
                    checkbox: { equals: true },
                },
                sorts: [{ property: 'Nom', direction: 'ascending' }],
                page_size: 100,
            });
            return response.results.map(mapPage).filter(Boolean) as Formation[];
        } catch {
            // La propriété checkbox n'existe pas encore dans Notion → tout afficher
            const response = await notion.databases.query({
                database_id: FORMATION_DB_ID,
                sorts: [{ property: 'Nom', direction: 'ascending' }],
                page_size: 100,
            });
            return response.results.map(mapPage).filter(Boolean) as Formation[];
        }
    } catch (error) {
        console.warn('Notion API indisponible:', error);
        return [];
    }
}

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
}

export async function getCours(): Promise<CoursNotion[]> {
  try {
    const response = await notion.databases.query({
      database_id: COURS_DB_ID,
      filter: {
        property: '▶ Lancer publication',
        checkbox: { equals: true },
      },
      sorts: [{ property: 'Nom', direction: 'ascending' }],
      page_size: 100,
    });
    return response.results
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
        } as CoursNotion;
      })
      .filter(Boolean) as CoursNotion[];
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
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    return n2m.toMarkdownString(mdBlocks).parent;
  } catch (error) {
    console.warn(`Notion content fetch failed for ${pageId}:`, error);
    return '';
  }
}
