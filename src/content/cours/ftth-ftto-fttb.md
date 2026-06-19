---
title: "FTTH, FTTO, FTTB : comprendre les sigles du déploiement fibre"
pubDate: 2026-06-19
author: "Équipe KMC"
category: "Fibre optique"
niveau: "Débutant"
duree: "25 min"
tags: [FTTH, FTTO, FTTB, architecture, déploiement, fibre, FTTx]
heroImage: "/images/cours/hero-ftth-ftto-fttb.svg"
description: "Décryptez les sigles FTTH, FTTO, FTTB et comprenez quelle architecture de fibre est déployée selon que vous êtes un particulier, une entreprise ou un immeuble."
---

## Introduction

Si vous avez entendu parler de la fibre optique, vous avez sans doute croisé les sigles **FTTH**, **FTTO** et **FTTB**. Ces acronymes peuvent sembler techniques, mais ils répondent tous à la même question simple : **jusqu'où arrive la fibre ?**

En fonction de votre situation (particulier dans un logement, entreprise dans un bureau, habitant d'un immeuble), l'opérateur installe la fibre différemment. Ce cours vous explique ces différences, leurs implications pratiques, et ce qui se passe concrètement en Côte d'Ivoire.

![Architectures FTTx comparées](/images/cours/06-fttx-schema.svg)
*Figure 1 — Les principales variantes FTTx selon la destination finale de la fibre*

---

## 1. Qu'est-ce que "FTTx" signifie ?

### 1.1 La famille FTT

**FTT** est l'abréviation de **Fiber To The...** (Fibre jusqu'au...). Le **x** est remplacé par une lettre qui désigne la destination finale de la fibre optique :

- **H** → Home (logement)
- **O** → Office (bureau)
- **B** → Building (immeuble)
- **N** → Node (nœud de quartier)
- **C** → Cabinet (armoire de rue)

### 1.2 Pourquoi ces variantes existent-elles ?

Amener la fibre jusqu'à chaque logement individuellement est la solution idéale, mais elle est aussi la plus coûteuse. Les opérateurs ont donc développé différentes architectures selon le rapport **coût / bénéfice** en fonction du contexte :

| Facteur | Impact sur le choix d'architecture |
|---|---|
| Densité urbaine | Plus dense = FTTH plus rentable |
| Type de bâtiment | Maison individuelle vs immeuble |
| Profil de l'utilisateur | Particulier vs entreprise |
| Budget de déploiement | FTTH > FTTB > FTTN en coût |
| Débit requis | Entreprise = SLA garanti requis |

---

## 2. FTTH : Fiber To The Home

### 2.1 La fibre jusqu'à la prise murale

**FTTH** (Fiber To The Home) est la version la plus complète de la fibre : la fibre optique arrive physiquement jusqu'à l'intérieur du logement, jusqu'à une prise murale appelée **PTO** (Prise Terminale Optique).

Chez vous, vous avez :
1. Une **PTO** (prise murale avec connecteur SC/APC vert)
2. Un **ONT/BOX fibre** branché sur la PTO via une jarretière
3. La box distribue le WiFi et les connexions Ethernet dans le logement

### 2.2 Les avantages du FTTH

- **Débit maximal** : de 100 Mbit/s jusqu'à 8 Gbit/s (XGS-PON)
- **Latence minimale** : 1 à 5 ms (contre 30-60 ms pour le cuivre)
- **Symétrique possible** : même débit en téléchargement et en envoi
- **Fiabilité** : pas de dégradation avec la distance ou les intempéries

> **Pour bien retenir** : avec le FTTH, 100% du trajet est en fibre optique. Pas de cuivre du tout entre l'opérateur et votre box.

### 2.3 En Côte d'Ivoire

En Côte d'Ivoire, le FTTH est déployé principalement dans les zones résidentielles d'Abidjan (Cocody, Plateau, Marcory, Yopougon) et dans les grandes villes comme Bouaké et San Pedro. Orange CI et MTN CI sont les principaux opérateurs qui déploient du FTTH.

---

## 3. FTTO : Fiber To The Office

### 3.1 La fibre dédiée pour les entreprises

**FTTO** (Fiber To The Office) est une variante professionnelle destinée aux entreprises, administrations, hôtels et grandes structures. Elle diffère du FTTH sur plusieurs points importants.

### 3.2 Les caractéristiques spécifiques du FTTO

| Caractéristique | FTTH (particulier) | FTTO (entreprise) |
|---|---|---|
| Fibre | Partagée (PON) | Dédiée ou prioritaire |
| Débit garanti | Non | Oui (SLA) |
| Symétrie | Asymétrique souvent | Symétrique (upload = download) |
| Contrat | Grand public | Professionnel |
| Prix mensuel | 15 000 – 50 000 FCFA | 200 000 – 1 500 000 FCFA |
| Support technique | Standard | Prioritaire 24h/7j |

### 3.3 Pourquoi les entreprises ont-ils besoin du FTTO ?

