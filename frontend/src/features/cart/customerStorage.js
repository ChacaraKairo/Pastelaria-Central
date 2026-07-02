const STORAGE_KEY = "pastelaria-central-customer";

export function loadCustomerData() {
  if (typeof window === "undefined") return {};

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function saveCustomerData(formData) {
  if (typeof window === "undefined") return;

  const customerData = {
    name: formData.name,
    phone: formData.phone,
    receiveType: formData.receiveType,
    address: formData.address,
    locationUrl: formData.locationUrl,
    payment: formData.payment,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customerData));
}

export function clearCustomerData() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
