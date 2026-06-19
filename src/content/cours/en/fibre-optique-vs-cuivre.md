---
title: "Fiber optics vs copper: full comparison"
pubDate: 2026-06-19
author: "KMC Team"
category: "Fiber optics"
niveau: "Beginner"
duree: "30 min"
tags: [fiber optics, copper, comparison, data rate, attenuation, beginner]
heroImage: "/images/cours/hero-fibre-optique-vs-cuivre.svg"
description: "Understand why fiber optics transmits data up to 100 times faster than copper, over much greater distances, with no interference."
---

## Introduction

When you plug in your Internet router, two types of cables might run back to your operator: a copper cable (like the old telephone cable already in your wall) or a fiber optic cable (the new one, translucent, sometimes orange or blue). Visually, the difference is subtle. In terms of performance, the difference is colossal.

But why? What makes light in glass carry data so radically better than electricity in metal?

This course answers that question completely and accessibly. No advanced physics knowledge required — just curiosity and a little patience.

---

## 1. How does a copper cable work?

### The basic principle: moving electrons

A copper cable carries information through **electrons** — the tiny negatively charged particles that move through conducting metals.

The principle is simple: a voltage is applied at one end of the cable (say 0 or 1 volt, depending on the bit being transmitted). This voltage variation propagates to the other end, where a device "reads" it and interprets the information.

> **Key takeaway:** In a copper cable, it is the electric current that carries information. Electrons themselves don't travel very fast (just a few centimeters per second), but the electrical signal itself propagates at about 60% of the speed of light in a well-insulated copper cable.

### Analogy: the leaky garden hose

Imagine a long garden hose riddled with holes along its entire length. If you turn on the water at one end, some of it leaks out through the holes before reaching the other end. The longer the hose, the less water arrives.

This is exactly what happens with a copper cable:
- The electrical signal loses energy all along the way
- The greater the distance, the more the signal weakens
- Beyond a certain distance, the signal is too weak to be usable

This phenomenon is called **attenuation** — literally, the weakening of the signal.

### Electrical resistance

The main cause of attenuation in copper is **electrical resistance**. Copper is a good conductor, but not a perfect one: when an electric current passes through it, some energy is converted to heat. This is why a current-carrying cable heats up slightly — it is dissipating energy.

This resistance increases with the length of the cable. A 1,000-meter cable has 10 times more resistance than a 100-meter cable — and therefore 10 times more losses.

### The skin effect (for high-frequency signals)

When signals are sent at very high frequencies (as is the case for high data rates), a phenomenon called the **skin effect** makes things worse: the current no longer flows through the full volume of the wire, but only in a thin layer at the surface. The useful cross-section of the conductor decreases, resistance rises, and losses worsen further.

This is one of the reasons why copper handles high data rates poorly over long distances: the higher the data rate (and therefore the signal frequency), the more pronounced the skin effect.

### Electromagnetic interference (EMI)

Copper has another major drawback: it acts like an **antenna**. A copper cable picks up electromagnetic fields from its environment and injects noise into the signal:

- Lightning generates destructive voltage surges
- Electric motors (elevators, air conditioners) create interference
- Nearby high-voltage lines induce parasitic currents
- Even other adjacent copper cables can interfere with each other (a phenomenon called **crosstalk**)

To limit these problems, copper cables used for Internet connections are shielded and twisted (**STP** or **UTP** cables). But these measures only reduce the problem — they do not eliminate it.

---

## 2. The physical limits of copper

### Attenuation: real figures

For Category 5e cables (the current network standard):
- At 100 MHz, attenuation is approximately **22 dB/100 m**
- That is roughly **220 dB/km**

Compare that to the **0.2 dB/km** of a modern fiber optic cable. Fiber loses 1,000 times less signal per kilometer.

The practical consequence: an Ethernet copper cable cannot exceed **100 meters** without a repeater. Beyond that, the signal is too degraded to be reliable. This limit is written into the standards (IEEE 802.3 for Ethernet).

### Maximum reach without a repeater

| Copper cable type | Maximum reliable reach |
|---|---|
| Ethernet Cat 5e / Cat 6 | 100 meters |
| ADSL (twisted telephone pair) | 3 to 5 km (but data rate drops sharply) |
| VDSL2 (fiber to the sub-distribution point) | 300 to 500 meters |
| Coaxial (TV cable) | A few hundred meters |

### Maximum data rate: a physical ceiling

**VDSL2** — the highest-performing copper technology for residential Internet — reaches a maximum of **100 to 200 Mbit/s** under ideal conditions (short cable, few interferences, recent equipment). In practice, most VDSL2 subscribers receive between 20 and 80 Mbit/s.

