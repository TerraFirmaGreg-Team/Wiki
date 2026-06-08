---
title: Cheat Sheet
order: 1
---
## Cheat Sheet
The purpose of this page is for developers to document helpful functions for future use. If you have any JavaScript or java code that would be nice to share please put it here.

***
# JavaScript:
## Tag to array
Here is an example of turning an item tag into an array, you can omit any part as necessary.
```js
	const tag_array = Ingredient.of('#forge:tag').itemIds.toArray().map(String);
```
* .itemIds
This accesses the list of item ids from that ingredient tag. The result is a Java Set.
* .toArray()
This converts the list (which is a Java Set) into a JavaScript array.
* .map(String)
This converts each item ID in the array to a string. Required for most js functions, but not all.

## Tag Subtraction
Here is an example of using an array in a recipe to produce the same array, except the original item. Useful for stonecutters, dyeing, etc.
```js
	const tag_array = Ingredient.of('#forge:tag').itemIds.toArray().map(String);

	tag_array.forEach(item => {
		event.stonecutting(item, 
			Ingredient.of('#forge:tag').subtract(item)
		).id(`tfg:stonecutter/${item.replace(/:/g, "/")}`)
	})
```
Note: If you are using multiple inputs or multiple subtractions to will have to format it like this example:
```js
	let example = Ingredient.of('#forge:tag').subtract('item:1').subtract('item:2').withCount(8)
```
## JavaScript to JSON
The example below is used in the armor trim builder.
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
1. Declare the file paths. (example above: `trimfilepaths`)
2. Create a const version of the json information. (example above: `newtrimdata`)
3. For each file path, read its contents, and write new data if missing. (example above: existingData)

## Printing Recipe JSONs to Log
Useful for seeing how recipe Jsons are currently written so that you can edit them.
```js
	event.forEachRecipe({ id: string }, (recipe) => {
		console.log(recipe.json.toString());
	});
```
* You can replace `{id: string}` with any kubejs recipe method; like `{type: string}` or `{mod: string}` for example.

## Adding Circuits to Pre-Existing Recipes
Pre-made utility script can be found at: [gtceu/utility.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/gregtech/utility.js)

And the global array at: [gtceu/constants.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/gtceu/constants.js)

You can add circuit numbers to gtceu by overwritting its json like so:
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
You can also directly overwrite the inputs as well, this will remove any other pre-existing inputs:
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
* You can replace `{id: string}` with any kubejs recipe method; like `{type: string}` or `{mod: string}` for example.

## Chanced Input/Output
How to write chanced input/output ingredients for gtceu recipes.
```js
     .chancedOutput('minecraft:dirt', 100, 0)
     .chancedInput('minecraft:dirt', 100, 0)

     .chancedFluidInput(Fluid.of('minecraft:water', 100), 1000, 0)
     .chancedFluidOutput('minecraft:water 1000', 100, 0)
```
1. First number is the chance with 1 being 0.01% and 10000 being 100%
2. Second number is the increase with each energy tier (this feature is scrapped for GTm 7.0)

If you want a different chance logic, such as XOR:
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
Ranged output:
```js
.itemOutputsRanged('#forge:crushed_ores/bauxite',1,10) 
```

***
# Java:

## Forge Registries Get Particle Type
In order to use particle types from other mods without making them dependencies you can use ` ForgeRegistries.PARTICLE_TYPES.getValue()`. Here is an example using `ae2:lightning_fx`. If the mod isnt present it will fallback to `minecraft:end_rod`.
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

If your mixin overrides anything in minecraft or injects into a method that was inherited from something in minecraft, your mixin needs `remap = true`. Everything else should use `remap = false`.

To get a mixin's remap path, right-click the method in intellij and hit Copy Special > Mixin Target Reference

## Fancy Mixin Tools

"Annotating the Mixin class with @Pseudo which allows us to target classes which might not be present at compile time, but are at runtime, for this we use the fully qualified class name to target said class." -Kolja

A good example of this is in the Wormsignhandlermixin. This tool should only be used if necessary due to mods/maven being weird.

## Debugging
You can dump an entire object to a string with `ReflectionStringBuilder.toString()`.

***

# JSON:

***

# Greate:
## Prevent Auto Generation
[Documentation](https://github.com/GreateBeyondTheHorizon/Greate/wiki)

If you want to generate a recipe for a gregtech machine _without_ greate generating a recipe (for example, a bender recipe that you don't want in the mech press), put `_electric_only` or `_manual_only` on the end of the recipe ID.
(`_manual_only` is inspired by base create, where this suffix stops create from generating a bulk blasting recipe from a smelting recipe, etc)

# Firmalife
You can grow planters instantly by right-clicking them with a block of bedrock.

# GregTech
## Custom Chemical Formulas
If you've got a custom material with a more complex chemical formula, but you need to tell gregtech "it's composed of X oxygen, Y hydrogen, Z whatever" for it to generate decomp recipes, you can use:
```js
    material.setFormula("Al2Si2O5(OH)4", true)
```
to change the chemical formula tooltip to whatever you'd like! I think the `true` turns the numbers into subscripts.

## Balancing Chemical Formulas
The gregtech discord has a bot for checking your chemical formulas are balanced. [Here's](https://discord.com/channels/701354865217110096/1186025944222269580/1392395245248974900) an example.

For solid items, 1 mol = however many atoms are in that molecule of that item, so 1 mol of Al2O3 is 5 sapphire dust.

For liquid items it's the opposite, where 1 mol = 1 bucket. So 1 mol of H2O is one bucket.