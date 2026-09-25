import type { Metadata } from "next";
import { BlogBrowser } from "@/components/BlogBrowser";
import { PageHero } from "@/components/PageHero";
import { formatPostDate, getPosts, getSite, readingMinutes, requireLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(requireLocale(locale));
  return { title: site.blogPage.title, description: site.blogPage.lead };
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw);
  const site = getSite(locale);
  const posts = getPosts(locale);
  const newest = posts[0];

  return (
    <>
      <PageHero
        compact
        src={newest.cover.src}
        alt={newest.cover.alt}
        kicker={site.blogPage.kicker}
        title={site.blogPage.title}
        lead={site.blogPage.lead}
      />
      <BlogBrowser
        labels={{
          searchLabel: site.blogPage.searchLabel,
          searchPlaceholder: site.blogPage.searchPlaceholder,
          allTags: site.blogPage.allTags,
          empty: site.blogPage.empty,
          clear: site.blogPage.clear,
        }}
        posts={posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          author: post.author,
          dateLabel: formatPostDate(post.date),
          minutes: readingMinutes(post),
          minutesLabel: site.blogPage.minutes,
          tags: post.tags,
          cover: post.cover,
          href: `/${locale}/blog/${post.slug}`,
        }))}
      />
    </>
  );
}
