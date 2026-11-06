import '@/lib/app-server';
import { searchExportLang } from '@terrafirmagreg-team/search/lib/server';
import { knownLanguages } from '@/lib/locales';

export const dynamic = 'force-static';
export const revalidate = false;

export function generateStaticParams() {
  return knownLanguages.map((lang) => ({ lang: `${lang}.json` }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  return Response.json(await searchExportLang(lang.replace(/\.json$/, '')));
}

