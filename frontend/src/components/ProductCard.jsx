import { Plus, Lock } from "lucide-react";
import { formatCurrency } from "../features/cart/cartUtils";

export default function ProductCard({ product, onAdd, onNavigate, onView }) {
  const isQuickOrder = product.type === "pedido_rapido" || product.type === "ambos";
  const canAdd = product.available && isQuickOrder && product.price > 0;
  const isNcProduct = product.category === "Produtos de NC";

  return (
    <article className={`${product.available ? "product-card" : "product-card unavailable"} ${isNcProduct ? "nc-product-card" : ""}`}>
      <button className="product-image-button" type="button" onClick={() => onView?.(product)}>
        <img src={product.image} alt={product.name} />
      </button>
      <div className="product-content">
        <div className="product-heading">
          <span className={isNcProduct ? "badge nc-badge" : "badge"}>{product.badge}</span>
          <h3>{product.name}</h3>
        </div>
        <p>{product.description}</p>
        <div className="product-footer">
          <strong>{product.price > 0 ? formatCurrency(product.price) : "Sob orçamento"}</strong>
          {canAdd ? (
            <button className="btn btn-add" type="button" onClick={() => onAdd(product)}>
              <Plus size={18} /> Adicionar
            </button>
          ) : product.type === "encomenda" ? (
            <button className="btn btn-light" type="button" onClick={() => onNavigate("encomendas")}>
              Orçar
            </button>
          ) : (
            <span className="blocked"><Lock size={15} /> Indisponível</span>
          )}
        </div>
      </div>
    </article>
  );
}
