import Image from "next/image";
import Link from "next/link";
import { site, pillars } from "@/lib/config";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { BridgeLine } from "@/components/BridgeLine";

const pillarIcons: Record<string, string> = {
  ibmi: "/illustrations/pillar-ibmi.svg",
  cloud: "/illustrations/pillar-cloud.svg",
  ia: "/illustrations/pillar-ia.svg",
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-16 border-b border-rule">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-10">
          <span className="text-accent-ink">&gt;</span> compilar · puente/i
        </p>

        <h1
          className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.04] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          <span className="text-ink-soft">IBMi.</span>{" "}
          <span className="text-ink-soft">La nube.</span>{" "}
          <span className="text-ink">Entre uno</span>{" "}
          <span className="text-accent-ink">y otra:</span>{" "}
          <span className="text-ink">modernizar sin borrar.</span>
        </h1>

        <BridgeLine className="mt-12 mb-10" />

        <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
          {site.description}
        </p>
      </section>

      <section className="py-12 border-b border-rule">
        <div className="grid sm:grid-cols-3 gap-8">
          {Object.entries(pillars).map(([slug, p]) => (
            <Link key={slug} href={p.path} className="group">
              <Image
                src={pillarIcons[slug]}
                alt=""
                width={48}
                height={48}
                className="mb-3 w-12 h-12"
              />
              <p className="font-mono text-sm text-accent-ink mb-1">{p.path}</p>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink group-hover:text-accent-ink transition-colors">
                {p.label}
              </h2>
              <p className="mt-1 text-base text-ink-soft leading-relaxed">
                {p.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-4">
        <h2 className="font-mono text-sm uppercase tracking-widest text-ink-soft pt-6 mb-2">
          Últimas entradas
        </h2>
        {posts.length === 0 ? (
          <p className="py-10 text-ink-soft text-base">
            Todavía no hay posts publicados. Los borradores de Cowork aparecen
            en <code className="font-mono text-sm">content/posts</code>.
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </section>
    </div>
  );
}
