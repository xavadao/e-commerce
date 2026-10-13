'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from '@/lib/router-compat';
import { products } from '../data/products';
import type { Product } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

type Category = 'all' | Product['category'];
type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

function useInView(threshold = 0.1) {
	const ref = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
			{ threshold }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [threshold]);
	return { ref, inView };
}

function ProductCard({ product, index }: { product: Product; index: number }) {
	const [hovered, setHovered] = useState(false);
	const { toggle, isWishlisted } = useWishlist();
	const wishlisted = isWishlisted(product.id);
	const { ref, inView } = useInView();

	return (
		<div
			ref={ref}
			className="group"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				opacity: inView ? 1 : 0,
				transform: inView ? 'translateY(0)' : 'translateY(24px)',
				transition: `opacity 700ms cubic-bezier(0.25,0.1,0.25,1) ${(index % 4) * 80}ms, transform 700ms cubic-bezier(0.25,0.1,0.25,1) ${(index % 4) * 80}ms`,
			}}
		>
			<div className="relative overflow-hidden bg-muted aspect-[3/4] mb-4">
				<Link to={`/product/${product.id}`}>
					<img
						src={product.images[0]}
						alt={product.name}
						className="w-full h-full object-cover transition-transform duration-700"
						style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
					/>
					<img
						src={product.hoverImage}
						alt={product.name}
						className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
						style={{ opacity: hovered ? 1 : 0 }}
					/>
				</Link>

				{/* Badges */}
				<div className="absolute top-3 left-3 flex flex-col gap-1.5">
					{product.new && (
						<span className="bg-background text-foreground text-[9px] font-sans font-medium tracking-widest uppercase px-2 py-1">New</span>
					)}
				</div>

				{/* Wishlist */}
				<button
					onClick={() => toggle(product.id)}
					className="absolute top-3 right-3 w-8 h-8 bg-background/80 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
					aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="text-foreground">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
					</svg>
				</button>

				{/* Quick view */}
				<div
					className="absolute bottom-0 left-0 right-0 bg-background/95 py-3 px-4 transition-transform duration-400"
					style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)' }}
				>
					<Link
						to={`/product/${product.id}`}
						className="block text-center text-subheading text-foreground hover:opacity-60 transition-opacity duration-300"
					>
						View Piece
					</Link>
				</div>
			</div>

			<Link to={`/product/${product.id}`}>
				<h3 className="font-serif text-base leading-tight hover:opacity-60 transition-opacity duration-300">{product.name}</h3>
			</Link>
			<p className="text-sm text-muted-foreground font-sans mt-1">€{product.price.toLocaleString()}</p>
		</div>
	);
}

// Editorial break card
function EditorialBreak({ index }: { index: number }) {
	const editorials = [
		{
			image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
			label: 'The Edit',
			title: 'Autumn Essentials',
		},
		{
			image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80',
			label: 'Style Notes',
			title: 'How to Layer',
		},
	];
	const ed = editorials[index % editorials.length];
	return (
		<div className="relative overflow-hidden bg-muted aspect-[3/4] group cursor-pointer">
			<img
				src={ed.image}
				alt={ed.title}
				className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
			<div className="absolute bottom-6 left-6 right-6">
				<p className="text-subheading text-white/60 mb-2">{ed.label}</p>
				<h3 className="font-serif text-2xl text-white leading-tight">{ed.title}</h3>
			</div>
		</div>
	);
}

export default function ShopPage() {
	const [searchParams] = useSearchParams();
	const [activeCategory, setActiveCategory] = useState<Category>('all');
	const [sortBy, setSortBy] = useState<SortOption>('featured');

	// Read category from URL
	useEffect(() => {
		const cat = searchParams.get('category');
		if (cat === 'ready-to-wear' || cat === 'accessories' || cat === 'outerwear') {
			setActiveCategory(cat);
		}
	}, [searchParams]);

	const categories: { value: Category; label: string }[] = [
		{ value: 'all', label: 'All' },
		{ value: 'ready-to-wear', label: 'Ready-to-Wear' },
		{ value: 'outerwear', label: 'Outerwear' },
		{ value: 'accessories', label: 'Accessories' },
	];

	const filtered = products
		.filter(p => activeCategory === 'all' || p.category === activeCategory)
		.sort((a, b) => {
			if (sortBy === 'price-asc') return a.price - b.price;
			if (sortBy === 'price-desc') return b.price - a.price;
			if (sortBy === 'newest') return (b.new ? 1 : 0) - (a.new ? 1 : 0);
			return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
		});

	// Insert editorial breaks at positions 4 and 9
	const gridItems: Array<{ type: 'product'; product: Product; index: number } | { type: 'editorial'; editorialIndex: number }> = [];
	let editorialCount = 0;
	filtered.forEach((product, i) => {
		if (i === 4 || i === 9) {
			gridItems.push({ type: 'editorial', editorialIndex: editorialCount++ });
		}
		gridItems.push({ type: 'product', product, index: i });
	});

	return (
		<div className="min-h-screen bg-background">
			{/* Page header */}
			<div className="pt-32 pb-12 px-6 md:px-10 border-b border-border">
				<div className="max-w-7xl mx-auto">
					<p className="text-subheading text-muted-foreground mb-3">Autumn / Winter 2024</p>
					<div className="flex items-end justify-between gap-6">
						<h1 className="text-headline text-foreground">
							{activeCategory === 'all' ? 'The Collection' :
								activeCategory === 'ready-to-wear' ? 'Ready-to-Wear' :
								activeCategory === 'outerwear' ? 'Outerwear' : 'Accessories'}
						</h1>
						<p className="text-muted-foreground font-sans text-sm hidden md:block">
							{filtered.length} pieces
						</p>
					</div>
				</div>
			</div>

			{/* Filters bar */}
			<div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
				<div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
					{/* Category filters */}
					<div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
						{categories.map(cat => (
							<button
								key={cat.value}
								onClick={() => setActiveCategory(cat.value)}
								className={`px-4 py-2 text-subheading whitespace-nowrap transition-all duration-300 ${
									activeCategory === cat.value
										? 'bg-foreground text-background'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								{cat.label}
							</button>
						))}
					</div>

					{/* Sort */}
					<div className="flex items-center gap-3 flex-shrink-0">
						<span className="text-subheading text-muted-foreground hidden md:block">Sort</span>
						<select
							value={sortBy}
							onChange={e => setSortBy((e.target as HTMLSelectElement).value as SortOption)}
							className="bg-transparent text-subheading text-foreground border-none outline-none cursor-pointer"
						>
							<option value="featured">Featured</option>
							<option value="newest">Newest</option>
							<option value="price-asc">Price: Low–High</option>
							<option value="price-desc">Price: High–Low</option>
						</select>
					</div>
				</div>
			</div>

			{/* Product grid */}
			<div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
					{gridItems.map((item, i) =>
						item.type === 'product' ? (
							<ProductCard key={item.product.id} product={item.product} index={item.index} />
						) : (
							<div key={`editorial-${i}`} className="hidden md:block">
								<EditorialBreak index={item.editorialIndex} />
							</div>
						)
					)}
				</div>

				{filtered.length === 0 && (
					<div className="text-center py-24">
						<p className="font-serif text-2xl text-foreground">No pieces found</p>
						<button
							onClick={() => setActiveCategory('all')}
							className="mt-6 text-subheading text-muted-foreground border-b border-muted-foreground pb-0.5 hover:text-foreground hover:border-foreground transition-all duration-300"
						>
							View All
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
