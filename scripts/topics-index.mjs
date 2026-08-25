#!/usr/bin/env node
/**
 * Índice rápido de temas ya cubiertos en el blog, para usar ANTES de
 * elegir el tema de un post nuevo:
 *   - evita repetir un tema ya publicado o en borrador
 *   - muestra qué pilar (ibmi | cloud | ia) está menos cubierto, para
 *     priorizarlo en igualdad de relevancia
 *
 * Uso:
 *   node scripts/topics-index.mjs            → tabla legible
 *   node scripts/topics-index.mjs --json     → JSON para uso programático
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function loadAllPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
      const { data } = matter(raw);
      return {
        slug: path.basename(f, ".mdx"),
        title: data.title || "(sin título)",
        date: data.date || "(sin fecha)",
        pillar: data.pillar || "(sin pilar)",
        draft: data.draft === true,
      };
    })
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function main() {
  const posts = loadAllPosts();
  const asJson = process.argv.includes("--json");

  const counts = { ibmi: 0, cloud: 0, ia: 0 };
  const pendingDrafts = [];
  for (const p of posts) {
    if (counts[p.pillar] !== undefined) counts[p.pillar]++;
    if (p.draft) pendingDrafts.push(p);
  }

  const sortedByCount = Object.entries(counts).sort((a, b) => a[1] - b[1]);
  const leastCovered = sortedByCount[0][0];

  if (asJson) {
    console.log(JSON.stringify({ posts, counts, leastCovered, pendingDrafts }, null, 2));
    return;
  }

  console.log("=== Posts existentes (fecha, pilar, estado, título) ===\n");
  for (const p of posts) {
    console.log(`${p.date}  [${p.pillar.padEnd(5)}]  ${p.draft ? "DRAFT" : "LIVE "}  ${p.title}`);
  }

  console.log("\n=== Conteo por pilar ===");
  for (const [pillar, n] of Object.entries(counts)) {
    console.log(`  ${pillar}: ${n}`);
  }
  console.log(`\n→ Pilar menos cubierto: "${leastCovered}". En igualdad de relevancia de la noticia, priorizar este pilar para el próximo post.`);

  console.log(`\n=== Borradores pendientes de revisión (draft: true): ${pendingDrafts.length} ===`);
  for (const p of pendingDrafts) {
    console.log(`  ${p.date}  ${p.slug}`);
  }
  if (pendingDrafts.length > 3) {
    console.log(
      `\n⚠ Hay ${pendingDrafts.length} borradores sin publicar. Antes de escribir uno nuevo, correr` +
        ` "node scripts/review-post.mjs --all" y resolver el backlog.`
    );
  }
}

main();
