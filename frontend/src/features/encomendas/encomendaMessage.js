import { getWhatsAppUrl } from "../../data/siteConfig.js";

export const encomendaTypes = [
  "Massa de pastel",
  "Salgados congelados",
  "Cento de salgados",
  "Pedido para evento",
  "Pedido para outra cidade",
  "Combo para festa",
];

export function validateEncomenda(formData) {
  const errors = {};

  if (!formData.name.trim()) errors.name = "Informe seu nome.";
  if (!formData.phone.trim()) errors.phone = "Informe seu telefone.";
  if (!formData.orderType.trim()) errors.orderType = "Escolha o tipo de encomenda.";
  if (!formData.product.trim()) errors.product = "Informe o produto desejado.";
  if (!formData.quantity.trim()) errors.quantity = "Informe a quantidade.";
  if (!formData.city.trim()) errors.city = "Informe a cidade.";
  if (!formData.date.trim()) errors.date = "Informe a data desejada da encomenda.";
  if (!formData.receiveType.trim()) errors.receiveType = "Escolha retirada ou entrega.";

  return errors;
}

export function buildEncomendaMessage(formData) {
  return `Olá, Pastelaria Central! Quero solicitar uma encomenda.

Nome: ${formData.name}
Telefone: ${formData.phone}
Tipo de encomenda: ${formData.orderType}
Produto: ${formData.product}
Quantidade: ${formData.quantity}
Cidade: ${formData.city}
Data desejada: ${formData.date}
Retirada ou entrega: ${formData.receiveType}
Observações: ${formData.notes || "Sem observações"}

Entendo que esta solicitação ainda precisa de confirmação de valor, prazo e disponibilidade.`;
}

export function buildEncomendaWhatsAppUrl(message) {
  return getWhatsAppUrl(message);
}
