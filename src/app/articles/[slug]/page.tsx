import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllArticles } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/categories";
import { ArticlePageView } from "@/components/ArticlePageView";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";
const SITE_NAME = "CryptoBrief";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

function buildDescription(html: string, max = 160): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
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
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} 編集部`,
      url: `${SITE_URL}/editorial-team`,
      knowsAbout: ["仮想通貨", "Polymarket", "予測市場", "エアドロップ", "DeFi"],
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      diversityPolicy: `${SITE_URL}/editorial-policy`,
      ethicsPolicy: `${SITE_URL}/editorial-policy`,
      correctionsPolicy: `${SITE_URL}/fact-checking`,
      masthead: `${SITE_URL}/editorial-team`,
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

function extractFaqJsonLd(html: string) {
  const items: { q: string; a: string }[] = [];
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
    alternates: {
      canonical: url,
      languages: {
        "ja": url,
        "en": `${SITE_URL}/en/articles/${article.slug}`,
        "x-default": url,
      },
    },
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

  const allArticles = getAllArticles();
  const articleJsonLd = buildArticleJsonLd(article);
  const faqJsonLd = extractFaqJsonLd(article.contentHtml);

  return (
    <>
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
      <ArticlePageView article={article} allArticles={allArticles} locale="ja" />
    </>
  );
}
