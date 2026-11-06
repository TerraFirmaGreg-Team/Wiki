'use server';
import '@/lib/app-server';
import {
  localeRenderer,
  registerLocaleLoader,
  type LocaleLoadResult,
  type LocaleScope,
} from '@terrafirmagreg-team/kit/lib/locale/renderer';
import { loadLocaleRegistry } from '@terrafirmagreg-team/translate/server';
import type { Lang } from '@terrafirmagreg-team/translate/types/locale';

export async function loadLocaleContent(
  scope: LocaleScope,
  lang: Lang,
): Promise<LocaleLoadResult> {
  const entry = localeRenderer(scope.section);
  if (!entry) return null;
  const resolved = await entry.resolve(scope.slug, lang);
  if (resolved && !resolved.isFallback) {
    return {
      node: await entry.render(resolved.page, scope.slug, lang),
      missing: false,
    };
  }
  const { defaultLanguage } = loadLocaleRegistry();
  const fallback = await entry.resolve(scope.slug, defaultLanguage);
  if (!fallback) return null;
  return {
    node: await entry.render(fallback.page, scope.slug, lang),
    missing: true,
  };
}

registerLocaleLoader(loadLocaleContent);

