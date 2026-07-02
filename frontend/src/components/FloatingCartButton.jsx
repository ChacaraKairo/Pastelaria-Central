import { ShoppingCart } from "lucide-react";
import { formatCurrency, getCartCount, getCartTotal } from "../features/cart/cartUtils";

export default function FloatingCartButton({ cartItems, onOpenCart }) {
  const count = getCartCount(cartItems);

  if (!count) return null;

  return (
    <button className="floating-cart-button" type="button" onClick={onOpenCart}>
      <span><ShoppingCart size={19} /> Ver carrinho</span>
      <strong>{count} itens • {formatCurrency(getCartTotal(cartItems))}</strong>
    </button>
  );
}
