import '@/lib/app-server';
import { lookupPagePreview } from '@terrafirmagreg-team/kit/lib/preview/lookup';
import { datasetCatalog } from '@terrafirmagreg-team/kit/lib/datasets';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';
import type { Lang } from '@terrafirmagreg-team/translate/types/locale';

export function GET(req: Request) {
  return cachedResponse(req, 60, async () => {
    const url = new URL(req.url);
    const preview = lookupPagePreview(
      await datasetCatalog(),
      url.searchParams.get('href') ?? undefined,
      (url.searchParams.get('lang') ?? undefined) as Lang | undefined,
    );
    return Response.json(preview ?? null);
  });
}

