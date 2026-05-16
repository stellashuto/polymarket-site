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

// A8ネットの広告タグ（programs.length が増えていくとローテーション）
const A8_DMM_CFD: AdCreative = {
  kind: "custom-html",
  html: `<a href="https://px.a8.net/svt/ejp?a8mat=4B3RV0+C0U5KI+1WP2+NXU8H" rel="sponsored nofollow noopener" target="_blank"><img border="0" width="300" height="250" alt="DMM CFD" src="https://www22.a8.net/svt/bgt?aid=260516556727&wid=001&eno=01&mid=s00000008903004021000&mc=1"></a><img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=4B3RV0+C0U5KI+1WP2+NXU8H" alt="">`,
};

// アフィリエイトプログラム一覧（増えたらここに追加するだけでローテーション対象になる）
const AFFILIATE_CREATIVES: AdCreative[] = [
  A8_DMM_CFD,
];

export const AD_SLOTS: Record<AdSlotId, AdSlot> = {
  // トップページのヒーロー記事の下
  "home-after-hero": {
    id: "home-after-hero",
    enabled: true,
    creatives: AFFILIATE_CREATIVES,
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
    creatives: AFFILIATE_CREATIVES,
  },
};

export function pickCreative(slot: AdSlot): AdCreative | null {
  if (!slot.enabled || slot.creatives.length === 0) return null;
  const idx = Math.floor(Math.random() * slot.creatives.length);
  return slot.creatives[idx];
}
