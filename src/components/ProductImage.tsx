import type { Product } from "@/data/products";

const CATEGORY_STYLE: Record<
  string,
  { bg: string; accent: string; label: string }
> = {
  Fragrance: { bg: "#5B21B6", accent: "#DDD6FE", label: "Fragrance" },
  Skincare: { bg: "#065F46", accent: "#A7F3D0", label: "Skincare" },
  Makeup: { bg: "#9F1239", accent: "#FECDD3", label: "Makeup" },
  Haircare: { bg: "#1E3A8A", accent: "#BFDBFE", label: "Hair" },
  "Bath & Body": { bg: "#9A3412", accent: "#FED7AA", label: "Body" },
  Tools: { bg: "#374151", accent: "#E5E7EB", label: "Tools" },
};

/**
 * Branded product visual so every card matches its product (no mismatched stock photos).
 */
export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const style = CATEGORY_STYLE[product.category] || CATEGORY_STYLE.Tools;
  const initials = product.brand
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-3 sm:p-4 text-left overflow-hidden ${className}`}
      style={{ backgroundColor: style.bg }}
      role="img"
      aria-label={`${product.brand} ${product.name}`}
    >
      {/* subtle pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <span
          className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ backgroundColor: style.accent, color: style.bg }}
        >
          {style.label}
        </span>
        <span
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
        >
          {initials}
        </span>
      </div>

      <div className="relative z-10 mt-auto text-white">
        <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide opacity-80 truncate">
          {product.brand}
        </p>
        <p className="text-sm sm:text-base font-bold leading-snug line-clamp-3 mt-0.5">
          {product.name}
        </p>
        {product.size && (
          <p className="text-[10px] sm:text-xs opacity-70 mt-1">{product.size}</p>
        )}
      </div>
    </div>
  );
}
