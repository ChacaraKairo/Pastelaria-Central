import { Instagram, MapPin, MessageCircle, Clock } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppUrl, siteConfig } from "../data/siteConfig";

export default function Contato() {
  return (
    <section className="section page-section contact-page">
      <SectionTitle eyebrow="Contato" title="Fale com a Pastelaria Central" text="Dados com placeholders para confirmar com a empresa antes da publicação final." />
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
          <p>Número configurável em siteConfig.js</p>
          <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Chamar agora</a>
        </article>
        <article>
          <Instagram size={28} />
          <h3>Instagram</h3>
          <p>Perfil para confirmar com a empresa.</p>
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
