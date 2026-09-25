import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { ShareButtons } from "@/components/ShareButtons";
import { locales } from "@/i18n/locales";
import {
  formatPostDate,
  getPost,
  getPosts,
  getSite,
  getTour,
  readingMinutes,
  relatedPosts,
  requireLocale,
} from "@/lib/content";

export function generateStaticParams() {
  return locales.flatMap((locale) => getPosts(locale).map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = requireLocale(raw);
  const post = getPost(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover.src] },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const tour = post.tourSlug ? getTour(locale, post.tourSlug) : undefined;
  const ctaHref = tour ? `/${locale}/tours/${tour.slug}` : `/${locale}/contact`;
  const ctaLabel = tour ? site.blogPage.ctaTour : site.blogPage.ctaContact;
  const related = relatedPosts(locale, post);

  return (
    <article className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
      <Link href={`/${locale}/blog`} className="text-sm text-accent hover:text-accent-dark">
        {site.blogPage.back}
      </Link>
      <p className="mt-6 text-sm text-muted">
        {post.author} · {formatPostDate(post.date)} · {readingMinutes(post)} {site.blogPage.minutes}
      </p>
      <h1 className="font-display mt-3 text-4xl leading-tight text-forest sm:text-5xl">{post.title}</h1>
      <div className="relative mt-8 aspect-4/3 overflow-hidden rounded-sm">
        <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(max-width: 768px) 100vw, 42rem" className="object-cover" />
      </div>
      <div className="mt-10 space-y-6">
        {post.body.map((block, index) => {
          if (block.type === "h2") {
            return (
              <h2 key={index} className="font-display pt-4 text-3xl text-forest">
                {block.text}
              </h2>
            );
          }
          if (block.type === "image") {
            return (
              <div key={index} className="relative aspect-4/3 overflow-hidden rounded-sm">
                <Image src={block.src} alt={block.alt} fill sizes="(max-width: 768px) 100vw, 42rem" className="object-cover" />
              </div>
            );
          }
          return (
            <p key={index} className="text-lg leading-relaxed text-ink">
              {block.text}
            </p>
          );
        })}
      </div>
      <ShareButtons
        title={post.title}
        labels={{
          share: site.blogPage.share,
          shareWhatsApp: site.blogPage.shareWhatsApp,
          shareEmail: site.blogPage.shareEmail,
          shareCopy: site.blogPage.shareCopy,
          shareCopied: site.blogPage.shareCopied,
        }}
      />
      <Link
        href={ctaHref}
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-sm font-medium tracking-wide text-paper uppercase hover:bg-accent-dark"
      >
        {ctaLabel}
      </Link>
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-forest">{site.blogPage.related}</h2>
          <div className="mt-6 grid gap-6">
            {related.map((item) => (
              <BlogCard
                key={item.slug}
                post={{
                  slug: item.slug,
                  title: item.title,
                  excerpt: item.excerpt,
                  author: item.author,
                  dateLabel: formatPostDate(item.date),
                  minutes: readingMinutes(item),
                  minutesLabel: site.blogPage.minutes,
                  tags: item.tags,
                  cover: item.cover,
                  href: `/${locale}/blog/${item.slug}`,
                }}
              />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
