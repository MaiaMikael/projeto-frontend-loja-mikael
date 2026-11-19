export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  gender: "Masculino" | "Feminino" | "Unisex";
  image: string;
  price: number;
  priceDiscount?: number | undefined;
  reference: string;
  stars: number;
  rating: number;
  description: string;
}

const thumb = (n: number) => `/images/product-thumb-${((n - 1) % 5) + 1}.jpeg`;

const base: Array<Omit<Product, "image" | "reference" | "stars" | "rating" | "description">> = [
  { id: "1", name: "K-Swiss V8 - Masculino", category: "Tênis", brand: "K-Swiss", gender: "Masculino", price: 200, priceDiscount: 100 },
  { id: "2", name: "Nike Air Max - Feminino", category: "Tênis", brand: "Nike", gender: "Feminino", price: 499.9, priceDiscount: 349.9 },
  { id: "3", name: "Adidas Runfalcon - Unisex", category: "Esporte e lazer", brand: "Adidas", gender: "Unisex", price: 299.9 },
  { id: "4", name: "Puma Smash V2 - Masculino", category: "Casual", brand: "Puma", gender: "Masculino", price: 259.9, priceDiscount: 199.9 },
  { id: "5", name: "Nike Revolution 6 - Masculino", category: "Corrida", brand: "Nike", gender: "Masculino", price: 349.9 },
  { id: "6", name: "Adidas Grand Court - Feminino", category: "Casual", brand: "Adidas", gender: "Feminino", price: 399.9, priceDiscount: 279.9 },
  { id: "7", name: "K-Swiss Court - Unisex", category: "Utilitário", brand: "K-Swiss", gender: "Unisex", price: 189.9 },
  { id: "8", name: "Calenciaga Speed - Feminino", category: "Tênis", brand: "Calenciaga", gender: "Feminino", price: 899.9, priceDiscount: 749.9 },
  { id: "9", name: "Puma Flyer Runner - Masculino", category: "Corrida", brand: "Puma", gender: "Masculino", price: 229.9 },
  { id: "10", name: "Nike Court Vision - Unisex", category: "Esporte e lazer", brand: "Nike", gender: "Unisex", price: 459.9, priceDiscount: 399.9 },
  { id: "11", name: "Adidas Duramo - Masculino", category: "Corrida", brand: "Adidas", gender: "Masculino", price: 319.9 },
  { id: "12", name: "K-Swiss Lozan - Feminino", category: "Casual", brand: "K-Swiss", gender: "Feminino", price: 249.9, priceDiscount: 179.9 },
];

export const products: Product[] = base.map((p, i) => ({
  ...p,
  image: thumb(i + 1),
  reference: `38416711${String(i + 1).padStart(2, "0")}`,
  stars: Number((4 + ((i * 3) % 10) / 10).toFixed(1)),
  rating: 50 + i * 17,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
}));

export const productImages = [1, 2, 3, 4, 5].map((n) => ({ src: `/images/produc-image-${n}.jpeg` }));

export const homeSlides = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ src: `/images/home-slide-${n}.jpeg` }));

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export const effectivePrice = (p: Pick<Product, "price" | "priceDiscount">) => p.priceDiscount ?? p.price;

export type SortOrder = "menor" | "maior";

export interface ProductFilters {
  q?: string | undefined;
  brands?: string[] | undefined;
  categories?: string[] | undefined;
  genders?: string[] | undefined;
  sort?: SortOrder | undefined;
}

export function filterProducts(list: Product[], f: ProductFilters): Product[] {
  const q = f.q?.trim().toLowerCase();
  const out = list.filter(
    (p) =>
      (!q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) &&
      (!f.brands?.length || f.brands.includes(p.brand)) &&
      (!f.categories?.length || f.categories.includes(p.category)) &&
      (!f.genders?.length || f.genders.includes(p.gender)),
  );
  if (f.sort === "menor") out.sort((a, b) => effectivePrice(a) - effectivePrice(b));
  if (f.sort === "maior") out.sort((a, b) => effectivePrice(b) - effectivePrice(a));
  return out;
}

export const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
