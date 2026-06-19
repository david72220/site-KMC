---
title: "Comment se déroule un raccordement fibre ?"
pubDate: 2026-06-19
author: "Équipe KMC"
category: "Fibre optique"
niveau: "Débutant"
duree: "40 min"
tags: [raccordement, FTTH, installation, chantier, NRO, SRO, PBO, génie civil]
heroImage: "/images/cours/hero-raccordement-fibre.svg"
description: "Suivez pas à pas toutes les étapes d'un raccordement fibre FTTH : du génie civil jusqu'à la mise en service chez l'abonné."
---

## Introduction

Vous voyez des techniciens creuser des tranchées dans votre rue, installer des boîtiers verts sur les façades des immeubles, ou tirer des câbles le long des poteaux ? Ce sont les signes qu'un raccordement fibre optique est en cours dans votre quartier.

Un raccordement fibre, c'est un travail d'équipe qui mobilise des spécialistes du génie civil, des poseurs de câbles, des soudeurs fibre, des techniciens réseau et des agents de mise en service. Il peut prendre de quelques semaines à plusieurs mois selon la taille du chantier.

Dans ce cours, nous allons suivre le chemin complet de la fibre, depuis le **nœud de raccordement optique (NRO)** de l'opérateur jusqu'à la prise murale chez l'abonné.

