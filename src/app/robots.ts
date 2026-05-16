import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 通常の検索エンジン
      { userAgent: "*", allow: "/" },

      // AI関連クローラーを明示的に許可（GEO対策）
      { userAgent: "GPTBot", allow: "/" },              // OpenAI
      { userAgent: "ChatGPT-User", allow: "/" },        // ChatGPTからのリンク取得
      { userAgent: "OAI-SearchBot", allow: "/" },       // OpenAI Search
      { userAgent: "PerplexityBot", allow: "/" },       // Perplexity
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },           // Anthropic Claude
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },     // Google Gemini学習用
      { userAgent: "Applebot-Extended", allow: "/" },   // Apple Intelligence
      { userAgent: "Bytespider", allow: "/" },          // TikTok / Doubao
      { userAgent: "Amazonbot", allow: "/" },           // Amazon
      { userAgent: "Meta-ExternalAgent", allow: "/" },  // Meta
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
