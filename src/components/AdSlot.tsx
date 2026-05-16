import { AD_SLOTS, ADSENSE_CLIENT_ID, AdSlotId, pickCreative } from "@/lib/ads";
import { AdSenseUnit } from "./AdSenseUnit";

type Props = { slotId: AdSlotId };

export function AdSlot({ slotId }: Props) {
  const slot = AD_SLOTS[slotId];
  const creative = pickCreative(slot);
  if (!creative) return null;

  return (
    <div className="my-6 not-prose">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
          広告
        </span>
        <span className="text-[10px] text-slate-400">Sponsored</span>
      </div>

      {creative.kind === "text-link" && (
        <a
          href={creative.href}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="block border border-slate-200 rounded-lg p-4 md:p-5 hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
        >
          <div className="text-blue-700 font-bold text-base md:text-lg mb-1">
            {creative.title}
          </div>
          <p className="text-slate-600 text-sm mb-3 leading-relaxed">
            {creative.description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-md">
            {creative.ctaLabel} →
          </span>
        </a>
      )}

      {creative.kind === "affiliate-banner" && (
        <a
          href={creative.href}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={creative.imageUrl}
            alt={creative.alt}
            width={creative.width}
            height={creative.height}
            className="max-w-full h-auto rounded-lg border border-slate-200"
            loading="lazy"
          />
        </a>
      )}

      {creative.kind === "adsense" && ADSENSE_CLIENT_ID && (
        <AdSenseUnit
          client={ADSENSE_CLIENT_ID}
          slot={creative.slot}
          format={creative.format ?? "auto"}
        />
      )}

      {creative.kind === "custom-html" && (
        <div
          className="flex justify-center [&_img]:max-w-full [&_img]:h-auto"
          dangerouslySetInnerHTML={{ __html: creative.html }}
        />
      )}
    </div>
  );
}
