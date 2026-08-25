#!/usr/bin/env node
/**
 * Checklist automático de revisión editorial para un post nuevo (.mdx).
 *
 * IMPORTANTE — límites reales de este chequeo:
 * Esto valida ESTRUCTURA y FORMATO (frontmatter válido, longitud, duplicados,
 * cover existente). NO verifica que los hechos, fechas o cifras del cuerpo
 * del post sean correctos. Un post puede pasar este checklist y aun así
 * contener un error factual — ese riesgo sigue existiendo y depende de la
 * calidad de la investigación hecha antes de escribir, no de este script.
 *
 * Uso:
 *   node scripts/review-post.mjs content/posts/mi-post.mdx
 *   node scripts/review-post.mjs --all        (revisa todos los draft:true)
 *
 * Código de salida: 0 si pasa, 1 si falla algún chequeo.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const COVERS_DIR = path.join(process.cwd(), "public", "covers");
const VALID_PILLARS = new Set(["ibmi", "cloud", "ia"]);
const MIN_WORDS = 700;
const MAX_WORDS = 1300;

function loadAllPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const full = path.join(POSTS_DIR, f);
      const raw = fs.readFileSync(full, "utf8");
      const parsed = matter(raw);
      return { file: f, full, data: parsed.data, content: parsed.content };
    });
}

function normalizeTitle(t) {
  return (t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .sort()
    .join(" ");
}

function titleSimilarity(a, b) {
  const wa = new Set(normalizeTitle(a).split(" "));
  const wb = new Set(normalizeTitle(b).split(" "));
  if (wa.size === 0 || wb.size === 0) return 0;
  let shared = 0;
  for (const w of wa) if (wb.has(w)) shared++;
  return shared / Math.min(wa.size, wb.size);
}

function reviewPost(target, allPosts) {
  const issues = [];
  const warnings = [];
  const raw = fs.readFileSync(target.full, "utf8");
  const { data, content } = matter(raw);

  // 1. Frontmatter requerido
  for (const field of ["title", "excerpt", "date", "pillar"]) {
    if (!data[field] || String(data[field]).trim() === "") {
      issues.push(`Falta el campo de frontmatter "${field}".`);
    }
  }
  if (typeof data.draft !== "boolean") {
    issues.push('El campo "draft" debe ser true o false (booleano).');
  }

  // 2. Fecha con formato correcto
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) {
    issues.push(`Fecha con formato inválido: "${data.date}" (se espera YYYY-MM-DD).`);
  }

  // 3. Pilar válido
  if (data.pillar && !VALID_PILLARS.has(data.pillar)) {
    issues.push(`Pilar inválido: "${data.pillar}" (debe ser ibmi | cloud | ia).`);
  }

  // 4. Longitud del cuerpo
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < MIN_WORDS) {
    issues.push(`Cuerpo demasiado corto: ${wordCount} palabras (mínimo ${MIN_WORDS}).`);
  } else if (wordCount > MAX_WORDS) {
    warnings.push(`Cuerpo largo: ${wordCount} palabras (sugerido hasta ${MAX_WORDS}).`);
  }

  // 5. Cover existente, si se declaró
  if (data.cover) {
    const coverFile = path.join(process.cwd(), "public", data.cover.replace(/^\//, ""));
    if (!fs.existsSync(coverFile)) {
      warnings.push(`El cover declarado (${data.cover}) no existe todavía en public/covers/.`);
    }
  }

  // 6. Duplicado de slug
  const slug = path.basename(target.file, ".mdx");
  const sameSlug = allPosts.filter((p) => path.basename(p.file, ".mdx") === slug && p.file !== target.file);
  if (sameSlug.length > 0) {
    issues.push(`Slug duplicado con: ${sameSlug.map((p) => p.file).join(", ")}`);
  }

  // 7. Tema muy similar a un post ya existente (heurística por título, no semántica real)
  const similar = allPosts
    .filter((p) => p.file !== target.file)
    .map((p) => ({ file: p.file, title: p.data.title, score: titleSimilarity(data.title, p.data.title) }))
    .filter((s) => s.score >= 0.6)
    .sort((a, b) => b.score - a.score);
  if (similar.length > 0) {
    warnings.push(
      `Título parecido a posts existentes (revisar que no sea el mismo tema): ` +
        similar.map((s) => `"${s.title}" (${s.file})`).join("; ")
    );
  }

  return { file: target.file, wordCount, issues, warnings, pass: issues.length === 0 };
}

function main() {
  const args = process.argv.slice(2);
  const all = loadAllPosts();
  let targets;

  if (args.includes("--all")) {
    targets = all.filter((p) => p.data.draft === true);
  } else if (args.length > 0) {
    targets = args.map((a) => {
      const file = path.basename(a);
      const found = all.find((p) => p.file === file);
      if (!found) {
        console.error(`No se encontró ${file} en content/posts/`);
        process.exit(2);
      }
      return found;
    });
  } else {
    console.error("Uso: node scripts/review-post.mjs <archivo.mdx> | --all");
    process.exit(2);
  }

  let anyFail = false;
  const results = targets.map((t) => reviewPost(t, all));

  for (const r of results) {
    console.log(`\n=== ${r.file} ===`);
    console.log(`Palabras: ${r.wordCount} | Resultado: ${r.pass ? "PASA" : "NO PASA"}`);
    if (r.issues.length) {
      console.log("Bloqueantes:");
      for (const i of r.issues) console.log(`  - ${i}`);
    }
    if (r.warnings.length) {
      console.log("Advertencias (no bloquean, requieren criterio humano):");
      for (const w of r.warnings) console.log(`  - ${w}`);
    }
    if (!r.pass) anyFail = true;
  }

  console.log(
    `\nRecordatorio: este checklist NO verifica veracidad de hechos, fechas o cifras citadas en el cuerpo del post — solo estructura, formato y duplicados.`
  );

  process.exit(anyFail ? 1 : 0);
}

main();
