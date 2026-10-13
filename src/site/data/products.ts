export interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	category: 'ready-to-wear' | 'accessories' | 'outerwear';
	collection: string;
	description: string;
	story: string;
	fabric: string;
	care: string;
	sizes: string[];
	colors: { name: string; hex: string }[];
	images: string[];
	hoverImage: string;
	featured: boolean;
	new: boolean;
	tags: string[];
}

// Using Unsplash for high-quality fashion photography
export const products: Product[] = [
	{
		id: 'p001',
		name: 'Atelier Silk Slip Dress',
		price: 890,
		category: 'ready-to-wear',
		collection: 'Autumn / Winter 2024',
		description: 'A study in restraint. Cut from the finest Charmeuse silk, this slip dress moves with the body in a way that feels both effortless and considered.',
		story: 'Conceived in our Paris atelier during the early hours of a grey October morning, this piece embodies the quiet confidence of a woman who needs no embellishment. The bias cut — a technique mastered over decades — creates a silhouette that is simultaneously architectural and fluid.',
		fabric: '100% Charmeuse Silk. Dry clean only.',
		care: 'Dry clean recommended. Store flat or on a padded hanger.',
		sizes: ['XS', 'S', 'M', 'L'],
		colors: [
			{ name: 'Ivory', hex: '#F5F0E8' },
			{ name: 'Noir', hex: '#1A1A1A' },
			{ name: 'Blush', hex: '#D4A5A0' },
		],
		images: [
			'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
			'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
			'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
		featured: true,
		new: true,
		tags: ['silk', 'evening', 'minimal'],
	},
	{
		id: 'p002',
		name: 'Structured Wool Blazer',
		price: 1240,
		category: 'ready-to-wear',
		collection: 'Autumn / Winter 2024',
		description: 'Tailored in our Milan workshop from double-faced wool, this blazer redefines the boundaries between masculine structure and feminine grace.',
		story: 'The blazer has long been a symbol of authority. We reimagined it — softening the shoulder, elongating the lapel, and choosing a wool so fine it drapes rather than holds. The result is power, worn lightly.',
		fabric: '98% Merino Wool, 2% Cashmere. Dry clean only.',
		care: 'Dry clean only. Press with a damp cloth.',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		colors: [
			{ name: 'Chalk', hex: '#E8E4DC' },
			{ name: 'Camel', hex: '#C4A882' },
			{ name: 'Charcoal', hex: '#3D3D3D' },
		],
		images: [
			'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80',
			'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80',
			'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80',
		featured: true,
		new: false,
		tags: ['tailored', 'wool', 'classic'],
	},
	{
		id: 'p003',
		name: 'Cashmere Turtleneck',
		price: 620,
		category: 'ready-to-wear',
		collection: 'Autumn / Winter 2024',
		description: 'Spun from Grade-A Mongolian cashmere, this turtleneck is the foundation of every considered wardrobe.',
		story: 'There are garments that transcend season. This is one of them. Knitted in Scotland from the finest Mongolian cashmere, it softens with every wear, becoming more yours with time.',
		fabric: '100% Grade-A Mongolian Cashmere. Hand wash cold.',
		care: 'Hand wash cold or dry clean. Lay flat to dry.',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		colors: [
			{ name: 'Oatmeal', hex: '#D4C9B8' },
			{ name: 'Noir', hex: '#1A1A1A' },
			{ name: 'Stone', hex: '#9E9589' },
		],
		images: [
			'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
			'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
			'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
		featured: false,
		new: true,
		tags: ['cashmere', 'knitwear', 'essential'],
	},
	{
		id: 'p004',
		name: 'Wide-Leg Trousers',
		price: 780,
		category: 'ready-to-wear',
		collection: 'Autumn / Winter 2024',
		description: 'Cut with an exaggerated wide leg from fluid crepe, these trousers move with a cinematic quality that commands attention.',
		story: 'Inspired by the great tailors of the 1970s, these trousers are cut with an intentional generosity — wide enough to flow, structured enough to hold their shape. Wear them with everything.',
		fabric: '72% Viscose, 28% Polyester crepe. Dry clean only.',
		care: 'Dry clean recommended.',
		sizes: ['XS', 'S', 'M', 'L'],
		colors: [
			{ name: 'Ivory', hex: '#F5F0E8' },
			{ name: 'Noir', hex: '#1A1A1A' },
		],
		images: [
			'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
			'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
			'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
		featured: false,
		new: false,
		tags: ['trousers', 'wide-leg', 'fluid'],
	},
	{
		id: 'p005',
		name: 'Oversized Trench Coat',
		price: 1890,
		category: 'outerwear',
		collection: 'Autumn / Winter 2024',
		description: 'A modern reinterpretation of the classic trench, cut oversized in a water-resistant cotton gabardine.',
		story: 'The trench coat is perhaps the most enduring garment in fashion history. Ours is cut two sizes larger than convention dictates — worn belted for structure, or open for a more languid, editorial silhouette.',
		fabric: '100% Cotton Gabardine with water-resistant finish. Dry clean only.',
		care: 'Dry clean only. Re-proof with specialist spray annually.',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		colors: [
			{ name: 'Camel', hex: '#C4A882' },
			{ name: 'Noir', hex: '#1A1A1A' },
		],
		images: [
			'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
			'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
			'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
		featured: true,
		new: false,
		tags: ['outerwear', 'trench', 'classic'],
	},
	{
		id: 'p006',
		name: 'Leather Shoulder Bag',
		price: 1450,
		category: 'accessories',
		collection: 'Autumn / Winter 2024',
		description: 'Crafted in Florence from full-grain vegetable-tanned leather, this shoulder bag develops a rich patina with age.',
		story: 'Made in a small family workshop in Florence that has been producing leather goods for three generations. The leather is vegetable-tanned — a slow, traditional process that produces a material of extraordinary character.',
		fabric: 'Full-grain vegetable-tanned leather. Brass hardware.',
		care: 'Condition with leather cream seasonally. Store in dust bag.',
		sizes: ['One Size'],
		colors: [
			{ name: 'Cognac', hex: '#8B5E3C' },
			{ name: 'Noir', hex: '#1A1A1A' },
			{ name: 'Ivory', hex: '#F5F0E8' },
		],
		images: [
			'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
			'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
		featured: true,
		new: true,
		tags: ['leather', 'bag', 'accessories'],
	},
	{
		id: 'p007',
		name: 'Silk Scarf',
		price: 320,
		category: 'accessories',
		collection: 'Autumn / Winter 2024',
		description: 'Hand-rolled edges, printed on 90cm square of the finest twill silk. A piece that works as hard as you do.',
		story: 'Printed in Lyon — the silk capital of the world — on a 90cm square of 14mm twill silk. The design was drawn by hand, then transferred to screen. Each scarf takes three days to produce.',
		fabric: '100% Silk Twill, 14mm weight. Dry clean only.',
		care: 'Dry clean only. Store rolled, not folded.',
		sizes: ['90cm × 90cm'],
		colors: [
			{ name: 'Ivory / Gold', hex: '#F5F0E8' },
			{ name: 'Noir / Ivory', hex: '#1A1A1A' },
		],
		images: [
			'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
			'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
			'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
		featured: false,
		new: true,
		tags: ['silk', 'scarf', 'accessories'],
	},
	{
		id: 'p008',
		name: 'Leather Belt',
		price: 280,
		category: 'accessories',
		collection: 'Autumn / Winter 2024',
		description: 'A 3cm wide belt in full-grain leather with a minimal gold-tone buckle. The finishing touch.',
		story: 'Made in the same Florence workshop as our shoulder bag, this belt is cut from a single piece of full-grain leather. The buckle is solid brass, plated in 18k gold.',
		fabric: 'Full-grain leather. 18k gold-plated brass buckle.',
		care: 'Condition with leather cream. Avoid prolonged exposure to water.',
		sizes: ['XS/S', 'M/L', 'XL'],
		colors: [
			{ name: 'Cognac', hex: '#8B5E3C' },
			{ name: 'Noir', hex: '#1A1A1A' },
		],
		images: [
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
			'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
			'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
		featured: false,
		new: false,
		tags: ['leather', 'belt', 'accessories'],
	},
	{
		id: 'p009',
		name: 'Wool Overcoat',
		price: 2200,
		category: 'outerwear',
		collection: 'Autumn / Winter 2024',
		description: 'A floor-length overcoat in double-faced wool. Minimal, architectural, and built to last a lifetime.',
		story: 'This coat began as a sketch on a napkin in a small café in Copenhagen. The brief was simple: make something that looks better in ten years than it does today. We believe we have succeeded.',
		fabric: '100% Double-faced Merino Wool. Dry clean only.',
		care: 'Dry clean only. Brush with a soft clothes brush after wearing.',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		colors: [
			{ name: 'Camel', hex: '#C4A882' },
			{ name: 'Charcoal', hex: '#3D3D3D' },
			{ name: 'Ivory', hex: '#F5F0E8' },
		],
		images: [
			'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
			'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
			'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
		featured: true,
		new: false,
		tags: ['outerwear', 'wool', 'investment'],
	},
	{
		id: 'p010',
		name: 'Pleated Midi Skirt',
		price: 560,
		category: 'ready-to-wear',
		collection: 'Autumn / Winter 2024',
		description: 'Knife-pleated from a fluid satin-back crepe, this midi skirt moves with extraordinary grace.',
		story: 'The pleated skirt is one of fashion\'s most enduring forms. Ours is cut from a satin-back crepe that catches the light differently depending on how you move — a garment that rewards attention.',
		fabric: '65% Acetate, 35% Viscose satin-back crepe. Dry clean only.',
		care: 'Dry clean only. Steam to refresh pleats.',
		sizes: ['XS', 'S', 'M', 'L'],
		colors: [
			{ name: 'Ivory', hex: '#F5F0E8' },
			{ name: 'Blush', hex: '#D4A5A0' },
			{ name: 'Noir', hex: '#1A1A1A' },
		],
		images: [
			'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
			'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
			'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
		featured: false,
		new: true,
		tags: ['skirt', 'pleated', 'fluid'],
	},
	{
		id: 'p011',
		name: 'Leather Loafers',
		price: 680,
		category: 'accessories',
		collection: 'Autumn / Winter 2024',
		description: 'Hand-welted in Portugal from full-grain calf leather. A shoe that improves with every step.',
		story: 'Made in a small factory in Alcanena, Portugal — a town with a centuries-long tradition of leather craft. Each pair is hand-welted, a construction method that allows the sole to be replaced, extending the life of the shoe indefinitely.',
		fabric: 'Full-grain calf leather upper. Leather sole with rubber heel.',
		care: 'Polish with matching cream. Re-sole when needed.',
		sizes: ['35', '36', '37', '38', '39', '40', '41'],
		colors: [
			{ name: 'Cognac', hex: '#8B5E3C' },
			{ name: 'Noir', hex: '#1A1A1A' },
		],
		images: [
			'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
			'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
		featured: false,
		new: false,
		tags: ['shoes', 'leather', 'classic'],
	},
	{
		id: 'p012',
		name: 'Linen Shirt Dress',
		price: 490,
		category: 'ready-to-wear',
		collection: 'Autumn / Winter 2024',
		description: 'Cut from stonewashed Belgian linen, this shirt dress is the definition of effortless dressing.',
		story: 'Belgian linen is among the finest in the world — grown in the Lys Valley, where the climate and soil produce a fibre of exceptional quality. We stonewash ours to achieve a softness that feels lived-in from the first wear.',
		fabric: '100% Belgian Linen, stonewashed. Machine wash cold.',
		care: 'Machine wash cold, gentle cycle. Tumble dry low or line dry.',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		colors: [
			{ name: 'Natural', hex: '#D4C9B8' },
			{ name: 'Noir', hex: '#1A1A1A' },
			{ name: 'Sage', hex: '#8A9E8A' },
		],
		images: [
			'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
			'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
			'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
		],
		hoverImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
		featured: false,
		new: false,
		tags: ['linen', 'dress', 'casual'],
	},
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getNewArrivals = () => products.filter(p => p.new);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (category: Product['category']) =>
	products.filter(p => p.category === category);
export const getRelatedProducts = (id: string, limit = 4) =>
	products.filter(p => p.id !== id).slice(0, limit);
