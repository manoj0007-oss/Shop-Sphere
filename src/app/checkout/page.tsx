"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/config";
import { CreditCard, Wallet, Building2, Smartphone, CheckCircle2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI Payment", icon: Smartphone },
  { id: "netbanking", label: "Net Banking", icon: Building2 },
  { id: "cod", label: "Cash on Delivery", icon: Wallet },
];

export default function CheckoutPage() {
  const { items, cartSubtotal, cartShipping, cartTax, cartTotal, clearCart } = useCartStore();
  const [payment, setPayment] = useState("card");
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <CheckCircle2 className="h-24 w-24 text-green-500 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-6">Thank you for shopping with ShopSphere.</p>
        <Button asChild className="bg-purple-700 hover:bg-purple-800"><Link href="/">Continue Shopping</Link></Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <Button asChild className="bg-purple-700 hover:bg-purple-800"><Link href="/products">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Delivery Address</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="fullName">Full Name</Label><Input id="fullName" placeholder="John Doe" className="mt-1" /></div>
                <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" placeholder="+91 98765 43210" className="mt-1" /></div>
              </div>
              <div><Label htmlFor="address1">Address Line 1</Label><Input id="address1" placeholder="House/Flat No., Street" className="mt-1" /></div>
              <div><Label htmlFor="address2">Address Line 2</Label><Input id="address2" placeholder="Landmark, Area" className="mt-1" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><Label htmlFor="city">City</Label><Input id="city" placeholder="Hyderabad" className="mt-1" /></div>
                <div><Label htmlFor="state">State</Label><Input id="state" placeholder="Telangana" className="mt-1" /></div>
                <div><Label htmlFor="pincode">PIN Code</Label><Input id="pincode" placeholder="500001" className="mt-1" /></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Payment Method</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentMethods.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button key={m.id} onClick={() => setPayment(m.id)} className={"flex items-center gap-3 w-full p-4 rounded-lg border-2 transition-colors text-left " + (payment === m.id ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-gray-300")}>
                      <Icon className={"h-5 w-5 " + (payment === m.id ? "text-purple-600" : "text-gray-400")} />
                      <span className={"font-medium text-sm " + (payment === m.id ? "text-purple-700" : "text-gray-700")}>{m.label}</span>
                      {payment === m.id && <CheckCircle2 className="h-5 w-5 text-purple-600 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="sticky top-36">
            <CardHeader><CardTitle className="text-lg">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0"><Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" sizes="56px" /></div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{item.product.title}</p><p className="text-xs text-gray-500">Qty: {item.quantity}</p><p className="text-sm font-bold">{formatPrice(item.product.price * item.quantity)}</p></div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(cartSubtotal())}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={cartShipping() === 0 ? "text-green-600" : ""}>{cartShipping() === 0 ? "FREE" : formatPrice(cartShipping())}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax (18% GST)</span><span>{formatPrice(cartTax())}</span></div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-purple-700">{formatPrice(cartTotal())}</span></div>
              <Button className="w-full bg-purple-700 hover:bg-purple-800" size="lg" onClick={() => { clearCart(); setOrdered(true); }}>Place Order</Button>
              <p className="text-xs text-center text-gray-400 mt-2">By placing this order, you agree to our Terms</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
