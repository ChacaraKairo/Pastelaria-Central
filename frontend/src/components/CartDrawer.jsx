import { Minus, Plus, Trash2, X } from "lucide-react";
import OrderForm from "./OrderForm";
import { formatCurrency, getCartTotal } from "../features/cart/cartUtils";

export default function CartDrawer({ isOpen, cartItems, onClose, onUpdateQuantity, onRemove, onClear }) {
  return (
    <aside className={isOpen ? "cart-drawer is-open" : "cart-drawer"} role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="cart-panel">
        <div className="cart-header">
          <div>
            <span>Carrinho</span>
            <h2 id="cart-title">Revise seu pedido</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar carrinho">
            <X size={22} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Seu carrinho está vazio. Escolha um pastel ou combo no cardápio.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.lineId}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{formatCurrency(item.price)} cada</span>
                  <span>Subtotal: {formatCurrency(item.price * item.quantity)}</span>
                  {item.itemNote && <span>Obs.: {item.itemNote}</span>}
                </div>
                <div className="quantity-controls">
                  <button type="button" onClick={() => onUpdateQuantity(item.lineId, item.quantity - 1)} aria-label="Diminuir quantidade">
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onUpdateQuantity(item.lineId, item.quantity + 1)} aria-label="Aumentar quantidade">
                    <Plus size={16} />
                  </button>
                  <button type="button" onClick={() => onRemove(item.lineId)} aria-label="Remover item">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          <span>Total</span>
          <strong>{formatCurrency(getCartTotal(cartItems))}</strong>
        </div>

        {cartItems.length > 0 && (
          <button className="clear-cart" type="button" onClick={onClear}>
            Limpar carrinho
          </button>
        )}

        <OrderForm cartItems={cartItems} />
      </div>
      <button className="cart-backdrop" type="button" onClick={onClose} aria-label="Fechar carrinho" />
    </aside>
  );
}
