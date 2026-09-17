"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/locales";
import type { SiteContent } from "@/lib/content";

const links = [
  ["tours", "tours"],
  ["about", "about"],
  ["availability", "availability"],
  ["gallery", "gallery"],
  ["reviews", "reviews"],
  ["faq", "faq"],
  ["contact", "contact"],
] as const;

export function MobileMenu({ locale, site }: { locale: Locale; site: SiteContent }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/40 text-paper"
        aria-expanded={open}
        aria-label={open ? site.nav.close : site.nav.menu}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? site.nav.close : site.nav.menu}</span>
        <span className="flex flex-col gap-1.5">
          <span className={`h-px w-5 bg-paper transition ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-paper transition ${open ? "-translate-y-0.5 -rotate-45" : ""}`} />
        </span>
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full border-t border-paper/15 bg-forest px-5 py-6">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map(([key, href]) => (
              <Link
                key={href}
                href={`/${locale}/${href}`}
                className="min-h-12 py-3 text-lg text-paper"
                onClick={() => setOpen(false)}
              >
                {site.nav[key]}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
