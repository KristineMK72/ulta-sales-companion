"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, brand, notes, ingredients, concern..."
          className="w-full pl-4 pr-24 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#f11a22] focus:ring-0 text-base shadow-sm"
          autoFocus
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f11a22] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {isPending ? "..." : "Search"}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Try: “vanilla”, “retinol”, “coffee”, “ceramide”, “dry skin”, “Good Girl”
      </p>
    </form>
  );
}
