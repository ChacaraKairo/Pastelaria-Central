import { MapPin, ShoppingCart } from "lucide-react";
import { getCartCount } from "../features/cart/cartUtils";
import { siteConfig } from "../data/siteConfig";

export default function MobileHeader({ cartItems, onOpenCart }) {
  return (
    <header className="mobile-header">
      <div>
        <strong>{siteConfig.businessName}</strong>
        <span><MapPin size={14} /> {siteConfig.city}</span>
      </div>
      <button className="icon-button cart-button" type="button" onClick={onOpenCart} aria-label="Abrir carrinho">
        <ShoppingCart size={21} />
        <span>{getCartCount(cartItems)}</span>
      </button>
    </header>
  );
}
