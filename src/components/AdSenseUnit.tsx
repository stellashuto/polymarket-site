"use client";

import { useEffect, useRef } from "react";

type Props = {
  client: string;       // ca-pub-XXXXXXXXXXXXXXXX
  slot: string;         // 広告ユニットID
  format?: string;      // "auto" | "fluid" | "horizontal" | "rectangle" など
};

/**
 * 1つの AdSense 広告ユニットを描画するクライアントコンポーネント。
 * adsbygoogle.js は layout.tsx で1回だけロードされ、各ユニットの初期化は
 * このコンポーネント内でマウント時に1度だけ実行する。
 */
export function AdSenseUnit({ client, slot, format = "auto" }: Props) {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // adsbygoogle.js がまだロード途中の場合でも配列にpushしておけば、
      // ロード完了後に自動的に処理される。
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch (e) {
      // 開発中や広告ブロッカー有効時のエラーは無視
      console.warn("adsbygoogle push failed:", e);
    }
  }, []);

  return (
    <ins
      ref={insRef}
      className="adsbygoogle block"
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
