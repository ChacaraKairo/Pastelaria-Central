import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileCartCheckout from "./components/MobileCartCheckout";
import MobileHeader from "./components/MobileHeader";
import MobileBottomNav from "./components/MobileBottomNav";
import FloatingCartButton from "./components/FloatingCartButton";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Encomendas from "./pages/Encomendas";
import CafeDoCiclista from "./pages/CafeDoCiclista";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import { addItem, removeItem, updateQuantity } from "./features/cart/cartUtils";
import WhatsAppButton from "./components/WhatsAppButton";
import { getWhatsAppUrl } from "./data/siteConfig";
import "./styles/global.css";
import "./styles/responsive.css";

const pages = {
  home: Home,
  menu: Menu,
  encomendas: Encomendas,
  cafe: CafeDoCiclista,
  sobre: Sobre,
  contato: Contato,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => window.location.hash.replace("#", "") || "home");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const CurrentPage = pages[currentPage] || Home;

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function navigate(page) {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAddProduct(product, quantity = 1, itemNote = "") {
    setCartItems((items) => addItem(items, product, quantity, itemNote));
    setCartOpen(true);
  }

  function handleClearCart() {
    setCartItems(Array.from([]));
  }

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={navigate} cartItems={cartItems} onOpenCart={() => setCartOpen(true)} />
      <MobileHeader cartItems={cartItems} onOpenCart={() => setCartOpen(true)} />
      <main>
        <CurrentPage onNavigate={navigate} onAddProduct={handleAddProduct} />
      </main>
      <Footer onNavigate={navigate} />
      {cartOpen && (
        <MobileCartCheckout
          isOpen={cartOpen}
          cartItems={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={(lineId, quantity) => setCartItems((items) => updateQuantity(items, lineId, quantity))}
          onRemove={(lineId) => setCartItems((items) => removeItem(items, lineId))}
          onClear={handleClearCart}
          onAddProduct={handleAddProduct}
        />
      )}
      <div className="floating-actions desktop-floating-actions">
        <button className="floating-cart" type="button" onClick={() => setCartOpen(true)}>Carrinho</button>
        <WhatsAppButton href={getWhatsAppUrl()}>WhatsApp</WhatsAppButton>
      </div>
      <FloatingCartButton cartItems={cartItems} onOpenCart={() => setCartOpen(true)} />
      <MobileBottomNav currentPage={currentPage} cartItems={cartItems} onNavigate={navigate} onOpenCart={() => setCartOpen(true)} />
    </div>
  );
}