By comparison, a standard FTTH fiber connection today offers **1 Gbit/s** (1,000 Mbit/s) symmetrical upload and download — and 10 Gbit/s plans are starting to appear for residential customers.

### Sensitivity to environmental conditions

Copper ages poorly:
- **Oxidation** progressively degrades connections and increases contact resistance
- **Moisture** infiltrates cables and causes short circuits or current leakage
- **Heat** accelerates insulation aging
- **Rodents** readily chew through copper cables (a frequent problem in Africa)

---

## 3. Fiber: a radically different principle

### Photons, not electrons

Instead of moving electrons, fiber optics moves **photons** — the elementary particles of light.

A **laser transmitter** (or sometimes an LED) at one end of the fiber converts the electrical signal into light pulses: light = 1, no light = 0. These light pulses travel through the fiber at very high speed, and a **photoreceiver** at the other end converts them back into an electrical signal.

> **Key takeaway:** Fiber optics is simply a very sophisticated "light pipe." Electronics exist at both ends, but between them, pure light is doing the traveling.

### Speed: 200,000 km/s in the fiber

Light in a vacuum travels at **299,792 km/s** — the maximum speed in the universe according to physics. In a glass fiber, it travels a little slower (approximately **200,000 km/s**), but that is still considerable.

To put it in perspective: with fiber, a signal can make the round trip between Abidjan and Paris (approximately 5,000 km) in **50 milliseconds** — that is, 0.05 seconds. This is what is called **latency** — the propagation delay.

### Attenuation: 0.2 dB/km

This is the key figure to remember. A modern single-mode fiber optic cable loses only **0.2 dB/km** (at 1,550 nm). For comparison, an Ethernet copper cable loses more than **2,000 dB/km** at equivalent frequencies.

In practice, this means:
- A fiber can carry a signal over **100 km without amplification** and the signal remains usable
- Long-distance transport networks use amplifiers every **80 to 120 km** (versus every 1 to 5 km for copper)

![Copper vs fiber signal comparison](/images/cours/03-cuivre-vs-fibre.svg)

### Immunity to electromagnetic interference

Light is not an electric current. It is therefore **not affected at all** by electromagnetic fields:
- A lightning bolt can strike one meter from a fiber optic cable without disturbing the signal
- A factory with powerful electric machinery does not affect the fiber
- Fiber can be laid next to a high-voltage line with no problems whatsoever

This is a revolutionary property for many industrial applications.

---

## 4. Full comparison table

| Criterion | Copper cable (Cat 6) | Single-mode fiber optic |
|---|---|---|
| **Maximum data rate** | 10 Gbit/s over 55 m, 1 Gbit/s over 100 m | Several Tbit/s per fiber |
| **Reach without repeater** | 100 meters (Ethernet) | 80 to 120 km |
| **Attenuation** | ~20 dB/100 m (at 100 MHz) | ~0.2 dB/km (at 1,550 nm) |
| **Weight (4-pair cable)** | ~85 kg/km | ~3 to 10 kg/km |
| **Diameter** | ~6 mm | ~2 to 8 mm depending on protection |
| **EMI sensitivity** | High — partial shielding required | Zero — total immunity |
| **Storm sensitivity** | High (voltage surges) | Zero |
| **Security (eavesdropping)** | Easy (inductive coupling) | Very difficult (signal breaks) |
| **Cable cost** | ~0.50 to 2 €/m | ~0.20 to 1 €/m (bare fiber) |
| **Installation cost** | Low (simple crimping tool) | Higher (fusion splicer) |
| **Maintenance cost** | High (degrades over time) | Low (very stable over time) |
| **Moisture sensitivity** | High | Low (fiber itself is waterproof) |
| **Rodent sensitivity** | High | High without mechanical armoring |
| **Estimated lifespan** | 15 to 25 years | 30 to 50 years |

---

## 5. In practice: what this changes

### 4K and 8K streaming

A **4K HDR** video requires approximately **25 Mbit/s** of constant bandwidth. With VDSL2, if you are watching 4K while someone else in the house is on a video call, bandwidth can become insufficient.

With FTTH fiber at **1 Gbit/s**, you can simultaneously watch 40 4K streams, have 10 HD Zoom meetings, and download a 100 GB game — and the connection does not even blink.

### Online gaming and esports

