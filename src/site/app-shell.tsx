'use client';

import type { ReactNode } from 'react';


import { Outlet, OutletProvider } from '@/lib/router-compat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Layout from './components/Layout';
// HomePage is eagerly imported — it's the first route, never lazy-load the initial page

// Secondary pages are lazy — loaded only when navigated to

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
		},
	},
});

// Invisible fallback — blank background, no shimmer flash, no skeleton swap
function PageFallback() {
	return <div className="min-h-screen bg-background" />;
}

// Root layout wrapper
function RootLayout() {
	return (
		<Layout>
			<Suspense fallback={<PageFallback />}>
				<Outlet />
			</Suspense>
		</Layout>
	);
}

export default function AppShell({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<CartProvider>
				<WishlistProvider>
					<OutletProvider outlet={children}><RootLayout /></OutletProvider>
				</WishlistProvider>
			</CartProvider>
		</QueryClientProvider>
	);
}
