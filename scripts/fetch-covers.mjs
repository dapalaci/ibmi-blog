// Descarga covers temáticos de Openverse (API pública, sin key) para cada post.
// Guarda las imágenes en public/covers/<slug>.jpg y actualiza CREDITS.md.
// Uso: node scripts/fetch-covers.mjs

import { writeFile, mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COVERS_DIR = path.join(ROOT, "public", "covers");

// Query específica por post (curada para tema).
const queries = [
  { slug: "arquitectura-hibrida-ibmi-nube", q: "server room datacenter" },
  { slug: "exponer-rpg-como-api-rest", q: "mainframe computer terminal" },
  { slug: "gobernanza-agentes-ia-codigo-empresa", q: "network operations center" },
  { slug: "ia-para-leer-rpg-sin-documentacion", q: "vintage printout code" },
  { slug: "ia-para-migrar-rpg-caso-as-forward", q: "software developer laptop" },
  { slug: "ibm-bob-premium-package-para-i", q: "unix command line" },
  { slug: "power-s1112-entrada-power11-ibmi", q: "server rack hardware" },
];

async function fetchFirstResult(q) {
  const url = new URL("https://api.openverse.org/v1/images/");
  url.searchParams.set("q", q);
  url.searchParams.set("page_size", "1");
  url.searchParams.set("license_type", "commercial");
  url.searchParams.set("mature", "false");
  const res = await fetch(url, { headers: { "User-Agent": "ibmi-blog-cover-fetcher/1.0" } });
  if (!res.ok) throw new Error(`Openverse ${q} -> HTTP ${res.status}`);
  const data = await res.json();
  const first = data.results?.[0];
  if (!first) throw new Error(`Openverse ${q} -> sin resultados`);
  return first;
}

async function downloadImage(imgUrl, dest) {
  const res = await fetch(imgUrl, { headers: { "User-Agent": "ibmi-blog-cover-fetcher/1.0" } });
  if (!res.ok) throw new Error(`Descarga ${imgUrl} -> HTTP ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

await mkdir(COVERS_DIR, { recursive: true });

const credits = [];
for (const { slug, q } of queries) {
  process.stdout.write(`${slug} (${q}) ... `);
  try {
    const meta = await fetchFirstResult(q);
    const dest = path.join(COVERS_DIR, `${slug}.jpg`);
    await downloadImage(meta.url, dest);
    console.log(`ok · ${meta.creator}`);
    credits.push({ slug, q, meta });
  } catch (err) {
    console.log(`FALLO: ${err.message}`);
  }
}

const md = [
  "# Créditos de covers",
  "",
  "Los covers de posts vienen de Openverse (búsqueda unificada de imágenes CC).",
  "Cada imagen mantiene su licencia original. Reemplazá cualquiera con la que prefieras;",
  "si sacás una que era CC-BY-SA, borrá también la entrada correspondiente acá.",
  "",
  ...credits.map(({ slug, q, meta }) =>
    [
      `## \`/covers/${slug}.jpg\``,
      "",
      `- **Query**: ${q}`,
      `- **Título**: ${meta.title || "(sin título)"}`,
      `- **Autor**: ${meta.creator || "(desconocido)"}`,
      `- **Licencia**: ${meta.license?.toUpperCase()} ${meta.license_version || ""} → ${meta.license_url || ""}`,
      `- **Fuente**: ${meta.foreign_landing_url || meta.url}`,
      "",
    ].join("\n"),
  ),
];

await writeFile(path.join(COVERS_DIR, "CREDITS.md"), md.join("\n"), "utf8");

const manifest = credits.map(({ slug, q, meta }) => ({
  slug,
  query: q,
  title: meta.title || "(sin título)",
  creator: meta.creator || "(desconocido)",
  license: (meta.license || "").toUpperCase(),
  license_version: meta.license_version || "",
  license_url: meta.license_url || "",
  source_url: meta.foreign_landing_url || meta.url,
}));

await writeFile(
  path.join(COVERS_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8",
);

console.log(`\nCREDITS.md + manifest.json escritos con ${credits.length} entradas.`);
