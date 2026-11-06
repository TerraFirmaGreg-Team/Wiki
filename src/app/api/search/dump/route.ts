import '@/lib/app-server';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';
import { INDEX_BUILDERS } from '@/lib/search-indexes';
import {
  buildDumpSearchBlobCached,
  putSearchBlob,
  resolveDumpVersion,
} from '@terrafirmagreg-team/dump/lib/dump-search';

export const revalidate = false;

export function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const ver = url.searchParams.get('ver') ?? undefined;
  const lang = url.searchParams.get('lang') ?? 'en_us';
  if (!id) return Response.json({ error: 'id required' }, { status: 400 });
  return cachedResponse(req, ver ? 3600 : 60, async () => {
    const [blob, resolvedVer] = await Promise.all([
      buildDumpSearchBlobCached(id, ver, lang, INDEX_BUILDERS),
      resolveDumpVersion(id, ver),
    ]);
    if (resolvedVer && Object.keys(blob.data).length) {
      try {
        await putSearchBlob(id, resolvedVer, lang, blob);
      } catch (e) {
        console.warn('[search-dump] persist failed:', e);
      }
    }
    return Response.json(blob);
  });
}

