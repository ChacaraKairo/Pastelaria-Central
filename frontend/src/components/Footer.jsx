import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "../data/siteConfig";

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteConfig.businessName}</strong>
        <p>Pastéis, salgados, massa de pastel, congelados e encomendas em {siteConfig.city}.</p>
      </div>
      <div className="footer-links">
        <button type="button" onClick={() => onNavigate("menu")}>Cardápio</button>
        <button type="button" onClick={() => onNavigate("encomendas")}>Encomendas</button>
        <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a>
        <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> Como chegar</a>
        <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
      </div>
    </footer>
  );
}
