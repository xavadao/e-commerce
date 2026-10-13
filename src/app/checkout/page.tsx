import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/CheckoutPage';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Demo Checkout", "Try a fictional checkout using sample information. No order, payment or confirmation email is created.", "/checkout", false);
