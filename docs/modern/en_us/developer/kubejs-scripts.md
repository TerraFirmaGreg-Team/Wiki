---
title: KubeJS Scripts
order: 3
---
# Startup Scripts

## General Info

* Other kubejs binders still work with any of these methods e.g. `.tagBlock()`
* Unless otherwise stated--All new methods can accept cardinal based block state jsons to allow them to rotate around the y-axis. Example below.

Example of a cardinal block state json.

```json
{
  "variants": {
    "facing=east": {
      "model": "tfg:block/test",
      "y": 270
    },
    "facing=north": {
      "model": "tfg:block/test",
      "y": 180
    },
    "facing=south": {
      "model": "tfg:block/test"
    },
    "facing=west": {
      "model": "tfg:block/test",
      "y": 90
    }
  }
}
```

***

## Custom GT Conditions

> :bulb: **Custom Recipe Conditions:** TFG has multiple custom recipe conditions with schema bindings for TFC and Ad Astra environments.

### Condition Methods

**Type:** `Oxygenated Condition`

```js
.isOxygenated(event, oxygenated: Boolean)
```

> Sets whether the recipe requires an oxygenated environment provided by Ad Astra's oxygen API. If `true` the recipe requires oxygen. If `false` the recipe doesn't allow oxygen to be present.

***

**Type:** `Month Condition`

```js
.months(event, months: String[])
```

> Sets whether the recipe can only be ran during the provided month whitelist. Example: `march, april, december`

```js
.monthsRange(event, months: String start, String end)
```

> Sets the month range in which recipes can be ran. Can wrap. Example: `december, june`

***

**Type:** `Season Condition`

```js
.seasons(event, seasons: String[])
```

> Sets whether the recipe can only be ran during the provided seasons whitelist. Example: `spring, fall`

```js
.seasonsRange(event, seasons: String start, String end)
```

> Sets the season range in which recipes can be ran. Can wrap. Example: `summer, winter`

***

**Type:** `Temperature Condition`

```js
.climateAvgTemperatureRange(event, temperate: Float start, Float end)
```

> Sets the average climate temperature range in which recipes can be ran. Min: `-1000C`, Max: `1000C`

```js
.climateAvgTemperatureGreaterThan(event, temperate: Float value)
```

> Sets the minimum average climate temperature in which recipes will run.

```js
.climateAvgTemperatureLessThan(event, temperate: Float value)
```

> Sets the maximum average climate temperature in which recipes will run.

***

**Type:** `Rainfall Condition`

```js
.climateAvgRainfallRange(event, rainfall: Float start, Float end)
```

> Sets the average climate rainfall range in which recipes can be ran. Min: `0mm`, Max: `500mm`

```js
.climateAvgRainfallGreaterThan(event, rainfall: Float value)
```

> Sets the minimum average climate rainfall in which recipes will run.

```js
.climateAvgRainfallLessThan(event, rainfall: Float value)
```

> Sets the maximum average climate rainfall in which recipes will run.

***

**Type:** `Gravity Condition`

```js
.gravityRange(event, gravity: Float start, Float end)
```

> Sets the local gravity range in which recipes can be ran. In m/s^2.

```js
.gravityGreaterThan(event, rainfall: Float value)
```

> Sets the minimum local gravity in which recipes will run.

```js
.gravityLessThan(event, rainfall: Float value)
```

> Sets the maximum local gravity in which recipes will run.

***

### Custom Condition Example

```js
let a = event.recipes.gtceu.greenhouse('tfg:example')
    .notConsumable(input)
    .itemOutputs(output)
    .duration(20)
    .EUt(20)

TFGRecipeSchemaBindings.isOxygenated(a, true)
```

## Custom Builders

> :bulb: **Particle Builders:** TFG has a few builders that allow for custom particle emitter blocks `tfg:particle_emitter_decoration`,`tfg:particle_emitter` and `tfg:active_particle_emitter`. Particle emitter blocks use `consumer<particles>` which means that multiple particle sets can be assigned per block.

### Method Types

**Type:** `tfg:particle_emitter` & `tfg:particle_emitter_decoration`

**Extra Methods:**

```js
.particles(particles: Consumer<ParticleSetBuilder>)
```

> Sets the properties of the spawned particle.

```js
.hasTicker(ticker: Boolean)
```

> Sets if the block should become a block entity and use a dedicated ticker. Required for custom particle delays. and to continue spawning particles outside the players immediate range. Defaults to `false`.

