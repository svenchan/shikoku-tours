import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getSite, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return { title: site.aboutPage.title, description: site.aboutPage.lead };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);

  return (
    <>
      <PageHero
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80"
        alt="Quiet water and hills"
        kicker={site.aboutPage.kicker}
        title={site.aboutPage.title}
        lead={site.aboutPage.lead}
      />
      <div className="mx-auto max-w-2xl space-y-6 px-5 py-16 text-lg leading-relaxed text-muted sm:px-8">
        {site.aboutPage.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </>
  );
}
