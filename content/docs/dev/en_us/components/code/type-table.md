---
title: Type Table
order: 21
---

`::type-table` renders a `TypeTable` generated from a TypeScript type. `{cwd}` resolves `path` from the repo root; without it the path is relative to the current page.

::story[type-table]

::type-table{path="pkg:ui/types/mdx-directives" name="TypeTableDirectiveProps" cwd}

