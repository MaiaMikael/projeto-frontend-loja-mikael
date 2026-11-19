import { describe, expect, it } from "vitest";
import { effectivePrice, filterProducts, products } from "@/data/products";

describe("listagem de produtos", () => {
  it("Menor preço ordena do mais barato ao mais caro", () => {
    const p = filterProducts(products, { sort: "menor" }).map(effectivePrice);
    expect(p).toEqual([...p].sort((a, b) => a - b));
  });
  it("Maior preço ordena do mais caro ao mais barato", () => {
    const p = filterProducts(products, { sort: "maior" }).map(effectivePrice);
    expect(p).toEqual([...p].sort((a, b) => b - a));
  });
  it("busca filtra pelo nome", () => {
    expect(filterProducts(products, { q: "nike" }).every((x) => x.name.toLowerCase().includes("nike"))).toBe(true);
  });
});
