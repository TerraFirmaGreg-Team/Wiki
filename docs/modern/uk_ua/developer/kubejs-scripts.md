---
title: Скрипти KubeJS
order: 3
---

# Скрипти запуску

## Загальна інформація

- Інші зв'язувачі KubeJS все ще працюють із будь-яким із цих методів, наприклад, `.tagBlock()`
- Якщо не вказано інше — усі нові методи можуть приймати блоки із заданими сторонами світу в форматі Json для забезпечення їхнього обертання навколо осі Y. Приклад нижче.

Приклад Json для стану блока із заданими сторонами світу.

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

## Кастомні умови GT

> 💡 **Власні умови рецептів:**  TFG має кілька власних умов рецептів із прив’язками схем для середовищ TFC та Ad Astra.

### Метод умов

**Тип:** `Oxygenated Condition`

```js
.isOxygenated(event, oxygenated: Boolean)
```

> Встановлює, чи рецепт потребує насиченого киснем середовища, яке надається API кисню Ad Astra. Якщо `true`, рецепт потребує кисню. Якщо `false`, рецепт не дозволяє присутність кисню.

***

**Тип:** `Month Condition`

```js
.months(event, months: String[])
```

> Встановлює, чи рецепт може виконуватися лише протягом зазначеного білого списку місяців. Приклад: `march, april, december`

```js
.monthsRange(event, months: String start, String end)
```

> Встановлює діапазон місяців, протягом яких рецепт може виконуватися. Може бути обгорнутий. Наприклад: `december, june`

***

**Тип:** `Season Condition`

```js
.seasons(event, seasons: String[])
```

> Встановлює, чи рецепт може виконуватися лише протягом зазначеного білого списку сезонів. Наприклад: `spring, fall`

```js
.seasonsRange(event, seasons: String start, String end)
```

> Встановлює діапазон сезонів, протягом яких рецепт може виконуватися. Може бути обгорнутий. Наприклад: `summer, winter`

***

**Тип:** `Temperature Condition`

```js
.climateAvgTemperatureRange(event, temperate: Float start, Float end)
```

> Встановлює середній діапазон кліматичної температури, протягом якого рецепт може виконуватися. Мін: `-1000C`, Макс: `1000C`

```js
.climateAvgTemperatureGreaterThan(event, temperate: Float value)
```

> Встановлює мінімальну середню кліматичну температуру, за якої рецепти виконуватимуться.

```js
.climateAvgTemperatureLessThan(event, temperate: Float value)
```

> Встановлює макимальеу середню кліматичну температуру, за якої рецепти виконуватимуться.

***

**Тип:** `Rainfall Condition`

```js
.climateAvgRainfallRange(event, rainfall: Float start, Float end)
```

> Встановлює середній діапазон кліматичних опадів, протягом якого рецепт може виконуватися. Мін: `0mm`, Макс: `500mm`

```js
.climateAvgRainfallGreaterThan(event, rainfall: Float value)
```

> Встановлює мінімальну середню кількість кліматичних опадів, за якої рецепти виконуватимуться.

```js
.climateAvgRainfallLessThan(event, rainfall: Float value)
```

> Встановлює максимальну середню кількість кліматичних опадів, за якої рецепти виконуватимуться.

***

**Тип:** `Gravity Condition`

```js
.gravityRange(event, gravity: Float start, Float end)
```

> Встановлює діапазон локальної гравітації, протягом якого рецепт може виконуватися. В m/s^2.

```js
.gravityGreaterThan(event, rainfall: Float value)
```

> Встановлює мінімальну локальну гравітацію, за якої рецепти виконуватимуться.

```js
.gravityLessThan(event, rainfall: Float value)
```

> Встановлює максимальну локальну гравітацію, за якої рецепти виконуватимуться.

***

### Приклад користувацької умови

```js
let a = event.recipes.gtceu.greenhouse('tfg:example')
    .notConsumable(input)
    .itemOutputs(output)
    .duration(20)
    .EUt(20)

TFGRecipeSchemaBindings.isOxygenated(a, true)
```

## Користувацькі будівники

> 💡 **Будівники частинок:** TFG має кілька будівників, які дозволяють створювати користувацькі блоки випромінювачів частинок — `tfg:particle_emitter_decoration`, `tfg:particle_emitter` та `tfg:active_particle_emitter`. Блоки випромінювачів частинок використовують `consumer<0>`, що означає можливість призначати кілька наборів частинок для одного блоку.

