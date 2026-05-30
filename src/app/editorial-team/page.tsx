import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageToggle } from "@/components/LanguageToggle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";

export const metadata: Metadata = {
  title: "編集体制 / Editorial Team",
  description: "CryptoBrief JP の編集体制、執筆者の経歴、専門分野、編集ワークフロー、AI活用ガイドライン。",
  alternates: { canonical: `${SITE_URL}/editorial-team` },
};

const editorialTeamJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "CryptoBrief JP 編集体制",
  url: `${SITE_URL}/editorial-team`,
  mainEntity: {
    "@type": "NewsMediaOrganization",
    name: "CryptoBrief JP",
    url: SITE_URL,
    employee: [
      {
        "@type": "Person",
        name: "CryptoBrief JP 編集部",
        jobTitle: "編集長",
        knowsAbout: ["仮想通貨", "DeFi", "予測市場", "Polymarket", "エアドロップ"],
      },
    ],
  },
};

export default function EditorialTeamPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(editorialTeamJsonLd) }}
      />
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">Crypto</span>
            <span className="text-slate-900 font-black text-lg tracking-tight">Brief</span>
            <span className="text-slate-400 font-bold text-xs tracking-wider ml-0.5">JP</span>
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
        <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "編集体制" }]} />

        <h1>編集体制</h1>

        <p>CryptoBrief JP は、仮想通貨・予測市場・エアドロップを横断的にカバーする独立系メディアです。本ページでは編集体制、執筆者の専門分野、編集ワークフロー、AI活用ガイドラインについて開示します。</p>

        <h2>編集部の専門分野</h2>

        <h3>暗号資産・DeFi</h3>
        <p>2018年以降の暗号資産市場を継続的にウォッチしている編集メンバーが主導しています。主要L1/L2チェーンのテクニカル理解、DeFiプロトコルの実利用経験、ステーブルコイン規制動向のフォローを担当します。実取引（数千〜数万ドル規模）を継続している実務家視点を重視しています。</p>

        <h3>予測市場（Polymarket）</h3>
        <p>Polymarket・Kalshiなど予測市場プラットフォームのオッズ分析、政治・地政学・経済イベントとの相関分析を専門領域としています。出来高・流動性・スプレッドを実取引者の視点で解説します。</p>

        <h3>エアドロップ・空投戦略</h3>
        <p>2021年以降の主要エアドロップ（UNI / ARB / OP / ZRO / JUP など）にユーザーとして参加した経験をもとに、Sybil検知の最新動向、ポイントプログラム比較、税務対応までを実務的にカバーします。</p>

        <h2>編集ワークフロー</h2>

        <ol>
          <li><strong>情報収集</strong>：公式発表（プロジェクトブログ / GitHub / Discord）、一次報道（CoinPost、CoinDesk JAPAN、Cointelegraph、The Block、Decrypt 等）、公開API（Polymarket Gamma / CLOB API、Replicate）からデータを取得します。</li>
          <li><strong>事実確認</strong>：数値・固有名詞・日付について複数ソースのクロスチェックを行います。特に直近2週間以内の動向については Web 検索ツールで最新情報を確認します（詳細は <Link href="/fact-checking">ファクトチェック方針</Link>）。</li>
          <li><strong>執筆</strong>：構造化テンプレートを使わず、トピックに応じた構成を選択します。専門用語は初出時に解説、断定的でない曖昧表現の多用を避け、書き手の視点を明示します。</li>
          <li><strong>校正</strong>：自動校正に加え、明らかな誤情報・古い情報・誇大表現の検出を行います。AIを活用した内容についても、最終的な品質判断は編集者が行います。</li>
          <li><strong>公開</strong>：日本時間の朝・昼・夜の3タイミングで定時更新。重要な修正があった場合は記事内に修正履歴を記載します。</li>
        </ol>

        <h2>AIの活用方針</h2>

        <p>当サイトでは、記事制作プロセスの一部に AI（Anthropic Claude）を活用しています。これは <strong>透明性のために明示</strong> しています。</p>

        <h3>AIが担う領域</h3>
        <ul>
          <li>一次ソース（公式API・RSS・Web検索結果）の構造化と要約</li>
          <li>日本語と英語の翻訳・タイトル生成</li>
          <li>初稿の組み立て</li>
          <li>サムネイル画像の生成（Flux 1.1 Pro）</li>
        </ul>

        <h3>AIに任せない領域</h3>
        <ul>
          <li>事実関係の最終判断</li>
          <li>編集方針・取り上げるトピックの選定</li>
          <li>投資推奨・予測の断定（そもそも行いません）</li>
          <li>引用元の信頼性評価</li>
        </ul>

        <p>AI生成された文章であっても、編集者がレビュー・修正することを基本としています。生成記事が事実と異なる、または読者にとって有益でないと判断した場合は公開前に取り下げます。</p>

        <h2>独立性と中立性</h2>

        <p>当サイトは特定の取引所、プロジェクト、ファンドから直接資金を受領していません。収益源は以下のみです：</p>

        <ul>
          <li>アフィリエイトプログラム（A8.net 等、リンクには <code>rel=&quot;sponsored&quot;</code> 明示）</li>
          <li>将来的に Google AdSense 等のディスプレイ広告</li>
          <li>記事閲覧数連動の間接収益</li>
        </ul>

        <p>これらの収益源は編集判断と完全に分離されています。広告主・アフィリエイト先プロジェクトに有利な記事を意図的に書くことはありません。</p>

        <h2>修正・撤回ポリシー</h2>

        <p>事実誤認が判明した場合、迅速に修正します。修正内容によっては記事末尾に「修正履歴」を記載します。明らかに誤った情報や、第三者の権利を侵害する内容は速やかに削除します。</p>

        <h2>連絡先</h2>

        <p>記事への意見、誤りの指摘、取材依頼、削除要請などは、運営者まで直接ご連絡ください。可能な限り迅速に対応します。</p>

        <h2>関連ページ</h2>
        <ul>
          <li><Link href="/editorial-policy">編集方針（詳細）</Link></li>
          <li><Link href="/fact-checking">ファクトチェック方針</Link></li>
          <li><Link href="/methodology">取材・データ収集方法</Link></li>
          <li><Link href="/about">運営者情報</Link></li>
          <li><Link href="/privacy">プライバシーポリシー</Link></li>
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
