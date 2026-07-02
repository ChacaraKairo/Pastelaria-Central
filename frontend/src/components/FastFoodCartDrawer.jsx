import CartDrawer from "./CartDrawer";
import UpsellPanel from "./UpsellPanel";
import { getCartUpsellSuggestions } from "../features/cart/cartUtils";
import { products } from "../data/products";

export default function FastFoodCartDrawer(props) {
  const suggestions = getCartUpsellSuggestions(props.cartItems || [], products);

  return (
    <>
      <CartDrawer {...props} />
      {props.isOpen && props.cartItems?.length > 0 && suggestions.length > 0 && (
        <div className="cart-upsell-overlay">
          <UpsellPanel
            title="Complete seu pedido"
            text="Inclua um complemento antes de finalizar."
            products={suggestions}
            onAdd={props.onAddProduct}
          />
        </div>
      )}
    </>
  );
}
