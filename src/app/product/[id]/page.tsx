import { pageMetadata } from '@/lib/seo';
import { getProductById } from '@/site/data/products';
import { products } from '@/site/data/products';
import View from '@/site/pages/ProductPage';

export default function Page() {
	return <View />;
}

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getProductById(id);
  if (!item) return pageMetadata('Page not found', 'The requested sample page does not exist.', '/product/' + id, false);
  return pageMetadata(`${item.name} — Sample Product`, `Explore ${item.name} in the Maison sample catalog, including size and color choices. This demo does not process purchases.`, '/product/' + id, true, item.images[0]);
}
