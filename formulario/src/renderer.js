const state = {
  catalog: {
    categories: [],
    products: [],
  },
  selectedImages: [],
  draggedImageIndex: null,
  search: "",
};

const elements = {
  saveButton: document.querySelector("#saveButton"),
  exportButton: document.querySelector("#exportButton"),
  exportButtonSecondary: document.querySelector("#exportButtonSecondary"),
  navButtons: document.querySelectorAll("[data-view-target]"),
  views: document.querySelectorAll("[data-view]"),
  categoryForm: document.querySelector("#categoryForm"),
  categoryName: document.querySelector("#categoryName"),
  categoryList: document.querySelector("#categoryList"),
  productForm: document.querySelector("#productForm"),
  productId: document.querySelector("#productId"),
  productCategory: document.querySelector("#productCategory"),
  productName: document.querySelector("#productName"),
  productPrice: document.querySelector("#productPrice"),
  productDescription: document.querySelector("#productDescription"),
  productType: document.querySelector("#productType"),
  productBadge: document.querySelector("#productBadge"),
  productAvailable: document.querySelector("#productAvailable"),
  productFeatured: document.querySelector("#productFeatured"),
  pickImagesButton: document.querySelector("#pickImagesButton"),
  imageCount: document.querySelector("#imageCount"),
  imagePreview: document.querySelector("#imagePreview"),
  productList: document.querySelector("#productList"),
  searchInput: document.querySelector("#searchInput"),
  productCategoryFilter: document.querySelector("#productCategoryFilter"),
  newProductButton: document.querySelector("#newProductButton"),
  formTitle: document.querySelector("#formTitle"),
  toast: document.querySelector("#toast"),
  databasePath: document.querySelector("#databasePath"),
  imagesPath: document.querySelector("#imagesPath"),
  summaryCategories: document.querySelector("#summaryCategories"),
  summaryProducts: document.querySelector("#summaryProducts"),
  summaryAvailable: document.querySelector("#summaryAvailable"),
  summaryFeatured: document.querySelector("#summaryFeatured"),
};

function uid() {
  return crypto.randomUUID();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 3200);
}

function getCategoryName(categoryId) {
  return state.catalog.categories.find((category) => category.id === categoryId)?.name || "Sem categoria";
}

function resetProductForm() {
  elements.formTitle.textContent = "Novo produto";
  elements.productId.value = "";
  elements.productName.value = "";
  elements.productPrice.value = "";
  elements.productDescription.value = "";
  elements.productType.value = "pedido_rapido";
  elements.productBadge.value = "";
  elements.productAvailable.checked = true;
  elements.productFeatured.checked = false;
  state.selectedImages = [];
  if (state.catalog.categories[0]) {
    elements.productCategory.value = state.catalog.categories[0].id;
  }
  renderImages();
}

function setView(viewName) {
  elements.views.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === viewName);
  });

  elements.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === viewName);
  });
}

function renderSummary() {
  elements.summaryCategories.textContent = String(state.catalog.categories.length);
  elements.summaryProducts.textContent = String(state.catalog.products.length);
  elements.summaryAvailable.textContent = String(state.catalog.products.filter((product) => product.available).length);
  elements.summaryFeatured.textContent = String(state.catalog.products.filter((product) => product.featured).length);
}

