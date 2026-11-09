import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const LOCALES = /translate[\\/]src[\\/]locales\.ts$/;

const localesSource = `
import { createNamespacedLocaleCatalogs } from './lib/locales.ts';
import { sortLangCodes } from './lib/code.ts';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = fileURLToPath(new URL('./locales/', import.meta.url));
const mods = {};
const walk = (d, rel) => {
  for (const entry of readdirSync(d, { withFileTypes: true })) {
    const relPath = rel + '/' + entry.name;
    if (entry.isDirectory()) walk(join(d, entry.name), relPath);
    else if (entry.name.endsWith('.json'))
      mods['./locales' + relPath] = JSON.parse(
        readFileSync(join(d, entry.name), 'utf8'),
      );
  }
};
walk(dir, '');
export const locales = createNamespacedLocaleCatalogs(mods);
export const uiLanguages = sortLangCodes([
  ...new Set(Object.values(locales).flatMap((catalog) => Object.keys(catalog))),
]);
`;

export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'server-only')
    return { url: 'data:text/javascript,export{}', shortCircuit: true };
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    if (
      error.code !== 'ERR_MODULE_NOT_FOUND' &&
      error.code !== 'ERR_UNSUPPORTED_DIR_IMPORT'
    )
      throw error;
    const candidates = /^\.{1,2}\//.test(specifier)
      ? specifier.endsWith('.js')
        ? [specifier.slice(0, -3) + '.ts', specifier.slice(0, -3) + '.tsx']
        : [
            specifier + '.ts',
            specifier + '.tsx',
            specifier + '/index.ts',
            specifier + '/index.tsx',
          ]
      : [specifier + '/index'];
    for (const candidate of candidates) {
      try {
        return await nextResolve(candidate, context);
      } catch {}
    }
    throw error;
  }
}

export function load(url, context, nextLoad) {
  if (LOCALES.test(url))
    return { format: 'module', source: localesSource, shortCircuit: true };
  if (
    url.startsWith('file:') &&
    /\.tsx?$/.test(url) &&
    url.includes('/node_modules/')
  ) {
    const file = fileURLToPath(url);
    return {
      format: 'module',
      source: ts.transpileModule(readFileSync(file, 'utf8'), {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ESNext,
          jsx: ts.JsxEmit.ReactJSX,
        },
        fileName: file,
      }).outputText,
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}
