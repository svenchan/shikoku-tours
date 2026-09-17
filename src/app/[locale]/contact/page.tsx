import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { getSite, getTours, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return { title: site.contactPage.title, description: site.contactPage.lead };
}

export default async function ContactPage({
  params,
  searchParams,
}: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const tours = getTours(locale);
  const query = await searchParams;
  const preselected = typeof query.tour === "string" ? query.tour : undefined;

  return (
    <>
      <PageHero
        compact
        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=80"
        alt="Shrine path"
        kicker={site.contactPage.kicker}
        title={site.contactPage.title}
        lead={site.contactPage.lead}
      />
      <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
        <ContactForm
          tours={tours}
          copy={site.contactPage}
          preselectedSlug={preselected}
          locale={locale}
        />
      </div>
    </>
  );
}
