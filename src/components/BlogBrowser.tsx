"use client";

import { useMemo, useState } from "react";
import { BlogCard, type BlogCardPost } from "@/components/BlogCard";

type Labels = {
  searchLabel: string;
  searchPlaceholder: string;
  allTags: string;
  empty: string;
  clear: string;
};

export function BlogBrowser({ posts, labels }: { posts: BlogCardPost[]; labels: Labels }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const unique = new Set<string>();
    for (const post of posts) {
      for (const item of post.tags) unique.add(item);
    }
    return [...unique];
  }, [posts]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (tag && !post.tags.includes(tag)) return false;
      if (!needle) return true;
      const haystack = [post.title, post.excerpt, ...post.tags].join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, query, tag]);

  function clear() {
    setQuery("");
    setTag(null);
  }

  return (
    <div>
      <div className="sticky top-16 z-40 border-b border-stone bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8">
          <label className="block text-sm text-muted" htmlFor="blog-search">
            {labels.searchLabel}
            <input
              id="blog-search"
              type="search"
              value={query}
              placeholder={labels.searchPlaceholder}
              onChange={(event) => setQuery(event.target.value)}
              className="mt-2 min-h-11 w-full rounded-full border border-stone bg-paper px-4 text-base text-ink"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label={labels.allTags}>
            <button
              type="button"
              aria-pressed={tag === null}
              onClick={() => setTag(null)}
              className={`min-h-11 rounded-full px-4 text-sm ${tag === null ? "bg-forest text-paper" : "bg-paper text-ink"}`}
            >
              {labels.allTags}
            </button>
            {tags.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={tag === item}
                onClick={() => setTag(item)}
                className={`min-h-11 rounded-full px-4 text-sm ${tag === item ? "bg-forest text-paper" : "bg-paper text-ink"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mx-auto max-w-xl px-5 py-16 text-center sm:px-8">
          <p className="text-lg leading-relaxed text-muted">{labels.empty}</p>
          <button
            type="button"
            onClick={clear}
            className="mt-6 min-h-11 rounded-full bg-accent px-5 text-sm font-medium text-paper"
          >
            {labels.clear}
          </button>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-2">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