Pour une entreprise, la connexion Internet est critique. Une panne ou une lenteur peut bloquer toute l'activité. C'est pourquoi les entreprises paient pour une **SLA** (Service Level Agreement) qui garantit :
- Un **temps de rétablissement** en cas de panne (ex: 4 heures maximum)
- Un **débit minimum garanti** (et pas seulement "jusqu'à")
- Un **taux de disponibilité** (ex: 99,9% soit moins de 9 heures d'interruption par an)

---

## 4. FTTB : Fiber To The Building

### 4.1 La fibre jusqu'au pied de l'immeuble

**FTTB** (Fiber To The Building) est un compromis entre FTTH et les technologies cuivre existantes. La fibre arrive jusqu'au **local technique** de l'immeuble (sous-sol ou rez-de-chaussée), puis :
- Un câble **Ethernet** ou **VDSL2** distribue la connexion à chaque appartement
- La fibre n'entre pas dans les appartements individuels

### 4.2 Les avantages et limites du FTTB

**Avantages :**
- Moins coûteux que le FTTH (pas de câblage fibre dans chaque appartement)
- Compatible avec les gaines techniques existantes des vieux immeubles
- Déploiement plus rapide

**Limites :**
- Le tronçon cuivre final dégrade le signal (perte de débit)
- Débit maximum limité : environ 100-250 Mbit/s en VDSL2
- Distance maximale du cuivre : 50 à 100 mètres idéalement

### 4.3 Quand choisit-on le FTTB ?

Le FTTB est choisi principalement pour les **immeubles collectifs anciens** où :
- Il est difficile de tirer de la fibre dans chaque appartement
- Les résidents ne veulent pas de travaux perturbants
- Le coût d'un FTTH complet serait trop élevé pour la rentabilité

---

## 5. Les autres variantes FTTx

### 5.1 FTTN et FTTC : fibre jusqu'au quartier ou à l'armoire

| Sigle | Signification | Dernière section |
|---|---|---|
| **FTTN** | Fiber To The Node | Cuivre jusqu'à 1 km |
| **FTTC** | Fiber To The Cabinet | VDSL2 jusqu'à 200 m |
| **FTTDp** | Fiber To The Distribution Point | G.fast jusqu'à 50 m |

Ces architectures sont des solutions intermédiaires souvent utilisées pendant la transition entre le cuivre et la fibre totale. Elles permettent d'améliorer les débits sans refaire toute l'infrastructure.

### 5.2 FTTD : Fiber To The Desk

Dans les grandes entreprises ou data centers, la fibre peut aller jusqu'au **bureau de chaque employé** (FTTD — Fiber To The Desk). C'est le niveau de performance ultime, mais rare en dehors des environnements très exigeants.

---

## 6. En Côte d'Ivoire : quelles architectures choisissent les opérateurs ?

### 6.1 La situation en 2026

En Côte d'Ivoire, le marché de la fibre optique est en plein essor. Les trois principaux opérateurs ont des stratégies différentes :

**Orange CI** : déploiement massif du **FTTH** à Abidjan (Cocody, Plateau, Marcory, Bingerville), avec extension prévue à Bouaké et San Pedro. Utilise le réseau PON/GPON.

**MTN CI** : expansion **FTTH** dans les zones résidentielles haut de gamme et les quartiers mixtes d'Abidjan. Fort en distribution résidentielle.

**Moov Africa (Maroc Telecom)** : focus sur le **FTTB** pour les immeubles résidentiels et les entreprises, avec une offre **FTTO** pour les PME et grandes entreprises.

### 6.2 Comment savoir quelle fibre j'ai ?

Pour savoir quelle architecture de fibre vous avez chez vous ou dans votre entreprise :

1. **Vérifiez votre prise** : une prise murale avec un connecteur vert (SC/APC) = FTTH
2. **Regardez votre box** : si elle a un port optique (SFP) et non un port ADSL/VDSL = FTTH
3. **Consultez votre contrat** : il précise le type d'offre (FTTH ou autre)
4. **Demandez à votre technicien** : lors de l'installation, posez la question directement

> **En résumé** : si la fibre entre physiquement dans votre pièce et se connecte à une boîte optique (ONT), vous êtes en FTTH. Si votre connexion passe par un câble cuivre (téléphonique ou Ethernet) à la sortie d'un couloir ou d'un sous-sol, vous êtes probablement en FTTB ou FTTN.

---

## 7. Quiz récapitulatif

**1. Que signifie FTTH ?**
- a) Fiber To The Highway
- b) Fiber To The Home
- c) Full Transfer To High-speed
- d) Fiber Technology To Help

**2. Quelle architecture garantit un SLA (engagement de service) ?**
- a) FTTH grand public
- b) FTTB
- c) FTTO
- d) FTTN

**3. Dans une architecture FTTB, la fibre s'arrête à quel niveau ?**
- a) Dans chaque appartement
- b) Dans la rue
- c) Au pied ou dans le local technique de l'immeuble
- d) Chez l'opérateur

**4. Pourquoi FTTB peut donner un débit inférieur à FTTH ?**
- a) Le signal fibre est moins bon
- b) La dernière section est en cuivre et dégrade le signal
- c) Le splitter est différent
- d) L'OLT est moins puissant

> **Réponses** : 1-b, 2-c, 3-c, 4-b

---

## Conclusion

FTTH, FTTO, FTTB — ces trois architectures répondent à des besoins différents. La tendance mondiale et ivoirienne va clairement vers le **FTTH** pour les particuliers et le **FTTO** pour les entreprises, car ce sont les architectures qui offrent les meilleures performances sur le long terme.

En tant que futur technicien fibre, vous serez amené à installer et maintenir ces différentes architectures. Comprendre leurs différences vous permettra de mieux conseiller vos clients et d'adapter votre travail aux exigences spécifiques de chaque type d'installation.

**Durée estimée : 25 minutes** · **Niveau : débutant**

> Envie de maîtriser l'installation de réseaux FTTH professionnellement ? Découvrez les [formations certifiantes en fibre optique](/formations-fibre-optique/) proposées par KMC à Abidjan.
