---
title: Шпаргалка
order: 1
---

## Шпаргалка

Мета цієї сторінки — щоб розробники документували корисні функції для майбутнього використання. Якщо ти маєш якийсь код на JavaScript чи Java, яким варто поділитися — розмісти його тут.

***

# JavaScript:

## Тег у масив

Ось приклад перетворення тегу предмета на масив, ти можеш опустити будь‑яку частину за потреби.

```js
	const tag_array = Ingredient.of('#forge:tag').itemIds.toArray().map(String);
```

- itemIds  
  Це забезпечує доступ до списку ідентифікаторів предметів із цього тегу інгредієнта. Результат — це Java Set.
- .toArray()  
  Це перетворює список (який є Java Set) у масив JavaScript.
- .map(String)  
  Це перетворює кожен ID предмета в масиві на рядок. Необхідно для більшості функцій JS, але не для всіх.

## Віднімання тегів

Ось приклад використання масиву в рецепті для створення того ж масиву, за винятком початкового предмета. Корисно для каменотесів, фарбування тощо.

```js
	const tag_array = Ingredient.of('#forge:tag').itemIds.toArray().map(String);

	tag_array.forEach(item => {
		event.stonecutting(item, 
			Ingredient.of('#forge:tag').subtract(item)
		).id(`tfg:stonecutter/${item.replace(/:/g, "/")}`)
	})
```

Примітка: Якщо ти використовуєш кілька вхідних даних або кілька віднімань, потрібно відформатувати це так, як у цьому прикладі:

```js
	let example = Ingredient.of('#forge:tag').subtract('item:1').subtract('item:2').withCount(8)
```

## JavaScript у JSON

Наведений нижче приклад використовується в конструкторі оздоблення броні.

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

1. Оголоси шляхи до файлів. (приклад вище: `trimfilepaths`)
2. Створи константну версію json-інформації. (приклад вище: `newtrimdata`)
3. Для кожного шляху до файлу зчитай його вміст і запиши нові дані, якщо вони відсутні. (приклад вище: existingData)

## Друк JSON-рецептів у журнал

Корисно для перегляду того, як наразі записані JSON-рецепти, щоб ти міг їх редагувати.

```js
	event.forEachRecipe({ id: string }, (recipe) => {
		console.log(recipe.json.toString());
	});
```

- Ти можеш замінити `{id: string}` на будь-який метод рецепту kubejs; наприклад `{type: string}` або `{mod: string}`.

## Додавання схем до вже чинних рецептів

Готовий утилітний скрипт можна знайти тут: [gtceu/utility.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/gregtech/utility.js)

А глобальний масив тут: [gtceu/constants.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/gtceu/constants.js)

Ти можеш додати номери схем до gtceu, перезаписавши його json ось так:

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

Ти також можеш безпосередньо перезаписати вхідні дані, це видалить усі інші вже існуючі вхідні дані:

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

- Ти можеш замінити `{id: string}` на будь-який метод рецепту kubejs; наприклад `{type: string}` або `{mod: string}`.

## Ймовірнісний вхід/вихід

Як писати ймовірнісні вхідні/вихідні інгредієнти для рецептів gtceu.

```js
     .chancedOutput('minecraft:dirt', 100, 0)
     .chancedInput('minecraft:dirt', 100, 0)

     .chancedFluidInput(Fluid.of('minecraft:water', 100), 1000, 0)
     .chancedFluidOutput('minecraft:water 1000', 100, 0)
```

1. Перше число — це ймовірність, де 1 означає 0,01%, а 10000 — 100%.
2. Друге число — це приріст із кожним енергетичним рівнем (ця функція вилучена для GTm 7.0).

Якщо ти хочеш іншу логіку ймовірності, наприклад XOR:

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

Діапазонний вихід:

```js
.itemOutputsRanged('#forge:crushed_ores/bauxite',1,10) 
```

***

# Java:

## Forge Registries Отримати тип частинки

Щоб використовувати типи частинок з інших модів без створення залежностей, можна застосувати `ForgeRegistries.PARTICLE_TYPES.getValue()`. Ось приклад використання `ae2:lightning_fx`. Якщо мод не присутній, буде використано запасний варіант `minecraft:end_rod`.

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

## Додаткові міксини

[Додаткові міксини](https://github.com/LlamaLad7/MixinExtras/wiki)

Якщо твій міксин перевизначає щось у Minecraft або робить інʼєкцію в метод, успадкований від Minecraft, тоді для міксину потрібно вказати `remap = true`. Усе інше слід використовувати з `remap = false`.

Щоб отримати шлях remap для міксину, клацни ПКМ на методі в IntelliJ та вибери Copy Special > Mixin Target Reference.

## Фантастичні інструменти для міксинів

Анотування класу Mixin за допомогою @Pseudo дозволяє нам націлюватися на класи, які можуть бути відсутні під час компіляції, але присутні під час виконання. Для цього ми використовуємо повністю кваліфіковану назву класу, щоб націлитися на нього. -Kolja

Хорошим прикладом цього є Wormsignhandlermixin. Цей інструмент слід використовувати лише за необхідності через дивну поведінку модів/maven.

## Налагодження

Ти можеш вивести цілий об’єкт у рядок за допомогою `ReflectionStringBuilder.toString()`.

***

# JSON:

***

# Greate:

## Запобігти автоматичному створенню

[Документація](https://github.com/GreateBeyondTheHorizon/Greate/wiki)

Якщо ти хочеш створити рецепт для машини GregTech _без_ того, щоб greate генерував рецепт (наприклад, рецепт для згинача, який ти не хочеш у механічному пресі), додай `_electric_only` або `_manual_only` в кінці ID рецепта.
(`_manual_only` натхненний базовим Create, де цей суфікс зупиняє Create від генерації масового рецепта випалювання на основі рецепта виплавки тощо)

# Firmalife

Ти можеш миттєво виростити плантатор, клацнувши по ньому ПКМ з блоком бедроку.

# GregTech

## Користувацькі хімічні формули

Якщо ти маєш користувацький матеріал із більш складною хімічною формулою, але потрібно повідомити GregTech «він складається з X кисню, Y водню, Z чого завгодно», щоб він згенерував рецепти розкладання, ти можеш використати:

```js
    material.setFormula("Al2Si2O5(OH)4", true)
```

щоб змінити підказку хімічної формули на будь-яку бажану! Я думаю, що `true` перетворює числа на нижні індекси.

## Балансування хімічних формул

У Discord каналі GregTech є бот для перевірки збалансованості твоїх хімічних формул. Ось [приклад](https://discord.com/channels/701354865217110096/1186025944222269580/1392395245248974900))

Для твердих предметів 1 моль = стільки атомів, скільки міститься в молекулі цього предмета, тож 1 моль Al2O3 дорівнює 5 пилу сапфіра.

Для рідких предметів усе навпаки: 1 моль = 1 відро. Отже, 1 моль H2O — це одне відро.