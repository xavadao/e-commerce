'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { readStoredWishlist } from '../data/browser-storage';

interface WishlistContextValue {
	items: string[]; // product IDs
	toggle: (productId: string) => void;
	isWishlisted: (productId: string) => boolean;
	count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<string[]>([]);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		try {
			const stored = localStorage.getItem('maison-wishlist');
			setItems(readStoredWishlist(stored));
		} catch {
			// Restricted or invalid browser storage leaves the demo empty.
		}
		setHydrated(true);
	}, []);
	useEffect(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem('maison-wishlist', JSON.stringify(items));
		} catch {
			// Browser storage may be unavailable in private or restricted sessions.
		}
	}, [items, hydrated]);

	const toggle = (productId: string) => {
		setItems(prev =>
			prev.includes(productId)
				? prev.filter(id => id !== productId)
				: [...prev, productId]
		);
	};

	const isWishlisted = (productId: string) => items.includes(productId);

	return (
		<WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length }}>
			{children}
		</WishlistContext.Provider>
	);
}

export function useWishlist() {
	const ctx = useContext(WishlistContext);
	if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
	return ctx;
}
