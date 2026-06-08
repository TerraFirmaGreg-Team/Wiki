---
title: Worldgen Notes
order: 6
---
## Noise settings
**Ore veins**: This refers to the [large noodley veins](https://minecraft.wiki/w/Ore_vein) in vanilla. Turn them off! You will also want to set the `vein_gap`, `vein_ridged`, and `vein_toggle` to `0`.

**Sea Level**: Any air block below this height will be replaced with what's in `default_fluid`.

**Default Fluid**: Used with `sea_level`. You can always specify `minecraft:air` as the fluid if you don't want this.

**Noise**: `min_y` is the bottom of the dimension, but doesn't place bedrock by itself. `height` is the total height counting up from min_y (so its value does not = the build limit). `size_horizontal`/`size_vertical` affects performance of noise. Bigger numbers are more performant but make the noise look like jpg artifacts.

**Spawn Target**: This specifies "good conditions" for a new player to spawn in a brand new world, so they aren't put in the middle of the ocean (usually). We aren't using this, since ad astra keeps your X/Z coordinates when traveling between dims.

### Noise Router
**Aquifers**: These stop the entire underground from being flooded by the default fluid. [Here](https://gist.github.com/jacobsjo/0ce1f9d02e5c3e490e228ac5ad810482)'s a guide on how to use them.

**Final Density**: This builds the [huge caves](https://cdn.discordapp.com/attachments/750811307925831841/1396244346927317064/2025-07-19_22.36.08.png?ex=687d6161&is=687c0fe1&hm=0dd064a1df91e32120720f2994fffce8da2e5e54d019c61f82b9d8b0d267783f&) with the giant pillars in them.

**Temperature** and **Vegetation**: These affect biome placement.

**Lava** set it to `0` if you don't want lava at the bottom of your dimension.

## Density Functions
These all affect the initial generation of the dimension, for what's solid and what's air.

Here's what all the vanilla ones do:
* **Offset**: Mostly controls Y level.
* **Factor**: Controls how much the underlying 3D noise affects the terrain. Low numbers get you the really tall pillars you see in windswept biomes or badlands.
* **Jaggedness**: Don't know, but it's zero in oceans?
* **Caves/Pillars**: Affects the sort of "lumpiness" you see on slopes.

### Surface Rule
The density functions build up what is solid and what is air, while the surface rule decides what block to place in all of the solid area. It "executes" from top to bottom (in the file, not in the world), and once something sets a block, nothing else here can affect it.

## Carvers
These run _after_ the noise settings. They're responsible for the randomly placed canyons and thin tunnels. They also have their own settings for filling them with lava at a certain Y level, if that's something you want to control.

There's also a kind of feature placement type that runs for every block that a carver removed. Useful for replacing the ceilings with hardened rock. (Check out our own `hardening.json` one)

## Structures
[Here](https://gist.github.com/GentlemanRevvnar/387f9ee28613715c187a36dbc1dff35d)'s a great guide on how to create structures, including how to use jigsaws.