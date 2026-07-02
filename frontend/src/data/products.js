import { generatedProducts } from "./generatedCatalog.js";
import { normalizeProduct, sortProductsByCommercialOrder } from "../features/products/productUtils.js";

export const products = sortProductsByCommercialOrder(generatedProducts.map(normalizeProduct));
