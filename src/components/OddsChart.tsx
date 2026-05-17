/**
 * オッズ推移のSVGラインチャート。
 * 外部ライブラリ不要、サーバー側でレンダリング可能。
 */

export type OddsSeries = {
  outcome: string;          // "Yes" / "No" / 候補名
  history: [number, number][]; // [[unix_ts, price 0..1], ...]
};

type Props = {
  series: OddsSeries[];
  width?: number;
  height?: number;
};

const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#d97706", "#7c3aed"];

export function OddsChart({ series, width = 700, height = 220 }: Props) {
  if (!series.length || series.every((s) => s.history.length === 0)) return null;

  const padding = { top: 16, right: 56, bottom: 28, left: 8 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  // X軸: タイムスタンプ範囲
  const allTimes = series.flatMap((s) => s.history.map((p) => p[0]));
  const minT = Math.min(...allTimes);
  const maxT = Math.max(...allTimes);
  const spanDays = Math.max(1, Math.round((maxT - minT) / 86400));
  // Y軸: 0〜100%固定
  const minP = 0;
  const maxP = 100;

  const xScale = (t: number) =>
    padding.left + ((t - minT) / Math.max(1, maxT - minT)) * innerW;
  const yScale = (p: number) =>
    padding.top + (1 - (p - minP) / (maxP - minP)) * innerH;

  // 軸の目盛り
  const yTicks = [0, 25, 50, 75, 100];
  // X軸: 開始・中央・終了の3点
  const xTicks = [minT, (minT + maxT) / 2, maxT];
  const fmtDate = (t: number) => {
    const d = new Date(t * 1000);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <figure className="my-6 not-prose">
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-slate-900 font-bold text-sm">オッズ推移（直近{spanDays}日間）</h3>
          <div className="flex gap-3 flex-wrap">
            {series.map((s, i) => {
              const last = s.history[s.history.length - 1];
              const lastPct = last ? (last[1] * 100).toFixed(1) : "—";
              return (
                <span key={s.outcome} className="text-xs flex items-center gap-1.5">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-slate-700 font-medium">{s.outcome}</span>
                  <span className="text-slate-900 font-bold">{lastPct}%</span>
                </span>
              );
            })}
          </div>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          role="img"
          aria-label="オッズ推移チャート"
        >
          {/* Y軸グリッド */}
          {yTicks.map((y) => (
            <g key={y}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={yScale(y)}
                y2={yScale(y)}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray={y === 0 || y === 100 ? "0" : "2 3"}
              />
              <text
                x={width - padding.right + 6}
                y={yScale(y) + 4}
                fontSize="10"
                fill="#64748b"
              >
                {y}%
              </text>
            </g>
          ))}

          {/* X軸目盛 */}
          {xTicks.map((t, i) => (
            <text
              key={i}
              x={xScale(t)}
              y={height - padding.bottom + 16}
              fontSize="10"
              fill="#64748b"
              textAnchor={i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle"}
            >
              {fmtDate(t)}
            </text>
          ))}

          {/* データライン */}
          {series.map((s, i) => {
            if (s.history.length < 2) return null;
            const color = COLORS[i % COLORS.length];
            const points = s.history
              .map((p) => `${xScale(p[0])},${yScale(p[1] * 100)}`)
              .join(" ");
            const lastPoint = s.history[s.history.length - 1];
            return (
              <g key={s.outcome}>
                <polyline
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  points={points}
                />
                <circle
                  cx={xScale(lastPoint[0])}
                  cy={yScale(lastPoint[1] * 100)}
                  r="3.5"
                  fill={color}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="text-xs text-slate-500 mt-1.5 text-center">
        出典: Polymarket CLOB API
      </figcaption>
    </figure>
  );
}