![Architecture d'un raccordement fibre FTTH](/images/cours/05-schema-raccordement.svg)
*Figure 1 — Architecture complète d'un réseau FTTH : NRO → SRO → PBO → PTO*

---

## 1. Vue d'ensemble du réseau FTTH

### 1.1 Les quatre nœuds du réseau

Un réseau FTTH se compose de quatre niveaux successifs, chacun avec un rôle précis :

| Sigle | Nom complet | Rôle | Localisation |
|---|---|---|---|
| **NRO** | Nœud de Raccordement Optique | Source du signal, OLT installé | Bâtiment opérateur, climatisé |
| **SRO** | Sous-Répartiteur Optique | Redistribution vers les quartiers | Armoire en rue, 200-500 m du NRO |
| **PBO** | Point de Branchement Optique | Dernier niveau de distribution | Boîtier sur façade ou poteau |
| **PTO** | Prise Terminale Optique | Connexion chez l'abonné | Prise murale intérieure |

### 1.2 La logique de l'arbre

Imaginez un arbre : le NRO est le tronc, le SRO est la grosse branche, le PBO est la petite branche, et la PTO est la feuille qui atteint chaque logement. La fibre se divise progressivement via des **splitters passifs** (des diviseurs qui ne nécessitent aucune électricité) pour desservir de plus en plus d'abonnés.

> **Exemple concret** : un NRO peut alimenter plusieurs dizaines de SRO. Chaque SRO dessert plusieurs centaines de PBO. Chaque PBO dessert en général 4 à 16 abonnés. Un seul NRO peut donc couvrir plusieurs milliers de logements.

---

## 2. Étape 1 : Le génie civil

### 2.1 La planification et les autorisations

Avant de creuser quoi que ce soit, l'opérateur ou son sous-traitant doit :
- Étudier les plans du réseau existant (eau, gaz, électricité, télécom)
- Déposer une **DICT** (Déclaration d'Intention de Commencement de Travaux) pour identifier tous les réseaux souterrains
- Obtenir les autorisations de voirie auprès de la mairie ou de la commune
- Prévenir les riverains (affichage obligatoire en Côte d'Ivoire)

> **Pour bien retenir** : ne jamais creuser sans avoir vérifié la présence de réseaux souterrains. Un câble électrique ou une canalisation de gaz touché accidentellement peut provoquer un accident grave.

### 2.2 Le creusement des tranchées

Pour les câbles souterrains, des tranchées sont creusées selon des règles précises :
- **Largeur** : entre 20 et 40 cm selon le nombre de fourreaux
- **Profondeur** : au moins 50 cm en trottoir, 60 cm en chaussée
- **Signalisation** : cônes, barrières de sécurité, panneau DANGER obligatoires

### 2.3 Les fourreaux PEHD

Dans les tranchées, on n'enterre pas directement les câbles fibre. On installe d'abord des **fourreaux** (tuyaux en PEHD - Polyéthylène Haute Densité) :
- Couleur bleue pour les télécommunications (norme CI)
- Diamètre intérieur de 40 mm à 63 mm selon la zone
- Un **grillage avertisseur** de couleur rouge-brun est posé 30 cm au-dessus des fourreaux

### 2.4 Les chambres de tirage

À intervalles réguliers (tous les 50 à 100 mètres), des **chambres de tirage** (regards) sont installées. Elles permettent aux techniciens d'accéder aux fourreaux pour :
- Tirer les câbles par tronçons successifs
- Réaliser des jointures si nécessaire
- Inspecter et maintenir le réseau

### 2.5 Passage en façade et en aérien

Dans certaines zones, notamment dans les quartiers anciens ou en zone rurale, les câbles ne sont pas enterrés mais posés :
- **En façade** : fixés avec des crampons ou des colliers sur les murs des bâtiments
- **En aérien** : suspendus entre des poteaux, avec un câble porteur métallique pour supporter le poids

---

## 3. Étape 2 : Le câble de distribution (NRO → SRO)

### 3.1 Caractéristiques du câble de distribution

Le câble qui relie le NRO aux différents SRO est le plus gros câble du réseau. Il contient un grand nombre de fibres car il doit alimenter de nombreux quartiers :

| Capacité | Usage typique |
|---|---|
| 48 à 72 fibres | Petit quartier résidentiel |
| 96 à 144 fibres | Quartier dense, ville moyenne |
| 288 à 432 fibres | Grand axe urbain, artère principale |

Ce câble est **armé** : il contient des fils d'acier ou des fils de renfort en fibre de verre pour résister aux contraintes mécaniques pendant le tirage et la durée de vie sur le terrain (20 à 30 ans).

### 3.2 Le tirage du câble

Le tirage d'un câble dans un fourreau se fait à l'aide d'un **tire-câble** motorisé ou manuel. La technique consiste à :
1. Passer d'abord une **aiguille de tirage** (fil fin et résistant) dans le fourreau
2. Attacher le câble à l'aiguille
3. Tirer progressivement, en lubrifiant le câble si nécessaire
4. Respecter le **rayon de courbure minimal** (30 cm environ) pour ne pas casser les fibres

### 3.3 Les épissures au NRO

Une fois le câble arrivé au NRO, les fibres sont **soudées** (épissées par fusion) aux fibres de l'ODF (Optical Distribution Frame). L'ODF est le panneau de brassage optique qui organise les connexions entre l'équipement actif (OLT) et les câbles de distribution.

Chaque épissure doit avoir une **perte inférieure à 0,05 dB** (par fusion). Les mauvaises épissures sont la première cause de pannes réseau.

### 3.4 Le splitter passif au SRO

Au niveau du SRO, un **splitter passif** (aussi appelé coupleur optique) divise le signal en plusieurs sous-signaux. Par exemple, un splitter 1:8 transforme 1 fibre entrante en 8 fibres sortantes, chacune dirigée vers un secteur différent.

| Type de splitter | Ratio | Perte optique |
|---|---|---|
| Splitter 1:2 | 1 → 2 fibres | ~3,5 dB |
| Splitter 1:4 | 1 → 4 fibres | ~7 dB |
| Splitter 1:8 | 1 → 8 fibres | ~10,5 dB |
| Splitter 1:16 | 1 → 16 fibres | ~13,5 dB |
| Splitter 1:32 | 1 → 32 fibres | ~16,5 dB |

---

## 4. Étape 3 : Le câble de branchement (SRO → PBO)

### 4.1 Du SRO au boîtier PBO

Le câble de branchement relie le SRO aux différents PBO (Points de Branchement Optique) répartis dans le quartier. C'est un câble plus souple, moins volumineux (généralement 12 à 24 fibres) que le câble de distribution.

### 4.2 Installation du boîtier PBO

Le PBO est le boîtier que l'on voit couramment fixé sur les façades des immeubles, sur les poteaux, ou parfois dans des niches en sous-sol. Il contient :
- Un second niveau de splitter (1:4, 1:8 ou 1:16)
- Des tiroirs pour organiser les fibres
- Des connecteurs SC/APC pour brancher les câbles abonnés

> **Pour bien retenir** : le PBO est le "point de livraison" de la fibre pour un immeuble ou un groupe de maisons. C'est depuis ce boîtier que le technicien branche chaque abonné individuellement.

### 4.3 Vérification de continuité

Après chaque section du réseau, un test de **continuité** est effectué avec un **détecteur de réseau optique** (testeur de lumière). Ce test simple vérifie que la fibre est bien passe et qu'il n'y a pas de coupure.

---

## 5. Étape 4 : Le câble abonné (PBO → PTO)

### 5.1 Le câble drop

Le câble qui relie le PBO à la prise terminale chez l'abonné est appelé **câble drop** ou câble de raccordement abonné. Ses caractéristiques :
- **2 fibres** (une active, une de réserve)
- Câble souple et léger
- Gaine extérieure résistante aux UV (pour le passage en façade)
- Longueur typique : 10 à 100 mètres

### 5.2 Le passage dans le bâtiment

Le câble peut être posé de plusieurs façons selon la configuration du bâtiment :
- **En façade** : fixé avec des clips ou une goulotte extérieure jusqu'à la fenêtre ou la gaine technique
- **En gaine technique** : dans les immeubles avec une gaine télécoms existante
- **Sous plinthe** : à l'intérieur du logement, dissimulé sous plinthe plastique

### 5.3 La prise terminale optique (PTO)

La PTO est installée à l'intérieur du logement ou du bureau. C'est une petite boîte murale avec :
- Un **connecteur SC/APC** (couleur verte) pour recevoir la jarretière vers l'ONT
- Un couvercle de protection contre la poussière
- Une référence gravée pour identifier la fibre

> **Attention** : la PTO ne doit jamais être ouverte par l'abonné. Elle est la propriété de l'opérateur.

---

## 6. Étape 5 : La mise en service

### 6.1 La mesure de puissance optique

Avant d'activer le service, le technicien mesure la **puissance du signal optique** à la PTO avec un **OPM** (Optical Power Meter - mesureur de puissance optique).

| Niveau de puissance | Interprétation |
|---|---|
| -5 à -25 dBm | Signal excellent, raccordement parfait |
| -25 à -30 dBm | Signal acceptable, vérifier les connecteurs |
| Sous -30 dBm | Signal insuffisant, trouver et corriger le défaut |
| Pas de signal | Coupure de fibre ou mauvais branchement |

### 6.2 La mesure OTDR (optionnelle)

Pour les installations complexes ou en cas de problème, un **OTDR** (Optical Time-Domain Reflectometer) permet de voir précisément où se situe un défaut dans la fibre. Cette mesure est plus avancée et sera détaillée dans un cours dédié.

### 6.3 Le branchement de l'ONT

Une fois la puissance optique validée, le technicien branche l'**ONT** (Optical Network Terminal — aussi appelé box fibre) :
1. Une **jarretière SC/APC** relie la PTO à l'ONT
2. L'ONT se connecte à la box WiFi via un câble Ethernet RJ45
3. L'activation est déclenchée à distance par l'opérateur (quelques minutes)

### 6.4 Les tests de service

À la fin de l'installation, le technicien effectue les vérifications finales :
- **Test de débit** : vérification que le débit promis est bien atteint (ex: 100 Mbit/s, 1 Gbit/s)
- **Test de latence** : vérification que le temps de réponse est acceptable (< 10 ms en fibre)
- **Test de téléphonie** : si inclus dans l'offre
- **Test de télévision** : si inclus dans l'offre
- **Remise des documents** : fiche de mise en service signée par l'abonné

---

## 7. La durée et le coût d'un raccordement

### 7.1 Durée typique par phase

| Phase | Durée moyenne |
|---|---|
| Génie civil (tranchées, fourreaux) | 1 à 3 semaines selon longueur |
| Pose et épissure câble de distribution | 1 à 2 semaines |
| Installation des boîtiers PBO | 3 à 5 jours |
| Raccordement abonné | 2 à 4 heures par logement |
| Mise en service | 30 à 60 minutes par abonné |

### 7.2 Les intervenants

Un raccordement FTTH mobilise plusieurs équipes spécialisées :
- **L'équipe génie civil** : creusement, fourreaux, remblayage
- **L'équipe tirage câble** : passage des câbles dans les fourreaux
- **L'équipe épissure** : soudures fibre au NRO, SRO et PBO
- **L'équipe raccordement abonné** : câble drop, PTO, ONT
- **L'équipe mise en service** : tests, activation, documentation

---

## 8. Quiz récapitulatif

**1. Que signifie PBO ?**
- a) Point Bas Optique
- b) Point de Branchement Optique
- c) Port de Base Optique
- d) Panneau de Brassage Optique

