import Link from "next/link";
import type { PostSummary } from "@/lib/posts";
import { formatDate } from "@/lib/format";

type Props = { post: PostSummary; index?: number };

const pillarTag: Record<PostSummary["pillar"], { label: string; className: string }> = {
  ibmi: { label: "IBMi", className: "bg-accent-ink text-ink" },
  cloud: { label: "Nube", className: "bg-teal-ink text-ink" },
  ia: { label: "IA", className: "bg-purple-ink text-ink" },
};

const pillarGlyph: Record<PostSummary["pillar"], string> = {
  ibmi: ">",
  cloud: "~",
  ia: "*",
};

export function PostCard({ post, index }: Props) {
  const tag = pillarTag[post.pillar];
  const glyph = pillarGlyph[post.pillar];
  const hasCover = Boolean(post.cover);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-rule bg-card"
      style={hasCover ? { backgroundImage: `url(${post.cover})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {!hasCover && (
        <span
          aria-hidden="true"
          className={
            "absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] text-[16rem] leading-none opacity-[0.08] " +
            (post.pillar === "ibmi"
              ? "text-accent"
              : post.pillar === "cloud"
                ? "text-teal"
                : "text-purple")
          }
        >
          {glyph}
        </span>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

      <span
        className={
          "absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest " +
          tag.className
        }
      >
        {tag.label}
      </span>

      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-canvas/80 backdrop-blur-sm text-ink-soft border border-rule/60">
        {formatDate(post.date)}
      </span>

      {index !== undefined && (
        <span className="absolute bottom-24 left-6 font-mono text-xs uppercase tracking-widest text-ink-mute">
          {String(index + 1).padStart(3, "0")}
        </span>
      )}

      <h3 className="absolute bottom-6 left-6 right-20 font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-ink leading-[1.15]">
        {post.title}
      </h3>

      <div
        aria-hidden="true"
        className="absolute bottom-6 right-6 h-10 w-10 rounded-full bg-canvas/80 backdrop-blur-sm border border-rule flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-canvas transition-colors"
      >
        <svg
          viewBox="0 0 12 12"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9L9 3M9 3H4M9 3V8" />
        </svg>
      </div>
    </Link>
  );
}
