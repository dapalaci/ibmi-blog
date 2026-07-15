import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/config";

export const metadata = { title: "Hero lab", robots: { index: false, follow: false } };

function LabRule({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-4">
      <div className="flex items-baseline gap-4 border-b border-rule pb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-ink">
          {tag}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
          {title}
        </span>
        <span className="flex-1 border-b border-dashed border-rule translate-y-[-4px]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  V1 — Monumental editorial                                          */
/*  Ilustración pequeña como sello, headline dominante, palabra acento */
/* ------------------------------------------------------------------ */
function HeroV1() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Image
        src="/illustrations/hero-bridge.svg"
        alt=""
        width={800}
        height={260}
        className="mb-10 w-full max-w-2xl h-auto"
        priority
      />
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-5">
        &gt; init · sesión #001
      </p>
      <h1
        className="font-[family-name:var(--font-display)] text-ink font-bold tracking-[-0.025em] leading-[1.05]"
        style={{ fontSize: "clamp(2.25rem, 4.4vw, 3.5rem)" }}
      >
        Modernizar{" "}
        <span className="text-accent-ink">sin borrar</span>{" "}
        la memoria del sistema.
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
        {site.description}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V2 — Ficha técnica / plano                                         */
/*  Split 5/7, SVG inline con callouts, metadata tipo header RPG      */
/* ------------------------------------------------------------------ */
function HeroV2() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-5 border-r-0 md:border-r md:border-rule md:pr-10 relative">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft absolute -left-2 top-0 -translate-x-full hidden md:block">
            §00
          </p>
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-soft leading-relaxed mb-8">
            <div>
              <span className="text-accent-ink">prog</span>&nbsp;·&nbsp;puente
            </div>
            <div>
              <span className="text-accent-ink">lib</span>&nbsp;·&nbsp;/i
            </div>
            <div>
              <span className="text-accent-ink">type</span>&nbsp;·&nbsp;blog
            </div>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-ink text-4xl md:text-[3rem] leading-[1.05] tracking-tight">
            <span className="font-medium">Modernizar</span>{" "}
            <span className="font-semibold">sin borrar</span>{" "}
            <span className="font-medium text-ink-soft">
              la memoria del sistema.
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            {site.description}
          </p>
        </div>

        <div className="col-span-12 md:col-span-7 relative">
          <svg
            viewBox="0 0 800 260"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Puente esquemático que conecta una terminal IBMi con una pila de servicios en la nube"
          >
            <rect x="50" y="70" width="190" height="140" rx="6" fill="#f4f2ec" stroke="#17150f" strokeWidth="2.5"/>
            <rect x="70" y="90" width="150" height="90" rx="2" fill="#17150f"/>
            <rect x="86" y="108" width="90" height="5" fill="#b5501c"/>
            <rect x="86" y="124" width="118" height="5" fill="#b5501c" opacity="0.75"/>
            <rect x="86" y="140" width="70" height="5" fill="#b5501c" opacity="0.55"/>
            <rect x="86" y="156" width="100" height="5" fill="#b5501c" opacity="0.4"/>
            <rect x="115" y="210" width="60" height="12" fill="#17150f"/>
            <rect x="95" y="222" width="100" height="8" rx="2" fill="#17150f"/>
            <path d="M245 140 Q400 55 555 140" fill="none" stroke="#b5501c" strokeWidth="3"/>
            <circle cx="300" cy="112" r="6" fill="#b5501c"/>
            <circle cx="400" cy="92" r="6" fill="#b5501c"/>
            <circle cx="500" cy="112" r="6" fill="#b5501c"/>
            <rect x="580" y="150" width="170" height="34" rx="6" fill="#f4f2ec" stroke="#2b5f5c" strokeWidth="2.5"/>
            <rect x="598" y="108" width="150" height="34" rx="6" fill="#f4f2ec" stroke="#2b5f5c" strokeWidth="2.5"/>
            <rect x="616" y="66" width="130" height="34" rx="6" fill="#2b5f5c"/>

            {/* Callouts blueprint */}
            <line x1="145" y1="60" x2="145" y2="25" stroke="#55524a" strokeWidth="0.75" strokeDasharray="2 2"/>
            <line x1="145" y1="25" x2="235" y2="25" stroke="#55524a" strokeWidth="0.75" strokeDasharray="2 2"/>
            <text x="240" y="28" fontFamily="var(--font-jbmono), monospace" fontSize="11" fill="#55524a" letterSpacing="1">SISTEMA · IBMi</text>

            <line x1="400" y1="80" x2="400" y2="35" stroke="#55524a" strokeWidth="0.75" strokeDasharray="2 2"/>
            <text x="408" y="38" fontFamily="var(--font-jbmono), monospace" fontSize="11" fill="#55524a" letterSpacing="1">CANAL · APIs</text>

            <line x1="681" y1="55" x2="681" y2="25" stroke="#55524a" strokeWidth="0.75" strokeDasharray="2 2"/>
            <line x1="681" y1="25" x2="590" y2="25" stroke="#55524a" strokeWidth="0.75" strokeDasharray="2 2"/>
            <text x="440" y="28" fontFamily="var(--font-jbmono), monospace" fontSize="11" fill="#55524a" letterSpacing="1" textAnchor="start">DESTINO · CLOUD</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V3 — Puente como marco arquitectónico                              */
/*  Título integrado a la ilustración, coordenadas en teal            */
/* ------------------------------------------------------------------ */
function HeroV3() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center gap-4 mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal-ink">
          42°N · cross-sys
        </span>
        <span className="flex-1 border-t border-teal opacity-40" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal-ink">
          v1.0.0
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 800 340"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          role="img"
          aria-label="Puente esquemático que conecta una terminal IBMi con una pila de servicios en la nube"
        >
          {/* Terminal desplazada abajo */}
          <rect x="30" y="180" width="170" height="130" rx="6" fill="#f4f2ec" stroke="#17150f" strokeWidth="2.5"/>
          <rect x="48" y="198" width="134" height="82" rx="2" fill="#17150f"/>
          <rect x="62" y="214" width="80" height="4" fill="#b5501c"/>
          <rect x="62" y="228" width="106" height="4" fill="#b5501c" opacity="0.75"/>
          <rect x="62" y="242" width="60" height="4" fill="#b5501c" opacity="0.55"/>
          <rect x="62" y="256" width="90" height="4" fill="#b5501c" opacity="0.4"/>

          {/* Arco alto que enmarca */}
          <path d="M200 260 Q400 20 600 260" fill="none" stroke="#b5501c" strokeWidth="2.5"/>
          <circle cx="280" cy="180" r="5" fill="#b5501c"/>
          <circle cx="400" cy="115" r="5" fill="#b5501c"/>
          <circle cx="520" cy="180" r="5" fill="#b5501c"/>

          {/* Stack cloud desplazado abajo */}
          <rect x="600" y="240" width="170" height="30" rx="6" fill="#f4f2ec" stroke="#2b5f5c" strokeWidth="2.5"/>
          <rect x="618" y="204" width="150" height="30" rx="6" fill="#f4f2ec" stroke="#2b5f5c" strokeWidth="2.5"/>
          <rect x="636" y="168" width="132" height="30" rx="6" fill="#2b5f5c"/>
        </svg>

        {/* Título superpuesto sobre el arco */}
        <div className="absolute inset-x-0 top-[8%] flex justify-center pointer-events-none">
          <div className="bg-canvas px-6 py-3 max-w-[38rem] text-center">
            <h1
              className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.5rem)" }}
            >
              Modernizar sin borrar la memoria del sistema.
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink">
                terminal &rarr; cloud
              </span>
              <span className="h-px w-8 bg-accent" />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 mx-auto max-w-xl text-center text-base leading-relaxed text-ink-soft">
        {site.description}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V4 — Puente tipográfico                                            */
/*  Sin ilustración; el titular es el puente. Regla dashed con dos    */
/*  anclas (rust · teal) como único guiño gráfico.                     */
/* ------------------------------------------------------------------ */
function HeroV4() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-10">
        <span className="text-accent-ink">&gt;</span> compilar · puente/i
      </p>

      <h1
        className="font-[family-name:var(--font-display)] text-ink leading-[1.04] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
      >
        <span className="font-medium text-ink-soft">IBMi.</span>{" "}
        <span className="font-medium text-ink-soft">La nube.</span>{" "}
        <span className="font-semibold text-ink">Entre uno</span>{" "}
        <span className="font-semibold text-accent-ink">y otra:</span>{" "}
        <span className="font-bold text-ink">modernizar sin borrar.</span>
      </h1>

      {/* El puente reducido a línea */}
      <div
        className="mt-12 mb-10 flex items-center gap-3"
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-[1px] bg-ink" />
        <span className="flex-1 border-t border-dashed border-accent" />
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="flex-1 border-t border-dashed border-teal" />
        <span className="h-2.5 w-2.5 rounded-[1px] bg-teal" />
      </div>

      <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
        {site.description}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V5 — Declaración en miembro fuente                                 */
/*  Split editorial / técnico: h1 respirando a la izquierda,          */
/*  ficha estilo SEU · WRKMBRPDM declarando el blog a la derecha.     */
/* ------------------------------------------------------------------ */
function HeroV5() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-12 gap-10 items-start">
        <div className="col-span-12 md:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-ink mb-6">
            § 00 · introducción
          </p>
          <h1
            className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.04] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 4.4vw, 3.5rem)" }}
          >
            Modernizar sin borrar la memoria del sistema.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {site.description}
          </p>
        </div>

        <div className="col-span-12 md:col-span-5">
          <div className="border border-rule bg-canvas">
            <div className="flex items-center justify-between border-b border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              <span>SEU · PUENTE.MBR</span>
              <span className="text-accent-ink">RPGLE</span>
            </div>
            <pre className="px-3 py-3 font-mono text-[11px] leading-[1.75] text-ink overflow-x-auto">
{`0001.00 H  puente/i
0002.00 F  BRIDGE     IF   E   K DISK
0003.00 D  IBMi          10A   const('legado')
0004.00 D  CLOUD         10A   const('destino')
0005.00 D  IA            10A   const('lente')
0006.00 C           EVAL      memoria = *ON
0007.00 C           EXSR      publicar
0008.00 C           SETON                    LR`}
            </pre>
          </div>
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            <span className="h-px w-3 bg-rule" />
            <span>compilado · 3 pilares activos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V6 — Puente como infraestructura del layout                        */
