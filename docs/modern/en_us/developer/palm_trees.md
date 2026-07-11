# Palm Trees

> This document serves as a general guide for adding new palm fruit trees to TFG. And an explanation of class functions.

## [Core Mod Side](https://github.com/TerraFirmaGreg-Team/Core-Modern)

### Step 1) Enum Entry
To add new Palm Fruit Trees first locate the enum class [PalmTrees](https://github.com/TerraFirmaGreg-Team/Core-Modern/blob/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/java/su/terrafirmagreg/core/common/data/PalmTrees.java#L39) and add a new enum entry following the format
```java
    PalmTrees(int defaultGrowthDays, int foliageColorIndex, int minGrowthSize, int maxGrowthSize, int minDrops, int maxDrops, Integer clusterAges, String clusterModelShape, boolean specialCluster, boolean specialFruit, Lifecycle[] stages)
```

 - **defaultGrowthDays:** *Default number of days required for growth.*
 - **foliageColorIndex:** *Sets the color of the leaves based on TFC foliage index (foliage.png). Range from 0 to 255*
 - **minGrowthSize:** *Sets the minimum number of stage 2 trunk blocks for the final growth tree size. (5 blocks will always be placed below)*
 - **maxGrowthSize:** *Sets the maximum number of stage 2 trunk blocks for the final growth tree size. (5 blocks will always be placed below)*
 - **minDrops:** *Sets the minimum number of fruit drops when mature.*
 - **maxDrops:** *Sets the maximum number of fruit drops when mature.*
 - **clusterAges:** *Sets the number of age states for the cluster block.*
 - **clusterModelShape:** *Sets the model shape for the cluster block. Available options: "square", "bundle", "double_bundle", "string"*
 - **specialCluster:** *If false, the cluster block will be automatically generated with {@link PalmClusterBlock}. If true, a dedicated class should be made.*
 - **specialFruit:** *If false, the fruit will be automatically generated as an item. If true, a dedicated class should be made.*
 - **stages:** *Lifecycle stages. Only valid stages are {@link Lifecycle#FRUITING} and {@link Lifecycle#DORMANT}.*

### Step 2) Assets
- Add textures in the palm_tree asset folder for [blocks](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/block/palm_tree), [items](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/item/palm_tree), and [food](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/item/food).
- Add models for [palm heads](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/models/block/palm_tree) although you can just use another palm head as the parent model. But it is still recommended to use unique textures for all palm tree entries to keep them somewhat distinguishable.
- Optional*: add [climate range](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/data/tfg/tfc/climate_ranges/palm_tree) jsons to the data folder to be able to test the trees in the dev environment. But climate data should still be added on the modpack side for consistency.

### Step 3) runData
Run `runData` to generate blockstate, model, and loot jsons.


## [Modpack Side](https://github.com/TerraFirmaGreg-Team/Modpack-Modern)

### Step 1) Climate Range and Fruits
- Add [climate range](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/constants.food.js#L906) data to the constant. Make sure to specify what dimension the tree can be found in. This does not impact anything except for the sapling tooltip information.
- While you are in this file add [fruit info](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/constants.food.js#L678) to the fruit constant. This will generate jams, and other fruit related items/ recipes.

### Step 2) Food Data
- Add [food data](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/food/data.food.js#L95) to your palm tree products.

### Step 3) Assets
- Enable [GEN_JAM_MODELS](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/items.food.js#L62) and start the modpack once to generate jam models if you are adding new fruit types. Remember to set the boolean to false again before pushing.
- Add [jam textures](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/assets/tfg/textures/block/food/jam).
- Add [planter textures](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/assets/tfg/textures/block/palm_tree) for the Firmalife Greenhouse hanging planters. Its just a 3x3 square in the top left corner of a 16x16 texture.

### Step 4) Worldgen
- Create structure nbt files for each height size for each tree and place the structures in the [data folder](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/structures/palm_tree). Remember to fill in the empty spaces with structure voids except for the areas where the palm clusters grow; leave those as air. You can also just copy a pre-existing palm tree structure and use an nbt editor to replace the blocks with the ones from your own palm tree.
- Create [configured feature](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/worldgen/configured_feature/earth/crop/palm_tree) jsons for each tree.
- Create [placed feature](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/worldgen/placed_feature/earth/crop/palm_tree) jsons for each tree.
- Add [biome tags](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/overworld/tags.overworld.js#L551) for the placed features to enable generation.

### Step 5) Field Guide
- Add field guide entries for each new tree in their respective dimension category.

### Optional*)
- Firmalife Greenhouse planter information is automatically generated using the enum. But you can change the register [here](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/food/data.planters.js#L233).
- Electric Greenhouse recipes are automatically generated using the enum. But you can change the register [here](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/aquaponics/recipes.greenhouse.js#L529).

## [Tools Repo Side](https://github.com/TerraFirmaGreg-Team/Tools-Modern)
- Add lang strings for everything [like so](https://github.com/TerraFirmaGreg-Team/Tools-Modern/pull/500/changes)
