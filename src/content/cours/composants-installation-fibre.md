---
title: "Les composants d'une installation fibre : le guide complet"
pubDate: 2026-06-19
author: "Équipe KMC"
category: "Fibre optique"
niveau: "Débutant"
duree: "35 min"
tags: [fibre optique, composants, câble, connecteur, épissure, débutant]
heroImage: "/images/cours/hero-composants-installation-fibre.svg"
description: "Apprenez à nommer et reconnaître tous les éléments physiques d'une installation fibre : câble optique, connecteurs, épissures, boîtiers et accessoires."
---

## Introduction

Imaginez que vous devez assembler un meuble IKEA. Avant de commencer, vous étalez toutes les pièces sur le sol et vérifiez la liste : planches, vis, charnières, cam-locks... Chaque pièce a un nom, une fonction précise, et une place définie dans le résultat final.

Une installation fibre optique, c'est pareil. Il existe des dizaines de composants différents — câbles, connecteurs, boîtiers, manchons, jarretières, ODF — et chacun a un rôle précis dans la chaîne qui va du central de l'opérateur jusqu'à votre box Internet.

Ce cours est votre "liste de pièces" : à la fin, vous saurez nommer, reconnaître et comprendre l'utilité de chaque composant d'une installation fibre optique réelle.

---

## 1. Vue d'ensemble d'une installation fibre

Avant d'entrer dans le détail de chaque composant, il faut comprendre l'architecture globale d'un réseau fibre FTTH (Fiber To The Home). Le signal voyage du serveur de l'opérateur jusqu'à votre box en passant par plusieurs étapes.

### Les nœuds du réseau, du plus grand au plus petit

**NRO — Nœud de Raccordement Optique**

C'est le point de départ du réseau de l'opérateur. Le **NRO** (appelé aussi CO pour Central Office en anglais) est un grand local technique — souvent un bâtiment de plusieurs centaines de mètres carrés — qui contient les équipements actifs de l'opérateur : les **OLT** (Optical Line Terminal), qui sont les gros équipements électroniques qui "parlent" à toutes les fibres du quartier.

Un NRO peut desservir plusieurs dizaines de milliers d'abonnés.

**SRO — Sous-Répartiteur Optique**

Le NRO ne peut pas envoyer une fibre individuelle jusqu'à chaque maison — ce serait trop long et trop coûteux. On installe donc des **SRO** à intervalles réguliers (typiquement tous les 1 à 3 km). Le SRO est une armoire technique placée dans la rue ou dans un local technique d'immeuble. Il reçoit une grosse fibre de transport depuis le NRO et la "divise" en dizaines de fibres individuelles vers les abonnés.

La division est réalisée par un composant passif appelé **coupleur optique** (ou splitter) : une fibre en entrée devient 4, 8, 16 ou 32 fibres en sortie, sans aucune alimentation électrique.

**PBO — Point de Branchement Optique**

Le **PBO** est encore plus proche de l'abonné — souvent dans la rue, à l'entrée d'un immeuble ou sur un poteau. C'est le dernier niveau de division avant l'abonné. Il peut avoir 4 à 16 ports de sortie.

**PTO — Prise Terminale Optique**

La **PTO** est la prise murale chez l'abonné, généralement dans l'entrée de l'appartement. C'est là que la fibre de l'opérateur se connecte à la **jarretière** qui va jusqu'à la box Internet.

**ONT / Box Internet**

L'**ONT** (Optical Network Terminal) — souvent intégré dans la box Internet — est l'équipement chez l'abonné qui convertit le signal optique en signal électrique utilisable par vos appareils (Wi-Fi, Ethernet).

### Résumé du chemin du signal

```
Serveur opérateur → NRO (OLT) → câble transport → SRO (splitter) 
→ câble distribution → PBO → câble abonné → PTO → jarretière → ONT/Box
```

Chacune de ces étapes utilise des composants spécifiques que nous allons maintenant détailler.

---

## 2. Le câble optique

Le câble est l'élément le plus visible d'une installation fibre. Mais qu'y a-t-il vraiment à l'intérieur ?

### Structure d'un câble optique

Un câble optique est une succession de couches, comme un oignon :

