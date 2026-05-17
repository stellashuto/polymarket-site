import Link from "next/link";
import { format } from "date-fns";
import { ArticleMeta, localeTitle } from "@/lib/articles";
import { categoryLabel, t, type Locale } from "@/lib/i18n";

type Props = {
  current: ArticleMeta;
  all: ArticleMeta[];
  max?: number;
  locale?: Locale;
};

const CATEGORY_BADGE: Record<string, string> = {
  politics: "bg-blue-50 text-blue-700",
  crypto: "bg-orange-50 text-orange-700",
  sports: "bg-emerald-50 text-emerald-700",
  economics: "bg-purple-50 text-purple-700",
  entertainment: "bg-pink-50 text-pink-700",
  other: "bg-slate-100 text-slate-700",
};

export function RelatedArticles({ current, all, max = 4, locale = "ja" }: Props) {
  const d = t(locale);
  const sameCategory = all.filter(
    (a) => a.slug !== current.slug && a.category === current.category,
  );
  const others = all.filter(
    (a) => a.slug !== current.slug && a.category !== current.category,
  );
  const picks = [...sameCategory, ...others].slice(0, max);

  if (picks.length === 0) return null;

  const articleHref = (slug: string) =>
    locale === "en" ? `/en/articles/${slug}` : `/articles/${slug}`;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200 not-prose">
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-1 h-5 bg-blue-700 rounded-sm" />
        <h2 className="text-slate-900 font-bold text-base md:text-lg">
          {d.related_articles}
        </h2>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {picks.map((a) => {
          const badge = CATEGORY_BADGE[a.category] ?? CATEGORY_BADGE.other;
          const dateStr = a.date ? format(new Date(a.date), "yyyy.MM.dd") : "";
          return (
            <li key={a.slug}>
              <Link
                href={articleHref(a.slug)}
                className="flex gap-3 items-start p-3 rounded-lg hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                {a.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/thumbnails/${a.thumbnail}`}
                    alt=""
                    className="shrink-0 w-20 h-16 md:w-24 md:h-20 object-cover rounded-md"
                    loading="lazy"
                  />
                ) : (
                  <div className="shrink-0 w-20 h-16 md:w-24 md:h-20 bg-slate-100 rounded-md" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`${badge} text-[10px] font-medium px-1.5 py-0.5 rounded-sm`}>
                      {categoryLabel(locale, a.category)}
                    </span>
                    <span className="text-slate-400 text-[10px]">{dateStr}</span>
                  </div>
                  <p className="text-slate-900 text-sm font-semibold leading-snug line-clamp-2">
                    {localeTitle(a, locale)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
