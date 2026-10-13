'use client';

import { useEffect } from 'react';
import { Link } from '@/lib/router-compat';
import { useCart } from '../context/CartContext';

export default function Cart() {
	const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

	// Lock body scroll when cart is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	}, [isOpen]);

	return (
		<>
			{/* Backdrop */}
			<div
				onClick={closeCart}
				className={`fixed inset-0 z-[80] bg-foreground/30 backdrop-blur-[2px] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
			/>

			{/* Drawer */}
			<div
				className={`fixed top-0 right-0 bottom-0 z-[85] w-full max-w-md bg-background flex flex-col transition-transform duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
				style={{ transition: 'transform 700ms cubic-bezier(0.25,0.1,0.25,1)' }}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-8 py-6 border-b border-border">
					<div>
						<h2 className="font-serif text-xl tracking-tight">Your Bag</h2>
						{totalItems > 0 && (
							<p className="text-subheading text-muted-foreground mt-0.5">
								{totalItems} {totalItems === 1 ? 'piece' : 'pieces'}
							</p>
						)}
					</div>
					<button
						onClick={closeCart}
						className="text-foreground transition-opacity duration-300 hover:opacity-50"
						aria-label="Close cart"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				{/* Items */}
				<div className="flex-1 overflow-y-auto scrollbar-hide">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
							<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground">
								<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<path d="M16 10a4 4 0 0 1-8 0" />
							</svg>
							<div>
								<p className="font-serif text-xl text-foreground">Your bag is empty</p>
								<p className="text-sm text-muted-foreground mt-2 font-sans">Discover our latest collection</p>
							</div>
							<Link
								to="/shop"
								onClick={closeCart}
								className="text-subheading text-foreground border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity duration-300"
							>
								Explore the Collection
							</Link>
						</div>
					) : (
						<div className="divide-y divide-border">
							{items.map(item => (
								<div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-5 px-8 py-6">
									{/* Image */}
									<Link
										to={`/product/${item.product.id}`}
										onClick={closeCart}
										className="flex-shrink-0 w-20 h-28 overflow-hidden bg-muted"
									>
										<img
											src={item.product.images[0]}
											alt={item.product.name}
											className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
										/>
									</Link>

									{/* Details */}
									<div className="flex-1 min-w-0">
										<div className="flex justify-between items-start gap-2">
											<Link
												to={`/product/${item.product.id}`}
												onClick={closeCart}
												className="font-serif text-base leading-tight hover:opacity-60 transition-opacity duration-300"
											>
												{item.product.name}
											</Link>
											<button
												onClick={() => removeItem(item.product.id, item.size, item.color)}
												className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-300 mt-0.5"
												aria-label="Remove item"
											>
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
													<line x1="18" y1="6" x2="6" y2="18" />
													<line x1="6" y1="6" x2="18" y2="18" />
												</svg>
											</button>
										</div>

										<div className="mt-2 flex gap-3 text-xs text-muted-foreground font-sans tracking-wide">
											<span>{item.size}</span>
											<span>·</span>
											<span>{item.color}</span>
										</div>

										<div className="mt-4 flex items-center justify-between">
											{/* Quantity */}
											<div className="flex items-center gap-3 border border-border">
												<button
													onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
													className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200 text-sm"
												>
													−
												</button>
												<span className="text-sm font-sans w-4 text-center">{item.quantity}</span>
												<button
													onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
													className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200 text-sm"
												>
													+
												</button>
											</div>

											{/* Price */}
											<span className="font-sans text-sm text-foreground">
												€{(item.product.price * item.quantity).toLocaleString()}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				{items.length > 0 && (
					<div className="border-t border-border px-8 py-6 space-y-4">
						{/* Subtotal */}
						<div className="flex justify-between items-baseline">
							<span className="text-subheading text-muted-foreground">Subtotal</span>
							<span className="font-serif text-xl">€{subtotal.toLocaleString()}</span>
						</div>
						<p className="text-xs text-muted-foreground font-sans">
							Shipping and taxes calculated at checkout
						</p>

						{/* Checkout CTA */}
						<Link
							to="/checkout"
							onClick={closeCart}
							className="block w-full bg-foreground text-background text-center py-4 text-subheading tracking-widest hover:opacity-80 transition-opacity duration-300"
						>
							Proceed to Checkout
						</Link>

						{/* Continue shopping */}
						<button
							onClick={closeCart}
							className="block w-full text-center text-subheading text-muted-foreground hover:text-foreground transition-colors duration-300 py-1"
						>
							Continue Shopping
						</button>
					</div>
				)}
			</div>
		</>
	);
}
