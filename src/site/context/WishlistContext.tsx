'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextValue {
	items: string[]; // product IDs
	toggle: (productId: string) => void;
	isWishlisted: (productId: string) => boolean;
	count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<string[]>(() => {
		try {
			const stored = localStorage.getItem('maison-wishlist');
			return stored ? (JSON.parse(stored) as string[]) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem('maison-wishlist', JSON.stringify(items));
	}, [items]);

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
