import Link from "next/link";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  showScore?: number;
  reasons?: string[];
}

function Badge({ children, tone }: { children: React.ReactNode; tone?: "red" | "green" | "gray" }) {
  const cls =
    tone === "red"
      ? "bg-[#f11a22] text-white"
      : tone === "green"
        ? "bg-emerald-100 text-emerald-800"
        : "bg-gray-100 text-gray-700";
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${cls}`}>
      {children}
    </span>
  );
}

export function ProductCard({ product, showScore, reasons }: Props) {
  const price = product.salePrice ?? product.price;
  const isDupe = product.tags.includes("dupe") || product.tags.includes("affordable") || product.tags.includes("drugstore");
  const isBestseller = product.tags.includes("bestseller");
  const onlyUlta = product.tags.includes("only at ulta");

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#f11a22]/40 transition-all overflow-hidden"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showScore !== undefined && (
          <div className="absolute top-2 right-2 bg-[#f11a22] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            {showScore}% match
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {onlyUlta && <Badge tone="red">Only at Ulta</Badge>}
          {isBestseller && !onlyUlta && <Badge tone="red">Bestseller</Badge>}
          {isDupe && <Badge tone="green">Value alt</Badge>}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">
          {product.brand}
        </p>
        <h3 className="font-semibold text-sm sm:text-base mt-0.5 line-clamp-2 group-hover:text-[#f11a22] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{product.subcategory}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-[#f11a22]">${price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">
            ★ {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>
        {reasons && reasons.length > 0 && (
          <ul className="mt-2 space-y-0.5">
            {reasons.slice(0, 2).map((r, i) => (
              <li key={i} className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
