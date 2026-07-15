"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pillars, type PillarSlug } from "@/lib/config";

type Props = { postPillarMap: Record<string, PillarSlug> };

type Active =
  | { pillar: null; kind: "none" }
  | { pillar: PillarSlug; kind: "direct" | "post" };

function resolveActive(
  pathname: string,
  postPillarMap: Record<string, PillarSlug>,
): Active {
  for (const slug of Object.keys(pillars) as PillarSlug[]) {
    const p = pillars[slug];
    if (pathname === p.path || pathname.startsWith(`${p.path}/`)) {
      return { pillar: slug, kind: "direct" };
    }
  }
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const p = postPillarMap[blogMatch[1]];
    if (p) return { pillar: p, kind: "post" };
  }
  return { pillar: null, kind: "none" };
}

export function PillarNav({ postPillarMap }: Props) {
  const pathname = usePathname();
  const state = resolveActive(pathname, postPillarMap);

  return (
    <nav className="flex gap-5 font-mono text-sm uppercase tracking-wide text-ink-soft">
      {(Object.keys(pillars) as PillarSlug[]).map((slug) => {
        const p = pillars[slug];
        const active = state.pillar === slug;
        return (
          <Link
            key={p.path}
            href={p.path}
            aria-current={
              active
                ? state.kind === "direct"
                  ? "page"
                  : "location"
                : undefined
            }
            className={
              active
                ? "text-accent-ink"
                : "hover:text-accent-ink transition-colors"
            }
          >
            {p.path}
          </Link>
        );
      })}
    </nav>
  );
}
