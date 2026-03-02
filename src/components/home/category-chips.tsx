"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import categoriesData from "@/data/categories.json";
import { Smartphone, Shirt, Home, Dumbbell, Gamepad2, ShoppingBasket, Sparkles, BookOpen } from "lucide-react";
const iconMap: Record<string, React.ElementType> = { Smartphone, Shirt, Home, Dumbbell, Gamepad2, ShoppingBasket, Sparkles, BookOpen };
const colors = ["bg-violet-100 text-violet-700 hover:bg-violet-200", "bg-pink-100 text-pink-700 hover:bg-pink-200", "bg-blue-100 text-blue-700 hover:bg-blue-200", "bg-green-100 text-green-700 hover:bg-green-200", "bg-yellow-100 text-yellow-700 hover:bg-yellow-200", "bg-orange-100 text-orange-700 hover:bg-orange-200", "bg-rose-100 text-rose-700 hover:bg-rose-200", "bg-teal-100 text-teal-700 hover:bg-teal-200"];
export function CategoryChips() {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
      {categoriesData.map((cat, i) => { const Icon = iconMap[cat.icon] || Smartphone; return (
        <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Link href={"/products?category=" + cat.slug} className={"flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors " + colors[i % colors.length]}>
            <Icon className="h-4 w-4" />{cat.name}
          </Link>
        </motion.div>
      ); })}
    </div>
  );
}
