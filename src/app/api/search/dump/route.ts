import '@/lib/app-server';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';
import { INDEX_BUILDERS } from '@/lib/search-indexes';
import {
  buildDumpSearchBlobCached,
  putSearchBlob,
} from '@terrafirmagreg-team/dump/lib/dump-search';
import { resolveDatasetSnapshot } from '@terrafirmagreg-team/dump/lib/dump/snapshot';

export function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const ver = url.searchParams.get('ver') ?? undefined;
  const lang = url.searchParams.get('lang') ?? 'en_us';
  if (!id) return Response.json({ error: 'id required' }, { status: 400 });
  return cachedResponse(req, ver ? 3600 : 60, async () => {
    const [blob, snapshot] = await Promise.all([
      buildDumpSearchBlobCached(id, ver, lang, INDEX_BUILDERS),
      resolveDatasetSnapshot({ id, version: ver }),
    ]);
    if (Object.keys(blob.data).length) {
      try {
        await putSearchBlob(snapshot, lang, blob);
      } catch (e) {
        console.warn('[search-dump] persist failed:', e);
      }
    }
    return Response.json(blob);
  });
}

