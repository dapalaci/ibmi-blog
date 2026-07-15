import { site } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-rule mt-24">
      <div className="mx-auto max-w-3xl px-6 py-10 flex flex-col sm:flex-row justify-between gap-3 text-xs font-mono text-ink-soft">
        <span>{site.name} — notas técnicas, no consejo de producción sin revisar</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