**1. Le cœur (core)**
C'est la partie centrale où voyage la lumière. Il est fait de **verre de silice** d'une pureté extrême. Pour une fibre monomode (la plus utilisée en FTTH), le cœur a un diamètre de seulement **9 micromètres** — environ 10 fois moins qu'un cheveu humain.

**2. La gaine optique (cladding)**
Autour du cœur, une couche de verre avec un indice de réfraction légèrement différent. Cette différence d'indice crée le phénomène de **réflexion totale interne** qui confine la lumière dans le cœur. Le diamètre total cœur + gaine est de **125 micromètres** — c'est le standard mondial.

> **Pour bien retenir :** Le cœur (9 µm) et la gaine (125 µm total) forment ensemble la "fibre nue". Tout ce qui vient ensuite est là pour protéger mécaniquement cette fibre fragile.

**3. Le revêtement primaire (coating)**
Une fine couche de résine acrylique ou de résine UV qui protège la fibre des agressions mécaniques et chimiques. Diamètre total : **250 micromètres**. Cette couche est souvent colorée pour identifier la fibre dans un câble multi-fibres.

**4. La gaine secondaire (buffer)**
Une couche plastique plus épaisse, souvent en PVDF ou en nylon, qui renforce la protection. Selon les câbles, elle peut être "lâche" (loose buffer — la fibre flotte dans un gel optique) ou "serrée" (tight buffer — la fibre est collée à la gaine). Diamètre : **900 micromètres**.

**5. Les éléments de renfort**
Selon l'usage du câble, des fils d'aramide (Kevlar), des fils d'acier ou une âme en fibre de verre renforcent le câble contre la traction et l'écrasement.

**6. La gaine extérieure**
La protection finale, généralement en PE (polyéthylène) ou en PVC, résistante aux UV, à l'humidité et aux chocs mécaniques.

### Capacité : de 4 à 1000 fibres

Un câble peut contenir de **1 à plusieurs centaines de fibres** selon son usage :

| Usage | Nombre de fibres typique |
|-------|-------------------------|
| Câble abonné FTTH | 1 à 4 fibres |
| Câble immeuble | 12 à 48 fibres |
| Câble de distribution (SRO → PBO) | 24 à 144 fibres |
| Câble de transport (NRO → SRO) | 96 à 576 fibres |
| Câble sous-marin (intercontinental) | 4 à 16 paires (8 à 32 fibres) |

### Types de câbles selon l'environnement

**Câble aérien**
Posé sur des poteaux ou accroché à un câble porteur en acier (câble ADSS). Il doit résister au vent, aux variations de température extrêmes, aux UV et au poids éventuel de glace en zone froide. Souvent de couleur noire (résistance UV).

**Câble souterrain**
Enterré directement ou tiré dans des fourreaux PEHD (tube en polyéthylène haute densité). Il doit résister à l'humidité, à la pression du sol et aux rongeurs. Certains câbles souterrains sont armés d'une tresse métallique ou d'une armure acier pour protéger des dents des rongeurs et des coups de pioche.

**Câble sous-marin**
Le plus robuste : plusieurs couches d'armure acier, protection contre la pression de plusieurs kilomètres d'eau, résistance aux morsures de requins (documentées !), durée de vie prévue de 25 ans ou plus.

**Câble intérieur (riser/plenum)**
Pour les chemins de câbles dans les bâtiments. Gaine en matériaux à faible émission de fumée (LSOH) pour la sécurité incendie.

### Le code couleur des fibres

Dans un câble multi-fibres, comment identifier chaque fibre individuelle ? Par la couleur de son revêtement primaire. Il existe une norme internationale (IEC 60304) définissant 12 couleurs :

| Numéro | Couleur | Abréviation |
|--------|---------|-------------|
| 1 | Bleu | BL |
| 2 | Orange | OR |
| 3 | Vert | GN |
| 4 | Marron | BN |
| 5 | Ardoise / Gris | SL |
| 6 | Blanc | WH |
| 7 | Rouge | RD |
| 8 | Noir | BK |
| 9 | Jaune | YL |
| 10 | Violet | VT |
| 11 | Rose | RS |
| 12 | Aqua / Turquoise | AQ |

