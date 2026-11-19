import { ProductCard, type ProductCardProps } from "./ProductCard";

export function ProductListing({ products, columns = 4 }: { products: ProductCardProps[]; columns?: 3 | 4 }) {
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} lg:gap-x-6`}>
      {products.map((p, i) => (
        <ProductCard key={p.id ?? i} {...p} />
      ))}
    </div>
  );
}
