---
title: Twoslash
order: 21
---

`ts twoslash` runs TypeScript analysis on the block at build time:

- hover a token — a popup shows its type and JSDoc
- `^?` under a token — prints the type inline below the line
- `^|` under a position — prints the completion list
- `^^^` under characters — highlights them
- `// @errors: 2322` — declares expected errors (rendered wavy + error line)
- `// @log:`, `// @warn:`, `// @annotate:` — annotated callout lines
- `// ---cut---` — hides everything above the marker (imports, boilerplate)
- `// @filename:` / `// @<tsconfig-flag>` — virtual files and compiler flags

::story[twoslash]

::type-table{path="pkg:ui/types/mdx-directives" name="CodeFenceMetaProps" cwd}
