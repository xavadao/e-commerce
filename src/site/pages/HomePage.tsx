'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '@/lib/router-compat';
import { getFeaturedProducts, getNewArrivals, products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

// Intersection observer hook for scroll animations
function useInView(threshold = 0.15) {
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

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
	const { ref, inView } = useInView();
	return (
		<div
			ref={ref}
			data-scroll-reveal
			className={className}
			style={{
				opacity: inView ? 1 : 0,
				transform: inView ? 'translateY(0)' : 'translateY(32px)',
				transition: `opacity 800ms cubic-bezier(0.25,0.1,0.25,1) ${delay}ms, transform 800ms cubic-bezier(0.25,0.1,0.25,1) ${delay}ms`,
			}}
		>
			{children}
		</div>
	);
}

function ProductCard({ product }: { product: ReturnType<typeof getFeaturedProducts>[0] }) {
	const [hovered, setHovered] = useState(false);
	const { toggle, isWishlisted } = useWishlist();
	const wishlisted = isWishlisted(product.id);

	return (
		<div
			className="group"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Image container */}
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
						<span className="bg-background text-foreground text-[9px] font-sans font-medium tracking-widest uppercase px-2 py-1">
							New
						</span>
					)}
				</div>

				{/* Wishlist */}
				<button
					onClick={() => toggle(product.id)}
					className="absolute top-3 right-3 w-8 h-8 bg-background/80 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-background"
					aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="text-foreground">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
					</svg>
				</button>

				{/* Quick shop overlay */}
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

			{/* Product info */}
			<Link to={`/product/${product.id}`}>
				<h3 className="font-serif text-base leading-tight hover:opacity-60 transition-opacity duration-300">
					{product.name}
				</h3>
			</Link>
			<p className="text-sm text-muted-foreground font-sans mt-1">
				€{product.price.toLocaleString()}
			</p>
		</div>
	);
}

