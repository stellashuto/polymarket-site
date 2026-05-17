"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categoryLabel, type Locale } from "@/lib/i18n";

const CATEGORIES = ["all", "crypto", "economics", "politics", "sports", "entertainment", "other"];

type Props = { current: string; locale?: Locale };

export function CategoryFilter({ current, locale = "ja" }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  function select(cat: string) {
    const next = new URLSearchParams(params.toString());
    if (cat === "all") next.delete("category");
    else next.set("category", cat);
    const base = locale === "en" ? "/en" : "/";
    const qs = next.toString();
    router.push(qs ? `${base}?${qs}` : base);
  }

  return (
    <nav className="flex gap-1 md:gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 border-b border-slate-200">
      {CATEGORIES.map((cat) => {
        const active = current === cat;
        return (
          <button
            key={cat}
            onClick={() => select(cat)}
            className={`relative shrink-0 px-3 md:px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              active
                ? "text-blue-700"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {categoryLabel(locale, cat)}
            {active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
