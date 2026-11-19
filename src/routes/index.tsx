import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Gallery } from "@/components/Gallery";
import { Section } from "@/components/Section";
import { ProductListing } from "@/components/ProductListing";
import { homeSlides, products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loja Mikael Maia | Tênis, roupas e acessórios" },
      { name: "description", content: "Ofertas personalizadas, coleções em destaque e os produtos em alta da Loja Mikael Maia." },
      { property: "og:title", content: "Loja Mikael Maia | Tênis, roupas e acessórios" },
      { property: "og:description", content: "Ofertas personalizadas, coleções em destaque e os produtos em alta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const collections = [
  { src: "/images/collection-1.png", alt: "Novo drop Supreme", off: "30% OFF" },
  { src: "/images/collection-2.png", alt: "Coleção Adidas", off: "30% OFF" },
  { src: "/images/collection-3.png", alt: "Novo Beats Bass", off: "30% OFF" },
];

function HomePage() {
  return (
    <Layout>
      <Gallery images={homeSlides} width={1440} height={681} className="mx-auto" />

      <div className="container-store flex flex-col gap-16 py-16 lg:gap-20 lg:py-20">
        <Section title="Coleções em destaque" titleAlign="center">
          <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
            {collections.map((c) => (
              <Link key={c.src} to="/products" className="group relative block overflow-hidden rounded-sm">
                <img src={c.src} alt={c.alt} className="w-full transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute top-5 left-6 rounded-full bg-badge px-3 py-1 text-sm font-bold text-dark-gray-2">
                  {c.off}
                </span>
                <span className="absolute bottom-6 left-6 rounded-lg bg-background px-6 py-2.5 text-sm font-bold text-primary">
                  Comprar
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <Section title="Produtos em alta" titleAlign="left" link={{ text: "Ver todos", href: "/products" }}>
          <ProductListing products={products.slice(0, 8)} />
        </Section>
      </div>
    </Layout>
  );
}
