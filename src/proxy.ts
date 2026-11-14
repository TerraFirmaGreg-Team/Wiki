import { NextResponse, type NextRequest } from 'next/server';
import { variantSegment } from '@terrafirmagreg-team/kit/lib/variant';
import {
  LANG_COOKIE,
  LANG_HEADER,
} from '@terrafirmagreg-team/translate/lib/lang-cookie';

const VARIANT_KEYS: Record<string, readonly string[]> = {
  guide: ['book', 'entry', 'cat'],
  quest: ['id', 'item', 'category'],
  recipe: ['tool', 'item', 'fluid', 'type', 'id'],
};

const SHARED_KEYS = ['version', 'lang'] as const;

function variantLang(pathname: string): string | null {
  const last = pathname.split('/').at(-1);
  if (!last?.startsWith('~')) return null;
  try {
    return new URLSearchParams(decodeURIComponent(last.slice(1))).get(
      'lang',
    );
  } catch {
    return null;
  }
}

function langHeaders(request: NextRequest): Headers | undefined {
  const lang =
    request.nextUrl.searchParams.get('lang') ??
    variantLang(request.nextUrl.pathname);
  if (lang === null) return undefined;
  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER, lang);
  const cookie = headers.get('cookie');
  headers.set(
    'cookie',
    `${cookie ? `${cookie}; ` : ''}${LANG_COOKIE}=${lang}`,
  );
  return headers;
}

export function proxy(request: NextRequest) {
  const headers = langHeaders(request);
  const next = () =>
    headers ? NextResponse.next({ request: { headers } }) : undefined;
  const [, section, dataset] = request.nextUrl.pathname.split('/');
  const keys = section ? VARIANT_KEYS[section] : undefined;
  if (!keys || !dataset) return next();
  const url = request.nextUrl.clone();
  const variant = new URLSearchParams();
  for (const key of [...keys, ...SHARED_KEYS]) {
    const value = url.searchParams.get(key);
    if (value !== null) variant.set(key, value);
  }
  if (!variant.size) return next();
  url.pathname = `/${section}/${dataset}/${variantSegment(variant)}`;
  url.search = '';
  return NextResponse.rewrite(
    url,
    headers ? { request: { headers } } : undefined,
  );
}

export const config = {
  matcher: ['/((?!api|_next|icon.png|.*\\..*).*)'],
};
