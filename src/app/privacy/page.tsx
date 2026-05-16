import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "MarketCast JP のプライバシーポリシー。Google AdSense等の第三者広告配信、アクセス解析、アフィリエイトに関する説明。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">Market</span>
            <span className="text-slate-900 font-black text-lg tracking-tight">Cast</span>
            <span className="text-slate-400 font-bold text-xs tracking-wider ml-0.5">JP</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 prose prose-slate
        prose-headings:text-slate-900
        prose-h1:text-2xl prose-h1:font-black
        prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
        prose-p:text-slate-700 prose-p:leading-7
        prose-a:text-blue-700">
        <h1>プライバシーポリシー</h1>
        <p>MarketCast JP（以下「当サイト」）は、利用者の個人情報の保護を重要視し、以下の方針に基づいて取り扱います。</p>

        <h2>1. 第三者配信の広告サービスについて</h2>
        <p>当サイトでは、Google が提供する広告配信サービス「Google AdSense」を利用しています。Google を含む第三者配信事業者は、Cookie を使用して、利用者がそのウェブサイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信することがあります。</p>
        <p>Google による Cookie の使用を無効にする場合は、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">広告設定</a>からパーソナライズ広告を無効にできます。また、<a href="https://www.aboutads.info/" target="_blank" rel="noopener">www.aboutads.info</a>でも第三者によるパーソナライズ広告を無効化できます。</p>

        <h2>2. アクセス解析ツールについて</h2>
        <p>当サイトでは、サイトの利用状況を把握するため、Google Analytics 等のアクセス解析ツールを使用する場合があります。これらは Cookie を使用しますが、個人を特定する情報は含まれません。</p>

        <h2>3. アフィリエイトプログラムについて</h2>
        <p>当サイトは、A8.net、もしもアフィリエイト、Amazon アソシエイト等のアフィリエイトプログラムに参加しており、これらのプログラムにより紹介料を得ることがあります。記事内のリンクから広告主のサイトに移動して商品・サービスを購入された場合、当サイトに紹介料が支払われます。</p>

        <h2>4. 免責事項</h2>
        <p>当サイトに掲載されている情報は、執筆時点で得られた情報に基づいています。記事内容の正確性・完全性については最善を尽くしていますが、それを保証するものではありません。投資判断は必ずご自身の責任で行ってください。</p>

        <h2>5. 著作権について</h2>
        <p>当サイトの記事は、公開ニュース等の情報を元に独自に再構成・解説したものです。引用元については各記事内に明示しています。当サイトの記事内容を無断で転載することは禁じます。</p>

        <h2>6. お問い合わせ</h2>
        <p>当サイトへのお問い合わせは、サイト運営者まで直接ご連絡ください。</p>

        <p className="text-sm text-slate-500 mt-10">最終更新日: {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}</p>
      </main>

      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-3xl mx-auto px-4 py-8 text-xs text-slate-500">
          <Link href="/" className="hover:underline">← トップへ戻る</Link>
        </div>
      </footer>
    </div>
  );
}
