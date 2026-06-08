---
title: KubeJS 脚本
order: 3
---
# 启动脚本

## 基本说明

* 其他 kubejs 绑定器仍可与以下任何方法配合使用，例如 `.tagBlock()`
* 除非另有说明——所有新方法都可以接受基于基数的方块状态 JSON，允许它们围绕 Y 轴旋转。示例如下。

基于基数的方块状态 JSON 示例。

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

## 自定义 GT 条件

> :bulb: **自定义配方条件：** TFG 拥有多个自定义配方条件，并为 TFC 和 Ad Astra 环境提供了模式绑定。

### 条件方法

**类型：** `含氧条件`

```js
.isOxygenated(event, oxygenated: Boolean)
```

> 设置配方是否需要由 Ad Astra 的氧气 API 提供的含氧环境。如果为 `true`，则配方需要氧气。如果为 `false`，则配方不允许存在氧气。

***

**类型：** `月份条件`

```js
.months(event, months: String[])
```

> 设置配方是否只能在提供的月份白名单期间运行。示例：`march, april, december`

```js
.monthsRange(event, months: String start, String end)
```

> 设置可以运行配方的月份范围。可以循环。示例：`december, june`

***

**类型：** `季节条件`

```js
.seasons(event, seasons: String[])
```

> 设置配方是否只能在提供的季节白名单期间运行。示例：`spring, fall`

```js
.seasonsRange(event, seasons: String start, String end)
```

> 设置可以运行配方的季节范围。可以循环。示例：`summer, winter`

***

**类型：** `温度条件`

```js
.climateAvgTemperatureRange(event, temperate: Float start, Float end)
```

> 设置可以运行配方的平均气候温度范围。最小值：`-1000C`，最大值：`1000C`

```js
.climateAvgTemperatureGreaterThan(event, temperate: Float value)
```

> 设置可以运行配方的最低平均气候温度。

```js
.climateAvgTemperatureLessThan(event, temperate: Float value)
```

> 设置可以运行配方的最高平均气候温度。

***

**类型：** `降雨量条件`

```js
.climateAvgRainfallRange(event, rainfall: Float start, Float end)
```

> 设置可以运行配方的平均气候降雨量范围。最小值：`0mm`，最大值：`500mm`

```js
.climateAvgRainfallGreaterThan(event, rainfall: Float value)
```

> 设置可以运行配方的最低平均气候降雨量。

```js
.climateAvgRainfallLessThan(event, rainfall: Float value)
```

> 设置可以运行配方的最高平均气候降雨量。

***

**类型：** `重力条件`

```js
.gravityRange(event, gravity: Float start, Float end)
```

> 设置可以运行配方的局部重力范围。单位：m/s^2。

```js
.gravityGreaterThan(event, rainfall: Float value)
```

> 设置可以运行配方的最低局部重力。

```js
.gravityLessThan(event, rainfall: Float value)
```

> 设置可以运行配方的最高局部重力。

***

### 自定义条件示例

```js
let a = event.recipes.gtceu.greenhouse('tfg:example')
    .notConsumable(input)
    .itemOutputs(output)
    .duration(20)
    .EUt(20)

TFGRecipeSchemaBindings.isOxygenated(a, true)
```

## 自定义建造器

> :bulb: **粒子建造器：** TFG 有一些建造器，允许创建自定义粒子发射器方块 `tfg:particle_emitter_decoration`、`tfg:particle_emitter` 和 `tfg:active_particle_emitter`。粒子发射器方块使用 `consumer<particles>`，这意味着每个方块可以分配多组粒子。

### 方法类型

**类型：** `tfg:particle_emitter` 与 `tfg:particle_emitter_decoration`

**额外方法：**

```js
.particles(particles: Consumer<ParticleSetBuilder>)
```

> 设置生成粒子的属性。

```js
.hasTicker(ticker: Boolean)
```

> 设置方块是否应成为方块实体并使用专用的计时器。对于自定义粒子延迟以及在玩家直接范围之外继续生成粒子是必需的。默认为 `false`。

```js
.emitDelay(delay: Int);
```

> 需要 `ticker(true)`。定义自定义计时器延迟缩放的上限范围。粒子将在随机刻间隔生成，使用 `Math.max(0, delay)`。默认为 `0`。

***

**额外消费者：** `Consumer<ParticleSetBuilder>`

`ParticleSetBuilder` **方法：**

```js
.position(position: {Double x, Double y, Double z})
```

> 设置粒子发射器的初始起始位置，相对于方块位置的起始顶点。默认为 `(0.5, 0.5, 0.5)`。

```js
.range(range: {Double x, Double y, Double z})
```

> 设置以 `postion` 为中心的所有轴的生成半径。默认为 `(0.25, 1.0, 0.25)`。

```js
.velocity(velocity: {Double x, Double y, Double z})
```

> 设置粒子的初始线速度。默认为 `(0, 0, 0)`。

```js
.particle(particle: {Supplier<SimpleParticleType> | "minecraft:dust"})
```

> 设置要生成的 `SimpleParticleType`。如果 `minecraft:dust` 被使用——则启用 `dust` 方法。

```js
.count(count: Int)
```

> 每次发射刻要生成的粒子数量。默认为 `1`。

```js
.forced(forced: Boolean)
```

> 设置粒子显示是否应为"强制"。这允许客户端渲染器忽略用户的粒子配置设置。仅适用于某些粒子类型，如 `minecraft:campfire_signal_smoke`。默认为 `false`

```js
.dust(dust: {Float r, Float g, Float b, Float scale})
```

> 如果 `particle` = `minecraft:dust`，则有一个额外的方法可用于设置灰尘粒子的 RGB 颜色和缩放比例。默认为 `(1.0, 1.0, 1.0, 1.0)`。

