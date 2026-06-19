---
title: "Les équipements actifs d'un réseau fibre FTTH"
pubDate: 2026-06-19
author: "Équipe KMC"
category: "Fibre optique"
niveau: "Débutant"
duree: "35 min"
tags: [OLT, ONU, ONT, routeur, GPON, équipements actifs, débutant]
heroImage: "/images/cours/hero-equipements-actifs.svg"
description: "Découvrez les équipements actifs d'un réseau fibre FTTH : l'OLT chez l'opérateur, l'ONT chez l'abonné, la box et les routeurs — sans jargon inutile."
---

## Introduction

Quand on parle de fibre optique, on pense souvent au câble lui-même — ce fil de verre qui transporte la lumière à travers les rues, les immeubles et les sous-sols. Mais la fibre seule ne suffit pas. Pour que vous puissiez regarder une vidéo sur YouTube ou passer un appel depuis votre domicile, il faut des équipements qui convertissent cette lumière en données utilisables par vos appareils, qui acheminent ces données jusqu'au bon destinataire, et qui gèrent des milliers de connexions simultanément.

Ces équipements se divisent en deux grandes familles : les **équipements passifs** (le câble, les connecteurs, les boîtiers de jonction) et les **équipements actifs** (tout ce qui a besoin d'être branché sur le courant électrique pour fonctionner). Dans ce cours, nous allons nous concentrer sur les équipements actifs, car ce sont eux que vous croiserez lors des mises en service et des interventions chez les abonnés.

À la fin de ce cours, vous saurez :
- Distinguer un équipement actif d'un équipement passif
- Identifier un OLT, son rôle et son emplacement dans le réseau
- Comprendre ce que fait un splitter optique (équipement passif clé)
- Reconnaître un ONT/ONU et lire ses voyants
- Savoir ce que fait une box et comment la configurer en mise en service
- Comprendre le protocole GPON qui fait fonctionner tout le réseau FTTH

---

## 1. Équipements actifs vs équipements passifs

### Comprendre la distinction fondamentale

Avant d'entrer dans le détail des appareils, il est essentiel de maîtriser cette distinction que vous entendrez constamment sur le chantier et en formation.

Un **équipement passif** est un composant qui ne nécessite aucune alimentation électrique pour fonctionner. Il fait son travail uniquement grâce aux propriétés physiques des matériaux qui le composent. Dans un réseau fibre, les équipements passifs sont : les câbles eux-mêmes, les connecteurs optiques (SC/APC, LC), les manchons de protection d'épissure, les boîtiers de jonction (PBO, PBD), les tiroirs optiques, et surtout les **splitters** (coupleurs optiques).

Un **équipement actif** est un composant qui a besoin d'électricité pour fonctionner. Il traite le signal, l'amplifie, le convertit, ou prend des décisions sur l'acheminement des données. Dans un réseau FTTH, les équipements actifs sont : l'OLT chez l'opérateur, l'ONT ou l'ONU chez l'abonné, et la box/routeur qui distribue le WiFi dans le logement.

### Pourquoi cette distinction est importante sur le chantier

Cette distinction n'est pas qu'académique — elle a des conséquences pratiques directes :

**En cas de panne**, si l'abonné n'a plus de connexion, la première question à poser est : est-ce que la panne vient d'un équipement actif ou d'un équipement passif ? Si l'ONT est éteint ou ne démarre pas, c'est une panne active (alimentation, défaut matériel). Si le signal optique est absent alors que l'ONT est allumé, on suspectera une rupture de fibre ou un connecteur mal positionné — côté passif.

**Sur le plan de la sécurité**, un équipement actif peut envoyer du signal laser dans la fibre. Avant de toucher un connecteur côté fibre, il faut toujours vérifier que l'OLT est bien configuré pour ne pas envoyer de signal sur ce port, ou utiliser des capuchons de protection. Nous reviendrons sur ce point dans le cours sur la sécurité.

**En termes de coûts**, les équipements passifs sont généralement moins chers, nécessitent peu ou pas de maintenance, et ont une durée de vie beaucoup plus longue (20 à 40 ans pour un câble en bonne condition). Les équipements actifs ont une durée de vie de 5 à 10 ans et nécessitent une alimentation permanente, une maintenance régulière et un remplacement périodique.

---

## 2. L'OLT (Optical Line Terminal)

### C'est quoi, et où le trouve-t-on ?

L'OLT, pour **Optical Line Terminal** (Terminal de Ligne Optique en français), est le cerveau du réseau FTTH côté opérateur. C'est lui qui gère toutes les connexions des abonnés, qui distribue la bande passante, et qui fait le lien entre le réseau Internet mondial et les logements des abonnés.

L'OLT se trouve dans le **NRO** — le Nœud de Raccordement Optique. En Côte d'Ivoire, les NRO d'Orange sont par exemple situés dans des locaux techniques en centre-ville ou dans des baies montées sur des emplacements loués. En France ou en Europe, les NRO sont souvent installés dans des armoires de rue, mais en Afrique, la topologie varie selon les villes.

Concrètement, un NRO ressemble à une salle serveur compacte : des baies métalliques contenant des équipements électroniques, une alimentation électrique sécurisée (parfois un groupe électrogène de secours), et des dizaines voire des centaines de câbles fibre qui en partent dans toutes les directions.

### À quoi ressemble un OLT ?

Un OLT ressemble à un équipement de type rack serveur. Il se monte dans un rack 19 pouces standard et occupe typiquement entre 2 et 7U (unités rack). À l'avant, on trouve des **cartes de ligne** équipées de ports SFP (Small Form-factor Pluggable) ou SFP+, dans lesquels on insère des modules laser-récepteurs pour connecter les fibres.

Chaque port SFP d'une carte de ligne de l'OLT peut desservir un arbre PON entier — c'est-à-dire jusqu'à 32, 64 ou même 128 abonnés, selon le ratio de partage choisi par l'opérateur et la technologie utilisée (GPON, XGS-PON).

### Les marques courantes

Sur le marché africain et mondial, les principaux fabricants d'OLT sont :

- **Nokia (ex-Alcatel-Lucent)** — équipements haut de gamme très présents en Europe et en Afrique francophone, notamment le Nokia 7360 ISAM FX.
- **Huawei** — très répandu en Afrique subsaharienne, notamment le SmartAX MA5800, connu pour sa fiabilité et ses nombreuses cartes de ligne disponibles.
- **ZTE** — concurrent direct de Huawei, présent chez de nombreux opérateurs africains avec des prix légèrement inférieurs. Série ZXA10 C600/C650.
- **Calix** — plus présent sur le marché nord-américain, notamment auprès des opérateurs régionaux.
- **Fiberhome** — fabricant chinois en croissance, présent en Afrique de l'Ouest.

### La capacité typique d'un OLT

Un OLT moderne peut gérer des milliers d'abonnés dans une même baie. Par exemple, le Huawei MA5800-X17 peut accueillir jusqu'à 16 cartes de ligne, chaque carte gérant 8 ports GPON, et chaque port GPON pouvant servir jusqu'à 128 abonnés. On arrive ainsi à **16 × 8 × 128 = 16 384 abonnés** potentiels par OLT. En pratique, les opérateurs limitent le ratio à 1:32 ou 1:64 pour maintenir une qualité de service satisfaisante.

![Réseau OLT-ONU](/images/cours/08-reseau-olt-onu.svg)
*Figure 1 — Architecture simplifiée d'un réseau GPON : l'OLT au NRO alimente plusieurs splitters qui desservent chacun plusieurs ONT chez les abonnés.*

---

## 3. Le Splitter optique (équipement passif)

### Pourquoi le splitter est au cœur du réseau FTTH

Même si ce cours est dédié aux équipements actifs, il est impossible de comprendre l'architecture FTTH sans parler du splitter. C'est l'équipement passif le plus important du réseau, et vous en installerez des dizaines sur votre carrière.

Le **splitter optique** (aussi appelé coupleur optique ou diviseur de signal) est un petit boîtier — parfois guère plus grand qu'une gomme — qui prend un signal optique en entrée et le divise en plusieurs signaux identiques en sortie, **sans aucune alimentation électrique**. Il fonctionne grâce à des propriétés physiques du verre et à la technique de couplage de modes guidés.

### Les ratios de partage

Un splitter est caractérisé par son ratio d'entrée/sortie :

| Ratio | Signification | Utilisation typique |
|-------|--------------|---------------------|
| 1:2 | 1 fibre entrée, 2 fibres sortie | Distribution secondaire fine |
| 1:4 | 1 fibre entrée, 4 fibres sortie | PBO petit immeuble |
| 1:8 | 1 fibre entrée, 8 fibres sortie | PBO résidentiel |
| 1:16 | 1 fibre entrée, 16 fibres sortie | SRO ou PBO dense |
| 1:32 | 1 fibre entrée, 32 fibres sortie | SRO classique |
| 1:64 | 1 fibre entrée, 64 fibres sortie | SRO grande capacité |

### Les pertes d'insertion : une notion fondamentale

Chaque fois que le signal est divisé, il perd de l'intensité. Cette perte suit une loi logarithmique : **chaque doublement du nombre de sorties coûte environ 3,5 dB**. Voici les pertes typiques :

| Ratio | Perte d'insertion typique |
|-------|--------------------------|
| 1:2 | ~3,5 dB |
| 1:4 | ~7,0 dB |
| 1:8 | ~10,5 dB |
| 1:16 | ~13,5 dB |
| 1:32 | ~17,0 dB |
| 1:64 | ~20,5 dB |

C'est pourquoi les splitters ne peuvent pas être multipliés à l'infini dans un réseau : si on additionne les pertes du câble, des connecteurs et du splitter, on finit par arriver en dessous du **seuil de sensibilité de l'ONT** (typiquement -28 à -30 dBm pour le GPON), et la connexion est impossible.

### Où trouve-t-on les splitters ?

Dans une architecture FTTH classique, les splitters sont placés aux points de regroupement du réseau :
- Au **SRO** (Sous-Répartiteur Optique) : splitters 1:32 ou 1:16 regroupant les signaux de plusieurs rues ou quartiers
- Au **PBO** (Point de Branchement Optique) : splitters 1:8 ou 1:4 desservant un immeuble ou un groupe de maisons individuelles

---

## 4. L'ONT/ONU (Optical Network Unit / Terminal)

### La boîte chez l'abonné

Si l'OLT est le cerveau côté opérateur, l'**ONT** (Optical Network Terminal) ou **ONU** (Optical Network Unit) est son correspondant côté abonné. Ces deux termes désignent pratiquement le même équipement — l'ITU utilise le terme ONT pour un équipement installé chez un abonné résidentiel unique, et ONU pour des équipements desservant plusieurs abonnés (type FTTB immeuble). Dans le langage courant, les techniciens utilisent souvent les deux termes de façon interchangeable.

L'ONT joue un rôle de **convertisseur** : il reçoit un signal lumineux (optique) depuis la fibre, le transforme en signal électrique numérique, et le transmet à la box ou au routeur via un câble Ethernet RJ45.

### Exemples de modèles courants

Voici les ONT que vous rencontrerez le plus souvent sur le terrain en Afrique de l'Ouest :

**ZTE F601 / F660 / F680** — très répandus chez Orange CI et MTN. Le F601 est une version d'entrée de gamme avec 1 port Ethernet, très compact. Le F660 et le F680 offrent 4 ports Ethernet + ports téléphonie + WiFi intégré (versions combo).

**Huawei HG8245 / HG8310 / HG8546M** — présents chez de nombreux opérateurs. Le HG8245 est un modèle résidentiel très courant avec 4 ports Ethernet, 2 ports téléphonie et WiFi 802.11n. Le HG8546M est une version plus récente avec WiFi ac.

**Nokia G-140W-H** — haut de gamme, présent dans les déploiements récents d'opérateurs premium. Offre WiFi 6 (802.11ax), 2,5 Gbit/s Ethernet, et une gestion avancée.

### Lire les voyants de statut : une compétence essentielle

Sur le terrain, vous diagnostiquerez la grande majorité des pannes abonné en lisant les voyants de l'ONT. Voici les voyants les plus importants :

| Voyant | Couleur/État | Signification |
|--------|-------------|---------------|
| **PWR / POWER** | Vert fixe | L'ONT est alimenté en électricité |
| **PON / OPTICAL** | Vert fixe | La fibre est connectée et le signal optique est reçu |
| **PON / OPTICAL** | Rouge fixe | Pas de signal optique (LOS — Loss of Signal) |
| **LOS** | Rouge allumé | Perte du signal optique — vérifier le connecteur fibre |
| **INTERNET / WAN** | Vert fixe | Connexion Internet active |
| **INTERNET / WAN** | Orange clignotant | Données en transit |
| **LAN 1-4** | Vert fixe ou clignotant | Équipement connecté sur ce port |
| **TEL 1-2** | Vert | Service téléphonie activé |

**Procédure de diagnostic rapide** lors d'une intervention :
1. Le voyant **PWR** est-il allumé ? → Non : problème d'alimentation (vérifier la prise, l'adaptateur secteur)
2. Le voyant **PON** est-il vert fixe ? → Non : problème optique (vérifier le connecteur SC/APC à l'arrière de l'ONT, chercher un LOS)
3. Le voyant **INTERNET** est-il actif ? → Non : l'ONT reçoit le signal mais n'obtient pas de connexion (problème de provisioning sur l'OLT, VLAN, mot de passe PPPoE)

---

## 5. La box et le routeur abonné

### Le rôle de la box dans le réseau domestique

Une fois que l'ONT a converti le signal optique en signal électrique, il faut distribuer cette connexion dans tout le logement. C'est le rôle de la **box** (aussi appelée routeur résidentiel ou CPE — Customer Premises Equipment).

La box remplit plusieurs fonctions :
- **Routeur** : elle attribue des adresses IP à tous vos appareils via le protocole DHCP et gère le trafic entre votre réseau domestique et Internet (NAT)
- **Point d'accès WiFi** : elle diffuse le signal sans fil sur les bandes 2,4 GHz (portée plus grande, débit moindre) et 5 GHz (portée plus courte, débit plus élevé)
- **Switch Ethernet** : elle propose généralement 4 ports RJ45 pour connecter des appareils en filaire (TV, PC de bureau, console de jeux)
- **Décodeur TV** : dans certaines offres triple play, la box intègre également les fonctionnalités décodeur IPTV

### Différence entre routeur, switch et point d'accès

Il est important de ne pas confondre ces trois équipements que vous rencontrerez fréquemment :

**Le routeur** fait la jonction entre deux réseaux différents : votre réseau domestique (192.168.x.x) et Internet. Il comprend les adresses IP, choisit le meilleur chemin pour les paquets de données, et protège votre réseau privé de l'extérieur via le NAT (Network Address Translation).

**Le switch** est un équipement de niveau 2 (Ethernet) qui connecte plusieurs appareils entre eux dans le même réseau local. Il n'a pas d'adresse IP publique, ne fait pas de routage, et ne protège pas contre l'extérieur. Les 4 ports LAN de votre box sont techniquement un switch intégré.

**Le point d'accès WiFi** (ou AP — Access Point) est un équipement qui diffuse un réseau sans fil et permet aux appareils WiFi de rejoindre le réseau local. Dans une box classique, le WiFi est intégré. Dans un grand bâtiment ou une entreprise, on peut ajouter des AP séparés pour couvrir une plus grande surface.

### Ce que le technicien doit vérifier en mise en service

Lors d'une mise en service fibre chez un abonné, votre travail ne s'arrête pas à l'installation de l'ONT. Il faut vérifier plusieurs points sur la box :

1. **Connexion physique ONT → Box** : câble Ethernet RJ45 correctement branché entre le port WAN de la box et le port LAN1 de l'ONT
2. **Allumage de la box** : attendre le temps de démarrage complet (2 à 3 minutes en général) avant de conclure à un problème
3. **Accès à l'interface d'administration** : se connecter en entrant `192.168.1.1` ou `192.168.0.1` dans un navigateur (adresses par défaut les plus courantes)
4. **Vérification de la connexion WAN** : dans l'interface admin, vérifier que la box a bien obtenu une adresse IP publique ou PPPoE
5. **Test de débit** : effectuer un test sur fast.com ou speedtest.net pour confirmer que le débit est conforme à l'offre souscrite
6. **Configuration du WiFi** : vérifier le nom du réseau (SSID) et le mot de passe, les changer si demandé par l'abonné
7. **Test sur chaque port Ethernet** : connecter un ordinateur sur chaque port LAN pour vérifier qu'ils fonctionnent tous

---

## 6. Comment tout fonctionne ensemble : le protocole GPON

### GPON — Gigabit Passive Optical Network

Le **GPON** (Gigabit Passive Optical Network) est le protocole le plus utilisé dans les déploiements FTTH résidentiels dans le monde, et c'est celui que vous rencontrerez dans la grande majorité de vos interventions en Côte d'Ivoire.

Pour comprendre le GPON, il faut d'abord comprendre le problème qu'il résout : comment faire communiquer des centaines d'abonnés sur une seule fibre partagée, sans qu'ils s'interfèrent les uns les autres ?

### Le principe du partage asymétrique

Le GPON utilise deux longueurs d'onde différentes dans la même fibre pour les deux sens de communication :
- **1490 nm** pour le flux **descendant** (downstream) : données qui vont de l'OLT vers les abonnés
- **1310 nm** pour le flux **montant** (upstream) : données qui vont des abonnés vers l'OLT

Cette technique s'appelle le **WDM** (Wavelength Division Multiplexing) — multiplexage par division de longueur d'onde. C'est grâce à cette astuce que les deux sens de communication peuvent coexister sur la même fibre sans se mélanger, exactement comme deux voies de circulation sur une route à double sens.

### Les débits du GPON

Le GPON offre les débits suivants partagés entre tous les abonnés d'un même port PON :
- **Downstream : 2,488 Gbit/s** (environ 2,5 Gbit/s)
- **Upstream : 1,244 Gbit/s** (environ 1,2 Gbit/s)

C'est de là que vient l'asymétrie des offres fibre : le débit descendant est plus élevé que le débit montant, car la grande majorité des usages (streaming, téléchargement, navigation) consomment bien plus de débit dans le sens descendant.

Ces débits sont **partagés** entre tous les abonnés d'un port PON. Si un opérateur raccorde 32 abonnés sur un port GPON, chacun peut théoriquement obtenir jusqu'à 2,5 / 32 ≈ 78 Mbit/s en descente au maximum. En pratique, la bande passante est allouée dynamiquement grâce au mécanisme **DBA** (Dynamic Bandwidth Allocation) : quand un abonné ne consomme pas, sa bande passante inutilisée est redistribuée aux autres.

### Une analogie pour comprendre le GPON

Imaginez un bus scolaire qui doit transporter des enfants de plusieurs maisons vers l'école le matin, et les ramener chez eux le soir.

- **L'OLT** est le conducteur et le dispatcher du bus — il décide qui monte, à quel arrêt, et combien de place est disponible.
- **Le splitter** est le carrefour où la route principale se divise en plusieurs rues.
- **Chaque abonné** est une maison avec un arrêt de bus.
- **L'ONT** est la porte d'entrée de la maison — c'est là que l'enfant monte dans le bus (données montantes) ou descend du bus (données descendantes).

Dans ce bus (le réseau GPON), tous les passagers partagent les mêmes sièges. Le conducteur (l'OLT) coordonne tout grâce au protocole TDMA (Time Division Multiple Access) : chaque abonné se voit attribuer des **fenêtres temporelles** précises pendant lesquelles il peut émettre des données vers l'OLT. Les données descendantes, elles, sont envoyées à tous en même temps, et chaque ONT filtre uniquement les paquets qui lui sont destinés.

### XGS-PON : la nouvelle génération

Le GPON commence à laisser place au **XGS-PON** (10 Gigabit Symmetric PON) dans les déploiements les plus récents :
- **Downstream : 9,953 Gbit/s** (environ 10 Gbit/s)
- **Upstream : 9,953 Gbit/s** (10 Gbit/s — symétrique)

Le XGS-PON est compatible avec les mêmes fibres et les mêmes splitters que le GPON — seuls les équipements actifs (OLT et ONT) doivent être remplacés. Cela simplifie les mises à niveau futures du réseau.

---

## 7. Quiz

Testez vos connaissances avec ces 4 questions.

**Question 1 — Lequel de ces équipements est passif (ne nécessite pas d'alimentation électrique) ?**

- A) L'OLT
- B) L'ONT
- C) Le splitter 1:32
- D) La box WiFi

