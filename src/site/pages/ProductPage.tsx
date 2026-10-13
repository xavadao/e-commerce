'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from '@/lib/router-compat';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const product = id ? getProductById(id) : undefined;
	const related = id ? getRelatedProducts(id, 4) : [];

	const { addItem } = useCart();
	const { toggle, isWishlisted } = useWishlist();

	const [selectedSize, setSelectedSize] = useState('');
	const [selectedColor, setSelectedColor] = useState('');
	const [activeImage, setActiveImage] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [addedToCart, setAddedToCart] = useState(false);
	const [sizeError, setSizeError] = useState(false);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [careOpen, setCareOpen] = useState(false);

	useEffect(() => {
		if (product) {
			setSelectedColor(product.colors[0].name);
			setSelectedSize('');
			setActiveImage(0);
			setAddedToCart(false);
		}
	}, [product?.id]);

	if (!product) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
				<p className="font-serif text-2xl text-foreground">Piece not found</p>
				<Link to="/shop" className="text-subheading text-muted-foreground border-b border-muted-foreground pb-0.5 hover:text-foreground hover:border-foreground transition-all duration-300">
					Return to Shop
				</Link>
			</div>
		);
	}

	const wishlisted = isWishlisted(product.id);

	const handleAddToCart = () => {
		if (!selectedSize) {
			setSizeError(true);
			setTimeout(() => setSizeError(false), 2000);
			return;
		}
		addItem(product, selectedSize, selectedColor);
		setAddedToCart(true);
		setTimeout(() => setAddedToCart(false), 2500);
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Breadcrumb */}
			<div className="pt-24 md:pt-28 px-6 md:px-10 pb-6">
				<div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-sans text-muted-foreground">
					<Link to="/" className="hover:text-foreground transition-colors duration-300">Home</Link>
					<span>/</span>
					<Link to="/shop" className="hover:text-foreground transition-colors duration-300">Shop</Link>
					<span>/</span>
					<span className="text-foreground">{product.name}</span>
				</div>
			</div>

			{/* Main product layout */}
			<div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">
					{/* ─── IMAGE GALLERY ─── */}
					<div className="space-y-3">
						{/* Main image */}
						<div
							className="relative overflow-hidden bg-muted aspect-[4/5] cursor-zoom-in"
							onClick={() => setLightboxOpen(true)}
						>
							<img
								src={product.images[activeImage]}
								alt={product.name}
								className="w-full h-full object-cover transition-opacity duration-500"
							/>
							{/* Expand icon */}
							<div className="absolute bottom-4 right-4 w-8 h-8 bg-background/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
									<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
								</svg>
							</div>
						</div>

						{/* Thumbnail strip */}
						{product.images.length > 1 && (
							<div className="flex gap-2">
								{product.images.map((img, i) => (
									<button
										key={i}
										onClick={() => setActiveImage(i)}
										className={`flex-1 aspect-[4/5] overflow-hidden bg-muted transition-all duration-300 ${activeImage === i ? 'ring-1 ring-foreground' : 'opacity-60 hover:opacity-100'}`}
									>
										<img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
									</button>
								))}
							</div>
						)}
					</div>

					{/* ─── PRODUCT INFO (sticky) ─── */}
					<div className="lg:sticky lg:top-28 lg:self-start space-y-8">
						{/* Header */}
						<div>
							<p className="text-subheading text-muted-foreground mb-2">{product.collection}</p>
							<div className="flex items-start justify-between gap-4">
								<h1 className="font-serif text-3xl md:text-4xl leading-tight">{product.name}</h1>
								<button
									onClick={() => toggle(product.id)}
									className="flex-shrink-0 mt-1 transition-opacity duration-300 hover:opacity-60"
									aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
								>
									<svg width="22" height="22" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="text-foreground">
										<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
									</svg>
								</button>
							</div>
							<p className="font-serif text-2xl mt-3">€{product.price.toLocaleString()}</p>
						</div>

						{/* Description */}
						<p className="text-muted-foreground font-sans font-light leading-relaxed">
							{product.description}
						</p>

						{/* Color selector */}
						<div>
							<div className="flex items-center justify-between mb-3">
								<span className="text-subheading text-foreground">Colour</span>
								<span className="text-sm font-sans text-muted-foreground">{selectedColor}</span>
							</div>
							<div className="flex gap-2">
								{product.colors.map(color => (
									<button
										key={color.name}
										onClick={() => setSelectedColor(color.name)}
										title={color.name}
										className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${selectedColor === color.name ? 'border-foreground scale-110' : 'border-transparent hover:border-muted-foreground'}`}
										style={{ backgroundColor: color.hex }}
									/>
								))}
							</div>
						</div>

						{/* Size selector */}
						<div>
							<div className="flex items-center justify-between mb-3">
								<span className={`text-subheading ${sizeError ? 'text-destructive' : 'text-foreground'}`}>
									{sizeError ? 'Please select a size' : 'Size'}
								</span>
								<Link
									to="/about?tab=size-guide"
									className="text-xs font-sans text-muted-foreground border-b border-muted-foreground pb-0.5 hover:text-foreground hover:border-foreground transition-all duration-300"
								>
									Size Guide
								</Link>
							</div>
							<div className="flex flex-wrap gap-2">
								{product.sizes.map(size => (
									<button
										key={size}
										onClick={() => { setSelectedSize(size); setSizeError(false); }}
										className={`min-w-[3rem] px-3 py-2.5 border text-sm font-sans transition-all duration-300 ${
											selectedSize === size
												? 'border-foreground bg-foreground text-background'
												: 'border-border text-foreground hover:border-foreground'
										}`}
									>
										{size}
									</button>
								))}
							</div>
						</div>

						{/* Add to cart */}
						<div className="space-y-3">
							<button
								onClick={handleAddToCart}
								className={`w-full py-4 text-subheading tracking-widest transition-all duration-300 ${
									addedToCart
										? 'bg-muted text-muted-foreground'
										: 'bg-foreground text-background hover:opacity-80'
								}`}
							>
								{addedToCart ? 'Added to Bag ✓' : 'Add to Bag'}
							</button>
							<button
								onClick={() => toggle(product.id)}
								className="w-full py-4 border border-border text-subheading text-foreground hover:bg-muted transition-all duration-300"
							>
								{wishlisted ? 'Saved to Wishlist ♥' : 'Save to Wishlist'}
							</button>
						</div>

						{/* Shipping note */}
						<p className="text-xs font-sans text-muted-foreground flex items-center gap-2">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
							Complimentary shipping on all orders. Free returns within 30 days.
						</p>

						{/* Accordion: Story */}
						<div className="border-t border-border pt-6">
							<p className="text-subheading text-muted-foreground mb-4">The Story</p>
							<p className="text-muted-foreground font-sans font-light leading-relaxed text-sm">
								{product.story}
							</p>
						</div>

						{/* Accordion: Details */}
						<div className="border-t border-border">
							<button
								onClick={() => setDetailsOpen(!detailsOpen)}
								className="w-full flex items-center justify-between py-5 text-left"
							>
								<span className="text-subheading text-foreground">Fabric & Details</span>
								<svg
									width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
									className="transition-transform duration-300"
									style={{ transform: detailsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
								>
									<path d="M6 9l6 6 6-6" />
								</svg>
							</button>
							<div
								className="overflow-hidden transition-all duration-500"
								style={{ maxHeight: detailsOpen ? '200px' : '0px' }}
							>
								<p className="text-muted-foreground font-sans font-light text-sm pb-5 leading-relaxed">
									{product.fabric}
								</p>
							</div>
						</div>

						{/* Accordion: Care */}
						<div className="border-t border-border">
							<button
								onClick={() => setCareOpen(!careOpen)}
								className="w-full flex items-center justify-between py-5 text-left"
							>
								<span className="text-subheading text-foreground">Care Instructions</span>
								<svg
									width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
									className="transition-transform duration-300"
									style={{ transform: careOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
								>
									<path d="M6 9l6 6 6-6" />
								</svg>
							</button>
							<div
								className="overflow-hidden transition-all duration-500"
								style={{ maxHeight: careOpen ? '200px' : '0px' }}
							>
								<p className="text-muted-foreground font-sans font-light text-sm pb-5 leading-relaxed">
									{product.care}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ─── RELATED PRODUCTS ─── */}
			{related.length > 0 && (
				<section className="border-t border-border px-6 md:px-10 py-20 md:py-24">
					<div className="max-w-7xl mx-auto">
						<div className="flex items-end justify-between mb-12">
							<div>
								<p className="text-subheading text-muted-foreground mb-2">You Might Also Like</p>
								<h2 className="font-serif text-3xl md:text-4xl">Complete the Look</h2>
							</div>
							<Link
								to="/shop"
								className="text-subheading text-muted-foreground border-b border-muted-foreground pb-0.5 hover:text-foreground hover:border-foreground transition-all duration-300 hidden md:block"
							>
								View All
							</Link>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
							{related.map(p => (
								<div key={p.id} className="group">
									<div className="relative overflow-hidden bg-muted aspect-[3/4] mb-4">
										<Link to={`/product/${p.id}`}>
											<img
												src={p.images[0]}
												alt={p.name}
												className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
											/>
										</Link>
									</div>
									<Link to={`/product/${p.id}`}>
										<h3 className="font-serif text-base leading-tight hover:opacity-60 transition-opacity duration-300">{p.name}</h3>
									</Link>
									<p className="text-sm text-muted-foreground font-sans mt-1">€{p.price.toLocaleString()}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* ─── LIGHTBOX ─── */}
			{lightboxOpen && (
				<div
					className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
					onClick={() => setLightboxOpen(false)}
				>
					<button
						className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors duration-300"
						onClick={() => setLightboxOpen(false)}
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
					<img
						src={product.images[activeImage]}
						alt={product.name}
						className="max-h-[90vh] max-w-[90vw] object-contain"
						onClick={e => e.stopPropagation()}
					/>
					{/* Prev/Next */}
					{product.images.length > 1 && (
						<>
							<button
								className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300"
								onClick={e => { e.stopPropagation(); setActiveImage(i => (i - 1 + product.images.length) % product.images.length); }}
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
									<path d="M15 18l-6-6 6-6" />
								</svg>
							</button>
							<button
								className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300"
								onClick={e => { e.stopPropagation(); setActiveImage(i => (i + 1) % product.images.length); }}
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
									<path d="M9 18l6-6-6-6" />
								</svg>
							</button>
						</>
					)}
				</div>
			)}
		</div>
	);
}
