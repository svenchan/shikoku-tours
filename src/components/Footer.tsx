import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { SiteContent } from "@/lib/content";

export function Footer({ locale, site }: { locale: Locale; site: SiteContent }) {
  return (
    <footer className="mt-auto border-t border-stone bg-forest text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{site.brand}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/75">{site.footer.blurb}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href={`/${locale}/tours`} className="hover:text-stone">{site.nav.tours}</Link>
          <Link href={`/${locale}/contact`} className="hover:text-stone">{site.nav.contact}</Link>
          <Link href={`/${locale}/legal`} className="hover:text-stone">{site.footer.legal}</Link>
        </div>
        <p className="text-sm text-paper/60 md:text-right">
          © 2026 {site.guideName}. {site.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
