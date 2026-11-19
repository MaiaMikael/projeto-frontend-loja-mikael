import { createContext, useCallback, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { effectivePrice, getProduct } from "@/data/products";

export interface Customer {
  name: string;
  contact: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  size: string;
  color: string;
  quantity: number;
}

export interface OrderItem {
  product_id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  total: number;
  created_at: string;
  items: OrderItem[];
}

interface StoreValue {
  user: Customer | null;
  ready: boolean;
  cart: CartItem[];
  orders: Order[];
  cartCount: number;
  cartTotal: number;
  signIn: () => void;
  signOut: () => void;
  addToCart: (p: { productId: string; size: string; color: string; quantity: number }) => Promise<boolean>;
  setQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  checkout: () => Promise<boolean>;
}

const StoreContext = createContext<StoreValue | null>(null);

// Used when a screen renders outside the provider (error pages, hot reload): signed-out, empty cart.
const fallbackStore: StoreValue = {
  user: null,
  ready: false,
  cart: [],
  orders: [],
  cartCount: 0,
  cartTotal: 0,
  signIn: () => {},
  signOut: () => {},
  addToCart: async () => false,
  setQuantity: async () => {},
  removeItem: async () => {},
  checkout: async () => false,
};

const KEY = "loja-mikael-maia";

interface Saved {
  user: Customer | null;
  carts: Record<string, CartItem[]>;
  orders: Record<string, Order[]>;
}

const accountKey = (c: Customer) => c.contact.trim().toLowerCase();
const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export function cartLineTotal(item: CartItem) {
  const p = getProduct(item.product_id);
  return p ? effectivePrice(p) * item.quantity : 0;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Saved>({ user: null, carts: {}, orders: {} });
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ user: null, carts: {}, orders: {}, ...(JSON.parse(raw) as Partial<Saved>) });
    } catch {
      /* ignore broken data */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(data));
  }, [data, ready]);

  const user = data.user;
  const key = user ? accountKey(user) : "";
  const cart = useMemo(() => (key ? data.carts[key] ?? [] : []), [data.carts, key]);
  const orders = useMemo(() => (key ? data.orders[key] ?? [] : []), [data.orders, key]);

  const setCart = useCallback(
    (fn: (prev: CartItem[]) => CartItem[]) =>
      setData((d) => (d.user ? { ...d, carts: { ...d.carts, [accountKey(d.user)]: fn(d.carts[accountKey(d.user)] ?? []) } } : d)),
    [],
  );

  const signIn = useCallback(() => setOpen(true), []);
  const signOut = useCallback(() => {
    setData((d) => ({ ...d, user: null }));
    toast.success("Você saiu da sua conta.");
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const c = contact.trim();
    if (n.length < 2) return void toast.error("Digite seu nome.");
    if (c.length < 5) return void toast.error("Digite um telefone ou e-mail para contato.");
    setData((d) => ({ ...d, user: { name: n.slice(0, 60), contact: c.slice(0, 80) } }));
    setOpen(false);
    toast.success(`Bem-vindo(a), ${n.split(" ")[0]}!`);
  };

  const addToCart: StoreValue["addToCart"] = useCallback(
    async ({ productId, size, color, quantity }) => {
      if (!user) {
        toast("Faça seu cadastro para usar o carrinho.");
        setOpen(true);
        return false;
      }
      setCart((prev) => {
        const existing = prev.find((c) => c.product_id === productId && c.size === size && c.color === color);
        return existing
          ? prev.map((c) => (c === existing ? { ...c, quantity: c.quantity + quantity } : c))
          : [...prev, { id: newId(), product_id: productId, size, color, quantity }];
      });
      toast.success("Produto adicionado ao carrinho!");
      return true;
    },
    [user, setCart],
  );

  const setQuantity = useCallback(
    async (id: string, quantity: number) => {
      if (quantity >= 1) setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity } : c)));
    },
    [setCart],
  );

  const removeItem = useCallback(async (id: string) => setCart((prev) => prev.filter((c) => c.id !== id)), [setCart]);

  const cartTotal = useMemo(() => cart.reduce((s, c) => s + cartLineTotal(c), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.quantity, 0), [cart]);

  const checkout = useCallback(async () => {
    if (!user || cart.length === 0) return false;
    const items: OrderItem[] = cart.map((c) => {
      const p = getProduct(c.product_id);
      return { product_id: c.product_id, name: p?.name ?? "", image: p?.image ?? "", size: c.size, color: c.color, quantity: c.quantity, price: p ? effectivePrice(p) : 0 };
    });
    const order: Order = { id: newId(), total: Number(cartTotal.toFixed(2)), created_at: new Date().toISOString(), items };
    const k = accountKey(user);
    setData((d) => ({ ...d, carts: { ...d.carts, [k]: [] }, orders: { ...d.orders, [k]: [order, ...(d.orders[k] ?? [])] } }));
    toast.success("Pedido realizado com sucesso!");
    return true;
  }, [user, cart, cartTotal]);

  const value = { user, ready, cart, orders, cartCount, cartTotal, signIn, signOut, addToCart, setQuantity, removeItem, checkout };
  return (
    <StoreContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cadastre-se</DialogTitle>
            <DialogDescription>Só precisamos do seu nome e de um contato.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cad-nome">Nome</Label>
              <Input id="cad-nome" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cad-contato">Contato (telefone ou e-mail)</Label>
              <Input id="cad-contato" value={contact} maxLength={80} onChange={(e) => setContact(e.target.value)} placeholder="(85) 99999-9999" />
            </div>
            <button type="submit" className="h-11 rounded-lg bg-rubi font-bold text-primary-foreground hover:bg-rubi-deep">
              Pronto
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  return ctx ?? fallbackStore;
}
