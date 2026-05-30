import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageToggle } from "@/components/LanguageToggle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";

export const metadata: Metadata = {
  title: "ファクトチェック方針",
  description: "CryptoBrief JP の事実確認プロセスと検証基準。",
  alternates: { canonical: `${SITE_URL}/fact-checking` },
};

export default function FactCheckingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">Crypto</span>
            <span className="text-slate-900 font-black text-lg tracking-tight">Brief</span>
            <span className="text-slate-400 font-bold text-xs tracking-wider ml-0.5">JP</span>
          </Link>
          <div className="ml-auto"><LanguageToggle current="ja" /></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 prose prose-slate
        prose-headings:text-slate-900
        prose-h1:text-3xl prose-h1:font-black
        prose-h2:text-xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
        prose-h3:text-base prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-2
        prose-p:text-slate-700 prose-p:leading-7
        prose-a:text-blue-700">
        <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "ファクトチェック方針" }]} />
        <h1>ファクトチェック方針</h1>

        <p>仮想通貨業界では情報の更新頻度が高く、SNS発の未確認情報も多数流通します。CryptoBrief JP では以下の方針で事実確認を行い、読者に信頼できる情報を届けることを目指しています。</p>

        <h2>確認の優先順位</h2>
        <ol>
          <li><strong>一次情報</strong>：プロジェクト公式ブログ・GitHub・公式X（旧Twitter）アカウント、企業のIR発表、政府機関の公式リリース</li>
          <li><strong>主要メディア</strong>：CoinDesk、Cointelegraph、The Block、CoinPost、CoinDesk JAPAN、Reuters、Bloomberg等の確立した報道機関</li>
          <li><strong>API・データソース</strong>：Polymarket Gamma API・CLOB API、CoinGecko API、各チェーンのオンチェーンエクスプローラ</li>
          <li><strong>SNS・噂</strong>：参考程度に留め、複数の独立ソースで確認できないものは記事化しない</li>
        </ol>

        <h2>確認項目</h2>
        <ul>
          <li><strong>数値</strong>：トークン価格・時価総額・出来高・配布数量などは記事執筆時点の値を明示し、ソースを記載</li>
          <li><strong>日付</strong>：イベント発生日・予定日は公式発表に従う。タイムゾーンが重要な場合は UTC/JST を明記</li>
          <li><strong>固有名詞</strong>：プロジェクト名・トークンシンボル・人物名は公式表記を採用</li>
          <li><strong>引用</strong>：他媒体からの引用は出典名と元記事URLを明記</li>
        </ul>

        <h2>Web検索による最新性確認</h2>
        <p>記事生成プロセスでは Anthropic Claude の Web 検索ツールを使い、執筆対象の <strong>直近1〜3ヶ月の状況</strong> を確認します。古い知識（過去2年以内のスナップショット）をそのまま書かず、最新の状況を反映するワークフローを採用しています。</p>

        <h2>記事内の時系列表記</h2>
        <p>状況が変わりうるトピックには「2026年5月時点で〜」のように時系列を明示し、読者がいつの情報かを判断できるようにしています。</p>

        <h2>誤り発見時の対応</h2>
        <ol>
          <li>事実誤認の指摘を受領した場合、48時間以内に検証</li>
          <li>誤りが確認された場合、該当箇所を修正し記事末尾に「修正履歴」を追記</li>
          <li>論旨に影響する重大な誤りの場合、修正のお知らせを記事冒頭にも追加</li>
          <li>削除すべき内容と判断した場合は撤回し、URLには撤回理由を残す</li>
        </ol>

        <h2>誤り報告の窓口</h2>
        <p>記事内の事実誤認・引用元の誤り・古い情報の指摘などは、運営者まで直接ご連絡ください。指摘内容を真摯に検証します。</p>

        <h2>関連ページ</h2>
        <ul>
          <li><Link href="/editorial-team">編集体制</Link></li>
          <li><Link href="/editorial-policy">編集方針（詳細）</Link></li>
          <li><Link href="/methodology">取材・データ収集方法</Link></li>
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
