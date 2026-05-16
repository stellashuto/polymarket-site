/**
 * /ads.txt
 *
 * Googleと業界標準のIAB Tech Lab規格に準拠した広告掲載許可ファイル。
 * AdSense審査通過後にPublisher IDを環境変数に登録すると自動で正しい行が出力される。
 */

export const dynamic = "force-static";

export function GET() {
  const id = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
  const lines: string[] = [];

  if (id) {
    // ca-pub-XXXXXXXXXXXXXXXX → pub-XXXXXXXXXXXXXXXX
    const pubId = id.replace(/^ca-/, "");
    lines.push(`google.com, ${pubId}, DIRECT, f08c47fec0942fa0`);
  } else {
    lines.push("# AdSense Publisher ID is not set yet.");
  }

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