**2. Quelle est la profondeur minimale d'une tranchée fibre en trottoir ?**
- a) 20 cm
- b) 30 cm
- c) 50 cm
- d) 100 cm

**3. Un splitter 1:8 produit combien de fibres de sortie ?**
- a) 1
- b) 4
- c) 8
- d) 16

**4. Quelle mesure permet de vérifier la puissance du signal à la prise terminale ?**
- a) OTDR
- b) OPM (Optical Power Meter)
- c) VFL (Visual Fault Locator)
- d) BERT

> **Réponses** : 1-b, 2-c, 3-c, 4-b

---

## Conclusion

Un raccordement fibre n'est pas un simple branchement de câble : c'est une chaîne d'opérations précises qui demande des compétences variées et une organisation rigoureuse. Chaque étape est critique — une mauvaise épissure, un connecteur mal nettoyé ou un câble trop courbé peut dégrader la qualité du service pour des dizaines d'abonnés.

C'est pourquoi la formation des techniciens est essentielle. En Côte d'Ivoire, le secteur de la fibre optique recrute massivement pour accompagner le déploiement en cours à Abidjan et dans les grandes villes.

**Durée estimée : 40 minutes** · **Niveau : débutant**

> Vous souhaitez apprendre à réaliser vous-même un raccordement fibre, de l'épissure aux tests OTDR ? Découvrez les [formations certifiantes en fibre optique](/formations-fibre-optique/) de KMC à Abidjan.
