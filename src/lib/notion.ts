import { Client } from '@notionhq/client';

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

function mapPage(page: any): Formation | null {
    const p = page.properties;
    const nom = title(p['Nom']);
    if (!nom) return null;
    return {
        id: page.id,
        nom,
        issue: richText(p["A L'ISSUE DE CETTE FORMATION"]),
        programme: richText(p['Programme de formation']),
        prerequis: richText(p['Prérequis']),
        lieu: richText(p['Lieu']),
        dureeFormation: richText(p['Durée de la formation']),
        dureeStagePratique: richText(p['Durée du stage en entreprise']),
        coutFormation: richText(p['Coût de la formation']),
        fraisAdministratifs: number(p['Coût des frais administratifs']),
        participants: number(p['Participants']),
        tauxReussite: richText(p['Taux de réussite']),
        tauxAbandon: richText(p["Taux d'abandon"]),
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
