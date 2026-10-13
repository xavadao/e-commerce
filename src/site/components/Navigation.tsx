'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from '@/lib/router-compat';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';

export default function Navigation() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [scrolled, setScrolled] = useState(false);
	const { totalItems, openCart } = useCart();
	const { count: wishlistCount } = useWishlist();
	const location = useLocation();
	const navigate = useNavigate();
	const searchRef = useRef<HTMLInputElement>(null);

	const isHome = location.pathname === '/';

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		setMenuOpen(false);
		setSearchOpen(false);
		setSearchQuery('');
	}, [location.pathname]);

	useEffect(() => {
		if (menuOpen || searchOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	}, [menuOpen, searchOpen]);

	useEffect(() => {
		if (searchOpen && searchRef.current) {
			setTimeout(() => searchRef.current?.focus(), 300);
		}
	}, [searchOpen]);

	const searchResults = searchQuery.length > 1
		? products.filter(p =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
		).slice(0, 5)
		: [];

	const navLinks = [
		{ label: 'Shop', href: '/shop' },
		{ label: 'Collections', href: '/shop?collection=aw24' },
		{ label: 'Editorial', href: '/editorial' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/about?tab=contact' },
	];

	// On home page, nav is transparent until scrolled; on other pages always solid
	const navBg = isHome
		? scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
		: 'bg-background/95 backdrop-blur-sm border-b border-border';

	const textColor = isHome && !scrolled ? 'text-white' : 'text-foreground';

	return (
		<>
			{/* Main Navigation */}
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
				style={{ transition: 'background 500ms cubic-bezier(0.25,0.1,0.25,1), border-color 500ms' }}
			>
				<div className="flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
					{/* Left: Menu toggle */}
					<button
						onClick={() => setMenuOpen(true)}
						className={`flex flex-col gap-1.5 w-8 group transition-opacity duration-300 ${textColor}`}
						aria-label="Open menu"
					>
						<span className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-8" />
						<span className="block h-px w-8 bg-current" />
						<span className="block h-px w-4 bg-current transition-all duration-300 group-hover:w-8" />
					</button>

					{/* Center: Logo */}
					<Link
						to="/"
						className={`absolute left-1/2 -translate-x-1/2 font-serif text-xl md:text-2xl tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-70 ${textColor}`}
					>
						Maison
					</Link>

					{/* Right: Icons */}
					<div className={`flex items-center gap-4 md:gap-6 ${textColor}`}>
						{/* Search */}
						<button
							onClick={() => setSearchOpen(true)}
							className="transition-opacity duration-300 hover:opacity-60"
							aria-label="Search"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" />
							</svg>
						</button>

						{/* Wishlist */}
						<Link
							to="/wishlist"
							className="relative transition-opacity duration-300 hover:opacity-60"
							aria-label={`Wishlist (${wishlistCount})`}
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
							</svg>
							{wishlistCount > 0 && (
								<span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-[9px] font-medium flex items-center justify-center rounded-full">
									{wishlistCount}
								</span>
							)}
						</Link>

						{/* Cart */}
						<button
							onClick={openCart}
							className="relative transition-opacity duration-300 hover:opacity-60"
							aria-label={`Cart (${totalItems})`}
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<path d="M16 10a4 4 0 0 1-8 0" />
							</svg>
							{totalItems > 0 && (
								<span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-[9px] font-medium flex items-center justify-center rounded-full">
									{totalItems}
								</span>
							)}
						</button>
					</div>
				</div>
			</nav>

			{/* Fullscreen Menu Overlay */}
			<div
				className={`fixed inset-0 z-[100] bg-foreground transition-all duration-700 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
				style={{ transition: 'opacity 700ms cubic-bezier(0.25,0.1,0.25,1)' }}
			>
				<div className="flex flex-col h-full px-10 md:px-20 py-8">
					{/* Close button */}
					<div className="flex justify-between items-center">
						<Link
							to="/"
							className="font-serif text-xl md:text-2xl tracking-[0.25em] uppercase text-background"
						>
							Maison
						</Link>
						<button
							onClick={() => setMenuOpen(false)}
							className="text-background transition-opacity duration-300 hover:opacity-60"
							aria-label="Close menu"
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>

					{/* Nav links */}
					<nav className="flex-1 flex flex-col justify-center gap-2 md:gap-4">
						{navLinks.map((link, i) => (
							<Link
								key={link.href}
								to={link.href}
								onClick={() => setMenuOpen(false)}
								className="group flex items-baseline gap-4 text-background transition-opacity duration-300 hover:opacity-50"
								style={{
									transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms',
									transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
									opacity: menuOpen ? 1 : 0,
									transition: `opacity 600ms cubic-bezier(0.25,0.1,0.25,1) ${i * 60 + 100}ms, transform 600ms cubic-bezier(0.25,0.1,0.25,1) ${i * 60 + 100}ms`,
								}}
							>
								<span className="text-secondary text-xs font-sans tracking-widest">0{i + 1}</span>
								<span className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight">
									{link.label}
								</span>
							</Link>
						))}
					</nav>

					{/* Footer row */}
					<div className="flex items-end justify-between text-background/50 text-xs tracking-widest uppercase font-sans">
						<span>Autumn / Winter 2024</span>
						<div className="flex gap-6">
							<a href="#" className="hover:text-background transition-colors duration-300">Instagram</a>
							<a href="#" className="hover:text-background transition-colors duration-300">Pinterest</a>
						</div>
					</div>
				</div>
			</div>

			{/* Search Overlay */}
			<div
				className={`fixed inset-0 z-[90] bg-background/98 backdrop-blur-sm transition-all duration-500 ${searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
			>
				<div className="flex flex-col h-full">
					{/* Search header */}
					<div className="flex items-center justify-between px-6 md:px-10 h-16 md:h-20 border-b border-border">
						<span className="text-subheading text-muted-foreground">Search</span>
						<button
							onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
							className="text-foreground transition-opacity duration-300 hover:opacity-60"
							aria-label="Close search"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>

					{/* Search input */}
					<div className="px-6 md:px-10 pt-12 pb-8 border-b border-border">
						<input
							ref={searchRef}
							type="text"
							value={searchQuery}
							onChange={e => setSearchQuery((e.target as HTMLInputElement).value)}
							placeholder="Search pieces, collections..."
							className="w-full bg-transparent font-serif text-3xl md:text-5xl text-foreground placeholder:text-muted-foreground/40 outline-none border-none"
						/>
					</div>

					{/* Search results */}
					<div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
						{searchQuery.length > 1 && searchResults.length === 0 && (
							<p className="text-muted-foreground text-sm font-sans">No results for "{searchQuery}"</p>
						)}
						{searchResults.map(product => (
							<button
								key={product.id}
								onClick={() => {
									navigate(`/product/${product.id}`);
									setSearchOpen(false);
									setSearchQuery('');
								}}
								className="flex items-center gap-6 w-full py-4 border-b border-border group hover:opacity-70 transition-opacity duration-300 text-left"
							>
								<div className="w-16 h-20 overflow-hidden bg-muted flex-shrink-0">
									<img
										src={product.images[0]}
										alt={product.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
								<div>
									<p className="font-serif text-lg text-foreground">{product.name}</p>
									<p className="text-subheading text-muted-foreground mt-1">{product.category}</p>
									<p className="text-sm text-foreground mt-1">€{product.price.toLocaleString()}</p>
								</div>
							</button>
						))}
						{searchQuery.length <= 1 && (
							<div>
								<p className="text-subheading text-muted-foreground mb-6">Popular searches</p>
								<div className="flex flex-wrap gap-3">
									{['Silk', 'Cashmere', 'Outerwear', 'Accessories', 'New Arrivals'].map(term => (
										<button
											key={term}
											onClick={() => setSearchQuery(term)}
											className="px-4 py-2 border border-border text-sm font-sans text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
										>
											{term}
										</button>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