```js
.emitDelay(delay: Int);
```

> Requires `ticker(true)`. Defines the upper range of the custom ticker delay scaling. Particles will spawn at random tick intervals using `Math.max(0, delay)`. Defaults to `0`.

***

**Extra Consumers:** `Consumer<ParticleSetBuilder>`

`ParticleSetBuilder` **Methods:**

```js
.position(position: {Double x, Double y, Double z})
```

> Sets the initial starting position of the particle emitter relative to the beginning vertex of the block position. Defaults `(0.5, 0.5, 0.5)`.

```js
.range(range: {Double x, Double y, Double z})
```

> Sets the spawning radius for all axis with `postion` as the center. Defaults `(0.25, 1.0, 0.25)`.

```js
.velocity(velocity: {Double x, Double y, Double z})
```

> Sets the initial linear velocity of the particle. Defaults `(0, 0, 0)`.

```js
.particle(particle: {Supplier<SimpleParticleType> | "minecraft:dust"})
```

> Sets the `SimpleParticleType` to be spawned. If `minecraft:dust` is used--enables `dust` method.

```js
.count(count: Int)
```

> Particle quantity to be spawned during each emmision tick. Default to `1`.

```js
.forced(forced: Boolean)
```

> Sets wether particle displays should be "forced". Which allows the client renderer to ignore user particle config settings. Only works for some particle types like `minecraft:campfire_signal_smoke`. Defaults to `false`

```js
.dust(dust: {Float r, Float g, Float b, Float scale})
```

> if `particle` = `minecraft:dust` then an extra method is available to set the RGB color and scale of the dust particles. Defaults `(1.0, 1.0, 1.0, 1.0)`.

**Example:**

```js
StartupEvents.registry('block', event => {

 event.create('tfg:example_a', 'tfg:particle_emitter_decoration')
    .particles(a => a
        .position(0.5, 0.5, 0.5)
        .range(0.3, 2, 0.3)
        .velocity(0, 0.1, 0)
        .count(6)
        .forced(true)
        .particle('minecraft:dust')
        .dust(0.0, 1.0, 0.2, 1.5))
    .hasTicker(true)
    .emitDelay(5);

});

```

The above example will make a decoration block that spawns 6 green `minecraft:dust` particles in the center of the block with a y-radius of 2 blocks. And an average delay between 0-5 ticks. This block renders as a block entity so particles will spawn even at a distance, and as a decoration builder it behaves similarly to something like a flower block:

