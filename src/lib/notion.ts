/**
 * Notion API integration for KMC formations
 * Fetches formation data at build time from Notion databases
 */

import { Client } from '@notionhq/client';

// Configuration Notion
// Base : https://www.notion.so/Site-web-3649628038de800ea598fcfecff7f9a7
const FORMATION_DB_ID = 'Site-web-3649628038de800ea598fcfecff7f9a7'; // ID de base complet
const CLASSE_DB_ID = 'Site-web-3649628038de800ea598fcfecff7f9a7'; // À remplacer par le véritable ID

// Token API (à mettre dans .env)
const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });

// Types
export interface Formation {
    id: string;
    nom: string;
    domaines: string[]; // Fibre optique, Habilitations, Photovoltaïque
    classes: string[];
    fraisAdministratifs: number | null;
    resume: string;
    url?: string;
}

export interface Classe {
    id: string;
    nom: string;
    domaines: string[];
    relatedFormationIds: string[];
}

export interface Formation {
    id: string;
    nom: string;
    classes: string[];
    fraisAdministratifs: number | null;
    resume: string;
    url?: string;
}

export interface Classe {
    id: string;
    nom: string;
    relatedFormationIds: string[];
}

// Helper: Convert Notion rich_text to string
function richTextToString(prop: any): string {
    if (!prop || !prop.rich_text || !prop.rich_text.length) return '';
    return prop.rich_text.map((t: any) => t.plain_text || '').join(' ');
}

// Helper: Convert Notion title[] to string
function titleToString(prop: any): string {
    if (!prop || !prop.title || !prop.title.length) return '';
    return prop.title.map((t: any) => t.plain_text || '').join(' ');
}

// Helper: Convert Notion multi-select to string array
function multiSelectToString(prop: any): string[] {
    if (!prop || !prop.multi_select || !prop.multi_select.length) return [];
    return prop.multi_select.map((s: any) => s.name || '');
}

// Helper: Convert Notion relation to ID array
function relationToIds(prop: any): string[] {
    if (!prop || !prop.relation || !prop.relation.length) return [];
    return prop.relation.map((r: any) => r.id || r);
}

// Helper: Extract number property safely
function numberSafe(prop: any): number | null {
    if (!prop || prop.number === null) return null;
    return Number(prop.number);
}

/**
 * Récupère les formations depuis Notion
 * Trie par domaine : Fibre optique → Habilitations → Photovoltaïque
 */
export async function getFormations(): Promise<Formation[]> {
    try {
        // Vérifier d'abord si la base existe avec une requête test
        await notion.databases.query({ database_id: FORMATION_DB_ID });
    } catch (error) {
        console.warn('Notion API non disponible (configurez NOTION_TOKEN dans .env)');
        console.warn('Erreur:', error);
        return [];
    }

    const response = await notion.databases.query({
        database_id: FORMATION_DB_ID,
        // Trier par domaine, puis par nom
        sort: { property: 'Nom', direction: 'ascending' },
        page_size: 100,
    });

    const formationsRaw = response.results || response;

    return formationsRaw.map((page: any) => {
        const nom = titleToString(page.properties['Nom de la formation']?.title);
        if (!nom) return null;

        return {
            id: page.id,
            nom,
            // Domaine : extraire depuis un property "Domaine" ou catégorie
            domaines: multiSelectToString(page.properties['Domaine'] || page.properties['Catégorie']),
            classes: multiSelectToString(page.properties['Classes']),
            fraisAdministratifs: numberSafe(page.properties['Coût des frais administratifs']),
            resume: richTextToString(page.properties['Resumé de la formation']),
            url: page.url,
        };
    }).filter(Boolean) as Formation[];
}

/**
 * Récupère les classes (types de formations) depuis Notion
 */
export async function getClasses(): Promise<Classe[]> {
    try {
        await notion.databases.query({ database_id: CLASSE_DB_ID });
    } catch (error) {
        console.warn('Notion API : classe DB non trouvée');
        return [];
    }

    const response = await notion.databases.query({
        database_id: CLASSE_DB_ID,
        page_size: 100,
    });

    return (response.results || response).map((page: any) => ({
        id: page.id,
        nom: titleToString(page.properties['Nom'], page.properties['Type']),
        domaines: multiSelectToString(page.properties['Domaine']),
        relatedFormationIds: relationToIds(page.properties['Formations associées']),
    }));
}

/**
 * Récupère les formations avec leurs classes, triées par domaine
 * Ordre des domaines : Fibre optique (1) → Habilitations (2) → Photovoltaïque (3)
 */
export async function getFormationsWithClasses(): Promise<Formation[]> {
    const [formations, classes] = await Promise.all([getFormations(), getClasses()]);

    // Créer un map classe par ID
    const classeMap = new Map(classes.map((c: Classe) => [c.id || c.nom.toLowerCase(), c.nom]));

    return formations.map((f: Formation) => ({
        ...f,
        // Remplacer les IDs des classes par leurs noms
        classes: f.classes.map((id: string) => {
            // Essayer de trouver la classe par ID ou nom
            const classeNom = classeMap.get(id);
            return classeNom || id;
        }),
    }));
}

/**
 * Filtre les formations par domaine (optionnel)
 */
export function filterByDomain(domaines: string[]): Formation[] {
    if (!domaines.length) return [];

    const formations = getFormations();
    return formations.filter((f) =>
        f.domaines.some((d: string) => domaines.includes(d.toLowerCase()))
    );
}