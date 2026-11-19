import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import miniCart from "@/assets/icons/mini-cart.svg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Produtos" },
  { to: "/categorias", label: "Categorias" },
  { to: "/pedidos", label: "Meus Pedidos" },
] as const;

export function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate({ to: "/products", search: { q: query.trim() || undefined } });
  };

  return (
    <header className="bg-background">
      <div className="container-store flex items-center gap-6 py-6 lg:gap-10 lg:pt-8 lg:pb-6">
        <button
          type="button"
          className="text-dark-gray-2 lg:hidden"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
        <Logo />
        <form onSubmit={onSearch} className="hidden flex-1 lg:block" role="search">
          <div className="flex h-15 items-center rounded-lg bg-light-gray-3 px-5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar produto..."
              aria-label="Pesquisar produto"
              className="h-full flex-1 bg-transparent text-base text-dark-gray-2 outline-none placeholder:text-light-gray"
            />
            <button type="submit" aria-label="Buscar" className="text-light-gray hover:text-primary">
              <Search className="size-6" />
            </button>
          </div>
        </form>
        <div className="ml-auto flex items-center gap-8 lg:ml-0">
          <a href="#" className="hidden text-base text-dark-gray-2 underline lg:inline">
            Cadastre-se
          </a>
          <a
            href="#"
            className="hidden h-10 w-[114px] items-center justify-center rounded-sm bg-primary text-sm font-bold text-primary-foreground transition-colors hover:bg-tertiary lg:inline-flex"
          >
            Entrar
          </a>
          <button type="button" className="relative" aria-label="Carrinho com 2 itens">
            <img src={miniCart} alt="" className="size-6" />
            <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              2
            </span>
          </button>
        </div>
      </div>

      <form onSubmit={onSearch} className="container-store pb-4 lg:hidden" role="search">
        <div className="flex h-12 items-center rounded-lg bg-light-gray-3 px-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar produto..."
            aria-label="Pesquisar produto"
            className="h-full flex-1 bg-transparent text-sm text-dark-gray-2 outline-none placeholder:text-light-gray"
          />
          <button type="submit" aria-label="Buscar" className="text-light-gray">
            <Search className="size-5" />
          </button>
        </div>
      </form>

      <nav
        className={`container-store ${menuOpen ? "block" : "hidden"} pb-4 lg:block lg:pb-6`}
        aria-label="Navegação principal"
      >
        <ul className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setMenuOpen(false)}
                activeOptions={{ exact: l.to === "/", includeSearch: false }}
                className="inline-block border-b-2 border-transparent pb-1 text-base text-dark-gray-2 transition-colors hover:text-primary"
                activeProps={{ className: "!border-primary font-bold !text-primary" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex gap-4 border-t pt-4 lg:hidden">
            <a href="#" className="inline-flex h-10 w-[114px] items-center justify-center rounded-sm bg-primary text-sm font-bold text-primary-foreground">
              Entrar
            </a>
            <a href="#" className="self-center text-base text-dark-gray-2 underline">Cadastre-se</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