![particle_emitter_decoration_example](https://github.com/user-attachments/assets/82e6671e-acc6-4373-abfd-e4a4a03e1bc2)

**Type:** `tfg:active_particle_emitter`

**Extra Methods:**

> 📝 **Note:** active particle emitter consumers use the same methods as the above particle emitter consumers.

```js
.activeParticles(particles: Consumer<ParticleSetBuilder>)
```

> Sets the properties of the spawned particles while the block has the `ACTIVE=TRUE` blockstate.

```js
.inactiveParticles(particles: Consumer<ParticleSetBuilder>)
```

> Sets the properties of the spawned particles while the block has the `ACTIVE=FALSE` blockstate.

```js
.activeLight(active_light: Int)
```

> Sets the emitted light-level while the block has the `ACTIVE=TRUE` blockstate. Clamped `(0-15)`. Optional.

```js
.inactiveLight(active_light: Int)
```

> Sets the emitted light-level while the block has the `ACTIVE=FALSE` blockstate. Clamped `(0-15)`. Optional.

**Example:**

```js
StartupEvents.registry('block', event => {

    event.create('tfg:example_b', 'tfg:active_particle_emitter')
        .activeLight(12)
        .inactiveLight(0)
        // First particle set
        .activeParticles(a => a
            .particle('tfg:fish_school')
            .position(0.5, 1.5, 0.5)
            .range(0.0, 2.0, 0.0)
            .velocity(0.0, 0.0, 0.0)
            .count(5)
            .forced(false)
        )
        // Second particle set
        .activeParticles(a => a
            .particle('minecraft:current_down')
            .position(0.0, 3.8, 0.0)
            .range(5.0, 0.0, 5.0)
            .velocity(0.0, 0.1, 0.0)
            .count(5)
            .forced(false)
        )
        // Third particle set
        .activeParticles(a => a
            .particle('minecraft:current_down')
            .position(0.0, 3.8, 0.0)
            .range(0.5, 0.0, 0.5)
            .velocity(0.0, 0.1, 0.0)
            .count(5)
            .forced(false)
        )
        .hasTicker(true)
        .emitDelay(20);

});
```

***

## Decorative Plant Blocks

We have several types of decorative plants.

The basic `tfg:decorative_plant` will create a block with typical plant block attributes like random offset, instant break, non placeable on unsupported faces, and smaller box size. By default the builder will automatically make loot tables for harvesting the plant with knives, hoes, and scythes. If you want to replace this item with something else, use the `lootItem()` method, which will mean you can only use shears to pick up the 'original' block. It also supports waterlogging with water, sea water, spring water, and mars water. (More fluids can be added via Core)

The `tfg:tall_decorative_plant` does the same thing but as an n-block tall plant. Use the `height()` method to set the maximum height of the tall block, up to a maximum of 5.

`tfg:floating_decorative_plant` inherits from the basic one and is made for plants that float on water, like lily pads. It has a boolean `xz_offset()` method (`true` by default) that controls whether or not this block should have a random XZ offset, for things like algae.

`tfg:attached_decorative_plant` inherits from the basic one and is used for plants that are attached to other blocks, like tfc's artists conk. It will only attach to blocks that have the `tfg:decorative_plant_attachable` tag. It also has a `allowVertical()` boolean method (`false` by default) to allow placements on the top and bottom sides of blocks.

### Methods

```js
event.create(string name, 'tfg:decorative_plant')      // Default box size (3, 0, 3, 13, 7, 13)
```

```js
event.create(string name, 'tfg:tall_decorative_plant') // Default box size (2, 0, 2, 14, 16, 14)
```

### Examples

```js
StartupEvents.registry('block', event => {
 event.create('tfg:test', 'tfg:decorative_plant')
  .soundType('nether_wart')        
  .tagItem('tfg:venus_plants')
  .box(3, 0, 3, 13, 14, 13)
})
```

```js
StartupEvents.registry('block', event => {
 event.create('tfg:test', 'tfg:tall_decorative_plant')
  .soundType('nether_wart')
  .tagItem('tfg:venus_plants')
  .lightLevel(0.4)
  .renderType('translucent')
  .height(3) // 2 by default
})
```

You will also need to provide a blockstate file for the tall_decorative_plant, like this:

It needs states for ALL of the possible heights from 0 to 4, even if some are unused! Otherwise you get log spam.

```json
{
  "variants": {
    "height=0": {
      "model": "tfg:block/test_bottom"
    },
    "height=1": {
      "model": "tfg:block/test_top"
    },
    "height=2": {
      "model": ""
    },
    "height=3": {
      "model": ""
    },
    "height=4": {
      "model": ""
    }
  }
}
```

An example of `tfg:decorative_plant`.
![decorative_plant_example](https://github.com/user-attachments/assets/dea8d5e2-e1f0-4c85-8600-17d6528b655d)
An example of `tfg:tall_decorative_plant`.
![double_decorative_plant_example](https://github.com/user-attachments/assets/56c6b828-e726-43c8-86eb-600af1830e22)
Notes:

* Tall decorative blocks do not currently support cardinal block states.

## Tall Decorative Plant Configured Features

To help with placing the tall decorative plants, there's a `tfg:tall_decorative_plant` configured feature. You can use it like this:

```java
 "type": "tfg:tall_decorative_plant",
 "config": {
  "block": "betterend:lanceleaf",
  "plantHeight": 5,
  "minHeight": 4,
  "maxHeight": 7,
  "middle": 2
 }
```

* `block` specifies the block ID to use. This must be a `tfg:tall_decorative_plant` block.
* `plantHeight` is the "normal" height of the plant to use and should be the same as the `height()` method in the block builder.
* `minHeight` is the minimum height of the plant that you want to be placed. The smallest this can be is `plantHeight - 1`.
* `maxHeight` is the maximum height of the plant that can be placed. The placer will randomly pick a number between these two for the height of the plant, inclusive.
* `middle` is the block state ID to either repeat (for taller plants) or omit (for shorter plants)

For example, with the above configuration, you'll get plants like [0, 1, 3, 4] or [0, 1, 2, 2, 2, 3, 4].

The placer also handles waterlogging for you.

![Tall plant feature](https://github.com/user-attachments/assets/52882c45-d2de-4061-b60b-187905fddeea)

***
***
***