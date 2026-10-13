import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/ShopPage';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("The Collection", "Browse twelve sample Maison fashion pieces with sizes, color choices, galleries and category filters. This demo does not sell or ship products.", "/shop", true);
