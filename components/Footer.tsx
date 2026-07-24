import Link from "next/link";
import { site } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-rule mt-32">
      <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.2em] text-ink-mute">
        <span>{site.name} — notas técnicas, no consejo de producción sin revisar</span>
        <div className="flex items-center gap-6">
          <Link
            href="/creditos"
            className="hover:text-ink transition-colors"
          >
            créditos de imágenes
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
