import { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";
import {
  buildEncomendaMessage,
  buildEncomendaWhatsAppUrl,
  encomendaTypes,
  validateEncomenda,
} from "../features/encomendas/encomendaMessage";

const initialForm = {
  name: "",
  phone: "",
  orderType: "",
  product: "",
  quantity: "",
  city: "",
  date: "",
  receiveType: "",
  notes: "",
};

export default function EncomendaForm({ selectedType = "" }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedType) {
      setFormData((current) => ({ ...current, orderType: selectedType }));
    }
  }, [selectedType]);

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validation = validateEncomenda(formData);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      const message = buildEncomendaMessage(formData);
      window.open(buildEncomendaWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form className="encomenda-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nome *
          <input name="name" value={formData.name} onChange={updateField} placeholder="Seu nome" />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          Telefone *
          <input name="phone" value={formData.phone} onChange={updateField} placeholder="(00) 00000-0000" />
          {errors.phone && <small>{errors.phone}</small>}
        </label>
        <label>
          Tipo de encomenda *
          <select name="orderType" value={formData.orderType} onChange={updateField}>
            <option value="">Escolha</option>
            {encomendaTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {errors.orderType && <small>{errors.orderType}</small>}
        </label>
        <label>
          Produto desejado *
          <input name="product" value={formData.product} onChange={updateField} placeholder="Ex.: massa de pastel, coxinha..." />
          {errors.product && <small>{errors.product}</small>}
        </label>
        <label>
          Quantidade *
          <input name="quantity" value={formData.quantity} onChange={updateField} placeholder="Ex.: 2kg, 100 unidades" />
          {errors.quantity && <small>{errors.quantity}</small>}
        </label>
        <label>
          Cidade *
          <input name="city" value={formData.city} onChange={updateField} placeholder="Novo Cruzeiro/MG" />
          {errors.city && <small>{errors.city}</small>}
        </label>
        <label>
          Data desejada *
          <input type="date" name="date" value={formData.date} onChange={updateField} />
          {errors.date && <small>{errors.date}</small>}
        </label>
        <label>
          Retirada ou entrega *
          <select name="receiveType" value={formData.receiveType} onChange={updateField}>
            <option value="">Escolha</option>
            <option>Retirada</option>
            <option>Entrega</option>
          </select>
          {errors.receiveType && <small>{errors.receiveType}</small>}
        </label>
      </div>
      <label>
        Observações
        <textarea name="notes" value={formData.notes} onChange={updateField} placeholder="Informe cidade, prazo, sabores, evento ou detalhes importantes." />
      </label>
      <p className="form-hint">Esta é uma solicitação de orçamento. Valor, prazo e disponibilidade serão confirmados pelo WhatsApp.</p>
      <WhatsAppButton type="submit">Solicitar orçamento</WhatsAppButton>
    </form>
  );
}