Online gamers are very sensitive to **latency** (the delay between an action and the server's response). High latency causes "lag" — characters seem to teleport, shots arrive too late.

With copper ADSL, typical latency is **20 to 50 ms**. With fiber, it drops to **5 to 15 ms**. That is the difference between a smooth game and one that is unplayable at a competitive level.

### Telemedicine

In **telemedicine**, a doctor in Abidjan can perform or guide a surgical procedure 1,000 km away via a video connection. For this, the video must be perfectly smooth, without delay, in high resolution. Only fiber offers this connection quality.

In a context where specialized hospitals are concentrated in major cities, telemedicine via fiber can save lives in rural or peri-urban areas.

### Industries: safety and reliability

In certain industrial environments — refineries, mines, munitions depots — electrical cables are dangerous because they can cause sparks in the event of a short circuit.

Fiber optics does not conduct electricity. It cannot cause a spark. This is why it is mandatory in many ATEX-classified installations (explosive atmospheres).

### Smart City

**Smart city** projects — connected surveillance cameras, AI-controlled traffic lights, environmental sensors, intelligent transport — require a dense, high-speed network infrastructure. Fiber is the only medium capable of sustaining these uses in dense urban areas.

By deploying its fiber optic network, Abidjan is building the infrastructure needed for the Smart City projects of the next 10 years.

---

## 6. Why copper is still present

If fiber is so superior, why hasn't everything been replaced?

### Replacement cost

Millions of kilometers of copper cables are already installed in the walls of buildings, under streets, on telephone poles. Replacing them costs tens or hundreds of billions of euros worldwide. This is a colossal investment that takes decades.

### Low-density areas

In rural areas where houses are widely spaced, it is difficult to make FTTH deployment economically viable. Kilometers of fiber must be run to connect a few dozen customers. Existing copper, despite its limits, remains the least expensive short-term solution.

### FTTN: the intermediate solution

**FTTN** (Fiber To The Node) is a compromise: fiber runs to a neighborhood cabinet (the "node"), and the last kilometer to each home remains copper.

This approach reduces total deployment cost while improving performance (by shortening the copper segment). The resulting data rate is better than with a long ADSL line, but still lower than pure FTTH.

### Copper Ethernet in local area networks (LAN)

Inside buildings, **Cat 6 or Cat 7** copper cabling remains relevant. Over distances of up to 100 meters, it offers data rates of 1 to 10 Gbit/s with standard, low-cost equipment. Replacing all internal office cabling with fiber is only economically justified in specific cases (very fast storage equipment, server rooms).

---

## Review quiz

**Question 1** — What is the attenuation of a modern single-mode fiber optic cable at 1,550 nm?
- A) 20 dB/km
- B) 2 dB/km
- C) 0.2 dB/km ✅
- D) 0.02 dB/km

*Answer: C — 0.2 dB/km is the standard attenuation of a single-mode fiber at 1,550 nm. That is approximately 1,000 times less than an Ethernet copper cable at comparable frequencies.*

---

**Question 2** — What is the maximum reach of a Cat 6 copper Ethernet cable without a repeater?
- A) 500 meters
- B) 200 meters
- C) 100 meters ✅
- D) 50 meters

*Answer: C — 100 meters is the standard Ethernet copper limit, defined by the IEEE 802.3 standard. Beyond that, the signal is too degraded.*

---

**Question 3** — Why is fiber optics used in refineries and munitions depots?
- A) Because it costs less
- B) Because it does not conduct electricity and cannot cause a spark ✅
- C) Because it is easier to install
- D) Because it withstands heat better

*Answer: B — Fiber optics does not conduct electricity. It is therefore safe in ATEX environments (explosive atmospheres) where an electrical spark could cause a catastrophe.*

---

**Question 4** — What is FTTN?
- A) Fiber To The Nation — a national fiber network
- B) Fiber To The Node — fiber running to a neighborhood cabinet, with copper for the last kilometer ✅
- C) Fiber To The Network — a mesh fiber network
- D) Fast Transfer To Nodes — a fast transfer protocol

*Answer: B — FTTN is an intermediate solution where fiber runs to a neighborhood cabinet, and existing copper covers the last kilometer to homes. Less performant than FTTH but cheaper to deploy.*

---

## Conclusion

The comparison between fiber optics and copper is not a matter of opinion — it is a matter of physics. Light travels faster, attenuates less, is immune to electromagnetic interference, and can theoretically carry near-unlimited data rates. Copper, despite its many historical merits, is reaching the physical limits of what electrons in metal can do.

The concrete result: where copper lets you watch one HD video, fiber lets you watch 100 4K videos simultaneously. Where copper fears lightning, fiber is indifferent. Where copper holds industries back, fiber sets them free.

In Côte d'Ivoire, the massive deployment of fiber optics is not a luxury — it is infrastructure as essential as roads or electricity for the country's economic development.

---

**Want to master fiber optics technically?** Check out our [fiber optics training programs in Abidjan](/formations-fibre-optique/) — practical programs for beginner technicians and professionals retraining for the sector.
