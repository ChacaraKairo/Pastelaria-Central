import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { products } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { Bike, MapPin, PackageCheck, PartyPopper } from "lucide-react";

export default function Home({ onNavigate, onAddProduct }) {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const specialProducts = products
    .filter((product) => ["Especial", "Salgados Fritos", "Salgados Assados"].includes(product.category))
    .slice(0, 3);

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
        <SectionTitle eyebrow="Cardápio" title="Pedido rápido para matar a fome" text="Opções vindas das pastas do cardápio, prontas para pedir pelo WhatsApp." />
        <div className="product-grid compact">
          {specialProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAddProduct} onNavigate={onNavigate} />
          ))}
        </div>
        <span className="mobile-scroll-hint">Arraste para escolher</span>
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