function renderCategories() {
  elements.categoryList.innerHTML = "";
  elements.productCategory.innerHTML = "";
  elements.productCategoryFilter.innerHTML = "";

  const allCategoriesOption = document.createElement("option");
  allCategoriesOption.value = "";
  allCategoriesOption.textContent = "Todas as categorias";
  elements.productCategoryFilter.appendChild(allCategoriesOption);

  state.catalog.categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    elements.productCategory.appendChild(option);

    const filterOption = document.createElement("option");
    filterOption.value = category.id;
    filterOption.textContent = category.name;
    elements.productCategoryFilter.appendChild(filterOption);

    const item = document.createElement("div");
    item.className = "category-item";

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = category.name;
    const count = document.createElement("span");
    count.textContent = `${state.catalog.products.filter((product) => product.categoryId === category.id).length} produtos`;
    info.append(name, count);

    const actions = document.createElement("div");
    actions.className = "category-actions";

    const viewButton = document.createElement("button");
    viewButton.className = "btn btn-light";
    viewButton.type = "button";
    viewButton.textContent = "Ver produtos";

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger";
    removeButton.type = "button";
    removeButton.textContent = "Remover";

    actions.append(viewButton, removeButton);
    item.append(info, actions);

    viewButton.addEventListener("click", () => {
      elements.productCategoryFilter.value = category.id;
      state.search = "";
      elements.searchInput.value = "";
      setView("products");
      renderProducts();
    });

    removeButton.addEventListener("click", () => {
      const hasProducts = state.catalog.products.some((product) => product.categoryId === category.id);
      if (hasProducts) {
        showToast("Remova ou edite os produtos desta categoria antes de apagar.");
        return;
      }

      state.catalog.categories = state.catalog.categories.filter((itemCategory) => itemCategory.id !== category.id);
      render();
    });

    elements.categoryList.appendChild(item);
  });
}

