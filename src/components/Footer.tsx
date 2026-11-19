import { Logo } from "./Logo";
import { Information } from "./Information";
import facebook from "@/assets/icons/facebook.svg";
import instagram from "@/assets/icons/instagram.svg";
import twitter from "@/assets/icons/twitter.svg";

const socials = [
  { href: "https://facebook.com", icon: facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: instagram, label: "Instagram" },
  { href: "https://twitter.com", icon: twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-dark-gray text-primary-foreground">
      <div className="container-store grid gap-10 pt-16 pb-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div className="max-w-xs">
          <Logo variant="white" />
          <p className="mt-6 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
          <div className="mt-6 flex items-center gap-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <img src={s.icon} alt="" className="h-6 w-auto transition-opacity hover:opacity-70" />
              </a>
            ))}
          </div>
        </div>
        <Information
          title="Informação"
          informations={[
            { text: "Sobre Drip Store", link: "#" },
            { text: "Segurança", link: "#" },
            { text: "Wishlist", link: "#" },
            { text: "Blog", link: "#" },
            { text: "Trabalhe conosco", link: "#" },
            { text: "Meus Pedidos", link: "/pedidos" },
          ]}
        />
        <Information
          title="Categorias"
          informations={[
            { text: "Camisetas", link: "/products" },
            { text: "Calças", link: "/products" },
            { text: "Bonés", link: "/products" },
            { text: "Headphones", link: "/products" },
            { text: "Tênis", link: "/products" },
          ]}
        />
        <Information
          title="Contato"
          informations={[
            { text: "Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161" },
            { text: "(85) 3051-3411" },
          ]}
        />
      </div>
      <div className="container-store">
        <hr className="border-dark-gray-2" />
        <p className="py-8 text-center text-xs">© {new Date().getFullYear()} Digital Store</p>
      </div>
    </footer>
  );
}
