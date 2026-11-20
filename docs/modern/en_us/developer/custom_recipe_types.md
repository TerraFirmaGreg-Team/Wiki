---
title: Custom Recipe Types
order: 11
---

### Copper Pot (`tfg:copper_pot`)

> Copper Pots have 6 item in-slots, 3 fluid in-slots, 3 item out-slots, and 3 fluid out-slots.

#### KubeJS Syntax

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

#### Method & Argument Details

- `.itemInputs(...ingredients)`: Accepts one or more item ingredients. Multi-stack ingredients can be placed within a single slot or distributed across multiple appliance input slots. Food ingredients automatically enforce a non-rotten check. Defaults to empty.
  - Food items often don't stack, so it's better to keep their stack size as 1. Or keep the total item count < 6.
   - `.itemInput(ingredient)`: Single ingredient overload for `.itemInputs()`.
- `.fluidInputs(...fluids)`: Accepts one or more fluid stack ingredients (ex. `'#tfg:clean_water 600'`, `'minecraft:water 1000'`). Defaults to empty.
   - `.fluidInput(fluid)`: Single fluid overload for `.fluidInputs()`.
   - `.fluidInput(fluid, amount)`: Accepts a fluid ingredient/tag/string and an amount in `mB`.
- `.catalyst(catalyst)`: Accepts an item ingredient for the catalyst slot (ex. `'#tfc:bowls'`). Consumed upon recipe completion. Items placed in this slot must match the `#tfg:appliance_catalysts` tag. Items with this tag cannot go in main input slots. Defaults to empty.
- `.tool(tool)`: Accepts an item ingredient for the tool slot (ex. `'firmalife:spoon'`). Not consumed, but takes durability damage if the item is damageable. Items placed in this slot must match the `#tfg:appliance_tools` tag. Items with this tag cannot go in main input slots. Defaults to empty.
    - Consider tools like GT circuits for preventing recipe conflicts.
    - `.tool(tool, damage)`: Sets the tool ingredient and the durability damage inflicted per recipe completion.
    - `.toolDamage(damage)`: Sets the durability damage dealt to the tool upon recipe completion. Defaults to `1`.
- `.itemOutputs(...outputs)`: Accepts one or more item outputs, either as direct item stacks or `ItemStackProvider` objects from `kubejs_tfc` (ex. `TFC.isp.of('create:honeyed_apple').copyFood()`). Can handle multiple outputs with ISP information. Defaults to empty.
    - `.itemOutput(output)`: Single item output overload for `.itemOutputs()`.
- `.fluidOutputs(...fluids)`: Accepts one or more fluid stacks (ex. `'minecraft:lava 1000'`, `'firmalife:cream 10'`). Output fluids fill the first available output tank and overflow to subsequent tanks if space allows. Defaults to empty.
    - `.fluidOutput(fluid)`: Single fluid output overload for `.fluidOutputs()`.
    - `.fluidOutput(fluid, amount)`: Accepts a fluid registry ID or fluid object and an amount in `mB`.
- `.attachment(type, consumer)`: Configures a recipe attachment that requires a secondary block above the cooking appliance.
    - `'condenser'`: Requires a Condenser block placed directly above the appliance. The consumer configures the condenser's outputs and coolant conditions:
        - `.fluidOutput(fluid)` / `.fluidOutput(fluid, amount)`: Specifies the fluid output directed into the condenser's output tank (tank 2).
        - `.coolant(maxTemp?, amount?, fluidId?)`: Sets the coolant fluid condition checked against the condenser's coolant tank (tank 1).
            - `maxTemp`: Maximum allowed temperature of the coolant fluid in Kelvin. Using lower temperature coolants increases recipe processing speed. If `null` no coolant is required. Defaults to `null`. (For referance water is 300K and ice slush is 273K).
            - `amount`: Amount of coolant fluid drained per recipe completion in `mB`. Defaults to `10`. If set to `0`, the coolant fluid must be present in the tank, but none is consumed.
            - `fluidId`: Required coolant fluid or fluid tag (ex: `'#tfg:condenser_coolants'`, `'minecraft:water'`). Defaults to `#tfg:condenser_coolants`.
    - `'mixer'`: Requires a powered Greate Mechanical Mixer placed above the copper pot.
        - `.rpm(minRpm)`: Sets the minimum kinetic RPM speed required for the mixer. Higher rpm increases recipe processing speed. Can be null. Defaults to `null`.
        - `.circuit(circuitNumber)`: Sets the required circuit number configured on the mixer. Can be null. Defaults to `null`.
    - `'press'`: Requires a powered Greate Mechanical Press placed above the copper pot. Higher rpm increases recipe processing speed.
        - `.circuit(circuitNumber)`: Sets the required circuit number configured on the press. Can be null. Defaults to `null`.
    - `'vacuum_chamber'`: Requires a powered Vacuum Chamber placed above the copper pot with >30rpm. Higher rpm increases recipe processing speed.
        - `.vacuum()`: Sets the required mode to vacuum mode.
        - `.pressure()`: Sets the required mode to pressure mode.
        - `.mode(mode: boolean | 'vacuum' | 'pressure')`: Overload, sets the required mode (`false` for vacuum, `true` for pressure).
