import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, type Locale } from "./i18n/locales";

function getPreferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (header.includes("nl")) return "nl";
  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\..*).*)"],
};
