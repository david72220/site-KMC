---
title: "Safety on a fiber optic job site"
pubDate: 2026-06-19
author: "KMC Team"
category: "Fiber optics"
niveau: "Beginner"
duree: "30 min"
tags: [safety, PPE, laser, job site, trench, height, protection, beginner]
heroImage: "/images/cours/hero-securite-chantier.svg"
description: "Master the fundamental safety rules on a fiber optic job site: laser hazards, trench risks, working at height, and mandatory personal protective equipment."
---

## Introduction

Fiber optics has a reputation for being a clean, quiet, and harmless technology. No electrical current in the cable, no radio waves, no visible danger. This reassuring image conceals a reality that every technician must absorb from their very first week of training: **a fiber optic job site carries real risks, some of them invisible and potentially serious.**

Accidents happen. Not because technicians are careless, but because they have not been properly trained in the hazards specific to this trade. An invisible laser beam can cause irreversible blindness in a fraction of a second. A glass fiber splinter can lodge in your eye without you realising it. A poorly secured trench can collapse. A deteriorated pole can give way during a climb.

In this course, we will take these hazards seriously — without dramatising them, but without minimising them either. The objective is simple: that you go home every evening uninjured, throughout your entire career.

---

## 1. Why safety is critical on fiber job sites

### Real accidents — what actually happens

Contrary to what one might think, accidents on fiber job sites are not rare. Here are the most frequently reported accident categories in the industry:

**Eye injuries**: this is the most concerning category. Technicians have looked into connectors on live fiber — sometimes out of simple curiosity, sometimes to check whether a signal was present — and suffered permanent retinal damage. The retina does not regenerate. A laser burn on the macula (the central zone of the retina) can cause partial or total loss of central vision.

Glass fiber splinters have lodged in corneas during cleaving performed without protection. These splinters, invisible to the naked eye and undetectable by X-ray, are extremely difficult to remove and can cause serious infections.

**Trench accidents**: workers have been injured by the collapse of poorly shored trench walls, by the accidental cutting of buried electrical cables during excavation, or by traffic accidents on road works sites with inadequate signage.

**Falls from height**: during the installation of aerial cables on poles, fall accidents occur every year in the telecommunications sector. A concrete or wooden pole in poor condition, a poorly positioned aerial work platform, a harness incorrectly fastened — the causes are numerous, but the consequences are often serious.

### The human and financial cost

A serious accident on a job site has consequences that go far beyond the incident itself. For the injured technician, it can mean the end of a career. For the company, it means legal liability, fines, work stoppages, and reputational damage. For insurers, the cost of care can run into millions of CFA francs (West African CFA franc).

Employers have a **legal obligation** to protect their workers. In Côte d'Ivoire, the Labour Code (Law no. 2015-532) and the decrees relating to occupational health and safety impose precise obligations on both employers and workers. Failing to comply with safety rules exposes individuals to criminal and civil sanctions.

But beyond the law, it is a question of ethics: **your safety and that of your team is an absolute priority.**

---

## 2. The laser hazard: invisible and formidable

### The light you cannot see

This is the most dangerous paradox in fiber optics: the wavelengths used to transmit data are **completely invisible to the human eye**.

The human eye sees between 380 nm (violet) and 780 nm (deep red). Fiber optic systems use:
- **1310 nm** for short- and medium-distance single-mode systems (including GPON upstream)
- **1490 nm** for GPON downstream
- **1550 nm** for long-distance links and amplified systems

All three wavelengths fall in the **infrared** range — invisible, but not harmless. Your eye perceives no light sensation, no heat, no warning whatsoever. The laser signal enters the eye, passes through the lens which focuses it onto the retina, and burns the retinal cells in a fraction of a second.

In many cases there is **no immediate pain**. The victim may not realise what has just happened, and only discover a permanent dark spot in their field of vision several hours later.

### Laser power and hazard levels

The power of a laser signal in a fiber is measured in **dBm** (decibels relative to 1 milliwatt).

| Power level | dBm | mW | Eye hazard |
|-------------|-----|----|-----------|
| Typical GPON signal at subscriber | −3 to +2 dBm | 0.5 to 1.6 mW | High risk |
| OLT output (before splitter) | +4 to +7 dBm | 2.5 to 5 mW | Very high risk |
| Amplified (DWDM long distance) | +10 to +20 dBm | 10 to 100 mW | Extremely high risk |
| OTDR test signal | +23 to +26 dBm | 200 to 400 mW | CRITICAL DANGER |