/*  max-w-6xl, titular corto a la izquierda, puente extendido         */
/*  horizontal a la derecha, con reglas de escala tipo plano.         */
/* ------------------------------------------------------------------ */
function HeroV6() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-4">
        <span>00 · terminal</span>
        <span className="text-accent-ink">01 · canal</span>
        <span>02 · cloud</span>
      </div>
      <div className="border-t border-rule mb-12" />

      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-5">
          <h1
            className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)" }}
          >
            Modernizar
            <br />
            sin borrar
            <br />
            <span className="text-ink-soft">la memoria.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
            {site.description}
          </p>
        </div>

        <div className="col-span-12 md:col-span-7">
          <svg
            viewBox="0 0 620 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Puente esquemático horizontal que conecta una terminal IBMi con una pila de servicios en la nube"
          >
            <rect x="10" y="60" width="130" height="100" rx="4" fill="#f4f2ec" stroke="#17150f" strokeWidth="2"/>
            <rect x="24" y="76" width="102" height="60" rx="2" fill="#17150f"/>
            <rect x="34" y="88" width="60" height="4" fill="#b5501c"/>
            <rect x="34" y="100" width="80" height="4" fill="#b5501c" opacity="0.75"/>
            <rect x="34" y="112" width="46" height="4" fill="#b5501c" opacity="0.55"/>
            <rect x="34" y="124" width="66" height="4" fill="#b5501c" opacity="0.4"/>

            <path d="M148 108 Q310 60 470 108" fill="none" stroke="#b5501c" strokeWidth="2.5"/>
            <line x1="148" y1="108" x2="470" y2="108" stroke="#b5501c" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5"/>
            <circle cx="215" cy="88" r="4.5" fill="#b5501c"/>
            <circle cx="310" cy="76" r="4.5" fill="#b5501c"/>
            <circle cx="405" cy="88" r="4.5" fill="#b5501c"/>

            <rect x="480" y="118" width="130" height="26" rx="4" fill="#f4f2ec" stroke="#2b5f5c" strokeWidth="2"/>
            <rect x="494" y="86" width="116" height="26" rx="4" fill="#f4f2ec" stroke="#2b5f5c" strokeWidth="2"/>
            <rect x="508" y="54" width="102" height="26" rx="4" fill="#2b5f5c"/>

            <line x1="10" y1="180" x2="610" y2="180" stroke="#ddd8c9" strokeWidth="0.75"/>
            <g stroke="#ddd8c9" strokeWidth="0.75">
              <line x1="75" y1="180" x2="75" y2="186"/>
              <line x1="215" y1="180" x2="215" y2="186"/>
              <line x1="310" y1="180" x2="310" y2="186"/>
              <line x1="405" y1="180" x2="405" y2="186"/>
              <line x1="545" y1="180" x2="545" y2="186"/>
            </g>
          </svg>
        </div>
      </div>

      <div className="border-t border-rule mt-12" />
      <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">
        <span>ibmi · rpg · api</span>
        <span>← puente →</span>
        <span>devops · aws · contenedor</span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V4a — Aplanar pesos                                                */
