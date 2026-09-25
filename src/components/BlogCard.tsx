import Image from "next/image";
import Link from "next/link";

export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  dateLabel: string;
  minutes: number;
  minutesLabel: string;
  tags: string[];
  cover: { src: string; alt: string };
  href: string;
};

export function BlogCard({ post }: { post: BlogCardPost }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-sm bg-paper shadow-[0_1px_0_rgba(28,36,30,0.06)]">
      <Link href={post.href} className="group flex h-full flex-col">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-sm text-muted">
            {post.author} · {post.dateLabel} · {post.minutes} {post.minutesLabel}
          </p>
          <h2 className="font-display text-2xl text-forest group-hover:text-accent">{post.title}</h2>
          <p className="text-base leading-relaxed text-muted">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
