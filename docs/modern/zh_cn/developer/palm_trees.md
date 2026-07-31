---
title: 创建棕榈树
order: 8
---

# 棕榈树

> 本文档旨在作为向 TFG 添加新棕榈果树的通用指南。 并对类函数进行说明。

## [核心模组侧](https://github.com/TerraFirmaGreg-Team/Core-Modern)

### 步骤 1) 枚举项

要添加新的棕榈果树，首先找到枚举类 [PalmTrees](https://github.com/TerraFirmaGreg-Team/Core-Modern/blob/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/java/su/terrafirmagreg/core/common/data/PalmTrees.java#L39) 并按照以下格式添加一个新的枚举项：

```java
    PalmTrees(int defaultGrowthDays, int foliageColorIndex, int minGrowthSize, int maxGrowthSize, int minDrops, int maxDrops, Integer clusterAges, String clusterModelShape, boolean specialCluster, boolean specialFruit, Lifecycle[] stages)
```

- **defaultGrowthDays:** _生长所需的天数。_
- **foliageColorIndex:** _根据 TFC 树叶索引（foliage.png）设置树叶颜色。 取值范围 0 到 255。_
- **minGrowthSize:** _设定最终成树尺寸中第二阶段树干方块的最小数量 （下方始终会放置 5 个方块）。_
- **maxGrowthSize:** _设定最终成树尺寸中第二阶段树干方块的最大数量 （下方始终会放置 5 个方块）。_
- **minDrops:** _成熟时掉落果实的最小数量。_
- **maxDrops:** _成熟时掉落果实的最大数量。_
- **clusterAges:** _设定果簇方块的状态数量。_
- **clusterModelShape:** _设定果簇方块的模型形状。 可用选项："square"（方形）、"bundle"（束）、"double_bundle"（双束）、"string"（串）。_
- **specialCluster:** _若为 false，果簇方块将由 {@link PalmClusterBlock} 自动生成。 若为 true，则需要编写专用类。_
- **specialFruit:** _若为 false，果实将自动生成为物品。 若为 true，则需要编写专用类。_
- **stages:** _生命周期阶段。 仅允许 {@link Lifecycle#FRUITING}（结果）和 {@link Lifecycle#DORMANT}（休眠）状态。_

### 步骤 2) 资产文件

- 在 palm_tree 资产目录中添加以下路径的纹理：[方块](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/block/palm_tree)，[物品](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/item/palm_tree)和[食物](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/item/food)。
- 添加[棕榈树冠](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/models/block/palm_tree)的模型，不过你可以直接使用其他棕榈树冠作为父模型。 但仍建议为所有棕榈树使用独特的纹理，以保持可区分性。
- 可选\*：将[气候范围](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/data/tfg/tfc/climate_ranges/palm_tree)JSON文件添加到数据文件夹中，以便在开发环境中测试树木。 但为了保持一致性，气候数据仍应在整合包侧添加。

### 步骤 3) 运行数据生成

运行 `runData` 以生成 blockstate（方块状态）、model（模型）和 loot（战利品）的 JSON 文件。

## [整合包侧](https://github.com/TerraFirmaGreg-Team/Modpack-Modern)

### 步骤 1) 气候范围与果实

- 将[气候范围](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/constants.food.js#L906)数据添加到常量中。 确保指定树木所在的维度。 这除了影响树苗的工具提示信息外，不会产生其他影响。
- 在此文件中，同时将[果实信息](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/constants.food.js#L678)添加到水果常量中。 这将生成果酱以及其他与水果相关的物品/配方。

### 步骤 2) 食物数据

- 为您棕榈树的产品添加[食物数据](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/food/data.food.js#L95)。

### 步骤 3) 资产文件

- 如果你正在添加新的水果类型，请启用[GEN_JAM_MODELS](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/items.food.js#L62)并启动一次整合包以生成果酱模型。 在推送前请记得将布尔值设回 false。
- 添加[果酱纹理](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/assets/tfg/textures/block/food/jam)。
- 为Firmalife温室悬挂种植盆添加[纹理](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/assets/tfg/textures/block/palm_tree)。 只需在 16x16 纹理的左上角画一个 3x3 的方块即可。

### 步骤 4) 地形生成

- 为每种树、每种高度尺寸创建结构 NBT 文件，并将结构放置在[数据目录](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/structures/palm_tree)中。 记住用结构空位填充空白区域，但棕榈果簇生长的区域除外——这些区域保留为空气。 你也可以直接复制一个已有的棕榈树结构，并使用 NBT 编辑器将方块替换为你自己的棕榈树方块。
- 为每棵树创建[配置特征](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/worldgen/configured_feature/earth/crop/palm_tree)的 JSON 文件。
- 为每棵树创建[放置特征](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/worldgen/placed_feature/earth/crop/palm_tree)的 JSON 文件。
- 为放置特征添加[生物群系标签](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/overworld/tags.overworld.js#L551)以启用生成。

### 步骤 5) 野外手册

- 在各自维度的分类下，为每棵新树添加野外手册条目。

### 可选\*)

- Firmalife温室种植盆信息会使用枚举自动生成。 但你可以在[此处](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/food/data.planters.js#L233)更改注册。
- 电力温室配方会使用枚举自动生成。 但你可以在[此处](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/aquaponics/recipes.greenhouse.js#L529)更改注册。

## [工具仓库侧](https://github.com/TerraFirmaGreg-Team/Tools-Modern)

- 为所有内容添加语言字符串，[点击查看样例](https://github.com/TerraFirmaGreg-Team/Tools-Modern/pull/500/changes)。
