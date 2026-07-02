export const COMMERCIAL_CATEGORY_ORDER = [
  "Todos",
  "Salgados",
  "Bebidas",
  "Combos",
  "Pastéis",
  "Promoções",
  "Café do Ciclista",
  "Massa de Pastel",
  "Congelados",
  "Encomendas",
  "Doces",
  "Sobremesas",
  "Especial",
  "Produtos de NC"
];

const SALGADO_CATEGORIES = ["Salgados", "Salgados Assados", "Salgados Fritos"];
const BEBIDA_CATEGORIES = ["Bebidas"];
const COMBO_CATEGORIES = ["Combos", "Especial"];
const ENCOMENDA_CATEGORIES = ["Massa de Pastel", "Congelados", "Encomendas", "Produtos de NC"];

export function normalizeCategory(category) {
  if (SALGADO_CATEGORIES.includes(category)) return "Salgados";
  if (COMBO_CATEGORIES.includes(category)) return "Combos";
  if (category === "Sobremesas" || category === "Doces") return "Doces";
  return category;
}

export function getProductRole(product) {
  const category = normalizeCategory(product.category);

  if (category === "Bebidas") return "complemento";
  if (category === "Combos") return "combo";
  if (ENCOMENDA_CATEGORIES.includes(category) || product.type === "encomenda") return "encomenda";
  if (category === "Salgados" || category === "Pastéis") return "principal";
  return "principal";
}

export function getSuggestedCategories(product) {
  const category = normalizeCategory(product.category);
  const role = getProductRole(product);

  if (category === "Salgados" || category === "Pastéis") return ["Bebidas", "Combos"];
  if (category === "Bebidas") return ["Salgados", "Pastéis"];
  if (role === "combo") return ["Bebidas", "Doces"];
  if (role === "encomenda") return ["Encomendas"];
  return ["Bebidas", "Combos"];
}

export function normalizeProduct(product) {
  const normalizedCategory = normalizeCategory(product.category);
  const role = product.role || getProductRole(product);
  const suggestedCategories = product.suggestedCategories || getSuggestedCategories({ ...product, category: normalizedCategory, role });

  return {
    ...product,
    originalCategory: product.originalCategory || product.category,
    category: normalizedCategory,
    role,
    suggestedCategories,
    badge: product.badge || normalizedCategory,
  };
}

export function sortCategories(categories) {
  const uniqueCategories = Array.from(new Set(categories));
  return uniqueCategories.sort((a, b) => {
    const indexA = COMMERCIAL_CATEGORY_ORDER.indexOf(a);
    const indexB = COMMERCIAL_CATEGORY_ORDER.indexOf(b);
    const safeA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const safeB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;
    return safeA - safeB || a.localeCompare(b, "pt-BR");
  });
}

export function sortProductsByCommercialOrder(products) {
  return [...products].sort((a, b) => {
    const categoryA = COMMERCIAL_CATEGORY_ORDER.indexOf(a.category);
    const categoryB = COMMERCIAL_CATEGORY_ORDER.indexOf(b.category);
    const safeA = categoryA === -1 ? Number.MAX_SAFE_INTEGER : categoryA;
    const safeB = categoryB === -1 ? Number.MAX_SAFE_INTEGER : categoryB;

    if (safeA !== safeB) return safeA - safeB;
    if (Boolean(b.featured) !== Boolean(a.featured)) return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    return a.name.localeCompare(b.name, "pt-BR");
  });
}

export function getProductsByCategory(products, category) {
  if (!category || category === "Todos") return products;
  return products.filter((product) => product.category === category);
}

export function getSuggestedProducts(products, sourceProduct, limit = 3) {
  if (!sourceProduct) return [];
  const suggestedCategories = sourceProduct.suggestedCategories || getSuggestedCategories(sourceProduct);

  return products
    .filter((product) => product.id !== sourceProduct.id)
    .filter((product) => product.available && product.price > 0)
    .filter((product) => suggestedCategories.includes(product.category))
    .slice(0, limit);
}

export function getFeaturedProducts(products, category, limit = 4) {
  return products
    .filter((product) => !category || product.category === category)
    .filter((product) => product.available)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, limit);
}
