import { ogDefaultResponse } from '@terrafirmagreg-team/preview/lib/og-default';
import { ogPngDataUri } from '@terrafirmagreg-team/dump/lib/dump/assets/og';
import {appName, siteUrl} from '@/config/sections';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';
export const alt = appName;
export const size = { width: 1200, height: 630 } as const;
export const contentType = 'image/png';

export default async function Image() {
  return ogDefaultResponse(
    {
      site: appName,
      siteUrl,
      logo: await ogPngDataUri(
        await readFile(join(process.cwd(), 'src/app/icon.png')),
      ),
    },
    appName,
    'Documentation and gameplay guides',
  );
}
