import { NextResponse, type NextRequest } from 'next/server';
import { siteUrl } from '@/config/sections';

const canonicalHost = new URL(siteUrl).host;

export function proxy(req: NextRequest) {
  if (req.nextUrl.host === canonicalHost) return NextResponse.next();
  if (req.nextUrl.pathname === '/robots.txt') {
    return new NextResponse('User-Agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}
