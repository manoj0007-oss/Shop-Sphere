import { Order, CartItem, Address } from '@/types';

export async function placeOrder(items: CartItem[], address: Address, paymentMethod: string): Promise<Order> {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 499 ? 0 : 40;
  const tax = Math.round(subtotal * 0.18);
  const order: Order = {
    id: 'ORD-' + Date.now(),
    items,
    address,
    paymentMethod,
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  await new Promise(resolve => setTimeout(resolve, 1000));
  return order;
}

export async function getOrders(): Promise<Order[]> {
  return [];
}