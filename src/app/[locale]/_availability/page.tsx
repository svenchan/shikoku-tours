import type { Metadata } from "next";
import Link from "next/link";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { PageHero } from "@/components/PageHero";
import { getAvailability, getSite, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return { title: site.availabilityPage.title, description: site.availabilityPage.lead };
}

export default async function AvailabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const availability = getAvailability();

  return (
    <>
      <PageHero
        compact
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80"
        alt="Hills in changing weather"
        kicker={site.availabilityPage.kicker}
        title={site.availabilityPage.title}
        lead={site.availabilityPage.lead}
      />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <AvailabilityCalendar
          availability={availability}
          locale={locale}
          labels={{
            prev: site.availabilityPage.prev,
            next: site.availabilityPage.next,
            available: site.availabilityPage.legendAvailable,
            booked: site.availabilityPage.legendBooked,
            unavailable: site.availabilityPage.legendUnavailable,
          }}
        />
        <p className="mt-10 max-w-2xl text-sm text-muted">{site.availabilityPage.note}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-sm font-medium tracking-wide text-paper uppercase hover:bg-accent-dark"
        >
          {site.availabilityPage.cta}
        </Link>
      </div>
    </>
  );
}
