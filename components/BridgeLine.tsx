import type { PillarSlug } from "@/lib/config";

type Props = { active?: PillarSlug; className?: string };

export function BridgeLine({ active, className }: Props) {
  const leftOn = !active || active === "ibmi";
  const midOn = !active || active === "ia";
  const rightOn = !active || active === "cloud";

  return (
    <div
      className={`flex items-center gap-4 ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 transition-opacity ${leftOn ? "" : "opacity-25"}`}
      >
        <rect x="1" y="1" width="24" height="16" rx="1.5" fill="none" stroke="#17150f" strokeWidth="1.5"/>
        <rect x="4" y="5" width="12" height="1.5" fill="#b5501c"/>
        <rect x="4" y="9" width="16" height="1.5" fill="#b5501c" opacity="0.6"/>
        <rect x="10" y="18" width="6" height="3" fill="#17150f"/>
      </svg>
      <span
        className={`flex-1 border-t border-dashed ${
          leftOn || midOn ? "border-accent" : "border-rule"
        }`}
      />
      <span
        className={`h-2 w-2 rounded-full bg-accent shrink-0 transition-transform ${
          active === "ia" ? "scale-150" : midOn ? "" : "opacity-25"
        }`}
      />
      <span
        className={`flex-1 border-t border-dashed ${
          midOn || rightOn ? "border-teal" : "border-rule"
        }`}
      />
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 transition-opacity ${rightOn ? "" : "opacity-25"}`}
      >
        <rect x="1" y="14" width="24" height="6" rx="1" fill="none" stroke="#2b5f5c" strokeWidth="1.5"/>
        <rect x="3" y="7" width="20" height="6" rx="1" fill="none" stroke="#2b5f5c" strokeWidth="1.5"/>
        <rect x="5" y="0" width="16" height="6" rx="1" fill="#2b5f5c"/>
      </svg>
    </div>
  );
}
