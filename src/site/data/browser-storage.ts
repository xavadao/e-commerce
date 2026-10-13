import { getProductById } from './products';
import type { CartItem } from '../types';

function parseArray(stored: string | null): unknown[] {
  if (!stored) return [];
  try {
    const value: unknown = JSON.parse(stored);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function readStoredCart(stored: string | null): CartItem[] {
  return parseArray(stored).flatMap((item) => {
    if (!isRecord(item) || !isRecord(item.product) || typeof item.product.id !== 'string') return [];
    const product = getProductById(item.product.id);
    if (!product || typeof item.size !== 'string' || !product.sizes.includes(item.size) ||
      typeof item.color !== 'string' || !product.colors.some(({ name }) => name === item.color) ||
      typeof item.quantity !== 'number' || !Number.isSafeInteger(item.quantity) || item.quantity <= 0) return [];
    // Resolve the current catalog product rather than trusting browser-stored prices or images.
    return [{ product, size: item.size, color: item.color, quantity: item.quantity }];
  });
}

export function readStoredWishlist(stored: string | null): string[] {
  return [...new Set(parseArray(stored).filter((id): id is string =>
    typeof id === 'string' && Boolean(getProductById(id))
  ))];
}
