'use client';
import '@/lib/app-init';
import '@/lib/layout-deps';
import dynamic from 'next/dynamic';
import {searchRoute} from '@/config/sections';
import { LangLink } from '@terrafirmagreg-team/ui/components/blocks/lang/link';
import { NextProvider } from 'fumadocs-core/framework/next';
import { LangProvider } from '@terrafirmagreg-team/translate/provider';
import { SearchProvider } from '@terrafirmagreg-team/ui/components/blocks/search/provider';
import { UiRootProvider } from '@terrafirmagreg-team/ui/provider';
import {
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { createLocaleSet } from '@terrafirmagreg-team/translate/create';
import { htmlLang, isLang, resolveLang } from '@terrafirmagreg-team/translate/lib/code';
import { encodeQueryValue, langFromFragment, publishDefaultLang, withLang } from '@terrafirmagreg-team/translate/lib/url';
import type { Lang } from '@terrafirmagreg-team/translate/types/locale';
import type { LocaleRegistry } from '@terrafirmagreg-team/translate/types/locale';
import {
  LocaleRegistryContext,
  useLocaleRegistry,
} from '@terrafirmagreg-team/translate/hooks/use-locale-registry';
import { LangScopeContext, ResolvedLangContext, type LangScopeValue, type ResolvedLangValue } from '@terrafirmagreg-team/translate/hooks/use-resolved-lang';
import { SectionCatalogContext } from '@terrafirmagreg-team/kit/hooks/use-catalog';
import { publishLocationSearch } from '@terrafirmagreg-team/ui/hooks/page/use-location-search';
import { ReadabilityProvider } from '@terrafirmagreg-team/ui/hooks/readability/use-readability';
import { SpotlightTrack } from '@terrafirmagreg-team/ui/components/blocks/readability/track';
import { TooltipProvider } from '@terrafirmagreg-team/ui/components/ui/tooltip';
import { UiProvider, type UiComponents } from '@terrafirmagreg-team/ui/provider';
import type { DatasetCatalog } from '@terrafirmagreg-team/kit/types';

const LazySearchDialog = dynamic(
  () =>
    import('@terrafirmagreg-team/search/components/dialog').then(
      (m) => m.SearchDialog,
    ),
  { ssr: false },
);

const uiComponents: UiComponents = { Link: LangLink };

function SyncHtmlLang({ lang }: { lang: Lang }) {
  const value = htmlLang(lang);
  useLayoutEffect(() => {
    document.documentElement.lang = value;
  }, [value]);
  return null;
}

function LangQuerySync() {
  const searchParams = useSearchParams();
  const { languages, defaultLanguage } = useLocaleRegistry();
  const scope = useContext(LangScopeContext);
  const resolved = useContext(ResolvedLangContext);
  const [hashTick, setHashTick] = useState(0);
  useEffect(() => {
    const onHash = () => setHashTick((tick) => tick + 1);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useLayoutEffect(() => {
    const allowed = scope.langs ?? languages;
    const effectiveDefault = scope.langs?.[0] ?? defaultLanguage;
    const raw = searchParams.get('lang') ?? langFromFragment(window.location.hash);
    const next = resolveLang(raw, allowed, effectiveDefault);
    if (resolved && next !== resolved.lang) resolved.setLang(next);

    const param = searchParams.get('lang');
    if (param !== null && (param === effectiveDefault || !isLang(param, allowed))) {
      const params = new URLSearchParams(searchParams);
      params.delete('lang');
      const q = params.toString();
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${q ? `?${q}` : ''}${window.location.hash}`,
      );
    }
  }, [searchParams, resolved, languages, defaultLanguage, scope.langs, hashTick]);
  return null;
}

function HashAnchorSync() {
  const searchParams = useSearchParams();
  const resolved = useContext(ResolvedLangContext);
  const lang = resolved?.lang;
  const defaultLang = resolved?.defaultLang;
  const initial = useRef(true);
  useEffect(() => {
    let observer: MutationObserver | undefined;
    const sync = (scroll: boolean): boolean => {
      const hash = window.location.hash.slice(1);
      if (!hash) return true;
      const sep = hash.indexOf('&');
      const anchor = sep === -1 ? hash : hash.slice(0, sep);
      if (!anchor) return true;
      const fragParams = new URLSearchParams(sep === -1 ? '' : hash.slice(sep + 1));
      const params = new URLSearchParams(window.location.search);
      const next = fragParams.get('lang') ?? params.get('lang') ?? lang;
      params.delete('lang');

      const explicit = next && next !== defaultLang ? next : undefined;
      const q = params.toString();
      const want = `${window.location.pathname}${q ? `?${q}` : ''}#${anchor}${explicit ? `&lang=${encodeQueryValue(explicit)}` : ''}`;
      const have = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (want !== have) window.history.replaceState(null, '', want);
      const element = document.getElementById(anchor);
      if (!element) return !scroll;
      if (scroll) element.scrollIntoView();
      return true;
    };
    const arm = (scroll: boolean) => {
      observer?.disconnect();
      if (sync(scroll)) return;
      observer = new MutationObserver(() => {
        if (sync(scroll)) observer?.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };
    arm(initial.current);
    initial.current = false;
    const onHashChange = () => arm(true);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      observer?.disconnect();
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [lang, defaultLang, searchParams]);
  return null;
}

function LocationSearchSync() {
  const searchParams = useSearchParams();
  const value = searchParams.toString();
  useLayoutEffect(() => publishLocationSearch(value), [value]);
  return null;
}

function LangRoot({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const pathname = usePathname();
  const registry = useLocaleRegistry();
  const created = useMemo(() => createLocaleSet(registry), [registry]);
  const [lang, setLang] = useState<Lang>(
    initialLang ?? registry.defaultLanguage,
  );
  const [scopeLangs, setScopeLangs] = useState<readonly Lang[] | null>(null);
  const defaultLang = scopeLangs?.[0] ?? registry.defaultLanguage;
  publishDefaultLang(defaultLang);
  const resolved = useMemo<ResolvedLangValue>(
    () => ({ lang, defaultLang, setLang }),
    [lang, defaultLang],
  );
  const scope = useMemo<LangScopeValue>(
    () => ({ langs: scopeLangs, setLangs: setScopeLangs }),
    [scopeLangs],
  );
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);
  const langProps = useMemo(
    () => ({
      ...created.providerProps(lang),
      onLocaleChange(next: string) {
        const href = `${pathnameRef.current}${window.location.search}${window.location.hash}`;
        const lang = /^[a-z]{2}(_[a-z0-9]+)?$/i.test(next)
          ? next
          : registry.defaultLanguage;
        window.history.pushState(null, '', withLang(href, lang, defaultLang));
      },
    }),
    [created, lang, registry, defaultLang],
  );

  return (
    <ResolvedLangContext.Provider value={resolved}>
      <LangScopeContext.Provider value={scope}>
        <UiProvider components={uiComponents}>
          <NextProvider Link={LangLink}>
            <UiRootProvider>
              <LangProvider {...langProps}>
                <SearchProvider
                  SearchDialog={(props) =>
                    props.open ? (
                      <LazySearchDialog api={searchRoute} {...props} />
                    ) : null
                  }
                >
                  <Suspense fallback={null}>
                    <LangQuerySync />
                    <LocationSearchSync />
                    <HashAnchorSync />
                  </Suspense>
                  <SyncHtmlLang lang={lang} />
                  <ReadabilityProvider>
                    <TooltipProvider>
                      <SpotlightTrack />
                      {children}
                    </TooltipProvider>
                  </ReadabilityProvider>
                </SearchProvider>
              </LangProvider>
            </UiRootProvider>
          </NextProvider>
        </UiProvider>
      </LangScopeContext.Provider>
    </ResolvedLangContext.Provider>
  );
}

export function AppProvider({
  children,
  registry,
  catalog,
  initialLang,
}: {
  children: ReactNode;
  registry: LocaleRegistry;
  catalog: DatasetCatalog;
  initialLang?: Lang;
}) {
  return (
    <LocaleRegistryContext.Provider value={registry}>
      <SectionCatalogContext.Provider value={catalog}>
        <LangRoot initialLang={initialLang}>{children}</LangRoot>
      </SectionCatalogContext.Provider>
    </LocaleRegistryContext.Provider>
  );
}

