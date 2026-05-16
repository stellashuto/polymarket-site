import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { getArticle, getAllArticles } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/categories";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ShareButtons } from "@/components/ShareButtons";
import { PolymarketDisclaimer } from "@/components/PolymarketDisclaimer";
import { readingTime } from "@/lib/reading-time";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://polymarket-site-ochre.vercel.app";
const SITE_NAME = "MarketCast JP";

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

function buildDescription(html: string, max = 160): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

// 本文HTMLから生のJSON-LDコードブロックや<script>タグを除去
function sanitizeArticleHtml(html: string): string {
  return html
    // <pre><code class="language-json...">…</code></pre> を丸ごと削除
    .replace(/<pre[^>]*>\s*<code[^>]*language-json[^"]*"[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi, "")
    // それ以外でも @context や FAQPage を含むpreブロックは構造化データの可能性が高いので削除
    .replace(/<pre[^>]*>[\s\S]*?@context[\s\S]*?<\/pre>/gi, "")
    // 本文中に紛れ込んだ <script> タグも安全のため削除
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

function buildArticleJsonLd(article: Awaited<ReturnType<typeof getArticle>>) {
  if (!article) return null;
  const url = `${SITE_URL}/articles/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "ja",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: CATEGORY_LABELS[article.category] ?? "その他",
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: buildDescription(article.contentHtml),
    ...(article.source_url
      ? {
          citation: {
            "@type": "CreativeWork",
            name: article.source,
            url: article.source_url,
          },
        }
      : {}),
  };
}

// 記事中の `<h3>Qx ...</h3><p>Ax ...</p>` 形式を拾ってFAQPage JSON-LDを組み立てる
function extractFaqJsonLd(html: string) {
  const items: { q: string; a: string }[] = [];
  // 「質問」「Q.」「Q1.」のように始まるh3〜h4を拾う
  const blockRe = /<h[34][^>]*>([^<]*?)<\/h[34]>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(html)) !== null) {
    const headline = m[1].trim();
    if (/^(Q\d*\.?|質問|FAQ|よくある質問)/i.test(headline)) {
      items.push({
        q: headline.replace(/^Q\d*\.\s*/i, "").replace(/^質問[:：]\s*/, ""),
        a: m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      });
    }
  }
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const description = buildDescription(article.contentHtml);
  const url = `${SITE_URL}/articles/${article.slug}`;
  const ogImage = article.thumbnail
    ? `${SITE_URL}/thumbnails/${article.thumbnail}`
    : undefined;
  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description,
      publishedTime: article.date,
      tags: [CATEGORY_LABELS[article.category] ?? article.category],
      ...(ogImage ? { images: [{ url: ogImage, width: 1280, height: 720 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const sanitizedHtml = sanitizeArticleHtml(article.contentHtml);
  const [bodyTop, bodyRest] = splitForMidAd(sanitizedHtml);
  const articleJsonLd = buildArticleJsonLd({ ...article, contentHtml: sanitizedHtml });
  const faqJsonLd = extractFaqJsonLd(sanitizedHtml);
  const minutes = readingTime(sanitizedHtml);
  const allArticles = getAllArticles();
  const articleUrl = `${SITE_URL}/articles/${article.slug}`;

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

  const theme = CATEGORY_THEME[article.category] ?? CATEGORY_THEME.other;
  const label = CATEGORY_LABELS[article.category] ?? theme.label;
  const dateStr = article.date
    ? format(new Date(article.date), "yyyy年MM月dd日 HH:mm")
    : "";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">
              Market
            </span>
            <span className="text-slate-900 font-black text-lg tracking-tight">
              Cast
            </span>
            <span className="text-slate-400 font-bold text-xs tracking-wider ml-0.5">
              JP
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

      <article className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <Breadcrumbs
          items={[
            { label: "ホーム", href: "/" },
            { label: label, href: `/?category=${article.category}` },
            { label: article.title.length > 30 ? article.title.slice(0, 30) + "…" : article.title },
          ]}
        />

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Link
            href={`/?category=${article.category}`}
            className={`${theme.badge} text-xs font-bold px-2.5 py-1 rounded-sm hover:opacity-80 transition-opacity`}
          >
            {label}
          </Link>
          <span className="text-slate-500 text-xs">{dateStr}</span>
          <span className="text-slate-400 text-xs">·</span>
          <span className="text-slate-500 text-xs">{minutes}分で読めます</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-6">
          {article.title}
        </h1>

        {article.thumbnail && (
          <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/thumbnails/${article.thumbnail}`}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <ShareButtons title={article.title} url={articleUrl} />

        {/* Polymarket予測市場の記事には法的注意書きを表示 */}
        {article.type === "market" && <PolymarketDisclaimer />}

        <div
          className={proseClasses}
          dangerouslySetInnerHTML={{ __html: bodyTop }}
        />

        {bodyRest && <AdSlot slotId="article-mid" />}

        {bodyRest && (
          <div
            className={proseClasses}
            dangerouslySetInnerHTML={{ __html: bodyRest }}
          />
        )}

        <AdSlot slotId="article-bottom" />

        <ShareButtons title={article.title} url={articleUrl} />

        <RelatedArticles current={article} all={allArticles} max={4} />

        {article.type === "news" && article.source_url && (
          <div className="mt-10 pt-5 border-t border-slate-200">
            <div className="text-xs text-slate-500 mb-1">出典</div>
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener nofollow"
              className="text-blue-700 hover:underline text-sm font-medium break-all"
            >
              {article.source} — 原文を読む ↗
            </a>
          </div>
        )}

        <div className="mt-10 pt-5 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
          ※本記事は予測市場・公開ニュース等の情報に基づいて作成された解説記事です。投資判断は自己責任でお願いします。当サイトはアフィリエイトプログラムに参加しており、記事内のリンクから取引所等に登録された場合、当サイトに紹介料が支払われることがあります。
        </div>
      </article>
    </div>
  );
}
