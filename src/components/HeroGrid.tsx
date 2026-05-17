import Link from "next/link";
import { format } from "date-fns";
import { ArticleMeta, localeTitle } from "@/lib/articles";
import { categoryLabel, type Locale } from "@/lib/i18n";

const CATEGORY_GRADIENT: Record<string, string> = {
  politics: "from-blue-600 to-blue-800",
  crypto: "from-orange-500 to-amber-600",
  sports: "from-emerald-500 to-green-700",
  economics: "from-purple-600 to-violet-800",
  entertainment: "from-pink-500 to-rose-700",
  other: "from-slate-500 to-slate-700",
};

function gradient(cat: string) {
  return CATEGORY_GRADIENT[cat] ?? CATEGORY_GRADIENT.other;
}

type HeroProps = { a: ArticleMeta; locale?: Locale };

function heroHref(slug: string, locale: Locale): string {
  return locale === "en" ? `/en/articles/${slug}` : `/articles/${slug}`;
}

/** メインヒーロー（最大）。Coinpost左の大画像と同じ位置に置く想定。 */
export function MainHero({ a, locale = "ja" }: HeroProps) {
  const label = categoryLabel(locale, a.category);
  const date = a.date ? format(new Date(a.date), "yyyy.MM.dd HH:mm") : "";
  const title = localeTitle(a, locale);
  return (
    <Link href={heroHref(a.slug, locale)} className="group block h-full">
      <div className={`relative aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px] rounded-xl overflow-hidden bg-gradient-to-br ${gradient(a.category)}`}>
        {a.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/thumbnails/${a.thumbnail}`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10">
          <span className="inline-block bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded-sm mb-2.5">
            {label}
          </span>
          <h2 className="text-white font-bold text-lg md:text-2xl leading-snug line-clamp-3 group-hover:underline">
            {title}
          </h2>
          <p className="text-white/70 text-xs mt-2">{date}</p>
        </div>
      </div>
    </Link>
  );
}

/** サブヒーロー（中型）。メインヒーローの右や下に並べる用。 */
export function SubHero({ a, locale = "ja" }: HeroProps) {
  const label = categoryLabel(locale, a.category);
  const title = localeTitle(a, locale);
  return (
    <Link href={heroHref(a.slug, locale)} className="group block">
      <div className={`relative aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br ${gradient(a.category)}`}>
        {a.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/thumbnails/${a.thumbnail}`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 z-10">
          <span className="inline-block bg-white/90 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-sm mb-1.5">
            {label}
          </span>
          <h3 className="text-white font-bold text-sm md:text-base leading-snug line-clamp-2 group-hover:underline">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
