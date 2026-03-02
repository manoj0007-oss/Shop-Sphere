"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/config";
import { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full">
        <Link href={"/products/" + product.id}>
          <div className="relative aspect-square bg-gray-100 overflow-hidden">
            <Image src={product.images[0]} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
            {product.discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold">{product.discount}% OFF</Badge>}
          </div>
        </Link>
        <CardContent className="p-3">
          <Link href={"/products/" + product.id}><h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-purple-700 transition-colors mb-1">{product.title}</h3></Link>
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-bold"><span>{product.rating}</span><Star className="h-3 w-3 fill-current" /></div>
            <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>}
          </div>
          <Button size="sm" className="w-full bg-purple-700 hover:bg-purple-800 text-white text-xs" onClick={(e) => { e.preventDefault(); addItem(product); }}><ShoppingCart className="h-3.5 w-3.5 mr-1" />Add to Cart</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
