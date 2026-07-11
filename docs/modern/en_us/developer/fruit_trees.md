---
title: Creating Fruit Trees
order: 9
---

# Fruit Trees

> This document serves as a general guide for adding new fruit trees to TFG. And an explanation of class functions.

## [Core Mod Side](https://github.com/TerraFirmaGreg-Team/Core-Modern)

### Step 1) Enum Entry
To add new Fruit Trees first locate the enum [FruitTreeType](https://github.com/TerraFirmaGreg-Team/Core-Modern/blob/1560c49084d4981a00c2f7530199fd73c1e0e5d1/src/main/java/su/terrafirmagreg/core/common/data/TFGFruitTree.java#L85) and add a new enum entry following the format
```java
    FruitTreeType(int defaultGrowthDays, Lifecycle[] stages, int floweringLeavesColor, ResourceLocation dimension)
```

- **defaultGrowthDays:** *Default number of days required for growth.*
- **stages:** *Lifecycle stages is a 12-month cycle. Jan - Dec.*
- **floweringLeavesColor:** *RGB color of the leaf particles.*
- **dimension:** *The dimension this fruit tree is found in (Only information for the tooltip).*

### Step 2) Assets
- Add textures in the fruit_tree asset folder for [blocks](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/block/fruit_tree), [items](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/item/fruit_trees), and [food](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/item/food).

### Step 3) runData
Run `runData` to generate blockstate, model, and loot jsons.


## [Modpack Side](https://github.com/TerraFirmaGreg-Team/Modpack-Modern)

### Step 1) Climate Range and Fruits
- Add [climate range](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/constants.food.js#L897) data to the constant.
- While you are in this file add [fruit info](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/constants.food.js#L655) to the fruit constant. This will generate jams, and other fruit related items/ recipes.

### Step 2) Food Data
- Add [food data](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/server_scripts/tfg/food/data.food.js#L79) to your fruit tree products.
- Add [planter data](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/server_scripts/tfg/food/data.planters.js#L193) for the Firmalife Greenhouse bonsai planters.
- add [fruit tree](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfc/constants.js#L194) constant information for generating recipes.

### Step 3) Assets
- Enable [GEN_JAM_MODELS](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/items.food.js#L62) and start the modpack once to generate jam models if you are adding new fruit types. Remember to set the boolean to false again before pushing.
- Add [jam textures](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/textures/block/food/jam).

### Step 4) Worldgen
- Create configured feature jsons for each tree [like so](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/data/tfg/worldgen/configured_feature/nether/crop/lavacado.json).
- Create placed feature jsons for each tree [like so](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/data/tfg/worldgen/placed_feature/nether/crop/lavacado.json).
- Add biome tags for the placed features to enable generation.

### Step 5) Field Guide
- Add field guide entries for each new tree in their respective dimension category.

## [Tools Repo Side](https://github.com/TerraFirmaGreg-Team/Tools-Modern)
- Add lang strings for everything.
