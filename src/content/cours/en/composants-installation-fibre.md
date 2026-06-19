---
title: "Components of a fiber optic installation: the complete guide"
pubDate: 2026-06-19
author: "KMC Team"
category: "Fiber optics"
niveau: "Beginner"
duree: "35 min"
tags: [fiber optics, components, cable, connector, splice, beginner]
heroImage: "/images/cours/hero-composants-installation-fibre.svg"
description: "Learn to name and recognize every physical element of a fiber optic installation: optical cable, connectors, splices, enclosures and accessories."
---

## Introduction

Imagine you are assembling an IKEA piece of furniture. Before starting, you spread all the parts on the floor and check the list: panels, screws, hinges, cam-locks… Each part has a name, a precise function, and a defined place in the final result.

A fiber optic installation works the same way. There are dozens of different components — cables, connectors, enclosures, sleeves, patch cords, ODFs — and each one has a precise role in the chain that runs from the operator's central office all the way to your internet box.

This course is your "parts list": by the end, you will be able to name, recognize, and understand the purpose of every component in a real fiber optic installation.

---

## 1. Overview of a fiber optic installation

Before diving into each individual component, we need to understand the overall architecture of an FTTH (Fiber To The Home) network. The signal travels from the operator's server to your box through several stages.

### Network nodes, from largest to smallest

**NRO — Optical Connection Node (Nœud de Raccordement Optique)**

This is the starting point of the operator's network. The **NRO** (also called CO for Central Office) is a large technical facility — often a building of several hundred square metres — that houses the operator's active equipment: the **OLT** (Optical Line Terminal), which are the large electronic systems that "talk" to all the fibres in the neighbourhood.

A single NRO can serve tens of thousands of subscribers.

**SRO — Optical Sub-Distribution Node (Sous-Répartiteur Optique)**

The NRO cannot run an individual fibre all the way to every home — that would be too long and too costly. **SRO** cabinets are therefore installed at regular intervals (typically every 1 to 3 km). The SRO is a technical cabinet placed in the street or in a building's technical room. It receives a large transport fibre from the NRO and "splits" it into dozens of individual fibres toward subscribers.

The split is performed by a passive component called an **optical coupler** (or splitter): one input fibre becomes 4, 8, 16, or 32 output fibres, with no electrical power required.

**PBO — Optical Branching Point (Point de Branchement Optique)**

The **PBO** is even closer to the subscriber — often in the street, at the entrance to a building, or on a pole. It is the last distribution level before the subscriber. It can have 4 to 16 output ports.

**PTO — Optical Terminal Socket (Prise Terminale Optique)**

The **PTO** is the wall socket at the subscriber's premises, usually in the entrance hall of the apartment. This is where the operator's fibre connects to the **patch cord** that runs to the internet box.

**ONT / Internet Box**

The **ONT** (Optical Network Terminal) — often integrated into the internet box — is the equipment at the subscriber's end that converts the optical signal into an electrical signal usable by your devices (Wi-Fi, Ethernet).

### Signal path summary

```
Operator server → NRO (OLT) → transport cable → SRO (splitter) 
→ distribution cable → PBO → subscriber cable → PTO → patch cord → ONT/Box
```

Each of these stages uses specific components that we will now detail.

---

## 2. The optical cable

The cable is the most visible element of a fiber optic installation. But what is actually inside?

### Structure of an optical cable

An optical cable is a succession of layers, like an onion:

**1. The core**
This is the central part where light travels. It is made of **silica glass** of extreme purity. For a single-mode fibre (the most commonly used in FTTH), the core has a diameter of only **9 micrometres** — roughly 10 times thinner than a human hair.

**2. The optical cladding**
Surrounding the core, a layer of glass with a slightly different refractive index. This difference in index creates the phenomenon of **total internal reflection** that confines light within the core. The total diameter of core + cladding is **125 micrometres** — the worldwide standard.

> **Key takeaway:** The core (9 µm) and the cladding (125 µm total) together form the "bare fibre". Everything that follows is there to mechanically protect this fragile fibre.

