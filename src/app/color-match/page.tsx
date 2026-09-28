"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DEPTHS,
  UNDERTONES,
  type Depth,
  type Undertone,
} from "@/data/shades";
import { matchShades } from "@/lib/colorMatch";

export default function ColorMatchPage() {
  const [depth, setDepth] = useState<Depth>("Light-Medium");
  const [undertone, setUndertone] = useState<Undertone>("Neutral");

  const matches = useMemo(
    () => matchShades(depth, undertone, 16),
    [depth, undertone]
  );

  return (
    <div className="space-y-8">
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:text-[#f11a22]">
          ← All products
        </Link>
      </nav>

      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Shade & color match
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Pick your guest&apos;s depth and undertone. We&apos;ll surface foundations
          across brands with the closest shade — prestige and value side by side.
        </p>
      </header>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
            1. Depth (light → deep)
          </p>
          <div className="flex flex-wrap gap-2">
            {DEPTHS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDepth(d)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  depth === d
                    ? "bg-[#f11a22] text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
            2. Undertone
          </p>
          <div className="flex flex-wrap gap-2">
            {UNDERTONES.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUndertone(u)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  undertone === u
                    ? "bg-[#f11a22] text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Cool = pink/red · Warm = yellow/golden · Neutral = balanced · Olive = green/golden
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-950">
          <strong>Associate tip:</strong> Check veins (blue = cool, green = warm),
          jewelry preference (silver vs gold), and how they tan. When in doubt,
          neutral is the safest start — then refine on the face, not the hand.
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Matches for {depth} · {undertone}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {matches.length} foundation shade{matches.length !== 1 ? "s" : ""} across
          brands
        </p>

        {matches.length === 0 ? (
          <p className="text-gray-500 py-8">No close matches in the demo catalog.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map(({ product, shade, score, reasons }) => (
              <Link
                key={`${product.id}-${shade.name}`}
                href={`/product/${product.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#f11a22]/40 hover:shadow-md transition-all"
              >
                <div className="flex gap-3">
                  <div
                    className="w-14 h-14 rounded-full border-2 border-white shadow shrink-0 ring-1 ring-gray-200"
                    style={{
                      backgroundColor: shade.hex || "#D4A574",
                    }}
                    title={shade.name}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          {product.brand}
                        </p>
                        <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                          {product.name}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#f11a22] bg-red-50 px-2 py-0.5 rounded-full shrink-0">
                        {score}%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      Shade: {shade.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {shade.depth} · {shade.undertone} · ${product.price.toFixed(2)}
                    </p>
                    <ul className="mt-2 space-y-0.5">
                      {reasons.slice(0, 2).map((r, i) => (
                        <li
                          key={i}
                          className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mr-1"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
