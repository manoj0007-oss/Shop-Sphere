"use client";
import Link from "next/link";
import categoriesData from "@/data/categories.json";
import { Smartphone, Shirt, Home, Dumbbell, Gamepad2, ShoppingBasket, Sparkles, BookOpen } from "lucide-react";
const iconMap: Record<string, React.ElementType> = { Smartphone, Shirt, Home, Dumbbell, Gamepad2, ShoppingBasket, Sparkles, BookOpen };
export function CategoryNav() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
          <Link href="/products" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-full whitespace-nowrap transition-colors">All</Link>
          {categoriesData.map((cat) => { const Icon = iconMap[cat.icon] || Smartphone; return (
            <Link key={cat.slug} href={"/products?category=" + cat.slug} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-full whitespace-nowrap transition-colors"><Icon className="h-4 w-4" />{cat.name}</Link>
          ); })}
        </div>
      </div>
    </nav>
  );
}
