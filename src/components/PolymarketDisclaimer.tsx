import Link from "next/link";

/**
 * Polymarket関連記事に表示する法的・規制注意書き。
 * 日本居住者が金融商品取引法等で利用できない旨を明示する。
 */
export function PolymarketDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="Polymarket利用に関する重要な注意"
      className="not-prose border-l-4 border-amber-400 bg-amber-50 px-4 py-3 my-6 rounded-r-md"
    >
      <div className="flex items-start gap-2">
        <span aria-hidden="true" className="text-amber-700 text-base leading-none">⚠</span>
        <div className="flex-1">
          <p className="text-amber-900 text-xs font-bold mb-1">
            Polymarket利用に関する重要なお知らせ
          </p>
          <p className="text-amber-900 text-xs leading-relaxed">
            Polymarketは米国本土、英国、フランスなど多くの国・地域で利用が制限されており、
            <strong className="font-bold">日本居住者も金融商品取引法・賭博法等の観点から本サービスを利用することはできません</strong>。
            本記事はPolymarketの公開データを元にした情報提供のみを目的としており、サービス利用を推奨するものではありません。
            投資・取引判断は各自の責任において、お住まいの国・地域の法令を遵守したうえで行ってください。
            （詳細: <Link href="/about" className="underline hover:text-amber-700">運営者情報・編集方針</Link>）
          </p>
        </div>
      </div>
    </aside>
  );
}
