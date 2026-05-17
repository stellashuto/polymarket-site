import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageToggle } from "@/components/LanguageToggle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";
const SITE_NAME = "CryptoBrief";

export const metadata: Metadata = {
  title: "運営者情報 / 編集方針",
  description: `${SITE_NAME}の運営者情報、編集方針、情報ソース、運営体制について。`,
  alternates: { canonical: `${SITE_URL}/about` },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `${SITE_NAME} 運営者情報`,
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "NewsMediaOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    foundingDate: "2026",
    knowsAbout: ["仮想通貨", "予測市場", "Polymarket", "金融ニュース", "Bitcoin", "Ethereum"],
    inLanguage: "ja",
    diversityPolicy: `${SITE_URL}/about`,
    ethicsPolicy: `${SITE_URL}/about`,
    masthead: `${SITE_URL}/about`,
    correctionsPolicy: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">Crypto</span>
            <span className="text-slate-900 font-black text-lg tracking-tight">Brief</span>
          </Link>
          <div className="ml-auto">
            <LanguageToggle current="ja" />
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
        <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "運営者情報" }]} />

        <h1>運営者情報 / 編集方針</h1>

        <p>CryptoBrief（クリプトブリーフ）は、仮想通貨・金融・予測市場の3領域を横断する日本語のオンラインメディアです。Polymarket等の予測市場データと、国内外の信頼できるニュースソースを組み合わせ、投資家・トレーダー向けに市況解説を配信しています。</p>

        <h2>サイトの目的</h2>
        <p>急速に発展する暗号資産・予測市場・金融市場の動向を、日本語で正確かつ迅速に届けることを目的としています。一次データに基づいた解説に重点を置き、推測や煽りを避け、読者が自ら判断する材料となる情報提供を心がけています。</p>

        <h2>編集方針</h2>
        <h3>情報の正確性</h3>
        <ul>
          <li>数値・固有名詞は一次ソース（Polymarket API、企業公式発表、報道機関）の表記に従います</li>
          <li>引用元には必ずリンクを設置し、読者が原典を確認できるようにしています</li>
          <li>事実誤認が判明した場合は速やかに修正し、修正履歴を明示します</li>
        </ul>

        <h3>中立性</h3>
        <ul>
          <li>特定の銘柄・取引所・サービスの推奨は行いません</li>
          <li>価格予想は「市場参加者がそう見ている」というスタンスに留めます</li>
          <li>記事中のアフィリエイトリンクは「広告」「PR」として明示し、編集判断とは独立して掲載しています</li>
        </ul>

        <h3>テクノロジー活用</h3>
        <p>当サイトでは記事生成プロセスの一部にAI（Anthropic Claude）を活用しています。ただし、すべての情報は公開された一次ソースに基づいており、生成された記事も編集ルールに沿って自動的に構造化されています。AIが事実を作り出すことのないよう、入力データには信頼できる報道・APIデータのみを使用しています。</p>

        <h2>情報ソース</h2>
        <p>当サイトが参照している主なソース：</p>
        <ul>
          <li><strong>予測市場データ</strong>: Polymarket（Gamma API / CLOB API）</li>
          <li><strong>仮想通貨ニュース</strong>: CoinPost、CoinDesk JAPAN、あたらしい経済、Crypto Times</li>
          <li><strong>金融データ</strong>: 各企業のIR公式発表、米SEC開示、政府倫理局（OGE）開示</li>
        </ul>

        <h2>運営体制</h2>
        <p>本サイトは独立系の編集体制で運営されています。特定の取引所・プロジェクトからの直接的な資金提供は受けていません。広告収入は Google AdSense および A8.net 等のアフィリエイトプログラムから得ています。</p>

        <h2>免責事項</h2>
        <p>当サイトの記事は情報提供を目的としたものであり、投資勧誘や金融助言ではありません。最終的な投資判断はご自身の責任で行ってください。当サイトの情報を利用したことによって生じた損害について、運営者は一切の責任を負いません。</p>

        <h2>お問い合わせ・修正依頼</h2>
        <p>記事内容に関するお問い合わせ、誤りの指摘、削除依頼は、サイト運営者まで直接ご連絡ください。</p>

        <h2>関連ページ</h2>
        <ul>
          <li><Link href="/privacy">プライバシーポリシー</Link></li>
          <li><Link href="/feed.xml">RSS フィード</Link></li>
        </ul>
      </main>

      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-3xl mx-auto px-4 py-8 text-xs text-slate-500">
          <Link href="/" className="hover:underline">← トップへ戻る</Link>
        </div>
      </footer>
    </div>
  );
}
