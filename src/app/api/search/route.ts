import '@/lib/app-server';
import {
  searchExport,
  searchExportLang,
} from '@terrafirmagreg-team/search/lib/server';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';

export function GET(req: Request) {
  return cachedResponse(req, 600, async () => {
    const lang = new URL(req.url).searchParams.get('lang');
    return Response.json(
      lang ? await searchExportLang(lang) : await searchExport(),
    );
  });
}

