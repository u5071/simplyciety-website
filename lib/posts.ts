import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  title_en: string;
  excerpt: string;
  excerpt_en: string;
  date: string;
  category: "consulting" | "platform" | "education" | "culture";
  readTime: number;
};

export type Post = PostMeta & { contentHtml: string };

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(postsDirectory, fileName), "utf8")
      );
      return {
        slug,
        title: data.title ?? "",
        title_en: data.title_en ?? data.title ?? "",
        excerpt: data.excerpt ?? "",
        excerpt_en: data.excerpt_en ?? data.excerpt ?? "",
        date: data.date ?? "",
        category: data.category ?? "consulting",
        readTime: data.readTime ?? 5,
      } as PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const contentHtml = (
      await remark().use(remarkHtml, { sanitize: false }).process(content)
    ).toString();
    return {
      slug,
      title: data.title ?? "",
      title_en: data.title_en ?? data.title ?? "",
      excerpt: data.excerpt ?? "",
      excerpt_en: data.excerpt_en ?? data.excerpt ?? "",
      date: data.date ?? "",
      category: data.category ?? "consulting",
      readTime: data.readTime ?? 5,
      contentHtml,
    };
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
