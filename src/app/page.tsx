import { Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/similarity";
import { searchProducts } from "@/lib/similarity";

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
          Search any product, scent note, or ingredient. Instantly surface similar
          fragrances, formulas, and alternatives for your guest.
        </p>
        <Suspense fallback={<div className="h-14" />}>
          <SearchBar />
        </Suspense>
      </section>

      {q && (
        <p className="text-sm text-gray-600">
          {results.length} result{results.length !== 1 ? "s" : ""} for “
          <span className="font-medium text-gray-900">{q}</span>”
        </p>
      )}

      {results.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No products matched.</p>
          <p className="text-sm mt-1">Try a broader term or different note/ingredient.</p>
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
              <span className="text-sm font-normal text-gray-500">
                ({items.length})
              </span>
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
