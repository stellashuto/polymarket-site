/**
 * 日本語記事の読了時間を推定（分単位）。
 * 一般的な日本語の読書速度: 400〜600字/分。中央値500字/分を採用。
 */
export function readingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, "");
  const chars = text.length;
  const minutes = Math.max(1, Math.round(chars / 500));
  return minutes;
}
