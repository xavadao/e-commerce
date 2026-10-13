import type { Metadata } from 'next';

export const site = {
  "name": "Maison Fashion Store",
  "url": "https://vibed-shop.xavainf.com",
  "description": "An editorial fashion storefront demo with twelve sample products, product galleries, a browser wishlist and fictional checkout. No purchases or payments are processed.",
  "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80"
};

export function pageMetadata(title: string, description: string, path: string, index = true, image = site.image): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: { type: 'website', title: fullTitle, description, url, siteName: site.name, images: [{ url: image, alt: `${site.name} sample website` }] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
  };
}

export const siteMetadata: Metadata = {
  ...pageMetadata(site.name, site.description, '/'),
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: { default: site.name, template: `%s | ${site.name}` },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], shortcut: ['/favicon.svg'] },
};

export const websiteSchema = {
  '@context': 'https://schema.org', '@type': 'WebSite',
  name: site.name, url: site.url, description: site.description,
  isAccessibleForFree: true,
  creator: { '@type': 'Organization', name: 'XavaInf', url: 'https://xavainf.com' },
};
