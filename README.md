# Product Catalog

React + Vite + React Router app with Firebase Authentication and TanStack Query caching.

## Setup

1. Copy `.env.example` to `.env.local` and fill in your Firebase web app config.
2. `npm install`
3. `npm run dev`

## Caching strategy

- Server data is cached with TanStack Query using the keys `['products']` (product list) and `['products', id]` (single product).
- Cached data stays fresh for 5 minutes (`staleTime`). After that it is revalidated in the background on remount or window focus. Unused entries are removed after 5 minutes (`gcTime`).
- Each request receives an `AbortSignal`, and each product has its own key. This means outdated requests are cancelled and never overwrite newer results.

## Invalidation

After a product is deleted (Delete button on the product details page), all `['products']` queries are invalidated and refetched. DummyJSON only simulates deletes, so the refetched data still contains the product.
