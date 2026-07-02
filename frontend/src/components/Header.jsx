import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { getCartCount } from "../features/cart/cartUtils";

const navItems = [
  { id: "home", label: "Início" },
  { id: "menu", label: "Cardápio" },
  { id: "encomendas", label: "Encomendas" },
  { id: "cafe", label: "Café do Ciclista" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
];

export default function Header({ currentPage, onNavigate, cartItems, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function navigate(page) {
    onNavigate(page);
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => navigate("home")}>
        <span>PC</span>
        <strong>Pastelaria Central</strong>
      </button>

      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={currentPage === item.id ? "nav-link active" : "nav-link"}
            type="button"
            onClick={() => navigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="icon-button cart-button" type="button" onClick={onOpenCart} aria-label="Abrir carrinho">
          <ShoppingCart size={21} />
          <span>{getCartCount(cartItems)}</span>
        </button>
        <button className="icon-button menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
