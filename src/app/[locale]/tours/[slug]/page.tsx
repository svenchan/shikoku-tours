import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite, getTour, getTours, requireLocale } from "@/lib/content";
import { locales } from "@/i18n/locales";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getTours(locale).map((tour) => ({ locale, slug: tour.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tours/[slug]">): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = requireLocale(raw);
  const tour = getTour(locale, slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.description.slice(0, 160),
    openGraph: {
      title: tour.title,
      description: tour.description.slice(0, 160),
      images: [tour.images[0]],
    },
  };
}

export default async function TourDetailPage({
  params,
}: PageProps<"/[locale]/tours/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const tour = getTour(locale, slug);
  if (!tour) notFound();

  const facts = [
    [site.tourDetail.duration, tour.duration],
    [site.tourDetail.price, tour.price],
    [site.tourDetail.groupSize, tour.groupSize],
    [site.tourDetail.difficulty, tour.difficulty],
  ] as const;

  return (
    <>
      <header className="relative h-[62vh] min-h-80">
        <Image src={tour.images[0]} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-forest/85 via-forest/30 to-forest/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="hero-copy mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8 sm:pb-14">
            <Link href={`/${locale}/tours`} className="text-sm text-paper/80 hover:text-paper">
              ← {site.tourDetail.back}
            </Link>
            <h1 className="font-display mt-4 max-w-3xl text-4xl text-paper text-balance sm:text-5xl">
              {tour.title}
            </h1>
          </div>
        </div>
      </header>

      <article className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg leading-relaxed text-ink/90">{tour.description}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {tour.images.slice(1).map((src, i) => (
              <div key={src} className="relative aspect-4/3 overflow-hidden">
                <Image src={src} alt={`${tour.title} ${i + 2}`} fill sizes="50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit bg-paper p-6 lg:sticky lg:top-20">
          <dl className="space-y-4">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs tracking-[0.16em] text-sage uppercase">{label}</dt>
                <dd className="mt-1 text-forest">{value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-xs tracking-[0.16em] text-sage uppercase">{site.tourDetail.meetingPoint}</dt>
              <dd className="mt-1 text-forest">{tour.meetingPoint}</dd>
            </div>
          </dl>
          <div className="mt-8">
            <p className="text-xs tracking-[0.16em] text-sage uppercase">{site.tourDetail.includes}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {tour.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-xs tracking-[0.16em] text-sage uppercase">{site.tourDetail.excludes}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {tour.excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <Link
            href={`/${locale}/contact?tour=${tour.slug}`}
            className="mt-8 flex min-h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium tracking-wide text-paper uppercase hover:bg-accent-dark"
          >
            {site.tourDetail.inquire}
          </Link>
        </aside>
      </article>
    </>
  );
}
