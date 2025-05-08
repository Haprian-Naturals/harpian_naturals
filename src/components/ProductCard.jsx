import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const parsedPrice = parseFloat(product.price.replace("GH₵", ""));
    const productToAdd = {
      ...product,
      price: parsedPrice,
      quantity: quantity,
    };
    addToCart(productToAdd);
    alert(`${product.name} has been added to your cart!`);
    setIsModalOpen(false);
  };

  const handleQuickView = () => {
    setIsModalOpen(true);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Disable scroll on modal open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = ""); // Clean up on unmount
  }, [isModalOpen]);

  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg relative">
      {/* Image */}
      <div className="relative overflow-hidden p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain bg-[#D4E4D8] transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="px-4 pb-5 flex flex-col items-center flex-grow">
        {/* <p className="text-xs text-[#8CC63F] uppercase tracking-wide mb-1">
          {product.brand}
        </p> */}
        <h3 className="text-base font-medium text-[#1A3C34] text-center leading-tight mb-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating / 10)
                  ? "text-[#8CC63F]"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.691h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.27 9.394c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.691l1.286-3.966z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        <p className="text-sm font-semibold text-gray-800 mb-3">
          {product.price}
        </p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleQuickView();
          }}
          className="text-sm text-[#1A3C34] hover:text-[#8CC63F] hover:underline mb-3 block"
        >
          Quick View
        </a>
        <button
          onClick={handleAddToCart}
          className="w-full py-2 text-sm font-medium text-white bg-[#003087] rounded-md hover:bg-[#4A6BFF] transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/10 transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg drop-shadow-xl border border-white/20 ring-1 ring-white/10 w-full max-w-sm mx-4 relative transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
            >
              ×
            </button>
            <div className="flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-xl font-semibold text-[#1A3C34] text-center">
                {product.name}
              </h2>
              <p className="text-green-600 text-sm mb-2">in Stock</p>
              <p className="text-lg font-bold text-gray-800 mb-2">
                {product.price}
              </p>
              <p className="text-gray-600 text-center mb-4 text-sm">
                {product.description ||
                  "Rejuvenate Your Skin While You Sleep Awaken softer, smoother, and deeply hydrated skin with HNM Naturals Deep Hydration Night Repair Cream..."}
              </p>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <button
                  onClick={() => {
                    window.location.href = `/product/${product.id}`;
                    setIsModalOpen(false);
                  }}
                  className="w-full py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
                >
                  VIEW MORE DETAILS
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
                >
                  ADD TO CART
                </button>
              </div>
              <button className="mt-4 text-[#1A3C34] hover:text-[#8CC63F] hover:underline text-sm">
                ♥ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
