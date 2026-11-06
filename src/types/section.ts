import type {sectionTabs} from '@terrafirmagreg-team/sites';

export type SectionKey = (typeof sectionTabs)[number]['key'];

export type SectionUrl<S extends SectionKey> = Extract<
  (typeof sectionTabs)[number],
  { key: S }
>['url'];

