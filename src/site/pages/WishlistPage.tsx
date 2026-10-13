'use client';

import { Link } from '@/lib/router-compat';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function WishlistPage() {
	const { items, toggle } = useWishlist();
	const { addItem } = useCart();
	const [addedId, setAddedId] = useState<string | null>(null);

	const wishlistProducts = products.filter(p => items.includes(p.id));

	const handleAddToCart = (productId: string) => {
		const product = products.find(p => p.id === productId);
		if (!product) return;
		addItem(product, product.sizes[0], product.colors[0].name);
		setAddedId(productId);
		setTimeout(() => setAddedId(null), 2000);
	};

	return (
		<div className="min-h-screen pt-32 pb-24 px-6 md:px-10">
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<div className="mb-16">
					<p className="text-subheading text-muted-foreground mb-3">Your</p>
					<h1 className="text-headline text-foreground">Wishlist</h1>
					{wishlistProducts.length > 0 && (
						<p className="text-muted-foreground font-sans mt-3">
							{wishlistProducts.length} {wishlistProducts.length === 1 ? 'piece' : 'pieces'} saved
						</p>
					)}
				</div>

				{wishlistProducts.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground">
							<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
						</svg>
						<div>
							<p className="font-serif text-2xl text-foreground">Nothing saved yet</p>
							<p className="text-muted-foreground font-sans mt-2">Heart pieces you love to save them here</p>
						</div>
						<Link
							to="/shop"
							className="text-subheading text-foreground border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity duration-300"
						>
							Explore the Collection
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
						{wishlistProducts.map(product => (
							<div key={product.id} className="group">
								{/* Image */}
								<div className="relative overflow-hidden bg-muted aspect-[3/4] mb-4">
									<Link to={`/product/${product.id}`}>
										<img
											src={product.images[0]}
											alt={product.name}
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<img
											src={product.hoverImage}
											alt={product.name}
											className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
										/>
									</Link>
									{/* Remove from wishlist */}
									<button
										onClick={() => toggle(product.id)}
										className="absolute top-3 right-3 w-8 h-8 bg-background/90 flex items-center justify-center transition-opacity duration-300 hover:opacity-70"
										aria-label="Remove from wishlist"
									>
										<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-foreground">
											<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
										</svg>
									</button>
								</div>

								{/* Info */}
								<Link to={`/product/${product.id}`}>
									<h3 className="font-serif text-base leading-tight hover:opacity-60 transition-opacity duration-300">
										{product.name}
									</h3>
								</Link>
								<p className="text-sm text-muted-foreground font-sans mt-1">
									€{product.price.toLocaleString()}
								</p>

								{/* Add to cart */}
								<button
									onClick={() => handleAddToCart(product.id)}
									className="mt-3 w-full py-2.5 border border-foreground text-subheading text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
								>
									{addedId === product.id ? 'Added' : 'Add to Bag'}
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
