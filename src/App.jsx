import { Outlet } from "react-router";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer"; 
import { useCart } from "./context/CartContext";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar onCartClick={() => setIsCartOpen(true)} count={cartCount} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
