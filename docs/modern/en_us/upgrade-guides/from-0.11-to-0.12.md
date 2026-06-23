---
title: 0.11 → 0.12 
order: 4
---
# 0.11 → 0.12 Upgrade guide

## Warnings & known issues
**Please remember to create a new instance of TFG and copy your world across into it, instead of upgrading it in-place!** This is both safer, and also lets you preview your upgraded world, so you can go back and prepare it better.

If you're upgrading from 0.10, please follow the [0.11 upgrade instructions first](/modern/en_us/upgrade-guides/from-0.10-to-0.11).

Worlds from 0.11 are safe to update to 0.12, but there are some important things to know:

# New Fluid Veins
We have completely redone the overworld fluid veins so some of them depend on climate and biome. As a consequence, the fluid veins you used to have around your base will likely be different than before. Check out the new EMI tab to find out where to find new good veins you can move your fluid rigs to.

If your chunks have no fluid at all, try closing your game, deleting your `.minecraft/saves/(world name)/data/gtceu_bedrock_fluid.dat` file, and then launching your game again. This clears gregtech's cache of fluid veins, forcing it to generate new ones.

# New Worldgen
0.12 has **new overworld world generation**. You do not have to make a new world to update.

## If you have an **old** world and you want to continue using **old** worldgen

You don't have to do anything. Your world will continue to generate new chunks with the old worldgen, though it will have some of the new things like new crops and fluid vein features.

## If you have an **old** world and you want to use the **new** worldgen

Open the `defaultconfigs/tfg-server.toml` file, and at the very bottom, replace `worldgenOverrides = []` with `worldgenOverrides = ["minecraft:overworld=1"]`. **You will need to make sure your config has this line every time you update in the future.**

Note that this _will_ cause ugly chunk boundaries. The shape of continents is roughly the same, so if this is something you care about, generate your whole continent before upgrading, so then the chunk borders will be in the ocean. 

⚠ ⚠ ⚠ **MAKE A BACKUP BEFORE DOING THIS** ⚠ ⚠ ⚠

## If you want to make a **new** world with **new** worldgen

Just create a new world as usual. Your world will remember that it was created in the new worldgen and you don't have to touch any configs.

## If you want to make a **new** world with **old** worldgen

Create your world in 0.11.28, then update. Or start in 0.12 but set `worldgenOverrides = ["minecraft:overworld=0"]` before generating a world.

## Custom Spawn Locations

When creating your world, you are now able to select where your worldspawn will be. On a multiplayer server, all players will spawn at this spawn point like they would normally.

***
Note that TFC is still changing its 1.21 worldgen, and we will be backporting future changes.