### Типи методів

**Тип:** `tfg:particle_emitter` та `tfg:particle_emitter_decoration`

**Додаткові методи:**

```js
.particles(particles: Consumer<ParticleSetBuilder>)
```

> Встановлює властивості породженої частинки.

```js
.hasTicker(ticker: Boolean)
```

> Встановлює, чи має блок ставати сутністю блоку та використовувати окремого такту. Необхідно для користувацьких затримок частинок. і продовжувати породжувати частинки поза безпосереднім діапазоном гравця Типово `false`.

```js
.emitDelay(delay: Int);
```

> Потребує `ticker(true)` Визначає верхній діапазон масштабування затримки користувацького такту. Частинки будуть породжуватися з випадковими інтервалами такту, використовуючи `Math.max(0, delay)` Типово `0`.

***

**Додаткові споживачі:** `Consumer<ParticleSetBuilder>`

`ParticleSetBuilder` **Методи:**

```js
.position(position: {Double x, Double y, Double z})
```

> Визначає початкову позицію випромінювача частинок відносно початкової вершини позиції блоку. Типово `(0.5, 0.5, 0.5)`.

```js
.range(range: {Double x, Double y, Double z})
```

> Встановлює радіус породження для всіх осей із `postion` як центром Типово `(0.25, 1.0, 0.25)`.

```js
.velocity(velocity: {Double x, Double y, Double z})
```

> Встановлює початкову лінійну швидкість частинки. Типово `(0, 0, 0)`.

```js
.particle(particle: {Supplier<SimpleParticleType> | "minecraft:dust"})
```

> Встановлює `SimpleParticleType`, який має бути породжений. Якщо використовується `minecraft:dust` — активується метод `dust`.

```js
.count(count: Int)
```

> Кількість частинок, які слід породжувати під час кожного такту емісії. Типово `1`.

```js
.forced(forced: Boolean)
```

> Встановлює, чи зображення частинок має бути «примусовим». Що дозволяє рендереру клієнта ігнорувати користувацькі налаштування конфігурації частинок. Працює лише для деяких типів частинок, таких як `minecraft:campfire_signal_smoke`. Типово `false`

```js
.dust(dust: {Float r, Float g, Float b, Float scale})
```

> Якщо `particle` = `minecraft:dust`, тоді доступний додатковий метод для встановлення RGB‑кольору та масштабу частинок пилу. Типово `(1.0, 1.0, 1.0, 1.0)`.

**Приклад:**

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

Наведений приклад створить декоративний блок, який породжуватиме 6 зелених частинок `minecraft:dust` у центрі блоку з радіусом по осі Y у 2 блоки. А середня затримка становитиме від 0 до 5 тактів. Цей блок зображатиметься як блок‑сутність, тому частинки породжуватимуться навіть на відстані, а як декораційний будівник він поводиться подібно до квіткового блоку.

