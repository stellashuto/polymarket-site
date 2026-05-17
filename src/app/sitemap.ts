import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";

const CATEGORIES = ["crypto", "economics", "politics", "sports", "entertainment", "other"];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const now = new Date();

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((a) => {
    const last = a.date ? new Date(a.date) : now;
    return [
      {
        url: `${SITE_URL}/articles/${a.slug}`,
        lastModified: last,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: {
            ja: `${SITE_URL}/articles/${a.slug}`,
            en: `${SITE_URL}/en/articles/${a.slug}`,
          },
        },
      },
      {
        url: `${SITE_URL}/en/articles/${a.slug}`,
        lastModified: last,
        changeFrequency: "weekly",
        priority: 0.7,
      },
    ];
  });

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.flatMap((cat) => [
    {
      url: `${SITE_URL}/?category=${cat}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/en?category=${cat}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.5,
    },
  ]);

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1.0,
      alternates: {
        languages: { ja: `${SITE_URL}/`, en: `${SITE_URL}/en` },
      },
    },
    { url: `${SITE_URL}/en`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/en/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/en/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...categoryEntries,
    ...articleEntries,
  ];
}
