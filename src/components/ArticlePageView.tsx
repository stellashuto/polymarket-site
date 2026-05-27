import Link from "next/link";
import { format } from "date-fns";
import { Article, ArticleMeta, localeTitle } from "@/lib/articles";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ShareButtons } from "@/components/ShareButtons";
import { PolymarketDisclaimer } from "@/components/PolymarketDisclaimer";
import { OddsChart } from "@/components/OddsChart";
import { LanguageToggle } from "@/components/LanguageToggle";
import { readingTime } from "@/lib/reading-time";
import { categoryLabel, t, type Locale } from "@/lib/i18n";

const CATEGORY_THEME: Record<string, { badge: string }> = {
  politics: { badge: "bg-blue-50 text-blue-700" },
  crypto: { badge: "bg-orange-50 text-orange-700" },
  sports: { badge: "bg-emerald-50 text-emerald-700" },
  economics: { badge: "bg-purple-50 text-purple-700" },
  entertainment: { badge: "bg-pink-50 text-pink-700" },
  other: { badge: "bg-slate-100 text-slate-700" },
};

// 本文HTMLから生のJSON-LDコードブロックや<script>タグを除去
function sanitizeArticleHtml(html: string): string {
  return html
    .replace(/<pre[^>]*>\s*<code[^>]*language-json[^"]*"[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi, "")
    .replace(/<pre[^>]*>[\s\S]*?@context[\s\S]*?<\/pre>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "");
}

// 本文を「2番目の <h2> の直前」で分割する（記事中盤広告の挿入位置）
function splitForMidAd(html: string): [string, string] {
  const matches = [...html.matchAll(/<h2[\s>]/g)];
  if (matches.length < 2) return [html, ""];
  const idx = matches[1].index ?? -1;
  if (idx < 0) return [html, ""];
  return [html.slice(0, idx), html.slice(idx)];
}

type Props = {
  article: Article;
  allArticles: ArticleMeta[];
  locale: Locale;
};

export function ArticlePageView({ article, allArticles, locale }: Props) {
  const d = t(locale);
  const sanitizedHtml = sanitizeArticleHtml(article.contentHtml);
  const [bodyTop, bodyRest] = splitForMidAd(sanitizedHtml);
  const minutes = readingTime(sanitizedHtml);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";
  const articleUrl = locale === "en"
    ? `${SITE_URL}/en/articles/${article.slug}`
    : `${SITE_URL}/articles/${article.slug}`;
  const homeHref = locale === "en" ? "/en" : "/";
  const catHref = (cat: string) =>
    locale === "en" ? `/en?category=${cat}` : `/?category=${cat}`;
  const theme = CATEGORY_THEME[article.category] ?? CATEGORY_THEME.other;
  const label = categoryLabel(locale, article.category);
  const title = localeTitle(article, locale);
  const dateStr = article.date
    ? format(
        new Date(article.date),
        locale === "en" ? "MMM d, yyyy HH:mm" : "yyyy年MM月dd日 HH:mm",
      )
    : "";
  const showTranslationNotice = locale === "en" && !article.title_en;

  const proseClasses = `prose prose-slate max-w-none
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
    prose-img:hidden`;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={homeHref} className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">Crypto</span>
            <span className="text-slate-900 font-black text-lg tracking-tight">Brief</span>
            <span className="text-slate-400 font-bold text-xs tracking-wider ml-0.5">JP</span>
          </Link>
          <Link
            href={homeHref}
            className="ml-auto text-slate-600 hover:text-blue-700 text-sm transition-colors"
          >
            ← {d.home}
          </Link>
          <LanguageToggle current={locale} />
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <Breadcrumbs
          items={[
            { label: d.breadcrumb_home, href: homeHref },
            { label: label, href: catHref(article.category) },
            { label: title.length > 30 ? title.slice(0, 30) + "…" : title },
          ]}
        />

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Link
            href={catHref(article.category)}
            className={`${theme.badge} text-xs font-bold px-2.5 py-1 rounded-sm hover:opacity-80 transition-opacity`}
          >
            {label}
          </Link>
          <span className="text-slate-500 text-xs">{dateStr}</span>
          <span className="text-slate-400 text-xs">·</span>
          <span className="text-slate-500 text-xs">{d.reading_minutes(minutes)}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-6">
          {title}
        </h1>

        {showTranslationNotice && (
          <div className="my-4 px-4 py-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-md text-sm text-blue-900">
            {d.translation_notice}
          </div>
        )}

        {article.thumbnail && (
          <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/thumbnails/${article.thumbnail}`}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <ShareButtons title={title} url={articleUrl} />

        {article.type === "market" && <PolymarketDisclaimer />}

        {article.type === "market" && article.odds_history.length > 0 && (
          <OddsChart series={article.odds_history} />
        )}

        <div className={proseClasses} dangerouslySetInnerHTML={{ __html: bodyTop }} />

        {bodyRest && <AdSlot slotId="article-mid" />}

        {bodyRest && (
          <div className={proseClasses} dangerouslySetInnerHTML={{ __html: bodyRest }} />
        )}

        <AdSlot slotId="article-bottom" />

        <ShareButtons title={title} url={articleUrl} />

        <RelatedArticles current={article} all={allArticles} max={4} locale={locale} />

        {article.type === "news" && article.source_url && (
          <div className="mt-10 pt-5 border-t border-slate-200">
            <div className="text-xs text-slate-500 mb-1">{d.source_section}</div>
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener nofollow"
              className="text-blue-700 hover:underline text-sm font-medium break-all"
            >
              {article.source} — {d.read_original}
            </a>
          </div>
        )}

        {article.type === "market" && article.polymarket_url && (
          <div className="mt-10 pt-5 border-t border-slate-200">
            <div className="text-xs text-slate-500 mb-1">{d.data_source}</div>
            <a
              href={article.polymarket_url}
              target="_blank"
              rel="noopener nofollow"
              className="text-blue-700 hover:underline text-sm font-medium break-all"
            >
              {d.polymarket_market_page}
            </a>
          </div>
        )}

        <div className="mt-10 pt-5 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
          {d.disclaimer_short}
        </div>
      </article>
    </div>
  );
}
