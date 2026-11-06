import type {previewRoute} from '@/config/sections';
import type { SectionKey, SectionUrl } from './section';

export type SectionPageProps<S extends SectionKey> =
  PageProps<`${SectionUrl<S>}/[...slug]`>;

export type SectionLayoutProps<S extends SectionKey> = LayoutProps<
  SectionUrl<S>
>;

export type PreviewRouteContext = RouteContext<
  `${typeof previewRoute}/[...slug]`
>;

