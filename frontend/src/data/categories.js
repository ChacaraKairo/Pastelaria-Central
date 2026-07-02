import { generatedCategories } from "./generatedCatalog.js";

export const categories = generatedCategories.length > 0 ? generatedCategories : ["Todos"];
