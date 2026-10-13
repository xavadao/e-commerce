import { products } from '@/site/data/products';
import View from '@/site/pages/ProductPage';

export default function Page() {
	return <View />;
}

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export const dynamicParams = false;
