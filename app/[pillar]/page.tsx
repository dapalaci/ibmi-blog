import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pillars, type PillarSlug } from "@/lib/config";
import { getPostsByPillar } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { BridgeLine } from "@/components/BridgeLine";

const pillarNumber: Record<PillarSlug, string> = {
  ibmi: "00",
  ia: "01",
  cloud: "02",
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
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-8">
        <span className="text-accent-ink">&gt;</span> pilar {pillarNumber[pillar]} · {meta.path}
      </p>

      <h1
        className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.04] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2rem, 4.4vw, 3.25rem)" }}
      >
        {meta.label}
      </h1>

      <p className="mt-4 text-lg text-ink-soft leading-relaxed max-w-xl">
        {meta.description}
      </p>

      <BridgeLine active={pillar} className="mt-10 mb-10" />

      <div className="border-t border-rule pt-2">
        <h2 className="font-mono text-sm uppercase tracking-widest text-ink-soft pt-6 mb-2">
          Entradas en este pilar
        </h2>
        {posts.length === 0 ? (
          <p className="py-10 text-ink-soft text-base">
            Todavía no hay posts en este pilar.
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
