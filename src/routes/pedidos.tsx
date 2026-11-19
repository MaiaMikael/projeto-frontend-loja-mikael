import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { SignInPrompt } from "@/components/SignInPrompt";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Meus Pedidos | Loja Mikael Maia" },
      { name: "description", content: "Acompanhe seus pedidos na Loja Mikael Maia." },
      { property: "og:title", content: "Meus Pedidos | Loja Mikael Maia" },
      { property: "og:description", content: "Acompanhe seus pedidos na Loja Mikael Maia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { user, ready, orders } = useStore();
  return (
    <Layout>
      <div className="container-store py-10">
        <h1 className="mb-8 text-2xl font-bold text-dark-gray-2">Meus Pedidos</h1>
        {!ready ? (
          <p className="text-dark-gray-3">Carregando...</p>
        ) : !user ? (
          <SignInPrompt message="Faça seu cadastro para ver seus pedidos." />
        ) : orders.length === 0 ? (
          <div className="rounded-lg bg-background p-10 text-center">
            <p className="text-dark-gray-3">Você ainda não fez nenhum pedido.</p>
            <Link to="/products" className="mt-6 inline-flex h-10 items-center rounded-sm bg-rubi px-6 text-sm font-bold text-primary-foreground">Ver produtos</Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-6">
            {orders.map((o) => (
              <li key={o.id} className="rounded-lg bg-background p-6">
                <div className="mb-4 flex flex-wrap justify-between gap-2 border-b pb-3 text-sm text-dark-gray-3">
                  <span>Pedido nº <strong className="text-dark-gray-2">{o.id.slice(0, 8).toUpperCase()}</strong></span>
                  <span>{new Date(o.created_at).toLocaleString("pt-BR")}</span>
                  <span className="font-bold text-primary">Confirmado</span>
                </div>
                <ul className="flex flex-col gap-3">
                  {o.items.map((it, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <img src={it.image} alt="" className="size-14 rounded-sm bg-light-gray-3 object-contain" />
                      <span className="flex-1 text-dark-gray-2">{it.name} <span className="text-sm text-dark-gray-3">· Tam. {it.size} · {it.quantity}x</span></span>
                      <span className="text-dark-gray-2">{formatPrice(it.price * it.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right text-lg font-bold text-dark-gray-2">Total: {formatPrice(Number(o.total))}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
