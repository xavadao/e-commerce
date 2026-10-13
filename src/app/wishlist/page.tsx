import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/WishlistPage';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Your Wishlist", "View sample fashion pieces saved in this browser. Wishlist data is local to your device.", "/wishlist", false);
