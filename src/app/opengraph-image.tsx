import { generateOGImage } from '@terrafirmagreg-team/preview/components/og';
import {appName} from '@/config/sections';

export const dynamic = 'force-static';
export const alt = appName;
export const size = { width: 1200, height: 630 } as const;
export const contentType = 'image/png';

export default function Image() {
  return generateOGImage({
    title: appName,
    description: 'Documentation and gameplay guides',
    site: appName,
  });
}

