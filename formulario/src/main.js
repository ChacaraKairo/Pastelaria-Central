const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { DatabaseSync } = require("node:sqlite");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-gpu");

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 960,
    minHeight: 640,
    title: "Formulário de Cardápio - Pastelaria Central",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "index.html"));
}

function getDatabasePath() {
  return path.join(app.getPath("userData"), "catalog.sqlite");
}

function getLegacyCatalogPath() {
  return path.join(app.getPath("userData"), "catalog.json");
}

function getImagesRoot() {
  return path.join(app.getPath("userData"), "product-images");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "item";
}

function createDefaultCatalog() {
  return {
    categories: [
      { id: crypto.randomUUID(), name: "Bebidas" },
      { id: crypto.randomUUID(), name: "Salgados Assados" },
      { id: crypto.randomUUID(), name: "Pastéis" },
      { id: crypto.randomUUID(), name: "Salgados Fritos" },
      { id: crypto.randomUUID(), name: "Sobremesas" },
      { id: crypto.randomUUID(), name: "Doces" },
      { id: crypto.randomUUID(), name: "Especial" },
      { id: crypto.randomUUID(), name: "Produtos de NC" },
    ],
    products: [],
  };
}

function createInfoText(product) {
  return [
    `nome: ${product.name || ""}`,
    `preco: ${product.price || "0,00"}`,
    `descricao: ${product.description || ""}`,
    `disponivel: ${product.available ? "sim" : "nao"}`,
    `tipo: ${product.type || "pedido_rapido"}`,
    `selo: ${product.badge || ""}`,
    `destaque: ${product.featured ? "sim" : "nao"}`,
  ].join("\n");
}

function getDb() {
  if (db) return db;

  ensureDir(app.getPath("userData"));
  db = new DatabaseSync(getDatabasePath());
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      position INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL,
      badge TEXT,
      available INTEGER NOT NULL DEFAULT 1,
      featured INTEGER NOT NULL DEFAULT 0,
      position INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS product_images (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      file_path TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  seedDatabaseIfNeeded();
  return db;
}

function seedDatabaseIfNeeded() {
  const count = db.prepare("SELECT COUNT(*) AS total FROM categories").get().total;
  if (count > 0) return;

  const legacyPath = getLegacyCatalogPath();
  if (fs.existsSync(legacyPath)) {
    const legacyCatalog = JSON.parse(fs.readFileSync(legacyPath, "utf8"));
    writeCatalog(legacyCatalog);
    return;
  }

  writeCatalog(createDefaultCatalog());
}

function readCatalog() {
  const database = getDb();
  const categories = database
    .prepare("SELECT id, name FROM categories ORDER BY position, name")
    .all();

  const products = database
    .prepare(`
      SELECT
        id,
        category_id AS categoryId,
        name,
        price,
        description,
        type,
        COALESCE(badge, '') AS badge,
        available,
        featured
      FROM products
      ORDER BY position, name
    `)
    .all()
    .map((product) => ({
      ...product,
      available: Boolean(product.available),
      featured: Boolean(product.featured),
      images: database
        .prepare("SELECT file_path AS filePath FROM product_images WHERE product_id = ? ORDER BY position")
        .all(product.id)
        .map((image) => image.filePath),
    }));

  return { categories, products };
}

function writeCatalog(catalog) {
  const database = getDb();

  database.exec("BEGIN");
  try {
    database.exec("DELETE FROM product_images");
    database.exec("DELETE FROM products");
    database.exec("DELETE FROM categories");

    const insertCategory = database.prepare("INSERT INTO categories (id, name, position) VALUES (?, ?, ?)");
    const insertProduct = database.prepare(`
      INSERT INTO products (
        id, category_id, name, price, description, type, badge, available, featured, position
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertImage = database.prepare("INSERT INTO product_images (id, product_id, file_path, position) VALUES (?, ?, ?, ?)");

    catalog.categories.forEach((category, index) => {
      insertCategory.run(category.id, category.name, index);
    });

    catalog.products.forEach((product, productIndex) => {
      insertProduct.run(
        product.id,
        product.categoryId,
        product.name,
        product.price,
        product.description,
        product.type,
        product.badge || "",
        product.available ? 1 : 0,
        product.featured ? 1 : 0,
        productIndex
      );

      product.images.forEach((imagePath, imageIndex) => {
        insertImage.run(crypto.randomUUID(), product.id, imagePath, imageIndex);
      });
    });

    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  return readCatalog();
}

function getNextImageIndex(productDir) {
  if (!fs.existsSync(productDir)) return 1;

  const indexes = fs
    .readdirSync(productDir)
    .map((fileName) => Number.parseInt(path.basename(fileName, path.extname(fileName)), 10))
    .filter(Number.isFinite);

  return indexes.length ? Math.max(...indexes) + 1 : 1;
}

function importImages(productId, filePaths) {
  const productDir = path.join(getImagesRoot(), productId);
  ensureDir(productDir);

  let nextIndex = getNextImageIndex(productDir);

  return filePaths.map((filePath) => {
    const ext = path.extname(filePath).toLowerCase() || ".png";
    const destination = path.join(productDir, `${nextIndex}${ext}`);
    nextIndex += 1;
    fs.copyFileSync(filePath, destination);
    return destination;
  });
}

ipcMain.handle("catalog:load", () => readCatalog());

ipcMain.handle("catalog:save", (_event, catalog) => writeCatalog(catalog));

ipcMain.handle("storage:info", () => ({
  databasePath: getDatabasePath(),
  imagesPath: getImagesRoot(),
}));

ipcMain.handle("images:pick", async (_event, productId) => {
  const result = await dialog.showOpenDialog({
    title: "Selecionar imagens do produto",
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Imagens", extensions: ["png", "jpg", "jpeg", "webp", "gif"] },
    ],
  });

  if (result.canceled) return [];

  const selectedPaths = result.filePaths.filter((filePath) => imageExtensions.has(path.extname(filePath).toLowerCase()));
  return importImages(productId, selectedPaths);
});

ipcMain.handle("catalog:export", async (_event, catalog) => {
  const result = await dialog.showOpenDialog({
    title: "Escolha onde salvar a pasta cardapio",
    properties: ["openDirectory", "createDirectory"],
  });

  if (result.canceled || !result.filePaths[0]) {
    return { canceled: true };
  }

  const destinationRoot = result.filePaths[0];
  const cardapioDir = path.join(destinationRoot, "cardapio");
  fs.rmSync(cardapioDir, { recursive: true, force: true });
  ensureDir(cardapioDir);

  const categoryById = new Map(catalog.categories.map((category) => [category.id, category]));

  for (const category of catalog.categories) {
    ensureDir(path.join(cardapioDir, slugify(category.name)));
  }

  for (const product of catalog.products) {
    const category = categoryById.get(product.categoryId);
    if (!category) continue;

    const categoryDir = path.join(cardapioDir, slugify(category.name));
    const productDir = path.join(categoryDir, slugify(product.name));
    ensureDir(productDir);

    fs.writeFileSync(path.join(productDir, "info.txt"), createInfoText(product));

    product.images.forEach((imagePath, index) => {
      if (!fs.existsSync(imagePath)) return;
      const ext = path.extname(imagePath).toLowerCase() || ".png";
      fs.copyFileSync(imagePath, path.join(productDir, `${index + 1}${ext}`));
    });
  }

  return { canceled: false, path: cardapioDir };
});

app.whenReady().then(() => {
  getDb();
  ensureDir(getImagesRoot());
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
