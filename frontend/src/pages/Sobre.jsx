import SectionTitle from "../components/SectionTitle";

export default function Sobre() {
  return (
    <section className="section page-section about-page">
      <SectionTitle eyebrow="Sobre" title="Tradição com fome de pedido" />
      <div className="text-panel">
        <p>
          A Pastelaria Central é um ponto tradicional de Novo Cruzeiro/MG, conhecida pelos pastéis, salgados e atendimento acolhedor.
        </p>
        <p>
          Além dos pedidos do dia a dia, também atende encomendas de massa de pastel, salgados congelados e grandes quantidades para clientes locais, turistas, ciclistas e cidades vizinhas.
        </p>
      </div>
    </section>
  );
}
