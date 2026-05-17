import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function parseOddsHistory(raw: unknown): OddsSeries[] {
  if (!Array.isArray(raw)) return [];
  const out: OddsSeries[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) continue;
    const obj = item as { outcome?: unknown; history?: unknown };
    const outcome = typeof obj.outcome === "string" ? obj.outcome : "";
    let history: [number, number][] = [];
    if (typeof obj.history === "string") {
      try {
        const parsed = JSON.parse(obj.history);
        if (Array.isArray(parsed)) {
          history = parsed
            .filter((p) => Array.isArray(p) && p.length === 2)
            .map((p) => [Number(p[0]), Number(p[1])] as [number, number]);
        }
      } catch {
        // ignore
      }
    } else if (Array.isArray(obj.history)) {
      history = (obj.history as unknown[])
        .filter((p): p is unknown[] => Array.isArray(p) && p.length === 2)
        .map((p) => [Number(p[0]), Number(p[1])] as [number, number]);
    }
    if (outcome && history.length > 0) out.push({ outcome, history });
  }
  return out;
}

export type OddsSeries = {
  outcome: string;
  history: [number, number][];
};

export type ArticleMeta = {
  slug: string;
  title: string;
  title_en: string;
  date: string;
  category: string;
  volume_usd: number;
  condition_id: string;
  chart_image: string;
  thumbnail: string;
  type: "news" | "market";
  source: string;
  source_url: string;
  polymarket_url: string;
  odds_history: OddsSeries[];
};

/** ロケールに応じたタイトルを返す（英語版があれば優先、なければ日本語） */
export function localeTitle(article: ArticleMeta, locale: "ja" | "en"): string {
  if (locale === "en" && article.title_en) return article.title_en;
  return article.title;
}

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
      thumbnail: data.thumbnail ?? "",
      type: (data.type as "news" | "market") ?? "market",
      source: data.source ?? "",
      source_url: data.source_url ?? "",
      title_en: data.title_en ?? "",
      polymarket_url: data.polymarket_url ?? "",
      odds_history: parseOddsHistory(data.odds_history),
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
    thumbnail: data.thumbnail ?? "",
    type: (data.type as "news" | "market") ?? "market",
    source: data.source ?? "",
    source_url: data.source_url ?? "",
    title_en: data.title_en ?? "",
    polymarket_url: data.polymarket_url ?? "",
    odds_history: parseOddsHistory(data.odds_history),
    contentHtml: processed.toString(),
  };
}

export { CATEGORY_LABELS } from "./categories";
