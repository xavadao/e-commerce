import type { Product } from './data/products';

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
