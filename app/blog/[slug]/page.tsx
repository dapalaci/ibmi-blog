import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { pillars, type PillarSlug } from "@/lib/config";
import { formatDate } from "@/lib/format";
import { Figure } from "@/components/Figure";

const mdxComponents = { Figure };

const pillarAccent: Record<PillarSlug, string> = {
  ibmi: "text-accent",
  cloud: "text-teal",
  ia: "text-purple",
};

const pillarTagBg: Record<PillarSlug, string> = {
  ibmi: "bg-accent-ink",
  cloud: "bg-teal-ink",
  ia: "bg-purple-ink",
};

const pillarTagLabel: Record<PillarSlug, string> = {
  ibmi: "IBMi",
  cloud: "Nube",
  ia: "IA",
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  const pillar = pillars[post.pillar];

  return (
    <article>
      <header className="mx-auto max-w-4xl px-6 pt-8 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href={pillar.path}
            className={
              "px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest text-ink hover:opacity-80 transition-opacity " +
              pillarTagBg[post.pillar]
            }
          >
            {pillarTagLabel[post.pillar]}
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-mute">
            {formatDate(post.date)} · {post.readingMinutes} min
          </span>
        </div>

        <h1
          className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.04] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          {post.title}
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-ink-soft leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {post.cover && (
        <div className="mx-auto max-w-5xl px-6 mb-12">
          <div
            className="aspect-[21/9] w-full rounded-2xl border border-rule bg-card overflow-hidden"
            style={{
              backgroundImage: `url(${post.cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-6">
        <div className="prose-post">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="mt-16 pt-8 border-t border-rule flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute hover:text-ink transition-colors"
          >
            ← volver al índice
          </Link>
          <Link
            href={pillar.path}
            className={
              "font-mono text-[11px] uppercase tracking-[0.3em] hover:opacity-80 transition-opacity " +
              pillarAccent[post.pillar]
            }
          >
            más en {pillar.path} →
          </Link>
        </div>
      </div>
    </article>
  );
}
