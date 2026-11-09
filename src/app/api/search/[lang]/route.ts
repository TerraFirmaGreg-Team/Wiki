import '@/lib/app-server';
import { searchExportLang } from '@terrafirmagreg-team/search/lib/server';
import { siteLanguages } from '@terrafirmagreg-team/kit/lib/languages';
import { datasetCatalog } from '@terrafirmagreg-team/kit/lib/datasets';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return siteLanguages(await datasetCatalog()).map((lang) => ({
    lang: `${lang}.json`,
  }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  return Response.json(await searchExportLang(lang.replace(/\.json$/, '')));
}

