import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const cardapioDir = path.join(rootDir, "public", "cardapio");
const outputFile = path.join(rootDir, "src", "data", "generatedCatalog.js");
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

const folderLabels = {
  bebidas: "Bebidas",
  "salgados-assados": "Salgados Assados",
  pasteis: "Pastéis",
  "salgados-fritos": "Salgados Fritos",
  sobremesas: "Sobremesas",
  doces: "Doces",
  especial: "Especial",
  "produtos-de-nc": "Produtos de NC",
};

const fallbackImages = {
  bebidas: "/images/placeholder-drink.svg",
  pasteis: "/images/placeholder-food.svg",
  "salgados-assados": "/images/placeholder-food.svg",
  "salgados-fritos": "/images/placeholder-food.svg",
  sobremesas: "/images/placeholder-combo.svg",
  doces: "/images/placeholder-combo.svg",
  especial: "/images/placeholder-combo.svg",
  "produtos-de-nc": "/images/placeholder-combo.svg",
};

function listDirectories(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function titleFromFolder(folderName) {
  if (folderLabels[folderName]) return folderLabels[folderName];

  return folderName
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("pt-BR"));
}

function normalizeKey(key) {
  return key
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function parseInfoFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const info = {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = normalizeKey(trimmed.slice(0, separatorIndex));
    const value = trimmed.slice(separatorIndex + 1).trim();
    info[key] = value;
  }

  return info;
}

function parsePrice(value) {
  if (!value) return 0;
  const normalized = String(value)
    .replace(/[R$\s]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const price = Number.parseFloat(normalized);
  return Number.isFinite(price) ? price : 0;
}

function parseBoolean(value, defaultValue = false) {
  if (value === undefined) return defaultValue;
  return ["sim", "true", "1", "yes", "ativo", "disponivel", "disponível"].includes(
    String(value).trim().toLowerCase()
  );
}

function productNameFromFolder(folderName) {
  return titleFromFolder(folderName);
}

function getProductImages(categoryFolder, productFolder, productDir) {
  const images = fs
    .readdirSync(productDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
    .map((fileName) => `/cardapio/${categoryFolder}/${productFolder}/${fileName}`);

  return images.length ? images : [fallbackImages[categoryFolder] || "/images/placeholder-food.svg"];
}

function buildCatalog() {
  const categoryFolders = listDirectories(cardapioDir);
  const generatedCategories = ["Todos"];
  const generatedProducts = [];

  categoryFolders.forEach((categoryFolder, categoryIndex) => {
    const category = titleFromFolder(categoryFolder);
    generatedCategories.push(category);

    const categoryDir = path.join(cardapioDir, categoryFolder);
    const productFolders = listDirectories(categoryDir);

    productFolders.forEach((productFolder, productIndex) => {
      const productDir = path.join(categoryDir, productFolder);
      const info = parseInfoFile(path.join(productDir, "info.txt"));
      const images = getProductImages(categoryFolder, productFolder, productDir);

      generatedProducts.push({
        id: `cardapio-${categoryIndex + 1}-${productIndex + 1}`,
        name: info.nome || productNameFromFolder(productFolder),
        category,
        description: info.descricao || "Descrição a confirmar com a empresa.",
        price: parsePrice(info.preco || info["preço"]),
        image: images[0],
        images,
        available: parseBoolean(info.disponivel || info["disponível"], true),
        type: info.tipo || "pedido_rapido",
        badge: info.selo || info.badge || category,
        featured: parseBoolean(info.destaque, false),
        sourceFolder: `/cardapio/${categoryFolder}/${productFolder}`,
      });
    });
  });

  return { generatedCategories, generatedProducts };
}

const catalog = buildCatalog();
const fileContent = `// Arquivo gerado automaticamente por scripts/generate-cardapio-data.js.
// Edite os produtos em public/cardapio/<topico>/<produto>/info.txt.

export const generatedCategories = ${JSON.stringify(catalog.generatedCategories, null, 2)};

export const generatedProducts = ${JSON.stringify(catalog.generatedProducts, null, 2)};
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, fileContent);

console.log(
  `Cardápio gerado: ${catalog.generatedProducts.length} produtos em ${Math.max(
    catalog.generatedCategories.length - 1,
    0
  )} tópicos.`
);
