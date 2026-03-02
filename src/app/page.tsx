import { HeroCarousel } from "@/components/home/hero-carousel";
import { CategoryChips } from "@/components/home/category-chips";
import { ProductSection } from "@/components/ui/product-section";
import { getProductsByTag } from "@/services/product-service";

export default async function HomePage() {
  const deals = await getProductsByTag("deals");
  const trending = await getProductsByTag("trending");
  const bestsellers = await getProductsByTag("bestseller");
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <HeroCarousel />
      <CategoryChips />
      <ProductSection title="⚡ Deals of the Day" products={deals.slice(0, 5)} viewAllLink="/products?tag=deals" />
      <ProductSection title="🔥 Trending Products" products={trending.slice(0, 5)} viewAllLink="/products?tag=trending" />
      <ProductSection title="⭐ Best Sellers" products={bestsellers.slice(0, 5)} viewAllLink="/products?tag=bestseller" />
    </div>
  );
}