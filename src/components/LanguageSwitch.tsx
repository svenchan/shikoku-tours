"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locales";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "nl" : "en";
  const href = pathname.replace(/^\/(en|nl)/, `/${other}`);

  return (
    <Link
      href={href}
      hrefLang={other}
      className="inline-flex min-h-11 items-center rounded-full border border-paper/40 px-3 text-xs tracking-wider text-paper uppercase"
    >
      {other === "nl" ? "NL" : "EN"}
    </Link>
  );
}
