import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageToggle } from "@/components/LanguageToggle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";

export const metadata: Metadata = {
  title: "編集方針",
  description: "CryptoBrief JP の編集方針、品質基準、利益相反の管理、修正対応。",
  alternates: { canonical: `${SITE_URL}/editorial-policy` },
};

export default function EditorialPolicyPage() {
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
        <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "編集方針" }]} />
        <h1>編集方針</h1>

        <p>CryptoBrief JP は、急速に動く仮想通貨・予測市場・エアドロップの領域で、読者が次のアクションを判断するための情報を日本語と英語で提供します。本ページでは記事の品質基準・利益相反管理・修正対応の方針を明示します。</p>

        <h2>記事の品質基準</h2>
        <h3>事実ベース</h3>
        <ul>
          <li>数値・固有名詞・日付は一次ソース（公式発表・API・主要報道機関）からの引用に限定</li>
          <li>推測・憶測は「市場参加者は〜と見ている」のように主体を明示</li>
          <li>古い知識をそのまま流用しない。直近2週間以内の動向については毎回最新情報を確認する</li>
        </ul>

        <h3>独自の付加価値</h3>
        <ul>
          <li>外部記事のリライトは禁止。要約と独自分析を組み合わせる</li>
          <li>「これを読んで何が分かるか」「次に何を見るべきか」を読者が持ち帰れる構成</li>
          <li>実取引者・実利用者の視点を可能な限り入れる</li>
        </ul>

        <h3>中立性</h3>
        <ul>
          <li>特定の銘柄・取引所・サービスの推奨をしない</li>
          <li>価格予想・投資助言と誤解されうる表現を避ける</li>
          <li>アフィリエイトリンクは編集判断と完全に分離して掲載する</li>
        </ul>

        <h2>取り上げない/取り上げにくいもの</h2>
        <ul>
          <li>個別銘柄の短期売買シグナル</li>
          <li>未確認のリーク・噂レベルの情報</li>
          <li>ICO・トークンセール・プレセールの宣伝</li>
          <li>「絶対儲かる」「○倍確実」など断定的・誇大表現を含むトピック</li>
          <li>Polymarketなど日本で利用が制限されているサービスへの利用誘導</li>
        </ul>

        <h2>利益相反の管理</h2>
        <p>当サイトはアフィリエイトプログラム（A8.net 等）に参加しており、記事内のリンクから取引所・サービスに登録された場合に紹介料を受け取ることがあります。</p>
        <ul>
          <li>アフィリエイトリンクには <code>rel=&quot;sponsored&quot;</code> 属性を付与し検索エンジンに明示</li>
          <li>「広告」「PR」ラベルを表示（景品表示法・ステマ規制対応）</li>
          <li>アフィリエイト先と関連性が高い記事を意図的に増やすことはしない</li>
          <li>編集者・運営者が個人で保有する銘柄については、関連記事を書く際は利益相反を回避する判断（執筆を別担当に振る、保有事実を開示するなど）を行う</li>
        </ul>

        <h2>修正・訂正・撤回</h2>
        <h3>修正のレベル</h3>
        <ul>
          <li><strong>軽微（誤字・表記揺れ）</strong>：通知なく修正</li>
          <li><strong>事実誤認（数値・日付・固有名詞）</strong>：記事末尾に修正履歴を記載</li>
          <li><strong>記事の論旨に影響する誤り</strong>：修正履歴記載 + 該当箇所への明示</li>
          <li><strong>掲載すべきでなかった内容</strong>：撤回（URLは残し、撤回理由を明示）</li>
        </ul>
        <p>第三者からの正当な指摘は、48時間以内に対応します。</p>

        <h2>AIの活用と限界</h2>
        <p>当サイトでは初稿生成プロセスの一部に AI（Anthropic Claude）を活用しています。詳細は<Link href="/editorial-team">編集体制ページ</Link>に記載しています。AIが生成する内容には事実誤認のリスクがあるため、編集者の確認なしには公開しません。</p>

        <h2>免責事項</h2>
        <p>当サイトの記事は情報提供を目的としたものであり、投資勧誘や金融助言ではありません。投資・取引判断は必ずご自身の責任で行ってください。</p>

        <h2>連絡先</h2>
        <p>編集方針への意見・指摘は、運営者まで直接ご連絡ください。</p>

        <h2>関連ページ</h2>
        <ul>
          <li><Link href="/editorial-team">編集体制</Link></li>
          <li><Link href="/fact-checking">ファクトチェック方針</Link></li>
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
