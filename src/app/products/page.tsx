"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/services/product-service";
import { useFilterStore } from "@/store/filter-store";
import { ProductCard } from "@/components/ui/product-card";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { SortDropdown } from "@/components/products/sort-dropdown";
import { Pagination } from "@/components/products/pagination";
import { Product } from "@/types";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { config } from "@/lib/config";
import { Suspense } from "react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const { priceRange, categories, brands, minRating, sortBy, setCategories, setSearchQuery } = useFilterStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    if (cat && !categories.includes(cat)) setCategories([cat]);
    if (search) setSearchQuery(search);
    const data = await getProducts({ priceRange, categories: cat ? [cat] : categories, brands, minRating, sortBy, searchQuery: search || "" });
    setProducts(data);
    setLoading(false);
  }, [searchParams, priceRange, categories, brands, minRating, sortBy, setCategories, setSearchQuery]);

  useEffect(() => { fetchProducts(); setPage(1); }, [fetchProducts]);

  const totalPages = Math.ceil(products.length / config.itemsPerPage);
  const paged = products.slice((page - 1) * config.itemsPerPage, page * config.itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Products</h1><p className="text-sm text-gray-500 mt-1">{products.length} results found</p></div>
        <div className="flex items-center gap-3">
          <Sheet><SheetTrigger asChild><Button variant="outline" className="lg:hidden"><SlidersHorizontal className="h-4 w-4 mr-2" />Filters</Button></SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto"><SheetTitle>Filters</SheetTitle><div className="mt-4"><FilterSidebar /></div></SheetContent></Sheet>
          <SortDropdown />
        </div>
      </div>
      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0"><div className="sticky top-36 bg-white rounded-xl p-5 shadow-sm border"><FilterSidebar /></div></aside>
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => (<SkeletonCard key={i} />))}</div>
          ) : paged.length === 0 ? (
            <div className="text-center py-20"><p className="text-gray-500 text-lg">No products found matching your filters.</p><Button variant="link" onClick={() => useFilterStore.getState().resetFilters()} className="text-purple-700 mt-2">Clear filters</Button></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{paged.map((p) => (<ProductCard key={p.id} product={p} />))}</div>
          )}
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (<Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-6"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{Array.from({length:8}).map((_,i) => <SkeletonCard key={i}/>)}</div></div>}><ProductsContent /></Suspense>);
}
