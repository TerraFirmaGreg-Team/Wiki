---
title: Math
order: 33
---

KaTeX via `remark-math` — `:math[…]` inline, `::math[…]` or `:::math` for display. The classic `$…$` / `$$…$$` syntax also works.

::story[math]

::type-table{path="pkg:ui/types/mdx-directives" name="MathDirectiveProps" cwd}

::::preview[Inline]
Energy: :math[E = mc^2]
::::

::::preview[Block]
:::math
\frac{d}{dx}\left(\int_a^x f(t)\,dt\right) = f(x)
:::
::::
