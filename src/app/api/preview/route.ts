import '@/lib/app-server';
import { lookupPagePreview } from '@terrafirmagreg-team/kit/lib/preview/lookup';
import { datasetCatalog } from '@terrafirmagreg-team/kit/lib/datasets';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';
import type { Lang } from '@terrafirmagreg-team/translate/types/locale';
import type { DatasetCatalog } from '@terrafirmagreg-team/kit/types';

const BLOCKED_HOST =
  /^(localhost|.*\.localhost|.*\.(local|internal|lan)|0\.0\.0\.0|\[?::1\]?)$/i;
const PRIVATE_IP =
  /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.)/;

async function fetchExternal(href: string) {
  const target = new URL(href);
  if (
    target.protocol !== 'https:' ||
    BLOCKED_HOST.test(target.hostname) ||
    PRIVATE_IP.test(target.hostname)
  )
    return null;
  const res = await fetch(target, {
    signal: AbortSignal.timeout(5000),
    headers: {
      accept: 'text/html',
      'user-agent': 'TerraFirmaGreg-Wiki/1.0 (+link preview)',
    },
    redirect: 'follow',
  });
  if (!res.ok || !(res.headers.get('content-type') ?? '').includes('html'))
    return null;
  const reader = res.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let html = '';
  while (html.length < 200_000) {
    const { done, value } = await reader.read();
    if (done || !value) break;
    html += decoder.decode(value, { stream: true });
    if (html.includes('</head>')) break;
  }
  void reader.cancel().catch(() => {});
  const og = (prop: string) =>
    html.match(
      new RegExp(
        `<meta[^>]+(?:property|name)=["'](?:og:)?${prop}["'][^>]+content=["']([^"']+)["']`,
        'i',
      ),
    )?.[1] ??
    html.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:)?${prop}["']`,
        'i',
      ),
    )?.[1];
  const title =
    og('title') ??
    html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ??
    target.hostname;
  return {
    title,
    description: og('description'),
    host: target.hostname,
  };
}

export function GET(req: Request) {
  return cachedResponse(req, 60, async () => {
    const url = new URL(req.url);
    const ext = url.searchParams.get('ext');
    if (ext)
      return Response.json(await fetchExternal(ext).catch(() => null));
    const catalog = await datasetCatalog().catch(() => null);
    const preview = lookupPagePreview(
      catalog ?? ({} as DatasetCatalog),
      url.searchParams.get('href') ?? undefined,
      (url.searchParams.get('lang') ?? undefined) as Lang | undefined,
    );
    return Response.json(preview ?? null);
  });
}
