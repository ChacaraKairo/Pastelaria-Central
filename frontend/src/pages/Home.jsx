import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { products } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { Bike, MapPin, PackageCheck, PartyPopper } from "lucide-react";

export default function Home({ onNavigate, onAddProduct }) {
  const featured = products.filter((product) => product.featured || product.badge === "Mais vendido").slice(0, 4);
  const salgados = products.filter((product) => product.category === "Salgados").slice(0, 4);
  const bebidas = products.filter((product) => product.category === "Bebidas").slice(0, 4);
  const combos = products.filter((product) => product.category === "Combos").slice(0, 4);

  return (
    <>
      <Hero onNavigate={onNavigate} />

      <section className="section">
        <SectionTitle eyebrow="Deu vontade?" title="Mais pedidos da Central" text="Escolha seu favorito, coloque no carrinho e envie tudo pronto pelo WhatsApp." />
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAddProduct} onNavigate={onNavigate} />
          ))}
        </div>
        <span className="mobile-scroll-hint">Arraste para ver mais pedidos</span>
      </section>

      <section className="section band">
        <SectionTitle eyebrow="Primeiro passo" title="Escolha seu salgado favorito" text="Comece pelo principal do pedido. Depois o carrinho sugere uma bebida ou combo para completar." />
        <div className="product-grid compact">
          {salgados.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAddProduct} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="Para acompanhar" title="Bebidas geladas" text="Depois do salgado, ofereça uma bebida como em sistemas de fast-food." />
        <div className="product-grid compact">
          {bebidas.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAddProduct} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      <section className="section band">
        <SectionTitle eyebrow="Mais completo" title="Combos da casa" text="Combos ajudam o cliente a decidir mais rápido e aumentam o valor do pedido." />
        <div className="product-grid compact">
          {combos.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAddProduct} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      <section className="promo-strip">
        <div>
          <PackageCheck size={36} />
          <h2>Massa, congelados e encomendas</h2>
          <p>Encomende massa de pastel, salgados congelados, cento de salgados e kits para festas ou outras cidades.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={() => onNavigate("encomendas")}>
          Fazer encomenda
        </button>
      </section>

      <section className="split-section">
        <div>
          <span className="pill">Rota Bahia-Minas</span>
          <h2>Café do Ciclista</h2>
          <p>Uma pausa especial para turistas e ciclistas que passam por Novo Cruzeiro. Café, salgado, bebida e energia para continuar o percurso.</p>
          <button className="btn btn-secondary" type="button" onClick={() => onNavigate("cafe")}>
            <Bike size={18} /> Conhecer
          </button>
        </div>
        <div className="info-card">
          <PartyPopper size={30} />
          <strong>Encomendas para eventos</strong>
          <p>Solicite orçamento com quantidade, cidade e data desejada.</p>
        </div>
      </section>

      <section className="location-card">
        <MapPin size={32} />
        <div>
          <h2>Pastelaria Central em {siteConfig.city}</h2>
          <p>{siteConfig.address}. {siteConfig.openingHours}.</p>
        </div>
        <a className="btn btn-light" href={siteConfig.mapUrl} target="_blank" rel="noreferrer">Como chegar</a>
      </section>
    </>
  );
}
