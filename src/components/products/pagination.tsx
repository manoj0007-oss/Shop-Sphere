"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) pages.push(i);
    else if (pages[pages.length - 1] !== "...") pages.push("...");
  }
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <Button variant="outline" size="icon" className="h-9 w-9" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}><ChevronLeft className="h-4 w-4" /></Button>
      {pages.map((p, i) => typeof p === "number" ? (
        <Button key={i} variant={p === currentPage ? "default" : "outline"} size="icon" className={"h-9 w-9 " + (p === currentPage ? "bg-purple-700" : "")} onClick={() => onPageChange(p)}>{p}</Button>
      ) : (<span key={i} className="px-2 text-gray-400">...</span>))}
      <Button variant="outline" size="icon" className="h-9 w-9" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}><ChevronRight className="h-4 w-4" /></Button>
    </div>
  );
}
