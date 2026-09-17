import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { getFaq, getSite, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return { title: site.faqPage.title, description: site.faqPage.title };
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const faq = getFaq(locale);

  return (
    <>
      <PageHero
        compact
        src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2000&q=80"
        alt="Lantern-lit street"
        kicker={site.faqPage.kicker}
        title={site.faqPage.title}
      />
      <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
        <FaqList items={faq} />
      </div>
    </>
  );
}
