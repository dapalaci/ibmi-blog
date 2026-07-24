import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pillars, type PillarSlug } from "@/lib/config";
import { getPostsByPillar } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

const pillarNumber: Record<PillarSlug, string> = {
  ibmi: "00",
  ia: "01",
  cloud: "02",
};

const pillarGlyph: Record<PillarSlug, string> = {
  ibmi: ">",
  cloud: "~",
  ia: "*",
};

const pillarAccent: Record<PillarSlug, string> = {
  ibmi: "text-accent",
  cloud: "text-teal",
  ia: "text-purple",
};

function isPillar(slug: string): slug is PillarSlug {
  return slug in pillars;
}

export function generateStaticParams() {
  return Object.keys(pillars).map((pillar) => ({ pillar }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar } = await params;
  if (!isPillar(pillar)) return {};
  return { title: pillars[pillar].label };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar } = await params;
  if (!isPillar(pillar)) notFound();

  const meta = pillars[pillar];
  const posts = getPostsByPillar(pillar);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-8 pb-16">
        <div className="flex items-baseline justify-between gap-6 mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute">
            pilar {pillarNumber[pillar]} · {meta.path}
          </p>
          <span
            aria-hidden="true"
            className={
              "font-[family-name:var(--font-display)] text-6xl md:text-7xl leading-none " +
              pillarAccent[pillar]
            }
          >
            {pillarGlyph[pillar]}
          </span>
        </div>

        <h1
          className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.02] tracking-[-0.025em]"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          {meta.label}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
          {meta.description}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 border-t border-rule pt-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold text-ink">
            Entradas
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute">
            {String(posts.length).padStart(3, "0")} artículos
          </span>
        </div>

        {posts.length === 0 ? (
          <p className="py-16 text-ink-soft text-base">
            Todavía no hay posts en este pilar.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
