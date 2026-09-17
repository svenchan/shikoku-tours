import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import { getTours, routes } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${base}/en${route}`,
            nl: `${base}/nl${route}`,
          },
        },
      });
    }
    for (const tour of getTours(locale)) {
      const path = `/tours/${tour.slug}`;
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${base}/en${path}`,
            nl: `${base}/nl${path}`,
          },
        },
      });
    }
  }

  return entries;
}
