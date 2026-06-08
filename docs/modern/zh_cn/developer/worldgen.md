---
title: 世界生成说明
order: 6
---
## 噪声设置
**Ore veins（矿脉）**：这是指原版中[巨大的面条状矿脉](https://minecraft.wiki/w/Ore_vein)。请关闭它们！您还需要将 `vein_gap`、`vein_ridged` 和 `vein_toggle` 设置为 `0`。

**Sea Level（海平面）**：低于此高度的任何空气方块将被替换为 `default_fluid` 中指定的流体。

**Default Fluid（默认流体）**：与 `sea_level` 配合使用。如果您不需要此功能，可以始终指定 `minecraft:air` 作为流体。

**Noise（噪声）**：`min_y` 是维度的底部，但本身不会放置基岩。`height` 是从 min_y 开始计算的总高度（因此其值不等于建筑高度限制）。`size_horizontal`/`size_vertical` 影响噪声的性能。数值越大性能越好，但会使噪声看起来像 JPG 压缩伪影。

**Spawn Target（生成目标）**：这为全新世界中新玩家的生成指定了"良好条件"，这样他们就不会（通常）被放在海洋中间。我们不使用这个，因为 Ad Astra 在维度间旅行时会保持您的 X/Z 坐标。

### Noise Router（噪声路由器）
**Aquifers（含水层）**：这些可以防止整个地下被默认流体淹没。[这里](https://gist.github.com/jacobsjo/0ce1f9d02e5c3e490e228ac5ad810482)有一个关于如何使用它们的指南。

**Final Density（最终密度）**：这用于生成带有巨大支柱的[大型洞穴](https://cdn.discordapp.com/attachments/750811307925831841/1396244346927317064/2025-07-19_22.36.08.png?ex=687d6161&is=687c0fe1&hm=0dd064a1df91e32120720f2994fffce8da2e5e54d019c61f82b9d8b0d267783f&)。

**Temperature（温度）**和**Vegetation（植被）**：这些影响生物群系的分布。

**Lava（岩浆）**：如果您不希望您的维度底部有岩浆，请将其设置为 `0`。

## Density Functions（密度函数）
这些都影响维度的初始生成，决定什么是固体，什么是空气。

以下是所有原版函数的作用：
* **Offset（偏移）**：主要控制 Y 轴层级。
* **Factor（因子）**：控制底层 3D 噪声对地形的影响程度。较低的数值会得到您在风袭生物群系或恶地中看到的非常高的支柱。
* **Jaggedness（锯齿度）**：不清楚，但在海洋中为零？
* **Caves/Pillars（洞穴/支柱）**：影响您在斜坡上看到的那种"凹凸不平"的程度。

### Surface Rule（表面规则）
密度函数构建了什么是固体和什么是空气，而表面规则则决定在所有固体区域放置什么方块。它从上到下执行（在文件中，而不是在世界中），一旦某个东西设置了一个方块，这里的其他任何东西都不能影响它。

## Carvers（雕刻器）
这些在噪声设置_之后_运行。它们负责随机放置的峡谷和细长隧道。如果您想控制，它们还有自己的设置，用于在特定 Y 层级用岩浆填充它们。

还有一种特性放置类型，会为雕刻器移除的每个方块运行。适用于将天花板替换为硬化岩石。（查看我们自己的 `hardening.json`）

## Structures（结构）
[这里](https://gist.github.com/GentlemanRevvnar/387f9ee28613715c187a36dbc1dff35d)有一个关于如何创建结构的很棒的指南，包括如何使用拼图结构。