Pour les câbles de plus de 12 fibres, les fibres sont regroupées en **tubes** de 12 fibres chacun (tubes eux-mêmes identifiés par les 12 couleurs). Un câble de 144 fibres contient donc 12 tubes de 12 fibres chacun.

> **Pour bien retenir :** Sur le terrain, identifier une fibre, c'est toujours : numéro du tube (couleur du tube) + numéro de la fibre dans le tube (couleur de la fibre). Exemple : tube bleu (tube 1), fibre orange (fibre 2) = fibre numéro 14 d'un câble 144 fibres.

---

## 3. Les connecteurs

Un **connecteur** permet de raccorder deux fibres optiques de manière **démontable** — on peut les connecter et déconnecter autant de fois que nécessaire. C'est différent d'une épissure (voir section suivante) qui est permanente.

### Les types de connecteurs courants

![Types de connecteurs](/images/cours/04-connecteurs.svg)

**Connecteur SC (Subscriber Connector)**
Le plus répandu dans les réseaux FTTH et les datacenters. Se connecte par un système **push-pull** (on pousse pour connecter, on tire pour déconnecter). Corps carré de 9 mm, très fiable, simple d'utilisation.

*Usage typique : boîtiers FTTH, PTO, ODF*

**Connecteur LC (Lucent Connector)**
Format réduit — environ la moitié de la taille d'un SC. Utilise un système de **clip** comme un câble audio jack. Très courant dans les équipements actifs (switches, routeurs) à cause de sa taille compacte qui permet de loger plus de ports.

*Usage typique : équipements actifs, datacenters, SFP optiques*

