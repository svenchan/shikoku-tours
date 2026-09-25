import { isLocale, type Locale } from "@/i18n/locales";
import { notFound } from "next/navigation";
import nlFaq from "../../content/nl/faq.json";
import nlPosts from "../../content/nl/posts.json";
import nlReviews from "../../content/nl/reviews.json";
import nlSite from "../../content/nl/site.json";
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

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "image"; src: string; alt: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  cover: { src: string; alt: string };
  tourSlug?: string;
  body: PostBlock[];
};

export type FaqItem = { question: string; answer: string };
export type Review = { name: string; quote: string; tourSlug?: string };
export type SiteContent = typeof nlSite;
export type DayStatus = "available" | "booked" | "unavailable";

export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

export function getSite(_locale: Locale): SiteContent {
  return nlSite;
}

export function getTours(_locale: Locale): Tour[] {
  return nlTours as Tour[];
}

export function getTour(locale: Locale, slug: string): Tour | undefined {
  return getTours(locale).find((tour) => tour.slug === slug);
}

export function getFaq(_locale: Locale): FaqItem[] {
  return nlFaq;
}

export function getReviews(_locale: Locale): Review[] {
  return nlReviews;
}

export function getPosts(_locale: Locale): Post[] {
  return [...(nlPosts as Post[])].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return getPosts(locale).find((post) => post.slug === slug);
}

export function readingMinutes(post: Post): number {
  const words = post.body
    .map((block) => (block.type === "image" ? block.alt : block.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00`));
}

export function relatedPosts(locale: Locale, post: Post, limit = 3): Post[] {
  return getPosts(locale)
    .filter((item) => item.slug !== post.slug && item.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, limit);
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
  "/blog",
  "/reviews",
  "/faq",
  "/contact",
  "/legal",
] as const;

