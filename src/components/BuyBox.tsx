import type { ReactNode } from "react";
import starIcon from "@/assets/icons/star-icon.svg";
import { formatPrice } from "@/data/products";

interface BuyBoxProps {
  name: string;
  reference: string;
  stars: number;
  rating: number;
  price: number;
  priceDiscount?: number | undefined;
  description: string;
  children?: ReactNode | undefined;
}

export function BuyBox({ name, reference, stars, rating, price, priceDiscount, description, children }: BuyBoxProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-dark-gray lg:text-[32px] lg:leading-tight">{name}</h1>
        <p className="mt-2 text-xs text-dark-gray-3">REF: {reference}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1 rounded-sm bg-warning px-2 py-1 text-sm font-bold text-primary-foreground">
          {stars.toFixed(1)}
          <img src={starIcon} alt="" className="size-3" />
        </span>
        <span className="text-sm text-light-gray">({rating} avaliações)</span>
      </div>
      <div className="flex items-baseline gap-3">
        {priceDiscount ? (
          <>
            <span className="text-[32px] font-bold text-dark-gray-2">{formatPrice(priceDiscount)}</span>
            <span className="text-base text-light-gray-2 line-through">{formatPrice(price)}</span>
          </>
        ) : (
          <span className="text-[32px] font-bold text-dark-gray-2">{formatPrice(price)}</span>
        )}
      </div>
      <div>
        <h2 className="mb-2 text-sm font-bold text-light-gray">Descrição do produto</h2>
        <p className="text-sm leading-relaxed text-dark-gray-2">{description}</p>
      </div>
      {children}
      <button
        type="button"
        className="mt-2 h-12 w-full rounded-lg bg-warning text-base font-bold text-primary-foreground transition hover:brightness-95 sm:w-[220px]"
      >
        COMPRAR
      </button>
    </div>
  );
}
