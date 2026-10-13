import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/HomePage';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Editorial Fashion Demo", "Explore Maison, an editorial fashion storefront demo with sample clothing, accessories and a fictional checkout.", "/", true);