**Connecteur ST (Straight Tip)**
Système de connexion à **baïonnette** (comme une ampoule : on enfonce et on tourne d'un quart de tour). Moins courant aujourd'hui, mais encore présent dans les anciens réseaux d'entreprise et les caméras IP industrielles.

*Usage typique : anciens réseaux, systèmes de surveillance*

**Connecteur FC (Ferrule Connector)**
Connexion par **vissage** — un filetage garantit une pression constante sur la jonction. Moins pratique pour les connexions fréquentes (vissage/dévissage lent) mais offre une excellente stabilité mécanique.

*Usage typique : laboratoires de mesure, équipements de test OTDR*

### Tableau récapitulatif des connecteurs

| Connecteur | Mécanisme | Couleur corps | Usage principal | Avantage |
|-----------|-----------|---------------|-----------------|---------|
| **SC** | Push-pull | Bleu (UPC) ou Vert (APC) | FTTH, ODF | Simple, économique |
| **LC** | Clip | Bleu (UPC) ou Vert (APC) | Équipements actifs | Compact (format SFP) |
| **ST** | Baïonnette | Beige | Anciens réseaux | Robuste |
| **FC** | Vissage | Beige | Labo, mesure | Très stable |
| **E2000** | Clip + volet | Vert (APC) | Réseaux opérateurs | Volet de protection intégré |

### Le polissage : APC vs UPC

Indépendamment du type de connecteur (SC, LC, etc.), les connecteurs existent en deux versions de polissage de l'extrémité de la fibre :

**UPC — Ultra Physical Contact**
L'extrémité de la fibre est polie de manière **plate** (angle 0°). La lumière arrive perpendiculairement à la surface. Le corps du connecteur est **bleu**.

Perte de retour typique : **-50 dB** (très peu de lumière réfléchie vers la source).

*Usage : équipements actifs, liens Ethernet, réseaux locaux*

**APC — Angled Physical Contact**
L'extrémité de la fibre est polie avec un **angle de 8°**. Cet angle dévie la lumière réfléchie hors de l'axe de propagation, réduisant encore plus les réflexions. Le corps du connecteur est **vert**.

Perte de retour typique : **-60 à -70 dB** (10 à 100 fois moins de réflexions que l'UPC).

*Usage : réseaux FTTH (standard Orange, MTN, Moov en Côte d'Ivoire), liaisons longue distance, CATV*

> **Règle d'or à retenir :** Sur un réseau FTTH opérateur (le type de réseau que vous installerez le plus souvent en Côte d'Ivoire), les connecteurs sont **TOUJOURS APC (verts)**. Ne jamais connecter un APC avec un UPC — les angles incompatibles créent des pertes supplémentaires et des réflexions qui peuvent endommager les lasers des équipements actifs.

### La propreté des connecteurs : règle absolue

Une fibre optique a un cœur de 9 micromètres. Un grain de poussière fait en moyenne 5 à 30 micromètres. Un seul grain de poussière sur l'extrémité d'un connecteur peut donc **bloquer une fraction significative du cœur** et dégrader fortement la connexion.

Les règles sur le terrain :
1. Toujours garder les capuchons sur les connecteurs non utilisés
2. Toujours nettoyer un connecteur avant de le brancher (cassette de nettoyage ou lingette IPA)
3. Ne jamais souffler avec la bouche (humidité, graisses)
4. Toujours inspecter avec un microscope de contrôle (ou une caméra de scope) avant branchement

---

## 4. L'épissure

Une **épissure** est une jonction **permanente** entre deux fibres optiques. Contrairement au connecteur, elle ne peut pas être démontée facilement — c'est une soudure définitive.

On fait une épissure quand :
- On a coupé un câble accidentellement et il faut le réparer
- On doit rallonger un câble (deux bobines à raccorder)
- On termine un câble de distribution avec des queues de pies (pigtails) pour le raccorder à un ODF

Il existe deux types d'épissures :

### L'épissure par fusion

L'**épissure par fusion** est la technique professionnelle de référence. Elle utilise une **machine d'épissure** (soudeuse optique) qui :

1. **Aligne** parfaitement les deux fibres en face-à-face avec des moteurs micrométriques (précision < 1 micromètre)
2. **Nettoie** les extrémités par un arc électrique de préfusion
3. **Fusionne** les deux fibres par un arc électrique de forte intensité pendant quelques secondes : le verre des deux extrémités fond et se soude en un seul morceau
4. **Mesure** automatiquement la perte de la jonction (valeur affichée sur l'écran)
5. **Protège** la zone de fusion avec un manchon thermorétractable (SMOUV)

**Perte typique d'une épissure par fusion :** 0,02 à 0,05 dB — pratiquement transparent optiquement.

Une bonne machine d'épissure coûte entre 1 500 et 15 000 euros selon les modèles. Les marques les plus courantes sur le marché africain sont Fujikura, Sumitomo et Ilsintech.

> **Analogie :** L'épissure par fusion, c'est comme souder deux tuyaux en acier — une fois fait, c'est aussi solide que le tuyau d'origine.

**Le processus étape par étape :**
1. Enfiler le manchon SMOUV sur l'une des fibres AVANT de couper
2. Dénuder la fibre sur 3 à 4 cm (retirer gaine et revêtement)
3. Nettoyer la fibre nue avec de l'alcool isopropylique
4. Civer (couper nettement) la fibre avec un cliveur — la coupe doit être perpendiculaire à ±0,5°
5. Placer les deux fibres dans la machine
6. Lancer la fusion (cycle automatique de 10 à 30 secondes)
7. Vérifier la perte affichée (acceptable si < 0,1 dB)
8. Glisser le manchon SMOUV sur la zone de fusion et le rétreindre au four de la machine

### L'épissure mécanique

L'**épissure mécanique** est une alternative plus rapide mais moins performante. Elle utilise un dispositif mécanique (pince ou capillaire) qui maintient les deux extrémités de fibres alignées et en contact optique, grâce à un gel optique qui "bouche" les imperfections de la jonction.

Pas besoin de machine coûteuse — juste des outils de terrain et quelques minutes.

**Perte typique d'une épissure mécanique :** 0,1 à 0,5 dB — acceptable pour des dépannages d'urgence, moins bon pour une installation permanente.

**Comparatif épissure par fusion vs mécanique :**

| Critère | Épissure par fusion | Épissure mécanique |
|---------|--------------------|--------------------|
| Perte typique | 0,02 à 0,05 dB | 0,1 à 0,5 dB |
| Durabilité | Permanente (30+ ans) | Bonne (5 à 15 ans) |
| Vitesse de réalisation | 3 à 5 min par épissure | 1 à 2 min par épissure |
| Équipement requis | Soudeuse (~2 000 à 15 000€) | Kit mécanique (~200€) |
| Coût par épissure | Faible (amorties sur volume) | Moyen (consommables) |
| Usage recommandé | Toutes installations permanentes | Urgence, dépannage, formation |

---

## 5. Les boîtiers et accessoires

Une installation fibre comprend de nombreux autres composants qui servent à protéger, organiser et gérer les fibres.

### Le manchon de protection d'épissure (SMOUV)

Le **SMOUV** (Sleeve Mechanical Overlap UV) — aussi appelé manchon thermorétractable — est un petit tube de protection qui entoure chaque épissure par fusion.

Structure : tube extérieur thermorétractable + baguette de renfort en acier ou fibre de verre + colle thermofusible intérieure.

Après avoir glissé le manchon sur la zone d'épissure et l'avoir placé dans le four intégré de la soudeuse (60 secondes environ), le manchon se rétracte et forme une protection rigide, hermétique et permanente autour de la jonction.

Tailles standard : 40 mm, 45 mm, 60 mm selon le type de fibre et le diamètre du revêtement.

### La boîte de jonction optique (BJO)

La **boîte de jonction optique** (aussi appelée boîtier d'épissures ou boîtier de jonction de câbles) est un boîtier plastique ou métal qui :

- **Organise** les épissures sur des plateaux dédiés
- **Protège** les épissures de l'humidité, des chocs et des UV (indice de protection IP65 ou IP68 pour l'extérieur)
- **Stocke** les excédents de fibre (lovages de fibre sur des bobines internes)
- **Permet** l'entrée et la sortie de plusieurs câbles simultanément

Les BJO existent en différents formats :

| Type | Usage | Capacité typique |
|------|-------|-----------------|
| Manchon cylindrique | Câble enterré ou aérien | 12 à 144 épissures |
| Boîtier plat mural | Local technique, pied d'immeuble | 12 à 48 épissures |
| Boîtier de coupure | Armoire rue (SRO, PBO) | 12 à 576 épissures |

### La jarretière optique (patch cord)

La **jarretière optique** (ou patch cord en anglais) est un câble de fibre optique court — typiquement de 0,5 à 5 mètres — avec des connecteurs déjà installés aux deux extrémités.

Elle est utilisée pour :
- Connecter la PTO à l'ONT/box chez l'abonné
- Connecter les équipements actifs (ONT, switch) dans un rack
- Tester les équipements en laboratoire

Une jarretière se distingue d'un câble de distribution par son usage : elle est prête à l'emploi, avec des connecteurs pré-polis d'usine garantissant une perte d'insertion faible et répétable.

Types courants en FTTH : SC/APC — SC/APC (pour relier la PTO à l'ONT), LC/UPC — LC/UPC (pour les équipements en baie).

> **Attention :** Ne jamais courber une jarretière en deçà du rayon de courbure minimum (typiquement 30 mm en déploiement, 15 mm en utilisation statique). Un courbure excessive "claque" la fibre et coupe le signal brutalement.

### Le plateau de gestion des fibres (cassette)

Dans les boîtiers ODF et les armoires de rue, les **plateaux de gestion** (ou cassettes optiques) permettent d'organiser proprement les fibres et les épissures. Chaque plateau coulissant peut recevoir 12 à 24 épissures ou connecteurs, avec des guides de courbure pour respecter le rayon minimum.

Les plateaux sont empilables dans un boîtier standard 1U de rack (44,5 mm de hauteur).

### L'ODF — Optical Distribution Frame

L'**ODF** (Optical Distribution Frame — Répartiteur Optique) est le meuble de brassage optique, l'équivalent d'un patch panel réseau mais pour la fibre optique. C'est le point central d'une salle technique où tous les câbles arrivent, sont gérés et redistribués.

Un ODF comprend :
- Des **entrées** : les câbles de distribution arrivent et leurs fibres sont épissurées à des pigtails (queues de pies)
- Des **panneaux de connecteurs** : les pigtails se terminent par des connecteurs (SC, LC) qui constituent le "côté optique" de l'ODF
- Des **jarretières de brassage** : des jarretières courtes permettent de relier n'importe quel port entrant à n'importe quel équipement actif sortant

L'ODF permet une gestion flexible : si un abonné change d'équipement ou qu'une ligne est en panne, on modifie simplement le brassage sans toucher aux câbles.

Format standard : rack 19 pouces (48,26 cm), en unités de 1U à plusieurs U selon la capacité (12 à 144 ports par 1U typiquement pour de l'SC).

---

## Quiz récapitulatif

**Question 1** — Quelle est la différence entre un connecteur APC (vert) et un connecteur UPC (bleu) ?
- A) L'APC est pour la fibre monomode, l'UPC pour la fibre multimode
- B) L'APC a une extrémité polie à 8° d'angle, l'UPC est polie à plat — l'APC génère beaucoup moins de réflexions ✅
- C) L'APC est plus cher car il utilise un meilleur verre
- D) Il n'y a aucune différence fonctionnelle, c'est juste une question de couleur pour identifier les fabricants

*Réponse : B — L'angle de 8° du polissage APC dévie la lumière réfléchie hors de l'axe de propagation, réduisant les réflexions d'environ 10 à 100 fois par rapport à l'UPC. En réseau FTTH, le standard est APC (vert).*

---

**Question 2** — Quelle est la perte typique d'une épissure par fusion réalisée correctement ?
- A) 1 à 2 dB
- B) 0,2 à 0,5 dB
- C) 0,02 à 0,05 dB ✅
- D) 0,001 dB

