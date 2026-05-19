/**
 * 多言語化ヘルパー。
 * 日本語(ja)がデフォルト、英語(en)がオプション。
 */

export type Locale = "ja" | "en";

export const LOCALES: Locale[] = ["ja", "en"];
export const DEFAULT_LOCALE: Locale = "ja";

export type Dictionary = {
  // ヘッダー / フッター
  tagline: string;
  about: string;
  privacy: string;
  rss: string;
  home: string;
  articles_count: (n: number) => string;
  switch_to_japanese: string;
  switch_to_english: string;
  source: string;
  sources_label: string;
  categories_label: string;
  site_label: string;
  copyright_note: string;
  affiliate_note: string;

  // カテゴリ
  cat_all: string;
  cat_politics: string;
  cat_crypto: string;
  cat_airdrop: string;
  cat_sports: string;
  cat_economics: string;
  cat_entertainment: string;
  cat_other: string;

  // 記事ページ
  reading_minutes: (n: number) => string;
  share_label: string;
  share_post: string;
  share_line: string;
  share_facebook: string;
  share_copy: string;
  share_copied: string;
  related_articles: string;
  source_section: string;
  data_source: string;
  read_original: string;
  polymarket_market_page: string;
  popular_ranking: string;
  view_all: string;
  latest_articles: string;
  market_badge: string;

  // 注意書き
  disclaimer_short: string;
  polymarket_warning_title: string;
  polymarket_warning_body: string;

  // チャート
  odds_chart_title: (days: number) => string;
  chart_source: string;

  // パンくず
  breadcrumb_home: string;

  // 翻訳バナー
  translation_notice: string;
  view_in_japanese: string;
};

export const DICT: Record<Locale, Dictionary> = {
  ja: {
    tagline: "仮想通貨・金融・予測市場のニュースを日本語で簡潔に",
    about: "運営者情報",
    privacy: "プライバシーポリシー",
    rss: "RSS",
    home: "ホーム",
    articles_count: (n) => `${n} 記事`,
    switch_to_japanese: "日本語",
    switch_to_english: "EN",
    source: "ソース",
    sources_label: "情報ソース",
    categories_label: "カテゴリ",
    site_label: "サイト",
    copyright_note: "仮想通貨・金融・予測市場の独立系ニュースメディア",
    affiliate_note: "本サイトはアフィリエイトプログラムに参加しています",

    cat_all: "すべて",
    cat_politics: "政治",
    cat_crypto: "暗号資産",
    cat_airdrop: "エアドロップ",
    cat_sports: "スポーツ",
    cat_economics: "経済",
    cat_entertainment: "エンタメ",
    cat_other: "その他",

    reading_minutes: (n) => `${n}分で読めます`,
    share_label: "この記事をシェア",
    share_post: "Post",
    share_line: "LINE",
    share_facebook: "Facebook",
    share_copy: "🔗 URLコピー",
    share_copied: "✓ コピー済",
    related_articles: "関連記事",
    source_section: "出典",
    data_source: "データソース",
    read_original: "原文を読む ↗",
    polymarket_market_page: "Polymarket 公式マーケットページ ↗",
    popular_ranking: "人気記事ランキング",
    view_all: "一覧 ›",
    latest_articles: "最新記事",
    market_badge: "予測市場",

    disclaimer_short:
      "※本記事は予測市場・公開ニュース等の情報に基づいて作成された解説記事です。投資判断は自己責任でお願いします。当サイトはアフィリエイトプログラムに参加しており、記事内のリンクから取引所等に登録された場合、当サイトに紹介料が支払われることがあります。",
    polymarket_warning_title: "Polymarket利用に関する重要なお知らせ",
    polymarket_warning_body:
      "Polymarketは米国本土、英国、フランスなど多くの国・地域で利用が制限されており、日本居住者も金融商品取引法・賭博法等の観点から本サービスを利用することはできません。本記事はPolymarketの公開データを元にした情報提供のみを目的としており、サービス利用を推奨するものではありません。",

    odds_chart_title: (days) => `オッズ推移（直近${days}日間）`,
    chart_source: "出典: Polymarket CLOB API",

    breadcrumb_home: "ホーム",

    translation_notice:
      "この記事は日本語の原文を機械的に表示しています。お使いのブラウザの翻訳機能で英語表示できます。",
    view_in_japanese: "View in Japanese",
  },
  en: {
    tagline: "Crypto, finance, and prediction market news—in brief.",
    about: "About",
    privacy: "Privacy Policy",
    rss: "RSS",
    home: "Home",
    articles_count: (n) => `${n} articles`,
    switch_to_japanese: "日本語",
    switch_to_english: "EN",
    source: "Source",
    sources_label: "Sources",
    categories_label: "Categories",
    site_label: "Site",
    copyright_note: "Independent news media on crypto, finance, and prediction markets",
    affiliate_note: "This site participates in affiliate programs",

    cat_all: "All",
    cat_politics: "Politics",
    cat_crypto: "Crypto",
    cat_airdrop: "Airdrops",
    cat_sports: "Sports",
    cat_economics: "Economics",
    cat_entertainment: "Entertainment",
    cat_other: "Other",

    reading_minutes: (n) => `${n} min read`,
    share_label: "Share",
    share_post: "Post",
    share_line: "LINE",
    share_facebook: "Facebook",
    share_copy: "🔗 Copy URL",
    share_copied: "✓ Copied",
    related_articles: "Related articles",
    source_section: "Source",
    data_source: "Data source",
    read_original: "Read the original ↗",
    polymarket_market_page: "Polymarket official market page ↗",
    popular_ranking: "Popular articles",
    view_all: "View all ›",
    latest_articles: "Latest articles",
    market_badge: "Prediction Market",

    disclaimer_short:
      "This article is commentary based on publicly available prediction-market data and news. All investment decisions are at your own risk. This site participates in affiliate programs; we may earn referral fees from links in articles.",
    polymarket_warning_title: "Important note about Polymarket",
    polymarket_warning_body:
      "Polymarket is restricted in many jurisdictions including mainland US, UK, France, and Japan (under Financial Instruments and Exchange Act / gambling laws). This article uses Polymarket's public data for informational purposes only and does not endorse using the service.",

    odds_chart_title: (days) => `Odds over the past ${days} days`,
    chart_source: "Source: Polymarket CLOB API",

    breadcrumb_home: "Home",

    translation_notice:
      "This article is shown in its original Japanese. Use your browser's translation feature for English.",
    view_in_japanese: "日本語で見る",
  },
};

export function t(locale: Locale): Dictionary {
  return DICT[locale] ?? DICT[DEFAULT_LOCALE];
}

/** カテゴリslug → 翻訳済みラベル */
export function categoryLabel(locale: Locale, category: string): string {
  const d = t(locale);
  switch (category) {
    case "all":           return d.cat_all;
    case "politics":      return d.cat_politics;
    case "crypto":        return d.cat_crypto;
    case "airdrop":       return d.cat_airdrop;
    case "sports":        return d.cat_sports;
    case "economics":     return d.cat_economics;
    case "entertainment": return d.cat_entertainment;
    default:              return d.cat_other;
  }
}

/** 現在のロケールから、別ロケール版のパスを構築する */
export function altLocaleHref(currentPath: string, currentLocale: Locale, toLocale: Locale): string {
  if (currentLocale === toLocale) return currentPath;
  // パスを正規化
  const path = currentPath.replace(/^\/en(\/|$)/, "/");
  if (toLocale === "ja") return path;
  // → en
  return path === "/" ? "/en" : `/en${path}`;
}
