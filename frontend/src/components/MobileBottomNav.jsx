import { Home, MapPin, PackageCheck, ShoppingCart, Utensils } from "lucide-react";
import { getCartCount } from "../features/cart/cartUtils";

const items = [
  { id: "home", label: "Início", Icon: Home },
  { id: "menu", label: "Cardápio", Icon: Utensils },
  { id: "cart", label: "Carrinho", Icon: ShoppingCart },
  { id: "encomendas", label: "Encomendas", Icon: PackageCheck },
  { id: "contato", label: "Contato", Icon: MapPin },
];

export default function MobileBottomNav({ currentPage, cartItems, onNavigate, onOpenCart }) {
  function handleClick(id) {
    if (id === "cart") {
      onOpenCart();
      return;
    }

    onNavigate(id);
  }

  return (
    <nav className="mobile-bottom-nav" aria-label="Navegação mobile">
      {items.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={currentPage === id ? "mobile-nav-item active" : "mobile-nav-item"}
          type="button"
          onClick={() => handleClick(id)}
        >
          <span>
            <Icon size={20} />
            {id === "cart" && getCartCount(cartItems) > 0 && <em>{getCartCount(cartItems)}</em>}
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}
