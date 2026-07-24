import Link from "next/link";
import { pillars } from "@/lib/config";
import type { PostSummary } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export function PostCardCompact({ post }: { post: PostSummary }) {
  const pillar = pillars[post.pillar];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[auto_auto_1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 border-b border-rule"
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink-mute w-24">
        {formatDate(post.date)}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-accent w-16">
        {pillar.path}
      </span>
      <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-medium text-ink group-hover:text-accent transition-colors leading-snug">
        {post.title}
      </h3>
      <span
        aria-hidden="true"
        className="font-mono text-xs text-ink-mute group-hover:text-ink transition-colors"
      >
        →
      </span>
    </Link>
  );
}
