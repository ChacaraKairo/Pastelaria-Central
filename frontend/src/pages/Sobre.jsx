import { Bike, MapPin, MessageCircle, PackageCheck, ShoppingBag, Utensils } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppUrl, siteConfig } from "../data/siteConfig";

const highlights = [
  {
    title: "Pedido rápido",
    text: "Pastéis, salgados, bebidas e combos para montar o lanche do dia e enviar pelo WhatsApp.",
    Icon: ShoppingBag,
  },
  {
    title: "Encomendas",
    text: "Massa de pastel, salgados congelados, kits para festas e pedidos em quantidade sob orçamento.",
    Icon: PackageCheck,
  },
  {
    title: "Café do Ciclista",
    text: "Uma parada acolhedora para moradores, turistas e ciclistas que passam por Novo Cruzeiro.",
    Icon: Bike,
  },
];

const principles = [
  "Comida de pastelaria com cara de feita na hora.",
  "Atendimento direto pelo WhatsApp, sem complicar o pedido.",
  "Cardápio pensado para escolher, completar e enviar.",
  "Encomendas tratadas com confirmação de prazo, valor e disponibilidade.",
];

export default function Sobre({ onNavigate }) {
  return (
    <section className="section page-section about-page">
      <div className="about-hero">
        <div>
          <SectionTitle
            eyebrow="Sobre"
            title="Pastelaria Central, ponto de encontro em Novo Cruzeiro"
            text="Pastéis, salgados, bebidas e encomendas em uma experiência simples: o cliente escolhe, monta o pedido e conversa direto pelo WhatsApp."
          />
          <div className="about-actions">
            <button className="btn btn-primary" type="button" onClick={() => onNavigate("menu")}>
              <Utensils size={18} /> Ver cardápio
            </button>
            <a className="btn btn-whatsapp" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> Chamar no WhatsApp
            </a>
          </div>
        </div>
        <img src="/images/fachada.jpeg" alt="Fachada da Pastelaria Central em Novo Cruzeiro" />
      </div>

      <div className="about-story-grid">
        <article className="text-panel about-story">
          <span className="pill">Tradição local</span>
          <h3>Uma pastelaria feita para o pedido do dia a dia</h3>
          <p>
            A Pastelaria Central é uma referência de lanche em Novo Cruzeiro/MG, com foco em pastéis, salgados,
            bebidas geladas e atendimento próximo. O site foi pensado para levar essa experiência para o celular,
            facilitando o pedido sem perder o contato direto com a equipe.
          </p>
          <p>
            Além dos produtos para consumo rápido, a pastelaria também recebe solicitações de encomenda para massa
            de pastel, congelados, kits para festas, eventos e pedidos em maior quantidade.
          </p>
        </article>

        <article className="about-owner-card">
          <img src="/images/proprietario.jpeg" alt="Atendimento da Pastelaria Central" />
          <div>
            <strong>Atendimento direto</strong>
            <span>Pedido, orçamento e confirmação continuam pelo WhatsApp da pastelaria.</span>
          </div>
        </article>
      </div>

      <div className="about-highlight-grid">
        {highlights.map(({ title, text, Icon }) => (
          <article className="about-highlight" key={title}>
            <Icon size={30} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="about-photo-band">
        <img src="/images/balcao-pasteis.jpeg" alt="Balcão com pastéis e salgados da Pastelaria Central" />
        <div>
          <span className="pill">Como a Central trabalha</span>
          <h2>Escolher bem, completar o pedido e combinar tudo pelo WhatsApp</h2>
          <ul>
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="about-location-strip">
        <MapPin size={30} />
        <div>
          <strong>Pastelaria Central em {siteConfig.city}</strong>
          <span>{siteConfig.address}</span>
          <small>{siteConfig.openingHours}</small>
        </div>
        <a className="btn btn-light" href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
          Como chegar
        </a>
      </div>
    </section>
  );
}
