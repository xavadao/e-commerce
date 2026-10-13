'use client';

import { useState } from 'react';
import { Link } from '@/lib/router-compat';
import { useCart } from '../context/CartContext';

type Step = 'information' | 'shipping' | 'payment' | 'confirmation';

interface FormData {
	email: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	country: string;
	postcode: string;
	phone: string;
	shippingMethod: 'standard' | 'express';
	cardNumber: string;
	cardExpiry: string;
	cardCvc: string;
	cardName: string;
}

export default function CheckoutPage() {
	const { items, subtotal, clearCart } = useCart();
	const [step, setStep] = useState<Step>('information');
	const [form, setForm] = useState<FormData>({
		email: '',
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		country: 'France',
		postcode: '',
		phone: '',
		shippingMethod: 'standard',
		cardNumber: '',
		cardExpiry: '',
		cardCvc: '',
		cardName: '',
	});

	const steps: Step[] = ['information', 'shipping', 'payment'];
	const stepLabels: Record<Step, string> = {
		information: 'Information',
		shipping: 'Shipping',
		payment: 'Payment',
		confirmation: 'Confirmed',
	};

	const shippingCost = form.shippingMethod === 'express' ? 25 : 0;
	const total = subtotal + shippingCost;

	const updateForm = (field: keyof FormData, value: string) => {
		setForm(prev => ({ ...prev, [field]: value }));
	};

	const handlePlaceOrder = () => {
		setStep('confirmation');
		clearCart();
	};

	if (items.length === 0 && step !== 'confirmation') {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20 px-6">
				<p className="font-serif text-2xl text-foreground">Your bag is empty</p>
				<Link
					to="/shop"
					className="text-subheading text-foreground border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity duration-300"
				>
					Continue Shopping
				</Link>
			</div>
		);
	}

	if (step === 'confirmation') {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-8 pt-20 px-6 text-center">
				<div className="w-16 h-16 border border-foreground flex items-center justify-center">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</div>
				<div>
					<p className="text-subheading text-muted-foreground mb-3">Order Confirmed</p>
					<h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
						Thank you, {form.firstName || 'valued client'}.
					</h1>
					<p className="text-muted-foreground font-sans font-light max-w-md">
						Your order has been received. A confirmation has been sent to {form.email || 'your email'}. We'll notify you when your pieces are on their way.
					</p>
				</div>
				<div className="flex gap-6">
					<Link
						to="/"
						className="text-subheading text-foreground border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity duration-300"
					>
						Return Home
					</Link>
					<Link
						to="/shop"
						className="text-subheading text-muted-foreground border-b border-muted-foreground pb-0.5 hover:text-foreground hover:border-foreground transition-all duration-300"
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-6xl mx-auto px-6 md:px-10 pt-24 md:pt-28 pb-24">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<Link to="/" className="font-serif text-xl tracking-[0.25em] uppercase text-foreground">
						Maison
					</Link>
					<Link
						to="/shop"
						className="text-subheading text-muted-foreground hover:text-foreground transition-colors duration-300"
					>
						← Continue Shopping
					</Link>
				</div>

				{/* Step progress */}
				<div className="flex items-center gap-3 mb-12">
					{steps.map((s, i) => (
						<div key={s} className="flex items-center gap-3">
							<button
								onClick={() => {
									const currentIdx = steps.indexOf(step);
									if (i < currentIdx) setStep(s);
								}}
								className={`text-subheading transition-colors duration-300 ${
									step === s ? 'text-foreground' :
									steps.indexOf(step) > i ? 'text-muted-foreground hover:text-foreground cursor-pointer' :
									'text-muted-foreground/40 cursor-default'
								}`}
							>
								{stepLabels[s]}
							</button>
							{i < steps.length - 1 && (
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/40">
									<path d="M9 18l6-6-6-6" />
								</svg>
							)}
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
					{/* ─── FORM ─── */}
					<div>
						{/* Information */}
						{step === 'information' && (
							<div style={{ animation: 'pageFadeIn 500ms cubic-bezier(0.25,0.1,0.25,1) both' }}>
								<h2 className="font-serif text-2xl mb-8">Contact Information</h2>

								<div className="space-y-4">
									<CheckoutInput
										label="Email address"
										type="email"
										value={form.email}
										onChange={v => updateForm('email', v)}
										placeholder="your@email.com"
									/>

									<div className="grid grid-cols-2 gap-4">
										<CheckoutInput label="First name" value={form.firstName} onChange={v => updateForm('firstName', v)} />
										<CheckoutInput label="Last name" value={form.lastName} onChange={v => updateForm('lastName', v)} />
									</div>

									<CheckoutInput label="Address" value={form.address} onChange={v => updateForm('address', v)} placeholder="Street address" />

									<div className="grid grid-cols-2 gap-4">
										<CheckoutInput label="City" value={form.city} onChange={v => updateForm('city', v)} />
										<CheckoutInput label="Postcode" value={form.postcode} onChange={v => updateForm('postcode', v)} />
									</div>

									<div>
										<label className="block text-subheading text-muted-foreground mb-2">Country</label>
										<select
											value={form.country}
											onChange={e => updateForm('country', (e.target as HTMLSelectElement).value)}
											className="w-full bg-transparent border border-border px-4 py-3.5 text-sm font-sans text-foreground outline-none focus:border-foreground transition-colors duration-300"
										>
											{['France', 'United Kingdom', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland'].map(c => (
												<option key={c} value={c}>{c}</option>
											))}
										</select>
									</div>

									<CheckoutInput label="Phone (optional)" type="tel" value={form.phone} onChange={v => updateForm('phone', v)} placeholder="+33 6 00 00 00 00" />
								</div>

								<button
									onClick={() => setStep('shipping')}
									disabled={!form.email || !form.firstName || !form.lastName || !form.address || !form.city || !form.postcode}
									className="mt-8 w-full bg-foreground text-background py-4 text-subheading tracking-widest hover:opacity-80 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
								>
									Continue to Shipping
								</button>
							</div>
						)}

						{/* Shipping */}
						{step === 'shipping' && (
							<div style={{ animation: 'pageFadeIn 500ms cubic-bezier(0.25,0.1,0.25,1) both' }}>
								<h2 className="font-serif text-2xl mb-8">Shipping Method</h2>

								<div className="space-y-3">
									{[
										{ value: 'standard' as const, label: 'Standard Delivery', sub: '3–5 business days', price: 'Complimentary' },
										{ value: 'express' as const, label: 'Express Delivery', sub: '1–2 business days', price: '€25' },
									].map(option => (
										<label
											key={option.value}
											className={`flex items-center justify-between p-5 border cursor-pointer transition-all duration-300 ${
												form.shippingMethod === option.value ? 'border-foreground' : 'border-border hover:border-muted-foreground'
											}`}
										>
											<div className="flex items-center gap-4">
												<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
													form.shippingMethod === option.value ? 'border-foreground' : 'border-muted-foreground'
												}`}>
													{form.shippingMethod === option.value && (
														<div className="w-2 h-2 rounded-full bg-foreground" />
													)}
												</div>
												<div>
													<p className="font-sans text-sm font-medium text-foreground">{option.label}</p>
													<p className="font-sans text-xs text-muted-foreground mt-0.5">{option.sub}</p>
												</div>
											</div>
											<span className="font-sans text-sm text-foreground">{option.price}</span>
											<input
												type="radio"
												name="shipping"
												value={option.value}
												checked={form.shippingMethod === option.value}
												onChange={() => updateForm('shippingMethod', option.value)}
												className="sr-only"
											/>
										</label>
									))}
								</div>

								<button
									onClick={() => setStep('payment')}
									className="mt-8 w-full bg-foreground text-background py-4 text-subheading tracking-widest hover:opacity-80 transition-opacity duration-300"
								>
									Continue to Payment
								</button>
							</div>
						)}

						{/* Payment */}
						{step === 'payment' && (
							<div style={{ animation: 'pageFadeIn 500ms cubic-bezier(0.25,0.1,0.25,1) both' }}>
								<h2 className="font-serif text-2xl mb-8">Payment</h2>

								{/* Express payment */}
								<div className="grid grid-cols-2 gap-3 mb-8">
									<button className="flex items-center justify-center gap-2 border border-border py-3.5 hover:border-foreground transition-colors duration-300">
										<svg width="32" height="14" viewBox="0 0 32 14" fill="currentColor">
											<text x="0" y="12" fontSize="12" fontFamily="sans-serif" fontWeight="600">Apple Pay</text>
										</svg>
									</button>
									<button className="flex items-center justify-center gap-2 border border-border py-3.5 hover:border-foreground transition-colors duration-300">
										<span className="text-xs font-sans font-medium">Google Pay</span>
									</button>
								</div>

								<div className="flex items-center gap-4 mb-8">
									<div className="flex-1 h-px bg-border" />
									<span className="text-subheading text-muted-foreground">or pay by card</span>
									<div className="flex-1 h-px bg-border" />
								</div>

								<div className="space-y-4">
									<CheckoutInput
										label="Name on card"
										value={form.cardName}
										onChange={v => updateForm('cardName', v)}
										placeholder="As it appears on your card"
									/>
									<CheckoutInput
										label="Card number"
										value={form.cardNumber}
										onChange={v => updateForm('cardNumber', v)}
										placeholder="1234 5678 9012 3456"
									/>
									<div className="grid grid-cols-2 gap-4">
										<CheckoutInput
											label="Expiry date"
											value={form.cardExpiry}
											onChange={v => updateForm('cardExpiry', v)}
											placeholder="MM / YY"
										/>
										<CheckoutInput
											label="Security code"
											value={form.cardCvc}
											onChange={v => updateForm('cardCvc', v)}
											placeholder="CVC"
										/>
									</div>
								</div>

								<button
									onClick={handlePlaceOrder}
									disabled={!form.cardName || !form.cardNumber || !form.cardExpiry || !form.cardCvc}
									className="mt-8 w-full bg-foreground text-background py-4 text-subheading tracking-widest hover:opacity-80 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
								>
									Place Order — €{total.toLocaleString()}
								</button>

								<p className="text-xs text-muted-foreground font-sans text-center mt-4">
									Your payment information is encrypted and secure. We never store card details.
								</p>
							</div>
						)}
					</div>

					{/* ─── ORDER SUMMARY ─── */}
					<div className="lg:border-l lg:border-border lg:pl-12">
						<h3 className="font-serif text-xl mb-6">Order Summary</h3>

						<div className="space-y-4 mb-6">
							{items.map(item => (
								<div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
									<div className="relative flex-shrink-0">
										<div className="w-16 h-20 overflow-hidden bg-muted">
											<img
												src={item.product.images[0]}
												alt={item.product.name}
												className="w-full h-full object-cover"
											/>
										</div>
										<span className="absolute -top-2 -right-2 w-5 h-5 bg-muted-foreground text-background text-[10px] flex items-center justify-center rounded-full">
											{item.quantity}
										</span>
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-serif text-sm leading-tight">{item.product.name}</p>
										<p className="text-xs text-muted-foreground font-sans mt-1">{item.size} · {item.color}</p>
									</div>
									<p className="text-sm font-sans flex-shrink-0">€{(item.product.price * item.quantity).toLocaleString()}</p>
								</div>
							))}
						</div>

						<div className="border-t border-border pt-4 space-y-3">
							<div className="flex justify-between text-sm font-sans">
								<span className="text-muted-foreground">Subtotal</span>
								<span>€{subtotal.toLocaleString()}</span>
							</div>
							<div className="flex justify-between text-sm font-sans">
								<span className="text-muted-foreground">Shipping</span>
								<span>{shippingCost === 0 ? 'Complimentary' : `€${shippingCost}`}</span>
							</div>
							<div className="flex justify-between font-serif text-lg border-t border-border pt-3">
								<span>Total</span>
								<span>€{total.toLocaleString()}</span>
							</div>
						</div>
					</div>
				</div>
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

function CheckoutInput({
	label,
	type = 'text',
	value,
	onChange,
	placeholder,
}: {
	label: string;
	type?: string;
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
}) {
	return (
		<div>
			<label className="block text-subheading text-muted-foreground mb-2">{label}</label>
			<input
				type={type}
				value={value}
				onChange={e => onChange((e.target as HTMLInputElement).value)}
				placeholder={placeholder}
				className="w-full bg-transparent border border-border px-4 py-3.5 text-sm font-sans text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground transition-colors duration-300"
			/>
		</div>
	);
}
