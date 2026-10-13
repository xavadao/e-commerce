import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo';
import { products } from '@/site/data/products';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/shop", "/about", "/editorial", ...products.map(({ id }) => `/product/${id}`),];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
