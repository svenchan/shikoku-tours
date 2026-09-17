import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { TourCard } from "@/components/TourCard";
import { getSite, getTours, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tours">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return {
    title: site.toursPage.title,
    description: site.toursPage.lead,
  };
}

export default async function ToursPage({ params }: PageProps<"/[locale]/tours">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const tours = getTours(locale);

  return (
    <>
      <PageHero
        src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=2000&q=80"
        alt="Temple buildings among trees"
        kicker={site.toursPage.kicker}
        title={site.toursPage.title}
        lead={site.toursPage.lead}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2">
        {tours.map((tour) => (
          <TourCard key={tour.slug} tour={tour} locale={locale} cta={site.tourDetail.inquire} />
        ))}
      </div>
    </>
  );
}
