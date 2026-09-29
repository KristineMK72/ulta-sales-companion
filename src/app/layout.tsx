import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
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
        <SiteHeader />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <footer className="border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-500">
          <p>
            Demo catalog for training &amp; floor use. Replace with live Ulta data for
            production.
          </p>
        </footer>
      </body>
    </html>
  );
}
