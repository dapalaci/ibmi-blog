import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, type PostSummary } from "@/lib/posts";
import { PostCardCompact } from "@/components/PostCardCompact";

export const metadata: Metadata = {
  title: "Histórico",
  description:
    "Todas las entradas publicadas en puente /i, agrupadas por año y ordenadas de la más reciente a la más antigua.",
};

function groupByYear(posts: PostSummary[]): Map<string, PostSummary[]> {
  const groups = new Map<string, PostSummary[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  return groups;
}

export default function HistoricoPage() {
  const posts = getAllPosts();
  const groups = groupByYear(posts);
  const years = [...groups.keys()].sort().reverse();

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-8 pb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute mb-8">
          puente/i · archivo completo
        </p>
        <div className="flex items-baseline justify-between gap-6">
          <h1
            className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Histórico
          </h1>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute shrink-0">
            {String(posts.length).padStart(3, "0")} entradas
          </span>
        </div>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed text-justify hyphens-auto">
          Todas las entradas publicadas hasta la fecha, agrupadas por año y
          ordenadas de la más reciente a la más antigua.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        {years.map((year) => {
          const items = groups.get(year)!;
          return (
            <div key={year} className="border-t border-rule pt-10 mt-10 first:mt-0">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-semibold text-ink">
                  {year}
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute">
                  {String(items.length).padStart(3, "0")} · en este año
                </span>
              </div>
              <div>
                {items.map((post) => (
                  <PostCardCompact key={post.slug} post={post} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-16">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute hover:text-ink transition-colors"
        >
          ← volver al índice
        </Link>
      </div>
    </div>
  );
}
