import Link from "next/link";
import type { Metadata } from "next";
import manifest from "@/public/covers/manifest.json";
import { getAllPosts } from "@/lib/posts";

type CoverCredit = (typeof manifest)[number];

export const metadata: Metadata = {
  title: "Créditos de imágenes",
  description:
    "Atribución de las imágenes de portada usadas en transformación /i. Todas provienen de Openverse y mantienen sus licencias Creative Commons originales.",
};

export default function CreditosPage() {
  const posts = getAllPosts();
  const postBySlug = new Map(posts.map((p) => [p.slug, p]));

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-8 pb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute mb-8">
          transformación/i · atribución
        </p>
        <h1
          className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.04] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          Créditos de imágenes
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed text-justify hyphens-auto">
          Los covers de los posts vienen de{" "}
          <a
            href="https://openverse.org"
            className="text-accent underline underline-offset-4 decoration-accent-ink hover:text-ink transition-colors"
          >
            Openverse
          </a>{" "}
          — una búsqueda unificada de imágenes con licencia Creative Commons.
          Cada foto mantiene su licencia original y su atribución al autor.
          Si sos autor de alguna y querés que la reemplace o retire, escribime.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 border-t border-rule pt-12">
        <ul className="divide-y divide-rule">
          {manifest.map((cover: CoverCredit) => {
            const post = postBySlug.get(cover.slug);
            return (
              <li key={cover.slug} className="py-8">
                <div className="flex gap-6 items-start">
                  <Link
                    href={post ? `/blog/${post.slug}` : "/"}
                    className="shrink-0 block h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden border border-rule bg-card"
                    style={{
                      backgroundImage: `url(/covers/${cover.slug}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    aria-label={
                      post ? `Ir al post: ${post.title}` : cover.slug
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute mb-2">
                      cover en{" "}
                      {post ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-accent hover:text-ink transition-colors"
                        >
                          /blog/{post.slug}
                        </Link>
                      ) : (
                        <span className="text-ink-soft">/{cover.slug}</span>
                      )}
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink leading-tight">
                      {cover.title}
                    </h2>
                    <p className="mt-2 text-base text-ink-soft leading-relaxed">
                      por{" "}
                      <span className="text-ink">{cover.creator}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <a
                        href={cover.license_url}
                        rel="license"
                        className="font-mono text-[11px] uppercase tracking-widest text-accent hover:text-ink transition-colors"
                      >
                        CC {cover.license} {cover.license_version}
                      </a>
                      <a
                        href={cover.source_url}
                        className="font-mono text-[11px] uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
                      >
                        ver en fuente →
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