function renderImages() {
  elements.imagePreview.innerHTML = "";
  elements.imageCount.textContent = state.selectedImages.length
    ? `${state.selectedImages.length} imagem(ns) selecionada(s). Arraste para mudar a ordem.`
    : "Nenhuma imagem selecionada";

  state.selectedImages.forEach((imagePath, index) => {
    const figure = document.createElement("figure");
    figure.draggable = true;
    figure.dataset.index = String(index);

    const order = document.createElement("span");
    order.className = "image-order";
    order.textContent = String(index + 1);

    const image = document.createElement("img");
    image.src = `file://${imagePath}`;
    image.alt = `Imagem ${index + 1}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.setAttribute("aria-label", "Remover imagem");
    removeButton.textContent = "×";

    figure.append(order, image, removeButton);

    figure.addEventListener("dragstart", (event) => {
      state.draggedImageIndex = index;
      figure.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(index));
    });

    figure.addEventListener("dragend", () => {
      state.draggedImageIndex = null;
      figure.classList.remove("is-dragging");
      document.querySelectorAll(".image-preview figure").forEach((item) => {
        item.classList.remove("is-drop-target");
      });
    });

    figure.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      figure.classList.add("is-drop-target");
    });

    figure.addEventListener("dragleave", () => {
      figure.classList.remove("is-drop-target");
    });

    figure.addEventListener("drop", (event) => {
      event.preventDefault();
      const fromIndex = state.draggedImageIndex;
      const toIndex = Number(figure.dataset.index);

      if (fromIndex === null || fromIndex === toIndex) {
        figure.classList.remove("is-drop-target");
        return;
      }

      const nextImages = [...state.selectedImages];
      const [movedImage] = nextImages.splice(fromIndex, 1);
      nextImages.splice(toIndex, 0, movedImage);
      state.selectedImages = nextImages;
      state.draggedImageIndex = null;
      renderImages();
    });

    removeButton.addEventListener("click", () => {
      state.selectedImages = state.selectedImages.filter((_, imageIndex) => imageIndex !== index);
      renderImages();
    });
    elements.imagePreview.appendChild(figure);
  });
}

function renderProducts() {
  const search = state.search.trim().toLowerCase();
  const selectedCategoryId = elements.productCategoryFilter.value;
  const products = state.catalog.products.filter((product) => {
    const categoryName = getCategoryName(product.categoryId);
    const matchesSearch = `${product.name} ${product.description} ${categoryName}`.toLowerCase().includes(search);
    const matchesCategory = !selectedCategoryId || product.categoryId === selectedCategoryId;
    return matchesSearch && matchesCategory;
  });

  elements.productList.innerHTML = "";

  if (!products.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhum produto cadastrado.";
    elements.productList.appendChild(empty);
    return;
  }

  products.forEach((product) => {
    const item = document.createElement("article");
    item.className = "product-item";

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("strong");
    name.textContent = product.name;

    const meta = document.createElement("span");
    meta.textContent = `${getCategoryName(product.categoryId)} • R$ ${product.price || "0,00"} • ${product.available ? "Disponível" : "Indisponível"}`;

    const description = document.createElement("p");
    description.textContent = product.description;

    info.append(name, meta, description);

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const editButton = document.createElement("button");
    editButton.className = "btn btn-light";
    editButton.type = "button";
    editButton.textContent = "Editar";

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.type = "button";
    deleteButton.textContent = "Apagar";

    actions.append(editButton, deleteButton);
    item.append(info, actions);

    editButton.addEventListener("click", () => editProduct(product.id));
    deleteButton.addEventListener("click", () => {
      state.catalog.products = state.catalog.products.filter((itemProduct) => itemProduct.id !== product.id);
      render();
      showToast("Produto removido.");
    });

    elements.productList.appendChild(item);
  });
}

function render() {
  renderSummary();
  renderCategories();
  renderProducts();
  renderImages();
}

function editProduct(productId) {
  const product = state.catalog.products.find((item) => item.id === productId);
  if (!product) return;

  elements.formTitle.textContent = "Editar produto";
  elements.productId.value = product.id;
  elements.productCategory.value = product.categoryId;
  elements.productName.value = product.name;
  elements.productPrice.value = product.price;
  elements.productDescription.value = product.description;
  elements.productType.value = product.type;
  elements.productBadge.value = product.badge;
  elements.productAvailable.checked = product.available;
  elements.productFeatured.checked = product.featured;
  state.selectedImages = [...product.images];
  renderImages();
  elements.productName.focus();
}

function getProductFromForm() {
  return {
    id: elements.productId.value || uid(),
    categoryId: elements.productCategory.value,
    name: elements.productName.value.trim(),
    price: elements.productPrice.value.trim(),
    description: elements.productDescription.value.trim(),
    type: elements.productType.value,
    badge: elements.productBadge.value.trim(),
    available: elements.productAvailable.checked,
    featured: elements.productFeatured.checked,
    images: [...state.selectedImages],
  };
}

async function saveCatalog() {
  state.catalog = await window.cardapioApi.saveCatalog(state.catalog);
  showToast("Dados salvos.");
}

elements.categoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = elements.categoryName.value.trim();
  if (!name) return;

  const exists = state.catalog.categories.some((category) => category.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    showToast("Essa categoria já existe.");
    return;
  }

  state.catalog.categories.push({ id: uid(), name });
  elements.categoryName.value = "";
  render();
});

elements.productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const product = getProductFromForm();

  if (!product.categoryId) {
    showToast("Crie ou escolha uma categoria.");
    return;
  }

  if (!product.name || !product.price || !product.description) {
    showToast("Preencha nome, preço e descrição.");
    return;
  }

  const index = state.catalog.products.findIndex((item) => item.id === product.id);
  if (index >= 0) {
    state.catalog.products[index] = product;
  } else {
    state.catalog.products.push(product);
  }

  await saveCatalog();
  resetProductForm();
  render();
});

elements.pickImagesButton.addEventListener("click", async () => {
  if (!elements.productId.value) {
    elements.productId.value = uid();
  }

  const images = await window.cardapioApi.pickImages(elements.productId.value);
  if (!images.length) return;
  state.selectedImages = [...state.selectedImages, ...images];
  renderImages();
});

elements.saveButton.addEventListener("click", saveCatalog);

async function handleExport() {
  await saveCatalog();
  const result = await window.cardapioApi.exportCatalog(state.catalog);
  if (result.canceled) return;
  showToast(`Cardápio exportado em: ${result.path}`);
}

elements.exportButton.addEventListener("click", handleExport);
elements.exportButtonSecondary.addEventListener("click", handleExport);

elements.newProductButton.addEventListener("click", resetProductForm);

elements.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

elements.productCategoryFilter.addEventListener("change", renderProducts);

elements.navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setView(button.dataset.viewTarget);
  });
});

async function init() {
  state.catalog = await window.cardapioApi.loadCatalog();
  const storageInfo = await window.cardapioApi.getStorageInfo();
  elements.databasePath.textContent = storageInfo.databasePath;
  elements.imagesPath.textContent = storageInfo.imagesPath;
  render();
  resetProductForm();
}

init();