*Réponse : C — Une épissure par fusion réalisée avec une bonne soudeuse et des fibres proprement clivées présente une perte de 0,02 à 0,05 dB. C'est proche de zéro perte, ce qui la rend indétectable dans le bilan optique de la liaison.*

---

**Question 3** — Dans un réseau FTTH, quel est l'ordre correct des éléments du réseau, de l'opérateur à l'abonné ?
- A) NRO → PTO → SRO → PBO → ONT
- B) NRO → SRO → PBO → PTO → ONT ✅
- C) SRO → NRO → PBO → ONT → PTO
- D) NRO → PBO → SRO → PTO → ONT

*Réponse : B — Le chemin correct est NRO (Nœud de Raccordement Optique) → SRO (Sous-Répartiteur Optique) → PBO (Point de Branchement Optique) → PTO (Prise Terminale Optique) → ONT (box Internet).*

---

**Question 4** — Pourquoi faut-il enfiler le manchon SMOUV sur la fibre AVANT de réaliser l'épissure par fusion ?
- A) Pour protéger la machine d'épissure
- B) Pour mesurer la longueur correcte de fibre à dénuder
- C) Parce qu'une fois l'épissure réalisée, la fibre est continue et le manchon ne peut plus passer par-dessus la jonction ✅
- D) C'est une simple recommandation, pas une obligation

