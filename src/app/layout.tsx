import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import { Providers } from '@/components/providers';
import AppShell from '@/site/app-shell';
import './globals.css';

export const metadata: Metadata = {
	title: "MAISON — Luxury Editorial Fashion",
	description: "",
	icons: {
		icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
		shortcut: ['/favicon.svg'],
	},
};

// useSearchParams in a client page needs a Suspense boundary under the App Router.
export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Suspense fallback={null}>
						<AppShell>{children}</AppShell>
					</Suspense>
				</Providers>
			</body>
		</html>
	);
}
