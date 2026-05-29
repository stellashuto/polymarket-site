import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllArticles, localeTitle } from "@/lib/articles";
import { ArticlePageView } from "@/components/ArticlePageView";
import { categoryLabel } from "@/lib/i18n";

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
  const url = `${SITE_URL}/en/articles/${article.slug}`;
  const headline = localeTitle(article, "en");
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: article.title_en ? "en" : "ja",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: categoryLabel("en", article.category),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    description: buildDescription(article.contentHtml),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const description = buildDescription(article.contentHtml);
  const title = localeTitle(article, "en");
  const url = `${SITE_URL}/en/articles/${article.slug}`;
  const ogImage = article.thumbnail
    ? `${SITE_URL}/thumbnails/${article.thumbnail}`
    : undefined;
  const jaUrl = `${SITE_URL}/articles/${article.slug}`;
  return {
    title,
    description,
    // 本文がまだ日本語のままなので canonical は日本語版を指す。
    // /en は補助的ナビゲーション（UI英語化）として提供している扱い。
    // 将来、本文を完全英訳できたら canonical を url 自身に戻す。
    alternates: {
      canonical: jaUrl,
      languages: {
        "ja": jaUrl,
        "en": url,
        "x-default": jaUrl,
      },
    },
    // 重要: noindex に変更。canonical=JA + index=true の矛盾を解消し、
    // Googleのクロール予算を日本語版に集中させる。
    // ユーザーは引き続き /en/articles/ にアクセス可能。
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: article.date,
      tags: [categoryLabel("en", article.category)],
      ...(ogImage ? { images: [{ url: ogImage, width: 1280, height: 720 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ArticlePageEn({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const articleJsonLd = buildArticleJsonLd(article);

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <ArticlePageView article={article} allArticles={allArticles} locale="en" />
    </>
  );
}
