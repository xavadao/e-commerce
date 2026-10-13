import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '@/components/providers';
import AppShell from '@/site/app-shell';
import { SearchParamsProvider } from '@/lib/search-params';
import { siteMetadata, websiteSchema } from '@/lib/seo';
import { SiteCredit } from '@/components/site-credit';
import './globals.css';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
                <noscript><style>{`.fade-up, .reveal, .reveal-fade, .reveal-left, .reveal-right, [data-scroll-reveal] { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }`}</style></noscript>
				<Providers>
					<SearchParamsProvider>
						<AppShell>{children}</AppShell>
					</SearchParamsProvider>
				</Providers>
                <SiteCredit />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c') }} />
			</body>
		</html>
	);
}
