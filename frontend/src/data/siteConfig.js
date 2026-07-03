export const siteConfig = {
  businessName: "Pastelaria Central",
  city: "Novo Cruzeiro/MG",
  whatsappNumber: "5533999601227",
  instagramUrl: "https://www.instagram.com/pastelaria.central/",
  address: "R. Davi Mussi, 35 - Centro, Novo Cruzeiro - MG, 39820-000",
  phone: "(33) 99960-1227",
  openingHours: "Segunda a sexta, 07:00-18:00. Sábado, 07:30-16:00. Domingo fechado.",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=R.%20Davi%20Mussi%2C%2035%20-%20Centro%2C%20Novo%20Cruzeiro%20-%20MG%2C%2039820-000",
};

export function getWhatsAppUrl(message = "") {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`;
}
