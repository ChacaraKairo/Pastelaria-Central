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

export function hasCategoryInCart(cartItems, categories) {
  const categoryList = Array.isArray(categories) ? categories : [categories];
  return cartItems.some((item) => categoryList.includes(item.category));
}

export function hasRoleInCart(cartItems, roles) {
  const roleList = Array.isArray(roles) ? roles : [roles];
  return cartItems.some((item) => roleList.includes(item.role));
}

export function getCartUpsellSuggestions(cartItems, products, limit = 3) {
  return getCartUpsellState(cartItems, products, limit).products;
}

export function getCartUpsellState(cartItems, products, limit = 3) {
  if (!cartItems.length) {
    return {
      title: "Complete seu pedido",
      text: "Adicione uma bebida ou combo antes de finalizar.",
      products: [],
    };
  }

  const hasPrincipal = hasRoleInCart(cartItems, "principal");
  const hasDrink = hasCategoryInCart(cartItems, "Bebidas");
  const hasCombo = hasRoleInCart(cartItems, "combo");

  let targetCategories = [];
  let title = "Complete seu pedido";
  let text = "Adicione uma bebida ou combo antes de finalizar.";

  if (hasPrincipal && !hasDrink) {
    targetCategories = ["Bebidas"];
    title = "Quer uma bebida para acompanhar?";
    text = "Seu pedido combina com uma bebida gelada.";
  } else if (hasDrink && !hasPrincipal) {
    targetCategories = ["Salgados", "Pastéis"];
    title = "Escolha um salgado para acompanhar";
    text = "Complete a bebida com um salgado ou pastel quentinho.";
  } else if (!hasCombo) {
    targetCategories = ["Combos"];
    title = "Transforme em combo";
    text = "Mais sabor e praticidade para o seu lanche.";
  }

  if (!targetCategories.length) return { title, text, products: [] };

  const cartProductIds = new Set(cartItems.map((item) => item.id));

  const suggestions = products
    .filter((product) => product.available && product.price > 0)
    .filter((product) => !cartProductIds.has(product.id))
    .filter((product) => targetCategories.includes(product.category))
    .slice(0, limit);

  return {
    title,
    text,
    products: suggestions,
  };
}
