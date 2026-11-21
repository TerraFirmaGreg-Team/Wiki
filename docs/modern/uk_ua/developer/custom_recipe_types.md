---
title: Власні типи рецептів
order: 11
---

### Мідний горщик (`tfg:copper_pot`)

> Мідні горщики мають 6 слотів для вхідних предметів, 3 слоти для вхідних рідин, 3 слоти для вихідних предметів і 3 слоти для вихідних рідин.

#### Синтаксис KubeJS

```js
event.recipes.tfg.copper_pot()
    // Input methods
    .itemInputs(...ingredients: (Ingredient | String)[])
    .itemInput(ingredient: Ingredient | String)
    .fluidInputs(...fluids: (FluidStackIngredient | String)[])
    .fluidInput(fluid: FluidStackIngredient | String)
    .fluidInput(fluid: FluidIngredient | String, amount: number)
    .catalyst(catalyst: Ingredient | String)
    .tool(tool: Ingredient | String)
    .toolDamage(damage: number)
    .tool(tool: Ingredient | String, damage: number)

    // Output methods
    .itemOutputs(...outputs: (ItemStackProvider | ItemStack | String)[])
    .itemOutput(output: ItemStackProvider | ItemStack | String)
    .fluidOutputs(...fluids: (FluidStack | String)[])
    .fluidOutput(fluid: FluidStack | String)
    .fluidOutput(fluid: Fluid | String, amount: number)

    // Attachments
    .attachment(type: 'condenser', consumer: (attachment: CondenserAttachmentJS) => void)
    .attachment(type: 'mixer', consumer: (attachment: MixerAttachmentJS) => void)
    .attachment(type: 'press', consumer: (attachment: PressAttachmentJS) => void)
    .attachment(type: 'vacuum_chamber', consumer: (attachment: VacuumChamberAttachmentJS) => void)

    // Recipe conditions
    .duration(durationTicks: number)
    .temperature(minTemp: number)
    .id(recipeId: String)
```

#### Метод & Аргументи

- `.itemInputs(...ingredients)`: приймає один або кілька інгредієнтів-предметів. Інгредієнти, що складаються з кількох стосів, можна розмістити в одному слоті або розподілити між кількома вхідними слотами пристрою. Харчові інгредієнти автоматично перевіряється, чи вони не зіпсовані. За замовчуванням порожній.
  - Харчові продукти часто не складаються в стоси, тому краще залишати розмір стосу рівним 1. Або стеж, щоб загальна кількість предметів була  < 6.
  - `.itemInput(ingredient)`: варіант методу `.itemInputs()` для одного інгредієнта.
