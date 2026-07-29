---
title: 高级多方块转换器
order: 4
---

# 高级多方块转换器

## 步骤 1) 准备结构文件

### 1.

将您的复制/粘贴小工具置于复制模式，选择您的结构。

<p align="center">
<img width="1020" height="720" alt="copy" src="https://github.com/user-attachments/assets/3f9ac011-5081-49ea-ab52-e7483183e5eb" />
</p>

### 2.

将您的小工具放入模板管理器。 您可以放入一张纸并点击保存以确保它是正确的结构。 然后点击复制将 json 保存到您的剪贴板。

<p align="center">
<img width="1024" height="720" alt="manager" src="https://github.com/user-attachments/assets/cabdc85b-1986-4f4c-94a1-ac9981f0fd36" />
</p>

## 步骤 2) 运行工具

> 高级转换器是一个经过大量修改的工具，最初由 Phoenixvine 创建。
> 此工具从 Building Gadget 模组获取结构信息，并将其转换为 GT 结构格式。 所有文件应保留在同一文件夹中。

### 说明

- 下载 [Advanced Multiblock Convert.exe](https://github.com/TerraFirmaGreg-Team/Tools-Modern/tree/dev/AdvancedMultiblockConverter/advanced-multiblock-converter) 或使用打包程序构建。
- 如果你没有安装 [Node.js](https://nodejs.org/en/download)，请安装。

### 选项 1) 作为 Electron 应用运行

- 运行 `Advanced Multiblock Converter.exe`
- 将 JSON 粘贴到输入框内。
- 点击开始按钮。
- 如果需要，应用转换。
- 从输出框复制 JS 输出。

### 选项 2) 作为批处理运行

- 将你的结构文本保存到 input.json 文件。
- 运行 `Run.bat`
- 选择重置以生成初始结构。
- 选择你想要的转换。
- 再次选择重置将重新开始转换。
- 结果将输出到 output.js

### 开发者）运行打包程序

- 设置目录：

`cd <advanced-multiblock-converter 所在目录>`

- 验证 Node 安装：

`node -v`
`npm -v`

- 安装依赖：

`npm install`

- 构建文件：

`npm run build`
`npm run dist`

- 启动应用:

`npm start`

## 步骤 3) 清理输出

您可能需要稍微重新格式化输出。 以下是上面示例清理后的 Java 格式：

```java
			.pattern(definition -> FactoryBlockPattern.start()
				.aisle("       B   B       ", "       B   B       ", "       CCCCC       ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     B       B     ", "     B       B     ", "    CC       CC    ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("       B   B       ", "       CCCCC       ", "   CC         CC   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     B       B     ", "    CC       CC    ", "  C             C  ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("        CCC        ", "   CC         CC   ", " CC             CC ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle(" B B CC     CC B B ", " B C           C B ", " C               C ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     C       C     ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("B B               B", "B C             C B", "C                 C", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("    C   FFF   C B  ", "  C     B B     C  ", "C       B B       C", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        EEE        ", "        GGG        ", "        GGG        ", "        GGG        ")
				.aisle("    C   HIF   C    ", "  C      I      C  ", "C        I        C", "         I         ", "         I         ", "         I         ", "         I         ", "         I         ", "         I         ", "         I         ", "        EIE        ", "        GIG        ", "        GKG        ", "        GGG        ")
				.aisle("    C   FFF   C    ", "  C     B B     C  ", "C       B B       C", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        EEE        ", "        GGG        ", "        GGG        ", "        GGG        ")
				.aisle("B B             B B", "B C             C B", "C                 C", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     C       C     ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle(" B B CC     CC B B ", " B C           C B ", " C               C ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("        CCC        ", "   CC         CC   ", " CC             CC ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     B       B     ", "    CC       CC    ", "  C             C  ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("       B   B       ", "       CCCCC       ", "   CC         CC   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     B       B     ", "     B       B     ", "    CC       CC    ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("       B   B       ", "       B   B       ", "       CCCCC       ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.where("H", Predicates.controller(Predicates.blocks(definition.get())))
				.where("B", Predicates.frames(GTMaterials.StainlessSteel))
				.where("C", Predicates.blocks(ForgeRegistries.BLOCKS.getValue(TFGCore.id("casings/machine_casing_red_solar_panel"))))
				.where("E", Predicates.blocks(ForgeRegistries.BLOCKS.getValue(ResourceLocation.parse("ad_astra:iron_plateblock"))))
				.where("F", Predicates.blocks(ForgeRegistries.BLOCKS.getValue(TFGCore.id("casings/machine_casing_iron_desh")))
					.or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(2).setPreviewCount(1))
					.or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
					.or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(1))
					.or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(1))
					.or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
					.or(Predicates.abilities(PartAbility.OUTPUT_ENERGY).setExactLimit(1))
				)
				.where("G", Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
				.where("I", Predicates.blocks(ForgeRegistries.BLOCKS.getValue(TFGCore.id("casings/machine_casing_iron_desh"))))
				.where("K", Predicates.blocks(ChemicalHelper.getBlock(TagPrefix.block, GTMaterials.Silver)))
				.where(" ", Predicates.any())
				.build()
			)
```
