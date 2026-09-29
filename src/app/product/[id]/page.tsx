import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { ShadeStrip } from "@/components/ShadeStrip";
import { getProductById, findSimilar, products } from "@/lib/similarity";
import { productShades } from "@/data/shades";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const similar = findSimilar(product, 8);
  const price = product.salePrice ?? product.price;
  const hasShades = Boolean(productShades[id]?.length);

  return (
    <div className="space-y-10">
      <nav className="text-sm text-gray-500 flex flex-wrap gap-3">
        <Link href="/" className="hover:text-[#f11a22]">
          ← All products
        </Link>
        {hasShades && (
          <Link href="/color-match" className="hover:text-[#f11a22]">
            Shade match
          </Link>
        )}
      </nav>

      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="aspect-square rounded-xl overflow-hidden">
          <ProductImage product={product} />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {product.brand}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {product.category} · {product.subcategory}
              {product.size ? ` · ${product.size}` : ""}
              {product.sku ? ` · SKU ${product.sku}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-[#f11a22]">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-600">
              ★ {product.rating} · {product.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span
                key={t}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded capitalize"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {product.salesTip && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-1">
                Floor tip for associates
              </p>
              <p className="text-sm text-amber-950 leading-relaxed">
                {product.salesTip}
              </p>
            </div>
          )}

          <ShadeStrip productId={product.id} />

          {product.notes && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Fragrance Notes</h3>
              {product.family && (
                <p className="text-sm">
                  <span className="font-medium">Family:</span> {product.family}
                </p>
              )}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-amber-50 rounded-lg p-2">
                  <p className="font-medium text-amber-800 text-xs uppercase">Top</p>
                  <p className="text-amber-900">{product.notes.top.join(", ")}</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-2">
                  <p className="font-medium text-rose-800 text-xs uppercase">Heart</p>
                  <p className="text-rose-900">{product.notes.heart.join(", ")}</p>
                </div>
                <div className="bg-stone-100 rounded-lg p-2">
                  <p className="font-medium text-stone-700 text-xs uppercase">Base</p>
                  <p className="text-stone-900">{product.notes.base.join(", ")}</p>
                </div>
              </div>
            </div>
          )}

          {product.keyIngredients && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Key Ingredients / Actives
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {product.keyIngredients.map((ing) => (
                  <span
                    key={ing}
                    className="bg-emerald-50 text-emerald-800 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(product.concerns || product.skinTypes) && (
            <div className="flex flex-wrap gap-4 text-sm">
              {product.concerns && (
                <div>
                  <span className="font-medium text-gray-700">Targets: </span>
                  {product.concerns.join(", ")}
                </div>
              )}
              {product.skinTypes && (
                <div>
                  <span className="font-medium text-gray-700">Skin types: </span>
                  {product.skinTypes.join(", ")}
                </div>
              )}
            </div>
          )}

          {hasShades && (
            <Link
              href="/color-match"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border-2 border-[#f11a22] text-[#f11a22] font-semibold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors"
            >
              Match this shade across brands →
            </Link>
          )}

          {product.ultaUrl && (
            <a
              href={product.ultaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#f11a22] text-white font-semibold px-5 py-3 rounded-xl hover:bg-red-700 transition-colors"
            >
              Open on Ulta.com →
            </a>
          )}
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Comparable products for your guest
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          Ranked by shared notes, ingredients, finish/coverage, category, and price.
          Use these when they want an alternative or a dupe.
        </p>
        {similar.length === 0 ? (
          <p className="text-gray-500">No strong comparables in the current catalog.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {similar.map(({ product: p, score, reasons }) => (
              <ProductCard
                key={p.id}
                product={p}
                showScore={Math.min(99, Math.round(score))}
                reasons={reasons}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
