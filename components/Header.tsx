import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PillarNav } from "./PillarNav";

export function Header() {
  const postPillarMap = Object.fromEntries(
    getAllPosts().map((post) => [post.slug, post.pillar]),
  );

  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-3xl px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-base tracking-tight text-ink hover:text-accent-ink transition-colors"
        >
          <span className="text-accent">&gt;</span> puente<span className="text-ink-soft">/i</span>
        </Link>
        <PillarNav postPillarMap={postPillarMap} />
      </div>
      <PunchStrip />
    </header>
  );
}

function PunchStrip() {
  return (
    <div
      aria-hidden="true"
      className="h-1.5 w-full flex"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--rule) 0 2px, transparent 2px 10px)",
      }}
    />
  );
}
