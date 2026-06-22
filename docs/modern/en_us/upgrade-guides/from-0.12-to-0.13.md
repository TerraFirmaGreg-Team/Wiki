---
title: 0.12 → 0.13
order: 5
---
**Please remember to create a new instance of TFG and copy your world across into it, instead of upgrading it in-place!** This is both safer, and also lets you preview your upgraded world, so you can go back and prepare it better.

If you're upgrading from 0.11, please follow the [0.12 upgrade instructions first](/modern/en_us/upgrade-guides/from-0.11-to-0.12).

Worlds from 0.12 are safe to update to 0.13, but there are some important things to know:

# Overworld worldgen
Due to some issues with servers, we've changed the default world generation for worlds from pre-0.12 to the **new worldgen**.

- If your world was created in 0.12 then you don't have to do anything.
- If your world was created before 0.12 and you've already changed it to use the new worldgen, you don't have to do anything.
- If your world was created before 0.12 and you want to keep the old worldgen, you will need to change the `worldgenOverrides` setting in `defaultconfigs/tfg-server.toml` to `["minecraft:overworld=0"]`.

You don't have to do anything to get the new mineshafts, just explore new chunks.

In the future (likely in several months) we may drop support for the old worldgen, as it is becoming a lot of work to keep both available.

# Beneath overhaul
We've completely reworked the Beneath. It's now significantly taller, so you will need to wipe the dimension in order to not be teleported above bedrock.

To do this, first make a backup of your save, Next, make sure you've left the Beneath and taken anything with you that you want to keep, then save and quit your game. After, simply go to your minecraft instance folder, then inside `saves`, then inside the folder named after your save. Delete the folder called `DIM-1`. Then launch your game as normal. The process is the same for servers.

⚠ ⚠ ⚠ **MAKE A BACKUP BEFORE DOING THIS** ⚠ ⚠ ⚠

If you've ever opened an HV or LuV Prospector's **Fluid Mode** in the Beneath, or used a **Fluid Drilling Rig**, you will also need to delete your `.minecraft/saves/(world name)/data/gtceu_bedrock_fluid.dat` file, as the fluid veins have also changed.

# Food rework
TFC Gourmet has been removed. If you've got any food or fluids from that mod, eat them before upgrading, as they will all disappear afterwards.

We will continue to add new foods (including some that TFC Gourmet added) as our own in-house items so we have full control over their implementation and balancing.

# Fluid Logistics
_Create: Factory Logistics_ has been replaced with _Create Fluid Logistics_, a different fluid addon for Create's logistics system that's less buggy.

Jar packagers in your world should be automatically replaced with the new Fluid packagers, and Fluid Gauges should be automatically replaced with normal factory gauges, which can now handle fluids themselves). **If you use a lot of these, please triple check you've made a backup before updating!**

# Shaders
After updating, if your Beneath is entirely tinted red/orange, go to the shader settings > Atmosphere > The Nether Dimension > Color Mode, and change it to "Biome Based", _not_ "Biome Based (Modified)". Alternatively, select a different preset if it says you have a "custom" one.

# Ores
Naquadah has been removed from the Beneath. It has temporarily been moved to the Ostrum Linear Accelerator until it eventually finds a home on a future planet.

Chromium has been completely changed. Due to the introduction of gem slurries, Ruby became the king of both aluminium and chromium, which was an unintended side effect. To resolve this:
- Ruby is now a significantly worse source of aluminium, but still a good source of chromium. It's also now a source of Alumina for circuit boards. 
- Garnet Sand has been massively buffed with its own processing line, involving Yellow Garnet and Uvarovite. You can find it in sandy places in the overworld, or in huge quantities at the bottom of the Beneath. 
- Chromite can be obtained through some ore processing, or you can find it and yellow garnet ores on the Moon.

You unlock easier ways of processing all three as you progress.

# ComputerCraft
We've added a mod to enable UTF-8 support for ComputerCraft.

Existing ComputerCraft programs should continue to work without migration. Programs which already contain valid UTF-8 text should display correctly after installing the mod. Programs which were previously saved with corrupted/mojibake text will need that text corrected manually; simply opening and saving the file again will not automatically recover the original characters.