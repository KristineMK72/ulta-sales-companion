import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ulta Sales Companion | Find Comparable Products Fast",
  description:
    "Internal tool for Ulta Beauty sales associates — quickly find comparable scents, formulas, and alternatives for any product.",
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
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight">ULTA</span>
              <span className="text-sm font-medium opacity-90 border-l border-white/40 pl-3">
                Sales Companion
              </span>
            </div>
            <p className="text-xs opacity-80 hidden sm:block">
              Find comparables • Notes • Formulas • Alternatives
            </p>
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