*Réponse : C) Le splitter. Il divise le signal optique grâce aux propriétés physiques du verre, sans aucune électricité.*

---

**Question 2 — Un voyant LOS rouge fixe sur un ONT signifie :**

- A) L'ONT n'est pas branché sur le secteur
- B) Le signal optique est absent — il faut vérifier la fibre et les connecteurs
- C) La connexion Internet est instable
- D) La box WiFi ne répond pas

*Réponse : B) LOS signifie "Loss of Signal" — absence de signal optique. La première chose à vérifier est le connecteur SC/APC à l'arrière de l'ONT.*

---

**Question 3 — Dans un réseau GPON, quelle longueur d'onde est utilisée pour les données descendantes (de l'OLT vers l'abonné) ?**

- A) 1310 nm
- B) 850 nm
- C) 1490 nm
- D) 1625 nm

*Réponse : C) 1490 nm pour le downstream, 1310 nm pour l'upstream. Le 850 nm est utilisé pour les fibres multimodes courte distance.*

---

**Question 4 — Un OLT Huawei MA5800 avec 8 cartes de ligne, chacune ayant 8 ports GPON avec un ratio de partage 1:32, peut desservir au maximum combien d'abonnés ?**

- A) 256 abonnés
- B) 2 048 abonnés
- C) 16 384 abonnés
- D) 64 abonnés