**3. The primary coating**
A thin layer of acrylic or UV resin that protects the fibre from mechanical and chemical damage. Total diameter: **250 micrometres**. This layer is often colour-coded to identify individual fibres within a multi-fibre cable.

**4. The secondary buffer**
A thicker plastic layer, often PVDF or nylon, that strengthens the protection. Depending on the cable, it can be "loose" (loose buffer — the fibre floats in an optical gel) or "tight" (tight buffer — the fibre is bonded to the buffer). Diameter: **900 micrometres**.

**5. Strength members**
Depending on the cable's intended use, aramid fibres (Kevlar), steel wires, or a fibreglass rod reinforce the cable against tension and crushing.

**6. The outer jacket**
The final protection, generally made of PE (polyethylene) or PVC, resistant to UV, moisture, and mechanical impacts.

### Capacity: from 4 to 1,000 fibres

A cable can contain from **1 to several hundred fibres** depending on its use:

| Use | Typical fibre count |
|-----|---------------------|
| FTTH subscriber cable | 1 to 4 fibres |
| Building cable | 12 to 48 fibres |
| Distribution cable (SRO → PBO) | 24 to 144 fibres |
| Transport cable (NRO → SRO) | 96 to 576 fibres |
| Submarine cable (intercontinental) | 4 to 16 pairs (8 to 32 fibres) |

### Cable types by environment

**Aerial cable**
Placed on poles or hung from a steel messenger wire (ADSS cable). It must withstand wind, extreme temperature variations, UV, and the potential weight of ice in cold climates. Often black in colour (UV resistance).

**Underground cable**
Buried directly or pulled through HDPE conduits (high-density polyethylene tubes). It must resist moisture, ground pressure, and rodents. Some underground cables are armoured with a metallic braid or steel armour to protect against rodent teeth and accidental pickaxe strikes.

**Submarine cable**
The most robust: multiple steel armour layers, protection against the pressure of several kilometres of water, resistance to shark bites (documented!), and a design life of 25 years or more.

**Indoor cable (riser/plenum)**
For cable routes inside buildings. Jacket made from low-smoke, zero-halogen (LSOH) materials for fire safety.

### Fibre colour coding

In a multi-fibre cable, how do you identify each individual fibre? By the colour of its primary coating. An international standard (IEC 60304) defines 12 colours:

| Number | Colour | Abbreviation |
|--------|--------|--------------|
| 1 | Blue | BL |
| 2 | Orange | OR |
| 3 | Green | GN |
| 4 | Brown | BN |
| 5 | Slate / Grey | SL |
| 6 | White | WH |
| 7 | Red | RD |
| 8 | Black | BK |
| 9 | Yellow | YL |
| 10 | Violet | VT |
| 11 | Rose | RS |
| 12 | Aqua / Turquoise | AQ |

For cables with more than 12 fibres, the fibres are grouped into **tubes** of 12 fibres each (tubes themselves identified by the 12 colours). A 144-fibre cable therefore contains 12 tubes of 12 fibres each.

> **Key takeaway:** In the field, identifying a fibre always comes down to: tube number (tube colour) + fibre number within the tube (fibre colour). Example: blue tube (tube 1), orange fibre (fibre 2) = fibre number 14 in a 144-fibre cable.

---

## 3. Connectors

A **connector** allows two optical fibres to be joined in a **demountable** way — they can be connected and disconnected as many times as needed. This differs from a splice (see next section), which is permanent.

### Common connector types

![Connector types](/images/cours/04-connecteurs.svg)

**SC connector (Subscriber Connector)**
The most widespread in FTTH networks and data centres. Connected using a **push-pull** mechanism (push to connect, pull to disconnect). Square 9 mm body, very reliable, easy to use.

*Typical use: FTTH enclosures, PTO, ODF*

**LC connector (Lucent Connector)**
Compact format — approximately half the size of an SC. Uses a **clip** mechanism like an audio jack cable. Very common in active equipment (switches, routers) because its small size allows more ports to be fitted.

*Typical use: active equipment, data centres, SFP optics*

