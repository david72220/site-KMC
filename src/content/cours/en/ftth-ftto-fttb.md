---
title: "FTTH, FTTO, FTTB: understanding fiber deployment acronyms"
pubDate: 2026-06-19
author: "KMC Team"
category: "Fiber optics"
niveau: "Beginner"
duree: "25 min"
tags: [FTTH, FTTO, FTTB, architecture, deployment, fiber, FTTx]
heroImage: "/images/cours/hero-ftth-ftto-fttb.svg"
description: "Decode the acronyms FTTH, FTTO, and FTTB and understand which fiber architecture is deployed depending on whether you are a residential customer, a business, or an apartment building."
---

## Introduction

If you have heard about fiber optic networks, you have probably come across the acronyms **FTTH**, **FTTO**, and **FTTB**. These abbreviations may sound technical, but they all answer the same simple question: **how far does the fiber go?**

Depending on your situation (a resident in a home, a business in an office, or a tenant in an apartment building), the operator installs fiber differently. This course explains those differences, their practical implications, and what is happening on the ground in Côte d'Ivoire.

![FTTx architectures compared](/images/cours/06-fttx-schema.svg)
*Figure 1 — The main FTTx variants by final fiber destination*

---

## 1. What does "FTTx" mean?

### 1.1 The FTT family

**FTT** stands for **Fiber To The...**. The **x** is replaced by a letter that designates the final destination of the fiber optic cable:

- **H** → Home
- **O** → Office
- **B** → Building
- **N** → Node
- **C** → Cabinet

### 1.2 Why do these variants exist?

Bringing fiber all the way to each individual home is the ideal solution, but it is also the most expensive. Operators have therefore developed different architectures based on the **cost / benefit** ratio in each context:

| Factor | Impact on architecture choice |
|---|---|
| Urban density | Denser areas make FTTH more cost-effective |
| Building type | Single-family home vs. apartment building |
| User profile | Residential vs. business |
| Deployment budget | FTTH > FTTB > FTTN in cost |
| Required bandwidth | Businesses require a guaranteed SLA |

---

## 2. FTTH: Fiber To The Home

### 2.1 Fiber right to the wall socket

**FTTH** (Fiber To The Home) is the most complete form of fiber deployment: the optical fiber physically reaches inside the home, all the way to a wall socket called a **PTO** (Optical Termination Point).

Inside your home, you have:
1. A **PTO** (wall socket with a green SC/APC connector)
2. An **ONT/fiber box** connected to the PTO via a patch cord
3. The box distributes WiFi and Ethernet connections throughout the home

### 2.2 Advantages of FTTH

- **Maximum speed**: from 100 Mbit/s up to 8 Gbit/s (XGS-PON)
- **Minimum latency**: 1 to 5 ms (vs. 30–60 ms over copper)
- **Symmetry possible**: same speed for downloads and uploads
- **Reliability**: no degradation over distance or in bad weather

> **Key takeaway**: with FTTH, 100% of the path is fiber optic. There is no copper at all between the operator and your box.

### 2.3 In Côte d'Ivoire

In Côte d'Ivoire, FTTH is deployed mainly in residential areas of Abidjan (Cocody, Plateau, Marcory, Yopougon) and in major cities such as Bouaké and San Pedro. Orange CI and MTN CI are the primary operators rolling out FTTH.

---

## 3. FTTO: Fiber To The Office

### 3.1 Dedicated fiber for businesses

**FTTO** (Fiber To The Office) is a professional-grade variant designed for businesses, government offices, hotels, and large organizations. It differs from FTTH in several important ways.

### 3.2 Specific characteristics of FTTO

| Characteristic | FTTH (residential) | FTTO (business) |
|---|---|---|
| Fiber | Shared (PON) | Dedicated or prioritized |
| Guaranteed bandwidth | No | Yes (SLA) |
| Symmetry | Often asymmetric | Symmetric (upload = download) |
| Contract type | Consumer | Professional |
| Monthly price | 15,000 – 50,000 FCFA | 200,000 – 1,500,000 FCFA |
| Technical support | Standard | Priority 24/7 |

### 3.3 Why do businesses need FTTO?

For a business, the internet connection is critical. An outage or slowdown can bring all activity to a halt. That is why businesses pay for an **SLA** (Service Level Agreement) that guarantees:
- A **restoration time** in the event of an outage (e.g., 4 hours maximum)
- A **minimum guaranteed speed** (not just "up to")
- An **availability rate** (e.g., 99.9%, meaning fewer than 9 hours of downtime per year)

---

## 4. FTTB: Fiber To The Building