![particle_emitter_decoration_example](https://github.com/user-attachments/assets/82e6671e-acc6-4373-abfd-e4a4a03e1bc2)

**Тип:** `tfg:active_particle_emitter`

**Додаткові методи:**

> 📝 **Примітка:** активні споживачі емітерів частинок використовують ті самі методи, що й наведені вище споживачі емітерів частинок.

```js
.activeParticles(particles: Consumer<ParticleSetBuilder>)
```

> Встановлює властивості породжених частинок, коли блок має стан `ACTIVE=TRUE`.

```js
.inactiveParticles(particles: Consumer<ParticleSetBuilder>)
```

> Встановлює властивості породжених частинок, коли блок має стан `ACTIVE=FALSE`.

```js
.activeLight(active_light: Int)
```

> Встановлює рівень світла, що випромінюється, коли блок має стан `ACTIVE=TRUE`. Обмежено діапазоном `(0–15)`. Додатково.

```js
.inactiveLight(active_light: Int)
```

> Встановлює рівень світла, що випромінюється, коли блок має стан `ACTIVE=FALSE`. Обмежено діапазоном `(0–15)`. Додатково.

**Приклад:**

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

## Декоративні рослинні блоки

Ми маємо кілька типів декоративних рослин.

Базовий `tfg:decorative_plant` створює блок із типовими атрибутами рослинного блоку, такими як випадкове зміщення, миттєве руйнування, неможливість розміщення на непідтримуваних поверхнях та зменшений розмір коробки. Він також підтримує заповнення водою для води, морської води, джерельної води та марсіанської води. (Більше рідин можна додати через Core)

- Типово конструктор автоматично створює таблиці здобичі для збору рослини за допомогою ножів, мотик та кіс. Якщо ти хочеш замінити цей предмет на щось інше, використовуй метод `lootItem()`. Це означатиме, що для підняття «оригінального» блока можна буде використати лише ножиці.
- Якщо ти хочеш надати гравцеві (і лише гравцеві) ефект під час проходження крізь цю рослину, використовуй метод `effect()`, який приймає рядок з ідентифікатором ефекту моба як аргумент. Поки гравець перебуває в просторі рослини, кожні 50 тактів заданий ефект постійно застосовується.

`tfg:tall_decorative_plant` робить те саме, але як n-блокова висока рослина. Використовуй метод `height()`, щоб встановити максимальну висоту високого блока, до максимуму 5.

`tfg:floating_decorative_plant` успадковує властивості базового блока й призначений для рослин, що плавають на воді, як-от латаття. Він має булевий метод `xz_offset()` (Він має булевий метод `xz_offset()` (`true` за замовчуванням), який визначає, чи повинен цей блок мати випадкове зміщення по осях XZ, наприклад для водоростей. `true`), який визначає, чи повинен цей блок мати випадкове зміщення по осях XZ, наприклад для водоростей.

`tfg:attached_decorative_plant` успадковує властивості базового блока й використовується для рослин, що прикріплюються до інших блоків, як-от «artist's conk» у TFC. Він прикріплюється лише до блоків, які мають тег `tfg:decorative_plant_attachable`. Він також має булевий метод `allowVertical()` (типово `false`), який дозволяє розміщення на верхніх та нижніх гранях блоків.

### Методи

```js
event.create(string name, 'tfg:decorative_plant')      // Default box size (3, 0, 3, 13, 7, 13)
```

```js
event.create(string name, 'tfg:tall_decorative_plant') // Default box size (2, 0, 2, 14, 16, 14)
```

### Приклади

```js
StartupEvents.registry('block', event => {
 event.create('tfg:test', 'tfg:decorative_plant')
  .soundType('nether_wart')        
  .tagItem('tfg:venus_plants')
  .box(3, 0, 3, 13, 14, 13)
  .speedFactor(0.85)
  .effect('minecraft:darkness')
  .lootItem('tfc:straw')
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

Тобі також потрібно надати файл blockstate для tfg:tall_decorative_plant, приблизно такого вигляду:

Потрібні стани для **всіх можливих висот від 0 до 4**, навіть якщо деякі не використовуються! Інакше ти отримаєш спам у логах.

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

До прикладу `tfg:decorative_plant`.
![decorative_plant_example](https://github.com/user-attachments/assets/dea8d5e2-e1f0-4c85-8600-17d6528b655d)
До прикладу `tfg:tall_decorative_plant`.
![double_decorative_plant_example](https://github.com/user-attachments/assets/56c6b828-e726-43c8-86eb-600af1830e22)
Нотатки:

- Високі декоративні блоки наразі не підтримують кардинальні стани блока.

## Сконфігуровані особливості високої декоративної рослини

Щоб допомогти з розміщенням високих декоративних рослин, існує сконфігурована особливість `tfg:tall_decorative_plant`. Можеш використати його ось так:

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

- `block` визначає ID блока, який слід використовувати. Це має бути блок `tfg:tall_decorative_plant`.
- `plantHeight` — це «нормальна» висота рослини, яку слід використовувати, і вона має збігатися з методом `height()` у конструкторі блока.
- `minHeight` — це мінімальна висота рослини, яку ти хочеш розмістити. Найменше значення для цього може бути `plantHeight - 1`.
- `maxHeight` — це максимальна висота рослини, яку можна розмістити. Розміщувач випадково вибере число між цими двома значеннями для висоти рослини, включно з межами.
- `middle` — це ID стану блока, який або повторюється (для вищих рослин), або пропускається (для нижчих рослин).

Наприклад, із наведеною вище конфігурацією ти отримаєш рослини на кшталт [0, 1, 3, 4] або [0, 1, 2, 2, 2, 3, 4].

Розміщувач також автоматично обробляє заповнення водою для тебе.

![Tall plant feature](https://github.com/user-attachments/assets/52882c45-d2de-4061-b60b-187905fddeea)

***

***

***