### The absolute rule: never look into a fiber without checking first

The basic rule is simple and non-negotiable:

**Never look directly into the end of a fiber optic cable without first verifying with a measuring instrument that no signal is present.**

This rule applies even if:
- You have been told the fiber is "disconnected at the OLT end"
- The ONT's PON indicator is off
- You are using a "visual fault locator" or torch to see whether the fiber is broken
- You just want to "take a quick look"

The only safe method to check whether a fiber is live is to use an **optical power meter** connected via an adapter to the connector. If the meter reads −40 dBm or less, the fiber can be considered inactive.

### Laser safety glasses

For any fiber handling, even on a fiber assumed to be inactive, **laser safety glasses** (optical safety eyewear) are strongly recommended.

Glasses suitable for fiber optic work must have an **optical density (OD) of 6 or greater** for the 1310–1550 nm wavelength range. An optical density of 6 means they block 10⁶ times the laser intensity — an attenuation of 60 dB — sufficient to protect against the power levels encountered in FTTH networks.

Important: ordinary sunglasses do not protect against infrared radiation. You need certified glasses with the spectral protection appropriate to infrared wavelengths.

---

## 3. Glass fiber splinters

### A microscopic but real hazard

During **cleaving** (cutting the fiber cleanly with a cleaving tool) or when preparing fibers for splicing, tiny glass fragments are produced. These splinters are typically between 1 and 10 millimetres long but as thin as a hair — they are **practically invisible to the naked eye**.

These splinters are dangerous for several reasons:

**Skin penetration**: if you pick up a splinter with your fingers or it lands on your hand, it can pierce the skin without you feeling it. Once under the skin, it is invisible to X-rays and can cause local inflammation or migrate through tissue.

**Eye hazard**: if a splinter becomes airborne (for example, if you blow on it) and lands in the eye, it can cause serious corneal lesions and infections. The cornea is extremely sensitive and densely packed with nerve endings.

**Ingestion**: splinters lying on a work surface can contaminate a drink or food left nearby. Never eat, drink, or touch your face during cleaving operations.

### Best practices for managing splinters

**Never with bare fingers**: never pick up a fiber splinter with your bare hands. Never blow on one to remove it — you propel it into the air and risk inhaling it or getting it in your eyes.

**Adhesive tape**: the safest method for collecting splinters is to use a piece of adhesive tape (sticky tape) dabbed gently onto the surface where splinters have landed. The splinter sticks to the tape, which is then rolled up on itself and disposed of.

**The fiber waste container**: every fiber splicing job site must have a **dedicated container for fiber offcuts** — often a small plastic bottle with a cap. Never throw fiber offcuts into an open waste bin where they could contaminate other people.

**Safe cleaving technique**:
1. Wear protective glasses
2. Position the cleaver so that the splinter falls into the integrated collection tray
3. Do not move the cleaver immediately after cleaving — wait for the splinter to settle
4. Collect the splinter with adhesive tape or the cleaver's own tray
5. Place it in the fiber container

---

## 4. Trench safety

### The trench: a multi-hazard work environment

Installing conduits and cables underground requires excavation. Whether carried out by mechanical trencher or by hand with a shovel, working in a trench exposes you to several distinct types of risk.

### Mandatory signage

**Before anything else**, a job site on a road or public thoroughfare must be **properly signed**. In Côte d'Ivoire, as in any country, working on the public highway without signage exposes workers to traffic accidents and to legal sanctions.

Minimum signage requirements include:
- **Orange or red warning cones** positioned upstream of the job site in the direction of traffic, at a sufficient distance (minimum 50 metres in town, more on open roads)
- **Site barriers** clearly demarcating the work zone
- **DANGER — ROADWORKS** signs of the approved type
- **Light beacons** if work continues after dark or in poor visibility
- A **safety spotter** if the site is at a junction or in a high-traffic area

### The DICT — Declaration of Intent to Begin Work

