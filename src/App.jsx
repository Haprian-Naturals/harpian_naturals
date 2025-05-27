import { Routes, Route, Router } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Footer from "./components/Footer";
import Contact from "./Pages/Contact";
import Sale from "./Pages/Sale";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import ProductDetail from "./Pages/ProductDetail";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

// Main app component
function App() {
  return (
    <CartProvider>
      <div>
        <Toaster position="top-right" />
        <Nav />

        {/* Wrap content in a <main> tag and apply padding-top */}
        <main style={{ paddingTop: "var(--navbar-height, 5rem)" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/sale" element={<Sale />} /> */}
            <Route path="/products/:id" element={<ProductDetail />} />

            <Route path="/contact" element={<Contact />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
