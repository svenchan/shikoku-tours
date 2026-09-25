import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n/locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    request.nextUrl.pathname = `/${defaultLocale}${rest}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const availability = locales.some(
    (locale) => pathname === `/${locale}/availability` || pathname.startsWith(`/${locale}/availability/`),
  );
  if (availability || pathname === "/availability" || pathname.startsWith("/availability/")) {
    const locale = locales.find((item) => pathname.startsWith(`/${item}/`)) ?? defaultLocale;
    request.nextUrl.pathname = `/${locale}/contact`;
    return NextResponse.redirect(request.nextUrl);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\..*).*)"],
};