/*  Todo semibold; la jerarquía la hace la saturación de tinta.        */
/* ------------------------------------------------------------------ */
function HeroV4a() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-10">
        <span className="text-accent-ink">&gt;</span> compilar · puente/i
      </p>

      <h1
        className="font-[family-name:var(--font-display)] font-semibold text-ink leading-[1.04] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
      >
        <span className="text-ink-soft">IBMi.</span>{" "}
        <span className="text-ink-soft">La nube.</span>{" "}
        <span className="text-ink">Entre uno</span>{" "}
        <span className="text-accent-ink">y otra:</span>{" "}
        <span className="text-ink">modernizar sin borrar.</span>
      </h1>

      <div
        className="mt-12 mb-10 flex items-center gap-3"
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-[1px] bg-ink" />
        <span className="flex-1 border-t border-dashed border-accent" />
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="flex-1 border-t border-dashed border-teal" />
        <span className="h-2.5 w-2.5 rounded-[1px] bg-teal" />
      </div>

      <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
        {site.description}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V4b — Anclas figurativas                                           */
/*  Monitor CRT (izq) y stack teal (der) reemplazan los cuadraditos.  */
/* ------------------------------------------------------------------ */
function HeroV4b() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-10">
        <span className="text-accent-ink">&gt;</span> compilar · puente/i
      </p>

      <h1
        className="font-[family-name:var(--font-display)] text-ink leading-[1.04] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
      >
        <span className="font-medium text-ink-soft">IBMi.</span>{" "}
        <span className="font-medium text-ink-soft">La nube.</span>{" "}
        <span className="font-semibold text-ink">Entre uno</span>{" "}
        <span className="font-semibold text-accent-ink">y otra:</span>{" "}
        <span className="font-bold text-ink">modernizar sin borrar.</span>
      </h1>

      <div
        className="mt-12 mb-10 flex items-center gap-4"
        aria-hidden="true"
      >
        <svg
          width="26"
          height="22"
          viewBox="0 0 26 22"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <rect x="1" y="1" width="24" height="16" rx="1.5" fill="none" stroke="#17150f" strokeWidth="1.5"/>
          <rect x="4" y="5" width="12" height="1.5" fill="#b5501c"/>
          <rect x="4" y="9" width="16" height="1.5" fill="#b5501c" opacity="0.6"/>
          <rect x="10" y="18" width="6" height="3" fill="#17150f"/>
        </svg>
        <span className="flex-1 border-t border-dashed border-accent" />
        <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
        <span className="flex-1 border-t border-dashed border-teal" />
        <svg
          width="26"
          height="22"
          viewBox="0 0 26 22"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <rect x="1" y="14" width="24" height="6" rx="1" fill="none" stroke="#2b5f5c" strokeWidth="1.5"/>
          <rect x="3" y="7" width="20" height="6" rx="1" fill="none" stroke="#2b5f5c" strokeWidth="1.5"/>
          <rect x="5" y="0" width="16" height="6" rx="1" fill="#2b5f5c"/>
        </svg>
      </div>

      <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
        {site.description}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V4c — Puente arqueado en SVG mínimo                                */
