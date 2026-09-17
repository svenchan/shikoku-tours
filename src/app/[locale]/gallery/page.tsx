import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getGallery, getSite, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return { title: site.galleryPage.title, description: site.galleryPage.lead };
}

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const galleryImages = getGallery(locale);

  return (
    <>
      <PageHero
        compact
        src={galleryImages[0].src}
        alt={galleryImages[0].alt}
        kicker={site.galleryPage.kicker}
        title={site.galleryPage.title}
        lead={site.galleryPage.lead}
      />
      <div className="mx-auto columns-1 gap-4 px-5 py-12 sm:columns-2 sm:px-8 lg:columns-3 lg:px-10">
        {galleryImages.map((image) => (
          <figure key={image.src} className="mb-4 break-inside-avoid">
            <div className="relative aspect-4/3 overflow-hidden">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
          </figure>
        ))}
      </div>
    </>
  );
}
