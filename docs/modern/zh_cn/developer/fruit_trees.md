---
title: 创建果树
order: 9
---

# 果树

> 本文档旨在作为向 TFG 添加新果树的通用指南。 并对类函数进行说明。

## [核心模组侧](https://github.com/TerraFirmaGreg-Team/Core-Modern)

### 步骤 1) 枚举项

要添加新的果树，首先找到枚举类 [FruitTreeType](https://github.com/TerraFirmaGreg-Team/Core-Modern/blob/1560c49084d4981a00c2f7530199fd73c1e0e5d1/src/main/java/su/terrafirmagreg/core/common/data/TFGFruitTree.java#L85) 并按照以下格式添加一个新的枚举项：

```java
    FruitTreeType(int defaultGrowthDays, Lifecycle[] stages, int floweringLeavesColor, ResourceLocation dimension)
```

- **defaultGrowthDays:** _生长所需的天数。_
- **stages:** _生命周期阶段，为期 12 个月。 1 月至 12 月。_
- **floweringLeavesColor:** _开花时树叶粒子的 RGB 颜色。_
- **dimension:** _该果树所在的维度（仅用于工具提示信息）。_

### 步骤 2) 资产文件

- 在 fruit_tree 资产目录中添加以下路径的纹理： [方块](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/block/fruit_tree)，[物品](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/item/fruit_trees)，和[食物](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/item/food).

### 步骤 3) 运行数据生成

运行 `runData` 以生成 blockstate（方块状态）、model（模型）和 loot（战利品）的 JSON 文件。

## [整合包侧](https://github.com/TerraFirmaGreg-Team/Modpack-Modern)

### 步骤 1) 气候范围与果实

- 将[气候范围](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/constants.food.js#L897)数据添加到常量中。
- 在此文件中，同时将[果实信息](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/constants.food.js#L655)添加到水果常量中。 这将生成果酱以及其他与水果相关的物品/配方。

### 步骤 2) 食物数据

- 为果树的产品添加[食物数据](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/server_scripts/tfg/food/data.food.js#L79)。
- 为Firmalife温室种植盆添加[种植盆数据](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/server_scripts/tfg/food/data.planters.js#L193)。
- 为生成配方添加[果树](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfc/constants.js#L194)常量信息。

### 步骤 3) 资产文件

- 如果你正在添加新的水果类型，请启用[GEN_JAM_MODELS](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/items.food.js#L62)并启动一次整合包以生成果酱模型。 在推送前请记得将布尔值设回 false。
- 添加[果酱纹理](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/textures/block/food/jam)。

### 步骤 4) 地形生成

- 为每棵树创建配置特征（configured_feature）的 JSON 文件，[点击查看样例](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/data/tfg/worldgen/configured_feature/nether/crop/lavacado.json)。
- 为每棵树创建放置特征（placed_feature）的 JSON 文件，[点击查看样例](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/data/tfg/worldgen/placed_feature/nether/crop/lavacado.json)。
- 为放置特征添加生物群系标签以启用生成。

### 步骤 5) 野外手册

- 在各自维度的分类下，为每棵新树添加野外手册条目。

## [工具仓库侧](https://github.com/TerraFirmaGreg-Team/Tools-Modern)

- 为所有内容添加语言字符串。
