import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { getArticle, getAllArticles } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/categories";

const CATEGORY_THEME: Record<string, { badge: string; label: string }> = {
  politics: { badge: "bg-blue-50 text-blue-700", label: "政治" },
  crypto: { badge: "bg-orange-50 text-orange-700", label: "暗号資産" },
  sports: { badge: "bg-emerald-50 text-emerald-700", label: "スポーツ" },
  economics: { badge: "bg-purple-50 text-purple-700", label: "経済" },
  entertainment: { badge: "bg-pink-50 text-pink-700", label: "エンタメ" },
  other: { badge: "bg-slate-100 text-slate-700", label: "その他" },
};

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const theme = CATEGORY_THEME[article.category] ?? CATEGORY_THEME.other;
  const label = CATEGORY_LABELS[article.category] ?? theme.label;
  const dateStr = article.date
    ? format(new Date(article.date), "yyyy年MM月dd日 HH:mm")
    : "";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-blue-700 font-black text-lg tracking-tight">
              Polymarket
            </span>
            <span className="text-slate-900 font-bold text-lg tracking-tight">
              Watch
            </span>
          </Link>
          <Link
            href="/"
            className="ml-auto text-slate-600 hover:text-blue-700 text-sm transition-colors"
          >
            ← 一覧へ
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/?category=${article.category}`}
            className={`${theme.badge} text-xs font-bold px-2.5 py-1 rounded-sm hover:opacity-80 transition-opacity`}
          >
            {label}
          </Link>
          <span className="text-slate-500 text-xs">{dateStr}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-8">
          {article.title}
        </h1>

        <div
          className="prose prose-slate max-w-none
            prose-headings:text-slate-900 prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-slate-700 prose-p:leading-7 prose-p:my-4
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
            prose-ul:text-slate-700 prose-ol:text-slate-700
            prose-li:my-1
            prose-table:text-sm
            prose-th:bg-slate-50 prose-th:text-slate-900 prose-th:p-2 prose-th:border prose-th:border-slate-200
            prose-td:p-2 prose-td:border prose-td:border-slate-200 prose-td:text-slate-700
            prose-hr:border-slate-200
            prose-blockquote:border-l-blue-700 prose-blockquote:text-slate-700 prose-blockquote:not-italic
            prose-code:text-pink-700 prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-900 prose-pre:text-slate-100
            prose-img:hidden"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500">
          ※本記事は予測市場・公開ニュース等の情報に基づいて作成された解説記事です。投資判断は自己責任でお願いします。
        </div>
      </article>
    </div>
  );
}
