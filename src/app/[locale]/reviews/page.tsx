import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getReviews, getSite, getTour, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/reviews">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return { title: site.reviewsPage.title, description: site.reviewsPage.lead };
}

export default async function ReviewsPage({ params }: PageProps<"/[locale]/reviews">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const reviews = getReviews(locale);

  return (
    <>
      <PageHero
        compact
        src="https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=2000&q=80"
        alt="Garden path"
        kicker={site.reviewsPage.kicker}
        title={site.reviewsPage.title}
        lead={site.reviewsPage.lead}
      />
      <div className="mx-auto max-w-3xl space-y-12 px-5 py-16 sm:px-8">
        {reviews.map((review) => {
          const tour = review.tourSlug ? getTour(locale, review.tourSlug) : undefined;
          return (
            <blockquote key={review.name} className="border-l-2 border-accent pl-6">
              <p className="text-lg leading-relaxed text-ink">“{review.quote}”</p>
              <footer className="mt-4 text-sm text-sage">
                {review.name}
                {tour ? (
                  <>
                    {" · "}
                    <Link href={`/${locale}/tours/${tour.slug}`} className="text-accent hover:text-accent-dark">
                      {tour.title}
                    </Link>
                  </>
                ) : null}
              </footer>
            </blockquote>
          );
        })}
      </div>
    </>
  );
}