*Réponse : B) 2 048 abonnés : 8 cartes × 8 ports × 32 abonnés par port = 2 048. Pour les 16 384, il faudrait 16 cartes et 128 abonnés par port — une configuration maximale.*

---

## 8. Conclusion

Dans ce cours, vous avez découvert les principaux équipements actifs d'un réseau FTTH et leur rôle dans la chaîne de transmission :

- Le **splitter** divise le signal optique sans électricité — c'est l'équipement passif central de toute architecture FTTH.
- L'**OLT** au NRO est le cerveau du réseau opérateur : il gère des milliers d'abonnés, alloue la bande passante et fait le lien avec Internet.
- L'**ONT/ONU** chez l'abonné est le convertisseur qui transforme la lumière en signal électrique exploitable par une box.
- La **box** distribue la connexion en WiFi et Ethernet dans le logement et doit être vérifiée lors de chaque mise en service.
- Le protocole **GPON** coordonne tout ce réseau partagé grâce au multiplexage temporel et au WDM.

La maîtrise de ces équipements est fondamentale pour tout technicien fibre. Sur le terrain, savoir lire les voyants d'un ONT, diagnostiquer une panne OLT/ONT, et configurer une box en mise en service, c'est ce qui fait la différence entre un technicien qui résout les problèmes rapidement et un technicien qui laisse l'abonné sans connexion.

Dans les prochains cours, nous aborderons les techniques de raccordement, les tests optiques (réflectométrie OTDR, mesures de puissance) et la lecture des plans réseau.
