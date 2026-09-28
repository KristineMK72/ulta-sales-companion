import { products } from "@/lib/similarity";
import type { Product } from "@/data/products";
import {
  productShades,
  depthDistance,
  undertoneCompatible,
  type Depth,
  type Undertone,
  type Shade,
} from "@/data/shades";

export interface ShadeMatch {
  product: Product;
  shade: Shade;
  score: number;
  reasons: string[];
}

/** Products that have shade data (foundations / complexion) */
export function getShadeProducts(): Product[] {
  return products.filter((p) => productShades[p.id]?.length);
}

export function matchShades(
  depth: Depth,
  undertone: Undertone,
  limit = 16
): ShadeMatch[] {
  const results: ShadeMatch[] = [];

  for (const product of getShadeProducts()) {
    const shades = productShades[product.id] || [];
    for (const shade of shades) {
      let score = 0;
      const reasons: string[] = [];

      const dDist = depthDistance(depth, shade.depth);
      if (dDist === 0) {
        score += 50;
        reasons.push(`Same depth: ${shade.depth}`);
      } else if (dDist === 1) {
        score += 28;
        reasons.push(`Near depth: ${shade.depth}`);
      } else if (dDist === 2) {
        score += 12;
        reasons.push(`Close depth: ${shade.depth}`);
      } else {
        continue; // too far
      }

      if (shade.undertone === undertone) {
        score += 40;
        reasons.push(`Undertone match: ${undertone}`);
      } else if (undertoneCompatible(undertone, shade.undertone)) {
        score += 18;
        reasons.push(`Compatible undertone: ${shade.undertone}`);
      } else {
        score -= 15; // wrong undertone penalty
        reasons.push(`Different undertone: ${shade.undertone}`);
      }

      // Prefer same subcategory foundations
      if (product.subcategory === "Foundation") score += 5;

      if (score >= 30) {
        results.push({
          product,
          shade,
          score: Math.round(score),
          reasons,
        });
      }
    }
  }

  // Best shade per product, then rank
  const bestByProduct = new Map<string, ShadeMatch>();
  for (const m of results.sort((a, b) => b.score - a.score)) {
    if (!bestByProduct.has(m.product.id)) {
      bestByProduct.set(m.product.id, m);
    }
  }

  return [...bestByProduct.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Given a product + shade name, find cross-brand matches */
export function matchFromProductShade(
  productId: string,
  shadeName: string,
  limit = 12
): ShadeMatch[] {
  const shades = productShades[productId];
  if (!shades) return [];
  const shade = shades.find(
    (s) => s.name.toLowerCase() === shadeName.toLowerCase()
  );
  if (!shade) return [];
  return matchShades(shade.depth, shade.undertone, limit).filter(
    (m) => m.product.id !== productId
  );
}
