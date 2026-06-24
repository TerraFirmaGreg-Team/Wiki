---
title: 开发速查表
order: 1
---

## 速查表

本页面的目的是供开发者记录有用的函数，以备将来使用。如果您有任何值得分享的 JavaScript 或 Java 代码，请放在这里。 如果您有任何值得分享的 JavaScript 或 Java 代码，请放在这里。

***

# JavaScript：

## 标签转数组

以下是将物品标签转换为数组的示例，您可以根据需要省略任何部分。

```js
	const tag_array = Ingredient.of('#forge:tag').itemIds.toArray().map(String);
```

- .itemIds
  这用于访问该材料标签中的物品 ID 列表。 结果是一个 Java Set。
- .toArray()
  这将列表（一个 Java Set）转换为 JavaScript 数组。
- .map(String)
  这将数组中的每个物品 ID 转换为字符串。 大多数 js 函数都需要此步骤，但并非全部。

## 标签减法

以下是在配方中使用数组来生成相同数组（但不包括原始物品）的示例。 适用于切石机、染色等。

```js
	const tag_array = Ingredient.of('#forge:tag').itemIds.toArray().map(String);

	tag_array.forEach(item => {
		event.stonecutting(item, 
			Ingredient.of('#forge:tag').subtract(item)
		).id(`tfg:stonecutter/${item.replace(/:/g, "/")}`)
	})
```

注意：如果您使用多个输入或多个减法，则必须按以下示例格式编写：

```js
	let example = Ingredient.of('#forge:tag').subtract('item:1').subtract('item:2').withCount(8)
```

## JavaScript 转 JSON

以下示例用于盔甲纹饰构建器。

```js
     materials.forEach(material => {
         const trimfilepaths = [
           `kubejs/data/minecraft/trim_material/${material.materialName}.json`,
           `kubejs/data/tfc/trim_material/${material.materialName}.json`
         ];
  
         const newtrimdata = {
           asset_name: material.materialName,
           description: {
             color: material.nameColor,
             translate: `trim_material.tfc.${material.materialName}`
           },
           ingredient: material.itemName,
           item_model_index: material.indexNumber
         };
  
         trimfilepaths.forEach(trimfilepaths => {
           const existingData = JsonIO.read(trimfilepaths);
  
           // Only write if the file is missing or contents are different
           if (JSON.stringify(existingData) !== JSON.stringify(newtrimdata)) {
             JsonIO.write(trimfilepaths, newtrimdata);
           }
         });
       });
```

1. 声明文件路径。 （上例中的 `trimfilepaths`）
2. 创建一个包含 JSON 信息的常量版本。 （上例中的 `newtrimdata`）
3. 对每个文件路径，读取其内容，如果缺失则写入新数据。 （上例中的 `existingData`）

## 打印配方 JSON 到日志

用于查看当前配方 JSON 的编写方式，以便进行编辑。

```js
	event.forEachRecipe({ id: string }, (recipe) => {
		console.log(recipe.json.toString());
	});
```

- 您可以将 `{id: string}` 替换为任何 `kubejs` 配方方法；例如 `{type: string}` 或 `{mod: string}`。

## 向已存在的配方添加电路

预制的实用脚本可在以下位置找到：[gtceu/utility.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/gregtech/utility.js)

全局数组在：[gtceu/constants.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/gtceu/constants.js)

您可以通过覆盖其 json 来向 gtceu 添加电路编号，如下所示：

```js
	event.findRecipes({ id: string }).forEach(recipe => {
		// Get the existing "inputs" JsonObject
		const inputs = recipe.json.get("inputs");

		// Get the current item array or create a new one
		const itemArray = inputs.has("item") ? Java.from(inputs.get("item")) : [];

		// Push the circuit input Json
		itemArray.push({
			content: {
				type: "gtceu:circuit",
				configuration: 1
			},
			chance: 0,
			maxChance: 10000,
			tierChanceBoost: 0
		});

		// Set the updated item array back into the inputs
		inputs.add("item", itemArray);

		// Re-apply modified inputs into recipe JSON
		recipe.json.add("inputs", inputs);
	});
```

您也可以直接覆盖 inputs，这将移除任何其他已存在的输入：

```js
	event.findRecipes({ id: string }).forEach(recipe => {
			recipe.json.add("inputs", 
				{
					item: [
						{
							content: {
							type: "gtceu:circuit",
							configuration: 1
							},
							chance: 0,
							maxChance: 10000,
							tierChanceBoost: 0
						}
					]
				}
			)
		})
```

- 您可以将 `{id: string}` 替换为任何 `kubejs` 配方方法；例如 `{type: string}` 或 `{mod: string}`。

## 概率化输入/输出

如何为 gtceu 配方编写概率化输入/输出材料。

```js
     .chancedOutput('minecraft:dirt', 100, 0)
     .chancedInput('minecraft:dirt', 100, 0)

     .chancedFluidInput(Fluid.of('minecraft:water', 100), 1000, 0)
     .chancedFluidOutput('minecraft:water 1000', 100, 0)
```

