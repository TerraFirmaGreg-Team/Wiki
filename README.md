# TFG Wiki

Source for the [TerraFirmaGreg](https://github.com/TerraFirmaGreg-Team) team wiki. Built with [VitePress](https://vitepress.dev).

- GitHub Pages: <https://terrafirmagreg-team.github.io/Wiki/>
- Custom domain (planned): <https://wiki.terrafirmagreg.team/>

> **Source of truth.** Edit pages here — the old `Modpack-Modern` wiki is no longer maintained.

## Layout

```
docs/
├── .vitepress/config.mts   # Site config (i18n, nav, theme)
├── public/                 # CNAME, favicon, static assets
├── index.md                # Root; auto-redirects to visitor's locale
├── en_us/                  # English  (each locale has its own sidebar.json)
├── zh_cn/                  # Simplified Chinese
└── pt_br/                  # Brazilian Portuguese
```

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

Create the `.md` file at the **same relative path in every locale** (e.g. `docs/<locale>/<section>/<slug>.md`), then add an entry to each `docs/<locale>/sidebar.json`:

```json
{ "text": "...", "link": "/<section>/<slug>" }
```

`link` is **locale-relative** — do not include the locale prefix; the build adds it. Open a PR; merging to `main` deploys.

## Adding a Language

Copy an existing locale directory (e.g. `en_us/`) to `docs/<new-locale>/`, translate the content, then register the locale in `docs/.vitepress/config.mts`.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`. One-time setup: Repo Settings → Pages → **Source**: *GitHub Actions*.

### Switching to a custom domain

The site auto-detects which URL to build for based on whether `docs/public/CNAME` exists:

- **CNAME absent** (current) → `base: '/Wiki/'`, served at `terrafirmagreg-team.github.io/Wiki/`.
- **CNAME present** → `base: '/'`, served at the custom domain. GitHub Pages will 301-redirect `github.io/Wiki/*` to it.

To switch, create `docs/public/CNAME` containing the domain (e.g. `wiki.terrafirmagreg.team`), add a DNS CNAME record for that subdomain pointing to `terrafirmagreg-team.github.io`, and push. **Set up DNS first** — a CNAME file pointing at a non-resolving domain breaks the github.io URL too (it gets 301'd to a broken host).

## Contributing

Open a PR for fixes or new pages. Not comfortable with git? Ping us on [Discord](https://discord.com/invite/AEaCzCTUwQ).
