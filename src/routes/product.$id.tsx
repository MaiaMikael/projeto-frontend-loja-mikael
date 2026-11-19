import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Gallery } from "@/components/Gallery";
import { BuyBox } from "@/components/BuyBox";
import { ProductOptions } from "@/components/ProductOptions";
import { Section } from "@/components/Section";
import { ProductListing } from "@/components/ProductListing";
import { getProduct, productImages, products } from "@/data/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} | Digital Store` },
          { name: "description", content: loaderData.product.description.slice(0, 150) },
          { property: "og:title", content: `${loaderData.product.name} | Digital Store` },
          { property: "og:description", content: loaderData.product.description.slice(0, 150) },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Produto indisponível | Digital Store" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <Layout>
      <div className="container-store py-24 text-center">
        <h1 className="text-2xl font-bold text-dark-gray">Produto não encontrado</h1>
        <Link to="/products" className="mt-4 inline-block text-primary underline">Ver todos os produtos</Link>
      </div>
    </Layout>
  ),
  component: ProductViewPage,
});

function ProductViewPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="container-store py-8 lg:py-10">
        <nav className="mb-6 text-sm text-dark-gray-2" aria-label="Você está em">
          <Link to="/" className="font-bold hover:text-primary">Home</Link> /{" "}
          <Link to="/products" className="font-bold hover:text-primary">Produtos</Link> / {product.category} /{" "}
          <span className="text-light-gray">{product.name}</span>
        </nav>
        <div className="flex flex-col gap-10 lg:flex-row">
          <Gallery key={product.id} images={productImages} showThumbs width={700} height={570} radius="4px" className="lg:flex-[0_1_700px]" />
          <div className="flex-1">
            <BuyBox
              name={product.name}
              reference={product.reference}
              stars={product.stars}
              rating={product.rating}
              price={product.price}
              priceDiscount={product.priceDiscount}
              description={product.description}
            >
              <div>
                <h2 className="mb-2 text-sm font-bold text-light-gray">Tamanho</h2>
                <ProductOptions options={["39", "40", "41", "42", "43"]} shape="square" radius="4px" type="text" />
              </div>
              <div>
                <h2 className="mb-2 text-sm font-bold text-light-gray">Cor</h2>
                <ProductOptions options={["#6FEEFF", "#FF6969", "#5E5E5E", "#6D70B7"]} shape="circle" type="color" />
              </div>
            </BuyBox>
          </div>
        </div>
        <Section title="Produtos recomendados" titleAlign="left" link={{ text: "Ver todos", href: "/products" }} className="mt-20">
          <ProductListing products={related} />
        </Section>
      </div>
    </Layout>
  );
}
