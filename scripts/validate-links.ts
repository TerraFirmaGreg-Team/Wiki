import { register as registerHooks } from 'node:module';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { register } from 'fumadocs-mdx/node';
import {
  printErrors,
  scanURLs,
  validateFiles,
  type FileObject,
} from 'next-validate-link';

type ContentPage = {
  slugs: string[];
  url: string;
  absolutePath: string;
  data: {
    toc?: { url: string }[];
    getText?: (kind: 'raw' | 'processed') => Promise<string>;
  };
};

async function main() {
  registerHooks('./loader-hooks.mjs', import.meta.url);
  register();
  const { registerSectionConfig } = await import(
    '@terrafirmagreg-team/kit/lib/config'
  );
  const { knownLanguages } = await import('../src/lib/locales.ts');
  registerSectionConfig({ knownLanguages });
  const { getDocsSource, getChangelogSource } = await import(
    '../src/lib/sources.ts'
  );

  const [docs, changelog] = await Promise.all([
    getDocsSource(),
    getChangelogSource(),
  ]);
  const docsPages = docs.getPages() as unknown as ContentPage[];
  const changelogPages = changelog.getPages() as unknown as ContentPage[];

  const LANG = /^[a-z]{2,3}_[a-z]{2,4}$/;
  const stripLang = (slugs: string[]) =>
    slugs.filter((slug, index) => !(index === 1 && LANG.test(slug)));
  const runtimeUrl = (route: string, page: ContentPage) =>
    `/${route}/${stripLang(page.slugs).join('/')}`;
  const entry = (page: ContentPage) => ({
    value: { slug: stripLang(page.slugs) },
    hashes: page.data.toc?.map((item) => item.url.slice(1)) ?? [],
  });

  const scanned = await scanURLs({
    preset: 'next',
    pages: [
      join('docs', '[...slug]', 'page.tsx'),
      join('changelog', '[...slug]', 'page.tsx'),
      join('guide', '[...slug]', 'page.tsx'),
      join('quest', '[...slug]', 'page.tsx'),
      join('recipe', '[...slug]', 'page.tsx'),
    ],
    populate: {
      'docs/[...slug]': docsPages.map(entry),
      'changelog/[...slug]': changelogPages.map(entry),
    },
  });
  console.log(
    `Scanned ${scanned.urls.size} URLs, ${scanned.fallbackUrls.length} fallback patterns`,
  );

  const files: FileObject[] = await Promise.all(
    [
      ...docsPages.map((page) => ({ page, route: 'docs' })),
      ...changelogPages.map((page) => ({ page, route: 'changelog' })),
    ].map(
      async ({ page, route }): Promise<FileObject> => ({
        path: page.absolutePath,
        content:
          (await page.data.getText?.('raw')) ??
          (await readFile(page.absolutePath, 'utf8')),
        url: runtimeUrl(route, page),
        data: page.data,
      }),
    ),
  );

  printErrors(
    await validateFiles(files, {
      scanned,
      checkRelativePaths: 'as-url',
      whitelist: (url) => /^[a-z][a-z0-9+.-]*:/i.test(url),
    }),
    true,
  );
}

void main();
