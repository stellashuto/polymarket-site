/**
 * 広告枠の設定。
 *
 * 各スロットには複数の広告候補を登録でき、表示時にランダム/ローテーションで切替可能。
 * `enabled: false` の枠は何も表示されない（記事レイアウトには影響しない）。
 *
 * 広告コードを差し替えるときはこのファイルだけ編集 → git push で反映。
 */

export type AdSlotId =
  | "home-after-hero"   // トップページ ヒーロー直下（アフィリ用）
  | "home-in-feed"      // 記事一覧の途中（インフィード、表示型）
  | "article-top"       // 記事タイトル直下
  | "article-mid"       // 記事本文の中盤（表示型）
  | "article-bottom";   // 記事末尾（アフィリ用）

export type AdCreative =
  | {
      kind: "affiliate-banner";
      href: string;            // アフィリエイトリンク
      imageUrl: string;        // バナー画像URL
      alt: string;             // alt属性（SEO/アクセシビリティ）
      width: number;
      height: number;
    }
  | {
      kind: "text-link";
      href: string;
      title: string;           // 強調表示するキャッチ
      description: string;     // 補足説明
      ctaLabel: string;        // ボタンテキスト
    }
  | {
      kind: "adsense";
      slot: string;            // data-ad-slot
      format?: string;         // data-ad-format (default: "auto")
    }
  | {
      kind: "custom-html";
      html: string;            // 広告主から提供されたHTML
    };

export type AdSlot = {
  id: AdSlotId;
  enabled: boolean;
  creatives: AdCreative[];
};

// Google AdSenseのpublisher ID。環境変数 NEXT_PUBLIC_ADSENSE_CLIENT_ID で上書き可能
// AdSense審査通過後に Vercel の Environment Variables に登録する
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";

// 一覧ページのインフィード広告を「N記事ごとに」挿入するか
export const IN_FEED_INTERVAL = 4;

export const AD_SLOTS: Record<AdSlotId, AdSlot> = {
  // トップページのヒーロー記事の下
  "home-after-hero": {
    id: "home-after-hero",
    enabled: true,
    creatives: [
      {
        kind: "text-link",
        href: "https://example.com/aff/?ref=polymarket-watch",  // ← 実際のアフィURLに差し替え
        title: "国内最大級の暗号資産取引所で口座を作る",
        description: "最短10分で開設、ビットコイン・イーサリアム他、主要銘柄を取引可能。",
        ctaLabel: "詳細を見る",
      },
    ],
  },

  // トップページ - 一覧の途中（インフィード表示型）
  // AdSenseの「インフィード広告」ユニットを審査通過後に有効化
  "home-in-feed": {
    id: "home-in-feed",
    enabled: false,  // AdSense承認後にtrueへ
    creatives: [
      {
        kind: "adsense",
        slot: "0000000000",   // ← AdSenseで作成したインフィード広告ユニットIDに差し替え
        format: "fluid",
      },
    ],
  },

  // 記事ページ - タイトル直下
  "article-top": {
    id: "article-top",
    enabled: false,  // 記事冒頭の広告はUXを損ねやすいので初期OFF
    creatives: [],
  },

  // 記事ページ - 本文中盤（表示型・レスポンシブ）
  "article-mid": {
    id: "article-mid",
    enabled: false,  // AdSense承認後にtrueへ
    creatives: [
      {
        kind: "adsense",
        slot: "0000000000",   // ← AdSenseで作成したディスプレイ広告ユニットIDに差し替え
        format: "auto",
      },
    ],
  },

  // 記事ページ - 末尾（最も自然な配置）
  "article-bottom": {
    id: "article-bottom",
    enabled: true,
    creatives: [
      {
        kind: "text-link",
        href: "https://example.com/aff/?ref=polymarket-watch",  // ← 実際のアフィURLに差し替え
        title: "暗号資産を始めるなら",
        description: "本記事で取り上げた銘柄も、国内取引所で日本円から購入できます。手数料・取扱銘柄を比較してみましょう。",
        ctaLabel: "取引所を比較する",
      },
    ],
  },
};

export function pickCreative(slot: AdSlot): AdCreative | null {
  if (!slot.enabled || slot.creatives.length === 0) return null;
  const idx = Math.floor(Math.random() * slot.creatives.length);
  return slot.creatives[idx];
}
