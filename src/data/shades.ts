/** Shade depth & undertone system for foundation color matching */

export type Depth =
  | "Fair"
  | "Light"
  | "Light-Medium"
  | "Medium"
  | "Medium-Deep"
  | "Deep"
  | "Deep-Rich";

export type Undertone = "Cool" | "Neutral" | "Warm" | "Olive";

export const DEPTHS: Depth[] = [
  "Fair",
  "Light",
  "Light-Medium",
  "Medium",
  "Medium-Deep",
  "Deep",
  "Deep-Rich",
];

export const UNDERTONES: Undertone[] = ["Cool", "Neutral", "Warm", "Olive"];

export const DEPTH_ORDER: Record<Depth, number> = {
  Fair: 0,
  Light: 1,
  "Light-Medium": 2,
  Medium: 3,
  "Medium-Deep": 4,
  Deep: 5,
  "Deep-Rich": 6,
};

export interface Shade {
  name: string;
  depth: Depth;
  undertone: Undertone;
  /** Optional hex for visual chip (approximate) */
  hex?: string;
}

/** Example shades per foundation-style product id */
export const productShades: Record<string, Shade[]> = {
  "mk-006": [
    { name: "1N1 Ivory Nude", depth: "Fair", undertone: "Neutral", hex: "#F5E6D3" },
    { name: "1W1 Bone", depth: "Fair", undertone: "Warm", hex: "#F3DFC4" },
    { name: "1C1 Cool Bone", depth: "Fair", undertone: "Cool", hex: "#F0E4D8" },
    { name: "2N1 Desert Beige", depth: "Light", undertone: "Neutral", hex: "#E8C9A8" },
    { name: "2W0 Warm Vanilla", depth: "Light", undertone: "Warm", hex: "#E6C49A" },
    { name: "2C0 Cool Vanilla", depth: "Light", undertone: "Cool", hex: "#E4C8B0" },
    { name: "3N1 Ivory Beige", depth: "Light-Medium", undertone: "Neutral", hex: "#D4A574" },
    { name: "3W1 Tawny", depth: "Light-Medium", undertone: "Warm", hex: "#D0A06A" },
    { name: "4N1 Shell Beige", depth: "Medium", undertone: "Neutral", hex: "#C08B5C" },
    { name: "4W1 Honey", depth: "Medium", undertone: "Warm", hex: "#B8824E" },
    { name: "5N1 Rich Ginger", depth: "Medium-Deep", undertone: "Neutral", hex: "#A06B42" },
    { name: "5W1 Bronze", depth: "Medium-Deep", undertone: "Warm", hex: "#9A6238" },
    { name: "6N1 Mocha", depth: "Deep", undertone: "Neutral", hex: "#7A4A2E" },
    { name: "6W1 Sandalwood", depth: "Deep", undertone: "Warm", hex: "#744428" },
    { name: "7N1 Espresso", depth: "Deep-Rich", undertone: "Neutral", hex: "#4A2C1A" },
  ],
  "mk-009": [
    { name: "100", depth: "Fair", undertone: "Cool", hex: "#F2E4D4" },
    { name: "145", depth: "Fair", undertone: "Warm", hex: "#F0DCC0" },
    { name: "150", depth: "Light", undertone: "Neutral", hex: "#E8CDB0" },
    { name: "190", depth: "Light", undertone: "Warm", hex: "#E4C49A" },
    { name: "230", depth: "Light-Medium", undertone: "Neutral", hex: "#D4A878" },
    { name: "290", depth: "Light-Medium", undertone: "Warm", hex: "#CFA06A" },
    { name: "310", depth: "Medium", undertone: "Neutral", hex: "#B88858" },
    { name: "370", depth: "Medium", undertone: "Warm", hex: "#B07E4C" },
    { name: "420", depth: "Medium-Deep", undertone: "Neutral", hex: "#9A6A40" },
    { name: "445", depth: "Medium-Deep", undertone: "Warm", hex: "#8E5E36" },
    { name: "490", depth: "Deep", undertone: "Cool", hex: "#6E4A32" },
    { name: "498", depth: "Deep", undertone: "Warm", hex: "#6A442C" },
    { name: "498 (Deep Rich)", depth: "Deep-Rich", undertone: "Neutral", hex: "#4A2E1C" },
  ],
  "mk-007": [
    { name: "3", depth: "Fair", undertone: "Cool", hex: "#F4E6D8" },
    { name: "4", depth: "Fair", undertone: "Neutral", hex: "#F0DFC8" },
    { name: "5.5", depth: "Light", undertone: "Warm", hex: "#E6C8A0" },
    { name: "6", depth: "Light", undertone: "Neutral", hex: "#E2C4A4" },
    { name: "7.5", depth: "Light-Medium", undertone: "Warm", hex: "#D0A878" },
    { name: "8", depth: "Light-Medium", undertone: "Neutral", hex: "#CCA474" },
    { name: "9", depth: "Medium", undertone: "Neutral", hex: "#B8885C" },
    { name: "10", depth: "Medium", undertone: "Warm", hex: "#B07E50" },
    { name: "11.5", depth: "Medium-Deep", undertone: "Warm", hex: "#966840" },
    { name: "12", depth: "Deep", undertone: "Neutral", hex: "#7A4E30" },
  ],
  "mk-010": [
    { name: "Fair 01", depth: "Fair", undertone: "Cool", hex: "#F3E5D5" },
    { name: "Fair 05", depth: "Fair", undertone: "Warm", hex: "#F0DCC4" },
    { name: "Light 10", depth: "Light", undertone: "Neutral", hex: "#E6C9A8" },
    { name: "Light 15", depth: "Light", undertone: "Warm", hex: "#E2C098" },
    { name: "Medium 20", depth: "Light-Medium", undertone: "Neutral", hex: "#D0A678" },
    { name: "Medium 25", depth: "Medium", undertone: "Warm", hex: "#B88858" },
    { name: "Tan 30", depth: "Medium-Deep", undertone: "Neutral", hex: "#9A6A42" },
    { name: "Deep 35", depth: "Deep", undertone: "Warm", hex: "#744830" },
    { name: "Deep 40", depth: "Deep-Rich", undertone: "Neutral", hex: "#4C2E1C" },
  ],
  "mk-011": [
    { name: "Stella", depth: "Fair", undertone: "Cool", hex: "#F5E8DA" },
    { name: "Bom Bom", depth: "Light", undertone: "Warm", hex: "#E8C9A0" },
    { name: "Formosa", depth: "Light-Medium", undertone: "Neutral", hex: "#D4A878" },
    { name: "Sable", depth: "Medium", undertone: "Warm", hex: "#B88858" },
    { name: "Morena", depth: "Medium-Deep", undertone: "Neutral", hex: "#9A6840" },
    { name: "Dessus", depth: "Deep", undertone: "Cool", hex: "#6E4A32" },
  ],
  "mk-012": [
    { name: "102 Fair Porcelain", depth: "Fair", undertone: "Cool", hex: "#F4E6D6" },
    { name: "110 Porcelain", depth: "Fair", undertone: "Neutral", hex: "#F0DFC8" },
    { name: "120 Classic Ivory", depth: "Light", undertone: "Warm", hex: "#E8C9A0" },
    { name: "128 Warm Nude", depth: "Light", undertone: "Warm", hex: "#E4C296" },
    { name: "220 Natural Beige", depth: "Light-Medium", undertone: "Neutral", hex: "#D0A878" },
    { name: "240 Natural Ivory", depth: "Medium", undertone: "Neutral", hex: "#C09468" },
    { name: "312 Soft Honey", depth: "Medium", undertone: "Warm", hex: "#B88858" },
    { name: "330 Toffee", depth: "Medium-Deep", undertone: "Warm", hex: "#9A6840" },
    { name: "355 Coconut", depth: "Deep", undertone: "Neutral", hex: "#7A4E30" },
    { name: "380 Rich Java", depth: "Deep-Rich", undertone: "Warm", hex: "#4A2C18" },
  ],
  "mk-016": [
    { name: "112 Natural Ivory", depth: "Fair", undertone: "Neutral", hex: "#F0DFC8" },
    { name: "118 Light Beige", depth: "Light", undertone: "Warm", hex: "#E6C9A0" },
    { name: "220 Natural Beige", depth: "Light-Medium", undertone: "Neutral", hex: "#D0A878" },
    { name: "310 Sun Beige", depth: "Medium", undertone: "Warm", hex: "#B88858" },
    { name: "330 Toffee", depth: "Medium-Deep", undertone: "Warm", hex: "#9A6840" },
    { name: "355 Coconut", depth: "Deep", undertone: "Neutral", hex: "#7A4E30" },
  ],
  "mk-017": [
    { name: "Ivory", depth: "Fair", undertone: "Cool", hex: "#F5E8DA" },
    { name: "Vanilla", depth: "Light", undertone: "Neutral", hex: "#EAD4B8" },
    { name: "Nude", depth: "Light-Medium", undertone: "Warm", hex: "#D4A878" },
    { name: "Sand", depth: "Medium", undertone: "Neutral", hex: "#C09468" },
    { name: "Tan", depth: "Medium-Deep", undertone: "Warm", hex: "#9A6840" },
  ],
};

export function depthDistance(a: Depth, b: Depth): number {
  return Math.abs(DEPTH_ORDER[a] - DEPTH_ORDER[b]);
}

export function undertoneCompatible(a: Undertone, b: Undertone): boolean {
  if (a === b) return true;
  if (a === "Neutral" || b === "Neutral") return true;
  if ((a === "Olive" && b === "Warm") || (a === "Warm" && b === "Olive")) return true;
  return false;
}
