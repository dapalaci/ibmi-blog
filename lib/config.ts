export const site = {
  name: "transformación /i",
  url: "https://ibmi-blog.pages.dev",
  tagline: "Modernización IBMi, nube e IA aplicada al desarrollo.",
  description:
    "Notas técnicas sobre cómo llevar sistemas IBMi/AS400 hacia la nube, y cómo la IA cambia el trabajo diario de un ingeniero de sistemas legados.",
};

export type PillarSlug = "ibmi" | "cloud" | "ia";

export const pillars: Record<
  PillarSlug,
  { label: string; path: string; description: string }
> = {
  ibmi: {
    label: "IBMi / legado",
    path: "/ibmi",
    description: "RPG, APIs sobre programas heredados, migración gradual.",
  },
  cloud: {
    label: "Nube",
    path: "/cloud",
    description: "DevOps y arquitectura para sistemas empresariales.",
  },
  ia: {
    label: "IA en desarrollo",
    path: "/ia",
    description: "Agentes y modelos aplicados al trabajo diario del ingeniero.",
  },
};
