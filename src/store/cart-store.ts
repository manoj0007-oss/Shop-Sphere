import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';
interface CartStore {
  items: CartItem[]; isOpen: boolean;
  addItem: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void; openCart: () => void; closeCart: () => void; toggleCart: () => void;
  cartTotal: () => number; cartCount: () => number; cartSubtotal: () => number; cartShipping: () => number; cartTax: () => number;
}
export const useCartStore = create<CartStore>()(
  persist((set, get) => ({
    items: [], isOpen: false,
    addItem: (product, quantity = 1, selectedSize, selectedColor) => {
      set((state) => {
        const i = state.items.findIndex(item => item.product.id === product.id);
        if (i > -1) { const n = [...state.items]; n[i].quantity += quantity; return { items: n, isOpen: true }; }
        return { items: [...state.items, { product, quantity, selectedSize, selectedColor }], isOpen: true };
      });
    },
    removeItem: (pid) => set((s) => ({ items: s.items.filter(i => i.product.id !== pid) })),
    updateQuantity: (pid, qty) => { if (qty <= 0) { get().removeItem(pid); return; } set((s) => ({ items: s.items.map(i => i.product.id === pid ? { ...i, quantity: qty } : i) })); },
    clearCart: () => set({ items: [] }), openCart: () => set({ isOpen: true }), closeCart: () => set({ isOpen: false }),
    toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
    cartSubtotal: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    cartShipping: () => get().cartSubtotal() >= 499 ? 0 : 40,
    cartTax: () => Math.round(get().cartSubtotal() * 0.18),
    cartTotal: () => get().cartSubtotal() + get().cartShipping() + get().cartTax(),
    cartCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
  }), { name: 'shopsphere-cart', partialize: (s) => ({ items: s.items }) })
);
