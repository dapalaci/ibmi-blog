import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { pillars } from "@/lib/config";
import { formatDate } from "@/lib/format";
import { Figure } from "@/components/Figure";

const mdxComponents = { Figure };

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
    <article className="mx-auto max-w-2xl px-6 py-14">
      <Link
        href={pillar.path}
        className="font-mono text-sm uppercase tracking-wide text-accent-ink"
      >
        {pillar.path}
      </Link>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-semibold tracking-tight text-ink leading-tight">
        {post.title}
      </h1>
      <p className="mt-3 font-mono text-sm text-ink-soft">
        {formatDate(post.date)} · {post.readingMinutes} min de lectura
      </p>

      <div className="prose-post mt-10">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <div className="mt-14 pt-6 border-t border-rule">
        <Link
          href="/"
          className="font-mono text-xs text-ink-soft hover:text-accent-ink transition-colors"
        >
          &larr; volver al índice
        </Link>
      </div>
    </article>
  );
}
