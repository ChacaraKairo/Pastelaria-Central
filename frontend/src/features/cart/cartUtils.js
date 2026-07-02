export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export function addItem(cartItems, product, quantity = 1, itemNote = "") {
  const normalizedNote = itemNote.trim();
  const currentItem = cartItems.find((item) => item.id === product.id && (item.itemNote || "") === normalizedNote);

  if (currentItem) {
    return cartItems.map((item) =>
      item.lineId === currentItem.lineId ? { ...item, quantity: item.quantity + quantity } : item
    );
  }

  return [
    ...cartItems,
    {
      ...product,
      quantity,
      itemNote: normalizedNote,
      lineId: `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    },
  ];
}

export function updateQuantity(cartItems, lineId, quantity) {
  if (quantity <= 0) {
    return cartItems.filter((item) => item.lineId !== lineId);
  }

  return cartItems.map((item) =>
    item.lineId === lineId ? { ...item, quantity } : item
  );
}

export function removeItem(cartItems, lineId) {
  return cartItems.filter((item) => item.lineId !== lineId);
}

export function getCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartCount(cartItems) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
