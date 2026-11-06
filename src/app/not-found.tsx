'use client';
import { usePathname } from 'next/navigation';
import { FileQuestion } from 'lucide-react';
import { isSectionKey } from '@terrafirmagreg-team/sites/location';
import { useSectionCatalog } from '@terrafirmagreg-team/kit/hooks/use-catalog';
import { useTranslations } from '@terrafirmagreg-team/translate/hooks/use-translations';
import { LangLink } from '@terrafirmagreg-team/ui/components/blocks/lang/link';

export default function NotFound() {
  const pathname = usePathname();
  const catalog = useSectionCatalog();
  const t = useTranslations();
  const parts = pathname.split('/').filter(Boolean);
  const section = isSectionKey(parts[0]) ? parts[0] : undefined;
  const datasets = section ? catalog[section] : undefined;
  const known = datasets?.some((dataset) => dataset.id === parts[1]);
  const href =
    section && datasets?.length
      ? `/${section}/${known ? parts[1] : datasets[0].id}`
      : '/';

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 p-8 text-muted-foreground">
      <FileQuestion className="size-10" />
      <p>{t('Page not found', { note: 'ui.not_found' })}</p>
      <LangLink
        href={href}
        className="text-sm underline underline-offset-4 transition-colors hover:text-foreground"
      >
        {t('Back', { note: 'ui.back' })}
      </LangLink>
    </main>
  );
}