**ST connector (Straight Tip)**
**Bayonet** connection system (like a light bulb: push in and turn a quarter turn). Less common today, but still found in older enterprise networks and industrial IP cameras.

*Typical use: legacy networks, surveillance systems*

**FC connector (Ferrule Connector)**
**Screw-on** connection — a thread guarantees constant pressure on the junction. Less convenient for frequent connections (slow screw/unscrew) but offers excellent mechanical stability.

*Typical use: measurement laboratories, OTDR test equipment*

### Connector summary table

| Connector | Mechanism | Body colour | Main use | Advantage |
|-----------|-----------|-------------|----------|-----------|
| **SC** | Push-pull | Blue (UPC) or Green (APC) | FTTH, ODF | Simple, economical |
| **LC** | Clip | Blue (UPC) or Green (APC) | Active equipment | Compact (SFP format) |
| **ST** | Bayonet | Beige | Legacy networks | Robust |
| **FC** | Screw | Beige | Lab, measurement | Very stable |
| **E2000** | Clip + shutter | Green (APC) | Operator networks | Built-in dust shutter |

### Polish type: APC vs UPC

Regardless of the connector type (SC, LC, etc.), connectors come in two versions of fibre-end polishing:

**UPC — Ultra Physical Contact**
The fibre end is polished **flat** (0° angle). Light arrives perpendicular to the surface. The connector body is **blue**.

Typical return loss: **-50 dB** (very little light reflected back toward the source).

*Use: active equipment, Ethernet links, local area networks*

**APC — Angled Physical Contact**
The fibre end is polished at an **8° angle**. This angle deflects reflected light off the propagation axis, reducing reflections even further. The connector body is **green**.

Typical return loss: **-60 to -70 dB** (10 to 100 times fewer reflections than UPC).

