"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, MapPin, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { useFilterStore } from "@/store/filter-store";
import { useRouter } from "next/navigation";

export function Header() {
  const cartCount = useCartStore((s) => s.cartCount());
  const openCart = useCartStore((s) => s.openCart);
  const [searchVal, setSearchVal] = useState("");
  const setSearchQuery = useFilterStore((s) => s.setSearchQuery);
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchVal);
    router.push("/products?search=" + encodeURIComponent(searchVal));
  };
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetTitle className="text-lg font-bold text-purple-700">ShopSphere</SheetTitle>
              <nav className="flex flex-col gap-3 mt-6">
                <Link href="/" className="text-sm font-medium hover:text-purple-600 py-2 border-b">Home</Link>
                <Link href="/products" className="text-sm font-medium hover:text-purple-600 py-2 border-b">All Products</Link>
                <Link href="/products?category=electronics" className="text-sm font-medium hover:text-purple-600 py-2 border-b">Electronics</Link>
                <Link href="/products?category=fashion" className="text-sm font-medium hover:text-purple-600 py-2 border-b">Fashion</Link>
                <Link href="/products?category=home" className="text-sm font-medium hover:text-purple-600 py-2 border-b">Home & Living</Link>
                <Link href="/products?category=sports" className="text-sm font-medium hover:text-purple-600 py-2 border-b">Sports</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-700 font-black text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">ShopSphere</span>
          </Link>
          <button className="hidden md:flex items-center gap-1 text-white/80 hover:text-white text-xs shrink-0">
            <MapPin className="h-4 w-4" />
            <div className="text-left"><div className="text-[10px] text-white/60">Deliver to</div><div className="font-semibold">Hyderabad 500001</div></div>
          </button>
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Input placeholder="Search for products, brands and more..." className="w-full pl-4 pr-12 h-10 rounded-lg border-0 bg-white text-sm focus-visible:ring-2 focus-visible:ring-yellow-400" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
              <Button type="submit" size="icon" className="absolute right-1 top-1 h-8 w-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md"><Search className="h-4 w-4" /></Button>
            </div>
          </form>
          <div className="flex items-center gap-1">
            <Button variant="ghost" className="text-white hover:bg-white/10 hidden sm:flex items-center gap-1 text-sm"><User className="h-5 w-5" /><span className="hidden lg:inline">Account</span></Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hidden sm:flex"><Heart className="h-5 w-5" /></Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 relative flex items-center gap-1" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-yellow-400 text-gray-900 text-xs font-bold">{cartCount}</Badge>}
              <span className="hidden lg:inline text-sm">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
