import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getSite, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return { title: site.legalPage.title, description: site.legalPage.title };
}

export default async function LegalPage({ params }: PageProps<"/[locale]/legal">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);

  return (
    <>
      <PageHero
        compact
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80"
        alt="Forest canopy"
        kicker={site.legalPage.kicker}
        title={site.legalPage.title}
      />
      <div className="mx-auto max-w-2xl space-y-10 px-5 py-16 sm:px-8">
        <section>
          <h2 className="font-display text-2xl text-forest">{site.legalPage.privacyTitle}</h2>
          {site.legalPage.privacy.map((p) => (
            <p key={p} className="mt-4 leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </section>
        <section>
          <h2 className="font-display text-2xl text-forest">{site.legalPage.termsTitle}</h2>
          {site.legalPage.terms.map((p) => (
            <p key={p} className="mt-4 leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </section>
      </div>
    </>
  );
}