**Before any excavation**, it is mandatory to contact underground network operators to find out the location of their networks in the work area. In France, this process is called the DICT (Déclaration d'Intention de Commencement de Travaux) and is managed through reseaux-et-canalisations.gouv.fr. In Côte d'Ivoire, the equivalent procedure involves consulting CIE (Compagnie Ivoirienne d'Électricité), SODECI (water), Orange CI, and other operators present in the area.

**Never dig without having identified the buried networks.** A high-voltage cable buried at 60 cm, a gas pipe, a pressurised water main — all can be fatal if struck by a trencher or a shovel.

### Collapse risk and shoring

For trenches more than **1.30 metres deep**, standards require **shoring** (wall bracing) to prevent collapse. The ground may look stable, but vibrations (a passing lorry, the use of a trencher), heat, or water infiltration can cause a sudden collapse.

A trench collapse can kill within seconds through crushing or asphyxiation. It is an underestimated risk because it is rare, but the consequences are almost always fatal or extremely severe.

### PPE for trench work

- **S3 safety boots**: with steel toe cap, anti-penetration sole, and crush resistance
- **Hard hat**: protects against falling objects and impacts when entering and exiting the trench
- **High-visibility vest** (minimum Category 2): essential for being visible to vehicle drivers
- **Work gloves**: protect against cuts when handling conduits and cables
- **Safety glasses**: flying earth and stones are common during excavation

---

## 5. Working at height

### Specific risks in aerial installation

Installing aerial cables on poles is one of the highest-risk activities in the telecommunications sector. A fall of 6, 8, or 10 metres is in the vast majority of cases fatal or causes permanent injury.

### Use of aerial work platforms (AWP)

The **AWP** (Aerial Work Platform), commonly called a cherry picker or boom lift, is the preferred equipment for aerial cabling work on poles in urban settings. Before any AWP operation:

1. **Check ground stability**: the AWP must not be positioned on soft ground, on a slope, or over a manhole cover. Use levelling pads if necessary.
2. **Deploy the outriggers** (stabilising legs): never work at height without the outriggers correctly deployed and resting on the ground.
3. **Check the safe clearance distance** from overhead power lines (LV and HV) before raising the platform.
4. **Wear the fall-arrest harness**: even in an AWP, the harness must be attached to the anchor point provided on the platform.
5. **Never exceed the maximum load** of the platform.
6. **Have a person on the ground** to monitor the environment and intervene if a problem arises.

### Climbing poles

In certain rural configurations or during quick interventions, technicians climb directly onto poles using lineman's climbers. This technique requires specific training and the mandatory use of:
- A **fall-arrest harness** with lanyard and auto-retractable fall arrester
- **Climbing gaffs** (spurs) suited to the type of pole (wood, concrete, steel)
- A **hard hat** with chin strap
- **Insulating gloves** if near LV power lines

### Safety clearances from overhead power lines

Working near overhead power lines imposes non-negotiable minimum clearances:

| Line type | Voltage | Minimum safety clearance |
|-----------|---------|--------------------------|
| Low Voltage (LV) | < 1,000 V | 0.30 m (with insulated clothing) / 3 m (uninsulated) |
| Medium Voltage (MV) | 1 to 50 kV | 2 m minimum |
| High Voltage (HV) | > 50 kV | 5 m minimum |

If there is any doubt about the nature of an overhead line (LV or HV), **always** treat it as the higher voltage and maintain the maximum clearance. Contact the power network manager (CIE) to obtain precise information before any intervention.

---

## 6. Complete PPE — reference table

**PPE** (Personal Protective Equipment) items are not optional accessories. They are **mandatory** based on the hazards present on the job site.

![Safety PPE](/images/cours/09-epi-securite.svg)
*Figure 1 — Mandatory PPE on a fiber optic job site: each item of equipment protects against a specific hazard.*

| PPE | Why it is mandatory | When to wear it |
|-----|--------------------|-----------------| 
| **Laser safety glasses** (OD 6+ / 1310–1550 nm) | Prevents irreversible retinal burns | All fiber handling, cleaving, splicing |
| **Site safety glasses** (against projectiles) | Protects against flying earth, stones, splinters | Excavation, drilling, cable handling |
| **Hard hat** (EN 397) | Protects against falling objects and head impacts | Trenches, AWP, areas with overhead work |
| **High-visibility vest** (EN ISO 20471 cl. 2) | Makes wearer visible to vehicle drivers | All job sites on public roads or car parks |
| **S3 safety boots** (EN ISO 20345) | Protects against crushing, penetration, falling heavy objects | All job sites without exception |
| **Anti-cut work gloves** (EN 388) | Protects against cuts when handling cables and conduits | Cable, conduit, and accessory handling |
| **Fall-arrest harness** (EN 363) + lanyard | Prevents fatal falls | AWP, pole climbing, work at height > 1.80 m |
| **Knee pads** | Protects knees when crouching or kneeling | Optical splicing at the base of a cabinet, trench work |

### Morning job site safety checklist

Before starting each work day on site, carry out this quick check:

- [ ] All appropriate PPE items are available, in good condition, and being worn
- [ ] Tools have been checked (cleaver clean, splinter tray empty, splicer calibrated)
- [ ] Site signage is in place and visible
- [ ] Safety instructions have been briefed to the whole team
- [ ] The site emergency contact is known to everyone
- [ ] The first-aid kit is available
- [ ] Emergency numbers are posted or memorised (SAMU: 185, Police: 110, Fire brigade: 180)

---

## 7. Daily best practices

### Site housekeeping and organisation

A tidy job site is a safer job site. Cables lying on the ground create tripping hazards. Tools left at height can fall on someone below. Fiber splinter containers that are poorly sealed can contaminate the surroundings.

**"Clean site" rule**: tidy up as you go, not just at the end of the day. Store tools in their designated bags when not in use. Never leave the cleaver open with a splinter inside it.

### Cable management on the job site

Fiber cables being unspooled or pulled represent a tripping hazard for the team as well as for passers-by. When unspooling a drum:
- Delimit the work zone with cones
- Ensure the cable does not cross pedestrian walkways
- Use cable guides or roller guides at bends

### Team communication

Most accidents occur during breakdowns in communication. If you are about to work on a fiber, tell your team. If you are going to cut power to an ONT, say so. If you are going up in an AWP, make sure someone on the ground is watching.

On noisy job sites (trencher, traffic), establish **agreed visual signals** in advance so you can communicate without needing to shout.

### Incident reporting

Every incident, however minor, must be reported to the site supervisor and recorded. A minor incident left unreported today can be the precursor to a serious accident tomorrow. A culture of near-miss reporting is the foundation of an organisation that improves its safety record over time.

---

## 8. Quiz

**Question 1 — Which wavelength is used in FTTH GPON networks and why is it dangerous?**

- A) 650 nm — visible red, irritating to the eyes
- B) 850 nm — ultraviolet, burns the skin
- C) 1310 and 1490 nm — invisible infrared, burns the retina without warning
- D) 2000 nm — microwaves, heats tissue

