import Link from "next/link";
import { format } from "date-fns";
import { ArticleMeta } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/categories";

const CATEGORY_THEME: Record<
  string,
  { thumb: string; badge: string; label: string }
> = {
  politics: {
    thumb: "from-blue-600 to-blue-800",
    badge: "bg-blue-50 text-blue-700",
    label: "政治",
  },
  crypto: {
    thumb: "from-orange-500 to-amber-600",
    badge: "bg-orange-50 text-orange-700",
    label: "暗号資産",
  },
  sports: {
    thumb: "from-emerald-500 to-green-700",
    badge: "bg-emerald-50 text-emerald-700",
    label: "スポーツ",
  },
  economics: {
    thumb: "from-purple-600 to-violet-800",
    badge: "bg-purple-50 text-purple-700",
    label: "経済",
  },
  entertainment: {
    thumb: "from-pink-500 to-rose-700",
    badge: "bg-pink-50 text-pink-700",
    label: "エンタメ",
  },
  other: {
    thumb: "from-slate-500 to-slate-700",
    badge: "bg-slate-100 text-slate-700",
    label: "その他",
  },
};

function pickTheme(cat: string) {
  return CATEGORY_THEME[cat] ?? CATEGORY_THEME.other;
}

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const theme = pickTheme(article.category);
  const label = CATEGORY_LABELS[article.category] ?? theme.label;
  const dateStr = article.date
    ? format(new Date(article.date), "yyyy.MM.dd")
    : "";

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex gap-4 py-5 border-b border-slate-100 hover:bg-slate-50/60 transition-colors -mx-3 px-3 rounded-lg"
    >
      <div
        className={`relative shrink-0 w-32 h-24 md:w-40 md:h-28 rounded-lg overflow-hidden bg-gradient-to-br ${theme.thumb}`}
      >
        {article.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/thumbnails/${article.thumbnail}`}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute bottom-1.5 left-2 text-white text-[10px] font-bold tracking-wider uppercase drop-shadow-sm">
          {label}
        </span>
      </div>

      <div className="flex flex-col justify-between min-w-0 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`${theme.badge} text-[11px] font-medium px-2 py-0.5 rounded-sm`}
            >
              {label}
            </span>
            {article.type === "market" && (
              <span className="bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                予測市場
              </span>
            )}
            {article.type === "news" && article.source && (
              <span className="text-slate-500 text-[11px]">{article.source}</span>
            )}
            <span className="text-slate-400 text-xs ml-auto">{dateStr}</span>
          </div>
          <h2 className="text-slate-900 font-bold text-base md:text-lg leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
            {article.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export function HeroCard({ article }: { article: ArticleMeta }) {
  const theme = pickTheme(article.category);
  const label = CATEGORY_LABELS[article.category] ?? theme.label;
  const dateStr = article.date
    ? format(new Date(article.date), "yyyy.MM.dd HH:mm")
    : "";

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div
        className={`relative aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br ${theme.thumb} flex items-end`}
      >
        {article.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/thumbnails/${article.thumbnail}`}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative p-6 md:p-8 z-10 w-full">
          <span className="inline-block bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded-sm mb-3">
            {label}
          </span>
          <h2 className="text-white font-bold text-xl md:text-2xl leading-snug line-clamp-2 group-hover:underline">
            {article.title}
          </h2>
          <p className="text-white/80 text-xs mt-2">{dateStr}</p>
        </div>
      </div>
    </Link>
  );
}
