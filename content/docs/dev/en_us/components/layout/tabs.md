---
title: Tabs
order: 12
---

::story[tabs]

::type-table{path="pkg:ui/types/mdx-directives" name="TabsDirectiveProps" cwd}

`:::tabs` container with `::tab` leaf separators. Tab value is the slugified label.

Select a non-first tab by default via `{default="..."}` (label match, case-insensitive):

Tab bodies accept any markdown — code blocks, lists, other directives.
