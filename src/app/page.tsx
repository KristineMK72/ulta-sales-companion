import { Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { products, searchProducts } from "@/lib/similarity";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = q ? searchProducts(q) : products;

  const byCategory = results.reduce(
    (acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    },
    {} as Record<string, typeof products>
  );

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 pt-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Find the perfect comparable
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Built for Ulta associates — search a product, note, or ingredient and
          instantly show guests similar scents, formulas, and value alternatives.
        </p>
        <Suspense fallback={<div className="h-14" />}>
          <SearchBar />
        </Suspense>
      </section>

      {!q && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-[#f11a22] mb-2">
            Quick floor searches
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              "matte foundation",
              "ceramide",
              "vanilla",
              "retinol",
              "dupe",
              "bond-builder",
              "pistachio",
              "vitamin c",
              "long-wear",
              "dewy",
            ].map((term) => (
              <a
                key={term}
                href={`/?q=${encodeURIComponent(term)}`}
                className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#f11a22] hover:text-white transition-colors capitalize"
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      )}

      {q && (
        <p className="text-sm text-gray-600">
          {results.length} result{results.length !== 1 ? "s" : ""} for “
          <span className="font-medium text-gray-900">{q}</span>”
        </p>
      )}

      {results.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No products matched.</p>
          <p className="text-sm mt-1">Try matte foundation, ceramide, vanilla, or dupe.</p>
        </div>
      ) : q ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        Object.entries(byCategory).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#f11a22] rounded-full" />
              {category}
              <span className="text-sm font-normal text-gray-500">({items.length})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
