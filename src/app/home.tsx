'use client';
import { Card, Cards } from '@terrafirmagreg-team/ui/components/mdx/card';
import { sectionTabs } from '@terrafirmagreg-team/sites/sections';
import { sectionConfig } from '@terrafirmagreg-team/kit/lib/config';
import { useSectionNames } from '@terrafirmagreg-team/kit/hooks/use-section-names';
import { appName, siteDescription } from '@/config/sections';
import iconUrl from '@/app/icon.png';

export function Home({ sections }: { sections: { key: string; url: string }[] }) {
  const names = useSectionNames();
  const accents = sectionConfig().sectionAccent ?? {};
  const urls = Object.fromEntries(sections.map((s) => [s.key, s.url]));
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <img src={iconUrl.src} alt="" className="size-20 rounded-2xl" />
        <h1 className="text-4xl font-bold">{appName}</h1>
        <p className="max-w-md text-lg text-muted-foreground">{siteDescription}</p>
      </div>
      <Cards className="w-full max-w-3xl">
        {sectionTabs.map(({ key, icon: Icon }) => (
          <Card
            key={key}
            href={urls[key]}
            icon={Icon ? <Icon color={accents[key]} /> : undefined}
            title={names[key]?.title ?? key}
            description={names[key]?.desc}
          />
        ))}
      </Cards>
    </main>
  );
}
