---
title: Advanced Multiblock Converter
order: 4
---

# Advanced Multiblock Converter

## Крок 1) Підготовка файлу структури

### 1.

Переведіть свій ґаджет копіювання у режим копіювання та виділіть структуру.

<p align="center">
<img width="1020" height="720" alt="copy" src="https://github.com/user-attachments/assets/3f9ac011-5081-49ea-ab52-e7483183e5eb" />
</p>

### 2.

Помістіть свій ґаджет у менеджера шаблонів. Ти можеш покласти туди аркуш паперу та натиснути "Зберегти", щоб переконатися, що це саме та структура. Після цього натисни «Копіювати», щоб зберегти Json-код у свій буфер обміну.

<p align="center">
<img width="1024" height="720" alt="manager" src="https://github.com/user-attachments/assets/cabdc85b-1986-4f4c-94a1-ac9981f0fd36" />
</p>

## Крок 2) Запуск інструменту

> Advanced Converter — це сильно модифікований інструмент, який створив Phoenixvine.
> Цей інструмент бере інформацію про структуру з моду Building Gadgets і конвертує її у формат структур GT. Усі файли мають залишатися в тій самій теці.

### Інструкції

- Завантаж [Advanced Multiblock Convert.exe](https://github.com/TerraFirmaGreg-Team/Tools-Modern/tree/dev/AdvancedMultiblockConverter/advanced-multiblock-converter) або скомпілюй програму через packager.
- Встанови [Node.js](https://nodejs.org/en/download) якщо у тебе його немає.

### Варіант 1) Запустити як Electron App

- Запусти `Advanced Multiblock Converter.exe`
- Встав json всередину блоку введення.
- Вибери кнопку «Start».
- Застосуй трансформації, якщо це необхідно.
- Скопіюй готовий JS-код із блоку виведення.

### Варіант 2) Запуск у пакетному режимі

- Помісти текст своєї структури в input.json і збережи файл.
- Використовуй `Run.bat`
- Вибери «reset», щоб згенерувати початкову структуру.
- Вибери бажані трансформації.
- Вибери «reset» ще раз, щоб скинути й почати перетворення заново.
- Результат буде збережено в output.js

### DEV) Запуск Packager'а

- Встанови шлях до теки:

`cd <advanced-multiblock-converter location>`

- Перевір, чи встановлено Node:

`node -v`
`npm -v`

- Встанови залежності:

`npm install`

- Збери файли:

`npm run build`
`npm run dist`

- Запусти додаток:

`npm start`

## Крок 3) Очищення вихідних даних

Швидше за все, тобі доведеться трохи відформатувати отриманий результат. Ось очищений та приведений до вигляду Java коду, приклад згаданий вище:

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
