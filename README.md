# Vibed Shop

An editorial fashion storefront built around the MAISON demo brand.

[Live demo](https://vibed-shop.xavainf.com)

## Features

- Twelve sample products with galleries, sizes, colors, material notes, and related products.
- Category browsing, search, sorting, and product detail pages.
- Shopping bag and wishlist saved in browser storage.
- Multi-step demo checkout with shipping selection and a confirmation screen.
- Responsive home, brand story, and editorial pages.

## Run locally

Prerequisites: Node.js 22.13 or newer and pnpm 11.13.0 (`corepack enable`).

```sh
pnpm install
pnpm dev
```

Open the development URL printed by Next.js (normally `http://localhost:3000`). No API keys, database, or environment variables are required.

## Build and preview

```sh
pnpm build
pnpm preview
```

The build checks TypeScript and exports static HTML, JavaScript, and CSS to `out/`. Preview rebuilds the site and serves that output with Wrangler. Next.js App Router handles navigation; all sample detail routes are generated at build time. Adding data-backed routes requires updating the corresponding sample dataset and rebuilding.

## Deploy

The site uses Cloudflare Workers Static Assets. The existing `wrangler.jsonc` names the `vibed-shop` Worker and attaches the custom domain `vibed-shop.xavainf.com`.

```sh
pnpm exec wrangler login
pnpm deploy
```

Deployment requires access to the configured Cloudflare account and the `xavainf.com` zone. For another account, update `account_id`, Worker name, and custom-domain route in `wrangler.jsonc`. Authenticate through Wrangler or an untracked `CLOUDFLARE_API_TOKEN`; never commit credentials.

## Demo limitations

Checkout is a client-side demonstration. No order is created, payment charged, email sent, or stock reserved. Use fictional contact and card information. Newsletter and social controls are examples rather than live integrations. Cart and wishlist data stay in the current browser.

Photography loads from the original Unsplash URLs and typography from Google Fonts, so those visuals require internet access. The app has no production API, authentication, billing, or server-side persistence.

## Source layout

- `src/app/`: Next.js routes, metadata, and styles.
- `src/site/`: original interface, components, and bundled sample data.
- `src/lib/router-compat.tsx`: navigation adapters used by the interface.
- `public/`: favicon and static response headers.
- `wrangler.jsonc`: standalone static deployment configuration.
