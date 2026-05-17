import Link from "next/link";
import { ArticleMeta, localeTitle } from "@/lib/articles";
import { categoryLabel, t, type Locale } from "@/lib/i18n";

type Props = { articles: ArticleMeta[]; limit?: number; locale?: Locale };

const CATEGORY_BADGE: Record<string, string> = {
  politics: "bg-blue-50 text-blue-700",
  crypto: "bg-orange-50 text-orange-700",
  sports: "bg-emerald-50 text-emerald-700",
  economics: "bg-purple-50 text-purple-700",
  entertainment: "bg-pink-50 text-pink-700",
  other: "bg-slate-100 text-slate-700",
};

/**
 * 「人気記事ランキング」。閲覧データがないため以下のスコアで近似:
 *   - market記事: 出来高を重視（ボラ・注目度の代理）
 *   - news記事: 直近24h以内なら高スコア
 *   - 共通: 新しいほどスコア高
 */
function scoreArticle(a: ArticleMeta): number {
  const now = Date.now();
  const published = a.date ? new Date(a.date).getTime() : 0;
  const ageHours = (now - published) / (1000 * 60 * 60);
  const freshness = Math.max(0, 72 - ageHours);   // 0..72
  const volumeBoost = a.type === "market" ? Math.log10(Math.max(1, a.volume_usd)) * 5 : 10;
  return freshness + volumeBoost;
}

export function PopularRanking({ articles, limit = 8, locale = "ja" }: Props) {
  const d = t(locale);
  const ranked = [...articles].sort((a, b) => scoreArticle(b) - scoreArticle(a)).slice(0, limit);
  if (ranked.length === 0) return null;

  const articleHref = (slug: string) => locale === "en" ? `/en/articles/${slug}` : `/articles/${slug}`;
  const homeHref = locale === "en" ? "/en" : "/";

  return (
    <aside className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50">
        <h2 className="text-slate-900 font-bold text-sm">{d.popular_ranking}</h2>
        <Link href={homeHref} className="text-blue-700 text-xs hover:underline">{d.view_all}</Link>
      </header>
      <ol className="divide-y divide-slate-100">
        {ranked.map((a, i) => {
          const rank = i + 1;
          const isTop3 = rank <= 3;
          const badge = CATEGORY_BADGE[a.category] ?? CATEGORY_BADGE.other;
          return (
            <li key={a.slug}>
              <Link
                href={articleHref(a.slug)}
                className="flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors"
              >
                <span
                  className={`shrink-0 inline-flex items-center justify-center w-6 h-6 mt-0.5 text-xs font-black rounded-sm ${
                    isTop3
                      ? "bg-blue-700 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {rank}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`${badge} text-[10px] font-medium px-1.5 py-0.5 rounded-sm`}>
                      {categoryLabel(locale, a.category)}
                    </span>
                  </div>
                  <p className="text-slate-900 text-[13px] font-semibold leading-snug line-clamp-3">
                    {localeTitle(a, locale)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
