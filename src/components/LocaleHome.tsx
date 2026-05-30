import { Suspense } from "react";
import Link from "next/link";
import { getAllArticles, matchesCategory } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { MainHero, SubHero } from "@/components/HeroGrid";
import { PopularRanking } from "@/components/PopularRanking";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PriceTicker } from "@/components/PriceTicker";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageToggle } from "@/components/LanguageToggle";
import { IN_FEED_INTERVAL } from "@/lib/ads";
import { t, categoryLabel, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  category: string;
};

export async function LocaleHome({ locale, category }: Props) {
  const d = t(locale);
  const current = category;

  const all = getAllArticles();
  const articles = all.filter((a) => matchesCategory(a, current));
  const [hero, sub1, sub2, ...rest] = articles;

  const homeHref = locale === "en" ? "/en" : "/";
  const aboutHref = locale === "en" ? "/en/about" : "/about";
  const privacyHref = locale === "en" ? "/en/privacy" : "/privacy";
  const catHref = (c: string) =>
    locale === "en" ? `/en?category=${c}` : `/?category=${c}`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Suspense>
        <PriceTicker />
      </Suspense>

      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href={homeHref} className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">Crypto</span>
            <span className="text-slate-900 font-black text-lg tracking-tight">Brief</span>
            <span className="text-slate-400 font-bold text-xs tracking-wider ml-0.5">JP</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-xs hidden sm:inline">
              {d.articles_count(all.length)}
            </span>
            <Link href={aboutHref} className="text-slate-600 hover:text-blue-700 text-xs">
              {d.about}
            </Link>
            <LanguageToggle current={locale} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Suspense>
            <CategoryFilter current={current} locale={locale} />
          </Suspense>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {current !== "all" && (
          <Breadcrumbs
            items={[
              { label: d.breadcrumb_home, href: homeHref },
              { label: categoryLabel(locale, current) },
            ]}
          />
        )}

        {articles.length === 0 ? (
          <div className="text-center text-slate-500 py-24">
            {locale === "en" ? "No articles yet" : "記事がありません"}
          </div>
        ) : (
          <>
            {hero && (
              <section className="mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
                  <div className="lg:col-span-7">
                    <MainHero a={hero} locale={locale} />
                  </div>
                  <div className="lg:col-span-3 flex flex-col gap-4">
                    {sub1 && <SubHero a={sub1} locale={locale} />}
                    {sub2 && <SubHero a={sub2} locale={locale} />}
                    <div className="flex-1 flex items-center justify-center">
                      <AdSlot slotId="home-after-hero" />
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <PopularRanking articles={all} limit={8} locale={locale} />
                  </div>
                </div>
              </section>
            )}

            {rest.length > 0 && (
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <span className="block w-1 h-5 bg-blue-700 rounded-sm" />
                    <h2 className="text-slate-900 font-bold text-base md:text-lg">
                      {d.latest_articles}
                    </h2>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {rest.map((article, idx) => (
                      <div key={article.slug}>
                        <ArticleCard article={article} locale={locale} />
                        {(idx + 1) % IN_FEED_INTERVAL === 0 && idx < rest.length - 1 && (
                          <AdSlot slotId="home-in-feed" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32 space-y-6">
                    <PopularRanking articles={all} limit={5} locale={locale} />
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
                <span className="text-slate-400 font-bold text-[10px] tracking-wider">JP</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">{d.copyright_note}</p>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-xs mb-2 uppercase tracking-wider">
                {d.site_label}
              </h3>
              <ul className="space-y-1.5 text-slate-600">
                <li><Link href={homeHref} className="hover:text-blue-700">{d.home}</Link></li>
                <li><Link href={aboutHref} className="hover:text-blue-700">{d.about}</Link></li>
                <li><Link href="/editorial-team" className="hover:text-blue-700">編集体制</Link></li>
                <li><Link href="/editorial-policy" className="hover:text-blue-700">編集方針</Link></li>
                <li><Link href="/fact-checking" className="hover:text-blue-700">ファクトチェック</Link></li>
                <li><Link href="/methodology" className="hover:text-blue-700">取材方法</Link></li>
                <li><Link href={privacyHref} className="hover:text-blue-700">{d.privacy}</Link></li>
                <li><Link href="/feed.xml" className="hover:text-blue-700">{d.rss}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-xs mb-2 uppercase tracking-wider">
                {d.categories_label}
              </h3>
              <ul className="space-y-1.5 text-slate-600">
                <li><Link href={catHref("crypto")} className="hover:text-blue-700">{d.cat_crypto}</Link></li>
                <li><Link href={catHref("economics")} className="hover:text-blue-700">{d.cat_economics}</Link></li>
                <li><Link href={catHref("politics")} className="hover:text-blue-700">{d.cat_politics}</Link></li>
                <li><Link href={catHref("sports")} className="hover:text-blue-700">{d.cat_sports}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-xs mb-2 uppercase tracking-wider">
                {d.sources_label}
              </h3>
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
            <span>{d.affiliate_note}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
