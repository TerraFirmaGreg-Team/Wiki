import type { previewRoute } from '@/config/sections';

export type PreviewRouteContext = RouteContext<
  `${typeof previewRoute}/[...slug]`
>;
