'use client';

/**
 * react-router v7 surface used by the pre-2026-04-07 Vite template, implemented
 * on the Next.js App Router so the ported pages run unchanged. Routing itself is
 * the file system under src/app; this only maps the hooks and link components.
 */
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useNextParams, useNextSearchParams } from './next-nav';
import { createContext, forwardRef, useContext, useEffect, useMemo, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from 'react';

type To = string | { pathname?: string; search?: string; hash?: string };

function href(to: To): string {
	if (typeof to === 'string') return to;
	return `${to.pathname ?? ''}${to.search ?? ''}${to.hash ?? ''}` || '/';
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
	to: To;
	replace?: boolean;
	state?: unknown;
	reloadDocument?: boolean;
	preventScrollReset?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	{ to, replace, state: _state, reloadDocument, preventScrollReset, ...rest },
	ref,
) {
	void _state; // router location state has no App Router equivalent
	if (reloadDocument) return <a ref={ref} href={href(to)} {...rest} />;
	return <NextLink ref={ref} href={href(to)} replace={replace} scroll={!preventScrollReset} {...rest} />;
});

type NavState = { isActive: boolean; isPending: boolean; isTransitioning: boolean };
type NavLinkProps = Omit<LinkProps, 'className' | 'style' | 'children'> & {
	end?: boolean;
	className?: string | ((s: NavState) => string | undefined);
	style?: CSSProperties | ((s: NavState) => CSSProperties | undefined);
	children?: ReactNode | ((s: NavState) => ReactNode);
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
	{ to, end, className, style, children, ...rest },
	ref,
) {
	const pathname = usePathname() ?? '/';
	const target = (typeof to === 'string' ? to : to.pathname ?? '/').split(/[?#]/)[0] || '/';
	const isActive = end || target === '/' ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
	const s: NavState = { isActive, isPending: false, isTransitioning: false };
	return (
		<Link
			ref={ref}
			to={to}
			aria-current={isActive ? 'page' : undefined}
			className={typeof className === 'function' ? className(s) : className}
			style={typeof style === 'function' ? style(s) : style}
			{...rest}
		>
			{typeof children === 'function' ? children(s) : children}
		</Link>
	);
});

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>(): T {
	const params = useNextParams() ?? {};
	return Object.fromEntries(
		Object.entries(params).map(([k, v]) => [k, Array.isArray(v) ? v.join('/') : v]),
	) as T;
}

export function useLocation() {
	const pathname = usePathname() ?? '/';
	const search = useNextSearchParams()?.toString() ?? '';
	return useMemo(
		() => ({
			pathname,
			search: search ? `?${search}` : '',
			hash: typeof window === 'undefined' ? '' : window.location.hash,
			state: null as unknown,
			key: `${pathname}?${search}`,
		}),
		[pathname, search],
	);
}

type NavigateOptions = { replace?: boolean; state?: unknown; preventScrollReset?: boolean };

export function useNavigate() {
	const router = useRouter();
	return (to: To | number, options?: NavigateOptions) => {
		if (typeof to === 'number') {
			if (to < 0) router.back();
			else router.forward();
			return;
		}
		const scroll = !options?.preventScrollReset;
		if (options?.replace) router.replace(href(to), { scroll });
		else router.push(href(to), { scroll });
	};
}

type SetParams = (
	next: URLSearchParams | Record<string, string> | ((prev: URLSearchParams) => URLSearchParams | Record<string, string>),
	options?: NavigateOptions,
) => void;

export function useSearchParams(): [URLSearchParams, SetParams] {
	const current = useNextSearchParams();
	const pathname = usePathname() ?? '/';
	const router = useRouter();
	const params = useMemo(() => new URLSearchParams(current?.toString() ?? ''), [current]);
	const set: SetParams = (next, options) => {
		const value = typeof next === 'function' ? next(new URLSearchParams(params)) : next;
		const qs = new URLSearchParams(value as Record<string, string>).toString();
		const url = qs ? `${pathname}?${qs}` : pathname;
		if (options?.replace) router.replace(url, { scroll: false });
		else router.push(url, { scroll: false });
	};
	return [params, set];
}

export function Navigate({ to, replace }: { to: To; replace?: boolean }) {
	const router = useRouter();
	useEffect(() => {
		if (replace) router.replace(href(to));
		else router.push(href(to));
	}, [router, to, replace]);
	return null;
}

/** The App Router page, handed to the ported RootLayout's <Outlet /> by AppShell. */
const OutletContext = createContext<ReactNode>(null);

export function OutletProvider({ outlet, children }: { outlet: ReactNode; children: ReactNode }) {
	return <OutletContext.Provider value={outlet}>{children}</OutletContext.Provider>;
}

export function Outlet() {
	return <>{useContext(OutletContext)}</>;
}
