import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageToggle } from "@/components/LanguageToggle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";

export const metadata: Metadata = {
  title: "取材・データ収集方法",
  description: "CryptoBrief JP の記事執筆におけるデータソース、ニュースソース、Polymarket APIの利用方法。",
  alternates: { canonical: `${SITE_URL}/methodology` },
};

export default function MethodologyPage() {
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
        <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "取材方法" }]} />
        <h1>取材・データ収集方法</h1>

        <p>CryptoBrief JP の記事は、明確に追跡可能なデータソースから組み立てられています。本ページでは具体的な取材・データ収集の方法を開示します。</p>

        <h2>主要なデータソース</h2>

        <h3>予測市場データ</h3>
        <ul>
          <li><strong>Polymarket Gamma API</strong>：マーケット一覧、出来高、メタデータ</li>
          <li><strong>Polymarket CLOB API</strong>：オッズ履歴（最大全期間）、トークンID、価格データ</li>
        </ul>
        <p>マーケットページのオッズ推移チャートは Polymarket の CLOB API から直接取得しており、データの加工は時刻フォーマット変換のみです。</p>

        <h3>仮想通貨ニュース（日本語）</h3>
        <ul>
          <li><strong>CoinPost</strong>（<code>coinpost.jp</code>）</li>
          <li><strong>CoinDesk JAPAN</strong>（<code>coindeskjapan.com</code>）</li>
          <li><strong>あたらしい経済</strong>（<code>neweconomy.jp</code>）</li>
          <li><strong>Crypto Times</strong>（<code>crypto-times.jp</code>）</li>
        </ul>

        <h3>仮想通貨ニュース（英語）</h3>
        <ul>
          <li><strong>CoinDesk</strong>（<code>coindesk.com</code>）</li>
          <li><strong>Cointelegraph</strong>（<code>cointelegraph.com</code>）</li>
          <li><strong>The Block</strong>（<code>theblock.co</code>）</li>
          <li><strong>Decrypt</strong>（<code>decrypt.co</code>）</li>
        </ul>

        <h3>動的な情報の検証</h3>
        <p>記事執筆時点で、Anthropic Claude の Web 検索ツールを通じて、上記ソース以外も含めた最新情報をクロスチェックします。具体的には：</p>
        <ul>
          <li>プロジェクト公式ブログ・ドキュメント</li>
          <li>X（旧Twitter）の公式アカウント発表</li>
          <li>GitHub のコミット・リリース</li>
          <li>Discord・Forum での公式アナウンス</li>
          <li>SEC、FRB、金融庁など規制当局の公式発表</li>
        </ul>

        <h2>記事タイプ別の取材方法</h2>

        <h3>予測市場（market）記事</h3>
        <p>Polymarket API で取得した個別マーケットのオッズ・出来高データを起点に、関連する報道を当社のニュースフィードと Web 検索でクロス参照。「オッズ変動の背景」「市場参加者の解釈」「直近の重要ニュース」を組み合わせて市況解説を執筆します。</p>

        <h3>ニュース（news）記事</h3>
        <p>上記の日英ニュースフィードから対象記事を選定し、原文の単純翻訳ではなく以下を加えます：</p>
        <ul>
          <li>日本の読者向けの文脈整理（規制関係・為替・税制への影響）</li>
          <li>他の関連報道との接続</li>
          <li>市場・予測市場オッズへの含意</li>
        </ul>
        <p>原文を逐語転載することはなく、必ず独自の編集と独自分析を加えています。</p>

        <h3>銘柄解説（crypto）記事</h3>
        <p>固定的なテンプレートではなく、その銘柄の特徴に応じた構成を選択します。基本構成は「概要 / 技術 / 歴史 / 直近の動向 / 日本での購入方法 / リスク / FAQ」ですが、トピックに応じて拡張・省略します。直近のニュース・規制・ETF動向は Web 検索で確認した最新情報を反映します。</p>

        <h3>エアドロップ（airdrop）記事</h3>
        <p>プロジェクト固有の解説と、一般的なエアドロップハント戦略の両方をカバーします。プロジェクト記事では公式ドキュメント・ブログを一次ソースとし、ポイントプログラムの構造、参加条件、税務上の取扱いまで掘り下げます。一般的な戦略記事では、業界の事例を複数横断して分析します。</p>

        <h2>更新頻度</h2>
        <p>記事は日本時間の朝7時、昼12時、夜19時の3タイミングで定期更新します。重要な事実誤認や状況変化があった場合は、随時修正します。</p>

        <h2>透明性</h2>
        <p>当サイトは AI（Anthropic Claude）を初稿生成プロセスで活用していることを明示しています。すべての記事は編集者の品質チェックを経て公開されます。詳細は<Link href="/editorial-team">編集体制</Link>と<Link href="/fact-checking">ファクトチェック方針</Link>をご覧ください。</p>

        <h2>関連ページ</h2>
        <ul>
          <li><Link href="/editorial-team">編集体制</Link></li>
          <li><Link href="/editorial-policy">編集方針</Link></li>
          <li><Link href="/fact-checking">ファクトチェック方針</Link></li>
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