*Answer: C) Wavelengths of 1310 nm and 1490 nm are infrared and invisible. They focus onto the retina without the eye receiving any alarm signal whatsoever.*

---

**Question 2 — What is the correct method for picking up a glass fiber splinter?**

- A) Blow on it gently to move it away
- B) Pick it up with your fingers after checking it with a torch
- C) Dab with a piece of adhesive tape, roll the tape up, and dispose of it in the fiber waste container
- D) Vacuum it up with the technical room's vacuum cleaner

*Answer: C) Adhesive tape is the only safe method. Blowing propels the splinter into the air. Picking it up with your fingers risks it penetrating the skin.*

---

**Question 3 — Before any trench excavation, which step is mandatory?**

- A) Informing the company quality manager
- B) Contacting underground network operators to find out the location of their networks in the work area
- C) Obtaining the agreement of neighbouring residents
- D) Checking that the weather is favourable

*Answer: B) Before any excavation it is mandatory to consult the relevant operators (CIE, SODECI, telecoms operators) to avoid cutting through electrical cables, gas pipes, or water mains.*

---

**Question 4 — When working from an AWP near a low-voltage (LV) overhead power line, what is the minimum safety clearance required if you are not wearing insulating clothing?**

- A) 0.30 m
- B) 1 m
- C) 3 m
- D) 5 m

*Answer: C) 3 metres minimum clearance without insulating protection for an LV line. With certified insulating clothing, the clearance may be reduced to 0.30 m.*

---

## 9. Conclusion

Safety on a fiber optic job site rests on three pillars: **knowledge of the hazards**, **correct use of PPE**, and **daily discipline**.

Laser hazards are invisible but real — never look into a fiber without instrument verification. Glass splinters are microscopic but can cause permanent injury — manage them with adhesive tape and the fiber waste container. Trenches are multi-hazard environments — signage, identification of buried networks, and shoring where required. Working at height kills every year — harness, AWP outriggers, and electrical safety clearances.

These rules are not bureaucratic constraints. They were written because accidents have happened, because technicians have been injured, and because the industry's collective experience has shown that these precautions, correctly applied, save lives.

At KMC, safety is integrated into every practical training session. Good reflexes are built from the very first days and applied throughout an entire career. A technician who goes home every evening in good health is a technician who can build a rewarding career in this industry.

---

*Ready to go further? Discover our certified fiber optic training programmes on [/formations-fibre-optique/](/formations-fibre-optique/).*
