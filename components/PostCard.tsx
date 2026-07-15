import Link from "next/link";
import { pillars } from "@/lib/config";
import type { PostSummary } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: PostSummary }) {
  const pillar = pillars[post.pillar];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-7 border-b border-rule"
    >
      <div className="flex items-center gap-3 mb-2 font-mono text-xs uppercase tracking-wide">
        <span className="text-accent-ink">{pillar.path}</span>
        <span className="text-ink-soft">
          {formatDate(post.date)} · {post.readingMinutes} min
        </span>
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink group-hover:text-accent-ink transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-base text-ink-soft leading-relaxed max-w-xl">
        {post.excerpt}
      </p>
    </Link>
  );
}
