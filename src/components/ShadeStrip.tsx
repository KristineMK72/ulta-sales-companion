import Link from "next/link";
import { productShades } from "@/data/shades";

export function ShadeStrip({ productId }: { productId: string }) {
  const shades = productShades[productId];
  if (!shades?.length) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-gray-900">Shades in catalog</h3>
        <Link
          href="/color-match"
          className="text-xs font-semibold text-[#f11a22] hover:underline"
        >
          Find cross-brand match →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {shades.map((s) => (
          <div
            key={s.name}
            className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs"
            title={`${s.depth} · ${s.undertone}`}
          >
            <span
              className="w-5 h-5 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: s.hex || "#D4A574" }}
            />
            <span className="font-medium text-gray-800">{s.name}</span>
            <span className="text-gray-400 hidden sm:inline">
              {s.depth}/{s.undertone.slice(0, 1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
