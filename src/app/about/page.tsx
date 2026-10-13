import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/AboutPage';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("The Maison Story", "Discover the fictional Maison brand story and editorial direction in this sample fashion storefront.", "/about", true);
