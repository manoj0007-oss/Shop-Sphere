"use client";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card";
import { Product } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProductSection({ title, products, viewAllLink }: { title: string; products: Product[]; viewAllLink?: string }) {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        {viewAllLink && <Link href={viewAllLink} className="flex items-center gap-1 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors">View All <ArrowRight className="h-4 w-4" /></Link>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
