---
title: Java Datagen
order: 5
---
#### 配置
创建文件 `gradle-local.properties`，并写入如下内容：

> ⚠️ 重要：填写 `instance_path` 时请使用正斜杠 `/`，不要使用反斜杠 `\`。

若希望在每次重新构建 core 后，自动用最新的 TFG-Core jar 替换整合包 mods 文件夹中的对应文件
```properties
enable_copy_to_instance = true 
```

整合包所在路径
```properties
instance_path = C:/path//to//modpack
```

## 默认数据生成

默认情况下，registrate 会查找与方块 ID 同名的贴图，并将其用作该方块六个面的贴图。对于物品，registrate 会查找简单贴图并用作该物品的贴图。

要对方块禁用数据生成：

```java
.setData(ProviderType.LOOT, NonNullBiConsumer.noop())
```

```java
.setData(ProviderType.BLOCKSTATE, NonNullBiConsumer.noop())
```

要对物品禁用数据生成：

```java
.setData(ProviderType.ITEM_MODEL, NonNullBiConsumer.noop())
```

## 机器

机器构建器提供许多方法，例如 `workableTieredHullModel`、`colorOverlayTieredHullModel`，调用它们即可为机器配置模型提供器（model provider）。

## 物品

在物品定义上调用 `.model`。

多模型层示例：

```java
.model(ModelUtils.layeredItemModel(
  TFGCore.id("item/wireless_card/wireless_card_base"),
  TFGCore.id("item/wireless_card/wireless_card_layer1"),
  TFGCore.id("item/wireless_card/wireless_card_layer2")))
```

## 方块

### 方块状态与模型

数据生成通过在 registrate 的方块定义中使用 `.blockState` 完成。`blockState` 方法接受一个带有两个参数的函数：数据生成上下文与模型提供器。`ModelUtils` 文件中提供了用于创建最常见方块模型的工具方法。

例如：

使用给定贴图创建激活/未激活方块模型，并假定激活用贴图带有 `_active` 后缀。
```java
ModelUtils.createActiveModel(TFGCore.id("block/casings/machine_casing_vacuum_engine_intake"))
```

查找已有的激活/未激活方块模型，并据此生成方块状态。
```java
ModelUtils.existingActiveModel(TFGCore.id("block/casings/bioculture_rotor_secondary"))
```

使用指定贴图创建简单方块模型。
```java
GTModels.cubeAllModel(TFGCore.id("block/casings/electromagnetic_accelerator"))
```

#### 使用已有模型并指定要使用的贴图

```java
(datagenContext, modelProvider) -> modelProvider.models()
                .withExistingParent(datagenContext.getName(), GTCEu.id("block/cube_2_layer/all"))
                .texture("bot_all", textureResourceLocation)
                .texture("top_all", texture2ResourceLocation)
```

#### 自定义方块状态

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

### 在方块定义中定义物品

会创建使用方块模型进行渲染的方块物品。
```java
.simpleItem()
``` 

返回方块物品构建器。
```java
.item()
``` 

### 定义战利品表与方块掉落

默认情况下，方块会掉落自身。使用 `.loot()` 方法可定义自定义掉落。

示例：

掉落其他物品
```java
.loot((ctx, b) -> ctx.dropOther(b, MARS_DIRT))
```
```java
.loot((ctx, b) -> ctx.createShearsOnlyDrop(b, ITEM))
```
