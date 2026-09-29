"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Products" },
  { href: "/color-match", label: "Shade match" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-[#f11a22] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-95 transition-opacity"
        >
          <span className="text-2xl font-bold tracking-tight">ULTA</span>
          <span className="text-sm font-medium opacity-90 border-l border-white/40 pl-3 hidden xs:inline sm:inline">
            Sales Companion
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2 text-sm font-semibold" aria-label="Main">
          {links.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? "bg-white text-[#f11a22]"
                    : "bg-white/15 hover:bg-white/25 text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
