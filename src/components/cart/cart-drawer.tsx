"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, cartSubtotal, cartShipping, cartTax, cartTotal } = useCartStore();
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader><SheetTitle className="flex items-center gap-2"><ShoppingBag className="h-5 w-5" />Your Cart ({items.length} items)</SheetTitle></SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-500">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <Button onClick={closeCart} asChild><Link href="/products">Continue Shopping</Link></Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-white shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.title}</p>
                    <p className="text-sm font-bold text-purple-700 mt-1">{formatPrice(item.product.price)}</p>
                    {item.product.originalPrice > item.product.price && <p className="text-xs text-gray-400 line-through">{formatPrice(item.product.originalPrice)}</p>}
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-red-500 hover:text-red-700" onClick={() => removeItem(item.product.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>{formatPrice(cartSubtotal())}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span>{cartShipping() === 0 ? "FREE" : formatPrice(cartShipping())}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Tax (18% GST)</span><span>{formatPrice(cartTax())}</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-purple-700">{formatPrice(cartTotal())}</span></div>
              <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white" size="lg" asChild onClick={closeCart}><Link href="/checkout">Proceed to Checkout</Link></Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
