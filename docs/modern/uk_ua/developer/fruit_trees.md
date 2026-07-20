---
title: Створення фруктових дерев
order: 9
---

# Фруктові дерева

> Цей документ слугує загальною інструкцією для додавання нових фруктових дерев до TFG. А також містить пояснення щодо функцій класів.

## [Компоненти з боку ядра моду](https://github.com/TerraFirmaGreg-Team/Core-Modern)

### Крок 1) Елемент Enum

Щоб додати нові фруктові дерева, спочатку знайди перелік [FruitTreeType](https://github.com/TerraFirmaGreg-Team/Core-Modern/blob/1560c49084d4981a00c2f7530199fd73c1e0e5d1/src/main/java/su/terrafirmagreg/core/common/data/TFGFruitTree.java#L85) та додай новий елемент enum за зразком

```java
    FruitTreeType(int defaultGrowthDays, Lifecycle[] stages, int floweringLeavesColor, ResourceLocation dimension)
```

- **defaultGrowthDays:** _Дефолтна кількість днів, необхідна для росту._
- **stages:** Стадії життєвого циклу являти собою 12-місячний цикл. Січ - Груд.\*
- **floweringLeavesColor:** _Колір частинок листя у форматі RGB._
- **dimension:** _Вимір, у якому зустрічається це фруктове дерево (використовується лише як інформація для підказки)._

### Крок 2) Ресурси

- Додай текстури в теку ассетів fruit_tree для  [blocks](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/block/fruit_tree), [items](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/item/fruit_trees), та [food](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/dev/src/main/resources/assets/tfg/textures/item/food).

### Крок 3) runData

Запусти `runData`, щоб згенерувати json-файли станів блоків, моделей та луту.

## [Сторона модпаку](https://github.com/TerraFirmaGreg-Team/Modpack-Modern)

### Крок 1) Кліматичний діапазон та фрукти

- Додай дані [climate range](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/constants.food.js#L897) до константи.
- Поки ти перебуваєш в цьому файлі, додай також [fruit info](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/constants.food.js#L655) до константи фруктів. Це згенерує джеми, а також інші пов'язані з фруктами предмети та рецепти.

### Крок 2) Дані про їжу

- Додай [food data](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/server_scripts/tfg/food/data.food.js#L79) для продуктів твоїх фруктових дерев.
- Додай [planter data](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/server_scripts/tfg/food/data.planters.js#L193) для горщиків для бонсаю у теплицях модифікації FirmaLife.
- Додай [fruit tree](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfc/constants.js#L194) константну для генерації рецептів.

### Крок 3) Ресурси

- Увімкни [GEN_JAM_MODELS](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/d6bde70e925152ab3d3797f9197a48aaeccd829a/kubejs/startup_scripts/tfg/food/items.food.js#L62) та запусти модпак один раз, щоб згенерувати моделі джемів, якщо ти додаєш нові види фруктів. Не забудь знову встановити булеве значення на `false` перед відправленням.
- Додай [jam textures](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/textures/block/food/jam).

### Крок 4) Генерація світу

- Створи json-файли configured feature для кожного дерева [Ось так](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/data/tfg/worldgen/configured_feature/nether/crop/lavacado.json).
- Створи json-файли placed feature для кожного дерева [Ось так](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/data/tfg/worldgen/placed_feature/nether/crop/lavacado.json).
- Додай біомні теги для placed features, щоб увімкнути генерацію.

### Крок 5) Польовий довідник

- Додай записи в польовий довідник для кожного нового дерева у відповідну категорію виміру.

## [Сторона репозиторію інструментів](https://github.com/TerraFirmaGreg-Team/Tools-Modern)

- Додай мовні рядки для всього контенту.
