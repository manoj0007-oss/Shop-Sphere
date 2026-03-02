import { create } from 'zustand';
import { FilterState } from '@/types';
interface FilterStore extends FilterState {
  setPriceRange: (r: [number, number]) => void; toggleCategory: (c: string) => void; setCategories: (c: string[]) => void;
  toggleBrand: (b: string) => void; setBrands: (b: string[]) => void; setMinRating: (r: number) => void;
  setSortBy: (s: FilterState['sortBy']) => void; setSearchQuery: (q: string) => void; resetFilters: () => void;
}
const init: FilterState = { priceRange: [0, 100000], categories: [], brands: [], minRating: 0, sortBy: 'newest', searchQuery: '' };
export const useFilterStore = create<FilterStore>()((set) => ({
  ...init,
  setPriceRange: (r) => set({ priceRange: r }),
  toggleCategory: (c) => set((s) => ({ categories: s.categories.includes(c) ? s.categories.filter(x => x !== c) : [...s.categories, c] })),
  setCategories: (c) => set({ categories: c }),
  toggleBrand: (b) => set((s) => ({ brands: s.brands.includes(b) ? s.brands.filter(x => x !== b) : [...s.brands, b] })),
  setBrands: (b) => set({ brands: b }),
  setMinRating: (r) => set({ minRating: r }), setSortBy: (s) => set({ sortBy: s }),
  setSearchQuery: (q) => set({ searchQuery: q }), resetFilters: () => set(init),
}));