- `.duration(durationTicks)`: Sets the cooking duration in ticks. Defaults to `100`.
- `.temperature(minTemp)`: Sets the minimum heat required in Celsius. Defaults to `0`.

#### KubeJS Examples

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

#### JSON Examples

Recipe type: `"tfg:copper_pot"`

Standard recipe:
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

Recipe with Condenser Attachment:
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

Recipe with Mechanical Mixer Attachment:
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

Recipe with Mechanical Press Attachment:
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

Recipe with Vacuum Chamber Attachment:
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

### Skillet (`tfg:skillet`)

> Skillets do not have any attachment or fluid support. They can accept 6 item inputs, and 3 item outputs. Skillets do not do heating recipes! They are intended for meal items that are typically made in a pan, like omelettes.

#### KubeJS Syntax

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

#### Method & Argument Details

- `.itemInputs(...ingredients)`: Accepts one or more item ingredients. Multi-stack ingredients can be placed within a single slot or distributed across multiple appliance input slots. Food ingredients automatically enforce a non-rotten check. Defaults to empty.
  - Food items often don't stack, so it's better to keep their stack size as 1. Or keep the total item count < 6.
   - `.itemInput(ingredient)`: Single ingredient overload for `.itemInputs()`.
- `.catalyst(catalyst)`: Accepts an item ingredient for the catalyst slot (ex. `'#tfc:bowls'`). Consumed upon recipe completion. Items placed in this slot must match the `#tfg:appliance_catalysts` tag. Items with this tag cannot go in main input slots. Defaults to empty.
- `.tool(tool)`: Accepts an item ingredient for the tool slot (ex. `'firmalife:spoon'`). Not consumed, but takes durability damage if the item is damageable. Items placed in this slot must match the `#tfg:appliance_tools` tag. Items with this tag cannot go in main input slots. Defaults to empty.
    - Consider tools like GT circuits for preventing recipe conflicts.
    - `.tool(tool, damage)`: Sets the tool ingredient and the durability damage inflicted per recipe completion.
    - `.toolDamage(damage)`: Sets the durability damage dealt to the tool upon recipe completion. Defaults to `1`.
- `.itemOutputs(...outputs)`: Accepts one or more item outputs, either as direct item stacks or `ItemStackProvider` objects from `kubejs_tfc` (ex. `TFC.isp.of('create:honeyed_apple').copyFood()`). Can handle multiple outputs with ISP information. Defaults to empty.
    - `.itemOutput(output)`: Single item output overload for `.itemOutputs()`.
- `.duration(durationTicks)`: Sets the cooking duration in ticks. Defaults to `100`.
- `.temperature(minTemp)`: Sets the minimum heat required in Celsius. Defaults to `0`.

#### KubeJS Examples

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
#### JSON Examples

Recipe type: `"tfg:skillet"`

Standard recipe:
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

### Copper Pot (`tfg:mixing_bowl`)

> Mixing bowls are similar to Copper Pots, with the exceptions that they cannot be provided heat and when a tool is required you must r-click the tools collision box to initiate a recipe (like a quern). Mixing bowls have 3 item in-slots, 2 fluid in-slots, 2 item out-slots, and 2 fluid out-slots. Mixing Bowls only accept mixers as attachments.

#### KubeJS Syntax

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

#### Method & Argument Details

- `.itemInputs(...ingredients)`: Accepts one or more item ingredients. Multi-stack ingredients can be placed within a single slot or distributed across multiple appliance input slots. Food ingredients automatically enforce a non-rotten check. Defaults to empty.
  - Food items often don't stack, so it's better to keep their stack size as 1. Or keep the total item count < 3.
   - `.itemInput(ingredient)`: Single ingredient overload for `.itemInputs()`.
