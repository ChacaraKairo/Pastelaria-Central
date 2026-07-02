import { formatCurrency } from "../features/cart/cartUtils";

export default function UpsellPanel({ title = "Complete seu pedido", text, products = [], onAdd, onClose }) {
  if (!products.length) return null;

  return (
    <section className="upsell-panel" aria-label={title}>
      <div className="upsell-heading">
        <span className="pill">Sugestão</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      <div className="upsell-list">
        {products.map((product) => (
          <article className="upsell-item" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <strong>{product.name}</strong>
              <small>{product.description}</small>
              <b>{formatCurrency(product.price)}</b>
            </div>
            <button className="btn btn-secondary" type="button" onClick={() => onAdd(product)}>
              Adicionar
            </button>
          </article>
        ))}
      </div>
      {onClose && (
        <button className="btn btn-light" type="button" onClick={onClose}>
          Agora não
        </button>
      )}
    </section>
  );
}
