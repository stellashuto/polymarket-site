"use client";

import { useState } from "react";

type Props = { title: string; url: string };

export function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
  const lineUrl  = `https://social-plugins.line.me/lineit/share?url=${enc(url)}`;
  const fbUrl    = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  const btnCls =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2 my-6 not-prose">
      <span className="text-xs text-slate-500 mr-1">この記事をシェア</span>
      <a href={tweetUrl} target="_blank" rel="noopener" className={btnCls} aria-label="Xでシェア">
        <span className="font-black">𝕏</span> Post
      </a>
      <a href={lineUrl} target="_blank" rel="noopener" className={`${btnCls} text-emerald-700`} aria-label="LINEで送る">
        LINE
      </a>
      <a href={fbUrl} target="_blank" rel="noopener" className={`${btnCls} text-blue-700`} aria-label="Facebookでシェア">
        Facebook
      </a>
      <button onClick={copy} className={btnCls} aria-label="URLをコピー">
        {copied ? "✓ コピー済" : "🔗 URLコピー"}
      </button>
    </div>
  );
}
