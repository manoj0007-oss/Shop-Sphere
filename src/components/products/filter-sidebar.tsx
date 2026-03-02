"use client";
import { useFilterStore } from "@/store/filter-store";
import { getAllBrands } from "@/services/product-service";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Star, RotateCcw } from "lucide-react";
import categoriesData from "@/data/categories.json";
import { formatPrice } from "@/lib/config";

export function FilterSidebar() {
  const { priceRange, categories, brands, minRating, setPriceRange, toggleCategory, toggleBrand, setMinRating, resetFilters } = useFilterStore();
  const allBrands = getAllBrands();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-purple-600 hover:text-purple-800"><RotateCcw className="h-3 w-3 mr-1" />Clear All</Button>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Price Range</h4>
        <Slider value={priceRange} onValueChange={(v) => setPriceRange(v as [number, number])} min={0} max={60000} step={500} className="mb-2" />
        <div className="flex justify-between text-xs text-gray-500"><span>{formatPrice(priceRange[0])}</span><span>{formatPrice(priceRange[1])}</span></div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Category</h4>
        <div className="space-y-2">
          {categoriesData.map((cat) => (
            <div key={cat.slug} className="flex items-center gap-2">
              <Checkbox id={"cat-" + cat.slug} checked={categories.includes(cat.slug)} onCheckedChange={() => toggleCategory(cat.slug)} />
              <Label htmlFor={"cat-" + cat.slug} className="text-sm cursor-pointer">{cat.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((r) => (
            <button key={r} onClick={() => setMinRating(minRating === r ? 0 : r)} className={"flex items-center gap-1 text-sm px-2 py-1 rounded-md transition-colors w-full " + (minRating === r ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100")}>
              {Array.from({ length: 5 }, (_, i) => (<Star key={i} className={"h-3.5 w-3.5 " + (i < r ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />))}
              <span className="ml-1">& Up</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allBrands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox id={"brand-" + brand} checked={brands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
              <Label htmlFor={"brand-" + brand} className="text-sm cursor-pointer">{brand}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
