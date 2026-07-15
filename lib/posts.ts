import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PillarSlug } from "./config";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  pillar: PillarSlug;
  draft?: boolean;
}

export interface PostSummary extends PostFrontmatter {
  slug: string;
  readingMinutes: number;
}

export interface Post extends PostSummary {
  content: string;
}

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    content,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    pillar: data.pillar,
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files
    .map(readPostFile)
    .filter((p) => process.env.NODE_ENV !== "production" || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts.map(({ content: _content, ...summary }) => summary);
}

export function getPostBySlug(slug: string): Post | null {
  const fileNameMdx = `${slug}.mdx`;
  const fileNameMd = `${slug}.md`;

  if (fs.existsSync(path.join(POSTS_DIR, fileNameMdx))) {
    return readPostFile(fileNameMdx);
  }
  if (fs.existsSync(path.join(POSTS_DIR, fileNameMd))) {
    return readPostFile(fileNameMd);
  }
  return null;
}

export function getPostsByPillar(pillar: PillarSlug): PostSummary[] {
  return getAllPosts().filter((p) => p.pillar === pillar);
}
