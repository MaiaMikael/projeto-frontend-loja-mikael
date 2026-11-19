import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Section } from "@/components/Section";
import { ProductListing } from "@/components/ProductListing";
import { FilterGroup } from "@/components/FilterGroup";
import { filterProducts, products, type SortOrder } from "@/data/products";

interface ProductsSearch {
  q?: string | undefined;
}

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): ProductsSearch => ({
    q: typeof s["q"] === "string" && s["q"] ? s["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Produtos | Loja Mikael Maia" },
      { name: "description", content: "Veja todos os produtos da Loja Mikael Maia, filtre por marca, categoria e gênero." },
      { property: "og:title", content: "Produtos | Loja Mikael Maia" },
      { property: "og:description", content: "Filtre e ordene todos os produtos da Loja Mikael Maia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductListingPage,
});

const unique = (key: "brand" | "category") =>
  [...new Set(products.map((p) => p[key]))].map((text) => ({ text }));

function ProductListingPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortOrder>("menor");
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const result = filterProducts(products, { q, brands, categories, genders, sort });

  return (
    <Layout>
      <div className="container-store py-10">
        {q && (
          <p className="mb-6 text-base text-dark-gray-2">
            Resultados para <strong>"{q}"</strong>{" "}
            <button type="button" className="ml-2 text-sm text-primary underline" onClick={() => navigate({ to: "/products", search: {} })}>
              limpar busca
            </button>
          </p>
        )}
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="flex w-full flex-col gap-6 lg:w-[308px] lg:shrink-0">
            <label className="flex h-[60px] items-center gap-2 rounded-sm border border-dark-gray-2 px-4 text-base text-dark-gray-2">
              <span className="font-bold">Ordenar por:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOrder)}
                className="flex-1 cursor-pointer bg-transparent text-dark-gray-2 outline-none"
              >
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              className="inline-flex items-center gap-2 self-start rounded-sm bg-rubi px-4 py-2 text-sm font-bold text-primary-foreground lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filtrar
            </button>
            <div className={`${showFilters ? "block" : "hidden"} rounded-sm bg-background p-7 lg:block`}>
              <h2 className="text-base font-bold text-dark-gray-2">Filtrar por</h2>
              <hr className="my-5 border-light-gray-2" />
              <FilterGroup title="Marca" inputType="checkbox" options={unique("brand")} selected={brands} onChange={setBrands} />
              <FilterGroup title="Categoria" inputType="checkbox" options={unique("category")} selected={categories} onChange={setCategories} />
              <FilterGroup
                title="Gênero"
                inputType="checkbox"
                options={[{ text: "Masculino" }, { text: "Feminino" }, { text: "Unisex" }]}
                selected={genders}
                onChange={setGenders}
              />
              <FilterGroup
                title="Estado"
                inputType="radio"
                options={[{ text: "Novo", value: "new" }, { text: "Usado", value: "used" }]}
              />
            </div>
          </aside>
          <div className="flex-1">
            <Section title={`${result.length} ${result.length === 1 ? "produto encontrado" : "produtos encontrados"}`} titleAlign="left">
              {result.length ? (
                <ProductListing products={result} columns={3} />
              ) : (
                <p className="py-16 text-center text-light-gray">Nenhum produto encontrado com esses filtros.</p>
              )}
            </Section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
