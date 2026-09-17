import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { Tour } from "@/lib/content";

export function TourCard({ tour, locale, cta }: { tour: Tour; locale: Locale; cta: string }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm bg-paper shadow-[0_1px_0_rgba(28,36,30,0.06)]">
      <Link href={`/${locale}/tours/${tour.slug}`} className="relative block aspect-4/3 overflow-hidden">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 px-5 py-6">
        <p className="text-xs tracking-[0.18em] text-sage uppercase">{tour.duration}</p>
        <h3 className="font-display text-2xl leading-snug text-forest">
          <Link href={`/${locale}/tours/${tour.slug}`} className="hover:text-accent">
            {tour.title}
          </Link>
        </h3>
        <p className="text-sm text-muted">{tour.price} · {tour.groupSize}</p>
        <p className="line-clamp-3 text-[0.95rem] leading-relaxed text-ink/80">
          {tour.description}
        </p>
        <Link
          href={`/${locale}/tours/${tour.slug}`}
          className="mt-auto pt-2 text-sm font-medium text-accent hover:text-accent-dark"
        >
          {cta} →
        </Link>
      </div>
    </article>
  );
}
