import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { formatCurrency } from "../features/cart/cartUtils";

export default function ProductModal({ product, onClose, onAdd, onNavigate }) {
  const [quantity, setQuantity] = useState(1);
  const [itemNote, setItemNote] = useState("");
  const [mainImage, setMainImage] = useState(product?.image || "");

  useEffect(() => {
    setMainImage(product?.image || "");
    setQuantity(1);
    setItemNote("");
  }, [product]);

  if (!product) return null;

  const isQuickOrder = product.type === "pedido_rapido" || product.type === "ambos";
  const canAdd = product.available && isQuickOrder && product.price > 0;
  const isNcProduct = product.category === "Produtos de NC";

  function handleAdd() {
    onAdd(product, quantity, itemNote);
    onClose();
  }

  return (
    <aside className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
      <div className={isNcProduct ? "product-modal-panel nc-product-modal-panel" : "product-modal-panel"}>
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Fechar produto">
          <X size={21} />
        </button>
        <img src={mainImage || product.image} alt={product.name} />
        {product.images?.length > 1 && (
          <div className="product-gallery" aria-label="Fotos do produto">
            {product.images.map((image, index) => (
              <button
                key={image}
                className={image === mainImage ? "active" : ""}
                type="button"
                onClick={() => setMainImage(image)}
                aria-label={`Ver foto ${index + 1} de ${product.name}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        )}
        <span className={isNcProduct ? "badge nc-badge" : "badge"}>{isNcProduct ? `Produto de Novo Cruzeiro • ${product.badge}` : product.badge}</span>
        <h2 id="product-modal-title">{product.name}</h2>
        <p>{product.description}</p>
        <strong>{product.price > 0 ? formatCurrency(product.price) : "Sob orçamento"}</strong>

        {canAdd ? (
          <>
            <div className="modal-quantity" aria-label="Quantidade">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Diminuir quantidade">
                <Minus size={17} />
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar quantidade">
                <Plus size={17} />
              </button>
            </div>
            <label>
              Observação do item
              <textarea
                value={itemNote}
                onChange={(event) => setItemNote(event.target.value)}
                placeholder="Ex.: sem cebola, bem frito, mais molho..."
              />
            </label>
            <button className="btn btn-primary sticky-order-button" type="button" onClick={handleAdd}>
              Adicionar {quantity} por {formatCurrency(product.price * quantity)}
            </button>
          </>
        ) : product.type === "encomenda" ? (
          <button className="btn btn-secondary sticky-order-button" type="button" onClick={() => {
            onClose();
            onNavigate("encomendas");
          }}>
            Solicitar orçamento
          </button>
        ) : (
          <button className="btn btn-light sticky-order-button" type="button" disabled>
            Produto indisponível
          </button>
        )}
      </div>
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Fechar produto" />
    </aside>
  );
}
