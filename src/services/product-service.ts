import { Product, FilterState } from '@/types';
import productsData from '@/data/products.json';
const products: Product[] = productsData as Product[];
export async function getProducts(filters?: Partial<FilterState>): Promise<Product[]> {
  let filtered = [...products];
  if (filters) {
    if (filters.searchQuery) { const q = filters.searchQuery.toLowerCase(); filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }
    if (filters.categories?.length) filtered = filtered.filter(p => filters.categories!.includes(p.category));
    if (filters.brands?.length) filtered = filtered.filter(p => filters.brands!.includes(p.brand));
    if (filters.minRating) filtered = filtered.filter(p => p.rating >= filters.minRating!);
    if (filters.priceRange) filtered = filtered.filter(p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]);
    if (filters.sortBy) { switch(filters.sortBy) { case 'price-low': filtered.sort((a,b)=>a.price-b.price); break; case 'price-high': filtered.sort((a,b)=>b.price-a.price); break; case 'rating': filtered.sort((a,b)=>b.rating-a.rating); break; case 'discount': filtered.sort((a,b)=>b.discount-a.discount); break; case 'newest': filtered.reverse(); break; } }
  }
  return filtered;
}
export async function getProductById(id: string): Promise<Product | undefined> { return products.find(p => p.id === id); }
export async function getProductBySlug(slug: string): Promise<Product | undefined> { return products.find(p => p.slug === slug); }
export async function getProductsByTag(tag: string): Promise<Product[]> { return products.filter(p => p.tags.includes(tag)); }
export async function searchProducts(query: string): Promise<Product[]> { return getProducts({ searchQuery: query }); }
export function getAllBrands(): string[] { return [...new Set(products.map(p => p.brand))].sort(); }
export function getPriceRange(): [number, number] { const prices = products.map(p => p.price); return [Math.min(...prices), Math.max(...prices)]; }
