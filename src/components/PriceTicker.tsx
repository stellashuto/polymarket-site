import { fetchCryptoPrices, formatJpy } from "@/lib/crypto-prices";

const COIN_COLORS: Record<string, string> = {
  BTC:  "text-orange-400",
  ETH:  "text-indigo-300",
  XRP:  "text-blue-300",
  BNB:  "text-yellow-400",
  SOL:  "text-purple-300",
  TRX:  "text-red-400",
  DOGE: "text-amber-300",
  ADA:  "text-sky-300",
  HYPE: "text-emerald-300",
};

export async function PriceTicker() {
  const prices = await fetchCryptoPrices();
  if (prices.length === 0) return null;

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-5 px-4 py-2 whitespace-nowrap text-sm">
          {prices.map((p) => {
            const up = p.change_24h >= 0;
            const colorClass = COIN_COLORS[p.symbol] ?? "text-slate-300";
            return (
              <div key={p.id} className="flex items-center gap-1.5 shrink-0">
                <span className={`${colorClass} font-bold`}>●</span>
                <span className="font-bold text-slate-100">{p.symbol}</span>
                <span className="text-slate-200">¥{formatJpy(p.price_jpy)}</span>
                <span
                  className={`text-xs font-medium ${
                    up ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {up ? "▲" : "▼"}{Math.abs(p.change_24h).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
