---
title: Посібник зі внеску
order: 1
---

:::banner{variant="fade" gradient}
## Настанови щодо якості
:::
Будь ласка, ознайомся з нашими настановами щодо якості перед тим, як робити внесок у TerraFirmaGreg. Це допоможе гарантувати, що твої внески відповідатимуть нашим стандартам і зроблять процес рецензування простішим для всіх нас.


### а. Стиль

:::details[Інформація]{open}
У цілому ми не будемо притягати тебе до відповідальності за особисті стилістичні вибори у твоїй роботі. Однак, будь ласка, не змінюй роботу інших під свої стилістичні стандарти, якщо ти не працюєш безпосередньо над цією частиною коду. Це потрібно для того, щоб наше програмне середовище здавалося менш обмежувальним і запобігало проблемам під час рецензування коду через зайві зміни. Ми можемо попросити тебе змінити стиль твоєї роботи, якщо її важко рецензувати, вона працює менш ефективно або суперечить загальноприйнятим конвенціям.
:::
### б. Організація

:::details[Інформація]{open}
У наших репозиторіях немає суворих принципів організації. Для більшості випадків намагайся керуватися здоровим глуздом, вирішуючи, куди що має йти. Але принаймні дотримуйся цих правил:

- **Ніякого жорстко закодованого тексту!** Усі відповідні місця мають використовувати Lang-рядки, які слід надсилати до нашого [репозиторію Tools](https://github.com/TerraFirmaGreg-Team/Tools-Modern/tree/dev/LanguageMerger) для перекладу.

- Користувацькі GT-машини/мультиблоки слід додавати у наш [Core Mod](https://github.com/TerraFirmaGreg-Team/Core-Modern), а не робити через KubeJS.

- Рецепти, базові предмети/блоки, матеріали, дані, ресурси, здобич тощо. Слід додавати через [KubeJS](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs), коли це найзручніше, а не у Core Mod.

- Усі користувацькі рецепти, ресурси, предмети, блоки тощо. Слід розміщувати у просторі назв `tfg:`, коли це можливо.

- Усі користувацькі рецепти повинні мати ID.

- Намагайся зберігати скрипти KubeJS у теках під назвами відповідних модів.
:::
### в. Запити на злиття(PR)

:::details[Інформація]{open}
Будь ласка, створюй нову гілку для кожного запиту злиття(pr) і намагайся зосереджувати подання на одній зміні за раз, коли це можливо. Якщо ти хочеш виправити кілька проблем одночасно, роби кілька запитів злиття(pr) якщо тільки зміни не зовсім дрібні.  Коли створюєш запит злиття(pr), принаймні опиши результат своїх змін і додай посилання на будь-які проблеми, які вони можуть вирішити. Наприклад, додавання `Fixes #123` в опис PR автоматично призначить проблему `#123` для закриття. Якщо ти бачиш, що твій PR містить багато файлів, які ти не змінював, це, ймовірно, означає, що твоя гілка не була синхронізована з тією, у яку ти намагаєшся зробити merge. У таких випадках ми попросимо тебе виправити конфлікти.
:::
### г. Мистецький напрямок

:::details[Інформація]{open}
Ми серйозно ставимося до мистецького напрямку та бачення нашого паку. Для нас важливо, щоб усі ресурси дотримувалися єдиного стилю та теми. У цілому всі текстури предметів повинні бути 16x16. Усі блоки повинні відповідати обмеженням моделей версії **1.20.1**; моделі OBJ дозволені лише за суворої необхідності. Очікується дотримання загальних найкращих практик піксель картинки. Якщо ми вважатимемо, що твої ресурси не відповідають нашим стандартам, будь ласка, не сприймай їхню заміну особисто. Якщо ти відчуваєш, що не можеш створити якісні ресурси, але все ж хочеш додати нові предмети, звернися до одного з наших художників, щоб вони допомогли тобі, або напиши Redeix у Discord для поради. Якщо ти хочеш спробувати себе у створенні ресурсів, ми рекомендуємо [Blockbench](https://www.blockbench.net) — для створення моделей [PixelComposer](https://pixel-composer.com) або [Aseprite](https://www.aseprite.org) — для створення текстур Якщо ти хочеш підлаштувати свій стиль під наші стандарти, будь ласка, ознайомся з цим [Посібник зі стилю](https://www.blockbench.net/wiki/guides/minecraft-style-guide).
:::
### ґ. Стандартники кодування

:::details[Інформація]{open}
Хоча стилістичні вподобання можуть відрізнятися, важливо підтримувати ефективні практики програмування в кодовій базі. Будь ласка, намагайся дотримуватися цих принципів при внесках у TFG. Ми залишаємо за собою право відхиляти внески, які не відповідають цим правилам:

- Коли це можливо, слід намагатися використовувати цикли, щоб зменшити кількість зайвого коду. Це не лише покращує читабельність коду, але й підвищує продуктивність, мінімізуючи зайві ітерації. Якщо ти помічаєш, що пишеш повторюваний код, варто розглянути можливість його ре факторингу за допомогою операторів `for`, `while` або `switch`.

- Java — і певною мірою KubeJS — це [мови об'єктноорієнтованого програмування](https://en.wikipedia.org/wiki/Object-oriented_programming), які роблять акцент на створенні модульного та багаторазового коду. Коли це можливо, варто створювати багаторазові функції або методи, які можна буде використовувати надалі в усій кодовій базі.

- **Обов’язково додавай перевірки безпеки!** Це включає валідацію вхідних та вихідних даних, обробку винятків, надання усталених значень та реалізацію механізмів перехоплення помилок.

- Використовуй [JSDocs](https://jsdoc.app), [Javadocs](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/javadoc.html) та коментарі для документування свого коду. Це здебільшого необов’язково, але воно надає додатковий контекст для рецензентів та майбутніх розробників.

- При програмуванні для нашого основного моду, будь ласка, використовуй [Lombok](https://projectlombok.org/features/), адже він допомагає скоротити кількість шаблонного коду та підвищує доступність коду.

- Намагайся не використовувати ["магічні числа"](https://en.wikipedia.org/wiki/Magic_number_(programming)). Винесення жорстко закодованих значень у визначені змінні робить код більш читабельним та простішим у підтримці в майбутньому. Також іноді корисно розділити число на його складові частини для кращої зрозумілості. Наприклад, якщо рецепт триває 10 хвилин, значення можна записати як `12000`, або ж як `20 * 60 * 10` (20 тактів \* 60 секунд \* 10 хвилин). Такий підхід робить код більш зрозумілим і легшим для підтримки.

- При створенні рецептів або функцій намагайся використовувати [Теги](https://minecraft.wiki/w/Tag_(Java_Edition)) замість жорстко закодованих предметів. Це робить твій код більш гнучким і менш схильним до помилок у випадку змін предметів з часом.
:::
:::banner{variant="fade" gradient}
## Використання ШІ / Розкриття інформації
:::
:::details[Інформація]
Використання штучного інтелекту, а точніше LLM, не дозволяється при внесках у TerraFirmaGreg-Modern, наш основний мод чи переклади. Ми розуміємо, що LLM можуть допомогти у діагностиці проблем чи рецензуванні перекладів, і ми можемо неохоче прийняти таке використання. Але загалом увесь код має бути щонайменше на 90% написаний тобою, 100% ресурсів повинні бути створені людиною, і вся робота має бути перевірена тобою. Якщо ти не розумієш програмування при використанні ШІ, не надсилай нам свою роботу — ми цього не хочемо. Якщо ти використовував ШІ для допомоги у діагностиці проблем чи написанні складних частин коду, ти завжди повинен розкривати таке використання для нашого перегляду. Ми можемо попросити переписати певні частини, якщо вони не відповідають нашим стандартам якості. Або повністю відхилити твій запит злиття(pr), якщо вважатимемо, що є достатньо доказів використання ШІ. Якщо ми виявимо, що ти широко використовував ШІ без розкриття цього факту, ти можеш бути заблокований у нашому репозиторії. Ми маємо репутацію, яку слід підтримувати; ми не дозволимо нелюдській роботі зіпсувати наші стандарти якості. Ми маємо репутацію, яку слід підтримувати; ми не дозволимо нелюдській роботі зіпсувати наші стандарти якості.
:::
:::banner{variant="fade" gradient}
## Зовнішні ресурси
:::
Нижче наведено ресурси, які можуть бути корисними при внеску до TerraFirmaGreg. Цей список не є вичерпним, але він має слугувати хорошою відправною точкою для розуміння процесу створення модпаків, розробки модів та використання наших залежностей.


### Minecraft

:::details[Інформація]{open}
- [Minecraft Wiki](https://minecraft.wiki): Найкраще джерело онлайн для отримання інформації про сам Minecraft та його механіки.

- [Minecraft Source](https://linkie.shedaniel.dev/mappings?namespace=mojang_raw&version=1.20.1&search=arrow&translateMode=none): Інструмент для дослідження декомпільованого вихідного коду Minecraft.

- [Data-pack Creation](https://minecraft.wiki/w/Data_pack): Інформація про датапаки, які керують частинами гри, що базуються на даних, такими як теги, здобич, генерація світу тощо.

- [Resource-Pack Creation](https://minecraft.wiki/w/Resource_pack): Інформація про ресурс паки, які керують візуальними аспектами гри, такими як текстури, моделі та мови.

- [Minecraft Asset Explorer](https://mcasset.cloud/1.20.1/): Містить усі стандартні ресурси Minecraft, які зазвичай можна знайти у форматі датапака. Корисно, якщо ти хочеш відредагувати стандартну текстуру Minecraft або подивитися, як створено модель, налаштовану функцію тощо.

- [Jigsaw/ Structure Guide](https://gist.github.com/GentlemanRevvnar/98a8f191f46d28f63592672022c41497): Посібник зі створення власних структур у Minecraft за допомогою системи Jigsaw.

- [Color Codes](https://minecraft.wiki/w/Formatting_codes#Color_codes): Кольорові коди, що використовуються у тексті Minecraft.
:::
### Kubejs

:::details[Інформація]{open}
- [Kubejs Wiki](https://kubejs.com/wiki): Документація для KubeJS. Хоча ця вікі не є найкращою, їхній [старий сайт](https://wiki.latvian.dev/books/kubejs) часто містить трохи більше інформації.

- [Kubejs Offline](https://hunter19823.github.io/kubejsoffline/1.20.1/forge/): Дамп внутрішніх класів KubeJS.

- [Kubejs TFC](https://notenoughmail.github.io/kubejs_tfc/1.20.1/): Всеосяжна вікі для моду Kubejs-TFC, яка детально описує всі його події та утиліти. [Основна TFC Wiki](https://terrafirmacraft.github.io/Documentation/1.20.x/) також може надати певну допомогу.

- [GTCEU Modern Wiki](https://gregtechceu.github.io/GregTech-Modern/1.20.1/Modpacks/): Надає детальну документацію для KubeJS та Java-функцій, які можуть використовуватися розробниками аддонів.

- [Vintage Kubejs](https://kubejs.com/wiki/addons/vintage-kubejs): Надає документацію для аддону Create Vintage-Improvements KubeJS.

- [Kubejs Create](https://kubejs.com/wiki/addons/create): Надає документацію для аддону Create KubeJS.

- [LootJs](https://github.com/AlmostReliable/lootjs/wiki/1.20.1): Документація для LootJs — аддону KubeJS для складної генерації таблиць здобичі за допомогою JavaScript.

- [Greate](https://github.com/GreateBeyondTheHorizon/Greate/wiki): Репозиторна документація для моду Greate.
:::
### Java

:::details[Інформація]{open}
- [Java API](https://docs.oracle.com/en/java/javase/20/docs/api/): Документація Java API для різних класів і методів.

- [Forge Documentation](https://docs.minecraftforge.net/en/1.20.1/gettingstarted/): Онлайн-документація для Forge — фреймворку модифікацій, який використовується нашим модом/модпаком.

- [Mixins Wiki](https://github.com/SpongePowered/Mixin/wiki): Інформація та посилання щодо Mixins — бібліотеки, яка використовується для модифікації класів Java під час виконання.

- [Mixin Squared Wiki](https://github.com/Bawnorton/MixinSquared/wiki): Документація для Mixin Squared — бібліотеки, яка використовується для модифікації інших mixin-ів під час виконання.

- [Mixin Example Sheet](https://wiki.fabricmc.net/tutorial:mixin_examples): Збірка прикладів використання Mixins у Java.

- [Hotswapping Plugin](https://plugins.jetbrains.com/plugin/14832-single-hotswap): Плагін для IDE JetBrains, який дозволяє виконувати гарячу заміну класів Java під час розробки.

- [ModDevGradle Guide](https://github.com/neoforged/ModDevGradle/blob/main/LEGACY.md): Документація для ModDevGradle — плагіна Gradle для розробки модів Minecraft.

- [Maven Guide](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html): Документація для Maven — інструмента автоматизації збірки для проєктів Java.

- [Spotless Source](https://github.com/diffplug/spotless): Репозиторій для Spotless — інструмента форматування та лінтингу коду.
:::
### Розробка модпаків

:::details[Інформація]{open}
- [Pakku Source](https://github.com/juraj-hrivnak/Pakku): Репозиторій для Pakku — інструмента керування залежностями та імпортами модпаків.

- [Patchouli Documentation](https://vazkiimods.github.io/Patchouli/docs/intro): Документація для Patchouli — моду, який відповідає за наш польовий довідник.

- [Phoenix's Material Previewer](https://p-h-o-e-n-i-x-packforge.github.io/PhoenixMaterialArchitect/): Веб-інструмент для попереднього перегляду матеріалів GTCeu.
:::
---

:::banner{variant="fade" gradient}
## Розробка модпаків
:::
Ось покроковий гайд для налаштування середовища розробки та внеску до модпаку TerraFirmaGreg Включаючи інструкції з налаштування Git та [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment). Інформацію про налаштування середовища Java для внеску до нашого основного моду можна знайти в розділі [Java Development](#java-development).

### Відео посібник:

::video{src="https://www.youtube-nocookie.com/embed/vLL7jTtuOuw?si=zptuefwFEuxWtxyU" title="Contribution Guide"}

### 1. Необхідне ПЗ

:::::details[Інформація]{open}
Будь ласка, завантаж і встанови наступне програмне забезпечення, щоб налаштувати своє середовище розробки для внеску до модпаку TerraFirmaGreg.
::::details[Список]
#### Програмне забезпечення
- [Pakku](https://github.com/juraj-hrivnak/Pakku/releases): A tool for dependency management and modpack building.
- [Java 17+](https://www.azul.com/downloads/?package=jdk#zulu): Required for Forge and Pakku to function properly. You can also often download it directly from some MC Launchers like Prsim.
- [PrismLauncher](https://prismlauncher.org/download/windows/): An optimized launcher for Minecraft modifications, making it easier to create separate instances.
- [Visual Studio Code](https://code.visualstudio.com): A code editor with extensive capabilities for working with projects and integrating various plugins. (or any other proper IDE of your choice.)
::::
:::::

---

### 2. Підготовка та управління проєктом

Щоб співпрацювати над проєктом та ефективно ним керувати, будь ласка, дотримуйся інформації, наведеної в цьому розділі. Як проєкт із відкритим кодом, наша кодова база розміщена на GitHub і керується за допомогою Git. Ми не приймаємо окремі файли чи архіви zip, надіслані нам у Discord або інших платформах. Це не лише захищає учасників команди від шкідливих файлів, але й забезпечує відстеження та надання довіри всім користувачам, які роблять внесок.

#### 1. Створення нового зразка у PrismLauncher
::::details[Інформація]
1. Відкрий [PrismLauncher] та натисни кнопку **`Add Instance(додати зразок)`**.

2. У полі **Name** введи назву **`TerraFirmaGreg-Modern`**.

3. Обери версію Minecraft **`1.20.1`** та версію Forge **`47.4.13`** — ці версії необхідні для коректної роботи модпаку.

:::tip
Створення зразка (Обери Forge версії **47.4.13** замість показаної на зображенні)
![Interface for creating a new instance in PrismLauncher](/images/modern/developer/prism-new-instance.png)
:::
::::

#### 2. Пошук теки Prism
::::details[Інформація]
1. Знайди теку зразка в директорії PrismLauncher за шляхом **`TerraFirmaGreg-Modern/minecraft`**.

:::tip
Для швидкого доступу натисни ПКМ на зразку та вибери **`Folder`**.  
![Instance folder in PrismLauncher](/images/modern/developer/prism-folder.png)
:::
::::

#### 3. Зроби форк репозиторію
::::details[Інформація]
Усе це можна зробити у веббраузері.

1. Відкрий репозиторій [TerraFirmaGreg-Modern].

2. Переконайся, що ти ввійшов у свій акаунт, та натисни кнопку **`Fork`**.

3. Налаштуй параметри та натисни кнопку **`Create fork`**.
::::

#### 4. Клонування репозиторію
::::details[Інформація]
Спершу створи нову теку для зберігання своєї теки розробки, щоб уникнути плутанини з конфігураціями.

**Метод A: Visual Studio Code**

1. Відкрий [Visual Studio Code] і переконайся, що ти ввійшов у GitHub. (У нижньому лівому куті користувача)

2. Натисни <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>, щоб відкрити палітру команд.

3. Знайди **`Git: Clone`** та вибери його.

4. Вибери **`Clone from GitHub`**.

5. Знайди назву свого репозиторію ("YourNameHere/TerraFirmaGreg-Modern") та вибери його.

6. Якщо з’явиться запит відкрити наявний клон, натисни **`Clone Again`**.

7. Вибери свою теку розробки для клонування.

**Метод Б: GitHub Desktop**

1. Відкрий [GitHub Desktop] і ввійди у свій акаунт.

2. Вибери **File → Clone repository...**

3. На вкладці **URL** введи: `https://github.com/YourNameHere/TerraFirmaGreg-Modern.git`

4. У полі **Local Path** вибери свою теку розробки.

5. Натисни **Clone**.

**Метод В: Terminal / cmd**  
Це також можна зробити у VSCode, використовуючи термінал унизу екрана.

1. Відкрий **термінал** або **cmd** у кореневій директорії своєї теки розробки.

2. Виконай команду:

```bash
 git clone https://github.com/YourNameHere/TerraFirmaGreg-Modern.git
```
::::

#### 5. Копіювання та зв’язування тек розробки та зразку
::::details[Інформація]
1. Скопіюй усі свої файли з теки розробки в теку **minecraft**.

2. Видали будь‑які теки, які ти плануєш змінювати. Найімовірніше це буде **`kubejs`**.

3. Створи символічне посилання з твоєї теки розробки kubejs до теки prism. Є кілька способів зробити це, найпростіший — використати команду `mklink /d Link Target` у командному рядку.

:::info
Це робиться для того, щоб ти міг редагувати файли у своїй розробницькому зразку без ризику зіпсувати більшість файлів гри.
Якщо ти оновлюєш розробницький зразок, слід також оновити зразок prism.
Технічно можна розробляти безпосередньо в теці зразку, але це настійно не рекомендується.
Якщо все ж таки робиш так, використовуй **.git/info/exclude** як локальний **.gitignore**.
:::
::::

#### 6. Синхронізація залежностей через Pakku
::::details[Інформація]
1. Відкрий **термінал** або **cmd** у кореневій директорії своєї теки зразку Prism.

2. Виконай таку команду:

```bash
  pakku fetch
```

:::info
Ця команда завантажує всі необхідні файли проєкту в теку модпаку. Зверни увагу, що команда може відрізнятися залежно від того, як встановлено Pakku. Якщо команда не працює, спробуй `java -jar pakku.jar fetch`.

Це не оновить твій TerraFirmaGreg-Core-Modern! Продовжуй далі.
:::
3. Відкрий [TerraFirmaGreg-Core-Modern] і завантаж останній реліз.

4. У теці mods знайди файл jar **TerraFirmaGreg-Core-Modern**, видали його та заміни щойно завантаженим.

> Ще новіші релізи можуть бути доступні у GitHub Actions. Крім того, якщо ти розробляєш [TerraFirmaGreg-Core-Modern], jar‑файли ядра можна копіювати автоматично за допомогою локальної властивості Gradle. [Додаткова інформація](/docs/modern/developer/mod/datagen)
::::

#### 7. Робота з гілками та створення Pull Request
::::details[Інформація]
Є два підходи до створення Pull Request: через термінал та через IDE, наприклад Visual Studio Code.

**Позначення гілки**

- **`main`:**
  - Ця гілка містить стабільну, протестовану та випущену версію проєкту.
  - Ніколи не роби push безпосередньо в цю гілку.  Або Pull Request до неї, якщо не маєш дозволу.

- **`dev`:**
  - Основна гілка розробки, де інтегруються нові функції, виправлення помилок та експериментальні зміни.
  - Після тестування зміни з dev можуть бути об’єднані в основну гілку для випуску нової версії.
  - Зміни можуть бути прийняті учасниками команди **Modern-Team**; потрібні щонайменше два схвалення.

- **`feature/bugfix-branch`:**
  - Наприклад, (feature/add-custom-quest) або (bugfix/fix-launch-crash).
  - Рекомендується створювати окремі гілки від dev для розробки конкретних функцій чи виправлення помилок.
  - Після завершення роботи об’єднай їх назад у dev.
  - Учасники команди **Modern-Team** можуть створювати гілки в основному репозиторії.

:::tip
Пам’ятай, ти можеш вільно створювати гілки у своєму форку! Це значно спрощує створення Pull Request.
:::
**Процес створення Pull Request**

**Метод А: Visual Studio Code**

:::tip
Більшість дій у VSCode також можна виконати через командну палітру!
:::
1. **Створення нової гілки:**
   - Відкрий [Visual Studio Code] і переконайся, що ти знаходишся у своїй теці розробки.
   - У бічній панелі відкрий меню **Source Control**.
   - Поруч зі змінами натисни три крапки та вибери **Branch > Create Branch**.
   - У вікні, що з’явиться, введи назву для нової гілки (наприклад, **feature/add-custom-quest** або **bugfix/fix-launch-crash**).
   - Натисни <kbd>Enter</kbd> для підтвердження/ Тепер ти перебуваєш у новій гілці, створеній від гілки dev.

2. **Внеси необхідні зміни до проєкту.**
   - Внеси необхідні зміни до проєкту.
   - Повернись у Source Control, де зобразиться список змінених файлів.
   - Додай опис своїх змін, введи повідомлення коміту та натисни **`Commit`**.

3. **Публікація гілки.**
   - Після коміту змін натисни нову кнопку **`Push`**.
   - Це відправить твою нову гілку на GitHub.

4. **Створення Pull Request.**
   - Після успішного **Push** ти можеш відкрити меню **[Github Pull Requests]** (якщо встановлено) та натиснути **Create Pull Request**.
   - Переконайся, що:
     - Базова гілка для злиття встановлена на **`dev`** основного репозиторію.
     - Заголовок і опис Pull Request містять детальний опис внесених змін, а також посилання на пов’язані Issues за потреби.
   - Натисни **Create Pull Request**, щоб надіслати запит на злиття своїх змін у гілку dev.

:::tip
Ти також можеш створити Pull Request через вебсайт, якщо тобі так зручніше.
:::
**Метод Б: GitHub Desktop**

1. **Створення нової гілки:**
   - Відкрий [GitHub Desktop] і переконайся, що вибрано локальний репозиторій **TerraFirmaGreg-Modern**.
   - У верхньому меню вибери **`Branch → New Branch...`**.
   - У вікні, що з’явиться, введи назву нової гілки (наприклад, **'feature/add-custom-quest'** або **'bugfix/fix-launch-crash'**).
   - Натисни **'Create Branch'**. Тепер ти перебуваєш у новій гілці, створеній від гілки dev.

2. **Внеси необхідні зміни до проєкту.**
   - Зроби необхідні зміни у проєкті, використовуючи свій улюблений редактор коду (наприклад, [Visual Studio Code]).
   - Повернись у GitHub Desktop, відкрий вкладку **'Changes'**, де буде список змінених файлів.
   - Додай опис своїх змін, введи повідомлення коміту та натисни **'Commit to \<branch_name>'**.

3. **Публікація гілки:**
   - Після коміту змін натисни кнопку **'Push origin'** у верхньому правому куті GitHub Desktop.
   - Це відправить твою нову гілку на GitHub.

4. **Створення  Pull Request.**
   - Після успішного **Push** у [GitHub Desktop] з’явиться кнопка **Create Pull Request** або посилання **View on GitHub**. Натисни його.
   - У відкритому вебінтерфейсі GitHub переконайся, що:
     - Базова гілка для злиття встановлена на **'dev'** основного репозиторію.
     - Заголовок і опис Pull Request містять детальний опис внесених змін, а також посилання на пов’язані Issues за потреби.
   - Натисни **Create Pull Request**, щоб надіслати запит на злиття своїх змін у гілку dev.

\*_Method В: Використання терміналу / cmd_

1. **Синхронізація з upstream.**

- Переконайся, що твій локальний репозиторій оновлений. Якщо ти вже налаштував віддалений upstream (офіційний репозиторій), виконай:

  ```bash
    git checkout dev
    git pull upstream dev
  ```

2. **Створення нової гілки для змін.**

- Створення нової гілки для змін:

  ```bash
  git checkout -b feature/name-of-feature
  ```
- Назви свою гілку чітко (наприклад, **feature/add-custom-quest** або **bugfix/fix-crash-on-launch**).

3. **Внесення змін.**

- Внеси зміни до коду, супроводжуючи їх комітами з чіткими повідомленнями:

  ```bash
  git add .
  git commit -m "Brief description of changes made"
  ```

4. **Відправлення гілки на GitHub:**

- Відправ свою гілку у форк:

  ```bash
  git push origin feature/name-of-feature
  ```

5. **Створення Pull Request:**

- Перейди на сторінку свого форку в GitHub.
- Натисни кнопку Compare & Pull Request біля щойно відправленої гілки.
- Переконайся, що як базова гілка вибрана dev основного репозиторію.
- Заповни заголовок і опис Pull Request, вкажи, які проблеми він вирішує, і, якщо можливо, додай посилання на відповідні Issues.
- Надішли запит, натиснувши Create Pull Request.

:::tip
Якщо маєш питання щодо форматування Pull Request або не впевнений, з якою гілкою зливати, звернись до документації проєкту або до команди через [Discord].
:::
::::

#### 8. Обробка та злиття Pull Request
::::details[Інформація]
1. Розгляд Pull Request:

- Після створення Pull Request він потрапляє у чергу на перегляд учасниками команди. Дотримуйся наших [Quality Guidelines](#modernheader-fadegradienttext-quality-guidelines-gradienttextmodernheader), щоб зменшити кількість зауважень.
- Учасники [Dev-Modern] (для злиття в main) або [Contributor-Modern] (для злиття в dev) переглядають зміни, залишають коментарі та за потреби просять виправлення.

2. Внесення виправлень:

- Якщо потрібні правки, автор PR робить їх у своїй гілці, і оновлений коміт автоматично з’являється у відкритому запиті.

3. Схвалення:

- Після внесення всіх виправлень і отримання позитивного відгуку PR вважається схваленим.
- Для злиття у dev потрібно щонайменше два схвалення від учасників команди [Contributor-Modern].

4. Злиття Pull Request:.

- Після схвалення уповноважений учасник або мейнтейнер виконує злиття PR (згідно з правилами проєкту — Squash and Merge).
- Після успішного злиття рекомендується видалити гілку, щоб підтримувати чистоту репозиторію.

5. Після злиття:

- Злиття PR запускає процеси збірки та тестування для перевірки стабільності змін.
- Якщо після злиття виявляються проблеми, створюється новий Pull Request для їх виправлення
::::

---

### 3. Створення складової

Цей розділ містить інформацію про те, як створити нову складову або керувати наявними задачами в модпаку TerraFirmaGreg. Через велику кількість можливих змін ми наводимо лише базові приклади структури проєкту та доступних інструментів.  Для детальнішої інформації про конкретні утиліти звернись до списку [Outside Resources](#modernheader-fadegradienttext-outside-resources-gradienttextmodernheader).

Ми також припускаємо, що ти маєш хоча б базове розуміння програмування на JavaScript та редагування JSON‑файлів.

:::::details[Інформація]{open}
#### 1. Пошук проєкту

а. Якщо ти знайшов проєкт, до якого хочеш зробити внесок у модпак, спершу зв’яжись із командою розробки в Discord або створи GitHub‑issue, щоб ми вирішили, чи приймемо це до нашого репозиторію.

б. Якщо в тебе немає конкретного проєкту, але ти хочеш допомогти, переглянь [GitHub‑Issues](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/issues), щоб знайти щось цікаве. Працюй лише над задачами, позначеними як `Status: Ready` і без поточних `виконавців`. Доброю практикою є залишити коментар у задачі, що ти над нею працюєш, щоб уникнути плутанини. Особливо корисні для нас задачі з міткою `Triage: Help wanted`. кщо ти новачок у створенні модпаків і хочеш взяти відносно просте завдання, зверни увагу на задачі з міткою `Triage: Good first issue`.

#### 2. Навігація по репозиторію

Модпакова частина TerraFirmaGreg зазвичай реалізується через KubeJS. KubeJS — це фреймворк для моддингу, який дозволяє створювати багато аспектів Minecraft за допомогою JavaScript на рушії Rhino. KubeJS може працювати як ресурс пак, дата пак, а також через рефлексію класів — відтворювати деякі поведінки модів.

Файлова структура TFG зазвичай організована наступним чином:

:::tip
Наведи курсор на кожен елемент, щоб побачити опис його призначення. Або натисни, щоб перейти за посиланням до репозиторію. Коли папки позначені як `namespace/`, це означає, що вони розділені за назвою відповідного мода.
:::
::::details[File Structure]{open}
:::files
  - TerraFirmaGreg-Modern
    - [config/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/config "Contains mod configuration files usually involving client modifications.")
    - [defaultconfigs/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/defaultconfigs "Contains mod configuration files usually involving server modifications.")
    - [kubejs/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs "Contains all files related to KubeJS registration.")
      - [assets/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets "Contains resource pack assets. Can be reloaded in game with F3 + T")
        - namespace/
          - [blockstates/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/blockstates "Controls which models are used for a block depending on its current state.")
          - [models/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/models "Holds model JSON files for use by blocks, items, etc.")
          - [molecules/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/molecules "Holds molecule JSON files which show molecule display in GregTech item tooltips.")
          - [particles/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/particles "Holds particle JSON files which determine the appearance of particles.")
          - [textures/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/textures "Holds texture files for everything in the game.")
      - [client_scripts/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/client_scripts "Contains client-side scripts. Can be reloaded in game with /kubejs reload client_scripts and/or F3 + T")
        - [main_client_script.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/client_scripts/main_client_script.js "Main registry file for client-side scripts. All new scripts should be routed through here.")
        - [emixx.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/client_scripts/emixx.js "Client script file used for making EMI++ groupings.")
        - [tooltips.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/client_scripts/tooltips.js "Client script file used to add custom tooltips to items")
      - [data/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/data "Contains data pack assets. Can be reloaded in game with /reload")
        - namespace/
          - [loot_tables/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/data/tfg/loot_tables "Holds custom loot tables which control things like block drops and structure loot.")
          - [structures/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/data/tfg/structures "Holds custom structure nbt files.")
          - [worldgen/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/data/tfg/worldgen "Holds folders related to worldgen like placed_features and configured_features.")
      - [server_scripts/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/server_scripts "Contains server-side scripts. Can be reloaded in game with /kubejs reload server_scripts + /reload")
        - namespace/
          - [events.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/events.js "Event script files handle server-side events like block interactions and item usage.")
          - [loot.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/loot.js "Loot script files handle loot-table generation using LootJS.")
          - [recipes.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/recipes.js "Recipe script files handle creating and removing recipes.")
          - [data.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/data.js "Data script files handle Kubejs-TFC data generation like food-data, heat-data, size-data, etc.")
          - [tags.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/tags.js "Tag script files handle creating and removing item, block, fluid, entity, and biome tags.")
        - [main_server_script.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/main_server_script.js "Main server script which all server script files must be registered in to keep load order consistent.")
      - [startup_scripts/](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/startup_scripts "Contains startup scripts. Cannot be reloaded in game. Requires a restart.")
        - namespace/
          - [blocks.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/blocks.js "Block registry files handle creating new blocks.")
          - [items.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/items.js "Item registry files handle creating new items.")
          - [materials.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/materials.js "Material registry files handle creating new GregTech materials.")
          - [fluids.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/fluids.js "Fluid registry files handle creating new fluids.")
          - [constants.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/constants.js "Constants files are used to store variables to be declared all through out the codebase. Using the global. prefix for functions and constants lets you call them elsewhere.")
        - [main_startup_script.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/main_startup_script.js "Main startup script which all startup script files must be registered in to keep load order consistent.")
    - [CHANGELOG.md](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/CHANGELOG.md "Markdown document detailing changes made to the modpack for each version.")
    - [pakku-lock.json](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/pakku-lock.json "JSON file used to lock pakku to hold our dependencies.")
:::
::::
#### 3. Конвеєр створення

Кроки створення можуть сильно відрізнятися залежно від типу проєкту. Однак для загального розуміння процесу створення нового предмета з рецептами зазвичай виконуються такі дії:

1. У `startup_scripts.js` створи новий предмет. Дотримуйся прикладу вже наявної реєстрації предметів або переглянь [документацію KubeJS](https://wiki.latvian.dev/books/kubejs/page/custom-items) для деталей. На цьому етапі також варто додати теги предмета. Або зробити це на кроці 3, якщо зручніше.

2. Розмісти ресурси для нового предмета у відповідних теках директорії `assets`. Переконайся, що назви та шлях до файлів збігаються з назвою предмета або вказаним у реєстрації шляхом. KubeJS автоматично створює базові моделі, тому зазвичай достатньо надати лише текстуру.

3. У `server_scripts.js` створи рецепти для нового предмета. Використовуй теги, коли це можливо, та надавай кожному рецепту унікальний ID.

4. Якщо хочеш додати власний тултіп до предмета — зроби це у `client_scripts.js`.

5. Подай мовні рядки для нового предмета (і тултіпу, якщо він є) у наш [Tools Repository](https://github.com/TerraFirmaGreg-Team/Tools-Modern/tree/dev/LanguageMerger).

6. Протестуй усі зміни та закоміть їх у свою гілку. Потім створи pull request у dev‑гілку TFG для перегляду.

:::tip
Якщо хочеш додати запис у польовий довідник для свого предмета, відкрий ntre [TFC Assets Folder](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfc/patchouli_books/field_guide/en_us/entries). Також подумай, чи може бути корисним створення квестового запису для цього предмета.
:::
:::::
---

### 4. Додаткова інформація

:::::details[Інформація]{open}
- #### Правила версій:
  - Модпак TFG використовує власний формат інкрементальної версії:
  - **Minor**: нові оновлення ('0.10.0' → '0.10.1')
    - **alpha**: Випущені версії проєкту, які можуть бути нестабільними. (`0.10.0` → `0.10.1 alpha`)
  - **Major**: нові цикли контенту. Зазвичай відокремлюються виходом нового виміру або іншими значними змінами. (`0.10.0` → `0.11.0`)
  - **Release**: коли пак вважається "завершеним" (`0.10.0` → `1.0.0`)

- #### Робота з Git:
  - Створюй окремі гілки для кожної нової функціональності чи виправлення помилок.
  - Регулярно синхронізуй свій форк з оригінальним репозиторієм, щоб уникнути конфліктів.
  - Використовуй зрозумілі повідомлення комітів для кращого розуміння змін.

- #### Налагодження та тестування:
  - Перед внесенням змін переконайся, що проєкт запускається без помилок.
  - Перевір логи PrismLauncher для виявлення потенційних проблем.
  - Використання Visual Studio Code з розширенням [ProbeJs] допомагає швидко знаходити та виправляти помилки.

- #### Документація та обговорення:
  - Якщо виникають питання чи проблеми, звертайся до розділів Issues або Discussions у GitHub‑проєкті, а також до форумів у [Discord](https://discord.com/invite/AEaCzCTUwQ).
  - Колективне обговорення часто допомагає знайти оптимальні рішення та покращити проєкт загалом.

- #### Спільна розробка:
  - Завжди тестуй інтеграцію своїх змін з основним проєктом.
  - Перед надсиланням Pull Request важливо переконатися, що твої зміни не порушують роботу модпаку та відповідають [внутрішньому кодексу поведінки](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/.github/CODE_OF_CONDUCT.md).

- #### Локалізація:
  - Якщо хочеш локалізувати модпак іншою мовою, скористайся платформою [Crowdin](https://terrafirmagreg.crowdin.com).

- #### Linting та підтримка TypeScript:

  Усі конфігурації інструментів розробки знаходяться в теці `kubejs/`

  **Інсталяція:**

  ```bash
  # From the modpack root
  npm install --prefix kubejs

  # Or from the kubejs folder
  npm install
  ```

  **Запуск linter:**

  ```bash
  # From the modpack root
  npm run lint --prefix kubejs
  npm run lint:fix --prefix kubejs

  # Or from the kubejs folder
  cd kubejs
  npm run lint
  npm run lint:fix
  ```

  **Форматування коду:**

:::warning
Не запускай prettier чи lint на весь файл. Або рецензування стане складним і, ймовірно, буде відхилено. Запускай prettier лише для власних змін, використовуючи Format Selection замість Format Document. Якщо це не схвалено учасником команди.
:::
**Перевірка TypeScript:**

1. Встанови залежності (див. вище)

2. Запусти **ProbeJS**, щоб згенерувати типи

3. У файлі **kubejs/tsconfig.json** встанови `"noCheck": false`.
:::::
