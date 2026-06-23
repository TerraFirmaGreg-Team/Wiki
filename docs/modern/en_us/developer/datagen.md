---
title: Java Datagen
order: 5
---
#### Setup
Create the file `gradle-local.properties` and enter the following:

> ⚠️Important: When setting the instance_path use forward slashes, not back slashes.

If the TFG-Core jar file in your modpack mods folder should be automatically replaced with the latest one from core, whenever core is rebuilt
```properties
enable_copy_to_instance = true 
```

Path to modpack folder
```properties
instance_path = C:/path//to//modpack
```

## Default datagen

By default, registrate will look for a texture named the same as the block ID, and use that as a texture for all sides of the block. For items, registrate will look for a simple texture and use that for the item. 

To disable datagen for a block:

```java
.setData(ProviderType.LOOT, NonNullBiConsumer.noop())
```

```java
.setData(ProviderType.BLOCKSTATE, NonNullBiConsumer.noop())
```

To disable datagen for an item:

```java
.setData(ProviderType.ITEM_MODEL, NonNullBiConsumer.noop())
```

## Machines

Machine builders have a bunch of methods e.g. `workableTieredHullModel`, `colorOverlayTieredHullModel` which you call to setup a model provider for a machine.

## Items

Call `.model` on an item definition.

Example with multiple model layers: 
```java
.model(ModelUtils.layeredItemModel(
  TFGCore.id("item/wireless_card/wireless_card_base"),
  TFGCore.id("item/wireless_card/wireless_card_layer1"),
  TFGCore.id("item/wireless_card/wireless_card_layer2")))
```

## Blocks

### Blockstate and Models

Datagen is done by using the `.blockState` method in a registrate block definition. The blockState method takes a function with two args, the datagen context and the model provider. The `ModelUtils` file has util methods for creating the most common block models.

For example: 

Creates an active/inactive block model using the given texture, assuming the active texture has the suffix _active
```java
ModelUtils.createActiveModel(TFGCore.id("block/casings/machine_casing_vacuum_engine_intake"))
```

Looks for an existing active/inactive block model and creates a blockstate based on that.
```java
ModelUtils.existingActiveModel(TFGCore.id("block/casings/bioculture_rotor_secondary"))
```

Creates a simple block model with the specified texture.
```java
GTModels.cubeAllModel(TFGCore.id("block/casings/electromagnetic_accelerator"))
```

#### Using existing models and defining textures to be used

```java
(datagenContext, modelProvider) -> modelProvider.models()
                .withExistingParent(datagenContext.getName(), GTCEu.id("block/cube_2_layer/all"))
                .texture("bot_all", textureResourceLocation)
                .texture("top_all", texture2ResourceLocation)
```

#### Defining custom block states

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

### Defining items within block definitions

Creates a block item that uses the block model for rendering.
```java
.simpleItem()
``` 

Returns a block item builder
```java
.item()
``` 

### Defining loot tables and block drops

By default, blocks will drop themselves. Use the `.loot()` method to define custom drops

Examples: 

Drop a different item
```java
.loot((ctx, b) -> ctx.dropOther(b, MARS_DIRT))
```
```java
.loot((ctx, b) -> ctx.createShearsOnlyDrop(b, ITEM))
```