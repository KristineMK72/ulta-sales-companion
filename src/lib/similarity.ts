import { Product, products as baseProducts } from "@/data/products";
import { extraProducts } from "@/data/extraProducts";
import { moreProducts } from "@/data/moreProducts";

export const products: Product[] = [
  ...baseProducts,
  ...extraProducts,
  ...moreProducts,
];

export interface SimilarityScore {
  product: Product;
  score: number;
  reasons: string[];
}

function normalize(str: string): string {
  return str.toLowerCase().trim();
}

function jaccard(a: string[], b: string[]): number {
  const setA = new Set(a.map(normalize));
  const setB = new Set(b.map(normalize));
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

function getAllNotes(p: Product): string[] {
  if (!p.notes) return [];
  return [...p.notes.top, ...p.notes.heart, ...p.notes.base];
}

export function findSimilar(
  target: Product,
  limit = 8,
  excludeSelf = true
): SimilarityScore[] {
  const results: SimilarityScore[] = [];

  for (const candidate of products) {
    if (excludeSelf && candidate.id === target.id) continue;

    let score = 0;
    const reasons: string[] = [];

    if (target.notes && candidate.notes) {
      const noteSim = jaccard(getAllNotes(target), getAllNotes(candidate));
      if (noteSim > 0) {
        score += noteSim * 40;
        const shared = getAllNotes(target)
          .map(normalize)
          .filter((n) =>
            getAllNotes(candidate).map(normalize).includes(n)
          );
        if (shared.length) {
          reasons.push(
            `Shared notes: ${[...new Set(shared)].slice(0, 4).join(", ")}`
          );
        }
      }
      if (
        target.family &&
        candidate.family &&
        target.family === candidate.family
      ) {
        score += 15;
        reasons.push(`Same family: ${target.family}`);
      }
    }

    if (target.keyIngredients && candidate.keyIngredients) {
      const ingSim = jaccard(target.keyIngredients, candidate.keyIngredients);
      if (ingSim > 0) {
        score += ingSim * 35;
        const shared = target.keyIngredients
          .map(normalize)
          .filter((i) =>
            candidate.keyIngredients!.map(normalize).includes(i)
          );
        if (shared.length) {
          reasons.push(
            `Shared ingredients: ${[...new Set(shared)].slice(0, 3).join(", ")}`
          );
        }
      }
    }

    if (target.category === candidate.category) {
      score += 8;
      if (target.subcategory === candidate.subcategory) {
        score += 12;
        reasons.push(`Same type: ${target.subcategory}`);
      } else {
        reasons.push(`Same category: ${target.category}`);
      }
    }

    const priceDiff =
      Math.abs(target.price - candidate.price) /
      Math.max(target.price, candidate.price);
    if (priceDiff < 0.15) {
      score += 10;
      reasons.push("Similar price point");
    } else if (priceDiff < 0.35) {
      score += 5;
    }

    if (target.concerns && candidate.concerns) {
      const concernSim = jaccard(target.concerns, candidate.concerns);
      if (concernSim > 0) {
        score += concernSim * 12;
        const shared = target.concerns
          .map(normalize)
          .filter((c) => candidate.concerns!.map(normalize).includes(c));
        if (shared.length) {
          reasons.push(`Addresses: ${shared.slice(0, 2).join(", ")}`);
        }
      }
    }

    if (target.skinTypes && candidate.skinTypes) {
      const stSim = jaccard(target.skinTypes, candidate.skinTypes);
      if (stSim > 0.3) score += 6;
    }

    const tagSim = jaccard(target.tags, candidate.tags);
    if (tagSim > 0) score += tagSim * 5;

    if (
      target.brand !== candidate.brand &&
      target.category === candidate.category
    ) {
      score += 3;
    }

    if (score > 5) {
      results.push({
        product: candidate,
        score: Math.round(score * 10) / 10,
        reasons,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;

  return products.filter((p) => {
    const haystack = [
      p.name,
      p.brand,
      p.category,
      p.subcategory,
      p.description,
      ...(p.keyIngredients || []),
      ...(p.concerns || []),
      ...(p.tags || []),
      ...(p.notes ? getAllNotes(p) : []),
      p.family || "",
    ]
      .join(" ")
      .toLowerCase();

    return (
      haystack.includes(q) ||
      q.split(/\s+/).every((term) => haystack.includes(term))
    );
  });
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
