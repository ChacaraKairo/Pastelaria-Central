export const siteConfig = {
  businessName: "Pastelaria Central",
  city: "Novo Cruzeiro/MG",
  whatsappNumber: "5500000000000",
  instagramUrl: "https://www.instagram.com/pastelaria.central/",
  address: "Endereço a confirmar com a empresa",
  openingHours: "Horário a confirmar com a empresa",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Pastelaria%20Central%20Novo%20Cruzeiro%20MG",
};

export function getWhatsAppUrl(message = "") {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`;
}
