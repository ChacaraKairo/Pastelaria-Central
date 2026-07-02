import EncomendaForm from "../components/EncomendaForm";
import SectionTitle from "../components/SectionTitle";
import { useState } from "react";

const orderCards = [
  "Massa de pastel",
  "Salgados congelados",
  "Cento de salgados",
  "Pedido para evento",
  "Pedido para outra cidade",
  "Combo para festa",
];

export default function Encomendas() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <section className="section page-section encomendas-page">
      <SectionTitle
        eyebrow="Sob encomenda"
        title="Orçamento para festas, cidades e congelados"
        text="Informe produto, quantidade, cidade e data desejada. A Pastelaria Central confirma valor, prazo e disponibilidade pelo WhatsApp."
      />
      <div className="mini-card-grid">
        {orderCards.map((card) => (
          <button
            className={selectedType === card ? "mini-card selected" : "mini-card"}
            key={card}
            type="button"
            onClick={() => setSelectedType(card)}
          >
            <strong>{card}</strong>
            <span>{selectedType === card ? "Selecionado" : "Solicite pelo WhatsApp"}</span>
          </button>
        ))}
      </div>
      <EncomendaForm selectedType={selectedType} />
    </section>
  );
}
