import { useState } from "react";

interface ProductOptionsProps {
  options: string[];
  radius?: string;
  shape: "square" | "circle";
  type: "text" | "color";
}

export function ProductOptions({ options, radius = "4px", shape, type }: ProductOptionsProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected === opt;
        const sizeCls = shape === "circle" ? "size-[31px] rounded-full" : "h-[46px] min-w-[46px] px-2";
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            aria-label={type === "color" ? `Cor ${opt}` : `Tamanho ${opt}`}
            onClick={() => setSelected(opt)}
            className={`${sizeCls} flex items-center justify-center transition ${
              active ? "border-2 border-primary" : shape === "square" ? "border border-light-gray-2" : "border-2 border-transparent"
            } ${type === "text" ? "text-2xl text-dark-gray-2" : ""} ${type === "text" && active ? "bg-primary text-primary-foreground" : "bg-background"}`}
            style={{
              borderRadius: shape === "square" ? radius : undefined,
              backgroundColor: type === "color" ? opt : undefined,
            }}
          >
            {type === "text" ? opt : null}
          </button>
        );
      })}
    </div>
  );
}
