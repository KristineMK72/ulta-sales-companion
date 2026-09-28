import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ulta Sales Companion | Comparables + Shade Match",
  description:
    "Floor tool for Ulta associates — comparable products, notes, formulas, and foundation shade matching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <header className="bg-[#f11a22] text-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight">ULTA</span>
              <span className="text-sm font-medium opacity-90 border-l border-white/40 pl-3">
                Sales Companion
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link href="/" className="opacity-90 hover:opacity-100">
                Products
              </Link>
              <Link
                href="/color-match"
                className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
              >
                Shade match
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <footer className="border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-500">
          <p>
            Demo catalog for training &amp; floor use. Replace with live Ulta data for production.
          </p>
        </footer>
      </body>
    </html>
  );
}