**示例：**

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

上面的示例将创建一个装饰方块，在方块中心生成 6 个绿色的 `minecraft:dust` 粒子，Y 轴半径为 2 个方块。以及 0-5 刻的平均延迟。此方块作为方块实体渲染，因此即使在远处也会生成粒子，并且作为装饰建造器，其行为类似于花朵方块：

![particle_emitter_decoration_example](https://github.com/user-attachments/assets/82e6671e-acc6-4373-abfd-e4a4a03e1bc2)

**类型：** `tfg:active_particle_emitter`

**额外方法：**

> 📝 **注意：** 活动粒子发射器消费者使用与上述粒子发射器消费者相同的方法。

```js
.activeParticles(particles: Consumer<ParticleSetBuilder>)
```

> 设置当方块具有 `ACTIVE=TRUE` 方块状态时生成的粒子的属性。

```js
.inactiveParticles(particles: Consumer<ParticleSetBuilder>)
```

> 设置当方块具有 `ACTIVE=FALSE` 方块状态时生成的粒子的属性。

```js
.activeLight(active_light: Int)
```

> 设置当方块具有 `ACTIVE=TRUE` 方块状态时发出的光照等级。限制在 `(0-15)`。可选。

```js
.inactiveLight(active_light: Int)
```

> 设置当方块具有 `ACTIVE=FALSE` 方块状态时发出的光照等级。限制在 `(0-15)`。可选。

**示例：**

```js
StartupEvents.registry('block', event => {

    event.create('tfg:example_b', 'tfg:active_particle_emitter')
        .activeLight(12)
        .inactiveLight(0)
        // 第一组粒子
        .activeParticles(a => a
            .particle('tfg:fish_school')
            .position(0.5, 1.5, 0.5)
            .range(0.0, 2.0, 0.0)
            .velocity(0.0, 0.0, 0.0)
            .count(5)
            .forced(false)
        )
        // 第二组粒子
        .activeParticles(a => a
            .particle('minecraft:current_down')
            .position(0.0, 3.8, 0.0)
            .range(5.0, 0.0, 5.0)
            .velocity(0.0, 0.1, 0.0)
            .count(5)
            .forced(false)
        )
        // 第三组粒子
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

## 装饰性植物方块

我们有几种类型的装饰性植物。

基本的 `tfg:decorative_plant` 将创建一个具有典型植物方块属性的方块，如随机偏移、瞬间破坏、不能在不受支持的面上放置以及较小的碰撞箱大小。默认情况下，建造器将自动为使用小刀、锄头和镰刀收获植物制作战利品表。如果你想用其他物品替换此物品，请使用 `lootItem()` 方法，这意味着你只能使用剪刀来拾取"原始"方块。它还支持使用水、海水、泉水和沼泽水进行水浸（可以通过 Core 添加更多流体）。

`tfg:tall_decorative_plant` 功能相同，但作为一个 n 格高的植物。使用 `height()` 方法设置高方块的最大高度，最大为 5。

`tfg:floating_decorative_plant` 继承自基本方块，专为漂浮在水上的植物设计，如睡莲。它有一个布尔方法 `xz_offset()`（默认为 `true`），用于控制此方块是否应具有随机 XZ 偏移，适用于藻类等。

`tfg:attached_decorative_plant` 继承自基本方块，用于附着在其他方块上的植物，如 tfc 的艺术家层孔菌。它只会附着在带有 `tfg:decorative_plant_attachable` 标签的方块上。它还有一个 `allowVertical()` 布尔方法（默认为 `false`）以允许放置在方块的顶部和底部侧面。

### 方法

```js
event.create(string name, 'tfg:decorative_plant')      // 默认碰撞箱大小 (3, 0, 3, 13, 7, 13)
```

```js
event.create(string name, 'tfg:tall_decorative_plant') // 默认碰撞箱大小 (2, 0, 2, 14, 16, 14)
```

### 示例

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
  .height(3) // 默认为 2
})
```

你还需要为 tall_decorative_plant 提供一个方块状态文件，如下所示：

它需要为所有可能的高度从 0 到 4 提供状态，即使有些未使用！否则会出现日志垃圾信息。

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

`tfg:decorative_plant` 的示例。
![decorative_plant_example](https://github.com/user-attachments/assets/dea8d5e2-e1f0-4c85-8600-17d6528b655d)
`tfg:tall_decorative_plant` 的示例。
![double_decorative_plant_example](https://github.com/user-attachments/assets/56c6b828-e726-43c8-86eb-600af1830e22)
注意：

* 高大装饰性方块目前不支持基于基数的方块状态。

## 高大装饰性植物配置特性

为了帮助放置高大装饰性植物，有一个 `tfg:tall_decorative_plant` 配置特性。你可以像这样使用它：

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

* `block` 指定要使用的方块 ID。这必须是一个 `tfg:tall_decorative_plant` 方块。
* `plantHeight` 是要使用的植物的"正常"高度，应与方块建造器中的 `height()` 方法相同。
* `minHeight` 是你希望放置的植物的最小高度。最小可以是 `plantHeight - 1`。
* `maxHeight` 是可以放置的植物的最大高度。放置器将在这两个值之间随机选择一个数字作为植物的高度（包含两端）。
* `middle` 是要重复（对于较高的植物）或省略（对于较矮的植物）的方块状态 ID

例如，使用上述配置，你将得到像 [0, 1, 3, 4] 或 [0, 1, 2, 2, 2, 3, 4] 这样的植物。

放置器还会为你处理浸水。

![Tall plant feature](https://github.com/user-attachments/assets/52882c45-d2de-4061-b60b-187905fddeea)

***
***
***