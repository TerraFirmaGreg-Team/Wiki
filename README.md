# TerraFirmaGreg Wiki

Source for the [TerraFirmaGreg](https://github.com/TerraFirmaGreg-Team) team wiki.

- https://wiki.terrafirmagreg.team

## Layout

```
/
├── content/
│   ├── docs/<pack>/<locale>/<section>/   # wiki pages (modern, vintage, dev)
│   └── changelog/<pack>/<locale>/        # release notes
├── src/                                  # app: routes, views, providers, config
├── public/                               # static assets
└── scripts/
```

Pages: `content/docs/<pack>/<locale>/<section>/<slug>.md`. 
URLs: `/docs/<pack>/<section>/<slug>`.

## Local Development

Node.js, pnpm.

```bash
pnpm install
pnpm dev        # dev server
pnpm build      # production build
pnpm start      # production start server
pnpm check      # types:check + lint
```

## Adding a Page

Create the `.md` file at the same relative path in every locale (`content/docs/<pack>/<locale>/<section>/<slug>.md`) with frontmatter:

```yaml
---
title: Page title
order: 1
---
```

## Contributing

Open a PR for fixes or new pages. Not comfortable with git? Ping us on [Discord](https://discord.com/invite/AEaCzCTUwQ).
