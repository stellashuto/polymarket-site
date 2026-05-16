import { fetchCryptoPrices, formatJpy, type CryptoPrice } from "@/lib/crypto-prices";

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

function Item({ p }: { p: CryptoPrice }) {
  const up = p.change_24h >= 0;
  const colorClass = COIN_COLORS[p.symbol] ?? "text-slate-300";
  return (
    <div className="inline-flex items-center gap-1.5 mx-5">
      <span className={`${colorClass} font-bold`}>●</span>
      <span className="font-bold text-slate-100">{p.symbol}</span>
      <span className="text-slate-200">¥{formatJpy(p.price_jpy)}</span>
      <span className={`text-xs font-medium ${up ? "text-emerald-400" : "text-rose-400"}`}>
        {up ? "▲" : "▼"}{Math.abs(p.change_24h).toFixed(2)}%
      </span>
    </div>
  );
}

export async function PriceTicker() {
  const prices = await fetchCryptoPrices();
  if (prices.length === 0) return null;

  // 同じ内容を2回繰り返してCSS marqueeで-50%translateすれば継ぎ目なくループ
  const loop = [...prices, ...prices];

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap py-2 text-sm w-max">
          {loop.map((p, i) => (
            <Item key={`${p.id}-${i}`} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
