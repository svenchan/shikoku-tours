import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TourCard } from "@/components/TourCard";
import { getReviews, getSite, getTours, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return {
    title: { absolute: `${site.brand} — ${site.tagline}` },
    description: site.home.heroLead,
    openGraph: {
      title: `${site.brand} — ${site.tagline}`,
      description: site.home.heroLead,
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const tours = getTours(locale).slice(0, 3);
  const reviews = getReviews(locale).slice(0, 3);

  return (
    <>
      <section className="relative h-[88vh] min-h-[32rem]">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Cedar mountains in Shikoku"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest via-forest/40 to-forest/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="hero-copy mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
            <p className="mb-3 text-xs font-medium tracking-[0.22em] text-stone uppercase">
              {site.home.heroKicker}
            </p>
            <h1 className="font-display max-w-3xl text-4xl leading-[1.08] text-paper text-balance sm:text-6xl">
              {site.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/90">
              {site.home.heroLead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium tracking-wide text-paper uppercase hover:bg-accent-dark"
              >
                {site.home.heroPrimary}
              </Link>
              <Link
                href={`/${locale}/tours`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-paper/50 px-6 text-sm font-medium tracking-wide text-paper uppercase hover:bg-paper/10"
              >
                {site.home.heroSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <h2 className="font-display text-3xl text-forest sm:text-4xl">{site.home.introTitle}</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">{site.home.introBody}</p>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-forest sm:text-4xl">{site.home.featuredTitle}</h2>
            <Link href={`/${locale}/tours`} className="text-sm text-accent hover:text-accent-dark">
              {site.home.featuredCta} →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} locale={locale} cta={site.home.featuredCta} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl text-forest">{site.home.reviewsTitle}</h2>
          <Link href={`/${locale}/reviews`} className="text-sm text-accent">
            {site.home.reviewsCta} →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.name} className="border-t border-stone pt-6">
              <p className="leading-relaxed text-ink/85">“{review.quote}”</p>
              <footer className="mt-4 text-sm text-sage">{review.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-stone bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl text-forest sm:text-4xl">{site.home.aboutTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{site.home.aboutBody}</p>
            <Link
              href={`/${locale}/about`}
              className="mt-8 inline-block text-sm font-medium text-accent hover:text-accent-dark"
            >
              {site.home.aboutCta} →
            </Link>
          </div>
          <div className="relative aspect-4/5 overflow-hidden rounded-sm md:aspect-4/3">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80"
              alt="Walking with a pack through hills"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h2 className="font-display text-3xl text-forest sm:text-4xl">{site.home.finalTitle}</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted">{site.home.finalBody}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-8 text-sm font-medium tracking-wide text-paper uppercase hover:bg-accent-dark"
        >
          {site.home.finalCta}
        </Link>
      </section>
    </>
  );
}
