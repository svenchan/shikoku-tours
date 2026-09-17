import { isLocale, type Locale } from "@/i18n/locales";
import { notFound } from "next/navigation";
import enFaq from "../../content/en/faq.json";
import nlFaq from "../../content/nl/faq.json";
import enReviews from "../../content/en/reviews.json";
import nlReviews from "../../content/nl/reviews.json";
import enSite from "../../content/en/site.json";
import nlSite from "../../content/nl/site.json";
import enTours from "../../content/en/tours.json";
import nlTours from "../../content/nl/tours.json";
import rawAvailability from "../../content/availability.json";

export type Tour = {
  slug: string;
  title: string;
  duration: string;
  price: string;
  groupSize: string;
  difficulty: string;
  includes: string[];
  excludes: string[];
  meetingPoint: string;
  description: string;
  images: string[];
};

export type FaqItem = { question: string; answer: string };
export type Review = { name: string; quote: string; tourSlug?: string };
export type SiteContent = typeof enSite;
export type DayStatus = "available" | "booked" | "unavailable";

export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

export function getSite(locale: Locale): SiteContent {
  return locale === "nl" ? nlSite : enSite;
}

export function getTours(locale: Locale): Tour[] {
  return (locale === "nl" ? nlTours : enTours) as Tour[];
}

export function getTour(locale: Locale, slug: string): Tour | undefined {
  return getTours(locale).find((tour) => tour.slug === slug);
}

export function getFaq(locale: Locale): FaqItem[] {
  return locale === "nl" ? nlFaq : enFaq;
}

export function getReviews(locale: Locale): Review[] {
  return locale === "nl" ? nlReviews : enReviews;
}

export function getAvailability(): Record<string, DayStatus> {
  const map: Record<string, DayStatus> = {};
  for (const [key, value] of Object.entries(rawAvailability)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
    if (value === "available" || value === "booked" || value === "unavailable") map[key] = value;
  }
  return map;
}

export function dayStatus(dateIso: string, availability: Record<string, DayStatus>): DayStatus {
  return availability[dateIso] ?? "unavailable";
}

export const defaultOgImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80";

export const routes = [
  "",
  "/tours",
  "/about",
  "/availability",
  "/gallery",
  "/reviews",
  "/faq",
  "/contact",
  "/legal",
] as const;

export function getGallery(locale: Locale): { src: string; alt: string }[] {
  return getSite(locale).galleryPage.images;
}