1. 第一个数字是几率，1 代表 0.01%，10000 代表 100%
2. 第二个数字是每个能量等级的提升量（此功能在 GTm 7.0 中已废弃）

如果您想要不同的几率逻辑，例如 XOR：

```js
const $ChanceLogic = Java.loadClass('com.gregtechceu.gtceu.api.recipe.chance.logic.ChanceLogic')

event.recipes.gtceu.chemical_reactor("test_and")
	.itemInputs('1x minecraft:stone')
	.chancedItemOutputLogic($ChanceLogic.AND)
	.chancedOutput('2x minecraft:dirt', 5000, 100)
	.chancedOutput('4x minecraft:dirt', 2500, 600)
	.duration(400)
	.EUt(25)

event.recipes.gtceu.chemical_reactor("test_xor")
	.itemInputs('1x minecraft:stone')
	.chancedFluidOutputLogic($ChanceLogic.XOR)
	.chancedFluidOutput('gtceu:oxygen 500', 5000, 0)
	.chancedFluidOutput('gtceu:fluorine 500', 2500, 0)
	.duration(400)
	.EUt(25) 
```

范围输出：

```js
.itemOutputsRanged('#forge:crushed_ores/bauxite',1,10) 
```

***

# Java:

## 从 Forge 注册表获取粒子类型

为了使用来自其他模组的粒子类型而不使其成为依赖项，您可以使用 `ForgeRegistries.PARTICLE_TYPES.getValue()`。 以下是使用 `ae2:lightning_fx` 的示例。 如果该模组不存在，它将回退到 `minecraft:end_rod`。

```java
@Override
		public void animateTick(BlockState state, Level level, BlockPos pos, RandomSource random) {
			for (int i = 0; i < 4; i++) {
				if (level.isClientSide) {
					ParticleType<?> pt = ForgeRegistries.PARTICLE_TYPES.getValue(new ResourceLocation("ae2", "lightning_fx"));
					if (pt instanceof SimpleParticleType) {
						level.addAlwaysVisibleParticle((SimpleParticleType) pt, true,
								pos.getX() + 0.5 + (random.nextFloat() - 0.5) * 0.5,
								pos.getY() + random.nextDouble(),
								pos.getZ() + 0.5 + (random.nextFloat() - 0.5) * 0.5,
								0.1, 0.1, 0.1);
					} else {
						// Fallback with vanilla particle
						level.addAlwaysVisibleParticle(ParticleTypes.END_ROD, true,
								pos.getX() + 0.5,
								pos.getY() + 0.5,
								pos.getZ() + 0.5,
								0.1, 0.1, 0.1);
					}
				}
			}
		}
```

## Extra Mixins

[Extra Mixins](https://github.com/LlamaLad7/MixinExtras/wiki)

如果您的 mixin 覆盖了 Minecraft 中的任何内容，或者注入到了一个从 Minecraft 继承的方法中，您的 mixin 需要 `remap = true`。其他所有情况都应使用 `remap = false`。 其他所有情况都应使用 `remap = false`。

要获取 mixin 的重映射路径，请在 IntelliJ 中右键单击该方法，然后选择 Copy Special > Mixin Target Reference。

## 高级 Mixin 工具

"在 Mixin 类上添加 @Pseudo 注解，可以让我们定位那些在编译时可能不存在、但在运行时存在的类。为此，我们使用该类的完全限定名来进行定位。" -Kolja

Wormsignhandlermixin 中有一个很好的例子。 由于 mod/maven 可能表现异常，此工具应仅在必要时使用。

## 调试

您可以使用 `ReflectionStringBuilder.toString()` 将整个对象转储为字符串。

***

# JSON:

***

# Greate:

## 阻止自动生成

[文档](https://github.com/GreateBeyondTheHorizon/Greate/wiki)

如果您想为格雷科技机器生成一个配方，但_不_希望 greate 自动生成一个配方（例如，一个您不希望出现在机械压印机中的卷板机配方），请在配方 ID 的末尾加上 `_electric_only` 或 `_manual_only`。
（`_manual_only` 灵感来源于原版 Create，此后缀可以阻止 Create 根据熔炼配方等生成批量高炉配方）

# Firmalife

您可以通过右键单击种植盆并手持基岩块来使其瞬间生长。

# GregTech

## 自定义化学式

如果您有一个具有更复杂化学式的自定义材料，但需要告诉格雷科技"它由 X 个氧、Y 个氢、Z 个其他元素组成"以生成分解配方，您可以使用：

```js
    material.setFormula("Al2Si2O5(OH)4", true)
```

将化学式工具提示更改为您想要的任何内容！ 我认为 `true` 会将数字变为下标。

## 平衡化学式

格雷科技 Discord 有一个用于检查您的化学式是否平衡的机器人。 [这里](https://discord.com/channels/701354865217110096/1186025944222269580/1392395245248974900) 有一个例子。

对于固体物品，1 摩尔 = 该物品分子中的原子数，所以 1 摩尔的 Al2O3 是 5 个蓝宝石粉。

对于液体物品则相反，1 摩尔 = 1 桶。 所以 1 摩尔的 H2O 是一桶水。