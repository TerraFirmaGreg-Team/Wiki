import '@/lib/section-routes';
import { SectionLayout } from '@terrafirmagreg-team/kit/components/views/routes';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children?: ReactNode }) {
  return <SectionLayout>{children}</SectionLayout>;
}
