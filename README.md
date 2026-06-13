# TerraFirmaGreg Wiki

Source for the [TerraFirmaGreg](https://github.com/TerraFirmaGreg-Team) team wiki. Built with [VitePress](https://vitepress.dev).

- https://wiki.terrafirmagreg.team

> **Source of truth.** Edit pages here — the old `Modpack-Modern` wiki is no longer maintained.

## Layout

```
/
├── .vitepress/
│   ├── config.mts          # Site config (locales, sidebar plugin, search)
│   └── i18n/               # UI strings per locale (nav, footer, search, …)
│       ├── en_us.json
│       ├── zh_cn.json
│       └── pt_br.json
├── public/                 # CNAME, favicon, logo
├── docs/
│   ├── index.md            # Root; auto-redirects to visitor's locale
│   └── modern/             # Modpack-Modern namespace
│       ├── en_us/
│       ├── zh_cn/
│       └── pt_br/
├── dev.sh / dev.bat
└── package.json
```

Content paths: `docs/modern/<locale>/<section>/<slug>.md`  
Public URLs: `/modern/<locale>/<section>/<slug>` (e.g. `/modern/en_us/upgrade-guides/from-0.11-to-0.12`).

## Local Development

Needs Node.js >= 20. [pnpm](https://pnpm.io) is the package manager; the launcher scripts fall back to npm.

```bash
# macOS / Linux
./dev.sh           # dev server at http://localhost:5173/
./dev.sh build     # production build
./dev.sh preview   # serve the build locally
```

```bat
:: Windows
dev.bat
dev.bat build
dev.bat preview
```

## Adding a Page

Create the `.md` file at the **same relative path in every locale** (e.g. `docs/modern/en_us/<section>/<slug>.md`). Add frontmatter:

```yaml
---
title: Page title in sidebar
order: 1
---
```

The sidebar is generated automatically from the folder structure. Use `order` to control sort position within a section. For a new section, add an `index.md` in that folder with `title` and `order` for the group heading.

## Adding a Language

1. Copy `docs/modern/en_us/` to `docs/modern/<new-locale>/` and translate the content.
2. Run `node ci/scripts/sync-ui-locales.mjs` (or add `.vitepress/i18n/<new-locale>.json` manually).
3. Register the locale in `language.json` if it is not already listed in `enabledLocales`.

## Contributing

Open a PR for fixes or new pages. Not comfortable with git? Ping us on [Discord](https://discord.com/invite/AEaCzCTUwQ).
