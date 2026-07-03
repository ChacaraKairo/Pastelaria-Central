import { Instagram, MapPin, MessageCircle, Clock } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppUrl, siteConfig } from "../data/siteConfig";

export default function Contato() {
  return (
    <section className="section page-section contact-page">
      <SectionTitle eyebrow="Contato" title="Fale com a Pastelaria Central" text="Chame pelo WhatsApp, veja a localização e acompanhe a Pastelaria Central nas redes." />
      <div className="contact-grid">
        <article>
          <MapPin size={28} />
          <h3>Endereço</h3>
          <p>{siteConfig.address}</p>
          <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer">Como chegar</a>
        </article>
        <article>
          <MessageCircle size={28} />
          <h3>WhatsApp</h3>
          <p>{siteConfig.phone}. Faça pedidos, tire dúvidas e solicite encomendas pelo WhatsApp.</p>
          <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Chamar agora</a>
        </article>
        <article>
          <Instagram size={28} />
          <h3>Instagram</h3>
          <p>Acompanhe novidades, produtos e bastidores da Pastelaria Central.</p>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Abrir Instagram</a>
        </article>
        <article>
          <Clock size={28} />
          <h3>Horário</h3>
          <p>{siteConfig.openingHours}</p>
        </article>
      </div>
    </section>
  );
}
