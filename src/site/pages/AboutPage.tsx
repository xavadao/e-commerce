'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from '@/lib/router-compat';

type Tab = 'story' | 'size-guide' | 'contact' | 'sustainability';

export default function AboutPage() {
	const [searchParams] = useSearchParams();
	const [activeTab, setActiveTab] = useState<Tab>('story');

	useEffect(() => {
		const tab = searchParams.get('tab');
		if (tab === 'size-guide' || tab === 'contact' || tab === 'sustainability') {
			setActiveTab(tab);
		} else {
			setActiveTab('story');
		}
	}, [searchParams]);

	const tabs: { value: Tab; label: string }[] = [
		{ value: 'story', label: 'Our Story' },
		{ value: 'size-guide', label: 'Size Guide' },
		{ value: 'contact', label: 'Customer Service' },
		{ value: 'sustainability', label: 'Sustainability' },
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero */}
			<div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1600&q=85"
					alt="Maison Atelier"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/40" />
				<div className="absolute inset-0 flex items-end pb-12 md:pb-16 px-6 md:px-10">
					<div>
						<p className="text-subheading text-white/60 mb-3">Maison</p>
						<h1 className="font-serif text-4xl md:text-6xl text-white leading-tight">
							Crafted with<br />Intention
						</h1>
					</div>
				</div>
			</div>

			{/* Tab navigation */}
			<div className="border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm">
				<div className="max-w-5xl mx-auto px-6 md:px-10 flex gap-0 overflow-x-auto scrollbar-hide">
					{tabs.map(tab => (
						<button
							key={tab.value}
							onClick={() => setActiveTab(tab.value)}
							className={`px-5 py-5 text-subheading whitespace-nowrap border-b-2 transition-all duration-300 ${
								activeTab === tab.value
									? 'border-foreground text-foreground'
									: 'border-transparent text-muted-foreground hover:text-foreground'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			{/* Tab content */}
			<div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
				{/* ─── OUR STORY ─── */}
				{activeTab === 'story' && (
					<div
						style={{ animation: 'pageFadeIn 600ms cubic-bezier(0.25,0.1,0.25,1) both' }}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20">
							<div>
								<p className="text-subheading text-muted-foreground mb-4">Founded 2018</p>
								<h2 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
									A House Built on Restraint
								</h2>
								<p className="text-muted-foreground font-sans font-light leading-relaxed mb-4">
									Maison was founded in Paris in 2018 with a single conviction: that the most powerful garments are those that ask nothing of the wearer except to be worn.
								</p>
								<p className="text-muted-foreground font-sans font-light leading-relaxed">
									We work with a small network of artisan workshops across Europe — in Paris, Milan, Florence, and Lisbon — each chosen for their mastery of a specific craft. Every piece is made in limited quantities, with no seasonal pressure to produce more than what is needed.
								</p>
							</div>
							<div className="aspect-[4/5] overflow-hidden bg-muted">
								<img
									src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=85"
									alt="Atelier"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-border pt-16">
							{[
								{ number: '2018', label: 'Founded in Paris' },
								{ number: '12', label: 'Artisan workshops' },
								{ number: '100%', label: 'European-made' },
							].map(stat => (
								<div key={stat.number} className="text-center">
									<p className="font-serif text-5xl md:text-6xl text-foreground">{stat.number}</p>
									<p className="text-subheading text-muted-foreground mt-3">{stat.label}</p>
								</div>
							))}
						</div>

						<div className="mt-20 bg-muted p-10 md:p-14">
							<p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed italic">
								"We are not interested in fashion as spectacle. We are interested in clothing as a form of quiet self-expression — pieces that become more yours with every wear."
							</p>
							<p className="text-subheading text-muted-foreground mt-6">— Creative Director, Maison</p>
						</div>
					</div>
				)}

				{/* ─── SIZE GUIDE ─── */}
				{activeTab === 'size-guide' && (
					<div style={{ animation: 'pageFadeIn 600ms cubic-bezier(0.25,0.1,0.25,1) both' }}>
						<div className="mb-12">
							<p className="text-subheading text-muted-foreground mb-3">Fit & Sizing</p>
							<h2 className="font-serif text-3xl md:text-4xl mb-6">Size Guide</h2>
							<p className="text-muted-foreground font-sans font-light leading-relaxed max-w-xl">
								Our pieces are designed with a considered fit — neither oversized nor restrictive. We recommend measuring yourself and comparing to the size chart below. When in doubt, size up.
							</p>
						</div>

						{/* Women's sizing */}
						<div className="mb-12">
							<h3 className="font-serif text-xl mb-6">Ready-to-Wear</h3>
							<div className="overflow-x-auto">
								<table className="w-full text-sm font-sans border-collapse">
									<thead>
										<tr className="border-b border-border">
											<th className="text-left py-3 pr-6 text-subheading text-muted-foreground font-normal">Size</th>
											<th className="text-left py-3 pr-6 text-subheading text-muted-foreground font-normal">EU</th>
											<th className="text-left py-3 pr-6 text-subheading text-muted-foreground font-normal">Bust (cm)</th>
											<th className="text-left py-3 pr-6 text-subheading text-muted-foreground font-normal">Waist (cm)</th>
											<th className="text-left py-3 text-subheading text-muted-foreground font-normal">Hip (cm)</th>
										</tr>
									</thead>
									<tbody>
										{[
											['XS', '34', '80–83', '62–65', '88–91'],
											['S', '36', '84–87', '66–69', '92–95'],
											['M', '38', '88–91', '70–73', '96–99'],
											['L', '40', '92–95', '74–77', '100–103'],
											['XL', '42', '96–99', '78–81', '104–107'],
										].map(([size, eu, bust, waist, hip]) => (
											<tr key={size} className="border-b border-border/50">
												<td className="py-4 pr-6 font-medium">{size}</td>
												<td className="py-4 pr-6 text-muted-foreground">{eu}</td>
												<td className="py-4 pr-6 text-muted-foreground">{bust}</td>
												<td className="py-4 pr-6 text-muted-foreground">{waist}</td>
												<td className="py-4 text-muted-foreground">{hip}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						{/* Shoes */}
						<div>
							<h3 className="font-serif text-xl mb-6">Footwear</h3>
							<div className="overflow-x-auto">
								<table className="w-full text-sm font-sans border-collapse">
									<thead>
										<tr className="border-b border-border">
											<th className="text-left py-3 pr-6 text-subheading text-muted-foreground font-normal">EU</th>
											<th className="text-left py-3 pr-6 text-subheading text-muted-foreground font-normal">UK</th>
											<th className="text-left py-3 pr-6 text-subheading text-muted-foreground font-normal">US</th>
											<th className="text-left py-3 text-subheading text-muted-foreground font-normal">Foot Length (cm)</th>
										</tr>
									</thead>
									<tbody>
										{[
											['35', '2.5', '5', '22.5'],
											['36', '3.5', '6', '23'],
											['37', '4', '6.5', '23.5'],
											['38', '5', '7.5', '24'],
											['39', '6', '8.5', '25'],
											['40', '6.5', '9', '25.5'],
											['41', '7.5', '10', '26'],
										].map(([eu, uk, us, length]) => (
											<tr key={eu} className="border-b border-border/50">
												<td className="py-4 pr-6 font-medium">{eu}</td>
												<td className="py-4 pr-6 text-muted-foreground">{uk}</td>
												<td className="py-4 pr-6 text-muted-foreground">{us}</td>
												<td className="py-4 text-muted-foreground">{length}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className="mt-10 p-6 border border-border">
							<p className="text-subheading text-muted-foreground mb-2">Need Help?</p>
							<p className="text-sm font-sans text-muted-foreground">
								Our team is available to advise on fit. Contact us at{' '}
								<a href="mailto:fit@maison.com" className="text-foreground border-b border-foreground pb-0.5">fit@maison.com</a>
							</p>
						</div>
					</div>
				)}

				{/* ─── CUSTOMER SERVICE ─── */}
				{activeTab === 'contact' && (
					<div style={{ animation: 'pageFadeIn 600ms cubic-bezier(0.25,0.1,0.25,1) both' }}>
						<div className="mb-12">
							<p className="text-subheading text-muted-foreground mb-3">We're Here</p>
							<h2 className="font-serif text-3xl md:text-4xl mb-6">Customer Service</h2>
							<p className="text-muted-foreground font-sans font-light leading-relaxed max-w-xl">
								Our client advisors are available Monday to Friday, 9am–6pm CET. We aim to respond to all enquiries within 24 hours.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
							{[
								{ icon: '✉', title: 'Email', detail: 'hello@maison.com', sub: 'Response within 24 hours' },
								{ icon: '☎', title: 'Phone', detail: '+33 1 23 45 67 89', sub: 'Mon–Fri, 9am–6pm CET' },
								{ icon: '◎', title: 'Live Chat', detail: 'Available on site', sub: 'Mon–Fri, 9am–6pm CET' },
							].map(item => (
								<div key={item.title} className="border border-border p-8">
									<span className="text-2xl">{item.icon}</span>
									<h3 className="font-serif text-xl mt-4 mb-2">{item.title}</h3>
									<p className="text-foreground font-sans text-sm">{item.detail}</p>
									<p className="text-muted-foreground font-sans text-xs mt-1">{item.sub}</p>
								</div>
							))}
						</div>

						{/* FAQ */}
						<div>
							<h3 className="font-serif text-2xl mb-8">Frequently Asked</h3>
							{[
								{ q: 'What is your returns policy?', a: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Return shipping is complimentary.' },
								{ q: 'How long does shipping take?', a: 'Standard delivery takes 3–5 business days within Europe. Express delivery (1–2 days) is available at checkout. All orders are shipped with full tracking.' },
								{ q: 'Do you ship internationally?', a: 'Yes, we ship to over 40 countries worldwide. International delivery typically takes 5–10 business days. Duties and taxes may apply.' },
								{ q: 'How do I care for my pieces?', a: 'Each piece comes with detailed care instructions. We recommend following these carefully to preserve the quality of your garment. Our customer service team can advise on specific care questions.' },
							].map((faq, i) => (
								<FAQItem key={i} question={faq.q} answer={faq.a} />
							))}
						</div>
					</div>
				)}

				{/* ─── SUSTAINABILITY ─── */}
				{activeTab === 'sustainability' && (
					<div style={{ animation: 'pageFadeIn 600ms cubic-bezier(0.25,0.1,0.25,1) both' }}>
						<div className="mb-16">
							<p className="text-subheading text-muted-foreground mb-3">Our Commitment</p>
							<h2 className="font-serif text-3xl md:text-4xl mb-6">Made to Last</h2>
							<p className="text-muted-foreground font-sans font-light leading-relaxed max-w-xl">
								Sustainability, for us, begins with the decision to make less. We produce in limited quantities, use the finest natural materials, and work with workshops that share our values.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
							{[
								{ title: 'Natural Materials', body: 'We use only natural fibres — silk, wool, cashmere, linen, and leather — chosen for their longevity and biodegradability.' },
								{ title: 'Limited Production', body: 'Every piece is produced in limited quantities. We never overproduce, and we never discount to clear excess stock.' },
								{ title: 'Artisan Workshops', body: 'All our pieces are made in small, family-owned workshops across Europe, where craft traditions are preserved and workers are paid fairly.' },
								{ title: 'Packaging', body: 'Our packaging is made from recycled and recyclable materials. We use no single-use plastics in our supply chain.' },
							].map(item => (
								<div key={item.title} className="border border-border p-8">
									<h3 className="font-serif text-xl mb-3">{item.title}</h3>
									<p className="text-muted-foreground font-sans font-light text-sm leading-relaxed">{item.body}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<style>{`
				@keyframes pageFadeIn {
					from { opacity: 0; transform: translateY(12px); }
					to { opacity: 1; transform: translateY(0); }
				}
			`}</style>
		</div>
	);
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="border-t border-border">
			<button
				onClick={() => setOpen(!open)}
				className="w-full flex items-center justify-between py-5 text-left"
			>
				<span className="font-serif text-lg text-foreground">{question}</span>
				<svg
					width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
					className="flex-shrink-0 ml-4 transition-transform duration-300"
					style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>
			<div
				className="overflow-hidden transition-all duration-500"
				style={{ maxHeight: open ? '300px' : '0px' }}
			>
				<p className="text-muted-foreground font-sans font-light text-sm leading-relaxed pb-5">
					{answer}
				</p>
			</div>
		</div>
	);
}
