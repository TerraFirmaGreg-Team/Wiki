---
title: Java Datagen
order: 5
---

#### Налаштування

Створи файл `gradle-local.properties` і введи наступне:

> ⚠️Важливо: під час встановлення instance_path використовуй прямі слеші (/), а не зворотні (\).

Якщо jar‑файл TFG-Core у теці mods твого модпаку має автоматично замінюватися на найновіший із core щоразу після його перескладання

```properties
enable_copy_to_instance = true 
```

Шлях до теки модпаку

```properties
instance_path = C:/path//to//modpack
```

## Типовий datagen

Типово registrate шукатиме текстуру з назвою, що збігається з ID блока, і використовуватиме її як текстуру для всіх сторін блока. Для предметів registrate шукатиме просту текстуру й використовуватиме її для цього предмета.

Щоб вимкнути datagen для блока:

```java
.setData(ProviderType.LOOT, NonNullBiConsumer.noop())
```

```java
.setData(ProviderType.BLOCKSTATE, NonNullBiConsumer.noop())
```

Щоб вимкнути datagen для предмета:

```java
.setData(ProviderType.ITEM_MODEL, NonNullBiConsumer.noop())
```

## Машини

Будівники машин мають низку методів, наприклад `workableTieredHullModel`, `colorOverlayTieredHullModel`, які викликаються для налаштування постачальника моделей для машини.

## Предмети

Виклич `.model` для визначення предмета.

Приклад із кількома шарами моделі:

```java
.model(ModelUtils.layeredItemModel(
  TFGCore.id("item/wireless_card/wireless_card_base"),
  TFGCore.id("item/wireless_card/wireless_card_layer1"),
  TFGCore.id("item/wireless_card/wireless_card_layer2")))
```

## Блоки

### Blockstate та моделі

Datagen виконується за допомогою методу `.blockState` у визначенні блока через registrate. Метод blockState приймає функцію з двома аргументами: контекстом datagen та постачальником моделей. Файл `ModelUtils` містить допоміжні методи для створення найпоширеніших моделей блоків.

До прикладу:

Створює активну/неактивну модель блока з використанням заданої текстури, припускаючи, що активна текстура має suffix _active

```java
ModelUtils.createActiveModel(TFGCore.id("block/casings/machine_casing_vacuum_engine_intake"))
```

Шукає наявну активну/неактивну модель блока та створює blockstate на її основі.

```java
ModelUtils.existingActiveModel(TFGCore.id("block/casings/bioculture_rotor_secondary"))
```

Створює просту модель блока із заданою текстурою.

```java
GTModels.cubeAllModel(TFGCore.id("block/casings/electromagnetic_accelerator"))
```

#### Використання наявних моделей та визначення текстур для застосування

```java
(datagenContext, modelProvider) -> modelProvider.models()
                .withExistingParent(datagenContext.getName(), GTCEu.id("block/cube_2_layer/all"))
                .texture("bot_all", textureResourceLocation)
                .texture("top_all", texture2ResourceLocation)
```

#### Визначення власних станів блока

```java
(ctx, prov) -> {
  /// Creates a new model for the inactive block state
  var inactive = prov.models().cubeAll(ctx.getName(), inactiveTexture)
  /// Looks for an existing model for the active block state
  var active = prov.models().getExistingFile(activeModelPath);

  prov.getVariantBuilder(ctx.getEntry()).partialState().with(GTBlockStateProperties.ACTIVE, false)
                .modelForState().modelFile(inactive).addModel()
                .partialState().with(GTBlockStateProperties.ACTIVE, true)
                .modelForState().modelFile(active).addModel();
}
```

### Визначення предметів у межах визначень блока

Створює блок‑предмет, який використовує модель блока для відтворення.

```java
.simpleItem()
```

Повертає будівник блок‑предмета

```java
.item()
```

### Визначення таблиць здобичі та випадань блоків

Типово блоки випадатимуть самі. Використовуй метод `.loot()`, щоб визначити власні випадання.

Приклади:

Випадатиме інший предмет

```java
.loot((ctx, b) -> ctx.dropOther(b, MARS_DIRT))
```

```java
.loot((ctx, b) -> ctx.createShearsOnlyDrop(b, ITEM))
```