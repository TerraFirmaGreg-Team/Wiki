---
title: Advanced Multiblock Converter
order: 4
---
# Advanced Multiblock Converter

## Step 1) Prepare Structure File

### 1.
With your copy/paste gadget in copy mode, select your structure.

<p align="center">
<img width="1020" height="720" alt="copy" src="https://github.com/user-attachments/assets/3f9ac011-5081-49ea-ab52-e7483183e5eb" />
</p>

### 2.
Put your gadget into the template manager. You can put in a piece of paper and hit save to make sure its the right structure. Then hit copy to save the json to your clipboard.

<p align="center">
<img width="1024" height="720" alt="manager" src="https://github.com/user-attachments/assets/cabdc85b-1986-4f4c-94a1-ac9981f0fd36" />
</p>

## Step 2) Run The Tool

>The advanced converter is a heavily modified tool originally created by Phoenixvine.
>This tool takes structure information from the Building Gadget's mod and converts it into GT structure format. All files should remain in the same folder.

### Instructions

* Download [Advanced Multiblock Convert.exe](https://github.com/TerraFirmaGreg-Team/Tools-Modern/tree/dev/AdvancedMultiblockConverter/advanced-multiblock-converter) or build with packager.
* Install [Node.js]( https://nodejs.org/en/download) if you don't have it.

### Option 1) Running as Electron App

* Run `Advanced Multiblock Converter.exe`
* Paste json inside the input block.
* Select the start button.
* Apply transformations if needed.
* Copy JS output from the output block.

### Option 2) Running as Batch

* Place your structure text into input.json and save the file.
* Use `Run.bat`
* Select reset to generate the initial structure.
* Select your desired transformations.
* Selecting reset again will restart the transformations.
* Result will go to output.js

### DEV) Running the Packager

* Set the directory:

`
cd <advanced-multiblock-converter location>
`
* Verify node installation:

 `
node -v
`
`
npm -v
`
* Install dependencies:

`
npm install
`
* Build the files:

`
npm run build
`
`
npm run dist
`
* Start the app:

`
npm start
`

## Step 3) Cleanup Output
You will likely have to reformat the output a bit. Here is the example above cleaned up in Java form:

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
