import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { effectivePrice, getProduct } from "@/data/products";

export interface CartItem {
  id: string;
  product_id: string;
  size: string;
  color: string;
  quantity: number;
}

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
}

interface StoreValue {
  user: User | null;
  profile: Profile | null;
  ready: boolean;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  addToCart: (p: { productId: string; size: string; color: string; quantity: number }) => Promise<boolean>;
  setQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  checkout: () => Promise<boolean>;
}

const StoreContext = createContext<StoreValue | null>(null);

export function cartLineTotal(item: CartItem) {
  const p = getProduct(item.product_id);
  return p ? effectivePrice(p) * item.quantity : 0;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  const loadUserData = useCallback(async (u: User | null) => {
    if (!u) {
      setProfile(null);
      setCart([]);
      return;
    }
    const [{ data: prof }, { data: items }] = await Promise.all([
      supabase.from("profiles").select("display_name, avatar_url").eq("id", u.id).maybeSingle(),
      supabase.from("cart_items").select("id, product_id, size, color, quantity").order("created_at"),
    ]);
    setProfile(
      prof ?? {
        display_name: (u.user_metadata?.["full_name"] as string | undefined) ?? u.email ?? null,
        avatar_url: (u.user_metadata?.["avatar_url"] as string | undefined) ?? null,
      },
    );
    setCart(items ?? []);
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") {
        const u = session?.user ?? null;
        setUser(u);
        setTimeout(() => {
          void loadUserData(u).finally(() => setReady(true));
        }, 0);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [loadUserData]);

  const signIn = useCallback(async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) toast.error("Não foi possível entrar com o Google. Tente de novo.");
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    toast.success("Você saiu da sua conta.");
  }, []);

  const addToCart: StoreValue["addToCart"] = useCallback(
    async ({ productId, size, color, quantity }) => {
      if (!user) {
        toast("Entre com sua conta Google para usar o carrinho.", {
          action: { label: "Entrar", onClick: () => void signIn() },
        });
        return false;
      }
      const existing = cart.find((c) => c.product_id === productId && c.size === size && c.color === color);
      if (existing) {
        const { data, error } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + quantity })
          .eq("id", existing.id)
          .select("id, product_id, size, color, quantity")
          .single();
        if (error || !data) return toast.error("Não foi possível adicionar."), false;
        setCart((prev) => prev.map((c) => (c.id === data.id ? data : c)));
      } else {
        const { data, error } = await supabase
          .from("cart_items")
          .insert({ user_id: user.id, product_id: productId, size, color, quantity })
          .select("id, product_id, size, color, quantity")
          .single();
        if (error || !data) return toast.error("Não foi possível adicionar."), false;
        setCart((prev) => [...prev, data]);
      }
      toast.success("Produto adicionado ao carrinho!");
      return true;
    },
    [user, cart, signIn],
  );

  const setQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity } : c)));
    const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", id);
    if (error) toast.error("Não foi possível atualizar a quantidade.");
  }, []);

  const removeItem = useCallback(async (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
    const { error } = await supabase.from("cart_items").delete().eq("id", id);
    if (error) toast.error("Não foi possível remover o item.");
  }, []);

  const cartTotal = useMemo(() => cart.reduce((s, c) => s + cartLineTotal(c), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.quantity, 0), [cart]);

  const checkout = useCallback(async () => {
    if (!user || cart.length === 0) return false;
    const items = cart.map((c) => {
      const p = getProduct(c.product_id);
      return { product_id: c.product_id, name: p?.name ?? "", image: p?.image ?? "", size: c.size, color: c.color, quantity: c.quantity, price: p ? effectivePrice(p) : 0 };
    });
    const { error } = await supabase.from("orders").insert({ user_id: user.id, total: Number(cartTotal.toFixed(2)), items });
    if (error) return toast.error("Não foi possível finalizar a compra."), false;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setCart([]);
    toast.success("Pedido realizado com sucesso!");
    return true;
  }, [user, cart, cartTotal]);

  const value = { user, profile, ready, cart, cartCount, cartTotal, signIn, signOut, addToCart, setQuantity, removeItem, checkout };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