export default function HomePage() {
	const newArrivals = getNewArrivals();
	const [email, setEmail] = useState('');
	const [subscribed, setSubscribed] = useState(false);

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			setSubscribed(true);
			setEmail('');
		}
	};

	return (
		<div className="bg-background">
			{/* ─── HERO ─── */}
			<section className="relative h-screen min-h-[600px] overflow-hidden">
				{/* Background image — pure CSS zoom, no JS state */}
				<div className="absolute inset-0" style={{ animation: 'heroZoom 2400ms cubic-bezier(0.25,0.1,0.25,1) forwards', transformOrigin: 'center top' }}>
					<img
						src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85"
						alt="Maison AW24 Collection"
						className="w-full h-full object-cover"
						style={{ objectPosition: '50% 20%' }}
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
				</div>

				{/* Hero content — pure CSS fade+rise, no JS state */}
				<div className="relative h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-10">
					<div style={{ animation: 'heroContentIn 1000ms cubic-bezier(0.25,0.1,0.25,1) 300ms both' }}>
						<p className="text-subheading text-white/70 mb-4">Autumn / Winter 2024</p>
						<h1 className="text-display text-white max-w-3xl leading-none">
							The Art of<br />Restraint
						</h1>
						<p className="text-white/70 font-sans font-light text-lg mt-6 max-w-md">
							A collection defined by what is left unsaid. Precision, silence, and the quiet power of considered dressing.
						</p>
						<Link
							to="/shop"
							className="inline-block mt-10 bg-background text-foreground px-8 py-4 text-subheading tracking-widest hover:bg-background/90 transition-all duration-300"
						>
							Explore Collection
						</Link>
					</div>
				</div>

				{/* Scroll indicator */}
				<div
					className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
					style={{ animation: 'heroContentIn 1000ms cubic-bezier(0.25,0.1,0.25,1) 1200ms both' }}
				>
					<span className="text-white/50 text-[9px] tracking-[0.3em] uppercase font-sans">Scroll</span>
					<div className="w-px h-12 bg-white/30 relative overflow-hidden">
						<div className="absolute top-0 w-full bg-white/70" style={{ height: '40%', animation: 'scrollLine 1.5s ease-in-out infinite' }} />
					</div>
				</div>
			</section>

			{/* ─── MARQUEE ─── */}
			<div className="bg-foreground text-background py-4 overflow-hidden">
				<div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
					{Array(6).fill(null).map((_, i) => (
						<span key={i} className="text-subheading tracking-[0.3em] flex-shrink-0">
							Autumn / Winter 2024 &nbsp;·&nbsp; New Collection &nbsp;·&nbsp; Complimentary Shipping &nbsp;·&nbsp; Made in Europe
						</span>
					))}
				</div>
			</div>

			{/* ─── FEATURED COLLECTION BANNER ─── */}
			<AnimatedSection className="px-6 md:px-10 py-24 md:py-32">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-7xl mx-auto">
					<div className="order-2 md:order-1">
						<p className="text-subheading text-muted-foreground mb-4">Featured</p>
						<h2 className="text-headline text-foreground mb-6">
							Outerwear<br />Redefined
						</h2>
						<p className="text-muted-foreground font-sans font-light leading-relaxed max-w-sm">
							Our outerwear collection begins where convention ends. Each coat is a study in proportion, weight, and the transformative power of a single, considered garment.
						</p>
						<Link
							to="/shop?category=outerwear"
							className="inline-flex items-center gap-3 mt-8 text-subheading text-foreground border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity duration-300"
						>
							Shop Outerwear
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
					<div className="order-1 md:order-2 relative">
						<Link to="/shop?category=outerwear" className="block group/banner">
							<div className="aspect-[4/5] overflow-hidden bg-muted relative">
								<img
									src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85"
									alt="Outerwear Collection"
									className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover/banner:bg-black/25 transition-all duration-500 flex items-center justify-center">
									<span className="text-white text-subheading tracking-widest uppercase opacity-0 group-hover/banner:opacity-100 transition-opacity duration-300 border border-white/80 px-6 py-3">
										View Collection
									</span>
								</div>
							</div>
						</Link>
						{/* Floating price tag */}
						<div className="absolute -bottom-6 -left-6 bg-background border border-border p-5 hidden md:block">
							<p className="text-subheading text-muted-foreground">From</p>
							<p className="font-serif text-2xl mt-1">€1,890</p>
						</div>
					</div>
				</div>
			</AnimatedSection>

			{/* ─── EDITORIAL SPLIT ─── */}
			{/* ─── NEW ARRIVALS GRID ─── */}
			<section className="px-6 md:px-10 py-24 md:py-32">
				<div className="max-w-7xl mx-auto">
					<AnimatedSection className="flex items-end justify-between mb-12 md:mb-16">
						<div>
							<p className="text-subheading text-muted-foreground mb-3">Just In</p>
							<h2 className="text-headline text-foreground">New Arrivals</h2>
						</div>
						<Link
							to="/shop"
							className="text-subheading text-muted-foreground border-b border-muted-foreground pb-0.5 hover:text-foreground hover:border-foreground transition-all duration-300 hidden md:block"
						>
							View All
						</Link>
					</AnimatedSection>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
						{newArrivals.slice(0, 4).map((product, i) => (
							<AnimatedSection key={product.id} delay={i * 80}>
								<ProductCard product={product} />
							</AnimatedSection>
						))}
					</div>

					<div className="text-center mt-12 md:hidden">
						<Link
							to="/shop"
							className="text-subheading text-foreground border-b border-foreground pb-0.5"
						>
							View All
						</Link>
					</div>
				</div>
			</section>

			{/* ─── EDITORIAL SPLIT (Philosophy) ─── */}
			<section className="bg-foreground text-background py-24 md:py-32 px-6 md:px-10 overflow-hidden">
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
					<AnimatedSection>
						<div className="aspect-[3/4] overflow-hidden">
							<img
								src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85"
								alt="Philosophy"
								className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
							/>
						</div>
					</AnimatedSection>
					<AnimatedSection delay={200}>
						<p className="text-subheading text-background/50 mb-6">The Philosophy</p>
						<h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background leading-tight mb-8">
							"Dress for the<br />life you intend<br />to live."
						</h2>
						<p className="text-background/60 font-sans font-light leading-relaxed max-w-sm">
							Every piece in our collection is conceived with a single question: will this still feel right in ten years? We design for permanence, not for the moment.
						</p>
						<Link
							to="/about"
							className="inline-flex items-center gap-3 mt-10 text-subheading text-background border-b border-background/40 pb-0.5 hover:opacity-60 transition-opacity duration-300"
						>
							Read Our Story
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</Link>
					</AnimatedSection>
				</div>
			</section>

			{/* ─── EDITORIAL BLOCK ─── */}
			<AnimatedSection className="px-6 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32">
				<div className="max-w-7xl mx-auto">
					<div className="relative overflow-hidden aspect-[16/7] md:aspect-[16/6]">
						<img
							src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85"
							alt="Editorial"
							className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
						<div className="absolute inset-0 flex items-center px-10 md:px-16">
							<div>
								<p className="text-subheading text-white/60 mb-4">Editorial</p>
								<h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight max-w-lg">
									The Considered<br />Wardrobe
								</h2>
								<Link
									to="/shop"
									className="inline-flex items-center gap-3 mt-8 text-subheading text-white border-b border-white/50 pb-0.5 hover:opacity-70 transition-opacity duration-300"
								>
									Explore
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
										<path d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</AnimatedSection>

			{/* ─── ACCESSORIES HIGHLIGHT ─── */}
			<section className="bg-muted py-24 md:py-32 px-6 md:px-10">
				<div className="max-w-7xl mx-auto">
					<AnimatedSection className="mb-16">
						<p className="text-subheading text-muted-foreground mb-3">Complete the Look</p>
						<h2 className="text-headline text-foreground">Accessories</h2>
					</AnimatedSection>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
						{products.filter(p => p.category === 'accessories').slice(0, 3).map((product, i) => (
							<AnimatedSection key={product.id} delay={i * 100}>
								<div className="group">
									<div className="relative overflow-hidden bg-background aspect-square mb-5">
										<Link to={`/product/${product.id}`}>
											<img
												src={product.images[0]}
												alt={product.name}
												className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
											/>
										</Link>
									</div>
									<Link to={`/product/${product.id}`}>
										<h3 className="font-serif text-lg hover:opacity-60 transition-opacity duration-300">
											{product.name}
										</h3>
									</Link>
									<p className="text-muted-foreground font-sans text-sm mt-1">
										€{product.price.toLocaleString()}
									</p>
								</div>
							</AnimatedSection>
						))}
					</div>
				</div>
			</section>

			{/* ─── NEWSLETTER ─── */}
			<section className="py-24 md:py-32 px-6 md:px-10">
				<AnimatedSection className="max-w-2xl mx-auto text-center">
					<p className="text-subheading text-muted-foreground mb-4">Stay Informed</p>
					<h2 className="text-headline text-foreground mb-6">
						The Maison<br />Dispatch
					</h2>
					<p className="text-muted-foreground font-sans font-light leading-relaxed mb-10">
						Explore a preview of our newsletter signup. This demo does not create a subscription or send email.
					</p>
					{subscribed ? (
						<div className="py-4">
							<p className="font-serif text-xl text-foreground">Demo signup complete.</p>
							<p className="text-muted-foreground font-sans text-sm mt-2">No subscription was created or email sent.</p>
						</div>
					) : (
						<form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
							<input
								type="email"
								value={email}
								onChange={e => setEmail((e.target as HTMLInputElement).value)}
								placeholder="Your email address"
								required
								className="flex-1 bg-transparent border border-border px-5 py-4 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground transition-colors duration-300"
							/>
							<button
								type="submit"
								className="bg-foreground text-background px-8 py-4 text-subheading tracking-widest hover:opacity-80 transition-opacity duration-300 whitespace-nowrap"
							>
								Subscribe
							</button>
						</form>
					)}
				</AnimatedSection>
			</section>

			{/* ─── INSTAGRAM GALLERY ─── */}
			<section className="pb-24 md:pb-32 px-6 md:px-10">
				<AnimatedSection className="max-w-7xl mx-auto">
					<div className="flex items-center justify-between mb-10">
						<p className="text-subheading text-muted-foreground">@maisonofficial</p>
						<a href="#" className="text-subheading text-muted-foreground border-b border-muted-foreground pb-0.5 hover:text-foreground hover:border-foreground transition-all duration-300">
							Follow
						</a>
					</div>
					<div className="grid grid-cols-3 md:grid-cols-6 gap-2">
						{[
							'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
							'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
							'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
							'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&q=80',
							'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
							'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
						].map((src, i) => (
							<div key={i} className="aspect-square overflow-hidden bg-muted group cursor-pointer">
								<img
									src={src}
									alt={`Instagram ${i + 1}`}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
							</div>
						))}
					</div>
				</AnimatedSection>
			</section>

			{/* ─── FOOTER ─── */}
			<footer className="bg-foreground text-background py-16 md:py-20 px-6 md:px-10">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
						{/* Brand */}
						<div className="col-span-2 md:col-span-1">
							<Link to="/" className="font-serif text-2xl tracking-[0.25em] uppercase text-background">
								Maison
							</Link>
							<p className="text-background/50 font-sans text-sm font-light leading-relaxed mt-4 max-w-xs">
								A luxury fashion house dedicated to the art of considered dressing.
							</p>
						</div>

						{/* Shop */}
						<div>
							<p className="text-subheading text-background/40 mb-5">Shop</p>
							<ul className="space-y-3">
								{['New Arrivals', 'Ready-to-Wear', 'Outerwear', 'Accessories', 'Sale'].map(item => (
									<li key={item}>
										<Link to="/shop" className="text-background/70 font-sans text-sm hover:text-background transition-colors duration-300">
											{item}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Company */}
						<div>
							<p className="text-subheading text-background/40 mb-5">Company</p>
							<ul className="space-y-3">
								{[
									{ label: 'Our Story', href: '/about' },
									{ label: 'Editorial', href: '/editorial' },
									{ label: 'Sustainability', href: '/about' },
									{ label: 'Careers', href: '/about' },
									{ label: 'Press', href: '/about' },
								].map(item => (
									<li key={item.label}>
										<Link to={item.href} className="text-background/70 font-sans text-sm hover:text-background transition-colors duration-300">
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Help */}
						<div>
							<p className="text-subheading text-background/40 mb-5">Help</p>
							<ul className="space-y-3">
								{[
									{ label: 'Customer Service', href: '/about?tab=contact' },
									{ label: 'Size Guide', href: '/about?tab=size-guide' },
									{ label: 'Shipping & Returns', href: '/about' },
									{ label: 'Care Guide', href: '/about' },
								].map(item => (
									<li key={item.label}>
										<Link to={item.href} className="text-background/70 font-sans text-sm hover:text-background transition-colors duration-300">
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Bottom row */}
					<div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-background/30 font-sans text-xs">
							© 2024 Maison. All rights reserved.
						</p>
						<div className="flex gap-6">
							{['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
								<a key={item} href="#" className="text-background/30 font-sans text-xs hover:text-background/60 transition-colors duration-300">
									{item}
								</a>
							))}
						</div>
					</div>
				</div>
			</footer>

			{/* Keyframes */}
			<style>{`
				@keyframes marquee {
					from { transform: translateX(0); }
					to { transform: translateX(-50%); }
				}
				@keyframes scrollLine {
					0% { transform: translateY(-100%); }
					100% { transform: translateY(300%); }
				}
			`}</style>
		</div>
	);
}
