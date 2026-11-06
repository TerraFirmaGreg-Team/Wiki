---
title: Формулы
order: 33
---

KaTeX через `remark-math` — инлайн `:math[…]`, блок `::math[…]` или `:::math`. Классический синтаксис `$…$` / `$$…$$` тоже работает.

::story[math]

::type-table{path="pkg:ui/types/mdx-directives" name="MathDirectiveProps" cwd}

::::preview[Инлайн]
Энергия: :math[E = mc^2]
::::

::::preview[Блок]
:::math
\frac{d}{dx}\left(\int_a^x f(t)\,dt\right) = f(x)
:::
::::
