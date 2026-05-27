import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageToggle } from "@/components/LanguageToggle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";
const SITE_NAME = "CryptoBrief";

export const metadata: Metadata = {
  title: "About / Editorial Policy",
  description: `${SITE_NAME} — about page, editorial policy, sources, and operations.`,
  alternates: {
    canonical: `${SITE_URL}/en/about`,
    languages: {
      "ja": `${SITE_URL}/about`,
      "en": `${SITE_URL}/en/about`,
      "x-default": `${SITE_URL}/about`,
    },
  },
};

export default function AboutPageEn() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/en" className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">Crypto</span>
            <span className="text-slate-900 font-black text-lg tracking-tight">Brief</span>
            <span className="text-slate-400 font-bold text-xs tracking-wider ml-0.5">JP</span>
          </Link>
          <div className="ml-auto">
            <LanguageToggle current="en" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 prose prose-slate
        prose-headings:text-slate-900
        prose-h1:text-3xl prose-h1:font-black
        prose-h2:text-xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
        prose-h3:text-base prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-2
        prose-p:text-slate-700 prose-p:leading-7
        prose-a:text-blue-700">
        <Breadcrumbs items={[{ label: "Home", href: "/en" }, { label: "About" }]} />

        <h1>About / Editorial Policy</h1>

        <p>CryptoBrief JP is an independent bilingual (Japanese / English) online media outlet covering cryptocurrency, prediction markets, airdrops, and broader financial news. We combine Polymarket data with trusted news sources from Japan and abroad to deliver market commentary and token explainers for investors and traders worldwide.</p>

        <h2>Mission</h2>
        <p>To deliver accurate, timely Japanese-language coverage of fast-moving developments in crypto, prediction markets, and broader financial markets. We emphasize commentary grounded in primary data, avoid speculation, and aim to give readers the information they need to form their own views.</p>

        <h2>Editorial Policy</h2>
        <h3>Accuracy</h3>
        <ul>
          <li>Figures, numbers, and named entities follow primary sources (Polymarket API, corporate announcements, news outlets)</li>
          <li>Links to original sources are always included so readers can verify</li>
          <li>Errors are corrected promptly with revision notes</li>
        </ul>

        <h3>Neutrality</h3>
        <ul>
          <li>We do not endorse specific coins, exchanges, or services</li>
          <li>Price forecasts are framed as "market participants believe X," not as recommendations</li>
          <li>Affiliate links are clearly labeled and kept independent of editorial decisions</li>
        </ul>

        <h3>Use of AI</h3>
        <p>Parts of our article generation pipeline use AI (Anthropic Claude). All information is grounded in published primary sources, and generated articles follow editorial rules to avoid hallucination. Only trusted feeds and API data are fed into the model.</p>

        <h2>Sources</h2>
        <ul>
          <li><strong>Prediction markets</strong>: Polymarket (Gamma / CLOB APIs)</li>
          <li><strong>Crypto news</strong>: CoinPost, CoinDesk JAPAN, あたらしい経済, Crypto Times, CoinDesk, Cointelegraph, The Block, Decrypt</li>
          <li><strong>Financial data</strong>: Corporate IR, US SEC filings, US Office of Government Ethics disclosures</li>
        </ul>

        <h2>Operations</h2>
        <p>CryptoBrief is operated as an independent editorial outlet. We receive no direct funding from specific exchanges or projects. Revenue comes from Google AdSense and affiliate programs (A8.net, etc.).</p>

        <h2>Disclaimer</h2>
        <p>Our articles are for informational purposes only and do not constitute investment solicitation or financial advice. Investment decisions are at your own risk. We are not liable for losses arising from use of our information.</p>

        <h2>Contact & Corrections</h2>
        <p>For questions, error reports, or removal requests, please contact the site operator directly.</p>

        <h2>Related</h2>
        <ul>
          <li><Link href="/en/privacy">Privacy Policy</Link></li>
          <li><Link href="/feed.xml">RSS feed</Link></li>
        </ul>
      </main>

      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-3xl mx-auto px-4 py-8 text-xs text-slate-500">
          <Link href="/en" className="hover:underline">← Back to home</Link>
        </div>
      </footer>
    </div>
  );
}
