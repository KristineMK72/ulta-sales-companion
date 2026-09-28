# Ulta Sales Companion

Internal tool for Ulta Beauty sales associates to quickly find comparable products by scent notes, key ingredients/formulas, category, and price.

## Features

- Fast search across name, brand, notes, ingredients, concerns
- Product detail with full fragrance pyramid or key actives
- “Find Comparables” ranked by shared notes / ingredients / price / category
- Mobile-friendly UI with Ulta-inspired branding
- Demo catalog (fragrances, skincare, makeup, haircare) — ready to swap for live data

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub (already done if you cloned this)
2. Import the project in Vercel dashboard or use the Git integration
3. Deploy — zero config needed for this Next.js app

## Extending to full Ulta catalog

Replace `src/data/products.ts` with data from:

- Ulta internal product feed / API (preferred)
- Paid providers: Apify Ulta scrapers, BeautyFeeds, Parse.bot, Anysite, etc.
- Or a Postgres / Supabase table + vector search (pgvector) for larger scale

The similarity engine in `src/lib/similarity.ts` is pure content-based and works with any product shape that has notes, ingredients, category, and price.

## Tech

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Zero external APIs in the demo
