import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias | Loja Mikael Maia" },
      { name: "description", content: "Categorias da Loja Mikael Maia." },
      { property: "og:title", content: "Categorias | Loja Mikael Maia" },
      { property: "og:description", content: "Categorias da Loja Mikael Maia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <Layout>
      <div className="container-store py-24 text-center">
        <h1 className="text-3xl font-bold text-dark-gray">Categorias</h1>
        <p className="mt-3 text-dark-gray-3">Esta página estará disponível em breve.</p>
        <Link to="/products" className="mt-6 inline-flex h-10 items-center rounded-sm bg-rubi px-6 text-sm font-bold text-primary-foreground">
          Ver produtos
        </Link>
      </div>
    </Layout>
  );
}
