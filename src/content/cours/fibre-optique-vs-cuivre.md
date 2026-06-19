---
title: "Fibre optique vs cuivre : pourquoi la lumière gagne toujours"
pubDate: 2026-06-19
author: "Équipe KMC"
category: "Fibre optique"
niveau: "Débutant"
duree: "30 min"
tags: [fibre optique, cuivre, comparaison, débit, atténuation, débutant]
heroImage: "/images/cours/hero-fibre-optique-vs-cuivre.svg"
description: "Comprenez pourquoi la fibre optique transmet les données jusqu'à 100 fois plus vite que le cuivre, sur des distances bien plus grandes, sans interférences."
---

## Introduction

Quand vous branchez votre box Internet, deux types de câbles peuvent partir vers votre opérateur : un câble en cuivre (comme le vieux câble téléphonique qui existait déjà dans votre mur) ou un câble en fibre optique (le nouveau, translucide, parfois orange ou bleu). Visuellement, la différence est subtile. En termes de performances, la différence est colossale.

Mais pourquoi ? Qu'est-ce qui fait que de la lumière dans du verre peut transporter des données si radicalement mieux que de l'électricité dans du métal ?

Ce cours répond à cette question de manière complète et accessible. Pas besoin de connaissances en physique avancée — juste de la curiosité et un peu de patience.

---

## 1. Comment fonctionne le câble cuivre ?

### Le principe de base : des électrons qui bougent

Un câble en cuivre transporte de l'information grâce aux **électrons** — ces minuscules particules chargées négativement qui se déplacent dans les métaux conducteurs.