*Use: FTTH networks (Orange, MTN, Moov standard in Côte d'Ivoire), long-distance links, CATV*

> **Golden rule:** On an operator FTTH network (the type of network you will install most often in Côte d'Ivoire), connectors are **ALWAYS APC (green)**. Never connect an APC to a UPC — the incompatible angles create additional losses and reflections that can damage the lasers in active equipment.

### Connector cleanliness: an absolute rule

A fiber optic core is 9 micrometres wide. A dust particle averages 5 to 30 micrometres. A single dust particle on the end of a connector can therefore **block a significant fraction of the core** and severely degrade the connection.

Field rules:
1. Always keep caps on unused connectors
2. Always clean a connector before plugging it in (cleaning cassette or IPA wipe)
3. Never blow with your mouth (moisture, grease)
4. Always inspect with a microscope or scope camera before mating

---

## 4. Splices

A **splice** is a **permanent** joint between two optical fibres. Unlike a connector, it cannot be easily unmated — it is a definitive weld.

A splice is used when:
- A cable has been accidentally cut and needs to be repaired
- A cable needs to be extended (two reels to join)
- A distribution cable is terminated with pigtails to connect it to an ODF

There are two types of splices:

### Fusion splice

The **fusion splice** is the professional reference technique. It uses a **fusion splicer** (optical welding machine) that:

1. **Aligns** the two fibres perfectly face-to-face with micrometric motors (precision < 1 micrometre)
2. **Cleans** the fibre ends with a pre-fusion electric arc
3. **Fuses** the two fibres with a high-intensity electric arc for a few seconds: the glass of both ends melts and welds into a single continuous piece
4. **Automatically measures** the insertion loss of the junction (value displayed on the screen)
5. **Protects** the fusion zone with a heat-shrink sleeve (SMOUV)

**Typical fusion splice loss:** 0.02 to 0.05 dB — practically optically transparent.

A good fusion splicer costs between 1,500 and 15,000 euros depending on the model. The most common brands on the African market are Fujikura, Sumitomo, and Ilsintech.

> **Analogy:** A fusion splice is like welding two steel pipes — once done, it is as strong as the original pipe.

**Step-by-step process:**
1. Thread the SMOUV sleeve onto one fibre BEFORE cleaving
2. Strip the fibre over 3 to 4 cm (remove the buffer and coating)
3. Clean the bare fibre with isopropyl alcohol
4. Cleave the fibre with a fibre cleaver — the cut must be perpendicular to ±0.5°
5. Place both fibres in the machine
6. Start the fusion cycle (automatic cycle of 10 to 30 seconds)
7. Check the displayed loss (acceptable if < 0.1 dB)
8. Slide the SMOUV sleeve over the fusion zone and shrink it in the machine's built-in oven

### Mechanical splice

The **mechanical splice** is a faster but less performant alternative. It uses a mechanical device (a clamp or capillary) that holds the two fibre ends aligned and in optical contact, using an optical gel that "fills in" the imperfections of the junction.

No expensive machine is required — just field tools and a few minutes.

**Typical mechanical splice loss:** 0.1 to 0.5 dB — acceptable for emergency repairs, less suitable for permanent installations.

**Fusion splice vs mechanical splice comparison:**

| Criterion | Fusion splice | Mechanical splice |
|-----------|--------------|-------------------|
| Typical loss | 0.02 to 0.05 dB | 0.1 to 0.5 dB |
| Durability | Permanent (30+ years) | Good (5 to 15 years) |
| Completion time | 3 to 5 min per splice | 1 to 2 min per splice |
| Required equipment | Splicer (~€2,000 to €15,000) | Mechanical kit (~€200) |
| Cost per splice | Low (amortised over volume) | Moderate (consumables) |
| Recommended use | All permanent installations | Emergency, repairs, training |

---

## 5. Enclosures and accessories

A fiber optic installation includes many other components used to protect, organise, and manage fibres.

### The splice protection sleeve (SMOUV)

The **SMOUV** (Sleeve Mechanical Overlap UV) — also called a heat-shrink sleeve — is a small protection tube that surrounds each fusion splice.

Structure: heat-shrink outer tube + steel or fibreglass reinforcing rod + internal thermally-activated adhesive.

After sliding the sleeve over the splice zone and placing it in the splicer's built-in oven (approximately 60 seconds), the sleeve shrinks and forms a rigid, hermetic, and permanent protection around the junction.

Standard sizes: 40 mm, 45 mm, 60 mm depending on the fibre type and coating diameter.

### The optical splice closure (BJO)

The **optical splice closure** (also called a splice enclosure or cable joint box) is a plastic or metal enclosure that:

- **Organises** splices on dedicated trays
- **Protects** splices from moisture, impacts, and UV (protection rating IP65 or IP68 for outdoor use)
- **Stores** excess fibre (fibre coiled on internal spools)
- **Allows** multiple cables to enter and exit simultaneously

Splice closures come in different formats:

| Type | Use | Typical capacity |
|------|-----|-----------------|
| Cylindrical sleeve | Buried or aerial cable | 12 to 144 splices |
| Flat wall-mounted box | Technical room, building base | 12 to 48 splices |
| Inline closure | Street cabinet (SRO, PBO) | 12 to 576 splices |

### The optical patch cord

The **optical patch cord** (or patch cable) is a short fiber optic cable — typically 0.5 to 5 metres — with connectors already installed at both ends.

It is used to:
- Connect the PTO to the ONT/box at the subscriber's premises
- Connect active equipment (ONT, switch) in a rack
- Test equipment in a laboratory

A patch cord differs from a distribution cable in its use: it is ready to deploy, with factory pre-polished connectors guaranteeing low and repeatable insertion loss.

Common types in FTTH: SC/APC — SC/APC (to link the PTO to the ONT), LC/UPC — LC/UPC (for rack-mounted equipment).

> **Caution:** Never bend a patch cord below its minimum bend radius (typically 30 mm during deployment, 15 mm in static use). Excessive bending will crack the fibre and abruptly cut the signal.

### The fibre management tray (cassette)

In ODF enclosures and street cabinets, **fibre management trays** (or optical cassettes) allow fibres and splices to be neatly organised. Each sliding tray can hold 12 to 24 splices or connectors, with bend guides to maintain the minimum bend radius.

Trays are stackable in a standard 1U rack enclosure (44.5 mm height).

### The ODF — Optical Distribution Frame

The **ODF** (Optical Distribution Frame) is the optical patching unit — the equivalent of a network patch panel but for fiber optics. It is the central point in a technical room where all cables arrive, are managed, and redistributed.

An ODF consists of:
- **Inputs**: distribution cables arrive and their fibres are spliced to pigtails
- **Connector panels**: pigtails terminate in connectors (SC, LC) that form the "optical side" of the ODF
- **Cross-connect patch cords**: short patch cords allow any incoming port to be linked to any outgoing active equipment

The ODF enables flexible management: if a subscriber changes equipment or a line develops a fault, simply change the cross-connect without touching the cables.

Standard format: 19-inch rack (48.26 cm), in units of 1U to several U depending on capacity (typically 12 to 144 SC ports per 1U).

---

## Recap quiz

**Question 1** — What is the difference between an APC (green) connector and a UPC (blue) connector?
- A) APC is for single-mode fibre, UPC is for multi-mode fibre
- B) APC has an end polished at an 8° angle, UPC is polished flat — APC generates far fewer reflections ✅
- C) APC is more expensive because it uses better-quality glass
- D) There is no functional difference; the colour simply identifies the manufacturer

