import { ArrowRight, CalendarClock } from "lucide-react";

export default function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="pill">Novo Cruzeiro/MG</span>
        <h1>Pastelaria Central</h1>
        <p className="hero-lead">Pastéis, salgados e encomendas em Novo Cruzeiro/MG.</p>
        <p>Escolha seus produtos, monte seu pedido e envie direto pelo WhatsApp.</p>
        <div className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={() => onNavigate("menu")}>
            Pedir agora <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => onNavigate("encomendas")}>
            <CalendarClock size={18} /> Fazer encomenda
          </button>
        </div>
      </div>
      <div className="hero-plate" aria-label="Pastel crocante com bebida">
        <img src="/images/hero-pastel-bebida.jpeg" alt="Pastéis crocantes com bebida da Pastelaria Central" />
        <div>
          <strong>Combo pastel + bebida</strong>
          <span>A partir de R$ 12,00</span>
        </div>
      </div>
    </section>
  );
}
