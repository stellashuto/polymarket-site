import { Suspense } from "react";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard, HeroCard } from "@/components/ArticleCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { AdSlot } from "@/components/AdSlot";
import { IN_FEED_INTERVAL } from "@/lib/ads";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { category } = await searchParams;
  const current = category ?? "all";

  const all = getAllArticles();
  const articles =
    current === "all" ? all : all.filter((a) => a.category === current);

  const [hero, ...rest] = articles;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
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
          <span className="text-slate-500 text-xs">{all.length} 記事</span>
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <Suspense>
            <CategoryFilter current={current} />
          </Suspense>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        {articles.length === 0 ? (
          <div className="text-center text-slate-500 py-24">
            記事がありません
          </div>
        ) : (
          <>
            {hero && (
              <div className="mb-8 md:mb-10">
                <HeroCard article={hero} />
              </div>
            )}

            <AdSlot slotId="home-after-hero" />

            {rest.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <span className="block w-1 h-5 bg-blue-700 rounded-sm" />
                  <h2 className="text-slate-900 font-bold text-base md:text-lg">
                    最新記事
                  </h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {rest.map((article, idx) => (
                    <div key={article.slug}>
                      <ArticleCard article={article} />
                      {(idx + 1) % IN_FEED_INTERVAL === 0 && idx < rest.length - 1 && (
                        <AdSlot slotId="home-in-feed" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8 text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-2">
          <span>© {new Date().getFullYear()} MarketCast JP</span>
          <span className="hidden sm:inline">·</span>
          <span>仮想通貨・金融・予測市場の独立系ニュースメディア</span>
          <span className="ml-auto">
            <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
          </span>
        </div>
      </footer>
    </main>
  );
}
