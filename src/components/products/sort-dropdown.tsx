"use client";
import { useFilterStore } from "@/store/filter-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterState } from "@/types";

export function SortDropdown() {
  const { sortBy, setSortBy } = useFilterStore();
  return (
    <Select value={sortBy} onValueChange={(v) => setSortBy(v as FilterState["sortBy"])}>
      <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
        <SelectItem value="discount">Biggest Discount</SelectItem>
      </SelectContent>
    </Select>
  );
}
