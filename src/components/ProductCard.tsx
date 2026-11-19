import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/data/products";

export interface ProductCardProps {
  id?: string;
  name: string;
  image: string;
  price: number;
  priceDiscount?: number;
  category?: string;
}

export function ProductCard({ id, name, image, price, priceDiscount, category }: ProductCardProps) {
  const discount = priceDiscount ? Math.round((1 - priceDiscount / price) * 100) : 0;
  const body = (
    <>
      <div className="relative flex aspect-[292/321] items-center justify-center overflow-hidden rounded-sm bg-card">
        {discount > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-badge px-3 py-1 text-xs font-bold text-dark-gray-2 lg:text-sm">
            {discount}% OFF
          </span>
        )}
        <img src={image} alt={name} loading="lazy" className="h-4/5 w-4/5 object-contain transition-transform duration-300 group-hover:scale-105" />
      </div>
      {category && <p className="mt-3 text-xs font-bold text-light-gray">{category}</p>}
      <h3 className="mt-1 text-base text-dark-gray-2 lg:text-2xl">{name}</h3>
      <div className="mt-1 flex items-baseline gap-2">
        {priceDiscount ? (
          <>
            <span className="text-base text-light-gray line-through lg:text-2xl">{formatPrice(price)}</span>
            <span className="text-base font-bold text-dark-gray lg:text-2xl">{formatPrice(priceDiscount)}</span>
          </>
        ) : (
          <span className="text-base font-bold text-dark-gray lg:text-2xl">{formatPrice(price)}</span>
        )}
      </div>
    </>
  );
  return id ? (
    <Link to="/product/$id" params={{ id }} className="group block">{body}</Link>
  ) : (
    <div className="group">{body}</div>
  );
}