*Answer: B — The 8° angle of APC polishing deflects reflected light off the propagation axis, reducing reflections by approximately 10 to 100 times compared to UPC. On an FTTH network, APC (green) is the standard.*

---

**Question 2** — What is the typical loss of a correctly performed fusion splice?
- A) 1 to 2 dB
- B) 0.2 to 0.5 dB
- C) 0.02 to 0.05 dB ✅
- D) 0.001 dB

*Answer: C — A fusion splice performed with a good splicer and cleanly cleaved fibres has a loss of 0.02 to 0.05 dB. This is close to zero loss, making it virtually undetectable in the optical link budget.*

---

**Question 3** — In an FTTH network, what is the correct order of network elements from operator to subscriber?
- A) NRO → PTO → SRO → PBO → ONT
- B) NRO → SRO → PBO → PTO → ONT ✅
- C) SRO → NRO → PBO → ONT → PTO
- D) NRO → PBO → SRO → PTO → ONT

*Answer: B — The correct path is NRO (Optical Connection Node) → SRO (Optical Sub-Distribution Node) → PBO (Optical Branching Point) → PTO (Optical Terminal Socket) → ONT (internet box).*

---

**Question 4** — Why must the SMOUV sleeve be threaded onto the fibre BEFORE performing the fusion splice?
- A) To protect the splicing machine
- B) To measure the correct length of fibre to strip
- C) Because once the splice is made, the fibre is continuous and the sleeve can no longer pass over the junction ✅
- D) It is just a recommendation, not a requirement

*Answer: C — Once the fusion splice is made, the two fibres form a single continuous piece. The SMOUV sleeve has too small a diameter to pass over a completed splice. Forgetting the sleeve before starting means cutting the fibre and starting over.*

---

## Conclusion

You have just completed a full tour of the "hardware vocabulary" of a fiber optic installation. From the 9-micrometre glass core to the ODF cross-connect frame, every component has its reason for existing and its precise place in the chain.

What may have seemed complex at first — NRO, SRO, PBO, PTO, ODF, APC, UPC, SMOUV, BJO… — is in reality a simple and coherent logic: protect the light, guide it, split it, connect it, and manage it cleanly.

In Côte d'Ivoire, FTTH deployments in Abidjan use exactly the same components as the most modern networks in Europe or Asia. Fiber optics is a global technology, and the skills you develop here are directly transferable anywhere in the world.

The next step? Moving from theory to practice: handling the components, manipulating connectors, operating a fusion splicer, measuring a link with an OTDR. That is where knowledge truly becomes mastery.

---

**Take it further:** Our [fiber optic training courses in Abidjan](/formations-fibre-optique/) include intensive hands-on practice in connector installation, splice making, and link measurement. Train with the equipment and methods used by operators in Côte d'Ivoire.