/*  Reintroduce el gesto Q del hero-bridge original, sin diagrama.    */
/* ------------------------------------------------------------------ */
function HeroV4c() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-10">
        <span className="text-accent-ink">&gt;</span> compilar · puente/i
      </p>

      <h1
        className="font-[family-name:var(--font-display)] text-ink leading-[1.04] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
      >
        <span className="font-medium text-ink-soft">IBMi.</span>{" "}
        <span className="font-medium text-ink-soft">La nube.</span>{" "}
        <span className="font-semibold text-ink">Entre uno</span>{" "}
        <span className="font-semibold text-accent-ink">y otra:</span>{" "}
        <span className="font-bold text-ink">modernizar sin borrar.</span>
      </h1>

      <svg
        viewBox="0 0 800 60"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-12 mb-10 w-full h-auto"
        aria-hidden="true"
      >
        <rect x="0" y="46" width="10" height="10" rx="1" fill="#17150f"/>
        <path d="M12 51 Q400 -6 788 51" fill="none" stroke="#b5501c" strokeWidth="1.25"/>
        <circle cx="220" cy="24" r="3" fill="#b5501c"/>
        <circle cx="400" cy="15" r="3" fill="#b5501c"/>
        <circle cx="580" cy="24" r="3" fill="#b5501c"/>
        <rect x="790" y="46" width="10" height="10" rx="1" fill="#2b5f5c"/>
      </svg>

      <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
        {site.description}
      </p>
    </section>
  );
}

export default function HeroLab() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="pb-24">
      <LabRule tag="V1" title="Monumental editorial · titular dominante" />
      <HeroV1 />

      <LabRule tag="V2" title="Ficha técnica · plano con callouts" />
      <HeroV2 />

      <LabRule tag="V3" title="Puente como marco · titular integrado" />
      <HeroV3 />

      <LabRule tag="V4" title="Puente tipográfico · sin ilustración" />
      <HeroV4 />

      <LabRule tag="V5" title="Declaración en miembro fuente · split editorial" />
      <HeroV5 />

      <LabRule tag="V6" title="Puente como infraestructura del layout" />
      <HeroV6 />

      <LabRule tag="V4a" title="Aplanar pesos · jerarquía solo por tinta" />
      <HeroV4a />

      <LabRule tag="V4b" title="Anclas figurativas · monitor + stack" />
      <HeroV4b />

      <LabRule tag="V4c" title="Puente arqueado · gesto Q mínimo" />
      <HeroV4c />
    </div>
  );
}
