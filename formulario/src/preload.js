const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cardapioApi", {
  loadCatalog: () => ipcRenderer.invoke("catalog:load"),
  saveCatalog: (catalog) => ipcRenderer.invoke("catalog:save", catalog),
  getStorageInfo: () => ipcRenderer.invoke("storage:info"),
  pickImages: (productId) => ipcRenderer.invoke("images:pick", productId),
  exportCatalog: (catalog) => ipcRenderer.invoke("catalog:export", catalog),
});