- `.fluidInputs(...fluids)`: Accepts one or more fluid stack ingredients (ex. `'#tfg:clean_water 600'`, `'minecraft:water 1000'`). Defaults to empty.
   - `.fluidInput(fluid)`: Single fluid overload for `.fluidInputs()`.
   - `.fluidInput(fluid, amount)`: Accepts a fluid ingredient/tag/string and an amount in `mB`.
- `.catalyst(catalyst)`: Accepts an item ingredient for the catalyst slot (ex. `'#tfc:bowls'`). Consumed upon recipe completion. Items placed in this slot must match the `#tfg:appliance_catalysts` tag. Items with this tag cannot go in main input slots. Defaults to empty.
- `.tool(tool)`: Accepts an item ingredient for the tool slot (ex. `'firmalife:spoon'`). Not consumed, but takes durability damage if the item is damageable. Items placed in this slot must match the `#tfg:appliance_tools` tag. Items with this tag cannot go in main input slots. Defaults to empty.
    - Consider tools like GT circuits for preventing recipe conflicts.
    - `.tool(tool, damage)`: Sets the tool ingredient and the durability damage inflicted per recipe completion.
    - `.toolDamage(damage)`: Sets the durability damage dealt to the tool upon recipe completion. Defaults to `1`.
- `.itemOutputs(...outputs)`: Accepts one or more item outputs, either as direct item stacks or `ItemStackProvider` objects from `kubejs_tfc` (ex. `TFC.isp.of('create:honeyed_apple').copyFood()`). Can handle multiple outputs with ISP information. Defaults to empty.
    - `.itemOutput(output)`: Single item output overload for `.itemOutputs()`.
- `.fluidOutputs(...fluids)`: Accepts one or more fluid stacks (ex. `'minecraft:lava 1000'`, `'firmalife:cream 10'`). Output fluids fill the first available output tank and overflow to subsequent tanks if space allows. Defaults to empty.
    - `.fluidOutput(fluid)`: Single fluid output overload for `.fluidOutputs()`.
    - `.fluidOutput(fluid, amount)`: Accepts a fluid registry ID or fluid object and an amount in `mB`.
- `.attachment(type, consumer)`: Configures a recipe attachment that requires a secondary block above the cooking appliance.
    - `'mixer'`: Requires a powered Greate Mechanical Mixer placed above the mixing bowl.
        - `.rpm(minRpm)`: Sets the minimum kinetic RPM speed required for the mixer. Higher rpm increases recipe processing speed. Can be null. Defaults to `null`.
        - `.circuit(circuitNumber)`: Sets the required circuit number configured on the mixer. Can be null. Defaults to `null`.
- `.duration(durationTicks)`: Sets the cooking duration in ticks. Defaults to `100`.

#### KubeJS Examples

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

#### JSON Examples

Recipe type: `"tfg:mixing_bowl"`

Standard recipe:
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

Recipe with Mechanical Mixer Attachment:
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

### Gas Burner Fuel (`tfg:gas_burner_fuel`)

#### KubeJS Syntax

```js
event.recipes.tfg.gas_burner_fuel()
    .fluid(fluid: FluidStackIngredient | String)
    .fluid(fluid: FluidIngredient | String, amount: number)
    .duration(durationTicks: number)
    .temperature(temperature: number)
    .id(recipeId: String)
```

#### Method & Argument Details

- `.fluid(fluid)`: Accepts a fluid stack ingredient with amount (ex., `'tfg:btx_fuel 10'` or `'#firmalife:oils 25'`).
- `.fluid(fluid, amount)`: Accepts a fluid/tag and an amount in `mB`.
- `.duration(durationTicks)`: Sets the burn duration in ticks. Defaults to `200`.
- `.temperature(temperature)`: Sets the operating temperature in Celsius supplied by the gas burner when this fuel is active. Defaults to `1000`.

#### KubeJS Example

```js
ServerEvents.recipes(event => {
    event.recipes.tfg.gas_burner_fuel()
        .id('tfg:gas_burner_fuel/methane')
        .fluid('gtceu:methane', 1000)
        .duration(300)
        .temperature(500);
});
```

#### JSON Example

Recipe type: `"tfg:gas_burner_fuel"`

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
