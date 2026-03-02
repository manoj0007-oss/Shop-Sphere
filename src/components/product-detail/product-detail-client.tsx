"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Zap, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/config";
import { Product } from "@/types";
import { ReviewsSection } from "./reviews-section";
import Link from "next/link";

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = () => { addItem(product, qty, selectedSize, selectedColor); };
  const handleBuyNow = () => { addItem(product, qty, selectedSize, selectedColor); openCart(); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-700">Home</Link><ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-purple-700">Products</Link><ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 truncate max-w-[200px]">{product.title}</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border mb-4">
            <Image src={product.images[selectedImage]} alt={product.title} fill className="object-contain p-4" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            {product.discount > 0 && <Badge className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1">{product.discount}% OFF</Badge>}
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={"relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-colors " + (i === selectedImage ? "border-purple-600" : "border-gray-200 hover:border-gray-400")}>
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div><p className="text-sm text-purple-600 font-medium mb-1">{product.brand}</p><h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.title}</h1></div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-bold"><Star className="h-4 w-4 fill-current" />{product.rating}</div>
            <span className="text-sm text-gray-500">{product.reviewCount.toLocaleString()} Ratings & Reviews</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (<><span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span><span className="text-green-600 font-semibold">{product.discount}% off</span></>)}
          </div>
          <p className="text-sm text-green-600 font-medium">Inclusive of all taxes</p>
          {product.colors && product.colors.length > 0 && (
            <div><h3 className="font-semibold text-sm mb-2">Color: <span className="text-purple-700">{selectedColor}</span></h3>
              <div className="flex gap-2">{product.colors.map((c) => (
                <button key={c.name} onClick={() => setSelectedColor(c.name)} className={"w-10 h-10 rounded-full border-2 transition-all " + (selectedColor === c.name ? "border-purple-600 ring-2 ring-purple-200" : "border-gray-300")} style={{ backgroundColor: c.hex }} title={c.name} />
              ))}</div>
            </div>
          )}
          {product.sizes && product.sizes.length > 0 && (
            <div><h3 className="font-semibold text-sm mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">{product.sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)} className={"px-4 py-2 rounded-lg border text-sm font-medium transition-colors " + (selectedSize === s ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-300 hover:border-gray-400")}>{s}</button>
              ))}</div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Qty:</span>
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 text-lg hover:bg-gray-100">-</button>
              <span className="px-4 py-1.5 border-x font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5 text-lg hover:bg-gray-100">+</button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button size="lg" className="flex-1 bg-purple-700 hover:bg-purple-800 text-white" onClick={handleAddToCart}><ShoppingCart className="h-5 w-5 mr-2" />Add to Cart</Button>
            <Button size="lg" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold" onClick={handleBuyNow}><Zap className="h-5 w-5 mr-2" />Buy Now</Button>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-4 py-2">
            <div className="flex flex-col items-center text-center gap-1"><Truck className="h-5 w-5 text-purple-600" /><span className="text-xs text-gray-600">Delivery in {product.deliveryDays} days</span></div>
            <div className="flex flex-col items-center text-center gap-1"><Shield className="h-5 w-5 text-purple-600" /><span className="text-xs text-gray-600">1 Year Warranty</span></div>
            <div className="flex flex-col items-center text-center gap-1"><RotateCcw className="h-5 w-5 text-purple-600" /><span className="text-xs text-gray-600">7 Day Returns</span></div>
          </div>
        </motion.div>
      </div>
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3 max-w-md"><TabsTrigger value="description">Description</TabsTrigger><TabsTrigger value="features">Features</TabsTrigger><TabsTrigger value="reviews">Reviews</TabsTrigger></TabsList>
        <TabsContent value="description" className="mt-6 bg-white rounded-xl p-6 shadow-sm border"><p className="text-gray-700 leading-relaxed">{product.description}</p></TabsContent>
        <TabsContent value="features" className="mt-6 bg-white rounded-xl p-6 shadow-sm border">
          <ul className="space-y-3">{product.features.map((f, i) => (<li key={i} className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" /><span className="text-gray-700">{f}</span></li>))}</ul>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6"><ReviewsSection productId={product.id} /></TabsContent>
      </Tabs>
    </div>
  );
}
