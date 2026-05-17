import { NextResponse, type NextRequest } from "next/server";

/**
 * 初回訪問時の言語判定:
 *  1. Cookie "lang" があればそれに従う
 *  2. Vercel が付ける x-vercel-ip-country が "JP" なら日本語、それ以外は英語
 *  3. それも取れなければデフォルト日本語
 *
 * 既に `/en` プレフィックスにアクセスしているユーザーや、ユーザーが明示的に
 * 言語を切り替えた後は、リダイレクトしない。
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // すでに /en 配下にいるなら何もしない
  if (pathname.startsWith("/en")) return NextResponse.next();

  // 静的ファイル、APIなどはスキップ
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/thumbnails") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Cookie がすでにセットされていれば、その選択を尊重（リダイレクトしない）
  const langCookie = req.cookies.get("lang")?.value;
  if (langCookie === "ja" || langCookie === "en") {
    if (langCookie === "en") {
      const url = req.nextUrl.clone();
      url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Cookie がない=初回訪問。地域ヘッダで判定
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  if (country && country !== "JP") {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 静的ファイル等を除外
    "/((?!_next|api|thumbnails|charts|.*\\..*).*)",
  ],
};
