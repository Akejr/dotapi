import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/content/types';

/**
 * Every page lives under a locale segment. Requests without one go to the
 * default locale — English — regardless of the browser's Accept-Language: this
 * page sells into Angola from abroad, so English is the intended first
 * impression. Visitors switch to Portuguese with the header control.
 *
 * The matcher below already excludes API routes, framework assets and metadata
 * files, so this only ever sees page requests.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;

  /*
   * 308, not the default 307. Sending English is a permanent structural decision,
   * so crawlers should consolidate signals onto the target and stop re-checking
   * the bare path. 308 also guarantees the method is preserved.
   */
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    /*
     * Skip API routes, Next internals and anything that looks like a file
     * (robots.txt, sitemap.xml, icon.png, og images, …).
     */
    '/((?!api|_next/static|_next/image|.*\\.).*)',
  ],
};