*Réponse : C — Une fois l'épissure par fusion réalisée, les deux fibres forment un seul morceau continu. Le manchon SMOUV a un diamètre trop petit pour passer par-dessus une épissure déjà faite. Oublier le manchon avant de commencer oblige à couper la fibre et à tout recommencer.*

---

## Conclusion

Vous venez de faire le tour complet du "vocabulaire matériel" d'une installation fibre optique. Du cœur de verre de 9 micromètres jusqu'à l'ODF de brassage, chaque composant a sa raison d'être et sa place précise dans la chaîne.

Ce qui semblait peut-être complexe au début — NRO, SRO, PBO, PTO, ODF, APC, UPC, SMOUV, BJO... — est en réalité une logique simple et cohérente : protéger la lumière, la guider, la diviser, la connecter et la gérer proprement.

En Côte d'Ivoire, les déploiements FTTH à Abidjan utilisent exactement ces mêmes composants que dans les réseaux les plus modernes d'Europe ou d'Asie. La fibre est une technologie mondiale, et les compétences que vous développez ici sont directement transférables partout.

La prochaine étape ? Passer de la théorie à la pratique : toucher les composants, manipuler les connecteurs, utiliser une soudeuse d'épissure, mesurer un lien avec un OTDR. C'est là que la connaissance devient vraiment maîtrise.

---

**Passez à la pratique :** Nos [formations fibre optique à Abidjan](/formations-fibre-optique/) incluent des travaux pratiques intensifs sur la pose de connecteurs, la réalisation d'épissures et la mesure de liens. Formez-vous avec les équipements et les méthodes utilisés par les opérateurs en Côte d'Ivoire.