Le principe est simple : on applique une tension électrique à une extrémité du câble (disons 0 ou 1 volt, selon le bit que l'on veut transmettre). Cette variation de tension se propage jusqu'à l'autre extrémité, où un appareil la "lit" et interprète l'information.

> **Pour bien retenir :** Dans un câble cuivre, c'est le courant électrique qui transporte l'information. Les électrons ne voyagent pas très vite (quelques centimètres par seconde seulement), mais le signal électrique lui-même se propage à environ 60% de la vitesse de la lumière dans un câble cuivre bien isolé.

### Analogie : le tuyau d'eau qui fuit

Imaginez un long tuyau d'arrosage percé de trous tout au long de sa longueur. Si vous ouvrez l'eau à une extrémité, une partie de l'eau fuit par les trous avant d'arriver à l'autre bout. Plus le tuyau est long, moins il reste d'eau à l'arrivée.

C'est exactement ce qui se passe avec un câble cuivre :
- Le signal électrique perd de l'énergie tout au long du trajet
- Plus la distance est grande, plus le signal est affaibli
- Au-delà d'une certaine distance, le signal est trop faible pour être utilisé

Ce phénomène s'appelle l'**atténuation** — littéralement, l'affaiblissement du signal.

### La résistance électrique

La principale cause d'atténuation dans le cuivre, c'est la **résistance électrique**. Le cuivre est un bon conducteur, mais pas parfait : quand un courant électrique le traverse, une partie de l'énergie est convertie en chaleur. C'est pour cela qu'un câble électrique chauffé chauffe légèrement — il dissipe de l'énergie.

Cette résistance augmente avec la longueur du câble. Un câble de 1 000 mètres a 10 fois plus de résistance qu'un câble de 100 mètres — et donc 10 fois plus de pertes.

### L'effet de peau (pour les signaux haute fréquence)

Quand on envoie des signaux à très haute fréquence (comme c'est le cas pour les hauts débits), un phénomène appelé **effet de peau** aggrave les choses : le courant ne circule plus dans tout le volume du fil, mais seulement dans une fine couche à la surface. La section utile du conducteur diminue, la résistance augmente, et les pertes s'aggravent encore.

C'est une des raisons pour lesquelles le cuivre supporte mal les hauts débits sur de longues distances : plus on augmente le débit (donc la fréquence du signal), plus l'effet de peau est marqué.

### Les perturbations électromagnétiques (EMI)

Le cuivre a un autre défaut majeur : il se comporte comme une **antenne**. Un câble cuivre capte les champs électromagnétiques de son environnement et y injecte des parasites dans le signal :

- La foudre génère des surtensions destructrices
- Les moteurs électriques (ascenseurs, climatiseurs) créent des interférences
- Les lignes haute tension à proximité induisent des courants parasites
- Même d'autres câbles cuivre proches peuvent se perturber mutuellement (phénomène de **diaphonie**)

Pour limiter ces problèmes, les câbles cuivre utilisés pour Internet sont blindés et torsadés (câbles **STP** ou **UTP**). Mais ces mesures ne font que réduire le problème, sans l'éliminer.

---

## 2. Les limites physiques du cuivre

### L'atténuation : chiffres réels

Pour des câbles de catégorie 5e (le standard réseau courant) :
- À 100 MHz, l'atténuation est d'environ **22 dB/100 m**
- Soit environ **22 dB/100 m**, ou **220 dB/km**

À comparer avec les **0,2 dB/km** d'une fibre optique moderne. La fibre perd 1 000 fois moins de signal par kilomètre.

La conséquence pratique : un câble Ethernet cuivre ne peut pas dépasser **100 mètres** sans répéteur. Au-delà, le signal est trop dégradé pour être fiable. C'est une limite inscrite dans les normes (norme IEEE 802.3 pour l'Ethernet).

### La portée maximale sans répéteur

| Type de câble cuivre | Portée maximale fiable |
|---------------------|----------------------|
| Ethernet Cat 5e / Cat 6 | 100 mètres |
| ADSL (paire torsadée téléphone) | 3 à 5 km (mais débit chute fortement) |
| VDSL2 (fibre jusqu'au sous-répartiteur) | 300 à 500 mètres |
| Coaxial (câble TV) | Quelques centaines de mètres |

### Le débit maximum : un plafond physique

Le **VDSL2** — la technologie cuivre la plus performante pour Internet résidentiel — atteint au maximum **100 à 200 Mbit/s** en conditions idéales (câble court, peu d'interférences, équipements récents). Dans la pratique, la plupart des abonnés VDSL2 reçoivent entre 20 et 80 Mbit/s.

Par comparaison, une fibre FTTH standard offre aujourd'hui **1 Gbit/s** (1 000 Mbit/s) en upload et download symétrique — et les offres à 10 Gbit/s commencent à apparaître pour les particuliers.

### Sensibilité aux conditions environnementales

Le cuivre vieillit mal :
- **L'oxydation** dégrade progressivement les connexions et augmente les résistances de contact
- **L'humidité** s'infiltre dans les câbles et crée des courts-circuits ou des fuites de courant
- **La chaleur** accélère le vieillissement des isolants
- **Les rongeurs** rongent volontiers les câbles cuivre (problème fréquent en Afrique)

---

## 3. La fibre : un principe radicalement différent

### Des photons, pas des électrons

Au lieu de faire voyager des électrons, la fibre optique fait voyager des **photons** — les particules élémentaires de la lumière.

Un **émetteur laser** (ou parfois une LED) à une extrémité de la fibre transforme le signal électrique en impulsions lumineuses : lumière = 1, pas de lumière = 0. Ces impulsions lumineuses traversent la fibre à très grande vitesse, et un **photorécepteur** à l'autre extrémité les reconvertit en signal électrique.

> **Pour bien retenir :** La fibre optique n'est qu'un "tuyau à lumière" très sophistiqué. L'électronique existe aux deux extrémités, mais entre les deux, c'est de la lumière pure qui voyage.

### La vitesse : 200 000 km/s dans la fibre

La lumière dans le vide voyage à **299 792 km/s** — c'est la vitesse maximale de l'univers selon la physique. Dans une fibre de verre, elle voyage un peu moins vite (environ **200 000 km/s**), mais c'est encore considérable.

Pour donner une idée : avec la fibre, un signal peut faire l'aller-retour entre Abidjan et Paris (environ 5 000 km) en **50 millisecondes** — soit 0,05 seconde. C'est ce qu'on appelle la **latence** — le délai de propagation.

### L'atténuation : 0,2 dB/km

C'est le chiffre clé à retenir. Une fibre optique monomode moderne perd seulement **0,2 dB/km** (à 1 550 nm). Pour comparaison, un câble cuivre Ethernet perd plus de **2 000 dB/km** pour les mêmes fréquences.

En pratique, ça signifie :
- Une fibre peut transporter un signal sur **100 km sans amplification** et le signal reste exploitable
- Les réseaux de transport longue distance utilisent des amplificateurs tous les **80 à 120 km** (contre tous les 1 à 5 km pour le cuivre)

![Comparaison signal cuivre vs fibre](/images/cours/03-cuivre-vs-fibre.svg)

### L'immunité aux perturbations électromagnétiques

La lumière n'est pas un courant électrique. Elle n'est donc **pas affectée du tout** par les champs électromagnétiques :
- Un éclair peut tomber à un mètre d'une fibre optique sans perturber le signal
- Une usine avec des machines électriques puissantes n'affecte pas la fibre
- La fibre peut être posée à côté d'une ligne haute tension sans aucun problème

C'est une propriété révolutionnaire pour de nombreuses applications industrielles.

---

## 4. Tableau comparatif complet

| Critère | Câble cuivre (Cat 6) | Fibre optique monomode |
|---------|---------------------|----------------------|
| **Débit maximum** | 10 Gbit/s sur 55 m, 1 Gbit/s sur 100 m | Plusieurs Tbit/s par fibre |
| **Portée sans répéteur** | 100 mètres (Ethernet) | 80 à 120 km |
| **Atténuation** | ~20 dB/100 m (à 100 MHz) | ~0,2 dB/km (à 1 550 nm) |
| **Poids (câble 4 paires)** | ~85 kg/km | ~3 à 10 kg/km |
| **Diamètre** | ~6 mm | ~2 à 8 mm selon protection |
| **Sensibilité EMI** | Forte — blindage partiel requis | Nulle — immunité totale |
| **Sensibilité aux orages** | Élevée (surtensions) | Nulle |
| **Sécurité (écoute)** | Facile (couplage inductif) | Très difficile (rupture de signal) |
| **Coût câble** | ~0,50 à 2 €/m | ~0,20 à 1 €/m (fibre nue) |
| **Coût installation** | Faible (pince et outil simple) | Plus élevé (soudeuse d'épissure) |
| **Coût maintenance** | Élevé (dégradation dans le temps) | Faible (très stable dans le temps) |
| **Sensibilité à l'humidité** | Forte | Faible (fibre elle-même imperméable) |
| **Sensibilité aux rongeurs** | Forte | Forte si sans blindage mécanique |
| **Durée de vie estimée** | 15 à 25 ans | 30 à 50 ans |

---

## 5. En pratique : ce que cela change

### Le streaming 4K et 8K

Une vidéo en **4K HDR** nécessite environ **25 Mbit/s** de débit constant. Avec le VDSL2, si vous regardez 4K pendant que quelqu'un d'autre dans la maison est en visio, le débit peut devenir insuffisant.

Avec la fibre FTTH à **1 Gbit/s**, vous pouvez simultanément regarder 40 flux 4K, faire 10 réunions Zoom en HD et télécharger un jeu de 100 Go — et la connexion ne cligne même pas.

### Les jeux en ligne et l'esport

Les joueurs en ligne sont très sensibles à la **latence** (le délai entre une action et sa prise en compte par le serveur). Une latence élevée cause du "lag" — les personnages semblent se téléporter, les tirs n'arrivent pas à temps.

Avec le cuivre ADSL, la latence typique est de **20 à 50 ms**. Avec la fibre, elle descend à **5 à 15 ms**. C'est la différence entre un jeu fluide et un jeu injouable au haut niveau.

### La télémédecine

En **télémédecine**, un médecin à Abidjan peut opérer ou guider une intervention chirurgicale à 1 000 km via une connexion vidéo. Pour cela, la vidéo doit être parfaitement fluide, sans délai, en haute résolution. Seule la fibre offre cette qualité de connexion.

Dans un contexte où les hôpitaux spécialisés sont concentrés dans les grandes villes, la télémédecine via fibre peut sauver des vies en zone rurale ou périurbaine.

### Les industries : sécurité et fiabilité

Dans certains environnements industriels — raffineries, mines, dépôts de munitions — les câbles électriques sont dangereux car ils peuvent provoquer des étincelles en cas de court-circuit.

La fibre optique ne conduit pas l'électricité. Elle ne peut pas provoquer d'étincelle. C'est pourquoi elle est obligatoire dans de nombreuses installations classées ATEX (atmosphères explosibles).

### La Smart City

Les projets de **villes intelligentes** — caméras de surveillance connectées, feux de circulation pilotés par IA, capteurs environnementaux, transports intelligents — nécessitent une infrastructure réseau dense et rapide. La fibre est le seul support capable d'alimenter ces usages en zone urbaine dense.

Abidjan, en déployant sa fibre optique, se dote de l'infrastructure nécessaire pour les projets Smart City des 10 prochaines années.

---

## 6. Pourquoi le cuivre reste encore présent

Si la fibre est si supérieure, pourquoi n'a-t-on pas tout remplacé ?

### Le coût de remplacement

Des millions de kilomètres de câbles cuivre sont déjà installés dans les murs des bâtiments, sous les rues, dans les poteaux téléphoniques. Les remplacer coûte des dizaines ou centaines de milliards d'euros à l'échelle mondiale. C'est un investissement colossal qui prend des décennies.

### Les zones à faible densité

Dans les zones rurales où les maisons sont très espacées, il est difficile de rentabiliser économiquement un déploiement FTTH. Il faut tirer des kilomètres de fibre pour connecter quelques dizaines de clients. Le cuivre existant, même avec ses limites, reste la solution la moins chère à court terme.

### Le FTTN : la solution intermédiaire

Le **FTTN** (Fiber To The Node — fibre jusqu'au nœud) est un compromis : la fibre va jusqu'à un boîtier de quartier (le "nœud"), et le dernier kilomètre jusqu'à chaque maison reste en cuivre.

Cette approche réduit le coût total du déploiement tout en améliorant les performances (grâce à la réduction de la longueur du segment cuivre). Le débit obtenu est meilleur qu'avec une ligne ADSL longue, mais reste inférieur au FTTH pur.

### L'Ethernet cuivre en réseau local (LAN)

À l'intérieur des bâtiments, le câblage cuivre **Cat 6 ou Cat 7** reste pertinent. Sur des distances de 100 mètres maximum, il offre des débits de 1 à 10 Gbit/s avec du matériel standard et peu coûteux. Changer tous les câbles intérieurs des bureaux pour de la fibre n'est économiquement justifié que dans des cas particuliers (équipements de stockage très rapides, salles de serveurs).

---

## Quiz récapitulatif

**Question 1** — Quelle est l'atténuation d'une fibre optique monomode moderne à 1 550 nm ?
- A) 20 dB/km
- B) 2 dB/km
- C) 0,2 dB/km ✅
- D) 0,02 dB/km

*Réponse : C — 0,2 dB/km est l'atténuation standard d'une fibre monomode à 1 550 nm. C'est environ 1 000 fois moins que le câble cuivre Ethernet pour des fréquences comparables.*

---

**Question 2** — Quelle est la portée maximale d'un câble Ethernet cuivre Cat 6 sans répéteur ?
- A) 500 mètres
- B) 200 mètres
- C) 100 mètres ✅
- D) 50 mètres

