/**
 * 仮想通貨の価格を CoinGecko 無料APIから取得する。
 * - 60秒キャッシュ（CoinGecko 無料枠: 30回/分なので余裕）
 * - 失敗時は空配列を返してUIは描画継続
 */

export type CryptoPrice = {
  id: string;
  symbol: string;
  price_jpy: number;
  change_24h: number;  // 24時間変動率（％）
};

const COINS: { id: string; symbol: string }[] = [
  { id: "bitcoin",      symbol: "BTC"  },
  { id: "ethereum",     symbol: "ETH"  },
  { id: "ripple",       symbol: "XRP"  },
  { id: "binancecoin",  symbol: "BNB"  },
  { id: "solana",       symbol: "SOL"  },
  { id: "tron",         symbol: "TRX"  },
  { id: "dogecoin",     symbol: "DOGE" },
  { id: "cardano",      symbol: "ADA"  },
  { id: "hyperliquid",  symbol: "HYPE" },
];

export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  const ids = COINS.map((c) => c.id).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=jpy&include_24hr_change=true`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data: Record<string, { jpy?: number; jpy_24h_change?: number }> = await res.json();

    return COINS
      .map((c) => ({
        id: c.id,
        symbol: c.symbol,
        price_jpy: data[c.id]?.jpy ?? 0,
        change_24h: data[c.id]?.jpy_24h_change ?? 0,
      }))
      .filter((p) => p.price_jpy > 0);
  } catch {
    return [];
  }
}

export function formatJpy(n: number): string {
  if (n >= 1_000_000) return Math.round(n).toLocaleString("ja-JP");
  if (n >= 100) return Math.round(n).toLocaleString("ja-JP");
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(4);
}
