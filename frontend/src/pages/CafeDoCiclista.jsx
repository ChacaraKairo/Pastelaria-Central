import { Bike, Coffee, MapPinned, MessageCircle } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppUrl } from "../data/siteConfig";

export default function CafeDoCiclista() {
  return (
    <section className="section page-section cafe-page">
      <SectionTitle
        eyebrow="Café do Ciclista"
        title="Parada obrigatória na Rota Bahia-Minas"
        text="Para quem percorre a Rota Bahia-Minas, a Pastelaria Central é uma pausa acolhedora em Novo Cruzeiro."
      />
      <div className="feature-layout">
        <div className="feature-panel">
          <Bike size={42} />
          <h3>Energia para continuar o caminho</h3>
          <p>Café, salgado, pastel, bebida e um atendimento direto para ciclistas, turistas e moradores que querem uma parada rápida.</p>
          <a className="btn btn-whatsapp" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Chamar no WhatsApp
          </a>
        </div>
        <div className="feature-list">
          <div><Coffee size={24} /><span>Café e lanche para a rota</span></div>
          <div><MapPinned size={24} /><span>Em Novo Cruzeiro/MG</span></div>
          <div><Bike size={24} /><span>Chamada para turistas e ciclistas</span></div>
        </div>
      </div>
    </section>
  );
}
