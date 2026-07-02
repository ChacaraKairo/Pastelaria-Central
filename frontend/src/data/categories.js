import { generatedCategories } from "./generatedCatalog.js";
import { normalizeCategory, sortCategories } from "../features/products/productUtils.js";

const normalizedCategories = generatedCategories.length > 0
  ? generatedCategories.map(normalizeCategory)
  : ["Todos"];

export const categories = sortCategories(["Todos", ...normalizedCategories]);
