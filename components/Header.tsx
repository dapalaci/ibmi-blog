import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PillarNav } from "./PillarNav";

export function Header() {
  const postPillarMap = Object.fromEntries(
    getAllPosts().map((post) => [post.slug, post.pillar]),
  );

  return (
    <header className="fixed top-4 inset-x-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-5xl px-4">
        <div className="pointer-events-auto flex items-center justify-between gap-6 rounded-full border border-rule-strong bg-card/85 backdrop-blur-md pl-2 pr-4 py-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.7)]">
          <Link
            href="/"
            className="flex items-center gap-3 pr-3 py-1 rounded-full hover:opacity-90 transition-opacity"
          >
            <span
              aria-hidden="true"
              className="h-8 w-8 rounded-full bg-canvas border border-rule-strong flex items-center justify-center font-mono text-sm text-accent"
            >
              &gt;
            </span>
            <span className="font-[family-name:var(--font-display)] text-base font-semibold text-ink">
              puente<span className="text-ink-soft">/i</span>
            </span>
          </Link>
          <PillarNav postPillarMap={postPillarMap} />
        </div>
      </div>
    </header>
  );
}
