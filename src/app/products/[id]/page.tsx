import { getProductById } from "@/services/product-service";
import { ProductDetailClient } from "@/components/product-detail/product-detail-client";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";

export async function generateStaticParams() {
  return productsData.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
