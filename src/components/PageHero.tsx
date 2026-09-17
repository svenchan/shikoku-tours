import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  kicker?: string;
  title: string;
  lead?: string;
  compact?: boolean;
};

export function PageHero({ src, alt, kicker, title, lead, compact }: Props) {
  return (
    <header className="relative overflow-hidden">
      <div className={`relative ${compact ? "h-[42vh] min-h-64" : "h-[70vh] min-h-[28rem]"} w-full`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest/85 via-forest/35 to-forest/15" />
        <div className="absolute inset-0 flex items-end">
          <div className="hero-copy mx-auto w-full max-w-6xl px-5 pb-10 pt-10 text-paper sm:px-8 sm:pb-14">
            {kicker ? (
              <p className="mb-3 text-xs font-medium tracking-[0.22em] text-stone uppercase">
                {kicker}
              </p>
            ) : null}
            <h1 className="font-display max-w-3xl text-4xl leading-[1.1] text-balance sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {lead ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/90 sm:text-lg">
                {lead}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
