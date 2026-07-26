---
title: Створення пальмових дерев
order: 8
---

# Пальмові дерева

> Цей документ слугує загальною інструкцією для додавання нових пальмових дерев до TFG. А також містить пояснення щодо функцій класів.

## [Компоненти з боку ядра моду](https://github.com/TerraFirmaGreg-Team/Core-Modern)

### Крок 1) Елемент Enum

Щоб додати нові пальмові дерева, спочатку знайди перелік [FruitTreeType](https://github.com/TerraFirmaGreg-Team/Core-Modern/blob/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/java/su/terrafirmagreg/core/common/data/PalmTrees.java#L39) та додай новий елемент enum за зразком

```java
    PalmTrees(int defaultGrowthDays, int foliageColorIndex, int minGrowthSize, int maxGrowthSize, int minDrops, int maxDrops, Integer clusterAges, String clusterModelShape, boolean specialCluster, boolean specialFruit, Lifecycle[] stages)
```

- **defaultGrowthDays:** _Усталена кількість днів, необхідна для росту._
- **foliageColorIndex:** _Встановлює колір листя на основі індексу рослинності TFC (foliage.png). Діапазон від 0 до 255_
- **minGrowthSize:** _Задає мінімальну кількість блоків стовбура 2-ї стадії для кінцевого розміру вирослого дерева. (5 блоків завжди будуть розміщуватися нижче)_
- **maxGrowthSize:** _Задає максимальну кількість блоків стовбура 2-ї стадії для кінцевого розміру вирослого дерева. (5 блоків завжди будуть розміщуватися нижче)_
- **minDrops:** _Задає мінімальну кількість плодів, які скидає дозріле дерево._
- **maxDrops:** _Задає максимальну кількість плодів, які скидає дозріле дерево._
- **clusterAges:** _Задає кількість стадій дозрівання для блока кластера._
- **clusterModelShape:** _Задає форму моделі для блока кластера. Доступні варіанти: "square", "bundle", "double_bundle", "string"_
- **specialCluster:** _Якщо встановлено false, блок кластера автоматично створиться через {@link PalmClusterBlock}. Якщо значення true, необхідно створити окремий клас._
- **specialFruit:** _Якщо встановлено false, фрукт автоматично створиться як звичайний предмет. Якщо значення true, необхідно створити окремий клас._
- **stages:** _Стадії життєвого циклу. Єдиними допустимими стадіями є {@link Lifecycle#FRUITING} та {@link Lifecycle#DORMANT}._

### Крок 2) Ресурси

- Додай текстури в теку ассетів palm_tree asset folder for [blocks](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/block/palm_tree), [items](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/item/palm_tree), та [food](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/textures/item/food).
- Додай моделі для [palm heads](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/assets/tfg/models/block/palm_tree), хоча ти можеш просто використати іншу крону пальми як батьківську модель. Але все ж рекомендується використовувати унікальні текстури для всіх видів пальм, щоб їх можна було хоч якось відрізнити одну від одної.
- Необов'язково: додай [climate range](https://github.com/TerraFirmaGreg-Team/Core-Modern/tree/40dcc63f51c8abb9bddd9a864b467f3f18a61693/src/main/resources/data/tfg/tfc/climate_ranges/palm_tree) jsons до data теки щоб бути здатним протестувати дерева в dev середовищі. Але кліматичні дані все одно мають бути додані на стороні модпаку для послідовності.

### Крок 3) runData

Запусти `runData`, щоб згенерувати json-файли станів блоків, моделей та луту.

## [Core Mod Side](https://github.com/TerraFirmaGreg-Team/Modpack-Modern)

### Крок 1) Кліматичний діапазон та фрукти

- Додай дані [climate range](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/constants.food.js#L906) до константи. Обов'язково вкажи, в якому вимірі можна знайти це дерево. Це ні на що не впливає, окрім інформації в підказці до саджанця.
- Поки ти перебуваєш в цьому файлі, додай також [fruit info](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/constants.food.js#L678) до константи фруктів. Це згенерує джеми, а також інші пов'язані з фруктами предмети та рецепти.

### Крок 2) Дані про їжу

- Додай [food data](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/food/data.food.js#L95) для продуктів твоїх пальмових дерев.

### Крок 3) Ресурси

- Увімкни [GEN_JAM_MODELS](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/startup_scripts/tfg/food/items.food.js#L62) та запусти модпак один раз, щоб згенерувати моделі джемів, якщо ти додаєш нові види фруктів. Не забудь знову змінити це булеве значення на false перед тим, як робити пуш коду.
- Додай [jam textures](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/assets/tfg/textures/block/food/jam).
- Додай [planter textures](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/assets/tfg/textures/block/palm_tree) для горщика для бонсаю у теплицях модифікації FirmaLife. Це просто 3x3 квадрат у верхньому лівому кутку 16x16 текстури.

### Крок 4) Генерація світу

- Створи файли структур .nbt для кожного розміру висоти для кожного дерева і помісти ці структури в теку [data folder](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/structures/palm_tree). Пам'ятай заповнити порожні простори структурними пустотами за винятком областей, де ростуть пальмові кластери; залиш їх як повітря. Ти також можеш просто скопіювати вже наявну структуру пальми та використати nbt-редактор, щоб замінити блоки на блоки від твоєї власної пальми.
- Створи [configured feature](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/worldgen/configured_feature/earth/crop/palm_tree) jsons для кожного дерева.
- Створи [placed feature](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/data/tfg/worldgen/placed_feature/earth/crop/palm_tree) jsons для кожного дерева.
- Додай [biome tags](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/overworld/tags.overworld.js#L551) для розміщених особливостей щоб увімкнути генерацію.

### Крок 5) Польовий довідник

- Додай записи в польовий довідник для кожного нового дерева у відповідну категорію виміру.

### Необов’язковий\*)

- Інформація про горщики теплиці Firmalife генерується автоматично за допомогою переліку (enum). Але ти можеш змінити регістр [тут](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/food/data.planters.js#L233).
- Рецепти для електричної теплиці генеруються автоматично на основі enum. Але ти можеш змінити регістр [тут](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/f64e735e44db247b3c044ac31f7462046b5d0233/kubejs/server_scripts/tfg/aquaponics/recipes.greenhouse.js#L529).

## [Сторона репозиторію інструментів](https://github.com/TerraFirmaGreg-Team/Tools-Modern)

- Додай мовні рядки для всього [ось так](https://github.com/TerraFirmaGreg-Team/Tools-Modern/pull/500/changes)
