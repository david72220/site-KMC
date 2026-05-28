export interface Operator {
  id: string; name: string; color: string; tagline: string;
  description: string; skills: string[]; gear: string[];
}
export const operators: Operator[] = [
  { id: 'orange', name: 'Orange CI', color: '#F97316',
    tagline: "Leader des télécoms en Côte d'Ivoire",
    description: "Premier opérateur télécom de Côte d'Ivoire depuis 1996, Orange CI déploie le réseau FTTH dans Abidjan, Bouaké, San Pedro et Yamoussoukro.",
    skills: ['Raccordement PBO Orange', 'Soudure de fibres monomodes', 'Configuration ONT Livebox', 'Mesures OTDR et dépannage', 'Pose câbles façade/conduit/aérien'],
    gear: ['Boîtiers PBO Orange', 'ONT Livebox 5', 'OTDR Yokogawa', 'Connecteurs SC/APC', 'Fusionneuse Fujikura'] },
  { id: 'moov', name: 'Moov Africa', color: '#1e9ad7',
    tagline: "Filiale Maroc Telecom — FTTB immeuble & entreprises",
    description: "Moov Africa déploie le FTTB en immeuble et sur les campus d'entreprises, avec distribution verticale et raccordements multi-logements.",
    skills: ['Distribution verticale immeuble', 'Raccordement multi-logements', 'Configuration équipements', 'Lecture de plans', 'Gestion GTL'],
    gear: ['Boîtiers FTTB Moov', 'Terminaux optiques', 'OPM (mesureur de puissance)', 'Connecteurs SC/APC', 'Câbles armés'] },
  { id: 'mtn', name: "MTN Côte d'Ivoire", color: '#EAB308',
    tagline: 'Expansion FTTH résidentiel haut de gamme',
    description: 'MTN étend son réseau FTTH dans les zones résidentielles haut de gamme, avec un fort accent sur la certification et le SAV.',
    skills: ['Déploiement FTTH résidentiel', 'Configuration terminaux', 'Tests de certification', 'Maintenance préventive', 'SAV client'],
    gear: ['ONT MTN', 'Testeur fibre', 'Cliveur', 'Connecteurs LC/UPC', 'Réflectomètre OTDR'] },
];
