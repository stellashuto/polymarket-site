"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { altLocaleHref, type Locale } from "@/lib/i18n";

type Props = { current: Locale };

export function LanguageToggle({ current }: Props) {
  const pathname = usePathname();

  const jaHref = altLocaleHref(pathname, current, "ja");
  const enHref = altLocaleHref(pathname, current, "en");

  return (
    <div className="inline-flex items-center gap-0.5 text-xs border border-slate-200 rounded-md overflow-hidden bg-white">
      <Link
        href={jaHref}
        prefetch={false}
        className={`px-2 py-1 font-medium transition-colors ${
          current === "ja"
            ? "bg-blue-700 text-white"
            : "text-slate-600 hover:bg-slate-50"
        }`}
        onClick={() => {
          // 選択を Cookie に保存（次回訪問時のリダイレクトに使う）
          if (typeof document !== "undefined") {
            document.cookie = "lang=ja; path=/; max-age=31536000; samesite=lax";
          }
        }}
      >
        JA
      </Link>
      <Link
        href={enHref}
        prefetch={false}
        className={`px-2 py-1 font-medium transition-colors ${
          current === "en"
            ? "bg-blue-700 text-white"
            : "text-slate-600 hover:bg-slate-50"
        }`}
        onClick={() => {
          if (typeof document !== "undefined") {
            document.cookie = "lang=en; path=/; max-age=31536000; samesite=lax";
          }
        }}
      >
        EN
      </Link>
    </div>
  );
}
