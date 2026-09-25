import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import { getPosts, getTours, routes } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
      });
    }
    for (const tour of getTours(locale)) {
      const path = `/tours/${tour.slug}`;
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
      });
    }
    for (const post of getPosts(locale)) {
      entries.push({
        url: `${base}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
      });
    }
  }

  return entries;
}
