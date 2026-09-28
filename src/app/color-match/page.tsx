"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DEPTHS,
  UNDERTONES,
  productShades,
  type Depth,
  type Undertone,
} from "@/data/shades";
import { matchShades, matchFromProductShade, getShadeProducts } from "@/lib/colorMatch";

type Mode = "depth" | "known";

export default function ColorMatchPage() {
  const [mode, setMode] = useState<Mode>("depth");
  const [depth, setDepth] = useState<Depth>("Light-Medium");
  const [undertone, setUndertone] = useState<Undertone>("Neutral");
  const [knownProductId, setKnownProductId] = useState("mk-006");
  const [knownShadeName, setKnownShadeName] = useState("2W0 Warm Vanilla");

  const shadeProducts = useMemo(() => getShadeProducts(), []);
  const knownShades = productShades[knownProductId] || [];

  const matches = useMemo(() => {
    if (mode === "known") {
      return matchFromProductShade(knownProductId, knownShadeName, 16);
    }
    return matchShades(depth, undertone, 16);
  }, [mode, depth, undertone, knownProductId, knownShadeName]);

  const knownProduct = shadeProducts.find((p) => p.id === knownProductId);
  const activeShade = knownShades.find((s) => s.name === knownShadeName);

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
          Match by depth & undertone — or start from a shade they already wear
          (e.g. Double Wear 2W0 → Fenty / Maybelline).
        </p>
      </header>

      {/* Mode toggle */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setMode("depth")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            mode === "depth"
              ? "bg-white text-gray-900 shadow"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Depth + undertone
        </button>
        <button
          type="button"
          onClick={() => setMode("known")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            mode === "known"
              ? "bg-white text-gray-900 shadow"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          From a shade they wear
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        {mode === "depth" ? (
          <>
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
                Cool = pink/red · Warm = yellow/golden · Neutral = balanced · Olive =
                green/golden
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                1. Foundation they already wear
              </p>
              <select
                value={knownProductId}
                onChange={(e) => {
                  const id = e.target.value;
                  setKnownProductId(id);
                  const first = productShades[id]?.[0];
                  if (first) setKnownShadeName(first.name);
                }}
                className="w-full sm:w-auto min-w-[280px] border border-gray-300 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f11a22]/40"
              >
                {shadeProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.brand} — {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                2. Their shade
              </p>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {knownShades.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setKnownShadeName(s.name)}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      knownShadeName === s.name
                        ? "bg-[#f11a22] text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: s.hex || "#D4A574" }}
                    />
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {activeShade && knownProduct && (
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
                <div
                  className="w-12 h-12 rounded-full border-2 border-white shadow ring-1 ring-gray-200"
                  style={{ backgroundColor: activeShade.hex || "#D4A574" }}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Matching from {knownProduct.brand} · {activeShade.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activeShade.depth} · {activeShade.undertone}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-950">
          <strong>Associate tip:</strong> Check veins (blue = cool, green = warm),
          jewelry preference (silver vs gold), and how they tan. Always confirm on the
          jawline in natural light — not the hand.
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          {mode === "known" && activeShade
            ? `Cross-brand matches for ${activeShade.name}`
            : `Matches for ${depth} · ${undertone}`}
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
                      {shade.depth} · {shade.undertone} · ${
                        product.price.toFixed(2)
                      }
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
