import { useState } from "react";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import arrowRight from "@/assets/icons/arrow-right.svg";

interface GalleryProps {
  images: { src: string }[];
  width?: number | string | undefined;
  height?: number | string | undefined;
  radius?: string | undefined;
  showThumbs?: boolean | undefined;
  className?: string | undefined;
}

const px = (v: number | string) => (typeof v === "number" ? v : parseFloat(v));

export function Gallery({ images, width = 1440, height = 681, radius = "0px", showThumbs, className = "" }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const last = images.length - 1;

  return (
    <div className={className} style={{ maxWidth: px(width), width: "100%" }}>
      <div
        className="relative overflow-hidden bg-soft"
        style={{ aspectRatio: `${px(width)} / ${px(height)}`, borderRadius: radius }}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <img key={img.src} src={img.src} alt={`Imagem ${i + 1}`} className="h-full w-full shrink-0 object-cover" />
          ))}
        </div>
        <button
          type="button"
          aria-label="Imagem anterior"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-30 lg:left-8"
        >
          <img src={arrowLeft} alt="" className="h-5" />
        </button>
        <button
          type="button"
          aria-label="Próxima imagem"
          disabled={index === last}
          onClick={() => setIndex((i) => Math.min(last, i + 1))}
          className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-30 lg:right-8"
        >
          <img src={arrowRight} alt="" className="h-5" />
        </button>
        {!showThumbs && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Ir para imagem ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`size-2.5 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-light-gray-2"}`}
              />
            ))}
          </div>
        )}
      </div>
      {showThumbs && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Ver imagem ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-[95px] w-[117px] shrink-0 overflow-hidden border-2 bg-soft ${i === index ? "border-primary" : "border-transparent"}`}
              style={{ borderRadius: radius }}
            >
              <img src={img.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
