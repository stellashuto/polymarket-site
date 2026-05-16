import { Suspense } from "react";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { MainHero, SubHero } from "@/components/HeroGrid";
import { PopularRanking } from "@/components/PopularRanking";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PriceTicker } from "@/components/PriceTicker";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IN_FEED_INTERVAL } from "@/lib/ads";
import { CATEGORY_LABELS } from "@/lib/categories";

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

  const [hero, sub1, sub2, ...rest] = articles;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 仮想通貨価格ティッカー */}
      <Suspense>
        <PriceTicker />
      </Suspense>

      {/* サイトヘッダー */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">
              Crypto
            </span>
            <span className="text-slate-900 font-black text-lg tracking-tight">
              Brief
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-xs hidden sm:inline">{all.length} 記事</span>
            <Link href="/about" className="text-slate-600 hover:text-blue-700 text-xs">運営者情報</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Suspense>
            <CategoryFilter current={current} />
          </Suspense>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {current !== "all" && (
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: CATEGORY_LABELS[current] ?? current },
            ]}
          />
        )}

        {articles.length === 0 ? (
          <div className="text-center text-slate-500 py-24">
            記事がありません
          </div>
        ) : (
          <>
            {/* ヒーロー＋ランキング 3カラム（Coinpost風） */}
            {hero && (
              <section className="mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
                  {/* メインヒーロー (左・大) */}
                  <div className="lg:col-span-7">
                    <MainHero a={hero} />
                  </div>
                  {/* サブヒーロー＋広告 (中央・中) */}
                  <div className="lg:col-span-3 flex flex-col gap-4">
                    {sub1 && <SubHero a={sub1} />}
                    {sub2 && <SubHero a={sub2} />}
                    {/* 残り高さを広告で埋める（PCで上下バランス、モバイルでは縦並びの自然な位置） */}
                    <div className="flex-1 flex items-center justify-center">
                      <AdSlot slotId="home-after-hero" />
                    </div>
                  </div>
                  {/* ランキング (右) */}
                  <div className="lg:col-span-2">
                    <PopularRanking articles={all} limit={8} />
                  </div>
                </div>
              </section>
            )}

            {/* 最新記事リスト */}
            {rest.length > 0 && (
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
                <div className="lg:col-span-8">
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
                </div>

                {/* サイドバー（一覧時もランキングを継続表示） */}
                <aside className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32 space-y-6">
                    <PopularRanking articles={all} limit={5} />
                    <AdSlot slotId="article-mid" />
                  </div>
                </aside>
              </section>
            )}
          </>
        )}
      </div>

      <footer className="border-t border-slate-200 mt-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-8">
            <div>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-blue-700 font-black tracking-tight">Crypto</span>
                <span className="text-slate-900 font-black tracking-tight">Brief</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                仮想通貨・金融・予測市場の<br/>独立系ニュースメディア
              </p>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-xs mb-2 uppercase tracking-wider">サイト</h3>
              <ul className="space-y-1.5 text-slate-600">
                <li><Link href="/" className="hover:text-blue-700">ホーム</Link></li>
                <li><Link href="/about" className="hover:text-blue-700">運営者情報</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-700">プライバシーポリシー</Link></li>
                <li><Link href="/feed.xml" className="hover:text-blue-700">RSS</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-xs mb-2 uppercase tracking-wider">カテゴリ</h3>
              <ul className="space-y-1.5 text-slate-600">
                <li><Link href="/?category=crypto" className="hover:text-blue-700">暗号資産</Link></li>
                <li><Link href="/?category=economics" className="hover:text-blue-700">経済</Link></li>
                <li><Link href="/?category=politics" className="hover:text-blue-700">政治</Link></li>
                <li><Link href="/?category=sports" className="hover:text-blue-700">スポーツ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-xs mb-2 uppercase tracking-wider">情報ソース</h3>
              <ul className="space-y-1.5 text-slate-600 text-xs">
                <li>Polymarket</li>
                <li>CoinPost</li>
                <li>CoinDesk JAPAN</li>
                <li>Crypto Times</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} CryptoBrief</span>
            <span className="hidden sm:inline">·</span>
            <span>本サイトはアフィリエイトプログラムに参加しています</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
