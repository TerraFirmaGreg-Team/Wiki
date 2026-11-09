import { existsSync } from 'node:fs';
import { createMDX } from 'fumadocs-mdx/next';
import { createNextStory } from '@fumadocs/story/next';
const localPackages = existsSync(
  new URL('../Web-Foundation/packages', import.meta.url),
);
const withMDX = createMDX({
  macro: { include: ['**/src/**/*.ts', '**/src/**/*.tsx'] },
  remarkImageOptions: { onError: 'ignore' },
});
const withStory = createNextStory();

const config = {
  turbopack: {
    ...(localPackages && { root: '..' }),
    resolveAlias: {
      'fumadocs-ui/components/ui/button':
        '@terrafirmagreg-team/ui/components/ui/button',
    },
  },
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@terrafirmagreg-team/analytics',
    '@terrafirmagreg-team/auth',
    '@terrafirmagreg-team/changelog',
    '@terrafirmagreg-team/crowdin',
    '@terrafirmagreg-team/data',
    '@terrafirmagreg-team/discussions',
    '@terrafirmagreg-team/docs',
    '@terrafirmagreg-team/dump',
    '@terrafirmagreg-team/game',
    '@terrafirmagreg-team/github',
    '@terrafirmagreg-team/guide',
    '@terrafirmagreg-team/kit',
    '@terrafirmagreg-team/mdx',
    '@terrafirmagreg-team/preview',
    '@terrafirmagreg-team/quest',
    '@terrafirmagreg-team/recipe',
    '@terrafirmagreg-team/search',
    '@terrafirmagreg-team/share',
    '@terrafirmagreg-team/sites',
    '@terrafirmagreg-team/translate',
    '@terrafirmagreg-team/ui',
  ],
  async redirects() {
    const locale = '([a-z]{2}_[a-z]{2})';
    const movedDev = '(datagen|fruit_trees|multiblock-script|palm_trees)';
    const movedModpack = '(kubejs-scripts|worldgen|cheat-sheet)';
    const upgraded = '(from-[a-z0-9.-]+)';
    const modpackInfo = '(optional-mods|reinstalling|example_me_resonance_automation)';
    return [
      { source: `/docs/modern/guides/:slug${upgraded}`, destination: '/docs/modern/upgrade-guides/:slug' },
      { source: `/docs/modern/guides/:slug${modpackInfo}`, destination: '/docs/modern/modpack/:slug' },
      { source: '/docs/modern/guides', destination: '/docs/modern' },
      { source: '/docs/modern/development/cheat-sheet', destination: '/docs/modern/developer/modpack/cheat-sheet' },
      { source: `/docs/modern/developer/:slug${movedModpack}`, destination: '/docs/modern/developer/modpack/:slug' },
      { source: '/docs/modern/development/:path*', destination: '/docs/modern/developer/:path*' },
      { source: '/docs/modern/mod/:path*', destination: '/docs/modern/developer/mod/:path*' },
      { source: '/modern/field-guide/:path*', destination: '/guide' },
      { source: '/modern/quest-book/:path*', destination: '/quest' },
      { source: '/modern/recipe-book/:path*', destination: '/recipe' },
      { source: '/modern/en_us/developer/wiki-components-showcase', destination: '/docs/dev/components' },
      { source: `/modern/:lang${locale}/developer/wiki-components-showcase`, destination: '/docs/dev/components?lang=:lang' },
      { source: `/modern/en_us/developer/:slug${movedDev}`, destination: '/docs/modern/developer/mod/:slug' },
      { source: `/modern/:lang${locale}/developer/:slug${movedDev}`, destination: '/docs/modern/developer/mod/:slug?lang=:lang' },
      { source: `/modern/en_us/developer/:slug${movedModpack}`, destination: '/docs/modern/developer/modpack/:slug' },
      { source: `/modern/:lang${locale}/developer/:slug${movedModpack}`, destination: '/docs/modern/developer/modpack/:slug?lang=:lang' },
      { source: '/modern/en_us/developer/:path*', destination: '/docs/modern/developer/:path*' },
      { source: `/modern/:lang${locale}/developer/:path*`, destination: '/docs/modern/developer/:path*?lang=:lang' },
      { source: '/modern/en_us/upgrade-guides/:path*', destination: '/docs/modern/upgrade-guides/:path*' },
      { source: `/modern/:lang${locale}/upgrade-guides/:path*`, destination: '/docs/modern/upgrade-guides/:path*?lang=:lang' },
      { source: '/modern/en_us/modpack/:path*', destination: '/docs/modern/modpack/:path*' },
      { source: `/modern/:lang${locale}/modpack/:path*`, destination: '/docs/modern/modpack/:path*?lang=:lang' },
      { source: '/modern/en_us/mod/:path*', destination: '/docs/modern/developer/mod/:path*' },
      { source: `/modern/:lang${locale}/mod/:path*`, destination: '/docs/modern/developer/mod/:path*?lang=:lang' },
      { source: '/modern/en_us/:path*', destination: '/docs/modern/:path*' },
      { source: `/modern/:lang${locale}/:path*`, destination: '/docs/modern/:path*?lang=:lang' },
      { source: '/modern/:path*', destination: '/docs/modern' },
    ].map((r) => ({ ...r, permanent: true }));
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.md',
        destination: '/api/markdown/docs/:path*',
      },
      {
        source: '/guide/:path*.md',
        destination: '/api/markdown/guide/:path*',
      },
      {
        source: '/changelog/:path*.md',
        destination: '/api/markdown/changelog/:path*',
      },
    ];
  },
};

export default withStory(withMDX(config));
