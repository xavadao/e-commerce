'use client';

import { ReactNode, useEffect } from 'react';
import { useLocation } from '@/lib/router-compat';
import Navigation from './Navigation';
import Cart from './Cart';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const { pathname } = useLocation();

	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });
	}, [pathname]);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navigation />
			<main>
				{children}
			</main>
			<Cart />
		</div>
	);
}
