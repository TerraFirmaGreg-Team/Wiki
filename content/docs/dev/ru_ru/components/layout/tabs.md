---
title: Вкладки
order: 12
---

::story[tabs]

::type-table{path="pkg:ui/types/mdx-directives" name="TabsDirectiveProps" cwd}

Контейнер `:::tabs` с leaf-разделителями `::tab`. Значение вкладки — slug метки.

Не-первая вкладка по умолчанию — `{default="..."}` (совпадение по метке, без учёта регистра):

Внутри вкладок — любой markdown: код, списки, другие директивы.
