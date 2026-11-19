import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { SignInPrompt } from "@/components/SignInPrompt";
import { cartLineTotal, useStore } from "@/lib/store";
import { formatPrice, getProduct } from "@/data/products";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho | Loja Mikael Maia" },
      { name: "description", content: "Revise os produtos do seu carrinho na Loja Mikael Maia." },
      { property: "og:title", content: "Carrinho | Loja Mikael Maia" },
      { property: "og:description", content: "Revise os produtos do seu carrinho na Loja Mikael Maia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { user, ready, cart, cartTotal, setQuantity, removeItem, checkout } = useStore();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const finish = async () => {
    setBusy(true);
    const ok = await checkout();
    setBusy(false);
    if (ok) void navigate({ to: "/pedidos" });
  };

  return (
    <Layout>
      <div className="container-store py-10">
        <h1 className="mb-8 text-2xl font-bold text-dark-gray-2">Meu carrinho</h1>
        {!ready ? (
          <p className="text-dark-gray-3">Carregando...</p>
        ) : !user ? (
          <SignInPrompt message="Faça seu cadastro para ver e salvar seu carrinho." />
        ) : cart.length === 0 ? (
          <div className="rounded-lg bg-background p-10 text-center">
            <p className="text-dark-gray-3">Seu carrinho está vazio.</p>
            <Link to="/products" className="mt-6 inline-flex h-10 items-center rounded-sm bg-rubi px-6 text-sm font-bold text-primary-foreground">
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            <ul className="flex flex-1 flex-col gap-4">
              {cart.map((item) => {
                const p = getProduct(item.product_id);
                if (!p) return null;
                return (
                  <li key={item.id} className="flex gap-4 rounded-lg bg-background p-4">
                    <img src={p.image} alt={p.name} className="size-24 rounded-sm bg-light-gray-3 object-contain" />
                    <div className="flex flex-1 flex-col gap-2">
                      <Link to="/product/$id" params={{ id: p.id }} className="font-bold text-dark-gray-2 hover:text-primary">{p.name}</Link>
                      <div className="flex items-center gap-3 text-sm text-dark-gray-3">
                        <span>Tamanho: {item.size}</span>
                        <span className="flex items-center gap-1">Cor: <span className="inline-block size-4 rounded-full border" style={{ backgroundColor: item.color }} /></span>
                      </div>
                      <div className="mt-auto flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center rounded-sm border border-light-gray-2">
                          <button type="button" aria-label="Diminuir" disabled={item.quantity <= 1} onClick={() => void setQuantity(item.id, item.quantity - 1)} className="size-8 text-lg disabled:opacity-40">−</button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button type="button" aria-label="Aumentar" onClick={() => void setQuantity(item.id, item.quantity + 1)} className="size-8 text-lg">+</button>
                        </div>
                        <button type="button" onClick={() => void removeItem(item.id)} className="inline-flex items-center gap-1 text-sm text-dark-gray-3 hover:text-primary">
                          <Trash2 className="size-4" /> Remover
                        </button>
                      </div>
                    </div>
                    <span className="font-bold text-dark-gray-2">{formatPrice(cartLineTotal(item))}</span>
                  </li>
                );
              })}
            </ul>
            <aside className="h-fit rounded-lg bg-background p-6 lg:w-80">
              <h2 className="text-lg font-bold text-dark-gray-2">Resumo</h2>
              <div className="mt-4 flex justify-between text-dark-gray-2"><span>Frete</span><span>Grátis</span></div>
              <div className="mt-2 flex justify-between text-xl font-bold text-dark-gray-2"><span>Total</span><span>{formatPrice(cartTotal)}</span></div>
              <button type="button" disabled={busy} onClick={() => void finish()} className="mt-6 h-12 w-full rounded-lg bg-rubi font-bold text-primary-foreground hover:bg-rubi-deep disabled:opacity-60">
                {busy ? "Finalizando..." : "FINALIZAR COMPRA"}
              </button>
              <Link to="/products" className="mt-3 block text-center text-sm text-primary underline">Continuar comprando</Link>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}