*Réponse : C — 100 mètres est la limite standard de l'Ethernet cuivre, définie par la norme IEEE 802.3. Au-delà, le signal est trop dégradé.*

---

**Question 3** — Pourquoi la fibre optique est-elle utilisée dans les raffineries et les dépôts de munitions ?
- A) Parce qu'elle coûte moins cher
- B) Parce qu'elle ne conduit pas l'électricité et ne peut pas provoquer d'étincelle ✅
- C) Parce qu'elle est plus facile à installer
- D) Parce qu'elle résiste mieux à la chaleur

*Réponse : B — La fibre optique ne conduit pas l'électricité. Elle est donc sans risque dans les environnements ATEX (atmosphères explosibles) où une étincelle électrique pourrait provoquer une catastrophe.*

---

**Question 4** — Qu'est-ce que le FTTN ?
- A) Fiber To The Nation — la fibre nationale
- B) Fiber To The Node — la fibre jusqu'à un nœud de quartier, avec cuivre pour le dernier kilomètre ✅
- C) Fiber To The Network — la fibre en réseau maillé
- D) Fast Transfer To Nodes — un protocole de transfert rapide

*Réponse : B — Le FTTN est une solution intermédiaire où la fibre va jusqu'à un boîtier de quartier, et le cuivre existant couvre le dernier kilomètre jusqu'aux maisons. C'est moins performant que le FTTH mais moins cher à déployer.*

---

## Conclusion

La comparaison entre fibre optique et cuivre n'est pas une question d'opinion — c'est une question de physique. La lumière voyage plus vite, s'atténue moins, ne subit aucune interférence électromagnétique et peut théoriquement transporter des débits quasi illimités. Le cuivre, malgré ses nombreux mérites historiques, atteint les limites physiques de ce que peuvent faire des électrons dans du métal.

Le résultat concret : là où le cuivre permet de regarder une vidéo en HD, la fibre permet de regarder 100 vidéos en 4K simultanément. Là où le cuivre craint l'orage, la fibre s'en moque. Là où le cuivre limite les industries, la fibre les libère.

En Côte d'Ivoire, le déploiement massif de la fibre optique n'est pas un luxe — c'est une infrastructure aussi essentielle que les routes ou l'électricité pour le développement économique du pays.

---

**Vous voulez maîtriser techniquement la fibre optique ?** Consultez nos [formations fibre optique à Abidjan](/formations-fibre-optique/) — des programmes pratiques pour techniciens débutants et professionnels en reconversion.
