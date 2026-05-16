import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  volume_usd: number;
  condition_id: string;
  chart_image: string;
  type: "news" | "market";
  source: string;
  source_url: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      category: data.category ?? "other",
      volume_usd: Number(data.volume_usd ?? 0),
      condition_id: data.condition_id ?? "",
      chart_image: data.chart_image ?? "",
      type: (data.type as "news" | "market") ?? "market",
      source: data.source ?? "",
      source_url: data.source_url ?? "",
    } satisfies ArticleMeta;
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkHtml).process(content);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    category: data.category ?? "other",
    volume_usd: Number(data.volume_usd ?? 0),
    condition_id: data.condition_id ?? "",
    chart_image: data.chart_image ?? "",
    type: (data.type as "news" | "market") ?? "market",
    source: data.source ?? "",
    source_url: data.source_url ?? "",
    contentHtml: processed.toString(),
  };
}

export { CATEGORY_LABELS } from "./categories";
