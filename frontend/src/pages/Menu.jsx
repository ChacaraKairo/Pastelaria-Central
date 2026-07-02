import { useMemo, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import ProductListItem from "../components/ProductListItem";
import ProductModal from "../components/ProductModal";
import SearchBar from "../components/SearchBar";
import SectionTitle from "../components/SectionTitle";
import { categories } from "../data/categories";
import { products } from "../data/products";

export default function Menu({ onAddProduct, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
      const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const isNcShowcase = activeCategory === "Produtos de NC";

  return (
    <section className={isNcShowcase ? "section page-section nc-page-section" : "section page-section"}>
      {isNcShowcase ? (
        <div className="nc-showcase-hero">
          <span>Vitrine de Novo Cruzeiro</span>
          <h2>Produtos de NC</h2>
          <p>
            Uma seleção especial de produtos da cidade, apresentada com destaque para valorizar produtores locais,
            tradições e sabores importantes para Novo Cruzeiro/MG.
          </p>
        </div>
      ) : (
        <SectionTitle eyebrow="Cardápio" title="Escolha, monte e peça" text="Produtos do pedido rápido entram no carrinho. Produtos de encomenda geram orçamento pelo WhatsApp." />
      )}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <CategoryFilter categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
      <div className="product-list-mobile">
        {filteredProducts.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            onAdd={onAddProduct}
            onView={setSelectedProduct}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <div className="product-grid desktop-product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAddProduct}
            onNavigate={onNavigate}
            onView={setSelectedProduct}
          />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="empty-results">Nenhum produto encontrado. Tente outra busca ou categoria.</p>
      )}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={onAddProduct} onNavigate={onNavigate} />
    </section>
  );
}