### 4.1 Fiber to the foot of the building

**FTTB** (Fiber To The Building) is a compromise between FTTH and existing copper technologies. The fiber reaches the **technical room** of the building (basement or ground floor), and from there:
- An **Ethernet** or **VDSL2** cable distributes the connection to each apartment
- The fiber does not enter individual apartments

### 4.2 Advantages and limitations of FTTB

**Advantages:**
- Less expensive than FTTH (no fiber cabling inside each apartment)
- Compatible with the existing cable ducts of older buildings
- Faster to deploy

**Limitations:**
- The final copper segment degrades the signal (speed loss)
- Maximum speed limited: approximately 100–250 Mbit/s over VDSL2
- Optimal copper length: 50 to 100 meters maximum

### 4.3 When is FTTB chosen?

FTTB is primarily chosen for **older multi-unit residential buildings** where:
- It is difficult to run fiber into each apartment
- Residents do not want disruptive construction work
- The cost of a full FTTH rollout would be too high to be financially viable

---

## 5. Other FTTx variants

### 5.1 FTTN and FTTC: fiber to the neighborhood or street cabinet

| Acronym | Meaning | Last segment |
|---|---|---|
| **FTTN** | Fiber To The Node | Copper up to 1 km |
| **FTTC** | Fiber To The Cabinet | VDSL2 up to 200 m |
| **FTTDp** | Fiber To The Distribution Point | G.fast up to 50 m |

These architectures are transitional solutions often used during the migration from copper to full fiber. They improve speeds without requiring a complete infrastructure rebuild.

### 5.2 FTTD: Fiber To The Desk

In large enterprises or data centers, fiber can run all the way to **each employee's workstation** (FTTD — Fiber To The Desk). This is the ultimate performance level, but it is rare outside highly demanding environments.

---

## 6. In Côte d'Ivoire: which architectures do operators choose?

### 6.1 The situation in 2026

In Côte d'Ivoire, the fiber optic market is growing rapidly. The three main operators follow different strategies:

**Orange CI**: large-scale **FTTH** deployment in Abidjan (Cocody, Plateau, Marcory, Bingerville), with planned extension to Bouaké and San Pedro. Uses PON/GPON network technology.

**MTN CI**: **FTTH** expansion into upscale residential areas and mixed-use neighborhoods in Abidjan. Strong focus on residential distribution.

**Moov Africa (Maroc Telecom)**: focus on **FTTB** for residential buildings and businesses, with a **FTTO** offer for SMEs and large enterprises.

### 6.2 How do I know which type of fiber I have?

To find out which fiber architecture you have at home or at your business:

1. **Check your socket**: a wall socket with a green connector (SC/APC) means FTTH
2. **Look at your box**: if it has an optical port (SFP) rather than an ADSL/VDSL port, it is FTTH
3. **Read your contract**: it specifies the type of offer (FTTH or otherwise)
4. **Ask your technician**: at the time of installation, ask directly

> **In summary**: if the fiber physically enters your room and connects to an optical termination unit (ONT), you are on FTTH. If your connection runs through a copper cable (telephone or Ethernet) after leaving a hallway or basement, you are most likely on FTTB or FTTN.

---

## 7. Review quiz

**1. What does FTTH stand for?**
- a) Fiber To The Highway
- b) Fiber To The Home
- c) Full Transfer To High-speed
- d) Fiber Technology To Help

**2. Which architecture guarantees an SLA (service commitment)?**
- a) Consumer FTTH
- b) FTTB
- c) FTTO
- d) FTTN

**3. In an FTTB architecture, where does the fiber stop?**
- a) Inside each apartment
- b) In the street
- c) At the foot of or inside the building's technical room
- d) At the operator's facility

**4. Why can FTTB deliver lower speeds than FTTH?**
- a) The fiber signal is weaker
- b) The final segment is copper and degrades the signal
- c) The splitter is different
- d) The OLT is less powerful

> **Answers**: 1-b, 2-c, 3-c, 4-b

---

## Conclusion

FTTH, FTTO, FTTB — these three architectures serve different needs. The global trend, and the trend in Côte d'Ivoire, clearly points toward **FTTH** for residential customers and **FTTO** for businesses, as these architectures deliver the best long-term performance.

As a future fiber technician, you will be called upon to install and maintain all of these architectures. Understanding their differences will allow you to better advise your clients and adapt your work to the specific requirements of each type of installation.

**Estimated duration: 25 minutes** · **Level: Beginner**

> Want to master professional FTTH network installation? Explore the [certified fiber optic training programs](/formations-fibre-optique/) offered by KMC in Abidjan.
