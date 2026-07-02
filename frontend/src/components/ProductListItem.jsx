import { Lock, Plus } from "lucide-react";
import { formatCurrency } from "../features/cart/cartUtils";

export default function ProductListItem({ product, onAdd, onView, onNavigate }) {
  const isQuickOrder = product.type === "pedido_rapido" || product.type === "ambos";
  const canAdd = product.available && isQuickOrder && product.price > 0;
  const isNcProduct = product.category === "Produtos de NC";

  return (
    <article className={`${product.available ? "product-list-item" : "product-list-item unavailable"} ${isNcProduct ? "nc-product-list-item" : ""}`}>
      <button className="product-list-main" type="button" onClick={() => onView(product)}>
        <img src={product.image} alt={product.name} />
        <span>
          <em>{isNcProduct ? `✦ ${product.badge}` : product.badge}</em>
          <strong>{product.name}</strong>
          <small>{product.description}</small>
          <b>{product.price > 0 ? formatCurrency(product.price) : "Sob orçamento"}</b>
        </span>
      </button>
      {canAdd ? (
        <button className="list-add-button" type="button" onClick={() => onAdd(product)} aria-label={`Adicionar ${product.name}`}>
          <Plus size={18} />
        </button>
      ) : product.type === "encomenda" ? (
        <button className="list-quote-button" type="button" onClick={() => onNavigate("encomendas")}>
          Orçar
        </button>
      ) : (
        <span className="list-blocked"><Lock size={15} /></span>
      )}
    </article>
  );
}