- `.fluidInputs(...fluids)`: приймає один або кілька інгредієнтів-рідин (наприклад, `#tfg:clean_water 600', `minecraft:water 1000\`). За замовчуванням порожній.
   - `.fluidInput(fluid)`: варіант методу `.fluidInputs()` для однієї рідини.
   - `.fluidInput(fluid, amount)`: приймає інгредієнт рідини/тег/рядок, а також її кількість у `mB`.
- `.catalyst(catalyst)`: приймає інгредієнт-предмет для слота каталізатора (наприклад, `#tfc:bowls`). Споживається після завершення рецепта. Предмети, розміщені в цьому слоті, повинні відповідати тегу `#tfg:appliance_catalysts`. Предмети з цим тегом не можна розміщувати в основних вхідних слотах. За замовчуванням порожній.
- `.tool(tool)`: приймає інгредієнт-предмет для слота інструмента (наприклад, `firmalife:spoon`). Не споживається, але втрачає міцність, якщо предмет має показник міцності. Предмети, розміщені в цьому слоті, повинні відповідати тегу `#tfg:appliance_tools`. Предмети з цим тегом не можна розміщувати в основних вхідних слотах. За замовчуванням порожній.
    - Щоб уникнути конфліктів рецептів, використовуй такі інструменти, як схеми GT.
    - `.tool(tool, damage)`: задає інгредієнт для слота інструмента та кількість одиниць міцності, що втрачається після кожного завершення рецепта.
    - `.toolDamage(damage)`: задає кількість одиниць міцності, які втрачає інструмент після завершення рецепта. За замовчуванням `1`.
- `.itemOutputs(...outputs)`: приймає один або кілька вихідних предметів — безпосередньо у вигляді стосів предметів або як об'єкти `ItemStackProvider` з `kubejs_tfc` (наприклад, `TFC.isp.of('create:honeyed_apple').copyFood()`). Може обробляти кілька вихідних предметів з інформацією ISP. За замовчуванням порожній.
    - `.itemOutput(output)`: варіант методу `.itemOutputs()` для одного вихідного предмета.
- `.fluidOutputs(...fluids)`: приймає одну або кілька рідин (наприклад, `minecraft:lava 1000`, `firmalife:cream 10`). Вихідні рідини заповнюють перший доступний вихідний резервуар, а за його нестачі місця переливаються в наступні резервуари, якщо там є вільний простір. За замовчуванням порожній.
    - `.fluidOutput(fluid)`: варіант методу `.fluidOutputs()` для однієї вихідної рідини.
    - `.fluidOutput(fluid, amount)`: приймає ID рідини з реєстру або об'єкт рідини, а також її кількість у `mB`.
- `.attachment(type, consumer)`: налаштовує додатковий компонент рецепта, для якого потрібен допоміжний блок над кухонним пристроєм.
    - `condenser`: вимагає, щоб блок конденсатора був розміщений безпосередньо над пристроєм. Функція-обробник налаштовує вихідні продукти конденсатора та умови охолодження:
        - `.fluidOutput(fluid)` / `.fluidOutput(fluid, amount)`: задає вихідну рідину, яка надходить до вихідного резервуара конденсатора (резервуар 2).
        - `.coolant(maxTemp?, amount?, fluidId?)`: задає параметри охолоджувальної рідини, які перевіряються для резервуара охолоджувача конденсатора (резервуар 1).
            - `maxTemp`: максимальна допустима температура охолоджувальної рідини в Кельвінах. Використання охолоджувальних рідин із нижчою температурою прискорює обробку рецепта. Якщо значення `null`, охолоджувальна рідина не потрібна. За замовчуванням `null`. (Для довідки: температура води становить 300K, а крижаної крихти — 273K).
            - `amount`: кількість охолоджувальної рідини, що витрачається після кожного завершення рецепта, у `mB`. За замовчуванням `10`. Якщо встановлено значення 0, охолоджувальна рідина має бути в резервуарі, але не витрачається.
            - `fluidId`: обов'язкова охолоджувальна рідина або тег рідини (наприклад, `#tfg:condenser_coolants`, `minecraft:water`). За замовчуванням `#tfg:condenser_coolants`.
    - `mixer`: вимагає, щоб над мідним горщиком було встановлено механічний змішувач Greate, підключений до джерела енергії.
        - `.rpm(minRpm)`: задає мінімальну швидкість обертання (об/хв), необхідну для роботи змішувача. Вища швидкість обертання прискорює обробку рецепта. Може бути null. За замовчуванням `null`.
        - `.circuit(circuitNumber)`: задає необхідний номер схеми, встановлений на змішувачі. Може бути null. За замовчуванням `null`.
    - `press`: вимагає, щоб над мідним горщиком було встановлено механічний прес Greate, підключений до джерела енергії. Вища швидкість обертання прискорює обробку рецепта.
        - `.circuit(circuitNumber)`: задає необхідний номер схеми, встановлений на пресі. Може бути null. За замовчуванням `null`.
    - `vacuum_chamber`: вимагає, щоб над мідним горщиком було встановлено вакуумну камеру, підключену до джерела енергії та яка працює зі швидкістю понад 30 об/хв. Вища швидкість обертання прискорює обробку рецепта.
        - `.vacuum()`: задає обов'язковий режим роботи — вакуумний.
        - `.pressure()`: задає обов'язковий режим роботи — режим під тиском.
        - `.mode(mode: boolean | 'vacuum' | 'pressure')м: альтернативний варіант методу, який задає обов'язковий режим роботи (`false`— вакуумний,`true\` — під тиском).
- `.duration(durationTicks)`: задає тривалість приготування в тіках. За замовчуванням `100`.
- `.temperature(minTemp)`: задає мінімальну необхідну температуру нагрівання в градусах Цельсія. За замовчуванням `0`.

#### Приклади KubeJS

```js
ServerEvents.recipes(event => {
    event.recipes.tfg.copper_pot()
        .id('tfg:copper_pot/honeyed_apple_cooking')
        .itemInputs('#tfc:foods/apples', '2x firmalife:raw_honey')
        .fluidInputs('#tfg:clean_water 600', '#firmalife:oils 100')
        .catalyst('#tfc:bowls')
        .tool('firmalife:spoon')
        .itemOutputs(
          // Single ISP output.
            TFC.isp.of('create:honeyed_apple').copyFood().addTrait('tfc:salted'),
            '2x firmalife:ice_shavings'
        )
        .fluidOutputs('minecraft:lava 1000', 'firmalife:cream 10')
        .duration(200)
        .temperature(500);
});
```

```js
ServerEvents.recipes(event => {
    event.recipes.tfg.copper_pot()
      .id('tfg:abomination')
      .fluidInputs('#tfg:clean_water 600', '#firmalife:oils 100')
      .itemInputs('2x #tfc:foods/apples', '3x firmalife:raw_honey')
      .fluidOutputs('minecraft:lava 4000', 'firmalife:cream 10')
      .itemOutputs(
        // Multiple ISP outputs.
        TFC.isp.of('3x tfc:food/green_apple').copyFood().addTrait('tfc:salted'), 
        TFC.itemStackProvider.of('2x tfg:food/smoothie').meal(
          (food) => food.hunger(4).decayModifier(1.8).water(10).quenching(2).cooling(8),
          [(portion) => portion.nutrientModifier(1).saturationModifier(1.1)]
        ))
      .catalyst('#tfc:bowls')
      .tool('#forge:tools/screwdrivers', 2)
      .duration(200)
      .temperature(500);
});
```

```js
ServerEvents.recipes(event => {
    // Recipe requiring a Condenser block directly above the Copper Pot.
    event.recipes.tfg.copper_pot()
        .id('tfg:copper_pot/condenser_distillation')
        .fluidInputs('minecraft:water 1000')
        .attachment('condenser', x => x
            .fluidOutput('gtceu:distilled_water 1000')
            .coolant(300, 10, '#tfg:condenser_coolants')
        )
        .duration(150)
        .temperature(300);

    // Recipe requiring a Mechanical Mixer 2 blocks above the Copper Pot.
    event.recipes.tfg.copper_pot()
        .id('tfg:copper_pot/onion_water')
        .itemInputs('tfc:food/garlic', 'tfc:food/onion')
        .fluidInputs('minecraft:water 500')
        .fluidOutputs('tfg:muddy_water 500')
        .attachment('mixer', x => x
            .rpm(64)
            .circuit(1)
        )
        .duration(200)
        .temperature(400);

    // Recipe requiring a Mechanical Press 2 blocks above the Copper Pot.
    event.recipes.tfg.copper_pot()
        .id('tfg:copper_pot/pressed_juice')
        .itemInputs('3x tfc:food/blackberry')
        .attachment('press', x => x
            .circuit(2)
        )
        .catalyst('tfc:empty_jar')
        .itemOutputs(
          TFC.isp.of('tfg:food/juice').mergeTag({'dynamic_color': 0x3e2664}).meal(
			    (food) => food.hunger(4).decayModifier(1.5).water(15).quenching(3),
			    [(portion) => portion.nutrientModifier(1.1).saturationModifier(1.5)])
        )
        .duration(100);

    // Recipe requiring a Vacuum Chamber in Vacuum Mode 2 blocks above the Copper Pot.
    event.recipes.tfg.copper_pot()
        .id('tfg:copper_pot/vacuum_dehydration')
        .itemInputs('tfc:food/orange')
        .attachment('vacuum_chamber', x => x
            .vacuum()
        )
        .itemOutputs(TFC.isp.of('tfc:food/orange').copyFood().addTrait('firmalife:dried'))
        .duration(120)
        .temperature(200);
});
```

#### Приклади JSON

Тип рецепту: `"tfg:copper_pot"`

Стандартний рецепт:
```json
{
  "type": "tfg:copper_pot",
  "item_ingredients": [
    {
      "tag": "tfc:foods/apples"
    },
    {
      "item": "firmalife:raw_honey",
      "count": 2
    }
  ],
  "fluid_ingredients": [
    {
      "ingredient": "#tfg:clean_water",
      "amount": 600
    }
  ],
  "catalyst": {
    "tag": "tfc:bowls"
  },
  "tool": {
    "tag": "forge:tools/screwdrivers"
  },
  "tool_damage": 2,
  "item_outputs": [
    {
      "stack": {
        "item": "create:honeyed_apple"
      },
      "modifiers": [
        {
          "type": "tfc:copy_food"
        },
        {
          "type": "tfc:add_trait",
          "trait": "tfc:salted"
        }
      ]
    },
    {
      "stack": {
        "item": "firmalife:ice_shavings",
        "count": 2
      }
    }
  ],
  "fluid_outputs": [
    {
      "fluid": "minecraft:lava",
      "amount": 1000
    },
    {
      "fluid": "firmalife:cream",
      "amount": 10
    }
  ],
  "duration": 200,
  "temperature": 500.0
}
```

Рецепт із конденсатором:
```json
{
  "type": "tfg:copper_pot",
  "fluid_ingredients": [
    {
      "ingredient": "minecraft:water",
      "amount": 1000
    }
  ],
  "attachments": [
    {
      "type": "condenser",
      "fluid_output": {
        "fluid": "gtceu:distilled_water",
        "amount": 1000
      },
      "coolant": {
        "max_temp": 300.0,
        "amount": 10,
        "ingredient": "#tfg:condenser_coolants"
      }
    }
  ],
  "duration": 150,
  "temperature": 300.0
}
```

Рецепт із механічним змішувачем:
```json
{
  "type": "tfg:copper_pot",
  "item_ingredients": [
    {
      "item": "tfc:food/garlic"
    },
    {
      "item": "tfc:food/onion"
    }
  ],
  "fluid_ingredients": [
    {
      "ingredient": "minecraft:water",
      "amount": 500
    }
  ],
  "fluid_outputs": [
    {
      "fluid": "tfg:muddy_water",
      "amount": 500
    }
  ],
  "attachments": [
    {
      "type": "mixer",
      "min_rpm": 64.0,
      "circuit": 1
    }
  ],
  "duration": 200,
  "temperature": 400.0
}
```

Рецепт із механічним пресом:
```json
{
  "type": "tfg:copper_pot",
  "item_ingredients": [
    {
      "item": "tfc:food/blackberry",
      "count": 4
    }
  ],
  "item_outputs": [
    {
      "stack": {
        "item": "tfg:food/juice"
      },
      "modifiers": [
        {
          "type": "tfc:meal"
        },
        "food": {
          "hunger": 4,
          "water": 15,
          "quenching": 3,
          "decay_modifier": 1.5
        },
        "portions": [
            {
                "nutrient_modifier": 1.1,
                "water_modifier": 1.0,
                "saturation_modifier": 1.5
            }
        ]
      ]
    },
  ],
  "attachments": [
    {
      "type": "press",
      "circuit": 2
    }
  ],
  "duration": 100,
  "temperature": 100.0
}
```

Рецепт із вакуумною камерою:
```json
{
  "type": "tfg:copper_pot",
  "item_ingredients": [
    {
      "item": "tfc:food/orange"
    }
  ],
  "item_outputs": [
    {
      "stack": {
        "item": "tfc:food/orange"
      },
      "modifiers": [
        {
          "type": "tfc:add_trait",
          "trait": "firmalife:dried"
        }
      ]
    }
  ],
  "attachments": [
    {
      "type": "vacuum_chamber",
      "mode": false
    }
  ],
  "duration": 120,
  "temperature": 200.0
}
```
---

### Сковорідка (`tfg:skillet`)

> Сковорідки не підтримують додаткові компоненти та роботу з рідинами. Вони можуть приймати до 6 вхідних предметів і видавати до 3 вихідних предметів. Сковорідки не призначені для приготування рецептів із нагріванням! Вони призначені для приготування страв, які зазвичай готують на пательні, наприклад омлетів.

#### Синтаксис KubeJS

```js
event.recipes.tfg.skillet()
    // Input methods
    .itemInputs(...ingredients: (Ingredient | String)[])
    .itemInput(ingredient: Ingredient | String)
    .catalyst(catalyst: Ingredient | String)
    .tool(tool: Ingredient | String)
    .toolDamage(damage: number)
    .tool(tool: Ingredient | String, damage: number)

    // Output methods
    .itemOutputs(...outputs: (ItemStackProvider | ItemStack | String)[])
    .itemOutput(output: ItemStackProvider | ItemStack | String)

    // Recipe conditions
    .duration(durationTicks: number)
    .temperature(minTemp: number)
    .id(recipeId: String)
```

#### Метод & Аргументи

- `.itemInputs(...ingredients)`: приймає один або кілька інгредієнтів-предметів. Інгредієнти, що складаються з кількох стосів, можна розмістити в одному слоті або розподілити між кількома вхідними слотами пристрою. Харчові інгредієнти автоматично перевіряється, чи вони не зіпсовані. За замовчуванням порожній.
  - Харчові продукти часто не складаються в стоси, тому краще залишати розмір стосу рівним 1. Або стеж, щоб загальна кількість предметів була  < 6.
  - `.itemInput(ingredient)`: варіант методу `.itemInputs()` для одного інгредієнта.
- `.catalyst(catalyst)`: приймає інгредієнт-предмет для слота каталізатора (наприклад, `#tfc:bowls`). Споживається після завершення рецепта. Предмети, розміщені в цьому слоті, повинні відповідати тегу `#tfg:appliance_catalysts`. Предмети з цим тегом не можна розміщувати в основних вхідних слотах. За замовчуванням порожній.
- `.tool(tool)`: приймає інгредієнт-предмет для слота інструмента (наприклад, `firmalife:spoon`). Не споживається, але втрачає міцність, якщо предмет має показник міцності. Предмети, розміщені в цьому слоті, повинні відповідати тегу `#tfg:appliance_tools`. Предмети з цим тегом не можна розміщувати в основних вхідних слотах. За замовчуванням порожній.
    - Щоб уникнути конфліктів рецептів, використовуй такі інструменти, як схеми GT.
    - `.tool(tool, damage)`: задає інгредієнт для слота інструмента та кількість одиниць міцності, що втрачається після кожного завершення рецепта.
    - `.toolDamage(damage)`: задає кількість одиниць міцності, які втрачає інструмент після завершення рецепта. За замовчуванням `1`.
- `.itemOutputs(...outputs)`: приймає один або кілька вихідних предметів — безпосередньо у вигляді стосів предметів або як об'єкти `ItemStackProvider` з `kubejs_tfc` (наприклад, `TFC.isp.of('create:honeyed_apple').copyFood()`). Може обробляти кілька вихідних предметів з інформацією ISP. За замовчуванням порожній.
    - `.itemOutput(output)`: варіант методу `.itemOutputs()` для одного вихідного предмета.
- `.duration(durationTicks)`: задає тривалість приготування в тіках. За замовчуванням `100`.
- `.temperature(minTemp)`: задає мінімальну необхідну температуру нагрівання в градусах Цельсія. За замовчуванням `0`.

#### Приклади KubeJS

```js
ServerEvents.recipes(event => {
    event.recipes.tfg.skillet()
        .id('tfg:skillet/honeyed_apple_cooking')
        .itemInputs('#tfc:foods/apples', '2x firmalife:raw_honey')
        .catalyst('#tfc:bowls')
        .tool('firmalife:spoon')
        .itemOutputs(
            TFC.isp.of('create:honeyed_apple').copyFood().addTrait('tfc:salted'),
            '2x firmalife:ice_shavings'
        )
        .duration(200)
        .temperature(500);
});
```
#### Приклади JSON

Тип рецепту: `"tfg:skillet"`

Стандартний рецепт:
```json
{
  "type": "tfg:skillet",
  "item_ingredients": [
    {
      "tag": "tfc:foods/apples"
    },
    {
      "item": "firmalife:raw_honey",
      "count": 2
    }
  ],
  "catalyst": {
    "tag": "tfc:bowls"
  },
  "tool": {
    "tag": "forge:tools/screwdrivers"
  },
  "tool_damage": 2,
  "item_outputs": [
    {
      "stack": {
        "item": "create:honeyed_apple"
      },
      "modifiers": [
        {
          "type": "tfc:copy_food"
        },
        {
          "type": "tfc:add_trait",
          "trait": "tfc:salted"
        }
      ]
    },
    {
      "stack": {
        "item": "firmalife:ice_shavings",
        "count": 2
      }
    }
  ],
  "duration": 200,
  "temperature": 500.0
}
```

---

### Мідний горщик (`tfg:mixing_bowl`)

> Миски для змішування подібні до мідних горщиків, але їх не можна нагрівати. Якщо для рецепта потрібен інструмент, клацни правою кнопкою миші по його зоні зіткнення, щоб запустити рецепт (як у випадку з жорном). Миски для змішування мають 3 слоти для вхідних предметів, 2 слоти для вхідних рідин, 2 слоти для вихідних предметів і 2 слоти для вихідних рідин. Миски для змішування підтримують лише механічні змішувачі як додаткові компоненти.

#### Синтаксис KubeJS

```js
event.recipes.tfg.mixing_bowl()
    // Input methods
    .itemInputs(...ingredients: (Ingredient | String)[])
    .itemInput(ingredient: Ingredient | String)
    .fluidInputs(...fluids: (FluidStackIngredient | String)[])
    .fluidInput(fluid: FluidStackIngredient | String)
    .fluidInput(fluid: FluidIngredient | String, amount: number)
    .catalyst(catalyst: Ingredient | String)
    .tool(tool: Ingredient | String)
    .toolDamage(damage: number)
    .tool(tool: Ingredient | String, damage: number)

    // Output methods
    .itemOutputs(...outputs: (ItemStackProvider | ItemStack | String)[])
    .itemOutput(output: ItemStackProvider | ItemStack | String)
    .fluidOutputs(...fluids: (FluidStack | String)[])
    .fluidOutput(fluid: FluidStack | String)
    .fluidOutput(fluid: Fluid | String, amount: number)

    // Attachments
    .attachment(type: 'mixer', consumer: (attachment: MixerAttachmentJS) => void)

    // Recipe conditions
    .duration(durationTicks: number)
    .id(recipeId: String)
```

#### Метод & Аргументи

- `.itemInputs(...ingredients)`: приймає один або кілька інгредієнтів-предметів. Інгредієнти, що складаються з кількох стосів, можна розмістити в одному слоті або розподілити між кількома вхідними слотами пристрою. Харчові інгредієнти автоматично перевіряється, чи вони не зіпсовані. За замовчуванням порожній.
  - Харчові продукти часто не складаються в стоси, тому краще залишати розмір стосу рівним 1. Або стеж, щоб загальна кількість предметів була  < 3.
  - `.itemInput(ingredient)`: варіант методу `.itemInputs()` для одного інгредієнта.
- `.fluidInputs(...fluids)`: приймає один або кілька інгредієнтів-рідин (наприклад, `#tfg:clean_water 600', `minecraft:water 1000\`). За замовчуванням порожній.
   - `.fluidInput(fluid)`: варіант методу `.fluidInputs()` для однієї рідини.
   - `.fluidInput(fluid, amount)`: приймає інгредієнт рідини/тег/рядок, а також її кількість у `mB`.
- `.catalyst(catalyst)`: приймає інгредієнт-предмет для слота каталізатора (наприклад, `#tfc:bowls`). Споживається після завершення рецепта. Предмети, розміщені в цьому слоті, повинні відповідати тегу `#tfg:appliance_catalysts`. Предмети з цим тегом не можна розміщувати в основних вхідних слотах. За замовчуванням порожній.
- `.tool(tool)`: приймає інгредієнт-предмет для слота інструмента (наприклад, `firmalife:spoon`). Не споживається, але втрачає міцність, якщо предмет має показник міцності. Предмети, розміщені в цьому слоті, повинні відповідати тегу `#tfg:appliance_tools`. Предмети з цим тегом не можна розміщувати в основних вхідних слотах. За замовчуванням порожній.
    - Щоб уникнути конфліктів рецептів, використовуй такі інструменти, як схеми GT.
    - `.tool(tool, damage)`: задає інгредієнт для слота інструмента та кількість одиниць міцності, що втрачається після кожного завершення рецепта.
    - `.toolDamage(damage)`: задає кількість одиниць міцності, які втрачає інструмент після завершення рецепта. За замовчуванням `1`.
- `.itemOutputs(...outputs)`: приймає один або кілька вихідних предметів — безпосередньо у вигляді стосів предметів або як об'єкти `ItemStackProvider` з `kubejs_tfc` (наприклад, `TFC.isp.of('create:honeyed_apple').copyFood()`). Може обробляти кілька вихідних предметів з інформацією ISP. За замовчуванням порожній.
    - `.itemOutput(output)`: варіант методу `.itemOutputs()` для одного вихідного предмета.
- `.fluidOutputs(...fluids)`: приймає одну або кілька рідин (наприклад, `minecraft:lava 1000`, `firmalife:cream 10`). Вихідні рідини заповнюють перший доступний вихідний резервуар, а за його нестачі місця переливаються в наступні резервуари, якщо там є вільний простір. За замовчуванням порожній.
    - `.fluidOutput(fluid)`: варіант методу `.fluidOutputs()` для однієї вихідної рідини.
    - `.fluidOutput(fluid, amount)`: приймає ID рідини з реєстру або об'єкт рідини, а також її кількість у `mB`.
- `.attachment(type, consumer)`: налаштовує додатковий компонент рецепта, для якого потрібен допоміжний блок над кухонним пристроєм.
    - `mixer`: вимагає, щоб над мискою для змішування було встановлено механічний змішувач Greate, підключений до джерела енергії.
        - `.rpm(minRpm)`: задає мінімальну швидкість обертання (об/хв), необхідну для роботи змішувача. Вища швидкість обертання прискорює обробку рецепта. Може бути null. За замовчуванням `null`.
        - `.circuit(circuitNumber)`: задає необхідний номер схеми, встановлений на змішувачі. Може бути null. За замовчуванням `null`.
- `.duration(durationTicks)`: задає тривалість приготування в тіках. За замовчуванням `100`.

#### Приклади KubeJS

```js
ServerEvents.recipes(event => {
    event.recipes.tfg.mixing_bowl()
        .id('tfg:mixing_bowl/honeyed_apple_cooking')
        .itemInputs('#tfc:foods/apples', '2x firmalife:raw_honey')
        .fluidInputs('#tfg:clean_water 600', '#firmalife:oils 100')
        .catalyst('#tfc:bowls')
        .tool('firmalife:spoon')
        .itemOutputs(
          // Single ISP output.
            TFC.isp.of('create:honeyed_apple').copyFood().addTrait('tfc:salted'),
            '2x firmalife:ice_shavings'
        )
        .fluidOutputs('minecraft:lava 1000', 'firmalife:cream 10')
        .duration(200);
});
```

```js
ServerEvents.recipes(event => {
    event.recipes.tfg.mixing_bowl()
      .id('tfg:abomination')
      .fluidInputs('#tfg:clean_water 600', '#firmalife:oils 100')
      .itemInputs('2x #tfc:foods/apples', '3x firmalife:raw_honey')
      .fluidOutputs('minecraft:lava 4000', 'firmalife:cream 10')
      .itemOutputs(
        // Multiple ISP outputs.
        TFC.isp.of('3x tfc:food/green_apple').copyFood().addTrait('tfc:salted'), 
        TFC.itemStackProvider.of('2x tfg:food/smoothie').meal(
          (food) => food.hunger(4).decayModifier(1.8).water(10).quenching(2).cooling(8),
          [(portion) => portion.nutrientModifier(1).saturationModifier(1.1)]
        ))
      .catalyst('#tfc:bowls')
      .tool('#forge:tools/screwdrivers', 2)
      .duration(200);
});
```

```js
ServerEvents.recipes(event => {
    // Recipe requiring a Mechanical Mixer 2 blocks above the Mixing Bowl.
    event.recipes.tfg.mixing_bowl()
        .id('tfg:mixing_bowl/onion_water')
        .itemInputs('tfc:food/garlic', 'tfc:food/onion')
        .fluidInputs('minecraft:water 500')
        .fluidOutputs('tfg:muddy_water 500')
        .attachment('mixer', x => x
            .rpm(64)
            .circuit(1)
        )
        .duration(200);
});
```

#### Приклади JSON

Тип рецепту: `"tfg:mixing_bowl"`

Стандартний рецепт:
```json
{
  "type": "tfg:mixing_bowl",
  "item_ingredients": [
    {
      "tag": "tfc:foods/apples"
    },
    {
      "item": "firmalife:raw_honey",
      "count": 2
    }
  ],
  "fluid_ingredients": [
    {
      "ingredient": "#tfg:clean_water",
      "amount": 600
    }
  ],
  "catalyst": {
    "tag": "tfc:bowls"
  },
  "tool": {
    "tag": "forge:tools/screwdrivers"
  },
  "tool_damage": 2,
  "item_outputs": [
    {
      "stack": {
        "item": "create:honeyed_apple"
      },
      "modifiers": [
        {
          "type": "tfc:copy_food"
        },
        {
          "type": "tfc:add_trait",
          "trait": "tfc:salted"
        }
      ]
    },
    {
      "stack": {
        "item": "firmalife:ice_shavings",
        "count": 2
      }
    }
  ],
  "fluid_outputs": [
    {
      "fluid": "minecraft:lava",
      "amount": 1000
    },
    {
      "fluid": "firmalife:cream",
      "amount": 10
    }
  ],
  "duration": 200
}
```

Рецепт із механічним змішувачем:
```json
{
  "type": "tfg:mixing_bowl",
  "item_ingredients": [
    {
      "item": "tfc:food/garlic"
    },
    {
      "item": "tfc:food/onion"
    }
  ],
  "fluid_ingredients": [
    {
      "ingredient": "minecraft:water",
      "amount": 500
    }
  ],
  "fluid_outputs": [
    {
      "fluid": "tfg:muddy_water",
      "amount": 500
    }
  ],
  "attachments": [
    {
      "type": "mixer",
      "min_rpm": 64.0,
      "circuit": 1
    }
  ],
  "duration": 200
}
```

---

### Паливо для газового пальника (`tfg:gas_burner_fuel`)

#### Синтаксис KubeJS

```js
event.recipes.tfg.gas_burner_fuel()
    .fluid(fluid: FluidStackIngredient | String)
    .fluid(fluid: FluidIngredient | String, amount: number)
    .duration(durationTicks: number)
    .temperature(temperature: number)
    .id(recipeId: String)
```

#### Метод & Аргументи

- `.fluid(fluid)`: приймає інгредієнт-рідину із зазначеною кількістю (наприклад, `tfg:btx_fuel 10` або `#firmalife:oils 25`).
- `.fluid(fluid, amount)`: приймає рідину або тег рідини, а також її кількість у `mB`.
- `.duration(durationTicks)`: задає тривалість горіння в тіках. За замовчуванням `200`.
- `.temperature(temperature)`: задає робочу температуру в градусах Цельсія, яку забезпечує газовий пальник під час використання цього палива. За замовчуванням `1000`.

#### Приклад KubeJS

```js
ServerEvents.recipes(event => {
    event.recipes.tfg.gas_burner_fuel()
        .id('tfg:gas_burner_fuel/methane')
        .fluid('gtceu:methane', 1000)
        .duration(300)
        .temperature(500);
});
```

#### Приклад JSON

Тип рецепту: `"tfg:gas_burner_fuel"`

```json
{
  "type": "tfg:gas_burner_fuel",
  "fluid": {
    "ingredient": "gtceu:methane",
    "amount": 1000
  },
  "duration": 300,
  "temperature": 500
}
```
