import Link from "next/link";
import { site, pillars } from "@/lib/config";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { PostCardCompact } from "@/components/PostCardCompact";

const pillarAccent: Record<string, string> = {
  ibmi: "text-accent",
  cloud: "text-teal",
  ia: "text-purple",
};

const pillarGlyph: Record<string, string> = {
  ibmi: ">",
  cloud: "~",
  ia: "*",
};

export default function Home() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-8 pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute mb-8">
          puente/i · notas técnicas
        </p>
        <h1
          className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.02] tracking-[-0.025em]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Modernizar sin borrar la{" "}
          <em className="italic text-accent">memoria del sistema</em>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {site.description}
        </p>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-ink">
              Últimas entradas
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute">
              featured · {String(featured.length).padStart(3, "0")}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 py-20 border-t border-rule">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-ink">
            Los tres pilares
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute">
            secciones · 003
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(pillars).map(([slug, p]) => (
            <Link
              key={slug}
              href={p.path}
              className="group block rounded-2xl border border-rule bg-card p-6 hover:border-rule-strong transition-colors"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span
                  className={
                    "font-[family-name:var(--font-display)] text-5xl leading-none " +
                    pillarAccent[slug]
                  }
                  aria-hidden="true"
                >
                  {pillarGlyph[slug]}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                  {p.path}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink group-hover:text-accent transition-colors">
                {p.label}
              </h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                {p.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {rest.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-20 border-t border-rule">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-ink">
              Archivo
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute">
              anteriores · {String(rest.length).padStart(3, "0")}
            </span>
          </div>
          <div>
            {rest.map((post) => (
              <PostCardCompact key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
