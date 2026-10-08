---
title: Automating the ME Resonance Fabricator & ME Resonance Charger
order: 3
---
# ME Resonance Fabricator & ME Resonance Charger Automation

Automating Certus Bud replacement using Applied Energistics 2 Spatial I/O Ports and wire length decay.

Using simple redstone with MoreRed components ensured a reliable way to swap two different buds between MERF and MERC to keep fastest recipe timers.


## Setup Requirements

*  **Two AE2 Spatial I/O Ports**
*  **Two AE2 2³ Spatial Storage Cells**
* **MoreRed Red Alloy Cable of two different colours**
* **MoreRed NOT Gate, AND Gate, Pulse Gate**
* **Bundled Cable Relay Plate**
* **Machine Controller Cover**
* **Any Two Robot Arms**
* **Some Item Pipes**
* **Three Repeaters**
* **Redstone Torch**

## Logic Breakdown

### 1. Main Reactor Signal (BLUE)
* Uses wire length signal decay to trigger the `NOT` gate when quality drops below the threshold.
* **Chipped or above:** 2 blocks of redstone dust.
* **Flawed or above:** 3 blocks of redstone dust.
* **Flawless or above:** 4  blocks of redstone dust.
* **Exquisite:** 5 blocks of redstone dust.

> **Note:** Using standard Comparator subtraction for Certus Block detection can result in infinite swap loops because `1 - 1 <= 0`. Replaces subtraction logic with Red Alloy Cable signal decay and a `NOT` gate resolves this issue.

### 2. Reserve / Charger Signal (WHITE)
* Connects from the secondary port through an `AND` gate interlock to ensure the spent bud is only swapped when a fully recharged bud is ready, apply same logic for redstone dust length as BLUE wire does.

### 3. Double Pulse With Delay Generator
* Adding a Pulse Generator with two different repeater intervals ensures the IO port activates two times to *pick up* and *put down* the certus bud block.

> **Note:** Have both certus quartz buds placed before powering the redstone circuitry.

### 4. Spatial Cell Rotation
To rotate the Spatial Storage Cells between ports:
* Run **two separate item pipe lines**.
* Extract from the **bottom** of Port A and insert into the **top** of Port B.
* Extract from the **bottom** of Port B and insert into the **top** of Port A.
* Use Robot Arms on Insert mode to pipe.
---

### Images Showing The Set Up

![MERF Automation Guide](https://github.com/TerraFirmaGreg-Team/Wiki/blob/main/public/MERF%20Automation%20Guide.png?raw=true)

![MERF Automation Guide](https://github.com/TerraFirmaGreg-Team/Wiki/blob/main/public/MERF%20Automation%20Guide2.png?raw=true)