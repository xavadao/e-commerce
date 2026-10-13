import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/AboutPage';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Editorial Inspiration", "Explore the sample Maison brand story and fashion inspiration. This editorial route shares the fictional brand presentation.", "/editorial", true);
