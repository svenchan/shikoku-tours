import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { SiteContent } from "@/lib/content";
import { MobileMenu } from "@/components/MobileMenu";

const links = [
  ["tours", "tours"],
  ["about", "about"],
  ["availability", "availability"],
  ["gallery", "gallery"],
  ["reviews", "reviews"],
  ["faq", "faq"],
  ["contact", "contact"],
] as const;

export function Header({ locale, site }: { locale: Locale; site: SiteContent }) {
  return (
    <header className="relative sticky top-0 z-50 bg-forest/95 text-paper shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href={`/${locale}`} className="font-display text-xl text-paper sm:text-2xl">
          {site.brand}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map(([key, href]) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className="text-sm text-paper/90 hover:text-paper"
            >
              {site.nav[key]}
            </Link>
          ))}
        </nav>
        <div className="lg:hidden">
          <MobileMenu locale={locale} site={site} />
        </div>
      </div>
    </header>
  );
}
