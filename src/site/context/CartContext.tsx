'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
	product: Product;
	size: string;
	color: string;
	quantity: number;
}

interface CartContextValue {
	items: CartItem[];
	isOpen: boolean;
	openCart: () => void;
	closeCart: () => void;
	addItem: (product: Product, size: string, color: string) => void;
	removeItem: (productId: string, size: string, color: string) => void;
	updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
	clearCart: () => void;
	totalItems: number;
	subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>(() => {
		try {
			const stored = localStorage.getItem('maison-cart');
			return stored ? (JSON.parse(stored) as CartItem[]) : [];
		} catch {
			return [];
		}
	});
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem('maison-cart', JSON.stringify(items));
	}, [items]);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	const addItem = (product: Product, size: string, color: string) => {
		setItems(prev => {
			const existing = prev.find(
				i => i.product.id === product.id && i.size === size && i.color === color
			);
			if (existing) {
				return prev.map(i =>
					i.product.id === product.id && i.size === size && i.color === color
						? { ...i, quantity: i.quantity + 1 }
						: i
				);
			}
			return [...prev, { product, size, color, quantity: 1 }];
		});
		setIsOpen(true);
	};

	const removeItem = (productId: string, size: string, color: string) => {
		setItems(prev =>
			prev.filter(
				i => !(i.product.id === productId && i.size === size && i.color === color)
			)
		);
	};

	const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
		if (quantity <= 0) {
			removeItem(productId, size, color);
			return;
		}
		setItems(prev =>
			prev.map(i =>
				i.product.id === productId && i.size === size && i.color === color
					? { ...i, quantity }
					: i
			)
		);
	};

	const clearCart = () => setItems([]);

	const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
	const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				items,
				isOpen,
				openCart,
				closeCart,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
				totalItems,
				subtotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within CartProvider');
	return ctx;
}
