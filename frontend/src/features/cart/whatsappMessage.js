import { getCartTotal, formatCurrency } from "./cartUtils.js";
import { getWhatsAppUrl } from "../../data/siteConfig.js";

export function validateOrder(cartItems, formData) {
  const errors = {};

  if (!cartItems.length) errors.cart = "Adicione pelo menos um produto ao carrinho.";
  if (!formData.name.trim()) errors.name = "Informe seu nome.";
  if (!formData.phone.trim()) errors.phone = "Informe seu telefone.";
  if (!formData.receiveType) errors.receiveType = "Escolha retirada ou entrega.";
  if (formData.receiveType === "entrega" && !formData.address.trim()) {
    errors.address = "Informe o endereço para entrega.";
  }
  if (!formData.payment.trim()) errors.payment = "Escolha a forma de pagamento.";

  return errors;
}

export function buildOrderMessage(cartItems, formData) {
  const items = cartItems
    .map((item) => {
      const subtotal = formatCurrency(item.price * item.quantity);
      const note = item.itemNote ? `\n  Obs. do item: ${item.itemNote}` : "";
      return `- ${item.quantity}x ${item.name} - ${subtotal}${note}`;
    })
    .join("\n");

  return `Olá, Pastelaria Central! Quero fazer um pedido.

Nome: ${formData.name}
Telefone: ${formData.phone}

Pedido:
${items}

Total: ${formatCurrency(getCartTotal(cartItems))}

Tipo: ${formData.receiveType}
Endereço: ${formData.receiveType === "entrega" ? formData.address : "não se aplica, retirada no local."}
Localização: ${formData.locationUrl || "não informada"}
Pagamento: ${formData.payment}
Observações: ${formData.notes || "Sem observações"}`;
}

export function buildWhatsAppUrl(message) {
  return getWhatsAppUrl(message);
}
