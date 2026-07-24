import { site } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-rule mt-32">
      <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col sm:flex-row justify-between gap-3 text-xs font-mono uppercase tracking-[0.2em] text-ink-mute">
        <span>{site.name} — notas técnicas, no consejo de producción sin revisar</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
